const { User, Board, Table } = require('../models')

module.exports = app => {
    // retrieve all tables
    app.get('/tables', (req, res) => {
        Table.find()
            .populate('user')
            .populate('board')
            .then(table => res.json(table))
            .catch(e => console.log(e))
    })

    // retrieve one table
    app.get('/tables/:id', (req, res) => {
        Tables.findOne({ _id: req.params.id })
            .populate('user')
            .populate('board')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })

    // add a table
    app.post('/tables', (req, res) => {
        Table.create(req.body)
            .then(({ _id }) => {
                User.updateOne({ _id: req.body.user }, { $push: { table: _id } })
                Board.updateOne({ _id: req.body.board }, {
                    $push: { table: _id }
                })
                    .then(board => res.json(board))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })

    // update one table
    app.put('/tables/:id', (req, res) => {
        Table.updateOne({ _id: req.params.id }, { $set: req.body })
        User.updateOne({ _id: req.body.user }, { $push: { table: req.params.id } })
        Board.updateOne({ _id: req.body.board }, { $push: { table: req.params.id } })
            .then(table => res.json(table))
            .catch(e => console.log(e))

    })


    // remove table
    app.delete('/tables/:id', (req, res) => {
        Table.deleteOne({ _id: req.params.id })
            .then(table => { res.json(table) })
            .catch(e => console.log(e))

    })

}