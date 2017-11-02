import { IDay, MonthNumber, Year } from 'cntdys'

export const isCurrentMonth = (day: IDay, month: number) =>
  day.month.month === month

export const isWeekend = (day: IDay) =>
  day.dayInWeek === 6 || day.dayInWeek === 0

export const isSelected = (
  weekDay: IDay,
  { day, year, month }: { day: number; year: Year; month: MonthNumber }
) =>
  day === weekDay.dayInMonth &&
  month === weekDay.month.month &&
  year === weekDay.month.year

interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

interface ICalendarState {
  year: Year
  month: MonthNumber
  startOfTheWeek: number
  range?: boolean
  hoverDay?: ICalendarDay
  selectedDay?: ICalendarDay
  rangeStartDay?: ICalendarDay
  rangeEndDay?: ICalendarDay
}

interface IEventPayload {
  start?: ICalendarDay
  end?: ICalendarDay
}

type PartialCalendarState = Partial<ICalendarState>
type Events = 'selectedRange' | 'selectedDay'

interface ISvelteComponent {
  get(property: keyof ICalendarState): object
  set(property: PartialCalendarState): void
  fire(eventName: Events, payload: IEventPayload | ICalendarDay): void
}

export const monthName = (year: Year, month: MonthNumber) =>
  new Date(year, month - 1).toLocaleString('en-US', { month: 'long' })

export const dayNames = (startOfTheWeek: number) => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  for (let i = 6; i > 6 - startOfTheWeek; i--) {
    const day = days.shift()
    if (day) {
      days.push(day)
    }
  }

  return days
}

export const dayClass = (
  selectedDay: ICalendarDay,
  weekDay: IDay,
  month: MonthNumber,
  hoverDay: IDay,
  range: boolean,
  rangeStartDay: ICalendarDay,
  rangeEndDay: ICalendarDay
) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month')

  if (range && rangeStartDay) {
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
  } else if (selectedDay && isSelected(weekDay, selectedDay)) {
    classes.push('selected')
  }

  return classes.join(' ')
}

export const selectDay = (
  component: ISvelteComponent,
  day: IDay,
  range: boolean
) => {
  const { month, dayInMonth } = day

  if (range) {
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
  } else {
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
}
