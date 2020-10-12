import { KeyProvider } from './provider';
export interface ContractConfig {
    microPoolContract: string;
    ankrContract: string;
}
export declare class ContractManager {
    private keyProvider;
    private contractConfig;
    private microPoolContract;
    constructor(keyProvider: KeyProvider, contractConfig: ContractConfig);
    initializePool(name: string): Promise<string>;
    poolDetails(poolIndex: string): Promise<any>;
    stake(poolIndex: number): Promise<string>;
    unstake(poolIndex: number): Promise<string>;
}
