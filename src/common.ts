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

export const dayClass = (
  selectedDay: ICalendarDay | undefined,
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

  return classes
}

export interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

interface IDatePickerState {
  year: Year
  month: MonthNumber
  startOfTheWeek: number
  selectedDay?: ICalendarDay
}

export interface IRangePickerState extends IDatePickerState {
  hoverDay?: ICalendarDay
  rangeStartDay?: ICalendarDay
  rangeEndDay?: ICalendarDay
  // selectedRange?: // TODO
}

interface IEventPayload {
  start?: ICalendarDay
  end?: ICalendarDay
}

export interface ISvelteComponent {
  get(property: keyof IDatePickerState): object
  set(property: Partial<IDatePickerState>): void
  fire(eventName: string, payload: IEventPayload | ICalendarDay): void
}

export interface IRPSvelteComponent extends ISvelteComponent {
  get(property: keyof IRangePickerState): object
  set(property: Partial<IRangePickerState>): void
}

// TODO: let user pass locale
export const monthName = (year: Year, month: MonthNumber) =>
  new Date(year, month - 1).toLocaleString('en-US', { month: 'long' })

// TODO: let user pass locale
export const dayNames = (startOfTheWeek: number) => {
  const days = [...Array(7).keys()].map(d =>
    new Date(2000, 9, d + 1)
      .toLocaleString('en-US', { weekday: 'long' })
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
