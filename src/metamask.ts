import Web3 from 'web3'
import { bytesToHex, numberToHex } from 'web3-utils'
import { JsonRpcResponse } from 'web3-core-helpers'
import { BN } from 'ethereumjs-util'
import { KeyProvider, ProviderConfig, SendOptions } from './provider'

export class MetaMaskProvider extends KeyProvider {

  _currentAccount: string | null = null
  _web3: Web3 | null = null

  static hasInPageSupport() {
    // @ts-ignore
    return !!window.ethereum || !!window.web3
  }

  constructor(providerConfig: ProviderConfig) {
    super(providerConfig)
  }

  async connect(): Promise<void> {
    // @ts-ignore
    let ethereum: any = window.ethereum
    // @ts-ignore
    let web3: any = window.web3
    if (ethereum) {
      web3 = new Web3(ethereum)
      if (ethereum.networkVersion !== this.providerConfig.networkId) {
        throw new Error('MetaMask ethereum network mismatched, please check your MetaMask network.')
      }
      try {
        await ethereum.enable()
      } catch (error) {
        console.error(error)
        throw new Error('User denied access to account')
      }
      const unlockedAccounts = await web3.eth.getAccounts()
      if (!unlockedAccounts.length || !unlockedAccounts[0]) {
        throw new Error('Unable to detect unlocked MetaMask account')
      }
      this._currentAccount = unlockedAccounts[0]
      // @ts-ignore
      ethereum.publicConfigStore && ethereum.publicConfigStore.on('update', async ({ selectedAddress, networkVersion }) => {
        console.log('Detected MetaMask account change: ', selectedAddress, networkVersion)
        if (this._currentAccount?.toLowerCase() !== selectedAddress.toLowerCase()) {
          console.log(`You\'ve changed MetaMask account, reloading page (${this._currentAccount} != ${selectedAddress})`)
          this._currentAccount = selectedAddress
          window.location.reload()
        } else if (this.providerConfig.networkId !== networkVersion) {
          console.log(`You\'ve changed MetaMask network, reloading page (${this.providerConfig.networkId} != ${networkVersion})`)
          window.location.reload()
        }
      }) || console.warn('Unable to find Web3::publicConfigStore, page reload on account change won\'t work properly')
      setInterval(async () => {
        try {
          const accounts = await web3.eth.getAccounts()
          if (accounts.length === 0) {
            console.log('You have locked MetaMask account, reloading page')
            window.location.reload()
          }
        } catch (e) {
          console.error('Unable to fetch MetaMask accounts, looks like MetaMask locked, reloading page')
          window.location.reload()
        }
      }, 3000)
    } else if (web3) {
      /* there several providers that emulates MetaMask behavior */
      /*const {isMetaMask} = window.web3.currentProvider;
      if (isMetaMask !== true) {
        throw new Error('Invalid MetaMask configuration provided');
      }*/
      web3 = new Web3(web3.currentProvider)
      if (!web3 || web3.isConnected && !web3.isConnected()) {
        throw new Error('Invalid MetaMask configuration provided')
      }
    } else {
      throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    this._web3 = web3
    return web3
  }

  close(): Promise<void> {
    return Promise.resolve()
  }

  async findAccounts(): Promise<string[]> {
    return this._currentAccount ? [this._currentAccount] : []
  }

  async sign(data: Buffer | string | object, address: string): Promise<string> {
    if (!this._web3) throw new Error('Web3 must be initialized')
    try {
      if (typeof data === 'object') {
        // @ts-ignore
        data = bytesToHex(data)
      }
      return this._web3.eth.personal.sign(
        data, address, '', (error: Error, signature: string) => {
        }
      )
    } catch (e) {
      console.error(e)
      const message = e.message.substr(0, e.message.indexOf('\n')),
        parts = message.split(':')
      /* try to detect angry MetaMask messages */
      if (parts.length > 0) {
        /* special case for Firefox that doesn't return any errors, only extension stack trace */
        if (message.includes('@moz-extension') &&
          message.includes('Returned error: value')
        ) {
          throw new Error('User denied message signature.')
        }
        /* cases for other browsers (tested in Chrome, Opera, Brave) */
        if (
          message.includes('MetaMask') ||
          message.includes('Returned error') ||
          message.includes('RPC Error')
        ) {
          throw new Error(parts[parts.length - 1])
        }
      }
      throw e
    }
  }

  async send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse> {
    const gasPrice = await this._web3?.eth.getGasPrice()
    console.log('Gas Price: ' + gasPrice)
    const nonce = await this._web3?.eth.getTransactionCount(from)
    console.log('Nonce: ' + nonce)
    const tx = {
      chainId: numberToHex(this.providerConfig.chainId),
      data: sendOptions.data,
      value: numberToHex(sendOptions.value || new BN(0)),
      from: from,
      to: to,
      gas: numberToHex(sendOptions.gasLimit || new BN(200000))
    }
    return new Promise(async (resolve, reject) => {
      console.log('Sending transaction via Web3: ', tx)
      // @ts-ignore
      this._web3?.currentProvider?.sendAsync({
        method: 'eth_sendTransaction', params: [tx], from: from
      }, (error: Error, result: JsonRpcResponse) => {
        const { error: error2 } = result
        if (error2) {
          reject(error2)
          return
        } else if (error) {
          reject(error)
          return
        }
        resolve(result)
      }, (error: any) => {
        console.error(error)
      })
    })
  }
}
