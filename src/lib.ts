import { providers, Contract } from 'ethers'
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
    sendRIF,
    sendRIFWithGasLimit,
    sendRIFWithGasPrice
  }
}

export function Web3Transactions(provider: any, from: string) {
  const web3 = new Web3(provider)
  const rifToken = new web3.eth.Contract(abi as any, address)

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
    sendRIF,
    sendRIFWithGasLimit,
    sendRIFWithGasPrice
  }
}
