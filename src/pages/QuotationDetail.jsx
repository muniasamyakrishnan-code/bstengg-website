import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getQuotation, deleteQuotation } from '../utils/quotationStore'
import { provider, providerIN, bankDetails } from '../data/company'

function fmt(n) {
  return Number(n || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function QuotationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [q, setQ] = useState(null)
  const [loading, setLoading] = useState(true)
  const [printPreview, setPrintPreview] = useState(false)
  const [emailPreview, setEmailPreview] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [composeTo, setComposeTo] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const pageRef = useRef(null)

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

  async function sendWithPdf() {
    if (!composeTo) return
    setPdfGenerating(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const filename = `Quotation-${q.quotationNo || q.id}.pdf`
      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(pageRef.current)
        .save()
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(composeTo)}&su=${encodeURIComponent(composeSubject)}&body=${encodeURIComponent(composeBody)}`
      window.open(gmailUrl, '_blank')
      setShowCompose(false)
    } catch (err) {
      console.error('PDF generation failed', err)
    } finally {
      setPdfGenerating(false)
    }
  }

  function openCompose() {
    setComposeTo(q.customer?.email || '')
    setComposeSubject(emailSubject)
    setComposeBody(emailBody)
    setShowCompose(true)
  }

  async function handleDelete() {
    if (!window.confirm(`Delete quotation ${q.quotationNo || q.id}?`)) return
    await deleteQuotation(q.id)
    navigate('/quotations')
  }

  const emailSubject = `Quotation ${q.quotationNo || q.id} – ${q.scope || 'Services'}`
  const emailBody = [
    `Dear ${q.customer?.attention || q.customer?.name || 'Sir/Madam'},`,
    '',
    'Please find attached our quotation for your reference:',
    '',
    `Quotation No : ${q.quotationNo || q.id}`,
    `Date         : ${q.date}`,
    `Scope        : ${q.scope}`,
    `Total Amount : ${cur} ${Number(q.total || 0).toFixed(2)}`,
    `Validity     : ${q.validity}`,
    '',
    'Please do not hesitate to contact us if you require any clarification.',
    '',
    'Thank you.',
    '',
    `${q.preparedBy || 'Best Sun Tech Engineering'}`,
    `${q.preparedTitle || ''}`,
    q.branch === 'IN' ? 'Best Sun Tech Engineering Pvt Ltd' : 'Best Sun Tech Engineering Sdn Bhd',
    q.branch === 'IN' ? 'Tel: +91 82484 75435 | HP: +91 86376 15010' : 'HP: 019-2828 9180 | Tel: 603-4813 9407',
    'Email: bstengg@yahoo.com',
  ].join('\n')

  return (
    <div style={{ background: (printPreview || emailPreview) ? '#f0f0f0' : '#b0b8c8', minHeight: '100vh', paddingBottom: 40 }}>

      {/* Main Toolbar */}
      {!printPreview && !emailPreview && (
        <div style={toolbar} className="no-print">
          <span style={toolbarTitle}>📄 {q.quotationNo || q.id} &nbsp;·&nbsp; {isIN ? '🇮🇳 India' : '🇲🇾 Malaysia'}</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/quotations" style={btnSecondary}>← Back</Link>
            <Link to={`/quotations/${q.id}/edit`} style={{ ...btnSecondary, background: 'rgba(200,153,58,0.25)', borderColor: '#c8993a', color: '#c8993a' }}>✏️ Edit</Link>
            <div style={sep} />
            <button onClick={openCompose} style={btnEmail}>✉️ Compose &amp; Send</button>
            <div style={sep} />
            <button onClick={() => setPrintPreview(true)} style={{ ...btnPrint, background: '#6c7fd8' }}>👁️ Print Preview</button>
            <button onClick={() => window.print()} style={btnPrint}>🖨️ Print / Save PDF</button>
            <button onClick={handleDelete} style={btnDelete}>🗑️ Delete</button>
          </div>
        </div>
      )}

      {/* Print Preview toolbar */}
      {printPreview && (
        <div style={{ ...toolbar, background: '#2d2d2d', justifyContent: 'center', gap: 16 }} className="no-print">
          <span style={{ ...toolbarTitle, color: '#ccc' }}>👁️ Print Preview — {q.quotationNo || q.id}</span>
          <div style={sep} />
          <button onClick={() => { setPrintPreview(false); window.print() }} style={btnPrint}>🖨️ Print / Save PDF</button>
          <button onClick={() => setPrintPreview(false)} style={{ ...btnSecondary, borderColor: 'rgba(255,255,255,.4)' }}>✕ Close Preview</button>
        </div>
      )}

      {/* Email Preview toolbar */}
      {emailPreview && (
        <div style={{ ...toolbar, background: '#1a7a4a', justifyContent: 'center', gap: 16 }} className="no-print">
          <span style={{ ...toolbarTitle, color: '#fff' }}>✉️ Email Preview — {q.quotationNo || q.id}</span>
          <div style={sep} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
            <span><strong>To:</strong> {composeTo || q.customer?.email || '(no email)'}</span>
            <span><strong>Subject:</strong> {composeSubject || emailSubject}</span>
          </div>
          <div style={sep} />
          <a
            href={`mailto:${composeTo || q.customer?.email || ''}?subject=${encodeURIComponent(composeSubject || emailSubject)}&body=${encodeURIComponent(composeBody || emailBody)}`}
            onClick={() => setEmailPreview(false)}
            style={{ ...btnPrint, background: '#fff', color: '#1a7a4a', textDecoration: 'none', display: 'inline-block' }}
          >
            ✉️ Send Email
          </a>
          <button onClick={() => setEmailPreview(false)} style={{ ...btnSecondary, borderColor: 'rgba(255,255,255,.4)' }}>✕ Close Preview</button>
        </div>
      )}

      {/* Compose Email Modal */}
      {showCompose && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={modalHeader}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>✉️ Compose Email</h3>
              <button onClick={() => setShowCompose(false)} style={modalClose}>✕</button>
            </div>
            <div style={modalBody}>
              <div style={{ ...composeRow, background: '#f0f7ff', borderRadius: 6, padding: '6px 10px', borderBottom: 'none', marginBottom: 4 }}>
                <label style={composeLabel}>From</label>
                <span style={{ fontSize: '0.88rem', color: '#1a5aaf', fontWeight: 600 }}>muniasamyakrishnan@gmail.com</span>
              </div>
              <div style={composeRow}>
                <label style={composeLabel}>To</label>
                <input type="email" value={composeTo} onChange={e => setComposeTo(e.target.value)} placeholder="customer@email.com" style={composeInput} />
              </div>
              <div style={composeRow}>
                <label style={composeLabel}>Subject</label>
                <input type="text" value={composeSubject} onChange={e => setComposeSubject(e.target.value)} style={composeInput} />
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ ...composeLabel, display: 'block', marginBottom: 6 }}>Message</label>
                <textarea value={composeBody} onChange={e => setComposeBody(e.target.value)} style={composeTextarea} rows={14} />
              </div>
              <div style={attachNote}>
                <span style={{ fontSize: '1rem' }}>📎</span>
                <span><strong>Click "Send via Gmail"</strong> — the PDF downloads automatically, then Gmail opens. Drag the downloaded PDF into the Gmail window to attach it.</span>
              </div>
            </div>
            <div style={modalFooter}>
              <div style={{ flex: 1 }} />
              <button onClick={() => setShowCompose(false)} style={cancelBtn}>Cancel</button>
              <button
                onClick={sendWithPdf}
                disabled={!composeTo || pdfGenerating}
                style={{ ...sendBtn, opacity: (composeTo && !pdfGenerating) ? 1 : 0.5, cursor: (composeTo && !pdfGenerating) ? 'pointer' : 'not-allowed', border: 'none' }}
              >
                {pdfGenerating ? '⏳ Generating PDF…' : '📧 Send via Gmail'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── A4 Page ── */}
      <div className="quotation-outer">
      <div style={page} ref={pageRef}>

        {/* 1. Letterhead — logo + company name left, registration right */}
        <div style={letterhead}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <img src="/logo.png" alt="Best Sun Tech Logo" style={{ height: 68, width: 'auto', objectFit: 'contain', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '13pt', fontWeight: 900, color: '#1a3c6e', letterSpacing: '0.3px', lineHeight: 1.15 }}>
                {isIN ? 'BEST SUN TECH ENGINEERING PVT LTD' : 'BEST SUN TECH ENGINEERING SDN BHD'}
              </div>
              <div style={{ fontSize: '7.5pt', color: '#c8993a', fontStyle: 'italic', marginTop: 2, marginBottom: 6 }}>
                One Stop Solution for Your Laundry Business
              </div>
              <div style={{ fontSize: '7.5pt', color: '#555', lineHeight: 1.75 }}>
                {prov.address}<br />
                <span style={{ color: '#777' }}>Tel:</span> {prov.tel}&nbsp;&nbsp;
                <span style={{ color: '#aaa' }}>|</span>&nbsp;&nbsp;
                <span style={{ color: '#777' }}>HP:</span> {prov.hp}&nbsp;&nbsp;
                <span style={{ color: '#aaa' }}>|</span>&nbsp;&nbsp;
                <span style={{ color: '#777' }}>Email:</span> {prov.email}
              </div>
            </div>
          </div>
          <div style={{ borderLeft: '3px solid #1a3c6e', paddingLeft: 14, flexShrink: 0, fontSize: '7.5pt', color: '#444' }}>
            {(isIN
              ? [['GSTIN/UIN', providerIN.gstin]]
              : [['BRN', provider.brn], ['Supplier TIN', provider.tin], ['SST No', provider.sst]]
            ).map(([lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ display: 'inline-block', width: 82, textAlign: 'right', color: '#1a3c6e', fontWeight: 700, flexShrink: 0 }}>{lbl}</span>
                <span style={{ marginLeft: 10, whiteSpace: 'nowrap' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Double separator line */}
        <div style={{ height: 3, background: '#1a3c6e', marginBottom: 2 }} />
        <div style={{ height: 1.5, background: '#c8993a', marginBottom: 0 }} />

        {/* 2. Quotation title + Date — grey background bar like Electrolux */}
        <div style={quotationHeader}>
          <div style={quotationTitle}>
            <span style={{ fontSize: '11pt', fontWeight: 700, color: '#1a3c6e' }}>Quotation </span>
            {q.quotationNo || q.id}
          </div>
          <div style={quotationDate}>
            Date &nbsp;<strong style={{ fontSize: '13pt', color: '#1a3c6e' }}>{q.date}</strong>
          </div>
        </div>

        {/* 3. Destination | Sold to */}
        <div style={infoGrid}>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Destination</div>
            <div style={infoBoxText}>
              {q.destination ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{q.destination}</div>
              ) : (
                <>
                  <div style={{ fontWeight: 700 }}>{q.customer?.name || '—'}</div>
                  {q.customer?.tin && <div>({q.customer.tin})</div>}
                  {q.customer?.address && <div>{q.customer.address}</div>}
                  {q.customer?.attention && <div>{q.customer.attention}</div>}
                </>
              )}
            </div>
          </div>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Sold to</div>
            <div style={infoBoxText}>
              {q.soldTo ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{q.soldTo}</div>
              ) : (
                <>
                  <div style={{ fontWeight: 700 }}>{q.customer?.name || '—'}</div>
                  {q.customer?.tradingAs && <div>({q.customer.tradingAs})</div>}
                  {q.customer?.tin && <div>{q.customer.tin}</div>}
                  {q.customer?.address && <div>{q.customer.address}</div>}
                  {q.customer?.phone && <div>{q.customer.phone}</div>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4. TERMS & CONDITIONS key-value box */}
        <div style={tcBox}>
          <div style={tcTitle}>TERMS &amp; CONDITIONS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div>
              <TcRow label="Delivery terms" val={q.delivery || 'Any Time'} />
              <TcRow label="Payment terms" val={q.paymentTerms || '30 Days'} />
              {q.pricelist && <TcRow label="Pricelist" val={q.pricelist} />}
              {q.transport && <TcRow label="Transport" val={q.transport} />}
              {q.warranty && <TcRow label="Warranty" val={q.warranty} />}
              <TcRow label="Validity" val={q.validity || '15 Days'} />
            </div>
            <div>
              {q.bankFees && <TcRow label="Bank fees" val={q.bankFees} />}
              {q.eInvoiceNo && <TcRow label="E-Invoice No" val={q.eInvoiceNo} />}
              {q.srNo && <TcRow label="S/R No" val={q.srNo} />}
              <TcRow label="Status" val={q.status || 'Draft'} />
            </div>
          </div>
        </div>

        {/* 5. Note — terms as lettered list */}
        {q.terms && q.terms.length > 0 && (
          <div style={noteSect}>
            <div style={noteSectTitle}>Note</div>
            {q.terms.map((t, i) => (
              <div key={i} style={{ fontSize: '7.5pt', color: '#333', lineHeight: 1.65, marginBottom: 1 }}>
                {String.fromCharCode(97 + i)}) {t}
              </div>
            ))}
          </div>
        )}

        {/* 6. Customer Order Reference banner — dark band like Electrolux */}
        <div style={custRefBanner}>
          <div style={custRefLeft}>
            <div style={{ fontSize: '9pt', color: 'rgba(255,255,255,0.75)', marginBottom: 2 }}>Customer Order Reference</div>
            <div style={custRefName}>{q.customerRef || q.scope || q.customer?.name || '—'}</div>
          </div>
          <div style={custRefRight}>
            {q.agency && (
              <div style={custRefRow}>
                <span style={custRefLbl}>Agency</span>
                <strong style={{ color: '#fff', marginLeft: 8 }}>{q.agency}</strong>
              </div>
            )}
            {q.yourReference && (
              <div style={custRefRow}>
                <span style={custRefLbl}>Your reference</span>
                <strong style={{ color: '#fff', marginLeft: 8 }}>{q.yourReference}</strong>
              </div>
            )}
            {!q.yourReference && q.customer?.attention && (
              <div style={custRefRow}>
                <span style={custRefLbl}>Attention</span>
                <strong style={{ color: '#fff', marginLeft: 8 }}>{q.customer.attention}</strong>
              </div>
            )}
            {q.customer?.email && (
              <div style={{ ...custRefRow, fontSize: '7.5pt', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ ...custRefLbl, minWidth: 0 }} />
                <span>{q.customer.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* 7. Details table */}
        <div style={detailsLabel}>Details</div>
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
            </tr>
          </thead>
          <tbody>
            {(q.items || []).map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <td style={{ ...td, textAlign: 'center', fontWeight: 600, color: '#444' }}>
                  {String(item.sn * 10).padStart(4, '0')}
                </td>
                <td style={{ ...td, fontSize: '8pt' }}>{item.posNr || ''}</td>
                <td style={{ ...td, fontSize: '8pt' }}>{item.code || ''}</td>
                <td style={td}>
                  <div style={{ fontWeight: 600, color: '#111' }}>{item.description || item.descMain}</div>
                  {item.descSub && <div style={{ fontSize: '7.5pt', color: '#555', marginTop: 2 }}>{item.descSub}</div>}
                </td>
                <td style={{ ...td, textAlign: 'right' }}>{item.qty}</td>
                <td style={{ ...td, textAlign: 'right' }}>{fmt(item.unitPrice)}</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{fmt(item.amount)}</td>
                <td style={{ ...td, textAlign: 'right', fontSize: '7.5pt', color: '#555' }}>{item.expectedDate || ''}</td>
              </tr>
            ))}

            {/* Freight row */}
            {freight > 0 && (
              <tr style={{ background: '#fafafa' }}>
                <td colSpan={5} style={{ ...td, border: '1px solid #e0e0e0' }} />
                <td style={{ ...td, textAlign: 'right', color: '#555', fontStyle: 'italic', fontSize: '8pt', border: '1px solid #e0e0e0' }}>Freight / Handling</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600, border: '1px solid #e0e0e0' }}>{fmt(freight)}</td>
                <td style={{ ...td, border: '1px solid #e0e0e0' }} />
              </tr>
            )}

            {/* Tax row */}
            {q.applyTax && taxAmt > 0 && (
              <tr style={{ background: '#fafafa' }}>
                <td colSpan={5} style={{ ...td, border: '1px solid #e0e0e0' }} />
                <td style={{ ...td, textAlign: 'right', color: '#555', fontStyle: 'italic', fontSize: '8pt', border: '1px solid #e0e0e0' }}>
                  {taxLabel} ({taxRate}%){q.taxNote ? ` — ${q.taxNote}` : ''}
                </td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600, border: '1px solid #e0e0e0' }}>{fmt(taxAmt)}</td>
                <td style={{ ...td, border: '1px solid #e0e0e0' }} />
              </tr>
            )}

            {/* Deposit row */}
            {deposit > 0 && (
              <tr style={{ background: '#fafafa' }}>
                <td colSpan={5} style={{ ...td, border: '1px solid #e0e0e0' }} />
                <td style={{ ...td, textAlign: 'right', color: '#555', fontStyle: 'italic', fontSize: '8pt', border: '1px solid #e0e0e0' }}>Less Deposit</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600, border: '1px solid #e0e0e0' }}>({fmt(deposit)})</td>
                <td style={{ ...td, border: '1px solid #e0e0e0' }} />
              </tr>
            )}

            {/* Total row */}
            <tr style={{ background: '#f0f0f0' }}>
              <td colSpan={5} style={{ ...td, border: '1px solid #bbb', background: '#f0f0f0' }} />
              <td style={{ ...td, fontWeight: 900, fontSize: '9pt', textAlign: 'right', border: '1px solid #bbb', color: '#333', background: '#f0f0f0' }}>Total</td>
              <td style={{ ...td, fontWeight: 900, fontSize: '9.5pt', textAlign: 'right', border: '1px solid #bbb', color: '#1a3c6e', background: '#f0f0f0' }}>
                {cur} &nbsp;{fmt(total)}
              </td>
              <td style={{ ...td, border: '1px solid #bbb', background: '#f0f0f0' }} />
            </tr>
          </tbody>
        </table>

        {/* 8. Bill to */}
        <div style={{ ...infoGrid, gridTemplateColumns: '1fr 1.8fr', marginTop: 14 }}>
          <div style={infoBox}>
            <div style={infoBoxLabel}>Bill to</div>
            <div style={infoBoxText}>
              {q.billTo ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{q.billTo}</div>
              ) : (
                <>
                  <div style={{ fontWeight: 700 }}>{q.customer?.name || '—'}</div>
                  {q.customer?.tradingAs && <div>({q.customer.tradingAs})</div>}
                  {q.customer?.tin && <div>{q.customer.tin}</div>}
                  {q.customer?.address && <div>{q.customer.address}</div>}
                  {q.customer?.phone && <div>{q.customer.phone}</div>}
                </>
              )}
            </div>
          </div>
          <div />
        </div>

        {/* Additional note */}
        {q.note && (
          <div style={noteBox}>
            <strong style={{ color: '#8a6a00' }}>Note:</strong> {q.note}
          </div>
        )}

        {/* 9. Signatures */}
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

        {/* 10. Footer — two column: company info | banking details */}
        <div style={docFooter}>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <div style={{ fontSize: '7.5pt', color: '#333', fontWeight: 700, marginBottom: 2 }}>{prov.name}</div>
              <div style={{ fontSize: '7pt', color: '#666', lineHeight: 1.65 }}>
                {prov.address}<br />
                Reg no.: {isIN ? providerIN.gstin : provider.brn}<br />
                Tel: {prov.tel} &nbsp;|&nbsp; Website: {bankDetails.website}
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
            <div style={{ fontSize: '7pt', color: '#999', fontStyle: 'italic', marginTop: 4 }}>Created on {q.date}</div>
          </div>
        </div>

      </div>
      </div>{/* end quotation-outer */}

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

// ── Helper components ─────────────────────────────────────────────────────

function TcRow({ label, val }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '3px 0', borderBottom: '1px solid #ebebeb', fontSize: '8.5pt' }}>
      <span style={{ color: '#333', fontWeight: 700, minWidth: 108, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#111' }}>{val}</span>
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
const btnPrint    = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#f5a623', color: '#1a1a1a' }
const btnEmail    = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#1a7a4a', color: '#fff', textDecoration: 'none', display: 'inline-block' }
const btnDelete   = { border: 'none', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: '#c0392b', color: '#fff' }
const btnSecondary = { border: '1px solid rgba(255,255,255,.3)', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.15)', color: '#fff', display: 'inline-block', textDecoration: 'none' }
const sep = { width: 1, height: 24, background: 'rgba(255,255,255,.25)' }

const page = {
  width: 794,
  minHeight: 1123,
  background: '#fff',
  margin: '20px auto',
  padding: '40px 50px 48px',
  boxShadow: '0 6px 32px rgba(0,0,0,.28)',
  borderRadius: 2,
  position: 'relative',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '9.5pt',
  color: '#111',
}

// Letterhead
const letterhead = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 12, marginBottom: 10, gap: 20 }

// Quotation title row — full-width light grey bar (padding matches page 50px)
const quotationHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0f0f0', padding: '10px 50px', marginBottom: 20, marginLeft: -50, marginRight: -50 }
const quotationTitle  = { fontSize: '16pt', fontWeight: 900, color: '#1a3c6e' }
const quotationDate   = { fontSize: '9.5pt', color: '#555' }

// Destination / Sold to / Bill to boxes — square corners like Electrolux
const infoGrid     = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }
const infoBox      = { border: '1px solid #bbb', padding: '8px 10px' }
const infoBoxLabel = { fontSize: '8pt', fontWeight: 700, color: '#1a3c6e', marginBottom: 6 }
const infoBoxText  = { fontSize: '8.5pt', color: '#222', lineHeight: 1.7 }

// T&C box — white background, thin border
const tcBox   = { border: '1px solid #bbb', padding: '10px 12px', marginBottom: 18, background: '#fff' }
const tcTitle = { fontSize: '8.5pt', fontWeight: 900, color: '#1a3c6e', marginBottom: 8 }

// Note section
const noteSect      = { marginBottom: 18 }
const noteSectTitle = { fontSize: '8.5pt', fontWeight: 700, color: '#222', marginBottom: 5 }

// Customer Order Reference banner — full-width dark band (padding matches page 50px)
const custRefBanner  = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2a2a2a', padding: '10px 50px', marginBottom: 16, marginLeft: -50, marginRight: -50, gap: 20 }
const custRefLeft    = { flex: 1 }
const custRefHeading = { fontSize: '9pt', color: 'rgba(255,255,255,0.7)', marginBottom: 3 }
const custRefName    = { fontSize: '14pt', fontWeight: 900, color: '#fff' }
const custRefRight   = { fontSize: '8.5pt', textAlign: 'right', flexShrink: 0 }
const custRefRow     = { display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 3, alignItems: 'baseline' }
const custRefLbl     = { color: 'rgba(255,255,255,0.65)', minWidth: 90, textAlign: 'right' }

// Details table — full cell borders like Electrolux
const detailsLabel  = { fontSize: '8.5pt', fontWeight: 700, color: '#222', marginBottom: 6 }
const itemsTable    = { width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', marginBottom: 16, border: '1px solid #bbb' }
const tableHeaderRow = { background: '#f0f0f0' }
const th = { padding: '6px 8px', textAlign: 'left', fontWeight: 700, fontSize: '8pt', color: '#222', border: '1px solid #bbb' }
const td = { padding: '7px 8px', border: '1px solid #e0e0e0', verticalAlign: 'top', lineHeight: 1.5 }

// Note box
const noteBox = { background: '#fffbf0', border: '1px solid #e8d88a', borderRadius: 4, padding: '8px 10px', fontSize: '8pt', color: '#5a4a00', marginBottom: 12, lineHeight: 1.55 }

// Signatures
const sigGrid  = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 12, marginTop: 20 }
const sigBox   = { borderTop: '1.5px solid #333', paddingTop: 6 }
const sigLabel = { fontSize: '8pt', color: '#555' }
const sigName  = { fontSize: '9pt', fontWeight: 700, color: '#1a3c6e', marginTop: 2 }
const sigTitle = { fontSize: '8pt', color: '#666' }

// Footer
const docFooter = { borderTop: '1.5px solid #d0d0d0', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '7.5pt', color: '#888', marginTop: 10 }

// Compose Email Modal
const modalOverlay   = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const modalBox       = { background: '#fff', borderRadius: 12, width: '100%', maxWidth: 600, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', maxHeight: '92vh' }
const modalHeader    = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: '#1a3c6e', color: '#fff', borderRadius: '12px 12px 0 0' }
const modalClose     = { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }
const modalBody      = { padding: '18px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }
const modalFooter    = { padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', gap: 10, alignItems: 'center' }
const composeRow     = { display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f0f0f0', paddingBottom: 10 }
const composeLabel   = { fontSize: '0.78rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, width: 64, flexShrink: 0 }
const composeInput   = { flex: 1, border: '1px solid #dde3ef', borderRadius: 6, padding: '7px 10px', fontSize: '0.88rem', color: '#1a3c6e', outline: 'none' }
const composeTextarea = { width: '100%', border: '1px solid #dde3ef', borderRadius: 6, padding: '10px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#333', resize: 'vertical', background: '#f8f9fc', boxSizing: 'border-box', lineHeight: 1.6 }
const attachNote     = { display: 'flex', gap: 10, alignItems: 'flex-start', background: '#fffbf0', border: '1px solid #e8d88a', borderRadius: 8, padding: '10px 12px', fontSize: '0.82rem', color: '#5a4a00', marginTop: 4 }
const cancelBtn      = { padding: '8px 16px', borderRadius: 6, border: '1px solid #dde3ef', background: '#fff', color: '#5a6272', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }
const sendBtn        = { padding: '8px 18px', borderRadius: 6, border: 'none', background: '#1a7a4a', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }
