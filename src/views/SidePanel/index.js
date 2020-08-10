import React from 'react'
import { Divider, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import Store from '../../core/Store'
import EntryCollection from '../../core/EntryCollection'
import Tools from '../../core/Tools'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './style.css'

class SidePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  dlSnapshot = () => {
    EntryCollection.downloadSnapshot()
  }

  render() {
    return (
      <div
        className="side-panel"
      >
        <Calendar
          className="calendar"
          value={new Date(Store.get('selectedDate'))}
          onChange={(date) => {
            console.log(date)
            
            Store.set('selectedDate', Tools.getIso8601z({date: date, onlyDate: true}))
            this.props.hideDrawer()
          }}
        />
        
        <Divider />
        <Button className="wide-button" type="primary" icon={<DownloadOutlined />} size="large" onClick={this.dlSnapshot}>Export snapshot</Button>
        
      </div>
    )
  }
}

export default SidePanel