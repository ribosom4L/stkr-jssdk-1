export interface GatewayConfig {
    baseUrl: string;
}
export interface BalanceReply {
    available: string;
    timestamp: number;
}
export declare type MicroPoolStatus = 'MICRO_POOL_STATUS_PENDING' | 'MICRO_POOL_STATUS_ONGOING' | 'MICRO_POOL_STATUS_COMPLETED' | 'MICRO_POOL_STATUS_CANCELED';
export interface MicroPoolReply {
    id: string;
    status: MicroPoolStatus;
    provider: string;
    name: string;
    startTime: number;
    endTime: number;
    rewardBalance: string;
    claimedBalance: string;
    compensatedBalance: string;
    providerOwe: string;
    totalStakedAmount: string;
    numberOfSlashing: number;
    nodeFee: string;
    totalSlashedAmount: string;
    validator: string;
    created: number;
}
export declare type ProviderStatus = 'PROVIDER_STATUS_ACTIVE' | 'PROVIDER_STATUS_BANNED';
export interface ProviderReply {
    id: string;
    status: ProviderStatus;
    created: number;
    banned?: number;
}
export declare class ApiGateway {
    private gatewayConfig;
    private api;
    private authorized;
    constructor(gatewayConfig: GatewayConfig);
    login(loginData: string, address: string, ttl: number): Promise<void>;
    isAuthorized(): boolean;
    logout(): Promise<void>;
    getEtheremBalance(address: string): Promise<BalanceReply>;
    getAnkrBalance(address: string): Promise<BalanceReply>;
    getMicroPools(page?: number, size?: number): Promise<MicroPoolReply[]>;
    getMicroPoolsByProvider(provider: string, page?: number, size?: number): Promise<MicroPoolReply[]>;
    getProviders(page?: number, size?: number): Promise<ProviderReply[]>;
}
