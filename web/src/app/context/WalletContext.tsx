'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

type WalletContextType = {
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  selectAccount: (address: string) => void;
};

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  
  const connect = async () => {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    const extensions = await web3Enable('Bifrost Staking App');
    
    if (extensions.length === 0) {
      alert('Please install Talisman wallet!');
      return;
    }

    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);
    if (allAccounts.length > 0) {
      setSelectedAccount(allAccounts[0]);
    }
  };

  const disconnect = () => {
    setAccounts([]);
    setSelectedAccount(null);
  };

  return (
    <WalletContext.Provider
      value={{
        accounts,
        selectedAccount,
        isConnected: !!selectedAccount,
        connect,
        disconnect,
        selectAccount: (address) => {
          const account = accounts.find(a => a.address === address);
          if (account) setSelectedAccount(account);
        }
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);