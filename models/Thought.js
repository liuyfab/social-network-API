const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Reactions exist as a subdocuments of Thought
const ReactionSchema = new Schema(
  {
      reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      trim:true,
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
      trim:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: `Please share your thoughts.`,
      minlength: 1,
      maxLength: 280,
      trim: true
    },
    username: {
      type: String,
      required: `please enter your username`,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

  reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
   
    id: false
  }
);

// get the number of reactions 
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;