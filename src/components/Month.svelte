<script>
  import { calendarMonth } from 'cntdys'
  import Week from './Week.svelte'
  import { weekClass } from '../util.js'

  export let year
  export let month
  export let selectedDay
  export let startOfTheWeek
  export let disableOnDay
</script>

{#each calendarMonth(year, month, startOfTheWeek) as week}
  <!-- Gotta pass all props back to prop to be consumed with `let:month` -->
  <slot {year} {month} {week} {selectedDay} {disableOnDay}>
    <tr class="{weekClass(week, month).join(' ')}">
      <Week {year} {month} {week} {selectedDay} {disableOnDay} />
    </tr>
  </slot>
{/each}
