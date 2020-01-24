module.exports = (model, Schema) => {

  const Company = new Schema({

    name: String,
    charts: String,
    address: String,
    contact: String,
    members: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'Company Change' } })

  return model('Company', Company)
}