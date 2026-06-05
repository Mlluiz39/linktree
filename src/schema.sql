-- =============================================================================
-- LinkHub — PostgreSQL Schema for Directus
-- =============================================================================

-- ── Extension ────────────────────────────────────────────────────────────────
-- (Directus already enables uuid-ossp; included for standalone safety)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ── Table: links ─────────────────────────────────────────────────────────────
-- Maps 1:1 to src/types/link.ts Link type.
-- "sort" replaces "order" (reserved word in SQL).

CREATE TABLE IF NOT EXISTS links (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_created    UUID        REFERENCES directus_users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    url             TEXT         NOT NULL,
    type            VARCHAR(20)  NOT NULL CHECK (type IN (
                        'youtube', 'instagram', 'tiktok',
                        'facebook', 'whatsapp', 'website', 'custom'
                    )),
    clicks          INTEGER      NOT NULL DEFAULT 0,
    active          BOOLEAN      NOT NULL DEFAULT true,
    sort            INTEGER      NOT NULL DEFAULT 0,
    date_created    TIMESTAMPTZ  DEFAULT NOW(),
    date_updated    TIMESTAMPTZ  DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_links_user_created ON links(user_created);
CREATE INDEX idx_links_type         ON links(type);
CREATE INDEX idx_links_active       ON links(active);
CREATE INDEX idx_links_sort         ON links(user_created, sort);


-- ── Trigger: auto-update date_updated ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_date_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_links_date_updated ON links;
CREATE TRIGGER update_links_date_updated
    BEFORE UPDATE ON links
    FOR EACH ROW
    EXECUTE FUNCTION update_date_updated_column();


-- ── Seed data ────────────────────────────────────────────────────────────────
-- Mirror of src/lib/seedLinks.ts (2026-06-04)
-- Replace '<<YOUR-USER-UUID>>' with your Directus user UUID after first login.
-- Or leave NULL for anonymous / admin-owned rows.

INSERT INTO links (id, user_created, title, url, type, clicks, active, sort)
VALUES
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        NULL,
        'YouTube',
        'https://youtube.com/@linkhub',
        'youtube',
        1284,
        true,
        0
    ),
    (
        'b2c3d4e5-f6a7-8901-bcde-f12345678901',
        NULL,
        'Instagram',
        'https://instagram.com/linkhub',
        'instagram',
        864,
        true,
        1
    ),
    (
        'c3d4e5f6-a7b8-9012-cdef-123456789012',
        NULL,
        'WhatsApp',
        'https://wa.me/5500000000000',
        'whatsapp',
        311,
        true,
        2
    ),
    (
        'd4e5f6a7-b8c9-0123-defa-234567890123',
        NULL,
        'Website',
        'https://example.com',
        'website',
        92,
        false,
        3
    );


-- ── Directus collection metadata (optional) ──────────────────────────────────
-- Run this in Directus SQL terminal or via migration if you want the collection
-- auto-registered in Directus data model. Otherwise create the collection
-- through Directus admin UI pointing at this table.

/*
INSERT INTO directus_collections (collection, icon, note, singleton, accountability, sort_field)
VALUES ('links', 'link', 'LinkHub user links', false, 'all', 'sort');
*/
