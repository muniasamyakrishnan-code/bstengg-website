   import { useState } from 'react'

const sections = [
  {
    id: 'ironer-paddings',
    title: 'Ironer Paddings',
    products: [
      { name: 'Polyester Padding (700G)', photo: '/images/padding/padding-1.jpg' },
      { name: 'Polyester Padding (900G)', photo: '/images/padding/padding-2.jpg' },
      { name: '50% Polyester / 50% Aramid Padding (850G)', photo: '/images/padding/padding-3.jpg' },
      { name: '100% Aramid Padding (800G)', photo: '/images/padding/padding-4.jpg' },
      { name: 'Monoturn Padding (4000G)', photo: '/images/padding/padding-5.jpg' },
    ],
  },
]

const _removedSections = [
  {
    id: 'wax-powder',
    title: 'Wax Powder',
    products: [
      { name: 'CLENACORP Flake Wax Powder', photo: '/images/padding/wax-1.png' },
      { name: 'UK3825 TECHNIWAX', photo: '/images/padding/wax-2.png' },
      { name: 'High-Temperature Wax Plus', photo: '/images/padding/wax-3.png' },
      { name: 'CLEAN COAT', photo: '/images/padding/wax-4.png' },
    ],
  },
  {
    id: 'guide-tapes',
    title: 'Guide Tapes',
    products: [
      { name: 'Polyester Guide Tape-2 Black Stripes JTX600', photo: '/images/padding/gt-1.png' },
      { name: 'Polyester Guide Tape-3 Black Stripes', photo: '/images/padding/gt-2.png' },
      { name: 'Clenacorp Guide Tape (1/2")', photo: '/images/padding/gt-3.png' },
      { name: 'Clenacorp Guide Tape (3/4")', photo: '/images/padding/gt-4.png' },
      { name: 'Polyester/Aramid Guide Tape Solid Color', photo: '/images/padding/gt-5.png' },
      { name: 'Polyester/Aramid Guide Tape -1 Black Stripe', photo: '/images/padding/gt-6.png' },
      { name: 'Polyester/Aramid Guide Tape -2 Black Stripes', photo: '/images/padding/gt-7.png' },
    ],
  },
  {
    id: 'feeder-belts',
    title: 'Feeder Belts',
    products: [
      { name: 'Polyester Feeding Belt 1000G', photo: '/images/padding/fb-1.png' },
      { name: 'Perforated Polyester Feeding Belt 1000G', photo: '/images/padding/fb-2.png' },
      { name: 'Perforated Polyester Feeding Belt with Non-Slip Stripes 1000G', photo: '/images/padding/fb-3.png' },
    ],
  },
  {
    id: 'ironer-belts',
    title: 'Ironer Belts',
    products: [
      { name: 'Polyester Woven Belt', photo: '/images/padding/ib-1.png' },
      { name: 'Nomex Belt for Chicago Dryer', photo: '/images/padding/ib-2.png' },
      { name: 'Polyester/Aramid Ironer Belt 1500G / Dolnex Dryer Belt', photo: '/images/padding/ib-3.png' },
      { name: 'Aramid Ironer Belt for High-Speed Ironer', photo: '/images/padding/ib-4.png' },
    ],
  },
  {
    id: 'folder-belts',
    title: 'Folder Belts',
    products: [
      { name: 'Cotton Belt with Blue Stripes', photo: '/images/padding/folb-1.png' },
      { name: 'Cotton Belt with Red Stripes', photo: '/images/padding/folb-2.png' },
      { name: 'Rubberized Cotton Belt', photo: '/images/padding/folb-3.png' },
      { name: 'Rubberised Cotton Belt with Blue Lines', photo: '/images/padding/folb-4.png' },
      { name: 'Elastic Belt', photo: '/images/padding/folb-5.png' },
      { name: 'Elastic Belt White Color', photo: '/images/padding/folb-6.png' },
      { name: 'Anti-Static Cotton Belt', photo: '/images/padding/folb-7.png' },
      { name: 'Green Black Ribbon Belt', photo: '/images/padding/folb-8.png' },
      { name: 'Dark Green PVC Grass Ribbon Belt', photo: '/images/padding/folb-9.png' },
      { name: 'Dark Green & Grey PVC Diamond Ribbon Belt', photo: '/images/padding/folb-10.png' },
      { name: 'White Belt with Smooth Surface', photo: '/images/padding/folb-11.png' },
      { name: 'Rubberized Gripper Tape (Self-Adhesive Belt)', photo: '/images/padding/folb-12.png' },
    ],
  },
  {
    id: 'wax-cleaning-cloth',
    title: 'Wax / Cleaning Cloth / Laundry Bag',
    products: [
      { name: 'Wax Cloth without Stainless Wire Net', photo: '/images/padding/cl-1.png' },
      { name: 'Wax Cloth with Stainless Wire Net', photo: '/images/padding/cl-2.png' },
      { name: 'Cleaning Cloth with Knitted Stainless Steel Wool', photo: '/images/padding/cl-3.png' },
      { name: 'Ironer Bed Cleaning Cloth with Steel Wool (Blue)', photo: '/images/padding/cl-4.png' },
      { name: 'Cleaning Cloth with Stainless Wire Net', photo: '/images/padding/cl-5.png' },
      { name: 'Cleaning Cloth for Jensen', photo: '/images/padding/cl-6.png' },
      { name: 'Laundry Pen', photo: '/images/padding/cl-7.png' },
      { name: 'Nylon Pin-Pak', photo: '/images/padding/cl-8.png' },
      { name: 'Laundry Bag: Dry Clean Mesh Buckle/Zipper', photo: '/images/padding/cl-9.png' },
      { name: 'Laundry Bag with Buckle/Zipper', photo: '/images/padding/cl-10.png' },
      { name: 'Press Padding 1200G', photo: '/images/padding/cl-11.png' },
      { name: 'Press Sheeting', photo: '/images/padding/cl-12.png' },
      { name: 'Press Paddings (PONY Style)', photo: '/images/padding/cl-13.png' },
    ],
  },
]  // end _removedSections

export default function PaddingBelting() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div>
      {/* ── Hero ── */}
      <div style={pageHero}>
        <div style={heroBg} />
        <div style={heroGrid} />
        <div style={heroGlow1} />
        <div style={heroGlow2} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Padding &amp; Belting</p>
          <h1 style={pageTitle}>Padding &amp; Belting</h1>
          <p style={pageSub}>
            Complete range of press padding, wax powder, guide tapes, ironer belts, folder belts and cleaning cloth supplies
          </p>
          <div style={heroBadges}>
            <span style={heroBadge}>✅ All Press Types</span>
            <span style={heroBadge}>🚚 Supply Available</span>
            <span style={heroBadge}>📦 Bulk Orders Welcome</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        {sections.map(sec => (
          <div key={sec.id} style={sectionWrap}>
            <div style={secHeadRow}>
              <span style={secHeadLabel}>{sec.title}</span>
            </div>
            <div style={photoGrid}>
              {sec.products.map((p, i) => (
                <div
                  key={i}
                  style={card}
                  onClick={sec.id === 'ironer-paddings' ? () => setLightbox(p.photo) : undefined}
                >
                  {sec.id === 'ironer-paddings' && (
                    <div style={photoWrap}>
                      <img
                        src={p.photo}
                        alt={p.name}
                        style={photoImg}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                      />
                      <div style={photoPlaceholder}>📦</div>
                      <div style={zoomOverlay}>🔍</div>
                    </div>
                  )}
                  <div style={cardBody}>
                    <p style={cardTitle}>{p.name}</p>
                    <a href="/contact" onClick={e => e.stopPropagation()} style={enquireBtn}>📨 Enquire</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={ctaBox}>
          <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, marginBottom: 10 }}>
            Need Custom Sizing or Bulk Supply?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24, fontSize: '0.95rem' }}>
            We supply padding, belts, wax powder and cleaning cloth for all commercial laundry machines. Contact us for a quote.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={ctaBtnPrimary}>📨 Send Enquiry</a>
            <a href="tel:+60192829180" style={ctaBtnSecondary}>📞 019-2829180</a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div style={lbOverlay} onClick={() => setLightbox(null)}>
          <div style={lbInner} onClick={e => e.stopPropagation()}>
            <button style={lbClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox} alt="Product" style={lbImg} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Styles ── */
const pageHero = { position: 'relative', padding: '72px 0 52px', overflow: 'hidden' }
const heroBg = { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 60%, #07122e 100%)' }
const heroGrid = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }
const heroGlow1 = { position: 'absolute', top: '-60px', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(200,153,58,0.12) 0%, transparent 70%)', borderRadius: '50%' }
const heroGlow2 = { position: 'absolute', bottom: '-80px', left: '10%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(26,90,175,0.18) 0%, transparent 70%)', borderRadius: '50%' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 640, marginBottom: 20 }
const heroBadges = { display: 'flex', gap: 10, flexWrap: 'wrap' }
const heroBadge = { background: 'rgba(200,153,58,0.18)', border: '1px solid rgba(200,153,58,0.4)', color: '#f0c060', padding: '6px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600 }

const sectionWrap = { marginBottom: 56 }
const secHeadRow = { marginBottom: 20 }
const secHeadLabel = { background: '#f0c060', color: '#1a3c6e', padding: '6px 22px', borderRadius: 6, fontSize: '1rem', fontWeight: 800, display: 'inline-block' }

const photoGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }
const card = { background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,0.08)', border: '1px solid rgba(26,60,110,0.07)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }
const photoWrap = { position: 'relative', height: 180, overflow: 'hidden', background: '#f0f4fb' }
const photoImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }
const photoPlaceholder = { display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', height: '100%', background: '#f0f4fb', color: '#aab' }
const zoomOverlay = { position: 'absolute', inset: 0, background: 'rgba(26,60,110,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', opacity: 0, transition: 'all 0.2s' }
const cardBody = { padding: '14px 16px' }
const cardTitle = { fontSize: '0.85rem', fontWeight: 700, color: '#1a3c6e', marginBottom: 10, lineHeight: 1.4 }
const enquireBtn = { display: 'inline-block', background: 'linear-gradient(135deg, #1a3c6e, #0f2447)', color: '#fff', padding: '6px 14px', borderRadius: 7, fontSize: '0.76rem', fontWeight: 700, textDecoration: 'none' }

const ctaBox = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 20, padding: '48px 32px', textAlign: 'center', marginTop: 20 }
const ctaBtnPrimary = { background: 'linear-gradient(135deg, #c8993a, #e8b84b)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }
const ctaBtnSecondary = { background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '13px 28px', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }

const lbOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const lbInner = { position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }
const lbClose = { position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }
const lbImg = { maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }
