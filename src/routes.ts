import { Router } from 'express'

import EnsureAuthenticated from '@middlewares/EnsureAuthenticated'
import EnsureAdmin from '@middlewares/EnsureAdmin'

import AuthController from '@controllers/AuthController'
import FeedbackController from '@controllers/FeedbackController'

const router = Router()

router.post('/auth/authenticate', AuthController.authenticate)
router.post('/auth/register', AuthController.register)
router.get('/auth', EnsureAuthenticated, AuthController.me)

router.post('/feedbacks', EnsureAuthenticated, FeedbackController.create)
router.get('/feedbacks', FeedbackController.all)
router.get('/feedbacks/:id', FeedbackController.get)
router.put(
  '/feedbacks/:id',
  EnsureAuthenticated,
  EnsureAdmin,
  FeedbackController.update
)
router.delete(
  '/feedbacks/:id',
  EnsureAuthenticated,
  EnsureAdmin,
  FeedbackController.delete
)
router.post('/feedbacks/:id/vote', EnsureAuthenticated, FeedbackController.vote)

export { router }
