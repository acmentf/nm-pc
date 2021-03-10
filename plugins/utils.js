/*
 * @Author: FeikeQ
 * @Date: 2020-12-24 15:03:19
 * @LastEditTime: 2021-01-11 11:36:14
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/plugins/utils.js
 * @Description: 公共JS函数库
 */
export default {
    /**
     * 匹配文本中的url
     * @param {string} str
     * @return {array}
     */
    matchUrl(str) {
        if (typeof str !== "string") {
            return [];
        }
        return (
            str.match(
                /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
            ) || []
        );
    },
    // 判断是否为 Array 数组
    isArray: function (obj) {
        return toString.apply(obj) === "[object Array]";
    },
    // 判断是否为 Object 对象
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    },
    trim: function (text) {
        return (text || "").replace(/^\s+|\s+$/g, "");
    },
    // 将JSON数组对象转成字符串参数 params 查询字符串 例 a=1&b=2
    params: function (json) {
        return Object.keys(json)
            .map(function (key) {
                return (
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(json[key])
                );
            })
            .join("&");
    },
    // 拼接地址链接URL的参数（检查 url 链接是否已经有参数，添加 ？问号 或 & 与号）
    addQueryString: function (url, query) {
        var separator = url.indexOf("?") != -1 ? "&" : "?";
        url += separator + query;
        return url;
    },
    // 秒钟转为00:00格式
    realFormatSecond: function (second) {
        var secondType = typeof second;
        if (secondType === "number" || secondType === "string") {
            second = parseInt(second);
            var mimute = Math.floor(second / 60);
            second = second - mimute * 60;
            var _addZero_mimute = mimute < 10 ? "0" + mimute : mimute;
            return _addZero_mimute + ":" + ("0" + second).slice(-2);
        } else {
            return "00:00";
        }
    },
    // 时间戳转化成日期格式
    timestamp2time: function (timestr) {
        var now = new Date(timestr * 1),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return (
            y +
            "-" +
            (m < 10 ? "0" + m : m) +
            "-" +
            (d < 10 ? "0" + d : d) +
            " " +
            now.toTimeString().substr(0, 8)
        );
    },
    /*
      时间戳格式化
      console.log("2020-11-24 15:20:33",formatime('1396555440000', "yyyy-MM-dd hh:mm:ss.S"));
      console.log('14-4-4 4:4:0.0',formatime(new Date('2014-04-04 04:04').getTime(), "YYYY-M-d h:m:s.S"));
      console.log('2020年第4季度11月24日15小时24分18秒694毫秒星期二',formatime(Date.now(), "yyyy年第q季度MM月dd日hh小时mm分ss秒S毫秒W"))
  */
    formatime: function (timestamp, str) {
        var now = new Date(timestamp * 1);
        var o = {
            "Y+": now.getFullYear().toString(), // 年
            "M+": now.getMonth() + 1, //month 月份
            "d+": now.getDate(), //day 日
            "h+": now.getHours(), //hour 小时
            "m+": now.getMinutes(), //minute 分
            "s+": now.getSeconds(), //second 秒
            "q+": Math.floor((now.getMonth() + 3) / 3), //quarter 季度
            S: now.getMilliseconds(), //millisecond 毫秒
            W: new Array(
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六"
            )[now.getDay()]
        };
        if (/(y+)/.test(str))
            str = str.replace(
                RegExp.$1,
                (now.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        for (var k in o)
            if (new RegExp("(" + k + ")").test(str))
                str = str.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
        return str;
    },

    // Cookie操作:获取、设置、删除
    appCookie: function (c_name, value, expireday, path, domain) {
        var COOKIE = window.document.cookie;
        if (value) {
            //setCookie + delCookie
            if (expireday < 0) value = "";
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expireday);
            var _tmp =
                c_name +
                "=" +
                encodeURIComponent(value) +
                (expireday == null ? "" : "; expires=" + exdate.toGMTString()) +
                (path == null ? "" : "; path=" + path) +
                (domain == null ? "" : "; domain=" + domain);

            window.document.cookie =
                c_name +
                "=" +
                encodeURIComponent(value) +
                (expireday == null ? "" : "; expires=" + exdate.toGMTString()) +
                (path == null ? "" : "; path=" + path) +
                (domain == null ? "" : "; domain=" + domain);
        } else {
            //getCookie
            if (COOKIE.length > 0) {
                var c_start = COOKIE.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = COOKIE.indexOf(";", c_start);
                    if (c_end == -1) c_end = COOKIE.length;
                    return decodeURIComponent(COOKIE.substring(c_start, c_end));
                }
            }
            return null;
        }
        return true;
    },

    getCookieArray: function (cookiestr) {
        var _cookiestr =
            cookiestr || (process.browser ? window.document.cookie : false);
        if (!_cookiestr) return {};
        var arr = _cookiestr.split(";");
        var _temp = {};
        for (var i = 0; i < arr.length; i++) {
            var t = arr[i].split("=");
            var key = t[0].replace(/(^\s*)|(\s*$)/g, "");
            var val = t[1];
            _temp[key] = decodeURIComponent(val);
        }
        return _temp;
    },
    //将后台数据转化成table使用的数据
    renderToTableData: function (KEY, VALUE) {
        let tableData = [];
        VALUE.forEach(item => {
            let obj = {}
            item.forEach((_item, _index) => {
                obj[KEY[_index]] = _item
            })
            tableData.push(obj)
        })
        // tableData.map(item => {
        //     for (let i in item) {
        //         if (!isNaN(parseFloat(item[i]))) {
        //             item[i] = parseFloat(item[i])
        //         }
        //     }
        // })
        return tableData;
    }
};
