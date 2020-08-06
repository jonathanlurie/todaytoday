import Yetanotherstore from 'yetanotherstore'
import Tools from './Tools'

const Store = new Yetanotherstore()

Store.set('selectedDate', Tools.getIso8601z({onlyDate: true}))

export default Store