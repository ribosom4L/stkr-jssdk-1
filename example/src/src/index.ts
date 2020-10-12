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

  static async factoryDefault(stkrConfig: StkrConfig): Promise<StkrSdk> {
    const apiGateway = new ApiGateway(stkrConfig.gatewayConfig)
    return new StkrSdk(stkrConfig, apiGateway)
  }

  private keyProvider: KeyProvider | null = null
  private contractManager: ContractManager | null = null

  constructor(
    private stkrConfig: StkrConfig,
    private apiGateway: ApiGateway
  ) {
  }

  public async connectMetaMask() {
    const metaMaskProvider = new MetaMaskProvider(this.stkrConfig.providerConfig)
    await metaMaskProvider.connect()
    const contractManage = new ContractManager(metaMaskProvider, this.stkrConfig.contractConfig)
    this.keyProvider = metaMaskProvider
    this.contractManager = contractManage
  }

  public isConnected() {
    return this.keyProvider && this.contractManager;
  }

  public async disconnect() {
  }

  public async getProviders(): Promise<ProviderEntity[]> {
    return []
  }

  public async getMicroPools(): Promise<MicroPoolEntity[]> {
    return []
  }

  public async createMicroPool(name: string): Promise<string> {
    if (!this.contractManager) throw new Error('Key provider must be connected');
    const txHash = await this.contractManager.initializePool(name)
    console.log(`created new micro pool, tx hash is ${txHash}`)
    return txHash
  }

  public async getMicroPool(poolIndex: string | number): Promise<any> {
    if (!this.contractManager) throw new Error('Key provider must be connected');
    const result = await this.contractManager.poolDetails(`${poolIndex}`)
    console.log(`fetched micro pool details, result is ${result}`)
    return result
  }

  public currentAccount(): string {
    if (!this.keyProvider) return '';
    return this.keyProvider?.currentAccount();
  }

  public getKeyProvider(): KeyProvider {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    return this.keyProvider
  }

  public getContractManager(): ContractManager {
    if (!this.contractManager) throw new Error('Key provider must be connected');
    return this.contractManager
  }

  public getApiGateway(): ApiGateway {
    return this.apiGateway
  }
}
