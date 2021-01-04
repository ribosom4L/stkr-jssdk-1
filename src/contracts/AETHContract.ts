import { BlockchainNetworkId, IAnkrETH } from '../types'
import AETHAbi from './abi/AETH.json'
import Web3 from 'web3'
import * as BN from 'bn.js'
import { ERC20Contract } from './ERC20Contract'

export class AETHContract extends ERC20Contract implements IAnkrETH {
  abi = AETHAbi as any
  name = "AETH"

  constructor(web3: Web3, network: BlockchainNetworkId) {
    super(web3, network)
  }

  /**
   * Get current aeth price as ethereum
   */
  public async tokenPrice(): Promise<number> {
    const ratio: BN = await this.ratio()

    return Number(1 / Number(this.web3.utils.fromWei(ratio)))
  }

  async ratio(): Promise<BN> {
    return this.getContract().methods.ratio().call()
  }
}
