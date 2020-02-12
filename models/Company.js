module.exports = (model, Schema) => {

  const Company = new Schema({

    uid: String, 
    companyName: String,
    charts: Array,
    address: String,
    phone: String,
    email: String,
    photoUrl: String,
    employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('Company', Company)
}