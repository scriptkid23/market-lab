"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { useEffect } from "react";
import { useMultiUserStore } from "@/store/userStore";

export function WalletConnect({
  isMobile = false,
  onBalanceChange,
}: {
  isMobile?: boolean;
  onBalanceChange?: (balance: string | undefined) => void;
}) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  const { setActiveAccount } = useMultiUserStore();

  // Update active account in store when connection status changes
  useEffect(() => {
    if (isConnected && address) {
      setActiveAccount(address);
    } else {
      setActiveAccount(null);
    }
  }, [isConnected, address, setActiveAccount]);

  // Notify parent component about balance changes
  useEffect(() => {
    if (onBalanceChange) {
      onBalanceChange(balance?.formatted);
    }
  }, [balance, onBalanceChange]);

  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        isConnecting,
        show,
        hide,
        address: connectKitAddress,
        ensName,
      }) => {
        const displayAddress =
          ensName ||
          (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "");

        return (
          <Button
            variant="outline"
            className={`${
              isMobile ? "w-full justify-start" : "hidden sm:flex"
            } gap-2 items-center`}
            onClick={show}
            disabled={isConnecting}
          >
            <WalletIcon className="h-4 w-4" />
            {isConnected ? (
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-sm truncate max-w-[150px]">
                  {displayAddress}
                </span>
                {balance && (
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
                    {Number(balance.formatted).toFixed(4)} {balance.symbol}
                  </span>
                )}
              </div>
            ) : (
              "Connect Wallet"
            )}
            {isConnected && (
              <span
                className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  chainId === sepolia.id
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {chainId === sepolia.id ? "Sepolia" : "Wrong Network"}
              </span>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
