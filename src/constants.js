export const PRIORITY = {
  low:    { label: 'ต่ำ',   badge: 'bg-emerald-500/15 text-emerald-600', on: 'bg-emerald-500 text-white', bar: 'bg-emerald-500' },
  medium: { label: 'กลาง', badge: 'bg-amber-500/15 text-amber-600',     on: 'bg-amber-500 text-white',   bar: 'bg-amber-500' },
  high:   { label: 'สูง',   badge: 'bg-red-500/15 text-red-600',         on: 'bg-red-500 text-white',     bar: 'bg-red-500' },
}

export const PRIORITY_ORDER = ['low', 'medium', 'high']

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]
