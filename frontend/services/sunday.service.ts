import 'server-only'

import type { Result } from '@/lib/api'
import type { SundaySchedule } from '@/models/Sunday'

const SPREADSHEET_ID = '1WGnCZQ8uTzJrpjbYEKJKEL2OipqAUha-3my30qxu6VQ'
// Первый лист: A — служение, B пропускаем, C и далее — даты как в таблице.
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&headers=0`

type SheetResponse = {
  status: string
  table?: { rows: { c: ({ v?: string | null; f?: string } | null)[] }[] }
}

export const sundayService = {
  getSchedule: async (): Promise<Result<SundaySchedule>> => {
    try {
      const response = await fetch(SHEET_URL, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      })
      if (!response.ok)
        throw new Error(`Google Sheets: HTTP ${response.status}`)

      // Убираем оболочку google.visualization.Query.setResponse(...).
      const text = await response.text()
      const sheet = JSON.parse(
        text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1),
      ) as SheetResponse
      if (sheet.status !== 'ok' || !sheet.table) {
        throw new Error('Google Sheets: table unavailable')
      }

      const [header = [], ...rows] = sheet.table.rows.map(({ c }) =>
        c.map((cell) => String(cell?.f ?? cell?.v ?? '').trim()),
      )
      const dates = header.slice(2)

      return {
        ok: true,
        data: {
          dates,
          ministries: rows
            .filter((row) => row[0])
            .map((row) => ({
              name: row[0],
              people: dates.map((_, index) => row[index + 2] || ''),
            }))
            .filter(({ people }) => people.some(Boolean)),
        },
      }
    } catch (error) {
      console.error('Не удалось прочитать расписание из Google Sheets:', error)
      return {
        ok: false,
        error:
          'Не удалось загрузить расписание. Попробуйте обновить его позже.',
      }
    }
  },
}
