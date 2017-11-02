import { IDay, MonthNumber } from 'cntdys'
import {
  ICalendarDay,
  IRPSvelteComponent,
  isCurrentMonth,
  isSelected,
  isWeekend
} from '../common'

export const dayClass = (
  weekDay: IDay,
  month: MonthNumber,
  hoverDay: IDay,
  rangeStartDay: ICalendarDay,
  rangeEndDay: ICalendarDay
) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month')

  if (rangeStartDay) {
    if (
      isSelected(weekDay, rangeStartDay) ||
      (rangeEndDay && isSelected(weekDay, rangeEndDay))
    ) {
      classes.push('selected')
    }

    if (hoverDay || rangeEndDay) {
      const thisDayTs = Date.UTC(
        weekDay.month.year,
        weekDay.month.month - 1,
        weekDay.dayInMonth
      )
      const rangeStartTs = Date.UTC(
        rangeStartDay.year,
        rangeStartDay.month - 1,
        rangeStartDay.day
      )
      const hoverOrRangeEndTs = rangeEndDay
        ? Date.UTC(rangeEndDay.year, rangeEndDay.month - 1, rangeEndDay.day)
        : Date.UTC(
          hoverDay.month.year,
          hoverDay.month.month - 1,
          hoverDay.dayInMonth
        )

      if (
        rangeStartTs &&
        hoverOrRangeEndTs &&
        ((thisDayTs >= rangeStartTs && thisDayTs <= hoverOrRangeEndTs) ||
          (thisDayTs <= rangeStartTs && thisDayTs >= hoverOrRangeEndTs))
      ) {
        classes.push('in-range')
      }
    }
  }

  return classes.join(' ')
}

export const selectDay = (component: IRPSvelteComponent, day: IDay) => {
  const { month, dayInMonth } = day

  if (!component.get('rangeStartDay')) {
    component.set({
      rangeStartDay: {
        day: dayInMonth,
        month: month.month,
        year: month.year
      }
    })
  } else if (!component.get('rangeEndDay')) {
    component.set({
      hoverDay: undefined,
      rangeEndDay: {
        day: dayInMonth,
        month: month.month,
        year: month.year
      }
    })

    const rangeStartDay = component.get('rangeStartDay') as ICalendarDay
    const start = {
      day: rangeStartDay.day,
      month: rangeStartDay.month,
      year: rangeStartDay.year
    }
    const end = {
      day: dayInMonth,
      month: month.month,
      year: month.year
    }
    const startTs = Date.UTC(start.year, start.month - 1, start.day)
    const endTs = Date.UTC(end.year, end.month - 1, end.day)

    if (startTs < endTs) {
      component.fire('selectedRange', { end, start })
    } else {
      component.fire('selectedRange', { end: start, start: end })
    }
  } else if (component.get('rangeStartDay') && component.get('rangeEndDay')) {
    // reset range and start from scratch
    component.set({
      rangeEndDay: undefined,
      rangeStartDay: {
        day: dayInMonth,
        month: month.month,
        year: month.year
      }
    })
  }
}
