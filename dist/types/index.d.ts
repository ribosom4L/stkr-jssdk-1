import { KeyProvider } from './provider';
import { ContractManager } from './contract';
import { ApiGateway } from './gateway';
import { StkrConfig } from './config';
interface ProviderEntity {
}
interface MicroPoolEntity {
}
export declare class StkrSdk {
    private stkrConfig;
    private apiGateway;
    static factoryDefault(stkrConfig: StkrConfig): StkrSdk;
    private keyProvider;
    private contractManager;
    constructor(stkrConfig: StkrConfig, apiGateway: ApiGateway);
    connectMetaMask(): Promise<void>;
    isConnected(): ContractManager | null;
    disconnect(): Promise<void>;
    getProviders(): Promise<ProviderEntity[]>;
    getMicroPools(): Promise<MicroPoolEntity[]>;
    createMicroPool(name: string): Promise<string>;
    getMicroPool(poolIndex: string | number): Promise<any>;
    currentAccount(): string;
    getKeyProvider(): KeyProvider;
    getContractManager(): ContractManager;
    getApiGateway(): ApiGateway;
}
export {};
