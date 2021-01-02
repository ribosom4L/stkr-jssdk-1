import Web3 from 'web3'
import { BlockchainNetworkId } from './types'
import { AETHContract } from './contracts/AETHContract'
import { GlobalPoolContract } from './contracts/GlobalPoolContract'
import { GovernanceContract } from './contracts/GovernanceContract'

export default class ContractFactory {
  readonly ankrETH: AETHContract
  readonly globalPool: GlobalPoolContract
  readonly governance: GovernanceContract

  constructor(web3: Web3, chainId: BlockchainNetworkId) {
    this.ankrETH = new AETHContract(web3, chainId)
    this.globalPool = new GlobalPoolContract(web3, chainId)
    this.governance = new GovernanceContract(web3, chainId)
  }
}
