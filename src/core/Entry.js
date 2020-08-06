import Marked from 'marked'
import DOMPurify from 'dompurify'

class Entry {
  constructor(dateId, text) {
    this._dateId = dateId
    this._text = text.trim()
  }

  get dateId() {
    return this._dateId
  }

  get text() {
    return this._text
  }

  set text(t) {
    this._text = t
  }

  get html() {
    return DOMPurify.sanitize(Marked(this._text))
  }
}

export default Entry