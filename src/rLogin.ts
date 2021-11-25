import RLogin from '@rsksmart/rlogin'
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider'
import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider'
import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider'

export const rLogin = new RLogin({
  providerOptions: {
    /*
    'custom-ledger': ledgerProviderOptions,
    'custom-dcent': dcentProviderOptions,
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: 'https://basic-sample.rlogin.identity.rifos.org/',
      }
    }*/
  },
  supportedChains: [31],
  rpcUrls: {
    31: 'https://public-node.testnet.rsk.co'
  }
})
