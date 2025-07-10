import type { FC } from "react"
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Github,
  Globe,
  InstagramIcon as TiktokIcon,
  PinIcon as PinterestIcon,
  RedoDotIcon as RedditIcon,
  DiscIcon as DiscordIcon,
  TwitchIcon,
  Mail,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

type SocialIconProps = {
  url: string
  size?: number
  className?: string
}

export const getSocialIcon = (url: string): LucideIcon => {
  // Check if it's an email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (emailRegex.test(url)) {
    return Mail
  }

  try {
    // Extract domain from URL
    const domain = new URL(url).hostname.toLowerCase()

    // Match domain with appropriate icon
    if (domain.includes("twitter") || domain.includes("x.com")) {
      return Twitter
    } else if (domain.includes("instagram")) {
      return Instagram
    } else if (domain.includes("facebook")) {
      return Facebook
    } else if (domain.includes("youtube")) {
      return Youtube
    } else if (domain.includes("linkedin")) {
      return Linkedin
    } else if (domain.includes("github")) {
      return Github
    } else if (domain.includes("tiktok")) {
      return TiktokIcon
    } else if (domain.includes("pinterest")) {
      return PinterestIcon
    } else if (domain.includes("reddit")) {
      return RedditIcon
    } else if (domain.includes("discord")) {
      return DiscordIcon
    } else if (domain.includes("twitch")) {
      return TwitchIcon
    } else {
      return Globe
    }
  } catch (error) {
    console.log(error)
    return Globe
  }
}

export const SocialLinkIcon: FC<SocialIconProps> = ({ url, size = 18, className = "" }) => {
  const Icon = getSocialIcon(url)
  return <Link href={url} className='flex text-gray-300 gap-2 items-center hover:text-blue-600 text-sm'><Icon size={size} className={className} />{url}</Link>
}

