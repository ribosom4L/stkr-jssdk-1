import StkrSdk from '../example/src/src'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', async () => {
    const stkr = await StkrSdk.factoryWithMetaMask(
      {
        networkId: '5',
        chainId: '5'
      },
      {
        microPoolContract: '',
        ankrContract: ''
      }
    )
    expect(stkr).toBeInstanceOf(StkrSdk)
  })
})
