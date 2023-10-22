const router = require('express').Router();
const uploadModel= require('../Functions/Database').uploadModel;
const _= require('lodash');

let data='';

router.get('/', (req, res)=>{
    res.json(data);
    console.log(data);
    console.log(data);
    console.log(data);
    console.log(data);
});
router.post('/', (req, res) => {
const search = _.lowerCase(req.body.input)

console.log(search);
uploadModel.findOne({fileName:search})
.then(function(files) {
    console.log(files);
    // res.json(files);
    data=files;
    res.redirect('/search');
 })
 .then(function(){
    
 })
 .catch(function(err) {
     console.log(err);
 })
});


module.exports=router;