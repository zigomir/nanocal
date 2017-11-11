import { IDay, MonthNumber } from 'cntdys'
import {
  dayClass as datePickerDayClass,
  ICalendarDay,
  isSelected
} from '../../common/src'

export const dayClass = (
  weekDay: IDay,
  month: MonthNumber,
  hoverDay?: IDay,
  rangeStartDay?: ICalendarDay,
  rangeEndDay?: ICalendarDay,
  disableOnDay?: (timestamp: number) => boolean
) => {
  const classes = datePickerDayClass(undefined, weekDay, month, disableOnDay)

  if (!rangeStartDay) {
    return classes
  }

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
    }
  }

  return classes
}

export const selectDay = (
  day: IDay,
  rangeStartDay?: ICalendarDay,
  rangeEndDay?: ICalendarDay
) => {
  const { month, dayInMonth } = day
  const actions = []

  if (!rangeStartDay) {
    actions.push({
      action: 'set',
      payload: {
        rangeStartDay: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })
  } else if (!rangeEndDay) {
    actions.push({
      action: 'set',
      payload: {
        hoverDay: undefined,
        rangeEndDay: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })

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

    actions.push({
      action: 'fire',
      eventName: 'selectedRange',
      payload: startTs < endTs ? [start, end] : [end, start]
    })
  } else if (rangeStartDay && rangeEndDay) {
    actions.push({
      action: 'set',
      payload: {
        rangeEndDay: undefined,
        rangeStartDay: {
          day: dayInMonth,
          month: month.month,
          year: month.year
        }
      }
    })
  }

  return actions
}
