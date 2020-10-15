/// <reference types="node" />
import { JsonRpcResponse } from 'web3-core-helpers/types';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
export interface ProviderConfig {
    networkId: string;
    chainId: string;
}
export interface SendOptions {
    data?: string;
    gasLimit?: string;
    value?: string;
}
export declare abstract class KeyProvider {
    protected providerConfig: ProviderConfig;
    protected _currentAccount: string | null;
    protected _web3: Web3 | null;
    protected constructor(providerConfig: ProviderConfig);
    createContract(abi: AbiItem[] | AbiItem, address: string): Contract;
    abstract connect(): Promise<void>;
    abstract close(): Promise<void>;
    currentAccount(): string;
    currentChain(): string;
    currentNetwork(): string;
    abstract findAccounts(): Promise<string[]>;
    isGranted(address?: string | undefined): Promise<boolean>;
    abstract sign(data: Buffer | string | object, address: string): Promise<string>;
    abstract invoke(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>;
    abstract send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>;
    signLoginData(ttl: number): Promise<string>;
}
