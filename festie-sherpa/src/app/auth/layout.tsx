import { Compass } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-10 h-10 rounded-full bg-sherpa-rust flex items-center justify-center">
              <Compass size={18} className="text-sherpa-cream" />
            </div>
            <span className="font-display font-bold text-2xl text-sherpa-earth">Festie Sherpa</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
