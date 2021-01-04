import Web3 from 'web3'
import ContractFactory from './ContractFactory'
import { BlockchainNetworkId } from './types'
import { SendOptions } from 'web3-eth-contract'
import * as BN from 'bn.js'


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

  getProposalInfo(proposalId: string) {
    return this.contracts.governance.proposal(proposalId);
  }

  /**
   * Goerli only
   */
  faucet(options?: SendOptions) {
    return this.contracts.ankr.faucet(options);
  }

  /**
   * Goerli only
   */
  faucet5m(options?: SendOptions) {
    return this.contracts.ankr.faucet5m(options);
  }

  setAnkrAllowance(amount: string, options?: SendOptions) {
    return this.contracts.ankr.approve(this.contracts.ankr.getAddresses()['AnkrDeposit'], amount, options);
  }

  getAnkrAllowance(owner: string, spender: string): Promise<BN> {
    return this.contracts.ankr.allowance(owner, spender);
  }
}

export * from './types';
export * from './events';
