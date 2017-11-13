# nanocal

> 4 kB date picker & 5 kB range picker

## what

[date](nanocal/README.md) and [range picker](ranger/README.md) that work *with or without* build tools and *with or without* frameworks

## why

don't be satisfied with `moment.js` + `jquery` combo to have a simple date or range picker

## how

shout-outs to [svelte](https://svelte.technology/)

## browser compatibility / known issues

tested on mostly modern browsers

- Chrome (desktop and mobile)
- Safari (desktop and mobile)
- Firefox
- Edge 15+
  - visibility: `hidden` won't work as CSS variable
  - today's circle only shown on Edge 16, but not properly aligned out of the box (re-aligns after reflow). Current workaround is to remove `today`'s highlighting

no IE because it lacks [CSS Variables](https://caniuse.com/#search=css%20variables) support
