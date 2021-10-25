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
    // 实例化对象
    var layer = layui.layer;

    // 注册框
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    // return alert('注册失败' + res.message)
                    return layer.msg(res.message);
                }
                // confirm('注册成功！');
                layer.msg('注册成功,请登录');

                // 模拟点击登陆
                $('#link_login').click();
            }
        })
    })

    // 登录框
    $("#form_login").submit(function(e) {
        // console.log(111);
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                // 判断是否成功
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 保存token到本地存储
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = "./index.html";
            }
        })
    })
})