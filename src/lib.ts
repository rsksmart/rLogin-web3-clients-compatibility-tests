import { providers, Contract, utils } from 'ethers'
import Web3 from 'web3'
import { to, value, gasPrice, gasLimit } from './constants'
import { abi, address } from './rif'

async function doAndLog(promise: Promise<any>) {
  const result = await promise
  console.log(result)
  return promise
}

export interface Transactions {
  sendTransaction(): Promise<any>
  sendTransactionWithGasLimit(): Promise<any>
  sendTransactionWithGasPrice(): Promise<any>
  sendTransactionWithNoValue(): Promise<any>
  sendRIF(): Promise<any>
  sendRIFWithGasLimit(): Promise<any>
  sendRIFWithGasPrice(): Promise<any>
}

export function EthersTransactions(provider: any): Transactions {
  const signer = new providers.Web3Provider(provider).getSigner()
  const rifToken = new Contract(address, abi).connect(signer)

  function sendTransaction() {
    return doAndLog(signer.sendTransaction({
      to, value
    }))
  }

  function sendTransactionWithGasPrice() {
    return doAndLog(signer.sendTransaction({
      to, value, gasPrice
    }))
  }

  function sendTransactionWithGasLimit() {
    return doAndLog(signer.sendTransaction({
      to, value, gasLimit
    }))
  }

  function sendTransactionWithNoValue() {
    return doAndLog(signer.sendTransaction({ to }))
  }

  function sendRIF() {
    return doAndLog(rifToken.transfer(to, value))
  }

  function sendRIFWithGasPrice() {
    return doAndLog(rifToken.transfer(to, value, { gasPrice }))
  }

  function sendRIFWithGasLimit() {
    return doAndLog(rifToken.transfer(to, value, { gasLimit }))
  }

  return {
    sendTransaction,
    sendTransactionWithGasLimit,
    sendTransactionWithGasPrice,
    sendTransactionWithNoValue,
    sendRIF,
    sendRIFWithGasLimit,
    sendRIFWithGasPrice
  }
}

export function Web3Transactions(provider: any, _from: string): Transactions {
  const web3 = new Web3(provider)
  const rifToken = new web3.eth.Contract(abi as any, address)
  const from = _from.toLowerCase()

  function sendTransaction() {
    return doAndLog(web3.eth.sendTransaction({
      from, to, value
    }))
  }

  function sendTransactionWithGasPrice() {
    return doAndLog(web3.eth.sendTransaction({
      from, to, value, gasPrice
    }))
  }

  function sendTransactionWithGasLimit() {
    return doAndLog(web3.eth.sendTransaction({
      from, to, value, gas: gasLimit
    }))
  }

  function sendTransactionWithNoValue() {
    return doAndLog(web3.eth.sendTransaction({
      from, to
    }))
  }

  function sendRIF() {
    return doAndLog(rifToken.methods.transfer(to, value).send({ from }))
  }

  function sendRIFWithGasPrice() {
    return doAndLog(rifToken.methods.transfer(to, value).send({ from, gasPrice }))
  }

  function sendRIFWithGasLimit() {
    return doAndLog(rifToken.methods.transfer(to, value).send({ from, gas: gasLimit }))
  }

  return {
    sendTransaction,
    sendTransactionWithGasLimit,
    sendTransactionWithGasPrice,
    sendTransactionWithNoValue,
    sendRIF,
    sendRIFWithGasLimit,
    sendRIFWithGasPrice
  }
}

export function DirectlyProvider(provider: any, from: string): Transactions {
  const requestSendTransaction = (txPayload: any) => provider.request({
    method: 'eth_sendTransaction',
    params: [txPayload]
  })

  function sendTransaction() {
    return doAndLog(requestSendTransaction({ from, to, value }))
  }

  function sendTransactionWithGasPrice() {
    return doAndLog(requestSendTransaction({
      from, to, value, gasPrice
    }))
  }

  function sendTransactionWithGasLimit() {
    return doAndLog(requestSendTransaction({
      from, to, value, gas: gasLimit
    }))
  }

  function sendTransactionWithNoValue() {
    return doAndLog(requestSendTransaction({ from, to }))
  }

  const rifInterface = new utils.Interface(abi)

  const data = rifInterface.encodeFunctionData('transfer', [to, value])

  function sendRIF() {
    return doAndLog(requestSendTransaction({ from, to: address, data }))
  }

  function sendRIFWithGasPrice() {
    return doAndLog(requestSendTransaction({ from, to: address, data, gasPrice }))
  }

  function sendRIFWithGasLimit() {
    return doAndLog(requestSendTransaction({ from, to: address, data, gas: gasLimit }))
  }

  return {
    sendTransaction,
    sendTransactionWithGasLimit,
    sendTransactionWithGasPrice,
    sendTransactionWithNoValue,
    sendRIF,
    sendRIFWithGasLimit,
    sendRIFWithGasPrice
  }
}
