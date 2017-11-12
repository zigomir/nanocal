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
  const ranger = new Ranger({ target: document.querySelector('#ranger') })
</script>
```

3. b) add as module (not yet supported in Firefox by default)
```html
<script type="module">
  import Ranger from 'https://unpkg.com/nanocal-ranger?module'
  // same as above with IIFE
</script>
```

see [doc/options](../doc/options.md)

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

## customize styles

see [doc/styles](../doc/styles.md)
