import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const path = require('path');
const cookieParser = require('cookie-parser')

import { notFoundErrorHandler, errorHandler } from '../middlewares/api-error-handler.middleware';
import joiErrorHandler from '../middlewares/joi-error-handler.middleware';
import authenticate from '../middlewares/authenticate.middleware';

import indexRoute from '../routes/index.route';

import constants from '../constants';

import swaggerDocs from './swagger.config';


const app = express();

swaggerDocs(app)

app.use((req, res, next) => {
  const origin = req.get('origin');

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

const corsOption = {
  origin: [process.env.FRONTEND_BASE_URL],
  methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
  credentials: true,
}

app.use(cors(corsOption));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(authenticate);

// Router
app.use(constants.APPLICATION.url.basePath, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);

// Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

// static
app.use(express.static(path.join(__dirname, 'public')));


export default app;
