module.exports = (model, Schema) => {
  const Table = new Schema({
    tableIndex: Number,
    title: {
      type: String,
      uppercase: true,
    },
    description: String,
    dueDate: Date,
    priority: String,
    status: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('Table', Table)
}