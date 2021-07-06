import { Request, Response, NextFunction } from 'express'

export default function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { role } = request.user

  if (role === 'admin') {
    return next()
  }

  return response.status(401).json({
    error: 'Unauthorized'
  })
}
