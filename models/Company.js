module.exports = (model, Schema) => {

  const Company = new Schema({

    uid: String,
    name: String,
    charts: Array,
    address: String,
    phone: String,
    email: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'Company Change' } })

  return model('Company', Company)
}