<script>
  import Wrapper from '../../common/Wrapper.svelte'
  import Header from '../../common/Header.svelte'
  import { calendarMonth } from 'cntdys'
  import { dayClass, weekClass } from '../../common/index.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const today = new Date()

  export let year = today.getFullYear()
  export let month = today.getMonth() + 1
  export let locale = navigator.language
  export let startOfTheWeek = 0

  export let selectedDay = {
    day: today.getDate(),
    month,
    year
  }

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
    <Header year="{ year }" month="{ month }" locale="{ locale }" startOfTheWeek="{ startOfTheWeek }"></Header>
    {#each calendarMonth(year, month, startOfTheWeek) as week}
      <tr class="{weekClass(week, month).join(' ')}">
        {#each week as weekDay}
          <td on:click="{() => selectDay(weekDay)}"
            class="{dayClass(selectedDay, weekDay, month).join(' ')}">{weekDay.dayInMonth}</td>
        {/each}
      </tr>
    {/each}
  </table>
</Wrapper>
