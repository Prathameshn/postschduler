// const appzip = require('appmetrics-zipkin')({
//     host: '127.0.0.1',
//     port: 9411,
//     serviceName: 'admin-service',
//     sampleRate: 1.0,
// });
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
<<<<<<< HEAD
const routes = require('@routes/v1');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('@middlewares/error');
=======
const { logs } = require('./vars');
>>>>>>> 156fa15b94e32bdbe9b9966fb32a1392e9b51779

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use('/v1/', routes);

app.get("/tests",(req,res,next)=>{
    res.json({message:"Success"})
})

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
