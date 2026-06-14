export default function KpiCard({ label, value, sub, variant = 'default', icon }) {
  const colors = {
    default: { border: '#1a3c6e', value: '#1a3c6e' },
    red: { border: '#c0392b', value: '#c0392b' },
    green: { border: '#1a7a4a', value: '#1a7a4a' },
    gold: { border: '#c8993a', value: '#c8993a' },
  }
  const c = colors[variant] || colors.default

  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${c.border}` }}>
      {icon && <div style={styles.icon}>{icon}</div>}
      <div style={styles.label}>{label}</div>
      <div style={{ ...styles.value, color: c.value }}>{value}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '22px 20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  icon: {
    fontSize: '1.6rem',
    marginBottom: 8,
  },
  label: {
    fontSize: '0.72rem',
    color: '#5a6272',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    fontWeight: 600,
    marginBottom: 6,
  },
  value: {
    fontSize: '1.7rem',
    fontWeight: 800,
    lineHeight: 1.1,
  },
  sub: {
    fontSize: '0.78rem',
    color: '#5a6272',
    marginTop: 5,
  },
}
