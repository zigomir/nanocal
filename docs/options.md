# options

- `year` - number: year of month where calendar is opened, defaults to current year
- `month` - number: month where calendar is opened, defaults to current month
- `locale` - string: defaults to en-US
- `startOfTheWeek` - number: defaults to 0 which is Sunday
- `disableOnDay` - function: define custom function to specify which days should be disabled for selection

pass options to `Nanocal` or `Ranger` constructor named `data` (svelte's convention).

```js
data: {
  year: 2017,
  month: 11,
  locale: 'sl-SI',
  startOfTheWeek: 1,
  disableOnDay: (dayTimestamp) => {
    // define these outside of this function to create them only once
    const dayInMilliseconds = 24 * 60 * 60 * 1000
    const today = new Date().getTime() - dayInMilliseconds
    const deadline = new Date(2017, 11 - 1, 23).getTime()
    return dayTimestamp < today || dayTimestamp > deadline
  }
}
```

## nanocal specific pre-selection

```js
data: {
  ... // other options
  selectedDay: {
    year: 2017,
    month: 11,
    day: 1
  }
}
```

## ranger specific pre-selection

```js
data: {
  ... // other options
  rangeStart: {
    day: 10,
    month: 11,
    year: 2017
  },
  rangeEnd: {
    day: 17,
    month: 11,
    year: 2017
  }
}
```

# events

- `selectedDay`
- `selectedRange`

## nanocal

```js
nanocal.on('selectedDay', (day) => console.log(day)) // where nanocal is Nanocal's instance
```

## ranger

```js
ranger.on('selectedRange', ([start, end]) => console.log(start, end)) // where ranger is Ranger's instance
```
