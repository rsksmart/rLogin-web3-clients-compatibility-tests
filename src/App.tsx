import React, { useState } from 'react';
import './App.css';

import { rLogin } from './rLogin'
import { Transactions, EthersTransactions, Web3Transactions } from './lib'
import { to, value, gasPrice, gasLimit } from './constants'

const TransactionsComponent: React.FC<{ transactions: Transactions }> = ({ transactions }) => <>
  <h3>RBTC transactions</h3>
  <p><button onClick={transactions.sendTransaction}>send RBTC</button></p>
  <p><button onClick={transactions.sendTransactionWithGasPrice}>Send RBTC with custom gas price</button></p>
  <p><button onClick={transactions.sendTransactionWithGasLimit}>Send RBTC with custom gas limit</button></p>
  <h3>RIF transactions</h3>
  <p><button onClick={transactions.sendRIF}>send RIF</button></p>
  <p><button onClick={transactions.sendRIFWithGasPrice}>Send RIF with custom gas price</button></p>
  <p><button onClick={transactions.sendRIFWithGasLimit}>Send RIF with custom gas limit</button></p>
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

  const ethersTransactions = state.provider ? EthersTransactions(state.provider) : null
  const web3Transactions = state.provider ? Web3Transactions(state.provider, state.address) : null

  return (
    <div className="App">
      <h1>Welcome to rLogin</h1>
      <p>This app serves for testing different payloads with rLogin compatible wallets. Currently, our suit includes sending RBTC and ERC20 using different gas options</p>
      <button onClick={connect} disabled={!!state.address}>connect</button>
        <p>Address: {state.address}</p>
        <p>Chain id: {state.chainId}</p>
        <p>Transaction payload:</p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>To</td>
              <td>{to}</td>
              <td></td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{value} wei</td>
              <td>(either sending RBTC or RIF)</td>
            </tr>
            <tr>
              <td>Gas price</td>
              <td>{gasPrice}</td>
              <td>(used when clicking on "with custom gas price")</td>
            </tr>
            <tr>
              <td>Gas limit</td>
              <td>{gasLimit}</td>
              <td>(used when clicking on "with custom gas limit")</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h2>Using <code>ethers</code></h2>
        {ethersTransactions && <TransactionsComponent transactions={ethersTransactions} />}
        <hr />
        <h2>Using <code>web3.js</code></h2>
        {web3Transactions && <TransactionsComponent transactions={web3Transactions} />}
        <hr />
        <h2>Using directly the <code>provider</code></h2>
    </div>
  );
}

export default App;
