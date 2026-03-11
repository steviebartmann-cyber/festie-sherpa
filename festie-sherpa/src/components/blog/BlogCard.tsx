import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types'

type Props = {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: Props) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative h-80 rounded-2xl overflow-hidden bg-sherpa-sand/30">
          {post.image_url && (
            <Image src={post.image_url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-sherpa-earth/90 via-sherpa-earth/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {post.tags?.length > 0 && (
              <div className="flex gap-2 mb-2">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs font-medium text-sherpa-gold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            )}
            <h3 className="font-display font-semibold text-2xl text-sherpa-cream leading-tight group-hover:text-sherpa-gold transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-sherpa-cream/70 mt-2 line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex gap-4 py-4 border-b border-sherpa-sand/30 last:border-0">
        {post.image_url && (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sherpa-sand/30">
            <Image src={post.image_url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {post.tags?.length > 0 && (
            <span className="text-xs font-medium text-sherpa-rust uppercase tracking-widest">{post.tags[0]}</span>
          )}
          <h3 className="font-display font-semibold text-base text-sherpa-earth group-hover:text-sherpa-rust transition-colors leading-snug mt-0.5">
            {post.title}
          </h3>
          <p className="text-sm text-sherpa-earth/60 mt-1 line-clamp-2">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}
