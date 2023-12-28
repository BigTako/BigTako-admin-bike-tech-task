const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Bike must have an id'],
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Bike must have a name'],
      minLength: [5, 'Bike name has to be at least 5 character long.'],
      maxLength: [256, 'Bike name has to be at most 256 character long.']
    },
    type: {
      type: String,
      required: [true, 'Bike must have a type'],
      minLength: [5, 'Bike type has to be at least 5 character long.'],
      maxLength: [256, 'Bike type has to be at most 256 character long.']
    },
    color: {
      type: String,
      required: [true, 'Bike must have a color']
    },
    price: {
      type: Number,
      required: [true, 'Bike must have a price'],
      min: [100, 'Bike price has to be at least 100.'],
      max: [10000, 'Bike price has to be at most 10000.']
    },

    wheelSize: {
      type: Number,
      required: [true, 'Bike must have a wheel size'],
      min: [10, 'Bike wheel size has to be at least 10.'],
      max: [100, 'Bike wheel size has to be at most 100.']
    },
    description: {
      type: String,
      required: [true, 'Bike must have a description'],
      minLength: [5, 'Bike description has to be at least 5 character long.'],
      maxLength: [256, 'Bike description has to be at most 256 character long.']
    },
    status: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available'
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

//Indexes
bikeSchema.index({ id: 1 }, { unique: true });

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
