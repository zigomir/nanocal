import * as test from 'tape'
import { dayClass, monthName, dayNames, ICalendarDay } from '../src/common'
import { IDay } from 'cntdys'

test('dayClass', assert => {
  let weekDay: IDay = {
    dayInWeek: 0,
    dayInMonth: 1,
    month: { month: 10, year: 2017 }
  }
  assert.deepEqual(
    dayClass(undefined, weekDay, 10),
    ['day', 'weekend', 'current-month'],
    '1st October is current month and weekend.'
  )

  weekDay = { dayInWeek: 0, dayInMonth: 1, month: { month: 10, year: 2017 } }
  assert.deepEqual(
    dayClass(undefined, weekDay, 11),
    ['day', 'weekend', 'other-month'],
    '1st October is other month in this case.'
  )

  weekDay = { dayInWeek: 1, dayInMonth: 2, month: { month: 10, year: 2017 } }
  assert.deepEqual(
    dayClass(undefined, weekDay, 11),
    ['day', 'other-month'],
    '2nd October is Monday, so not weekend'
  )

  const today = new Date()
  weekDay = {
    dayInWeek: today.getDay(),
    dayInMonth: today.getDate(),
    month: { month: today.getMonth() + 1, year: today.getFullYear() }
  }
  assert.true(
    dayClass(undefined, weekDay, 10).includes('today'),
    'Should add today class.'
  )

  let selectedDay: ICalendarDay = { day: 2, month: 10, year: 2017 }
  weekDay = { dayInWeek: 1, dayInMonth: 2, month: { month: 10, year: 2017 } }
  assert.deepEqual(
    dayClass(selectedDay, weekDay, 11),
    ['day', 'other-month', 'selected'],
    'Should be selected'
  )

  weekDay = { dayInWeek: 0, dayInMonth: 1, month: { month: 10, year: 2017 } }
  assert.deepEqual(
    dayClass(undefined, weekDay, 11, ts => ts < new Date().getTime()),
    ['day', 'weekend', 'other-month', 'disabled'],
    'Should be disabled.'
  )

  assert.end()
})

test('monthName', assert => {
  assert.equal(monthName(2017, 10), 'October')
  assert.equal(monthName(2017, 10, 'sl-SI'), 'oktober')
  assert.end()
})

test('dayNames', assert => {
  assert.deepEqual(dayNames(0), ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
  assert.deepEqual(dayNames(1), ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])
  assert.deepEqual(dayNames(1, 'sl-SI'), [
    'po',
    'to',
    'sr',
    'če',
    'pe',
    'so',
    'ne'
  ])
  assert.end()
})
