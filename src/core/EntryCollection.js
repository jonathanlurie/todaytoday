import Entry from './Entry'
import { ImmortalDB } from 'immortal-db'

const TODAY_DATE_ID_LIST = 'today_dateIdList'

class EntryCollection {
  constructor() {
    this._collection = {}
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
    let updateIndexImmortal = false
    // if the dateId was not in the collection, then we need to update the list of ids in immortalDB
    if (!(dateId in this._collection)) {
      updateIndexImmortal = true
    }

    this._collection[dateId] = new Entry(dateId, text)

    // updating ImmortalDB
    ImmortalDB.set(dateId, text)

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


  hasEntry(detaId) {
    return detaId in this._collection
  }


  deleteEntry(dateId) {
    if (dateId in this._collection) {
      delete this._collection[dateId]
      ImmortalDB.remove(dateId)
    }
    this.updateImmortalIndex()
  }
}

const MyEntryCollection = new EntryCollection()

export default MyEntryCollection