const router = require('express').Router();
const uploadModel=require('../Functions/Database').uploadModel;
router.get('/', (req, res) => {
console.log(req.isAuthenticated());
    // uploadModel.find({}, function (err, docs) { 
    //     if (err){ 
    //         console.log(err); 
    //     } 
    //     else{ 
    //         console.log("First function call : ", docs); 
    //     } 
    // }); 

    // res.json('Welcome')
    uploadModel.find({}).then((result)=>{
        res.json({status:'ok', data:result});
    })
    

});
module.exports= router;