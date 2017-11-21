# how

## use CSS variables

```js
// Grab wrapping element that defines all customizable styles:
const nanocalWrapper = document.querySelector('#nanocal .wrapper')
// modify CSS variables
nanocalWrapper.style.setProperty('--hover-color', 'pink') // change hover color
// read variable's value if needed
getComputedStyle(nanocalWrapper).getPropertyValue('--selected-color')
```

# what

## exposed, customizable variables and their default values

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
