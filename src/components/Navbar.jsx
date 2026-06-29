import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'

// Always visible public links
const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/customers', label: 'Clients' },
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
  const [scrolled, setScrolled] = useState(false)
  const { session } = useAuth()

  const allLinks = session ? [...publicLinks, ...authLinks] : publicLinks

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSignOut() {
    if (supabase) supabase.auth.signOut()
  }

  return (
    <>
      <style>{`
        .nav-link-item {
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          letter-spacing: 0.01em;
        }
        .nav-link-item:hover {
          background: rgba(255,255,255,0.08);
          color: #f0c060 !important;
        }
        .nav-cta-btn {
          background: linear-gradient(135deg, #c8993a 0%, #e8b84b 100%);
          color: #fff !important;
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          flex-shrink: 0;
          white-space: nowrap;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(200,153,58,0.35);
          letter-spacing: 0.01em;
        }
        .nav-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(200,153,58,0.55);
        }
        .nav-hamburger-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .nav-hamburger-btn:hover {
          background: rgba(255,255,255,0.15);
        }
        .nav-signout-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .nav-signout-btn:hover {
          background: rgba(255,255,255,0.18);
          color: #fff;
        }
        .mobile-nav-link {
          padding: 13px 18px;
          border-radius: 10px;
          font-size: 0.94rem;
          font-weight: 500;
          transition: all 0.2s;
          text-decoration: none;
          display: block;
          letter-spacing: 0.01em;
        }
        .mobile-nav-link:hover {
          background: rgba(200,153,58,0.12) !important;
          color: #f0c060 !important;
        }
        @media (max-width: 768px) {
          .nav-links-wrap { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .nav-signout-btn { display: none !important; }
          .nav-hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger-btn { display: none !important; }
        }
      `}</style>

      <nav style={{
        ...styles.nav,
        background: scrolled
          ? 'rgba(10,20,50,0.92)'
          : 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(200,153,58,0.18)'
          : '0 2px 16px rgba(0,0,0,0.2)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
      }}>
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
                className="nav-link-item"
                style={({ isActive }) => ({
                  color: isActive ? '#f0c060' : 'rgba(255,255,255,0.85)',
                  borderBottom: isActive ? '2px solid #c8993a' : '2px solid transparent',
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <a href="tel:+60192828 9180" className="nav-cta-btn">
            📞 019-2828 9180
          </a>

          {/* Sign out (only when logged in) */}
          {session && supabase && (
            <button onClick={handleSignOut} className="nav-signout-btn">
              Sign Out
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger-btn"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={styles.mobileMenu}>
            {/* Gold accent line */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,153,58,0.5), transparent)', marginBottom: 8 }} />
            {allLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className="mobile-nav-link"
                style={({ isActive }) => ({
                  color: isActive ? '#f0c060' : 'rgba(255,255,255,0.88)',
                  background: isActive ? 'rgba(200,153,58,0.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid #c8993a' : '3px solid transparent',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <a
                href="tel:+60192828 9180"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #c8993a, #e8b84b)',
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                📞 Call 019-2828 9180
              </a>
              {session && supabase && (
                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '10px',
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                  }}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
    display: 'flex',
    gap: 2,
    flex: 1,
    alignItems: 'center',
  },
  mobileMenu: {
    background: 'rgba(8,18,45,0.97)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: '8px 16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderTop: '1px solid rgba(200,153,58,0.2)',
  },
}
