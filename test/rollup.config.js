import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'

export default {
  output: {
    sourcemap: true,
    name: 'app',
    format: 'es',
    file: 'build/stylish-calendar.js'
  },
  plugins: [
    svelte({
      dev: true,
      css: css => { css.write('build/style.css') }
    }),
    resolve()
  ]
}
