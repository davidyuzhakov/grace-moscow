import type { SundaySchedule } from '@/models/Sunday'
import { IconCalendarWeek } from '@tabler/icons-react'

export function ScheduleBoard({ dates, ministries }: SundaySchedule) {
  if (!dates.length || !ministries.length) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-accent">
          <IconCalendarWeek size={28} stroke={1.7} />
        </span>
        <h2 className="mt-3 text-lg font-bold text-foreground">
          Расписание пока не опубликовано
        </h2>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-surface border border-border">
      <div className="block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-292.5 table-fixed border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-1 md:w-70 sm:w-56 w-44 h-16 md:py-4.5 md:px-6 py-3 px-4 border-b border-r border-border bg-surface-raised font-semibold"
                  scope="col"
                >
                  Служения
                </th>
                {dates.map((date, index) => (
                  <th
                    className={`border-b border-border bg-surface-raised py-4.5 px-6 font-semibold`}
                    key={index}
                    scope="col"
                  >
                    <span className="font-medium">{date}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ministries.map((ministry, index) => (
                <tr className="group" key={index}>
                  <th
                    className="sticky left-0 z-2 h-16 d:py-4.5 md:px-6 py-3 px-4 md:text-sm text-xs font-normal transition-colors bg-surface border-border border-r border-b first:border-t-0 group-hover:bg-surface-raised"
                    scope="row"
                  >
                    {ministry.name}
                  </th>
                  {ministry.people.map((person, index) => (
                    <td
                      className={`border-b border-border h-16 md:py-4.5 md:px-6 py-3 px-4 md:text-sm text-xs  transition-colors last:border-r-0 group-hover:bg-surface-raised bg-surface`}
                      key={index}
                    >
                      <span
                        className={
                          person
                            ? 'block whitespace-pre-line'
                            : 'text-muted'
                        }
                      >
                        {person}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
