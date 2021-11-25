import React, { useState } from 'react';
import './App.css';

import { rLogin } from './rLogin'
import { EthersTransactions, Transactions } from './lib'
import { to, value, gasPrice, gasLimit } from './constants'

const TransactionsComponent: React.FC<{ transactions: Transactions }> = ({ transactions }) => <>
  <h3>RBTC transactions</h3>
  <p>to: {to} - value: {value} wei</p>
  <p>Send a transaction</p>
  <p><button onClick={transactions.sendTransaction}>send RBTC</button></p>
  <p><button onClick={transactions.sendTransactionWithGasPrice}>Send RBTC with custom gas price ({gasPrice})</button></p>
  <p><button onClick={transactions.sendTransactionWithGasLimit}>Send RBTC with custom gas limit ({gasLimit})</button></p>
  <h3>RIF transactions</h3>
  <p><button onClick={transactions.sendRIF}>send RIF</button></p>
  <p><button onClick={transactions.sendRIFWithGasPrice}>Send RIF with custom gas price ({gasPrice})</button></p>
  <p><button onClick={transactions.sendRIFWithGasLimit}>Send RIF with custom gas limit ({gasLimit})</button></p>
</>

function App() {
  const [state, setState] = useState<{
    address: string
    chainId: string
    provider: any
  }>({
    address: '',
    chainId: '',
    provider: null
  })

  const connect = async () => {
    const { provider } = await rLogin.connect()

    const [accounts, chainId] = await Promise.all([
      provider.request({ method: 'eth_accounts' }),
      provider.request({ method: 'eth_chainId' })
    ])

    setState({ address: accounts[0], chainId, provider })
  }

  if (!state.provider) {
    return <div className="App">
      <h1>Welcome to rLogin</h1>
      <button onClick={connect}>connect</button>
    </div>
  }

  const ethersTransactions = EthersTransactions(state.provider)

  return (
    <div className="App">
      <h1>Welcome to rLogin</h1>
      {state.provider && <>
        <p>Address: {state.address}</p>
        <p>Chain id: {state.chainId}</p>
        <hr />
        <h2>Using <code>ethers</code></h2>
        <TransactionsComponent transactions={ethersTransactions} />
        <hr />
        <h2>Using <code>web3.js</code></h2>
        <hr />
        <h2>Using directly the <code>provider</code></h2>
      </>}
    </div>
  );
}

export default App;
