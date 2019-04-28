<script>
  import { monthName, dayNames } from './index.js'
  export let year
  export let month
  export let locale
  export let startOfTheWeek = 1
</script>

<style>
  .caption {
    font-size: var(--caption-font-size);
  }
</style>

<caption class="caption">
  <span class="month-name">{monthName(year, month, locale)}</span>
  <span class="year">{year}</span>
</caption>
<tr class="header">
  {#each dayNames(startOfTheWeek, locale) as day}
    <th class="day-name">{ day }</th>
  {/each}
</tr>
