import React from 'react'
import './App.css'

import StkrSdk from './src/index'

interface Props {
}

interface State {
  sdk?: StkrSdk | null
}

//{
//   ankrContract: '0xb5Bb4478C8c5e6173214a033Bdbe1467258D7c62',
//   micropoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
//   providerContract: '0xd65bd6Bc26e5569874B0B92a861db8caC4C22C7a',
//   stakingContract: '0x9cf775A22688616609F00570E9B025aB2865cB4a',
//   governanceContract: '0x3FBe933E01448F67B0ED5D6af3477fEBB452A753',
//   AETHContract: '0x025433da1D9100A34E83F7FDc6A2B662dEf69514'
// }

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  renderBody() {
    const sdk = this.state.sdk;
    if (!sdk) throw new Error('sdk not initialized');
    return (
      <div>
        <pre>Address: {sdk.getKeyProvider().currentAccount()}</pre>
        <pre>Chain: {sdk.getKeyProvider().currentChain()}</pre>
        <pre>Network: {sdk.getKeyProvider().currentNetwork()}</pre>
        <br/>
        <button onClick={async () => {
          const name = prompt('Micro pool name');
          if (!name) return;
          const txHash = await sdk?.createMicroPool(name);
          alert(`TxHash: ${txHash}`);
        }}>
          CREATE MICRO POOL
        </button>
        <button onClick={async () => {
          const poolIndex = prompt('Pool Index');
          if (!poolIndex) return;
          const poolDetails = await sdk?.getMicroPool(poolIndex);
          alert(`TxHash: ${JSON.stringify(poolDetails)}`);
        }}>
          GET MICRO POOL
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.state?.sdk ? this.renderBody() : null}
            <hr/>
          </div>
          <button onClick={async () => {
            const stkr = await StkrSdk.factoryWithMetaMask({
              networkId: '5',
              chainId: '5'
            }, {
              microPoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
              ankrContract: ''
            })
            this.setState((prev, props) => ({
              sdk: stkr
            }))
          }}>
            CONNECT
          </button>
        </header>
      </div>
    )
  }
}

export default App
