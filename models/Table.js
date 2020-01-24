module.exports = (model, Schema) => {

  const Table = new Schema({

    title: {
      type: String,
      uppercase: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    task: Array,
    assigned: String,
    dueDate: String,
    priority: String,
    status: String,
    text: String,
    people: String,
    timeline: String,
    date: Date,
    numbers: Number,
    company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    board: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' } })

  return model('Table', Table)
}