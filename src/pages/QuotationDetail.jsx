import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getQuotation, deleteQuotation } from '../utils/quotationStore'
import { provider, providerIN } from '../data/company'

function fmt(n) {
  return Number(n || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function buildMailto(q) {
  const cur = q.currency || 'RM'
  const total = Number(q.total || 0).toFixed(2)
  const subject = `Quotation ${q.quotationNo || q.id} – ${q.scope || 'Services'}`
  const body = [
    `Dear ${q.customer?.attention || q.customer?.name || 'Sir/Madam'},`,
    '',
    `Please find attached our quotation for your reference:`,
    '',
    `Quotation No : ${q.quotationNo || q.id}`,
    `Date         : ${q.date}`,
    `Scope        : ${q.scope}`,
    `Total Amount : ${cur} ${total}`,
    `Validity     : ${q.validity}`,
    '',
    'Please do not hesitate to contact us if you require any clarification.',
    '',
    'Thank you.',
    '',
    `${q.preparedBy || 'Best Sun Tech Engineering'}`,
    `${q.preparedTitle || ''}`,
    q.branch === 'IN' ? 'Best Sun Tech Engineering Pvt Ltd' : 'Best Sun Tech Engineering Sdn Bhd',
    q.branch === 'IN' ? 'Tel: +91 82484 75435 | HP: +91 86376 15010' : `HP: 019-2828 9180 | Tel: 603-4813 9407`,
    'Email: bstengg@yahoo.com',
  ].join('\n')
  return `mailto:${q.customer?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function QuotationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [q, setQ] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQuotation(id).then(data => { setQ(data); setLoading(false) })
  }, [id])

  if (loading) return (
    <div style={{ padding: '80px 24px', textAlign: 'center', color: '#1a3c6e' }}>Loading…</div>
  )

  if (!q) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#1a3c6e' }}>Quotation not found</h2>
        <Link to="/quotations" style={{ color: '#1a5aaf', marginTop: 16, display: 'inline-block' }}>← Back to Quotations</Link>
      </div>
    )
  }

  const isIN = q.branch === 'IN'
  const prov = isIN ? providerIN : provider
  const cur = q.currency || (isIN ? '₹' : 'RM')
  const taxLabel = q.taxLabel || (isIN ? 'GST' : 'SST')
  const taxRate = q.taxRate || (isIN ? 18 : 8)
  const subtotal = Number(q.subtotal || q.items?.reduce((s, it) => s + Number(it.amount || 0), 0) || 0)
  const taxAmt = Number(q.taxAmt || 0)
  const freight = Number(q.freight || 0)
  const deposit = Number(q.deposit || 0)
  const total = Number(q.total || subtotal + taxAmt + freight - deposit)

  async function handleDelete() {
    if (!window.confirm(`Delete quotation ${q.quotationNo || q.id}?`)) return
    await deleteQuotation(q.id)
    navigate('/quotations')
  }

  return (
    <div style={{ background: '#b0b8c8', minHeight: '100vh', paddingBottom: 40 }}>

      {/* Toolbar */}
      <div style={toolbar} className="no-print">
        <span style={toolbarTitle}>📄 {q.quotationNo || q.id} &nbsp;·&nbsp; {isIN ? '🇮🇳 India' : '🇲🇾 Malaysia'}</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/quotations" style={btnSecondary}>← Back</Link>
          <Link to={`/quotations/${q.id}/edit`} style={{ ...btnSecondary, background: 'rgba(200,153,58,0.25)', borderColor: '#c8993a', color: '#c8993a' }}>✏️ Edit</Link>
          <div style={sep} />
          {q.customer?.email && (
            <a href={buildMailto(q)} style={btnEmail}>✉️ Email Customer</a>
          )}
          {!q.customer?.email && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>No email on file</span>
          )}
          <div style={sep} />
          <button onClick={() => window.print()} style={btnPrint}>🖨️ Print / Save PDF</button>
          <button onClick={handleDelete} style={btnDelete}>🗑️ Delete</button>
        </div>
      </div>

      {/* A4 Page */}
      <div style={page}>

        {/* Letterhead */}
        <div style={letterhead}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <img src="/logo.svg" alt="Best Sun Tech Logo" style={{ height: 62, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div style={coName}>{prov.name.toUpperCase()}</div>
              <div style={coAddr}>
                {prov.address}<br />
                HP: {prov.hp} &nbsp;|&nbsp; Tel: {prov.tel}<br />
                Email: {prov.email}
              </div>
            </div>
          </div>
          <div style={coReg}>
            {isIN ? (
              <>
                <div><strong style={{ color: '#1a3c6e' }}>GSTIN/UIN</strong> &nbsp; {providerIN.gstin}</div>
              </>
            ) : (
              <>
                <div><strong style={{ color: '#1a3c6e' }}>BRN</strong> &nbsp; {provider.brn}</div>
                <div><strong style={{ color: '#1a3c6e' }}>Supplier TIN</strong> &nbsp; {provider.tin}</div>
                <div><strong style={{ color: '#1a3c6e' }}>SST No</strong> &nbsp; {provider.sst}</div>
              </>
            )}
          </div>
        </div>

        {/* Title banner */}
        <div style={docBanner}>QUOTATION</div>

        {/* Ref strip */}
        <div style={refStrip}>
          {q.eInvoiceNo && <div style={refItem}><span style={{ color: '#555' }}>E-Invoice No: </span><strong style={{ color: '#1a3c6e' }}>{q.eInvoiceNo}</strong></div>}
          {q.srNo && <div style={refItem}><span style={{ color: '#555' }}>S/R No: </span><strong style={{ color: '#1a3c6e' }}>{q.srNo}</strong></div>}
          <div style={refItem}><span style={{ color: '#555' }}>Date: </span><strong style={{ color: '#1a3c6e' }}>{q.date}</strong></div>
          <div style={refItem}>
            <span style={{ color: '#555' }}>Status: </span>
            <span style={statusBadge(q.status)}>{q.status || 'Draft'}</span>
          </div>
        </div>

        {/* Meta grid */}
        <div style={metaGrid}>
          <div style={metaBox}>
            <div style={metaBoxTitle}>From (Service Provider)</div>
            <MetaRow label="Company" val={prov.name} />
            <MetaRow label="Address" val={prov.address} />
            <MetaRow label="Tel / HP" val={`${prov.tel} / ${prov.hp}`} />
            <MetaRow label="Email" val={prov.email} />
            {isIN && <MetaRow label="GSTIN" val={providerIN.gstin} />}
          </div>
          <div style={metaBox}>
            <div style={metaBoxTitle}>To (Customer)</div>
            <MetaRow label="Company" val={q.customer?.name || '—'} />
            {q.customer?.tradingAs && <MetaRow label="Trading As" val={q.customer.tradingAs} />}
            {q.customer?.address && <MetaRow label="Address" val={q.customer.address} />}
            {q.customer?.phone && <MetaRow label="Tel" val={q.customer.phone} />}
            {q.customer?.attention && <MetaRow label="Attention" val={q.customer.attention} />}
            {q.customer?.tin && <MetaRow label={isIN ? 'GSTIN' : 'Customer TIN'} val={q.customer.tin} />}
            {q.customer?.email && <MetaRow label="Email" val={q.customer.email} />}
          </div>
        </div>

        {/* Scope heading */}
        {q.scope && (
          <div style={scopeHeader}>
            Scope of Work — {q.scope}
          </div>
        )}

        <p style={{ fontSize: '8.5pt', color: '#444', marginBottom: 8, paddingLeft: 4 }}>
          We are pleased to submit our quotation as follows for your kind perusal:
        </p>

        {/* Line items table */}
        <table style={itemsTable}>
          <thead>
            <tr style={{ background: '#1a3c6e', color: '#fff' }}>
              <th style={{ ...itemTh, width: 32 }}>S/N</th>
              <th style={{ ...itemTh, width: 60, textAlign: 'center' }}>Qty</th>
              <th style={itemTh}>Description</th>
              <th style={{ ...itemTh, width: 110, textAlign: 'right' }}>Unit Price ({cur})</th>
              <th style={{ ...itemTh, width: 110, textAlign: 'right' }}>Amount ({cur})</th>
            </tr>
          </thead>
          <tbody>
            {(q.items || []).map((item, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8faff' }}>
                <td style={{ ...itemTd, textAlign: 'center' }}>{item.sn}</td>
                <td style={{ ...itemTd, textAlign: 'center' }}>{item.qty}</td>
                <td style={itemTd}>
                  <div style={{ fontWeight: 700, color: '#111' }}>{item.description || item.descMain}</div>
                  {item.descSub && <div style={{ fontSize: '8pt', color: '#444', marginTop: 2 }}>{item.descSub}</div>}
                </td>
                <td style={{ ...itemTd, textAlign: 'right', fontWeight: 700 }}>{fmt(item.unitPrice)}</td>
                <td style={{ ...itemTd, textAlign: 'right', fontWeight: 700 }}>{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
          <table style={totalsTable}>
            <tbody>
              <tr>
                <td style={totLabel}>Subtotal</td>
                <td style={totVal}>{cur} &nbsp;{fmt(subtotal)}</td>
              </tr>
              {freight > 0 && (
                <tr>
                  <td style={totLabel}>Freight / Handling</td>
                  <td style={totVal}>{cur} &nbsp;{fmt(freight)}</td>
                </tr>
              )}
              <tr style={{ borderTop: '1px solid #dde3ef' }}>
                <td style={{ ...totLabel, paddingTop: 6 }}>
                  {taxLabel} Service Tax ({taxRate}%)<br />
                  <span style={{ fontSize: '7.5pt', color: '#888' }}>
                    {q.applyTax ? (q.taxNote || '') : (isIN ? 'GST not applied' : 'SST not applicable')}
                  </span>
                </td>
                <td style={{ ...totVal, paddingTop: 6 }}>{q.applyTax ? `${cur} \u00a0${fmt(taxAmt)}` : '—'}</td>
              </tr>
              {deposit > 0 && (
                <tr>
                  <td style={totLabel}>Less Deposit</td>
                  <td style={totVal}>{cur} &nbsp;{fmt(deposit)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={2} style={{ padding: 0 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                        <td style={{ padding: '7px 8px', fontWeight: 800, fontSize: '10pt' }}>
                          TOTAL {q.applyTax ? `INC. ${taxLabel} (${taxRate}%)` : '(EXCL. TAX)'}
                        </td>
                        <td style={{ padding: '7px 8px', fontWeight: 800, fontSize: '10pt', textAlign: 'right' }}>
                          {cur} &nbsp;{fmt(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Conditions */}
        {q.terms && q.terms.length > 0 && (
          <div style={termsSection}>
            <div style={termsTitle}>Terms &amp; Conditions</div>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {q.terms.map((t, i) => (
                <li key={i} style={{ fontSize: '8pt', color: '#333', lineHeight: 1.7, marginBottom: 2 }}>{t}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Terms strip — 3 boxes matching screenshot */}
        <div style={termsGrid}>
          {[
            ['Payment Terms', q.paymentTerms || '30 Days'],
            ['Delivery', q.delivery || 'Any Time'],
            ['Validity', q.validity || '15 Days'],
          ].map(([label, val]) => (
            <div key={label} style={termBox}>
              <div style={termLabel}>{label}</div>
              <div style={termVal}>{val}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        {q.note && (
          <div style={noteBox}>
            <strong style={{ color: '#8a6a00' }}>Note:</strong> {q.note}
          </div>
        )}

        {/* Signatures */}
        <div style={sigGrid}>
          <div style={sigBox}>
            <div style={{ height: 44 }} />
            <div style={sigLabel}>Prepared &amp; Authorised by</div>
            <div style={sigName}>{q.preparedBy || '___________________________'}</div>
            <div style={sigTitle}>{q.preparedTitle || prov.name}</div>
          </div>
          <div style={sigBox}>
            <div style={{ height: 44 }} />
            <div style={sigLabel}>Accepted &amp; Acknowledged by</div>
            <div style={sigName}>___________________________</div>
            <div style={sigTitle}>Authorised Signatory — {q.customer?.name || 'Customer'}</div>
            <div style={{ ...sigLabel, marginTop: 6 }}>Date: ______________________ &nbsp; Company Chop:</div>
          </div>
        </div>

        {/* Doc footer */}
        <div style={docFooter}>
          <span style={{ fontStyle: 'italic', color: '#aaa' }}>
            Generated from: {(q.quotationNo || q.id).toLowerCase().replace(/\s+/g, '-')}
            {q.customer?.name ? ' – ' + q.customer.name.toLowerCase().replace(/\s+/g, '-') : ''}
          </span>
          <span>{prov.name} {isIN ? '· GSTIN: ' + providerIN.gstin : '· BRN 200601006749 (726498-D)'} · Page 1 of 1</span>
        </div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          nav, footer { display: none !important; }
        }
      `}</style>
    </div>
  )
}

function MetaRow({ label, val }) {
  return (
    <div style={{ display: 'flex', fontSize: '8.5pt', lineHeight: 1.65 }}>
      <span style={{ color: '#555', width: 100, flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 600, color: '#111' }}>{val}</span>
    </div>
  )
}

function statusBadge(status) {
  const map = {
    Draft:    { bg: '#f0f4fa', color: '#5a6272' },
    Sent:     { bg: '#e8f0fe', color: '#1a5aaf' },
    Accepted: { bg: '#e2f5eb', color: '#1a7a4a' },
    Paid:     { bg: '#e2f5eb', color: '#1a7a4a' },
    Rejected: { bg: '#fde8e8', color: '#c0392b' },
  }
  const s = map[status] || map.Draft
  return { display: 'inline-block', background: s.bg, color: s.color, border: `1px solid ${s.color}44`, borderRadius: 4, fontSize: '8pt', fontWeight: 800, padding: '2px 10px', letterSpacing: '.5px', textTransform: 'uppercase', verticalAlign: 'middle' }
}

// ── Styles ───────────────────────────────────────────────────────────────
const toolbar = {
  background: '#1a3c6e', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '10px 20px', gap: 10, flexWrap: 'wrap',
  position: 'sticky', top: 0, zIndex: 100,
  boxShadow: '0 2px 12px rgba(0,0,0,.35)',
}
const toolbarTitle = { fontSize: 13, fontWeight: 800, letterSpacing: '.5px' }
const btnPrint = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#f5a623', color: '#1a1a1a' }
const btnEmail = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#1a7a4a', color: '#fff', textDecoration: 'none', display: 'inline-block' }
const btnDelete = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#c0392b', color: '#fff' }
const btnSecondary = { border: '1px solid rgba(255,255,255,.3)', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.15)', color: '#fff', display: 'inline-block', textDecoration: 'none' }
const sep = { width: 1, height: 24, background: 'rgba(255,255,255,.25)' }

const page = {
  width: 794,
  minHeight: 1123,
  background: '#fff', margin: '20px auto',
  padding: '46px 57px 53px',
  boxShadow: '0 6px 32px rgba(0,0,0,.28)',
  borderRadius: 2, position: 'relative',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '10.5pt', color: '#111',
}

const letterhead = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #1a3c6e', paddingBottom: 9, marginBottom: 10, gap: 10 }
const coName = { fontSize: '13.5pt', fontWeight: 900, color: '#1a3c6e', lineHeight: 1.2, letterSpacing: '.2px' }
const coAddr = { fontSize: '8pt', color: '#555', marginTop: 4, lineHeight: 1.65 }
const coReg = { textAlign: 'right', fontSize: '8pt', color: '#555', lineHeight: 1.7, whiteSpace: 'nowrap' }

const docBanner = { background: '#1a3c6e', color: '#fff', textAlign: 'center', fontSize: '12.5pt', fontWeight: 900, letterSpacing: 4, padding: '7px 0', marginBottom: 12, textTransform: 'uppercase' }
const refStrip = { display: 'flex', justifyContent: 'flex-end', gap: 24, marginBottom: 14, flexWrap: 'wrap' }
const refItem = { fontSize: '8.5pt' }

const metaGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px', marginBottom: 16 }
const metaBox = { border: '1px solid #bbc', borderRadius: 4, padding: '8px 10px' }
const metaBoxTitle = { fontSize: '7.5pt', fontWeight: 700, color: '#1a3c6e', textTransform: 'uppercase', letterSpacing: '.5px', borderBottom: '1px solid #dde', paddingBottom: 4, marginBottom: 6 }

const scopeHeader = { background: '#f0f4fb', borderLeft: '4px solid #1a3c6e', padding: '5px 10px', fontSize: '9.5pt', fontWeight: 700, color: '#1a3c6e', marginBottom: 6 }
const itemsTable = { width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: 10 }
const itemTh = { padding: '7px 8px', textAlign: 'left', fontWeight: 700, letterSpacing: '.2px' }
const itemTd = { padding: '8px 8px', borderBottom: '1px solid #dde3ef', verticalAlign: 'top', lineHeight: 1.5 }

const totalsTable = { width: 260, borderCollapse: 'collapse', fontSize: '9pt' }
const totLabel = { padding: '4px 8px', color: '#555' }
const totVal = { padding: '4px 8px', textAlign: 'right', fontWeight: 600 }

const termsSection = { border: '1px solid #dde3ef', borderRadius: 4, padding: '8px 10px', marginBottom: 14 }
const termsTitle = { fontSize: '8pt', fontWeight: 700, color: '#1a3c6e', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }

const termsGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }
const termBox = { border: '1px solid #bbc', borderRadius: 4, padding: '7px 9px', textAlign: 'center' }
const termLabel = { fontSize: '7.5pt', color: '#888', textTransform: 'uppercase', letterSpacing: '.4px' }
const termVal = { fontSize: '10pt', fontWeight: 800, color: '#1a3c6e', marginTop: 2 }

const noteBox = { background: '#fffbf0', border: '1px solid #e8d88a', borderRadius: 4, padding: '8px 10px', fontSize: '8pt', color: '#5a4a00', marginBottom: 14, lineHeight: 1.55 }

const sigGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 14 }
const sigBox = { borderTop: '1.5px solid #333', paddingTop: 6 }
const sigLabel = { fontSize: '8pt', color: '#555' }
const sigName = { fontSize: '9pt', fontWeight: 700, color: '#1a3c6e', marginTop: 2 }
const sigTitle = { fontSize: '8pt', color: '#666' }
const docFooter = { borderTop: '1px solid #bbc', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: '7.5pt', color: '#888' }
