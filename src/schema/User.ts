import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

type User = Document & {
  email: string
  password: string
  name: string
  role: string
  createAt: Date
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre<User>('save', async function (next: NextFunction) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }
  next()
})

export default mongoose.model<User>('User', UserSchema)
