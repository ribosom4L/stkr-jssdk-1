import { BlockchainNetworkId, IAnkrETH } from '../types'
import AETHAbi from './abi/AETH.json'
import Web3 from 'web3'
import * as BN from 'bn.js'
import { BaseContract } from './BaseContract'

export class AETHContract extends BaseContract implements IAnkrETH {
  abi = AETHAbi as any

  constructor(web3: Web3, network: BlockchainNetworkId) {
    super(web3, network)
  }

  /**
   * Name of contract
   */
  public getName(): string {
    return 'AETH'
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

  balanceOf(address: string): Promise<BN> {
    return this.getContract().methods.balanceOf(address).call()
  }

  totalSupply(): Promise<BN> {
    return this.getContract().methods.totalSupply().call()
  }
}
