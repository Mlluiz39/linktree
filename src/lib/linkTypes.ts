import { Facebook, Globe, Instagram, MessageCircle, MonitorPlay, Palette, Youtube } from "lucide-react";
import type { ComponentType } from "react";
import type { LinkType } from "../types/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = ComponentType<any>;

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  website: "Website",
  custom: "Personalizado"
};

export const LINK_TYPE_ICONS: Record<LinkType, IconComponent> = {
  youtube: Youtube,
  instagram: Instagram,
  tiktok: MonitorPlay,
  facebook: Facebook,
  whatsapp: MessageCircle,
  website: Globe,
  custom: Palette
};

export const LINK_TYPE_COLORS: Record<LinkType, { bg: string; text: string; badge: string }> = {
  youtube: { bg: "bg-red-50", text: "text-red-600", badge: "bg-red-100 text-red-700" },
  instagram: { bg: "bg-pink-50", text: "text-pink-600", badge: "bg-pink-100 text-pink-700" },
  tiktok: { bg: "bg-slate-50", text: "text-slate-700", badge: "bg-slate-100 text-slate-700" },
  facebook: { bg: "bg-blue-50", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  whatsapp: { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  website: { bg: "bg-violet-50", text: "text-violet-600", badge: "bg-violet-100 text-violet-700" },
  custom: { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" }
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
