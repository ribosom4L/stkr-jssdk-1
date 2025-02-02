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

export interface IGovernance {
  propose(timeSpan: number, topic: string, content: string, options?: SendOptions): PromiEvent<Contract>

  vote(proposalId: string, vote: string, options?: SendOptions): PromiEvent<Contract>
}

export interface IERC20 {
  totalSupply(): Promise<BN>

  balanceOf(address: string): Promise<BN>

  allowance(owner: string, spender: string): Promise<string>

  approve(address: string, amount: string, options?: SendOptions): PromiEvent<Contract>
}

export interface ContractEvent<T> extends EventLog {
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

export interface ProposalFinished {
  ID: string,
  accepted: boolean,
  blockNumber: number
}

export interface Vote {
  holder: string,
  ID: string,
  vote: string,
  votes: number
}

export interface Propose {
  proposer: string;
  proposeID: string;
  topic: string;
  content: string;
  span: number;
}

export enum ProposalStatus {
  WAITING = '0',
  VOTING = '1',
  FAIL = '2',
  PASS = '3'
}

export interface Proposal {
  yes: string,
  no: string,
  topic: string,
  content: string,
  status: ProposalStatus,
  startTime: string
  endTime: string
}

export enum BlockchainNetworkId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  dev = 2018,
  classic = 61,
  mordor = 63,
  kotti = 6,
}

export type BlockchainNetworkName =
  'mainnet' |
  'ropsten' |
  'rinkeby' |
  'goerli' |
  'dev' |
  'classic' |
  'mordor' |
  'kotti';

export enum VoteStatus {
  NO = "0x564f54455f4e4f", // web3.utils.fromAscii("VOTE_NO")
  YES = "0x564f54455f594553" // web3.utils.fromAscii("VOTE_YES")
}
