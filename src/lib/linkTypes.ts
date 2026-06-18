import type { LinkType } from "../types/link";

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  website: "Web",
  custom: "Personalizado",
};

export const LINK_TYPE_ICONS: Record<LinkType, string> = {
  youtube: "play_circle",
  instagram: "photo_camera",
  tiktok: "music_note",
  facebook: "group",
  whatsapp: "chat",
  website: "language",
  custom: "link",
};

export const LINK_TYPE_OPTIONS: Array<{ value: LinkType; label: string; icon: string }> = [
  { value: "website", label: "Web", icon: "language" },
  { value: "youtube", label: "YouTube", icon: "play_circle" },
  { value: "tiktok", label: "TikTok", icon: "music_note" },
  { value: "instagram", label: "Instagram", icon: "photo_camera" },
  { value: "facebook", label: "Facebook", icon: "group" },
  { value: "whatsapp", label: "WhatsApp", icon: "chat" },
  { value: "custom", label: "Personalizado", icon: "link" },
];
