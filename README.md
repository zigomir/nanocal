# nanocal

> 4 kB date picker

## why

don't be satisfied with `moment.js` + `jquery` combo to have a simple date picker

## how

shout-outs to [svelte](https://svelte.dev)

## demo

[codepen](https://codepen.io/zigomir/pen/YEZjgO?editors=1000)

## usage

```html
<link rel="stylesheet" href="https://unpkg.com/nanocal@0.4.0/dist/nanocal.css">
<script type="module">
  import Nanocal from 'https://unpkg.com/nanocal@0.4.0/dist/nanocal.min.js'
  const nanocal = new Nanocal({
    target: document.querySelector('#calendar'),
    props: {
      selectedDay: {
        year: 2017,
        month: 11,
        day: 1
      }
    }
  })
  nanocal.$on('selectedDay', ({ detail: day }) => console.log(day))
</script>
```

or

```bash
npm install nanocal
```

```js
import Nanocal from 'nanocal'
```

## options

- `selectedDay` - object with `year`, `month` and `day` number properties
- `year` - number: year of month where calendar is opened, defaults to current year
- `month` - number: month where calendar is opened, defaults to current month
- `locale` - string: defaults to `navigator.language`
- `startOfTheWeek` - number: defaults to 0 which is Sunday
- `disableOnDay` - function: define custom function to specify which days should be disabled for selection

pass options to `Nanocal` constructor as `props`

```js
props: {
  selectedDay: {
    year: 2017,
    month: 11,
    day: 1
  },
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

## events

- `selectedDay`

```js
nanocal.$on('selectedDay', (day) => console.log(day)) // `nanocal` is Nanocal's instance
```

## styling

### with CSS variables

```js
// Grab wrapping element that defines all customizable styles:
const nanocalWrapper = document.querySelector('#nanocal .wrapper')
// modify CSS variables
nanocalWrapper.style.setProperty('--hover-color', 'pink') // change hover color
// read variable's value if needed
getComputedStyle(nanocalWrapper).getPropertyValue('--selected-color')
```

### exposed, customizable variables and their default values

```css
.wrapper {
  --font-family: Circular,"Helvetica Neue",Helvetica,Arial,sans-serif;

  --border-color: #e4e7e7;
  --border-width: 1px;
  --day-color: #575757;

  --cell-size: 37px;
  --caption-font-size: 1em;
  --day-font-size: .9em;
  --day-name-font-size: .7em;
  --day-name-color: #9e9c9c;

  --hover-color: #e4e7e7;

  --selected-background-color: #00a699;
  --selected-color: #ffffff;

  --today-color: var(--day-color);

  --other-month-visibility: hidden; /* hidden or visible */
  --other-day-color: #cacccd;

  --weekend-day-color: var(--day-color);
  --disabled-day-color: var(--other-day-color);

  /* ranger specific variables */
  --range-border-color: rgba(255,255,255,.2);
  --range-background-color: #00a69862;
  --range-color: var(--day-color);

  /* Mobile */
  --column-header-display: none; /* none or table-row */
}
```
