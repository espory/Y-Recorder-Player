'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const RecordSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    recordName: {
      type: String,
      default: '未命名'
    },
    detail: {
      type: String,
      default: '未知'
    },
    email: {
      type: String,
      default: '未知'
    },
    link: {
      type: String,
      default: '未知'
    },
    snapshot: {
      type: {},
      default: {},
      required: true
    },
    fetchRecord: {
      type: {},
      default: {},
      required: true
    },
    storage: {
      type: {},
      default: {},
      required: true
    },
    location: {
      type: {},
      default: {},
      required: true
    },
    files: {
      type: [],
      default: [],
      required: true
    },
    startTime: {
      type: String,
      default: 0,
      required: true
    }
  }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

  return mongoose.model('Record', RecordSchema)
}
