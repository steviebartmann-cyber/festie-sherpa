import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import { Festival } from '@/types'
import { formatDateRange } from '@/lib/utils'

type Props = {
  festival: Festival
}

export function FestivalCard({ festival }: Props) {
  return (
    <Link href={`/festivals/${festival.slug}`} className="group block">
      <div className="bg-white/60 border border-sherpa-sand/30 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-sherpa-earth/10 hover:-translate-y-0.5 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 bg-sherpa-sand/30 overflow-hidden">
          {festival.image_url ? (
            <Image
              src={festival.image_url}
              alt={festival.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
          )}

          {/* Score badge */}
          {festival.sherpa_score && (
            <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-sherpa-earth/90 backdrop-blur-sm flex items-center justify-center">
              <span className="font-display font-bold text-sherpa-cream text-sm">
                {festival.sherpa_score.toFixed(1)}
              </span>
            </div>
          )}

          {/* Genre tags */}
          {festival.genres?.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
              {festival.genres.slice(0, 2).map(genre => (
                <span key={genre} className="text-xs font-medium bg-sherpa-earth/80 text-sherpa-cream px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-sherpa-earth group-hover:text-sherpa-rust transition-colors leading-tight">
            {festival.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={12} className="text-sherpa-mist flex-shrink-0" />
            <span className="text-xs text-sherpa-earth/60">
              {festival.location_city}, {festival.location_state}
            </span>
          </div>

          {festival.start_date && (
            <div className="flex items-center gap-1.5 mt-1">
              <Calendar size={12} className="text-sherpa-mist flex-shrink-0" />
              <span className="text-xs text-sherpa-earth/60">
                {formatDateRange(festival.start_date, festival.end_date)}
              </span>
            </div>
          )}

          {festival.description && (
            <p className="text-sm text-sherpa-earth/70 mt-3 line-clamp-2 leading-relaxed">
              {festival.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
