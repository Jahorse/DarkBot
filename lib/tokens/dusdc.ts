import { ethers } from 'ethers';

import { dusdcAbi } from './abi';
import { Token, TokenProps } from './token';

export class DUSDC extends Token {
  protected contractAddress = '0x029B1c559a1771a5FFBc93cb8038dde3096aDDB0';
  protected name = 'DUSDC';

  protected contract: ethers.Contract;

  public constructor(props: TokenProps) {
    super();
    this.contract = new ethers.Contract(this.contractAddress, dusdcAbi, props.provider);
  }
}