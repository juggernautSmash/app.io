module.exports = (model, Schema) => {

  const Company = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    name: String,
    email: String,
    phone: String,
    photo: String,
    location: String,
    timeZone: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'Company Change' } })

  return model('Company', Company)
}