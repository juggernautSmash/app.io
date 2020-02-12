module.exports = (model, Schema) => {
  const Table = new Schema({
    title: {
      type: String,
      uppercase: true,
    },
    dueDate: Date,
    priority: String,
    status: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('Table', Table)
}