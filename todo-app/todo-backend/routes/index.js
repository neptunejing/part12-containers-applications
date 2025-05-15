const express = require('express');
const router = express.Router();
const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

// Counter
router.get('/statistics', async (req, res) => {
  const count = await redis.getAsync('added_todos')
  res.json({ added_todos: Number(count) || 0 })
})

module.exports = router;
