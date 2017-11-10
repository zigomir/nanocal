import { IDay, MonthNumber, Year } from 'cntdys'

const isCurrentMonth = (day: IDay, month: number) => day.month.month === month

const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0

const isToday = (day: IDay, today: Date) =>
  day.dayInMonth === today.getDate() &&
  day.month.month === today.getMonth() + 1 &&
  day.month.year === today.getFullYear()

export const isSelected = (
  weekDay: IDay,
  { day, year, month }: { day: number; year: Year; month: MonthNumber }
) =>
  day === weekDay.dayInMonth &&
  month === weekDay.month.month &&
  year === weekDay.month.year

export const dayClass = (
  selectedDay: ICalendarDay | undefined,
  weekDay: IDay,
  month: MonthNumber,
  disableOnDay?: (timestamp: number) => boolean
) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  if (isToday(weekDay, new Date())) {
    classes.push('today')
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
  return week.every(weekDay => !isCurrentMonth(weekDay, month)) ? ['week', 'other-month'] : ['week']
}

export interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

export const monthName = (year: Year, month: MonthNumber, locale = 'en-US') =>
  new Date(year, month - 1).toLocaleString(locale, { month: 'long' })

export const dayNames = (startOfTheWeek: number, locale = 'en-US') => {
  const days = [...Array(7).keys()].map(d =>
    new Date(2000, 9, d + 1)
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
