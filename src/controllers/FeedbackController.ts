import { Request, Response } from 'express'

import Feedback from '@schema/Feedback'

interface ISortFeedback {}

export default {
  async create(request: Request, response: Response) {
    try {
      const { title, description } = request.body

      const { user } = request

      const feedback = await Feedback.create({
        title,
        description,
        owner: user.id
      })

      return response.json({ feedback })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async all(request: Request, response: Response) {
    try {
      const { sort } = request.query

      let sortFilter = {}

      if (sort) {
        sortFilter = {
          votes: sort === '-votes' ? -1 : 1
        }
      }

      const feedbacks = await Feedback.find().sort(sortFilter)

      return response.json({ feedbacks })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async get(request: Request, response: Response) {
    try {
      const { id } = request.params

      const feedback = await Feedback.findById(id)

      return response.json({ feedback })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params

      const feedback = await Feedback.findByIdAndUpdate(
        id,
        { ...request.body },
        { new: true }
      )

      return response.json({ feedback })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const feedback = await Feedback.findByIdAndUpdate(
        id,
        { active: false },
        { new: true }
      )

      return response.json({ feedback })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  },
  async vote(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { user } = request

      const hasFeedback = await Feedback.findById(id)

      if (!hasFeedback) {
        throw new Error('Feedback does not exist')
      }

      const { votes } = hasFeedback
      const contains = votes.some((item: string) => item == user.id)

      let newVotes = []

      if (contains) {
        newVotes = votes.filter((item: string) => item === user.id)
      } else {
        newVotes = [...votes, user.id]
      }

      const feedback = await Feedback.findByIdAndUpdate(
        id,
        {
          votes: newVotes
        },
        { new: true }
      )

      return response.json({ feedback })
    } catch (error) {
      return response.status(500).send({ error: error.message })
    }
  }
}
