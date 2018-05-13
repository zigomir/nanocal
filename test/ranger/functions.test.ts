import * as test from 'tape'
import { dayClass, selectDay } from '../../ranger/src/functions'
import { IDay } from 'cntdys'
import { ICalendarDay } from '../../common'

test('dayClass', assert => {
  let weekDay: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  assert.deepEqual(dayClass(weekDay, 10), ['day', 'weekend', 'current-month'])

  let rangeStart: ICalendarDay = {
    day: weekDay.dayInMonth,
    month: weekDay.month.month,
    year: weekDay.month.year
  }
  assert.deepEqual(dayClass(weekDay, 10, undefined, rangeStart), [
    'day',
    'weekend',
    'current-month',
    'selected'
  ])

  rangeStart = { day: 1, month: 10, year: 2017 }
  let rangeEnd: ICalendarDay = rangeStart
  assert.deepEqual(dayClass(weekDay, 10, undefined, rangeStart, rangeEnd), [
    'day',
    'weekend',
    'current-month',
    'selected',
    'in-range',
    'override'
  ])

  rangeStart = { day: 1, month: 10, year: 2017 }
  let hoverDay: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  assert.deepEqual(
    dayClass(weekDay, 10, hoverDay, rangeStart),
    ['day', 'weekend', 'current-month', 'selected', 'in-range', 'override'],
    'Should be in range because of hover day.'
  )

  weekDay = {
    dayInWeek: 2,
    dayInMonth: 17,
    month: { month: 10, year: 2017 }
  }
  rangeStart = { day: 1, month: 10, year: 2017 }
  rangeEnd = { day: 10, month: 10, year: 2017 }
  assert.deepEqual(
    dayClass(weekDay, 10, undefined, rangeStart, rangeEnd),
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
        rangeStart: {
          day: day.dayInMonth,
          month: day.month.month,
          year: day.month.year
        }
      }
    }
  ])

  let rangeStart: ICalendarDay = {
    day: 1,
    month: 10,
    year: 2017
  }
  assert.deepEqual(selectDay(day, rangeStart), [
    {
      action: 'set',
      payload: {
        hoverDay: undefined,
        rangeEnd: {
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

  let rangeEnd: ICalendarDay = {
    day: 1,
    month: 10,
    year: 2017
  }
  assert.deepEqual(selectDay(day, rangeStart, rangeEnd), [
    {
      action: 'set',
      payload: {
        rangeEnd: undefined,
        rangeStart: {
          day: day.dayInMonth,
          month: day.month.month,
          year: day.month.year
        }
      }
    }
  ])

  assert.end()
})
