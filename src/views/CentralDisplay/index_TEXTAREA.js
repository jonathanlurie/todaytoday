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
      editionMode: false,
    }

    this._entryText = ''
  }

  componentDidMount() {
    Store.on('set:selectedDate', (evt) => {
      this.setState({selectedDate: evt.value})
    })
  }


  

  onTextUpdate = (evt) => {
    this._entryText = evt.target.value
    console.log(this._entryText)
    
  }

  
  textSave = () => {
    MyEntryCollection.setEntry(this.state.selectedDate, this._entryText)
    this.setState({editionMode: false})
  }

  goEdit = () => {
    this.setState({editionMode: true})
  }

  
  render() {
    let dateId = this.state.selectedDate
    let entry = MyEntryCollection.getEntry(dateId)
    this._entryText = entry ? entry.text : ''
    let textHtml = entry ? entry.html : ''
    

    let displayDiv = null

    if (this.state.editionMode) {
      console.log('EDIT MODE');
      
      displayDiv = (
        <TextArea
          // contentEditable={true}
          // onInput={this.onTextUpdate}
          // onBlur={this.onTextUpdate}
          // suppressContentEditableWarning={true}
          onChange={this.onTextUpdate}
          defaultValue={this._entryText}
        >
          
        </TextArea>
      )
    } else {
      console.log('READ MODE');
      displayDiv = (
        <div
          dangerouslySetInnerHTML={{__html: textHtml}}
        >
          
        </div>
      )
    }

    return (
      <div
        className="side-panel"
      >
        {dateId}
       
        {displayDiv}
        <Button type="primary"  onClick={this.goEdit}>Edit</Button>
        <Button type="primary"  onClick={this.textSave}>Save</Button>
      </div>
    )
  }
}

export default CentralDisplay