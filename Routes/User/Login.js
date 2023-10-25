const bcrypt = require('bcrypt');
const UserModel=require('../../Functions/Database').UserModel;
const router = require('express').Router();


router.post('/', (req, res) => {
    const {username, password} = req.body;
    
UserModel.findOne({$or: [
    {email: username },
    {username: username}
]}).then((user) => {
    console.log(user);
    if(user==null) {
        res.json('not user found')
    }else{

        const authenticate = user.authenticate();
        authenticate(username, password, function(err, result) {
          if (!err) { 
            res.json(result);
          }
      
          // Value 'result' is set to false. The user could not be authenticated since the user is not active
        });
        // bcrypt.compare(password, user.password).then(function(result) {
        //     //     // result == true
        //         req.session.result = result;
        
        //         console.log(result);
        //         res.json(req.session.result);
        //     });
    }

    //
   
})
})
module.exports = router;