import { Contract, EventOptions, PastEventOptions } from 'web3-eth-contract'
import {
  ContractEvent,
  PoolOngoing,
  StakeRemoved,
  StakePending,
  StakeConfirmed,
  RewardClaimed,
  ProviderSlashedEth,
  ProviderSlashedAnkr,
  ProviderToppedUpEth,
  ProviderToppedUpAnkr,
  ProviderExited,
  SubscribeEvent, ProposalFinished, Vote, Propose
} from './types'

export class EventBase {
  constructor(protected contract: Contract) {
  }
}

export class GlobalPoolEvents extends EventBase{

  async getPastPoolOnGoing(options: PastEventOptions | {}): Promise<ContractEvent<PoolOngoing>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('PoolOnGoing', options)
  }

  async getPastProviderExited(options: PastEventOptions | {}): Promise<ContractEvent<ProviderExited>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProviderExited', options)
  }

  async getPastProviderToppedUpAnkr(options: PastEventOptions | {}): Promise<ContractEvent<ProviderToppedUpAnkr>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProviderToppedUpAnkr', options)
  }

  async getPastProviderToppedUpEth(options: PastEventOptions | {}): Promise<ContractEvent<ProviderToppedUpEth>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProviderToppedUpEth', options)
  }

  async getPastProviderSlashedAnkr(options: PastEventOptions | {}): Promise<ContractEvent<ProviderSlashedAnkr>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProviderSlashedAnkr', options)
  }

  async getPastProviderSlashedEth(options: PastEventOptions | {}): Promise<ContractEvent<ProviderSlashedEth>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProviderSlashedEth', options)
  }

  async getPastRewardClaimed(options: PastEventOptions | {}): Promise<ContractEvent<RewardClaimed>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('RewardClaimed', options)
  }

  async getPastStakeConfirmed(options: PastEventOptions | {}): Promise<ContractEvent<StakeConfirmed>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('StakeConfirmed', options)
  }

  async getPastStakePending(options: PastEventOptions | {}): Promise<ContractEvent<StakePending>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('StakePending', options)
  }

  async getPastStakeRemoved(options: PastEventOptions | {}): Promise<ContractEvent<StakeRemoved>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('StakeRemoved', options)
  }

  PoolOnGoing(options: EventOptions | {}): SubscribeEvent<PoolOngoing> {
    return this.contract.events.PoolOnGoing(options)
  }

  ProviderExited(options: EventOptions | {}): SubscribeEvent<ProviderExited> {
    return this.contract.events.ProviderExited(options)
  }

  ProviderToppedUpAnkr(options: EventOptions | {}): SubscribeEvent<ProviderToppedUpAnkr> {
    return this.contract.events.ProviderToppedUpAnkr(options)
  }

  ProviderToppedUpEth(options: EventOptions | {}): SubscribeEvent<ProviderToppedUpEth> {
    return this.contract.events.ProviderToppedUpEth(options)
  }

  ProviderSlashedAnkr(options: EventOptions | {}): SubscribeEvent<ProviderSlashedAnkr> {
    return this.contract.events.ProviderSlashedAnkr(options)
  }

  ProviderSlashedEth(options: EventOptions | {}): SubscribeEvent<ProviderSlashedEth> {
    return this.contract.events.ProviderSlashedEth(options)
  }

  RewardClaimed(options: EventOptions | {}): SubscribeEvent<RewardClaimed> {
    return this.contract.events.RewardClaimed(options)
  }

  StakeConfirmed(options: EventOptions | {}): SubscribeEvent<StakeConfirmed> {
    return this.contract.events.StakeConfirmed(options)
  }

  StakePending(options: EventOptions | {}): SubscribeEvent<StakePending> {
    return this.contract.events.StakePending(options)
  }

  StakeRemoved(options: EventOptions | {}): SubscribeEvent<StakeRemoved> {
    return this.contract.events.StakeRemoved(options)
  }
}

export class GovernanceEvents extends EventBase{
  async getPastProposalFinished(options: PastEventOptions | {}): Promise<ContractEvent<ProposalFinished>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('ProposalFinished', options)
  }

  async getPastVote(options: PastEventOptions | {}): Promise<ContractEvent<Vote>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('Vote', options)
  }

  async getPastPropose(options: PastEventOptions | {}): Promise<ContractEvent<Propose>[]> {
    // @ts-ignore
    return this.contract.getPastEvents('Propose', options)
  }

  ProposalFinished(options: EventOptions | {}): SubscribeEvent<ProposalFinished> {
    return this.contract.events.ProposalFinished(options)
  }

  Vote(options: EventOptions | {}): SubscribeEvent<Vote> {
    return this.contract.events.Vote(options)
  }

  Propose(options: EventOptions | {}): SubscribeEvent<Propose> {
    return this.contract.events.Propose(options)
  }
}
