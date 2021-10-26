$(function() {
    // 校验规则
    var form = layui.form;
    var layer = layui.layer;

    // 自定义规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码请不能相同！';
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次输入不相同,请重新输入！';
            }
        }
    })

    // 发起修改请求
    $('.layui-form').on('click', function(e) {
        e.preventDefault();

        // 请求
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);

                //重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})