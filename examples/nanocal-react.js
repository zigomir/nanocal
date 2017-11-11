import React from 'react'
import { render } from 'react-dom'
import Nanocal from '../nanocal'
import '../nanocal/dist/nanocal.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: {
        year: 2017,
        month: 11,
        day: 1
      }
    }
  }

  componentDidMount() {
    const el = document.getElementById('nanocal')
    const nanocal = new Nanocal({
      target: el,
      data: {
        selectedDay: this.state.day
      }
    })

    nanocal.on('selectedDay', (day) => {
      this.setState({ day })
    })
  }

  render() {
    const { year, month, day } = this.state.day

    return <div>
        <h1>React & Nanocal</h1>
        <h2>Selected day: {year} / {month} / {day}</h2>
        <div id="nanocal"></div>
      </div>
  }
}

render(<App />, document.getElementById('app'))
