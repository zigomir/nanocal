# nanocal

> 4 kB date picker & 5 kB range picker

## why

do not be satisfied with `moment.js` + `jquery` combo to have a simple date picker

## todo

- should work with <script src="//unpkg.com/nanocal"></script> (need to resolve to .iife by default, also prepare esm version)
  - see https://github.com/frappe/charts/tree/master/dist and https://github.com/frappe/charts/blob/master/package.json#L5-L7
  - use with `https://unpkg.com/nanocal?module` or `https://unpkg.com/nanocal`
  - i should probably rename package names
- think about mixing of UTC and non-UTC dates
- transition animation
- responsive: `flex-direction: column;`
- study defaults and customization
  - is today best as is or better not to highlight it at all?
  - how good this is to customize
- do more research on other pickers - measure sizes
  - https://www.webcomponents.org/search/date
  - https://roxus.github.io/range-datepicker/components/range-datepicker/demo/ -> nice but huge
- improve dev/test/build workflow
  - find out if possible auto-test from command line with proper exit code - should use headless chrome

## good to haves

- render to custom elements when [issue resolved](https://github.com/sveltejs/svelte/issues/875)

```html
<cntdys-calendar year="2017" month="10" day="01"></cntdys-calendar>
```

## decisions

use `tape` and `browserify` to test in actual browsers - because this lib is meant for them.
node doesn't ship with internationalization modules so you can't simply pass locales.
