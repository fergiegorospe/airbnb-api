import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/reviews', async (req, res) => {
  try {
    if (req.query.house) {
      const houseCheck = await db.query(
        `SELECT 1 FROM houses WHERE house_id = ${req.query.house}`
      )
      if (houseCheck.rows.length === 0) {
        throw new Error('House does not exist.')
      }
    }
    let house = ''
    if (req.query.house) {
      house = `WHERE house_id = ${req.query.house}`
    }
    const { rows } = await db.query(
      `SELECT * FROM reviews ${house} ORDER BY review_date DESC`
    )
    if (rows.length === 0) {
      throw new Error('Reviews for this house do not exist.')
    }
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
})

router.get('/reviews/:reviewID', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM reviews WHERE review_id = ${req.params.reviewID}`
    )
    const returnObject =
      rows.length > 0 ? rows[0] : { error: 'review not found' }
    res.json(returnObject)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
