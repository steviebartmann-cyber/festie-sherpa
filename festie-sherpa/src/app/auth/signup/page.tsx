'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSignup = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="bg-white/70 border border-sherpa-sand/30 rounded-2xl p-8 shadow-sm text-center">
        <div className="text-4xl mb-4">🎪</div>
        <h2 className="font-display font-bold text-2xl text-sherpa-earth mb-2">Check your inbox</h2>
        <p className="text-sherpa-earth/60 text-sm">
          We sent a confirmation email to <strong>{email}</strong>. Click the link to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/70 border border-sherpa-sand/30 rounded-2xl p-8 shadow-sm">
      <h1 className="font-display font-bold text-2xl text-sherpa-earth mb-1">Join Festie Sherpa</h1>
      <p className="text-sherpa-earth/60 text-sm mb-6">Free forever. No credit card required.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-sherpa-earth/70 mb-1.5">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sherpa-sand/50 bg-white text-sherpa-earth text-sm focus:outline-none focus:border-sherpa-rust transition-colors"
            placeholder="Your name"
          />
        </div>
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
            placeholder="At least 8 characters"
          />
        </div>
        <button
          onClick={handleSignup}
          disabled={loading || !email || !password}
          className="w-full bg-sherpa-earth text-sherpa-cream py-3 rounded-xl font-medium text-sm hover:bg-sherpa-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create free account'}
        </button>
      </div>

      <p className="text-center text-sm text-sherpa-earth/60 mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-sherpa-rust hover:text-sherpa-earth font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
