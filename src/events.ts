import * as interfaces from './interfaces'
import { Contract, PastEventOptions } from 'web3-eth-contract'

export class GlobalPoolEvents {
  constructor(private contract: Contract) {
  }

  PoolOnGoing(options: PastEventOptions): interfaces.PoolOngoing {
    return this.contract.events.PoolOnGoing(options)
  }

  ProviderExited(options: PastEventOptions): interfaces.ProviderExited {
    return this.contract.events.ProviderExited(options)
  }

  ProviderToppedUpAnkr(options: PastEventOptions): interfaces.ProviderToppedUpAnkr {
    return this.contract.events.ProviderToppedUpAnkr(options)
  }

  ProviderToppedUpEth(options: PastEventOptions): interfaces.ProviderToppedUpEth {
    return this.contract.events.ProviderToppedUpEth(options)
  }

  ProviderSlashedAnkr(options: PastEventOptions): interfaces.ProviderSlashedAnkr {
    return this.contract.events.ProviderSlashedAnkr(options)
  }

  ProviderSlashedEth(options: PastEventOptions): interfaces.ProviderSlashedEth {
    return this.contract.events.ProviderSlashedEth(options)
  }

  RewardClaimed(options: PastEventOptions): interfaces.RewardClaimed  {
    return this.contract.events.RewardClaimed(options)
  }

  StakeConfirmed(options: PastEventOptions): interfaces.StakeConfirmed {
    return this.contract.events.StakeConfirmed(options)
  }

  StakePending(options: PastEventOptions): interfaces.StakePending {
    return this.contract.events.StakePending(options)
  }

  StakeRemoved(options: PastEventOptions): interfaces.StakeRemoved {
    return this.contract.events.StakeRemoved(options)
  }
}
