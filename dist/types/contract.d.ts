import { KeyProvider } from './provider';
export interface ContractConfig {
    microPoolContract: string;
    ankrContract: string;
}
export declare class ContractManager {
    private _keyProvider;
    private _contractConfig;
    private _microPoolContract;
    constructor(_keyProvider: KeyProvider, _contractConfig: ContractConfig);
    initializePool(name: string): Promise<string>;
    stake(poolIndex: number): Promise<string>;
    unstake(poolIndex: number): Promise<string>;
}
