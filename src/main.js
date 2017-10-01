import Calendar from './Calendar.html'
import { calendarMonth } from 'cntdys' // use "../node_modules/cntdys/dist/main.[min.]js" if rollup-plugin-node-resolve not used

new Calendar({
  target: document.getElementById('calendar'),
  data: {
    year: 2017,
    month: 9,
    selectedDay: 30,
    calendarMonth: calendarMonth(2017, 9)
  }
})
