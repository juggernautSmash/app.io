module.exports = (model, Schema) => {

  const Company = new Schema({

    name: String,
    charts: Array,
    address: String,
    contact: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'Company Change' } })

  return model('Company', Company)
}