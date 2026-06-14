import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveQuotation, getQuotation, generateId } from '../utils/quotationStore'
import { defaultTerms } from '../data/quotations'

const today = () => {
  const d = new Date()
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

function blankItem(sn) {
  return { sn, description: '', descSub: '', qty: 1, unitPrice: 0, amount: 0 }
}

function blankQuotation(branch) {
  const b = branch || 'MY'
  return {
    id: generateId(),
    branch: b,
    currency: b === 'IN' ? '₹' : 'RM',
    taxLabel: b === 'IN' ? 'GST' : 'SST',
    taxRate: b === 'IN' ? 18 : 8,
    applyTax: false,
    taxNote: '',
    quotationNo: '',
    eInvoiceNo: '',
    srNo: '',
    date: today(),
    validity: '15 Days',
    paymentTerms: '30 Days',
    delivery: 'Any Time',
    customer: { name: '', tradingAs: '', address: '', attention: '', phone: '', email: '', tin: '' },
    scope: '',
    items: [blankItem(1)],
    freight: 0,
    deposit: 0,
    terms: [...defaultTerms[b]],
    note: '',
    preparedBy: 'Kumar',
    preparedTitle: 'Sales Manager — Best Sun Tech Engineering Sdn Bhd',
    status: 'Draft',
  }
}

export default function QuotationBuilder() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [q, setQ] = useState(null)

  useEffect(() => {
    if (isEdit) {
      const existing = getQuotation(id)
      setQ(existing || blankQuotation('MY'))
    } else {
      setQ(blankQuotation('MY'))
    }
  }, [id, isEdit])

  if (!q) return <div style={{ padding: 40, textAlign: 'center', color: '#1a3c6e' }}>Loading…</div>

  // ── derived totals ──────────────────────────────────────────────────
  const subtotal = q.items.reduce((s, it) => s + (it.amount || 0), 0)
  const taxAmt = q.applyTax ? subtotal * (q.taxRate / 100) : 0
  const total = subtotal + taxAmt + Number(q.freight || 0) - Number(q.deposit || 0)

  // ── helpers ─────────────────────────────────────────────────────────
  function setBranch(b) {
    setQ(prev => ({
      ...prev,
      branch: b,
      currency: b === 'IN' ? '₹' : 'RM',
      taxLabel: b === 'IN' ? 'GST' : 'SST',
      taxRate: b === 'IN' ? 18 : 8,
      terms: [...defaultTerms[b]],
    }))
  }

  function setField(path, val) {
    setQ(prev => {
      const next = { ...prev }
      if (path.startsWith('customer.')) {
        next.customer = { ...prev.customer, [path.slice(9)]: val }
      } else {
        next[path] = val
      }
      return next
    })
  }

  function updateItem(idx, field, val) {
    setQ(prev => {
      const items = prev.items.map((it, i) => {
        if (i !== idx) return it
        const updated = { ...it, [field]: val }
        if (field === 'qty' || field === 'unitPrice') {
          updated.amount = Number(updated.qty || 0) * Number(updated.unitPrice || 0)
        }
        return updated
      })
      return { ...prev, items }
    })
  }

  function addItem() {
    setQ(prev => ({
      ...prev,
      items: [...prev.items, blankItem(prev.items.length + 1)],
    }))
  }

  function removeItem(idx) {
    setQ(prev => ({
      ...prev,
      items: prev.items
        .filter((_, i) => i !== idx)
        .map((it, i) => ({ ...it, sn: i + 1 })),
    }))
  }

  function updateTerm(idx, val) {
    setQ(prev => {
      const terms = [...prev.terms]
      terms[idx] = val
      return { ...prev, terms }
    })
  }

  function addTerm() {
    setQ(prev => ({ ...prev, terms: [...prev.terms, ''] }))
  }

  function removeTerm(idx) {
    setQ(prev => ({ ...prev, terms: prev.terms.filter((_, i) => i !== idx) }))
  }

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  async function handleSave(status) {
    setSaving(true)
    setSaveError('')
    try {
      const saved = await saveQuotation({ ...q, subtotal, taxAmt, total, status: status || q.status })
      navigate(`/quotations/${saved.id}`)
    } catch (e) {
      setSaveError('Save failed: ' + e.message)
      setSaving(false)
    }
  }

  const cur = q.currency

  return (
    <div style={{ background: '#f0f4fa', minHeight: '100vh' }}>
      {/* Toolbar */}
      <div style={toolbar}>
        <span style={toolbarTitle}>{isEdit ? '✏️ Edit Quotation' : '➕ New Quotation'}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/quotations" style={btnSecondary}>← Cancel</Link>
          <button onClick={() => handleSave('Draft')} style={btnOutline} disabled={saving}>💾 {saving ? 'Saving…' : 'Save Draft'}</button>
          <button onClick={() => handleSave('Sent')} style={btnPrimary} disabled={saving}>📤 {saving ? 'Saving…' : 'Save & Send'}</button>
        </div>
      </div>

      <div style={formWrap}>

        {/* ── Branch selector ── */}
        <section style={card}>
          <h3 style={cardTitle}>🌍 Branch / Entity</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['MY', '🇲🇾 Malaysia (RM · SST 8%)'], ['IN', '🇮🇳 India (₹ · GST 18%)']].map(([b, label]) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                style={{
                  ...branchBtn,
                  background: q.branch === b ? '#1a3c6e' : '#fff',
                  color: q.branch === b ? '#fff' : '#1a3c6e',
                  borderColor: q.branch === b ? '#1a3c6e' : '#bbc',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {q.branch === 'IN' && (
            <p style={{ fontSize: '0.8rem', color: '#555', marginTop: 10 }}>
              Entity: <strong>Best Sun Tech Engineering Pvt Ltd</strong> · GSTIN: 33AANCB0327K1ZS · Madurai, Tamil Nadu
            </p>
          )}
          {q.branch === 'MY' && (
            <p style={{ fontSize: '0.8rem', color: '#555', marginTop: 10 }}>
              Entity: <strong>Best Sun Tech Engineering Sdn Bhd</strong> · BRN: 200601006749 · Kuala Lumpur
            </p>
          )}
        </section>

        {/* ── Quotation meta ── */}
        <section style={card}>
          <h3 style={cardTitle}>📋 Quotation Details</h3>
          <div style={grid2} className="form-grid-2">
            <Field label="Quotation No *" value={q.quotationNo} onChange={v => setField('quotationNo', v)} placeholder="e.g. QT-2026-001" />
            <Field label="E-Invoice No" value={q.eInvoiceNo} onChange={v => setField('eInvoiceNo', v)} placeholder="e.g. 2600265" />
            <Field label="S/R No" value={q.srNo} onChange={v => setField('srNo', v)} placeholder="e.g. SR00265" />
            <Field label="Date *" value={q.date} onChange={v => setField('date', v)} />
            <Field label="Payment Terms" value={q.paymentTerms} onChange={v => setField('paymentTerms', v)} placeholder="e.g. 30 Days" />
            <Field label="Delivery" value={q.delivery} onChange={v => setField('delivery', v)} placeholder="e.g. Any Time" />
            <Field label="Validity" value={q.validity} onChange={v => setField('validity', v)} placeholder="e.g. 15 Days" />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={fieldLabel}>Scope of Work *</label>
            <input
              style={input}
              value={q.scope}
              onChange={e => setField('scope', e.target.value)}
              placeholder="Brief description of the work / supply scope"
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={fieldLabel}>Status</label>
            <select style={input} value={q.status} onChange={e => setField('status', e.target.value)}>
              {['Draft', 'Sent', 'Accepted', 'Rejected', 'Paid'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </section>

        {/* ── Customer ── */}
        <section style={card}>
          <h3 style={cardTitle}>🏢 Customer Details</h3>
          <div style={grid2} className="form-grid-2">
            <Field label="Company Name *" value={q.customer.name} onChange={v => setField('customer.name', v)} placeholder="Customer company name" />
            <Field label="Trading As" value={q.customer.tradingAs} onChange={v => setField('customer.tradingAs', v)} placeholder="Hotel / brand name" />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={fieldLabel}>Address</label>
            <textarea
              style={{ ...input, height: 64, resize: 'vertical' }}
              value={q.customer.address}
              onChange={e => setField('customer.address', e.target.value)}
              placeholder="Full billing address"
            />
          </div>
          <div style={{ ...grid2, marginTop: 12 }} className="form-grid-2">
            <Field label="Attention" value={q.customer.attention} onChange={v => setField('customer.attention', v)} placeholder="Contact person / department" />
            <Field label="Phone" value={q.customer.phone} onChange={v => setField('customer.phone', v)} placeholder="+60 3-xxxx xxxx" />
            <Field label="Customer Email *" value={q.customer.email} onChange={v => setField('customer.email', v)} placeholder="customer@example.com" type="email" />
            <Field label="Customer TIN / GSTIN" value={q.customer.tin} onChange={v => setField('customer.tin', v)} placeholder="Tax identification number" />
          </div>
        </section>

        {/* ── Line items ── */}
        <section style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ ...cardTitle, marginBottom: 0 }}>📦 Line Items</h3>
            <button onClick={addItem} style={btnAdd}>+ Add Row</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }}>
              <thead>
                <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                  {['#', 'Description', 'Sub-description (optional)', 'Qty', `Unit (${cur})`, `Amount (${cur})`, ''].map(h => (
                    <th key={h} style={itemTh}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {q.items.map((it, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
                    <td style={{ ...itemTd, textAlign: 'center', width: 32, color: '#888', fontWeight: 700 }}>{it.sn}</td>
                    <td style={itemTd}>
                      <input
                        style={tableInput}
                        value={it.description}
                        onChange={e => updateItem(idx, 'description', e.target.value)}
                        placeholder="Item / service name"
                      />
                    </td>
                    <td style={itemTd}>
                      <input
                        style={tableInput}
                        value={it.descSub}
                        onChange={e => updateItem(idx, 'descSub', e.target.value)}
                        placeholder="Optional detail"
                      />
                    </td>
                    <td style={{ ...itemTd, width: 70 }}>
                      <input
                        style={{ ...tableInput, textAlign: 'right' }}
                        type="number"
                        min="0"
                        value={it.qty}
                        onChange={e => updateItem(idx, 'qty', e.target.value)}
                      />
                    </td>
                    <td style={{ ...itemTd, width: 100 }}>
                      <input
                        style={{ ...tableInput, textAlign: 'right' }}
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.unitPrice}
                        onChange={e => updateItem(idx, 'unitPrice', e.target.value)}
                      />
                    </td>
                    <td style={{ ...itemTd, width: 110, fontWeight: 700, textAlign: 'right', color: '#1a3c6e' }}>
                      {cur} {Number(it.amount).toFixed(2)}
                    </td>
                    <td style={{ ...itemTd, width: 36, textAlign: 'center' }}>
                      {q.items.length > 1 && (
                        <button onClick={() => removeItem(idx)} style={btnRemove}>✕</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <table style={{ fontSize: '0.87rem', borderCollapse: 'collapse', width: 280 }}>
              <tbody>
                <TotRow label="Subtotal" val={`${cur} ${subtotal.toFixed(2)}`} />
                <tr>
                  <td style={{ padding: '6px 8px', color: '#555' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={q.applyTax}
                        onChange={e => setField('applyTax', e.target.checked)}
                      />
                      {q.taxLabel} ({q.taxRate}%)
                    </label>
                    {q.applyTax && (
                      <input
                        style={{ ...tableInput, marginTop: 4, fontSize: '0.78rem', color: '#888' }}
                        value={q.taxNote}
                        onChange={e => setField('taxNote', e.target.value)}
                        placeholder="e.g. Applied on labour portion only"
                      />
                    )}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>
                    {q.applyTax ? `${cur} ${taxAmt.toFixed(2)}` : '— not applied'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#555' }}>Freight / Handling</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={q.freight}
                      onChange={e => setField('freight', e.target.value)}
                      style={{ ...tableInput, width: 90, textAlign: 'right', marginLeft: 'auto', display: 'block' }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#555' }}>Less Deposit</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={q.deposit}
                      onChange={e => setField('deposit', e.target.value)}
                      style={{ ...tableInput, width: 90, textAlign: 'right', marginLeft: 'auto', display: 'block' }}
                    />
                  </td>
                </tr>
                <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                  <td style={{ padding: '8px 8px', fontWeight: 800, borderRadius: '0 0 0 6px' }}>
                    TOTAL {q.applyTax ? `INC. ${q.taxLabel} (${q.taxRate}%)` : '(excl. tax)'}
                  </td>
                  <td style={{ padding: '8px 8px', fontWeight: 800, textAlign: 'right', borderRadius: '0 0 6px 0', fontSize: '1.05rem' }}>
                    {cur} {total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Terms & Conditions ── */}
        <section style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ ...cardTitle, marginBottom: 0 }}>📜 Terms &amp; Conditions</h3>
            <button onClick={addTerm} style={btnAdd}>+ Add Term</button>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 10 }}>
            Pre-filled from {q.branch === 'IN' ? 'India' : 'Malaysia'} template. Edit or remove any item.
          </p>
          {q.terms.map((t, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#c8993a', fontWeight: 700, fontSize: '0.85rem', minWidth: 20, paddingTop: 8 }}>{idx + 1}.</span>
              <textarea
                style={{ ...input, flex: 1, height: 56, resize: 'vertical', fontSize: '0.83rem' }}
                value={t}
                onChange={e => updateTerm(idx, e.target.value)}
              />
              <button onClick={() => removeTerm(idx)} style={{ ...btnRemove, flexShrink: 0, marginTop: 6 }}>✕</button>
            </div>
          ))}
        </section>

        {/* ── Notes & Signature ── */}
        <section style={card}>
          <h3 style={cardTitle}>📝 Notes &amp; Authorisation</h3>
          <div style={{ marginBottom: 12 }}>
            <label style={fieldLabel}>Note / Disclaimer (shown on quotation)</label>
            <textarea
              style={{ ...input, height: 72, resize: 'vertical' }}
              value={q.note}
              onChange={e => setField('note', e.target.value)}
              placeholder="E.g. All prices are in [currency]. E & O.E."
            />
          </div>
          <div style={grid2} className="form-grid-2">
            <Field label="Prepared By" value={q.preparedBy} onChange={v => setField('preparedBy', v)} placeholder="Your name" />
            <Field label="Title / Designation" value={q.preparedTitle} onChange={v => setField('preparedTitle', v)} placeholder="e.g. Sales Manager" />
          </div>
        </section>

        {/* ── Action bar ── */}
        {saveError && (
          <div style={{ background: '#fde8e8', color: '#c0392b', border: '1px solid #f5c0c0', borderRadius: 8, padding: '10px 16px', marginBottom: 12, fontSize: '0.85rem' }}>
            {saveError}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingBottom: 40 }}>
          <Link to="/quotations" style={{ ...btnSecondary, padding: '10px 22px', borderRadius: 8 }}>Cancel</Link>
          <button onClick={() => handleSave('Draft')} style={{ ...btnOutline, padding: '10px 22px', borderRadius: 8 }} disabled={saving}>💾 {saving ? 'Saving…' : 'Save Draft'}</button>
          <button onClick={() => handleSave('Sent')} style={{ ...btnPrimary, padding: '10px 26px', borderRadius: 8, fontSize: '0.95rem' }} disabled={saving}>📤 {saving ? 'Saving…' : 'Save & View'}</button>
        </div>

      </div>
    </div>
  )
}

// ── Helper components ──────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label style={fieldLabel}>{label}</label>
      <input
        type={type}
        style={input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

function TotRow({ label, val }) {
  return (
    <tr>
      <td style={{ padding: '6px 8px', color: '#555' }}>{label}</td>
      <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>{val}</td>
    </tr>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────
const toolbar = {
  background: '#1a3c6e', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '10px 24px', gap: 10, flexWrap: 'wrap',
  position: 'sticky', top: 0, zIndex: 100,
  boxShadow: '0 2px 12px rgba(0,0,0,.3)',
}
const toolbarTitle = { fontSize: 15, fontWeight: 800 }
const btnPrimary = { border: 'none', padding: '7px 18px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, background: '#c8993a', color: '#fff' }
const btnOutline = { border: '2px solid #c8993a', padding: '7px 18px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, background: 'transparent', color: '#c8993a' }
const btnSecondary = { border: '1px solid rgba(255,255,255,.35)', padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(255,255,255,.12)', color: '#fff', display: 'inline-block', textDecoration: 'none' }
const btnAdd = { border: '1.5px dashed #1a5aaf', padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, background: '#f0f6ff', color: '#1a5aaf' }
const btnRemove = { border: 'none', background: '#fee', color: '#c0392b', borderRadius: 4, cursor: 'pointer', width: 26, height: 26, fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const branchBtn = { border: '2px solid', padding: '10px 22px', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, transition: 'all 0.15s' }

const formWrap = { maxWidth: 860, margin: '0 auto', padding: '28px 20px' }
const card = { background: '#fff', borderRadius: 12, padding: '22px 24px', marginBottom: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }
const cardTitle = { color: '#1a3c6e', fontWeight: 800, fontSize: '1rem', marginBottom: 16 }
const grid2 = { display: 'grid', gap: '12px 20px' }
const fieldLabel = { display: 'block', fontSize: '0.75rem', color: '#5a6272', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }
const input = { width: '100%', border: '1.5px solid #d0d6e0', borderRadius: 7, padding: '8px 10px', fontSize: '0.88rem', color: '#111', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }
const itemTh = { padding: '8px 8px', textAlign: 'left', fontWeight: 600, fontSize: '0.78rem', whiteSpace: 'nowrap' }
const itemTd = { padding: '6px 6px', borderBottom: '1px solid #e8ecf4', verticalAlign: 'middle' }
const tableInput = { border: '1px solid #d0d6e0', borderRadius: 5, padding: '5px 7px', fontSize: '0.85rem', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }
