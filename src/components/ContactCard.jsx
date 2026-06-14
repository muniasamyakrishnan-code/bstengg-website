const deptColors = {
  Engineering: { bg: '#eaf0ff', color: '#1a3c6e' },
  Finance: { bg: '#e2f5eb', color: '#1a7a4a' },
  Administration: { bg: '#fff6e0', color: '#8a5d00' },
  Purchasing: { bg: '#f0e8ff', color: '#5a1a8a' },
}

export default function ContactCard({ name, role, email, dept }) {
  const dc = deptColors[dept] || { bg: '#f4f6fb', color: '#5a6272' }

  return (
    <div style={styles.card}>
      <div style={styles.avatar}>
        {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
      </div>
      <div style={styles.body}>
        <div style={styles.name}>{name}</div>
        <div style={styles.role}>{role}</div>
        <span style={{ ...styles.dept, background: dc.bg, color: dc.color }}>{dept}</span>
        <a href={`mailto:${email}`} style={styles.email}>{email}</a>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    borderLeft: '4px solid #c8993a',
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1a3c6e, #2a5298)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.9rem',
    flexShrink: 0,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    minWidth: 0,
  },
  name: {
    fontWeight: 700,
    color: '#1a3c6e',
    fontSize: '0.92rem',
  },
  role: {
    fontSize: '0.78rem',
    color: '#5a6272',
    marginBottom: 4,
  },
  dept: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 20,
    fontSize: '0.68rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  email: {
    fontSize: '0.78rem',
    color: '#1a5aaf',
    wordBreak: 'break-all',
    textDecoration: 'none',
  },
}
