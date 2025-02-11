import { NFTCard } from "@/components/nft-card"

const nfts = [
  {
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Hamlet Contemplates ...",
    creator: "SalvadorDali",
    likes: 100,
    currentBid: "4.69 ETH",
    chainType: "BSC",
  },
  {
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Mona Lisa Reimagined",
    creator: "LeonardoAI",
    likes: 85,
    currentBid: "3.14 ETH",
    chainType: "ETH",
  },
  {
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Starry Night Pixel Art",
    creator: "VanGoghBot",
    likes: 120,
    currentBid: "5.67 ETH",
    chainType: "BSC",
  },
  {
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Abstract Emotions #42",
    creator: "ModernArtist99",
    likes: 75,
    currentBid: "2.50 ETH",
    chainType: "ETH",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-10">Featured NFTs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {nfts.map((nft, index) => (
            <NFTCard key={index} {...nft} />
          ))}
        </div>
      </div>
    </div>
  )
}

