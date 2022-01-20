const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: `Please enter your username: `,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: `Please enter a valid email: `,
      match: [/.+\@.+\..+/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
    },
    // not creat same _id as `id`
    id: false
  }
);

// get the length of a user's friends array
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;