import { MetaMaskProvider } from './metamask'
import { KeyProvider, ProviderConfig } from './provider'
import { ContractConfig, ContractManager } from './contract'

class StkrSdk {
  static async factoryWithMetaMask(
    providerConfig: ProviderConfig,
    contractConfig: ContractConfig
  ): Promise<StkrSdk> {
    const keyProvider = new MetaMaskProvider(providerConfig),
      contractManager = new ContractManager(keyProvider, contractConfig)
    await keyProvider.connect()
    return new StkrSdk(keyProvider, contractManager)
  }

  constructor(private _keyProvider: KeyProvider, private _contractManager: ContractManager) {}

  async createMicroPool(name: string): Promise<string> {
    const txHash = await this._contractManager.initializePool(name)
    console.log(`created new micro pool, tx hash is ${txHash}`)
    return txHash
  }
}

export default StkrSdk
