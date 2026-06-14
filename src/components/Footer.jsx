import { Link } from 'react-router-dom'
import { provider } from '../data/company'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.grid} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={styles.brand}>
              <img src="/logo.svg" alt="Best Sun Tech Logo" style={styles.logoImg} />
              <span style={styles.brandName}>Best Sun Tech Engineering</span>
            </div>
            <p style={styles.brandDesc}>
              Specialist laundry equipment maintenance &amp; engineering services across Malaysia.
            </p>
            <div style={styles.reg}>
              <span>BRN: {provider.brn}</span>
              <span>SST: {provider.sst}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={styles.colTitle}>Quick Links</h4>
            <div style={styles.footerLinks}>
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/dashboard', 'Dashboard'], ['/quotations', 'Quotations'], ['/customers', 'Customers'], ['/contacts', 'Contacts']].map(([to, label]) => (
                <Link key={to} to={to} style={styles.footerLink}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={styles.colTitle}>Contact Us</h4>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <span style={styles.icon}>📍</span>
                <span>{provider.address}</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.icon}>📞</span>
                <span>{provider.hp}</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.icon}>☎️</span>
                <span>{provider.tel}</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.icon}>✉️</span>
                <span>{provider.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <span>© {new Date().getFullYear()} Best Sun Tech Engineering Sdn Bhd · BRN 200601006749 · All rights reserved.</span>
          <span style={{ color: '#c8993a' }}>Hilton KL Account · Daito Asia</span>
        </div>
      </div>
    </footer>
  )
}

const styles = {
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
    gap: 48,
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
  },
  brandName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
  },
  brandDesc: {
    fontSize: '0.85rem',
    lineHeight: 1.6,
    marginBottom: 14,
    opacity: 0.75,
  },
  reg: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: '0.75rem',
    opacity: 0.5,
  },
  colTitle: {
    color: '#c8993a',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  footerLink: {
    fontSize: '0.87rem',
    opacity: 0.8,
    transition: 'opacity 0.2s',
    cursor: 'pointer',
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
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: '0.78rem',
    opacity: 0.6,
  },
}
