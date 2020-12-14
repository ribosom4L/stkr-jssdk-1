import * as BN from 'bn.js'
import { Contract, SendOptions } from 'web3-eth-contract'
import { EventLog, PromiEvent } from 'web3-core'

export interface IAnkrETH {
  ratio(): Promise<BN>

  tokenPrice(): Promise<number>

  totalSupply(): Promise<BN>

  balanceOf(address: string): Promise<BN>
}

export interface IGlobalPool {
  stake(options: SendOptions): PromiEvent<Contract>

  claim(options?: SendOptions): PromiEvent<Contract>

  unstake(options?: SendOptions): PromiEvent<Contract>

  claimableBalance(address: string): Promise<BN>
}

export interface ContractEvent<T> extends EventLog{
  returnValues: T
}

export interface SubscribeEvent<T> {
  on(
    type: 'data',
    handler: (receipt: ContractEvent<T>) => void
  );
}

export interface PoolOngoing {
  pool: string
}

export interface ProviderExited {
  provider: string
}

export interface ProviderToppedUpAnkr {
  provider: string,
  amount: number
}

export interface ProviderToppedUpEth {
  provider: string,
  amount: number
}

export interface ProviderSlashedAnkr {
  provider: string,
  ankrAmount: number,
  etherEquivalence: string
}

export interface ProviderSlashedEth {
  provider: string,
  amount: number
}

export interface RewardClaimed {
  staker: string,
  amount: number
}

export interface StakeConfirmed {
  staker: string,
  amount: number
}

export interface StakePending {
  staker: string,
  amount: number
}

export interface StakeRemoved {
  staker: string,
  amount: number
}
