export const PRIORITY = {
  low:    { label: 'ต่ำ',   badge: 'bg-emerald-500/15 text-emerald-600', on: 'bg-emerald-500 text-white', bar: 'bg-emerald-500' },
  medium: { label: 'กลาง', badge: 'bg-amber-500/15 text-amber-600',     on: 'bg-amber-500 text-white',   bar: 'bg-amber-500' },
  high:   { label: 'สูง',   badge: 'bg-red-500/15 text-red-600',         on: 'bg-red-500 text-white',     bar: 'bg-red-500' },
}

export const PRIORITY_ORDER = ['low', 'medium', 'high']

export const CATEGORIES = {
  work:     { label: 'งาน',       tag: 'bg-blue-500/15 text-blue-600',     dot: 'bg-blue-500' },
  personal: { label: 'ส่วนตัว',   tag: 'bg-violet-500/15 text-violet-600', dot: 'bg-violet-500' },
  shopping: { label: 'ช้อปปิ้ง',  tag: 'bg-pink-500/15 text-pink-600',     dot: 'bg-pink-500' },
  health:   { label: 'สุขภาพ',    tag: 'bg-teal-500/15 text-teal-600',     dot: 'bg-teal-500' },
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES)

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

export const STATUS = {
  done:    { label: 'เสร็จแล้ว',  color: '#10b981' },
  active:  { label: 'กำลังทำ',    color: '#6366f1' },
  overdue: { label: 'เกินกำหนด',  color: '#ef4444' },
}
