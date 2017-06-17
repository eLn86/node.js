import express from 'express';
import candyController from '../controller/candystore';

const router = express.Router();

/*
* List all the candies
*/
router.get('/', (req, res) => {
  res.json(candyController.list());
});

/*
* Create candy
*/
router.post('/', (req, res) => {
  const newCandy = candyController.create(req.body);
  res.json(newCandy);
});

/*
* Get candy
*/
router.post('/:id', (req, res) => {
  const candyId = req.params.id;
  res.json(candyController.get(candyId));
});

/*
* Update candy
*/
router.put('/', (req, res) => {
  const newCandy = candyController.update(req.body);
  res.json(newCandy);
});

/*
* Delete candy
*/
router.delete('/:id', (req, res, next) => {
  const candyId = req.params.id;
  res.json(candyController.delete(candyId));
});

export default router;
