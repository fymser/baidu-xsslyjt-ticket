const app = getApp();
Page({
    data: {
    },
    onLoad: function () {
        //监听页面加载的生命周期函数
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
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
    authorize() {
        swan.login({
            success: function (login) {
                swan.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        swan.showLoading({
                            title: '授权中...'
                        });
                        swan.getUserInfo({
                            success(userInfo) {
                                swan.request({
                                    url: app.getHttpUrl() + '/api/baidu/login?storeId=' + app.getStoreId() + '&code=' + login.code,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    method: 'POST',
                                    data: userInfo,
                                    success: function (res) {
                                        if (res.statusCode === 200) {
                                            if (res.data.errCode === 200) {
                                                swan.setStorageSync('sessionId', res.data.data);
                                                swan.setStorageSync('userInfo', userInfo.userInfo);
                                                swan.navigateBack();
                                            }
                                        }
                                    },
                                    complete() {
                                        swan.hideLoading();
                                    }
                                });
                            }
                        })
                    },
                    fail(err) {
                        swan.showToast({
                            title: '授权失败'
                        });
                    }
                });
            },
            fail: function (err) {
                swan.showToast({
                    title: '授权失败'
                });
            }
        });
    }
});