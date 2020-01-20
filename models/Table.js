module.exports = (model, Schema) => {

  const Table = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    Owner: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    name: String,
    email: String,
    phone: String,
    location: String,
    timeZone: String,
    Company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    Users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('Table', Table)
}