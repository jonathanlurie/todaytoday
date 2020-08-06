import React from 'react'
import Store from '../../core/Store'
import {Button, Row, Divider } from 'antd'
import MyEntryCollection from '../../core/EntryCollection'
import { /*monaco,*/ ControlledEditor } from '@monaco-editor/react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import './style.css'
import Tools from '../../core/Tools'

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
    
    let dateString = (new Date(dateId)).toDateString()

    let dateTitleComp = null

    if (Tools.isItToday(dateId)) {
      dateTitleComp = (
        <div
          className="date-title"
        >
          <span style={{fontSize: '2em'}}>
            Today
          </span>
          <span style={{
            marginLeft: 5,
            color: '#aaa'
          }}>
            {dateString}
          </span>
        </div>
      )
    } else {
      const dayDiff = Tools.dayDeltaFromToday(dateId)
      const absDiff = Math.abs(dayDiff)
      const dateDiffStr = dayDiff < 0 ? `${absDiff} days ago` : `in ${absDiff} day${absDiff > 1 ? 's' : ''} from now`
      dateTitleComp = (
        <div
          className="date-title"
        >
          <span style={{fontSize: '2em'}}>
            {dateString}
          </span>
          <span style={{
            marginLeft: 5,
            color: '#aaa'
          }}>
            {dateDiffStr}
          </span>
        </div>
      )
    }


    let displayDiv = null

    let buttonToShow = null

    if (this.state.editionMode) {
      console.log('EDIT MODE')

      buttonToShow = (
        <Row justify="center">
          <Divider />
          <Button type="primary"  onClick={this.textSave}>Save</Button>
        </Row>
      )
      
      displayDiv = (
          <div className="editor-container">
            <ControlledEditor
              className="monaco-editor"
              // height="fit-content"
              language="markdown"
              theme="light"
              options={{  // all options here: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
                fontSize: 16,
                wordWrap: 'on',
                minimap: {
                  enabled: false
                }
              }}
              value={this._editText}
              editorDidMount={this.handleEditorDidMount}
              onChange={this.onTextUpdate}
            />
          </div>
      )
    } else {
      console.log('READ MODE')
      buttonToShow = (
        <Row justify="center">
          <Divider />
          <Button type="primary"  onClick={this.goEdit}>Edit</Button>
        </Row>
      )

      displayDiv = (
          <div
            dangerouslySetInnerHTML={{__html: textHtml}}
          />

      )
    }


    if (entry === null && !this.state.editionMode) {
      buttonToShow = null
      displayDiv = (
        <div
          style={{
            height: '65vh',
            position: 'relative'
          }}
        >

            <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: 'auto',
              width: 'fit-content',
              height: 'fit-content',
              textAlign: 'center',
              border: 'dashed 1px #8ac7ff',
              padding: 20
            }}
            >
              <div 
                style={{
                  
                }}
              >
                <div>
                  <QuestionCircleOutlined style={{fontSize: 50, color: '#8ac7ff'}}/>
                </div>
                <div style={{margin: 20}}>
                  Nothing yet, let's write something!
                </div>
                <div>
                  <Button type="primary"  onClick={this.goEdit}>Write</Button>
                </div>
              </div>
            </div>

          

        </div>
      )
      
    }

    return (
      <div
        className="central-display"
      >

        {dateTitleComp}
        
        {displayDiv}
       
        
        {buttonToShow}
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