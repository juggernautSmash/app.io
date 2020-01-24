module.exports = (model, Schema) => {

  const Board = new Schema({
    title: String,
    description: String,
    table: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }

  }, { timestamps: { createdAt: 'birthday', updatedAt: 'User Change' }})

  return model('Board', Board)
}