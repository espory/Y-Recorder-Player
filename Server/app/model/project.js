'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ProjectSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    detail: {
      type: String,
      default: '未做过多介绍',
      required: true
    }
  }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

  return mongoose.model('Project', ProjectSchema)
}
