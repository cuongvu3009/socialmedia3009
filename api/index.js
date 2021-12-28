const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

//	routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');

//	App config
dotenv.config();
const app = express();

//	Mongodb connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to Mongodb');
  }
);

//	Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

//	Routes
app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 8880;

app.listen(PORT, () => {
  console.log(`Backend server is runinng on port ${PORT}`);
});
