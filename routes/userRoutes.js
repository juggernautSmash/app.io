const { User, Company, Board } = require('../models')

module.exports = app => {
    //add one user
    app.post('/api/user', (req, res) => {
        User.create(req.body)
        .then( user => res.json(user) )
        .catch( e => console.error(e))
    })

    // get one user
    app.get('/api/user/:id', (req, res) => {
        Company.findOne({ uid: req.params.id })
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })


    // retrieve all users
    app.get('/api/users', (req, res) => {
        User.find()
            .populate('board')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
    // retrieve one user
    app.get('/api/users/:id', (req, res) => {
        User.findOne({ uid: req.params.id })
            .populate('board')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
    // add a user also add to company
    app.post('/api/users', (req, res) => {
        User.create(req.body)
            .then(({ _id }) => {
                Board.updateOne({ _id: req.body.board }, { $push: { user: _id } })
                Company.updateOne({ _id: req.body.company }, { $push: { user: _id } })
                    .then(user => res.json(user))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })
        // update one user
        app.put('/api/users/:id', (req, res) => {
            User.updateOne({ _id: req.params.id }, { $set: req.body })
            Board.updateOne({ _id: req.body.board }, { $push: { user: req.params.id } })
            Company.updateOne({ _id: req.body.company }, { $push: { user: req.params.id } })
                .then(user => res.json(user))
                .catch(e => console.log(e))
        })


    // remove user
    app.delete('/api/users/:id', (req, res) => {
        console.log(req.params)
        console.log(req.body)
        Board.updateOne({ _id: req.body.board }, { $pull: { user: req.params.id } })
        Company.updateOne({ _id: req.body.company }, { $pull: { user: req.params.id } })
        User.deleteOne({ _id: req.params.id })
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })
}

