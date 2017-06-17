const mongoose = require('mongoose');
const passenger = require('./passenger');

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  airline: String,
  passengers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }
});

// Create the flight model and attach the Schema to it
const Flight = mongoose.model('Flight', flightSchema);

// Export the flight model so that other files can access it
module.exports = Flight;
