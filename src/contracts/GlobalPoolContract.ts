import { BlockchainNetworkId, IGlobalPool } from '../types'
import { GlobalPoolEvents } from '../events'
import * as GlobalPoolAbi from './abi/GlobalPool.json'
import Web3 from 'web3'
import { Contract, SendOptions } from 'web3-eth-contract'
import { PromiEvent } from 'web3-core'
import * as BN from 'bn.js'
import { BaseContract } from '../contract_factory'

export class GlobalPoolContract extends BaseContract implements IGlobalPool {
  readonly events: GlobalPoolEvents
  abi = GlobalPoolAbi as any

  constructor(web3: Web3, network: BlockchainNetworkId) {
    super(web3, network)

    this.events = new GlobalPoolEvents(this.getContract())
  }

  getName(): string {
    return 'GlobalPool'
  }

  /**
   * Stake given amount for user
   * @param options
   */
  public stake(options: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.stake().send(options)
  }

  /**
   * Claim user's rewards
   * @param options
   */
  public claim(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.claim().send(options)
  }

  /**
   * Unstake user's pending balance
   * @param options
   */
  public unstake(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.unstake().send(options)
  }

  /**
   * Get claimable balance of user
   * @param address
   */
  public async claimableBalance(address: string): Promise<BN> {
    return this.getContract()
      .methods.claimableRewardOf(address)
      .call()
  }

}
