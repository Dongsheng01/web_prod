// 执行获取信息
$(function() {
    // 获取用户信息
    getUserInfo();

    // 实例化layer对象
    var layer = layui.layer;
    // 点击退出按钮退出
    $("#btnLogOut").on('click', function(e) {
        e.preventDefault();

        layer.confirm('确定退出登陆？', { icon: 3, title: '提示' }, function(index) {
            // 删除本地存储数据
            localStorage.removeItem('token');

            // 跳转登陆界面
            location.href = "./login.html";

            // layui定义关闭提示
            layer.close(index);
        });
    })
})

// 获取本地存储数据
function getUserInfo() {
    var layer = layui.layer;
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || "",
        // },
        success: function(res) {
            console.log(res);
            // 判断返回状态
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            renderAvatar(res.data);
        },
        // 完成回调
        // complete: function(res) {
        //     console.log(res.responseJSON);
        //     // 判断返回账户信息是否正常
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 清空本地存储
        //         localStorage.removeItem('token');

        //         // 跳转回登陆界面
        //         location.href = "./login.html"
        //     }
        // }

    })
}

// 登陆信息界面
function renderAvatar(user) {
    // 获取用户名
    var username = user.nickname || user.username;

    $('#welcome').html(`欢迎 ${username}`);

    // 获取用户名第一个字符
    var first = user.username[0].toUpperCase();

    // 判断用户是否设置头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".myUser > .users").hide();
    } else {
        $(".myUser > .users").text(first).show();
        $(".layui-nav-img").hide();
    }
}