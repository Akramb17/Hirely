const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://hirely-edd9.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// require all the auth routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

// using all the auth routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);


module.exports = app;