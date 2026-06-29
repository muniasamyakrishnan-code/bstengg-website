import { useState, useRef, useEffect } from 'react'
import { services } from '../data/services'
import { productOfferings, availableBrands } from '../data/company'
import { useReveal } from '../hooks/useReveal'
import { useCounter } from '../hooks/useCounter'

const STATS = [
  { val: '15+', label: 'Years in Malaysia' },
  { val: '10', label: 'Service Categories' },
  { val: '30+', label: 'Hotel Clients' },
  { val: '24/7', label: 'Emergency Support' },
]

function StatCard({ val, label, active }) {
  const count = useCounter(val, 1600, active)
  return (
    <div style={statChip}>
      <span style={statVal}>{count}</span>
      <span style={statLabel}>{label}</span>
    </div>
  )
}

export default function Services() {
  useReveal()
  const [active, setActive] = useState(null)

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
          <p style={breadcrumb}>Home / Services</p>
          <h1 style={pageTitle} className="page-title">Engineering Services</h1>
          <p style={pageSub}>Comprehensive laundry and engineering solutions for hospitality properties</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* ── Stats strip ── */}
        <div ref={statsRef} style={statsStrip} className="reveal">
          {STATS.map(s => (
            <StatCard key={s.label} val={s.val} label={s.label} active={statsActive} />
          ))}
        </div>

        {/* ── What We Offer ── */}
        <div style={{ marginBottom: 56 }}>
          <span style={tag}>Our Offerings</span>
          <h2 style={sectionH2}>What We Offer</h2>
          <div style={offeringsGrid} className="services-offerings-grid">
            {productOfferings.map((o, i) => (
              <div key={o.label} style={offeringCard} className={`reveal delay-${(i % 6) + 1} hover-lift`}>
                <div style={offeringIcon}>{o.icon}</div>
                <div style={offeringLabel}>{o.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Service cards ── */}
        <div style={{ marginBottom: 16 }}>
          <span style={tag}>Service Details</span>
          <h2 style={sectionH2}>Our Service Categories</h2>
        </div>
        <div style={grid}>
          {services.map((s, i) => (
            <div
              key={s.id}
              style={{
                ...card,
                borderTop: `4px solid ${s.color}`,
                boxShadow: active === s.id
                  ? `0 12px 40px ${s.color}33, 0 4px 16px rgba(0,0,0,0.08)`
                  : '0 4px 16px rgba(0,0,0,0.07)',
                transform: active === s.id ? 'translateY(-6px)' : 'translateY(0)',
              }}
              className={`reveal delay-${(i % 6) + 1}`}
              onClick={() => setActive(active === s.id ? null : s.id)}
            >
              <div style={{ ...iconWrap, background: s.color + '15', color: s.color }}>
                {s.icon}
              </div>
              <div style={cardHeader}>
                <h3 style={cardTitle}>{s.title}</h3>
                <span style={{ ...badgeStyle, background: s.color + '18', color: s.color }}>
                  {s.badge}
                </span>
              </div>
              <p style={equipment}>📍 {s.equipment}</p>
              <p style={desc}>{s.description}</p>

              {active === s.id && (
                <div style={{ ...expandedDetails, borderTop: `2px solid ${s.color}22` }}>
                  <div style={detailRow}>
                    <span style={detailLabel}>Jobs on Record</span>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.count}</span>
                  </div>
                  <div style={detailRow}>
                    <span style={detailLabel}>Key Works</span>
                    <span style={{ fontWeight: 500, color: '#444', fontSize: '0.84rem' }}>{s.notes}</span>
                  </div>
                </div>
              )}

              <button
                style={{ ...toggleBtn, color: s.color, borderColor: s.color + '44', background: s.color + '0a' }}
              >
                {active === s.id ? '▲ Less' : '▼ More Details'}
              </button>
            </div>
          ))}
        </div>

        {/* ── Equipment brands ── */}
        <div style={{ marginTop: 72 }}>
          <span style={tag}>Brands We Service</span>
          <h2 style={sectionH2}>Equipment Brands We Service</h2>
          <div style={brandsGrid}>
            {[
              { cat: 'Washers', brands: ['IPSO', 'Electrolux', 'Huebsch', 'Panasonic', 'Cissell'] },
              { cat: 'Dryers', brands: ['ADC', 'Huebsch', 'Cissell', 'Electrolux'] },
              { cat: 'Press Machines', brands: ['Cissell Hot Plate', 'Pony', 'Form Finisher', 'Utility Press'] },
              { cat: 'Dry Clean', brands: ['Pony P1', 'Pony P2', 'Earlstar', 'Realstar'] },
            ].map((g, i) => (
              <div key={g.cat} style={brandCard} className={`reveal delay-${i + 1} hover-lift`}>
                <h4 style={brandTitle}>{g.cat}</h4>
                <div style={brandList}>
                  {g.brands.map(b => (
                    <span key={b} style={brandChip}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, background: '#fff', borderRadius: 14, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }} className="reveal">
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>All Brands We Carry</p>
            <div style={brandList}>
              {availableBrands.map(b => (
                <span key={b} style={brandChip}>{b}</span>
              ))}
            </div>
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
  display: 'flex',
  gap: 16,
  marginBottom: 48,
  flexWrap: 'wrap',
  background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)',
  borderRadius: 20,
  padding: '24px 28px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.16)',
}
const statChip = { display: 'flex', flexDirection: 'column', gap: 5, flex: '1 1 140px', alignItems: 'center', padding: '8px 0' }
const statVal = { fontSize: '1.8rem', fontWeight: 900, color: '#c8993a', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }
const statLabel = { fontSize: '0.73rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: 0.2, textAlign: 'center' }

const tag = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, border: '1px solid rgba(200,153,58,0.2)' }
const sectionH2 = { fontSize: '1.5rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 24 }

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }
const card = {
  background: '#fff',
  borderRadius: 14,
  padding: '24px',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  border: '1px solid rgba(26,60,110,0.06)',
}
const iconWrap = { width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 16 }
const cardHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }
const cardTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '1.05rem' }
const badgeStyle = { padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }
const equipment = { fontSize: '0.78rem', color: '#5a6272', marginBottom: 10 }
const desc = { fontSize: '0.86rem', color: '#444', lineHeight: 1.6, marginBottom: 12 }
const expandedDetails = { marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }
const detailRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }
const detailLabel = { fontSize: '0.78rem', color: '#5a6272', fontWeight: 500, flexShrink: 0 }
const toggleBtn = { marginTop: 14, width: '100%', padding: '9px', borderRadius: 9, border: '1px solid', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s' }

const offeringsGrid = { display: 'grid', gap: 16, marginTop: 20 }
const offeringCard = { background: '#fff', borderRadius: 14, padding: '22px 14px', boxShadow: '0 4px 14px rgba(0,0,0,0.07)', textAlign: 'center', borderTop: '3px solid #c8993a', border: '1px solid rgba(26,60,110,0.06)', borderTopWidth: 3 }
const offeringIcon = { fontSize: '1.8rem', marginBottom: 8 }
const offeringLabel = { fontSize: '0.8rem', fontWeight: 600, color: '#1a3c6e', lineHeight: 1.4 }

const brandsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }
const brandCard = { background: '#fff', borderRadius: 14, padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.07)', border: '1px solid rgba(26,60,110,0.06)' }
const brandTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '0.85rem', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }
const brandList = { display: 'flex', flexWrap: 'wrap', gap: 8 }
const brandChip = { background: 'linear-gradient(135deg, #f0f4fb, #e8edf8)', color: '#1a3c6e', padding: '5px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, border: '1px solid rgba(26,60,110,0.1)', transition: 'all 0.2s' }
