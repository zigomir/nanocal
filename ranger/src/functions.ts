import { IDay, MonthNumber } from 'cntdys'
import {
  dayClass as datePickerDayClass,
  ICalendarDay,
  isSelected
} from '../../common'

export const dayClass = (
  weekDay: IDay,
  month: MonthNumber,
  hoverDay?: IDay,
  rangeStart?: ICalendarDay,
  rangeEnd?: ICalendarDay,
  disableOnDay?: (timestamp: number) => boolean
) => {
  const classes = datePickerDayClass(undefined, weekDay, month, disableOnDay)

  if (!rangeStart) {
    return classes
  }

  if (
    isSelected(weekDay, rangeStart) ||
    (rangeEnd && isSelected(weekDay, rangeEnd))
  ) {
    classes.push('selected')
  }

  if (hoverDay || rangeEnd) {
    const thisDayTs = Date.UTC(
      weekDay.month.year,
      weekDay.month.month - 1,
      weekDay.dayInMonth
    )
    const rangeStartTs = Date.UTC(
      rangeStart.year,
      rangeStart.month - 1,
      rangeStart.day
    )
    const hoverOrRangeEndTs = rangeEnd
      ? Date.UTC(rangeEnd.year, rangeEnd.month - 1, rangeEnd.day)
      : hoverDay
        ? Date.UTC(
          hoverDay.month.year,
          hoverDay.month.month - 1,
          hoverDay.dayInMonth
        )
        : undefined

    if (
      rangeStartTs &&
      hoverOrRangeEndTs &&
      ((thisDayTs >= rangeStartTs && thisDayTs <= hoverOrRangeEndTs) ||
        (thisDayTs <= rangeStartTs && thisDayTs >= hoverOrRangeEndTs))
    ) {
      classes.push('in-range')
      classes.push('override')
    }
  }

  return classes
}

export const selectDay = (
  day: IDay,
  rangeStart?: ICalendarDay,
  rangeEnd?: ICalendarDay
) => {
  const { month, dayInMonth } = day
  const actions = []

  if (!rangeStart) {
    actions.push({
      action: 'set',
      payload: {
        rangeStart: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })
  } else if (!rangeEnd) {
    actions.push({
      action: 'set',
      payload: {
        hoverDay: undefined,
        rangeEnd: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })

    const start = {
      day: rangeStart.day,
      month: rangeStart.month,
      year: rangeStart.year
    }
    const end = {
      day: dayInMonth,
      month: month.month,
      year: month.year
    }
    const startTs = Date.UTC(start.year, start.month - 1, start.day)
    const endTs = Date.UTC(end.year, end.month - 1, end.day)

    actions.push({
      action: 'fire',
      eventName: 'selectedRange',
      payload: startTs < endTs ? [start, end] : [end, start]
    })
  } else if (rangeStart && rangeEnd) {
    actions.push({
      action: 'set',
      payload: {
        rangeEnd: undefined,
        rangeStart: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })
  }

  return actions
}
