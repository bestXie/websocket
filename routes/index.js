var express = require('express');
var router = express.Router();
var user = require("../models/user.js");
var msg = require("../models/msg.js");
var uuid = require("node-uuid");
var path = require("path");
var fs = require("fs");
var gm = require("gm");


/* GET home page. */
router.get('/', function (req, res, next) {
    var username = '';
    var name = '';
    var modelhtml = 'index';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        name = req.session.name;
        user.findOne({"username": username}, function (err, result) {
            if (err || !result) {
                res.render('index', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = result;
                data.title = result.name;
                res.render('socketindex', data);
            }
        });
    } else {
        res.render(modelhtml, {
            title: '首页-webSocke1.0',
            username: username,
            name: name,
            head: req.session.head
        });
    }
});
//显示首页
router.get('/index', function (req, res, next) {
    var username = '';
    var name = '';
    var modelhtml = 'index';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        name = req.session.name;
        user.findOne({"username": username}, function (err, result) {
            if (err || !result) {
                res.render('index', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = result;
                data.title = result.name;
                res.render('socketindex', data);
            }
        });
    } else {
        res.render(modelhtml, {
            title: '首页-webSocke1.0',
            username: username,
            name: name,
            head: req.session.head
        });
    }
});
//用户
router.get('/user', function (req, res, next) {
    var username = '';
    var name = '';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        user.findOne({"username": username}, function (err, result) {
            if (err || !result) {
                res.render('index', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = result;
                data.title = result.name;
                res.render('user', data);
            }
        });
    } else {
        res.redirect("/");
    }
});
//留言
router.get('/message/:uid', function (req, res, next) {
    var username = '';
    var name = '';
    //留言的用户id
    var msguid = req.params["uid"];
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        name = req.session.name;

        user.findOne({"uid": msguid}, function (err, result) {
            if (err || !result) {
                res.render('user-list', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {

                var data = result;
                data.title = '留言';
                msg.find({"msgid": msguid}, function (err, result) {
                    data.msglist = result;
                    req.session.msguid = msguid;
                    res.render('message', data);
                })
            }
        });
    } else {
        res.render('index', {
            title: '首页-webSocke1.0',
            username: username,
            name: name
        });
    }
});
//留言列表
router.get('/messageList', function (req, res, next) {
    var username = '';
    var name = '';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        user.findOne({"username": username}, function (err, result) {
            if (err || !result) {
                res.render('messageList', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = result;
                data.title = result.name;
                msg.find({"msgid": result.uid}, function (err, result) {
                    data.msglist = result
                    res.render('messageList', data);
                })
            }
        });
    } else {
        res.render('index', {
            title: '首页-webSocke1.0',
            username: username,
            name: name
        });
    }
});

//显示用户信息修改
router.get('/updataUser', function (req, res, next) {
    var username = '';
    var name = '';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        user.findOne({"username": username}, function (err, result) {
            if (err || !result) {
                res.render('index', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = result;
                data.title = '信息修改';
                res.render('updata-user', data);
            }
        });
    } else {
        res.render('index', {
            title: '首页-webSocke1.0',
            username: username,
            name: name
        });
    }
});
//显示用户列表
router.get('/userlist', function (req, res, next) {
    var username = '';
    var name = '';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        user.find({}, function (err, result) {
            if (err || !result) {
                res.render('index', {
                    title: '首页-webSocke1.0',
                    username: username,
                    name: name
                });
                return;
            }
            if (result) {
                var data = {
                    list: result,
                    title: result.name,
                    username: username
                };
                res.render('user-list', data);
            }
        });
    } else {
        res.render('index', {
            title: '首页-webSocke1.0',
            username: username,
            name: name
        });
    }
});
//显示注册页
router.get('/register', function (req, res, next) {
    res.render('register', {title: '用户注册-webSocke'});
});
//显示头像剪切页
router.get('/photoCut', function (req, res, next) {
    res.render('photoCut', {title: '头像剪切-webSocke'});
});


//ajax 注册
router.post('/register', function (req, res, next) {
    var username = req.body.username;
    user.findOne({"username": username}, function (err, result) {
        if (err || !result) {
            var userParams = req.body;
            userParams.createtime = new Date().getTime();
            userParams.qq = '';
            userParams.tel = '';
            userParams.wx = '';
            userParams.email = '';
            userParams.uid = uuid.v4();

            userParams.head = 'img/user-moren' + parseInt(10 * Math.random()) + '.png';

            user.create(userParams, function (err, thor) {
                if (err) {
                    //next();
                    res.json({code: 304, msg: '注册失败，请联系管理员'});
                    return false;
                }
                req.session.isLogin = "666";
                req.session.username = thor.username;
                req.session.name = thor.name;
                req.session.head = thor.head;
                req.session.uid = thor.uid;

                res.json({code: 200, msg: '注册成功'});
            });
            return;
        }
        if (result) {
            res.json({code: 202, msg: '用户名已存在'})
        }
    });
});
//ajax 用户信息修改
router.post('/updataUser', function (req, res, next) {
    var username = '';
    var name = '';
    if (req.session.isLogin == "666") {
        //如果登陆了
        username = req.session.username;
        user.update({"username": username}, {$set: req.body}, function (err, result) {
            if (err || !result) {
                res.json({code: 201, msg: '信息修改失败，请联系管理员'});
                return;
            }
            if (result) {
                res.json({code: 200, msg: result});
            }
        });
    } else {
        res.json({code: 302, msg: '请登录后再操作'});
    }

});
//ajax 登陆
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({"username": username}, function (err, result) {
        if (err || !result) {
            res.json({code: 201, msg: '用户名错误'});
            return;
        }
        //有的话，进一步看看这个人的密码是否匹配
        if (password == result.password) {
            req.session.isLogin = "666";
            req.session.username = result.username;
            req.session.name = result.name;
            req.session.uid = result.uid;
            req.session.head = result.head;
            res.json({code: 200, msg: '登陆成功'});
        } else {
            res.json({code: 202, msg: '密码错误'});
        }
    });
});
//ajax 头像修改
router.post('/sethead', function (req, res, next) {
    if (req.session.isLogin == "666") {
        var username = req.session.username;
        var headimgname = username + ".png";
        var uploadDir = path.normalize(__dirname + "/../userinfo/" + headimgname);
        var imgData = req.body.img;
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile(uploadDir, dataBuffer, function (err) {
            if (err) {
                res.json({code: 201, msg: '图片保存失败，请联系管理员'});
                res.send(err);
            } else {
                user.update({"username": username}, {$set: {head: headimgname}}, function (err, result) {
                    if (err || !result) {
                        res.json({code: 203, msg: '数据库连接失败，请刷新页面再尝试'});
                        return;
                    }
                    if (result) {
                        res.json({code: 200, msg: result});
                    }
                });
            }
        });
    } else {
        res.json({code: 302, msg: '请登录后再操作'});
    }

});
//ajax 查找用户
router.post('/finduser', function (req, res, next) {
    if (req.session.isLogin == "666") {
        var username = req.body.username;
        var params = {};
        if (username) {
            params = {"username": username}
        }
        user.find(params, function (err, result) {
            if (err || !result) {
                res.json({code: 201, msg: '查询失败'});
                return;
            }
            if (result) {
                res.json({code: 200, msg: result});
            }
        });
    } else {
        res.json({code: 302, msg: '请登录后再操作'});
    }
});
//ajax 新增留言
router.post('/addmsg', function (req, res, next) {
    if (req.session.isLogin == "666") {
        var msguid = req.session.msguid;
        if (!msguid) {
            res.json({code: 404, msg: '被留言的用户不存在'});
        }
        user.findOne({"uid": msguid}, function (err, result) {
            if (err || !result) {
                res.json({code: 201, msg: '被留言的用户不存在'});
                return;
            }
            var userParams = {
                "createname": req.session.username,
                "createid": req.session.uid,
                'createtime': new Date().getTime(),
                "msgname": result.username,
                "msgid": result.uid,
                "msguid": uuid.v4(),
                'msg': req.body.msg
            };
            msg.create(userParams, function (err, thor) {
                if (err) {
                    res.json({code: 304, msg: '留言失败，请刷新重试'});
                    return false;
                }
                res.json({code: 200, msg: userParams});
            });
        });
    } else {
        res.json({code: 302, msg: '请登录后再操作'});
    }
});
//ajax 删除留言
router.post('/deletemsg', function (req, res, next) {
    if (req.session.isLogin == "666") {
        var msguid = req.body.msguid;
        if (!msguid) {
            res.json({code: 404, msg: '被留言的用户不存在'});
        }
        msg.remove({"msguid": msguid}, function (err, result) {
            if (err || !result) {
                res.json({code: 201, msg: '留言不存在'});
                return;
            }
            res.json({code: 200, msg: '删除成功'});
        });
    } else {
        res.json({code: 302, msg: '请登录后再操作'});
    }
});

module.exports = router;
