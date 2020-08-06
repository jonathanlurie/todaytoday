import React from 'react'
import Store from '../../core/Store'
import Tools from '../../core/Tools'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './style.css'

class SidePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        className="side-panel"
      >
        <Calendar
          className="calendar"
          onChange={(date) => {
            console.log(date)
            
            Store.set('selectedDate', Tools.getIso8601z({date: date, onlyDate: true}))
            this.props.hideDrawer()
          }}
        />
      </div>
    )
  }
}

export default SidePanel