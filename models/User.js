const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]

    
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function (){
    return this.friends.length;
  })


const User = model('user', userSchema);

module.exports = User;
