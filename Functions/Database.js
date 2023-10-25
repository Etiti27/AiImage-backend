require('dotenv').config();
const mongoose = require('mongoose');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');



const mongooseUrl=`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@aiimages.dftoeot.mongodb.net/?retryWrites=true&w=majority`

// mongoose.connect(mongooseUrl);
try {
    mongoose.connect(mongooseUrl)
   
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const UploadSchema =new mongoose.Schema({
    fileName: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
      
    },
    filefile: {
        type: String,
        required: true,
      },
    uploadTime: {
      type: Date,
      default: Date.now,
    },
  });

  const uploadModel= mongoose.model('UploadiMAGE', UploadSchema);

  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    names: { 
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false,
    }
  })

  UserSchema.plugin(passportLocalMongoose);

  const UserModel=mongoose.model('user', UserSchema);


  
  

  module.exports= {uploadModel, UserModel,mongooseUrl, UserSchema}