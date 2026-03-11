import Link from 'next/link'
import { Compass } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-sherpa-sand/40 bg-sherpa-earth text-sherpa-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sherpa-rust flex items-center justify-center">
                <Compass size={16} className="text-sherpa-cream" />
              </div>
              <span className="font-display font-bold text-xl text-sherpa-cream">Festie Sherpa</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-sherpa-cream/60">
              The world's premier music festival resource. We go deep so you can go fully.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-sherpa-gold mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/festivals', label: 'Festival Directory' },
                { href: '/blog', label: 'Field Notes' },
                { href: '/about', label: 'About Sherpa' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sherpa-cream/60 hover:text-sherpa-cream transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-sherpa-gold mb-4">Account</h4>
            <ul className="space-y-2">
              {[
                { href: '/auth/login', label: 'Sign In' },
                { href: '/auth/signup', label: 'Join Free' },
                { href: '/account', label: 'My Account' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sherpa-cream/60 hover:text-sherpa-cream transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-sherpa-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sherpa-cream/40">© {new Date().getFullYear()} Festie Sherpa. All rights reserved.</p>
          <p className="text-xs text-sherpa-cream/40">Built for people who live for the music.</p>
        </div>
      </div>
    </footer>
  )
}
