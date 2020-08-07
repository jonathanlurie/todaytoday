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


  exportSnapshot = () => {
    const jsonSnapshot = EntryCollection.exportJsonSnapshot()
    const filename = `todatoday_snapshot_${Tools.getIso8601z({timeSeparator: '-', withTimezone: false})}.json`
    console.log('filename', filename)
    
    Tools.downloadJSON(filename, jsonSnapshot)
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
        
        <Divider />
        <Button className="wide-button" type="primary" icon={<DownloadOutlined />} size="large" onClick={this.exportSnapshot}>Export snapshot</Button>
        
      </div>
    )
  }
}

export default SidePanel