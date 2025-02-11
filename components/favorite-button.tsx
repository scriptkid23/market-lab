import type React from "react";
import { Heart } from "lucide-react";
import { useMultiUserStore, useActiveUserState } from "@/store/userStore";

interface FavoriteButtonProps {
  nftId: string;
  likes: number;
}

export function FavoriteButton({ nftId, likes }: FavoriteButtonProps) {
  const { activeAccount, addFavorite, removeFavorite } = useMultiUserStore();
  const activeUserState = useActiveUserState();
  const isFavorite = activeUserState?.favorites.includes(nftId) || false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeAccount) {
      alert("Please connect your wallet to add favorites.");
      return;
    }
    if (isFavorite) {
      removeFavorite(activeAccount, nftId);
    } else {
      addFavorite(activeAccount, nftId);
    }
  };

  return (
    <button
      className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm cursor-pointer z-10"
      onClick={handleFavoriteClick}
    >
      <Heart
        className={`h-4 w-4 ${
          isFavorite ? "text-red-500 fill-red-500" : "text-white"
        }`}
      />
      <span className="text-xs font-medium text-white">{likes}</span>
    </button>
  );
}
