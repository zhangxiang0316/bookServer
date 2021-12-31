/**
 * create by zhangxiang on 2021-12-31 20:16
 * 类注释：
 * 备注：
 */


const getAspParas = (suffix,cur_url,urlParas) => {
  console.log(cur_url)
  console.log(urlParas)
  if (cur_url.indexOf("?") > 0) {
    return urlParas.substring(1, urlParas.indexOf(suffix)).split('-')
  } else {
    return cur_url.substring(cur_url.lastIndexOf("/") + 1, cur_url.indexOf(suffix)).split('-')
  }
}

function FonHen_UpData() {
  var n = param[2];
  var u = window.location.href;
  var arr_u = u.split("/");
  u = u.replace(arr_u[arr_u.length - 1], "");
  if (n == 0) {
    alert(unescape('\u5DF2\u7ECF\u662F\u7B2C\u4E00\u96C6\u4E86'));
  } else {
    var n = n - 1;
    window.location.href = "?" + param[0] + "-" + param[1] + "-" + n + ".html";
  }
}


function FonHen_NextData() {
  var n = param[2];
  var m = datas[1];
  var u = window.location.href;
  var arr_u = u.split("/");
  u = u.replace(arr_u[arr_u.length - 1], "");
  if (n == m) {
    alert(unescape('\u5DF2\u7ECF\u662F\u6700\u540E\u4E00\u96C6\u4E86'));
  } else {
    n++;
    window.location.href = "?" + param[0] + "-" + param[1] + "-" + n + ".html";
  }
}




const FonHen_JieMa = (u) => {
  let tArr = u.split("*");
  let str = '';
  for (let i = 1, n = tArr.length; i < n; i++) {
    str += String.fromCharCode(tArr[i]);
  }
  return str;
}

module.exports = {
  getAspParas,
  FonHen_JieMa
}
