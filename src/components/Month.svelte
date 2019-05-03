<script>
  import { calendarMonth } from 'cntdys'
  import Week from './Week.svelte'
  import { weekClass } from '../util.js'

  export let year
  export let month
  export let startOfTheWeek
  export let disableOnDay
  export let selectedDay
</script>

{#each calendarMonth(year, month, startOfTheWeek) as week}
  <slot name="week" {week}>
    <tr class="{weekClass(week, month).join(' ')}">
      <Week {month} {week} {disableOnDay} {selectedDay} on:selectedDay />
    </tr>
  </slot>
{/each}
