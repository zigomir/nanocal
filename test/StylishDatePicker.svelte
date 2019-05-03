<script>
  import DatePicker from '../src/components/DatePicker.svelte'
  import DayNames from '../src/components/DayNames.svelte'
  import Month from '../src/components/Month.svelte'
  // TODO: how to avoid importing this?
  import { monthName } from '../src/util.js'

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

  <div slot="month">
    <div>{monthName(year, month, locale)}</div>
    <div>{year}</div>
  </div>

  <table>
    <DayNames {startOfTheWeek} {locale} />
    <Month {year} {month} {startOfTheWeek} {disableOnDay} {selectedDay} on:selectedDay={handleSelectedDay} />
  </table>
</DatePicker>
