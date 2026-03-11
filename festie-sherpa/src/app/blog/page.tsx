import { createClient } from '@/lib/supabase/server'
import { BlogCard } from '@/components/blog/BlogCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Festival guides, tips, and stories from the Festie Sherpa team.',
}

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-sherpa-rust mb-2">From the trail</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-sherpa-earth mb-4">Field Notes</h1>
        <p className="text-sherpa-earth/60 text-lg max-w-xl">
          Guides, tips, stories, and deep dives from people who live for the festival experience.
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📓</p>
          <p className="text-sherpa-earth/60">Field notes coming soon. Check back after the next festival.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} featured={i === 0} />
          ))}
        </div>
      )}
    </div>
  )
}
