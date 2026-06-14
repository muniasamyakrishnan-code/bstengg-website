import { useState } from 'react'
import { contacts } from '../data/contacts'
import { provider } from '../data/company'
import ContactCard from '../components/ContactCard'

const depts = ['All', ...new Set(contacts.map(c => c.dept))]

export default function Contacts() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? contacts : contacts.filter(c => c.dept === filter)

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Contacts</p>
          <h1 style={pageTitle} className="page-title">Key Contacts</h1>
          <p style={pageSub}>Hilton Kuala Lumpur — Engineering &amp; Finance team directory</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* Filter tabs */}
        <div style={filterRow}>
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              style={{
                ...filterBtn,
                background: filter === d ? '#1a3c6e' : '#fff',
                color: filter === d ? '#fff' : '#1a3c6e',
                borderColor: filter === d ? '#1a3c6e' : '#dde3ef',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Contact grid */}
        <div style={grid}>
          {filtered.map(c => (
            <ContactCard key={c.email} {...c} />
          ))}
        </div>

        {/* AP / billing box */}
        <div style={{ marginTop: 56 }}>
          <h2 style={sectionH2}>Billing &amp; Accounts Payable</h2>
          <div style={twoCol} className="contacts-two-col">
            <div style={apCard}>
              <div style={apIcon}>📧</div>
              <h3 style={apTitle}>Accounts Payable</h3>
              <p style={apSub}>All invoice submissions and payment queries</p>
              <a href="mailto:kulhi_ap@hilton.com" style={apEmail}>kulhi_ap@hilton.com</a>
              <div style={apMeta}>
                <div style={apRow}><span style={apLabel}>Billing Attn</span><span>A/C Department</span></div>
                <div style={apRow}><span style={apLabel}>Payment</span><span>Online Bank Transfer</span></div>
                <div style={apRow}><span style={apLabel}>Terms</span><span>Net 30 days from invoice date</span></div>
              </div>
            </div>
            <div style={apCard}>
              <div style={apIcon}>📞</div>
              <h3 style={apTitle}>Finance Secretary</h3>
              <p style={apSub}>For urgent payment escalations</p>
              <a href="mailto:kulhi_financesecretary@hilton.com" style={apEmail}>kulhi_financesecretary@hilton.com</a>
              <div style={apMeta}>
                <div style={apRow}><span style={apLabel}>Tel</span><span>03-2246 2264</span></div>
                <div style={apRow}><span style={apLabel}>Alt Tel</span><span>03-2264 2264</span></div>
                <div style={apRow}><span style={apLabel}>Fax</span><span>03-2264 2202</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Our contact */}
        <div style={{ marginTop: 56 }}>
          <h2 style={sectionH2}>Our Contact Details</h2>
          <div style={ourCard}>
            <div style={ourLeft}>
              <div style={ourLogo}>BST</div>
              <div>
                <div style={ourName}>{provider.name}</div>
                <div style={ourBrn}>BRN: {provider.brn}</div>
              </div>
            </div>
            <div style={ourDetails}>
              {[
                ['📍', 'Address', provider.address],
                ['📱', 'Mobile', provider.hp],
                ['☎️', 'Tel / Fax', provider.tel],
                ['✉️', 'Email', provider.email],
                ['🔖', 'SST No', provider.sst],
                ['💼', 'Supplier TIN', provider.tin],
              ].map(([icon, label, val]) => (
                <div key={label} style={ourRow}>
                  <span>{icon}</span>
                  <span style={ourLabel}>{label}</span>
                  <span style={ourVal}>{val}</span>
                </div>
              ))}
            </div>
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

const filterRow = { display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }
const filterBtn = { padding: '8px 18px', borderRadius: 20, border: '1px solid', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }
const sectionH2 = { fontSize: '1.4rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 20 }
const twoCol = { display: 'grid', gap: 20 }

const apCard = { background: '#fff', borderRadius: 12, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: '4px solid #1a3c6e' }
const apIcon = { fontSize: '2rem', marginBottom: 12 }
const apTitle = { fontWeight: 700, color: '#1a3c6e', fontSize: '1.05rem', marginBottom: 4 }
const apSub = { fontSize: '0.82rem', color: '#5a6272', marginBottom: 12 }
const apEmail = { display: 'inline-block', color: '#1a5aaf', fontWeight: 600, fontSize: '0.9rem', marginBottom: 16, wordBreak: 'break-all' }
const apMeta = { display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #f0f0f0', paddingTop: 16 }
const apRow = { display: 'flex', gap: 12, fontSize: '0.85rem' }
const apLabel = { color: '#5a6272', width: 80, flexShrink: 0, fontWeight: 500 }

const ourCard = { background: '#fff', borderRadius: 12, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: '4px solid #c8993a' }
const ourLeft = { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }
const ourLogo = { background: '#1a3c6e', color: '#c8993a', fontWeight: 900, fontSize: '1.1rem', padding: '12px 16px', borderRadius: 10 }
const ourName = { fontWeight: 800, color: '#1a3c6e', fontSize: '1rem' }
const ourBrn = { fontSize: '0.78rem', color: '#5a6272', marginTop: 4 }
const ourDetails = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }
const ourRow = { display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.87rem' }
const ourLabel = { color: '#5a6272', fontWeight: 500, width: 90, flexShrink: 0 }
const ourVal = { fontWeight: 500, color: '#222' }
