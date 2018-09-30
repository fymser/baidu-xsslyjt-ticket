let app = getApp();
let type;
let _userId
Page({
    data: {
        isClick: 1,
        nodata: false,
        data: [],
    },
    onLoad(e) {
        type = e.type
    },
    onReady() {

    },

    onShow() {
        //   this.setData({
        //       nodata:true
        //   })

        let that = this;
        switch (type) {
            case "0":
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                            isClick:1,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                console.info("全部")
                break;
            case "1":
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&order_status=0&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                            isClick: 2,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                console.info("待支付")
                break;
            case "2":
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&order_status=1&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                            isClick: 3,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                console.info("已完成")
                break;
            case "3":
                this.setData({
                    isClick: 4,
                    nodata: true
                })
                console.info("售后")
                break;
            default:
                break;
        }

    },
    onHide() {
        // 页面隐藏
    },
    onUnload() {
        // 页面被关闭
    },
    onTitleClick() {
        // 标题被点击
    },
    onPullDownRefresh() {
        // 页面被下拉
    },
    onReachBottom() {
        // 页面被拉到底部
    },
    toPay(event) {
        console.info(event.currentTarget.dataset.id)
        my.tradePay({
            tradeNO: event.currentTarget.dataset.id,
            success: (res) => {
              
                if (res.resultCode == 9000) {
                    my.redirectTo({
                        url: '/pages/order_list/order_list?type=0'
                    })
                }
            },
        });
    },
    tapName(event) {
        let that = this;
        that.setData({
            data: []
        })
        switch (event.currentTarget.dataset.id) {
            case "1":
                console.info("11111")
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                break;
            case "2":
                console.info("22222")
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&order_status=0&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                break;
            case "3":
                my.httpRequest({
                    url: app.getUrl() + '/api/alipay/order/list?store_id=' + app.getStoreId() + '&order_status=1&user_id=' + app.getUserId(), // 目标服务器url
                    success: (e) => {

                        that.setData({
                            data: e.data.data,
                            nodata: false,
                        })
                        if (e.data.data.length == 0) {
                            this.setData({
                                nodata: true
                            })
                        }
                    },
                });
                break;
            default:
                this.setData({
                    nodata: true
                })
                break;
        }
        that.setData({
            data: [],
        })
        this.setData({
            isClick: event.currentTarget.dataset.id
        })
        console.info(event.currentTarget.dataset.id)
    }
});