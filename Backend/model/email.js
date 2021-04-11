const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let email = new Schema({
  to: {
    type: String
  },
  subject: {
    type: String
  },
  time: {
    type: String
  }
}, {
  collection: 'email'
})

module.exports = mongoose.model('email', email)