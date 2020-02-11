module.exports = (model, Schema) => {

  const User = new Schema({

    uid: String,
    title: {
      type: String,
      uppercase: true,
    },
    photoUrl: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: String,
    timezone: String,
    company: String,
    companyName: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('User', User)
}