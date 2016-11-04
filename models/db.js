/**
 * Created by bestxie on 2016/10/29 14:50.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socket');

var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

module.exports = db;
