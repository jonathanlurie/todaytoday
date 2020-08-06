import React from 'react'
import Store from '../../core/Store'
import { Input, Button, Tooltip } from 'antd'
import MyEntryCollection from '../../core/EntryCollection'
import { /*monaco,*/ ControlledEditor } from '@monaco-editor/react'
import './style.css'

// monaco
//   .init()
//   .then(monaco => {/* here is the instance of monaco, so you can use the `monaco.languages` or whatever you want */})
//   .catch(error => console.error('An error occurred during initialization of Monaco: ', error))

class CentralDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: Store.get('selectedDate'),
      editionMode: false,
      isEditorReady: false,
    }

    this._editText = ''
  }


  componentDidMount() {
    Store.on('set:selectedDate', (evt) => {
      this.setState({selectedDate: evt.value})
    })
  }


  componentDidUpdate() {
    if(this.state.editionMode) {
      // this.refs.writeComponent.focus() 
    }
  }
  

  onTextUpdate = (ev, value) => {
    this._editText = value
  }

  
  textSave = () => {
    MyEntryCollection.setEntry(this.state.selectedDate, this._editText)
    this.setState({editionMode: false})
  }


  goEdit = () => {
    this.setState({editionMode: true})
  }

  
  render() {
    let dateId = this.state.selectedDate
    let entry = MyEntryCollection.getEntry(dateId)
    this._editText = entry ? entry.text : ''
    let textHtml = entry ? entry.html : ''
    

    let displayDiv = null

    if (this.state.editionMode) {
      console.log('EDIT MODE')
      
      displayDiv = (
            <ControlledEditor
              height="90vh"
              language="markdown"
              theme="light"
              options={{  // all options here: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
                fontSize: 16,
              }}
              value={this._editText}
              editorDidMount={this.handleEditorDidMount}
              onChange={this.onTextUpdate}
            />
      )
    } else {
      console.log('READ MODE')
      displayDiv = (
          <div
            dangerouslySetInnerHTML={{__html: textHtml}}
          />

      )
    }


    return (
      <div
        className="central-display"
      >
        {(new Date(dateId)).toDateString()}
        
        {displayDiv}
        <Button type="primary"  onClick={this.goEdit}>Edit</Button>
        <Button type="primary"  onClick={this.textSave}>Save</Button>
      </div>
    )
 
  }

  handleEditorDidMount = (_, editor) => {
    this.editor = editor;
    this.setState({
      isEditorReady: true
    })
  }
}

export default CentralDisplay