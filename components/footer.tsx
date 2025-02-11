import { SocialIcon } from "@/components/ui/social-icon"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8">
          <SocialIcon url="https://twitter.com" platform="twitter" />
          <SocialIcon url="https://github.com" platform="github" />
          <SocialIcon url="https://discord.com" platform="discord" />
        </div>
        <div className="text-center mt-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} NFT GAME. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

