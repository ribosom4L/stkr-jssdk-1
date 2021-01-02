import Web3 from 'web3'
import ContractFactory from './ContractFactory'
import { BlockchainNetworkId } from './types'
import { SendOptions } from 'web3-eth-contract'


export default class Stkr {
  readonly contracts: ContractFactory

  constructor(readonly web3: Web3, networkId: BlockchainNetworkId) {
    this.contracts = new ContractFactory(web3, networkId)

    // TODO: Api implementation
  }

  /**
   *  @vote Minimal voting amount is 5M ankr. Minimal amount must be calculated according to deposited amount
   */
  vote(proposalId: string, vote: string, options?: SendOptions) {
    return this.contracts.governance.getContract().methods.vote(proposalId, vote).send(options)
  }

  /**
   * @param timeSpan 1-7 days
   */
  propose(timeSpan: number, topic: string, content: string, options?: SendOptions) {
    return this.contracts.governance.getContract().methods.propose(timeSpan, topic, content).send(options)
  }
}

export * from './types';
