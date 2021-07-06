import jwt from 'jsonwebtoken'

import { User } from '@models/User'

interface IPayload {
  id: string
  email: string
  role: string
}

export default {
  async createToken(user: User) {
    const { id, email, role } = user
    return jwt.sign({ id, email, role }, process.env.AUTH_SECRET, {
      expiresIn: '30d'
    })
  },
  async verifyoken(token: string) {
    return jwt.verify(token, process.env.AUTH_SECRET) as IPayload
  }
}
