import Stkr from '../src'
import Web3 from 'web3'
import addresses from '../src/contracts/addresses/goerli.json'
import GlobalPool from '../src/contracts/abi/GlobalPool.json'
import Governance from '../src/contracts/abi/Governance.json'
import AETH from '../src/contracts/abi/AETH.json'
import ANKR from '../src/contracts/abi/ANKR.json'
import { BlockchainNetworkId } from '../src'

jest.setTimeout(180000)

const testKey = '80e14c7c1d43c0293e4b6dcf8682b87c28832ab6b3d13ea4c4813518614865be'
const api = 'https://eth-goerli-01.dccn.ankr.com'

describe('Stkr Contract Tests', () => {
  let instance: Stkr
  let web3: Web3
  let globalPool, aETH, governance, ankr

  beforeEach(() => {
    web3 = new Web3(new Web3.providers.HttpProvider(api))
    const account = web3.eth.accounts.privateKeyToAccount(testKey)
    // Add account to web3
    web3.eth.accounts.wallet.add(account)
    web3.defaultAccount = account.address

    instance = new Stkr(web3, BlockchainNetworkId.goerli)

    // @ts-ignore
    globalPool = new web3.eth.Contract(GlobalPool, addresses.GlobalPool)
    // @ts-ignore
    governance = new web3.eth.Contract(Governance, addresses.AETH)
    // @ts-ignore
    aETH = new web3.eth.Contract(AETH, addresses.AETH)
    // @ts-ignore
    ankr = new web3.eth.Contract(ANKR, addresses.ANKR)
  })
  //
  it('Should fetch claimable balance correctly', async () => {
    const expected = Number(await globalPool.methods.claimableRewardOf(web3.defaultAccount).call())
    expect(expected).toEqual(Number(await instance.contracts.globalPool.claimableBalance(web3.defaultAccount as string)))
  })

  it('Should fetch aETH ratio correctly', async () => {
    const realRatio = await aETH.methods.ratio().call()
    const expected = 1 / Number(web3.utils.fromWei(realRatio))
    expect(await instance.contracts.ankrETH.ratio()).toBe(realRatio)
    expect(await instance.contracts.ankrETH.tokenPrice()).toBe(expected)
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

  let proposeId

  it('should propose', async (done) => {
    const topic = "test topic"
    const content = "Test content"
    const options: any = { from: web3.defaultAccount as string, gas: "500000" }

    // claim ankr
    await ankr.methods.faucet5m().send(options)
    await ankr.methods.faucet().send(options)
    await ankr.methods.approve(addresses.Governance, web3.utils.toWei("5100000")).send(options)

    // options.gas = await governance.methods.propose(4 * 24 * 60 * 60, topic, content)

    const tx = await instance.contracts.governance.propose(4 * 24 * 60 * 60, topic, content, options)

    expect(tx.events.Propose).toBeDefined()

    proposeId = tx.events.Propose.returnValues.proposeID

    setTimeout(() => {
      console.log("Waiting 5 seconds")
      done()
    }, 5000)
  })

  it('should vote', async () => {
    const options: any = { from: web3.defaultAccount as string }
    options.gas = "250000"

    const tx = await instance.contracts.governance.vote(proposeId, web3.utils.fromAscii("VOTE_YES"), options)

    expect(tx.events.Vote).toBeDefined()
  })
})
