# options

- `year` - number: year of month where calendar is opened, defaults to current year
- `month` - number: month where calendar is opened, defaults to current month
- `locale` - string: defaults to en-US
- `startOfTheWeek` - number: defaults to 0 which is Sunday
- `disableOnDay` - function: define custom function to specify which days should be disabled for selection

pass options to `Nanocal` constructor named `props` (svelte's convention).

```js
props: {
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
    const deadline = new Date(2017, 11 - 1, 23).getTime()
    return dayTimestamp < today || dayTimestamp > deadline
  }
}
```

# events

- `selectedDay`

```js
nanocal.$on('selectedDay', (day) => console.log(day)) // where nanocal is Nanocal's instance
```
