import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/bookings', async (req, res) => {
  let sort = req.query.sort || 'booking_start_date'
  let order = req.query.order || 'DESC'
  let userRangeStart = req.query.user || 0
  let userRangeEnd = req.query.user || 10000000000
  try {
    const { rows } = await db.query(
      `SELECT * FROM bookings WHERE user_id BETWEEN ${userRangeStart} AND ${userRangeEnd} ORDER BY ${sort} ${order}`
    )
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/bookings/:bookingID', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${req.params.bookingID}`
    )
    const returnObject =
      rows.length > 0
        ? rows[0]
        : { error: `no booking found with id: ${req.params.bookingID}` }
    res.json(returnObject)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
