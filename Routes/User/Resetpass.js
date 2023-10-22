const UserModel=require('../../Functions/Database').UserModel;
const router = require('express').Router();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const usernameSession= require('./Reset').usernameSession;
const transporter=require('../Nodemailer');

router.post('/', (req, res) => {
    const {password} = req.body;
    console.log(req.session);
    // console.log(password);
// UserModel.findOne({$or: [
//     {email: username },
//     {username: username}
// ]}).then((user) => {
//     if(user==null) {
//         res.json('not user found')
//     }else{
//         transporter.sendMail({
//             from: '"ADMIN" <admin@naturalhairtherapist.com>', // sender address
//             to: user.email, // list of receivers
//             subject: "RESET PASSWORD", // Subject line
//             // text: "Hello world?",  plain text body
//             html: `<div>You initiated a password reset, link on the this to proceed, <a href="http://localhost:3000/resetpass/${uuidv4()}">Reset</a></div>`
//             // html body
//           });
       
//     }

//     //
   
// })
})
module.exports = router;