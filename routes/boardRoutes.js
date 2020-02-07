const { User, Board, Table, Company } = require('../models')

module.exports = app => {
    // retrieve all boards
    app.get('/api/boards', (req, res) => {
        Board.find()
            .populate('user')
            .populate('table')
            .populate('company')
            .then(board => res.json(board))
            .catch(e => console.log(e))
    })
    // retrieve one board
    app.get('/api/boards/:id', (req, res) => {
        Board.findOne({ _id: req.params.id })
            .populate('user')
            .populate('table')
            .populate('company')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
    // add a board 
    app.post('/api/boards', (req, res) => {
        Board.create(req.body)
            .then(({ _id }) => {
                //updating the User
                User.updateOne({ _id: req.body.user }, { $push: { board: _id } })
                    .then( r => console.log('boards post route updating user', r))
                    .catch( e => console.log('boards post route failed updating user', e))
                Company.updateOne({ _id: req.body.user }, { $push: { board: _id } })
                Table.updateOne({ _id: req.body.table }, {
                    $push: { board: _id }
                })
                    .then(board => res.json(board))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })
    // update one board
    app.put('/api/boards/:id', (req, res) => {
      console.log("boards put route hit")
      console.log(req);
      
        Board.updateOne({ _id: req.params.id }, { $set: req.body })
        .then( r => console.log(r))
        .catch(e => console.log(e))

        // User.updateOne({ _id: req.body.user }, { $push: { board: req.params.id } })
        // Company.updateOne({ _id: req.body.company }, { $push: { board: req.params.id } })
        //     .then(board => res.json(board))
        //     .catch(e => console.log(e))

    })
    // remove one board
    app.delete('/boards/:id', (req, res) => {
        Board.deleteOne({ _id: req.params.id })
            .then(board => res.json(board))
            .catch(e => console.log(e))

    })

}