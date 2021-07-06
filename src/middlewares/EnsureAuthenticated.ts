import { Request, Response, NextFunction } from 'express'

import AuthService from '@services/AuthService'

export default async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    const user = await AuthService.verifyoken(token)

    request.user = user

    return next()
  } catch (err) {
    return response.status(401).end()
  }
}
