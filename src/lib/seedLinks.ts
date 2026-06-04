import type { Link } from "../types/link";

export const seedLinks: Link[] = [
  {
    id: "seed-youtube",
    title: "Novo video no YouTube",
    url: "https://youtube.com/@linkhub",
    type: "youtube",
    clicks: 1284,
    active: true,
    order: 0,
    createdAt: "2026-06-04T12:00:00.000Z"
  },
  {
    id: "seed-instagram",
    title: "Instagram profissional",
    url: "https://instagram.com/linkhub",
    type: "instagram",
    clicks: 864,
    active: true,
    order: 1,
    createdAt: "2026-06-04T12:01:00.000Z"
  },
  {
    id: "seed-whatsapp",
    title: "Agendar pelo WhatsApp",
    url: "https://wa.me/5500000000000",
    type: "whatsapp",
    clicks: 311,
    active: true,
    order: 2,
    createdAt: "2026-06-04T12:02:00.000Z"
  },
  {
    id: "seed-portfolio",
    title: "Portfolio completo",
    url: "https://example.com",
    type: "website",
    clicks: 92,
    active: false,
    order: 3,
    createdAt: "2026-06-04T12:03:00.000Z"
  }
];
