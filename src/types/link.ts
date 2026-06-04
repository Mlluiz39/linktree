export type LinkType =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "whatsapp"
  | "website"
  | "custom";

export type Link = {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  clicks: number;
  active: boolean;
  order: number;
  createdAt: string;
};

export type LinkDraft = Pick<Link, "title" | "url" | "type" | "active">;
