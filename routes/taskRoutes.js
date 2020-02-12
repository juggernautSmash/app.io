const { Task, Table } = require('../models')

module.exports = app => {

  // create one task
  app.post('/api/task', (req, res) => {
    Task.create(req.body)
    .then( task => {
      res.json(task)
      Table.updateOne({ _id: req.body.table }, { $push: { task: task._id } })
          .then(user => res.json(user))
          .catch(e => console.log(e))
    })
    .catch( e => console.error(e))
  })

  // get one task
  app.get('/api/task/:id', (req, res) => {
    console.log('hit route for getting user by uid')
    Task.findOne({ _id: req.params.id })
        .then(task => res.json(task))
        .catch(e => console.log(e))
  })
}