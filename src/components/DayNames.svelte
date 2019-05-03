<script>
  import { dayNames } from '../util.js'

  export let locale
  export let startOfTheWeek
</script>

<tr>
  {#each dayNames(startOfTheWeek, locale) as day}
    <th>{day}</th>
  {/each}
</tr>
