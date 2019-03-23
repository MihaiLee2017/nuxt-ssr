import mongoose from 'mongoose'
const Schema = mongoose.Schema
let Menu = new Schema({
  menu: {
    type: Array,
    require: true
  }
})
export default mongoose.model('Menu', Menu)
