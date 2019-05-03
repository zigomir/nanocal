<script>
  import { getPreviousMonth, getNextMonth } from 'cntdys'
  import { monthName } from '../util.js'
  import DayNames from './DayNames.svelte'
  import Month from './Month.svelte'

  const today = new Date()
  export let year = today.getFullYear()
  export let month = today.getMonth() + 1
  export let locale = navigator.language
  export let startOfTheWeek = 0
  // required props
  export let disableOnDay
  export let selectedDay

  function back() {
    const prevMonth = getPreviousMonth(year, month)
    year = prevMonth.year
    month = prevMonth.month
  }

  function forward() {
    const nextMonth = getNextMonth(year, month)
    year = nextMonth.year
    month = nextMonth.month
  }
</script>

<slot name="navigation">
  <button on:click="{back}"></button>
  <button on:click="{forward}"></button>
</slot>

<slot name="month">
  <div>{monthName(year, month, locale)}</div>
  <div>{year}</div>
</slot>

<slot
  {year}
  {month}
  {startOfTheWeek}
  {selectedDay}
  {selectDay}
  {disableOnDay}
  {back}
  {forward}
  {locale}
>
  <table>
    <DayNames {startOfTheWeek} {locale} />
    <Month {year} {month} {startOfTheWeek} {disableOnDay} {selectedDay} on:selectedDay />
  </table>
</slot>
