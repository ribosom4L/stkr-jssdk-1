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
   *  @vote Minimal voting amount is 5M Ankr. Minimal amount must be calculated according to deposited amount
  */
  vote(proposalId: string, vote: string, options?: SendOptions): Promise<any> {
    return this.contracts.governance.vote(proposalId, vote, options);
  }

  /**
   * @param timeSpan 1-7 days
   */
  propose(timeSpan: number, topic: string, content: string, options?: SendOptions): Promise<any> {
    return this.contracts.governance.propose(timeSpan, topic, content, options);
  }

  proposal(proposalId: string) {
    return this.contracts.governance.proposal(proposalId);
  }

  /**
   * Goerli only
   */
  faucet() {
    return this.contracts.ankr.faucet();
  }
}

export * from './types';
export * from './events';
