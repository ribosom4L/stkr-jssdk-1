import Web3 from 'web3'
import ContractFactory from './contract_factory'
import { BlockchainNetworkId } from './types'


export default class Stkr {
  readonly contracts: ContractFactory

  constructor(readonly web3: Web3, networkId: BlockchainNetworkId) {
    this.contracts = new ContractFactory(web3, networkId)

    // TODO: Api implementation
  }
}
