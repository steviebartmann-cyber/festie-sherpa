'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Compass } from 'lucide-react'

const navLinks = [
  { href: '/festivals', label: 'Festivals' },
  { href: '/blog', label: 'Field Notes' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-sherpa-sand/40 bg-sherpa-cream/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-sherpa-rust flex items-center justify-center">
              <Compass size={16} className="text-sherpa-cream" />
            </div>
            <span className="font-display font-bold text-xl text-sherpa-earth tracking-tight">
              Festie Sherpa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-sherpa-earth/70 hover:text-sherpa-earth link-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-sherpa-earth/70 hover:text-sherpa-earth transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-medium bg-sherpa-rust text-sherpa-cream px-4 py-2 rounded-full hover:bg-sherpa-earth transition-colors"
            >
              Join free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-sherpa-earth"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-sherpa-sand/40 bg-sherpa-cream px-4 py-4 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-sherpa-earth/70 hover:text-sherpa-earth"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-sherpa-sand/40 flex flex-col gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-sherpa-earth/70" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/auth/signup" className="text-sm font-medium bg-sherpa-rust text-sherpa-cream px-4 py-2 rounded-full text-center" onClick={() => setOpen(false)}>Join free</Link>
          </div>
        </div>
      )}
    </header>
  )
}
