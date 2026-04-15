import type{ TakenStatus } from "./types"

const todayKey = () =>
  new Date().toISOString().slice(0, 10) //日付を2026-02-01みたいな文字列にしている。


export const loadToday = (): TakenStatus => {
  const data = localStorage.getItem(`pill-${todayKey()}`)
  if (data) return JSON.parse(data)

  return {
    morning: false,
    noon: false,
    night: false,
  }
}

export const saveToday = (status: TakenStatus) => {
  localStorage.setItem(
    `pill-${todayKey()}`,
    JSON.stringify(status)
  )
}