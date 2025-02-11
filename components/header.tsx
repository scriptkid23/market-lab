"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { WalletConnect } from "./wallet-connect";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/activity", label: "Activity" },
    { href: "/community", label: "Community" },
    // { href: "/pages", label: "Pages" },
    // { href: "/contact", label: "Contact us" },
  ];

  return (
    <header className="border-b border-gray-800 bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-600"></div>
            <span className="text-xl font-bold">NFT GAME</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-purple-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <WalletConnect onBalanceChange={setBalance} />
            {balance && (
              <div className="hidden sm:flex items-center gap-2 bg-gray-800 rounded-lg p-2">
                <Wallet className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">
                  {Number(balance).toFixed(2)} ETH
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-purple-500 transition-colors py-2"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            {isMobile && (
              <div className="mt-4">
                <WalletConnect isMobile={true} onBalanceChange={setBalance} />
              </div>
            )}
            {balance && isMobile && (
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 mt-2">
                <Wallet className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">
                  {Number(balance).toFixed(2)} ETH
                </span>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
