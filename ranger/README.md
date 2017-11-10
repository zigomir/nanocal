# nanocal-ranger (range picker)

## usage in browser

add link to head for styles
```html
<link rel="stylesheet" href="https://unpkg.com/nanocal/dist/nanocal-ranger.min.css">
```

add div to body (yes I'm thinking about custom-elements, hopefully soon)
```html
<div id="nanocal-ranger"></div>
```

add as script: IIFE and global NanocalRanger
```html
<script src="https://unpkg.com/nanocal/dist/nanocal-ranger.min.iife.js"></script>
<script>
  // same as below except without import statement
</script>
```

add as module (not yet supported in Firefox)
```html
<script type="module">
  import NanocalRanger from 'https://unpkg.com/nanocal/dist/nanocal-ranger.min.esm.js'
  const el = document.getElementById('nanocal-ranger')
  const ranger = new NanocalRanger({
    target: el,
    data: {
      year: 2017,         // required
      month: 10,          // required, month where calendar is opened
      locale: 'en-US',    // optional, defaults to en-US
      startOfTheWeek: 0,  // optional, defaults to 0 which is Sunday
      disableOnDay: (dayTimestamp) => { // optional
        // define these outside of this function to create them only once
        const dayInMilliseconds = 24 * 60 * 60 * 1000
        const after = new Date(2017, 10 - 1, 14).getTime()
        const before = new Date(2017, 11 - 1, 23).getTime()
        return dayTimestamp < after || dayTimestamp > before
      },
      // optional, pre-selection
      rangeStartDay: {
        day: 10,
        month: 11,
        year: 2017
      },
      rangeEndDay: {
        day: 17,
        month: 11,
        year: 2017
      }
    }
  })

  ranger.on('selectedRange', ([start, end]) => console.log(start, end))
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
