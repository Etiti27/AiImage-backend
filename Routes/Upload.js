const multer  = require('multer');
const uploadModel=require('../Functions/Database').default;
const _=require('lodash');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, '../uploadimages/src/photo/');
    },filename: function(req, file, cb) {
    
    cb(null, file.originalname);
    }
   
    });
    const multerFilter = (req, file, cb) => {
        const splitExt=file.mimetype.split("/")[1];
         splitExt==='png' || splitExt ==='jpeg' || splitExt ==='jpg'
         ?cb(null, true)
         : req.fileValidationError = "Not an image file File!!... Supported extensions are png, jpg and jpeg";
         return cb(null, false, req.fileValidationError);
        
      };
    const upload = multer({
        storage: storage,
        fileFilter:multerFilter });
const router = require('express').Router();

router.post('/', upload.single('uploaded_file'), function (req, res) {
if (req.fileValidationError){
    console.log('error', req.fileValidationError);
    res.json(req.fileValidationError);
} else
         {
          
        
        const newImage = new uploadModel({
            file: req.file.originalname,
            fileName: _.lowerCase(req.body.title),
            filefile:req.file.originalname
          });
          newImage.save()
          .then(function (){console.log('saved success');})
          .catch(function (err) {res.json(err);
    
       
    
          })
        }
       
    
    
});
module.exports =router;