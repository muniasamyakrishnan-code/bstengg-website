import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listQuotations, deleteQuotation, migrateFromLocalStorage } from '../utils/quotationStore'
import { supabase } from '../lib/supabase'

const STATUS_COLORS = {
  Draft:    { bg: '#f0f4fa', color: '#5a6272' },
  Sent:     { bg: '#e8f0fe', color: '#1a5aaf' },
  Accepted: { bg: '#e2f5eb', color: '#1a7a4a' },
  Rejected: { bg: '#fde8e8', color: '#c0392b' },
  Paid:     { bg: '#e2f5eb', color: '#1a7a4a' },
}

export default function Quotations() {
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(true)
  const [migrationCount, setMigrationCount] = useState(0)
  const [migrating, setMigrating] = useState(false)

  async function load() {
    setLoading(true)
    setQuotations(await listQuotations())
    setLoading(false)
  }

  useEffect(() => {
    load()
    // Check if there's local data to migrate
    if (supabase) {
      try {
        const local = JSON.parse(localStorage.getItem('bst_quotations_v1') || '[]')
        if (local.length > 0) setMigrationCount(local.length)
      } catch {}
    }
  }, [])

  async function handleMigrate() {
    setMigrating(true)
    try {
      const { migrated } = await migrateFromLocalStorage()
      setMigrationCount(0)
      await load()
      alert(`✅ ${migrated} quotation(s) migrated to Supabase successfully!`)
    } catch (e) {
      alert('Migration failed: ' + e.message)
    }
    setMigrating(false)
  }

  async function handleDelete(id, quotationNo) {
    if (!window.confirm(`Delete quotation ${quotationNo || id}? This cannot be undone.`)) return
    await deleteQuotation(id)
    await load()
  }

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={breadcrumb}>Home / Quotations</p>
            <h1 style={pageTitle} className="page-title">Quotations</h1>
            <p style={pageSub}>All quotations — Malaysia &amp; India entities</p>
          </div>
          <Link to="/quotations/new" style={newBtn}>➕ New Quotation</Link>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>

        {/* Migration banner */}
        {migrationCount > 0 && (
          <div style={migrationBanner}>
            <span>📦 You have <strong>{migrationCount}</strong> quotation(s) stored locally. Migrate to Supabase to access from any device.</span>
            <button onClick={handleMigrate} disabled={migrating} style={migrationBtn}>
              {migrating ? 'Migrating…' : '⬆️ Migrate Now'}
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#1a3c6e', fontSize: '1rem' }}>Loading quotations…</div>
        ) : quotations.length === 0 ? (
          <div style={emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📄</div>
            <h3 style={{ color: '#1a3c6e', marginBottom: 8 }}>No quotations yet</h3>
            <p style={{ color: '#5a6272', marginBottom: 20 }}>Create your first quotation to get started.</p>
            <Link to="/quotations/new" style={emptyBtn}>➕ Create Quotation</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                  {['No.', 'Date', 'Customer', 'Scope', 'Total', 'Status', 'Branch', 'Actions'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quotations.map((q, i) => {
                  const sc = STATUS_COLORS[q.status] || STATUS_COLORS.Draft
                  const cur = q.currency || 'RM'
                  return (
                    <tr key={q.id} style={{ background: i % 2 === 0 ? '#fff' : '#f8faff' }}>
                      <td style={{ ...td, fontWeight: 700, color: '#1a3c6e', whiteSpace: 'nowrap' }}>{q.quotationNo || q.id}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{q.date}</td>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{q.customer?.name || '—'}</div>
                        {q.customer?.tradingAs && <div style={{ fontSize: '0.75rem', color: '#888' }}>{q.customer.tradingAs}</div>}
                      </td>
                      <td style={{ ...td, maxWidth: 280 }}>{q.scope || '—'}</td>
                      <td style={{ ...td, fontWeight: 700, fontFamily: 'monospace', color: '#1a3c6e', whiteSpace: 'nowrap' }}>
                        {cur} {Number(q.total || 0).toFixed(2)}
                      </td>
                      <td style={td}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, background: sc.bg, color: sc.color }}>
                          {q.status || 'Draft'}
                        </span>
                      </td>
                      <td style={td}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: q.branch === 'IN' ? '#1a5aaf' : '#c8993a' }}>
                          {q.branch === 'IN' ? '🇮🇳 India' : '🇲🇾 Malaysia'}
                        </span>
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
                          <Link to={`/quotations/${q.id}`} style={actionBtn('#1a3c6e')}>View</Link>
                          <Link to={`/quotations/${q.id}/edit`} style={actionBtn('#1a5aaf')}>Edit</Link>
                          <button onClick={() => handleDelete(q.id, q.quotationNo)} style={actionBtn('#c0392b', true)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const actionBtn = (bg, isBtn = false) => ({
  background: bg,
  color: '#fff',
  padding: '5px 11px',
  borderRadius: 5,
  fontSize: '0.76rem',
  fontWeight: 600,
  display: 'inline-block',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
})

const pageHeader = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }
const pageOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }
const newBtn = { background: '#c8993a', color: '#fff', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: 'center', display: 'inline-block' }
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', background: '#fff' }
const th = { padding: '12px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.78rem', whiteSpace: 'nowrap' }
const td = { padding: '12px 14px', borderBottom: '1px solid #dde3ef', verticalAlign: 'middle' }
const emptyState = { textAlign: 'center', padding: '80px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }
const emptyBtn = { background: '#1a3c6e', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block' }
const migrationBanner = { background: '#fffbf0', border: '1px solid #e8d88a', borderRadius: 10, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: '0.88rem', color: '#5a4a00' }
const migrationBtn = { background: '#c8993a', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap' }
