import { STATUS } from '../constants'
import { statusOf } from '../utils/date'

function Donut({ counts, total, percent }) {
  const R = 15.9155 // เส้นรอบวง = 100
  let offset = 0
  const segs = Object.keys(STATUS).map((k) => {
    const len = total ? (counts[k] / total) * 100 : 0
    const seg = { k, len, offset }
    offset += len
    return seg
  })

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r={R} fill="none" stroke="var(--border)" strokeWidth="4" />
        {segs.map(
          (s) =>
            s.len > 0 && (
              <circle
                key={s.k}
                cx="18"
                cy="18"
                r={R}
                fill="none"
                stroke={STATUS[s.k].color}
                strokeWidth="4"
                strokeDasharray={`${s.len} ${100 - s.len}`}
                strokeDashoffset={-s.offset}
                style={{ transition: 'stroke-dasharray .4s ease, stroke-dashoffset .4s ease' }}
              />
            )
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">{percent}%</div>
    </div>
  )
}

export default function Stats({ todos }) {
  const counts = { done: 0, active: 0, overdue: 0 }
  todos.forEach((t) => {
    counts[statusOf(t)]++
  })
  const total = todos.length
  const percent = total ? Math.round((counts.done / total) * 100) : 0

  return (
    <section className="card mb-5 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl p-4">
      <Donut counts={counts} total={total} percent={percent} />

      <div className="flex gap-8">
        <div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>งานทั้งหมด</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>เสร็จแล้ว</p>
          <p className="text-3xl font-bold">{percent}%</p>
        </div>
      </div>

      <ul className="m-0 min-w-[9rem] list-none space-y-1.5 p-0 text-sm">
        {Object.keys(STATUS).map((k) => (
          <li key={k} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS[k].color }} />
            <span className="flex-1" style={{ color: 'var(--muted)' }}>{STATUS[k].label}</span>
            <b>{counts[k]}</b>
          </li>
        ))}
      </ul>
    </section>
  )
}
