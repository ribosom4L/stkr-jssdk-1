import { MetaMaskProvider } from './metamask'
import { KeyProvider, ProviderConfig } from './provider'
import { ContractConfig, ContractManager } from './contract'

interface ProviderEntity {
}

interface MicroPoolEntity {
}

class StkrSdk {

  static async factoryWithMetaMask(
    providerConfig: ProviderConfig,
    contractConfig: ContractConfig
  ): Promise<StkrSdk> {
    const keyProvider = new MetaMaskProvider(providerConfig)
    await keyProvider.connect()
    const contractManager = new ContractManager(keyProvider, contractConfig)
    return new StkrSdk(keyProvider, contractManager)
  }

  constructor(private keyProvider: KeyProvider, private contractManager: ContractManager) {
  }

  public async getProviders(): Promise<ProviderEntity[]> {
    return [];
  }

  public async getMicroPools(): Promise<MicroPoolEntity[]> {
    return [];
  }

  public async createMicroPool(name: string): Promise<string> {
    const txHash = await this.contractManager.initializePool(name)
    console.log(`created new micro pool, tx hash is ${txHash}`)
    return txHash
  }

  public async getMicroPool(poolIndex: string | number): Promise<any> {
    const result = await this.contractManager.poolDetails(`${poolIndex}`)
    console.log(`fetched micro pool details, result is ${result}`)
    return result
  }

  public getKeyProvider(): KeyProvider {
    return this.keyProvider
  }

  public getContractManager(): ContractManager {
    return this.contractManager
  }
}

export default StkrSdk
