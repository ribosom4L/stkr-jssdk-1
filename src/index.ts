import { MetaMaskProvider } from './metamask'
import { KeyProvider, ProviderConfig } from './provider'

class StkrSdk {

  static async factoryWithMetaMask(providerConfig: ProviderConfig): Promise<StkrSdk> {
    const provider = new MetaMaskProvider(providerConfig)
    await provider.connect()
    return new StkrSdk(provider)
  }

  constructor(private keyProvider: KeyProvider) {
  }


}

export default StkrSdk
