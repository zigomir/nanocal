<script>
  import { dayNames } from '../util.js'

  export let locale
  export let startOfTheWeek
</script>

{#each dayNames(startOfTheWeek, locale) as day}
  <slot name="day" {day}>
    <th>{day}</th>
  </slot>
{/each}
