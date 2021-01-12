import Web3 from 'web3'
import ContractFactory from './ContractFactory'
import { BlockchainNetworkId, VoteStatus } from './types'
import { SendOptions } from 'web3-eth-contract'


export default class Stkr {
  readonly contracts: ContractFactory

  constructor(readonly web3: Web3, networkId: BlockchainNetworkId) {
    this.contracts = new ContractFactory(web3, networkId)

    // TODO: Api implementation
  }
}

export * from './types';
export * from './events';
