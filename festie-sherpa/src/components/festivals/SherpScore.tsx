import { Festival, SHERPA_SCORE_CATEGORIES } from '@/types'

type Props = {
  festival: Festival
  compact?: boolean
}

export function SherpScore({ festival, compact = false }: Props) {
  const score = festival.sherpa_score

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sherpa-rust text-sherpa-cream font-display font-bold text-sm">
          {score ? score.toFixed(1) : '—'}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-sherpa-earth/50">Sherpa Score</p>
          <p className="text-xs text-sherpa-earth/70">{getScoreLabel(score)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/60 rounded-2xl p-6 border border-sherpa-sand/30">
      {/* Overall score */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-sherpa-sand/30">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sherpa-earth text-sherpa-cream">
          <div className="text-center">
            <span className="font-display font-bold text-3xl">{score ? score.toFixed(1) : '—'}</span>
            <span className="block text-xs text-sherpa-cream/60">/10</span>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-2xl text-sherpa-earth">{getScoreLabel(score)}</p>
          <p className="text-sm text-sherpa-earth/60 mt-1">Sherpa Score™</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SHERPA_SCORE_CATEGORIES.map(cat => {
          const value = festival[cat.key] as number | null
          return (
            <div key={cat.key} className="flex items-center gap-3">
              <span className="text-lg">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-sherpa-earth truncate">{cat.label}</p>
                  <span className="text-xs font-bold text-sherpa-rust ml-2">{value ?? '—'}</span>
                </div>
                <div className="h-1.5 bg-sherpa-sand/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sherpa-rust rounded-full transition-all duration-700"
                    style={{ width: value ? `${value * 10}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {festival.sherpa_review && (
        <div className="mt-6 pt-6 border-t border-sherpa-sand/30">
          <p className="text-xs font-medium uppercase tracking-widest text-sherpa-earth/50 mb-2">Sherpa Take</p>
          <p className="text-sm text-sherpa-earth/80 leading-relaxed italic font-display">{festival.sherpa_review}</p>
        </div>
      )}
    </div>
  )
}

function getScoreLabel(score: number | null): string {
  if (!score) return 'Not yet rated'
  if (score >= 9) return 'Legendary'
  if (score >= 8) return 'Must Attend'
  if (score >= 7) return 'Highly Recommended'
  if (score >= 6) return 'Worth the Trip'
  if (score >= 5) return 'Solid Choice'
  return 'Approach Carefully'
}
