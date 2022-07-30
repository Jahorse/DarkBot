import { ethers } from 'ethers';

import { dcroAbi } from './abi';
import { Token, TokenProps } from './token';

export class DCRO extends Token {
  protected contractAddress = '0x5Be899eb288c4028ed8bB8573BF09CA81439b532';
  protected name = 'DCRO';

  protected contract: ethers.Contract;

  public constructor(props: TokenProps) {
    super();
    this.contract = new ethers.Contract(this.contractAddress, dcroAbi, props.provider);
  }
}