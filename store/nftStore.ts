import { mockNFTData } from "@/mock/nft-data";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface NFT {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  creator: string;
  likes: number;
  price: string;
  chainType: "BSC" | "ETH";
  status: "available" | "sold";
  type: string;
  transactionHistory: {
    event: string;
    price: string;
    from: string;
    to: string;
    date: string;
  }[];
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  status: string[];
  type: string;
}

interface NFTStore {
  nfts: NFT[];
  filteredNfts: NFT[];
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
  initializeFromMockData: () => void;
}

export const useNFTStore = create<NFTStore>()(
  persist(
    (set, get) => ({
      nfts: [],
      filteredNfts: [],
      filters: {
        search: "",
        priceRange: [0, 100],
        status: [],
        type: "",
      },
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
        get().applyFilters();
      },
      applyFilters: () => {
        const { nfts, filters } = get();
        const filtered = nfts.filter((nft) => {
          const matchesSearch =
            nft.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            nft.creator.toLowerCase().includes(filters.search.toLowerCase());
          const matchesPrice =
            Number.parseFloat(nft.price) >= filters.priceRange[0] &&
            Number.parseFloat(nft.price) <= filters.priceRange[1];
          const matchesStatus =
            filters.status.length === 0 || filters.status.includes(nft.status);
          const matchesType = !filters.type || filters.type === nft.type;

          return matchesSearch && matchesPrice && matchesStatus && matchesType;
        });
        set({ filteredNfts: filtered });
      },
      initializeFromMockData: () => {
        set({ nfts: mockNFTData, filteredNfts: mockNFTData });
        get().applyFilters();
      },
    }),
    {
      name: "nft-store", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
