<script>
  import { createEventDispatcher } from 'svelte'
  import { calendarMonth, getPreviousMonth, getNextMonth } from 'cntdys'
  import { dayClass, weekClass, monthName, dayNames } from '../util.js'

  const dispatch = createEventDispatcher()
  const today = new Date()

  export let year = today.getFullYear()
  export let month = today.getMonth() + 1
  export let locale = navigator.language
  export let startOfTheWeek = 0
  export let disableOnDay
  export let selectedDay

  function selectDay(day) {
    selectedDay = {
      day: day.dayInMonth,
      month: day.month.month,
      year: day.month.year
    }
    dispatch('selectedDay', day)
  }

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

<slot>
  <table>
    <tr>
      {#each dayNames(startOfTheWeek, locale) as day}
        <th>{day}</th>
      {/each}
    </tr>
    {#each calendarMonth(year, month, startOfTheWeek) as week}
      <tr class="{weekClass(week, month).join(' ')}">
        {#each week as weekDay}
          <td
            class="{dayClass({ selectedDay, weekDay, month, disableOnDay }).join(' ')}"
            on:click="{() => selectDay(weekDay)}"
          >{weekDay.dayInMonth}</td>
        {/each}
      </tr>
    {/each}
  </table>
</slot>
