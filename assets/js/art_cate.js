$(function() {
    // 初始化分类信息
    initArtCateList();
    // 实例化layer
    var layer = layui.layer;
    var form = layui.form;

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })
    }

    // 点击添加类型
    var indexAdd = null;
    $('#addType').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类型',
            content: $('#tipsAdd').html(),
            area: ['500px', '250px']
        });
    })

    // 提交添加内容
    $('body').on('submit', '#tipsAddForm', function(e) {
        // 阻止默认事件
        e.preventDefault();

        // 获取表单数据
        var datas = $('#tipsAddForm').serialize();

        // 发起请求
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: datas,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增文章类型失败！')
                }
                initArtCateList();
                layer.msg(res.message);

                // 通过indexAdd索引号关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 提交修改内容
    var indexEdit = null;
    $('tbody').on('click', '#btnEdit', function() {
        // 获取表单信息
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#tipsEdit').html(),
            area: ['500px', '250px']
        })
        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
                console.log(res);
            }
        })
    })

    // 删除数据
    $('tbody').on('click', '#btnDelete', function() {
        // 获取id
        var id = $(this).attr('data-id');

        // 提示信息
        layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除分类成功');
                    // 关闭
                    layer.close(index);
                    // 重新初始化渲染页面
                    initArtCateList();
                }
            });
        });
    })
})