"use client";

import { useEffect } from "react";
import { NFTCard } from "@/components/nft-card";
import { NFTFilter } from "@/components/nft-filter";
import { useNFTStore } from "@/store/nftStore";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { filteredNfts, initializeNFTData } = useNFTStore();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndInitializeStore = () => {
      const storedData = localStorage.getItem("nft-store");
      if (!storedData) {
        initializeNFTData();
      }
      setIsLoading(false);
    };

    checkAndInitializeStore();
  }, [initializeNFTData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-grow p-4 sm:p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-10">
            NFTs
          </h1>

          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="w-full"
            >
              {isFilterExpanded ? "Hide Filters" : "Show Filters"}
              {isFilterExpanded ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div
              className={`w-full md:w-1/4 ${
                isFilterExpanded ? "block" : "hidden md:block"
              }`}
            >
              <NFTFilter />
            </div>
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredNfts.map((nft, index) => (
                  <NFTCard key={nft.id} {...nft} />
                ))}
              </div>
              {filteredNfts.length === 0 && (
                <p className="text-center text-gray-400 mt-8">
                  No NFTs found matching your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
