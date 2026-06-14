import { useState } from 'react'
import { services } from '../data/services'

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Services</p>
          <h1 style={pageTitle}>Engineering Services</h1>
          <p style={pageSub}>Comprehensive laundry and engineering solutions for hospitality properties</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* Stats strip */}
        <div style={statsStrip}>
          {[
            ['170+', 'Total Jobs Completed'],
            ['10', 'Service Categories'],
            ['RM 1,296', 'Monthly Retainer'],
            ['24/7', 'Emergency Support'],
          ].map(([val, label]) => (
            <div key={label} style={statChip}>
              <span style={statVal}>{val}</span>
              <span style={statLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div style={grid}>
          {services.map(s => (
            <div
              key={s.id}
              style={{
                ...card,
                borderTop: `4px solid ${s.color}`,
                boxShadow: active === s.id ? `0 8px 32px ${s.color}33` : '0 2px 12px rgba(0,0,0,0.07)',
                transform: active === s.id ? 'translateY(-4px)' : 'none',
              }}
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

        {/* Equipment brands */}
        <div style={{ marginTop: 64 }}>
          <h2 style={sectionH2}>Equipment Brands We Service</h2>
          <div style={brandsGrid}>
            {[
              { cat: 'Washers', brands: ['IPSO', 'Electrolux', 'Huebsch', 'Panasonic', 'Cissell'] },
              { cat: 'Dryers', brands: ['ADC', 'Huebsch', 'Cissell', 'Electrolux'] },
              { cat: 'Press Machines', brands: ['Cissell Hot Plate', 'Pony', 'Form Finisher', 'Utility Press'] },
              { cat: 'Dry Clean', brands: ['Pony P1', 'Pony P2', 'Earlstar', 'Realstar'] },
            ].map(g => (
              <div key={g.cat} style={brandCard}>
                <h4 style={brandTitle}>{g.cat}</h4>
                <div style={brandList}>
                  {g.brands.map(b => (
                    <span key={b} style={brandChip}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const pageHeader = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }
const pageOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }

const statsStrip = { display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }
const statChip = { background: '#fff', borderRadius: 10, padding: '16px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 150px' }
const statVal = { fontSize: '1.5rem', fontWeight: 800, color: '#1a3c6e' }
const statLabel = { fontSize: '0.75rem', color: '#5a6272', fontWeight: 500 }

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }
const card = {
  background: '#fff',
  borderRadius: 12,
  padding: '24px',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
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
const toggleBtn = { marginTop: 14, width: '100%', padding: '8px', borderRadius: 8, border: '1px solid', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s' }

const sectionH2 = { fontSize: '1.5rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 24 }
const brandsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }
const brandCard = { background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }
const brandTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '0.85rem', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }
const brandList = { display: 'flex', flexWrap: 'wrap', gap: 8 }
const brandChip = { background: '#f4f6fb', color: '#1a3c6e', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }
