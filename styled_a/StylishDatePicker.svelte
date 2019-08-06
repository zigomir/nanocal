<script>
  import DatePicker from '../src/components/DatePicker.svelte'
  import DayNames from '../src/components/DayNames.svelte'
  import Month from '../src/components/Month.svelte'
  import Week from '../src/components/Week.svelte'

  import { dayClass } from '../src/util.js'

  // let selectedDay = {
  //   year: 2019,
  //   month: 8,
  //   day: 8
  // }

  // let datePickerProps = {
  //   year: 2019,
  //   month: 8,
  //   // locale: 'sl-SI',
  //   // startOfTheWeek: 1,
  //   selectedDay: {
  //     year: 2019,
  //     month: 8,
  //     day: 8
  //   },
  //   disableOnDay: (dayTimestamp) => {
  //     // define these outside of this function to create them only once
  //     // const dayInMilliseconds = 24 * 60 * 60 * 1000
  //     // const today = new Date().getTime() - dayInMilliseconds
  //     // const deadline = new Date(2019, 4 - 1, 6).getTime()
  //     // return dayTimestamp > deadline // || dayTimestamp < today
  //     return false
  //   }
  // }
</script>

<!-- Default -->
<!-- <DatePicker {...datePickerProps} /> -->

<!-- Custom -->
<!-- Almost total control over markup and styling 💆🏽‍♀️ -->
<!-- <DatePicker {...datePickerProps} -->

<DatePicker
  let:year
  let:month
  let:startOfTheWeek
  let:locale
  let:disableOnDay
  let:selectedDay
  let:handleSelectedDay
>
  <div slot="navigation" let:backward let:forward>
    <button class="border w-8 hover:bg-gray-300" on:click="{backward}">&lt;</button>
    <button class="border w-8 hover:bg-gray-300" on:click="{forward}">&gt;</button>
  </div>

  <div slot="month" let:monthName>
    <div class="capitalize text-gray-900">{monthName(year, month, locale)} {year}</div>
  </div>

  <div class="flex text-gray-700">
    <DayNames {startOfTheWeek} {locale}>
      <div class="w-8 text-center" slot="day" let:day>{day}</div>
    </DayNames>
  </div>

  <table>
    <Month {year} {month} {startOfTheWeek} {selectedDay} let:week let:month let:selectedDay>
      <tr class="week">
        <Week {year} {month} {week} {selectedDay} let:weekDay let:week let:month let:selectedDay>
          <td
            class="day w-8 hover:bg-gray-300 cursor-pointer {dayClass({ selectedDay, weekDay, month, disableOnDay }).join(' ')}"
            on:click="{() => handleSelectedDay(weekDay)}"
          >
            <div class="flex justify-center items-center">{weekDay.dayInMonth}</div>
          </td>
        </Week>
      </tr>
    </Month>
  </table>
</DatePicker>

<style>
:global(.selected) {
  color: red;
}
:global(.other-month) {
  visibility: hidden;
  pointer-events: none;
}
:global(.past) {
  color: gray;
  pointer-events: none;
}
:global(.week) {
  border-collapse: collapse;
}
:global(.day) {
  border: 1px solid black;
}
</style>
