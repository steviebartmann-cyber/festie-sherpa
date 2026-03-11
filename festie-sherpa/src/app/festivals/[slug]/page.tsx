import { createClient } from '@/lib/supabase/server'
import { SherpScore } from '@/components/festivals/SherpScore'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Globe, ArrowLeft } from 'lucide-react'
import { formatDateRange } from '@/lib/utils'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: festival } = await supabase
    .from('festivals')
    .select('name, description')
    .eq('slug', params.slug)
    .single()

  if (!festival) return { title: 'Festival Not Found' }

  return {
    title: festival.name,
    description: festival.description,
  }
}

export default async function FestivalPage({ params }: Props) {
  const supabase = createClient()
  const { data: festival, error } = await supabase
    .from('festivals')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !festival) notFound()

  const priceLabels = {
    budget: '$ Budget',
    moderate: '$$ Moderate',
    premium: '$$$ Premium',
    luxury: '$$$$ Luxury',
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-sherpa-earth overflow-hidden">
        {festival.image_url && (
          <Image
            src={festival.image_url}
            alt={festival.name}
            fill
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sherpa-earth via-sherpa-earth/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-6 left-6">
          <Link href="/festivals" className="inline-flex items-center gap-2 text-sherpa-cream/80 hover:text-sherpa-cream text-sm transition-colors">
            <ArrowLeft size={14} />
            All festivals
          </Link>
        </div>

        {/* Festival name */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            {festival.genres?.length > 0 && (
              <div className="flex gap-2 mb-3">
                {festival.genres.map((g: string) => (
                  <span key={g} className="text-xs font-medium text-sherpa-gold uppercase tracking-widest">{g}</span>
                ))}
              </div>
            )}
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-sherpa-cream">
              {festival.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-sherpa-cream/70">
                <MapPin size={14} />
                <span className="text-sm">{festival.location_city}, {festival.location_state}</span>
              </div>
              {festival.start_date && (
                <div className="flex items-center gap-1.5 text-sherpa-cream/70">
                  <Calendar size={14} />
                  <span className="text-sm">{formatDateRange(festival.start_date, festival.end_date)}</span>
                </div>
              )}
              {festival.price_range && (
                <span className="text-sm text-sherpa-gold font-medium">
                  {priceLabels[festival.price_range as keyof typeof priceLabels]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-sherpa-rust mb-4">Overview</p>
              <div className="prose prose-stone max-w-none">
                <p className="text-sherpa-earth/80 text-lg leading-relaxed">
                  {festival.description}
                </p>
                {festival.long_description && (
                  <div
                    className="mt-4 text-sherpa-earth/70 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: festival.long_description }}
                  />
                )}
              </div>
            </div>

            {/* Website link */}
            {festival.website_url && (
              <div>
                <a
                  href={festival.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sherpa-rust hover:text-sherpa-earth transition-colors"
                >
                  <Globe size={14} />
                  Official Website
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SherpScore festival={festival} />

            {/* Quick facts */}
            <div className="bg-white/60 rounded-2xl p-5 border border-sherpa-sand/30">
              <p className="text-xs font-medium uppercase tracking-widest text-sherpa-earth/50 mb-4">Quick Facts</p>
              <dl className="space-y-3">
                {festival.location_city && (
                  <div>
                    <dt className="text-xs text-sherpa-earth/50">Location</dt>
                    <dd className="text-sm font-medium text-sherpa-earth">
                      {festival.location_city}, {festival.location_state}
                      {festival.location_country !== 'US' ? `, ${festival.location_country}` : ''}
                    </dd>
                  </div>
                )}
                {festival.start_date && (
                  <div>
                    <dt className="text-xs text-sherpa-earth/50">Dates</dt>
                    <dd className="text-sm font-medium text-sherpa-earth">
                      {formatDateRange(festival.start_date, festival.end_date)}
                    </dd>
                  </div>
                )}
                {festival.capacity && (
                  <div>
                    <dt className="text-xs text-sherpa-earth/50">Capacity</dt>
                    <dd className="text-sm font-medium text-sherpa-earth">
                      {festival.capacity.toLocaleString()} attendees
                    </dd>
                  </div>
                )}
                {festival.price_range && (
                  <div>
                    <dt className="text-xs text-sherpa-earth/50">Price Range</dt>
                    <dd className="text-sm font-medium text-sherpa-earth">
                      {priceLabels[festival.price_range as keyof typeof priceLabels]}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
