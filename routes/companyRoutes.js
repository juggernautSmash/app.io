const { Company } = require('../models')

module.exports = app => {
    app.get('/companies', (req, res) => {
        Company.find()
            .populate('users')
            .then(company => res.json(company))
            .catch(e => console.log(e))
    })


    app.post('/companies', (req, res) => {
        Company.create(req.body)
            .then(company => { res.json(company) })
            .catch(e => console.log(e))
    })

    app.put('companies/:id', (req, res) => {
        Company.findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(company => { res.json(company) })
            .catch(e => console.log(e))

    })

    app.delete('companies/:id', (req, res) => {
        Company.findByIdAndRemove(req.params.id)
            .then(company => { res.json(company) })
            .catch(e => console.log(e))

    })

}