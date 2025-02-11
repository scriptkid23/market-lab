"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletIcon, Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-600"></div>
            <span className="text-xl font-bold">NFT GAME</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
            <Link href="/explore" className="hover:text-purple-500">
              Explore
            </Link>
            <Link href="/activity" className="hover:text-purple-500">
              Activity
            </Link>
            <Link href="/community" className="hover:text-purple-500">
              Community
            </Link>
            <Link href="/pages" className="hover:text-purple-500">
              Pages
            </Link>
            <Link href="/contact" className="hover:text-purple-500">
              Contact us
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex gap-2">
              <WalletIcon className="h-4 w-4" />
              Wallet connect
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 flex flex-col gap-4 md:hidden">
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
            <Link href="/explore" className="hover:text-purple-500">
              Explore
            </Link>
            <Link href="/activity" className="hover:text-purple-500">
              Activity
            </Link>
            <Link href="/community" className="hover:text-purple-500">
              Community
            </Link>
            <Link href="/pages" className="hover:text-purple-500">
              Pages
            </Link>
            <Link href="/contact" className="hover:text-purple-500">
              Contact us
            </Link>
            <Button variant="outline" className="w-full sm:hidden">
              <WalletIcon className="h-4 w-4 mr-2" />
              Wallet connect
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}

