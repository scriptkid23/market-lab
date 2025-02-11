"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FavoriteButton } from "@/components/favorite-button";

interface NFTCardProps {
  id: string;
  imageUrl: string;
  title: string;
  creator: string;
  likes: number;
  price: string;
  chainType?: "BSC" | "ETH";
  status: "available" | "sold";
}

export function NFTCard({
  id,
  imageUrl,
  title,
  creator,
  likes,
  price,
  chainType = "BSC",
  status,
}: NFTCardProps) {
  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement buy functionality here
    console.log("Buy Now clicked for NFT:", id);
  };

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
            <FavoriteButton nftId={id} />
            {/* Status Badge */}
            <div
              className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-medium ${
                status === "available"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
            {/* Buy Now Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
              <Button
                variant="secondary"
                className="bg-white/90 text-black hover:bg-white z-10"
                disabled={status === "sold"}
                onClick={handleBuyNowClick}
              >
                {status === "available" ? "Buy Now" : "Sold"}
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
                  {price} ETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
