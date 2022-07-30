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
export declare abstract class Token implements IToken {
    protected abstract contract: ethers.Contract;
    protected abstract contractAddress: string;
    protected abstract name: string;
    constructor();
    getName(): string;
    getContractAddress(): string;
    getPrice(): Promise<number>;
    getDecimals(): Promise<number>;
    balanceOf(address: string): Promise<number>;
    sellingLimit(): Promise<number>;
}
