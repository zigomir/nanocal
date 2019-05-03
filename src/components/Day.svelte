<script>
  import { createEventDispatcher } from 'svelte'
  import { dayClass } from '../util.js'

  const dispatch = createEventDispatcher()

  export let weekDay
  export let month
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

<td
  class="{dayClass({ selectedDay, weekDay, month, disableOnDay }).join(' ')}"
  on:click="{() => selectDay(weekDay)}"
>{weekDay.dayInMonth}</td>
