export type Festival = {
  id: string
  created_at: string
  name: string
  slug: string
  location_city: string
  location_state: string
  location_country: string
  start_date: string
  end_date: string
  description: string
  long_description: string | null
  image_url: string | null
  website_url: string | null
  genres: string[]
  capacity: number | null
  price_range: 'budget' | 'moderate' | 'premium' | 'luxury' | null
  is_featured: boolean
  // Sherpa Score fields
  score_vibe: number | null
  score_lineup: number | null
  score_ecosystem: number | null
  score_value: number | null
  score_accessibility: number | null
  score_food: number | null
  score_grounds: number | null
  score_sound: number | null
  score_safety: number | null
  sherpa_score: number | null
  sherpa_review: string | null
}

export type BlogPost = {
  id: string
  created_at: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  tags: string[]
  festival_id: string | null
}

export type Profile = {
  id: string
  created_at: string
  email: string
  full_name: string | null
  avatar_url: string | null
  is_premium: boolean
}

export type SherpScoreCategory = {
  key: keyof Pick<Festival,
    'score_vibe' | 'score_lineup' | 'score_ecosystem' | 'score_value' |
    'score_accessibility' | 'score_food' | 'score_grounds' | 'score_sound' | 'score_safety'
  >
  label: string
  description: string
  icon: string
}

export const SHERPA_SCORE_CATEGORIES: SherpScoreCategory[] = [
  { key: 'score_vibe', label: 'Vibe & Atmosphere', description: 'The intangible energy and culture of the festival', icon: '✨' },
  { key: 'score_lineup', label: 'Lineup & Discovery', description: 'Quality of headliners and potential for new artist discovery', icon: '🎵' },
  { key: 'score_ecosystem', label: 'The Ecosystem', description: 'After-parties, nearby attractions, and the full festival universe', icon: '🌐' },
  { key: 'score_value', label: 'Value', description: 'Bang for your buck across tickets, food, and experience', icon: '💰' },
  { key: 'score_accessibility', label: 'Accessibility & Transport', description: 'Getting there, getting around, and getting home', icon: '🚌' },
  { key: 'score_food', label: 'Food & Beverage', description: 'Quality, variety, and price of food and drink options', icon: '🍽️' },
  { key: 'score_grounds', label: 'The Grounds', description: 'Shade, restrooms, seating, and overall physical comfort', icon: '🌳' },
  { key: 'score_sound', label: 'Sound & Production', description: 'Audio quality and sound bleed between stages', icon: '🔊' },
  { key: 'score_safety', label: 'Safety & Medical', description: 'EMT presence, security, and overall safety infrastructure', icon: '🏥' },
]
