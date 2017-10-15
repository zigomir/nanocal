import { IDay, Year, MonthNumber } from 'cntdys'

export const isCurrentMonth = (day: IDay, month: number) => day.month.month === month
export const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0
export const isSelected = (weekDay: IDay, { day, year, month }: { day: number, year: Year, month: MonthNumber }) =>
  day === weekDay.dayInMonth &&
  month === weekDay.month.month &&
  year === weekDay.month.year

interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

export const dayNames = (startOfTheWeek: number) => {
  let days = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ]

  for (let i = 6; i > 6 - startOfTheWeek; i--) {
    let day = days.shift()
    if (day) {
      days.push(day)
    }
  }

  return days
}

export const dayClass = (selectedDay: ICalendarDay, weekDay: IDay, month: MonthNumber, hoverDay: IDay, range: boolean, rangeStartDay: ICalendarDay, rangeEndDay: ICalendarDay) => {
  let classes = ['day']
  if (isWeekend(weekDay)) classes.push('weekend')
  classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month')

  if (range && rangeStartDay) {
    if (isSelected(weekDay, rangeStartDay)) {
      classes.push('selected')
    }
    // if (rangeEndDay && isSelected(weekDay, rangeEndDay)) {
    //   classes.push('selected')
    // }

    // TODO: get the dates in consistent format!
    if (hoverDay || rangeEndDay) {
      const thisDayTs = Date.UTC(weekDay.month.year, weekDay.month.month - 1, weekDay.dayInMonth)
      const rangeStartTs = Date.UTC(rangeStartDay.year, rangeStartDay.month - 1, rangeStartDay.day)
      const hoverOrRangeEndTs = rangeEndDay ?
        Date.UTC(rangeEndDay.year, rangeEndDay.month - 1, rangeEndDay.day) :
        Date.UTC(hoverDay.month.year, hoverDay.month.month - 1, hoverDay.dayInMonth)

      if (
        (rangeStartTs && hoverOrRangeEndTs) &&
        thisDayTs >= rangeStartTs && thisDayTs <= hoverOrRangeEndTs ||
        thisDayTs <= rangeStartTs && thisDayTs >= hoverOrRangeEndTs
      ) {
        classes.push('farben')
      }
    }
  } else if (selectedDay && isSelected(weekDay, selectedDay)) {
    classes.push('selected')
  }

  return classes.join(' ')
}
