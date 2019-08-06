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

  function backward () {
    const prevMonth = getPreviousMonth(year, month)
    year = prevMonth.year
    month = prevMonth.month
  }

  function forward () {
    const nextMonth = getNextMonth(year, month)
    year = nextMonth.year
    month = nextMonth.month
  }

  function handleSelectedDay (day) {
    selectedDay = {
      day: day.dayInMonth,
      month: day.month.month,
      year: day.month.year
    }
  }
</script>

<slot name="navigation" backward="{() => backward()}" forward="{() => forward()}">
  <button on:click="{backward}"></button>
  <button on:click="{forward}"></button>
</slot>

<slot name="month" monthName="{() => monthName(year, month, locale)}">
  <div>{monthName(year, month, locale)}</div>
  <div>{year}</div>
</slot>

<slot
  {year}
  {month}
  {selectedDay}
  {disableOnDay}
  {backward}
  {forward}
  {startOfTheWeek}
  {locale}
  handleSelectedDay="{(weekDay) => handleSelectedDay(weekDay)}"
>
  <table>
    <tr>
      <DayNames {startOfTheWeek} {locale} />
    </tr>
    <Month {year} {month} {selectedDay} {disableOnDay} {startOfTheWeek} />
  </table>
</slot>
