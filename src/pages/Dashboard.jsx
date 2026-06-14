import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import KpiCard from '../components/KpiCard'
import InvoiceTable from '../components/InvoiceTable'
import {
  unpaidInvoices, paidInvoices, paymentReceipts,
  paymentsMonthly, outstandingByCategory,
} from '../data/invoices'
import { financials } from '../data/company'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function fmt(n) {
  return 'RM ' + Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2 })
}

export default function Dashboard() {
  const barData = {
    labels: paymentsMonthly.map(p => p.month),
    datasets: [{
      label: 'Payments Received (RM)',
      data: paymentsMonthly.map(p => p.amount),
      backgroundColor: paymentsMonthly.map(p => p.amount > 0 ? '#1a7a4a' : '#dde3ef'),
      borderRadius: 6,
    }],
  }

  const donutData = {
    labels: outstandingByCategory.map(c => c.label),
    datasets: [{
      data: outstandingByCategory.map(c => c.amount),
      backgroundColor: ['#1a3c6e', '#c8993a', '#1a7a4a', '#c0392b', '#7b4fc7', '#2980b9'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: v => 'RM ' + v.toLocaleString() } },
    },
  }

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 14, padding: 16 } },
      tooltip: { callbacks: { label: ctx => ' RM ' + ctx.parsed.toLocaleString('en-MY', { minimumFractionDigits: 2 }) } },
    },
  }

  return (
    <div>
      {/* Page header */}
      <div style={pageHeader}>
        <div style={pageOverlay} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={breadcrumb}>Home / Dashboard</p>
          <h1 style={pageTitle}>Hilton KL Account Dashboard</h1>
          <p style={pageSub}>Financial overview · Report Date: {financials.reportDate}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>

        {/* Alerts */}
        <div style={alertRed}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <strong>Outstanding Balance: {fmt(financials.totalOutstanding)}</strong> — {financials.unpaidInvoiceCount} unpaid invoices dating back to October 2025.
            Oldest unpaid invoice ({financials.oldestUnpaid.ref}) is <strong>{financials.oldestUnpaid.months} months overdue</strong>.
            Immediate follow-up with Hilton A/C Department recommended.
          </div>
        </div>
        <div style={alertGold}>
          <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
          <div>
            <strong>Note:</strong> Invoice 02600176 shows RM 1,877.40 in the invoice file but RM 1,877.90 in the statement — minor rounding discrepancy. Please verify.
          </div>
        </div>

        {/* KPI cards */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH2}>Executive Summary</h2>
          <div style={kpiGrid}>
            <KpiCard icon="⚠️" label="Total Outstanding" value={fmt(financials.totalOutstanding)} sub={`${financials.unpaidInvoiceCount} unpaid invoices`} variant="red" />
            <KpiCard icon="✅" label="Total Paid (2026 YTD)" value={fmt(financials.totalPaid2026)} sub="6 payment batches received" variant="green" />
            <KpiCard icon="🔄" label="Monthly Retainer" value={fmt(financials.monthlyRetainer)} sub="RM 1,200 + 8% SST — ongoing" variant="gold" />
            <KpiCard icon="📄" label="Active Invoices (2026)" value="13" sub="Jan – Jun 2026 series" />
            <KpiCard icon="💰" label="Largest Single Invoice" value={fmt(financials.largestInvoice.amount)} sub={`${financials.largestInvoice.ref} – ${financials.largestInvoice.desc}`} />
            <KpiCard icon="📅" label="Oldest Unpaid" value={financials.oldestUnpaid.date} sub={`${financials.oldestUnpaid.ref} – RM ${financials.oldestUnpaid.amount} (${financials.oldestUnpaid.months} months)`} variant="red" />
          </div>
        </section>

        {/* Charts */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH2}>Financial Overview</h2>
          <div style={chartsGrid}>
            <div style={chartBox}>
              <div style={chartTitle}>2026 Payments Received (RM)</div>
              <div style={{ height: 250 }}>
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
            <div style={chartBox}>
              <div style={chartTitle}>Outstanding by Service Category</div>
              <div style={{ height: 250 }}>
                <Doughnut data={donutData} options={donutOptions} />
              </div>
            </div>
          </div>
        </section>

        {/* Unpaid invoices */}
        <section style={{ marginBottom: 40 }}>
          <div style={tableHeader}>
            <h2 style={sectionH2}>Outstanding / Unpaid Invoices</h2>
            <span style={redPill}>As of {financials.reportDate}</span>
          </div>
          <InvoiceTable invoices={unpaidInvoices} showStatus={false} />
          <div style={tableFoot}>
            <span>TOTAL OUTSTANDING</span>
            <span style={{ fontWeight: 800, color: '#c0392b', fontFamily: 'monospace', fontSize: '1rem' }}>{fmt(financials.totalOutstanding)}</span>
          </div>
        </section>

        {/* Paid invoices */}
        <section style={{ marginBottom: 40 }}>
          <div style={tableHeader}>
            <h2 style={sectionH2}>Paid Invoices — 2026 YTD</h2>
            <span style={greenPill}>✓ Verified</span>
          </div>
          <InvoiceTable invoices={paidInvoices} showStatus={true} />
          <div style={{ ...tableFoot, background: '#1a7a4a' }}>
            <span>TOTAL PAID (2026 YTD)</span>
            <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem' }}>{fmt(15264.4)}</span>
          </div>
        </section>

        {/* Payment receipts */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH2}>Payment Receipts on File</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                  {['Payment Date', 'Method', 'Amount (RM)', 'Invoices Covered'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentReceipts.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8faff' }}>
                    <td style={td}>{r.date}</td>
                    <td style={td}>{r.method}</td>
                    <td style={{ ...td, fontWeight: 700, color: '#1a7a4a', fontFamily: 'monospace' }}>{fmt(r.amount)}</td>
                    <td style={{ ...td, fontSize: '0.8rem', color: '#5a6272', maxWidth: 300 }}>{r.invoices}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#1a3c6e', color: '#fff' }}>
                  <td colSpan={2} style={{ ...td, fontWeight: 700 }}>TOTAL PAYMENTS RECEIVED (2026)</td>
                  <td style={{ ...td, fontWeight: 800, fontFamily: 'monospace' }}>{fmt(34654.4)}</td>
                  <td style={td}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Insights */}
        <section>
          <h2 style={sectionH2}>Insights &amp; Recommendations</h2>
          <div style={insightsGrid}>
            {[
              { icon: '⚠️', variant: 'red', title: 'Overdue Invoices (Oct–Nov 2025)', text: 'Invoices 02500514 (RM 898) and 02500531 (RM 2,235) are 7–8 months overdue. Priority: send a formal reminder to kulhi_ap@hilton.com immediately.' },
              { icon: '📈', variant: 'gold', title: 'Payment Pattern', text: 'Hilton pays in batches via online transfer — typically 2–3 months after invoicing. Average batch = RM 5,000–13,000. Consider issuing consolidated statements monthly to prompt faster collection.' },
              { icon: '🔧', variant: 'gold', title: 'High-Value Repair Jobs', text: 'Steam pipe and washer repairs are the most frequent high-cost items. Consider proposing a comprehensive Preventive Maintenance Package to reduce reactive repairs and stabilise revenue.' },
              { icon: '📋', variant: 'gold', title: 'New Machine Opportunity', text: 'Detailed quotations exist for new washers and dryers (Girbau, Pony, etc.) with layouts. Follow up on project status with the Engineering Department to advance this potential large sale.' },
            ].map(ins => (
              <div key={ins.title} style={ins.variant === 'red' ? alertRed2 : alertGold2}>
                <span style={{ fontSize: '1.3rem' }}>{ins.icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: 4 }}>{ins.title}</strong>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{ins.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const pageHeader = { background: 'linear-gradient(135deg, #1a3c6e 0%, #0f2447 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }
const pageOverlay = { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(200,153,58,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
const breadcrumb = { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 12 }
const pageTitle = { color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: 10 }
const pageSub = { color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }
const sectionH2 = { fontSize: '1.4rem', fontWeight: 800, color: '#1a3c6e', marginBottom: 20 }

const alertRed = { background: '#fdf0f0', border: '1px solid #f5c0c0', borderRadius: 10, padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.88rem', lineHeight: 1.6 }
const alertGold = { background: '#fffbf0', border: '1px solid #f5e4b0', borderRadius: 10, padding: '14px 18px', marginBottom: 32, display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.88rem', lineHeight: 1.6 }
const alertRed2 = { ...alertRed, margin: 0 }
const alertGold2 = { ...alertGold, margin: 0 }

const kpiGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }
const chartsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }
const chartBox = { background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }
const chartTitle = { fontSize: '0.8rem', fontWeight: 700, color: '#5a6272', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }

const tableHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }
const redPill = { background: '#fde8e8', color: '#c0392b', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }
const greenPill = { background: '#e2f5eb', color: '#1a7a4a', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }
const tableFoot = { background: '#1a3c6e', color: '#fff', borderRadius: '0 0 12px 12px', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', background: '#fff' }
const th = { padding: '12px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.8rem' }
const td = { padding: '11px 14px', borderBottom: '1px solid #dde3ef', verticalAlign: 'middle' }
const insightsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }
