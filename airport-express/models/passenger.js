const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date
});

// Create the Passenger model and attach the Schema to it
const Passenger = mongoose.model('Passenger', passengerSchema);

// Export the Passenger model so that other files can access it
module.exports = Passenger;
