import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

const production = !process.env.ROLLUP_WATCH
const outputIndex = production ? 8 : 9 // TODO: make this more robust
const ranger = process.argv[outputIndex].includes('ranger')
const min = process.argv[outputIndex].includes('.min')
const name = ranger ? 'Ranger' : 'Nanocal' // will be used in iife
const cssName = ranger ? 'ranger' : 'nanocal'

export default {
  output: {
    sourcemap: !production,
    name
  },
  plugins: [
    resolve(),
    svelte({
      dev: !production, // enable run-time checks when not in production
      css: css => { css.write(`dist/${cssName}.min.css`) }
    }),
    production && min && minify({ comments: false })
  ]
}
