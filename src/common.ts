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

export interface ICalendarDay {
  day: number
  month: MonthNumber
  year: Year
}

interface ICalendarState {
  year: Year
  month: MonthNumber
  startOfTheWeek: number
  selectedDay?: ICalendarDay
}

export interface IRangePickerState extends ICalendarState {
  hoverDay?: ICalendarDay
  rangeStartDay?: ICalendarDay
  rangeEndDay?: ICalendarDay
}

interface IEventPayload {
  start?: ICalendarDay
  end?: ICalendarDay
}

export interface ISvelteComponent {
  get(property: keyof ICalendarState): object
  set(property: Partial<ICalendarState>): void
  fire(eventName: string, payload: IEventPayload | ICalendarDay): void
}

export interface IRPSvelteComponent extends ISvelteComponent {
  get(property: keyof IRangePickerState): object
  set(property: Partial<IRangePickerState>): void
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
