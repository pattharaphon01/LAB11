import { LayoutGrid } from 'lucide-react'
import { CATEGORIES, CATEGORY_KEYS } from '../constants'

export default function Sidebar({ todos, value, onChange }) {
  const count = (k) => todos.filter((t) => t.category === k).length

  const item = (key, label, n, dot) => {
    const active = value === key
    return (
      <button
        key={key}
        onClick={() => onChange(key)}
        className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:w-full"
        style={active ? { background: 'var(--accent-soft)', color: 'var(--accent)' } : { color: 'var(--text)' }}
      >
        {dot ? <span className={`h-2.5 w-2.5 rounded-full ${dot}`} /> : <LayoutGrid size={14} />}
        <span className="flex-1 whitespace-nowrap text-left">{label}</span>
        <span
          className="rounded-full px-2 text-xs"
          style={{ background: active ? 'var(--card)' : 'var(--bg)', color: 'var(--muted)' }}
        >
          {n}
        </span>
      </button>
    )
  }

  return (
    <aside className="card h-fit rounded-2xl p-2 lg:sticky lg:top-6">
      <p className="hidden px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide lg:block" style={{ color: 'var(--muted)' }}>
        หมวดหมู่
      </p>
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {item('all', 'ทั้งหมด', todos.length, null)}
        {CATEGORY_KEYS.map((k) => item(k, CATEGORIES[k].label, count(k), CATEGORIES[k].dot))}
      </nav>
    </aside>
  )
}
