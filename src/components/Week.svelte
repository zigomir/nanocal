<script>
  import { weekClass } from '../util.js'
  import Day from './Day.svelte'

  export let week = []
  export let month
  export let disableOnDay
  export let selectedDay
</script>

<tr class="{weekClass(week, month).join(' ')}">
  {#each week as weekDay}
    <Day {weekDay} {disableOnDay} {selectedDay} {month} on:selectedDay />
  {/each}
</tr>
