import { useState } from 'react'
import { productCategories } from '../data/products'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = productCategories
  const filtered = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategory)

  const totalCount = categories.reduce((n, c) => n + c.products.length, 0)

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Products</p>
          <h1 style={pageTitle} className="page-title">Equipment Catalogue</h1>
          <p style={pageSub}>
            {totalCount} professional laundry machines — supply, installation &amp; servicing available across Malaysia
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>

        {/* Category filter tabs */}
        <div style={tabsRow}>
          <button
            style={{ ...tab, ...(activeCategory === 'all' ? tabActive : {}) }}
            onClick={() => setActiveCategory('all')}
          >
            All Equipment ({totalCount})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              style={{ ...tab, ...(activeCategory === c.id ? tabActive : {}) }}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.icon} {c.title} ({c.products.length})
            </button>
          ))}
        </div>

        {/* Product sections */}
        {filtered.map(cat => (
          <div key={cat.id} style={{ marginBottom: 64 }}>
            <div style={catHeader}>
              <span style={catIcon}>{cat.icon}</span>
              <div>
                <h2 style={catTitle}>{cat.title}</h2>
                <p style={catDesc}>{cat.products.length} models available for supply, installation &amp; servicing</p>
              </div>
            </div>

            <div style={productGrid} className="products-grid">
              {cat.products.map(p => (
                <div key={p.id} style={productCard}>
                  <div style={imgWrap}>
                    <img
                      src={`/images/products/${p.id}.jpg`}
                      alt={p.name}
                      style={productImg}
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                    />
                    <div style={imgFallback}>
                      <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                    </div>
                  </div>
                  <div style={productInfo}>
                    <div style={brandBadge}>{p.brand}</div>
                    <h3 style={productName}>{p.name}</h3>
                    <p style={productDesc}>{p.desc}</p>
                    <div style={productFooter}>
                      <span style={availBadge}>✅ Available</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={ctaBox}>
          <div style={ctaOverlay} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              Enquire About Any Equipment
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28, fontSize: '1rem' }}>
              Contact us for pricing, availability, installation and servicing across Malaysia.
            </p>
            <a href="/contact" style={ctaBtn}>📨 Send Enquiry</a>
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
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 560 }

const tabsRow = { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }
const tab = { background: '#fff', border: '1.5px solid #dde3ef', color: '#5a6272', padding: '8px 16px', borderRadius: 24, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }
const tabActive = { background: '#1a3c6e', color: '#fff', borderColor: '#1a3c6e' }

const catHeader = { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #e8edf5' }
const catIcon = { fontSize: '2.2rem', background: 'rgba(200,153,58,0.12)', width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
const catTitle = { fontSize: '1.4rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 4 }
const catDesc = { fontSize: '0.85rem', color: '#5a6272' }

const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }

const productCard = { background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', border: '1px solid #e8edf5', display: 'flex', flexDirection: 'column' }
const imgWrap = { position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f4f6fb' }
const productImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }
const imgFallback = { display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#f4f6fb', position: 'absolute', inset: 0 }
const productInfo = { padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }
const brandBadge = { display: 'inline-block', background: 'rgba(200,153,58,0.12)', color: '#c8993a', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, padding: '3px 8px', borderRadius: 4, marginBottom: 8, alignSelf: 'flex-start' }
const productName = { fontWeight: 700, color: '#1a3c6e', fontSize: '1rem', marginBottom: 8 }
const productDesc = { fontSize: '0.82rem', color: '#5a6272', lineHeight: 1.5, flex: 1, marginBottom: 12 }
const productFooter = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
const availBadge = { fontSize: '0.75rem', color: '#1a7a4a', fontWeight: 600 }

const ctaBox = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', borderRadius: 16, padding: '52px 32px', position: 'relative', overflow: 'hidden', marginTop: 20 }
const ctaOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.12) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const ctaBtn = { display: 'inline-block', background: '#c8993a', color: '#fff', padding: '13px 32px', borderRadius: 10, fontWeight: 700, fontSize: '1rem' }
