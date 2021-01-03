import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { BlockchainNetworkId } from '../types'
import { Contract } from 'web3-eth-contract'
import mainnetAddresses from './addresses/mainnet.json'
import goerliAddresses from './addresses/goerli.json'

const addressesConfig = {
  [BlockchainNetworkId.mainnet]: mainnetAddresses,
  [BlockchainNetworkId.goerli]: goerliAddresses
}

export abstract class BaseContract {
  readonly addresses: Record<string, string>
  readonly abi: AbiItem[] | AbiItem

  protected web3ContractInstance

  constructor(protected web3: Web3, networkId: BlockchainNetworkId) {
    const addresses = addressesConfig[networkId]

    if (!addresses) {
      throw new Error('Contract addresses are not defined')
    }

    this.addresses = addresses
  }

  /**
   * Get given contract for instance network
   */
  public getContract(): Contract {
    const contractName = this.getName()

    if (this.web3ContractInstance) {
      return this.web3ContractInstance
    }

    const address = this.addresses[contractName]

    this.web3ContractInstance = new this.web3.eth.Contract(this.abi, address)

    return this.web3ContractInstance
  }

  protected abstract getName(): string;

  public getWeb3ContractInstance(): Contract {
    return this.web3ContractInstance
  }
}
