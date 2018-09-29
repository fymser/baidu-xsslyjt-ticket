const app = getApp();
Page({
    data: {
        imgs: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538195885530&di=82068aebf896247075030b92f37a04e0&imgtype=0&src=http%3A%2F%2Fwww.fpwap.com%2FUploadFiles%2Farticle%2Fbagua%2F2014%2F12%2F03%2F1417582236688734.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538790657&di=4451b4133c34a032913471b43b69b678&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.fpwap.com%2FUploadFiles%2Farticle%2Fbagua%2F2014%2F12%2F03%2F1417582235946756.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1538185858&di=f0ec2ad44b58f29f57a295a966885919&src=http://pic.feizl.com/upload/allimg/170615/0KZ64W5-0.jpg"
        ]
    },
    onLoad: function () {
        //监听页面加载的生命周期函数
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        app.checkLogin(this);
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});