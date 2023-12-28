const Bike = require('../models/bike.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filtration');

exports.getBikes = catchAsync(async (req, res, next) => {
  const documents = await Bike.find();

  res.status(200).json({
    status: 'success',
    results: documents.length,
    data: documents
  });
});

exports.getBike = catchAsync(async (req, res, next) => {
  const doc = await Bike.findOne({
    id: req.params.id
  });

  if (!doc) {
    return next(new AppError('Document not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.createBike = catchAsync(async (req, res, next) => {
  const doc = await Bike.create(req.body);

  res.status(201).json({
    status: 'success',
    data: doc
  });
});

exports.updateBike = catchAsync(async (req, res, next) => {
  const body = filterObj(req.body, 'status');

  const doc = await Bike.findOneAndUpdate(
    {
      id: req.params.id
    },
    body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!doc) {
    return next(new AppError('Document not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.deleteBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findOneAndDelete({
    id: req.params.id
  });

  if (!bike) {
    return next(new AppError('Document not found', 404));
  }

  res.status(200).json({
    data: null
  });
});

exports.getBikesStats = catchAsync(async (req, res, next) => {
  const totalCount = await Bike.countDocuments();
  const availableCount = await Bike.countDocuments({ status: 'available' });
  const busyCount = await Bike.countDocuments({ status: 'busy' });

  let averagePrice;

  if (totalCount === 0) {
    averagePrice = 0;
  } else {
    const averagePriceInfo = await Bike.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price' }
        }
      }
    ]);
    averagePrice = averagePriceInfo[0].averagePrice;
  }

  res.status(200).json({
    status: 'success',
    data: {
      totalCount,
      availableCount,
      busyCount,
      averagePrice
    }
  });
});
