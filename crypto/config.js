require('dotenv').config();

console.log('SECRET_KEY:', process.env.SECRET_KEY);

module.exports = {
  secret: process.env.SECRET_KEY
};