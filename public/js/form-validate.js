(function (window) {
    var form_validate = {
        init: function () {
            this.addMethod();
        },
        rules: {
            username: {
                required: true,
                usernameStr: true
            },
            name: {
                required: true,
                rangelength: [1, 15],
                nameValidator: true,
                specialstring: true
            },
            password: {
                required: true,
                rangelength: [5, 15]
            },
            confirm_password: {
                equalTo: "#password"
            },
            sex: {
                required: true
            },
            birthday: {
                required: true
            },
            hometown: {
                required: true
            },
            agree: {
                required: true
            },
            email: {
                required: false,
                email: true
            },
            tel: {
                tel: true
            },
            qq: {
                qq: true
            },
            wx: {
                specialstring: true
            }
        },
        messages: {
            username: {
                required: "用户名不能为空"
            },
            name: {
                required: "昵称不能为空",
                rangelength: "长度必须是1-15个字符"
            },
            password: {
                required: "密码不能为空",
                rangelength: "密码长度必须是5-15个字符"
            },
            confirm_password: {
                equalTo: "两次密码输入不一致"
            },
            sex: {
                required: "性别不能为空"
            },
            birthday: {
                required: "生日不能为空"
            },
            hometown: {
                required: "故乡不能为空"
            },
            agree: {
                required: "必须同意《webSocket会员注册协议》"
            },
            email:{
                email: "请正确填写邮箱"
            }
        },
        /*添加自定义验证*/
        addMethod: function () {
            var _this = this;
            /*判断姓名是否合法*/
            $.validator.addMethod(
                "nameValidator",
                function (value, element, param) {
                    return _this.nameValidator(element, param);
                },
                $.validator.format("请确保输入的昵称语义合法")
            );
            /*特殊符号*/
            jQuery.validator.addMethod(
                "specialstring",
                function (value) {
                    var pattern = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@%#￥……&*（）——|{}【】‘；：”“'。，、？]");
                    return !pattern.test(value);
                }, "不允许包含特殊符号!"
            );
            /*5-20位字母或数字开头，允许字母数字下划线*/
            jQuery.validator.addMethod(
                "usernameStr",
                function (value, element) {
                    return this.optional(element) || /^[a-zA-Z0-9][a-zA-Z0-9_]{4,19}$/.test(value);
                }, "用户名必须是5-20位字母或数字开头"
            );
            /*手机号码*/
            jQuery.validator.addMethod(
                "tel",
                function (value, element) {
                    var length = value.length;
                    return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(value));
                }, "请正确填写您的手机号码"
            );
            /*qq*/
            jQuery.validator.addMethod(
                "qq",
                function (value, element) {
                    var tel = /^[1-9][0-9]{4,}$/;
                    return this.optional(element) || (tel.test(value));
                }, "请正确填写您的QQ号码"
            );
        },
        //昵称验证
        nameValidator: function (elem) {
            elem = $(elem);
            var nameVal = elem.val();
            var excludedKeys = ['不详', '未知', '不祥', '不知道', '姓名', '习大大'];
            if (!nameVal) {
                elem.focus();
                return false;
            } else if (nameVal && !(/^([\u4e00-\u9fa5\s]{2}|[a-zA-Z]{4})([\u4e00-\u9fa5\s]{0,18}|[. ]{0,36}|[• ]{0,36}|[a-zA-Z]{0,36})?$/.test(nameVal))) {
                //elem.focus();
                //return false;
            } else if ($.inArray(nameVal, excludedKeys) !== -1 || nameVal.indexOf('测试') > -1 || nameVal.indexOf('test') > -1) {
                elem.focus();
                return false;
            }
            return true;
        }
    };
    form_validate.init();
    window.form_validate = form_validate;

})(window);