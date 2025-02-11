import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NFTCardProps {
  id: string;
  imageUrl: string;
  title: string;
  creator: string;
  likes: number;
  currentBid: string;
  chainType?: "BSC" | "ETH"; // Add more chain types as needed
}

export function NFTCard({
  id,
  imageUrl,
  title,
  creator,
  likes,
  currentBid,
  chainType = "BSC",
}: NFTCardProps) {
  return (
    <Link href={`/nft/${id}`} className="block">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900 p-[1px] transition-transform duration-300 hover:scale-105">
        <div className="relative rounded-2xl bg-gray-900 p-3">
          {/* Image Container with Buy Now Button */}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
            {/* Likes Counter */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">{likes}</span>
            </div>
            {/* Buy Now Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
              <Button
                variant="secondary"
                className="bg-white/90 text-black hover:bg-white"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-200 truncate mr-2">
                "{title}"
              </div>
              <span className="rounded-lg bg-indigo-600 px-2 py-1 text-xs font-medium text-white flex-shrink-0">
                {chainType}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-400 truncate">
                  {creator}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Price</div>
                <div className="text-sm font-medium text-white">
                  {currentBid} ETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
