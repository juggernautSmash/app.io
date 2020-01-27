module.exports = (model, Schema) => {

  const User = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    photo: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: String,
    timeZone: String,
    company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('User', User)
}