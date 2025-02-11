"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNFTStore } from "@/store/nftStore";
import { useMultiUserStore } from "@/store/userStore";

export function NFTFilter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filters, setFilters } = useNFTStore();
  const { activeAccount } = useMultiUserStore();

  const toggleStatus = (value: string) => {
    const updatedStatus = filters.status.includes(value)
      ? filters.status.filter((s) => s !== value)
      : [...filters.status, value];
    setFilters({ status: updatedStatus });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-8 transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search NFTs..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="pl-10 bg-gray-800 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden w-full"
        >
          {isExpanded ? "Hide Filters" : "Show Filters"}
          {isExpanded ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </Button>
      </div>

      <div
        className={`mt-4 space-y-4 ${isExpanded ? "block" : "hidden md:block"}`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price Range (ETH)
          </label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={100}
              step={0.1}
              value={filters.priceRange}
              onValueChange={(value) =>
                setFilters({ priceRange: value as [number, number] })
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{filters.priceRange[0].toFixed(1)} ETH</span>
              <span>{filters.priceRange[1].toFixed(1)} ETH</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <Checkbox
                id="status-available"
                checked={filters.status.includes("available")}
                onCheckedChange={() => toggleStatus("available")}
              />
              <label
                htmlFor="status-available"
                className="ml-2 text-sm text-gray-300"
              >
                Available
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="status-sold"
                checked={filters.status.includes("sold")}
                onCheckedChange={() => toggleStatus("sold")}
              />
              <label
                htmlFor="status-sold"
                className="ml-2 text-sm text-gray-300"
              >
                Sold
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            NFT Type
          </label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ type: value })}
          >
            <SelectTrigger className="w-full bg-gray-800 text-white">
              <SelectValue placeholder="Select NFT type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="collectible">Collectible</SelectItem>
              <SelectItem value="game">Game</SelectItem>
              <SelectItem value="music">Music</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeAccount && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Favorites
            </label>
            <div className="flex items-center justify-between">
              <label htmlFor="show-favorites" className="text-sm text-gray-300">
                Show only favorites
              </label>
              <Switch
                id="show-favorites"
                checked={filters.showFavorites}
                onCheckedChange={(checked) =>
                  setFilters({ showFavorites: checked })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
