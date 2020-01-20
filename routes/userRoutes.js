const { User, Company } = require('../models')

module.exports = app => {
    app.get('/users', (req, res) => {
        User.find()
            .populate('board')
            .then(user => res.json(user))
            .catch(e => console.log(e))
    })

    app.post('/users', (req, res) => {
        User.create(req.body)
            .then(({ _id }) => {
                Company.updateOne({
                    _id: req.body.board
                }, {
                    $push: {
                        user: _id
                    }
                })
                    .then(user => { res.json(user) })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })

    app.put('users/:id', (req, res) => {
        User.findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(user => { res.json(user) })
            .catch(e => console.log(e))

    })

    app.delete('users/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(user => { res.json(user) })
            .catch(e => console.log(e))

    })

}