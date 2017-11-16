# nanocal

> 4 kB date picker & 5 kB range picker

## what

[date](nanocal/README.md) and [range picker](ranger/README.md) that work *with or without* build tools and *with or without* frameworks

for more detailed examples how to use it with frameworks, see [examples](./examples).

## why

don't be satisfied with `moment.js` + `jquery` combo to have a simple date or range picker

## how

shout-outs to [svelte](https://svelte.technology/)

### examples on codepen.io

- [nanocal with ES modules](https://codepen.io/zigomir/pen/YEZjgO?editors=1000)
- [ranger with ES modules](https://codepen.io/zigomir/pen/vWxaPV?editors=1000)

- [nanocal with iife](https://codepen.io/zigomir/pen/WXpama?editors=1000)
- [ranger with iife](https://codepen.io/zigomir/pen/dZvgLN?editors=1000)

## browser compatibility / known issues

tested on mostly modern browsers

- Chrome (desktop and mobile)
- Safari (desktop and mobile)
- Firefox
- Edge 15+
  - visibility: `hidden` won't work as CSS variable
  - today's circle only shown on Edge 16, but not properly aligned out of the box (re-aligns after reflow). Current workaround is to remove `today`'s highlighting

no IE because it lacks [CSS Variables](https://caniuse.com/#search=css%20variables) support
