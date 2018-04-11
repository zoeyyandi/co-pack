const express = require('express');
const router = express.Router();

const data = [
  {
    id: '603f95f2­5f84­427c­b697­1b6318f93311',
    name: 'box A',
    total_allowed_weight: 10,
    items: []
  },
  {
    id: '17cd977b­db7b­4bb8­ab83­68ad64134967',
    name: 'box B',
    total_allowed_weight: 20,
    items: []
  },
  {
    id: '3208c229­9a0a­4e3a­bbfa­4cf2e600d917',
    name: 'box C',
    total_allowed_weight: 5,
    items: []
  },
  {
    id: '176c0a0b­c9e7­4ae7­8be0­c8079bda57a7',
    name: 'box D',
    total_allowed_weight: 4,
    items: []
  }
];

/* GET boxes listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource');
  res.json(data);
});

/* POST new box listing. */
router.post('/:id', (req, res, next) => {
  // res.send('respond with a resource');
  console.log(req.params.id);
  console.log(req.body);
  data.push({
    id: req.params.id,
    name: req.body.name,
    total_allowed_weight: req.body.weight,
    items: []
  });
  res.json(data);
});
module.exports = router;
