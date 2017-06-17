import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
//import logger from 'morgan';
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';

// import mongoose
import mongoose from 'mongoose';

const app = express();
const debug = Debug('airport-express:app');

// connect to mongoDB
mongoose.connect('mongodb://localhost/airport');

// import models
import Airport from './models/airport';
import Flight from './models/flight';
import Passenger from './models/passenger';
import Terminal from './models/terminal';


//Create flight named flight1 from CDG France to JFK New-York, USA on American Airlines with no passengers
let flight1 = new Flight({
  from: 'CDG France',
  to: 'JFK New-York, USA',
  airline: 'American Airlines'
})

// // Save flight
// flight1.save((err) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//   console.log('Flight:' + flight1 + 'created');
// })

//Create flight named flight2 from Heathrow UK to JFK New-York, USA on British Airways with no passengers
let flight2 = new Flight({
  from: 'Heathrow UK',
  to: 'JFK New-York, USA',
  airline: 'British Airways'
})

// //Create and save flight
// flight2.save((err) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//
//   console.log('Flight:' + flight2 + 'created');
// })

// Create airport named airport1 called JFK in the USA opened on a random date in 1990
let airport1 = new Airport({
  name: 'JFK',
  country: 'USA',
  opened: new Date().setYear(1990)
})

// // Create and save flight
// airport1.save((err) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//
//   console.log('Airport:' + airport1 + 'created');
// })

// Flight.find({}, (err,flight) => {
//   if(err) {
//     console.log(err);
//     return;
//   }
//   console.log(flight);
// })
//
// Airport.find({}, (err,airport) => {
//   if(err) {
//     console.log(err);
//     return;
//   }
//   console.log(airport);
// })
let terminal1 = {
  name: 'Terminal 1',
  flights: [flight1, flight2],
  capacity: 234324
}

airport1.terminals.push(terminal1);
console.log("Created new terminal with 2 flights");

airport1.update((err) => {
  if(err) {
    console.log(err);
    return
  }
  console.log('Airport:' + airport1 + 'updated');
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
