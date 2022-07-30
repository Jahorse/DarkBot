import { ethers } from 'ethers';

import { dusdcAbi } from './abi';
import { Token, TokenProps } from './token';

export class DUSDT extends Token {
  protected contractAddress = '0x633b3eBBd315d5Ec33F4e72082b92FDc90eCC5c9';
  protected name = 'DUSDT';

  protected contract: ethers.Contract;

  public constructor(props: TokenProps) {
    super();
    this.contract = new ethers.Contract(this.contractAddress, dusdcAbi, props.provider);
  }
}