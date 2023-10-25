const bcrypt = require('bcrypt');
const UserModel=require('../../Functions/Database').UserModel;
const router = require('express').Router();
const saltRounds = 12;

const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
UserModel.plugin(passportLocalMongoose);
passport.use(UserModel.createStrategy());

router.post('/', (req, res) => {
const {username, password, email} = req.body;
console.log(username, password, email);



UserModel.register({username:username, email:email}, password, function(err, user) {
    if (err) { console.log(err);}
  
    const authenticate = UserModel.authenticate();
    authenticate(username || email, password, function(err, result) {
      if (!err) { 
        console.log(result);
      }
  
      // Value 'result' is set to false. The user could not be authenticated since the user is not active
    });
  });
// bcrypt.hash(password, saltRounds, function(err, hash) {
//     const newUser = new UserModel({
//         username: username,
//         password: hash,
//         email: email
//     })
//     newUser.save().then(() => {
//         res.json('you\'re  successfully registered')
//         console.log('User saved successfully');
//     });
//     // Store hash in your password DB.
// });
})
module.exports = router;