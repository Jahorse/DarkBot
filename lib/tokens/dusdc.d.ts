import { ethers } from 'ethers';
import { Token, TokenProps } from './token';
export declare class DUSDC extends Token {
    protected contractAddress: string;
    protected name: string;
    protected contract: ethers.Contract;
    constructor(props: TokenProps);
}
