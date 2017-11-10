import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

const production = !process.env.ROLLUP_WATCH
const cssFileName = process.argv[2] === 'src/nanocal/main.js' ? 'nanocal' : 'nanocal-ranger'
const outputName = process.argv[2] === 'src/nanocal/main.js' ? 'Nanocal' : 'NanocalRanger'

export default {
  output: {
    sourcemap: !production,
    name: outputName
  },
  plugins: [
    resolve(),
    svelte({
      dev: !production, // enable run-time checks when not in production
      css: css => { css.write(`dist/${cssFileName}.min.css`) }
    }),
    production && minify({ comments: false })
  ]
}
