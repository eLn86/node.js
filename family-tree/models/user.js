import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  maker: String,
  model: String
});


const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {type: String, required: true, unique: true},
  meta: {
    age: Number,
    address: String,
    country: String
  },
  car: [carSchema]
}, {
  timestamps: true // creates the current time and date every time insert is performed
});

// function to interact with first_name, i.e obj.sayHello() outputs 'Hello!first_name' in the console
userSchema.methods.sayHello = () => {
  console.log('Hello!' + this.first_name);
}

// Custom property
userSchema.virtual('fullname').get(() => {
  return this.first_name + ' ' + this.last_name;
})

// Create a model and attach the Schema to it
const User = mongoose.model('User', userSchema);

// Export the User model so that other files can access it
module.exports = User;
