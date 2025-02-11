"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useNFTStore } from "@/store/nftStore";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function NFTDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { nfts } = useNFTStore();
  const [nft, setNft] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );

  useEffect(() => {
    const selectedNFT = nfts.find((n) => n.id === id);
    setNft(selectedNFT);
  }, [id, nfts]);

  const handleBuy = async () => {
    setIsLoading(true);
    setTransactionStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setTransactionStatus(Math.random() > 0.5 ? "success" : "failure");
  };

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen  text-white">
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back to listings
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={nft.imageUrl || "/placeholder.svg"}
              alt={nft.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{nft.title}</h1>
            <p className="text-gray-400">{nft.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">
                {nft.currentBid} ETH
              </span>
              <span className="text-purple-500">{nft.chainType}</span>
            </div>
            <Button
              onClick={handleBuy}
              disabled={isLoading}
              className="w-full h-12 text-lg"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Buy Now"
              )}
            </Button>
            {transactionStatus && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  transactionStatus === "success"
                    ? "bg-green-800"
                    : "bg-red-800"
                }`}
              >
                {transactionStatus === "success"
                  ? "Transaction successful!"
                  : "Transaction failed. Please try again."}
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nft.transactionHistory.map((transaction: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{transaction.event}</TableCell>
                  <TableCell>{transaction.price} ETH</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
