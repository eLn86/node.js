const mongoose = require('mongoose');
const terminal = require('./terminal');


const airportSchema = new mongoose.Schema({
  name: String,
  country: String,
  terminals: [terminal.schema],
  opened: Date
});


// Create the airport model and attach the Schema to it
const Airport = mongoose.model('Airport', airportSchema);

// Export the Airport model so that other files can access it
module.exports = Airport;
