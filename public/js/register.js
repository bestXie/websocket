my_form.init(function (form) {
    console.log(form);
    console.log(1);
    postRegister();
});
var mask = mui.createMask();
function postRegister() {
    var params = {
        username: $('#username').val(),
        name: $('#name').val(),
        password: $('#password').val(),
        sex: $('#sex').val(),
        birthday: $('#birth_date_result').html(),
        hometown: $('#hometown_result').html()
    };
    mui('body').progressbar().show();
    mask.show();
    $.ajax({
        type: 'POST',
        url: '/register',
        data: params,
        dataType: 'json',
        success: function (data) {
            mui('body').progressbar().hide();
            mask.close();
            if(data){
                if(data.code=='200'){
                    mui.alert('是否返回首页','注册成功','确定',function(){
                        window.location.href="/index"
                    });
                }else{
                    mui.toast(data.msg);
                }
            }else{
                mui.toast('系统异常，请稍后再试');
            }
        },
        error:function(data){
            mui('body').progressbar().hide();
            mask.close();
            mui.toast('系统异常，请检查你的网络是否连接');
        }
    })
}