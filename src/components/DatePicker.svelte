<script>
  import { calendarMonth } from 'cntdys'
  import Wrapper from './Wrapper.svelte'
  import { dayClass, weekClass, monthName, dayNames } from '../util.js'
  import { createEventDispatcher } from 'svelte'

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
</script>

<Wrapper bind:year="{year}" bind:month="{month}">
  <table class="weeks">
    <caption class="caption">
      <span class="month-name">{monthName(year, month, locale)}</span>
      <span class="year">{year}</span>
    </caption>
    <tr class="header">
      {#each dayNames(startOfTheWeek, locale) as day}
        <th class="day-name">{day}</th>
      {/each}
    </tr>
    {#each calendarMonth(year, month, startOfTheWeek) as week}
      <tr class="{weekClass(week, month).join(' ')}">
        {#each week as weekDay}
          <td
            on:click="{() => selectDay(weekDay)}"
            class="{dayClass({ selectedDay, weekDay, month, disableOnDay }).join(' ')}"
          >{weekDay.dayInMonth}</td>
        {/each}
      </tr>
    {/each}
  </table>
</Wrapper>
