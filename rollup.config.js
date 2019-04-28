import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  output: {
    sourcemap: true,
    name: 'Nanocal'
  },
  plugins: [
    svelte({
      dev: !production, // enable run-time checks when not in production
      css: css => { css.write(`${production ? 'dist' : 'build'}/nanocal.min.css`) }
    }),
    resolve(),
    production && terser()
  ]
}
