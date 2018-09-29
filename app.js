const httpUrl = 'https://api.xsslyjt.com';
// const httpUrl = 'http://localhost:9191';
const storeId = 1779;
App({
    onLaunch(event) {
    },
    onShow(event) {
    },
    globalData: {
    },
    getStoreId() {
        return storeId;
    },
    getHttpUrl() {
        return httpUrl;
    },
    //检查是否登录
    checkLogin(obj, callback) {
        swan.getStorage({
            key: 'userInfo',
            success: function (res) {
                if (res.data === '') {
                    swan.navigateTo({
                        url: '/pages/login/login'
                    });
                } else {
                    obj.setData({
                        userInfo: res.data
                    });
                    if (callback !== undefined) {
                        callback();
                    }
                }
            },
            fail: function () {
                swan.navigateTo({
                    url: '/pages/login/login'
                });
            }
        });
    },
});