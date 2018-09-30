const app = getApp();
let arr = [];
let latitude;
let longitude;
let city;
let page = 1;
let val;
Page({
    data: {
        imgs: [],
        city: "",
        goods: [],
        cityList:[],
        showCity:"2",
        noMore:1,
    },
    onLoad: function () {
        //监听页面加载的生命周期函数
        this.getAddr();
    },
    getAddr: function () {
        let that = this;
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
            fail: function (err) {
                swan.showModal({
                    title: '设置中未赋予百度App位置权限',
                });

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
    setCity:function(e){
        console.info(e)
        city = e.currentTarget.dataset.city
        this.setData({
            city:e.currentTarget.dataset.city,
            showCity:"2",
        })
        this.setData({
             goods: [],
        })
        this.showList(1,city)
    },
    showList: function (_page,_city) {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/shop/get_shops_by_location', //开发者服务器接口地址
            data: {
                store_id: "1779",
                location: _city,
                latitude: latitude,
                longitude: longitude,
                page: _page
            },
            success: function (res) {
                let obj = [];
                obj = that.data.goods;
                for(let i = 0 ;i<res.data.data.length;i++){
                    obj.push(res.data.data[i]);
                }
                that.setData({
                    goods: obj,
                    noMore:"1"
                })
                if(res.data.data.length==0){
                    that.setData({
                        noMore:"2"
                    })
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });

    },
    search:function(e){
    //  城市:
        val = e.detail.value;
    },
    
    doCity: function () {
        page = 1;
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/transportation/area/cities', //开发者服务器接口地址
            success: function (res) {
                let nimei = res.data.data
                console.info(nimei);
                that.setData({
                    cityList:res.data.data,
                    showCity:1,
                    noMore:"1",
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    doSearch: function () {
        let that = this;
        page = 1
        swan.request({
            url: 'https://api.xsslyjt.com/api/shop/get_shops_by_location', //开发者服务器接口地址
            data: {
                store_id: "1779",
                location: city,
                latitude: latitude,
                longitude: longitude,
                page: page,
                name:val,
            },
            success: function (res) {
                
                that.setData({
                    goods: res.data.data,
                    
                })
                if(res.data.data.length==0){
                    that.setData({
                        noMore:"2"
                    })
                }
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
        // app.checkLogin(this);
        this.showBanner();
        this.showList(1,city);
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
       this.showList(page,city)
      

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});