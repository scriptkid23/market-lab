import { create } from "zustand";

export interface NFT {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  creator: string;
  likes: number;
  currentBid: string;
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
}

const initialNfts: NFT[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Hamlet Contemplates ...",
    description:
      "A digital masterpiece capturing the essence of Shakespeare's Hamlet in a contemporary setting.",
    creator: "SalvadorDali",
    likes: 100,
    currentBid: "4.69",
    chainType: "BSC",
    status: "available",
    type: "art",
    transactionHistory: [
      {
        event: "Minted",
        price: "1.00",
        from: "Creator",
        to: "SalvadorDali",
        date: "2023-05-01",
      },
      {
        event: "Listed",
        price: "4.69",
        from: "SalvadorDali",
        to: "Marketplace",
        date: "2023-05-15",
      },
    ],
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Mona Lisa Reimagined",
    description:
      "A futuristic interpretation of the classic Mona Lisa, blending traditional art with AI-generated elements.",
    creator: "LeonardoAI",
    likes: 85,
    currentBid: "3.14",
    chainType: "ETH",
    status: "sold",
    type: "art",
    transactionHistory: [
      {
        event: "Minted",
        price: "0.50",
        from: "Creator",
        to: "LeonardoAI",
        date: "2023-04-01",
      },
      {
        event: "Sold",
        price: "3.14",
        from: "LeonardoAI",
        to: "ArtCollector123",
        date: "2023-04-30",
      },
    ],
  },
  // Add more NFTs with similar detailed information...
];

export const useNFTStore = create<NFTStore>((set, get) => ({
  nfts: initialNfts,
  filteredNfts: initialNfts,
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
        Number.parseFloat(nft.currentBid) >= filters.priceRange[0] &&
        Number.parseFloat(nft.currentBid) <= filters.priceRange[1];
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(nft.status);
      const matchesType = !filters.type || filters.type === nft.type;

      return matchesSearch && matchesPrice && matchesStatus && matchesType;
    });
    set({ filteredNfts: filtered });
  },
}));
