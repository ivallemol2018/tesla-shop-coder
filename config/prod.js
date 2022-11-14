// prod.js - production 
module.exports = {
  redirectDomain : process.env.REDIRECT_DOMAIN,
  clientDbEcommerce: process.env.CLIENT_DB_ECOMMERCE,
  hostDbEcommerce: process.env.HOST_DB_ECOMMERCE,
  userDbEcommerce: process.env.USER_DB_ECOMMERCE,
  passwordDbEcommerce: process.env.PASSWORD_DB_ECOMMERCE,
  dbEcommerce : process.env.DB_ECOMMERCE,
  driverClassName: process.env.DRIVER_CLASS_NAME,
  hostSMTP: process.env.HOST_STMP,
  portSMTP: process.env.PORT_STMP,
  userSTMP: process.env.USER_STMP,
  passwordSTMP: process.env.PASSWORD_STMP,
  toMailAdmin: process.env.TO_MAIL_ADMIN,
  accountTwilio: process.env.ACCOUNT_TWILIO,
  tokenTwilio: process.env.TOKEN_TWILIO,
  phoneFromTwilio: process.env.PHONE_FROM_TWILIO,
  JWT_SECRET_SEED : process.env.JWT_SECRET_SEED,
  PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID,
  PAYPAL_SECRET:  process.env.PAYPAL_SECRET,
  PAYPAL_OAUTH_URL : process.env.PAYPAL_OAUTH_URL,
  PAYPAL_ORDERS_URL : process.env.PAYPAL_ORDERS_URL,
  CLOUDINARY_URL : process.env.CLOUDINARY_URL,
  CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET
}