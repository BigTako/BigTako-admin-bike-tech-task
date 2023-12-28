const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikes.controller');

router
  .route('/')
  .get(bikeController.getBikes)
  .post(bikeController.createBike);

router.get('/stats', bikeController.getBikesStats);

router
  .route('/:id')
  .get(bikeController.getBike)
  .patch(bikeController.updateBike)
  .delete(bikeController.deleteBike);

module.exports = router;
