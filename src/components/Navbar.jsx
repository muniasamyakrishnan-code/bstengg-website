import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'

// Always visible public links
const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

// Only visible when logged in
const authLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/quotations', label: 'Quotations' },
  { to: '/customers', label: 'Customers' },
  { to: '/contacts', label: 'Contacts' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { session } = useAuth()

  const allLinks = session ? [...publicLinks, ...authLinks] : publicLinks

  function handleSignOut() {
    if (supabase) supabase.auth.signOut()
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <img src="/logo.png" alt="Best Sun Tech Logo" style={styles.logoImg} />
          <span style={styles.logoText}>
            Best Sun Tech
            <span style={styles.logoSub}>Engineering Sdn Bhd</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={styles.links} className="nav-links-wrap">
          {allLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                ...styles.link,
                color: isActive ? '#c8993a' : 'rgba(255,255,255,0.85)',
                borderBottom: isActive ? '2px solid #c8993a' : '2px solid transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <a href="tel:+60192828 9180" style={styles.cta} className="nav-cta">
          📞 019-2828 9180
        </a>

        {/* Sign out (only when logged in) */}
        {session && supabase && (
          <button onClick={handleSignOut} style={styles.signOut} className="nav-signout">
            Sign Out
          </button>
        )}

        {/* Mobile hamburger */}
        <button style={styles.hamburger} className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobileMenu}>
          {allLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                ...styles.mobileLink,
                color: isActive ? '#c8993a' : 'rgba(255,255,255,0.9)',
                background: isActive ? 'rgba(200,153,58,0.1)' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoImg: {
    height: 44,
    width: 'auto',
    objectFit: 'contain',
    background: '#fff',
    borderRadius: 8,
    padding: '3px 6px',
  },
  logoText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.95rem',
    lineHeight: 1.2,
    display: 'flex',
    flexDirection: 'column',
  },
  logoSub: {
    fontSize: '0.7rem',
    fontWeight: 400,
    opacity: 0.7,
    letterSpacing: 0.3,
  },
  links: {
    gap: 4,
    flex: 1,
  },
  link: {
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: '0.88rem',
    fontWeight: 500,
    transition: 'all 0.2s',
    borderBottom: '2px solid transparent',
  },
  cta: {
    background: '#c8993a',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: '0.82rem',
    fontWeight: 600,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  signOut: {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: 6,
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  },
  hamburger: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.4rem',
    cursor: 'pointer',
    padding: 4,
  },
  mobileMenu: {
    background: '#0f2447',
    padding: '12px 24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  mobileLink: {
    padding: '12px 16px',
    borderRadius: 8,
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
}
