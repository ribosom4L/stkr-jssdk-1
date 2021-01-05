import { BlockchainNetworkId, IGovernance, Proposal, VoteStatus } from '../types'
import { GlobalPoolEvents } from '../events'
import GovernanceAbi from './abi/Governance.json'
import Web3 from 'web3'
import { Contract, SendOptions } from 'web3-eth-contract'
import { PromiEvent } from 'web3-core'
import { BaseContract } from './BaseContract'

export class GovernanceContract extends BaseContract implements IGovernance {
  readonly events: GlobalPoolEvents
  abi = GovernanceAbi as any

  constructor(web3: Web3, network: BlockchainNetworkId) {
    super(web3, network)

    this.events = new GlobalPoolEvents(this.getContract())
  }

  getName(): string {
    return 'Governance'
  }

  vote(proposalId: string, vote: VoteStatus, options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.vote(proposalId, vote).send(options)
  }

  propose(timeSpan: number, topic: string, content: string, options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.propose(timeSpan, topic, content).send(options)
  }

  proposal(proposalId: string): Promise<Proposal> {
    return this.getContract().methods.proposal(proposalId).call()
  }
}
