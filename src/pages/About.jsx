import { useRef, useState, useEffect } from 'react'
import { provider, productOfferings } from '../data/company'
import { customerCategories } from '../data/customers'
import { useReveal } from '../hooks/useReveal'
import { useCounter } from '../hooks/useCounter'

const STATS = [
  { val: '15+', label: 'Years in Malaysia' },
  { val: '30+', label: 'Hotel Clients' },
  { val: '10+', label: 'Brands Serviced' },
  { val: '24/7', label: 'Emergency Support' },
]

function StatCard({ val, label, active }) {
  const count = useCounter(val, 1600, active)
  return (
    <div style={statItem}>
      <div style={statVal}>{count}</div>
      <div style={statLbl}>{label}</div>
    </div>
  )
}

export default function About() {
  useReveal()

  const hotels = customerCategories[0].customers
  const commercial = customerCategories[1].customers

  const statsRef = useRef(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div>
      {/* ── Page Hero ── */}
      <div style={pageHero}>
        <div style={heroBg} />
        <div style={heroGrid} />
        <div style={heroGlow1} />
        <div style={heroGlow2} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / About</p>
          <h1 style={pageTitle} className="page-title">About Best Sun Tech Engineering</h1>
          <p style={pageSub}>Malaysia's trusted specialist for commercial laundry equipment since {provider.established}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* ── Stats Strip ── */}
        <div ref={statsRef} style={statsStrip} className="reveal">
          {STATS.map(s => (
            <StatCard key={s.label} val={s.val} label={s.label} active={statsActive} />
          ))}
        </div>

        {/* ── Company overview ── */}
        <div style={twoCol} className="about-two-col">
          <div className="reveal-left">
            <span style={tag}>Company Overview</span>
            <h2 style={sectionH2}>Who We Are</h2>
            <p style={bodyText}>{provider.description}</p>
            <p style={{ ...bodyText, marginTop: 16 }}>
              Our team specialises in preventive maintenance, emergency breakdown repairs, steam pipe works,
              press machine servicing, and the supply of genuine spare parts and chemicals for all major brands.
              We hold SST registration and issue compliant e-invoices for all government and corporate clients.
            </p>
            <div style={highlights} className="about-highlights">
              {[
                ['🏢', 'Established', provider.established],
                ['📋', 'BRN', provider.brn],
                ['🔖', 'SST No', provider.sst],
                ['💼', 'Supplier TIN', provider.tin],
              ].map(([icon, label, val]) => (
                <div key={label} style={highlight}>
                  <span style={hiIcon}>{icon}</span>
                  <div>
                    <div style={hiLabel}>{label}</div>
                    <div style={hiVal}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right">
            <div style={infoCard}>
              <h3 style={cardTitle}>Contact Details</h3>
              {[
                ['Company', provider.name],
                ['BRN', provider.brn],
                ['Supplier TIN', provider.tin],
                ['SST No', provider.sst],
                ['HP / WhatsApp', provider.hp],
                ['Office Tel', provider.tel],
                ['Fax', provider.fax],
              ].map(([label, val]) => (
                <div key={label} style={infoRow}>
                  <span style={infoLabel}>{label}</span>
                  <span style={infoVal}>{val}</span>
                </div>
              ))}
              <div style={{ ...infoRow, borderBottom: 'none' }}>
                <span style={infoLabel}>Email</span>
                <span style={{ ...infoVal, color: '#1a5aaf' }}>{provider.email}</span>
              </div>
            </div>

            <div style={{ ...infoCard, marginTop: 20, borderLeft: '4px solid #c8993a' }}>
              <h3 style={cardTitle}>Our Address</h3>
              <p style={{ fontSize: '0.9rem', color: '#1a3c6e', fontWeight: 500, lineHeight: 1.6 }}>
                {provider.address}
              </p>
            </div>

            {/* Key stats card */}
            <div style={{ ...infoCard, marginTop: 20, background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', border: 'none' }}>
              <div style={statsRow}>
                {STATS.map(s => (
                  <div key={s.label} style={miniStatItem}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c8993a' }}>{s.val}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginTop: 2, textAlign: 'center' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Equipment Photos ── */}
        <div style={{ marginTop: 72 }}>
          <span style={tag}>Our Equipment</span>
          <h2 style={sectionH2}>Commercial Laundry Equipment</h2>
          <p style={{ ...bodyText, marginBottom: 28 }}>
            We service, maintain and supply world-leading commercial and industrial laundry equipment.
            From washers and dryers to flatwork ironers, press machines and dry-cleaning systems —
            we keep your operations running at peak performance.
          </p>
          <div style={photoGrid} className="about-photo-grid">
            {[
              { src: '/images/machine-05.jpg', alt: 'Hotel flatwork ironer in operation' },
              { src: '/images/machine-06.jpg', alt: 'Ironing & pressing tables' },
              { src: '/images/machine-07.jpg', alt: 'BST Engineering branded machine' },
              { src: '/images/machine-02.jpg', alt: 'Commercial laundry equipment' },
              { src: '/images/machine-01.jpg', alt: 'Industrial washing machines' },
              { src: '/images/machine-03.jpg', alt: 'Commercial laundry equipment' },
            ].map((item, i) => (
              <div key={i} style={photoCard} className={`reveal delay-${i + 1}`}>
                <img src={item.src} alt={item.alt} style={photoImg} />
                <div style={photoOverlay} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission ── */}
        <div style={{ marginTop: 72 }} className="reveal">
          <span style={tag}>Our Mission</span>
          <h2 style={sectionH2}>What Drives Us</h2>
          <div style={missionCard}>
            <div style={missionQuoteIcon}>"</div>
            <p style={missionText}>{provider.mission}</p>
          </div>
        </div>

        {/* ── What We Offer ── */}
        <div style={{ marginTop: 72 }}>
          <span style={tag}>Our Offerings</span>
          <h2 style={sectionH2}>What We Offer</h2>
          <div style={offeringsGrid} className="about-offerings-grid">
            {productOfferings.map((o, i) => (
              <div key={o.label} style={offeringCard} className={`reveal delay-${(i % 6) + 1} hover-lift`}>
                <div style={offeringIcon}>{o.icon}</div>
                <div style={offeringLabel}>{o.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Clients ── */}
        <div style={{ marginTop: 72 }}>
          <span style={tag}>Our Clients</span>
          <h2 style={sectionH2}>Trusted by Malaysia's Leading Hotels</h2>
          <p style={{ ...bodyText, marginBottom: 32, maxWidth: 640 }}>
            Best Sun Tech Engineering proudly serves over {hotels.length} five-star hotels and resorts
            across Malaysia, providing reliable maintenance, repair, and spare parts supply for their
            commercial laundry operations.
          </p>

          {/* Hotel clients */}
          <div style={clientsGrid}>
            {hotels.map((name, i) => (
              <div key={i} style={clientChip} className="reveal">
                <span style={clientDot}>🏨</span>
                <span style={clientName}>{name}</span>
              </div>
            ))}
          </div>

          {/* Commercial clients */}
          <div style={{ marginTop: 40 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a3c6e', marginBottom: 16 }}>
              Commercial Laundry &amp; Industrial Clients
            </h3>
            <div style={clientsGrid}>
              {commercial.map((name, i) => (
                <div key={i} style={{ ...clientChip, borderLeftColor: '#1a5aaf' }} className="reveal">
                  <span style={clientDot}>🧺</span>
                  <span style={clientName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div style={{ marginTop: 72 }}>
          <span style={tag}>Our Values</span>
          <h2 style={sectionH2}>Why Choose Us</h2>
          <div style={valuesGrid}>
            {[
              { icon: '⚡', title: 'Fast Response', desc: 'Emergency breakdown response within hours. We understand hotel operations cannot wait.' },
              { icon: '🎯', title: 'Specialist Expertise', desc: 'Deep knowledge of IPSO, Electrolux, Huebsch, Pony, Cissell and all major commercial laundry brands.' },
              { icon: '📋', title: 'Compliant Invoicing', desc: 'SST-registered, e-invoice ready. All documentation is compliant with LHDN e-Invoice mandate.' },
              { icon: '🔒', title: 'Trusted Partnership', desc: 'Long-term relationship-based service. Your machines, your schedule, your team — we know them all.' },
              { icon: '🔩', title: 'Genuine Spare Parts', desc: 'We stock and supply original spare parts for all major brands — fast sourcing, fair pricing.' },
              { icon: '🎓', title: 'Training & Support', desc: 'Aqua wet cleaning chemical training (theory & practical) for your in-house team.' },
            ].map((v, i) => (
              <div key={v.title} style={valueCard} className={`reveal delay-${(i % 6) + 1} hover-lift`}>
                <div style={valueIcon}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#1a3c6e', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '0.87rem', color: '#5a6272', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Styles ── */
const pageHero = { position: 'relative', padding: '72px 0 52px', overflow: 'hidden' }
const heroBg = { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 60%, #07122e 100%)' }
const heroGrid = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }
const heroGlow1 = { position: 'absolute', top: '-60px', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(200,153,58,0.12) 0%, transparent 70%)', borderRadius: '50%' }
const heroGlow2 = { position: 'absolute', bottom: '-80px', left: '10%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(26,90,175,0.18) 0%, transparent 70%)', borderRadius: '50%' }

const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }

const statsStrip = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 16,
  marginBottom: 56,
  padding: '32px 24px',
  background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)',
  borderRadius: 20,
  boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
}
const statItem = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }
const statVal = { fontSize: '2rem', fontWeight: 900, color: '#c8993a', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }
const statLbl = { fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginTop: 6, textAlign: 'center', letterSpacing: 0.3 }

const twoCol = { display: 'grid', gap: 56, alignItems: 'start' }
const tag = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, border: '1px solid rgba(200,153,58,0.2)' }
const sectionH2 = { fontSize: '1.75rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }
const bodyText = { color: '#444', lineHeight: 1.75, fontSize: '0.95rem' }

const highlights = { display: 'grid', gap: 12, marginTop: 28 }
const highlight = { background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fb 100%)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(26,60,110,0.06)', border: '1px solid rgba(26,60,110,0.06)' }
const hiIcon = { fontSize: '1.4rem' }
const hiLabel = { fontSize: '0.72rem', color: '#5a6272', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }
const hiVal = { fontSize: '0.82rem', fontWeight: 700, color: '#1a3c6e', marginTop: 2 }

const infoRow = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.88rem', gap: 16 }
const infoLabel = { color: '#5a6272', fontWeight: 500, flexShrink: 0 }
const infoVal = { fontWeight: 600, color: '#1a3c6e', textAlign: 'right' }

const infoCard = { background: '#fff', borderRadius: 14, padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(26,60,110,0.06)' }
const cardTitle = { fontSize: '0.8rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 16 }

const statsRow = { display: 'flex', justifyContent: 'space-around', padding: '8px 0', gap: 8 }
const miniStatItem = { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }

const photoGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }
const photoCard = { borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', aspectRatio: '4/3', position: 'relative', cursor: 'pointer' }
const photoImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }
const photoOverlay = { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,50,0.3) 0%, transparent 60%)', pointerEvents: 'none' }

const missionCard = { background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fb 100%)', borderRadius: 16, padding: '36px 40px', borderLeft: '5px solid #c8993a', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'relative', maxWidth: 820 }
const missionQuoteIcon = { position: 'absolute', top: 16, left: 24, fontSize: '4rem', color: 'rgba(200,153,58,0.18)', lineHeight: 1, fontFamily: 'Georgia, serif', fontWeight: 900 }
const missionText = { fontSize: '1.05rem', color: '#1a3c6e', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 500 }

const valuesGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }
const valueCard = { background: '#fff', borderRadius: 14, padding: '28px 24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', borderTop: '4px solid #c8993a' }
const valueIcon = { fontSize: '2rem', marginBottom: 14 }

const offeringsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }
const offeringCard = { background: '#fff', borderRadius: 14, padding: '24px 16px', boxShadow: '0 4px 14px rgba(0,0,0,0.07)', textAlign: 'center', borderTop: '3px solid #1a3c6e', border: '1px solid rgba(26,60,110,0.08)', borderTopWidth: 3 }
const offeringIcon = { fontSize: '2rem', marginBottom: 10 }
const offeringLabel = { fontSize: '0.82rem', fontWeight: 600, color: '#1a3c6e', lineHeight: 1.4 }

const clientsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 10 }
const clientChip = { background: '#fff', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '4px solid #c8993a', transition: 'transform 0.2s, box-shadow 0.2s' }
const clientDot = { fontSize: '1rem', flexShrink: 0 }
const clientName = { fontSize: '0.86rem', fontWeight: 600, color: '#1a3c6e', lineHeight: 1.3 }
