import { IERC20 } from '../types'
import * as BN from 'bn.js'
import { BaseContract } from './BaseContract'
import { PromiEvent } from 'web3-core'
import { Contract, SendOptions } from 'web3-eth-contract'

export class ERC20Contract extends BaseContract implements IERC20 {
  protected name: string = "ERC20"

  /**
   * Name of contract
   */
  public getName(): string {
    return this.name
  }

  balanceOf(address: string): Promise<BN> {
    return this.getContract().methods.balanceOf(address).call()
  }

  totalSupply(): Promise<BN> {
    return this.getContract().methods.totalSupply().call()
  }

  /**
   * Give *amount* allowance from sender to given address
   * @param address
   * @param amount
   * @param options
   */
  approve(address: string, amount: string, options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.approve(address, amount).send(options)
  }

  /**
   * Check allowance of *spender* from account *owner*
   * @param owner
   * @param spender
   */
  allowance(owner: string, spender:string): Promise<BN> {
    return this.getContract().methods.allowance(owner, spender).call()
  }
}
