const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');


const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      minlenght: 1,
      maxlenght: 280,
    },

    createdAt: {
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

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
