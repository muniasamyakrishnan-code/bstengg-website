import { customerCategories } from '../data/customers'

export default function Customers() {
  const totalCount = customerCategories.reduce((s, c) => s + c.customers.length, 0)

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Customers</p>
          <h1 style={pageTitle}>Our Customers</h1>
          <p style={pageSub}>
            Trusted by <strong style={{ color: '#c8993a' }}>{totalCount}+</strong> leading hotels and commercial laundry operators across Malaysia
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '56px 24px 80px' }}>

        {/* Stats strip */}
        <div style={statsStrip}>
          <div style={statCard}>
            <span style={statVal}>{totalCount}+</span>
            <span style={statLabel}>Total Clients</span>
          </div>
          <div style={statCard}>
            <span style={statVal}>{customerCategories[0].customers.length}</span>
            <span style={statLabel}>Star Hotels</span>
          </div>
          <div style={statCard}>
            <span style={statVal}>{customerCategories[1].customers.length}</span>
            <span style={statLabel}>Commercial Laundry</span>
          </div>
          <div style={statCard}>
            <span style={statVal}>Malaysia</span>
            <span style={statLabel}>Coverage</span>
          </div>
        </div>

        {/* Category sections */}
        {customerCategories.map(cat => (
          <section key={cat.id} style={section}>
            {/* Section header */}
            <div style={sectionHeader}>
              <div style={{ ...categoryIcon, background: cat.color + '18', color: cat.color }}>
                {cat.icon}
              </div>
              <div>
                <h2 style={sectionTitle}>{cat.title}</h2>
                <p style={sectionSub}>{cat.description}</p>
              </div>
              <span style={{ ...countBadge, background: cat.color + '15', color: cat.color, border: `1px solid ${cat.color}33` }}>
                {cat.customers.length} clients
              </span>
            </div>

            {/* Customer grid */}
            <div style={grid}>
              {cat.customers.map((name, i) => (
                <div key={i} style={{ ...customerCard, borderLeft: `4px solid ${cat.color}` }}>
                  <div style={{ ...indexNum, background: cat.color + '15', color: cat.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={customerName}>{name}</div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div style={cta}>
          <div style={ctaOverlay} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: 10 }}>
              Join Our Client List
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 24, fontSize: '0.95rem' }}>
              Contact us for a maintenance contract, equipment repair, or supply quotation.
            </p>
            <a href="tel:019-28289180" style={ctaBtn}>📞 019-2828 9180</a>
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

const statsStrip = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 56 }
const statCard = { background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: 4 }
const statVal = { fontSize: '1.8rem', fontWeight: 800, color: '#1a3c6e' }
const statLabel = { fontSize: '0.75rem', color: '#5a6272', fontWeight: 500 }

const section = { marginBottom: 56 }
const sectionHeader = { display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24, flexWrap: 'wrap' }
const categoryIcon = { width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }
const sectionTitle = { fontSize: '1.4rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 4 }
const sectionSub = { fontSize: '0.85rem', color: '#5a6272', lineHeight: 1.55, maxWidth: 560 }
const countBadge = { padding: '4px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginLeft: 'auto' }

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }
const customerCard = {
  background: '#fff',
  borderRadius: 10,
  padding: '14px 18px',
  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  transition: 'box-shadow 0.2s, transform 0.2s',
}
const indexNum = { width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }
const customerName = { fontWeight: 600, color: '#1a3c6e', fontSize: '0.88rem', lineHeight: 1.35 }

const cta = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 16, padding: '48px 24px', position: 'relative', overflow: 'hidden', marginTop: 8 }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.12) 1px, transparent 1px)', backgroundSize: '20px 20px' }
const ctaBtn = { background: '#c8993a', color: '#fff', padding: '13px 32px', borderRadius: 10, fontWeight: 700, fontSize: '1rem', display: 'inline-block' }
