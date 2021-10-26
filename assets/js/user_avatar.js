$(function() {
    // 实例化layer对象
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传照片按钮
    $('#btnAddImg').on('click', function() {
        $('#file').click();
        // console.log(111);
    })

    // 改变照片
    $('#file').on('change', function(e) {
        // console.log(e);
        // 获取用户选择的文件
        var filelist = e.target.files;
        // 判断是否上传照片
        if (filelist.length === 0) {
            return layer.msg('请选择照片！');
        }
        // 拿到用户的照片
        var file = e.target.files[0];

        // 拿到照片url
        var newImgURL = URL.createObjectURL(file);

        // 销毁旧照片 创建新照片区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 保存截取和上传照片
    $('#btnUpload').on('click', function() {
        // 将图片转为字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将Canvas画布上的内容，转化为base64格式的字符串

        // 将图片发送到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                // console.log(res);
                // 判断返回信息是否成功
                if (res.status !== 0) {
                    return layer.msg('修改头像失败！');
                }
                layer.msg('修改头像成功');
                window.parent.getUserInfo();
            }
        })
    })

})