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
  walletAddress: string | null;
  tokenBalances: TokenBalances;
  favorites: string[];
  transactionHistory: Transaction[];
}

interface UserActions {
  setWalletAddress: (address: string | null) => void;
  updateTokenBalances: (balances: TokenBalances) => void;
  addFavorite: (nftId: string) => void;
  removeFavorite: (nftId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  resetStore: () => void;
}

type UserStore = UserState & UserActions;

// Create the store
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      walletAddress: null,
      tokenBalances: {},
      favorites: [],
      transactionHistory: [],

      // Actions
      setWalletAddress: (address) => set({ walletAddress: address }),

      updateTokenBalances: (balances) =>
        set((state) => ({
          tokenBalances: { ...state.tokenBalances, ...balances },
        })),

      addFavorite: (nftId) =>
        set((state) => ({
          favorites: state.favorites.includes(nftId)
            ? state.favorites
            : [...state.favorites, nftId],
        })),

      removeFavorite: (nftId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== nftId),
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactionHistory: [transaction, ...state.transactionHistory],
        })),

      resetStore: () =>
        set({
          walletAddress: null,
          tokenBalances: {},
          favorites: [],
          transactionHistory: [],
        }),
    }),
    {
      name: "user-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
