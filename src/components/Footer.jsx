import { Link } from 'react-router-dom'
import { provider } from '../data/company'

export default function Footer() {
  const year = new Date().getFullYear()
  const waNumber = `60${provider.hp.replace(/[^0-9]/g, '').replace(/^0/, '')}`

  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.grid} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={s.brand}>
              <img src="/logo.png" alt="Best Sun Tech Logo" style={s.logoImg} />
              <span style={s.brandName}>Best Sun Tech Engineering</span>
            </div>
            <p style={s.brandDesc}>
              Malaysia's specialist for commercial &amp; industrial laundry equipment —
              maintenance, repair, spare parts &amp; engineering services since {provider.established}.
            </p>
            <div style={s.reg}>
              <span>BRN: {provider.brn}</span>
              <span>SST: {provider.sst}</span>
              <span>TIN: {provider.tin}</span>
            </div>
            <div style={s.actions}>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={s.waBtn}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={s.colTitle}>Our Services</h4>
            <div style={s.linkList}>
              {[
                'Equipment Repair & Servicing',
                'Preventive Maintenance',
                'Spare Parts Supply',
                'Steam Pipe & Boiler Works',
                'Press Machine Servicing',
                'Aqua Wet Cleaning',
                'Equipment Supply & Trade-In',
              ].map(item => (
                <span key={item} style={s.listItem}>→ {item}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={s.colTitle}>Quick Links</h4>
            <div style={s.linkList}>
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/products', 'Products'],
                ['/customers', 'Our Clients'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <Link key={to} to={to} style={s.footerLink}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={s.colTitle}>Contact Us</h4>
            <div style={s.contactList}>
              <div style={s.contactItem}>
                <span style={s.icon}>📍</span>
                <span>{provider.address}</span>
              </div>
              <div style={s.contactItem}>
                <span style={s.icon}>📱</span>
                <a href={`tel:${provider.hp}`} style={s.contactLink}>{provider.hp}</a>
              </div>
              <div style={s.contactItem}>
                <span style={s.icon}>☎️</span>
                <a href={`tel:${provider.tel}`} style={s.contactLink}>{provider.tel}</a>
              </div>
              {provider.fax && (
                <div style={s.contactItem}>
                  <span style={s.icon}>📠</span>
                  <span style={{ opacity: 0.75 }}>Fax: {provider.fax}</span>
                </div>
              )}
              <div style={s.contactItem}>
                <span style={s.icon}>✉️</span>
                <a href={`mailto:${provider.email}`} style={s.contactLink}>{provider.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div style={s.bottom}>
          <span>© {year} Best Sun Tech Engineering Sdn Bhd · All rights reserved.</span>
          <span style={s.tagline}>{provider.tagline}</span>
        </div>
      </div>
    </footer>
  )
}

const s = {
  footer: {
    background: 'linear-gradient(135deg, #0f2447 0%, #1a3c6e 100%)',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 80,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '56px 24px 24px',
  },
  grid: {
    display: 'grid',
    gap: 40,
    marginBottom: 40,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  logoImg: {
    height: 52,
    width: 'auto',
    objectFit: 'contain',
    background: '#fff',
    borderRadius: 8,
    padding: '4px 8px',
  },
  brandName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.3,
  },
  brandDesc: {
    fontSize: '0.85rem',
    lineHeight: 1.65,
    marginBottom: 14,
    opacity: 0.75,
  },
  reg: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    fontSize: '0.73rem',
    opacity: 0.45,
    marginBottom: 16,
  },
  actions: {
    display: 'flex',
    gap: 10,
  },
  waBtn: {
    display: 'inline-block',
    background: '#25d366',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: '0.82rem',
    fontWeight: 600,
  },
  colTitle: {
    color: '#c8993a',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '1px solid rgba(200,153,58,0.25)',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 9,
  },
  listItem: {
    fontSize: '0.84rem',
    opacity: 0.75,
    lineHeight: 1.4,
  },
  footerLink: {
    fontSize: '0.84rem',
    opacity: 0.8,
    transition: 'opacity 0.2s',
    cursor: 'pointer',
    display: 'block',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  contactItem: {
    display: 'flex',
    gap: 10,
    fontSize: '0.83rem',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: '0.9rem',
    flexShrink: 0,
    marginTop: 1,
  },
  contactLink: {
    color: '#c8deff',
    fontWeight: 500,
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: '0.78rem',
    opacity: 0.55,
  },
  tagline: {
    fontStyle: 'italic',
  },
}
