<script>
  export let week = []
  export let year
  export let month
  export let selectedDay
  export let disableOnDay
</script>

{#each week as weekDay}
  <slot {year} {month} {week} {weekDay} {disableOnDay} {selectedDay}></slot>
{/each}
