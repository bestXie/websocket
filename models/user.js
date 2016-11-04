/**
 * Created by bestxie on 2016/10/29 14:50.
 */
var mongoose = require('mongoose');

//schema
var userSchema = new mongoose.Schema({
    "username": String,
    "name": String,
    "password": String,
    "sex": String,
    "birthday": String,//生日
    "hometown": String,//家乡
    'createtime': String,//创建用户时间
    'uid': String,//用户uid
    'qq': String,//用户qq
    'wx': String,//用户微信
    'tel': String,//用户tel
    'email': String,//用户email
    'head': String//用户email
});

//索引
userSchema.index({"username": -1, 'uid': 1});

userSchema.statics.tianjiaxuesheng = function (kidarray, sid, callback) {
    for (var i = 0; i < kidarray.length; i++) {
        registerSchema.update({"kid": kidarray[i]}, {$push: {"students": sid}}, function () {
            console.log("");
        })
    }
};

//model
var User = mongoose.model("User", userSchema);

module.exports = User;
