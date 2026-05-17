import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact Us', to: '/contact' },
  ],
  'Job Seekers': [
    { label: 'Browse Jobs', to: '/jobs' },
    { label: 'Candidate Login', to: '/login' },
    { label: 'Register as Candidate', to: '/login' },
  ],
  Employers: [
    { label: 'Post a Job', to: '/employers' },
    { label: 'Employer Login', to: '/login' },
    { label: 'Resume Database', to: '/employers' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Use', to: '/' },
    { label: 'Cookie Policy', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300 relative overflow-hidden">
      {/* Decorative Network Nodes Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-cyan" preserveAspectRatio="none">
          <circle cx="80" cy="20" r="1.5" fill="currentColor" />
          <circle cx="60" cy="50" r="1" fill="currentColor" />
          <circle cx="90" cy="80" r="2" fill="currentColor" />
          <path d="M80 20 L60 50 L90 80" stroke="currentColor" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      <div className="container-xl py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 inline-block">
              <img src="/logo.png" alt="Firstdot Works" className="h-20 w-auto brightness-0 invert object-contain" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-sm">
              Chennai-based HR & recruitment startup connecting the right talent with the right opportunity. Building the future of work, node by node.
            </p>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={14} className="text-brand-cyan" />
                </div>
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={14} className="text-brand-cyan" />
                </div>
                <span>hello@firstdotworks.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={14} className="text-brand-cyan" />
                </div>
                <span>+91 44 1234 5678</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Github, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-cyan hover:text-white hover:border-brand-cyan transition-all duration-300 shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-display font-semibold text-sm mb-6 uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-400 hover:text-brand-cyan transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Firstdot Works. All rights reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="node-dot w-2 h-2 animate-pulse-slow"></span>
            <span className="text-gray-300 text-xs font-semibold tracking-wide">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
