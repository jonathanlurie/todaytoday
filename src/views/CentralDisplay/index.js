import React from 'react'
import Store from '../../core/Store'
import {Button, Row, Col, Divider, notification, Tooltip } from 'antd'
import MyEntryCollection from '../../core/EntryCollection'
import { /*monaco,*/ ControlledEditor } from '@monaco-editor/react'
import { QuestionCircleOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import './style.css'
import Tools from '../../core/Tools'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

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
    this._htmlDivRef = React.createRef()
    this._editText = ''
  }




  highlight = () => {
    if (!this.state.editionMode && this._htmlDivRef.current) {
      // console.log('this._htmlDivRef', this._htmlDivRef)
      
        const nodes = this._htmlDivRef.current.querySelectorAll('pre')
        nodes.forEach((node) => {
          console.log('node', node)
          
          hljs.highlightBlock(node)
        })
    }
  }


  componentDidMount() {
    // pressing Escape while in edition mode will saves and quit
    document.addEventListener('keyup', (evt) => {
      if(this.state.editionMode && evt.key === 'Escape') {
       this.textSave()
      }

      if(!this.state.editionMode && evt.key === 'Enter') {
        this.goEdit()
      }

      if(evt.key === 'ArrowLeft') {
        this.previousDay(evt)
      }

      if(evt.key === 'ArrowRight') {
        this.nextDay(evt)
      }

      console.log(evt)
      
      
    })

    Store.on('set:selectedDate', (evt) => {
      this.setState({selectedDate: evt.value})
    })
    this.highlight()
  }


  componentDidUpdate() {
    if(this.state.editionMode) {
      // this.refs.writeComponent.focus() 
    }
    this.highlight()
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

    notification.info({
      message: `Tips`,
      description: 'Press Escape key to save!',
      placement: 'bottomRight',
    });
  }

  previousDay = (evt) => {
    evt.preventDefault()
    Store.set('selectedDate', Tools.getDayRelativeTo(this.state.selectedDate, -1))
  }


  nextDay = (evt) => {
    evt.preventDefault()
    Store.set('selectedDate', Tools.getDayRelativeTo(this.state.selectedDate, +1))
  }


  
  render() {
    let dateId = this.state.selectedDate
    let entry = MyEntryCollection.getEntry(dateId)
    this._editText = entry ? entry.text : ''
    // let textHtml = hljs.highlightAuto(entry ? entry.html : '').value
    let textHtml = entry ? entry.html : ''
    
    let dateString = (new Date(dateId)).toDateString()

    let dateTitleComp = null

    if (Tools.isItToday(dateId)) {
      dateTitleComp = (
        <div
          className="date-title"
        >
          <div style={{fontSize: '2em'}}>
            Today
          </div>
          <div style={{
            marginLeft: 5,
            color: '#aaa'
          }}>
            {dateString}
          </div>
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
          <div style={{fontSize: '2em'}}>
            {dateString}
          </div>
          <div style={{
            marginLeft: 5,
            color: '#aaa'
          }}>
            {dateDiffStr}
          </div>
        </div>
      )
    }

    let header = (
      <Row align="middle">
        <Col span={6} style={{textAlign: 'right'}}>
          <Tooltip placement="left" title="Keyboard left key ⚡">
            <CaretLeftOutlined className="arrow-day" onClick={this.previousDay}/>
          </Tooltip>
        </Col>
        <Col span={12}>
          {dateTitleComp}
        </Col>
        <Col span={6} style={{textAlign: 'left'}}>
          <Tooltip placement="right" title="Keyboard right key ⚡">
            <CaretRightOutlined className="arrow-day" onClick={this.nextDay}/>
          </Tooltip>
        </Col>
      </Row>
    )


    let displayDiv = null

    let buttonToShow = null

    if (this.state.editionMode) {
      console.log('EDIT MODE')

      buttonToShow = (
        <Row justify="center">
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
                },
                scrollbar: {
                  useShadows: false
                },
                renderLineHighlight: 'none',
                lineNumbersMinChars: 3,
                autoClosingQuotes: "always"
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
          <Button type="primary"  onClick={this.goEdit}>Edit</Button>
        </Row>
      )

      displayDiv = (
        <div>
          <Divider />
          <Tooltip placement="left" title="Double click to edit ⚡" destroyTooltipOnHide={true}>
            <div
              ref={this._htmlDivRef}
              dangerouslySetInnerHTML={{__html: textHtml}}
              onDoubleClick={this.goEdit}
            />
          </Tooltip>
          <Divider />
        </div>
      )
    }


    if (entry === null && !this.state.editionMode) {
      buttonToShow = null
      displayDiv = (
        <div
          style={{
            height: '50vh',
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
        {header}
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