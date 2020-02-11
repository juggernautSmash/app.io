module.exports = (model, Schema) => {
  const Table = new Schema({
    title: {
      type: String,
      uppercase: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    task: Array,
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' } ,
    dueDate: String,
    priority: String,
    status: String,
    text: String,
    timeline: String,
    date: Date,
    numbers: Number,
    board: { type: Schema.Types.ObjectId, ref: 'Board' }
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('Table', Table)
}