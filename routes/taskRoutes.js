const { Task, Table, Users } = require('../models')

module.exports = app => {

  // create one task
  app.post('/api/task', (req, res) => {
    console.log(' posting new task ')
    Task.create(req.body)
    .then( task => {
      res.json(task)
      Table.updateOne({ _id: req.body.table }, { $push: { tasks: task._id } })
          .then(table => console.log('updated table ', table) )
          .catch(e => console.log('error updating table ', e) )
      Users.updateOne({ _id: req.body.assignedTo }, { $push: {tasks: task._id} })
        .then( user => console.log('update user ', user) )
        .catch( e => console.error('error updating user with task ', e) )
    })
    .catch( e => console.error(e))
  })

  // get one task
  app.get('/api/task/:id', (req, res) => {
    console.log('hit route for getting task')
    Task.findOne({ _id: req.params.id })
      .populate('assignedTo')
      .then(task => res.json(task))
      .catch(e => console.log(e))
  })

  // update one task
  app.put('/api/task/:id', (req, res) => {
    console.log("task put route hit")
      Task.updateOne({ _id: req.params.id }, { $set: req.body })
      .then( r => console.log(res.json(r)))
      .catch(e => console.log(e))
  })

  // delete one task
  app.delete('/api/task/:id', (req, res) => {
    console.log('deleting task route hit')
    Task.deleteOne( { _id: req.params.id } ) // Get the row of the task of the ID.
      .then( response => res.json(response) )
      .catch(e => console.error(e))
  })
}