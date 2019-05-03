<script>
  import DatePicker from '../src/components/DatePicker.svelte'
  // TODO: how to avoid importing this?
  import { dayClass, weekClass, monthName, dayNames } from '../src/util.js'
  import { calendarMonth } from 'cntdys'

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
  on:selectedDay={handleSelectedDay}
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
    <tr>
      <!-- <th slot="dayOfWeek" let:day={day}>{day}</th> -->
      {#each dayNames(startOfTheWeek, locale) as day}
        <th>{day}</th>
      {/each}
    </tr>
    {#each calendarMonth(year, month, startOfTheWeek) as week}
      <tr class="{weekClass(week, month).join(' ')}">
        <!-- <td slot="day" let:weekDay={weekDay}>{weekDay.dayInMonth}</td> -->
        {#each week as weekDay}
          <td
            class="{dayClass({ selectedDay, weekDay, month, disableOnDay }).join(' ')}"
            on:click="{() => selectDay(weekDay)}"
          >{weekDay.dayInMonth}</td>
        {/each}
      </tr>
    {/each}
  </table>
</DatePicker>
