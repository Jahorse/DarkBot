import { Discord } from './discord-client';
import { DarkPegMarket, Status } from './tokens/dark-peg-market';
import { IToken } from './tokens/token';

const greaterThanFxn = (x: number, y: number) => x > y;
const lessThanFxn = (x: number, y: number) => x < y;

export enum Comparator {
  greaterThan,
  lessThan,
}

export interface TokenPollerProps {
  darkPegMarket: DarkPegMarket;
  discordClient: Discord;
  refreshRate: number;
  token: IToken;
  comparator: Comparator;
  watchPrice: number;
}

export class TokenPoller {
  private darkPegMarket: DarkPegMarket;
  private discordClient: Discord;
  private refreshRate: number;
  private token: IToken;
  private comparator: string;
  private comparePrice: Function;
  private watchPrice: number;

  public constructor(props: TokenPollerProps) {
    this.darkPegMarket  = props.darkPegMarket;
    this.discordClient = props.discordClient;
    this.refreshRate = props.refreshRate;
    this.token = props.token;
    this.watchPrice = props.watchPrice;

    if (props.comparator === Comparator.greaterThan) {
      this.comparePrice = (x: number) => greaterThanFxn(x, props.watchPrice);
      this.comparator = 'greater than';
    } else {
      this.comparePrice = (x: number) => lessThanFxn(x, props.watchPrice);
      this.comparator = 'less than';
    }

    this.poll().catch(e => console.error(e));
  }

  private async poll(): Promise<void> {
    try {
      let price = this.watchPrice + 1;
      const name = this.token.getName();
      try {
        price = parseInt((await this.token.getPrice()).toString()) / 1e18;
      } catch (e: any) {
        console.error(`${name}: Failed getting price...`);
        throw e;
      }

      if (this.comparePrice(price)) {
        const fields = {
          priceMessage: `${this.token.getName()} is ${this.comparator} ${this.watchPrice} (actual value: ${price})\n\n`,
          action: 'None',
          result: 'Success',
          logs: '',
        };
        console.log(fields.priceMessage);

        try {
          const tokenAddress = this.token.getContractAddress();
          const currentTransactions = await this.darkPegMarket.getUserInfo(tokenAddress);

          switch (currentTransactions.status) {
            case Status.EXPIRED:
              fields.action = 'Cancel and Start';
              fields.logs += 'Cancelling expired transaction first...';
              console.log(` ${name}: Cancelling expired transaction first...`);
              const cancelResult = await this.darkPegMarket.cancel(this.token.getContractAddress());
              fields.logs += `\nCancel transaction complete: ${cancelResult.hash}`;
              console.log(`    ${name}: Cancel transaction complete: ${cancelResult.hash}`);
              fields.logs += '\n' + await this.startTransaction(tokenAddress, name);
              break;

            case Status.NONE:
              fields.action = 'Start';
              fields.logs += await this.startTransaction(tokenAddress, name);
              break;

            case Status.LOCKED:
              fields.action = 'Already locked';
              fields.logs += 'Already a locked transaction, nothing to do.';
              console.log(`  ${name}: Already a locked transaction, nothing to do.`);
              break;

            case Status.READY:
              fields.action = 'Execute sell';
              fields.logs += 'Completing pending transaction...';
              console.log(` ${name}: Completing pending transaction...`);
              const tInfo = await this.darkPegMarket.getTradingInfo(tokenAddress, currentTransactions.deposited);
              const sellResult = await this.darkPegMarket.sell(tokenAddress, tInfo.maxAmountIn);
              fields.logs += `\nSell transaction complete: ${sellResult.hash}`;
              console.log(`    ${name}: Sell transaction complete: ${sellResult.hash}`);
              break;

            default:
              fields.action = 'Unknown';
              fields.logs += 'Unknown status';
              console.log(`  ${name}: Unknown status`);
              break;
          }
        } catch (e: any) {
          fields.result = 'Failure';
          console.error(`  ${name}: Failure`, e);
        }
        if (!fields.action.includes('Already locked')) {
          this.discordClient.sendMessage([{
            title: this.token.getName(),
            fields: [
              {
                name: 'Price',
                value: fields.priceMessage,
              },
              {
                name: 'Action',
                value: fields.action,
              },
              {
                name: 'Result',
                value: fields.result,
              },
              {
                name: 'Logs',
                value: fields.logs,
              },
            ],
          }]).catch(e => console.error(`  ${name}: Failed sending Discord message`, e));
        }

      } else {
        console.log(`${name}: is ${price}`);
      }

    } catch (e: any) {
      console.error(`Failed checking for ${this.token.getName()}\n`, e);

    } finally {
      setTimeout(this.poll.bind(this), this.refreshRate);
    }
  }
  private async startTransaction(tokenAddress: string, name: string): Promise<string> {
    let logs = 'Attempting to start a transaction...';
    console.log(`  ${name}: Attempting to start a transaction...`);

    const tradingInfo = await this.darkPegMarket.getTradingInfo(
      tokenAddress,
      await this.token.balanceOf(await this.darkPegMarket.getActiveAccountAddress()));
    const result = await this.darkPegMarket.deposit(tokenAddress, tradingInfo.maxAmountIn);

    logs += '\nStart transaction complete: ${result.hash}';
    console.log(`    ${name}: Start transaction complete: ${result.hash}`);

    return logs;
  }
}