const { User, Board, Table } = require('../models')

module.exports = app => {
    // retrieve all tables
    app.get('/api/tables', (req, res) => {
        Table.find()
            .populate('user')
            .then(table => res.json(table))
            .catch(e => console.log(e))
    })

    // retrieve one table
    app.get('/api/tables/:id', (req, res) => {
        console.log('getting one table route is hit')
        Table.findOne({ _id: req.params.id })
            .populate('tasks')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })

    // add a table
    app.post('/api/tables', (req, res) => {
        console.log('add table route is hit')
        Table.create(req.body) // create a table
            .then( table => {
                console.log('successfully created a table')
                res.json(table)
                Board.updateOne({ _id: req.body.board }, { $push: { table: table._id } })
                    .then(board => res.json(board))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log('Error creating table', e))

    })

    // update one table
    app.put('/api/tables/:id', (req, res) => {
        console.log('update table route is hit')
        Table.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(table => res.json(table))
            .catch(e => console.log(e))

    })

    // remove table
    app.delete('/api/tables/:id', (req, res) => {
        console.log('remove table route is hit')
        Table.deleteOne({ _id: req.params.id })
            .then(table => { res.json(table) })
            .catch(e => console.log(e))

    })

}