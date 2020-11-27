import Web3 from 'web3'
import { ContractFactory } from './contract_factory'
import { Contract, SendOptions } from 'web3-eth-contract'
import { PromiEvent } from 'web3-core'
import * as BN from 'bn.js'

export interface StkrInterface {
  stake(options: SendOptions): PromiEvent<Contract>
  unstake(options?: SendOptions): PromiEvent<Contract>
  claim(options?: SendOptions): PromiEvent<Contract>
  claimableBalance(address: string): Promise<number>
  aETHPrice(): Promise<number>
}

export class Stkr implements StkrInterface {
  readonly contractFactory: ContractFactory

  constructor(readonly web3: Web3, network: string) {
    this.contractFactory = new ContractFactory(web3, network)
  }

  /**
   * @param contractName
   * @return Contract
   */
  public getContract(contractName: string): Contract {
    return this.contractFactory.getContract(contractName)
  }

  /**
   * Stake given amount for user
   * @param options
   */
  public stake(options: SendOptions): PromiEvent<Contract> {
    return this.getContract(this.contractFactory.GlobalPool).methods['stake']().send(options)
  }

  /**
   * Claim user's rewards
   * @param options
   */
  public claim(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract(this.contractFactory.GlobalPool).methods['claim']().send(options)
  }

  /**
   * Unstake user's pending balance
   * @param options
   */
  public unstake(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract(this.contractFactory.GlobalPool).methods['unstake']().send(options)
  }

  /**
   * Get current aeth price as ethereum
   */
  public async aETHPrice(): Promise<number> {
    const ratio: BN = await this.getContract(this.contractFactory.AETH).methods['ratio']().call()

    return Number((1 / Number(this.web3.utils.fromWei(ratio))).toFixed(2))
  }

  /**
   * Get claimable balance of user
   * @param address
   */
  public async claimableBalance(address: string): Promise<number> {
    const balance: BN = await this.getContract(this.contractFactory.GlobalPool)
      .methods['claimableRewardOf'](address)
      .call()

    return Number(this.web3.utils.fromWei(balance))
  }
}
