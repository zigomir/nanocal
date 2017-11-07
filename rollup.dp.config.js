import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/nanocal/main.js',
  output: {
    sourcemap: true,
    name: 'CDDatePicker'
  },
  plugins: [
    resolve(),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      css: css => { css.write('dist/nanocal.min.css') },
      // customElement: true // false for firefox? – wait for https://github.com/sveltejs/svelte/issues/875
    }),
    production && minify({ comments: false })
  ]
}
