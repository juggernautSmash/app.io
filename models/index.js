const { model, Schema } = require('mongoose')

module.exports = {
  Board: require('./Board.js')(model, Schema),
  Company: require('./Company.js')(model, Schema),
  Table: require('./Table.js')(model, Schema),
  User: require('./User.js')(model, Schema),
  Task: require('./Task.js')(model, Schema)
}