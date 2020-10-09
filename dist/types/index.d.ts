import { KeyProvider, ProviderConfig } from './provider';
import { ContractConfig, ContractManager } from './contract';
declare class StkrSdk {
    private _keyProvider;
    private _contractManager;
    static factoryWithMetaMask(providerConfig: ProviderConfig, contractConfig: ContractConfig): Promise<StkrSdk>;
    constructor(_keyProvider: KeyProvider, _contractManager: ContractManager);
    createMicroPool(name: string): Promise<string>;
}
export default StkrSdk;
