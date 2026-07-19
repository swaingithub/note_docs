const KEY = 'devnotes:activity'

export function recordStudy(): void {
  if (typeof localStorage === 'undefined') return
  const today = new Date().toISOString().slice(0, 10)
  let set: string[] = []
  try { set = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { set = [] }
  if (!set.includes(today)) {
    set.push(today)
    set.sort()
    if (set.length > 400) set = set.slice(-400)
    localStorage.setItem(KEY, JSON.stringify(set))
  }
}

export function getActivity(): string[] {
  if (typeof localStorage === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function currentStreak(dates: string[]): number {
  if (!dates.length) return 0
  const set = new Set(dates)
  let streak = 0
  const d = new Date()
  // if today not yet recorded, start from yesterday
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  while (set.has(d.toISOString().slice(0, 10))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}
