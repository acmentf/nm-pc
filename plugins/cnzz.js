/*
 * @Author: FeikeQ
 * @Date: 2021-02-06 10:57:59
 * @LastEditTime: 2021-03-02 15:27:07
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/plugins/cnzz.js
 * @Description: 站长统计
 */

/*
** 只在生产模式的客户端中使用
*/
if (process.client && process.env.NODE_ENV === 'production') {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://v1.cnzz.com/z_stat.php?id=1279722697&web_id=1279722697";
    hm.id = "cnzz_tj_byfk";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  if (process.client && process.env.NODE_ENV === 'production') {
    router.afterEach((to, from) => {
      var _hmt = _hmt || [];
      (function () {
        document.getElementById('cnzz_tj_byfk') && document.getElementById('cnzz_tj_byfk').remove();
        var hm = document.createElement("script");
        hm.src = "https://v1.cnzz.com/z_stat.php?id=1279673653&web_id=1279673653";
        hm.id = "cnzz_tj_byfk";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    })
  }
}
