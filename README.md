## why

https://www.webcomponents.org/search/date

moment.js – all of them. Let's be leaner
- https://www.webcomponents.org/element/RoXuS/range-datepicker
- https://www.webcomponents.org/element/bendavis78/paper-date-picker

maybe not in vaadin - take a closers look: https://github.com/vaadin/vaadin-date-picker

## todos

- transition animation
- disable all before/after (pass function)
- responsive: `flex-direction: column;`
- research
  - how good this is to customize
  - two builds: one with range and one without?
- cleanup
  - add tests
  - all variables should have good names
  - better method names

## good to haves

- render to custom elements when [issue resolved](https://github.com/sveltejs/svelte/issues/875)

```html
<cntdys-calendar year="2017" month="10" day="01"></cntdys-calendar>
```

## usage

Don't use `bundle.css` and define all styles yourself!
