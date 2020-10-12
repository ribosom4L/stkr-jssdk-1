import { MetaMaskProvider } from './metamask'
import { KeyProvider } from './provider'
import { ContractManager } from './contract'
import { ApiGateway } from './gateway'
import { StkrConfig } from './config'

interface ProviderEntity {
}

interface MicroPoolEntity {
}

export class StkrSdk {

  static async factoryWithMetaMask(stkrConfig: StkrConfig): Promise<StkrSdk> {
    const keyProvider = new MetaMaskProvider(stkrConfig.providerConfig)
    await keyProvider.connect()
    const contractManager = new ContractManager(keyProvider, stkrConfig.contractConfig),
      apiGateway = new ApiGateway(stkrConfig.gatewayConfig)
    return new StkrSdk(keyProvider, contractManager, apiGateway)
  }

  constructor(
    private keyProvider: KeyProvider,
    private contractManager: ContractManager,
    private apiGateway: ApiGateway
  ) {
  }

  public async getProviders(): Promise<ProviderEntity[]> {
    return []
  }

  public async getMicroPools(): Promise<MicroPoolEntity[]> {
    return []
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

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }
}
