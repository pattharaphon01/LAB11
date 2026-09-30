const pad = (n) => String(n).padStart(2, '0')

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => toISO(new Date())

export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export const formatDue = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

// 'overdue' | 'today' | 'future' | 'none' (งานที่เสร็จแล้วหรือไม่มีวันครบกำหนด = none)
export function dueState(todo) {
  if (!todo.due || todo.done) return 'none'
  const t = todayISO()
  if (todo.due < t) return 'overdue'
  if (todo.due === t) return 'today'
  return 'future'
}

// สถานะสำหรับสถิติ: done | overdue | active
export const statusOf = (todo) =>
  todo.done ? 'done' : dueState(todo) === 'overdue' ? 'overdue' : 'active'
