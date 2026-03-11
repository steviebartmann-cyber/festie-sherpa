'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="bg-white/70 border border-sherpa-sand/30 rounded-2xl p-8 shadow-sm">
      <h1 className="font-display font-bold text-2xl text-sherpa-earth mb-1">Welcome back</h1>
      <p className="text-sherpa-earth/60 text-sm mb-6">Sign in to your Festie Sherpa account.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-sherpa-earth/70 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sherpa-sand/50 bg-white text-sherpa-earth text-sm focus:outline-none focus:border-sherpa-rust transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-sherpa-earth/70 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sherpa-sand/50 bg-white text-sherpa-earth text-sm focus:outline-none focus:border-sherpa-rust transition-colors"
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className="w-full bg-sherpa-earth text-sherpa-cream py-3 rounded-xl font-medium text-sm hover:bg-sherpa-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <p className="text-center text-sm text-sherpa-earth/60 mt-6">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-sherpa-rust hover:text-sherpa-earth font-medium transition-colors">
          Join free
        </Link>
      </p>
    </div>
  )
}
