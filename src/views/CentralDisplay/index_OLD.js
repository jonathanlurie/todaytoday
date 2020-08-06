import React from 'react'
import Store from '../../core/Store'
import { Input, Button } from 'antd'
import MyEntryCollection from '../../core/EntryCollection'
import './style.css'
const { TextArea } = Input;

class CentralDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: Store.get('selectedDate'),
      text: ''
    }

    this._entryText = ''
  }

  componentDidMount() {
    Store.on('set:selectedDate', (evt) => {
      this.setState({selectedDate: evt.value})
    })
  }


  

  onTextUpdate = (evt) => {
    console.log('UPDATE')
    
    // this.setState({text: evt.target.value})
    // console.log(evt.target.value)
    
    // MyEntryCollection.setEntry(this.state.selectedDate, evt.target.value)
    this._entryText = evt.target.value
    this.forceUpdate()
  }

  
  textSave = () => {
    MyEntryCollection.setEntry(this.state.selectedDate, this._entryText)
  }

  


  render() {
    let dateId = this.state.selectedDate
    let entry = MyEntryCollection.getEntry(dateId)

    console.log('entry', entry)

    this._entryText = entry ? entry.text : ''
    
    console.log('this._entryText', this._entryText)
    

    // if (entry) {
    //   this.setState({text: entry.text})
    // }

    
    return (
      <div
        className="side-panel"
      >
        {dateId}
       
        <TextArea placeholder="textarea with clear icon" value={this._entryText} allowClear onChange={this.onTextUpdate} />
        <Button type="primary"  onClick={this.textSave}>Save</Button>
      </div>
    )
  }
}

export default CentralDisplay