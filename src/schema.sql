-- =============================================================================
-- LinkHub — Supabase Schema (run in Supabase SQL Editor)
-- =============================================================================
-- Supabase provides the "auth" schema (auth.users) out of the box.
-- This script creates:
--   * profiles  → extra per-user profile data (name/avatar), related to auth.users
--   * links     → the user's links, owned by auth.uid()
-- Both tables enable Row Level Security so each user can only manage their own
-- rows. Maps 1:1 to src/types/link.ts (the "sort" column replaces "order",
-- which is a reserved word in SQL).

-- ── Shared helper: updated_at trigger ────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- ── Table: profiles ──────────────────────────────────────────────────────────
create table if not exists public.profiles (
    id          uuid        primary key references auth.users (id) on delete cascade,
    first_name  text        not null default '',
    last_name   text        not null default '',
    avatar      text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A user can read their own profile...
create policy "profiles_select_own"
    on public.profiles for select
    using (auth.uid() = id);

-- ...and insert/update only their own profile row.
create policy "profiles_insert_own"
    on public.profiles for insert
    with check (auth.uid() = id);

create policy "profiles_update_own"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();

-- ── Table: links ─────────────────────────────────────────────────────────────
create table if not exists public.links (
    id          uuid        primary key default gen_random_uuid(),
    user_id     uuid        not null default auth.uid() references auth.users (id) on delete cascade,
    title       varchar(255) not null,
    url         text         not null,
    type        varchar(20)  not null check (type in (
                    'youtube', 'instagram', 'tiktok',
                    'facebook', 'whatsapp', 'website', 'custom'
                )),
    clicks      integer      not null default 0,
    active      boolean      not null default true,
    sort        integer      not null default 0,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

create index if not exists idx_links_user_sort on public.links (user_id, sort);
create index if not exists idx_links_user_id   on public.links (user_id);

alter table public.links enable row level security;

-- A user can read, create, update and delete only their own links.
create policy "links_select_own"
    on public.links for select
    using (auth.uid() = user_id);

create policy "links_insert_own"
    on public.links for insert
    with check (auth.uid() = user_id);

create policy "links_update_own"
    on public.links for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "links_delete_own"
    on public.links for delete
    using (auth.uid() = user_id);

drop trigger if exists links_set_updated_at on public.links;
create trigger links_set_updated_at
    before update on public.links
    for each row execute function public.set_updated_at();

-- ── Auto-create a profile row on signup ─────────────────────────────────────
-- Keeps fetchCurrentUser() simple (a profile row always exists).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id)
    values (new.id)
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
