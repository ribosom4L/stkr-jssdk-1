/// <reference types="node" />
import { JsonRpcResponse } from 'web3-core-helpers/types';
import { KeyProvider, ProviderConfig, SendOptions } from './provider';
export declare class MetaMaskProvider extends KeyProvider {
    static hasInPageSupport(): boolean;
    constructor(providerConfig: ProviderConfig);
    connect(): Promise<void>;
    close(): Promise<void>;
    findAccounts(): Promise<string[]>;
    sign(data: Buffer | string | object, address: string): Promise<string>;
    send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>;
}
