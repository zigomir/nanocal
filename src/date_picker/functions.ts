import { IDay } from 'cntdys'
import { ISvelteComponent } from '../common'

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
