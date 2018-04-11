const express = require('express');
const router = express.Router();

const users = [];
/* GET boxes listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(users);
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  const newUser = {
    id: req.params.id,
    name: req.body.name
  };
  users.push(newUser);
  res.json({ message: 'New user saved' });
});

module.exports = router;
