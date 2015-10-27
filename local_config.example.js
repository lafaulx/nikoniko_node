module.exports = {
  DEV_SERVER_PORT: 4596,

  NODEJS_ADDR: process.env.NODEJS_ADDR || 'localhost',
  NODEJS_PORT: process.env.NODEJS_PORT || 3000,

  MONGODB_ADDR: 'localhost',
  MONGODB_PORT: '27017',
  MONGODB_DB: 'nikoniko',

  API_ORIGIN: 'http://' + NODEJS_ADDR + ':' + NODEJS_PORT
};