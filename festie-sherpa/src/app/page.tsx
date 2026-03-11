import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FestivalCard } from '@/components/festivals/FestivalCard'
import { BlogCard } from '@/components/blog/BlogCard'
import { ArrowRight, Compass, Star, Map, Users } from 'lucide-react'

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: festivals }, { data: posts }] = await Promise.all([
    supabase
      .from('festivals')
      .select('*')
      .eq('is_featured', true)
      .order('sherpa_score', { ascending: false })
      .limit(4),
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(4),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sherpa-earth min-h-[80vh] flex items-center">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sherpa-rust/30 via-transparent to-sherpa-gold/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <p className="text-sherpa-gold text-sm font-medium uppercase tracking-widest mb-6">
              The World's Premier Festival Resource
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-sherpa-cream leading-[1.05] mb-8">
              Go to festivals
              <span className="block italic text-sherpa-gold">fully prepared.</span>
            </h1>
            <p className="text-sherpa-cream/70 text-xl leading-relaxed mb-10 max-w-xl">
              Curated guides, insider intel, Sherpa Scores, and premium trip services. 
              We go deep so you can show up like a local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/festivals"
                className="inline-flex items-center justify-center gap-2 bg-sherpa-rust text-sherpa-cream px-8 py-4 rounded-full font-medium hover:bg-sherpa-gold hover:text-sherpa-earth transition-all duration-300 group"
              >
                Explore Festivals
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 border border-sherpa-cream/30 text-sherpa-cream px-8 py-4 rounded-full font-medium hover:border-sherpa-cream/70 hover:bg-sherpa-cream/10 transition-all duration-300"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-sherpa-cream/50" />
          <span className="text-sherpa-cream text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Compass size={22} />, title: 'Expert Guides', desc: 'Deep-dive coverage of the world\'s best festivals' },
            { icon: <Star size={22} />, title: 'Sherpa Score™', desc: 'Our 9-category rating system, built by obsessives' },
            { icon: <Map size={22} />, title: 'Insider Intel', desc: 'After-parties, transport, neighborhoods, and more' },
            { icon: <Users size={22} />, title: 'Premium Services', desc: 'VIP access, group logistics, curated itineraries' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/50 border border-sherpa-sand/30 hover:bg-white/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sherpa-rust/10 text-sherpa-rust flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-display font-semibold text-sherpa-earth mb-1">{item.title}</h3>
              <p className="text-sm text-sherpa-earth/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Festivals */}
      {festivals && festivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-sherpa-rust mb-2">Handpicked</p>
              <h2 className="font-display font-bold text-3xl text-sherpa-earth">Featured Festivals</h2>
            </div>
            <Link href="/festivals" className="text-sm font-medium text-sherpa-earth/60 hover:text-sherpa-earth flex items-center gap-1 link-underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {festivals.map(festival => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </section>
      )}

      {/* Field Notes */}
      {posts && posts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-sherpa-rust mb-2">From the trail</p>
              <h2 className="font-display font-bold text-3xl text-sherpa-earth">Field Notes</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-sherpa-earth/60 hover:text-sherpa-earth flex items-center gap-1 link-underline">
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlogCard post={posts[0]} featured />
            <div>
              {posts.slice(1).map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-sherpa-rust/10 border-t border-b border-sherpa-rust/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-display font-bold text-4xl text-sherpa-earth mb-4">
            Ready to festival smarter?
          </h2>
          <p className="text-sherpa-earth/70 text-lg mb-8">
            Join free and get access to our full festival directory, Sherpa Scores, and field-tested guides.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-sherpa-earth text-sherpa-cream px-10 py-4 rounded-full font-medium hover:bg-sherpa-rust transition-colors group"
          >
            Get started free
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
