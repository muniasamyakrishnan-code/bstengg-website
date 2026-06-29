import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import KpiCard from '../components/KpiCard'
import { clientAccounts } from '../data/clients'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function fmt(n) {
  return 'RM ' + Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2 })
}

function shortName(name) {
  // shorten long names for card display
  return name.length > 28 ? name.slice(0, 26) + '…' : name
}

// ─── Overview: all clients ────────────────────────────────────────────────────

function ClientOverview({ onSelect, search, setSearch }) {
  const grandUnpaid = clientAccounts.reduce((s, c) => s + c.unpaidTotal, 0)
  const grandPaid   = clientAccounts.reduce((s, c) => s + c.paidTotal, 0)
  const withDebt    = clientAccounts.filter(c => c.unpaidTotal > 0).length

  const filtered = clientAccounts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Grand KPIs */}
      <div style={kpiGrid4}>
        <KpiCard icon="🏨" label="Active Accounts"      value={clientAccounts.length}  sub="across Malaysia" />
        <KpiCard icon="⚠️" label="Total Outstanding"    value={fmt(grandUnpaid)} sub={`${withDebt} accounts with balance`} variant="red" />
        <KpiCard icon="✅" label="Total Collected"       value={fmt(grandPaid)}   sub="2025–2026 YTD" variant="green" />
        <KpiCard icon="📊" label="Combined Revenue"      value={fmt(grandUnpaid + grandPaid)} sub="all accounts" variant="gold" />
      </div>

      {/* Search */}
      <div style={searchRow}>
        <input
          type="text"
          placeholder="Search client…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInput}
        />
        <span style={searchHint}>{filtered.length} of {clientAccounts.length} shown</span>
      </div>

      {/* Client cards */}
      <div style={clientGrid}>
        {filtered.map(client => {
          const hasDebt = client.unpaidTotal > 0
          const invCount = client.invoices.length
          return (
            <div
              key={client.id}
              onClick={() => onSelect(client)}
              style={{ ...clientCard, borderTop: `4px solid ${hasDebt ? '#c0392b' : '#1a7a4a'}` }}
            >
              <div style={clientCardName}>{shortName(client.name)}</div>
              <div style={clientCardMeta}>{invCount} invoice{invCount !== 1 ? 's' : ''} on record</div>
              <div style={clientCardRow}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Outstanding</div>
                  <div style={{ fontWeight: 800, color: hasDebt ? '#c0392b' : '#1a7a4a', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                    {hasDebt ? fmt(client.unpaidTotal) : '✓ Clear'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Paid</div>
                  <div style={{ fontWeight: 700, color: '#1a7a4a', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    {client.paidTotal > 0 ? fmt(client.paidTotal) : '—'}
                  </div>
                </div>
              </div>
              <div style={viewBtn}>View Account →</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Detail: single client ─────────────────────────────────────────────────────

function ClientDetail({ client }) {
  const unpaid = client.invoices.filter(i => i.status === 'unpaid')
  const paid   = client.invoices.filter(i => i.status === 'paid')

  // Bar chart: paid by month (last 8 months)
  const monthMap = {}
  paid.forEach(i => { if (i.month) monthMap[i.month] = (monthMap[i.month] || 0) + i.amount })
  const months = Object.keys(monthMap).sort().slice(-8)
  const barData = {
    labels: months.map(m => {
      const [yr, mo] = m.split('-')
      return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo-1] + ' ' + yr.slice(2)
    }),
    datasets: [{
      label: 'Paid (RM)',
      data: months.map(m => monthMap[m]),
      backgroundColor: '#1a7a4a',
      borderRadius: 6,
    }],
  }

  // Donut: unpaid by type
  const byType = { service: 0, supply: 0, repair: 0 }
  unpaid.forEach(i => { byType[i.type] = (byType[i.type] || 0) + i.amount })
  const donutLabels = Object.keys(byType).filter(k => byType[k] > 0)
  const donutData = {
    labels: donutLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
    datasets: [{
      data: donutLabels.map(k => byType[k]),
      backgroundColor: ['#1a3c6e', '#c8993a', '#c0392b'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  }

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { callback: v => 'RM ' + v.toLocaleString() } } },
  }
  const donutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 14, padding: 16 } },
      tooltip: { callbacks: { label: ctx => ' RM ' + ctx.parsed.toLocaleString('en-MY', { minimumFractionDigits: 2 }) } },
    },
  }

  const allAmounts = client.invoices.map(i => i.amount)
  const largest = client.invoices.reduce((a, b) => a.amount > b.amount ? a : b, { amount: 0, id: '-', desc: '' })
  const totalAll = client.unpaidTotal + client.paidTotal

  return (
    <div>
      {/* Alerts */}
      {client.unpaidTotal > 0 && (
        <div style={alertRed}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <strong>Outstanding Balance: {fmt(client.unpaidTotal)}</strong> — {unpaid.length} unpaid invoice{unpaid.length !== 1 ? 's' : ''} pending.
          </div>
        </div>
      )}

      {/* KPI cards */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={sectionH2}>Account Summary</h2>
        <div style={kpiGridAuto}>
          <KpiCard icon="⚠️" label="Outstanding"     value={fmt(client.unpaidTotal)} sub={`${unpaid.length} unpaid`}  variant={client.unpaidTotal > 0 ? 'red' : 'green'} />
          <KpiCard icon="✅" label="Total Collected" value={fmt(client.paidTotal)}   sub={`${paid.length} paid`}    variant="green" />
          <KpiCard icon="📊" label="Total Revenue"   value={fmt(totalAll)}           sub={`${client.invoices.length} invoices`} variant="gold" />
          <KpiCard icon="💰" label="Largest Invoice" value={fmt(largest.amount)}     sub={`INV-${largest.id}`} />
        </div>
      </section>

      {/* Charts — only show if there's data */}
      {(months.length > 0 || donutLabels.length > 0) && (
        <section style={{ marginBottom: 36 }}>
          <h2 style={sectionH2}>Financial Overview</h2>
          <div style={chartsGrid} className="dash-charts-grid">
            {months.length > 0 && (
              <div style={chartBox}>
                <div style={chartTitle}>Payments Received by Month (RM)</div>
                <div style={{ height: 240 }}><Bar data={barData} options={chartOptions} /></div>
              </div>
            )}
            {donutLabels.length > 0 && (
              <div style={chartBox}>
                <div style={chartTitle}>Outstanding by Category</div>
                <div style={{ height: 240 }}><Doughnut data={donutData} options={donutOptions} /></div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Unpaid invoices */}
      {unpaid.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <div style={tableHeader}>
            <h2 style={sectionH2}>Outstanding / Unpaid Invoices</h2>
            <span style={redPill}>{unpaid.length} invoices</span>
          </div>
          <InvTable rows={unpaid} />
          <div style={tableFoot}>
            <span>TOTAL OUTSTANDING</span>
            <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem' }}>{fmt(client.unpaidTotal)}</span>
          </div>
        </section>
      )}

      {/* Paid invoices */}
      {paid.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <div style={tableHeader}>
            <h2 style={sectionH2}>Paid Invoices</h2>
            <span style={greenPill}>✓ {paid.length} invoices</span>
          </div>
          <InvTable rows={paid} />
          <div style={{ ...tableFoot, background: '#1a7a4a' }}>
            <span>TOTAL PAID</span>
            <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem' }}>{fmt(client.paidTotal)}</span>
          </div>
        </section>
      )}

      {client.invoices.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5a6272' }}>
          No invoice data on file for this account.
        </div>
      )}
    </div>
  )
}

// ─── Simple invoice table ──────────────────────────────────────────────────────

function InvTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px 12px 0 0', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#1a3c6e', color: '#fff' }}>
            {['Invoice No', 'Date', 'Description', 'Type', 'Amount (RM)'].map(h => (
              <th key={h} style={{ padding: '12px 14px', textAlign: h === 'Amount (RM)' ? 'right' : 'left', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((inv, i) => (
            <tr key={`${inv.id}-${i}`} style={{ background: i % 2 === 0 ? '#fff' : '#f8faff' }}>
              <td style={{ padding: '11px 14px', borderBottom: '1px solid #dde3ef', fontWeight: 700, color: '#1a3c6e', whiteSpace: 'nowrap' }}>
                INV-{inv.id}
              </td>
              <td style={{ padding: '11px 14px', borderBottom: '1px solid #dde3ef', whiteSpace: 'nowrap', color: '#5a6272' }}>
                {inv.date}
              </td>
              <td style={{ padding: '11px 14px', borderBottom: '1px solid #dde3ef', maxWidth: 320 }}>
                {inv.desc}
              </td>
              <td style={{ padding: '11px 14px', borderBottom: '1px solid #dde3ef' }}>
                <span className={`badge badge-${inv.type}`}>
                  {inv.type === 'service' ? 'Service' : inv.type === 'supply' ? 'Supply' : 'Repair'}
                </span>
              </td>
              <td style={{ padding: '11px 14px', borderBottom: '1px solid #dde3ef', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', color: inv.status === 'paid' ? '#1a7a4a' : '#c0392b' }}>
                {fmt(inv.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Dashboard</p>
          <h1 style={pageTitle} className="page-title">
            {selected ? selected.name : 'Account Dashboard'}
          </h1>
          <p style={pageSub}>
            {selected
              ? `${selected.invoices.length} invoices · Outstanding: ${fmt(selected.unpaidTotal)} · Paid: ${fmt(selected.paidTotal)}`
              : `${clientAccounts.length} client accounts · Malaysia operations 2025–2026`}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Back button */}
        {selected && (
          <button onClick={() => setSelected(null)} style={backBtn}>
            ← All Accounts
          </button>
        )}

        {selected
          ? <ClientDetail client={selected} />
          : <ClientOverview onSelect={setSelected} search={search} setSearch={setSearch} />
        }
      </div>
    </div>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────────

const pageHeader = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }
const pageOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }
const sectionH2 = { fontSize: '1.3rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 16 }

const backBtn = { background: '#1a3c6e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 6 }

const kpiGrid4 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }
const kpiGridAuto = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }

const searchRow = { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }
const searchInput = { flex: 1, maxWidth: 320, padding: '9px 14px', borderRadius: 8, border: '1.5px solid #dde3ef', fontSize: '0.9rem', outline: 'none' }
const searchHint = { fontSize: '0.8rem', color: '#5a6272' }

const clientGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }
const clientCard = { background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.15s', display: 'flex', flexDirection: 'column', gap: 8 }
const clientCardName = { fontWeight: 800, color: '#1a3c6e', fontSize: '0.95rem', lineHeight: 1.3 }
const clientCardMeta = { fontSize: '0.75rem', color: '#5a6272' }
const clientCardRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4 }
const viewBtn = { marginTop: 8, fontSize: '0.78rem', color: '#c8993a', fontWeight: 700 }

const alertRed = { background: '#fdf0f0', border: '1px solid #f5c0c0', borderRadius: 10, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.88rem', lineHeight: 1.6 }

const chartsGrid = { display: 'grid', gap: 24 }
const chartBox = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }
const chartTitle = { fontSize: '0.78rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }

const tableHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }
const redPill = { background: '#fde8e8', color: '#c0392b', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }
const greenPill = { background: '#e2f5eb', color: '#1a7a4a', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }
const tableFoot = { background: '#1a3c6e', color: '#fff', borderRadius: '0 0 12px 12px', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
