import { BlockchainNetworkId, BlockchainNetworkName } from '../types'

const BLOCKCHAIN_NETWORK_NAMES: Record<BlockchainNetworkId, BlockchainNetworkName> = {
  [BlockchainNetworkId.mainnet]: "mainnet",
  [BlockchainNetworkId.ropsten]: "ropsten",
  [BlockchainNetworkId.rinkeby]: "rinkeby",
  [BlockchainNetworkId.goerli]: "goerli",
  [BlockchainNetworkId.dev]: "dev",
  [BlockchainNetworkId.classic]: "classic",
  [BlockchainNetworkId.mordor]: "mordor",
  [BlockchainNetworkId.kotti]: "kotti",
};

export function getNetworkName(chainId: BlockchainNetworkId) {
  return BLOCKCHAIN_NETWORK_NAMES[chainId];
}
