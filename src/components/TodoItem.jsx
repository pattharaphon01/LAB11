import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { PRIORITY } from '../constants'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCycle }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(todo.text)
  const inputRef = useRef(null)
  const p = PRIORITY[todo.priority]

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const t = val.trim()
    if (t) onEdit(todo.id, t)
    else setVal(todo.text)
    setEditing(false)
  }

  const cancel = () => {
    setVal(todo.text)
    setEditing(false)
  }

  return (
    <li className={`todo mb-2.5${todo.removing ? ' removing' : ''}`}>
      <div className="card relative flex items-center gap-3 overflow-hidden rounded-xl py-3 pl-0 pr-3">
        <span className={`absolute bottom-0 left-0 top-0 w-1 ${p.bar}`} />

        <button
          onClick={() => onToggle(todo.id)}
          aria-label="ทำเครื่องหมายว่าเสร็จ"
          className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            todo.done
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-gray-400/60 text-transparent hover:border-indigo-500'
          }`}
        >
          <Check size={15} strokeWidth={3} />
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') cancel()
              }}
              className="w-full rounded-md border border-indigo-400 bg-transparent px-2 py-1 outline-none"
              style={{ color: 'var(--text)' }}
            />
          ) : (
            <span
              onDoubleClick={() => {
                setVal(todo.text)
                setEditing(true)
              }}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={`block cursor-text select-none break-words transition-colors ${
                todo.done ? 'line-through' : ''
              }`}
              style={{ color: todo.done ? 'var(--muted)' : 'var(--text)' }}
            >
              {todo.text}
            </span>
          )}
        </div>

        <button
          onClick={() => onCycle(todo.id)}
          title="แตะเพื่อเปลี่ยนความสำคัญ"
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${p.badge}`}
        >
          {p.label}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบงาน"
          className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  )
}
