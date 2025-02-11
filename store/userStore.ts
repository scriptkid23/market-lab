import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define TypeScript interfaces
interface Transaction {
  id: string;
  buyer: string;
  seller: string;
  amount: number;
  timestamp: number;
}

interface TokenBalances {
  [token: string]: number;
}

interface UserState {
  walletAddress: string;
  tokenBalances: TokenBalances;
  favorites: string[];
  transactionHistory: Transaction[];
}

interface MultiUserState {
  activeAccount: string | null;
  accounts: {
    [walletAddress: string]: UserState;
  };
}

interface UserActions {
  setActiveAccount: (address: string | null) => void;
  updateTokenBalances: (address: string, balances: TokenBalances) => void;
  addFavorite: (address: string, nftId: string) => void;
  removeFavorite: (address: string, nftId: string) => void;
  addTransaction: (address: string, transaction: Transaction) => void;
  resetAccount: (address: string) => void;
  removeAccount: (address: string) => void;
}

type MultiUserStore = MultiUserState & UserActions;

// Create the store
export const useMultiUserStore = create<MultiUserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      activeAccount: null,
      accounts: {},

      // Actions
      setActiveAccount: (address) => set({ activeAccount: address }),

      updateTokenBalances: (address, balances) =>
        set((state) => ({
          accounts: {
            ...state.accounts,
            [address]: {
              ...state.accounts[address],
              tokenBalances: {
                ...state.accounts[address]?.tokenBalances,
                ...balances,
              },
            },
          },
        })),

      addFavorite: (address, nftId) =>
        set((state) => ({
          accounts: {
            ...state.accounts,
            [address]: {
              ...state.accounts[address],
              favorites: state.accounts[address]?.favorites.includes(nftId)
                ? state.accounts[address].favorites
                : [...(state.accounts[address]?.favorites || []), nftId],
            },
          },
        })),

      removeFavorite: (address, nftId) =>
        set((state) => ({
          accounts: {
            ...state.accounts,
            [address]: {
              ...state.accounts[address],
              favorites:
                state.accounts[address]?.favorites.filter(
                  (id) => id !== nftId
                ) || [],
            },
          },
        })),

      addTransaction: (address, transaction) =>
        set((state) => ({
          accounts: {
            ...state.accounts,
            [address]: {
              ...state.accounts[address],
              transactionHistory: [
                transaction,
                ...(state.accounts[address]?.transactionHistory || []),
              ],
            },
          },
        })),

      resetAccount: (address) =>
        set((state) => ({
          accounts: {
            ...state.accounts,
            [address]: {
              walletAddress: address,
              tokenBalances: {},
              favorites: [],
              transactionHistory: [],
            },
          },
        })),

      removeAccount: (address) =>
        set((state) => {
          const { [address]: _, ...remainingAccounts } = state.accounts;
          return {
            accounts: remainingAccounts,
            activeAccount:
              state.activeAccount === address ? null : state.activeAccount,
          };
        }),
    }),
    {
      name: "multi-user-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// Helper hook to get the active account's state
export const useActiveUserState = () => {
  const { activeAccount, accounts } = useMultiUserStore();
  return activeAccount ? accounts[activeAccount] : null;
};
