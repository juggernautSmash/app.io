module.exports = app => {
  require('./boardRoutes.js')(app)
  require('./companyRoutes.js')(app)
  require('./tableRoutes.js')(app),
  require('./userRoutes.js')(app)
}