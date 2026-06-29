import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 1800, active = true) {
  const [display, setDisplay] = useState('')
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    const match = String(target).match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplay(String(target))
      return
    }
    started.current = true
    const end = parseInt(match[1], 10)
    const suffix = match[2] || ''
    const start = Date.now()
    function tick() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * end) + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return display || String(target)
}
