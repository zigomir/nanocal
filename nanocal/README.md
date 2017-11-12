# nanocal (date picker)

## usage in three steps

1. add link to head for styles
```html
<link rel="stylesheet" href="https://unpkg.com/nanocal/dist/nanocal.min.css">
```

2. add div to body (yes I'm thinking about custom-elements, hopefully soon)
```html
<div id="nanocal"></div>
```

3. a) add as iife script and get globally available `Nanocal` constructor
```html
<script src="https://unpkg.com/nanocal"></script>
<script>
  const nanocal = new Nanocal({ target: document.querySelector('#nanocal') })
</script>
```

3. b) add as module (not yet supported in Firefox by default)
```html
<script type="module">
  import Nanocal from 'https://unpkg.com/nanocal?module'
  // same as above with IIFE
</script>
```

see [doc/options](../doc/options.md)

## usage with npm and your own build pipeline

```sh
npm install nanocal
```

```js
const Nanocal = require('nanocal')
// or
import Nanocal from 'nanocal'
```

For more detailed examples how to use `nanocal` with `vue` or `react`, see [examples](../examples/README.md).

## customize styles

see [doc/styles](../doc/styles.md)
