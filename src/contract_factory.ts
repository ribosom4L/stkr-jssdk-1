import Web3 from 'web3'
import { join } from 'path'
import { Contract } from 'web3-eth-contract'

export class ContractFactory {
  readonly AETH = 'AETH'
  readonly GlobalPool = 'GlobalPool'

  readonly addresses: any

  readonly contracts: object = {}

  constructor(private web3: Web3, network: string) {
    // Todo: check file exists
    this.addresses = require('../contract/addresses/' + network + '.json')
  }

  /**
   * Get given contract for instance network
   * @param contractName
   */
  public getContract(contractName: string): Contract {
    // If contract created before, read from contracts object
    if (this.contracts.hasOwnProperty(contractName)) {
      return this.contracts[contractName]
    }

    const contractPath = join(__dirname, '../contract/' + contractName + '.json')

    const address = this.addresses[contractName]
    this.contracts[contractName] = new this.web3.eth.Contract(require(contractPath), address)

    return this.contracts[contractName]
  }
}
