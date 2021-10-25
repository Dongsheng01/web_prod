// 当自定义选项，需要提前处理，预过滤器（Prefilters）是一个完美的选择。给定下面的代码， 例如，如果自定义abortOnRetry选项被设置为true，那么调用$.ajax()会自动中止请求相同的URL：
$.ajaxPrefilter(function(option) {
    // console.log(option.url);
    // 预处理url+拼接
    option.url = "http://api-breakingnews-web.itheima.net" + option.url;
    // console.log(option.url);

    // 判断条件为headers添加请求请求路径
    if (option.url.indexOf('/my/') !== -1) {
        // console.log(111);
        option.headers = {
            Authorization: localStorage.getItem("token") || "",
        }
    }

    // 回调处理未登录返回登陆 清理本地存储
    option.complete = function(res) {
        console.log(res.responseJSON);
        // 判断返回账户信息是否正常
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空本地存储
            localStorage.removeItem('token');

            // 跳转回登陆界面
            location.href = "./login.html"
        }
    }
})