import Web3 from 'web3'
import ContractFactory from './contract_factory'


export default class Stkr {
  readonly contracts: ContractFactory

  constructor(readonly web3: Web3, network: string) {
    this.contracts = new ContractFactory(web3, network)

    // TODO: Api implementation
  }
}
