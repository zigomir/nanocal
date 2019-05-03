<script>
  import Day from './Day.svelte'

  export let week = []
  export let month
  export let disableOnDay
  export let selectedDay
</script>

{#each week as weekDay}
  <slot name="weekDay" {weekDay}>
    <td>
      <Day {weekDay} {disableOnDay} {selectedDay} {month} on:selectedDay />
    </td>
  </slot>
{/each}
