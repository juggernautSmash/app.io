const { User, Board, Table } = require('../models')

module.exports = app => {
    // retrieve all boards
    app.get('/boards', (req, res) => {
        Board.find()
            .populate('user')
            .populate('table')
            .then(board => res.json(board))
            .catch(e => console.log(e))
    })
    // retrieve one board
    app.get('/boards/:id', (req, res) => {
        Board.findOne({ _id: req.params.id })
            .populate('user')
            .populate('table')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
    // add a board 
    app.post('/boards', (req, res) => {
        Board.create(req.body)
            .then(({ _id }) => {
                User.updateOne({
                    _id: req.body.user
                }, {
                    $push: {
                        board: _id
                    }
                })
                Table.updateOne({
                    _id: req.body.table
                }, {
                    $push: {
                        board: _id
                    }
                })
                    .then(board => { res.json(board) })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })
    // update board
    app.put('/boards/:id', (req, res) => {
        console.log(req.body)
        Board.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(({ _id }) => {
            User.updateOne({ _id: req.body.user }, { $push: { board: _id } })
            Table.updateOne({ _id: req.body.table }, { $push: { board: _id } })
                .then(board => { res.json(board) })
                .catch(e => console.log(e))
        })
            .catch(e => console.log(e))

    })
    // remove board
    app.delete('/boards/:id', (req, res) => {
        Board.deleteOne({ _id: req.params.id })
            .then(board => { res.json(board) })
            .catch(e => console.log(e))

    })

}