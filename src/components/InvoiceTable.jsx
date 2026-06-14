function fmt(n) {
  return 'RM ' + Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2 })
}

export default function InvoiceTable({ invoices, showStatus = true, statusKey = 'status' }) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Invoice No</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Type</th>
            <th style={{ ...styles.th, textAlign: 'right' }}>Amount (RM)</th>
            {showStatus && <th style={styles.th}>Status</th>}
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <tr key={inv.no || i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={{ ...styles.td, fontWeight: 700, color: '#1a3c6e' }}>{inv.no}</td>
              <td style={styles.td}>{inv.date || inv.invoiceDate}</td>
              <td style={{ ...styles.td, maxWidth: 340 }}>{inv.desc}</td>
              <td style={styles.td}>
                {inv.type && (
                  <span className={`badge badge-${inv.type}`}>
                    {inv.type === 'service' ? 'Monthly Svc' : inv.type.charAt(0).toUpperCase() + inv.type.slice(1)}
                  </span>
                )}
              </td>
              <td style={{ ...styles.td, textAlign: 'right' }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: inv.type === 'paid' || inv.paidDate ? '#1a7a4a' : '#c0392b',
                  }}
                >
                  {fmt(inv.amount)}
                </span>
              </td>
              {showStatus && (
                <td style={styles.td}>
                  <span className={inv.paidDate ? 'badge badge-paid' : 'badge badge-unpaid'}>
                    {inv.paidDate ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  wrapper: {
    overflowX: 'auto',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.87rem',
    background: '#fff',
  },
  thead: {
    background: '#1a3c6e',
    color: '#fff',
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.8rem',
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '11px 14px',
    borderBottom: '1px solid #dde3ef',
    verticalAlign: 'middle',
  },
  rowEven: { background: '#fff' },
  rowOdd: { background: '#f8faff' },
}
