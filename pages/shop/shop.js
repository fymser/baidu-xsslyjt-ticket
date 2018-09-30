const app = getApp();
let latitude;
let longitude;
let phone;
let id;
Page({
    data: {
        nodes: "<img src='http://pic4.40017.cn/scenery/destination/2017/03/07/16/VwcNiR.jpg'></img><br>重庆亲子游览年票相关说明<br>1、使用前张贴本人一寸近照，防伪标和照片章损坏本年票将不能再使用，详见下面照片张贴说明，购买年票时可拨打年卡表面电话查询年票真伪。<br>2、本年票包含项目的使用时间和次数各异，使用前务必阅读使用手册，以使用手册注明的使用规定为准。<br>3、本年票在2018年5月7日-2018年12月31日内有效（详见各商家介绍），发行单位所投意外险保额有限，请扫描封底二维码投保！保险解释权归保险公司。建议持卡人自行购买保险。发行一人一卡，不得转借，遗失不补。<br>4、使用时向商家出示本卡，商家工作人员核对照片，检查防伪膜完好，利用检票机扫描本卡无误后方可进行消费。<br>5、使用前请张贴本人一寸近照，如有冒用或更换照片，商家或年票工作人员有权在系统内取消该年票的使用资格，并没收年票。<br>6、本年票一经售出，不可退换，遗失或人为损坏不可补办。<br>7、每个商家情况不同，有时会出现活动或维修设备等情况导致暂时无法使用，因此建议使用前咨询商家。<br>8、使用手册中的项目图片仅供参考，以实物为准。<h4></h4><img src='http://pic4.40017.cn/scenery/destination/2017/03/07/16/AedXhv.jpg'></img><br>照片张贴说明<br>1、年票上的照片章和防伪标为易损标志，请注意保护。 2、张贴年票上的防伪膜请一次性贴好，不能二次掀开。 3、擅自掀开防伪膜会导致照片章和防伪标破损，无法还原。 4、任何破坏防伪膜、照片章、防伪标的行为将会造成年票不能正常使用。<br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/01/000/cc/4e/rBLkBVrvxW-AKeZDAALDc-kMeVM652.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/02/001/cc/55/rBLkCVrvxcaASXXfAAF9bemQ1rQ236.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/02/000/cc/55/rBLkCVrvxeaAAppoAAKUJ2L5Hnk172.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/02/001/cc/55/rBLkCFrvxh-AaX2YAAHGp91fTPc667.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/02/001/cc/55/rBLkCFrvxc6AcIqyAAIVp7fqElg310.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/01/001/cc/4e/rBLkBlrvxXKALEFbAAHRTv1w55g992.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/01/000/cc/4e/rBLkBVrvxhyAM_IkAAJJN0wJndo054.jpg'></img><br><h4>部分景区图片</h4><img src='http://pic5.40017.cn/02/001/cc/55/rBLkCVrvxbKARAcDAAKJJIwHN0o294.jpg'></img><br><h4>更多景区见预定须知目录表格。</h4>",
        imgs: [],
        goods: [],
        detail: {},
        id: 0
    },
    onLoad: function (e) {
        //监听页面加载的生命周期函数
        this.setData({
            id: e.id
        })
    },
    call: function () {
        swan.makePhoneCall({
            phoneNumber: phone,//仅为示例，并非真实的电话号码
        });
    },
    go: function () {
        swan.getLocation({
            type: 'gcj02',
            success: function (res) {
                swan.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 18
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    showShop: function (e) {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/shop/detail?id=' + that.data.id, //开发者服务器接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {

                phone = res.data.data.telephone;

                latitude = res.data.data.latitude
                longitude = res.data.data.longitude
                that.setData({
                    detail: res.data.data
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    showList: function () {
        let that = this;
        swan.request({
            url: 'https://api.xsslyjt.com/api/item/getItemsByShopId?shopId=' + that.data.id, //开发者服务器接口地址

            success: function (res) {
                console.info(res)
                that.setData({
                    goods: res.data.data
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
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
        this.showList();
        this.showShop();
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