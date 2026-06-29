import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { provider } from '../data/company'
import { services } from '../data/services'
import { customerCategories } from '../data/customers'

/* ── Animated counter hook ─────────────────────────────────────────── */
function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || typeof target !== 'number') return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return count
}

/* ── Scroll reveal hook ────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ── Stat card with animated counter ──────────────────────────────── */
function StatCard({ icon, val, label, delay, active }) {
  // parse number and suffix: '15+' → 15, '+'  |  '100+' → 100, '+'  |  '24/7' → null
  const match = val.match(/^(\d+)(.*)$/)
  const num = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : val
  const animated = useCounter(num, 1600, active && num !== null)
  const display = num !== null ? `${animated}${suffix}` : val

  return (
    <div style={{ ...s.statItem, animationDelay: delay }} className="anim-fade-in-up">
      <div style={s.statIcon}>{icon}</div>
      <div style={s.statVal}>{display}</div>
      <div style={s.statLabel}>{label}</div>
    </div>
  )
}

export default function Home() {
  useReveal()
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const featured = services.slice(0, 6)
  const allHotels = customerCategories[0].customers
  const featuredHotels = allHotels.slice(0, 12)

  const stats = [
    { val: '15+', label: 'Years in Malaysia',     icon: '📅' },
    { val: `${allHotels.length}+`, label: 'Hotel & Resort Clients', icon: '🏨' },
    { val: '10+', label: 'Brands Serviced',        icon: '🔧' },
    { val: '24/7', label: 'Emergency Support',     icon: '⚡' },
  ]

  return (
    <div>

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section style={s.heroSection} className="home-hero-section">
        {/* Layered background */}
        <div style={s.heroBg} />
        <div style={s.heroGrid} />
        <div style={s.heroGlow1} />
        <div style={s.heroGlow2} />

        {/* Content */}
        <div style={s.heroContent}>
          <div style={s.heroBadge} className="anim-fade-in">
            🏨 Trusted by {allHotels.length}+ Leading Hotels in Malaysia
          </div>
          <h1 style={s.heroH1} className="anim-fade-in-up hero-h1">
            Expert Laundry &amp;<br />Engineering Services
          </h1>
          <p style={s.heroSub} className="anim-fade-in-up">
            Best Sun Tech Engineering Sdn Bhd — Malaysia's trusted specialist for commercial
            and industrial laundry equipment maintenance, repair, and supply since {provider.established}.
          </p>
          <div style={s.heroActions} className="anim-fade-in-up">
            <Link to="/services" style={s.heroBtnPrimary} className="btn-primary">Explore Services</Link>
            <Link to="/contact" style={s.heroBtnSecondary} className="btn-ghost">Get a Quote</Link>
          </div>
          <div style={s.heroChips} className="anim-fade-in">
            <span style={s.heroChip}>⭐ Est. {provider.established}</span>
            <span style={s.heroChip}>🔧 10+ Service Types</span>
            <span style={s.heroChip}>🏭 Industrial &amp; Commercial</span>
            <span style={s.heroChip}>✅ SST Registered</span>
          </div>
        </div>

        {/* Photo card */}
        <div style={s.photoCard} className="home-stats-card anim-scale-in">
          <div style={s.photoGlow} />
          <img src="/images/machine-05.jpg" alt="Hotel laundry operations" style={s.photoImg} />
          <div style={s.photoBadge}>
            <span style={s.photoBadgeText}>🏨 Live Hotel Laundry Operations</span>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ───────────────────────────────────────────── */}
      <section style={s.statsStrip} ref={statsRef}>
        <div className="container">
          <div style={s.statsGrid} className="home-stats-strip">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                val={stat.val}
                label={stat.label}
                delay={`${i * 0.12}s`}
                active={statsActive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ──────────────────────────────────────── */}
      <section className="section" style={{ background: '#f4f6fb', position: 'relative', overflow: 'hidden' }}>
        <div style={s.sectionAccent} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="reveal">
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Our Engineering Services</h2>
            <p className="section-subtitle">Comprehensive laundry and engineering solutions for the hospitality industry</p>
          </div>

          <div style={s.servGrid}>
            {featured.map((sv, i) => (
              <div
                key={sv.id}
                style={s.servCard}
                className={`reveal hover-lift delay-${Math.min(i + 1, 6)} card-shine`}
              >
                <div style={{ ...s.servIcon, background: sv.color + '18', color: sv.color }}>{sv.icon}</div>
                <h3 style={s.servTitle}>{sv.title}</h3>
                <p style={s.servEquip}>{sv.equipment}</p>
                <p style={s.servDesc}>{sv.description.slice(0, 100)}…</p>
                <div style={s.servMeta}>
                  <span style={{ ...s.servBadge, background: sv.color + '18', color: sv.color }}>{sv.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
            <Link to="/services" style={s.viewAllBtn}>View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ─── BRANDS ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Equipment Brands</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Brands We Service &amp; Supply</h2>
            <p style={{ textAlign: 'center', color: '#5a6272', marginBottom: 36, fontSize: '0.95rem' }}>
              Authorised service and spare parts for all major commercial laundry brands
            </p>
          </div>
          <div style={s.brandsWrap}>
            {['IPSO', 'Electrolux', 'Huebsch', 'Cissell', 'Girbau', 'Pony', 'Realstar', 'Earlstar', 'ADC', 'Rema'].map((b, i) => (
              <div key={b} style={s.brandPill} className={`reveal delay-${Math.min(i + 1, 6)}`}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f4f6fb', position: 'relative', overflow: 'hidden' }}>
        <div style={s.whyGlow} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Advantage</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Clients Choose BST</h2>
          </div>
          <div style={s.whyGrid}>
            {[
              { icon: '⚡', title: 'Fast Response', desc: 'Emergency breakdown support within hours. Hotel laundry operations cannot wait — neither do we.' },
              { icon: '🎯', title: 'Specialist Expertise', desc: 'Deep technical knowledge of IPSO, Electrolux, Huebsch, Pony, Cissell and all major commercial laundry brands.' },
              { icon: '📋', title: 'Compliant Invoicing', desc: 'SST-registered and e-invoice ready. Full compliance with LHDN e-Invoice mandate for corporate clients.' },
              { icon: '🔒', title: 'Long-Term Partnership', desc: 'Relationship-based service since 2011. We know your machines, your team, and your schedule.' },
              { icon: '🔩', title: 'Genuine Spare Parts', desc: 'We stock and supply original spare parts for all major brands — fast sourcing, fair pricing.' },
              { icon: '🎓', title: 'Training & Support', desc: 'Aqua wet cleaning chemical training (theory & practical) for your team. We build capability, not dependency.' },
            ].map((v, i) => (
              <div key={v.title} style={s.whyCard} className={`reveal hover-lift delay-${Math.min(i + 1, 6)} card-shine`}>
                <div style={s.whyIcon}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#1a3c6e', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '0.87rem', color: '#5a6272', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUSTED CLIENTS ───────────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Clients</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Trusted by Malaysia's Leading Hotels</h2>
            <p style={{ textAlign: 'center', color: '#5a6272', marginBottom: 40, fontSize: '0.95rem', maxWidth: 600, margin: '0 auto 40px' }}>
              From iconic 5-star properties to boutique resorts — we keep their laundry operations running flawlessly.
            </p>
          </div>

          {/* Machine photo strip */}
          <div style={s.machineStrip} className="home-machine-strip reveal">
            {[
              '/images/machine-05.jpg',
              '/images/machine-06.jpg',
              '/images/machine-02.jpg',
              '/images/machine-07.jpg',
            ].map((src, i) => (
              <div key={i} style={s.machineThumb} className="hover-lift">
                <img src={src} alt={`Commercial laundry equipment ${i + 1}`} style={s.machineImg} />
              </div>
            ))}
          </div>

          {/* Hotel names grid */}
          <div style={s.hotelGrid}>
            {featuredHotels.map((name, i) => (
              <div key={name} style={s.hotelChip} className={`reveal delay-${Math.min((i % 6) + 1, 6)} hover-lift`}>
                <span style={s.hotelDot}>🏨</span>
                <span style={s.hotelChipName}>{name}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link to="/customers" style={s.viewAllBtn}>View All {allHotels.length}+ Hotel Clients →</Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section style={s.ctaSection}>
        <div style={s.ctaOverlay} />
        <div style={s.ctaGlow1} />
        <div style={s.ctaGlow2} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }} className="reveal">
            Need Engineering Support?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: '1.05rem' }} className="reveal">
            Contact us for maintenance schedules, emergency repairs, or equipment supply quotations.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
            <a href={`tel:${provider.hp}`} style={s.ctaBtn}>📞 {provider.hp}</a>
            <Link to="/contact" style={s.ctaBtnGhost}>
              ✉️ Send Enquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Styles
   ═══════════════════════════════════════════════════════════════════ */
const s = {

  /* ── Hero ────────────────────────────────────────────────────────── */
  heroSection: {
    background: 'linear-gradient(135deg, #0f2447 0%, #1a3c6e 55%, #142f58 100%)',
    minHeight: 640,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '96px 48px 80px',
    overflow: 'hidden',
    gap: 48,
    maxWidth: '100%',
    justifyContent: 'center',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 80% 70% at 20% 50%, rgba(200,153,58,0.10) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  heroGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(200,153,58,0.07) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    pointerEvents: 'none',
  },
  heroGlow1: {
    position: 'absolute',
    top: -80,
    right: '15%',
    width: 320,
    height: 320,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,153,58,0.18) 0%, transparent 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  heroGlow2: {
    position: 'absolute',
    bottom: -60,
    left: '5%',
    width: 240,
    height: 240,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42,82,152,0.3) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    maxWidth: 600,
    flex: 1,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(200,153,58,0.18)',
    color: '#f0c060',
    border: '1px solid rgba(200,153,58,0.4)',
    padding: '7px 18px',
    borderRadius: 9999,
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: 24,
    backdropFilter: 'blur(8px)',
  },
  heroH1: {
    fontSize: '3.2rem',
    fontWeight: 900,
    color: '#fff',
    lineHeight: 1.12,
    marginBottom: 22,
    textShadow: '0 2px 24px rgba(0,0,0,0.3)',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1.05rem',
    lineHeight: 1.75,
    marginBottom: 36,
    maxWidth: 520,
  },
  heroActions: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  heroBtnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 30px',
    background: 'linear-gradient(135deg, #c8993a 0%, #f0c060 100%)',
    color: '#0f2447',
    fontWeight: 700,
    fontSize: '0.95rem',
    borderRadius: 9999,
    boxShadow: '0 8px 24px rgba(200,153,58,0.4)',
    transition: 'transform 0.25s, box-shadow 0.25s',
  },
  heroBtnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '13px 28px',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: '1.5px solid rgba(255,255,255,0.35)',
    borderRadius: 9999,
    backdropFilter: 'blur(8px)',
    transition: 'background 0.25s, border-color 0.25s',
  },
  heroChips: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  heroChip: {
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.65)',
    padding: '5px 14px',
    borderRadius: 6,
    fontSize: '0.75rem',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(6px)',
  },
  photoCard: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    width: 360,
    flexShrink: 0,
    boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,153,58,0.2)',
    border: '2px solid rgba(200,153,58,0.35)',
    zIndex: 1,
  },
  photoGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 50%, rgba(15,36,71,0.7) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    minHeight: 300,
  },
  photoBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    background: 'rgba(15,36,71,0.88)',
    backdropFilter: 'blur(12px)',
    borderRadius: 10,
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  photoBadgeText: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.92)',
    fontWeight: 600,
  },

  /* ── Stats Strip ───────────────────────────────────────────────────── */
  statsStrip: {
    background: '#fff',
    borderBottom: '1px solid #e8edf5',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    position: 'relative',
    overflow: 'hidden',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  statItem: {
    textAlign: 'center',
    padding: '36px 24px',
    borderRight: '1px solid #e8edf5',
    position: 'relative',
    transition: 'background 0.3s',
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: 12,
  },
  statVal: {
    fontSize: '2.6rem',
    fontWeight: 900,
    color: '#1a3c6e',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  statLabel: {
    fontSize: '0.82rem',
    color: '#5a6272',
    fontWeight: 500,
    marginTop: 8,
    letterSpacing: 0.3,
  },

  /* ── Section accent ────────────────────────────────────────────────── */
  sectionAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,153,58,0.06) 0%, transparent 70%)',
    transform: 'translate(30%, -30%)',
    pointerEvents: 'none',
  },

  /* ── Services ──────────────────────────────────────────────────────── */
  servGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    marginTop: 16,
  },
  servCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '28px 24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    borderBottom: '3px solid transparent',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
    cursor: 'default',
  },
  servIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: 16,
  },
  servTitle: {
    fontWeight: 700,
    color: '#1a3c6e',
    fontSize: '1rem',
    marginBottom: 6,
  },
  servEquip: {
    fontSize: '0.78rem',
    color: '#5a6272',
    marginBottom: 8,
  },
  servDesc: {
    fontSize: '0.84rem',
    color: '#444',
    lineHeight: 1.6,
    marginBottom: 14,
  },
  servMeta: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  servBadge: {
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: '0.72rem',
    fontWeight: 700,
  },

  /* ── Brands ────────────────────────────────────────────────────────── */
  brandsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 8,
  },
  brandPill: {
    background: '#f4f6fb',
    border: '1px solid #dde3ef',
    color: '#1a3c6e',
    padding: '11px 22px',
    borderRadius: 9999,
    fontWeight: 700,
    fontSize: '0.88rem',
    letterSpacing: 0.5,
    transition: 'background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s',
    cursor: 'default',
  },

  /* ── Why choose us ─────────────────────────────────────────────────── */
  whyGlow: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(26,60,110,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
    marginTop: 36,
  },
  whyCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '30px 26px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    borderTop: '4px solid #c8993a',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'default',
  },
  whyIcon: {
    fontSize: '2.2rem',
    marginBottom: 16,
  },

  /* ── Machine strip & hotel grid ────────────────────────────────────── */
  machineStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    marginBottom: 40,
  },
  machineThumb: {
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.14)',
    aspectRatio: '4/3',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  machineImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  hotelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 10,
  },
  hotelChip: {
    background: '#f4f6fb',
    borderRadius: 12,
    padding: '13px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid #e8edf5',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.25s',
    cursor: 'default',
  },
  hotelDot: {
    fontSize: '1rem',
    flexShrink: 0,
  },
  hotelChipName: {
    fontSize: '0.84rem',
    fontWeight: 600,
    color: '#1a3c6e',
    lineHeight: 1.3,
  },

  /* ── View all button ───────────────────────────────────────────────── */
  viewAllBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)',
    color: '#fff',
    padding: '13px 30px',
    borderRadius: 9999,
    fontWeight: 700,
    fontSize: '0.9rem',
    boxShadow: '0 6px 20px rgba(26,60,110,0.3)',
    transition: 'transform 0.25s, box-shadow 0.25s',
  },

  /* ── CTA section ───────────────────────────────────────────────────── */
  ctaSection: {
    background: 'linear-gradient(135deg, #0f2447 0%, #1a3c6e 50%, #142f58 100%)',
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(200,153,58,0.12) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
  },
  ctaGlow1: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,153,58,0.15) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  ctaGlow2: {
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: 'translateY(-50%)',
    width: 250,
    height: 250,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42,82,152,0.2) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  ctaBtn: {
    background: 'linear-gradient(135deg, #c8993a 0%, #f0c060 100%)',
    color: '#0f2447',
    padding: '15px 30px',
    borderRadius: 9999,
    fontWeight: 700,
    fontSize: '1rem',
    display: 'inline-block',
    boxShadow: '0 8px 24px rgba(200,153,58,0.4)',
    transition: 'transform 0.25s, box-shadow 0.25s',
  },
  ctaBtnGhost: {
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '14px 30px',
    borderRadius: 9999,
    fontWeight: 600,
    fontSize: '1rem',
    display: 'inline-block',
    border: '1.5px solid rgba(255,255,255,0.35)',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.25s, transform 0.25s',
  },
}
