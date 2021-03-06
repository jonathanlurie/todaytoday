import Entry from './Entry'
import Tools from './Tools'
import { ImmortalDB } from 'immortal-db'

const TODAY_DATE_ID_LIST = 'today_dateIdList'

class EntryCollection {
  constructor() {
    this._collection = {}
  }


  exportJsonSnapshot() {
    const simplified = {}
    Object.keys(this._collection).forEach((dateId) => {
      simplified[dateId] = this._collection[dateId].text
    })
    return JSON.stringify(simplified)
  }


  downloadSnapshot() {
    const jsonSnapshot = this.exportJsonSnapshot()
    const filename = `todatoday_snapshot_${Tools.getIso8601z({timeSeparator: '-', withTimezone: false})}.json`
    Tools.downloadJSON(filename, jsonSnapshot)
  }

  /**
   * Fetch data from ImmortalDB
   */
  async load() {
    let dateListIds = await ImmortalDB.get(TODAY_DATE_ID_LIST, null)

    if (dateListIds === null) {
      return
    }

    // the list in ImmortalDB is a JSON string
    dateListIds = JSON.parse(dateListIds)

    for (let i = 0; i < dateListIds.length; i += 1) {
      let dateId = dateListIds[i]
      let text = await ImmortalDB.get(dateListIds[i])
      this.setEntry(dateId, text)
    }
  }


  async updateImmortalIndex() {
    await ImmortalDB.set(TODAY_DATE_ID_LIST, JSON.stringify(Object.keys(this._collection)))
  }


  setEntry(dateId, text) {
    const trimmedText = text.trim()

    // we dont keep blank
    if (trimmedText.length === 0) {
      this.deleteEntry(dateId)
      return
    }

    let updateIndexImmortal = false
    // if the dateId was not in the collection, then we need to update the list of ids in immortalDB
    if (!(dateId in this._collection)) {
      updateIndexImmortal = true
    }

    this._collection[dateId] = new Entry(dateId, trimmedText)

    // updating ImmortalDB
    ImmortalDB.set(dateId, trimmedText)

    if (updateIndexImmortal) {
      this.updateImmortalIndex()
    }
  }


  getEntry(dateId) {
    if (dateId in this._collection) {
      return this._collection[dateId]
    } else {
      return null
    }
  }


  hasEntry(dateId) {
    return dateId in this._collection
  }


  hasDate(date) {
    const dateId = Tools.getIso8601z({
      date,
      onlyDate: true,
    })
    return this.hasEntry(dateId)
  }


  deleteEntry(dateId) {
    if (dateId in this._collection) {
      delete this._collection[dateId]
      ImmortalDB.remove(dateId)
      .then((a) => console.log(a))
      .catch((err) => console.log('err', err))
    }
    this.updateImmortalIndex()
  }
}

const MyEntryCollection = new EntryCollection()

export default MyEntryCollection