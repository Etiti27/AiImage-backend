const uploadModel=require('../Functions/Database').uploadModel;
const _=require('lodash');

const router = require('express').Router();


router.post('/', function(req, res){

    const {datta,title}=req.body;

    uploadModel.findOne({$or:[  {file:datta}, {fileName:title} ]}).then((result)=>{
if(result){
    console.log(result);
    res.json({result:'found'});
}else{
    console.log('not found');
    const newimage=new uploadModel({
        file:datta,
        fileName:title,
        
    })
    newimage.save().then(()=>{
        console.log(`saved`);
        res.json({result:'not found'});
    })
}
    })
    // console.log(datta);
    
})

router.get('/', (req, res)=>{
    uploadModel.find({}).then((result)=>{
        res.json({status:'ok', data:result});
    })
})

module.exports =router;