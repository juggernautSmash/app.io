const { User, Board, Table } = require('../models')

module.exports = app => {
    // retrieve all tables
    app.get('/api/tables', (req, res) => {
        Table.find()
            .populate('user')
            .populate('board')
            .then(table => res.json(table))
            .catch(e => console.log(e))
    })

    // retrieve one table
    app.get('/api/tables/:id', (req, res) => {
        Table.findOne({ _id: req.params.id })
            .populate('task')
            .populate('board')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })

    // add a table
    app.post('/api/tables', (req, res) => {
        Table.create(req.body) // create a table
            .then(({ _id }) => {
                console.log('successfully created a table')
                Board.updateOne({ _id: req.body.board }, { $push: { table: _id } })
                    .then(board => res.json(board))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log('Error creating table', e))

    })

    // update one table
    app.put('/api/tables/:id', (req, res) => {
        Table.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(table => res.json(table))
            .catch(e => console.log(e))

    })

    // remove table
    app.delete('/api/tables/:id', (req, res) => {
        Table.deleteOne({ _id: req.params.id })
            .then(table => { res.json(table) })
            .catch(e => console.log(e))

    })

}