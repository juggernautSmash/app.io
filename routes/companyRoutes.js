const { Company, User, Board } = require('../models')

module.exports = app => {
    // add a company
    app.post('/api/company', (req, res) => {
        Company.create(req.body)
        .then( company => res.json(company) )
        .catch( e => console.error(e) )
    })

    // get one company for company login
    app.get('/api/company/:id', (req, res) => {
        Company.findOne({ uid: req.params.id })
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })

    // get all the companies
    app.get('/api/companies', (req, res) => {
        Company.find()
            .populate('users')
            .populate('board')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })

    // get one company from the DB
    app.get('/api/companies/:name', (req, res) => {
        Company.findOne({ name: req.params.name })
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })

    app.get('/api/companies/:id', (req, res) => {
        Company.findOne({ _id: req.params.id })
            .populate('users')
            .populate('board')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
    // add a company
    app.post('/api/companies', (req, res) => {
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
    app.put('/api/companies/:id', (req, res) => {
        Company.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(company => res.json(company))
            .catch(e => console.log(e))

    })

    // remove a company
    app.delete('/api/companies/:id', (req, res) => {
        Company.deleteOne({ _id: req.params.id })
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
}