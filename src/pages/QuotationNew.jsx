import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveQuotation, generateId } from '../utils/quotationStore'
import { provider, providerIN, bankDetails } from '../data/company'

function fmt(n) {
  return Number(n || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const defaultTcRows = [
  { label: 'Delivery terms', val: 'Any Time' },
  { label: 'Payment terms', val: '30 Days' },
  { label: 'Pricelist', val: '' },
  { label: 'Transport', val: '' },
  { label: 'Warranty', val: '' },
  { label: 'Validity', val: '15 Days' },
  { label: 'Bank fees', val: '' },
]

const defaultNotes = [
  'Price NET Ex-Shah Alam.',
  'Goods sold are STRICTLY not returnable.',
  'Delivery: Approximately 4 to 6 weeks upon receipt advance payment before order the spare part.',
  'NO warranty if install by end-user, third party, freelance contractor/technician, service engineer/specialist, etc.',
  'A 25% of restocking fees will be imposed if return spare part and confirmed by The Management.',
  'Validity: Strictly 30 days',
]

function blankItem(sn) {
  return { sn, posNr: '', code: '', description: '', descSub: '', qty: 1, unitPrice: 0, amount: 0, expectedDate: '' }
}

export default function QuotationNew() {
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const [saving, setSaving] = useState(false)

  const today = new Date().toISOString().slice(0, 10)
  const [qNo, setQNo] = useState('')
  const [date, setDate] = useState(today)
  const [destination, setDestination] = useState('')
  const [soldTo, setSoldTo] = useState('')
  const [tcRows, setTcRows] = useState(defaultTcRows)
  const [notes, setNotes] = useState(defaultNotes)
  const [customerRef, setCustomerRef] = useState('')
  const [agency, setAgency] = useState('')
  const [yourRef, setYourRef] = useState('')
  const [items, setItems] = useState([blankItem(1)])
  const [billTo, setBillTo] = useState('')

  const subtotal = items.reduce((s, it) => s + Number(it.amount || 0), 0)

  // ── Item helpers ────────────────────────────────────────────────────
  function updateItem(idx, field, value) {
    setItems(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: value }
      if (field === 'qty' || field === 'unitPrice') {
        const q = field === 'qty' ? Number(value) : Number(next[idx].qty)
        const u = field === 'unitPrice' ? Number(value) : Number(next[idx].unitPrice)
        next[idx].amount = q * u
      }
      return next
    })
  }

  function addItem() {
    setItems(prev => [...prev, blankItem(prev.length + 1)])
  }

  function removeItem(idx) {
    setItems(prev => prev.filter((_, i) => i !== idx).map((it, i) => ({ ...it, sn: i + 1 })))
  }

  // ── TC row helpers ──────────────────────────────────────────────────
  function updateTcRow(idx, field, value) {
    setTcRows(prev => { const next = [...prev]; next[idx] = { ...next[idx], [field]: value }; return next })
  }
  function addTcRow() { setTcRows(prev => [...prev, { label: '', val: '' }]) }
  function removeTcRow(idx) { setTcRows(prev => prev.filter((_, i) => i !== idx)) }

  // ── Note helpers ────────────────────────────────────────────────────
  function updateNote(idx, value) {
    setNotes(prev => { const next = [...prev]; next[idx] = value; return next })
  }
  function addNote() { setNotes(prev => [...prev, '']) }
  function removeNote(idx) { setNotes(prev => prev.filter((_, i) => i !== idx)) }

  // ── Save ────────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    try {
      const id = generateId()
      const q = {
        id,
        quotationNo: qNo || id,
        date,
        destination,
        soldTo,
        billTo,
        tcRows,
        terms: notes,
        customerRef,
        agency,
        yourReference: yourRef,
        items: items.map((it, i) => ({ ...it, sn: i + 1 })),
        subtotal,
        total: subtotal,
        currency: 'INR',
        branch: 'MY',
        // Flat TC fields for QuotationDetail compatibility
        delivery: tcRows.find(r => r.label === 'Delivery terms')?.val || '',
        paymentTerms: tcRows.find(r => r.label === 'Payment terms')?.val || '',
        pricelist: tcRows.find(r => r.label === 'Pricelist')?.val || '',
        transport: tcRows.find(r => r.label === 'Transport')?.val || '',
        warranty: tcRows.find(r => r.label === 'Warranty')?.val || '',
        validity: tcRows.find(r => r.label === 'Validity')?.val || '',
        bankFees: tcRows.find(r => r.label === 'Bank fees')?.val || '',
      }
      await saveQuotation(q)
      navigate(`/quotations/${id}`)
    } catch (err) {
      console.error('Save failed', err)
      alert('Failed to save quotation. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ background: '#b0b8c8', minHeight: '100vh', paddingBottom: 40 }}>

      <style>{`
        .doc-input {
          border: 1px solid transparent;
          background: transparent;
          outline: none;
          width: 100%;
          font-family: Arial, Helvetica, sans-serif;
          font-size: inherit;
          color: inherit;
          padding: 1px 3px;
          box-sizing: border-box;
          resize: none;
        }
        .doc-input:hover { border-color: #91b8e0; }
        .doc-input:focus { border-color: #1a5aaf; background: #f0f7ff; }
        .doc-input-inline {
          border: 1px solid transparent;
          background: transparent;
          outline: none;
          font-family: Arial, Helvetica, sans-serif;
          font-size: inherit;
          color: inherit;
          padding: 1px 3px;
          box-sizing: border-box;
        }
        .doc-input-inline:hover { border-color: #91b8e0; }
        .doc-input-inline:focus { border-color: #1a5aaf; background: #f0f7ff; }
        .doc-input-white:hover { border-color: rgba(255,255,255,0.5) !important; background: transparent !important; }
        .doc-input-white:focus { border-color: #fff !important; background: rgba(255,255,255,0.1) !important; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          nav, footer { display: none !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div style={toolbar} className="no-print">
        <span style={toolbarTitle}>✨ New Quotation</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => navigate('/quotations')} style={btnSecondary}>← Cancel</button>
          <div style={sep} />
          <button onClick={() => window.print()} style={{ ...btnPrint, background: '#6c7fd8' }}>🖨️ Print</button>
          <button onClick={handleSave} disabled={saving} style={{ ...btnPrint, opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? '⏳ Saving…' : '💾 Save Quotation'}
          </button>
        </div>
      </div>

      {/* ── A4 Page ── */}
      <div className="quotation-outer">
      <div style={page} ref={pageRef}>

        {/* 1. Letterhead — India style: logo-left + company-right */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          marginLeft: -50, marginRight: -50,
          padding: '0 50px',
          background: '#fff',
        }}>
          {/* Left: large logo */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
            paddingRight: 20, paddingBottom: 10, flexShrink: 0, width: 200,
          }}>
            <img src="/logo.png" alt="BST Logo" style={{ width: 190, height: 190, objectFit: 'contain', display: 'block' }} />
          </div>

          {/* Right: company details */}
          <div style={{ flex: 1, paddingTop: 4, paddingBottom: 8 }}>
            {/* Company name */}
            <div style={{ fontSize: '16pt', fontWeight: 900, color: '#1a3c6e', letterSpacing: '0.4px', lineHeight: 1.15, marginBottom: 8, whiteSpace: 'nowrap', textAlign: 'left' }}>
              BEST SUN TECH ENGINEERING PRIVATE LTD
            </div>
            {/* Address + contacts — bold italic right-aligned */}
            <div style={{ fontSize: '8.5pt', fontWeight: 700, fontStyle: 'italic', color: '#333', lineHeight: 1.85, textAlign: 'right' }}>
              Flat No.184, Senthoor Nagar, Manjampatti Village,<br />
              Natham Main Road, Madurai - 625014, Tamil Nadu, India<br />
              T: {providerIN.tel}&nbsp;&nbsp; H/P: {providerIN.hp}<br />
              <span style={{ textDecoration: 'underline', color: '#1a3c6e' }}>E: {providerIN.email}</span>
            </div>
            {/* Divider + GSTIN row */}
            <div style={{ marginTop: 8, paddingTop: 5, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '8.5pt', fontWeight: 700, fontStyle: 'italic', color: '#333' }}>
                <span style={{ textDecoration: 'underline' }}>GSTIN/UIN</span> : {providerIN.gstin}
              </div>
              <div style={{ fontSize: '8.5pt', fontWeight: 700, fontStyle: 'italic', color: '#333' }}>
                <span style={{ textDecoration: 'underline' }}>RN</span>: {provider.brn}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom separator — thick navy */}
        <div style={{ height: 3, background: '#1a3c6e', marginLeft: -50, marginRight: -50, marginBottom: 0 }} />

        {/* 2. Quotation header bar */}
        <div style={quotationHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '11pt', fontWeight: 700, color: '#111' }}>Quotation</span>
            <input
              className="doc-input-inline"
              value={qNo}
              onChange={e => setQNo(e.target.value)}
              placeholder="Q-2026-001"
              style={{ fontSize: '16pt', fontWeight: 900, color: '#1a3c6e', width: 180 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '9.5pt', color: '#555' }}>
            <span>Date</span>
            <input
              className="doc-input-inline"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ fontSize: '11pt', fontWeight: 700, color: '#1a3c6e' }}
            />
          </div>
        </div>

        {/* 3. Destination | Sold to */}
        <div style={infoGrid}>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Destination</div>
            <textarea
              className="doc-input"
              rows={4}
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder={'Customer / company name\nAddress line 1\nAddress line 2\nCity, Postcode'}
              style={{ fontSize: '8.5pt' }}
            />
          </div>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Sold to</div>
            <textarea
              className="doc-input"
              rows={4}
              value={soldTo}
              onChange={e => setSoldTo(e.target.value)}
              placeholder={'Company name\nTIN: C1234567890\nAddress line 1\nTel: 03-xxxx xxxx'}
              style={{ fontSize: '8.5pt' }}
            />
          </div>
        </div>

        {/* 4. Terms & Conditions */}
        <div style={tcBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={tcTitle}>TERMS &amp; CONDITIONS</div>
            <button className="no-print" onClick={addTcRow} style={addRowBtn}>+ Add row</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            {tcRows.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 4, padding: '2px 0', borderBottom: '1px solid #ebebeb', fontSize: '8.5pt', alignItems: 'center' }}>
                <input
                  className="doc-input-inline"
                  value={row.label}
                  onChange={e => updateTcRow(i, 'label', e.target.value)}
                  placeholder="Label"
                  style={{ fontWeight: 700, color: '#333', width: 110, flexShrink: 0 }}
                />
                <span style={{ color: '#bbb', flexShrink: 0, userSelect: 'none' }}>:</span>
                <input
                  className="doc-input-inline"
                  value={row.val}
                  onChange={e => updateTcRow(i, 'val', e.target.value)}
                  placeholder="Value"
                  style={{ color: '#111', flex: 1, minWidth: 0 }}
                />
                <button className="no-print" onClick={() => removeTcRow(i)} style={removeBtn}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Note */}
        <div style={noteSect}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={noteSectTitle}>Note</div>
            <button className="no-print" onClick={addNote} style={addRowBtn}>+ Add note</button>
          </div>
          {notes.map((note, i) => (
            <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 1 }}>
              <span style={{ fontSize: '7.5pt', color: '#333', lineHeight: 1.65, flexShrink: 0 }}>
                {String.fromCharCode(97 + i)})
              </span>
              <input
                className="doc-input-inline"
                value={note}
                onChange={e => updateNote(i, e.target.value)}
                placeholder="Enter note..."
                style={{ fontSize: '7.5pt', color: '#333', flex: 1 }}
              />
              <button className="no-print" onClick={() => removeNote(i)} style={removeBtn}>×</button>
            </div>
          ))}
        </div>


        {/* 7. Details table */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={detailsLabel}>Details</div>
          <button className="no-print" onClick={addItem} style={addRowBtn}>+ Add row</button>
        </div>
        <table style={itemsTable}>
          <thead>
            <tr style={tableHeaderRow}>
              <th style={{ ...th, width: 50, textAlign: 'center' }}>Area/Item</th>
              <th style={{ ...th, width: 68 }}>Pos. nr.</th>
              <th style={{ ...th, width: 76 }}>Code</th>
              <th style={th}>Description</th>
              <th style={{ ...th, width: 34, textAlign: 'right' }}>Qty</th>
              <th style={{ ...th, width: 78, textAlign: 'right' }}>Unit</th>
              <th style={{ ...th, width: 80, textAlign: 'right' }}>Total</th>
              <th style={{ ...th, width: 70, textAlign: 'right' }}>Expected</th>
              <th className="no-print" style={{ ...th, width: 28, border: 'none', background: 'transparent' }} />
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={{ ...td, textAlign: 'center', fontWeight: 600, color: '#444' }}>
                  {i + 1}
                </td>
                <td style={{ ...td, padding: 2 }}>
                  <input className="doc-input" value={item.posNr} onChange={e => updateItem(i, 'posNr', e.target.value)} style={{ fontSize: '8pt' }} />
                </td>
                <td style={{ ...td, padding: 2 }}>
                  <input className="doc-input" value={item.code} onChange={e => updateItem(i, 'code', e.target.value)} style={{ fontSize: '8pt' }} />
                </td>
                <td style={{ ...td, padding: 2 }}>
                  <input
                    className="doc-input"
                    value={item.description}
                    onChange={e => updateItem(i, 'description', e.target.value)}
                    placeholder="Description"
                    style={{ fontWeight: 600, color: '#111' }}
                  />
                  <input
                    className="doc-input"
                    value={item.descSub}
                    onChange={e => updateItem(i, 'descSub', e.target.value)}
                    placeholder="Sub-description (optional)"
                    style={{ fontSize: '7.5pt', color: '#555', marginTop: 2 }}
                  />
                </td>
                <td style={{ ...td, padding: 2 }}>
                  <input
                    className="doc-input"
                    type="number"
                    min="0"
                    value={item.qty}
                    onChange={e => updateItem(i, 'qty', e.target.value)}
                    style={{ textAlign: 'right', fontSize: '8.5pt' }}
                  />
                </td>
                <td style={{ ...td, padding: 2 }}>
                  <input
                    className="doc-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                    style={{ textAlign: 'right', fontSize: '8.5pt' }}
                  />
                </td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{fmt(item.amount)}</td>
                <td style={{ ...td, padding: 2 }}>
                  <input
                    className="doc-input"
                    value={item.expectedDate}
                    onChange={e => updateItem(i, 'expectedDate', e.target.value)}
                    placeholder="Q3 2026"
                    style={{ fontSize: '7.5pt', color: '#555', textAlign: 'right' }}
                  />
                </td>
                <td className="no-print" style={{ ...td, textAlign: 'center', padding: 2, border: 'none', background: 'transparent' }}>
                  <button onClick={() => removeItem(i)} style={removeBtn} title="Remove row">×</button>
                </td>
              </tr>
            ))}

            {/* Total row */}
            <tr style={{ background: '#f0f0f0' }}>
              <td colSpan={5} style={{ ...td, border: '1px solid #bbb', background: '#f0f0f0' }} />
              <td style={{ ...td, fontWeight: 900, fontSize: '9pt', textAlign: 'right', border: '1px solid #bbb', color: '#333', background: '#f0f0f0' }}>Total</td>
              <td style={{ ...td, fontWeight: 900, fontSize: '9.5pt', textAlign: 'right', border: '1px solid #bbb', color: '#1a3c6e', background: '#f0f0f0' }}>
                INR &nbsp;{fmt(subtotal)}
              </td>
              <td style={{ ...td, border: '1px solid #bbb', background: '#f0f0f0' }} />
              <td className="no-print" style={{ background: 'transparent', border: 'none' }} />
            </tr>
          </tbody>
        </table>

        {/* 8. Bill to */}
        <div style={{ ...infoGrid, gridTemplateColumns: '1fr 1.8fr', marginTop: 14 }}>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Bill to</div>
            <textarea
              className="doc-input"
              rows={4}
              value={billTo}
              onChange={e => setBillTo(e.target.value)}
              placeholder={'Company name\nTIN: C1234567890\nAddress line\nTel: 03-xxxx xxxx'}
              style={{ fontSize: '8.5pt' }}
            />
          </div>
          <div />
        </div>

        {/* 9. Footer */}
        <div style={docFooter}>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <div style={{ fontSize: '7.5pt', color: '#333', fontWeight: 700, marginBottom: 2 }}>{provider.name}</div>
              <div style={{ fontSize: '7pt', color: '#666', lineHeight: 1.65 }}>
                {provider.address}<br />
                Reg no.: {provider.brn}<br />
                Tel: {provider.tel} &nbsp;|&nbsp; Website: {bankDetails.website}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '7.5pt', color: '#333', fontWeight: 700, marginBottom: 2 }}>Banking Details :</div>
              <div style={{ fontSize: '7pt', color: '#666', lineHeight: 1.65 }}>
                Bank Name &nbsp;&nbsp;&nbsp;: {bankDetails.bank}<br />
                Account no. &nbsp;&nbsp;: {bankDetails.accountNo}<br />
                Swift Code &nbsp;&nbsp;&nbsp;: {bankDetails.swift}<br />
                Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {bankDetails.footerEmail}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '7.5pt', color: '#555' }}>1/1</div>
            <div style={{ fontSize: '7pt', color: '#999', fontStyle: 'italic', marginTop: 4 }}>Created on {date}</div>
          </div>
        </div>

      </div>
      </div>

    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────

const toolbar = {
  background: '#1a3c6e', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '10px 20px', gap: 10, flexWrap: 'wrap',
  position: 'sticky', top: 0, zIndex: 100,
  boxShadow: '0 2px 12px rgba(0,0,0,.35)',
}
const toolbarTitle = { fontSize: 13, fontWeight: 800, letterSpacing: '.5px' }
const btnPrint     = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#f5a623', color: '#1a1a1a' }
const btnSecondary = { border: '1px solid rgba(255,255,255,.3)', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.15)', color: '#fff' }
const sep          = { width: 1, height: 24, background: 'rgba(255,255,255,.25)' }

const page = {
  width: 794,
  minHeight: 1123,
  background: '#fff',
  margin: '20px auto',
  padding: '0 50px 48px',
  boxShadow: '0 6px 32px rgba(0,0,0,.28)',
  borderRadius: 2,
  position: 'relative',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '9.5pt',
  color: '#111',
}

const letterhead = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 12, marginBottom: 10, gap: 20 }

const quotationHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0f0f0', padding: '10px 50px', marginBottom: 20, marginLeft: -50, marginRight: -50 }

const infoGrid     = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }
const infoBox      = { border: '1px solid #bbb', padding: '8px 10px' }
const infoBoxLabel = { fontSize: '8pt', fontWeight: 700, color: '#1a3c6e', marginBottom: 6 }

const tcBox   = { border: '1px solid #bbb', padding: '10px 12px', marginBottom: 18, background: '#fff' }
const tcTitle = { fontSize: '8.5pt', fontWeight: 900, color: '#1a3c6e' }

const noteSect      = { marginBottom: 18 }
const noteSectTitle = { fontSize: '8.5pt', fontWeight: 700, color: '#222' }

const custRefBanner = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2a2a2a', padding: '10px 50px', marginBottom: 16, marginLeft: -50, marginRight: -50, gap: 20 }
const custRefLeft   = { flex: 1 }
const custRefRight  = { fontSize: '8.5pt', textAlign: 'right', flexShrink: 0 }

const detailsLabel  = { fontSize: '8.5pt', fontWeight: 700, color: '#222' }
const itemsTable    = { width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', marginBottom: 16, border: '1px solid #bbb' }
const tableHeaderRow = { background: '#f0f0f0' }
const th = { padding: '6px 8px', textAlign: 'left', fontWeight: 700, fontSize: '8pt', color: '#222', border: '1px solid #bbb' }
const td = { padding: '7px 8px', border: '1px solid #e0e0e0', verticalAlign: 'top', lineHeight: 1.5 }

const docFooter = { borderTop: '1.5px solid #d0d0d0', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }

const addRowBtn = { border: '1px solid #1a5aaf', background: '#fff', color: '#1a5aaf', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: '7.5pt', fontWeight: 700 }
const removeBtn = { border: '1px solid #e0e0e0', background: '#fff', color: '#c0392b', borderRadius: 4, padding: '1px 6px', cursor: 'pointer', fontSize: '10pt', lineHeight: 1, fontWeight: 700 }
