import { createClient } from '@/lib/supabase/server'
import { FestivalCard } from '@/components/festivals/FestivalCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Festival Directory',
  description: 'Browse and discover the world\'s best music festivals with Sherpa Scores and expert guides.',
}

type SearchParams = {
  genre?: string
  search?: string
}

export default async function FestivalsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient()

  let query = supabase
    .from('festivals')
    .select('*')
    .order('sherpa_score', { ascending: false, nullsFirst: false })

  if (searchParams.search) {
    query = query.ilike('name', `%${searchParams.search}%`)
  }

  if (searchParams.genre) {
    query = query.contains('genres', [searchParams.genre])
  }

  const { data: festivals, error } = await query

  const allGenres = festivals
  ? Array.from(new Set(festivals.flatMap(f => f.genres || []))).sort()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-sherpa-rust mb-2">Explore</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-sherpa-earth mb-4">
          Festival Directory
        </h1>
        <p className="text-sherpa-earth/60 text-lg max-w-xl">
          Every festival we cover, ranked by our Sherpa Score. Find your next adventure.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <form method="GET" className="flex flex-wrap gap-3 w-full">
          <input
            type="text"
            name="search"
            defaultValue={searchParams.search}
            placeholder="Search festivals..."
            className="px-4 py-2 rounded-full border border-sherpa-sand/50 bg-white/60 text-sm text-sherpa-earth placeholder-sherpa-earth/40 focus:outline-none focus:border-sherpa-rust w-full sm:w-auto"
          />
          {allGenres.slice(0, 8).map(genre => (
            <a
              key={genre}
              href={searchParams.genre === genre ? '/festivals' : `/festivals?genre=${genre}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                searchParams.genre === genre
                  ? 'bg-sherpa-earth text-sherpa-cream'
                  : 'bg-white/60 border border-sherpa-sand/50 text-sherpa-earth/70 hover:bg-white'
              }`}
            >
              {genre}
            </a>
          ))}
        </form>
      </div>

      {/* Results */}
      {error ? (
        <div className="text-center py-20 text-sherpa-earth/50">
          <p>Something went wrong loading festivals. Please try again.</p>
        </div>
      ) : !festivals || festivals.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🎪</p>
          <p className="text-sherpa-earth/60">No festivals found. Check back soon — we're always adding more.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-sherpa-earth/50 mb-6">{festivals.length} festival{festivals.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {festivals.map(festival => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
