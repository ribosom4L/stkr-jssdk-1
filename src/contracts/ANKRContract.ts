import { BlockchainNetworkId, IAnkrETH } from '../types'
import * as ANKRAbi from './abi/ANKR.json'
import Web3 from 'web3'
import * as BN from 'bn.js'
import { ERC20Contract } from './ERC20Contract'
import { PromiEvent } from 'web3-core'
import { Contract, SendOptions } from 'web3-eth-contract'

export class ANKRContract extends ERC20Contract {
  abi = ANKRAbi as any
  name = "ANKR"


  // ** ONLY FOR TESTNET
  // Gives 100k ANKR Token
  faucet(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.faucet().send(options)
  }

  // Gives 5m ANKR Token
  faucet5(options?: SendOptions): PromiEvent<Contract> {
    return this.getContract().methods.faucet5m().send(options)
  }
}
