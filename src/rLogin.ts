import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider'
import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider'
import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider'

const rpcUrls = {
  30: 'https://public-node.rsk.co',
  31: 'https://public-node.testnet.rsk.co'
}

export const rLogin = new RLogin({
  providerOptions: {
    'custom-ledger': ledgerProviderOptions,
    'custom-dcent': dcentProviderOptions,
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: 'https://rsksmart.github.io/rLogin-web3-clients-compatibility-tests/',
      }
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        bridge: "https://walletconnect-bridge.rifos.org/",
        rpc: rpcUrls
      }
    }
  },
  supportedChains: Object.keys(rpcUrls).map(Number),
  rpcUrls
})
