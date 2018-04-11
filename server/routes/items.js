const express = require('express');
const router = express.Router();

const items = [
  {
    id: '06712e75­c148­4fe8­97cd­d90246ac4052',
    name: 'socks',
    weight: 1,
    box_id: null
  },
  {
    id: '5a683688­3970­4596­b476­757443deeafc',
    name: 'doughnuts',
    weight: 1,
    box_id: null
  },
  {
    id: 'f61d6425­de4f­4993­bc3c­fdcff41bfd84',
    name: 'laptop',
    weight: 4,
    box_id: null
  },
  {
    id: 'a4f173aa­db59­46a8­b016­875ca36381c8',
    name: 'watermelon',
    weight: 7,
    box_id: null
  },
  {
    id: '430c6e28­b3b2­4720­aedf­174a35275563',
    name: 'raspberry pi',
    weight: 2,
    box_id: null
  },
  {
    id: 'c61fa46f­d963­4e63­a753­bd076512a96b',
    name: 'books',
    weight: 12,
    box_id: null
  }
];
/* GET boxes listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(items);
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let boxId = req.body.boxId;
  let found = items.find(item => item.id === id);
  found.box_id = boxId;
  res.json({ message: 'Item updated!' });
});

router.post('/:id', (req, res, next) => {
  // res.send('respond with a resource');
  console.log(req.params.id);
  console.log(req.body);
  items.push({
    id: req.params.id,
    name: req.body.name,
    weight: req.body.weight,
    box_id: null
  });
  res.json(items);
});

module.exports = router;
