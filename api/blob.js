const router = require('express').Router();

const db = require('./data/dbConfig.js');

const get = () => {
  return db('blob').first();
};

const add = async blob => {
  return await db('blob').insert(blob);
};

const update = async blob => {
  return await db('blob')
    .where({ id: 1 })
    .update(blob);
};

router.post('/new', async (req, res) => {
  try {
    console.log(req.body);
    await add(req.body);
    res.status(201).end();
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const blob = await get();
    res.status(200).send(blob);
  } catch (e) {
    console.log(e);
  }
});

router.put('/update', async (req, res) => {
  const blob = await update(req.body);
  res.status(200).end();
});

module.exports = router;
