import { Link } from 'react-router-dom'
import { provider, financials } from '../data/company'
import { services } from '../data/services'
import KpiCard from '../components/KpiCard'

function fmt(n) {
  return 'RM ' + Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2 })
}

export default function Home() {
  const featured = services.slice(0, 6)

  return (
    <div>
      {/* ─── HERO ────────────────────────────────────── */}
      <section style={hero.section} className="home-hero-section">
        <div style={hero.overlay} />
        <div style={hero.content}>
          <div style={hero.badge}>🏨 Trusted by Hilton Kuala Lumpur</div>
          <h1 style={hero.h1} className="hero-h1">
            Expert Laundry &amp;<br />Engineering Services
          </h1>
          <p style={hero.sub}>
            Best Sun Tech Engineering Sdn Bhd provides specialist maintenance, repair,
            and supply services for hospitality laundry equipment and engineering systems across Malaysia.
          </p>
          <div style={hero.actions}>
            <Link to="/services" style={hero.btnPrimary}>Explore Services</Link>
            <Link to="/dashboard" style={hero.btnSecondary}>View Account Dashboard</Link>
          </div>
          <div style={hero.chips}>
            <span style={hero.chip}>Est. {provider.established}</span>
            <span style={hero.chip}>BRN {provider.brn}</span>
            <span style={hero.chip}>SST {provider.sst}</span>
          </div>
        </div>

        {/* floating stats card */}
        <div style={hero.statsCard} className="home-stats-card">
          <div style={hero.statsTitle}>Hilton KL Account</div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Outstanding</span>
            <span style={{ ...hero.statValue, color: '#c0392b' }}>{fmt(financials.totalOutstanding)}</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Paid YTD 2026</span>
            <span style={{ ...hero.statValue, color: '#1a7a4a' }}>{fmt(financials.totalPaid2026)}</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Monthly Retainer</span>
            <span style={{ ...hero.statValue, color: '#c8993a' }}>{fmt(financials.monthlyRetainer)}</span>
          </div>
          <div style={hero.statRow}>
            <span style={hero.statLabel}>Report Date</span>
            <span style={{ ...hero.statValue, color: '#1a3c6e' }}>{financials.reportDate}</span>
          </div>
          <Link to="/dashboard" style={hero.viewBtn}>View Full Dashboard →</Link>
        </div>
      </section>

      {/* ─── KPI STRIP ───────────────────────────────── */}
      <section style={{ background: '#fff', padding: '32px 0', borderBottom: '1px solid #dde3ef' }}>
        <div className="container">
          <div style={kpiGrid}>
            <KpiCard icon="⚠️" label="Total Outstanding" value={fmt(financials.totalOutstanding)} sub={`${financials.unpaidInvoiceCount} unpaid invoices`} variant="red" />
            <KpiCard icon="✅" label="Total Paid 2026 YTD" value={fmt(financials.totalPaid2026)} sub="6 payment batches received" variant="green" />
            <KpiCard icon="🔄" label="Monthly Retainer" value={fmt(financials.monthlyRetainer)} sub="RM 1,200 + 8% SST — ongoing" variant="gold" />
            <KpiCard icon="📄" label="Active Invoices (2026)" value="13" sub="Jan – Jun 2026 series" />
            <KpiCard icon="📅" label="Oldest Unpaid" value="Oct 2025" sub={`INV ${financials.oldestUnpaid.ref} · ${financials.oldestUnpaid.months} months`} variant="red" />
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ────────────────────────── */}
      <section className="section" style={{ background: '#f4f6fb' }}>
        <div className="container">
          <p style={{ color: '#c8993a', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>What We Do</p>
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

      {/* ─── CLIENT FEATURE ──────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={clientSection} className="home-client-grid">
            <div>
              <p style={{ color: '#c8993a', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Key Client</p>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }}>
                Hilton Kuala Lumpur
              </h2>
              <p style={{ color: '#5a6272', lineHeight: 1.7, marginBottom: 20, maxWidth: 500 }}>
                Daito Asia Development (M) II Sdn Bhd — trading as Hilton Kuala Lumpur — has been our
                flagship client since 2024. We maintain all laundry machinery and engineering systems
                at Level 7, providing round-the-clock support.
              </p>
              <div style={clientDetails}>
                <div style={clientRow}><span style={clientLabel}>Address</span><span>No 3, Jalan Stesen Sentral, 50470 Kuala Lumpur</span></div>
                <div style={clientRow}><span style={clientLabel}>Tel</span><span>03-2246 2264 / 03-2264 2264</span></div>
                <div style={clientRow}><span style={clientLabel}>AP Email</span><span style={{ color: '#1a5aaf' }}>kulhi_ap@hilton.com</span></div>
                <div style={clientRow}><span style={clientLabel}>Payment</span><span>Online Bank Transfer</span></div>
              </div>
              <Link to="/contacts" style={{ ...viewAllBtn, marginTop: 24, display: 'inline-block' }}>View All Contacts →</Link>
            </div>
            <div style={clientBadge}>
              <div style={hotelCard}>
                <div style={hotelLogo}>🏨</div>
                <div style={hotelName}>Hilton Kuala Lumpur</div>
                <div style={hotelSub}>Daito Asia Development (M) II Sdn Bhd</div>
                <div style={hotelSub2}>Customer TIN: C10093151000</div>
                <div style={hotelStat}>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a3c6e' }}>170+</div>
                    <div style={{ fontSize: '0.75rem', color: '#5a6272' }}>Total Jobs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a7a4a' }}>Since 2024</div>
                    <div style={{ fontSize: '0.75rem', color: '#5a6272' }}>Partnership</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c8993a' }}>Lvl 7</div>
                    <div style={{ fontSize: '0.75rem', color: '#5a6272' }}>Laundry Floor</div>
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
            <a href={`mailto:${provider.email}`} style={{ ...ctaBtn, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)' }}>
              ✉️ {provider.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const kpiGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 16,
}

const servGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 20,
}
const servCard = {
  background: '#fff',
  borderRadius: 12,
  padding: '24px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  transition: 'transform 0.2s, box-shadow 0.2s',
}
const servIcon = { width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 14 }
const servTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '1rem', marginBottom: 6 }
const servEquip = { fontSize: '0.78rem', color: '#5a6272', marginBottom: 8 }
const servDesc = { fontSize: '0.84rem', color: '#444', lineHeight: 1.55, marginBottom: 12 }
const servMeta = { display: 'flex', gap: 8, flexWrap: 'wrap' }
const servBadge = { padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }

const clientSection = {
  display: 'grid',
  gap: 60,
  alignItems: 'center',
}
const clientDetails = { display: 'flex', flexDirection: 'column', gap: 8 }
const clientRow = { display: 'flex', gap: 12, fontSize: '0.87rem', alignItems: 'flex-start' }
const clientLabel = { color: '#5a6272', width: 80, flexShrink: 0, fontWeight: 500 }
const clientBadge = { display: 'flex', justifyContent: 'center' }
const hotelCard = {
  background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)',
  borderRadius: 20,
  padding: '40px 36px',
  color: '#fff',
  textAlign: 'center',
  width: '100%',
  maxWidth: 360,
  boxShadow: '0 16px 48px rgba(26,60,110,0.3)',
}
const hotelLogo = { fontSize: '3rem', marginBottom: 12 }
const hotelName = { fontSize: '1.3rem', fontWeight: 800, marginBottom: 4 }
const hotelSub = { fontSize: '0.8rem', opacity: 0.65, marginBottom: 4 }
const hotelSub2 = { fontSize: '0.75rem', opacity: 0.5, marginBottom: 24 }
const hotelStat = { display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 8px', gap: 8 }

const viewAllBtn = {
  display: 'inline-block',
  background: '#1a3c6e',
  color: '#fff',
  padding: '12px 28px',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
}

const ctaSection = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '80px 0', position: 'relative' }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const ctaBtn = { background: '#c8993a', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: '1rem', display: 'inline-block', border: '2px solid transparent' }

const hero = {
  section: {
    background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 60%, #1a3c6e 100%)',
    minHeight: 600,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '80px 24px',
    overflow: 'hidden',
    gap: 40,
    maxWidth: '100%',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  },
  content: {
    position: 'relative',
    maxWidth: 600,
    flex: 1,
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(200,153,58,0.2)',
    color: '#c8993a',
    border: '1px solid rgba(200,153,58,0.4)',
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: 20,
  },
  h1: {
    fontSize: '3rem',
    fontWeight: 900,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 20,
  },
  sub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    marginBottom: 32,
    maxWidth: 520,
  },
  actions: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 28,
  },
  btnPrimary: {
    background: '#c8993a',
    color: '#fff',
    padding: '13px 28px',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-block',
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '13px 28px',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: '0.95rem',
    border: '1px solid rgba(255,255,255,0.25)',
    display: 'inline-block',
  },
  chips: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    padding: '4px 12px',
    borderRadius: 6,
    fontSize: '0.75rem',
  },
  statsCard: {
    position: 'relative',
    background: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: '28px 24px',
    width: 280,
    flexShrink: 0,
    boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
  },
  statsTitle: {
    fontWeight: 800,
    color: '#1a3c6e',
    marginBottom: 16,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottom: '2px solid #c8993a',
    paddingBottom: 10,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '0.78rem',
    color: '#5a6272',
  },
  statValue: {
    fontSize: '0.9rem',
    fontWeight: 700,
    fontFamily: 'monospace',
  },
  viewBtn: {
    display: 'block',
    marginTop: 16,
    textAlign: 'center',
    background: '#1a3c6e',
    color: '#fff',
    padding: '10px',
    borderRadius: 8,
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
