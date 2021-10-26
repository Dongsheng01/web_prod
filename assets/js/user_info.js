$(function() {
    var form = layui.form;
    var layer = layui.layer;

    // 判断验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度请保持在在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res);
                // 判断是否获取信息成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message);
                // 将data数据赋值给form(layui方法)
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置按钮重置信息
    $('#btnReset').on('click', function(e) {
        // 阻止默认提交事件
        e.preventDefault();

        // 初始化
        initUserInfo();
    })

    // 提交修改按钮
    $('.layui-form').on('click', function(e) {
        e.preventDefault();

        // 发起请求 提交修改数据
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // console.log(111);
                // console.log(data);
                window.parent.getUserInfo();
            }
        })
    })
})