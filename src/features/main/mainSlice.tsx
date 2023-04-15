import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ExtendedJsonRpcProvider } from "@ethersproject/providers";
import { setWalletConnected } from "../game/gameSlice";
import { setDisableWalletModal } from "../mainframe/mainframeSlice";

type RequestParams = {
  method: string;
  params?: any[];
};

interface Ethereum {
  isConnected: () => boolean;
  request: (request: RequestParams) => Promise<any>;
  on: (event: string, callback: (value: any) => void) => void;
}

interface CustomEthereum extends Ethereum {
  selectedAddress: string | null;
  chainId: string | number | null;
  isConnected: () => boolean;
}

declare global {
  interface Window {
    ethereum: Ethereum;
    WC: any;
  }
}

export interface mainState {
  account: String,
  provider: Object,
  signer: Object
}

const initialState: mainState = {
  account: '',
  provider: {},
  signer: {}
}

const customEthereum: CustomEthereum = typeof window !== 'undefined'
  ? { ...window.ethereum, selectedAddress: null, chainId: null }
  : {
      selectedAddress: null,
      chainId: null,
      isConnected: () => {
        if (window.ethereum) {
          return window.ethereum.isConnected();
        }
        return false;
      },
      request: (request: { method: string }) => {
        if (window.ethereum) {
          return window.ethereum.request(request);
        }
        throw new Error("Ethereum is not available.");
      },
      on: (event: string, callback: (value: any) => void) => {
        if (window.ethereum) {
          window.ethereum.on(event, callback);
        }
      },
    };

export const connectMetamask = createAsyncThunk(
  "metamask/connect",
  async (_, { dispatch, getState }) => {
    const state = ((getState() as { main: mainState })).main;
    if(!state.account) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider: ExtendedJsonRpcProvider = new JsonRpcProvider(customEthereum as any) as ExtendedJsonRpcProvider;
        const account = accounts[0];
        dispatch(setWalletConnected(true))
        localStorage.setItem('account', account);
        const localStorageAccount = localStorage.getItem('account')
        dispatch(setAccount(localStorageAccount !== null ? localStorageAccount : ''))
        if(localStorage.getItem('walletconnect') !== null) {
          localStorage.removeItem('walletconnect')
        }
        window.ethereum.on('chainChanged', (chainId: number) => {
          if (provider.selectedAddress && provider.chainId !== chainId) {
            window.location.reload()
          }
        });
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            window.location.reload()
          }
        });
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: '0x89',
            rpcUrls: ["https://rpc.ankr.com/polygon"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com/"]
          }]
        });
      } catch(err) {
        console.error(err);
      }
    }
  }
);

export const connectWallet = createAsyncThunk(
  'walletConnect/connect',
  async (_, { dispatch, getState }) => {
    const state = ((getState() as { main: mainState })).main;
    try {
      const rpc = { 137: 'https://rpc.ankr.com/polygon' };
      const chainId = 137
      const provider = new WalletConnectProvider({
        rpc,
        chainId
      });
      if(provider) {
        // const web3Provider = new Web3Provider(provider)
        await provider.enable()
        window.WC = provider
        console.log(window.WC);
        localStorage.setItem('account', window.WC.accounts[0])
        dispatch(setAccount(window.WC.accounts[0]))
        dispatch(setAccountFromStorage())
        dispatch(setWalletConnected(true))
        window.WC.on('disconnect', () => {
          dispatch(disconnectAccount());
        });
        provider.on('onConnect', () => {
          window.location.reload();
        });
        provider.on('accountsChanged', (accounts: []) => {
          if (accounts.length === 0) {
            window.location.reload()
          }
        });
      }
    } catch(err) {
      window.WC = null;
      console.error('Error connecting WC:', err);
    }
  }
)

export const connectMathWallet = createAsyncThunk(
  'math/connect',
  async (_, { dispatch, getState }) => {
    const state = ((getState() as { main: mainState })).main;
    if(!state.account) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        const provider = new Web3Provider(window.ethereum, 'any')
        provider.on("network", (newNetwork, oldNetwork) => {
        });
        localStorage.setItem('account', accounts[0]);
        const localStorageAccount = localStorage.getItem('account')
        dispatch(setAccount(localStorageAccount !== null ? localStorageAccount : ''))
        if(localStorage.getItem('walletconnect') !== null) {
          localStorage.removeItem('walletconnect')
        }
        console.log(provider);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        window.ethereum.on('chainChanged', (chainId) => {
          if (address && network !== chainId) {
            window.location.reload()
          }
        });
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            window.location.reload()
          }
        });
      } catch(err) {
        console.error(err);
      }
    }
  }
)

export const connectAccount = createAsyncThunk(
  'wallets/connect',
  async (type: string, { dispatch, getState }) => {
    const state = ((getState() as { main: mainState })).main;
    switch(type) {
      case 'MetaMask': 
        await dispatch(connectMetamask());
        break;
      case 'WalletConnect':
        await dispatch(connectWallet());
        break;
      case 'MathWallet':
        await dispatch(connectMathWallet());
        break;
    }
  }
)

export const disconnectAccount = createAsyncThunk(
  "account/disconnect",
  async (_, { dispatch }) => {
    localStorage.removeItem("account");
    if (window.ethereum && window.ethereum.isConnected()) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            window.ethereum
              .request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
              .then(() => {
                window.ethereum.request({ method: "eth_accounts" }).then((newAccounts) => {
                  if (newAccounts.length === 0) {
                    console.log("Кошелек успешно отключен");
                  } else {
                    console.log("Не удалось отключить кошелек");
                  }
                });
              });
          } else {
            console.log("Кошелек уже отключен");
          }
        })
        .catch((error) => {
          console.error("Не удалось проверить состояние кошелька:", error);
        });
    }
    window.WC = null;
    localStorage.removeItem('walletconnect')
    dispatch(setDisableWalletModal(false));
    dispatch(setWalletConnected(false))
    window.location.reload()
  }
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload
    },
    setAccountFromStorage: (state) => {
      const account = localStorage.getItem("account");
      state.account = account !== null ? account : "";
    },
    setProvider: (state, action: PayloadAction<object>) => {
      state.provider = action.payload
    },
    setSigner: (state, action: PayloadAction<object>) => {
      state.signer = action.payload
    },
    disconnectAccount: (state, action: PayloadAction<object>) => {
      state.account = '';
    }
  }
})

export const { setAccount, setProvider, setSigner, setAccountFromStorage } = mainSlice.actions;

export default mainSlice.reducer;
