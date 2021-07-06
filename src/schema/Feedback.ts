import mongoose, { Document, Schema } from 'mongoose'

type Feedback = Document & {
  title: string
  description: string
  owner: string
  votes: [string]
  active: boolean
}

const FeedbackSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    active: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<Feedback>('Feedback', FeedbackSchema)
