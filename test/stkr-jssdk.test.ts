import Stkr from '../src'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import addresses from '../contract/addresses/goerli.json'
import GlobalPool from '../contract/GlobalPool.json'
import AETH from '../contract/AETH.json'
import ContractFactory from '../src/contract_factory'

jest.setTimeout(60000)

const testKey = '80e14c7c1d43c0293e4b6dcf8682b87c28832ab6b3d13ea4c4813518614865be'
const api = 'https://eth-goerli-01.dccn.ankr.com'

describe('Stkr Contract Tests', () => {
  let instance: Stkr
  let web3: Web3
  let globalPool: Contract
  let aETH: Contract

  beforeEach(() => {
    web3 = new Web3(new Web3.providers.HttpProvider(api))
    const account = web3.eth.accounts.privateKeyToAccount(testKey)
    // Add account to web3
    web3.eth.accounts.wallet.add(account)
    web3.defaultAccount = account.address

    instance = new Stkr(web3, 'goerli')

    // @ts-ignore
    globalPool = new web3.eth.Contract(GlobalPool, addresses.GlobalPool)
    // @ts-ignore
    aETH = new web3.eth.Contract(AETH, addresses.AETH)
  })

  it('Should fetch claimable balance correctly', async () => {
    const expected = Number(await globalPool.methods.claimableRewardOf(web3.defaultAccount).call())
    expect(expected).toEqual(Number(await instance.contracts.globalPool.claimableBalance(web3.defaultAccount as string)))
  })

  it('Should fetch aETH ratio correctly', async () => {
    const realRatio = await aETH.methods.ratio().call()
    const expected = 1 / Number(web3.utils.fromWei(realRatio))

    expect(await instance.contracts.ankrETH.tokenPrice()).toBe(expected)
    expect(await instance.contracts.ankrETH.ratio()).toBe(realRatio)
  })

  it('Should fetch total supply correctly', async () => {
    const supply = await aETH.methods.totalSupply().call()

    expect(await instance.contracts.ankrETH.totalSupply()).toBe(supply)
  })

  it('Should fetch balances correctly', async () => {
    const balance = await aETH.methods.balanceOf(web3.defaultAccount as string).call()

    expect(await instance.contracts.ankrETH.balanceOf(web3.defaultAccount as string)).toBe(balance)
  })

  it('should stake correctly', async () => {
    const value = web3.utils.toWei('0.5')
    const options: any = { value, from: web3.defaultAccount as string }
    options.gas = await globalPool.methods.stake().estimateGas(options)

    const tx = await instance.contracts.globalPool.stake(options)

    expect(tx.events.StakePending.returnValues.amount).toContain(value.toString())
  })

  it('should unstake correctly', async () => {
    const options: any = { value: '0', from: web3.defaultAccount as string }
    options.gas = await globalPool.methods.unstake().estimateGas(options)

    await instance.contracts.globalPool.unstake(options)
  })

})
