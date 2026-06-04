import type { LinkType } from "../types/link";

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  website: "Website",
  custom: "Personalizado"
};

export const LINK_TYPE_OPTIONS: Array<{ value: LinkType; label: string }> = [
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
  { value: "custom", label: "Personalizado" }
];
