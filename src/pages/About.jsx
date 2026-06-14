import { provider, client } from '../data/company'

const infoRow = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.88rem', gap: 16 }
const infoLabel = { color: '#5a6272', fontWeight: 500, flexShrink: 0 }
const infoVal = { fontWeight: 600, color: '#1a3c6e', textAlign: 'right' }

export default function About() {
  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / About</p>
          <h1 style={pageTitle} className="page-title">About Best Sun Tech Engineering</h1>
          <p style={pageSub}>Your trusted engineering partner for hospitality laundry systems</p>
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
              Our team specialises in preventive maintenance, breakdown repairs, steam pipe works,
              press machine servicing, and the supply of industrial laundry parts and chemicals.
              We hold SST registration and issue compliant e-invoices for all government and
              corporate clients.
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
              <h3 style={cardTitle}>Service Provider Details</h3>
              <div style={infoRow}><span style={infoLabel}>Company</span><span style={infoVal}>{provider.name}</span></div>
              <div style={infoRow}><span style={infoLabel}>BRN</span><span style={infoVal}>{provider.brn}</span></div>
              <div style={infoRow}><span style={infoLabel}>Supplier TIN</span><span style={infoVal}>{provider.tin}</span></div>
              <div style={infoRow}><span style={infoLabel}>SST No</span><span style={infoVal}>{provider.sst}</span></div>
              <div style={infoRow}><span style={infoLabel}>HP</span><span style={infoVal}>{provider.hp}</span></div>
              <div style={infoRow}><span style={infoLabel}>Tel / Fax</span><span style={infoVal}>{provider.tel}</span></div>
              <div style={infoRow}><span style={infoLabel}>Email</span><span style={{ ...infoVal, color: '#1a5aaf' }}>{provider.email}</span></div>
              <div style={{ ...infoRow, borderBottom: 'none' }}><span style={infoLabel}>Invoice Terms</span><span style={infoVal}>{provider.invoiceTerms}</span></div>
            </div>

            <div style={{ ...infoCard, marginTop: 20, borderLeft: '4px solid #c8993a' }}>
              <h3 style={cardTitle}>Address</h3>
              <p style={{ fontSize: '0.9rem', color: '#1a3c6e', fontWeight: 500, lineHeight: 1.6 }}>
                {provider.address}
              </p>
            </div>
          </div>
        </div>

        {/* Client section */}
        <div style={{ marginTop: 64 }}>
          <span style={tag}>Our Client</span>
          <h2 style={sectionH2}>Hilton Kuala Lumpur</h2>
          <p style={{ ...bodyText, maxWidth: 640, marginBottom: 32 }}>
            Daito Asia Development (M) II Sdn Bhd, operating as Hilton Kuala Lumpur, is our
            primary client. We manage all laundry equipment at their Level 7 laundry facility,
            responding to both scheduled maintenance and emergency breakdown calls.
          </p>
          <div style={twoColEqual} className="about-two-col-equal">
            <div style={infoCard}>
              <h3 style={cardTitle}>Client Details</h3>
              <div style={infoRow}><span style={infoLabel}>Company</span><span style={infoVal}>{client.name}</span></div>
              <div style={infoRow}><span style={infoLabel}>Trading As</span><span style={infoVal}>{client.tradingAs}</span></div>
              <div style={infoRow}><span style={infoLabel}>Customer TIN</span><span style={infoVal}>{client.tin}</span></div>
              <div style={infoRow}><span style={infoLabel}>Address</span><span style={infoVal}>{client.address}</span></div>
              <div style={infoRow}><span style={infoLabel}>Tel</span><span style={infoVal}>{client.tel}</span></div>
              <div style={infoRow}><span style={infoLabel}>Fax</span><span style={infoVal}>{client.fax}</span></div>
              <div style={infoRow}><span style={infoLabel}>AP Email</span><span style={{ ...infoVal, color: '#1a5aaf' }}>{client.apEmail}</span></div>
              <div style={{ ...infoRow, borderBottom: 'none' }}><span style={infoLabel}>Payment</span><span style={infoVal}>{client.paymentMethod}</span></div>
            </div>

            <div style={statsBox}>
              {[
                ['📍', 'Location', 'KL Sentral, Kuala Lumpur'],
                ['🏨', 'Property', '5-star international hotel'],
                ['⚙️', 'Equipment', 'IPSO, Electrolux, Huebsch, Cissell, Pony'],
                ['📅', 'Relationship', 'Since 2024 (ongoing)'],
                ['🔧', 'Service Floor', 'Level 7 Laundry + B3 Boiler Room'],
                ['💳', 'Payment', 'Batch online transfers — avg 2–3 months'],
              ].map(([icon, label, val]) => (
                <div key={label} style={statItem}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.73rem', color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1a3c6e' }}>{val}</div>
                  </div>
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
const twoColEqual = { display: 'grid', gap: 32 }
const tag = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }
const sectionH2 = { fontSize: '1.75rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }
const bodyText = { color: '#444', lineHeight: 1.75, fontSize: '0.95rem' }

const highlights = { display: 'grid', gap: 16, marginTop: 28 }
const highlight = { background: '#f4f6fb', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }
const hiIcon = { fontSize: '1.4rem' }
const hiLabel = { fontSize: '0.72rem', color: '#5a6272', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }
const hiVal = { fontSize: '0.82rem', fontWeight: 700, color: '#1a3c6e', marginTop: 2 }

const infoCard = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }
const cardTitle = { fontSize: '0.8rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 16 }

const statsBox = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: 0 }
const statItem = { display: 'flex', gap: 14, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }

const valuesGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }
const valueCard = { background: '#fff', borderRadius: 12, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: '4px solid #c8993a' }
const valueIcon = { fontSize: '2rem', marginBottom: 14 }
