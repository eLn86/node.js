import express from 'express';
import User from '../model/user';
import passport from 'passport';
import {Strategy} from 'passport-local';
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

const router = express.Router();

const FBID = "1461744740550638";
const Secret = "c95c58698bf6d0b0a944cd4badbe01e8";

/*
 * Serialize and deserialize user
 * via cookie
*/
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findbyId(id, (err, user) => {
    done(err, user);
  });
});

// /*
//  * Set up local strategy
// */
// passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
//     User.findOne({email: email.toLowercase()}, (err, user) => {
//       if(err) {return done(err);}
//       if(!user) {return done(null, false);}
//     });
//     user.comparePassword(password, (err, isMatch) => {
//       if(err) {return done(err);}
//       if(isMatch){return done(null, user);}
//
//       return done(null, false);
//     });
// }));


passport.use(new facebookStrategy({
  clientID: '1461744740550638',
  clientSecret: 'c95c58698bf6d0b0a944cd4badbe01e8',
  callbackURL: '/auth/facebook/callback',
  profileFields: ['public_profile'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    console.log(profile);
  }
));

/* GET index page. */
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
  res.redirect('/secret');
});

/* POST login/password */
router.post('/', (req, res, next) => {

  const email = req.body.username;
  const password = req.body.password;

  passport.authenticate('local', (err, user, info) => {
    if(err) {return next(err);}
    if(!user) {
      res.render('index', {
        title: 'Login page'
      });
    }

    req.logIn(user, (err) => {
      if(err) {return next(err);}
      res.redirect('/secret');
    });

  });
  // User.find({email: email}, (err, users) => {
  //     if(err){
  //       res.render('index', {
  //         title: 'Express'
  //       });
  //     }else{
  //       users[0].comparePassword(password, (err, isMatch) => {
  //         if(isMatch) {
  //           res.redirect('/secret');
  //         }
  //         else {
  //           res.render('index', {
  //             title: 'Express'
  //         });
  //         }
  //       });
  //     }
  // });
});

/* GET secret page */
router.get('/secret', (req, res, next) => {
  res.render('secret', {
    title: 'Major secret'
  });
});

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Sign up'
  });
});

/* POST signup page */
router.post('/signup', (req, res, next) => {

    const email = req.body.username;
    const password = req.body.password;

    const user = new User({
      email: email,
      password: password
    });

    user.save((err,user) => {
      if(err) {
        console.log(err);
        res.render('signup', {
          title: 'Sign up'
        });
      }
      res.redirect('/');
    });
});

export default router;
