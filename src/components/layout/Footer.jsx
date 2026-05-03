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
    <footer className="bg-brand-charcoal text-gray-300">
      <div className="container-xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Firstdot Works" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Chennai-based HR & recruitment startup connecting the right talent with the right opportunity.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} className="text-brand-cyan flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-brand-cyan flex-shrink-0" />
                <span>hello@firstdotworks.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-brand-cyan flex-shrink-0" />
                <span>+91 44 1234 5678</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Github, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-cyan/20 hover:text-brand-cyan transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-400 hover:text-brand-cyan transition-colors"
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
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Firstdot Works. All rights reserved. Chennai, Tamil Nadu.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse-dot"></span>
            <span className="text-brand-cyan text-xs font-medium">MVP Prototype v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
