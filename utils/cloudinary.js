const keys = require('./../config/keys');

const cloudinary  =  require('cloudinary').v2


cloudinary.config({ 
    cloud_name: keys.CLOUDINARY_CLOUD_NAME, 
    api_key: keys.CLOUDINARY_API_KEY, 
    api_secret: keys.CLOUDINARY_API_SECRET,
    secure: true
  });

module.exports = cloudinary