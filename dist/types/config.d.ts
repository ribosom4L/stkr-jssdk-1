import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';
import { GatewayConfig } from './gateway';
export interface StkrConfig {
    providerConfig: ProviderConfig;
    contractConfig: ContractConfig;
    gatewayConfig: GatewayConfig;
}
export declare const LOCAL_CONFIG: StkrConfig;
export declare const GOERLI_CONFIG: StkrConfig;
