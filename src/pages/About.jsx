import { provider, productOfferings } from '../data/company'
import { customerCategories } from '../data/customers'

const infoRow = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.88rem', gap: 16 }
const infoLabel = { color: '#5a6272', fontWeight: 500, flexShrink: 0 }
const infoVal = { fontWeight: 600, color: '#1a3c6e', textAlign: 'right' }

export default function About() {
  const hotels = customerCategories[0].customers
  const commercial = customerCategories[1].customers

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / About</p>
          <h1 style={pageTitle} className="page-title">About Best Sun Tech Engineering</h1>
          <p style={pageSub}>Malaysia's trusted specialist for commercial laundry equipment since {provider.established}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* Company overview */}
        <div style={twoCol} className="about-two-col">
          <div>
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
          <div>
            <div style={infoCard}>
              <h3 style={cardTitle}>Contact Details</h3>
              <div style={infoRow}><span style={infoLabel}>Company</span><span style={infoVal}>{provider.name}</span></div>
              <div style={infoRow}><span style={infoLabel}>BRN</span><span style={infoVal}>{provider.brn}</span></div>
              <div style={infoRow}><span style={infoLabel}>Supplier TIN</span><span style={infoVal}>{provider.tin}</span></div>
              <div style={infoRow}><span style={infoLabel}>SST No</span><span style={infoVal}>{provider.sst}</span></div>
              <div style={infoRow}><span style={infoLabel}>HP / WhatsApp</span><span style={infoVal}>{provider.hp}</span></div>
              <div style={infoRow}><span style={infoLabel}>Office Tel</span><span style={infoVal}>{provider.tel}</span></div>
              <div style={infoRow}><span style={infoLabel}>Fax</span><span style={infoVal}>{provider.fax}</span></div>
              <div style={{ ...infoRow, borderBottom: 'none' }}><span style={infoLabel}>Email</span><span style={{ ...infoVal, color: '#1a5aaf' }}>{provider.email}</span></div>
            </div>

            <div style={{ ...infoCard, marginTop: 20, borderLeft: '4px solid #c8993a' }}>
              <h3 style={cardTitle}>Our Address</h3>
              <p style={{ fontSize: '0.9rem', color: '#1a3c6e', fontWeight: 500, lineHeight: 1.6 }}>
                {provider.address}
              </p>
            </div>

            {/* Key stats */}
            <div style={{ ...infoCard, marginTop: 20, background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)' }}>
              <div style={statsRow}>
                {[
                  ['15+', 'Years in Malaysia'],
                  ['30+', 'Hotel Clients'],
                  ['10+', 'Brands Serviced'],
                  ['24/7', 'Emergency Support'],
                ].map(([val, lbl]) => (
                  <div key={lbl} style={statItem}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c8993a' }}>{val}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginTop: 2, textAlign: 'center' }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Photos */}
        <div style={{ marginTop: 64 }}>
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
              <div key={i} style={photoCard}>
                <img src={item.src} alt={item.alt} style={photoImg} />
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div style={{ marginTop: 64 }}>
          <span style={tag}>Our Mission</span>
          <h2 style={sectionH2}>What Drives Us</h2>
          <p style={{ ...bodyText, maxWidth: 760, fontSize: '1.05rem', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '4px solid #c8993a', paddingLeft: 20 }}>
            "{provider.mission}"
          </p>
        </div>

        {/* What We Offer */}
        <div style={{ marginTop: 64 }}>
          <span style={tag}>Our Offerings</span>
          <h2 style={sectionH2}>What We Offer</h2>
          <div style={offeringsGrid} className="about-offerings-grid">
            {productOfferings.map(o => (
              <div key={o.label} style={offeringCard}>
                <div style={offeringIcon}>{o.icon}</div>
                <div style={offeringLabel}>{o.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Clients */}
        <div style={{ marginTop: 64 }}>
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
              <div key={i} style={clientChip}>
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
                <div key={i} style={{ ...clientChip, borderLeftColor: '#1a5aaf' }}>
                  <span style={clientDot}>🧺</span>
                  <span style={clientName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginTop: 64 }}>
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
            ].map(v => (
              <div key={v.title} style={valueCard}>
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

const pageHeader = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }
const pageOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }

const twoCol = { display: 'grid', gap: 56, alignItems: 'start' }
const tag = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }
const sectionH2 = { fontSize: '1.75rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }
const bodyText = { color: '#444', lineHeight: 1.75, fontSize: '0.95rem' }

const highlights = { display: 'grid', gap: 12, marginTop: 28 }
const highlight = { background: '#f4f6fb', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }
const hiIcon = { fontSize: '1.4rem' }
const hiLabel = { fontSize: '0.72rem', color: '#5a6272', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }
const hiVal = { fontSize: '0.82rem', fontWeight: 700, color: '#1a3c6e', marginTop: 2 }

const infoCard = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }
const cardTitle = { fontSize: '0.8rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 16 }

const statsRow = { display: 'flex', justifyContent: 'space-around', padding: '8px 0', gap: 8 }
const statItem = { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }

const photoGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }
const photoCard = { borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', aspectRatio: '4/3' }
const photoImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }

const valuesGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }
const valueCard = { background: '#fff', borderRadius: 12, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: '4px solid #c8993a' }
const valueIcon = { fontSize: '2rem', marginBottom: 14 }

const offeringsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }
const offeringCard = { background: '#fff', borderRadius: 12, padding: '20px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', textAlign: 'center', borderTop: '3px solid #1a3c6e' }
const offeringIcon = { fontSize: '2rem', marginBottom: 10 }
const offeringLabel = { fontSize: '0.82rem', fontWeight: 600, color: '#1a3c6e', lineHeight: 1.4 }

const clientsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 10 }
const clientChip = { background: '#fff', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid #c8993a' }
const clientDot = { fontSize: '1rem', flexShrink: 0 }
const clientName = { fontSize: '0.86rem', fontWeight: 600, color: '#1a3c6e', lineHeight: 1.3 }
