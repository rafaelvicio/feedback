import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '@schema/User'
import AuthService from '@services/AuthService'

export default {
  async register(request: Request, response: Response) {
    try {
      const { email, name, password } = request.body

      const hasUser = await User.findOne({ email })

      if (hasUser) {
        throw new Error('User already exist')
      }

      const user = await User.create({
        email,
        name,
        password
      })

      return response.json(user)
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async authenticate(request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        throw new Error('User does not exist')
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Password does not match')
      }

      const token = await AuthService.createToken(user)

      return response.json({
        user,
        token
      })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async me(request: Request, response: Response) {
    try {
      const { id } = request.user

      const user = await User.findById(id)

      return response.json({ user })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  }
}
