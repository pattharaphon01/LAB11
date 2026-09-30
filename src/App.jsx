import { useRef, useState } from 'react'
import { ListTodo, Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, PRIORITY, PRIORITY_ORDER } from './constants'

const INITIAL_TODOS = [
  { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
  { id: 3, text: 'อ่านหนังสือ 30 นาที', done: true, priority: 'low' },
]

const REMOVE_DELAY = 350 // ms — ตรงกับเวลา animation ใน index.css

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const nextId = useRef(INITIAL_TODOS.length + 1)

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((ts) => [{ id: nextId.current++, text: t, done: false, priority }, ...ts])
    setText('')
  }

  const toggle = (id) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const edit = (id, newText) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, text: newText } : t)))

  const cycle = (id) =>
    setTodos((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % 3] }
          : t
      )
    )

  const remove = (id) => {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => t.id !== id)), REMOVE_DELAY)
  }

  const clearDone = () => {
    setTodos((ts) => ts.map((t) => (t.done ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => !t.done)), REMOVE_DELAY)
  }

  const remaining = todos.filter((t) => !t.done && !t.removing).length
  const doneCount = todos.filter((t) => t.done).length
  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  )
  const emptyMsg =
    filter === 'done'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
      ? 'เยี่ยม! ไม่มีงานค้างแล้ว'
      : 'ยังไม่มีงาน เริ่มเพิ่มงานแรกได้เลย'

  return (
    <main className="mx-auto max-w-xl px-4 py-8 sm:py-14">
      <header className="mb-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <ListTodo size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold leading-tight">รายการงานของฉัน</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            จัดการงานประจำวันอย่างเป็นระเบียบ
          </p>
        </div>
      </header>

      <section className="card mb-5 rounded-2xl p-4">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            className="min-w-0 flex-1 rounded-xl border bg-transparent px-4 py-2.5 outline-none focus:border-indigo-400"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          />
          <button
            onClick={add}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--muted)' }}>ความสำคัญ:</span>
          {PRIORITY_ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                priority === k ? PRIORITY[k].on : PRIORITY[k].badge
              }`}
            >
              {PRIORITY[k].label}
            </button>
          ))}
        </div>
      </section>

      <div className="card mb-4 flex gap-1 rounded-xl p-1">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="flex-1 rounded-lg py-2 text-sm font-medium transition-colors"
            style={
              filter === k
                ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                : { color: 'var(--muted)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card rounded-xl py-10 text-center" style={{ color: 'var(--muted)' }}>
          {emptyMsg}
        </div>
      ) : (
        <ul className="m-0 list-none p-0">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={toggle}
              onDelete={remove}
              onEdit={edit}
              onCycle={cycle}
            />
          ))}
        </ul>
      )}

      <footer className="mt-4 flex items-center justify-between px-1 text-sm">
        <span style={{ color: 'var(--muted)' }}>
          เหลืออีก <b style={{ color: 'var(--text)' }}>{remaining}</b> งาน
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
            doneCount === 0
              ? 'cursor-not-allowed opacity-40'
              : 'text-red-500 hover:bg-red-500/10'
          }`}
        >
          ล้างที่เสร็จแล้ว{doneCount ? ` (${doneCount})` : ''}
        </button>
      </footer>

      <p className="mt-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข • แตะป้ายเพื่อเปลี่ยนความสำคัญ
      </p>
    </main>
  )
}
