const app = getApp();
let arr = [];
let latitude = '29.607857';
let longitude = '106.503971';
let city = '重庆市';
let page = 1;
let val;
let isSearch = false;
Page({
    data: {
        imgs: [],
        city: "重庆市",
        goods: [],
        cityList: [],
        showCity: "2",
        noMore: 1,
    },
    onLoad: function () {
        //监听页面加载的生命周期函数
        this.showBanner();
        this.getAddr();
    },
    getAddr: function () {
        let that = this;
        swan.authorize({
            scope: 'scope.userLocation',
            success: function () {
                swan.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        city = res.city;
                        latitude = res.latitude;
                        longitude = res.longitude;
                        that.setData({
                            city: res.city
                        })
                    },
                    complete() {
                        that.showList(1, that.data.city)
                    }
                });
            },
            fail() {
                that.showList(1, that.data.city)
            }
        });
    },
    showBanner: function () {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/component_slide_show/59435', //开发者服务器接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {

                for (let i = 0; i < res.data.data.length; i++) {
                    arr.push(res.data.data[i].imageUrl)
                }

                that.setData({
                    imgs: arr
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    setCity: function (e) {
        console.info(e)
        city = e.currentTarget.dataset.city
        this.setData({
            city: e.currentTarget.dataset.city,
            showCity: "2",
        })
        this.setData({
            goods: [],
        })
        this.showList(1, city)
    },
    showList: function (_page, _city) {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/shop/get_shops_by_location', //开发者服务器接口地址
            data: {
                store_id: app.getStoreId(),
                location: _city,
                latitude: latitude,
                longitude: longitude,
                page: _page
            },
            success: function (res) {
                let obj = [];
                obj = that.data.goods;
                for (let i = 0; i < res.data.data.length; i++) {
                    obj.push(res.data.data[i]);
                }
                that.setData({
                    goods: obj
                })
                if (res.data.data.length == 0) {
                    that.setData({
                        noMore: "2"
                    })
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });

    },
    search: function (e) {
        //  城市:
        val = e.detail.value;
        page = 1
        this.setData({
            goods:[],
        })
    },
    doCity: function () {

        page = 1;
        let that = this;
        that.setData({
            showCity: 1,
            showloade: 1,
        })
        swan.request({
            url: 'https://api.xsslyjt.com/api/transportation/area/cities', //开发者服务器接口地址
            success: function (res) {

                console.info(res)
                if (res.statusCode == 200) {
                    that.setData({
                        cityList: res.data.data,
                        showloade: 2,
                        noMore: "1",
                    })
                }

            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    doSearch: function () {
        console.info(val)
        isSearch = true;
        let that = this;
        
        console.info(page)
        swan.request({
            url: 'https://api.xsslyjt.com/api/shop/get_shops_by_location', //开发者服务器接口地址
            data: {
                store_id: "1779",
                location: city,
                latitude: latitude,
                longitude: longitude,
                page: page,
                name: val,
            },
            success: function (res) {
                let obj = [];
                obj = that.data.goods;
                for (let i = 0; i < res.data.data.length; i++) {
                    obj.push(res.data.data[i]);
                }
                that.setData({
                    goods: obj,
                    noMore: "3"
                })
                
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
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

        page++;

        if (isSearch) {
            this.doSearch()
        } else {
            this.showList(page, city)
        }

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});