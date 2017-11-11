import * as test from 'tape'
import { dayClass, selectDay } from '../../../ranger/src/functions'
import { IDay } from 'cntdys'
import { ICalendarDay } from '../../../common/src'

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
  const day: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }

  assert.deepEqual(selectDay(day), [
    {
      action: 'set',
      payload: {
        rangeStartDay: {
          day: day.dayInMonth,
          month: day.month.month,
          year: day.month.year
        }
      }
    }
  ])

  let rangeStartDay: ICalendarDay = {
    day: 1,
    month: 10,
    year: 2017
  }
  assert.deepEqual(selectDay(day, rangeStartDay), [
    {
      action: 'set',
      payload: {
        hoverDay: undefined,
        rangeEndDay: {
          day: day.dayInMonth,
          month: day.month.month,
          year: day.month.year
        }
      }
    },
    {
      action: 'fire',
      eventName: 'selectedRange',
      payload: [
        { day: 1, month: 10, year: 2017 },
        { day: 1, month: 10, year: 2017 }
      ]
    }
  ])

  let rangeEndDay: ICalendarDay = {
    day: 1,
    month: 10,
    year: 2017
  }
  assert.deepEqual(selectDay(day, rangeStartDay, rangeEndDay), [
    {
      action: 'set',
      payload: {
        rangeEndDay: undefined,
        rangeStartDay: {
          day: day.dayInMonth,
          month: day.month.month,
          year: day.month.year
        }
      }
    }
  ])

  assert.end()
})
