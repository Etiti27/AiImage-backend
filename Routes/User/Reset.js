require('dotenv').config();
const UserModel=require('../../Functions/Database').UserModel;
const router = require('express').Router();
const transporter=require('../Nodemailer')

let usernameSession;
router.post('/', (req, res) => {
    const {username} = req.body;
    req.session.username = username;
   console.log(req.session);
   
UserModel.findOne({$or: [
    {email: username },
    {username: username}
]}).then((user) => {
    if(user==null) {
        res.json('not user found')
    }else{
        transporter.sendMail({
            from: `"ADMIN" <${process.env.USER_Email}>`, // sender address
            to: user.email, // list of receivers
            subject: "RESET PASSWORD", // Subject line
            // text: "Hello world?",  plain text body
            html: `<div>You initiated a password reset, link on the this to proceed, <a href="${process.env.Frontend_origin}/reset/${uuidv4()}">Reset</a></div>`
            // html body
          });
       
    }

    //
   res.json(req.session.username);
})
})


module.exports = {router,usernameSession};