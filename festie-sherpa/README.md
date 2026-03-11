# Festie Sherpa

The world's premier music festival resource.

## Stack
- **Next.js 14** (App Router) — Frontend framework
- **Supabase** — Database + Authentication
- **Tailwind CSS** — Styling
- **Vercel** — Hosting

---

## Setup Guide

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/festie-sherpa.git
cd festie-sherpa
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **SQL Editor** and paste + run the contents of `supabase-schema.sql`
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this secret!)

### 3. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Add your environment variables in the Vercel dashboard
4. Deploy!

---

## Adding Content

### Festivals
Add festivals directly in Supabase via the Table Editor, or use the SQL editor to insert rows into the `festivals` table. The `sherpa_score` is **auto-calculated** from the 9 category scores.

### Blog Posts
Add posts to the `blog_posts` table. Set `published = true` and `published_at` to make them live. Content supports HTML.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── festivals/
│   │   ├── page.tsx          # Festival directory
│   │   └── [slug]/page.tsx   # Individual festival guide
│   ├── blog/
│   │   ├── page.tsx          # Blog index
│   │   └── [slug]/page.tsx   # Individual post
│   └── auth/
│       ├── login/page.tsx
│       └── signup/page.tsx
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── festivals/            # FestivalCard, SherpScore
│   └── blog/                 # BlogCard
├── lib/
│   ├── supabase/             # Client, Server, Middleware
│   └── utils.ts
└── types/index.ts            # TypeScript types + Sherpa Score categories
```

---

## Sherpa Score Categories

The Sherpa Score is an average of up to 9 scored categories (1–10 each):

| Category | What it measures |
|---|---|
| Vibe & Atmosphere | The intangible energy and culture |
| Lineup & Discovery | Headliners + discovery potential |
| The Ecosystem | After-parties, nearby attractions |
| Value | Bang for your buck |
| Accessibility & Transport | Getting there and getting around |
| Food & Beverage | Quality, variety, and price |
| The Grounds | Shade, restrooms, seating |
| Sound & Production | Audio quality, sound bleed |
| Safety & Medical | EMT presence, security |

Scores are auto-computed in the database via a generated column — just fill in the category scores.
