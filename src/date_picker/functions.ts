import { IDay, MonthNumber } from 'cntdys'
import {
  ICalendarDay,
  isCurrentMonth,
  isSelected,
  ISvelteComponent,
  isWeekend
} from '../common'

export const dayClass = (
  selectedDay: ICalendarDay,
  weekDay: IDay,
  month: MonthNumber
) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month')
  if (selectedDay && isSelected(weekDay, selectedDay)) {
    classes.push('selected')
  }

  return classes.join(' ')
}

export const selectDay = (component: ISvelteComponent, day: IDay) => {
  const { month, dayInMonth } = day

  component.set({
    month: month.month,
    selectedDay: {
      day: dayInMonth,
      month: month.month,
      year: month.year
    },
    year: month.year
  })

  component.fire('selectedDay', {
    day: dayInMonth,
    month: month.month,
    year: month.year
  })
}
