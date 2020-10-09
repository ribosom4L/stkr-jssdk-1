import Web3 from 'web3'
import { BN } from 'ethereumjs-util'
import { JsonRpcResponse } from 'web3-core-helpers'

import { bytesToHex, numberToHex } from 'web3-utils'

export interface ProviderConfig {
  networkId: string,
  chainId: string,
  microPoolContract: string,
  ankrContract: string
}

export interface SendOptions {
  data: string,
  gasLimit: BN
  value: BN,
}

export abstract class KeyProvider {

  protected constructor(protected providerConfig: ProviderConfig) {
  }

  abstract connect(): Promise<void>;

  abstract close(): Promise<void>;

  abstract findAccounts(): Promise<string[]>;

  async isGranted(address: string | undefined = undefined) {
    const accounts = await this.findAccounts()
    if (!Array.isArray(accounts)) {
      throw new Error('Accounts should have array type')
    } else if (address === undefined) {
      return accounts.length > 0
    }
    return accounts.indexOf(address) >= 0
  }

  abstract sign(data: Buffer | string | object, address: string): Promise<string>;

  abstract send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>;
}
