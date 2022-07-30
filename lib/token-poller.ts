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
      const price = parseInt((await this.token.getPrice()).toString()) / 1e18;

      if (this.comparePrice(price)) {
        const message = `${this.token.getName()} is ${this.comparator} ${this.watchPrice} (actual value: ${price})\n\n`;
        let action = 'None';
        let result = 'Success';
        console.log(message);

        const tokenAddress = this.token.getContractAddress();
        const currentTransactions = await this.darkPegMarket.getUserInfo(tokenAddress);

        try{
          switch (currentTransactions.status) {
            case Status.EXPIRED:
              action = 'Cancel and Start';
              console.log(' Cancelling expired transaction first...');
              await this.darkPegMarket.cancel(this.token.getContractAddress());
              console.log('    Transaction cancelled!');
              await this.startTransaction(tokenAddress);
              break;

            case Status.NONE:
              action = 'Start';
              await this.startTransaction(tokenAddress);
              break;

            case Status.LOCKED:
              action = 'Already locked';
              console.log('  Already a locked transaction, nothing to do.');
              break;

            case Status.READY:
              action = 'Execute sell';
              console.log(' Completing pending transaction...');
              const tInfo = await this.darkPegMarket.getTradingInfo(tokenAddress, currentTransactions.deposited);
              await this.darkPegMarket.sell(tokenAddress, tInfo.maxAmountIn);
              console.log('    Transaction complete!');
              break;

            default:
              action = 'Unknown';
              console.log('  Unknown status');
              break;
          }
        } catch (e: any) {
          result = 'Failure';
          console.error(e);
        }
        this.discordClient.sendMessage([{
          title: this.token.getName(),
          fields: [
            {
              name: 'Price',
              value: price.toString(),
            },
            {
              name: 'Action',
              value: action,
            },
            {
              name: 'Result',
              value: result,
            },
          ],
        }]).catch(e => console.error(e));

      } else {
        console.log(`${this.token.getName()} is ${price}`);
      }

    } finally {
      setTimeout(this.poll.bind(this), this.refreshRate);
    }
  }
  private async startTransaction(tokenAddress: string): Promise<void> {
    console.log('  Attempting to start a transaction...');
    const tradingInfo = await this.darkPegMarket.getTradingInfo(
      tokenAddress,
      await this.token.balanceOf(await this.darkPegMarket.getActiveAccountAddress()));
    await this.darkPegMarket.deposit(tokenAddress, tradingInfo.maxAmountIn);
    console.log('    Transaction started!');
  }
}