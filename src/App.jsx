import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Quotations from './pages/Quotations'
import QuotationDetail from './pages/QuotationDetail'
import QuotationBuilder from './pages/QuotationBuilder'
import Customers from './pages/Customers'
import { supabase } from './lib/supabase'

// Pages that require login (only when Supabase is configured)
const PROTECTED = ['/dashboard', '/quotations', '/contacts']

function ProtectedRoute({ children }) {
  const { session } = useAuth()
  if (!supabase) return children          // no Supabase = dev mode, allow all
  if (session === undefined) return (     // still loading
    <div style={{ padding: 60, textAlign: 'center', color: '#1a3c6e' }}>Loading…</div>
  )
  if (!session) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { session } = useAuth()

  // Show login page (no navbar/footer)
  if (supabase && session === null) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* Protected pages */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/quotations" element={<ProtectedRoute><Quotations /></ProtectedRoute>} />
          <Route path="/quotations/new" element={<ProtectedRoute><QuotationBuilder /></ProtectedRoute>} />
          <Route path="/quotations/:id" element={<ProtectedRoute><QuotationDetail /></ProtectedRoute>} />
          <Route path="/quotations/:id/edit" element={<ProtectedRoute><QuotationBuilder /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
