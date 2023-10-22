require('dotenv').config()
const express=require('express');
const app = express();
const bodyParser=require('body-parser');

const cors=require('cors');
const mongoose = require('mongoose');
const db=require('./Functions/Database');
const UserLogin=require('./Routes/User/Login');
const UserRegister=require('./Routes/User/Registration');
const SearchRoute = require('./Routes/Search');
const HomeRoute= require('./Routes/Home');
const UploadRoute = require('./Routes/Upload');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const ResetRoute=require('./Routes/User/Reset').router;
const ResetPass=require('./Routes/User/Resetpass');

//medialware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: process.env.Frontend_origin}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true ,
    maxAge: 60000},
    // store: MongoStore.create({
    //     mongoUrl:db.mongooseUrl,  
    // })  
  }));

 

  app.use(function (req, res, next) {
    req.session.username;
    next();
  });

//Routes
app.use('/search', SearchRoute);
app.use('/home', HomeRoute);
app.use('/upload', UploadRoute);
app.use('/login', UserLogin);
app.use('/register', UserRegister);
app.use('/reset', ResetRoute);
app.use('/resetpass', ResetPass);

app.listen(3001, () => {
    console.log('App listening on port 3001!');
});