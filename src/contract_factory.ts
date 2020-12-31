import Web3 from 'web3'
import { Contract, EventOptions, SendOptions } from 'web3-eth-contract'
import { PromiEvent } from 'web3-core'
import * as BN from 'bn.js'
import { IGlobalPool, IAnkrETH, SubscribeEvent, IGovernance } from './interfaces'
import { GlobalPoolEvents } from './events'

export abstract class BaseContract {
  readonly addresses: any

  protected web3ContractInstance

  constructor(protected web3: Web3, network: string) {
    const addressPath = '../contract/addresses/' + network + '.json'
    // Get contract addresses
    // eslint-disable-next-line
    this.addresses = require('../contract/addresses/' + network + '.json')
  }

  /**
   * Get given contract for instance network
   * @param contractName
   */
  public getContract(): Contract {

    const contractName = this.getName()

    if (this.web3ContractInstance) return this.web3ContractInstance

    const address = this.addresses[contractName]
    this.web3ContractInstance = new this.web3.eth.Contract(require('../contract/' + contractName + '.json'), address)

    return this.web3ContractInstance
  }

  abstract getName(): string;

  public getWeb3ContractInstance(): Contract {
    return this.web3ContractInstance
  }
}

export class AnkrETH extends BaseContract implements IAnkrETH {

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

export class GlobalPool extends BaseContract implements IGlobalPool {

  readonly events: GlobalPoolEvents

  constructor(web3: Web3, network: string) {
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

export class Governance extends BaseContract implements IGovernance {

  readonly events: GlobalPoolEvents

  constructor(web3: Web3, network: string) {
    super(web3, network)

    this.events = new GlobalPoolEvents(this.getContract())
  }

  getName(): string {
    return 'Governance'
  }

  vote(proposalId: string, vote: string, options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.vote(proposalId, vote).send(options)
  }

  propose(timeSpan: number, topic: string, content: string, options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.propose(timeSpan, topic, content).send(options)
  }
}

export default class ContractFactory {
  readonly ankrETH: AnkrETH
  readonly globalPool: GlobalPool
  readonly governance: Governance

  constructor(web3: Web3, chain: string | number) {
    switch (String(chain)) {
      case "5":
        chain = "goerli"
        break;
      case "0":
        chain = "mainnet"
        break;
    }

    this.ankrETH = new AnkrETH(web3, String(chain))
    this.globalPool = new GlobalPool(web3, String(chain))
    this.governance = new Governance(web3, String(chain))
  }
}
