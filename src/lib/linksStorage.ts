import { seedLinks } from "./seedLinks";
import type { Link } from "../types/link";

const STORAGE_KEY = "linkhub.links.v1";

function isLink(value: unknown): value is Link {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.url === "string" &&
    typeof candidate.type === "string" &&
    typeof candidate.clicks === "number" &&
    typeof candidate.active === "boolean" &&
    typeof candidate.order === "number" &&
    typeof candidate.createdAt === "string"
  );
}

export function sortLinks(links: Link[]): Link[] {
  return [...links].sort((a, b) => a.order - b.order);
}

export function loadLinks(): Link[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedLinks;

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isLink)) return seedLinks;
    return sortLinks(parsed);
  } catch {
    return seedLinks;
  }
}

export function saveLinks(links: Link[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sortLinks(links)));
}
