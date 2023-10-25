const uploadModel=require('../Functions/Database').uploadModel;
const router = require('express').Router();
router.post('/', (req,res)=>{
    const{id}=req.body;
    uploadModel.findByIdAndDelete(id).then(()=>{
        console.log('successfully deleted');
        // res.redirect(`${process.env.Frontend_origin}/upload`)
        res.json('success');
    }).catch(err=>{
        console.log(err);
    })
})

module.exports=router;