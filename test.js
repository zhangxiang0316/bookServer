"use strict";
$(function () {
    function e(e) {
        var t = Math.floor(e / 3600), a = Math.floor((e - 3600 * t) / 60), i = Math.floor(e - 3600 * t - 60 * a);
        return t = t < 10 ? "0" + t : t, a = a < 10 ? "0" + a : a, i = i < 10 ? "0" + i : i, "00" == t ? a + ":" + i : t + ":" + a + ":" + i
    }

    function t(e, t, a, i) {
        var n = e.findIndex(a);
        n >= 0 && e.splice(n, 1), e.unshift(t), i && e.length > i && e.pop()
    }

    function a(e) {
        var a = JSON.parse(localStorage.getItem(y)) || [];
        t(a, e, function (t) {
            return e.code === t.code
        }, g), localStorage.setItem(y, JSON.stringify(a))
    }

    var i = $("#audio")[0],
        n = $(".play-rate li", parent.document),
        r = $(".player-play", parent.document),
        o = $(".player-pause", parent.document),
        d = $(".p-run", parent.document),
        c = ($(".player-volume", parent.document), $(".player-current-time", parent.document)),
        l = $(".player-duration-time", parent.document),
        s = $(".player-progress-control", parent.document),
        p = $(".player-progress-position", parent.document),
        u = $(".player-volume-progress", parent.document),
        m = $(".player-volume-position", parent.document),
        v = s.parent(),
        f = {},
        y = "__play__",
        g = 100,
        h = parent.location.pathname,
        x = h.substring(1),
        b = x.split("/"),
        w = b[1],
        T = b[2],
        k = !1,
        O = "",
        U = JSON.parse(localStorage.getItem(y)) || [];
    $.ajax({
        url: "/web/index/xsDetail", type: "get", data: {code: w}, dataType: "json", success: function (t) {
            if (200 == t.code) {
                var l = t.data;
                if (O = l.name, -1 === l.editStatus || 5 === l.editStatus)
                    return alert("本音频已下架，即将返回小说列表~"),
                        void (parent.location.href = "/list/" + w);
                $.ajax({
                    url: "/web/index/video_new",
                    type: "get",
                    data: {code: w, no: T, type: 0},
                    dataType: "json",
                    success: function (t) {
                        if (201 === t.code) return alert("本集不存在或地址改变，即将返回小说列表~"), void (parent.location.href = "/list/" + w);

                        if (T = t.data.no, k = t.data.isLast, t.data.videoUrl.indexOf("ysts8.com") > -1) {
                            var y = t.data.videoUrl.substring(7),
                                g = y.split("/"),
                                x = g[0].replace(/180/g, "177"),
                                C = x.replace(/ysts8.com/g, "5txs.net");
                            g.splice(0, 1);
                            var j = g.join("/"), _ = "http://" + C + "/" + j;
                            _.indexOf("甄�执�") > -1
                                ? _ = _.replace("甄�执�", "甄嬛传")
                                : _.indexOf("・") > -1 && (_ = _.replace("・", "·")),
                                $("#audio").attr("src", _), i.play()
                        } else if (t.data.videoUrl.indexOf("kiohhb.meiwenfen.com") > -1) {
                            var I = t.data.videoUrl.replace(/kiohhb/g, "kiohhbf");
                            $("#audio").attr("src", I), i.play()
                        } else if (t.data.videoUrl.indexOf("meiwenfen.com") > -1) {
                            var S = t.data.videoUrl.replace(/tingmp3/g, "tingmp33");
                            $("#audio").attr("src", S)
                        } else if (t.data.videoUrl.indexOf("5txs.net:8000") > -1) {
                            var R = t.data.videoUrl.replace(/http:/g, "https:"),
                                q = R.replace(/5txs.net:8000/g, "tt56w.com");
                            $("#audio").attr("src", q)
                        } else if (t.data.videoUrl.indexOf("tt56w.com:8000") > -1) {
                            var M = t.data.videoUrl.replace(/http:/g, "https:"),
                                L = M.replace(/tt56w.com:8000/g, "tt56w.com");
                            $("#audio").attr("src", L)
                        } else if (t.data.videoUrl.indexOf("tt56w.com") > -1) {
                            var E = t.data.videoUrl.replace(/http:/g, "https:");
                            $("#audio").attr("src", E)
                        } else {
                            if (t.data.videoUrl.indexOf("甄�执�") > -1) {
                                var J = t.data.videoUrl.replace("甄�执�", "甄嬛传");
                                $("#audio").attr("src", J)
                            } else if (t.data.videoUrl.indexOf("・") > -1) {
                                var N = t.data.videoUrl.replace("・", "·");
                                $("#audio").attr("src", N)
                            } else $("#audio").attr("src", t.data.videoUrl);
                            i.play()
                        }
                        i.play(), i.paused ? (i.pause(), r.css("display", "inline-block"), o.css("display", "none"), d.removeClass("playing")) : (i.play(), r.css("display", "none"), o.css("display", "inline-block"), d.addClass("playing")), f = Object.assign({}, l, {
                            listId: t.data.id,
                            no: t.data.no,
                            title: t.data.title,
                            videoUrl: t.data.videoUrl
                        }), a(Object.assign(f, {ctime: 0})), i.volume = localStorage.getItem("volume") || .6, m.width(u.width() * i.volume), i.playbackRate = localStorage.getItem("playbackRate") || 1, .75 == i.playbackRate ? n.eq(0).addClass("active").siblings().removeClass("active") : 1 == i.playbackRate ? n.eq(1).addClass("active").siblings().removeClass("active") : 1.25 == i.playbackRate ? n.eq(2).addClass("active").siblings().removeClass("active") : 1.5 == i.playbackRate ? n.eq(3).addClass("active").siblings().removeClass("active") : 1.75 == i.playbackRate ? n.eq(4).addClass("active").siblings().removeClass("active") : 2 == i.playbackRate && n.eq(5).addClass("active").siblings().removeClass("active"), $("#audio").error(function () {
                            alert("资源可能失效，你可以刷新页面试一试，如果还不行请点击资源报错，我们会尽快处理！")
                        });
                        var D = h.indexOf("ct") > 0 ? b[3].substring(2) : 0;
                        0 !== U.length && h.indexOf("ct") > 0 && (i.currentTime = D, c.text(e(i.currentTime)), s.css("left", i.currentTime / i.duration * v.width()), p.width(i.currentTime / i.duration * v.width())), $(".episode-name", parent.document).text(O + " — " + t.data.title), document.title = "正在播放_" + O + "_" + t.data.title + "_有声小说_在线收听_六月听书网", $(".bread-episode", parent.document).text(t.data.title),
                            $(".player-play").on("click", function () {
                            $(".p-run").addClass("playing")
                        }), $(".player-pause").on("click", function () {
                            $(".p-run").removeClass("playing")
                        })
                    }
                })
            }
        }
    }), $(".player-prev", parent.document).click(function () {
        if (1 == T) return void alert("已经是第一集了~");
        $.ajax({
            url: "/web/index/video_new",
            type: "get",
            data: {code: w, no: T, type: 1},
            dataType: "json",
            success: function (e) {
                e.data.no && (parent.location.href = "/play/" + w + "/" + e.data.no)
            }
        })
    }), $(".player-next", parent.document).click(function () {
        if (k) return void alert("已经是最后一集了");
        $.ajax({
            url: "/web/index/video_new",
            type: "get",
            data: {code: w, no: T, type: 2},
            dataType: "json",
            success: function (e) {
                e.data.no && (parent.location.href = "/play/" + w + "/" + e.data.no)
            }
        })
    }), i.addEventListener("ended", function () {
        if (k) return void alert("已经是最后一集了");
        $.ajax({
            url: "/web/index/video_new",
            type: "get",
            data: {code: w, no: T, type: 2},
            dataType: "json",
            success: function (e) {
                e.data.no && (parent.location.href = "/play/" + w + "/" + e.data.no)
            }
        })
    }), r.on("click", function () {
        i.play(), r.css("display", "none"), o.css("display", "inline-block"), d.addClass("playing"), clearInterval(void 0), setInterval(function () {
            a(Object.assign(f, {ctime: Math.floor(i.currentTime)}))
        }, 1e3)
    }), o.on("click", function () {
        clearInterval(void 0), i.pause(), r.css("display", "inline-block"), o.css("display", "none"), d.removeClass("playing")
    }), $(".backward", parent.document).click(function () {
        i.currentTime - 15 >= 0 ? (i.currentTime = i.currentTime - 15, c.text(e(i.currentTime)), s.css("left", i.currentTime / i.duration * v.width()), p.width(i.currentTime / i.duration * v.width())) : (i.currentTime = 0, c.text(e(0)), s.css("left", "0px"), p.width(0))
    }), $(".forward", parent.document).click(function () {
        i.currentTime + 15 <= i.duration ? (i.currentTime = i.currentTime + 15, c.text(e(i.currentTime)), s.css("left", i.currentTime / i.duration * v.width()), p.width(i.currentTime / i.duration * v.width())) : (i.currentTime = i.duration, c.text(e(i.duration)), s.css("left", i.duration), p.width(i.duration))
    }), i.addEventListener("loadedmetadata", function () {
        l.text(e(i.duration))
    }), i.addEventListener("timeupdate", function () {
        c.text(e(i.currentTime)), s.css("left", i.currentTime / i.duration * v.width()), p.width(i.currentTime / i.duration * v.width())
    }), i.oncanplay = function () {
        clearInterval(void 0), setInterval(function () {
            a(Object.assign(f, {ctime: Math.floor(i.currentTime)}))
        }, 1e3)
    }
});