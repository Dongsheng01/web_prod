// 操作元素
$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登陆的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui 中获取form对象
    var form = layui.form;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个规则
        pwd: [/^[\S]{6,12}$/, "密码必须6～12位,且不能为空格"],
        repwd: function(value) {
            // 获取密码框的值
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致 请重新输入"
            }
        }
    })
})

// 响应数据
$(function() {
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return alert('注册失败' + res.message)
                }
                confirm('注册成功！');
            }
        })
    })
})