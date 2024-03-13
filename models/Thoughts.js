const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlenght: 1,
      maxlenght: 280,
    },

    createAt: {
      type: Date,
      default: Date.now,

    },
    username:{
      type: String,
      required: true,
    },
    reactions: [reactionsSchema]
  },
    
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// Create a virtual getter to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); 
})

const Thoughts = model('thoughts', thoughtSchemaSchema);

module.exports = Thoughts;
