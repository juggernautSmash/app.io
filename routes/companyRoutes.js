const { Company } = require('../models')

module.exports = app => {
    // get all the companies
    app.get('/companies', (req, res) => {
        Company.find()
            .populate('users')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
    // get one company
    app.get('/companies/:id', (req, res) => {
        Company.findOne({ _id: req.params.id })
        .populate('users')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })
    // add a company
    app.post('/companies', (req, res) => {
        Company.create(req.body)
            .then(company => { res.json(company) })
            .catch(e => console.log(e))
    })
    // update a company
    app.put('/companies/:id', (req, res) => {
        Company.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(company => { res.json(company) })
            .catch(e => console.log(e))

    })
    // remove a company
    app.delete('/companies/:id', (req, res) => {
        Company.deleteOne(req.params.id)
            .then(company => { res.json(company) })
            .catch(e => console.log(e))

    })

}