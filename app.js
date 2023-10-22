const cookieParse = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const AuthRoute = require('./routes/AuthRoute');
const CategoryRoute = require('./routes/CategoryRoute');
const ProductRoute = require('./routes/ProductRoute');
const ProfileRoute = require('./routes/ProfileRoute');
const ReviewRoute = require('./routes/ReviewRoute');
const { errorHandler, notFound } = require('./middleware/ErrorMiddleware');

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

// application level middleware
app.use(morgan('dev'));
app.use(cors());
app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads')));

// all routing
app.use(AuthRoute);
app.use(CategoryRoute);
app.use(ProductRoute);
app.use(ProfileRoute);
app.use(ReviewRoute);

// agar respon berbentuk JSON tidak HTML (jgn diletakkan diawal)
app.use(notFound);
app.use(errorHandler);

// server listener
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server up and running on port : ${port}`);
});
