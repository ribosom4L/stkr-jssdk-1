import { KeyProvider } from './provider'
import { Contract } from 'web3-eth-contract'

const ABI_MICRO_POOL = require('./../contract/MicroPool.abi')

export interface ContractConfig {
  microPoolContract: string
  ankrContract: string
}

export class ContractManager {
  private _microPoolContract: Contract

  constructor(private _keyProvider: KeyProvider, private _contractConfig: ContractConfig) {
    this._microPoolContract = this._keyProvider.createContract(
      ABI_MICRO_POOL,
      _contractConfig.microPoolContract
    )
  }

  async initializePool(name: string): Promise<string> {
    const data: string = this._microPoolContract.methods.initializePool(name).encodeABI()
    const currentAccount = await this._keyProvider.currentAccount()
    const receipt = await this._keyProvider.send(
      currentAccount,
      this._contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }

  async stake(poolIndex: number): Promise<string> {
    const data: string = this._microPoolContract.methods.stake(poolIndex).encodeABI()
    const currentAccount = await this._keyProvider.currentAccount()
    const receipt = await this._keyProvider.send(
      currentAccount,
      this._contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }

  async unstake(poolIndex: number): Promise<string> {
    const data: string = this._microPoolContract.methods.unstake(poolIndex).encodeABI()
    const currentAccount = await this._keyProvider.currentAccount()
    const receipt = await this._keyProvider.send(
      currentAccount,
      this._contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }
}
