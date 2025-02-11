import { Twitter, Github, DiscIcon as Discord } from "lucide-react"
import Link from "next/link"

interface SocialIconProps {
  url: string
  platform?: "twitter" | "github" | "discord"
}

export function SocialIcon({ url, platform }: SocialIconProps) {
  const getIcon = () => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "github":
        return <Github className="h-5 w-5" />
      case "discord":
        return <Discord className="h-5 w-5" />
      default:
        return <Twitter className="h-5 w-5" />
    }
  }

  return (
    <Link
      href={url}
      className="text-gray-400 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {getIcon()}
    </Link>
  )
}

