import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()

  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !post) notFound()

  return (
    <article>
      {/* Hero */}
      <div className="relative h-64 sm:h-96 bg-sherpa-earth overflow-hidden">
        {post.image_url && (
          <Image src={post.image_url} alt={post.title} fill className="object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sherpa-earth via-sherpa-earth/50 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sherpa-cream/80 hover:text-sherpa-cream text-sm transition-colors">
            <ArrowLeft size={14} />
            Field Notes
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
          {post.tags?.length > 0 && (
            <div className="flex gap-2 mb-3">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-medium text-sherpa-gold uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          )}
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-sherpa-cream leading-tight">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-sherpa-cream/60 text-sm mt-3">{formatDate(post.published_at)}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.excerpt && (
          <p className="text-xl text-sherpa-earth/70 font-display italic leading-relaxed mb-8 border-l-2 border-sherpa-rust pl-4">
            {post.excerpt}
          </p>
        )}
        <div
          className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-a:text-sherpa-rust"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}
