import { useState } from 'react'
import { sparePartCategories } from '../data/spareParts'
import { availableBrands } from '../data/company'
import { useReveal } from '../hooks/useReveal'

export default function SpareParts() {
  useReveal()
  const [activeCategory, setActiveCategory] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { src, caption }

  const displayed = activeCategory
    ? sparePartCategories.filter(c => c.id === activeCategory)
    : sparePartCategories

  return (
    <div>
      {/* ── Page Hero ── */}
      <div style={pageHero}>
        <div style={heroBg} />
        <div style={heroGrid} />
        <div style={heroGlow1} />
        <div style={heroGlow2} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Spare parts</p>
          <h1 style={pageTitle} className="page-title">Spare Parts Supply</h1>
          <p style={pageSub}>
            Genuine spare parts for all major commercial laundry equipment brands — fast sourcing, fair pricing
          </p>
          <div style={heroBadges}>
            <span style={heroBadge}>🏭 10+ Brands</span>
            <span style={heroBadge}>⚡ Fast Sourcing</span>
            <span style={heroBadge}>✅ OEM Quality</span>
            <span style={heroBadge}>📋 GST Registered</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px 80px' }}>

        {/* ── Filter tabs ── */}
        <div style={tabsWrap} className="reveal">
          <button
            style={{ ...tabBtn, ...(activeCategory === null ? tabBtnActive : {}) }}
            onClick={() => setActiveCategory(null)}
          >
            All Categories
          </button>
          {sparePartCategories.map(cat => (
            <button
              key={cat.id}
              style={{
                ...tabBtn,
                ...(activeCategory === cat.id
                  ? { background: cat.color + '14', borderColor: cat.color, color: cat.color }
                  : {}),
              }}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        {/* ── Category sections ── */}
        {displayed.map((cat, ci) => (
          <section key={cat.id} style={section}>

            {/* Section header */}
            <div style={{ ...sectionHeader, borderLeft: `5px solid ${cat.color}` }}>
              <div style={{ ...catIconWrap, background: cat.color + '15', color: cat.color }}>
                {cat.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <h2 style={sectionTitle}>{cat.title}</h2>
                  {cat.supplier && (
                    <span style={{ ...supplierBadge, background: cat.color + '15', color: cat.color, borderColor: cat.color + '40' }}>
                      Supplier: {cat.supplier}
                    </span>
                  )}
                  <span style={{ ...countBadge, marginLeft: 'auto' }}>
                    {cat.parts.length} parts
                  </span>
                </div>
                <p style={sectionDesc}>{cat.description}</p>
              </div>
            </div>

            <div style={catBody}>
              {/* Photo gallery */}
              {cat.photos.length > 0 && (
                <div style={photoGallery}>
                  {cat.photos.map((photo, pi) => (
                    <div
                      key={pi}
                      style={photoThumb}
                      onClick={() => setLightbox(photo)}
                      title="Click to enlarge"
                    >
                      <img src={photo.src} alt={photo.caption} style={photoImg} />
                      <div style={photoCaption}>{photo.caption}</div>
                      <div style={photoOverlay}>🔍 View</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Parts table */}
              <div style={partsTable}>
                <div style={tableHeader}>
                  <span style={{ flex: 2 }}>Part Name</span>
                  <span style={{ flex: 1.5, textAlign: 'center' }}>Specification</span>
                  <span style={{ flex: 1.5, textAlign: 'right' }}>Compatible Brands</span>
                </div>
                {cat.parts.map((part, i) => (
                  <div key={i} style={{ ...tableRow, background: i % 2 === 0 ? '#fafbfd' : '#fff' }}>
                    <div style={partNameCell}>
                      <div style={{ ...partDot, background: cat.color }} />
                      <span style={partName}>{part.name}</span>
                    </div>
                    <div style={specCell}>{part.spec}</div>
                    <div style={brandsCell}>
                      {part.brands.map(b => (
                        <span key={b} style={brandTag}>{b}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={tableFooter}>
                  <a href="/contact" style={{ ...enquireBtn, background: cat.color, boxShadow: `0 4px 16px ${cat.color}40` }}>
                    📨 Enquire for {cat.title}
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── Brands we stock ── */}
        <div style={{ marginTop: 72 }} className="reveal">
          <span style={tag}>Our Stock</span>
          <h2 style={sectionH2}>All Brands We Supply Parts For</h2>
          <div style={brandsWrap}>
            {availableBrands.map(b => (
              <span key={b} style={brandPill}>{b}</span>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={ctaBox} className="reveal">
          <div style={ctaOverlay} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔩</div>
            <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: 10 }}>
              Can't Find Your Part?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: 28, fontSize: '0.95rem', maxWidth: 500, margin: '0 auto 28px' }}>
              We source genuine spare parts for all major laundry equipment brands.
              Contact us with your machine model and part number.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={ctaBtnPrimary}>📨 Send Enquiry</a>
              <a href="tel:+60192829180" style={ctaBtnSecondary}>📞 019-2829180</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div style={lightboxOverlay} onClick={() => setLightbox(null)}>
          <div style={lightboxInner} onClick={e => e.stopPropagation()}>
            <button style={lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.caption} style={lightboxImg} />
            <p style={lightboxCaption}>{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Styles ── */
const pageHero = { position: 'relative', padding: '72px 0 56px', overflow: 'hidden' }
const heroBg = { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 60%, #07122e 100%)' }
const heroGrid = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }
const heroGlow1 = { position: 'absolute', top: '-60px', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(200,153,58,0.12) 0%, transparent 70%)', borderRadius: '50%' }
const heroGlow2 = { position: 'absolute', bottom: '-80px', left: '10%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(26,90,175,0.18) 0%, transparent 70%)', borderRadius: '50%' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 560, marginBottom: 20 }
const heroBadges = { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }
const heroBadge = { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', padding: '5px 14px', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(8px)' }

const tabsWrap = { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 44 }
const tabBtn = { padding: '8px 16px', borderRadius: 9999, border: '1.5px solid #dde3ef', background: '#fff', color: '#5a6272', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }
const tabBtnActive = { background: 'rgba(26,60,110,0.1)', borderColor: '#1a3c6e', color: '#1a3c6e' }

const section = { background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(26,60,110,0.06)', overflow: 'hidden', marginBottom: 32 }
const sectionHeader = { display: 'flex', alignItems: 'flex-start', gap: 16, padding: '24px 28px 20px', background: '#fafbfd', borderBottom: '1px solid #f0f4fb', paddingLeft: 20 }
const catIconWrap = { width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }
const sectionTitle = { fontSize: '1.2rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 4 }
const sectionDesc = { fontSize: '0.85rem', color: '#5a6272', lineHeight: 1.6, marginTop: 4 }
const supplierBadge = { padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, border: '1px solid', whiteSpace: 'nowrap' }
const countBadge = { background: '#f0f4fb', color: '#1a3c6e', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }

const catBody = { padding: '24px 28px' }

const photoGallery = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }
const photoThumb = { borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '4/3', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }
const photoImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }
const photoCaption = { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: '#fff', fontSize: '0.72rem', fontWeight: 600, padding: '20px 10px 8px', lineHeight: 1.3 }
const photoOverlay = { position: 'absolute', inset: 0, background: 'rgba(26,60,110,0.0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', opacity: 0, transition: 'all 0.2s' }

const partsTable = { border: '1px solid #e8edf5', borderRadius: 12, overflow: 'hidden' }
const tableHeader = { display: 'flex', gap: 16, padding: '11px 18px', background: 'linear-gradient(135deg, #1a3c6e, #0f2447)', color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }
const tableRow = { display: 'flex', gap: 16, padding: '13px 18px', borderBottom: '1px solid #f0f4fb', alignItems: 'flex-start' }
const partNameCell = { flex: 2, display: 'flex', gap: 10, alignItems: 'flex-start', minWidth: 0 }
const partDot = { width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5 }
const partName = { fontSize: '0.88rem', color: '#1a3c6e', fontWeight: 600, lineHeight: 1.4 }
const specCell = { flex: 1.5, fontSize: '0.8rem', color: '#5a6272', lineHeight: 1.5, paddingTop: 1 }
const brandsCell = { flex: 1.5, display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' }
const brandTag = { background: '#f0f4fb', color: '#5a6272', padding: '2px 8px', borderRadius: 20, fontSize: '0.68rem', fontWeight: 600, whiteSpace: 'nowrap' }
const tableFooter = { padding: '16px 18px', background: '#fafbfd', display: 'flex', justifyContent: 'flex-end' }
const enquireBtn = { color: '#fff', padding: '9px 22px', borderRadius: 9999, fontWeight: 700, fontSize: '0.83rem', display: 'inline-block', textDecoration: 'none', transition: 'all 0.2s' }

const tag = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, border: '1px solid rgba(200,153,58,0.2)' }
const sectionH2 = { fontSize: '1.6rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 20 }
const brandsWrap = { display: 'flex', flexWrap: 'wrap', gap: 10 }
const brandPill = { background: 'linear-gradient(135deg, #f0f4fb, #e8edf8)', color: '#1a3c6e', padding: '8px 18px', borderRadius: 9999, fontSize: '0.84rem', fontWeight: 700, border: '1px solid rgba(26,60,110,0.12)' }

const ctaBox = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 20, padding: '56px 24px', position: 'relative', overflow: 'hidden', marginTop: 60 }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.1) 1px, transparent 1px)', backgroundSize: '22px 22px' }
const ctaBtnPrimary = { background: 'linear-gradient(135deg, #c8993a, #f0c060)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', display: 'inline-block', textDecoration: 'none', boxShadow: '0 4px 20px rgba(200,153,58,0.4)' }
const ctaBtnSecondary = { background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', display: 'inline-block', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }

/* ── Lightbox ── */
const lightboxOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }
const lightboxInner = { position: 'relative', maxWidth: 860, width: '100%', cursor: 'default' }
const lightboxClose = { position: 'absolute', top: -16, right: -16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const lightboxImg = { width: '100%', borderRadius: 14, display: 'block', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }
const lightboxCaption = { textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', marginTop: 14, fontWeight: 500 }
