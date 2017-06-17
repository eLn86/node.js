import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  password: String
},{
  timestamps:true
});

// /*
//  * Password has middleware
// */
// userSchema.pre('save', function(next) {
//
//   const user = this;
//   // Check to see if password has been modified
//   if(!user.isModified('password')) {
//     next();
//   }
//   // General salt of 10 random numbers/characters
//   bcrypt.genSalt(10, (err,salt) => {
//     if(err) {
//       return next(err);
//     }
//
//     // Hash the password with salt
//     bcrypt.hash(user.password, salt, (err,hash) => {
//       // If there is an error, return the error message
//       if(err) {
//         return next(err);
//       }
//       // If there is no error, encrypt the password
//       user.password = hash;
//       next();
//
//     });
//   });
// });
//
// userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// }

const User = mongoose.model('User', userSchema);

module.exports = User;
