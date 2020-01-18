module.exports = require('mongoose')
  .connect(process.env.MONGODB_URI || process.env.LOCALDB_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch( e => console.error(e))