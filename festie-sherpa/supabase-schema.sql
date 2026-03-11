-- =============================================
-- FESTIE SHERPA — Supabase Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  email text not null,
  full_name text,
  avatar_url text,
  is_premium boolean default false
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- FESTIVALS
-- =============================================
create table public.festivals (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  name text not null,
  slug text not null unique,
  location_city text not null,
  location_state text not null,
  location_country text not null default 'US',
  start_date date,
  end_date date,
  description text,
  long_description text,
  image_url text,
  website_url text,
  genres text[] default '{}',
  capacity integer,
  price_range text check (price_range in ('budget', 'moderate', 'premium', 'luxury')),
  is_featured boolean default false,
  -- Sherpa Score categories (1-10)
  score_vibe numeric(3,1),
  score_lineup numeric(3,1),
  score_ecosystem numeric(3,1),
  score_value numeric(3,1),
  score_accessibility numeric(3,1),
  score_food numeric(3,1),
  score_grounds numeric(3,1),
  score_sound numeric(3,1),
  score_safety numeric(3,1),
  -- Computed overall score (average of non-null categories)
  sherpa_score numeric(3,1) generated always as (
    round(
      (
        coalesce(score_vibe, 0) +
        coalesce(score_lineup, 0) +
        coalesce(score_ecosystem, 0) +
        coalesce(score_value, 0) +
        coalesce(score_accessibility, 0) +
        coalesce(score_food, 0) +
        coalesce(score_grounds, 0) +
        coalesce(score_sound, 0) +
        coalesce(score_safety, 0)
      ) / nullif(
        (case when score_vibe is not null then 1 else 0 end) +
        (case when score_lineup is not null then 1 else 0 end) +
        (case when score_ecosystem is not null then 1 else 0 end) +
        (case when score_value is not null then 1 else 0 end) +
        (case when score_accessibility is not null then 1 else 0 end) +
        (case when score_food is not null then 1 else 0 end) +
        (case when score_grounds is not null then 1 else 0 end) +
        (case when score_sound is not null then 1 else 0 end) +
        (case when score_safety is not null then 1 else 0 end)
      , 0),
    1)
  ) stored,
  sherpa_review text
);

-- =============================================
-- BLOG POSTS
-- =============================================
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  image_url text,
  author_id uuid references public.profiles(id) on delete set null,
  published boolean default false,
  published_at timestamptz,
  tags text[] default '{}',
  festival_id uuid references public.festivals(id) on delete set null
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Festivals (public read)
alter table public.festivals enable row level security;
create policy "Anyone can read festivals" on public.festivals
  for select using (true);

-- Blog posts (public read for published)
alter table public.blog_posts enable row level security;
create policy "Anyone can read published posts" on public.blog_posts
  for select using (published = true);

-- =============================================
-- SEED DATA — New Orleans Jazz Fest
-- =============================================
insert into public.festivals (
  name, slug, location_city, location_state, location_country,
  start_date, end_date, description, website_url,
  genres, capacity, price_range, is_featured,
  score_vibe, score_lineup, score_ecosystem, score_value,
  score_accessibility, score_food, score_grounds, score_sound, score_safety,
  sherpa_review
) values (
  'New Orleans Jazz & Heritage Festival',
  'new-orleans-jazz-fest',
  'New Orleans', 'LA', 'US',
  '2026-04-24', '2026-05-03',
  'The greatest festival in America. Two weekends of unparalleled music across twelve stages, world-class Louisiana cuisine, and the singular magic of New Orleans. Jazz Fest isn''t just a festival — it''s a cultural pilgrimage.',
  'https://www.jazzfest.com',
  ARRAY['Jazz', 'Blues', 'R&B', 'Gospel', 'Rock', 'World'],
  90000,
  'moderate',
  true,
  9.5, 9.5, 9.5, 8.5,
  7.5, 10.0, 7.0, 8.5, 8.5,
  'The greatest music festival in America. Full stop. No festival does food, culture, and music together like Jazz Fest. The Daze Between (Mon–Wed between weekends) is the hidden gem of the full trip.'
);
