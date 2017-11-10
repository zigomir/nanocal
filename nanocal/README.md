# nanocal (date picker)

## usage in browser

add link to head for styles
```html
<link rel="stylesheet" href="https://unpkg.com/nanocal/dist/nanocal.min.css">
```

add div to body (yes I'm thinking about custom-elements, hopefully soon)
```html
<div id="nanocal"></div>
```

add as script: IIFE and global NanocalRanger
```html
<script src="https://unpkg.com/nanocal"></script>
<script>
  // same as below except without import statement
</script>
```

add as module (not yet supported in Firefox)
```html
<script type="module">
  import Nanocal from 'https://unpkg.com/nanocal?module'
  const el = document.getElementById('nanocal')
  const nanocal = new Nanocal({
    target: el,
    data: {
      year: 2017,         // required
      month: 11,          // required, month where calendar is opened
      locale: 'en-US',    // optional, defaults to en-US
      startOfTheWeek: 0,  // optional, defaults to 0 which is Sunday
      disableOnDay: (dayTimestamp) => { // optional
        // define these outside of this function to create them only once
        const dayInMilliseconds = 24 * 60 * 60 * 1000
        const today = new Date().getTime() - dayInMilliseconds
        const deadline = new Date(2017, 11 - 1, 23).getTime()
        return dayTimestamp < today || dayTimestamp > deadline
      },
      // optional, pre-selection
      selectedDay: {
        year: 2017,
        month: 11,
        day: 1
      }
    }
  })

  nanocal.on('selectedDay', (day) => console.log(day))
</script>
```

## usage with npm and your own build pipeline

```sh
npm install nanocal
```

```js
const Nanocal = require('nanocal')
// or
import Nanocal from 'nanocal'
```
