const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT

const app = express();
const productsRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session= require('express-session');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'nodeWebApp'}));

require('./src/config/passport.js')(app);
app.set('views', './src/views');
app.set('view engine', 'ejs')


app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/',(req, res)=>{
   res.render('index');
});

app.listen(PORT, ()=>{
    debug(`listen to port  ${chalk.green(PORT)}`);
});