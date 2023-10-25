require('dotenv').config()
const express=require('express');
const app = express();
const bodyParser=require('body-parser');

const cors=require('cors');
const mongoose = require('mongoose');
const db=require('./Functions/Database');
// const UserLogin=require('./Routes/User/Login');
// const UserRegister=require('./Routes/User/Registration');
const SearchRoute = require('./Routes/Search');
const HomeRoute= require('./Routes/Home');
const UploadRoute = require('./Routes/Upload');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const ResetRoute=require('./Routes/User/Reset').router;
const ResetPass=require('./Routes/User/Resetpass');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');
const UserSchema=require('./Functions/Database').UserSchema;
const UserModel=require('./Functions/Database').UserModel;
const deleteItemId=require('./Routes/DeleteItem')
//medialware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.secret_key,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true ,
    maxAge: 60000},
    store: MongoStore.create({
        mongoUrl:db.mongooseUrl,  
    })  
  }));
app.use(passport.initialize());
app.use(passport.session());
 


passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser())


//Routes
app.use('/search', SearchRoute);
app.use('/home', HomeRoute);
app.use('/upload', UploadRoute);
// app.use('/login', UserLogin);
// app.use('/register', UserRegister);
app.use('/reset', ResetRoute);
app.use('/resetpass', ResetPass);
app.use('/delete', deleteItemId);


app.post('/register', (req,res)=>{
    const {username, password, names} = req.body;
    console.log(req.body);
    UserModel.register({username:username, names:names}, password, (err, user)=>{
        if(err){
            console.log(err.message);
            res.json(err.message);
        }
        passport.authenticate('local')(req, res, function(){
            res.json('you\'re  successfully registered')
        })
    })
});


app.post('/login', (req, res)=>{
    const {username, password, email} = req.body;
    const User=new UserModel({username:username, password:password});
    req.logIn(User, (err)=>{
        console.log(User);
        if(err){
            console.log(err.message);
            console.log(`not authenticated`);
            res.json('not authenticated')

        }else{
            passport.authenticate('local')(req, res, function(){
                console.log(`authenticated`);
                res.json('authenticated')
            });
        }
    });
});

app.get('/upload/secret', (req, res)=>{
    if(req.isAuthenticated()){
        console.log('authenticated');
        res.json('auth successful')
    }else{
        console.log('not authenticated');
        res.json('auth failed')
    }
})
app.listen(3001, () => {
    console.log('App listening on port 3001!');
});