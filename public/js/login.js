$(function () {
    var mask = mui.createMask();
    var index = {
        init: function () {
            this.bind();
        },
        bind: function () {
            var _this = this;
            $('.mui-bar-tab .mui-tab-item').bind('touchend', function () {
                mui.toast('请登陆后再操作');
                var url = $(this).attr('href');
                if (url) {
                    mui.openWindow({
                        url: url
                    });
                }
            });
            $('.index-icon-arrowleft').bind('click', function () {
                mui.toast('请登陆后再操作！')
            });
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            $('.submit').click(function () {
                $('#myform').submit();
            });
            my_form.init(function (form) {
                _this.login();
            })
        },
        login: function () {
            var params = {
                username: $('#username').val(),
                password: $('#password').val()
            };
            mui('body').progressbar().show();
            mask.show();
            $.ajax({
                type: 'POST',
                url: '/login',
                data: params,
                dataType: 'json',
                success: function (data) {
                    mui('body').progressbar().hide();
                    mask.close();
                    if (data) {
                        if (data.code == '200') {
                            mui.alert('登录成功','确定',function(){
                                window.location.href="/index"
                            });
                        } else {
                            mui.toast(data.msg);
                        }
                    } else {
                        mui.toast('系统异常，请稍后再试');
                    }
                },
                error: function (data) {
                    mui('body').progressbar().hide();
                    mask.close();
                    mui.toast('系统异常，请检查你的网络是否连接');
                }
            })
        }
    };
    index.init();
});
