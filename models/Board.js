module.exports = (model, Schema) => {

  const Board = new Schema({
    title: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    table: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
    company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: { createdAt: 'birthday', updatedAt: 'lastUpdated' }})
  return model('Board', Board)
}