# count'em days UI

> 4 kB date picker & 5 kB range picker

## why

do not be satisfied with `moment.js` + `jquery` combo to have a simple date picker

## todos

- disable all before/after (pass function)
- add tests
- study defaults
  - is today best as is or better not to highlight it at all?
- do more research on other pickers - measure sizes
  - https://www.webcomponents.org/search/date
  - https://roxus.github.io/range-datepicker/components/range-datepicker/demo/ -> nice but huge
- transition animation
- responsive: `flex-direction: column;`
- research
  - how good this is to customize
  - two builds: one with range and one without?

## good to haves

- render to custom elements when [issue resolved](https://github.com/sveltejs/svelte/issues/875)

```html
<cntdys-calendar year="2017" month="10" day="01"></cntdys-calendar>
```

## usage

Don't use `bundle.css` and define all styles yourself!
