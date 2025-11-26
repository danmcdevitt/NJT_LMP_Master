// Site constants - customize these for your project
// For affiliate sites, these values should be set via environment variables or a config file

export const SITE_CONFIG = {
  name: "Not Just Travel - Expert Holiday Planning",
  description: "Expert travel agent providing personalized holiday planning services. Award-winning customer service with 5-star reviews. We work with all the leading travel brands to create your perfect holiday experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.notjusttravel.com",
  // Affiliate/Agent Information - These should be dynamically set per affiliate
  // Placeholder content for main branch - will be replaced with dynamic values when handed off
  agentName: process.env.NEXT_PUBLIC_AGENT_NAME || "Not Just Travel",
  phone: process.env.NEXT_PUBLIC_AGENT_PHONE || "01202 978219",
  phoneFormatted: process.env.NEXT_PUBLIC_AGENT_PHONE_FORMATTED || process.env.NEXT_PUBLIC_AGENT_PHONE?.replace(/\s/g, "") || "01202978219",
  email: process.env.NEXT_PUBLIC_AGENT_EMAIL || "jane.smith@notjusttravel.com",
  agentImage: process.env.NEXT_PUBLIC_AGENT_IMAGE || "/images/NJteam.jpg",
  abtaNumber: process.env.NEXT_PUBLIC_ABTA_NUMBER || "K9413",
};
