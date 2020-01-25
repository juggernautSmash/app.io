const { Company, User, Board } = require('../models')

module.exports = app => {
    // get all the companies
    app.get('/companies', (req, res) => {
        Company.find()
            .populate('users')
            .populate('board')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
    // get one company
    app.get('/companies/:id', (req, res) => {
        Company.findOne({ _id: req.params.id })
            .populate('users')
            .populate('board')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
    // add a company
    app.post('/companies', (req, res) => {
        Company.create(req.body)
            .then(({ _id }) => {
                User.updateOne({ _id: req.body.user }, { $push: { company: _id } })
                Board.updateOne({ _id: req.body.board }, {
                    $push: { company: _id }
                })
                    .then(company => res.json(company))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    })

    // update one company
    app.put('/companies/:id', (req, res) => {
        Company.updateOne({ _id: req.params.id }, { $set: req.body })
        User.updateOne({ _id: req.body.user }, { $push: { company: req.params.id } })
        Board.updateOne({ _id: req.body.board }, { $push: { company: req.params.id } })
            .then(company => res.json(company))
            .catch(e => console.log(e))

    })

    // remove a company
    app.delete('/companies/:id', (req, res) => {
        Company.deleteOne({ _id: req.params.id })
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
}