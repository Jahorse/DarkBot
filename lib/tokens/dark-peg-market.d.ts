import { ethers } from 'ethers';
/**
 * STATUS:
 * 0: NO DEPOSIT
 * 1: DEPOSIT LOCKED (NOT SETTLE YET)
 * 2: READY TO SELL
 * 3: EXPIRED
 */
export declare enum Status {
    NONE = 0,
    LOCKED = 1,
    READY = 2,
    EXPIRED = 3
}
export interface UserInfo {
    status: Status;
    deposited: number;
}
export interface TradingInfo {
    maxAmountIn: number;
}
export interface IDarkPegMarket {
    getUserInfo(token: string, account: string): Promise<UserInfo>;
    getTradingInfo(token: string, amount: number): Promise<TradingInfo>;
    cancel(token: string): Promise<void>;
    deposit(token: string, amount: number): Promise<void>;
    sell(token: string, amount: number): Promise<void>;
}
export interface DarkPegMarketProps {
    wallet: ethers.Wallet;
}
export declare class DarkPegMarket implements IDarkPegMarket {
    private contract;
    private walletAddress;
    constructor(props: DarkPegMarketProps);
    getActiveAccountAddress(): Promise<string>;
    getUserInfo(token: string): Promise<UserInfo>;
    getTradingInfo(token: string, amount: number): Promise<TradingInfo>;
    cancel(token: string): Promise<void>;
    deposit(token: string, amount: number): Promise<void>;
    sell(token: string, amount: number): Promise<void>;
}
