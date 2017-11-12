# ranger (range picker)

## usage in three steps

1. add link to head for styles
```html
<link rel="stylesheet" href="https://unpkg.com/nanocal-ranger/dist/ranger.min.css">
```

2. add div to body (yes I'm thinking about custom-elements, hopefully soon)
```html
<div id="ranger"></div>
```

3. a) add as iife script and get globally available `Ranger` constructor
```html
<script src="https://unpkg.com/nanocal-ranger"></script>
<script>
  const ranger = new Ranger({
    target: document.getElementById('ranger'), // required
    // options
    data: {
      year: 2017,
      month: 11,          // month where calendar is opened, defaults to current month/year
      locale: 'sl-SI',    // defaults to en-US
      startOfTheWeek: 1,  // defaults to 0 which is Sunday
      disableOnDay: (dayTimestamp) => {
        // define these outside of this function to create them only once
        const dayInMilliseconds = 24 * 60 * 60 * 1000
        const after = new Date(2017, 10 - 1, 14).getTime()
        const before = new Date(2017, 11 - 1, 23).getTime()
        return dayTimestamp < after || dayTimestamp > before
      },
      // pre-selection
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
  })
  ranger.on('selectedRange', ([start, end]) => console.log(start, end))
</script>
```

3. b) add as module (not yet supported in Firefox by default)
```html
<script type="module">
  import Ranger from 'https://unpkg.com/nanocal-ranger?module'
  // same as above with IIFE
</script>
```

## usage with npm and your own build pipeline

```sh
npm install nanocal-ranger
```

```js
const Ranger = require('nanocal-ranger')
// or
import Ranger from 'nanocal-ranger'
```

For more detailed examples how to use `nanocal` with `vue` or `react`, see [examples](../examples/README.md).
