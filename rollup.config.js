import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

const production = !process.env.ROLLUP_WATCH
const outputIndex = production ? 8 : 9 // TODO: make this more robust
const ranger = process.argv[outputIndex].includes('ranger')
const name = ranger ? 'Ranger' : 'Nanocal'
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
      customElement: true
    }),
    production && minify({ comments: false })
  ]
}
