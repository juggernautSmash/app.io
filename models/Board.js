module.exports = (model, Schema) => {

  const Board = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    name: String,
    email: String,
    phone: String,
    location: String,
    timeZone: String,
    Table: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
    Users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('Board', Board)
}