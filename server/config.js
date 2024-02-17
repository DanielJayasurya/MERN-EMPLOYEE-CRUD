require("dotenv").config()

module.exports = {
    port: process.env.PORT || 3001,
    database: 'mongodb://127.0.0.1:27017/employee-details',
};
  