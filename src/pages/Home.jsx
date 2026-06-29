import { Link } from 'react-router-dom'
import { provider } from '../data/company'
import { services } from '../data/services'

export default function Home() {
  const featured = services.slice(0, 6)

  return (
    <div>
      {/* ─── HERO ────────────────────────────────────── */}
      <section style={hero.section} className="home-hero-section">
        <div style={hero.overlay} />
        <div style={hero.content}>
          <div style={hero.badge}>🏨 Trusted by Hilton Kuala Lumpur since 2024</div>
          <h1 style={hero.h1} className="hero-h1">
            Expert Laundry &amp;<br />Engineering Services
          </h1>
          <p style={hero.sub}>
            Best Sun Tech Engineering Sdn Bhd — Malaysia's trusted specialist for commercial
            and industrial laundry equipment maintenance, repair, and supply since 2006.
          </p>
          <div style={hero.actions}>
            <Link to="/services" style={hero.btnPrimary}>Explore Services</Link>
            <Link to="/contact" style={hero.btnSecondary}>Get a Quote</Link>
          </div>
          <div style={hero.chips}>
            <span style={hero.chip}>⭐ Est. {provider.established}</span>
            <span style={hero.chip}>🔧 10+ Service Types</span>
            <span style={hero.chip}>🏭 Industrial &amp; Commercial</span>
            <span style={hero.chip}>✅ SST Registered</span>
          </div>
        </div>

        {/* floating stats card */}
        <div style={hero.statsCard} className="home-stats-card">
          <div style={hero.statsTitle}>Why Choose BST?</div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Years in Business</span>
            <span style={{ ...hero.statValue, color: '#1a3c6e' }}>20+ Years</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Brands Serviced</span>
            <span style={{ ...hero.statValue, color: '#1a7a4a' }}>10+ Brands</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Service Types</span>
            <span style={{ ...hero.statValue, color: '#c8993a' }}>170+ Jobs Done</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Support</span>
            <span style={{ ...hero.statValue, color: '#1a3c6e' }}>24/7 Emergency</span>
          </div>
          <Link to="/contact" style={hero.viewBtn}>Enquire Now →</Link>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ────────────────────────── */}
      <section className="section" style={{ background: '#f4f6fb' }}>
        <div className="container">
          <p style={labelStyle}>What We Do</p>
          <h2 className="section-title">Our Engineering Services</h2>
          <p className="section-subtitle">Comprehensive laundry and engineering solutions for the hospitality industry</p>

          <div style={servGrid}>
            {featured.map(s => (
              <div key={s.id} style={servCard}>
                <div style={{ ...servIcon, background: s.color + '18', color: s.color }}>{s.icon}</div>
                <h3 style={servTitle}>{s.title}</h3>
                <p style={servEquip}>{s.equipment}</p>
                <p style={servDesc}>{s.description.slice(0, 100)}…</p>
                <div style={servMeta}>
                  <span style={{ ...servBadge, background: s.color + '18', color: s.color }}>{s.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" style={viewAllBtn}>View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ─── BRANDS ──────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <p style={labelStyle}>Equipment Brands</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Brands We Service &amp; Supply</h2>
          <p style={{ textAlign: 'center', color: '#5a6272', marginBottom: 32, fontSize: '0.95rem' }}>
            Authorised service and spare parts for all major commercial laundry brands
          </p>
          <div style={brandsWrap}>
            {['IPSO', 'Electrolux', 'Huebsch', 'Cissell', 'Girbau', 'Pony', 'Realstar', 'Earlstar', 'ADC', 'Rema'].map(b => (
              <div key={b} style={brandPill}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────── */}
      <section className="section" style={{ background: '#f4f6fb' }}>
        <div className="container">
          <p style={labelStyle}>Our Advantage</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why Clients Choose BST</h2>
          <div style={whyGrid}>
            {[
              { icon: '⚡', title: 'Fast Response', desc: 'Emergency breakdown support within hours. Hotel laundry operations cannot wait — neither do we.' },
              { icon: '🎯', title: 'Specialist Expertise', desc: 'Deep technical knowledge of IPSO, Electrolux, Huebsch, Pony, Cissell and all major commercial laundry brands.' },
              { icon: '📋', title: 'Compliant Invoicing', desc: 'SST-registered and e-invoice ready. Full compliance with LHDN e-Invoice mandate for corporate clients.' },
              { icon: '🔒', title: 'Long-Term Partnership', desc: 'Relationship-based service since 2006. We know your machines, your team, and your schedule.' },
              { icon: '🔩', title: 'Genuine Spare Parts', desc: 'We stock and supply original spare parts for all major brands — fast sourcing, fair pricing.' },
              { icon: '🎓', title: 'Training & Support', desc: 'Aqua wet cleaning chemical training (theory & practical) for your team. We build capability, not dependency.' },
            ].map(v => (
              <div key={v.title} style={whyCard}>
                <div style={whyIcon}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#1a3c6e', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '0.87rem', color: '#5a6272', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENT FEATURE ──────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={clientSection} className="home-client-grid">
            <div>
              <p style={labelStyle}>Key Client</p>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }}>
                Hilton Kuala Lumpur
              </h2>
              <p style={{ color: '#5a6272', lineHeight: 1.7, marginBottom: 20, maxWidth: 500 }}>
                Daito Asia Development (M) II Sdn Bhd — trading as Hilton Kuala Lumpur — has been our
                flagship client since 2024. We maintain all laundry machinery and engineering systems
                at Level 7, providing round-the-clock support.
              </p>
              <div style={clientDetails}>
                <div style={clientRow}><span style={clientLabel}>Location</span><span>KL Sentral, Kuala Lumpur</span></div>
                <div style={clientRow}><span style={clientLabel}>Property</span><span>5-star international hotel</span></div>
                <div style={clientRow}><span style={clientLabel}>Equipment</span><span>IPSO, Electrolux, Huebsch, Cissell, Pony</span></div>
                <div style={clientRow}><span style={clientLabel}>Service</span><span>Level 7 Laundry + B3 Boiler Room</span></div>
              </div>
              <Link to="/about" style={{ ...viewAllBtn, marginTop: 24, display: 'inline-block' }}>Learn More About Us →</Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={hotelCard}>
                <div style={hotelLogo}>🏨</div>
                <div style={hotelName}>Hilton Kuala Lumpur</div>
                <div style={hotelSub}>Flagship Client since 2024</div>
                <div style={hotelStat}>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>170+</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>Total Jobs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>2024</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>Since</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c8993a' }}>Lvl 7</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>Laundry Floor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section style={ctaSection}>
        <div style={ctaOverlay} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Need Engineering Support?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: '1.05rem' }}>
            Contact us for maintenance schedules, emergency repairs, or equipment supply quotations.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:${provider.hp}`} style={ctaBtn}>📞 {provider.hp}</a>
            <Link to="/contact" style={{ ...ctaBtn, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)' }}>
              ✉️ Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const labelStyle = { color: '#c8993a', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }

const servGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }
const servCard = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s' }
const servIcon = { width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 14 }
const servTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '1rem', marginBottom: 6 }
const servEquip = { fontSize: '0.78rem', color: '#5a6272', marginBottom: 8 }
const servDesc = { fontSize: '0.84rem', color: '#444', lineHeight: 1.55, marginBottom: 12 }
const servMeta = { display: 'flex', gap: 8, flexWrap: 'wrap' }
const servBadge = { padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }

const brandsWrap = { display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }
const brandPill = { background: '#f4f6fb', border: '1px solid #dde3ef', color: '#1a3c6e', padding: '10px 20px', borderRadius: 30, fontWeight: 700, fontSize: '0.9rem', letterSpacing: 0.5 }

const whyGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 32 }
const whyCard = { background: '#fff', borderRadius: 12, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: '4px solid #c8993a' }
const whyIcon = { fontSize: '2rem', marginBottom: 14 }

const clientSection = { display: 'grid', gap: 60, alignItems: 'center' }
const clientDetails = { display: 'flex', flexDirection: 'column', gap: 10 }
const clientRow = { display: 'flex', gap: 12, fontSize: '0.87rem', alignItems: 'flex-start' }
const clientLabel = { color: '#5a6272', width: 80, flexShrink: 0, fontWeight: 500 }
const hotelCard = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 20, padding: '40px 36px', color: '#fff', textAlign: 'center', width: '100%', maxWidth: 360, boxShadow: '0 16px 48px rgba(26,60,110,0.3)' }
const hotelLogo = { fontSize: '3rem', marginBottom: 12 }
const hotelName = { fontSize: '1.3rem', fontWeight: 800, marginBottom: 4 }
const hotelSub = { fontSize: '0.8rem', opacity: 0.65, marginBottom: 24 }
const hotelStat = { display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 8px', gap: 8 }

const viewAllBtn = { display: 'inline-block', background: '#1a3c6e', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }
const ctaSection = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '80px 0', position: 'relative' }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const ctaBtn = { background: '#c8993a', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: '1rem', display: 'inline-block', border: '2px solid transparent' }

const hero = {
  section: { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 60%, #1a3c6e 100%)', minHeight: 600, position: 'relative', display: 'flex', alignItems: 'center', padding: '80px 24px', overflow: 'hidden', gap: 40, maxWidth: '100%', justifyContent: 'center' },
  overlay: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' },
  content: { position: 'relative', maxWidth: 600, flex: 1 },
  badge: { display: 'inline-block', background: 'rgba(200,153,58,0.2)', color: '#c8993a', border: '1px solid rgba(200,153,58,0.4)', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, marginBottom: 20 },
  h1: { fontSize: '3rem', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 20 },
  sub: { color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 520 },
  actions: { display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 },
  btnPrimary: { background: '#c8993a', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', display: 'inline-block' },
  btnSecondary: { background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-block' },
  chips: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  chip: { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: 6, fontSize: '0.75rem' },
  statsCard: { position: 'relative', background: 'rgba(255,255,255,0.96)', borderRadius: 16, padding: '28px 24px', width: 280, flexShrink: 0, boxShadow: '0 16px 48px rgba(0,0,0,0.25)' },
  statsTitle: { fontWeight: 800, color: '#1a3c6e', marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 0.8, borderBottom: '2px solid #c8993a', paddingBottom: 10 },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' },
  statLabel: { fontSize: '0.78rem', color: '#5a6272' },
  statValue: { fontSize: '0.9rem', fontWeight: 700 },
  viewBtn: { display: 'block', marginTop: 16, textAlign: 'center', background: '#1a3c6e', color: '#fff', padding: '10px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' },
}
