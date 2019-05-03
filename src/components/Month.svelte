<script>
  import { calendarMonth } from 'cntdys'
  import Week from './Week.svelte'

  export let year
  export let month
  export let startOfTheWeek
  export let disableOnDay
  export let selectedDay
</script>

{#each calendarMonth(year, month, startOfTheWeek) as week}
  <Week {month} {week} {disableOnDay} {selectedDay} on:selectedDay />
{/each}
