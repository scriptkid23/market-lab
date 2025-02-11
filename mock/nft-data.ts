import type { NFT } from "@/store/nftStore";

export const mockNFTData: NFT[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Hamlet Contemplates ...",
    description:
      "A digital masterpiece capturing the essence of Shakespeare's Hamlet in a contemporary setting.",
    creator: "SalvadorDali",
    likes: 100,
    price: "4.69",
    chainType: "BSC",
    status: "available",
    type: "art",
    transactionHistory: [],
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Mona Lisa Reimagined",
    description:
      "A futuristic interpretation of the classic Mona Lisa, blending traditional art with AI-generated elements.",
    creator: "LeonardoAI",
    likes: 85,
    price: "3.14",
    chainType: "ETH",
    status: "sold",
    type: "art",
    transactionHistory: [],
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Crypto Punk #3000",
    description:
      "A rare Crypto Punk NFT, part of the revolutionary collection that sparked the NFT movement.",
    creator: "LarvaLabs",
    likes: 250,
    price: "32.5",
    chainType: "ETH",
    status: "available",
    type: "collectible",
    transactionHistory: [],
  },
];
