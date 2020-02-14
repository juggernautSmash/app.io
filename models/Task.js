module.exports = (model, Schema) => {
  const Task = new Schema({
    task: String,
    description: String,
    dueDate: Date,
    priority: String,
    status: String,
    timeline: String,
    date: Date,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    table: { type: Schema.Types.ObjectId, ref: 'Table' },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' } })

  return model('Task', Task)
}