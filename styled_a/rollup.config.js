import svelte from 'rollup-plugin-svelte'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  output: {
    sourcemap: true,
    name: 'app',
    format: 'es',
    file: `build/stylish-calendar${production ? '.min' : ''}.js`
  },
  plugins: [
    svelte({ dev: !production }),
    postcss({
      extract: production,
      plugins: [
        require('tailwindcss'),
      ]
    }),
    resolve(),
    production && terser()
  ]
}
