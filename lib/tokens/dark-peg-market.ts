import { ethers } from 'ethers';

import { darkPegMarketAbi } from './abi';

/**
 * STATUS:
 * 0: NO DEPOSIT
 * 1: DEPOSIT LOCKED (NOT SETTLE YET)
 * 2: READY TO SELL
 * 3: EXPIRED
 */
export enum Status {
  NONE,
  LOCKED,
  READY,
  EXPIRED,
}

export interface UserInfo {
  status: Status;
  deposited: number;
}

export interface TradingInfo {
  maxAmountIn: number;
}

export interface IDarkPegMarket {
  // READ
  getUserInfo(token: string, account: string): Promise<UserInfo>;

  getTradingInfo(token: string, amount: number): Promise<TradingInfo>;

  // WRITE
  cancel(token: string): Promise<void>;

  deposit(token: string, amount: number): Promise<void>;

  sell(token: string, amount: number): Promise<void>;
}

export interface DarkPegMarketProps {
  wallet: ethers.Wallet;
}

export class DarkPegMarket implements IDarkPegMarket {
  private contract: ethers.Contract;
  private walletAddress: Promise<string>;

  constructor(props: DarkPegMarketProps) {
    this.contract = new ethers.Contract('0x6a8c2d3c23c1799d4ba7a67e69909fa0a897d1a3', darkPegMarketAbi, props.wallet);
    this.walletAddress = props.wallet.getAddress();
  }

  public async getActiveAccountAddress(): Promise<string> { return this.walletAddress; }

  // READ
  public async getUserInfo(token: string): Promise<UserInfo> {
    return this.contract.getUserInfo(token, await this.walletAddress)
      .then((i: any) => {
        return {
          status: Status[i._status],
          deposited: parseInt(i._deposited.toString()),
        };
      });
  }

  public async getTradingInfo(token: string, amount: number): Promise<TradingInfo> {
    return this.contract.getTradingInfo(token, amount)
      .then((i: any) => {
        return {
          maxAmountIn: parseInt(i._maxAmountIn.toString()),
        };
      });
  }

  // WRITE
  public async cancel(token: string): Promise<void> {
    this.contract.cancel(token);
  }

  public async deposit(token: string, amount: number): Promise<void> {
    this.contract.deposit(token, amount);
  }

  public async sell(token: string, amount: number): Promise<void> {
    this.contract.sell(token, amount);
  }
}