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
  initializeNFTData: () => void;
  updateNFTLikes: (nftId: string, increment: boolean) => void;
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
      initializeNFTData: () => {
        const state = get();
        if (state.nfts.length === 0) {
          set({ nfts: mockNFTData, filteredNfts: mockNFTData });
        }
        // If there's already data in the store, do nothing
        // The data will have been loaded from localStorage by the persist middleware
      },
      updateNFTLikes: (nftId, increment) => {
        set((state) => {
          const updatedNfts = state.nfts.map((nft) =>
            nft.id === nftId
              ? { ...nft, likes: nft.likes + (increment ? 1 : -1) }
              : nft
          );
          return { nfts: updatedNfts, filteredNfts: updatedNfts };
        });
      },
    }),
    {
      name: "nft-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
