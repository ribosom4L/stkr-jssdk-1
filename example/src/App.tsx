import React from 'react'
import './App.css'

import StkrSdk from '../../src/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={async () => {
          const stkr = await StkrSdk.factoryWithMetaMask({
            networkId: '5',
            chainId: '5'
          }, {
            microPoolContract: '0xB531234a8774529FbAe476e41f9C78931E78C2B8',
            ankrContract: ''
          })
        }}>
          CONNECT
        </button>
      </header>
    </div>
  )
}

export default App
