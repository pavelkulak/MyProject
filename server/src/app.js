const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require('../routers/auth.router');

const cors = require('cors');
const tokensRouter = require('../routers/token.router');
const { PORT } = process.env;
const corsConfig = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
});


module.exports = app