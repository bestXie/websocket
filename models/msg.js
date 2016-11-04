/**
 * Created by bestxie on 2016/10/29 14:50.
 */
var mongoose = require('mongoose');

//schema
var msgSchema = new mongoose.Schema({
    "createname": String,
    "createid": String,
    'createtime': String,
    "msgname": String,
    "msgid": String,
    "msguid": String,
    'msg': String
});

//索引
msgSchema.index({"createid": -1, 'msgid': 1, 'msguid': 1});


//model
var Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;
