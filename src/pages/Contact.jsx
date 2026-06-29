import { useState } from 'react'
import { provider } from '../data/company'

// NOTE FOR DEPLOYMENT:
// After deploying to Netlify, go to:
//   Netlify Dashboard → Forms → "enquiry" → Notifications → Add email notification
//   Set email to: muniasamyakrishnan@gmail.com

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const body = new URLSearchParams({
        'form-name': 'enquiry',
        ...form,
      }).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Contact</p>
          <h1 style={pageTitle} className="page-title">Contact Us</h1>
          <p style={pageSub}>Get in touch for enquiries, quotations or emergency support</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div style={twoCol} className="contact-two-col">

          {/* ── Left: contact info ── */}
          <div>
            <h2 style={sectionH2}>Get In Touch</h2>
            <p style={{ color: '#5a6272', lineHeight: 1.7, marginBottom: 32, fontSize: '0.95rem' }}>
              We're here to help with all your commercial laundry equipment needs —
              from routine maintenance to emergency breakdown support and spare parts supply.
            </p>

            <div style={infoGrid}>
              <div style={infoCard}>
                <div style={infoIcon}>📍</div>
                <div>
                  <div style={infoLabel}>Our Address</div>
                  <div style={infoVal}>{provider.address}</div>
                </div>
              </div>
              <div style={infoCard}>
                <div style={infoIcon}>📱</div>
                <div>
                  <div style={infoLabel}>Mobile / WhatsApp</div>
                  <a href={`tel:${provider.hp}`} style={infoLink}>{provider.hp}</a>
                </div>
              </div>
              <div style={infoCard}>
                <div style={infoIcon}>☎️</div>
                <div>
                  <div style={infoLabel}>Office Tel</div>
                  <a href={`tel:${provider.tel}`} style={infoLink}>{provider.tel}</a>
                  {provider.fax && <div style={{ fontSize: '0.82rem', color: '#5a6272', marginTop: 4 }}>Fax: {provider.fax}</div>}
                </div>
              </div>
              <div style={infoCard}>
                <div style={infoIcon}>✉️</div>
                <div>
                  <div style={infoLabel}>Email</div>
                  <a href={`mailto:${provider.email}`} style={infoLink}>{provider.email}</a>
                </div>
              </div>
            </div>

            <div style={regBox}>
              <div style={regTitle}>Registration Details</div>
              {[
                ['BRN', provider.brn],
                ['Supplier TIN', provider.tin],
                ['SST No', provider.sst],
              ].map(([label, val]) => (
                <div key={label} style={regRow}>
                  <span style={regLabel}>{label}</span>
                  <span style={regVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: enquiry form ── */}
          <div>
            <div style={formCard}>
              <h2 style={{ ...sectionH2, marginBottom: 8 }}>Send an Enquiry</h2>
              <p style={{ color: '#5a6272', fontSize: '0.85rem', marginBottom: 24 }}>
                Fill in the form below and we'll get back to you within 1 business day.
              </p>

              {status === 'success' ? (
                <div style={successBox}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                  <h3 style={{ fontWeight: 700, color: '#1a7a4a', marginBottom: 8 }}>Enquiry Sent!</h3>
                  <p style={{ color: '#5a6272', fontSize: '0.9rem' }}>
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                  <button onClick={() => setStatus('idle')} style={resetBtn}>Send Another Enquiry</button>
                </div>
              ) : (
                <form
                  name="enquiry"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  {/* Hidden fields required by Netlify Forms */}
                  <input type="hidden" name="form-name" value="enquiry" />
                  <div style={{ display: 'none' }}>
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </div>

                  <div style={formRow}>
                    <div style={formGroup}>
                      <label style={fLabel}>Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        style={fInput}
                      />
                    </div>
                    <div style={formGroup}>
                      <label style={fLabel}>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        style={fInput}
                      />
                    </div>
                  </div>

                  <div style={formRow}>
                    <div style={formGroup}>
                      <label style={fLabel}>Phone / WhatsApp</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+60 12-345 6789"
                        value={form.phone}
                        onChange={handleChange}
                        style={fInput}
                      />
                    </div>
                    <div style={formGroup}>
                      <label style={fLabel}>Subject *</label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        style={fInput}
                      >
                        <option value="">Select a subject…</option>
                        <option value="Equipment Repair / Breakdown">Equipment Repair / Breakdown</option>
                        <option value="Spare Parts Enquiry">Spare Parts Enquiry</option>
                        <option value="Preventive Maintenance">Preventive Maintenance</option>
                        <option value="New Equipment Supply">New Equipment Supply</option>
                        <option value="Service Contract">Service Contract</option>
                        <option value="Quotation Request">Quotation Request</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={fLabel}>Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your equipment, issue, or enquiry in detail…"
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...fInput, resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={errorBox}>
                      ⚠️ Something went wrong. Please try again or call us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ ...submitBtn, opacity: status === 'sending' ? 0.7 : 1 }}
                  >
                    {status === 'sending' ? '⏳ Sending…' : '📨 Send Enquiry'}
                  </button>
                </form>
              )}
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

const twoCol = { display: 'grid', gap: 48, alignItems: 'start' }
const sectionH2 = { fontSize: '1.5rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }

const infoGrid = { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }
const infoCard = { display: 'flex', gap: 16, alignItems: 'flex-start', background: '#f4f6fb', borderRadius: 10, padding: '16px' }
const infoIcon = { fontSize: '1.5rem', flexShrink: 0, marginTop: 2 }
const infoLabel = { fontSize: '0.72rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }
const infoVal = { fontSize: '0.88rem', color: '#1a3c6e', fontWeight: 500, lineHeight: 1.5 }
const infoLink = { fontSize: '0.88rem', color: '#1a5aaf', fontWeight: 600 }

const regBox = { background: '#fff', borderRadius: 10, padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', borderLeft: '4px solid #c8993a' }
const regTitle = { fontSize: '0.72rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }
const regRow = { display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.85rem' }
const regLabel = { color: '#5a6272', width: 90, flexShrink: 0, fontWeight: 500 }
const regVal = { color: '#1a3c6e', fontWeight: 600 }

const formCard = { background: '#fff', borderRadius: 14, padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', border: '1px solid #e8edf5' }
const formRow = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }
const formGroup = { display: 'flex', flexDirection: 'column' }
const fLabel = { fontSize: '0.78rem', fontWeight: 600, color: '#444', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }
const fInput = { border: '1.5px solid #dde3ef', borderRadius: 8, padding: '10px 14px', fontSize: '0.9rem', color: '#222', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fafbfd' }

const submitBtn = { width: '100%', background: '#1a3c6e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }
const successBox = { textAlign: 'center', padding: '40px 20px' }
const resetBtn = { marginTop: 20, background: '#1a3c6e', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
const errorBox = { background: '#fff5f5', border: '1px solid #ffcccc', color: '#c0392b', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', marginBottom: 16 }
