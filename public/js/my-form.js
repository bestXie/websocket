(function (window) {
    var formSubmit = {
        init: function (formSubmitHandler) {
            this.bind(formSubmitHandler);
        },
        bind: function (formSubmitHandler) {
            $("#myform").validate({
                debug: true, //调试模式取消submit的默认提交功能
                errorClass: "error", //默认为错误的样式类为：error
                focusInvalid: true, //当为false时，验证无效时，没有焦点响应
                onkeyup: false,
                errorPlacement: function (error, element) {
                    error.appendTo(element.parents('.validate_box'));
                },
                submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form
                    formSubmitHandler(form);
                },
                rules: form_validate.rules,
                messages: form_validate.messages
            });
        }
    };

    window.my_form = formSubmit
})(window);