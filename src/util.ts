
import { IDay, MonthNumber, Year } from 'cntdys'

const isCurrentMonth = (day: IDay, month: number) => day.month.month === month

const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0

const isToday = (day: IDay, today: Date) =>
  day.dayInMonth === today.getDate() &&
  day.month.month === today.getMonth() + 1 &&
  day.month.year === today.getFullYear()

const isInThePast = (day: IDay, today: Date) =>
  new Date(day.month.year, day.month.month - 1, day.dayInMonth).getTime() < today.getTime()

export const isSelected = (
  weekDay: IDay,
  { day, year, month }: { day: number; year: Year; month: MonthNumber }
) =>
  day === weekDay.dayInMonth &&
  month === weekDay.month.month &&
  year === weekDay.month.year

export const dayClass = ({
  selectedDay,
  weekDay,
  month,
  disableOnDay
}: {
  selectedDay?: ICalendarDay,
  weekDay: IDay,
  month: MonthNumber,
  disableOnDay?: (timestamp: number) => boolean
}) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  if (isToday(weekDay, new Date())) {
    classes.push('today')
  }
  if (isInThePast(weekDay, new Date())) {
    classes.push('past')
  }
  classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month')
  if (selectedDay && isSelected(weekDay, selectedDay)) {
    classes.push('selected')
  }
  if (
    disableOnDay &&
    disableOnDay(
      new Date(
        weekDay.month.year,
        weekDay.month.month - 1,
        weekDay.dayInMonth
      ).getTime()
    )
  ) {
    classes.push('disabled')
  }
  return classes
}

export const weekClass = (week: IDay[], month: MonthNumber) => {
  return week.every(weekDay => !isCurrentMonth(weekDay, month))
    ? ['week', 'other-month']
    : ['week']
}

export interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

export const monthName = (year: Year, month: MonthNumber, locale = navigator.language) =>
  new Date(year, month - 1).toLocaleString(locale, { month: 'long' }) // must not use UTC here

export const dayNames = (startOfTheWeek: number, locale = navigator.language) => {
  const days = [...Array(7).keys()].map(d =>
    new Date(2017, 9, d + 1) // must not use UTC here
      .toLocaleString(locale, { weekday: 'long' })
      .slice(0, 2)
  )

  for (let i = 6; i > 6 - startOfTheWeek; i--) {
    const day = days.shift()
    if (day) {
      days.push(day)
    }
  }

  return days
}
