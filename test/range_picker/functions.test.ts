import * as test from 'tape'
import { dayClass, selectDay } from '../../src/range_picker/functions'
import { IDay } from 'cntdys'
import { ICalendarDay, IRangePickerComponent, IRangePickerState } from '../../src/common'

test('dayClass', assert => {
  let weekDay: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  assert.deepEqual(dayClass(weekDay, 10), ['day', 'weekend', 'current-month'])

  let rangeStartDay: ICalendarDay = {
    day: weekDay.dayInMonth,
    month: weekDay.month.month,
    year: weekDay.month.year
  }
  assert.deepEqual(dayClass(weekDay, 10, undefined, rangeStartDay), [
    'day',
    'weekend',
    'current-month',
    'selected'
  ])

  rangeStartDay = { day: 1, month: 10, year: 2017 }
  let rangeEndDay: ICalendarDay = rangeStartDay
  assert.deepEqual(
    dayClass(weekDay, 10, undefined, rangeStartDay, rangeEndDay),
    ['day', 'weekend', 'current-month', 'selected', 'in-range']
  )

  rangeStartDay = { day: 1, month: 10, year: 2017 }
  let hoverDay: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  assert.deepEqual(
    dayClass(weekDay, 10, hoverDay, rangeStartDay),
    ['day', 'weekend', 'current-month', 'selected', 'in-range'],
    'Should be in range because of hover day.'
  )

  weekDay = {
    dayInWeek: 2,
    dayInMonth: 17,
    month: { month: 10, year: 2017 }
  }
  rangeStartDay = { day: 1, month: 10, year: 2017 }
  rangeEndDay = { day: 10, month: 10, year: 2017 }
  assert.deepEqual(
    dayClass(weekDay, 10, undefined, rangeStartDay, rangeEndDay),
    ['day', 'current-month'],
    'Should not be in range because week day is not between the range.'
  )

  assert.end()
})

test('selectDay', assert => {
  const component: IRangePickerComponent = {
    get(property: keyof IRangePickerState) {
      console.log(property)
      return {}
    },
    set(property: Partial<IRangePickerState>) {
      console.log(property)
    },
    fire(eventName, payload: [ICalendarDay, ICalendarDay]) {
      console.log(eventName, payload)
    }
  }
  const day: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  // assert.deepEqual(selectDay(component, day), [])
  assert.end()
})
