import Vue from 'vue'

// TODO: find out why won't work with simple 'nanocal' defined as main?
import Nanocal from '../dist/nanocal.min.esm.js'
import '../dist/nanocal.min.css'

let state = {
  day: {
    year: 2017,
    month: 11,
    day: 1
  }
}

new Vue({
  el: '#app',
  data() {
    return state
  },
  render(h, ctx) {
    const { year, month, day } = this.$data.day

    return <div>
      <h1>Hello Vue & Nanocal</h1>
      <h2>Selected {year} / {month} / {day}</h2>
      <div id="nanocal"></div>
    </div>
  },
  mounted() {
    const el = document.getElementById('nanocal')
    const nanocal = new Nanocal({
      target: el,
      data: {
        year: 2017,
        month: 11,
        selectedDay: state.day
      }
    })

    nanocal.on('selectedDay', (day) => {
      state.day = day // mutate
    })
  }
})
