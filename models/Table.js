module.exports = (model, Schema) => {

  const Table = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    description: String,
    Owner: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    Company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    Users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('Table', Table)
}