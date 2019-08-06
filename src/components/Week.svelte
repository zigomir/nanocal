<script>
  export let week = []
  export let year
  export let month
  export let selectedDay
</script>

{#each week as weekDay}
  <slot {year} {month} {week} {weekDay} {selectedDay}></slot>
{/each}
