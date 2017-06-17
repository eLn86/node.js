const mongoose = require('mongoose');
const flight = require('./flight');

const terminalSchema = new mongoose.Schema({
  name: String,
  flights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    }],
  capacity: Number
});

// Create the terminal model and attach the Schema to it
const Terminal = mongoose.model('Terminal', terminalSchema);

// Export the terminal model so that other files can access it
module.exports = Terminal;
