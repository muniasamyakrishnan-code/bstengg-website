import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const machineCategories = [
  {
    id: 'bst-washers',
    icon: '🫧',
    title: 'BST Washer Extractors',
    color: '#1a3c6e',
    brand: 'BST Engineering',
    description: 'Industrial-grade stainless steel front-loading washer extractors built under the BST brand. High-spin extraction, digital programmable control, suitable for hotels and commercial laundries.',
    photos: [
      { src: '/images/new-machines/bst-washer.jpg', caption: 'BST Washer Extractor — stainless steel, digital control' },
    ],
    models: [
      { name: 'BST-25', spec: '25kg capacity, 1000 RPM spin, 3-phase', features: ['Programmable control panel', 'Stainless steel drum & body', 'High-spin extraction', 'Auto water level control'] },
      { name: 'BST-50', spec: '50kg capacity, 800 RPM spin, 3-phase', features: ['LCD digital display', 'Stainless steel drum & body', 'Steam heating option', 'Emergency stop button'] },
      { name: 'BST-100', spec: '100kg capacity, 750 RPM spin, 3-phase', features: ['Industrial heavy-duty build', 'Programmable wash cycles', 'Steam + electric heating', 'Auto balance detection'] },
    ],
  },
  {
    id: 'bst-dryers',
    icon: '🌬️',
    title: 'BST Tumble Dryers',
    color: '#c8993a',
    brand: 'BST Engineering',
    description: 'Industrial tumble dryers with large drum capacity, gas or electric heating, and programmable drying cycles. Ideal for hotel linen, towels and garments.',
    photos: [
      { src: '/images/new-machines/bst-dryer.jpg', caption: 'BST Tumble Dryer — compact front-load, digital controller' },
    ],
    models: [
      { name: 'BST-D25', spec: '25kg capacity, gas / electric, 3-phase', features: ['Digital temperature control', 'Auto cool-down cycle', 'Stainless steel drum', 'Lint filter with indicator'] },
      { name: 'BST-D50', spec: '50kg capacity, gas / electric, 3-phase', features: ['Large capacity drum', 'Multiple drying programs', 'Over-heat safety cut-out', 'Front-loading door'] },
      { name: 'BST-D100', spec: '100kg capacity, gas / electric, 3-phase', features: ['Heavy-duty hotel spec', 'Reversible drum action', 'Variable speed drive', 'Energy-saving mode'] },
    ],
  },
  {
    id: 'steam-generators',
    icon: '♨️',
    title: 'Electric Steam Generators',
    color: '#1a5aaf',
    brand: 'Shunda (顺达熨机)',
    description: 'Compact electric steam generators (GSK series) for ironing tables, press machines and garment finishing. Available in 9kW, 12kW and 18kW with pressure gauge and liquid level control.',
    photos: [
      { src: '/images/new-machines/steam-gen-1.jpg', caption: 'Shunda electric steam generators — 9kW & 12kW models' },
      { src: '/images/new-machines/steam-gen-2.jpg', caption: 'GSK compact steam generator with pressure gauge' },
      { src: '/images/new-machines/steam-gen-3.jpg', caption: 'Full range — small, medium and liquid-level control models' },
    ],
    models: [
      { name: 'GSK-9', spec: '9kW electric, stainless steel boiler, ≤0.45MPa', features: ['Compact upright design', 'Auto water fill', 'Pressure safety valve', 'On/Off + power selection'] },
      { name: 'GSK-12', spec: '12kW electric, stainless steel boiler, ≤0.45MPa', features: ['Digital ready-indicator', 'Dual steam outlet', 'Auto pressure control', 'Anti-dry protection'] },
      { name: 'GSK-18 (Liquid Level)', spec: '18kW electric, liquid-level control, ≤0.45MPa', features: ['Automatic water level sensor', 'Power selection switch', 'Continuous steam output', 'Stainless steel body'] },
    ],
  },
  {
    id: 'ironing-tables',
    icon: '👕',
    title: 'Vacuum Ironing Tables',
    color: '#2e7d32',
    brand: 'Shunda (顺达熨机)',
    description: 'Professional vacuum and blowing ironing tables for hotel garment finishing, shirt ironing and dry-cleaning operations. Suitable for pairing with steam generators and professional irons.',
    photos: [
      { src: '/images/new-machines/vacuum-ironing-table.jpg', caption: 'Shunda vacuum ironing tables — blue cover, motorised' },
      { src: '/images/new-machines/ironing-table-iron.jpg', caption: 'Ironing station with professional steam iron' },
    ],
    models: [
      { name: 'IT-Standard', spec: 'Vacuum + blowing, 230V single phase', features: ['Heavy-duty fabric cover', 'Foot pedal vacuum control', 'Built-in iron rest', 'Adjustable table height'] },
      { name: 'IT-Pro', spec: 'Vacuum + blowing + heating, motorised', features: ['Motorised vacuum pump', 'Steam-through table top', 'Sleeve board attachment', 'Foot pedal control'] },
    ],
  },
  {
    id: 'amko-roll',
    icon: '🗜️',
    title: 'AMKO Roll Ironer',
    color: '#6a1b9a',
    brand: 'AMKO',
    description: 'AMKO flatwork roll ironers for high-volume hotel sheet, pillowcase and tablecloth finishing. Continuous feed operation with steam-heated cylinder for smooth, wrinkle-free results.',
    photos: [],
    models: [
      { name: 'AMKO Roll 1200', spec: '1200mm working width, steam heated cylinder', features: ['Continuous feed operation', 'Adjustable speed control', 'Padding & cover set included', 'Safety auto-stop'] },
      { name: 'AMKO Roll 1600', spec: '1600mm working width, steam heated cylinder', features: ['High-capacity throughput', 'Digital temperature display', 'Wax lubrication system', 'Integrated take-off belt'] },
      { name: 'AMKO Roll 2000', spec: '2000mm working width, steam heated cylinder', features: ['Heavy-duty hotel spec', 'Variable speed 0–6 m/min', 'Foldable feed table', 'Emergency stop button'] },
    ],
  },
  {
    id: 'amko-folder',
    icon: '📋',
    title: 'AMKO Automatic Folder',
    color: '#00838f',
    brand: 'AMKO',
    description: 'AMKO automatic laundry folding machine for bed sheets, bath towels and table linen. Reduces manual folding labour significantly and produces consistently folded output.',
    photos: [],
    models: [
      { name: 'AMKOFOLD Standard', spec: 'Single cross fold + length fold', features: ['Automatic cross-fold & length fold', 'Adjustable fold size', 'Sensor-controlled operation', 'Compatible with AMKO roll ironers'] },
      { name: 'AMKOFOLD Pro', spec: 'Cross fold + length fold + stacking', features: ['Integrated stacker unit', 'Touchscreen control', 'Multiple fold programs', 'High-speed throughput'] },
    ],
  },
  {
    id: 'pony-press',
    icon: '⚙️',
    title: 'Pony Press Machines — 403 / 404',
    color: '#e65100',
    brand: 'Pony (Italy)',
    description: 'Pony 403 and 404 series professional laundry press machines for collar, cuff, shirt body and garment finishing. Trusted by hotels and dry-cleaning operations worldwide.',
    photos: [],
    models: [
      { name: 'Pony 403', spec: 'Collar & cuff press, steam + vacuum', features: ['Steam top head pressing', 'Vacuum extraction table', 'Adjustable steam timer', 'Foot pedal operation'] },
      { name: 'Pony 404', spec: 'Multi-purpose garment press, steam + vacuum', features: ['Larger pressing head', 'Combined steam & vacuum', 'Durable Teflon-coated head', 'Adjustable pressure control'] },
    ],
  },
  {
    id: 'pony-classic',
    icon: '👔',
    title: 'Pony Classic Shirt Finisher',
    color: '#37474f',
    brand: 'Pony (Italy)',
    description: 'Pony Classic shirt finisher for professional hotel and dry-cleaning shirt finishing. Inflates and steams the shirt to a near-perfect finish without manual pressing.',
    photos: [],
    models: [
      { name: 'Pony Classic', spec: 'Shirt form finisher, steam + hot air', features: ['Pneumatic shirt inflation', 'Steam + hot air finish', 'Collar clamp included', 'Adjustable cycle time'] },
    ],
  },
  {
    id: 'combi-pocket',
    icon: '🧺',
    title: 'Combi Split Pocket Sorter',
    color: '#558b2f',
    brand: 'Multi-brand',
    description: 'Combi split pocket laundry sorting system for organising soiled linen by category, room or department. Reduces sorting time and improves laundry workflow efficiency.',
    photos: [],
    models: [
      { name: 'Combi Split Pocket — 6 Bay', spec: '6-compartment sorting frame, freestanding', features: ['6 separate laundry bags', 'Heavy-duty steel frame', 'Easy-roll casters', 'Colour-coded bag options'] },
      { name: 'Combi Split Pocket — 12 Bay', spec: '12-compartment sorting frame, freestanding', features: ['12 separate compartments', 'Modular expandable design', 'Stainless steel optional', 'Custom labelling'] },
    ],
  },
]

export default function NewMachines() {
  useReveal()
  const [activeId, setActiveId] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const displayed = activeId
    ? machineCategories.filter(c => c.id === activeId)
    : machineCategories

  return (
    <div>
      {/* ── Page Hero ── */}
      <div style={pageHero}>
        <div style={heroBg} />
        <div style={heroGrid} />
        <div style={heroGlow1} />
        <div style={heroGlow2} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / New Machines</p>
          <h1 style={pageTitle} className="page-title">New Machines Supply</h1>
          <p style={pageSub}>
            Commercial laundry equipment supply — washers, dryers, ironers, presses, steam generators and sorters
          </p>
          <div style={heroBadges}>
            <span style={heroBadge}>🏭 BST Brand Machines</span>
            <span style={heroBadge}>🇮🇹 Pony Italy</span>
            <span style={heroBadge}>🌀 AMKO Ironers</span>
            <span style={heroBadge}>📋 Quotation Available</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px 80px' }}>

        {/* ── Filter tabs ── */}
        <div style={tabsWrap} className="reveal">
          <button
            style={{ ...tabBtn, ...(activeId === null ? tabBtnActive : {}) }}
            onClick={() => setActiveId(null)}
          >
            All Machines
          </button>
          {machineCategories.map(cat => (
            <button
              key={cat.id}
              style={{
                ...tabBtn,
                ...(activeId === cat.id
                  ? { background: cat.color + '14', borderColor: cat.color, color: cat.color }
                  : {}),
              }}
              onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        {/* ── Machine sections ── */}
        {displayed.map((cat, ci) => (
          <section key={cat.id} style={section}>

            {/* Header */}
            <div style={{ ...sectionHeader, borderLeft: `5px solid ${cat.color}` }}>
              <div style={{ ...catIconWrap, background: cat.color + '15', color: cat.color }}>
                {cat.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                  <h2 style={sectionTitle}>{cat.title}</h2>
                  <span style={{ ...brandBadge, background: cat.color + '14', color: cat.color, borderColor: cat.color + '40' }}>
                    {cat.brand}
                  </span>
                </div>
                <p style={sectionDesc}>{cat.description}</p>
              </div>
            </div>

            <div style={catBody}>
              {/* Photos */}
              {cat.photos.length > 0 && (
                <div style={photoGallery}>
                  {cat.photos.map((photo, pi) => (
                    <div key={pi} style={photoThumb} onClick={() => setLightbox(photo)}>
                      <img src={photo.src} alt={photo.caption} style={photoImg} />
                      <div style={photoCaption}>{photo.caption}</div>
                      <div style={photoZoom}>🔍 View</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Models grid */}
              <div style={modelsGrid}>
                {cat.models.map((model, mi) => (
                  <div key={mi} style={{ ...modelCard, borderTop: `4px solid ${cat.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ ...modelName, color: cat.color }}>{model.name}</h3>
                      <a href="/contact" style={{ ...quoteBtn, background: cat.color }}>Get Quote</a>
                    </div>
                    <p style={modelSpec}>{model.spec}</p>
                    <ul style={featureList}>
                      {model.features.map((f, fi) => (
                        <li key={fi} style={featureItem}>
                          <span style={{ ...featureDot, background: cat.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <div style={ctaBox} className="reveal">
          <div style={ctaOverlay} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🏭</div>
            <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: 10 }}>
              Request a Quotation
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: 28, fontSize: '0.95rem', maxWidth: 520, margin: '0 auto 28px' }}>
              Contact us for pricing, availability and machine specifications.
              We supply, install and service all equipment listed here.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={ctaBtnPrimary}>📨 Request Quotation</a>
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
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 600, marginBottom: 20 }
const heroBadges = { display: 'flex', flexWrap: 'wrap', gap: 10 }
const heroBadge = { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', padding: '5px 14px', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600 }

const tabsWrap = { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 44 }
const tabBtn = { padding: '8px 16px', borderRadius: 9999, border: '1.5px solid #dde3ef', background: '#fff', color: '#5a6272', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }
const tabBtnActive = { background: 'rgba(26,60,110,0.1)', borderColor: '#1a3c6e', color: '#1a3c6e' }

const section = { background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(26,60,110,0.06)', overflow: 'hidden', marginBottom: 32 }
const sectionHeader = { display: 'flex', alignItems: 'flex-start', gap: 16, padding: '24px 28px 20px', background: '#fafbfd', borderBottom: '1px solid #f0f4fb', paddingLeft: 20 }
const catIconWrap = { width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }
const sectionTitle = { fontSize: '1.2rem', fontWeight: 800, color: '#1a3c6e' }
const sectionDesc = { fontSize: '0.85rem', color: '#5a6272', lineHeight: 1.6, marginTop: 4 }
const brandBadge = { padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, border: '1px solid', whiteSpace: 'nowrap' }

const catBody = { padding: '24px 28px' }

const photoGallery = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }
const photoThumb = { borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '4/3', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }
const photoImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }
const photoCaption = { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)', color: '#fff', fontSize: '0.72rem', fontWeight: 600, padding: '20px 10px 8px', lineHeight: 1.3 }
const photoZoom = { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', opacity: 0, transition: 'all 0.2s' }

const modelsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }
const modelCard = { background: 'linear-gradient(135deg, #fafbfd, #f4f7fb)', borderRadius: 14, padding: '20px', border: '1px solid rgba(26,60,110,0.07)' }
const modelName = { fontSize: '1rem', fontWeight: 800, marginBottom: 0 }
const modelSpec = { fontSize: '0.8rem', color: '#5a6272', marginBottom: 14, lineHeight: 1.5, background: '#fff', borderRadius: 8, padding: '8px 12px', border: '1px solid #e8edf5' }
const featureList = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }
const featureItem = { fontSize: '0.83rem', color: '#333', display: 'flex', alignItems: 'center', gap: 8 }
const featureDot = { width: 6, height: 6, borderRadius: '50%', flexShrink: 0 }
const quoteBtn = { color: '#fff', padding: '5px 12px', borderRadius: 9999, fontWeight: 700, fontSize: '0.72rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }

const ctaBox = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 20, padding: '56px 24px', position: 'relative', overflow: 'hidden', marginTop: 60 }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.1) 1px, transparent 1px)', backgroundSize: '22px 22px' }
const ctaBtnPrimary = { background: 'linear-gradient(135deg, #c8993a, #f0c060)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', display: 'inline-block', textDecoration: 'none', boxShadow: '0 4px 20px rgba(200,153,58,0.4)' }
const ctaBtnSecondary = { background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', display: 'inline-block', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }

const lightboxOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }
const lightboxInner = { position: 'relative', maxWidth: 860, width: '100%', cursor: 'default' }
const lightboxClose = { position: 'absolute', top: -16, right: -16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const lightboxImg = { width: '100%', borderRadius: 14, display: 'block', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }
const lightboxCaption = { textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', marginTop: 14, fontWeight: 500 }
