const bcrypt = require('bcrypt');
const UserModel=require('../../Functions/Database').UserModel;
const router = require('express').Router();
const saltRounds = 12;


router.post('/', (req, res) => {
const {username, password, email} = req.body;
console.log(username, password, email);
bcrypt.hash(password, saltRounds, function(err, hash) {
    const newUser = new UserModel({
        username: username,
        password: hash,
        email: email
    })
    newUser.save().then(() => {
        res.json('you\'re  successfully registered')
        console.log('User saved successfully');
    });
    // Store hash in your password DB.
});
})
module.exports = router;