import { ethers } from 'ethers';


export interface TokenProps {
  provider: ethers.providers.Provider;
}

export interface IToken {
  getName(): string;

  getContractAddress(): string;

  getPrice(): Promise<number>;

  balanceOf(address: string): Promise<number>;

  getDecimals(): Promise<number>;

  sellingLimit(): Promise<number>;
}

export abstract class Token implements IToken {
  protected abstract contract: ethers.Contract;
  protected abstract contractAddress: string;
  protected abstract name: string;

  public constructor() {}

  public getName() { return this.name; }

  public getContractAddress(): string { return this.contractAddress; }

  public async getPrice(): Promise<number> {
    return this.contract.getTokenUpdatedPrice().then((p: ethers.BigNumber) => parseInt(p.toString()));
  }

  public async getDecimals(): Promise<number> {
    return this.contract.decimals().then((d: ethers.BigNumber) => parseInt(d.toString()));
  }

  public async balanceOf(address: string): Promise<number> {
    return this.contract.balanceOf(address).then((b: ethers.BigNumber) => parseInt(b.toString()));
  }

  public async sellingLimit(): Promise<number> {
    return this.contract.sellingLimit().then((l: ethers.BigNumber) => parseInt(l.toString()));
  }
}