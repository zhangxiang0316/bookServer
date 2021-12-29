function FonHen_JieMa(u) {
    var tArr = u.split("*");
    var str = '';
    for (var i = 1, n = tArr.length; i < n; i++) {
        str += String.fromCharCode(tArr[i]);
    }
    return str;
}


function viewplay() {
    if (datas[2] === 'tudou') {
        fonhen_tudou_player(part, datas[0]);
    } else {
        fonhen_jplayer_player(part, datas[0]);
    }
}

function fonhen_tudou_player(title, url) {
    var html = '<iframe id="fonhen_tudou_player" src="" width="100%" height="80" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" style="display:block;"></iframe>';
    $('#fonhen-player').after(html);
    var api = '/player/getcode.php?id=' + url;
    $.ajax({
        url: api,
        dataType: 'json',
        success: function (d) {
            if (d.code) {
                $('#fonhen_tudou_player').attr('src', 'http://www.tudou.com/programs/view/html5embed.action?code=' + d.code + '&autoPlay=true&playType=AUTO');
            } else {
                $('#fonhen_tudou_player').attr('src', 'http://www.tudou.com/v/' + url);
            }
        },
        error: function () {
            $('#fonhen_tudou_player').attr('src', 'http://www.tudou.com/v/' + url);
        }
    });


}

function fonhen_jplayer_player(title, url) {
    var html = '<div id="fonhen-player-box" class="fonhen-player-box"><div class="fonhen-player-btn"><span class="jp-play"></span><span class="jp-pause"></span></div><div class="fonhen-player-info"><div class="fonhen-player-text"><div class="fonhen-player-title">正在播放：' + title + '</div><div class="fonhen-player-time"><span class="jp-current-time" role="timer" aria-label="time"></span> / <span class="jp-duration" role="timer" aria-label="duration"></span></div></div><div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div></div></div>';

    $('#fonhen-player').after(html);

    $("#fonhen-player").jPlayer({
        /*
        ready: function(event){
            $(this).jPlayer("setMedia",{
                mp3: url,
                m4a: url
            }).jPlayer('play');
        },
        */
        swfPath: "/player",
        supplied: "mp3,m4a",
        useStateClassSkin: true,
        cssSelectorAncestor: '#fonhen-player-box'
    });

    if (datas[2] === 'tc') {
        //url = url.split('/');
        //url = url[0]+'/'+url[1]+'/play_'+url[1]+'_'+url[2]+'.htm';
        //console.log('tc',url);
        //url = datas2[1];
        ajaxLoadData('/player/key.php', {url: url});
    } else {
        console.log('else', url);
        $("#fonhen-player").jPlayer("setMedia", {mp3: url, m4a: url}).jPlayer('play');
    }

    //播放完成后事件执行
    $("#fonhen-player").on($.jPlayer.event.ended, function (e) {
        FonHen_NextData();
    });

    //监听加载失败事件
    $("#fonhen-player").on($.jPlayer.event.error, function (e) {
        if (datas2 !== '') {
            datas2 = FonHen_JieMa(datas2).split('&');
            if (datas[2] === 'tc') {
                //url = datas2[0].split('/');
                //url = url[0]+'/'+url[1]+'/play_'+url[1]+'_'+url[2]+'.htm';
                //console.log('JiemaUrl:',url);
                //url = datas2[0];
                ajaxLoadData('/player/key.php', {url: url});
            } else {
                url = datas2[0];
                $("#fonhen-player").jPlayer("setMedia", {mp3: url, m4a: url}).jPlayer('play');
            }

            datas2 = ''; //防止一直加载出错,陷入死循环
        }
    });


}

function ajaxLoadData(url, data) {
    console.log(data);
    $.ajax({
        url: 'https://www.gushiciju.com' + url,
        data: data,
        dataType: 'json',
        type: 'get',
        success: function (data) {
            if (data.url) {
                console.log('Ajax:', data.url);
                $("#fonhen-player").jPlayer("setMedia", {
                    mp3: data.url,
                    m4a: data.url.replace('t44.', 't33.')
                }).jPlayer('play');
            }
        }
    });
}

function getAspParas(suffix) {
    var cur_url = location.href;
    var urlParas = location.search;
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
