import { IDay } from 'cntdys'
import { IDatePickerComponent } from '../common'

export const selectDay = (component: IDatePickerComponent, day: IDay) => {
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
