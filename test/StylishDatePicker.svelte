<script>
  import DatePicker from '../src/components/DatePicker.svelte'
  import DayNames from '../src/components/DayNames.svelte'
  import Month from '../src/components/Month.svelte'
  import Week from '../src/components/Week.svelte'
  import Day from '../src/components/Day.svelte'

  const datePickerProps = {
    year: 2017,
    month: 11,
    locale: 'sl-SI',
    startOfTheWeek: 1,
    selectedDay: {
      year: 2017,
      month: 11,
      day: 1
    },
    disableOnDay: (dayTimestamp) => {
      // define these outside of this function to create them only once
      const dayInMilliseconds = 24 * 60 * 60 * 1000
      const today = new Date().getTime() - dayInMilliseconds
      const deadline = new Date(2019, 4 - 1, 6).getTime()
      return dayTimestamp > deadline // || dayTimestamp < today
    }
  }

  function handleSelectedDay({ detail: day }) {
    console.log(day)
  }
</script>

<!-- Default -->
<!-- <DatePicker {...datePickerProps} on:selectedDay={handleSelectedDay} /> -->

<!-- Custom -->
<!-- Almost total control over markup and styling 💆🏽‍♀️ -->
<DatePicker {...datePickerProps}
  let:year
  let:month
  let:startOfTheWeek
  let:locale
  let:selectedDay
  let:selectDay
  let:disableOnDay
  let:back
  let:forward
>
  <div slot="navigation">
    <button on:click="{back}">Back</button>
    <button on:click="{forward}">FW</button>
  </div>

  <div slot="month" let:monthName>
    <div>{monthName(year, month, locale)}</div>
    <div>{year}</div>
  </div>

  <div class="flex">
    <DayNames {startOfTheWeek} {locale}>
      <div slot="day" let:day>{day}</div>
    </DayNames>
  </div>

  <Month {year} {month} {startOfTheWeek} {disableOnDay} {selectedDay}>
    <div class="flex" slot="week" let:week>
      <Week {month} {week} {disableOnDay} {selectedDay}>
        <div slot="weekDay" let:weekDay>
          <Day {weekDay} {disableOnDay} {selectedDay} {month} on:selectedDay={handleSelectedDay} />
        </div>
      </Week>
    </div>
  </Month>
</DatePicker>

<style>
  .flex {
    display: flex;
  }
</style>
