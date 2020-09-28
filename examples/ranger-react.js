import React from 'react'
import { render } from 'react-dom'
import Ranger from '../ranger'
import '../ranger/dist/ranger.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: {
        year: 2017,
        month: 11,
        day: 1
      },
      end: {
        year: 2017,
        month: 11,
        day: 10
      }
    }
  }

  componentDidMount() {
    const el = document.getElementById('nanocal')
    const ranger = new Ranger({
      target: el,
      data: {
        rangeStart: this.state.start,
        rangeEnd: this.state.end
      }
    })

    ranger.on('selectedRange', ([start, end]) => {
      this.setState({ start, end })
    })
  }

  render() {
    const { start, end } = this.state

    return <div>
        <h1>React & Nanocal Ranger</h1>
        <h2>Selected range: {start.year} / {start.month} / {start.day} - {end.year} / {end.month} / {end.day}</h2>
        <div id="nanocal"></div>
      </div>
  }
}

render(<App />, document.getElementById('app'))
