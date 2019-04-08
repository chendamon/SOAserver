var mongoose = require('mongoose');

var Token = new mongoose.Schema({
    value: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    clientId: {
      type: String,
      required: true
    },
    //token生成的时间
    created:{
      type:Date,
      default:Date.now
    }
});

module.exports = mongoose.model('Token', Token);
