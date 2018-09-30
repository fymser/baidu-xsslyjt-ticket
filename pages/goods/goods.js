const app = getApp();
let arr = [];
let latitude;
let longitude;
let city;
let page = 1;
let val;
let id;
Page({
    data: {
        imgs: [],
        city: "",
        goods: [],
        nodes: [],
    },
    onLoad: function (e) {
        //监听页面加载的生命周期函数
        console.info(e)
        id = e.id;
        // this.getAddr();
    },
    // getAddr: function () {
    //     let that = this;
    //     swan.getLocation({
    //         type: 'gcj02',
    //         success: function (res) {
    //             city = res.city;
    //             latitude = res.latitude;
    //             longitude = res.longitude;

    //             that.setData({
    //                 city: res.city
    //             })
    //         },
    //         fail: function (err) {
    //             swan.showModal({
    //                 title: '设置中未赋予百度App位置权限',
    //             });

    //         }
    //     });

    // },
    showGoods: function () {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/item/' + id, //开发者服务器接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.info(res)
                that.setData({
                    goods: res.data.data,
                    nodes: res.data.data.introduce,
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    call: function () {
        swan.makePhoneCall({
            phoneNumber: '4001828278'
        });
    },
    search: function (e) {

        val = e.detail.value;
    },
    doSearch: function () {
        console.info(val)
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        // app.checkLogin(this);
        this.showGoods();
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