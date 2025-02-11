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
import type { NFT } from "@/store/nftStore";
import {
  useSendTransaction,
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import type { EthereumAddressType } from "@/types";
import { TransactionTimeline } from "@/components/transaction-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NFTDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { nfts, initializeNFTData, updateNFTTransactionHistory } =
    useNFTStore();
  const [nft, setNft] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [timelineSteps, setTimelineSteps] = useState<
    {
      status: "pending" | "completed" | "processing" | "failed";
      label: string;
    }[]
  >([
    { status: "pending", label: "Initiate Purchase" },
    { status: "pending", label: "Transaction Sent" },
    { status: "pending", label: "Transaction Confirmed" },
    { status: "pending", label: "Purchase Complete" },
  ]);

  const { address } = useAccount();
  const { data: balance, refetch: refetchBalance } = useBalance({ address });
  const { sendTransactionAsync } = useSendTransaction();
  const {
    isLoading: isWaiting,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    initializeNFTData();
  }, [initializeNFTData]);

  useEffect(() => {
    const selectedNFT = nfts.find((n) => n.id === id);
    setNft(selectedNFT || null);
  }, [id, nfts]);

  useEffect(() => {
    if (isConfirmed && receipt) {
      setTransactionStatus("success");
      updateNFTStatus();
      setTimelineSteps((prev) =>
        prev.map((step, index) =>
          index <= 3 ? { ...step, status: "completed" as const } : step
        )
      );
    }
  }, [isConfirmed, receipt]);

  const resetTimeline = () => {
    setTimelineSteps([
      { status: "pending" as const, label: "Initiate Purchase" },
      { status: "pending" as const, label: "Transaction Sent" },
      { status: "pending" as const, label: "Transaction Confirmed" },
      { status: "pending" as const, label: "Purchase Complete" },
    ]);
  };

  const handleBuy = async () => {
    if (!nft || !address) return;
    if (nft.status === "sold") {
      console.error("This NFT has already been sold");
      return;
    }

    resetTimeline();
    setIsLoading(true);
    setTransactionStatus(null);
    setTransactionHash(undefined);
    setTimelineSteps((prev) =>
      prev.map((step, index) =>
        index === 0 ? { ...step, status: "completed" as const } : step
      )
    );

    try {
      const tx = await sendTransactionAsync({
        to: process.env.NEXT_PUBLIC_ADDRESS_SELLER as EthereumAddressType,
        value: parseEther(nft.price),
      });

      setTransactionHash(tx);

      setTimelineSteps((prev) =>
        prev.map((step, index) =>
          index <= 1
            ? { ...step, status: "completed" as const }
            : index === 2
            ? { ...step, status: "processing" as const }
            : step
        )
      );
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionStatus("failure");
      setIsLoading(false);
      setTimelineSteps((prev) =>
        prev.map((step, index) =>
          index === 0 ? { ...step, status: "failed" as const } : step
        )
      );
    }
  };

  const updateNFTStatus = async () => {
    if (!nft || !address) return;

    const newTransaction = {
      event: "Purchase",
      price: nft.price,
      from: process.env.NEXT_PUBLIC_ADDRESS_SELLER || "",
      to: address,
      date: new Date().toISOString(),
    };
    updateNFTTransactionHistory(nft.id, newTransaction);
    setNft((prevNft) =>
      prevNft
        ? {
            ...prevNft,
            status: "sold",
            owner: address,
            transactionHistory: [newTransaction, ...prevNft.transactionHistory],
          }
        : null
    );

    // Refetch the balance and dispatch a custom event
    const newBalance = await refetchBalance();
    if (newBalance.data) {
      window.dispatchEvent(
        new CustomEvent("balanceUpdated", { detail: newBalance.data.formatted })
      );
    }

    setIsLoading(false);
    setTimelineSteps((prev) =>
      prev.map((step) => ({ ...step, status: "completed" as const }))
    );
  };

  if (!nft) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>NFT not found</p>
      </div>
    );
  }

  const insufficientFunds =
    balance &&
    Number.parseFloat(balance.formatted) < Number.parseFloat(nft.price);

  return (
    <div className="min-h-screen text-white">
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
              <span className="text-2xl font-semibold">{nft.price} ETH</span>
            </div>
            {nft.status === "sold" ? (
              <div className="bg-gray-700 text-white p-4 rounded-md text-center">
                This NFT has already been sold
              </div>
            ) : (
              <Button
                onClick={handleBuy}
                disabled={
                  isLoading || isWaiting || !address || insufficientFunds
                }
                className="w-full h-12 text-lg"
              >
                {isLoading || isWaiting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : !address ? (
                  "Connect Wallet to Buy"
                ) : insufficientFunds ? (
                  "Insufficient Funds"
                ) : (
                  "Buy Now"
                )}
              </Button>
            )}
            {(isLoading || isWaiting || transactionStatus) && (
              <div className="mt-4 p-4 rounded-md bg-gray-800">
                <h3 className="text-lg font-semibold mb-2">Purchase Status</h3>
                <TransactionTimeline steps={timelineSteps} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {nft.transactionHistory.length > 0 ? (
                <Table className="custom-table w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Event</TableHead>
                      <TableHead className="font-semibold">Price</TableHead>
                      <TableHead className="font-semibold">From</TableHead>
                      <TableHead className="font-semibold">To</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nft.transactionHistory.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.event}</TableCell>
                        <TableCell>{transaction.price}</TableCell>
                        <TableCell>{transaction.from}</TableCell>
                        <TableCell>{transaction.to}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No transaction history available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
