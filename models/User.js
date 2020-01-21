module.exports = (model, Schema) => {

  const User = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    name: String,
    email: String,
    phone: String,
    location: String,
    timeZone: String,
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('User', User)
}