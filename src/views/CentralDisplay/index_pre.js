import React from 'react'
import Store from '../../core/Store'
import { Input, Button, Tooltip } from 'antd'
import MyEntryCollection from '../../core/EntryCollection'
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import './style.css'
// hljs.registerLanguage('javascript', javascript);


const { TextArea } = Input;

class CentralDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: Store.get('selectedDate'),
      editionMode: false,
    }
  }


  highlight = () => {
    // if (this.refs.writeComponent) {
    //   hljs.initHighlightingOnLoad()
    //   hljs.highlightBlock(this.refs.writeComponent)
    // }
  }


  componentDidMount() {
    this.highlight()
    Store.on('set:selectedDate', (evt) => {
      this.setState({selectedDate: evt.value})
    })
  }


  componentDidUpdate() {
    this.highlight()
    if(this.state.editionMode) {
      this.refs.writeComponent.focus() 
    }
    
    
  }
  

  onTextUpdate = (evt) => {

  }

  
  textSave = () => {
    MyEntryCollection.setEntry(this.state.selectedDate, this.refs.writeComponent.innerText)
    this.setState({editionMode: false})
  }


  goEdit = () => {
    this.setState({editionMode: true})
  }

  
  render() {
    let dateId = this.state.selectedDate
    let entry = MyEntryCollection.getEntry(dateId)
    let text = entry ? entry.text : ''
    let textHtml = entry ? entry.html : ''
    

    let displayDiv = null

    if (this.state.editionMode) {
      displayDiv = (
        <SyntaxHighlighter language="javascript" style={docco}>
          <pre
            contentEditable={true}
            onInput={this.onTextUpdate}
            onBlur={this.textSave}
            onFocus={console.log}
            suppressContentEditableWarning={true}
            onChange={this.onTextUpdate}
            ref="writeComponent"
          >
            {text}
          </pre>
        </SyntaxHighlighter>
      )
    } else {
      displayDiv = (
        <Tooltip title="Click to edit" color="blue">
          <div
            dangerouslySetInnerHTML={{__html: textHtml}}
            onClick={this.goEdit}
          />
        </Tooltip>
      )
    }





    return (
      <div
        className="side-panel"
      >
        {(new Date(dateId)).toDateString()}
       
        {displayDiv}
        <Button type="primary"  onClick={this.goEdit}>Edit</Button>
        <Button type="primary"  onClick={this.textSave}>Save</Button>
      </div>
    )
  }
}

export default CentralDisplay