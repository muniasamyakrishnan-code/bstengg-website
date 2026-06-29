import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()

  // Already logged in → go to dashboard
  useEffect(() => {
    if (session) navigate('/dashboard', { replace: true })
  }, [session, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError(err.message)
      setLoading(false)
    }
    // On success, useEffect above handles redirect via session change
  }

  return (
    <div style={wrap}>
      <div style={card}>
        {/* Logo + title */}
        <div style={header}>
          <img src="/logo.png" alt="Best Sun Tech" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
          <div style={coName}>Best Sun Tech Engineering</div>
          <div style={coSub}>Staff Portal — Please sign in to continue</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Email</label>
            <input
              type="email"
              style={input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={label}>Password</label>
            <input
              type="password"
              style={input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={errorBox}>{error}</div>
          )}

          <button type="submit" style={btn} disabled={loading}>
            {loading ? 'Signing in…' : '🔐 Sign In'}
          </button>
        </form>

        <p style={footer}>
          Best Sun Tech Engineering Sdn Bhd &nbsp;·&nbsp; Internal Use Only
        </p>
      </div>
    </div>
  )
}

const wrap = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2447 0%, #1a3c6e 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
}
const card = {
  background: '#fff',
  borderRadius: 16,
  padding: '40px 36px 32px',
  width: '100%',
  maxWidth: 400,
  boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
}
const header = {
  textAlign: 'center',
  marginBottom: 28,
}
const coName = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: '#1a3c6e',
  marginTop: 10,
}
const coSub = {
  fontSize: '0.8rem',
  color: '#888',
  marginTop: 4,
}
const label = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#5a6272',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  marginBottom: 6,
}
const input = {
  width: '100%',
  border: '1.5px solid #d0d6e0',
  borderRadius: 8,
  padding: '10px 12px',
  fontSize: '0.9rem',
  color: '#111',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}
const errorBox = {
  background: '#fde8e8',
  color: '#c0392b',
  border: '1px solid #f5c0c0',
  borderRadius: 6,
  padding: '8px 12px',
  fontSize: '0.82rem',
  marginBottom: 14,
}
const btn = {
  width: '100%',
  background: '#1a3c6e',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '12px',
  fontSize: '0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
}
const footer = {
  textAlign: 'center',
  fontSize: '0.72rem',
  color: '#aaa',
  marginTop: 24,
  marginBottom: 0,
}
