import { providers, Contract } from 'ethers'
import { to, value, gasPrice, gasLimit } from './constants'

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
  const rifToken = new Contract('0x19f64674d8a5b4e652319f5e239efd3bc969a1fe', [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ]).connect(signer)

  async function doAndLog(promise: Promise<any>) {
    const result = await promise
    console.log(result)
    return promise
  }

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
