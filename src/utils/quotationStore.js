import { supabase } from '../lib/supabase'

const LS_KEY = 'bst_quotations_v1'

// ── localStorage helpers (fallback) ──────────────────────────────────
function lsLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function lsSave(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

// ── ID generator ──────────────────────────────────────────────────────
export function generateId() {
  return Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()
}

// ── CRUD — async, Supabase when available, localStorage otherwise ─────

export async function listQuotations() {
  if (supabase) {
    const { data, error } = await supabase
      .from('quotations')
      .select('data')
      .order('created_at', { ascending: false })
    if (!error) return (data || []).map(r => r.data)
  }
  return lsLoad()
}

export async function getQuotation(id) {
  if (supabase) {
    const { data, error } = await supabase
      .from('quotations')
      .select('data')
      .eq('id', id)
      .single()
    if (!error && data) return data.data
    return null
  }
  return lsLoad().find(q => q.id === id) || null
}

export async function saveQuotation(q) {
  if (supabase) {
    const { error } = await supabase
      .from('quotations')
      .upsert({ id: q.id, data: q }, { onConflict: 'id' })
    if (error) throw error
    return q
  }
  // localStorage fallback
  const list = lsLoad()
  const idx = list.findIndex(x => x.id === q.id)
  if (idx >= 0) list[idx] = q; else list.unshift(q)
  lsSave(list)
  return q
}

export async function deleteQuotation(id) {
  if (supabase) {
    const { error } = await supabase.from('quotations').delete().eq('id', id)
    if (error) throw error
    return
  }
  lsSave(lsLoad().filter(q => q.id !== id))
}

// ── Migrate localStorage → Supabase (one-time) ───────────────────────
export async function migrateFromLocalStorage() {
  if (!supabase) return { migrated: 0 }
  const local = lsLoad()
  if (local.length === 0) return { migrated: 0 }

  const rows = local.map(q => ({ id: q.id, data: q }))
  const { error } = await supabase
    .from('quotations')
    .upsert(rows, { onConflict: 'id' })
  if (error) throw error

  localStorage.removeItem(LS_KEY)
  return { migrated: local.length }
}
