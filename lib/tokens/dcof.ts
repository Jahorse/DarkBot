import { ethers } from 'ethers';

import { dcofAbi } from './abi';
import { Token, TokenProps } from './token';

export class DCOF extends Token {
  protected contractAddress = '0x796c314fdb43BC37D8F7A714183dEb85bC595A89';
  protected name = 'DCOF';

  protected contract: ethers.Contract;

  public constructor(props: TokenProps) {
    super();
    this.contract = new ethers.Contract(this.contractAddress, dcofAbi, props.provider);
  }
}