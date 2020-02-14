const { User, Board, Table, Company } = require('../models')

module.exports = app => {
    // retrieve all boards
    app.get('/api/boards', (req, res) => {
        Board.find()
            .populate('employees')
            .populate('table')
            .then(board => res.json(board))
            .catch(e => console.log(e))
    })

    // retrieve one board
    app.get('/api/boards/:id', (req, res) => {
        Board.findOne({ _id: req.params.id })
            .populate('table')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
    
    // add a board 
    app.post('/api/boards', (req, res) => {
        console.log('adding board to database', req.body)
        Board.create(req.body)
            .then(response => {
                console.log('board created', response)
                //updating the User
                User.updateOne({ _id: req.body.owner }, { $push: { boards: response._id } })
                .then( r => console.log('boards post route updating user', r))
                .catch( e => console.log('boards post route failed updating user', e))
                res.json(response)
            })
            .catch(e => console.log(e)) // catch for Board.create

    })

    // update one board
    app.put('/api/boards/:id', (req, res) => {
      console.log("boards put route hit")
        Board.updateOne({ _id: req.params.id }, { $set: req.body })
        .then( r => console.log(res.json(r)))
        .catch(e => console.log(e))
    })

    // remove one board
    app.delete('/boards/:id', (req, res) => {
        Board.deleteOne({ _id: req.params.id })
            .then(board => res.json(board))
            .catch(e => console.log(e))
    })

}