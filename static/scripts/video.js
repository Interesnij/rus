if (! function(t) {
        function r() {}
        r.dumy = document.createElement("div"), r.trim = function(e) {
            return e.replace(/\s/gi, "")
        }, r.trimAndFormatUrl = function(e) {
            return e = (e = e.toLocaleLowerCase()).replace(/ /g, "-")
        }, r.storArrayBasedOnObjectValue = function(e, t) {
            e.sort(function(s) {
                var o = 1;
                "-" === s[0] && (o = -1, s = s.substr(1));
                return function(e, t) {
                    return (e[s] < t[s] ? -1 : e[s] > t[s] ? 1 : 0) * o
                }
            }(t))
        }, r.getCookie = function(e) {
            for (var t = e + "=", s = document.cookie.split(";"), o = 0; o < s.length; o++) {
                for (var i = s[o];
                    " " == i.charAt(0);) i = i.substring(1, i.length);
                if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
            }
            return null
        }, r.hexToRgb = function(e) {
            e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, s, o) {
                return t + t + s + s + o + o
            });
            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return "rgb(" + (t = t ? {
                r: parseInt(t[1], 16),
                g: parseInt(t[2], 16),
                b: parseInt(t[3], 16)
            } : null).r + "," + t.g + "," + t.b + ")"
        }, r.splitAndTrim = function(e, t) {
            for (var s = e.split(","), o = s.length, i = 0; i < o; i++) t && (s[i] = r.trim(s[i]));
            return s
        }, r.checkTime = function(e) {
            return !!/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(e)
        }, r.formatTimeWithMiliseconds = function(e) {
            var t = 60 * parseInt(e.split(":")[0]) * 60 + 60 * parseInt(e.split(":")[1]) + parseInt(e.split(":")[2]) + parseInt(e.split(",")[1] || e.split(".")[1]) / 1e3;
            return t = Math.round(100 * t) / 100
        }, r.formatTime = function(e, t) {
            var s = Math.floor(e / 3600),
                o = e % 3600,
                i = Math.floor(o / 60),
                l = o % 60,
                n = Math.ceil(l);
            return i = 10 <= i ? i : "0" + i, n = 10 <= n ? n : "0" + n, isNaN(n) ? "00:00" : s || t ? "0" + s + ":" + i + ":" + n : i + ":" + n
        }, r.MD5 = function(e) {
            function r(e, t) {
                return e << t | e >>> 32 - t
            }

            function d(e, t) {
                var s, o, i, l, n;
                return i = 2147483648 & e, l = 2147483648 & t, n = (1073741823 & e) + (1073741823 & t), (s = 1073741824 & e) & (o = 1073741824 & t) ? 2147483648 ^ n ^ i ^ l : s | o ? 1073741824 & n ? 3221225472 ^ n ^ i ^ l : 1073741824 ^ n ^ i ^ l : n ^ i ^ l
            }

            function t(e, t, s, o, i, l, n) {
                var a;
                return e = d(e, d(d((a = t) & s | ~a & o, i), n)), d(r(e, l), t)
            }

            function s(e, t, s, o, i, l, n) {
                var a;
                return e = d(e, d(d(t & (a = o) | s & ~a, i), n)), d(r(e, l), t)
            }

            function o(e, t, s, o, i, l, n) {
                return e = d(e, d(d(t ^ s ^ o, i), n)), d(r(e, l), t)
            }

            function i(e, t, s, o, i, l, n) {
                return e = d(e, d(d(s ^ (t | ~o), i), n)), d(r(e, l), t)
            }

            function l(e) {
                var t, s = "",
                    o = "";
                for (t = 0; t <= 3; t++) s += (o = "0" + (e >>> 8 * t & 255).toString(16)).substr(o.length - 2, 2);
                return s
            }
            var n, a, u, h, c, _, f, p, m, b = Array();
            for (b = function(e) {
                    for (var t, s = e.length, o = s + 8, i = 16 * (1 + (o - o % 64) / 64), l = Array(i - 1), n = 0, a = 0; a < s;) n = a % 4 * 8, l[t = (a - a % 4) / 4] = l[t] | e.charCodeAt(a) << n, a++;
                    return n = a % 4 * 8, l[t = (a - a % 4) / 4] = l[t] | 128 << n, l[i - 2] = s << 3, l[i - 1] = s >>> 29, l
                }(e = function(e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", s = 0; s < e.length; s++) {
                        var o = e.charCodeAt(s);
                        o < 128 ? t += String.fromCharCode(o) : (127 < o && o < 2048 ? t += String.fromCharCode(o >> 6 | 192) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128)), t += String.fromCharCode(63 & o | 128))
                    }
                    return t
                }(e)), _ = 1732584193, f = 4023233417, p = 2562383102, m = 271733878, n = 0; n < b.length; n += 16) _ = t(a = _, u = f, h = p, c = m, b[n + 0], 7, 3614090360), m = t(m, _, f, p, b[n + 1], 12, 3905402710), p = t(p, m, _, f, b[n + 2], 17, 606105819), f = t(f, p, m, _, b[n + 3], 22, 3250441966), _ = t(_, f, p, m, b[n + 4], 7, 4118548399), m = t(m, _, f, p, b[n + 5], 12, 1200080426), p = t(p, m, _, f, b[n + 6], 17, 2821735955), f = t(f, p, m, _, b[n + 7], 22, 4249261313), _ = t(_, f, p, m, b[n + 8], 7, 1770035416), m = t(m, _, f, p, b[n + 9], 12, 2336552879), p = t(p, m, _, f, b[n + 10], 17, 4294925233), f = t(f, p, m, _, b[n + 11], 22, 2304563134), _ = t(_, f, p, m, b[n + 12], 7, 1804603682), m = t(m, _, f, p, b[n + 13], 12, 4254626195), p = t(p, m, _, f, b[n + 14], 17, 2792965006), _ = s(_, f = t(f, p, m, _, b[n + 15], 22, 1236535329), p, m, b[n + 1], 5, 4129170786), m = s(m, _, f, p, b[n + 6], 9, 3225465664), p = s(p, m, _, f, b[n + 11], 14, 643717713), f = s(f, p, m, _, b[n + 0], 20, 3921069994), _ = s(_, f, p, m, b[n + 5], 5, 3593408605), m = s(m, _, f, p, b[n + 10], 9, 38016083), p = s(p, m, _, f, b[n + 15], 14, 3634488961), f = s(f, p, m, _, b[n + 4], 20, 3889429448), _ = s(_, f, p, m, b[n + 9], 5, 568446438), m = s(m, _, f, p, b[n + 14], 9, 3275163606), p = s(p, m, _, f, b[n + 3], 14, 4107603335), f = s(f, p, m, _, b[n + 8], 20, 1163531501), _ = s(_, f, p, m, b[n + 13], 5, 2850285829), m = s(m, _, f, p, b[n + 2], 9, 4243563512), p = s(p, m, _, f, b[n + 7], 14, 1735328473), _ = o(_, f = s(f, p, m, _, b[n + 12], 20, 2368359562), p, m, b[n + 5], 4, 4294588738), m = o(m, _, f, p, b[n + 8], 11, 2272392833), p = o(p, m, _, f, b[n + 11], 16, 1839030562), f = o(f, p, m, _, b[n + 14], 23, 4259657740), _ = o(_, f, p, m, b[n + 1], 4, 2763975236), m = o(m, _, f, p, b[n + 4], 11, 1272893353), p = o(p, m, _, f, b[n + 7], 16, 4139469664), f = o(f, p, m, _, b[n + 10], 23, 3200236656), _ = o(_, f, p, m, b[n + 13], 4, 681279174), m = o(m, _, f, p, b[n + 0], 11, 3936430074), p = o(p, m, _, f, b[n + 3], 16, 3572445317), f = o(f, p, m, _, b[n + 6], 23, 76029189), _ = o(_, f, p, m, b[n + 9], 4, 3654602809), m = o(m, _, f, p, b[n + 12], 11, 3873151461), p = o(p, m, _, f, b[n + 15], 16, 530742520), _ = i(_, f = o(f, p, m, _, b[n + 2], 23, 3299628645), p, m, b[n + 0], 6, 4096336452), m = i(m, _, f, p, b[n + 7], 10, 1126891415), p = i(p, m, _, f, b[n + 14], 15, 2878612391), f = i(f, p, m, _, b[n + 5], 21, 4237533241), _ = i(_, f, p, m, b[n + 12], 6, 1700485571), m = i(m, _, f, p, b[n + 3], 10, 2399980690), p = i(p, m, _, f, b[n + 10], 15, 4293915773), f = i(f, p, m, _, b[n + 1], 21, 2240044497), _ = i(_, f, p, m, b[n + 8], 6, 1873313359), m = i(m, _, f, p, b[n + 15], 10, 4264355552), p = i(p, m, _, f, b[n + 6], 15, 2734768916), f = i(f, p, m, _, b[n + 13], 21, 1309151649), _ = i(_, f, p, m, b[n + 4], 6, 4149444226), m = i(m, _, f, p, b[n + 11], 10, 3174756917), p = i(p, m, _, f, b[n + 2], 15, 718787259), f = i(f, p, m, _, b[n + 9], 21, 3951481745), _ = d(_, a), f = d(f, u), p = d(p, h), m = d(m, c);
            return (l(_) + l(f) + l(p) + l(m)).toLowerCase()
        }, r.getSecondsFromString = function(e) {
            var t = 0,
                s = 0,
                o = 0;
            if (e) return "0" == (t = (e = e.split(":"))[0])[0] && "0" != t[1] && (t = parseInt(t[1])), "00" == t && (t = 0), "0" == (s = e[1])[0] && "0" != s[1] && (s = parseInt(s[1])), "00" == s && (s = 0), secs = parseInt(e[2].replace(/,.*/gi, "")), "0" == secs[0] && "0" != secs[1] && (secs = parseInt(secs[1])), "00" == secs && (secs = 0), 0 != t && (o += 60 * t * 60), 0 != s && (o += 60 * s), o += secs
        }, r.getCanvasWithModifiedColor = function(e, t, s, o, i) {
            if (e) {
                var l, n, a = document.createElement("canvas"),
                    r = a.getContext("2d"),
                    d = null,
                    u = parseInt(t.replace(/^#/, ""), 16),
                    h = u >>> 16 & 255,
                    c = u >>> 8 & 255,
                    _ = 255 & u;
                a.style.position = "absolute", a.style.left = "0px", a.style.top = "0px", a.style.margin = "0px", a.style.padding = "0px", a.style.maxWidth = "none", a.style.maxHeight = "none", a.style.border = "none", a.style.lineHeight = "1", a.style.backgroundColor = "transparent", a.style.backfaceVisibility = "hidden", a.style.webkitBackfaceVisibility = "hidden", a.style.MozBackfaceVisibility = "hidden", a.style.MozImageRendering = "optimizeSpeed", a.style.WebkitImageRendering = "optimizeSpeed", null == o && (o = e.width, i = e.height), a.width = o, a.height = i, r.drawImage(e, 0, 0, e.naturalWidth, e.naturalHeight, 0, 0, o, i), n = r.getImageData(0, 0, o, i), d = r.getImageData(0, 0, o, i);
                for (var f = 0, p = n.data.length; f < p; f += 4) 0 < d.data[f + 3] && (d.data[f] = n.data[f] / 255 * h, d.data[f + 1] = n.data[f + 1] / 255 * c, d.data[f + 2] = n.data[f + 2] / 255 * _);
                return r.globalAlpha = .5, r.putImageData(d, 0, 0), r.drawImage(a, 0, 0), s && ((l = new Image).src = a.toDataURL()), {
                    canvas: a,
                    image: l
                }
            }
        }, r.xmlToJson = function(e) {
            var t = {};
            if (1 == e.nodeType) {
                if (0 < e.attributes.length) {
                    t["@attributes"] = {};
                    for (var s = 0; s < e.attributes.length; s++) {
                        var o = e.attributes.item(s);
                        t["@attributes"][o.nodeName] = o.nodeValue
                    }
                }
            } else 3 == e.nodeType ? t = e.nodeValue.trim() : 4 == e.nodeType && (t = e.nodeValue);
            if (e.hasChildNodes())
                for (var i = 0; i < e.childNodes.length; i++) {
                    var l = e.childNodes.item(i),
                        n = l.nodeName;
                    if (void 0 === t[n]) t[n] = r.xmlToJson(l);
                    else {
                        if (void 0 === t[n].length) {
                            var a = t[n];
                            t[n] = [], t[n].push(a)
                        }
                        "object" == typeof t[n] && t[n].push(r.xmlToJson(l))
                    }
                }
            return t
        }, r.isIMA = function(e) {
            if (e.match(/doubleclick.net/gi)) return !0
        }, r.isURLEncoded = function(e) {
            try {
                if (decodeURIComponent(e) != e && -1 != e.indexOf("%")) return !0
            } catch (e) {}
            return !1
        }, r.getValidSource = function(e) {
            if (e) {
                var t = "null" == location.origin ? "" : location.origin,
                    s = location.pathname; - 1 != s.indexOf(".") && (s = s.substr(0, s.lastIndexOf("/") + 1)), -1 == e.indexOf("http:") && -1 == e.indexOf("https:") && !r.isLocal && (e = t + s + e);
                var o = e.substr(0, e.lastIndexOf("/") + 1);
                r.isURLEncoded(o) || (o = encodeURI(o));
                var i = e.substr(e.lastIndexOf("/") + 1);
                return e = o + (i = e.match(/\.mp3|\.mp4|\.m3u8|\.txt|\.srt|\.vtt|\.jpg|\.jpeg|\.png/gi) && !e.match(/\.s3|\drive.|dropbox|\?/gi) ? r.isURLEncoded(i) ? e.substr(e.lastIndexOf("/") + 1) : encodeURIComponent(e.substr(e.lastIndexOf("/") + 1)) : e.substr(e.lastIndexOf("/") + 1))
            }
        }, r.changeCanvasHEXColor = function(e, t, s, o, i, l) {
            if (e) {
                var n, a = (t = t).getContext("2d"),
                    r = null,
                    d = parseInt(s.replace(/^#/, ""), 16),
                    u = d >>> 16 & 255,
                    h = d >>> 8 & 255,
                    c = 255 & d;
                i || (i = e.width, l = e.height), t.width = i, t.height = l, a.drawImage(e, 0, 0, e.naturalWidth, e.naturalHeight, 0, 0, i, l), n = a.getImageData(0, 0, i, l), r = a.getImageData(0, 0, i, l);
                for (var _ = 0, f = n.data.length; _ < f; _ += 4) 0 < r.data[_ + 3] && (r.data[_] = n.data[_] / 255 * u, r.data[_ + 1] = n.data[_ + 1] / 255 * h, r.data[_ + 2] = n.data[_ + 2] / 255 * c);
                if (a.globalAlpha = .5, a.putImageData(r, 0, 0), a.drawImage(t, 0, 0), o) {
                    var p = new Image;
                    return p.src = t.toDataURL(), p
                }
            }
        }, r.indexOfArray = function(e, t) {
            for (var s = e.length, o = 0; o < s; o++)
                if (e[o] === t) return o;
            return -1
        }, r.randomizeArray = function(e) {
            for (var t = [], s = e.concat(), o = s.length, i = 0; i < o; i++) {
                var l = Math.floor(Math.random() * s.length);
                t.push(s[l]), s.splice(l, 1)
            }
            return t
        }, r.prt = function(e, t) {
            for (void 0 === t && (t = 1); t-- && e;) e = e.parentNode;
            return e && 1 === e.nodeType ? e : null
        }, r.sibling = function(e, t) {
            for (; e && 0 !== t;)
                if (0 < t) {
                    if (e.nextElementSibling) e = e.nextElementSibling;
                    else
                        for (e = e.nextSibling; e && 1 !== e.nodeType; e = e.nextSibling);
                    t--
                } else {
                    if (e.previousElementSibling) e = e.previousElementSibling;
                    else
                        for (e = e.previousSibling; e && 1 !== e.nodeType; e = e.previousSibling);
                    t++
                } return e
        }, r.getChildAt = function(e, t) {
            var s = r.getChildren(e);
            return t < 0 && (t += s.length), t < 0 ? null : s[t]
        }, r.getChildById = function(e) {
            return document.getElementById(e) || void 0
        }, r.getChildren = function(e, t) {
            for (var s = [], o = e.firstChild; null != o; o = o.nextSibling) t ? s.push(o) : 1 === o.nodeType && s.push(o);
            return s
        }, r.getChildrenFromAttribute = function(e, t, s) {
            for (var o = [], i = e.firstChild; null != i; i = i.nextSibling) s && r.hasAttribute(i, t) ? o.push(i) : 1 === i.nodeType && r.hasAttribute(i, t) && o.push(i);
            return 0 == o.length ? void 0 : o
        }, r.getChildFromNodeListFromAttribute = function(e, t, s) {
            for (var o = e.firstChild; null != o; o = o.nextSibling) {
                if (s && r.hasAttribute(o, t)) return o;
                if (1 === o.nodeType && r.hasAttribute(o, t)) return o
            }
        }, r.getAttributeValue = function(e, t) {
            if (r.hasAttribute(e, t)) return e.getAttribute(t)
        }, r.hasAttribute = function(e, t) {
            return e.hasAttribute ? e.hasAttribute(t) : !!e.attributes[t]
        }, r.insertNodeAt = function(e, t, s) {
            var o = r.children(e);
            if (s < 0 || s > o.length) throw new Error("invalid index!");
            e.insertBefore(t, o[s])
        }, r.hasCanvas = function() {
            return Boolean(document.createElement("canvas"))
        }, r.hitTest = function(e, t, s) {
            if (!e) throw Error("Hit test target is null!");
            var o = e.getBoundingClientRect();
            return t >= parseInt(o.left) && t <= parseInt(o.left + (o.right - o.left)) && s >= parseInt(o.top) && s <= parseInt(o.top + (o.bottom - o.top))
        }, r.hitBuggyTest = function(e, t, s) {
            if (!e) throw Error("Hit test target is null!");
            e.getBoundingClientRect();
            return !1
        }, r.hasWEBGL = function() {
            try {
                var e = document.createElement("canvas");
                return !!t.WebGLRenderingContext && (e.getContext("webgl") || e.getContext("experimental-webgl"))
            } catch (e) {
                return !1
            }
        }(), r.isLocal = "file:" == document.location.protocol, r.getScrollOffsets = function() {
            return null != t.pageXOffset ? {
                x: t.pageXOffset,
                y: t.pageYOffset
            } : "CSS1Compat" == document.compatMode ? {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            } : void 0
        }, r.getViewportSize = function() {
            return r.hasPointerEvent && 1 < navigator.msMaxTouchPoints ? {
                w: document.documentElement.clientWidth || t.innerWidth,
                h: document.documentElement.clientHeight || t.innerHeight
            } : r.isMobile ? {
                w: t.innerWidth,
                h: t.innerHeight
            } : {
                w: document.documentElement.clientWidth || t.innerWidth,
                h: document.documentElement.clientHeight || t.innerHeight
            }
        }, r.getViewportMouseCoordinates = function(e) {
            var t = r.getScrollOffsets();
            return e.touches ? {
                screenX: null == e.touches[0] ? e.touches.pageX - t.x : e.touches[0].pageX - t.x,
                screenY: null == e.touches[0] ? e.touches.pageY - t.y : e.touches[0].pageY - t.y
            } : {
                screenX: null == e.clientX ? e.pageX - t.x : e.clientX,
                screenY: null == e.clientY ? e.pageY - t.y : e.clientY
            }
        }, r.hasPointerEvent = Boolean(t.navigator.msPointerEnabled) || Boolean(t.navigator.pointerEnabled), r.isMobile = function() {
            var e = ["android", "webos", "iphone", "ipad", "blackberry", "kfsowi"];
            for (i in e)
                if (-1 != navigator.userAgent.toLowerCase().indexOf(String(e[i]).toLowerCase())) return !0;
            return "macintel" === navigator.platform.toLowerCase() && 1 < navigator.maxTouchPoints && !t.MSStream
        }(), r.isIE = Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie")) || Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("edge")) || Boolean(document.documentElement.msRequestFullscreen), r.isAndroid = -1 != navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()), r.isChrome = function() {
            if (!r.isIE) {
                var e = navigator.userAgent.toLowerCase();
                if (!e.match(/browser/gi)) return e.match(/chrome/gi)
            }
        }(), r.isSafari = -1 != navigator.userAgent.toLowerCase().indexOf("safari") && -1 == navigator.userAgent.toLowerCase().indexOf("chrome"), r.isOpera = -1 != navigator.userAgent.toLowerCase().indexOf("opr"), r.isFirefox = -1 != navigator.userAgent.toLowerCase().indexOf("firefox"), r.isIEWebKit = Boolean(document.documentElement.msRequestFullscreen), r.isIEAndLessThen9 = Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 7")) || Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 8")), r.isIEAnd9OrLess = Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 7")) || Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 8")) || Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 9")), r.isIE7 = Boolean(-1 != navigator.userAgent.toLowerCase().indexOf("msie 7")), r.isMac = Boolean(-1 != navigator.appVersion.toLowerCase().indexOf("mac")), r.isWin = Boolean(-1 != navigator.appVersion.toLowerCase().indexOf("win")), r.isIOS = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints || navigator.userAgent.match(/(iPad|iPhone|iPod)/g), r.isIphone = navigator.userAgent.match(/(iPhone|iPod)/g), r.hasFullScreen = r.dumy.requestFullScreen || r.dumy.mozRequestFullScreen || r.dumy.webkitRequestFullScreen || r.dumy.msieRequestFullScreen, r.volumeCanBeSet = function() {
            var e = document.createElement("audio");
            if (e) return (e.volume = 0) == e.volume
        }(), r.getVideoFormat = function() {
            var e, t = document.createElement("video");
            if (t.canPlayType) return "probably" == t.canPlayType("video/mp4") || "maybe" == t.canPlayType("video/mp4") ? e = ".mp4" : "probably" == t.canPlayType("video/ogg") || "maybe" == t.canPlayType("video/ogg") ? e = ".ogg" : "probably" != t.canPlayType("video/webm") && "maybe" != t.canPlayType("video/webm") || (e = ".webm"), t = null, e
        }(), r.onReady = function(e) {
            document.addEventListener ? document.addEventListener("DOMContentLoaded", function() {
                r.checkIfHasTransofrms(), r.hasFullScreen = r.checkIfHasFullscreen(), setTimeout(e, 100)
            }) : document.onreadystatechange = function() {
                r.checkIfHasTransofrms(), r.hasFullScreen = r.checkIfHasFullscreen(), "complete" == document.readyState && setTimeout(e, 100)
            }
        }, r.checkIfHasTransofrms = function() {
            document.documentElement.appendChild(r.dumy), r.hasTransform3d = function() {
                for (var e, t, s = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"]; e = s.shift();)
                    if (void 0 !== r.dumy.style[e] && (r.dumy.style.position = "absolute", t = r.dumy.getBoundingClientRect().left, r.dumy.style[e] = "translate3d(500px, 0px, 0px)", 100 < (t = Math.abs(r.dumy.getBoundingClientRect().left - t)) && t < 900)) {
                        try {
                            document.documentElement.removeChild(r.dumy)
                        } catch (e) {}
                        return !0
                    } try {
                    document.documentElement.removeChild(r.dumy)
                } catch (e) {}
                return !1
            }(), r.hasTransform2d = function() {
                for (var e, t = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"]; e = t.shift();)
                    if (void 0 !== r.dumy.style[e]) return !0;
                try {
                    document.documentElement.removeChild(r.dumy)
                } catch (e) {}
                return !1
            }(), r.isReadyMethodCalled_bl = !0
        }, r.checkIfHasFullscreen = function() {
            return Boolean(document.documentElement.requestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.msRequestFullscreen)
        }, r.disableElementSelection = function(e) {
            try {
                e.style.userSelect = "none"
            } catch (e) {}
            try {
                e.style.MozUserSelect = "none"
            } catch (e) {}
            try {
                e.style.webkitUserSelect = "none"
            } catch (e) {}
            try {
                e.style.khtmlUserSelect = "none"
            } catch (e) {}
            try {
                e.style.oUserSelect = "none"
            } catch (e) {}
            try {
                e.style.msUserSelect = "none"
            } catch (e) {}
            try {
                e.msUserSelect = "none"
            } catch (e) {}
            e.onselectstart = function() {
                return !1
            }
        }, r.getUrlArgs = function(e) {
            for (var t = {}, s = e.substr(e.indexOf("?") + 1) || location.search.substring(1), o = (s = s.replace(/(\?*)(\/*)/g, "")).split("&"), i = 0; i < o.length; i++) {
                var l = o[i].indexOf("="),
                    n = o[i].substring(0, l),
                    a = o[i].substring(l + 1);
                a = decodeURIComponent(a), t[n] = a
            }
            return t
        }, r.getHashUrlArgs = function(e) {
            for (var t = {}, s = e.substr(e.indexOf("#") + 1) || location.search.substring(1), o = (s = s.replace(/(\?*)(\/*)/g, "")).split("&"), i = 0; i < o.length; i++) {
                var l = o[i].indexOf("="),
                    n = o[i].substring(0, l),
                    a = o[i].substring(l + 1);
                a = decodeURIComponent(a), t[n] = a
            }
            return t
        }, r.validateEmail = function(e) {
            return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)
        }, r.isReadyMethodCalled_bl = !1, t.FWDUVPUtils = r
    }(window), !window.FWDAnimation) {
    var _fwd_gsScope = "undefined" != typeof fwd_module && fwd_module.exports && "undefined" != typeof fwd_global ? fwd_global : this || window;
    
if (! function(e) {
        var t = function() {
            var i = this;
            t.prototype;
            this.main_do = null, this.init = function() {
                this.setupScreen(), e.onerror = this.showError, this.screen.style.zIndex = 1e25, setTimeout(this.addConsoleToDom, 100), setInterval(this.position, 100)
            }, this.position = function() {
                var e = FWDUVPUtils.getScrollOffsets();
                i.setX(e.x), i.setY(e.y)
            }, this.addConsoleToDom = function() {
                -1 != navigator.userAgent.toLowerCase().indexOf("msie 7") ? document.getElementsByTagName("body")[0].appendChild(i.screen) : document.documentElement.appendChild(i.screen)
            }, this.setupScreen = function() {
                this.main_do = new FWDUVPDisplayObject("div", "absolute"), this.main_do.setOverflow("auto"), this.main_do.setWidth(300), this.main_do.setHeight(100), this.setWidth(300), this.setHeight(100), this.main_do.setBkColor("#FFFFFF"), this.addChild(this.main_do)
            }, this.showError = function(e, t, s) {
                var o = i.main_do.getInnerHTML() + "<br>JavaScript error: " + e + " on line " + s + " for " + t;
                i.main_do.setInnerHTML(o), i.main_do.screen.scrollTop = i.main_do.screen.scrollHeight
            }, this.log = function(e) {
                var t = i.main_do.getInnerHTML() + "<br>" + e;
                i.main_do.setInnerHTML(t), i.main_do.getScreen().scrollTop = 1e4
            }, this.init()
        };
        t.setPrototype = function() {
            t.prototype = new FWDUVPDisplayObject("div", "absolute")
        }, t.prototype = null, e.FWDConsole = t
    }(window), function(e) {
        var _ = function(e, t, s, o, i, l, n, a, r, d, u, h) {
            var c = this;
            _.prototype;
            this.main_do = null, this.icon_do = null, this.iconS_do = null, this.bk_do = null, this.text_do = null, this.border_do = null, this.thumbHolder_do = null, this.icon_img = e, c.useHEX = d, c.nBC = u, c.sBC = h, this.borderNColor_str = i, this.borderSColor_str = l, this.adsBackgroundPath_str = n, this.position_str = o, this.textNormalColor_str = a, this.textSelectedColor_str = r, this.text_str = s, this.iconOverPath_str = t, this.totalWidth = 215, this.totalHeight = 64, this.fontSize = 12, this.hasThumbanil_bl = !1, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, c.init = function() {
                c.setOverflow("visible"), c.setupMainContainers(), c.hide(!1, !0)
            }, c.setupMainContainers = function() {
                this.main_do = new FWDUVPDisplayObject("div"), this.main_do.hasTransform3d_bl = !1, this.main_do.hasTransform2d_bl = !1, this.main_do.setBackfaceVisibility(), this.bk_do = new FWDUVPDisplayObject("div"), this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')", this.text_do = new FWDUVPDisplayObject("div"), this.text_do.screen.className = "UVP-skip", this.text_do.hasTransform3d_bl = !1, this.text_do.hasTransform2d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.setOverflow("visible"), this.text_do.getStyle().display = "inline", this.text_do.getStyle().fontFamily = "Arial", this.text_do.getStyle().fontSize = "22px", this.text_do.getStyle().whiteSpace = "nowrap", this.text_do.getStyle().color = this.textNormalColor_str, this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.thumbHolder_do = new FWDUVPDisplayObject("div"), this.thumbHolder_do.setWidth(this.totalHeight - 8), this.thumbHolder_do.setHeight(this.totalHeight - 8), this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4), this.thumbHolder_do.setY(4), this.border_do = new FWDUVPDisplayObject("div"), this.border_do.getStyle().border = "1px solid " + this.borderNColor_str, this.border_do.setButtonMode(!0), this.main_do.setWidth(this.totalWidth), this.main_do.setHeight(this.totalHeight), this.bk_do.setWidth(this.totalWidth), this.bk_do.setHeight(this.totalHeight), "left" == this.position_str ? (this.border_do.setX(-1), this.border_do.setWidth(this.totalWidth - 1)) : this.border_do.setWidth(this.totalWidth), this.border_do.setHeight(this.totalHeight - 2), this.setWidth(this.totalWidth), this.setHeight(this.totalHeight), this.useHEX ? (this.icon_do = new FWDUVPDisplayObject("div"), this.icon_do.setWidth(c.icon_img.width), this.icon_do.setHeight(c.icon_img.height), this.icon_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(this.icon_img, this.nBC).canvas, this.icon_do.screen.appendChild(c.icon_do_canvas)) : (this.icon_do = new FWDUVPDisplayObject("img"), this.icon_do.setScreen(this.icon_img), this.icon_do.setWidth(this.icon_img.width), this.icon_do.setHeight(this.icon_img.height)), this.iconS_img = new Image, this.iconS_img.src = this.iconOverPath_str, this.useHEX ? (this.iconS_do = new FWDUVPDisplayObject("div"), this.iconS_do.setWidth(this.icon_do.w), this.iconS_do.setHeight(this.icon_do.h), this.iconS_img.onload = function() {
                    c.iconS_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.iconS_img, c.sBC).canvas, c.iconS_do.screen.appendChild(c.iconS_do_canvas)
                }) : (this.iconS_do = new FWDUVPDisplayObject("img"), this.iconS_do.setScreen(this.iconS_img), this.iconS_do.setWidth(this.icon_do.w), this.iconS_do.setHeight(this.icon_do.h)), this.iconS_do.setAlpha(0), this.main_do.addChild(this.bk_do), this.main_do.addChild(this.text_do), this.main_do.addChild(this.thumbHolder_do), this.main_do.addChild(this.icon_do), this.main_do.addChild(this.iconS_do), this.main_do.addChild(this.border_do), FWDUVPUtils.isIEAndLessThen9 && (this.dumy_do = new FWDUVPDisplayObject("div"), this.dumy_do.setBkColor("#00FF00"), this.dumy_do.setAlpha(1e-4), this.dumy_do.setWidth(this.totalWidth), this.dumy_do.setHeight(this.totalHeight), this.dumy_do.setButtonMode(!0), this.main_do.addChild(this.dumy_do)), this.addChild(this.main_do), this.updateText(c.text_str), FWDUVPUtils.isIEAndLessThen9 ? c.isMbl ? c.hasPointerEvent_bl ? (c.dumy_do.screen.addEventListener("pointerup", c.onMouseUp), c.dumy_do.screen.addEventListener("pointerover", c.onMouseOver), c.dumy_do.screen.addEventListener("pointerout", c.onMouseOut)) : c.dumy_do.screen.addEventListener("touchend", c.onMouseUp) : c.dumy_do.screen.addEventListener ? (c.dumy_do.screen.addEventListener("mouseover", c.onMouseOver), c.dumy_do.screen.addEventListener("mouseout", c.onMouseOut), c.dumy_do.screen.addEventListener("mouseup", c.onMouseUp)) : c.dumy_do.screen.attachEvent && (c.dumy_do.screen.attachEvent("onmouseover", c.onMouseOver), c.dumy_do.screen.attachEvent("onmouseout", c.onMouseOut), c.dumy_do.screen.attachEvent("onmouseup", c.onMouseUp)) : c.isMbl ? c.hasPointerEvent_bl ? (c.border_do.screen.addEventListener("pointerup", c.onMouseUp), c.border_do.screen.addEventListener("pointerover", c.onMouseOver), c.border_do.screen.addEventListener("pointerout", c.onMouseOut)) : c.border_do.screen.addEventListener("touchend", c.onMouseUp) : c.border_do.screen.addEventListener ? (c.border_do.screen.addEventListener("mouseover", c.onMouseOver), c.border_do.screen.addEventListener("mouseout", c.onMouseOut), c.border_do.screen.addEventListener("mouseup", c.onMouseUp)) : c.border_do.screen.attachEvent && (c.border_do.screen.attachEvent("onmouseover", c.onMouseOver), c.border_do.screen.attachEvent("onmouseout", c.onMouseOut), c.border_do.screen.attachEvent("onmouseup", c.onMouseUp))
            }, c.onMouseOver = function(e) {
                e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || c.setSelectedState()
            }, c.onMouseOut = function(e) {
                e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || c.setNormalState()
            }, c.onMouseUp = function(e) {
                e.preventDefault && e.preventDefault(), 2 != e.button && c.isShowed_bl && c.dispatchEvent(_.MOUSE_UP)
            }, this.updateText = function(e) {
                var t;
                this.text_do.setInnerHTML(e), setTimeout(function() {
                    t = c.text_do.getWidth() + 8 + c.iconS_do.w, c.text_do.setX(parseInt(c.totalWidth - t) / 2), c.text_do.setY(parseInt((c.totalHeight - c.text_do.getHeight()) / 2) + 2), c.icon_do.setX(c.text_do.x + t - c.iconS_do.w), c.icon_do.setY(parseInt((c.totalHeight - c.iconS_do.h) / 2) + 2), c.iconS_do.setX(c.text_do.x + t - c.iconS_do.w), c.iconS_do.setY(parseInt((c.totalHeight - c.iconS_do.h) / 2) + 2)
                }, 50)
            }, this.resize = function(e) {
                var t = c.totalWidth;
                e && (t = 64), e ? (this.text_do.setVisible(!1), c.icon_do.setX(Math.round((t - c.iconS_do.w) / 2) - 1), c.icon_do.setY(Math.round((c.totalHeight - c.iconS_do.h) / 2))) : (this.text_do.setVisible(!0), c.icon_do.setX(c.text_do.x + c.text_do.getWidth() + 8 + c.iconS_do.w - c.iconS_do.w), c.icon_do.setY(parseInt((c.totalHeight - c.iconS_do.h) / 2) + 2)), c.iconS_do.setX(c.icon_do.x), c.iconS_do.setY(c.icon_do.y), c.setWidth(t), c.main_do.setWidth(t), c.bk_do.setWidth(t), c.border_do.setWidth(t - 1)
            }, this.setNormalState = function() {
                FWDAnimation.to(c.iconS_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.text_do.screen, .5, {
                    css: {
                        color: c.textNormalColor_str
                    },
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.border_do.screen, .5, {
                    css: {
                        borderColor: c.borderNColor_str
                    },
                    ease: Expo.easeOut
                })
            }, this.setSelectedState = function() {
                FWDAnimation.to(c.iconS_do, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.text_do.screen, .5, {
                    css: {
                        color: c.textSelectedColor_str
                    },
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.border_do.screen, .5, {
                    css: {
                        borderColor: c.borderSColor_str
                    },
                    ease: Expo.easeOut
                })
            }, this.show = function(e) {
                this.isShowed_bl || (this.isShowed_bl = !0, this.setVisible(!0), FWDAnimation.killTweensOf(this.main_do), e && !c.isMbl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    delay: .8,
                    ease: Expo.easeInOut
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 1 - this.totalWidth,
                    delay: .8,
                    ease: Expo.easeInOut
                }) : "left" == this.position_str ? this.main_do.setX(0) : this.main_do.setX(-this.totalWidth), this.text_do.getStyle().color = this.textNormalColor_str)
            }, this.hide = function(e, t) {
                (this.isShowed_bl || t) && (this.isShowed_bl = !1, this.hasThumbanil_bl = !1, FWDAnimation.killTweensOf(this.main_do), e && !c.isMbl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : ("left" == this.position_str ? this.main_do.setX(-this.totalWidth) : this.main_do.setX(0), this.hideCompleteHandler()))
            }, this.hideCompleteHandler = function() {
                c.smallImage_img && (c.smallImage_img.onload = null, c.smallImage_img.src = "", FWDAnimation.killTweensOf(c.icon_do)), 1 != c.main_do.alpha && c.main_do.setAlpha(1), c.thumbHolder_do.setVisible(!1), c.setVisible(!1)
            }, this.hideWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: .5
                })
            }, this.showWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: 1
                })
            }, c.init()
        };
        _.setPrototype = function() {
            _.prototype = null, _.prototype = new FWDUVPTransformDisplayObject("div")
        }, _.CLICK = "onClick", _.MOUSE_OVER = "onMouseOver", _.SHOW_TOOLTIP = "showTooltip", _.MOUSE_OUT = "onMouseOut", _.MOUSE_UP = "onMouseDown", _.prototype = null, e.FWDUVPAdsButton = _
    }(window), function(e) {
        var n = function(e, t, s, o, i) {
            var l = this;
            n.prototype;
            this.main_do = null, this.bk_do = null, this.text_do = null, this.border_do = null, this.thumbHolder_do = null, this.borderNColor_str = t, this.borderSColor_str = s, this.adsBackgroundPath_str = o, this.position_str = e, this.timeColor_str = i, this.totalWidth = 215, this.totalHeight = 64, this.fontSize = 12, this.hasThumbanil_bl = !1, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, l.init = function() {
                l.setOverflow("visible"), l.setupMainContainers(), l.hide(!1, !0)
            }, l.setupMainContainers = function() {
                this.main_do = new FWDUVPDisplayObject("div"), this.main_do.hasTransform3d_bl = !1, this.main_do.hasTransform2d_bl = !1, this.main_do.setBackfaceVisibility(), this.bk_do = new FWDUVPDisplayObject("div"), this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')", this.text_do = new FWDUVPDisplayObject("div"), this.text_do.screen.className = "UVP-skip-in", this.text_do.hasTransform3d_bl = !1, this.text_do.hasTransform2d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.getStyle().fontFamily = "Arial", this.text_do.getStyle().fontSize = "12px", this.text_do.getStyle().lineHeight = "18px", this.text_do.getStyle().textAlign = "center", this.text_do.getStyle().color = this.timeColor_str, this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.text_do.setInnerHTML("..."), this.thumbHolder_do = new FWDUVPDisplayObject("div"), this.thumbHolder_do.setWidth(this.totalHeight - 8), this.thumbHolder_do.setHeight(this.totalHeight - 8), this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4), this.thumbHolder_do.setY(4), this.border_do = new FWDUVPDisplayObject("div"), this.border_do.getStyle().border = "1px solid " + this.borderNColor_str, this.main_do.setWidth(this.totalWidth), this.main_do.setHeight(this.totalHeight), this.bk_do.setWidth(this.totalWidth), this.bk_do.setHeight(this.totalHeight), "left" == this.position_str ? (this.border_do.setX(-1), this.border_do.setWidth(this.totalWidth - 1)) : this.border_do.setWidth(this.totalWidth), this.border_do.setHeight(this.totalHeight - 2), this.setWidth(this.totalWidth), this.setHeight(this.totalHeight), this.main_do.addChild(this.bk_do), this.main_do.addChild(this.text_do), this.main_do.addChild(this.thumbHolder_do), this.main_do.addChild(this.border_do), this.addChild(this.main_do)
            }, this.loadThumbnail = function(e) {
                if (this.hasThumbanil_bl = !0, this.smallImage_img) {
                    this.smallImage_img.removeAttribute("width"), this.smallImage_img.removeAttribute("height"), this.smallImage_img.onload = null, this.smallImage_img.src = "";
                    try {
                        FWDUVPUtils.isIE || this.thumbHolder_do.removeChild(l.thumbnail_do)
                    } catch (e) {}
                }
                this.thumbnail_do || (this.thumbnail_do = new FWDUVPDisplayObject("img"), this.smallImage_img = new Image), this.thumbHolder_do.setVisible(!0), this.smallImage_img.onload = this.onSmallImageLoad, this.smallImage_img.src = e
            }, this.onSmallImageLoad = function() {
                l.smallImageOriginalW = l.smallImage_img.width, l.smallImageOriginalH = l.smallImage_img.height, l.thumbnail_do.setScreen(l.smallImage_img), l.thumbHolder_do.addChild(l.thumbnail_do);
                var e = l.thumbHolder_do.w / l.smallImageOriginalW,
                    t = l.thumbHolder_do.h / l.smallImageOriginalH,
                    s = 0;
                t <= e ? s = e : e <= t && (s = t), l.thumbnail_do.setWidth(Math.round(l.smallImageOriginalW * s)), l.thumbnail_do.setHeight(Math.round(l.smallImageOriginalH * s)), l.thumbnail_do.setX(Math.round((l.thumbHolder_do.w - l.thumbnail_do.w) / 2)), l.thumbnail_do.setY(Math.round((l.thumbHolder_do.h - l.thumbnail_do.h) / 2)), l.thumbnail_do.setAlpha(0), FWDAnimation.to(l.thumbnail_do, .8, {
                    alpha: 1
                }), l.updateText()
            }, this.updateText = function(e) {
                e && this.text_do.setInnerHTML(e), this.hasThumbanil_bl ? (this.text_do.setX(16), this.text_do.setWidth(this.totalWidth - this.totalHeight - 26)) : (this.text_do.setX(8), this.text_do.setWidth(this.totalWidth - 16)), this.text_do.setY(parseInt((l.totalHeight - l.text_do.getHeight()) / 2))
            }, this.show = function(e) {
                this.isShowed_bl || (this.isShowed_bl = !0, this.setVisible(!0), FWDAnimation.killTweensOf(this.main_do), e && !l.isMbl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    delay: .2,
                    ease: Expo.easeInOut
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 1 - this.totalWidth,
                    delay: .2,
                    ease: Expo.easeInOut
                }) : "left" == this.position_str ? this.main_do.setX(0) : this.main_do.setX(-this.totalWidth))
            }, this.hide = function(e, t) {
                (this.isShowed_bl || t) && (this.isShowed_bl = !1, this.hasThumbanil_bl = !1, FWDAnimation.killTweensOf(this.main_do), e && !l.isMbl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : ("left" == this.position_str ? this.main_do.setX(-this.totalWidth) : this.main_do.setX(0), this.hideCompleteHandler()))
            }, this.hideCompleteHandler = function() {
                l.smallImage_img && (l.smallImage_img.onload = null, l.smallImage_img.src = "", FWDAnimation.killTweensOf(l.thumbnail_do)), 1 != l.main_do.alpha && l.main_do.setAlpha(1), l.thumbHolder_do.setVisible(!1), l.setVisible(!1)
            }, this.hideWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: .5
                })
            }, this.showWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: 1
                })
            }, l.init()
        };
        n.setPrototype = function() {
            n.prototype = null, n.prototype = new FWDUVPTransformDisplayObject("div")
        }, n.CLICK = "onClick", n.MOUSE_OVER = "onMouseOver", n.SHOW_TOOLTIP = "showTooltip", n.MOUSE_OUT = "onMouseOut", n.MOUSE_UP = "onMouseDown", n.prototype = null, e.FWDUVPAdsStart = n
    }(window), function(window) {
        var FWDUVPAnnotation = function(props_obj) {
            var self = this,
                prototype = FWDUVPAnnotation.prototype;
            this.id = props_obj.id, this.startTime = props_obj.start, this.endTime = props_obj.end, this.htmlContent_str = props_obj.content, this.left = props_obj.left, this.top = props_obj.top, this.showCloseButton_bl = props_obj.showCloseButton_bl, this.clickSource = props_obj.clickSource, this.clickSourceTarget = props_obj.clickSourceTarget, this.closeButtonNpath = props_obj.closeButtonNpath, this.closeButtonSPath = props_obj.closeButtonSPath, this.normalStateClass = props_obj.normalStateClass, this.selectedStateClass = props_obj.selectedStateClass, this.showAnnotationsPositionTool_bl = props_obj.showAnnotationsPositionTool_bl, this.prt = props_obj.prt, this.curX = this.left, this.curY = this.top, this.data = props_obj.data, this.useHEX = props_obj.useHEX, this.nBC = props_obj.nBC, this.sBC = props_obj.sBC, this.handPath_str = props_obj.handPath_str, this.grabPath_str = props_obj.grabPath_str, this.dummy_do = null, this.isShowed_bl = !1, this.isClsd = !1, self.init = function() {
                -1 != this.data.sknPth.indexOf("hex_white") && (self.sBC = "#FFFFFF"), self.setOverflow("visible"), self.setAlpha(0), self.setVisible(!1), FWDUVPUtils.hasTransform2d && (this.getStyle().transformOrigin = "0% 0%"), this.screen.innerHTML = this.htmlContent_str, this.screen.className = this.normalStateClass, this.setBackfaceVisibility(), this.getStyle().fontSmoothing = "antialiased", this.getStyle().webkitFontSmoothing = "antialiased", this.getStyle().textRendering = "optimizeLegibility", this.dummy_do = new FWDUVPDisplayObject("div"), this.dummy_do.getStyle().width = "100%", this.dummy_do.getStyle().height = "100%", this.addChild(this.dummy_do), setTimeout(function() {
                    self.w = self.getWidth(), self.h = self.getHeight()
                }, 100), self.showCloseButton_bl && !self.showAnnotationsPositionTool_bl && (FWDUVPSimpleSizeButton.setPrototype(), self.clsBtn = new FWDUVPSimpleSizeButton(self.closeButtonNpath, self.closeButtonSPath, 26, 26, this.useHEX, this.nBC, this.sBC, !0), self.clsBtn.setScale2(0), self.clsBtn.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.closeClickButtonCloseHandler), self.clsBtn.getStyle().position = "absolute", self.addChild(self.clsBtn)), self.showAnnotationsPositionTool_bl && (self.info_do = new FWDUVPDisplayObject("div"), self.info_do.getStyle().backgroundColor = "#FFFFFF", self.info_do.getStyle().boxShadow = "2px 2px 2px #888888;", this.info_do.getStyle().fontSmoothing = "antialiased", this.info_do.getStyle().webkitFontSmoothing = "antialiased", this.info_do.getStyle().textRendering = "optimizeLegibility", this.addChild(this.info_do), setTimeout(function() {
                    self.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> data-left=" + Math.round(self.curX * self.prt.scaleInverse) + "</div><div style='padding:4px; margin:4px; color:#000000;'> data-top=" + Math.round(self.curY * self.prt.scaleInverse) + "</div>", self.setX(Math.round(self.curX * self.prt.scale)), self.setY(Math.round(self.curY * self.prt.scale))
                }, 100), self.isMbl ? self.hasPointerEvent_bl ? self.screen.addEventListener("pointerdown", self.selfOnDownHandler) : self.screen.addEventListener("touchdown", self.selfOnDownHandler) : window.addEventListener && self.screen.addEventListener("mousedown", self.selfOnDownHandler), self.getStyle().cursor = "url(" + self.handPath_str + "), default"), self.clickSource && !self.showAnnotationsPositionTool_bl && (self.dummy_do.setButtonMode(!0), self.dummy_do.screen.addEventListener("click", this.onClickHandler), self.dummy_do.screen.addEventListener("mouseover", this.onMouseOverHandler), self.dummy_do.screen.addEventListener("mouseout", this.onMouseOutHandler))
            }, this.selfOnDownHandler = function(e) {
                e.preventDefault && e.preventDefault(), self.getStyle().cursor = "url(" + self.grabPath_str + "), default", self.prt.addChild(self);
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                self.startX = t.screenX - self.prt.getGlobalX(), self.startY = t.screenY - self.prt.getGlobalY(), self.curX = self.x, self.curY = self.y, self.isMbl ? self.hasPointerEvent_bl ? (window.addEventListener("pointermove", self.selfMoveHandler), window.addEventListener("pointerup", self.selfEndHandler)) : (window.addEventListener("touchmove", self.selfMoveHandler), window.addEventListener("touchend", self.selfEndHandler)) : window.addEventListener && (window.addEventListener("mousemove", self.selfMoveHandler), window.addEventListener("mouseup", self.selfEndHandler))
            }, this.selfMoveHandler = function(e) {
                e.preventDefault && e.preventDefault();
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                self.localX = t.screenX - self.prt.getGlobalX(), self.localY = t.screenY - self.prt.getGlobalY(), self.curX = self.x, self.curY = self.y, self.curX += self.localX - self.startX, self.curY += self.localY - self.startY, self.setX(self.curX), self.setY(self.curY), self.startX = t.screenX - self.prt.getGlobalX(), self.startY = t.screenY - self.prt.getGlobalY(), self.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> data-left=" + Math.round(self.curX * self.prt.scaleInverse) + "</div><div style='padding:4px; margin:4px; color:#000000;'> data-top=" + Math.round(self.curY * self.prt.scaleInverse) + "</div>"
            }, this.selfEndHandler = function(e) {
                self.getStyle().cursor = "url(" + self.handPath_str + "), default", self.isMbl ? self.hasPointerEvent_bl ? (window.removeEventListener("pointermove", self.selfMoveHandler), window.removeEventListener("pointerup", self.selfEndHandler)) : (window.removeEventListener("touchmove", self.selfMoveHandler), window.removeEventListener("touchend", self.selfEndHandler)) : window.removeEventListener && (window.removeEventListener("mousemove", self.selfMoveHandler), window.removeEventListener("mouseup", self.selfEndHandler))
            }, this.onMouseOverHandler = function(e) {
                self.setSelectedAtate()
            }, this.onMouseOutHandler = function(e) {
                self.setNormalState()
            }, this.onClickHandler = function() {
                -1 != self.clickSource.indexOf("https") || -1 != self.clickSource.indexOf("http") ? window.open(self.clickSource, self.clickSourceTarget) : eval(self.clickSource)
            }, this.closeClickButtonCloseHandler = function() {
                self.hide(), self.isClsd = !0
            }, this.show = function() {
                this.isShowed_bl || this.isClsd || (self.isShowed_bl = !0, self.setVisible(!0), FWDAnimation.killTweensOf(self), FWDAnimation.to(self, .8, {
                    alpha: 1,
                    ease: Quint.easeOut
                }), self.clsBtn && FWDAnimation.to(self.clsBtn, .8, {
                    scale: 1,
                    delay: .2,
                    ease: Elastic.easeOut
                }))
            }, this.hide = function() {
                this.isShowed_bl && (FWDAnimation.killTweensOf(self), self.isShowed_bl = !1, self.setVisible(!1), self.setAlpha(0), self.clsBtn && (FWDAnimation.killTweensOf(self.clsBtn), self.clsBtn.setScale2(0)))
            }, this.setNormalState = function() {
                self.selectedStateClass && FWDAnimation.to(self.screen, .8, {
                    className: self.normalStateClass,
                    ease: Quint.easeOut
                })
            }, this.setSelectedAtate = function() {
                self.selectedStateClass && FWDAnimation.to(self.screen, .8, {
                    className: self.selectedStateClass,
                    ease: Quint.easeOut
                })
            }, this.updateHEXColors = function(e, t) {
                self.clsBtn && self.clsBtn.updateHEXColors(e, t, self.buttonWidth, self.buttonHeight)
            }, self.init()
        };
        FWDUVPAnnotation.setPrototype = function() {
            FWDUVPAnnotation.prototype = null, FWDUVPUtils.hasTransform2d ? FWDUVPAnnotation.prototype = new FWDUVPTransformDisplayObject("div") : FWDUVPAnnotation.prototype = new FWDUVPDisplayObject("div")
        }, FWDUVPAnnotation.prototype = null, window.FWDUVPAnnotation = FWDUVPAnnotation
    }(window), function(a) {
        var e = function(i, l) {
            var n = this;
            e.prototype;
            n.nBC = l.nBC, n.sBC = l.sBC, this.ann_ar = [], this.showAnnotationsPositionTool_bl = l.showAnnotationsPositionTool_bl, n.init = function() {
                n.setOverflow("visible")
            }, n.setupAnnotations = function(e) {
                if (n.ann_ar)
                    for (var t = 0; t < n.ann_ar.length; t++) try {
                        this.removeChild(n.ann_ar[t])
                    } catch (e) {}
                if (null != (n.source_ar = e)) {
                    n.setVisible(!0), this.source_ar = e, this.ann_ar = [], this.totalAnnotations = n.source_ar.length;
                    var s = l.annotationAddCloseNPath_str;
                    a.isWhite && (s = "content/hex_white/annotation-close-button-normal.png");
                    for (t = 0; t < n.totalAnnotations; t++) {
                        FWDUVPAnnotation.setPrototype();
                        var o = new FWDUVPAnnotation({
                            id: t,
                            start: this.source_ar[t].start,
                            end: this.source_ar[t].end,
                            left: this.source_ar[t].left,
                            top: this.source_ar[t].top,
                            clickSource: this.source_ar[t].clickSource,
                            clickSourceTarget: this.source_ar[t].clickSourceTarget,
                            content: this.source_ar[t].content,
                            showCloseButton_bl: this.source_ar[t].showCloseButton_bl,
                            closeButtonNpath: s,
                            closeButtonSPath: l.annotationAddCloseSPath_str,
                            normalStateClass: this.source_ar[t].normalStateClass,
                            selectedStateClass: this.source_ar[t].selectedStateClass,
                            showAnnotationsPositionTool_bl: n.showAnnotationsPositionTool_bl,
                            prt: n,
                            handPath_str: l.handPath_str,
                            grabPath_str: l.grabPath_str,
                            useHEX: l.useHEX,
                            nBC: n.nBC,
                            sBC: n.sBC,
                            data: l
                        });
                        this.ann_ar[t] = o, this.addChild(o)
                    }
                } else n.setVisible(!1)
            }, this.update = function(e) {
                if (0 != n.totalAnnotations)
                    for (var t, s = 0; s < n.totalAnnotations; s++) t = n.ann_ar[s], e <= 0 ? t.hide() : e >= t.startTime && e <= t.endTime ? (t.show(), n.position()) : t.hide()
            }, this.position = function(e) {
                var t = i.sW / i.maxWidth;
                if (n.setX(Math.round((i.sW - t * i.maxWidth) / 2)), n.setY(Math.round((i.tempVidStageHeight - t * i.maxHeight) / 2)), n.scale = i.sW / i.maxWidth, n.scaleY = n.scale, n.scaleX = n.scale, n.scaleInverse = i.maxWidth / i.sW, !n.showAnnotationsPositionTool_bl)
                    for (var s = 0; s < n.totalAnnotations; s++) {
                        var o = this.ann_ar[s];
                        o.setScale2(n.scale), o.finalX = Math.floor(o.left * n.scaleX), i.playlist_do && i.isPlaylistShowed_bl && "right" == i.tempPlaylistPosition_str && !i.isFullScreen_bl && o.left > i.maxWidth / 3 && (o.finalX -= i.playlistWidth + i.spaceBetweenControllerAndPlaylist), o.finalY = Math.floor(o.top * n.scaleY), o.clsBtn && (o.clsBtn.setWidth(Math.round(o.clsBtn.buttonWidth * n.scaleInverse)), o.clsBtn.setHeight(Math.round(o.clsBtn.buttonHeight * n.scaleInverse)), o.clsBtn.n_do.setWidth(Math.round(o.clsBtn.buttonWidth * n.scaleInverse)), o.clsBtn.n_do.setHeight(Math.round(o.clsBtn.buttonHeight * n.scaleInverse)), o.clsBtn.n_do_canvas && (o.clsBtn.n_do_canvas.style.width = Math.round(o.clsBtn.buttonWidth * n.scaleInverse) + "px", o.clsBtn.n_do_canvas.style.height = Math.round(o.clsBtn.buttonheight * n.scaleInverse) + "px", o.clsBtn.s_do_canvas.style.width = Math.round(o.clsBtn.buttonWidth * n.scaleInverse) + "px", o.clsBtn.s_do_canvas.style.height = Math.round(o.clsBtn.buttonheight * n.scaleInverse) + "px"), o.clsBtn.s_do.setWidth(Math.round(o.clsBtn.buttonWidth * n.scaleInverse)), o.clsBtn.s_do.setHeight(Math.round(o.clsBtn.buttonHeight * n.scaleInverse)), o.clsBtn.setX(Math.floor(o.getWidth() - o.clsBtn.w / 2)), o.clsBtn.setY(Math.floor(-o.clsBtn.h / 2))), o.prevFinalX != o.finalX && (e ? FWDAnimation.to(o, .8, {
                            x: o.finalX,
                            ease: Expo.easeInOut
                        }) : o.setX(o.finalX)), o.prevFinalY != o.finalY && (e ? FWDAnimation.to(o, .8, {
                            y: o.finalY,
                            ease: Expo.easeInOut
                        }) : o.setY(o.finalY)), o.prevFinalX = o.finalX, o.prevFinalY = o.finalY
                    }
            }, this.updateHEXColors = function(e, t) {
                if (n.nBC = e, n.sBC = t, n.ann_ar)
                    for (var s = 0; s < n.ann_ar.length; s++) n.ann_ar[s].updateHEXColors(e, t)
            }, n.init()
        };
        e.setPrototype = function() {
            e.prototype = null, e.prototype = new FWDUVPDisplayObject("div", "absolute")
        }, e.prototype = null, a.FWDUVPAnnotations = e
    }(window), function(s) {
        var i = function(t, e) {
            var n = this;
            i.prototype;
            this.audio_el = null, this.sourcePath_str = null, this.lastPercentPlayed = 0, this.volume = e, this.curDuration = 0, this.countNormalMp3Errors = 0, this.countShoutCastErrors = 0, this.maxShoutCastCountErrors = 5, this.maxNormalCountErrors = 1, this.testShoutCastId_to, this.audioVisualizerLinesColor_str = FWDUVPUtils.hexToRgb(t.data.audioVisualizerLinesColor_str), this.audioVisualizerCircleColor_str = FWDUVPUtils.hexToRgb(t.data.audioVisualizerCircleColor_str), this.preload_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !0, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.hasPlayedOnce_bl = !1, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isShoutcast_bl = !1, this.isNormalMp3_bl = !1, this.init = function() {
                n.setupAudio()
            }, this.resizeAndPosition = function(e, t) {
                e && (n.sW = e, n.sH = t), n.setWidth(n.sW), n.setHeight(n.sH), n.resizeSpectrumCanvas()
            }, this.setupAudio = function() {
                null == n.audio_el && (n.audio_el = document.createElement("audio"), n.screen.appendChild(n.audio_el), n.audio_el.controls = !1, n.audio_el.preload = "auto", n.audio_el.volume = n.volume, FWDUVPUtils.isLocal || (n.audio_el.crossOrigin = "*"), n.setPlaybackRate(t.data.defaultPlaybackRate_ar[t.data.startAtPlaybackIndex])), n.audio_el.addEventListener("error", n.errorHandler), n.audio_el.addEventListener("canplay", n.safeToBeControlled), n.audio_el.addEventListener("canplaythrough", n.safeToBeControlled), n.audio_el.addEventListener("progress", n.updateProgress), n.audio_el.addEventListener("timeupdate", n.updateAudio), n.audio_el.addEventListener("pause", n.pauseHandler), n.audio_el.addEventListener("play", n.playHandler), n.audio_el.addEventListener("ended", n.endedHandler)
            }, this.destroyAudio = function() {
                n.audio_el && (n.audio_el.removeEventListener("error", n.errorHandler), n.audio_el.removeEventListener("canplay", n.safeToBeControlled), n.audio_el.removeEventListener("canplaythrough", n.safeToBeControlled), n.audio_el.removeEventListener("progress", n.updateProgress), n.audio_el.removeEventListener("timeupdate", n.updateAudio), n.audio_el.removeEventListener("pause", n.pauseHandler), n.audio_el.removeEventListener("play", n.playHandler), n.audio_el.removeEventListener("ended", n.endedHandler), n.audio_el.removeEventListener("waiting", n.startToBuffer), n.audio_el.removeEventListener("playing", n.stopToBuffer), n.audio_el.src = "", n.audio_el.load())
            }, this.startToBuffer = function(e) {
                n.dispatchEvent(FWDUVPVideoScreen.START_TO_BUFFER)
            }, this.stopToBuffer = function() {
                n.dispatchEvent(FWDUVPVideoScreen.STOP_TO_BUFFER)
            }, this.togglePlayPause = function() {
                null != n && n.isSafeToBeControlled_bl && (n.isPlaying_bl ? n.pause() : n.play())
            }, this.updateLinesColor = function(e) {
                this.audioVisualizerLinesColor_str = e
            }, this.errorHandler = function(e) {
                if (null != n.sourcePath_str && null != n.sourcePath_str) {
                    if (n.isNormalMp3_bl && n.countNormalMp3Errors <= n.maxNormalCountErrors) return n.stop(), n.testShoutCastId_to = setTimeout(n.play, 200), void n.countNormalMp3Errors++;
                    if (n.isShoutcast_bl && n.countShoutCastErrors <= n.maxShoutCastCountErrors && 0 == n.audio_el.networkState) return n.testShoutCastId_to = setTimeout(n.play, 200), void n.countShoutCastErrors++;
                    var t;
                    n.hasError_bl = !0, n.stop(), t = 0 == n.audio_el.networkState || 1 == n.audio_el.networkState ? "error 'self.audio_el.networkState = 1'" : 2 == n.audio_el.networkState ? "'self.audio_el.networkState = 2'" : 3 == n.audio_el.networkState ? "source not found" : e, s.console && s.console.log(n.audio_el.networkState), n.dispatchEvent(i.ERROR, {
                        text: t
                    })
                }
            }, this.setSource = function(e) {
                n.sourcePath_str = e, clearTimeout(n.testShoutCastId_to), -1 != n.sourcePath_str.indexOf(";") ? (n.isShoutcast_bl = !0, n.countShoutCastErrors = 0) : n.isShoutcast_bl = !1, -1 == n.sourcePath_str.indexOf(";") ? (n.isNormalMp3_bl = !0, n.countNormalMp3Errors = 0) : n.isNormalMp3_bl = !1, n.lastPercentPlayed = 0, n.audio_el && n.stop(!0)
            }, this.play = function(e) {
                if (n.isStopped_bl) n.isPlaying_bl = !1, n.hasError_bl = !1, n.allowScrubing_bl = !1, n.isStopped_bl = !1, n.setupAudio(), n.audio_el.src = n.sourcePath_str, n.play(), n.setVisible(!0);
                else if (!n.audio_el.ended || e) try {
                    n.isPlaying_bl = !0, n.hasPlayedOnce_bl = !0;
                    var t = n.audio_el.play();
                    void 0 !== t && t.then(function() {}, function() {}), FWDUVPUtils.isIE && n.dispatchEvent(i.PLAY)
                } catch (e) {
                    console.log(e)
                }
            }, this.resume = function() {
                n.isStopped_bl || n.play()
            }, this.pause = function() {
                null != n && null != n.audio_el && (n.audio_el.ended || (n.audio_el.pause(), n.isPlaying_bl = !1, FWDUVPUtils.isIE && n.dispatchEvent(i.PAUSE)))
            }, this.pauseHandler = function() {
                n.allowScrubing_bl || (n.stopSpectrum(), n.dispatchEvent(i.PAUSE))
            }, this.playHandler = function() {
                n.allowScrubing_bl || (n.isStartEventDispatched_bl || (n.dispatchEvent(i.START), n.isStartEventDispatched_bl = !0), n.startSpectrum(), n.dispatchEvent(i.PLAY))
            }, this.endedHandler = function() {
                n.dispatchEvent(i.PLAY_COMPLETE)
            }, this.stop = function(e) {
                (null != n && null != n.audio_el && !n.isStopped_bl || e) && (n.isPlaying_bl = !1, n.isStopped_bl = !0, n.hasPlayedOnce_bl = !0, n.isSafeToBeControlled_bl = !1, n.isStartEventDispatched_bl = !1, n.setVisible(!1), clearTimeout(n.testShoutCastId_to), n.stopToUpdateSubtitles(), n.stopSpectrum(), n.audio_el.pause(), n.destroyAudio(), n.dispatchEvent(i.STOP), n.dispatchEvent(i.LOAD_PROGRESS, {
                    percent: 0
                }))
            }, this.safeToBeControlled = function() {
                n.isSafeToBeControlled_bl || (n.hasHours_bl = 0 < Math.floor(n.audio_el.duration / 3600), n.isPlaying_bl = !0, n.isSafeToBeControlled_bl = !0, n.startToUpdateSubtitles(), n.dispatchEvent(i.SAFE_TO_SCRUBB), n.dispatchEvent(i.SAFE_TO_UPDATE_VOLUME))
            }, this.updateProgress = function() {
                var e = 0;
                0 < n.audio_el.buffered.length && (e = n.audio_el.buffered.end(n.audio_el.buffered.length - 1).toFixed(1) / n.audio_el.duration.toFixed(1), !isNaN(e) && e || (e = 0)), 1 == e && n.audio_el.removeEventListener("progress", n.updateProgress), n.dispatchEvent(i.LOAD_PROGRESS, {
                    percent: e
                })
            }, this.updateAudio = function() {
                var e;
                n.allowScrubing_bl || (e = n.audio_el.currentTime / n.audio_el.duration, n.dispatchEvent(i.UPDATE, {
                    percent: e
                }));
                var t = n.formatTime(n.audio_el.duration),
                    s = n.formatTime(n.audio_el.currentTime);
                isNaN(n.audio_el.duration) ? n.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {
                    curTime: "00:00",
                    totalTime: "00:00",
                    seconds: 0,
                    totalTimeInSeconds: 0
                }) : n.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {
                    curTime: s,
                    totalTime: t,
                    seconds: n.audio_el.currentTime,
                    totalTimeInSeconds: n.audio_el.duration
                }), n.lastPercentPlayed = e, n.curDuration = s
            }, this.startToScrub = function() {
                n.allowScrubing_bl = !0
            }, this.stopToScrub = function() {
                n.allowScrubing_bl = !1
            }, this.scrubbAtTime = function(e) {
                n.audio_el.currentTime = e;
                var t = FWDUVPVideoScreen.formatTime(n.audio_el.duration),
                    s = FWDUVPVideoScreen.formatTime(n.audio_el.currentTime);
                n.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {
                    curTime: s,
                    totalTime: t
                })
            }, this.scrub = function(e, t) {
                if (null != n.audio_el && n.audio_el.duration) {
                    t && n.startToScrub();
                    try {
                        n.audio_el.currentTime = n.audio_el.duration * e;
                        var s = n.formatTime(n.audio_el.duration),
                            o = n.formatTime(n.audio_el.currentTime);
                        n.dispatchEvent(i.UPDATE_TIME, {
                            curTime: o,
                            totalTime: s
                        })
                    } catch (t) {}
                }
            }, this.replay = function() {
                n.scrub(0), n.play()
            }, this.stopToUpdateSubtitles = function() {
                clearInterval(n.startToUpdateSubtitleId_int)
            }, this.startToUpdateSubtitles = function() {
                clearInterval(n.startToUpdateSubtitleId_int), n.startToUpdateSubtitleId_int = setInterval(n.updateSubtitleHandler, 10)
            }, this.updateSubtitleHandler = function() {
                n.dispatchEvent(i.UPDATE_SUBTITLE, {
                    curTime: n.audio_el.currentTime
                })
            }, this.setVolume = function(e) {
                null != e && (n.volume = e), n.audio_el && (n.audio_el.volume = n.volume)
            }, this.formatTime = function(e) {
                var t = Math.floor(e / 3600),
                    s = e % 3600,
                    o = Math.floor(s / 60),
                    i = s % 60,
                    l = Math.ceil(i);
                return o = 10 <= o ? o : "0" + o, l = 10 <= l ? l : "0" + l, isNaN(l) ? "00:00" : n.hasHours_bl ? t + ":" + o + ":" + l : o + ":" + l
            }, this.setPlaybackRate = function(e) {
                n.audio_el && (.25 == e && (e = "0.5"), n.audio_el.defaultPlaybackRate = e, n.audio_el.playbackRate = e)
            }, this.setupSpectrum = function() {
                if (!FWDUVPUtils.isIOS && !t.useWithoutVideoScreen_bl) {
                    var e = s.AudioContext || s.webkitAudioContext;
                    !this.canvas_do && e && (3 < i.countAudioContext || (i.countAudioContext++, this.canvas_do = new FWDUVPDisplayObject("canvas"), this.addChild(this.canvas_do), this.canvas = this.canvas_do.screen, this.ctx = this.canvas.getContext("2d"), this.resizeSpectrumCanvas(), e && (this.context = new e, this.analyser = this.context.createAnalyser(), this.source = this.context.createMediaElementSource(this.audio_el), this.source.connect(this.analyser), this.analyser.connect(this.context.destination), this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount), this.renderSpectrum())))
                }
            }, this.resizeSpectrumCanvas = function() {
                n.canvas_do && (n.canvas_do.setWidth(n.sW), n.canvas_do.setHeight(n.sH), n.canvas.width = n.sW, n.canvas.height = n.sH)
            }, n.bars = 200, FWDUVPUtils.isMobile && (n.bars = 100), n.react_x = 0, n.react_y = 0, n.radius = 0, n.deltarad = 0, n.shockwave = 0, n.rot = 0, n.intensity = 0, n.isSeeking = 0, n.center_x, n.center_y, this.renderSpectrum = function() {
                if (n.canvas_do) {
                    n.resizeSpectrumCanvas();
                    var e = n.ctx.createLinearGradient(0, 0, 0, n.canvas.height);
                    e.addColorStop(0, "rgba(0, 0, 0, 1)"), e.addColorStop(1, "rgba(0, 0, 0, 1)"), n.ctx.fillStyle = e, n.ctx.fillRect(0, 0, n.canvas.width, n.canvas.height), n.ctx.fillStyle = "rgba(255, 255, 255, " + (125e-7 * n.intensity - .4) + ")", n.ctx.fillRect(0, 0, n.canvas.width, n.canvas.height), n.rot = n.rot + 1e-7 * n.intensity, n.react_x = 0, n.react_y = 0, n.intensity = 0, n.analyser.getByteFrequencyData(n.fbc_array);
                    for (var t = 0; t < n.bars; t++) {
                        rads = 2 * Math.PI / n.bars, bar_x = n.center_x, bar_y = n.center_y;
                        var s = n.sH / 3;
                        isNaN(s) && (s = 10), bar_height = Math.round(n.fbc_array[t] / 256 * s), bar_width = Math.round(.02 * bar_height), bar_x_term = n.center_x + Math.cos(rads * t + n.rot) * (n.radius + bar_height), bar_y_term = n.center_y + Math.sin(rads * t + n.rot) * (n.radius + bar_height), n.ctx.save();
                        var o = n.audioVisualizerLinesColor_str;
                        n.ctx.strokeStyle = o, n.ctx.lineWidth = bar_width, n.ctx.beginPath(), n.ctx.moveTo(bar_x, bar_y), n.ctx.lineTo(bar_x_term, bar_y_term), n.ctx.stroke(), n.react_x += Math.cos(rads * t + n.rot) * (n.radius + bar_height), n.react_y += Math.sin(rads * t + n.rot) * (n.radius + bar_height), n.intensity += bar_height
                    }
                    n.center_x = n.canvas.width / 2 - .007 * n.react_x, n.center_y = n.canvas.height / 2 - .007 * n.react_y, radius_old = n.radius, n.radius = 25 + .002 * n.intensity, n.deltarad = n.radius - radius_old, n.ctx.fillStyle = n.audioVisualizerCircleColor_str, n.ctx.beginPath(), n.ctx.arc(n.center_x, n.center_y, n.radius + 2, 0, 2 * Math.PI, !1), n.ctx.fill(), n.shockwave += 60, n.ctx.lineWidth = 15, n.ctx.strokeStyle = n.audioVisualizerCircleColor_str, n.ctx.beginPath(), n.ctx.arc(n.center_x, n.center_y, n.shockwave + n.radius, 0, 2 * Math.PI, !1), n.ctx.stroke(), 15 < n.deltarad && (n.shockwave = 0, n.ctx.fillStyle = "rgba(255, 255, 255, 0.7)", n.ctx.fillRect(0, 0, n.canvas.width, n.canvas.height), n.rot = n.rot + .4), n.startSpectrum()
                }
            }, this.startSpectrum = function() {
                n.canvas_do && (n.stopSpectrum(), n.spectrumAnimationFrameId = s.requestAnimationFrame(n.renderSpectrum))
            }, this.stopSpectrum = function() {
                n.canvas_do && cancelAnimationFrame(n.spectrumAnimationFrameId)
            }, this.init()
        };
        i.setPrototype = function() {
            i.prototype = new FWDUVPDisplayObject("div")
        }, i.UPDATE_SUBTITLE = "updateSubtitle", i.ERROR = "error", i.UPDATE = "update", i.UPDATE = "update", i.UPDATE_TIME = "updateTime", i.SAFE_TO_SCRUBB = "safeToControll", i.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume", i.LOAD_PROGRESS = "loadProgress", i.START = "start", i.PLAY = "play", i.PAUSE = "pause", i.STOP = "stop", i.PLAY_COMPLETE = "playComplete", i.countAudioContext = 0, s.FWDUVPAudioScreen = i
    }(window), function() {
        var e = function(s, o) {
            var p = this;
            e.prototype;
            this.image_img, this.catThumbBk_img = s.catThumbBk_img, this.catNextN_img = s.catNextN_img, this.catPrevN_img = s.catPrevN_img, this.catCloseN_img = s.catCloseN_img, this.mainHld = null, this.clsBtn = null, this.nextButton_do = null, this.prevButton_do = null, this.thumbs_ar = [], this.categories_ar = s.cats_ar, this.catBkPath_str = s.catBkPath_str, this.id = 0, this.mouseX = 0, this.mouseY = 0, this.dif = 0, this.tempId = p.id, this.sW = 0, this.sH = 0, this.thumbW = 0, this.thumbH = 0, this.buttonsMargins = s.buttonsMargins, this.thumbnailMaxWidth = s.thumbnailMaxWidth, this.thumbnailMaxHeight = s.thumbnailMaxHeight, this.spacerH = s.horizontalSpaceBetweenThumbnails, this.spacerV = s.verticalSpaceBetweenThumbnails, this.dl, this.howManyThumbsToDisplayH = 0, this.howManyThumbsToDisplayV = 0, p.catNextN_img && (this.categoriesOffsetTotalWidth = 2 * p.catNextN_img.width + 40 + 2 * p.buttonsMargins, this.categoriesOffsetTotalHeight = p.catNextN_img.height + 40), this.totalThumbnails = p.categories_ar.length, this.delayRate = .06, this.countLoadedThumbs = 0, this.inputBackgroundColor_str = s.searchInputBackgroundColor_str, this.inputColor_str = s.searchInputColor_str, this.hideCompleteId_to, this.showCompleteId_to, this.loadThumbnailsId_to, this.preventMouseWheelNavigId_to, this.preventMouseWheelNavig_bl = !1, this.areThumbnailsCreated_bl = !1, this.areThumbnailsLoaded_bl = !1, this.isShowed_bl = !1, this.isOnDOM_bl = !1, this.showSearchInpt = s.showPlaylistsSearchInput_bl, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.useVectorIcons_bl = s.useVectorIcons_bl, p.init = function() {
                -1 != s.sknPth.indexOf("hex_white") ? p.sBC = "#FFFFFF" : p.sBC = s.sBC, p.getStyle().zIndex = 2147483647, p.getStyle().msTouchAction = "none", p.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)", p.getStyle().width = "100%", p.mainHld = new FWDUVPDisplayObject("div"), p.mainHld.screen.className = "fwduvp-categories-background", p.mainHld.getStyle().background = "url('" + p.catBkPath_str + "')", p.mainHld.setY(-3e3), p.addChild(p.mainHld), p.setupButtons(), p.setupDisable(), p.isMbl && (p.setupMobileMove(), FWDUVPUtils.isChrome && (FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(p.screen) : document.documentElement.appendChild(p.screen))), (!p.isMbl || p.isMbl && p.hasPointerEvent_bl) && p.setSelectable(!1), window.addEventListener ? (p.screen.addEventListener("mousewheel", p.mouseWheelDumyHandler), p.screen.addEventListener("DOMMouseScroll", p.mouseWheelDumyHandler)) : document.attachEvent && p.screen.attachEvent("onmousewheel", p.mouseWheelDumyHandler), p.showSearchInpt && p.setupInput()
            }, this.mouseWheelDumyHandler = function(e) {
                var t;
                if (FWDAnimation.isTweening(p.mainHld)) return e.preventDefault && e.preventDefault(), !1;
                for (var s = 0; s < p.totalThumbnails; s++)
                    if (t = p.thumbs_ar[s], FWDAnimation.isTweening(t)) return e.preventDefault && e.preventDefault(), !1;
                var o = e.detail || e.wheelDelta;
                if (e.wheelDelta && (o *= -1), FWDUVPUtils.isOpera && (o *= -1), 0 < o) p.nextButtonOnMouseUpHandler();
                else if (o < 0) {
                    if (p.leftId <= 0) return;
                    p.prevButtonOnMouseUpHandler()
                }
                if (!e.preventDefault) return !1;
                e.preventDefault()
            }, p.resizeAndPosition = function(e) {
                if (p.isShowed_bl || e) {
                    var t = FWDUVPUtils.getScrollOffsets(),
                        s = FWDUVPUtils.getViewportSize();
                    p.sW = s.w, p.sH = s.h, FWDAnimation.killTweensOf(p.mainHld), p.mainHld.setX(0), p.mainHld.setWidth(p.sW), p.mainHld.setHeight(p.sH), p.setX(t.x), p.setY(t.y), p.setHeight(p.sH), (p.isMbl || o.isEmbedded_bl) && p.setWidth(p.sW), p.positionButtons(), p.tempId = p.id, p.resizeAndPositionThumbnails(), p.disableEnableNextAndPrevButtons(), p.input_do && (p.input_do.setX(p.sW - p.input_do.getWidth() - p.buttonsMargins), p.input_do.setY(p.sH - p.input_do.getHeight() - p.buttonsMargins), p.inputArrow_do.setX(p.input_do.x + p.input_do.getWidth() - 20), p.inputArrow_do.setY(p.input_do.y + p.input_do.getHeight() / 2 - p.inputArrow_do.getHeight() / 2))
                }
            }, p.onScrollHandler = function() {
                var e = FWDUVPUtils.getScrollOffsets();
                p.setX(e.x), p.setY(e.y)
            }, this.setupInput = function() {
                p.input_do = new FWDUVPDisplayObject("input"), p.input_do.screen.className = "fwduvp-search", p.input_do.screen.maxLength = 20, p.input_do.getStyle().textAlign = "left", p.input_do.getStyle().outline = "none", p.input_do.getStyle().boxShadow = "none", p.input_do.getStyle().fontSmoothing = "antialiased", p.input_do.getStyle().webkitFontSmoothing = "antialiased", p.input_do.getStyle().textRendering = "optimizeLegibility", p.input_do.getStyle().fontFamily = "Arial", p.input_do.getStyle().fontSize = "12px", p.input_do.getStyle().padding = "14px 10px", p.input_do.getStyle().boxSizing = "border-box", p.input_do.getStyle().backgroundColor = p.inputBackgroundColor_str, p.input_do.getStyle().color = p.inputColor_str, p.input_do.screen.value = "search", p.input_do.setHeight(20), p.input_do.setX(18), p.noSearchFound_do = new FWDUVPDisplayObject("div"), p.noSearchFound_do.setX(0), p.noSearchFound_do.getStyle().textAlign = "center", p.noSearchFound_do.getStyle().width = "100%", p.noSearchFound_do.getStyle().fontSmoothing = "antialiased", p.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased", p.noSearchFound_do.getStyle().textRendering = "optimizeLegibility", p.noSearchFound_do.getStyle().fontFamily = "Arial", p.noSearchFound_do.getStyle().fontSize = "12px", p.noSearchFound_do.getStyle().color = p.inputColor_str, p.noSearchFound_do.setInnerHTML("NOTHING FOUND!"), p.noSearchFound_do.setVisible(!1), p.addChild(p.noSearchFound_do);
                var e = new Image;
                e.src = s.inputArrowPath_str, p.inputArrow_do = new FWDUVPDisplayObject("img"), p.inputArrow_do.setScreen(e), p.inputArrow_do.setWidth(12), p.inputArrow_do.setHeight(12), p.hasPointerEvent_bl ? p.input_do.screen.addEventListener("pointerdown", p.inputFocusInHandler) : p.input_do.screen.addEventListener && (p.input_do.screen.addEventListener("mousedown", p.inputFocusInHandler), p.input_do.screen.addEventListener("touchstart", p.inputFocusInHandler)), p.input_do.screen.addEventListener("keyup", p.keyUpHandler), p.mainHld.addChild(p.input_do), p.mainHld.addChild(p.inputArrow_do)
            }, this.inputFocusInHandler = function() {
                p.hasInputFocus_bl || (p.hasInputFocus_bl = !0, "search" == p.input_do.screen.value && (p.input_do.screen.value = ""), p.input_do.screen.focus(), setTimeout(function() {
                    p.hasPointerEvent_bl ? window.addEventListener("pointerdown", p.inputFocusOutHandler) : window.addEventListener && (window.addEventListener("mousedown", p.inputFocusOutHandler), window.addEventListener("touchstart", p.inputFocusOutHandler))
                }, 50))
            }, this.inputFocusOutHandler = function(e) {
                if (p.hasInputFocus_bl) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    return FWDUVPUtils.hitTest(p.input_do.screen, t.screenX, t.screenY) ? void 0 : (p.hasInputFocus_bl = !1, void("" == p.input_do.screen.value && (p.input_do.screen.value = "search", p.hasPointerEvent_bl ? window.removeEventListener("pointerdown", p.inputFocusOutHandler) : window.removeEventListener && (window.removeEventListener("mousedown", p.inputFocusOutHandler), window.removeEventListener("touchstart", p.inputFocusOutHandler)))))
                }
            }, this.keyUpHandler = function(e) {
                e.stopPropagation && e.stopPropagation(), p.prevInputValue_str != p.input_do.screen.value && (clearTimeout(p.keyPressedId_to), p.keyPressed_bl = !0, clearTimeout(p.rsId_to), p.rsId_to = setTimeout(function() {
                    p.resizeAndPositionThumbnails(!0), p.disableEnableNextAndPrevButtons()
                }, 400)), p.prevInputValue_str = p.input_do.screen.value, p.keyPressedId_to = setTimeout(function() {
                    p.keyPressed_bl = !1
                }, 450)
            }, this.showNothingFound = function() {
                p.isShowNothingFound_bl || (p.isShowNothingFound_bl = !0, p.noSearchFound_do.setVisible(!0), p.noSearchFound_do.setY(parseInt((p.sH - p.noSearchFound_do.getHeight()) / 2)), p.noSearchFound_do.setAlpha(0), FWDAnimation.to(p.noSearchFound_do, .1, {
                    alpha: 1,
                    yoyo: !0,
                    repeat: 4
                }))
            }, this.hideNothingFound = function() {
                p.isShowNothingFound_bl && (p.isShowNothingFound_bl = !1, FWDAnimation.killTweensOf(p.noSearchFound_do), p.noSearchFound_do.setVisible(!1))
            }, this.setupDisable = function() {
                p.disable_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (p.disable_do.setBkColor("#FFFFFF"), p.disable_do.setAlpha(.01)), p.addChild(p.disable_do)
            }, this.showDisable = function() {
                p.disable_do.w != p.sW && (p.disable_do.setWidth(p.sW), p.disable_do.setHeight(p.sH))
            }, this.hideDisable = function() {
                0 != p.disable_do.w && (p.disable_do.setWidth(0), p.disable_do.setHeight(0))
            }, this.setupButtons = function() {
                p.clsBtn || (p.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), p.clsBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-close'></span></div>", void 0, "UVPCategoriesNextAndPrevNormalState", "UVPCategoriesNextAndPrevSelectedState")) : (FWDUVPSimpleButton.setPrototype(), p.clsBtn = new FWDUVPSimpleButton(p.catCloseN_img, s.catCloseSPath_str, void 0, !0, s.useHEX, s.nBC, p.sBC, !1, !1, !1, !1, !0)), p.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, p.closeButtonOnMouseUpHandler), p.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), p.nextButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-FF-right'></span></div>", void 0, "UVPCategoriesNextAndPrevNormalState", "UVPCategoriesNextAndPrevSelectedState")) : (FWDUVPSimpleButton.setPrototype(), p.nextButton_do = new FWDUVPSimpleButton(p.catNextN_img, s.catNextSPath_str, void 0, !0, s.useHEX, s.nBC, p.sBC, !1, !1, !1, !1, !0)), p.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, p.nextButtonOnMouseUpHandler), p.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), p.prevButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-FF-left'></span></div>", void 0, "UVPCategoriesNextAndPrevNormalState", "UVPCategoriesNextAndPrevSelectedState")) : (FWDUVPSimpleButton.setPrototype(), p.prevButton_do = new FWDUVPSimpleButton(p.catPrevN_img, s.catPrevSPath_str, void 0, !0, s.useHEX, s.nBC, p.sBC, !1, !1, !1, !1, !0)), p.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, p.prevButtonOnMouseUpHandler))
            }, this.closeButtonOnMouseUpHandler = function() {
                p.hide()
            }, this.nextButtonOnMouseUpHandler = function() {
                var e = p.howManyThumbsToDisplayH * p.howManyThumbsToDisplayV;
                p.tempId += e, p.tempId > p.totalThumbnails - 1 && (p.tempId = p.totalThumbnails - 1);
                var t = Math.floor(p.tempId / e);
                p.tempId = t * e, p.resizeAndPositionThumbnails(!0, "next"), p.disableEnableNextAndPrevButtons(!1, !0)
            }, this.prevButtonOnMouseUpHandler = function() {
                var e = p.howManyThumbsToDisplayH * p.howManyThumbsToDisplayV;
                p.tempId -= e, p.tempId < 0 && (p.tempId = 0);
                var t = Math.floor(p.tempId / e);
                p.tempId = t * e, p.resizeAndPositionThumbnails(!0, "prev"), p.disableEnableNextAndPrevButtons(!0, !1)
            }, this.positionButtons = function() {
                p.clsBtn.setX(p.sW - p.clsBtn.w - p.buttonsMargins), p.clsBtn.setY(p.buttonsMargins), p.nextButton_do.setX(p.sW - p.nextButton_do.w - p.buttonsMargins), p.nextButton_do.setY(parseInt((p.sH - p.nextButton_do.h) / 2)), p.prevButton_do.setX(p.buttonsMargins), p.prevButton_do.setY(parseInt((p.sH - p.prevButton_do.h) / 2))
            }, this.disableEnableNextAndPrevButtons = function(e, t) {
                var s = p.howManyThumbsToDisplayH * p.howManyThumbsToDisplayV,
                    o = Math.floor(p.tempId / s),
                    i = Math.ceil(p.totalThumbnails / s) - 1;
                p.howManyThumbsToDisplayH, p.howManyThumbsToDisplayH;
                s >= p.totalThumbnails ? (p.nextButton_do.disable(), p.prevButton_do.disable(), p.nextButton_do.setDisabledState(), p.prevButton_do.setDisabledState()) : 0 == o ? (p.nextButton_do.enable(), p.prevButton_do.disable(), p.nextButton_do.setEnabledState(), p.prevButton_do.setDisabledState()) : (o == i ? (p.nextButton_do.disable(), p.prevButton_do.enable(), p.nextButton_do.setDisabledState()) : (p.nextButton_do.enable(), p.prevButton_do.enable(), p.nextButton_do.setEnabledState()), p.prevButton_do.setEnabledState()), e || p.prevButton_do.setNormalState(), t || p.nextButton_do.setNormalState()
            }, this.setupMobileMove = function() {
                p.hasPointerEvent_bl ? p.screen.addEventListener("pointerdown", p.mobileDownHandler) : p.screen.addEventListener("touchstart", p.mobileDownHandler)
            }, this.mobileDownHandler = function(e) {
                if (!e.touches || 1 == e.touches.length) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    p.mouseX = t.screenX, p.mouseY = t.screenY, p.hasPointerEvent_bl ? (window.addEventListener("pointerup", p.mobileUpHandler), window.addEventListener("pointermove", p.mobileMoveHandler)) : (window.addEventListener("touchend", p.mobileUpHandler), window.addEventListener("touchmove", p.mobileMoveHandler))
                }
            }, this.mobileMoveHandler = function(e) {
                if (e.preventDefault && e.preventDefault(), !e.touches || 1 == e.touches.length) {
                    p.showDisable();
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    p.dif = p.mouseX - t.screenX, p.mouseX = t.screenX, p.mouseY = t.screenY
                }
            }, this.mobileUpHandler = function(e) {
                p.hideDisable(), 10 < p.dif ? p.nextButtonOnMouseUpHandler() : p.dif < -10 && p.prevButtonOnMouseUpHandler(), p.dif = 0, p.hasPointerEvent_bl ? (window.removeEventListener("pointerup", p.mobileUpHandler), window.removeEventListener("pointermove", p.mobileMoveHandler)) : (window.removeEventListener("touchend", p.mobileUpHandler), window.removeEventListener("touchmove", p.mobileMoveHandler))
            }, this.setupThumbnails = function() {
                if (!p.areThumbnailsCreated_bl) {
                    var e;
                    p.areThumbnailsCreated_bl = !0;
                    for (var t = 0; t < p.totalThumbnails; t++) FWDUVPCategoriesThumb.setPrototype(), (e = new FWDUVPCategoriesThumb(p, t, s.catThumbBkPath_str, s.catThumbBkTextPath_str, s.thumbnailSelectedType_str, p.categories_ar[t].htmlContent, p.categories_ar[t].htmlText_str)).addListener(FWDUVPCategoriesThumb.MOUSE_UP, p.thumbnailOnMouseUpHandler), p.thumbs_ar[t] = e, p.mainHld.addChild(e);
                    p.mainHld.addChild(p.clsBtn), p.mainHld.addChild(p.nextButton_do), p.mainHld.addChild(p.prevButton_do)
                }
            }, this.thumbnailOnMouseUpHandler = function(e) {
                p.id = e.id, p.disableOrEnableThumbnails(), p.hide()
            }, this.resizeAndPositionThumbnails = function(e, t) {
                if (p.areThumbnailsCreated_bl) {
                    var s, o, i, l, n, a, r, d, u, h = [].concat(p.thumbs_ar);
                    if (p.isSearched_bl = !1, p.input_do && (inputValue = p.input_do.screen.value.toLowerCase(), "search" != inputValue))
                        for (var c = 0; c < h.length; c++) - 1 == (s = h[c]).htmlText_str.toLowerCase().indexOf(inputValue.toLowerCase()) && (FWDAnimation.killTweensOf(s), s.hide(), h.splice(c, 1), c--);
                    p.totalThumbnails = h.length, p.totalThumbnails != p.thumbs_ar.length && (p.isSearched_bl = !0), 0 == p.totalThumbnails ? p.showNothingFound() : p.hideNothingFound(), this.remainWidthSpace = this.sW - l;
                    var _ = p.sW - p.categoriesOffsetTotalWidth,
                        f = p.sH - p.categoriesOffsetTotalHeight;
                    p.howManyThumbsToDisplayH = Math.ceil((_ - p.spacerH) / (p.thumbnailMaxWidth + p.spacerH)), p.thumbW = Math.floor((_ - p.spacerH * (p.howManyThumbsToDisplayH - 1)) / p.howManyThumbsToDisplayH), p.thumbW > p.thumbnailMaxWidth && (p.howManyThumbsToDisplayH += 1, p.thumbW = Math.floor((_ - p.spacerH * (p.howManyThumbsToDisplayH - 1)) / p.howManyThumbsToDisplayH)), p.thumbH = Math.floor(p.thumbW / p.thumbnailMaxWidth * p.thumbnailMaxHeight), p.howManyThumbsToDisplayV = Math.floor(f / (p.thumbH + p.spacerV)), p.howManyThumbsToDisplayV < 1 && (p.howManyThumbsToDisplayV = 1), l = Math.min(p.howManyThumbsToDisplayH, p.totalThumbnails) * (p.thumbW + p.spacerH) - p.spacerH, n = Math.min(Math.ceil(p.totalThumbnails / p.howManyThumbsToDisplayH), p.howManyThumbsToDisplayV) * (p.thumbH + p.spacerV) - p.spacerV, a = p.howManyThumbsToDisplayH > p.totalThumbnails ? 0 : _ - l, p.howManyThumbsToDisplayH > p.totalThumbnails && (p.howManyThumbsToDisplayH = p.totalThumbnails), u = p.howManyThumbsToDisplayH * p.howManyThumbsToDisplayV, o = Math.floor(p.tempId / u), p.isSearched_bl && (o = 0), d = p.howManyThumbsToDisplayH * o, firstId = o * u, (r = firstId + u) > p.totalThumbnails && (r = p.totalThumbnails);
                    for (c = 0; c < p.totalThumbnails; c++)(s = h[c]).finalW = p.thumbW, c % p.howManyThumbsToDisplayH == p.howManyThumbsToDisplayH - 1 && (s.finalW += a), s.finalH = p.thumbH, s.finalX = c % p.howManyThumbsToDisplayH * (p.thumbW + p.spacerH), s.finalX += Math.floor(c / u) * p.howManyThumbsToDisplayH * (p.thumbW + p.spacerH), s.finalX += (p.sW - l) / 2, s.finalX = Math.floor(s.finalX - d * (p.thumbW + p.spacerH)), s.finalY = c % u, s.finalY = Math.floor(s.finalY / p.howManyThumbsToDisplayH) * (p.thumbH + p.spacerV), s.finalY += (f - n) / 2, s.finalY += p.categoriesOffsetTotalHeight / 2, s.finalY = Math.floor(s.finalY), o < (i = Math.floor(c / u)) ? s.finalX += 150 : i < o && (s.finalX -= 150), e ? c >= firstId && c < r ? (dl = "next" == t ? c % u * p.delayRate + .1 : (u - c % u) * p.delayRate + .1, p.keyPressed_bl && (dl = 0), s.resizeAndPosition(!0, dl)) : s.resizeAndPosition(!0, 0) : s.resizeAndPosition(), s.show();
                    p.howManyThumbsToDisplayH * p.howManyThumbsToDisplayV >= p.totalThumbnails ? (p.nextButton_do.setVisible(!1), p.prevButton_do.setVisible(!1)) : (p.nextButton_do.setVisible(!0), p.prevButton_do.setVisible(!0))
                }
            }, this.loadImages = function() {
                p.countLoadedThumbs > p.totalThumbnails - 1 || (p.image_img && (p.image_img.onload = null, p.image_img.onerror = null), p.image_img = new Image, p.image_img.onerror = p.onImageLoadError, p.image_img.onload = p.onImageLoadComplete, p.image_img.src = p.categories_ar[p.countLoadedThumbs].thumbnailPath)
            }, this.onImageLoadError = function(e) {}, this.onImageLoadComplete = function(e) {
                p.thumbs_ar[p.countLoadedThumbs].setImage(p.image_img), p.countLoadedThumbs++, p.loadWithDelayId_to = setTimeout(p.loadImages, 40)
            }, this.disableOrEnableThumbnails = function() {
                for (var e, t = 0; t < p.totalThumbnails; t++) e = p.thumbs_ar[t], t == p.id ? e.disable() : e.enable()
            }, this.show = function(e) {
                p.isShowed_bl || (p.isShowed_bl = !0, p.isOnDOM_bl = !0, p.id = e, FWDUVPUtils.isChrome && p.isMbl ? p.setVisible(!0) : FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(p.screen) : document.documentElement.appendChild(p.screen), window.addEventListener ? window.addEventListener("scroll", p.onScrollHandler) : window.attachEvent && window.attachEvent("onscroll", p.onScrollHandler), p.setupThumbnails(), p.useVectorIcons_bl ? (p.clsBtn.setFinalSize(!0), p.nextButton_do.setFinalSize(!0), p.prevButton_do.setFinalSize(!0), p.checkButtonsId_to = setInterval(function() {
                    0 != p.clsBtn.w && (p.categoriesOffsetTotalWidth = 2 * p.clsBtn.w + 40 + 2 * p.buttonsMargins, p.categoriesOffsetTotalHeight = p.clsBtn.h, p.resizeAndPosition(!0), p.showDisable(), p.disableOrEnableThumbnails(), clearTimeout(p.hideCompleteId_to), clearTimeout(p.showCompleteId_to), p.mainHld.setY(-p.sH), p.isMbl ? (p.showCompleteId_to = setTimeout(p.showCompleteHandler, 1200), FWDAnimation.to(p.mainHld, .8, {
                        y: 0,
                        delay: .4,
                        ease: Expo.easeInOut
                    })) : (p.showCompleteId_to = setTimeout(p.showCompleteHandler, 800), FWDAnimation.to(p.mainHld, .8, {
                        y: 0,
                        ease: Expo.easeInOut
                    })), clearInterval(p.checkButtonsId_to))
                }, 50)) : (p.resizeAndPosition(!0), p.showDisable(), p.disableOrEnableThumbnails(), clearTimeout(p.hideCompleteId_to), clearTimeout(p.showCompleteId_to), p.mainHld.setY(-p.sH), p.isMbl ? (p.showCompleteId_to = setTimeout(p.showCompleteHandler, 1200), FWDAnimation.to(p.mainHld, .8, {
                    y: 0,
                    delay: .4,
                    ease: Expo.easeInOut
                })) : (p.showCompleteId_to = setTimeout(p.showCompleteHandler, 800), FWDAnimation.to(p.mainHld, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                }))))
            }, this.showCompleteHandler = function() {
                p.mainHld.setY(0), p.hideDisable(), FWDUVPUtils.isIphone && (o.videoScreen_do && o.videoScreen_do.setY(-5e3), o.ytb_do && o.ytb_do.setY(-5e3)), p.resizeAndPosition(!0), p.areThumbnailsLoaded_bl || (p.loadImages(), p.areThumbnailsLoaded_bl = !0)
            }, this.hide = function() {
                p.isShowed_bl && (p.isShowed_bl = !1, FWDUVPUtils.isIphone && (o.videoScreen_do && o.videoScreen_do.setY(0), o.ytb_do && o.ytb_do.setY(0)), clearTimeout(p.hideCompleteId_to), clearTimeout(p.showCompleteId_to), p.showDisable(), p.hideCompleteId_to = setTimeout(p.hideCompleteHandler, 800), FWDAnimation.killTweensOf(p.mainHld), FWDAnimation.to(p.mainHld, .8, {
                    y: -p.sH,
                    ease: Expo.easeInOut
                }), window.addEventListener ? window.removeEventListener("scroll", p.onScrollHandler) : window.detachEvent && window.detachEvent("onscroll", p.onScrollHandler), p.resizeAndPosition())
            }, this.hideCompleteHandler = function() {
                FWDUVPUtils.isChrome && p.isMbl ? p.setVisible(!1) : FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].removeChild(p.screen) : document.documentElement.removeChild(p.screen), p.isOnDOM_bl = !1, p.dispatchEvent(e.HIDE_COMPLETE)
            }, this.init()
        };
        e.setPrototype = function() {
            e.prototype = new FWDUVPDisplayObject("div")
        }, e.HIDE_COMPLETE = "hideComplete", e.prototype = null, window.FWDUVPCategories = e
    }(), function(e) {
        var r = function(t, e, s, o, i, l, n) {
            var a = this;
            r.prototype;
            this.backgroundImagePath_str = s, this.catThumbTextBkPath_str = o, this.canvas_el = null, this.htmlContent = l, this.htmlText_str = n, this.simpleText_do = null, this.effectImage_do = null, this.imageHolder_do = null, this.normalImage_do = null, this.effectImage_do = null, this.dumy_do = null, this.thumbnailSelectedType_str = i, this.id = e, this.imageOriginalW, this.imageOriginalH, this.finalX, this.finalY, this.finalW, this.finalH, this.imageFinalX, this.imageFinalY, this.imageFinalW, this.imageFinalH, this.isDark = !0, -1 == s.indexOf("dark") && (this.isDark = !1), this.dispatchShowWithDelayId_to, this.isShowed_bl = !1, this.hasImage_bl = !1, this.isSelected_bl = !1, this.isDisabled_bl = !1, this.hasCanvas_bl = FWDUVPlayer.hasCanvas, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.init = function() {
                a.getStyle().background = "url('" + a.backgroundImagePath_str + "')", a.screen.className = "fwduvp-categories-thumbnail-background", a.setupMainContainers(), a.setupDescription(), a.setupDumy()
            }, this.setupMainContainers = function() {
                a.imageHolder_do = new FWDUVPDisplayObject("div"), a.addChild(a.imageHolder_do)
            }, this.setupDumy = function() {
                a.dumy_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (a.dumy_do.setBkColor("#FFFFFF"), a.dumy_do.setAlpha(0)), a.addChild(a.dumy_do)
            }, this.setupDescription = function() {
                a.simpleText_do = new FWDUVPDisplayObject("div"), a.simpleText_do.getStyle().background = "url('" + a.catThumbTextBkPath_str + "')";
                var e = "fwduvp-categories-white-text";
                a.isDark && (e = "fwduvp-categories-dark-text"), a.simpleText_do.screen.className = e, a.slTitle = a.simpleText_do.screen.className, FWDUVPUtils.isFirefox && (a.simpleText_do.hasTransform3d_bl = !1, a.simpleText_do.hasTransform2d_bl = !1), a.simpleText_do.setBackfaceVisibility(), a.simpleText_do.getStyle().width = "100%", a.simpleText_do.getStyle().fontFamily = "Arial", a.simpleText_do.getStyle().fontSize = "12px", a.simpleText_do.getStyle().textAlign = "left", a.simpleText_do.getStyle().color = "#FFFFFF", a.simpleText_do.getStyle().fontSmoothing = "antialiased", a.simpleText_do.getStyle().webkitFontSmoothing = "antialiased", a.simpleText_do.getStyle().textRendering = "optimizeLegibility", a.simpleText_do.setInnerHTML(a.htmlContent), a.addChild(a.simpleText_do)
            }, this.positionDescription = function() {
                a.simpleText_do.setY(parseInt(a.finalH - a.simpleText_do.getHeight()))
            }, this.setupBlackAndWhiteImage = function(e) {
                if (a.hasCanvas_bl && "opacity" != a.thumbnailSelectedType_str) {
                    var t = document.createElement("canvas"),
                        s = t.getContext("2d");
                    t.width = a.imageOriginalW, t.height = a.imageOriginalH, s.drawImage(e, 0, 0);
                    var o = s.getImageData(0, 0, t.width, t.height),
                        i = o.data;
                    if ("threshold" == a.thumbnailSelectedType_str)
                        for (var l = 0; l < i.length; l += 4) {
                            var n = 150 <= .2126 * i[l] + .7152 * i[l + 1] + .0722 * i[l + 2] ? 255 : 0;
                            i[l] = i[l + 1] = i[l + 2] = n
                        } else if ("blackAndWhite" == a.thumbnailSelectedType_str)
                            for (l = 0; l < i.length; l += 4) {
                                n = .2126 * i[l] + .7152 * i[l + 1] + .0722 * i[l + 2];
                                i[l] = i[l + 1] = i[l + 2] = n
                            }
                    s.putImageData(o, 0, 0, 0, 0, o.width, o.height), a.effectImage_do = new FWDUVPDisplayObject("canvas"), a.effectImage_do.screen = t, a.effectImage_do.setAlpha(.9), a.effectImage_do.setMainProperties()
                }
            }, this.setImage = function(e) {
                a.normalImage_do = new FWDUVPDisplayObject("img"), a.normalImage_do.setScreen(e), a.imageOriginalW = a.normalImage_do.w, a.imageOriginalH = a.normalImage_do.h, a.setButtonMode(!0), a.setupBlackAndWhiteImage(e), a.resizeImage(), a.imageHolder_do.setX(parseInt(a.finalW / 2)), a.imageHolder_do.setY(parseInt(a.finalH / 2)), a.imageHolder_do.setWidth(0), a.imageHolder_do.setHeight(0), a.normalImage_do.setX(-parseInt(a.normalImage_do.w / 2)), a.normalImage_do.setY(-parseInt(a.normalImage_do.h / 2)), a.normalImage_do.setAlpha(0), a.effectImage_do && (a.effectImage_do.setX(-parseInt(a.normalImage_do.w / 2)), a.effectImage_do.setY(-parseInt(a.normalImage_do.h / 2)), a.effectImage_do.setAlpha(.01)), FWDAnimation.to(a.imageHolder_do, .8, {
                    x: 0,
                    y: 0,
                    w: a.finalW,
                    h: a.finalH,
                    ease: Expo.easeInOut
                }), FWDAnimation.to(a.normalImage_do, .8, {
                    alpha: 1,
                    x: a.imageFinalX,
                    y: a.imageFinalY,
                    ease: Expo.easeInOut
                }), a.effectImage_do && FWDAnimation.to(a.effectImage_do, .8, {
                    x: a.imageFinalX,
                    y: a.imageFinalY,
                    ease: Expo.easeInOut
                }), a.hasPointerEvent_bl ? (a.screen.addEventListener("pointerup", a.onMouseUp), a.screen.addEventListener("pointerover", a.onMouseOver), a.screen.addEventListener("pointerout", a.onMouseOut)) : a.screen.addEventListener && (a.isMbl || (a.screen.addEventListener("mouseover", a.onMouseOver), a.screen.addEventListener("mouseout", a.onMouseOut), a.screen.addEventListener("mouseup", a.onMouseUp)), a.screen.addEventListener("touchend", a.onMouseUp)), this.imageHolder_do.addChild(a.normalImage_do), a.effectImage_do && a.imageHolder_do.addChild(a.effectImage_do), this.hasImage_bl = !0, a.id == t.id && a.disable()
            }, a.onMouseOver = function(e, t) {
                a.isDisabled_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || a.setSelectedState(!0)
            }, a.onMouseOut = function(e) {
                a.isDisabled_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || a.setNormalState(!0)
            }, a.onMouseUp = function(e) {
                a.isDisabled_bl || 2 == e.button || (e.preventDefault && e.preventDefault(), a.dispatchEvent(r.MOUSE_UP, {
                    id: a.id
                }))
            }, this.resizeAndPosition = function(e, t) {
                FWDAnimation.killTweensOf(a), FWDAnimation.killTweensOf(a.imageHolder_do), e ? FWDAnimation.to(a, .8, {
                    x: a.finalX,
                    y: a.finalY,
                    delay: t,
                    ease: Expo.easeInOut
                }) : (a.setX(a.finalX), a.setY(a.finalY)), a.setWidth(a.finalW), a.setHeight(a.finalH), a.imageHolder_do.setX(0), a.imageHolder_do.setY(0), a.imageHolder_do.setWidth(a.finalW), a.imageHolder_do.setHeight(a.finalH), a.dumy_do.setWidth(a.finalW), a.dumy_do.setHeight(a.finalH), a.resizeImage(), a.positionDescription()
            }, this.resizeImage = function(e) {
                if (a.normalImage_do) {
                    FWDAnimation.killTweensOf(a.normalImage_do);
                    var t, s = a.finalW / a.imageOriginalW,
                        o = a.finalH / a.imageOriginalH;
                    t = o <= s ? s : o, a.imageFinalW = Math.ceil(t * a.imageOriginalW), a.imageFinalH = Math.ceil(t * a.imageOriginalH), a.imageFinalX = Math.round((a.finalW - a.imageFinalW) / 2), a.imageFinalY = Math.round((a.finalH - a.imageFinalH) / 2), a.effectImage_do && (FWDAnimation.killTweensOf(a.effectImage_do), a.effectImage_do.setX(a.imageFinalX), a.effectImage_do.setY(a.imageFinalY), a.effectImage_do.setWidth(a.imageFinalW), a.effectImage_do.setHeight(a.imageFinalH), a.isDisabled_bl && a.setSelectedState(!1, !0)), a.normalImage_do.setX(a.imageFinalX), a.normalImage_do.setY(a.imageFinalY), a.normalImage_do.setWidth(a.imageFinalW + 1), a.normalImage_do.setHeight(a.imageFinalH), a.isDisabled_bl ? a.normalImage_do.setAlpha(.3) : a.normalImage_do.setAlpha(1)
                }
            }, this.setNormalState = function(e) {
                a.isSelected_bl && (a.isSelected_bl = !1, a.slTitle && (a.simpleText_do.screen.className = a.slTitle), "threshold" == a.thumbnailSelectedType_str || "blackAndWhite" == a.thumbnailSelectedType_str ? e ? FWDAnimation.to(a.effectImage_do, 1, {
                    alpha: .01,
                    ease: Quart.easeOut
                }) : a.effectImage_do.setAlpha(.01) : "opacity" == a.thumbnailSelectedType_str && (e ? FWDAnimation.to(a.normalImage_do, 1, {
                    alpha: 1,
                    ease: Quart.easeOut
                }) : a.normalImage_do.setAlpha(1)))
            }, this.setSelectedState = function(e, t) {
                a.isSelected_bl && !t || (a.isSelected_bl = !0, a.setTitleSelectedClass(), "threshold" == a.thumbnailSelectedType_str || "blackAndWhite" == a.thumbnailSelectedType_str ? e ? FWDAnimation.to(a.effectImage_do, 1, {
                    alpha: 1,
                    ease: Expo.easeOut
                }) : a.effectImage_do.setAlpha(1) : "opacity" == a.thumbnailSelectedType_str && (e ? FWDAnimation.to(a.normalImage_do, 1, {
                    alpha: .3,
                    ease: Expo.easeOut
                }) : a.normalImage_do.setAlpha(.3)))
            }, this.show = function() {
                FWDAnimation.to(a, .8, {
                    scale: 1,
                    ease: Expo.easeInOut
                })
            }, this.hide = function() {
                FWDAnimation.to(a, .8, {
                    scale: 0,
                    ease: Expo.easeInOut
                })
            }, this.enable = function() {
                a.hasImage_bl && (a.isDisabled_bl = !1, a.setButtonMode(!0), a.setNormalState(!0))
            }, this.disable = function() {
                a.hasImage_bl && (a.isDisabled_bl = !0, a.setButtonMode(!1), a.setSelectedState(!0), a.setTitleSelectedClass())
            }, this.setTitleSelectedClass = function() {
                a.slTitle && (a.simpleText_do.screen.className = a.slTitle + " active")
            }, this.init()
        };
        r.setPrototype = function() {
            r.prototype = new FWDUVPTransformDisplayObject("div")
        }, r.MOUSE_UP = "onMouseUp", r.prototype = null, e.FWDUVPCategoriesThumb = r
    }(window), function(o) {
        var t = function(i, l) {
            var n = this;
            t.prototype;
            this.categories_ar = l.categories_ar, this.buttons_ar = [], this.arrowW = l.arrowW, this.arrowH = l.arrowH, n.useHEX = i.data.useHEX, n.nBC = i.data.nBC, n.sBC = i.data.sBC, this.arrowN_str = l.arrowN_str, this.arrowS_str = l.arrowS_str, this.selLabel = l.selectorLabel, this.selBkColN = l.selectorBackgroundNormalColor, this.selBkColS = l.selectorBackgroundSelectedColor, this.selTxtColN = l.selectorTextNormalColor, this.selTxtColS = l.selectorTextSelectedColor, this.itmBkClrN = l.buttonBackgroundNormalColor, this.itmBkClrS = l.buttonBackgroundSelectedColor, this.itmTxtClrN = l.buttonTextNormalColor, this.itmTxtClrS = l.buttonTextSelectedColor, this.scrBarHandY = 0, this.ttBtns = n.categories_ar.length, this.curId = l.startAtPlaylist, this.btnsHldW = 0, this.btnsHldH = 0, this.totalWidth = i.sW, this.buttonHeight = l.buttonHeight, this.ttBtnH = 0, this.spcBtwBtns = 1, this.thmbsFinY = 0, this.vy = 0, this.vy2 = 0, this.frc = .9, this.isShd = !1, this.addMouseWheelSupport_bl = i.data.addMouseWheelSupport_bl, this.scollbarSpeedSensitivity = i.data.scollbarSpeedSensitivity, this.isOpnd = !1, this.hasPointEvt = FWDUVPUtils.hasPointerEvent, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                n.setOverflow("visible"), n.setupMainContainers(), n.setupScrollLogic(), n.getMaxWidthResizeAndPosition(), n.mainButtonsHolder_do.setVisible(!1), n.bk_do.setVisible(!1)
            }, this.setupMainContainers = function() {
                var e;
                if (n.mainHld = new FWDUVPDisplayObject("div"), n.mainHld.setOverflow("visible"), n.addChild(n.mainHld), n.bk_do = new FWDUVPDisplayObject("div"), n.bk_do.screen.className = "fwduvp-combobox-background", n.bk_do.setY(n.buttonHeight), n.bk_do.setBkColor(i.playlistBackgroundColor_str), n.bk_do.setAlpha(0), n.mainHld.addChild(n.bk_do), n.mainButtonsHolder_do = new FWDUVPDisplayObject("div"), n.mainButtonsHolder_do.setY(n.buttonHeight), n.mainHld.addChild(n.mainButtonsHolder_do), i.repeatBackground_bl) n.dummyBk_do = new FWDUVPDisplayObject("div"), n.dummyBk_do.getStyle().background = "url('" + i.bkPath_str + "')";
                else {
                    n.dummyBk_do = new FWDUVPDisplayObject("img");
                    var t = new Image;
                    t.src = i.bkPath_str, n.dummyBk_do.setScreen(t)
                }
                n.dummyBk_do.setHeight(n.buttonHeight), n.mainHld.addChild(n.dummyBk_do), n.buttonsHolder_do = new FWDUVPDisplayObject("div"), n.mainButtonsHolder_do.addChild(n.buttonsHolder_do);
                var s = n.selLabel;
                "default" == n.selLabel && (s = n.categories_ar[n.curId]), FWDUVPComboBoxSelector.setPrototype(), n.selector_do = new FWDUVPComboBoxSelector(11, 6, l.arrowN_str, l.arrowS_str, s, n.selBkColN, n.selBkColS, n.selTxtColN, n.selTxtColS, n.buttonHeight, n.useHEX, n.nBC, n.sBC), n.mainHld.addChild(n.selector_do), n.selector_do.setNormalState(!1), n.selector_do.addListener(FWDUVPComboBoxSelector.CLICK, n.openMenuHandler);
                for (var o = 0; o < n.ttBtns; o++) FWDUVPComboBoxButton.setPrototype(), e = new FWDUVPComboBoxButton(n, n.categories_ar[o], n.itmBkClrN, n.itmBkClrS, n.itmTxtClrN, n.itmTxtClrS, o, n.buttonHeight), (n.buttons_ar[o] = e).addListener(FWDUVPComboBoxButton.CLICK, n.buttonOnMouseDownHandler), n.buttonsHolder_do.addChild(e)
            }, this.buttonOnMouseDownHandler = function(e) {
                n.curId = e.target.id, clearTimeout(n.hideMenuTimeOutId_to), n.hide(!0), n.selector_do.enable(), n.hasPointEvt ? o.removeEventListener("pointerdown", n.checkOpenedMenu) : (o.removeEventListener("touchstart", n.checkOpenedMenu), n.isMbl || (o.removeEventListener("mousedown", n.checkOpenedMenu), o.removeEventListener("mousemove", n.checkOpenedMenu))), n.selector_do.setText(n.buttons_ar[n.curId].label1_str), n.dispatchEvent(t.BUTTON_PRESSED, {
                    id: n.curId
                })
            }, this.openMenuHandler = function(e) {
                FWDAnimation.isTweening(n.mainButtonsHolder_do) || (n.isShd ? n.checkOpenedMenu(e.e, !0) : (n.selector_do.disable(), n.show(!0), n.startToCheckOpenedMenu(), n.dispatchEvent(t.OPEN)))
            }, this.setButtonsStateBasedOnId = function(e) {
                n.curId = e;
                for (var t = 0; t < n.ttBtns; t++) button_do = n.buttons_ar[t], t == n.curId ? button_do.disable() : button_do.enable();
                n.selector_do.setText(n.buttons_ar[n.curId].label1_str), n.scrHandler_do ? (n.updateScrollBarSizeActiveAndDeactivate(), n.updateScrollBarHandlerAndContent(!1, !0)) : n.thmbsFinY = 0
            }, this.setValue = function(e) {
                n.curId = e, n.setButtonsStateBasedOnId()
            }, this.startToCheckOpenedMenu = function(e) {
                n.hasPointEvt ? o.addEventListener("pointerdown", n.checkOpenedMenu) : (o.addEventListener("touchstart", n.checkOpenedMenu), n.isMbl || o.addEventListener("mousedown", n.checkOpenedMenu))
            }, this.checkOpenedMenu = function(e, t) {
                e.preventDefault && e.preventDefault();
                var s = FWDUVPUtils.getViewportMouseCoordinates(e);
                e.type, !FWDUVPUtils.hitTest(n.screen, s.screenX, s.screenY) && !FWDUVPUtils.hitTest(n.mainButtonsHolder_do.screen, s.screenX, s.screenY) || t ? (n.hide(!0), n.selector_do.enable(), n.hasPointEvt ? o.removeEventListener("pointerdown", n.checkOpenedMenu) : (n.isMbl || (o.removeEventListener("touchstart", n.checkOpenedMenu), o.removeEventListener("mousemove", n.checkOpenedMenu)), o.removeEventListener("mousedown", n.checkOpenedMenu))) : clearTimeout(n.hideMenuTimeOutId_to), FWDUVPUtils.hitTest(n.selector_do.screen, s.screenX, s.screenY) && !n.isMbl && setTimeout(function() {
                    n.selector_do.setSelectedState(!0)
                }, 50)
            }, n.getMaxWidthResizeAndPosition = function() {
                for (var e, t = n.ttBtnH = 0; t < n.ttBtns; t++)(e = n.buttons_ar[t]).setY(t * (e.totalHeight + n.spcBtwBtns)), n.allowToScrollAndScrollBarIsActive_bl && n.isMbl, n.totalWidth = i.sW, e.totalWidth = n.totalWidth, e.setWidth(n.totalWidth), e.centerText();
                n.ttBtnH = e.getY() + e.totalHeight - n.spcBtwBtns;
                var s = 2;
                n.isMbl && (s = 0), n.dummyBk_do.setWidth(n.totalWidth + s), n.setWidth(n.totalWidth), n.setHeight(n.buttonHeight), n.selector_do.totalWidth = n.totalWidth + s, n.selector_do.setWidth(n.totalWidth + s), n.selector_do.centerText(), n.buttonsHolder_do.setWidth(n.totalWidth), n.buttonsHolder_do.setHeight(n.ttBtnH)
            }, this.position = function() {
                FWDUVPUtils.isAndroid ? (n.setX(Math.floor(n.finalX)), n.setY(Math.floor(n.finalY - 1)), setTimeout(n.poscombo - box, 100)) : (n.poscombo, box())
            }, this.resizeAndPosition = function() {
                n.sW = i.sW, n.sH = i.sH, n.bk_do.setWidth(n.sW), n.bk_do.setHeight(n.sH - i.removeFromThumbsHolderHeight + 5), n.mainButtonsHolder_do.setWidth(n.sW), n.mainButtonsHolder_do.setHeight(n.sH - i.removeFromThumbsHolderHeight), n.ttBtnH > n.mainButtonsHolder_do.h ? n.allowToScrollAndScrollBarIsActive_bl = !0 : n.allowToScrollAndScrollBarIsActive_bl = !1, !n.allowToScrollAndScrollBarIsActive_bl && n.scrMainHolder_do ? n.scrMainHolder_do.setVisible(!1) : n.allowToScrollAndScrollBarIsActive_bl && n.scrMainHolder_do && n.isShd && n.scrMainHolder_do.setVisible(!0), n.scrHandler_do && n.updateScrollBarSizeActiveAndDeactivate(), this.getMaxWidthResizeAndPosition(), n.updateScrollBarHandlerAndContent()
            }, this.hide = function(e, t) {
                (n.isShd || t) && (FWDAnimation.killTweensOf(this), n.isShd = !1, FWDAnimation.killTweensOf(n.mainButtonsHolder_do), FWDAnimation.killTweensOf(n.bk_do), e ? (FWDAnimation.to(n.mainButtonsHolder_do, .8, {
                    y: -n.ttBtnH,
                    ease: Expo.easeInOut,
                    onComplete: n.hideComplete
                }), FWDAnimation.to(n.bk_do, .8, {
                    alpha: 0
                })) : (n.mainButtonsHolder_do.setY(n.buttonHeight - n.ttBtnH), n.bk_do.setAlpha(0), n.setHeight(n.buttonHeight)))
            }, this.hideComplete = function() {
                n.mainButtonsHolder_do.setVisible(!1), n.bk_do.setVisible(!1)
            }, this.show = function(e, t) {
                n.isShd && !t || (FWDAnimation.killTweensOf(this), n.mainButtonsHolder_do.setY(-n.ttBtnH), n.isShd = !0, n.mainButtonsHolder_do.setVisible(!0), n.bk_do.setVisible(!0), n.resizeAndPosition(), FWDAnimation.killTweensOf(n.mainButtonsHolder_do), FWDAnimation.killTweensOf(n.bk_do), n.scrMainHolder_do && n.allowToScrollAndScrollBarIsActive_bl && n.scrMainHolder_do.setVisible(!0), e ? (FWDAnimation.to(n.bk_do, .8, {
                    alpha: 1
                }), FWDAnimation.to(n.mainButtonsHolder_do, .8, {
                    y: n.buttonHeight + i.spaceBetweenThumbnails,
                    ease: Expo.easeInOut
                })) : (n.bk_do.setAlpha(1), n.mainButtonsHolder_do.setY(n.buttonHeight + i.spaceBetweenThumbnails)))
            }, this.setupScrollLogic = function() {
                n.setupMobileScrollbar(), n.isMbl || n.setupScrollbar(), n.addMouseWheelSupport_bl && n.addMouseWheelSupport()
            }, this.setupMobileScrollbar = function() {
                n.hasPointEvt ? n.mainButtonsHolder_do.screen.addEventListener("pointerdown", n.scrollBarTouchStartHandler) : n.mainButtonsHolder_do.screen.addEventListener("touchstart", n.scrollBarTouchStartHandler), n.isMbl && (n.updateMobileScrollBarId_int = setInterval(n.updateMobileScrollBar, 16))
            }, this.scrollBarTouchStartHandler = function(e) {
                e.preventDefault && e.preventDefault(), n.isScrollingOnMove_bl = !1, FWDAnimation.killTweensOf(n.buttonsHolder_do);
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                n.isDragging_bl = !0, n.lastPresedY = t.screenY, n.checkLastPresedY = t.screenY, n.hasPointEvt ? (o.addEventListener("pointerup", n.scrollBarTouchEndHandler), o.addEventListener("pointermove", n.scrollBarTouchMoveHandler)) : (o.addEventListener("touchend", n.scrollBarTouchEndHandler), o.addEventListener("touchmove", n.scrollBarTouchMoveHandler)), o.addEventListener("mouseup", n.scrollBarTouchEndHandler), o.addEventListener("mousemove", n.scrollBarTouchMoveHandler), clearInterval(n.updateMoveMobileScrollbarId_int), n.updateMoveMobileScrollbarId_int = setInterval(n.updateMoveMobileScrollbar, 20)
            }, this.scrollBarTouchMoveHandler = function(e) {
                if (e.preventDefault && e.preventDefault(), e.stopImmediatePropagation(), !(n.ttBtnH < n.mainButtonsHolder_do.h)) {
                    i.prt.showDisable();
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    (t.screenY >= n.checkLastPresedY + 6 || t.screenY <= n.checkLastPresedY - 6) && (n.isScrollingOnMove_bl = !0);
                    var s = t.screenY - n.lastPresedY;
                    if (n.thmbsFinY += s, n.thmbsFinY = Math.round(n.thmbsFinY), n.lastPresedY = t.screenY, n.vy = 2 * s, !n.isMobile) {
                        0 < n.thmbsFinY ? n.thmbsFinY = 0 : n.thmbsFinY < n.mainButtonsHolder_do.h - n.ttBtnH && (n.thmbsFinY = n.mainButtonsHolder_do.h - n.ttBtnH);
                        var o = Math.max(0, n.thmbsFinY / (n.mainButtonsHolder_do.h - n.ttBtnH));
                        n.scrMainHolder_do && (n.scrBarHandY = Math.round((n.scrMainHolder_do.h - n.scrHandler_do.h) * o), n.scrBarHandY < 0 ? n.scrBarHandY = 0 : n.scrBarHandY > n.scrMainHolder_do.h - n.scrHandler_do.h - 1 && (n.scrBarHandY = n.scrMainHolder_do.h - n.scrHandler_do.h - 1), FWDAnimation.killTweensOf(n.scrHandler_do), FWDAnimation.killTweensOf(n.scrHandlerLines_do), n.scrHandler_do.setY(n.scrBarHandY), n.scrHandlerLines_do.setY(n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLinesN_do.h) / 2)))
                    }
                }
            }, this.scrollBarTouchEndHandler = function(e) {
                n.isDragging_bl = !1, clearInterval(n.updateMoveMobileScrollbarId_int), clearTimeout(n.disableOnMoveId_to), n.disableOnMoveId_to = setTimeout(function() {
                    i.prt.hideDisable()
                }, 100), n.hasPointEvt ? (o.removeEventListener("pointerup", n.scrollBarTouchEndHandler), o.removeEventListener("pointermove", n.scrollBarTouchMoveHandler)) : (o.removeEventListener("touchend", n.scrollBarTouchEndHandler), o.removeEventListener("touchmove", n.scrollBarTouchMoveHandler)), o.removeEventListener("mousemove", n.scrollBarTouchMoveHandler)
            }, this.updateMoveMobileScrollbar = function() {
                n.buttonsHolder_do.setY(n.thmbsFinY)
            }, this.updateMobileScrollBar = function(e) {
                n.isDragging_bl || (n.ttBtnH < n.mainButtonsHolder_do.h && (n.thmbsFinY = .01), n.vy *= n.frc, n.thmbsFinY += n.vy, 0 < n.thmbsFinY ? (n.vy2 = .3 * (0 - n.thmbsFinY), n.vy *= n.frc, n.thmbsFinY += n.vy2) : n.thmbsFinY < n.mainButtonsHolder_do.h - n.ttBtnH && (n.vy2 = .3 * (n.mainButtonsHolder_do.h - n.ttBtnH - n.thmbsFinY), n.vy *= n.frc, n.thmbsFinY += n.vy2), n.buttonsHolder_do.setY(Math.round(n.thmbsFinY)))
            }, this.setupScrollbar = function() {
                n.scrMainHolder_do = new FWDUVPDisplayObject("div"), n.scrMainHolder_do.setVisible(!1), n.scrMainHolder_do.setWidth(i.scrWidth), n.scrTrack_do = new FWDUVPDisplayObject("div"), n.scrTrack_do.setWidth(i.scrWidth);
                var e = new Image;
                e.src = i.scrBkTop_img.src, n.scrTrackTop_do = new FWDUVPDisplayObject("img"), n.scrTrackTop_do.setWidth(i.scrTrackTop_do.w), n.scrTrackTop_do.setHeight(i.scrTrackTop_do.h), n.scrTrackTop_do.setScreen(e), n.scrTrackMiddle_do = new FWDUVPDisplayObject("div"), n.scrTrackMiddle_do.getStyle().background = "url('" + i.data.scrBkMiddlePath_str + "')", n.scrTrackMiddle_do.setWidth(i.scrWidth), n.scrTrackMiddle_do.setY(n.scrTrackTop_do.h);
                var t = new Image;
                t.src = i.data.scrBkBottomPath_str, n.scrTrackBottom_do = new FWDUVPDisplayObject("img"), n.scrTrackBottom_do.setScreen(t), n.scrTrackBottom_do.setWidth(n.scrTrackTop_do.w), n.scrTrackBottom_do.setHeight(n.scrTrackTop_do.h), n.scrHandler_do = new FWDUVPDisplayObject("div"), n.scrHandler_do.setWidth(i.scrWidth), n.scrDragTop_img = new Image, n.scrDragTop_img.src = i.scrDragTop_img.src, n.scrDragTop_img.width = i.scrDragTop_img.width, n.scrDragTop_img.height = i.scrDragTop_img.height, n.scrHandlerTop_do = new FWDUVPDisplayObject("img"), n.useHEX ? (n.scrHandlerTop_do = new FWDUVPDisplayObject("div"), n.scrHandlerTop_do.setWidth(n.scrDragTop_img.width), n.scrHandlerTop_do.setHeight(n.scrDragTop_img.height), n.mainScrubberDragTop_canvas = FWDUVPUtils.getCanvasWithModifiedColor(n.scrDragTop_img, n.nBC).canvas, n.scrHandlerTop_do.screen.appendChild(n.mainScrubberDragTop_canvas)) : (n.scrHandlerTop_do = new FWDUVPDisplayObject("img"), n.scrHandlerTop_do.setScreen(n.scrDragTop_img)), n.scrHandlerMiddle_do = new FWDUVPDisplayObject("div"), n.middleImage = new Image, n.middleImage.src = i.data.scrDragMiddlePath_str, n.useHEX ? n.middleImage.onload = function() {
                    n.scrubberDragMiddle_canvas = FWDUVPUtils.getCanvasWithModifiedColor(n.middleImage, n.nBC, !0), n.scrubberDragImage_img = n.scrubberDragMiddle_canvas.image, n.scrHandlerMiddle_do.getStyle().background = "url('" + n.scrubberDragImage_img.src + "') repeat-y"
                } : n.scrHandlerMiddle_do.getStyle().background = "url('" + i.data.scrDragMiddlePath_str + "')", n.scrHandlerMiddle_do.setWidth(i.scrWidth), n.scrHandlerMiddle_do.setY(n.scrHandlerTop_do.h), n.scrHandlerBottom_do = new FWDUVPDisplayObject("div"), n.bottomImage = new Image, n.bottomImage.src = i.data.scrDragMiddlePath_str, n.useHEX ? n.bottomImage.onload = function() {
                    n.scrubberDragBottom_canvas = FWDUVPUtils.getCanvasWithModifiedColor(n.bottomImage, n.nBC, !0), n.scrubberDragBottomImage_img = n.scrubberDragBottom_canvas.image, n.scrHandlerBottom_do.getStyle().background = "url('" + n.scrubberDragBottomImage_img.src + "') repeat-y"
                } : n.scrHandlerBottom_do.getStyle().background = "url('" + i.data.scrDragBottomPath_str + "')", n.scrHandlerBottom_do.setWidth(i.scrWidth), n.scrHandlerBottom_do.setY(n.scrHandlerTop_do.h), n.scrHandlerBottom_do.setWidth(n.scrHandlerTop_do.w), n.scrHandlerBottom_do.setHeight(n.scrHandlerTop_do.h), n.scrHandler_do.setButtonMode(!0), n.scrLinesN_img = new Image, n.scrLinesN_img.src = i.scrLinesN_img.src, n.scrLinesN_img.width = i.scrLinesN_img.width, n.scrLinesN_img.height = i.scrLinesN_img.height, n.useHEX ? (n.scrHandlerLinesN_do = new FWDUVPDisplayObject("div"), n.scrHandlerLinesN_do.setWidth(n.scrLinesN_img.width), n.scrHandlerLinesN_do.setHeight(n.scrLinesN_img.height), n.mainhandlerN_canvas = FWDUVPUtils.getCanvasWithModifiedColor(n.scrLinesN_img, n.sBC).canvas, n.scrHandlerLinesN_do.screen.appendChild(n.mainhandlerN_canvas)) : (n.scrHandlerLinesN_do = new FWDUVPDisplayObject("img"), n.scrHandlerLinesN_do.setScreen(n.scrLinesN_img)), n.scrHandlerLinesS_img = new Image, n.scrHandlerLinesS_img.src = i.data.scrLinesSPath_str, n.useHEX ? (n.scrHandlerLinesS_do = new FWDUVPDisplayObject("div"), n.scrHandlerLinesS_img.onload = function() {
                    n.scrHandlerLinesS_do.setWidth(n.scrHandlerLinesN_do.w), n.scrHandlerLinesS_do.setHeight(n.scrHandlerLinesN_do.h), n.scrubberLines_s_canvas = FWDUVPUtils.getCanvasWithModifiedColor(n.scrHandlerLinesS_img, n.sBC, !0), n.scrubbelinesSImage_img = n.scrubberLines_s_canvas.image, n.scrHandlerLinesS_do.getStyle().background = "url('" + n.scrubbelinesSImage_img.src + "') repeat-y"
                }) : (n.scrHandlerLinesS_do = new FWDUVPDisplayObject("img"), n.scrHandlerLinesS_do.setScreen(n.scrHandlerLinesS_img), n.scrHandlerLinesS_do.setWidth(n.scrHandlerLinesN_do.w), n.scrHandlerLinesS_do.setHeight(n.scrHandlerLinesN_do.h)), n.scrHandlerLinesS_do.setAlpha(0), n.scrHandlerLines_do = new FWDUVPDisplayObject("div"), n.scrHandlerLines_do.setWidth(n.scrHandlerLinesN_do.w), n.scrHandlerLines_do.setHeight(n.scrHandlerLinesN_do.h), n.scrHandlerLines_do.setButtonMode(!0), n.scrTrack_do.addChild(n.scrTrackTop_do), n.scrTrack_do.addChild(n.scrTrackMiddle_do), n.scrTrack_do.addChild(n.scrTrackBottom_do), n.scrHandler_do.addChild(n.scrHandlerTop_do), n.scrHandler_do.addChild(n.scrHandlerMiddle_do), n.scrHandler_do.addChild(n.scrHandlerBottom_do), n.scrHandlerLines_do.addChild(n.scrHandlerLinesN_do), n.scrHandlerLines_do.addChild(n.scrHandlerLinesS_do), n.scrMainHolder_do.addChild(n.scrTrack_do), n.scrMainHolder_do.addChild(n.scrHandler_do), n.scrMainHolder_do.addChild(n.scrHandlerLines_do), n.mainButtonsHolder_do.addChild(n.scrMainHolder_do), n.scrHandler_do.screen.addEventListener ? (n.scrHandler_do.screen.addEventListener("mouseover", n.scrollBarHandlerOnMouseOver), n.scrHandler_do.screen.addEventListener("mouseout", n.scrollBarHandlerOnMouseOut), n.scrHandler_do.screen.addEventListener("mousedown", n.scrollBarHandlerOnMouseDown), n.scrHandlerLines_do.screen.addEventListener("mouseover", n.scrollBarHandlerOnMouseOver), n.scrHandlerLines_do.screen.addEventListener("mouseout", n.scrollBarHandlerOnMouseOut), n.scrHandlerLines_do.screen.addEventListener("mousedown", n.scrollBarHandlerOnMouseDown)) : n.scrHandler_do.screen.attachEvent && (n.scrHandler_do.screen.attachEvent("onmouseover", n.scrollBarHandlerOnMouseOver), n.scrHandler_do.screen.attachEvent("onmouseout", n.scrollBarHandlerOnMouseOut), n.scrHandler_do.screen.attachEvent("onmousedown", n.scrollBarHandlerOnMouseDown), n.scrHandlerLines_do.screen.attachEvent("onmouseover", n.scrollBarHandlerOnMouseOver), n.scrHandlerLines_do.screen.attachEvent("onmouseout", n.scrollBarHandlerOnMouseOut), n.scrHandlerLines_do.screen.attachEvent("onmousedown", n.scrollBarHandlerOnMouseDown))
            }, this.scrollBarHandlerOnMouseOver = function(e) {
                n.allowToScrollAndScrollBarIsActive_bl && (FWDAnimation.killTweensOf(n.scrHandlerLinesN_do), FWDAnimation.killTweensOf(n.scrHandlerLinesS_do), FWDAnimation.to(n.scrHandlerLinesN_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(n.scrHandlerLinesS_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }))
            }, this.scrollBarHandlerOnMouseOut = function(e) {
                !n.isDragging_bl && n.allowToScrollAndScrollBarIsActive_bl && (FWDAnimation.killTweensOf(n.scrHandlerLinesN_do), FWDAnimation.killTweensOf(n.scrHandlerLinesS_do), FWDAnimation.to(n.scrHandlerLinesN_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(n.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }))
            }, this.scrollBarHandlerOnMouseDown = function(e) {
                if (n.allowToScrollAndScrollBarIsActive_bl) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    n.isDragging_bl = !0, n.yPositionOnPress = n.scrHandler_do.y, n.lastPresedY = t.screenY, FWDAnimation.killTweensOf(n.scrHandler_do), i.prt.showDisable(), o.addEventListener ? (o.addEventListener("mousemove", n.scrollBarHandlerMoveHandler), o.addEventListener("mouseup", n.scrollBarHandlerEndHandler)) : document.attachEvent && (document.attachEvent("onmousemove", n.scrollBarHandlerMoveHandler), document.attachEvent("onmouseup", n.scrollBarHandlerEndHandler))
                }
            }, this.scrollBarHandlerMoveHandler = function(e) {
                e.preventDefault && e.preventDefault();
                var t = FWDUVPUtils.getViewportMouseCoordinates(e),
                    s = n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLines_do.h) / 2);
                n.scrBarHandY = Math.round(n.yPositionOnPress + t.screenY - n.lastPresedY), n.scrBarHandY >= n.scrTrack_do.h - n.scrHandler_do.h ? n.scrBarHandY = n.scrTrack_do.h - n.scrHandler_do.h : n.scrBarHandY <= 0 && (n.scrBarHandY = 0), n.scrHandler_do.setY(n.scrBarHandY), FWDAnimation.killTweensOf(n.scrHandler_do), FWDAnimation.to(n.scrHandlerLines_do, .8, {
                    y: s,
                    ease: Quart.easeOut
                }), n.updateScrollBarHandlerAndContent(!0)
            }, n.scrollBarHandlerEndHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                n.isDragging_bl = !1, FWDUVPUtils.hitTest(n.scrHandler_do.screen, t.screenX, t.screenY) || (FWDAnimation.killTweensOf(n.scrHandlerLinesN_do), FWDAnimation.killTweensOf(n.scrHandlerLinesS_do), FWDAnimation.to(n.scrHandlerLinesN_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(n.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })), i.prt.hideDisable(), FWDAnimation.killTweensOf(n.scrHandler_do), FWDAnimation.to(n.scrHandler_do, .4, {
                    y: n.scrBarHandY,
                    ease: Quart.easeOut
                }), o.removeEventListener ? (o.removeEventListener("mousemove", n.scrollBarHandlerMoveHandler), o.removeEventListener("mouseup", n.scrollBarHandlerEndHandler)) : document.detachEvent && (document.detachEvent("onmousemove", n.scrollBarHandlerMoveHandler), document.detachEvent("onmouseup", n.scrollBarHandlerEndHandler))
            }, this.updateScrollBarSizeActiveAndDeactivate = function() {
                n.disableForAWhileAfterThumbClick_bl || (n.allowToScrollAndScrollBarIsActive_bl ? (n.allowToScrollAndScrollBarIsActive_bl = !0, n.scrMainHolder_do.setX(n.sW - n.scrMainHolder_do.w), n.scrMainHolder_do.setHeight(n.mainButtonsHolder_do.h), n.scrTrack_do.setHeight(n.scrMainHolder_do.h), n.scrTrackMiddle_do.setHeight(n.scrTrack_do.h - 2 * n.scrTrackTop_do.h), n.scrTrackBottom_do.setY(n.scrTrackMiddle_do.y + n.scrTrackMiddle_do.h), n.scrMainHolder_do.setAlpha(1), n.scrHandler_do.setButtonMode(!0), n.scrHandlerLines_do.setButtonMode(!0)) : (n.allowToScrollAndScrollBarIsActive_bl = !1, n.scrMainHolder_do.setX(n.sW - n.scrMainHolder_do.w), n.scrMainHolder_do.setHeight(n.mainButtonsHolder_do.h), n.scrTrack_do.setHeight(n.scrMainHolder_do.h), n.scrTrackMiddle_do.setHeight(n.scrTrack_do.h - 2 * n.scrTrackTop_do.h), n.scrTrackBottom_do.setY(n.scrTrackMiddle_do.y + n.scrTrackMiddle_do.h), n.scrMainHolder_do.setAlpha(.5), n.scrHandler_do.setY(0), n.scrHandler_do.setButtonMode(!1), n.scrHandlerLines_do.setButtonMode(!1)), n.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1, n.scrMainHolder_do.h / n.ttBtnH) * n.scrMainHolder_do.h))), n.scrHandlerMiddle_do.setHeight(n.scrHandler_do.h - 2 * n.scrHandlerTop_do.h), n.scrHandlerBottom_do.setY(n.scrHandlerMiddle_do.y + n.scrHandlerMiddle_do.h), FWDAnimation.killTweensOf(n.scrHandlerLines_do), n.scrHandlerLines_do.setY(n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLines_do.h) / 2)), n.scrHandlerBottom_do.setY(n.scrHandler_do.h - n.scrHandlerBottom_do.h))
            }, this.addMouseWheelSupport = function() {
                n.screen.addEventListener ? (n.screen.addEventListener("DOMMouseScroll", n.mouseWheelHandler), n.screen.addEventListener("mousewheel", n.mouseWheelHandler)) : n.screen.attachEvent && n.screen.attachEvent("onmousewheel", n.mouseWheelHandler)
            }, n.mouseWheelHandler = function(e) {
                if (e.preventDefault && e.preventDefault(), n.disableMouseWheel_bl || n.isDragging_bl) return !1;
                var t = e.detail || e.wheelDelta;
                e.wheelDelta && (t *= -1), 0 < t ? n.scrBarHandY += Math.round(160 * n.scollbarSpeedSensitivity * (n.mainButtonsHolder_do.h / n.ttBtnH)) : t < 0 && (n.scrBarHandY -= Math.round(160 * n.scollbarSpeedSensitivity * (n.mainButtonsHolder_do.h / n.ttBtnH))), n.scrBarHandY >= n.scrTrack_do.h - n.scrHandler_do.h ? n.scrBarHandY = n.scrTrack_do.h - n.scrHandler_do.h : n.scrBarHandY <= 0 && (n.scrBarHandY = 0);
                var s = n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLines_do.h) / 2);
                if (FWDAnimation.killTweensOf(n.scrHandler_do), FWDAnimation.killTweensOf(n.scrHandlerLines_do), FWDAnimation.to(n.scrHandlerLines_do, .8, {
                        y: s,
                        ease: Quart.easeOut
                    }), FWDAnimation.to(n.scrHandler_do, .5, {
                        y: n.scrBarHandY,
                        ease: Quart.easeOut
                    }), n.isDragging_bl = !0, n.updateScrollBarHandlerAndContent(!0), n.isDragging_bl = !1, !e.preventDefault) return !1;
                e.preventDefault()
            }, this.updateScrollBarHandlerAndContent = function(e, t) {
                if (!n.disableForAWhileAfterThumbClick_bl && (n.allowToScrollAndScrollBarIsActive_bl || t)) {
                    var s = 0;
                    n.isDragging_bl && !n.isMbl ? ("Infinity" == (s = n.scrBarHandY / (n.scrMainHolder_do.h - n.scrHandler_do.h)) ? s = 0 : 1 <= s && (scrollPercent = 1), n.thmbsFinY = -1 * Math.round(s * (n.ttBtnH - n.mainButtonsHolder_do.h)), 0 == n.mainButtonsHolder_do.h && (n.thmbsFinY = 0)) : (s = n.curId / (n.ttBtns - 1), n.thmbsFinY = Math.min(0, -1 * Math.round(s * (n.ttBtnH - n.mainButtonsHolder_do.h))), 0 == n.mainButtonsHolder_do.h && (n.thmbsFinY = 0), n.scrMainHolder_do && (n.scrBarHandY = Math.round((n.scrMainHolder_do.h - n.scrHandler_do.h) * s), n.scrBarHandY < 0 ? n.scrBarHandY = 0 : n.scrBarHandY > n.scrMainHolder_do.h - n.scrHandler_do.h - 1 && (n.scrBarHandY = n.scrMainHolder_do.h - n.scrHandler_do.h - 1), FWDAnimation.killTweensOf(n.scrHandler_do), FWDAnimation.killTweensOf(n.scrHandlerLines_do), e ? (FWDAnimation.to(n.scrHandler_do, .4, {
                        y: n.scrBarHandY,
                        ease: Quart.easeOut
                    }), FWDAnimation.to(n.scrHandlerLines_do, .8, {
                        y: n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLinesN_do.h) / 2),
                        ease: Quart.easeOut
                    })) : (n.scrHandler_do.setY(n.scrBarHandY), n.scrHandlerLines_do.setY(n.scrBarHandY + parseInt((n.scrHandler_do.h - n.scrHandlerLinesN_do.h) / 2))))), n.lastThumbnailFinalY != n.thmbsFinY && (FWDAnimation.killTweensOf(n.buttonsHolder_do), e ? FWDAnimation.to(n.buttonsHolder_do, .5, {
                        y: n.thmbsFinY,
                        ease: Quart.easeOut
                    }) : n.buttonsHolder_do.setY(n.thmbsFinY)), n.lastThumbnailFinalY = n.thmbsFinY
                }
            }, this.init()
        };
        t.setPrototype = function() {
            t.prototype = new FWDUVPDisplayObject("div")
        }, t.OPEN = "open", t.HIDE_COMPLETE = "infoWindowHideComplete", t.BUTTON_PRESSED = "buttonPressed", t.prototype = null, o.FWDUVPComboBox = t
    }(window), function() {
        var d = function(t, e, s, o, i, l, n, a) {
            var r = this;
            d.prototype;
            this.bk_sdo = null, this.text_sdo = null, this.dumy_sdo = null, this.label1_str = e, this.bkNClr = s, this.bkSClr = o, this.txtNClr = i, this.txtSClr = l, this.totalWidth = 400, this.totalHeight = a, this.id = n, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.isMbl = FWDUVPUtils.isMobile, this.isDisabled_bl = !1, r.init = function() {
                r.setBackfaceVisibility(), r.setButtonMode(!0), r.setupMainContainers(), r.setWidth(r.totalWidth), r.setHeight(r.totalHeight), r.setNormalState()
            }, r.setupMainContainers = function() {
                r.bk_sdo = new FWDUVPDisplayObject("div"), r.bk_sdo.setBkColor(r.bkNClr), r.addChild(r.bk_sdo), r.text_sdo = new FWDUVPDisplayObject("div"), r.text_sdo.getStyle().whiteSpace = "nowrap", r.text_sdo.screen.className = "fwduvp-cb-button", r.text_sdo.setBackfaceVisibility(), r.text_sdo.setOverflow("visible"), r.text_sdo.setDisplay("inline-block"), r.text_sdo.getStyle().fontFamily = "Arial", r.text_sdo.getStyle().fontSize = "13px", r.text_sdo.getStyle().padding = "6px", r.text_sdo.getStyle().fontWeight = "100", r.text_sdo.getStyle().color = r.nBC, r.text_sdo.getStyle().fontSmoothing = "antialiased", r.text_sdo.getStyle().webkitFontSmoothing = "antialiased", r.text_sdo.getStyle().textRendering = "optimizeLegibility", FWDUVPUtils.isIEAndLessThen9 ? r.text_sdo.screen.innerText = r.label1_str : r.text_sdo.setInnerHTML(r.label1_str), r.addChild(r.text_sdo), r.dumy_sdo = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (r.dumy_sdo.setBkColor("#FF0000"), r.dumy_sdo.setAlpha(0)), r.addChild(r.dumy_sdo), r.hasPointerEvent_bl ? (r.screen.addEventListener("pointerup", r.onClick), r.screen.addEventListener("pointerover", r.onMouseOver), r.screen.addEventListener("pointerout", r.onMouseOut)) : r.screen.addEventListener && (r.isMbl || (r.screen.addEventListener("mouseover", r.onMouseOver), r.screen.addEventListener("mouseout", r.onMouseOut), r.screen.addEventListener("mouseup", r.onClick)), r.screen.addEventListener("touchend", r.onClick))
            }, r.onMouseOver = function(e) {
                r.isDisabled_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || (FWDAnimation.killTweensOf(r.text_sdo), r.setSelectedState(!0), r.dispatchEvent(d.MOUSE_OVER))
            }, r.onMouseOut = function(e) {
                r.isDisabled_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || (FWDAnimation.killTweensOf(r.text_sdo), r.setNormalState(!0), r.dispatchEvent(d.MOUSE_OUT))
            }, r.onClick = function(e) {
                r.isDisabled_bl || t.isScrollingOnMove_bl || (e.preventDefault && e.preventDefault(), r.dispatchEvent(d.CLICK))
            }, r.onMouseDown = function(e) {
                r.isDisabled_bl || t.isScrollingOnMove_bl || (e.preventDefault && e.preventDefault(), r.dispatchEvent(d.MOUSE_DOWN, {
                    e: e
                }))
            }, this.setSelectedState = function(e) {
                FWDAnimation.killTweensOf(r.bk_sdo.screen), FWDAnimation.killTweensOf(r.text_sdo.screen), e ? (FWDAnimation.to(r.bk_sdo.screen, .6, {
                    css: {
                        backgroundColor: r.bkSClr
                    },
                    ease: Quart.easeOut
                }), FWDAnimation.to(r.text_sdo.screen, .6, {
                    css: {
                        color: r.txtSClr
                    },
                    ease: Quart.easeOut
                })) : (r.bk_sdo.setBkColor(r.bkSClr), r.text_sdo.getStyle().color = r.txtSClr)
            }, this.setNormalState = function(e) {
                FWDAnimation.killTweensOf(r.bk_sdo.screen), FWDAnimation.killTweensOf(r.text_sdo.screen), e ? (FWDAnimation.to(r.bk_sdo.screen, .6, {
                    css: {
                        backgroundColor: r.bkNClr
                    },
                    ease: Quart.easeOut
                }), FWDAnimation.to(r.text_sdo.screen, .6, {
                    css: {
                        color: r.txtNClr
                    },
                    ease: Quart.easeOut
                })) : (r.bk_sdo.setBkColor(r.bkNClr), r.text_sdo.getStyle().color = r.txtNClr)
            }, r.centerText = function() {
                r.dumy_sdo.setWidth(r.totalWidth), r.dumy_sdo.setHeight(r.totalHeight), r.bk_sdo.setWidth(r.totalWidth), r.bk_sdo.setHeight(r.totalHeight), r.text_sdo.setX(4), r.text_sdo.setY(Math.round((r.totalHeight - r.text_sdo.getHeight()) / 2))
            }, r.getMaxTextWidth = function() {
                return r.text_sdo.getWidth()
            }, this.disable = function() {
                r.isDisabled_bl = !0, r.setButtonMode(!1), r.setSelectedState(!0)
            }, this.enable = function() {
                r.isDisabled_bl = !1, r.setNormalState(!0), r.setButtonMode(!0)
            }, r.init()
        };
        d.setPrototype = function() {
            d.prototype = new FWDUVPDisplayObject("div")
        }, d.FIRST_BUTTON_CLICK = "onFirstClick", d.SECOND_BUTTON_CLICK = "secondButtonOnClick", d.MOUSE_OVER = "onMouseOver", d.MOUSE_OUT = "onMouseOut", d.MOUSE_DOWN = "onMouseDown", d.CLICK = "onClick", d.prototype = null, window.FWDUVPComboBoxButton = d
    }(window), function() {
        var f = function(e, t, s, o, i, l, n, a, r, d, u, h, c) {
            var _ = this;
            f.prototype;
            this.arrowN_str = s, this.arrowS_str = o, this.label1_str = i, this.bkNColor = l, this.bkSColor = n, this.tNColor = a, this.tSColor = r, _.useHEX = u, _.nBC = h, _.sBC = c, this.totalWidth = 400, this.totalHeight = d, this.arrowWidth = e, this.arrowHeight = t, this.hasPointEvt = FWDUVPUtils.hasPointerEvent, this.isMbl = FWDUVPUtils.isMobile, this.isDble = !1, _.init = function() {
                _.setBackfaceVisibility(), _.setButtonMode(!0), _.setupMainContainers(), _.setWidth(_.totalWidth), _.setHeight(_.totalHeight)
            }, _.setupMainContainers = function() {
                _.bk_sdo = new FWDUVPDisplayObject("div"), _.bk_sdo.getStyle().backgroundColor = _.bkNColor, _.addChild(_.bk_sdo), _.text_sdo = new FWDUVPDisplayObject("div"), _.text_sdo.getStyle().whiteSpace = "nowrap", _.text_sdo.screen.className = "fwduvp-cb-selector", _.text_sdo.setBackfaceVisibility(), _.text_sdo.setOverflow("visible"), _.text_sdo.setDisplay("inline-block"), _.text_sdo.getStyle().fontFamily = "Arial", _.text_sdo.getStyle().fontSize = "13px", _.text_sdo.getStyle().fontWeight = "100", _.text_sdo.getStyle().padding = "6px", _.text_sdo.getStyle().color = _.nBC, _.text_sdo.getStyle().fontSmoothing = "antialiased", _.text_sdo.getStyle().webkitFontSmoothing = "antialiased", _.text_sdo.getStyle().textRendering = "optimizeLegibility", FWDUVPUtils.isIEAndLessThen9 ? _.text_sdo.screen.innerText = _.label1_str : _.text_sdo.setInnerHTML(_.label1_str), _.addChild(_.text_sdo), _.arrow_do = new FWDUVPDisplayObject("div"), _.arrow_do.screen.className = "arrow", _.arrow_do.setOverflow("visible"), _.useHEX ? (_.arrowN_img = new Image, _.arrowN_img.src = _.arrowN_str, _.arrowS_img = new Image, _.arrowS_img.src = _.arrowS_str, _.arrowN_sdo = new FWDUVPDisplayObject("div"), _.arrowS_sdo = new FWDUVPDisplayObject("div"), _.arrowS_img.onload = function() {
                    _.arrowN_sdo.setWidth(_.arrowN_img.width), _.arrowN_sdo.setHeight(_.arrowN_img.height), _.nBC = _.bkNColor, _.scrubberLines_n_canvas = FWDUVPUtils.getCanvasWithModifiedColor(_.arrowN_img, _.nBC, !0), _.scrubbelinesNImage_img = _.scrubberLines_n_canvas.image, _.arrowN_sdo.getStyle().background = "url('" + _.scrubbelinesNImage_img.src + "') repeat-y", _.arrowS_sdo.setWidth(_.arrowS_img.width), _.arrowS_sdo.setHeight(_.arrowS_img.height), _.sBC = _.arrowS_str, _.scrubberLines_s_canvas = FWDUVPUtils.getCanvasWithModifiedColor(_.arrowS_img, _.sBC, !0), _.scrubbelinesSImage_img = _.scrubberLines_s_canvas.image, _.arrowS_sdo.getStyle().background = "url('" + _.scrubbelinesSImage_img.src + "') repeat-y"
                }) : (_.arrowN_sdo = new FWDUVPDisplayObject("div"), _.arrowN_sdo.screen.style.backgroundImage = "url(" + _.arrowN_str + ")", _.arrowS_sdo = new FWDUVPDisplayObject("div"), _.arrowS_sdo.screen.style.backgroundImage = "url(" + _.arrowS_str + ")"), _.arrowS_sdo.setAlpha(0), _.arrow_do.addChild(_.arrowN_sdo), _.arrow_do.addChild(_.arrowS_sdo), _.addChild(_.arrow_do), _.arrowN_sdo.setWidth(_.arrowWidth), _.arrowN_sdo.setHeight(_.arrowHeight), _.arrowS_sdo.setWidth(_.arrowWidth), _.arrowS_sdo.setHeight(_.arrowHeight), _.dumy_sdo = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (_.dumy_sdo.setBkColor("#FF0000"), _.dumy_sdo.setAlpha(0)), _.addChild(_.dumy_sdo), _.hasPointEvt ? (_.screen.addEventListener("pointerup", _.onClick), _.screen.addEventListener("pointerover", _.onMouseOver), _.screen.addEventListener("pointerout", _.onMouseOut)) : _.screen.addEventListener && (_.screen.addEventListener("mouseover", _.onMouseOver), _.screen.addEventListener("mouseout", _.onMouseOut), _.screen.addEventListener("mouseup", _.onClick), _.screen.addEventListener("touchend", _.onClick))
            }, _.onMouseOver = function(e) {
                _.isDble || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || (FWDAnimation.killTweensOf(_.text_sdo), _.setSelectedState(!0, 0), _.dispatchEvent(f.MOUSE_OVER))
            }, _.onMouseOut = function(e) {
                _.isDble || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE || (FWDAnimation.killTweensOf(_.text_sdo), _.setNormalState(!0, !0), _.dispatchEvent(f.MOUSE_OUT))
            }, _.onClick = function(e) {
                _.isDeveleper_bl ? window.open("", "_blank") : (e.preventDefault && e.preventDefault(), _.dispatchEvent(f.CLICK, {
                    e: e
                }))
            }, _.onMouseDown = function(e) {
                e.preventDefault && e.preventDefault(), _.dispatchEvent(f.MOUSE_DOWN, {
                    e: e
                })
            }, this.setSelectedState = function(e, t) {
                e ? (FWDAnimation.to(_.bk_sdo, .6, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(_.text_sdo.screen, .6, {
                    css: {
                        color: _.tSColor
                    },
                    ease: Expo.easeOut
                }), FWDAnimation.to(_.arrowS_sdo, .6, {
                    alpha: 1,
                    ease: Expo.easeOut
                })) : (_.bk_sdo.setAlpha(1), _.text_sdo.getStyle().color = _.tSColor, _.arrowS_sdo.alpha = 1)
            }, this.setNormalState = function(e, t) {
                var s = .6;
                t && (s = 0), s = 0, FWDAnimation.killTweensOf(_.bk_sdo), FWDAnimation.killTweensOf(_.text_sdo.screen), FWDAnimation.killTweensOf(_.arrowS_sdo), e ? (FWDAnimation.to(_.bk_sdo, .6, {
                    alpha: 0,
                    delay: s,
                    ease: Expo.easeOut
                }), FWDAnimation.to(_.text_sdo.screen, .6, {
                    css: {
                        color: _.tNColor
                    },
                    delay: s,
                    ease: Expo.easeOut
                }), FWDAnimation.to(_.arrowS_sdo, .6, {
                    alpha: 0,
                    delay: s,
                    ease: Expo.easeOut
                })) : (_.bk_sdo.setAlpha(0), _.text_sdo.getStyle().color = _.tNColor, _.arrowS_sdo.alpha = 0)
            }, _.centerText = function() {
                _.dumy_sdo.setWidth(_.totalWidth), _.dumy_sdo.setHeight(_.totalHeight), _.bk_sdo.setWidth(_.totalWidth), _.bk_sdo.setHeight(_.totalHeight), _.text_sdo.setX(2), _.text_sdo.setY(Math.round((_.totalHeight - _.text_sdo.getHeight()) / 2)), _.arrow_do.setX(_.totalWidth - _.arrowWidth - 5), _.arrow_do.setY(Math.round((_.totalHeight - _.arrowHeight) / 2))
            }, _.getMaxTextWidth = function() {
                return _.text_sdo.getWidth()
            }, this.disable = function() {
                _.isDble = !0, _.setSelectedState(!0), FWDUVPUtils.hasTransform2d && (FWDAnimation.to(_.arrowN_sdo.screen, .8, {
                    css: {
                        rotation: 180
                    },
                    ease: Quart.easeOut
                }), FWDAnimation.to(_.arrowS_sdo.screen, .8, {
                    css: {
                        rotation: 180
                    },
                    ease: Quart.easeOut
                })), _.setNormalState(!0)
            }, this.enable = function() {
                _.isDble = !1, FWDUVPUtils.hasTransform2d && (FWDAnimation.to(_.arrowN_sdo.screen, .8, {
                    css: {
                        rotation: 0
                    },
                    ease: Quart.easeOut
                }), FWDAnimation.to(_.arrowS_sdo.screen, .8, {
                    css: {
                        rotation: 0
                    },
                    ease: Quart.easeOut
                })), _.setButtonMode(!0)
            }, this.setText = function(e) {
                FWDUVPUtils.isIEAndLessThen9 ? _.text_sdo.screen.innerText = e : _.text_sdo.setInnerHTML(e)
            }, _.init()
        };
        f.setPrototype = function() {
            f.prototype = new FWDUVPDisplayObject("div")
        }, f.FIRST_BUTTON_CLICK = "onFirstClick", f.SECOND_BUTTON_CLICK = "secondButtonOnClick", f.MOUSE_OVER = "onMouseOver", f.MOUSE_OUT = "onMouseOut", f.MOUSE_DOWN = "onMouseDown", f.CLICK = "onClick", f.prototype = null, window.FWDUVPComboBoxSelector = f
    }(window), function() {
        var _ = function(e, t, s, o, i, l, n, a, r, d, u, h) {
            var c = this;
            _.prototype;
            this.iconCSSString = r, this.icon2CSSString = d, this.normalCalssName = u, this.selectedCalssName = h, this.n1Img = e, this.s1Path_str = t, this.n2Img = s, this.s2Path_str = o, this.firstButton_do, this.n1_do, this.s1_do, this.secondButton_do, this.n2_do, this.s2_do, this.n1Img && (this.buttonWidth = c.n1Img.width, this.buttonHeight = c.n1Img.height), this.useHEX = l, this.nBC = n, this.sBC = a, this.isSelectedState_bl = !1, this.currentState = 1, this.isDisabled_bl = !1, this.isMaximized_bl = !1, this.disptachMainEvent_bl = i, this.isDisabled_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !c.isMbl || c.hasPointerEvent_bl, this.useFontAwesome_bl = Boolean(this.iconCSSString), c.init = function() {
                c.hasTransform2d_bl = !1, c.setButtonMode(!0), c.setWidth(c.buttonWidth), c.setHeight(c.buttonHeight), c.setupMainContainers(), c.secondButton_do.setVisible(!1), c.setNormalState()
            }, c.setupMainContainers = function() {
                c.useFontAwesome_bl ? (c.setOverflow("visible"), c.firstButton_do = new FWDUVPDisplayObject("div"), c.firstButton_do.setOverflow("visible"), c.n1_do = new FWDUVPDisplayObject("div"), c.n1_do.setBac, c.n1_do.setInnerHTML(c.iconCSSString), c.firstButton_do.addChild(c.n1_do), c.secondButton_do = new FWDUVPDisplayObject("div"), c.secondButton_do.setOverflow("visible"), c.n2_do = new FWDUVPDisplayObject("div"), c.n2_do.setInnerHTML(c.icon2CSSString), c.secondButton_do.addChild(c.n2_do), c.setFinalSize()) : (c.firstButton_do = new FWDUVPDisplayObject("div"), c.firstButton_do.setWidth(c.buttonWidth), c.firstButton_do.setHeight(c.buttonHeight), c.useHEX ? (c.n1_do = new FWDUVPDisplayObject("div"), c.n1_do.setWidth(c.buttonWidth), c.n1_do.setHeight(c.buttonHeight), c.n1_sdo_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.n1Img, c.nBC).canvas, c.n1_do.screen.appendChild(c.n1_sdo_canvas)) : (c.n1_do = new FWDUVPDisplayObject("img"), c.n1_do.setScreen(c.n1Img)), c.firstButton_do.addChild(c.n1_do), c.allowToCreateSecondButton_bl && (c.s1_img = new Image, c.s1_img.src = c.s1Path_str, c.useHEX ? (c.s1_do = new FWDUVPTransformDisplayObject("div"), c.s1_do.setWidth(c.buttonWidth), c.s1_do.setHeight(c.buttonHeight), c.s1_img.onload = function() {
                    c.s1_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.s1_img, c.sBC).canvas, c.s1_do.screen.appendChild(c.s1_do_canvas)
                }) : (c.s1_do = new FWDUVPDisplayObject("img"), c.s1_do.setScreen(c.s1_img), c.s1_do.setWidth(c.buttonWidth), c.s1_do.setHeight(c.buttonHeight)), c.s1_do.setAlpha(0), c.firstButton_do.addChild(c.s1_do)), c.secondButton_do = new FWDUVPDisplayObject("div"), c.secondButton_do.setWidth(c.buttonWidth), c.secondButton_do.setHeight(c.buttonHeight), c.useHEX ? (c.n2_do = new FWDUVPDisplayObject("div"), c.n2_do.setWidth(c.buttonWidth), c.n2_do.setHeight(c.buttonHeight), c.n2_sdo_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.n2Img, c.nBC).canvas, c.n2_do.screen.appendChild(c.n2_sdo_canvas)) : (c.n2_do = new FWDUVPDisplayObject("img"), c.n2_do.setScreen(c.n2Img)), c.secondButton_do.addChild(c.n2_do), c.allowToCreateSecondButton_bl && (c.s2_img = new Image, c.s2_img.src = c.s2Path_str, c.useHEX ? (c.s2_do = new FWDUVPTransformDisplayObject("div"), c.s2_do.setWidth(c.buttonWidth), c.s2_do.setHeight(c.buttonHeight), c.s2_img.onload = function() {
                    c.s2_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.s2_img, c.sBC).canvas, c.s2_do.screen.appendChild(c.s2_do_canvas)
                }) : (c.s2_do = new FWDUVPDisplayObject("img"), c.s2_do.setScreen(c.s2_img), c.s2_do.setWidth(c.buttonWidth), c.s2_do.setHeight(c.buttonHeight)), c.s2_do.setAlpha(0), c.secondButton_do.addChild(c.s2_do))), c.addChild(c.secondButton_do), c.addChild(c.firstButton_do), c.hasPointerEvent_bl ? (c.screen.addEventListener("pointerup", c.onMouseUp), c.screen.addEventListener("pointerover", c.onMouseOver), c.screen.addEventListener("pointerout", c.onMouseOut)) : c.screen.addEventListener && (c.isMbl || (c.screen.addEventListener("mouseover", c.onMouseOver), c.screen.addEventListener("mouseout", c.onMouseOut), c.screen.addEventListener("mouseup", c.onMouseUp)), c.screen.addEventListener("toustart", c.onDown), c.screen.addEventListener("touchend", c.onMouseUp))
            }, c.onMouseOver = function(e, t) {
                c.isDisabled_bl || c.isSelectedState_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || (c.dispatchEvent(_.MOUSE_OVER, {
                    e: e
                }), c.dispatchEvent(_.SHOW_TOOLTIP, {
                    e: e
                }), c.setSelectedState(!0))
            }, c.onMouseOut = function(e) {
                !c.isDisabled_bl && c.isSelectedState_bl && (e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || (c.setNormalState(!0), c.dispatchEvent(_.MOUSE_OUT)))
            }, c.onDown = function(e) {
                e.preventDefault && e.preventDefault()
            }, c.onMouseUp = function(e) {
                c.isDisabled_bl || 2 == e.button || (e.preventDefault && e.preventDefault(), c.isMbl || c.onMouseOver(e, !1), c.disptachMainEvent_bl && c.dispatchEvent(_.MOUSE_UP, {
                    e: e
                }))
            }, c.checkCount = 0, this.setFinalSize = function() {
                if (clearInterval(c.checkId_int), c.lastWidth = c.n1_do.screen.firstChild.offsetWidth, !(5 < c.checkCount) && (c.checkCount++, c.checkId_int = setInterval(function() {
                        c.setFinalSize()
                    }, 100), c.prevWidth != c.lastWidth && 0 != c.lastWidth)) {
                    var e = Math.max(c.n1_do.screen.firstChild.offsetWidth, c.n2_do.screen.firstChild.offsetWidth),
                        t = Math.max(c.n1_do.screen.offsetHeight, c.n2_do.screen.firstChild.offsetHeight);
                    c.buttonWidth = e, c.buttonHeight = t, c.setWidth(e), c.setHeight(t), c.firstButton_do.setWidth(c.w), c.firstButton_do.setHeight(c.h), c.secondButton_do.setWidth(c.w), c.secondButton_do.setHeight(c.h), c.n1_do.setX(Math.round((e - c.n1_do.getWidth()) / 2)), c.n1_do.setY(Math.round((t - c.n1_do.getHeight()) / 2)), c.n2_do.setX(Math.round((e - c.n2_do.getWidth()) / 2)), c.n2_do.setY(Math.round((t - c.n2_do.getHeight()) / 2)), c.prevWidth = c.lastWidth
                }
            }, c.toggleButton = function() {
                1 == c.currentState ? (c.firstButton_do.setVisible(!1), c.secondButton_do.setVisible(!0), c.currentState = 0, c.dispatchEvent(_.FIRST_BUTTON_CLICK)) : (c.firstButton_do.setVisible(!0), c.secondButton_do.setVisible(!1), c.currentState = 1, c.dispatchEvent(_.SECOND_BUTTON_CLICK))
            }, c.setButtonState = function(e) {
                1 == e ? (c.firstButton_do.setVisible(!0), c.secondButton_do.setVisible(!1), c.currentState = 1) : (c.firstButton_do.setVisible(!1), c.secondButton_do.setVisible(!0), c.currentState = 0)
            }, this.setNormalState = function(e) {
                c.isMbl && !c.hasPointerEvent_bl && !c.useFontAwesome_bl || (c.isSelectedState_bl = !1, FWDAnimation.killTweensOf(c.s1_do), FWDAnimation.killTweensOf(c.s2_do), c.useFontAwesome_bl ? (FWDAnimation.killTweensOf(c.n1_do.screen), FWDAnimation.killTweensOf(c.n2_do.screen), e ? (FWDAnimation.to(c.n1_do.screen, .8, {
                    className: c.normalCalssName,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.n2_do.screen, .8, {
                    className: c.normalCalssName,
                    ease: Expo.easeOut
                })) : (c.n1_do.screen.className = c.normalCalssName, c.n2_do.screen.className = c.normalCalssName)) : (FWDAnimation.to(c.s1_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.s2_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                })))
            }, this.setSelectedState = function(e) {
                c.isSelectedState_bl = !0, FWDAnimation.killTweensOf(c.s1_do), FWDAnimation.killTweensOf(c.s2_do), c.useFontAwesome_bl ? (FWDAnimation.killTweensOf(c.n1_do.screen), FWDAnimation.killTweensOf(c.n2_do.screen), e ? (FWDAnimation.to(c.n1_do.screen, .8, {
                    className: c.selectedCalssName,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.n2_do.screen, .8, {
                    className: c.selectedCalssName,
                    ease: Expo.easeOut
                })) : (c.n1_do.screen.className = c.selectedCalssName, c.n2_do.screen.className = c.selectedCalssName)) : (FWDAnimation.to(c.s1_do, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.s2_do, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                }))
            }, this.disable = function() {
                c.isDisabled_bl || (c.isDisabled_bl = !0, c.setButtonMode(!1), FWDAnimation.killTweensOf(c), FWDAnimation.to(c, .6, {
                    alpha: .4
                }), c.setNormalState())
            }, this.enable = function() {
                c.isDisabled_bl && (c.isDisabled_bl = !1, c.setButtonMode(!0), FWDAnimation.killTweensOf(c), FWDAnimation.to(c, .6, {
                    alpha: 1
                }))
            }, this.updateHEXColors = function(e, t) {
                FWDUVPUtils.changeCanvasHEXColor(c.n1Img, c.n1_sdo_canvas, e), FWDUVPUtils.changeCanvasHEXColor(c.s1_img, c.s1_do_canvas, t), FWDUVPUtils.changeCanvasHEXColor(c.n2Img, c.n2_sdo_canvas, e), FWDUVPUtils.changeCanvasHEXColor(c.s2_img, c.s2_do_canvas, t)
            }, c.init()
        };
        _.setPrototype = function() {
            _.prototype = new FWDUVPDisplayObject("div")
        }, _.FIRST_BUTTON_CLICK = "onFirstClick", _.SECOND_BUTTON_CLICK = "secondButtonOnClick", _.MOUSE_OVER = "onMouseOver", _.MOUSE_OUT = "onMouseOut", _.MOUSE_UP = "onMouseUp", _.CLICK = "onClick", _.SHOW_TOOLTIP = "showTooltip", _.prototype = null, window.FWDUVPComplexButton = _
    }(window), function() {
        var e = function(l, n) {
            var r = this;
            e.prototype;
            r.prt = l, r.buttonsTest_ar = ["copy_url", "copy_url_time", "fullscreen"], r.itemsLabels_ar = ["Copy video URL", "Copy video URL at current time", "Fullscreen/Normalscreen"], r.items_ar = [], r.spacers_ar = [], r.copyURL_do = null, r.copyURLTime_do = null, r.backgroundColor_str = n.contextMenuBackgroundColor_str, r.borderColor_str = n.contextMenuBorderColor_str, r.spacerColor_str = n.contextMenuSpacerColor_str, r.itemNormalColor_str = n.contextMenuItemNormalColor_str, r.itemSelectedColor_str = n.contextMenuItemSelectedColor_str, r.itemDisabledColor_str = n.contextMenuItemDisabledColor_str, r.draggingMode_str = n.startDraggingMode_str, r.link_str = n.link_str, r.borderRadius = 0, r.biggestWidth, r.totalWidth = 400, r.totalHeight = 400, r.sapaceBetweenButtons = 7, r.padding = 6, r.getMaxWidthResizeAndPositionId_to, r.inverseNextAndPrevRotation_bl = n.inverseNextAndPrevRotation_bl, r.showScriptDeveloper_bl = n.showScriptDeveloper_bl, r.show_bl = !1, r.init = function() {
                (r.itemsLabels_ar || r.showScriptDeveloper_bl) && (r.show_bl = !0, r.setWidth(r.totalWidth), r.setHeight(r.totalHeight), r.setBkColor(r.backgroundColor_str), r.getStyle().borderColor = r.borderColor_str, r.getStyle().borderStyle = "solid", r.getStyle().borderRadius = r.borderRadius + "px", r.getStyle().borderWidth = "1px", r.setVisible(!1), r.setY(-2e3), r.prt.main_do.addChild(r), r.setupLabels(), r.setupDeveloperButton(), r.setupSpacers(), r.disable(), r.getMaxWidthResizeAndPositionId_to = setTimeout(r.getMaxWidthResizeAndPosition, 200)), r.addContextEvent()
            }, r.copyText = function(e) {
                var t = document.createElement("textarea");
                t.value = e, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t)
            }, r.setupLabels = function() {
                var e, t = r.buttonsTest_ar.length,
                    s = "",
                    o = "";
                if (r.itemsLabels_ar)
                    for (var i = 0; i < t; i++) "copy_url" == (e = r.buttonsTest_ar[i]) ? (s = r.itemsLabels_ar[i], FWDUVPContextMenuButton.setPrototype(), r.copyURL_do = new FWDUVPContextMenuButton(s, void 0, r.itemNormalColor_str, r.itemSelectedColor_str, r.itemDisabledColor_str), r.items_ar.push(r.copyURL_do), r.copyURL_do.addListener(FWDUVPContextMenuButton.MOUSE_DOWN, r.copyURLHandler), r.addChild(r.copyURL_do)) : "copy_url_time" == e ? (s = r.itemsLabels_ar[i], FWDUVPContextMenuButton.setPrototype(), r.copyURLTime_do = new FWDUVPContextMenuButton(s, void 0, r.itemNormalColor_str, r.itemSelectedColor_str, r.itemDisabledColor_str), r.items_ar.push(r.copyURLTime_do), r.copyURLTime_do.addListener(FWDUVPContextMenuButton.MOUSE_DOWN, r.copyURLAtTimeHandler), r.addChild(r.copyURLTime_do)) : "fullscreen" == e && n.showFullScreenButton_bl && (str = r.itemsLabels_ar[i], s = str.substr(0, str.indexOf("/")), o = str.substr(str.indexOf("/") + 1), FWDUVPContextMenuButton.setPrototype(), r.fullScreenButton_do = new FWDUVPContextMenuButton(s, o, r.itemNormalColor_str, r.itemSelectedColor_str, r.itemDisabledColor_str), r.items_ar.push(r.fullScreenButton_do), r.fullScreenButton_do.addListener(FWDUVPContextMenuButton.MOUSE_DOWN, r.fullScreenStartHandler), r.addChild(r.fullScreenButton_do))
            }, r.setupDeveloperButton = function() {
                r.showScriptDeveloper_bl && (r.itemsLabels_ar || (r.itemsLabels_ar = []), r.itemsLabels_ar.push("&#0169; made by FWD"), label1_str = "&#0169; made by FWD", FWDUVPContextMenuButton.setPrototype(), r.developerButton_do = new FWDUVPContextMenuButton(label1_str, void 0, r.itemNormalColor_str, r.itemSelectedColor_str, r.itemDisabledColor_str), r.developerButton_do.isDeveleper_bl = !0, r.items_ar.push(r.developerButton_do), r.addChild(r.developerButton_do))
            }, r.copyURLAtTimeHandler = function(e) {
                var t = l.curTime;
                5 == t.length && (t = "00:" + t);
                for (var s = String(t).split(":"), o = 0; o < s.length; o++) "00" == s[o] && (s[o] = "0");
                FWDUVPUtils.getHashUrlArgs(window.location.hash);
                var i = location.href;
                i = (i = (i = (i = i.replace(/&uvpi=.*/i, "")).replace(/&playlistId=.*/i, "")).replace(/playlistId=.*/i, "")).replace(/&t=.*/i, ""), -1 == (t = -1 == location.href.indexOf("?") ? 1 < FWDUVPlayer.instaces_ar.length ? i + "?uvpi=" + l.instanceName_str + "&playlistId=" + l.catId + "&videoId=" + l.id : i + "?playlistId=" + l.catId + "&videoId=" + l.id : 1 < FWDUVPlayer.instaces_ar.length ? i + "&uvpi=" + l.instanceName_str + "&playlistId=" + l.catId + "&videoId=" + l.id : i + "&playlistId=" + l.catId + "&videoId=" + l.id).indexOf("t=") && (t = t + "&t=" + s[0] + "h" + s[1] + "m" + s[2] + "s"), r.copyText(t), r.removeMenuId_to = setTimeout(r.removeFromDOM, 150)
            }, r.copyURLHandler = function(e) {
                r.copyText(location.href), r.removeMenuId_to = setTimeout(r.removeFromDOM, 150)
            }, r.fullScreenStartHandler = function(e) {
                0 == r.fullScreenButton_do.currentState ? l.goFullScreen() : 1 == r.fullScreenButton_do.currentState && l.goNormalScreen(), r.fullScreenButton_do.onMouseOut()
            }, r.updateFullScreenButton = function(e) {
                r.fullScreenButton_do && (0 == e ? r.fullScreenButton_do.setButtonState(0) : r.fullScreenButton_do.setButtonState(1), r.removeMenuId_to = setTimeout(r.removeFromDOM, 150))
            }, r.setupSpacers = function() {
                for (var e, t = r.items_ar.length - 1, s = 0; s < t; s++) e = new FWDUVPDisplayObject("div"), (r.spacers_ar[s] = e).setHeight(1), e.setBkColor(r.spacerColor_str), r.addChild(e)
            }, r.getMaxWidthResizeAndPosition = function() {
                var e, t, s = r.items_ar.length;
                r.totalWidth = 0;
                for (var o = r.totalHeight = 0; o < s; o++)(e = r.items_ar[o]).getMaxTextWidth() > r.totalWidth && (r.totalWidth = e.getMaxTextWidth());
                for (o = 0; o < s; o++) t = r.spacers_ar[o - 1], (e = r.items_ar[o]).setX(r.padding), e.setY(10 + o * (e.totalHeight + r.sapaceBetweenButtons) - r.padding), t && (t.setWidth(r.totalWidth + 2), t.setX(r.padding), t.setY(parseInt(e.getY() - r.sapaceBetweenButtons / 2) - 1)), e.setWidth(r.totalWidth + 2), e.centerText();
                r.totalHeight = e.getY() + e.totalHeight + 2, r.setWidth(r.totalWidth + 2 * r.padding + 4), r.setHeight(r.totalHeight), r.setVisible(!0), r.removeMenuId_to = setTimeout(r.removeFromDOM, 150)
            }, r.addContextEvent = function() {
                r.prt.main_do.screen.addEventListener ? r.prt.main_do.screen.addEventListener("contextmenu", r.contextMenuHandler) : r.prt.main_do.screen.attachEvent("oncontextmenu", r.contextMenuHandler)
            }, r.contextMenuHandler = function(e) {
                return r.show_bl && n.showContextmenu_bl && (clearTimeout(r.removeMenuId_to), r.prt.main_do.addChild(r), r.positionButtons(e), r.setAlpha(0), FWDAnimation.to(r, .4, {
                    alpha: 1,
                    ease: Quart.easeOut
                }), window.addEventListener ? (window.addEventListener("mousedown", r.contextMenuWindowOnMouseDownHandler), window.addEventListener("mouseup", r.contextMenuWindowOnMouseDownHandler)) : (document.documentElement.attachEvent("onmousedown", r.contextMenuWindowOnMouseDownHandler), document.documentElement.attachEvent("onmouseup", r.contextMenuWindowOnMouseDownHandler))), !!e.preventDefault && void e.preventDefault()
            }, r.contextMenuWindowOnMouseDownHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e),
                    s = t.screenX,
                    o = t.screenY;
                FWDUVPUtils.hitTest(r.screen, s, o) || (window.removeEventListener ? (window.removeEventListener("mousedown", r.contextMenuWindowOnMouseDownHandler), window.removeEventListener("mouseup", r.contextMenuWindowOnMouseDownHandler)) : (document.documentElement.detachEvent("onmousedown", r.contextMenuWindowOnMouseDownHandler), document.documentElement.detachEvent("onmouseup", r.contextMenuWindowOnMouseDownHandler)), r.removeMenuId_to = setTimeout(r.removeFromDOM, 150))
            }, r.positionButtons = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e),
                    s = r.prt.main_do.getWidth(),
                    o = r.prt.main_do.getHeight(),
                    i = t.screenX - r.prt.main_do.getGlobalX(),
                    l = t.screenY - r.prt.main_do.getGlobalY(),
                    n = i - 2,
                    a = l - 2;
                r.totalWidth = r.getWidth(), r.totalHeight = r.getHeight(), n + r.totalWidth > s - 2 && (n = i - r.totalWidth), n < 0 && (n = parseInt((s - r.totalWidth) / 2)), n < 0 && (n = 0), a + r.totalHeight > o - 2 && (a = l - r.totalHeight), a < 0 && (a = parseInt((o - r.totalHeight) / 2)), a < 0 && (a = 0), r.setX(n), r.setY(a)
            }, r.disable = function() {
                r.copyURL_do && r.copyURL_do.disable(), r.copyURLTime_do && r.copyURLTime_do.disable()
            }, r.enable = function() {
                r.copyURL_do && r.copyURL_do.enable(), r.copyURLTime_do && r.copyURLTime_do.enable()
            }, r.removeFromDOM = function() {
                r.setX(-5e3)
            }, r.init()
        };
        e.setPrototype = function() {
            e.prototype = new FWDUVPDisplayObject("div")
        }, e.prototype = null, window.FWDUVPContextMenu = e
    }(window), function() {
        var a = function(e, t, s, o, i, l) {
            var n = this;
            a.prototype;
            n.label1_str = e, n.label2_str = t, n.nBC = s, n.sBC = o, n.disabledColor_str = i, n.totalWidth = 400, n.totalHeight = 20, n.padding, n.text1_sdo = null, n.text2_sdo = null, n.dumy_sdo = null, n.isMbl = FWDUVPUtils.isMobile, n.currentState = 1, n.isDisabled_bl = !1, n.isMaximized_bl = !1, n.showSecondButton_bl = null != t, n.isDeveleper_bl = !1, n.init = function() {
                n.setBackfaceVisibility(), n.setButtonMode(!0), n.setupMainContainers(), n.setWidth(n.totalWidth), n.setHeight(n.totalHeight), n.setButtonState(0)
            }, n.setupMainContainers = function() {
                n.text1_sdo = new FWDUVPDisplayObject("div"), n.text1_sdo.setBackfaceVisibility(), n.text1_sdo.setDisplay("inline-block"), n.text1_sdo.getStyle().fontFamily = "Arial", n.text1_sdo.getStyle().fontSize = "12px", n.text1_sdo.getStyle().color = n.nBC, n.text1_sdo.getStyle().fontSmoothing = "antialiased", n.text1_sdo.setInnerHTML(n.label1_str), n.addChild(n.text1_sdo), n.showSecondButton_bl && (n.text2_sdo = new FWDUVPDisplayObject("div"), n.text2_sdo.setBackfaceVisibility(), n.text2_sdo.setDisplay("inline-block"), n.text2_sdo.getStyle().fontFamily = "Arial", n.text2_sdo.getStyle().fontSize = "12px", n.text2_sdo.getStyle().color = n.nBC, n.text2_sdo.getStyle().fontSmoothing = "antialiased", n.text2_sdo.setInnerHTML(n.label2_str), n.addChild(n.text2_sdo)), n.dumy_sdo = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (n.dumy_sdo.setBkColor("#FF0000"), n.dumy_sdo.setAlpha(0)), n.addChild(n.dumy_sdo), n.isMbl ? n.screen.addEventListener("touchstart", n.onMouseDown) : n.screen.addEventListener && (n.screen.addEventListener("mouseover", n.onMouseOver), n.screen.addEventListener("mouseout", n.onMouseOut), n.screen.addEventListener("mousedown", n.onMouseDown), n.screen.addEventListener("click", n.onClick))
            }, n.onMouseOver = function(e) {
                n.isDisabled_bl || (FWDAnimation.killTweensOf(n.text1_sdo), e ? (FWDAnimation.to(n.text1_sdo.screen, .5, {
                    css: {
                        color: n.sBC
                    },
                    ease: Expo.easeOut
                }), n.showSecondButton_bl && FWDAnimation.to(n.text2_sdo.screen, .5, {
                    css: {
                        color: n.sBC
                    },
                    ease: Expo.easeOut
                })) : (n.text1_sdo.getStyle().color = n.sBC, n.showSecondButton_bl && (FWDAnimation.killTweensOf(n.text2_sdo), n.text2_sdo.getStyle().color = n.sBC)), n.dispatchEvent(a.MOUSE_OVER))
            }, n.onMouseOut = function(e) {
                n.isDisabled_bl || (FWDAnimation.killTweensOf(n.text1_sdo), FWDAnimation.to(n.text1_sdo.screen, .5, {
                    css: {
                        color: n.nBC
                    },
                    ease: Expo.easeOut
                }), n.showSecondButton_bl && (FWDAnimation.killTweensOf(n.text2_sdo), FWDAnimation.to(n.text2_sdo.screen, .5, {
                    css: {
                        color: n.nBC
                    },
                    ease: Expo.easeOut
                })), n.dispatchEvent(a.MOUSE_OUT))
            }, n.onClick = function(e) {
                n.isDeveleper_bl ? window.open("", "_blank") : n.isDisabled_bl || (e.preventDefault && e.preventDefault(), n.dispatchEvent(a.CLICK))
            }, n.onMouseDown = function(e) {
                n.isDisabled_bl || (e.preventDefault && e.preventDefault(), n.dispatchEvent(a.MOUSE_DOWN, {
                    e: e
                }))
            }, n.toggleButton = function() {
                n.showSecondButton_bl && (1 == n.currentState ? (n.text1_sdo.setVisible(!0), n.text2_sdo.setVisible(!1), n.currentState = 0, n.dispatchEvent(a.FIRST_BUTTON_CLICK)) : (n.text1_sdo.setVisible(!1), n.text2_sdo.setVisible(!0), n.currentState = 1, n.dispatchEvent(a.SECOND_BUTTON_CLICK)))
            }, n.setButtonState = function(e) {
                0 == e ? (n.text1_sdo.setVisible(!0), n.showSecondButton_bl && n.text2_sdo.setVisible(!1), n.currentState = 0) : 1 == e && (n.text1_sdo.setVisible(!1), n.showSecondButton_bl && n.text2_sdo.setVisible(!0), n.currentState = 1)
            }, n.centerText = function() {
                n.dumy_sdo.setWidth(n.totalWidth), n.dumy_sdo.setHeight(n.totalHeight), FWDUVPUtils.isIEAndLessThen9 ? (n.text1_sdo.setY(Math.round((n.totalHeight - n.text1_sdo.getHeight()) / 2) - 1), n.showSecondButton_bl && n.text2_sdo.setY(Math.round((n.totalHeight - n.text2_sdo.getHeight()) / 2) - 1)) : (n.text1_sdo.setY(Math.round((n.totalHeight - n.text1_sdo.getHeight()) / 2)), n.showSecondButton_bl && n.text2_sdo.setY(Math.round((n.totalHeight - n.text2_sdo.getHeight()) / 2))), n.text1_sdo.setHeight(n.totalHeight + 2), n.showSecondButton_bl && n.text2_sdo.setHeight(n.totalHeight + 2)
            }, n.getMaxTextWidth = function() {
                var e = n.text1_sdo.getWidth(),
                    t = 0;
                return n.showSecondButton_bl && (t = n.text2_sdo.getWidth()), Math.max(e, t)
            }, n.disable = function() {
                n.isDisabled_bl = !0, FWDAnimation.killTweensOf(n.text1_sdo), FWDAnimation.to(n.text1_sdo.screen, .5, {
                    css: {
                        color: n.disabledColor_str
                    },
                    ease: Expo.easeOut
                }), n.setButtonMode(!1)
            }, n.enable = function() {
                n.isDisabled_bl = !1, FWDAnimation.killTweensOf(n.text1_sdo), FWDAnimation.to(n.text1_sdo.screen, .5, {
                    css: {
                        color: n.nBC
                    },
                    ease: Expo.easeOut
                }), n.setButtonMode(!0)
            }, n.init()
        };
        a.setPrototype = function() {
            a.prototype = new FWDUVPDisplayObject("div")
        }, a.FIRST_BUTTON_CLICK = "onFirstClick", a.SECOND_BUTTON_CLICK = "secondButtonOnClick", a.MOUSE_OVER = "onMouseOver", a.MOUSE_OUT = "onMouseOut", a.MOUSE_DOWN = "onMouseDown", a.CLICK = "onClick", a.prototype = null, window.FWDUVPContextMenuButton = a
    }(window), function() {
        var o = function(p, m) {
            var b = this;
            o.prototype;
            this.data = p, this.bkLeft_img = p.bkLeft_img, this.bkRight_img = p.bkRight_img, this.playN_img = p.playN_img, this.pauseN_img = p.pauseN_img, this.mainScrubberBkLeft_img = p.mainScrubberBkLeft_img, this.mainScrubberDragLeft_img = p.mainScrubberDragLeft_img, this.mainScrubberDragLeftSource = p.mainScrubberDragLeft_img.src, this.mainScrubberLine_img = p.mainScrubberLine_img, this.volumeScrubberBkLeft_img = p.volumeScrubberBkLeft_img, this.volumeScrubberDragBottom_img = p.volumeScrubberDragBottom_img, this.volumeScrubberLine_img = p.volumeScrubberLine_img, this.volumeN_img = p.volumeN_img, this.progressLeft_img = p.progressLeft_img, this.categoriesN_img = p.categoriesN_img, this.prt = m, this.playlistN_img = p.playlistN_img, this.ytbQualityN_img = p.ytbQualityN_img, this.infoN_img = p.infoN_img, this.downloadN_img = p.downloadN_img, this.facebookN_img = p.facebookN_img, this.fullScreenN_img = p.fullScreenN_img, this.normalScreenN_img = p.normalScreenN_img, this.hidePlaylistN_img = p.hidePlaylistN_img, this.showPlaylistN_img = p.showPlaylistN_img, this.embedN_img = p.embedN_img, this.buttons_ar = [], b.useHEX = p.useHEX, b.nBC = p.nBC, b.sBC = p.sBC, this.bkMiddlePath_str = p.bkMiddlePath_str, this.mainScrubberBkMiddlePath_str = p.mainScrubberBkMiddlePath_str, this.volumeScrubberBkMiddlePath_str = p.volumeScrubberBkMiddlePath_str, this.mainScrubberDragMiddlePath_str = p.mainScrubberDragMiddlePath_str, this.volumeScrubberDragMiddlePath_str = p.volumeScrubberDragMiddlePath_str, this.timeColor_str = p.timeColor_str, this.progressMiddlePath_str = p.progressMiddlePath_str, this.youtubeQualityButtonNormalColor_str = p.youtubeQualityButtonNormalColor_str, this.youtubeQualityButtonSelectedColor_str = p.youtubeQualityButtonSelectedColor_str, this.youtubeQualityArrowPath_str = p.youtubeQualityArrowPath_str, this.controllerBkPath_str = p.controllerBkPath_str, this.ytbQualityButtonPointerPath_str = p.ytbQualityButtonPointerPath_str, this.buttonsToolTipFontColor_str = p.buttonsToolTipFontColor_str, this.buttonsToolTipHideDelay = p.buttonsToolTipHideDelay, this.ttYtbBtns = 0, this.sW = 0, this.sH = p.controllerHeight, this.scrbsBkLARW = this.mainScrubberBkLeft_img.width, this.maiScrbW = 0, this.mainScrbMinW = 100, this.volumeScrubberOfsetHeight = p.volumeScrubberOfsetHeight, this.volumeScrubberHeight = p.volumeScrubberHeight + b.volumeScrubberOfsetHeight, this.volScrbW = b.mainScrubberBkLeft_img.height, this.mainScrbH = this.mainScrubberBkLeft_img.height, this.mainScrbDrgLW = b.mainScrubberDragLeft_img.width, this.scrubbersOffsetWidth = p.scrubbersOffsetWidth, this.volume = p.volume, this.lastVolume = b.volume, this.startSpaceBetweenButtons = p.startSpaceBetweenButtons, this.spaceBetweenButtons = p.spaceBetweenButtons, this.percentPlayed = 0, this.percentLoaded = 0, this.lastTimeLength = 0, this.prevYtbQualityButtonsLength = 0, this.pointerWidth = 8, this.pointerHeight = 5, this.timeOffsetLeftWidth = p.timeOffsetLeftWidth, this.timeOffsetRightWidth = p.timeOffsetRightWidth, this.timeOffsetTop = p.timeOffsetTop, this.mainScrubberOffestTop = p.mainScrubberOffestTop, this.isVolumeScrubberShowed_bl = !0, this.volumeScrubberIsDragging_bl = !1, this.showButtonsToolTip_bl = p.showButtonsToolTip_bl, this.showPlaylistsButtonAndPlaylists_bl = p.showPlaylistsButtonAndPlaylists_bl, this.showPlaylistButtonAndPlaylist_bl = p.showPlaylistButtonAndPlaylist_bl, this.showEmbedButton_bl = p.showEmbedButton_bl, this.showPlaylistByDefault_bl = p.showPlaylistByDefault_bl, this.showShuffleButton_bl = p.showShuffleButton_bl, this.showLoopButton_bl = p.showLoopButton_bl, this.showNP_bl = m.data.showNextAndPrevButtonsInController_bl, this.showNextAndPrevButtonsInController_bl = p.showNextAndPrevButtonsInController_bl, this.showFullScreenButton_bl = p.showFullScreenButton_bl, this.disableVideoScrubber_bl = p.disableVideoScrubber_bl, this.showYoutubeQualityButton_bl = p.showYoutubeQualityButton_bl, this.showShareButton_bl = p.showShareButton_bl, this.showInfoButton_bl = p.showInfoButton_bl, this.showDownloadVideoButton_bl = p.showDownloadVideoButton_bl, this.showVolumeScrubber_bl = p.showVolumeScrubber_bl, this.allowToChangeVolume_bl = p.allowToChangeVolume_bl, this.showTime_bl = p.showTime_bl, this.showVolumeButton_bl = p.showVolumeButton_bl, this.showControllerWhenVideoIsStopped_bl = p.showControllerWhenVideoIsStopped_bl, this.showRewindButton_bl = p.showRewindButton_bl, this.isMainScrubberScrubbing_bl = !1, this.isMainScrubberDisabled_bl = !1, this.isVolumeScrubberDisabled_bl = !1, this.isMainScrubberLineVisible_bl = !1, this.isVolumeScrubberLineVisible_bl = !1, this.showSubBtn = p.showSubBtn, this.hasYtbButton_bl = !1, this.isMute_bl = !1, this.isShowed_bl = !0, this.forceToShowMainScrubberOverCotroller_bl = !1, this.isMainScrubberOnTop_bl = !1, this.showNextAndPrevButtons_bl = p.showNextAndPrevButtons_bl, this.isPlaylistShowed_bl = p.isPlaylistShowed_bl, this.areYtbQualityButtonsShowed_bl = !0, this.repeatBackground_bl = p.repeatBackground_bl, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.useVectorIcons_bl = p.useVectorIcons_bl, b.init = function() {
                if (b.setOverflow("visible"), b.mainHld = new FWDUVPDisplayObject("div"), p.useAToB && b.setupATB(), b.repeatBackground_bl) b.bk_do = new FWDUVPDisplayObject("div"), b.bk_do.getStyle().background = "url('" + b.controllerBkPath_str + "')";
                else {
                    b.bk_do = new FWDUVPDisplayObject("img");
                    var e = new Image;
                    e.src = b.controllerBkPath_str, b.bk_do.setScreen(e)
                }
                b.mainHld.addChild(b.bk_do), b.mainHld.setOverflow("visible"), b.mainHld.getStyle().zIndex = 1, b.addChild(b.mainHld), b.showYoutubeQualityButton_bl && (b.ytbQuality_ar = ["hd2160", "hd1440", "highres", "hd1080", "hd720", "large", "medium", "small", "tiny"], b.ytbButtons_ar = [], b.ttYtbBtns = b.ytbQuality_ar.length, b.setupYtbButtons()), b.showNextAndPrevButtonsInController_bl && b.setupPrevButton(), b.setupPlayPauseButton(), b.showRewindButton_bl && b.setupRewindButton(), b.showNextAndPrevButtonsInController_bl && b.setupNextButton(), b.setupMainScrubber(), b.showTime_bl && b.setupTime(), b.showVolumeButton_bl && b.setupVolumeButton(), b.showPlaylistsButtonAndPlaylists_bl && b.setupCategoriesButton(), b.showPlaylistButtonAndPlaylist_bl && b.setupPlaylistButton(), b.showYoutubeQualityButton_bl && b.setupYoutubeQualityButton(), b.showShareButton_bl && b.setupShareButton(), b.showEmbedButton_bl && b.setupEmbedButton(), p.useAToB && b.setupAtbButton(), b.showInfoButton_bl && b.setupInfoButton(), p.showPlaybackRateButton_bl && b.setupPlaybackRateButton(), b.showDownloadVideoButton_bl && b.setupDownloadButton(), b.showSubBtn && b.setupSubtitleButton(), p.showChromecastButton_bl && b.setupChromecastButton(), b.showFullScreenButton_bl && b.setupFullscreenButton(), b.showButtonsToolTip_bl && b.setupToolTips(), b.showVolumeScrubber_bl && (b.setupVolumeScrubber(), b.hideVolumeScrubber()), b.hide(!1)
            }, b.resizeAndPosition = function() {
                b.sW = m.tempVidStageWidth, b.positionButtons(), b.setY(m.tempVidStageHeight - b.sH), b.hideQualityButtons(!1), b.ytbButtonsHolder_do && (FWDAnimation.killTweensOf(b.ytbButtonsHolder_do), b.ytbButtonsHolder_do.setY(m.tempStageHeight)), b.subtitlesButtonsHolder_do && (FWDAnimation.killTweensOf(b.subtitlesButtonsHolder_do), b.subtitlesButtonsHolder_do.setY(m.sH)), b.playbackRatesButtonsHolder_do && (FWDAnimation.killTweensOf(b.playbackRatesButtonsHolder_do), b.playbackRatesButtonsHolder_do.setY(m.sH)), b.positionAdsLines()
            }, this.getButtonIndex = function(e) {
                return FWDUVPUtils.indexOfArray(b.buttons_ar, e)
            }, b.positionButtons = function() {
                if (b.sW) {
                    var e, t, s, o = 0,
                        i = 0,
                        l = 0,
                        n = 0,
                        a = b.showTime_bl;
                    if (p.playlist_ar[m.id]) {
                        var r;
                        if (b.showDownloadVideoButton_bl)
                            if (p.playlist_ar[m.id].downloadable) - 1 == b.getButtonIndex(b.downloadButton_do) && (b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (s = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(s, 0, b.downloadButton_do)) : b.fullScreenButton_do ? (s = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(s, 0, b.downloadButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.downloadButton_do), b.downloadButton_do.setVisible(!0));
                            else -1 != (r = b.getButtonIndex(b.downloadButton_do)) && (b.buttons_ar.splice(r, 1), b.downloadButton_do.setVisible(!1));
                        if (b.showInfoButton_bl)
                            if (p.playlist_ar[m.id].desc) - 1 == b.getButtonIndex(b.infoButton_do) && (b.downloadButton_do && -1 != b.getButtonIndex(b.downloadButton_do) ? (s = b.getButtonIndex(b.downloadButton_do), b.buttons_ar.splice(s, 0, b.infoButton_do)) : b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (s = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(s, 0, b.infoButton_do)) : b.fullScreenButton_do ? (s = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(s, 0, b.infoButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.infoButton_do), b.infoButton_do.setVisible(!0));
                            else -1 != (r = b.getButtonIndex(b.infoButton_do)) && (b.buttons_ar.splice(r, 1), b.infoButton_do.setVisible(!1));
                        if (p.useAToB)
                            if (p.playlist_ar[m.id].atb) - 1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.atbButton_do) && (b.infoButton_do && -1 != b.getButtonIndex(b.infoButton_do) ? (s = b.getButtonIndex(b.infoButton_do), b.buttons_ar.splice(s, 0, b.atbButton_do)) : b.downloadButton_do && -1 != b.getButtonIndex(b.downloadButton_do) ? (s = b.getButtonIndex(b.downloadButton_do), b.buttons_ar.splice(s, 0, b.atbButton_do)) : b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (s = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(s, 0, b.atbButton_do)) : b.fullScreenButton_do ? (s = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(s, 0, b.atbButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.atbButton_do), b.atbButton_do.setVisible(!0));
                            else {
                                var d = FWDUVPUtils.indexOfArray(b.buttons_ar, b.atbButton_do); - 1 != d && (b.buttons_ar.splice(d, 1), b.atbButton_do.setVisible(!1), b.atb.hide(!0))
                            } if (b.showSubBtn)
                            if (p.playlist_ar[m.id].subtitleSource) - 1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.subtitleButton_do) && (b.playbackRateButton_do && -1 != b.getButtonIndex(b.playbackRateButton_do) ? (s = b.getButtonIndex(b.playbackRateButton_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.atbButton_do && -1 != b.getButtonIndex(b.atbButton_do) ? (s = b.getButtonIndex(b.atbButton_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.infoButton_do && -1 != b.getButtonIndex(b.infoButton_do) ? (s = b.getButtonIndex(b.infoButton_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.downloadButton_do && -1 != b.getButtonIndex(b.downloadButton_do) ? (s = b.getButtonIndex(b.downloadButton_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (s = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.fullScreenButton_do ? (s = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(s, 0, b.subtitleButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.subtitleButton_do), b.subtitleButton_do.setVisible(!0));
                            else {
                                var u = FWDUVPUtils.indexOfArray(b.buttons_ar, b.subtitleButton_do); - 1 != u && (b.buttons_ar.splice(u, 1), b.subtitleButton_do.setVisible(!1), b.subtitleButton_do.setX(-5e3))
                            } if (m.videoType_str != FWDUVPlayer.VIMEO || p.showDefaultControllerForVimeo_bl) - 1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.playPauseButton_do) && b.playPauseButton_do && (s = 0, b.buttons_ar.splice(s, 0, b.playPauseButton_do), b.playPauseButton_do.setVisible(!0)), -1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.rewindButton_do) && b.rewindButton_do && (s = FWDUVPUtils.indexOfArray(b.buttons_ar, b.playPauseButton_do), b.buttons_ar.splice(s, 0, b.rewindButton_do), b.rewindButton_do.setVisible(!0)), b.showVolumeButton_bl && (b.showTime_bl ? -1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.volBtn) && (s = FWDUVPUtils.indexOfArray(b.buttons_ar, b.time_do) + 1, b.buttons_ar.splice(s, 0, b.volBtn), b.volBtn.setVisible(!0)) : -1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.volBtn) && (s = FWDUVPUtils.indexOfArray(b.buttons_ar, b.mainScrubber_do) + 1, b.buttons_ar.splice(s, 0, b.volBtn), b.volBtn.setVisible(!0))), b.mainScrubber_do.setVisible(!0);
                        else {
                            var h = FWDUVPUtils.indexOfArray(b.buttons_ar, b.playPauseButton_do); - 1 != h && (b.buttons_ar.splice(h, 1), b.playPauseButton_do.setVisible(!1), b.playPauseButton_do.setX(-500)), b.mainScrubber_do.setVisible(!1)
                        }
                        for (var c = [], _ = 0; _ < b.buttons_ar.length; _++) c[_] = b.buttons_ar[_];
                        "right" == m.tempPlaylistPosition_str && b.showNextAndPrevButtonsInController_bl && !b.showNP_bl && -1 != FWDUVPUtils.indexOfArray(c, b.nextButton_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.nextButton_do), 1), c.splice(FWDUVPUtils.indexOfArray(c, b.prevButton_do), 1), b.nextButton_do.setX(-1e3), b.prevButton_do.setX(-1e3)), b.maiScrbW = b.sW - 2 * b.startSpaceBetweenButtons;
                        for (_ = 0; _ < c.length; _++)(e = c[_]) != b.mainScrubber_do && (b.maiScrbW -= e.w + b.spaceBetweenButtons);
                        if (m.videoType_str == FWDUVPlayer.VIMEO && 120 <= b.maiScrbW && !p.showDefaultControllerForVimeo_bl) {
                            b.mainScrubber_do && -1 != FWDUVPUtils.indexOfArray(c, b.mainScrubber_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.mainScrubber_do), 1), b.positionScrollBarOnTopOfTheController()), b.time_do && -1 != FWDUVPUtils.indexOfArray(c, b.time_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.time_do), 1), b.time_do.setX(-1e3)), o = c.length;
                            for (_ = 0; _ < o; _++) i += c[_].w;
                            l = b.spaceBetweenButtons, n = b.sW - c[o - 1].w - b.startSpaceBetweenButtons - 2;
                            for (_ = o - 1; 0 <= _; _--) e = c[_], _ == o - 1 ? e.setX(n) : (t = c[_ + 1], e.setX(t.x - e.w - l))
                        } else if (b.maiScrbW <= 120 || m.videoType_str == FWDUVPlayer.VIMEO && !p.showDefaultControllerForVimeo_bl) {
                            b.mainScrubber_do && -1 != FWDUVPUtils.indexOfArray(c, b.mainScrubber_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.mainScrubber_do), 1), b.positionScrollBarOnTopOfTheController()), b.time_do && -1 != FWDUVPUtils.indexOfArray(c, b.time_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.time_do), 1), b.time_do.setX(-1e3)), o = c.length;
                            for (_ = 0; _ < o; _++) i += c[_].w;
                            l = parseInt((b.sW - i - 2 * b.startSpaceBetweenButtons) / (o - 1)), n = parseInt((b.sW - i - (o - 1) * l) / 2);
                            for (_ = 0; _ < o; _++) e = c[_], 0 == _ ? e.setX(n) : (t = c[_ - 1], e.setX(t.x + t.w + l))
                        } else {
                            for (; b.maiScrbW < b.mainScrbMinW;) {
                                b.maiScrbW = b.sW - 2 * b.startSpaceBetweenButtons, b.time_do && -1 != FWDUVPUtils.indexOfArray(c, b.time_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.time_do), 1), b.time_do.setX(-1e3), a = !1) : b.shareButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.shareButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.shareButton_do), 1), b.shareButton_do.setX(-1e3)) : b.downloadButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.downloadButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.downloadButton_do), 1), b.downloadButton_do.setX(-1e3)) : b.embedButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.embedButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.embedButton_do), 1), b.embedButton_do.setX(-1e3)) : b.volBtn && -1 != FWDUVPUtils.indexOfArray(c, b.volBtn) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.volBtn), 1), b.volBtn.setX(-1e3)) : b.playbackRateButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.playbackRateButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.playbackRateButton_do), 1), b.playbackRateButton_do.setX(-1e3)) : b.ytbQualityButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.ytbQualityButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.ytbQualityButton_do), 1), b.ytbQualityButton_do.setX(-1e3)) : b.playlistButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.playlistButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.playlistButton_do), 1), b.playlistButton_do.setX(-1e3)) : b.infoButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.infoButton_do) ? (c.splice(FWDUVPUtils.indexOfArray(c, b.infoButton_do), 1), b.infoButton_do.setX(-1e3)) : b.categoriesButton_do && -1 != FWDUVPUtils.indexOfArray(c, b.categoriesButton_do) && (c.splice(FWDUVPUtils.indexOfArray(c, b.categoriesButton_do), 1), b.categoriesButton_do.setX(-1e3)), o = c.length;
                                for (_ = 0; _ < o; _++)(e = c[_]) != b.mainScrubber_do && (b.maiScrbW -= e.w + b.spaceBetweenButtons)
                            }
                            b.showNextAndPrevButtonsInController_bl && b.maiScrbW, a && (b.maiScrbW -= 2 * b.timeOffsetLeftWidth), o = c.length;
                            for (_ = 0; _ < o; _++)
                                if (e = c[_], 0 == _) e.setX(b.startSpaceBetweenButtons);
                                else if (e == b.mainScrubber_do) t = c[_ - 1], FWDAnimation.killTweensOf(b.mainScrubber_do), b.mainScrubber_do.setX(t.x + t.w + b.spaceBetweenButtons), b.mainScrubber_do.setY(parseInt((b.sH - b.mainScrbH) / 2)), b.mainScrubber_do.setWidth(b.maiScrbW + 1), b.mainScrubberBkMiddle_do.setWidth(b.maiScrbW - 2 * b.scrbsBkLARW), b.mainScrubberBkRight_do.setX(b.maiScrbW - b.scrbsBkLARW), b.mainScrubberDragMiddle_do.setWidth(b.maiScrbW - b.scrbsBkLARW - b.scrubbersOffsetWidth);
                            else if (e == b.time_do) {
                                t = c[_ - 1], e.setX(t.x + t.w + b.spaceBetweenButtons + b.timeOffsetLeftWidth);
                                var f = 0;
                                b.isLive && (f = 1), e.setY(parseInt((b.sH - e.h) / 2) + f)
                            } else e == b.volBtn && a ? (t = c[_ - 1], e.setX(t.x + t.w + b.spaceBetweenButtons + b.timeOffsetRightWidth)) : (t = c[_ - 1], e.setX(t.x + t.w + b.spaceBetweenButtons));
                            b.isShowed_bl ? b.isMainScrubberOnTop_bl = !1 : (b.isMainScrubberOnTop_bl = !0, b.positionScrollBarOnTopOfTheController())
                        }
                        b.bk_do && (b.bk_do.setWidth(b.sW), b.bk_do.setHeight(b.sH)), b.progressMiddle_do && b.progressMiddle_do.setWidth(Math.max(b.maiScrbW - b.scrbsBkLARW - b.scrubbersOffsetWidth, 0)), b.updateMainScrubber(b.percentPlayed), b.updatePreloaderBar(b.percentLoaded), b.mainHld.setWidth(b.sW), b.mainHld.setHeight(b.sH), b.setWidth(b.sW), b.setHeight(b.sH), b.atb && b.atb.resize()
                    }
                }
            }, this.positionScrollBarOnTopOfTheController = function() {
                b.maiScrbW = b.sW, b.updatePreloaderBar(b.percentLoaded), b.mainScrubber_do.setWidth(b.maiScrbW + 1), b.mainScrubberBkMiddle_do.setWidth(b.maiScrbW - 2 * b.scrbsBkLARW), b.mainScrubberBkRight_do.setX(b.maiScrbW - b.scrbsBkLARW), b.mainScrubberDragMiddle_do.setWidth(b.maiScrbW - b.scrbsBkLARW - b.scrubbersOffsetWidth);
                var e = 0;
                b.atb && b.atb.isShowed_bl && (e = b.sH), FWDAnimation.killTweensOf(b.mainScrubber_do), b.mainScrubber_do.setX(0), b.mainScrubber_do.setAlpha(1), b.isMainScrubberOnTop_bl || b.isShowed_bl ? (b.atb && b.atb.isShowed_bl && !b.isShowed_bl ? e += b.mainScrubberOffestTop : e = 0, FWDAnimation.killTweensOf(b.mainScrubber_do), b.isShowed_bl ? b.mainScrubber_do.setY(-b.mainScrubberOffestTop - e) : FWDAnimation.to(b.mainScrubber_do, .8, {
                    y: -b.mainScrubberOffestTop - e,
                    ease: Expo.easeOut
                })) : b.isLive || FWDAnimation.to(b.mainScrubber_do, .8, {
                    y: -b.mainScrubberOffestTop - e,
                    ease: Expo.easeOut
                }), b.isMainScrubberOnTop_bl = !0
            }, this.setupToolTips = function() {
                FWDUVPToolTip.setPrototype(), b.playPauseToolTip_do = new FWDUVPToolTip(b.playPauseButton_do, p.toopTipBk_str, p.toopTipPointer_str, "play / pause", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.playPauseToolTip_do.screen), b.showControllerWhenVideoIsStopped_bl && (FWDUVPToolTip.setPrototype(), b.prevButtonToolTip_do = new FWDUVPToolTip(b.prevButton_do, p.toopTipBk_str, p.toopTipPointer_str, "previous video", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.prevButtonToolTip_do.screen), FWDUVPToolTip.setPrototype(), b.nextButtonToolTip_do = new FWDUVPToolTip(b.nextButton_do, p.toopTipBk_str, p.toopTipPointer_str, "next video", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.nextButtonToolTip_do.screen)), b.showPlaylistsButtonAndPlaylists_bl && (FWDUVPToolTip.setPrototype(), b.playlistsButtonToolTip_do = new FWDUVPToolTip(b.categoriesButton_do, p.toopTipBk_str, p.toopTipPointer_str, "show playlists", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.playlistsButtonToolTip_do.screen)), b.showPlaylistButtonAndPlaylist_bl && (FWDUVPToolTip.setPrototype(), b.playlistButtonToolTip_do = new FWDUVPToolTip(b.playlistButton_do, p.toopTipBk_str, p.toopTipPointer_str, "show / hide playlist", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.playlistButtonToolTip_do.screen)), b.showEmbedButton_bl && (FWDUVPToolTip.setPrototype(), b.embedButtonToolTip_do = new FWDUVPToolTip(b.embedButton_do, p.toopTipBk_str, p.toopTipPointer_str, "show embed window", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.embedButtonToolTip_do.screen)), b.showShareButton_bl && (FWDUVPToolTip.setPrototype(), b.facebookButtonToolTip_do = new FWDUVPToolTip(b.shareButton_do, p.toopTipBk_str, p.toopTipPointer_str, "share", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.facebookButtonToolTip_do.screen)), p.showChromecastButton_bl && (FWDUVPToolTip.setPrototype(), b.castButtonToolTip_do = new FWDUVPToolTip(b.ccBtn_do, p.toopTipBk_str, p.toopTipPointer_str, "chromecast", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.castButtonToolTip_do.screen)), FWDUVPToolTip.setPrototype(), b.atbButtonToolTip_do = new FWDUVPToolTip(b.atbButton_do, p.toopTipBk_str, p.toopTipPointer_str, "a to b loop", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.atbButtonToolTip_do.screen), b.showSubBtn && (FWDUVPToolTip.setPrototype(), b.subtitleButtonToolTip_do = new FWDUVPToolTip(b.subtitleButton_do, p.toopTipBk_str, p.toopTipPointer_str, "show / hide subtitle", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.subtitleButtonToolTip_do.screen)), b.showInfoButton_bl && (FWDUVPToolTip.setPrototype(), b.infoButtonToolTip_do = new FWDUVPToolTip(b.infoButton_do, p.toopTipBk_str, p.toopTipPointer_str, "more info", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.infoButtonToolTip_do.screen)), b.showDownloadVideoButton_bl && (FWDUVPToolTip.setPrototype(), b.downloadButtonToolTip_do = new FWDUVPToolTip(b.downloadButton_do, p.toopTipBk_str, p.toopTipPointer_str, "download video", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.downloadButtonToolTip_do.screen)), b.fullScreenButton_do && (FWDUVPToolTip.setPrototype(), b.fullscreenButtonToolTip_do = new FWDUVPToolTip(b.fullScreenButton_do, p.toopTipBk_str, p.toopTipPointer_str, "fullscreen / normalscreen", b.buttonsToolTipFontColor_str, b.buttonsToolTipHideDelay), document.documentElement.appendChild(b.fullscreenButtonToolTip_do.screen))
            }, this.showToolTip = function(e, t, s) {
                if (b.showButtonsToolTip_bl) {
                    var o, i, l = FWDUVPUtils.getViewportSize();
                    FWDUVPUtils.getViewportMouseCoordinates(s);
                    i = e.screen.offsetWidth < 3 ? (o = parseInt(100 * e.getGlobalX() + e.w / 2 - t.w / 2), parseInt(100 * e.getGlobalY() - t.h - 8)) : (o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2), parseInt(e.getGlobalY() - t.h - 8));
                    var n = 0;
                    o < 0 ? (n = o, o = 0) : o + t.w > l.w && (o += -1 * (n = -1 * (l.w - (o + t.w)))), t.positionPointer(n, !1), t.setX(o), t.setY(i), t.show()
                }
            }, this.setupAdsLines = function(e, t, s, o) {
                if (!this.createdAdsOnce_bl && (b.curLinesId != t || b.curLinesCat != s || o) && (b.curLinesId = t, b.curLinesCat = s, e)) {
                    if (b.resetsAdsLines(), this.linesHolder_do || (this.linesHolder_do = new FWDUVPDisplayObject("div"), this.linesHolder_do.setOverflow("visible"), this.mainScrubber_do.addChild(this.linesHolder_do)), this.createdAdsOnce_bl = !0, this.lines_ar = e, this.lines_ar) {
                        var i;
                        this.line_ar = [];
                        for (var l = 0; l < this.lines_ar.length; l++) {
                            (i = new FWDUVPDisplayObject("div")).screen.className = "uvp-ad-line";
                            var n = p.adLinePat_str;
                            b.useHEX && window.isWhite && (n = p.sknPth + "ad-line-dark.png"), i.getStyle().background = "url('" + n + "') repeat-x", i.timeStart = e[l].timeStart, i.setWidth(2), i.setHeight(b.mainScrubberDragLeft_img.height), i.isUsed_bl = !1, i.isShowed_bl = !1, this.lines_ar[l].played_bl && i.setVisible(!1), i.setAlpha(0), this.line_ar[l] = i, this.linesHolder_do.addChild(i)
                        }
                    }
                    b.totalDuration = 0
                }
            }, this.hideAdsLines = function() {
                if (b.linesHolder_do && b.linesHolder_do.setX(-5e3), this.line_ar)
                    for (var e = 0; e < this.line_ar.length; e++) this.line_ar[e].setAlpha(0), this.line_ar[e].isShowed_bl = !1
            }, this.positionAdsLines = function(e) {
                if (b.linesHolder_do && e && (b.totalDuration = e, m.isAdd_bl ? this.linesHolder_do.setX(-5e3) : this.linesHolder_do.setX(0), this.line_ar))
                    for (var t, s = 0; s < this.line_ar.length; s++)(t = this.line_ar[s]).setX(Math.round(t.timeStart / b.totalDuration * b.maiScrbW) - 1), t.x < 0 && t.setX(0), t.isUsed_bl || 0 == b.totalDuration || t.isShowed_bl || (FWDAnimation.to(t, 1, {
                        alpha: 1,
                        delay: 1,
                        ease: Expo.easeOut
                    }), t.isShowed_bl = !0)
            }, this.resetsAdsLines = function() {
                if (b.line_ar) {
                    for (var e = 0; e < b.line_ar.length; e++) FWDAnimation.killTweensOf(b.line_ar[e]), b.linesHolder_do.removeChild(b.line_ar[e]);
                    b.curLinesId = -1, b.line_ar = null
                }
            }, this.playbackRatesSource_ar = p.defaultPlaybackRate_ar, this.playbackRateButtons_ar = [], this.totalPlaybackRateButtons = 6, this.arePlaybackRateButtonsShowed_bl = !0, this.showPlaybackRateButton_bl || (this.arePlaybackRateButtonsShowed_bl = !1), this.setupPlaybackRateButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.playbackRateButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-watch-later'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.playbackRateButton_do = new FWDUVPSimpleButton(p.playbackRateNPath_img, p.playbackRateSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.playbackRateButton_do.setY(parseInt((b.sH - b.playbackRateButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.playbackRateButton_do.buttonHeight && (clearInterval(e), b.playbackRateButton_do.setY(parseInt((b.sH - b.playbackRateButton_do.buttonHeight) / 2)))
                }, 50);
                b.playbackRateButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.playbackRateButtonMouseUpHandler), b.mainHld.addChild(b.playbackRateButton_do), b.playbackRateButton_do.setX(-500), b.disablePlaybackRateButton(), b.setupPlaybackRateButtons()
            }, this.playbackRateButtonMouseUpHandler = function() {
                b.arePlaybackRateButtonsShowed_bl ? b.hidePlaybackRateButtons(!0) : (b.showPlaybackRateButtons(!0), b.hideMainScrubberTop())
            }, this.disablePlaybackRateButton = function() {
                b.playbackRateButton_do && b.playbackRateButton_do.disable()
            }, this.enablePlaybackRateButton = function() {
                b.playbackRateButton_do && b.playbackRateButton_do.enable()
            }, this.removePlaybackRateButton = function() {
                b.playbackRateButton_do && -1 != FWDUVPUtils.indexOfArray(b.buttons_ar, b.playbackRateButton_do) && (b.buttons_ar.splice(FWDUVPUtils.indexOfArray(b.buttons_ar, b.playbackRateButton_do), 1), b.playbackRateButton_do.setX(-300), b.positionButtons())
            }, this.addPlaybackRateButton = function(e) {
                b.playbackRateButton_do && -1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.playbackRateButton_do) && (b.atbButton_do && -1 != b.getButtonIndex(b.atbButton_do) ? (indexToAdd = b.getButtonIndex(b.atbButton_do), b.buttons_ar.splice(indexToAdd, 0, b.playbackRateButton_do)) : b.infoButton_do && -1 != b.getButtonIndex(b.infoButton_do) ? (indexToAdd = b.getButtonIndex(b.infoButton_do), b.buttons_ar.splice(indexToAdd, 0, b.playbackRateButton_do)) : b.downloadButton_do && -1 != b.getButtonIndex(b.downloadButton_do) ? (indexToAdd = b.getButtonIndex(b.downloadButton_do), b.buttons_ar.splice(indexToAdd, 0, b.playbackRateButton_do)) : b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (indexToAdd = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(indexToAdd, 0, b.playbackRateButton_do)) : b.fullScreenButton_do ? (indexToAdd = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(indexToAdd, 0, b.playbackRateButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.playbackRateButton_do), b.updatePlaybackRateButtons(e))
            }, this.updatePlaybackRateButtons = function(e) {
                b.playbackRateButton_do && (setTimeout(function() {
                    b.disablePlaybackRateButtons(e)
                }, 65), b.prevplaybackRateIndex = e)
            }, this.setupPlaybackRateButtons = function() {
                var e, t;
                (b.playbackRatesButtonsHolder_do = new FWDUVPDisplayObject("div"), b.playbackRatesButtonsHolder_do.setOverflow("visible"), b.repeatBackground_bl) ? b.playbackRatesButtonsHolder_do.getStyle().background = "url('" + b.controllerBkPath_str + "')": (b.playbackRatesButtonsBackground_do = new FWDUVPDisplayObject("img"), (e = new Image).src = b.controllerBkPath_str, b.playbackRatesButtonsBackground_do.setScreen(e), b.playbackRatesButtonsHolder_do.addChild(b.playbackRatesButtonsBackground_do));
                b.playbackRatesButtonsHolder_do.setX(300), b.playbackRatesButtonsHolder_do.setY(-300), m.videoHolder_do.addChild(b.playbackRatesButtonsHolder_do), (e = new Image).src = b.ytbQualityButtonPointerPath_str, b.playbackRatesPonter_do = new FWDUVPDisplayObject("img"), b.playbackRatesPonter_do.setScreen(e), b.playbackRatesPonter_do.setWidth(b.pointerWidth), b.playbackRatesPonter_do.setHeight(b.pointerHeight), b.playbackRatesButtonsHolder_do.addChild(b.playbackRatesPonter_do), (e = new Image).src = b.youtubeQualityArrowPath_str, b.playbackRateQualityArrow_do = new FWDUVPDisplayObject("img"), b.playbackRateQualityArrow_do.setScreen(e), b.playbackRateQualityArrow_do.setX(7), b.playbackRateQualityArrow_do.setWidth(5), b.playbackRateQualityArrow_do.setHeight(7), b.playbackRatesButtonsHolder_do.addChild(b.playbackRateQualityArrow_do);
                for (var s = 0; s < b.totalPlaybackRateButtons; s++) FWDUVPYTBQButton.setPrototype(), (t = new FWDUVPYTBQButton("no source", b.youtubeQualityButtonNormalColor_str, b.youtubeQualityButtonSelectedColor_str, void 0, s)).addListener(FWDUVPYTBQButton.MOUSE_OVER, b.plbkQualityOver), t.addListener(FWDUVPYTBQButton.MOUSE_OUT, b.plbkQualityOut), t.addListener(FWDUVPYTBQButton.CLICK, b.plbkQualityClick), b.playbackRateButtons_ar[s] = t, b.playbackRatesButtonsHolder_do.addChild(t);
                b.positionAndResizePlaybackRateButtons(b.playbackRatesSource_ar), b.hidePlaybackRateButtons(!1)
            }, this.plbkQualityOver = function(e) {
                b.setPlaybackRateArrowPosition(e.target)
            }, this.plbkQualityOut = function(e) {
                b.setPlaybackRateArrowPosition(void 0)
            }, this.plbkQualityClick = function(e) {
                b.startAtPlaybackRate = e.id, b.disablePlaybackRateButtons(b.startAtPlaybackRate), b.hidePlaybackRateButtons(!0), b.dispatchEvent(o.CHANGE_PLAYBACK_RATES, {
                    rate: b.playbackRatesSource_ar[e.id]
                })
            }, this.positionAndResizePlaybackRateButtons = function(e) {
                if (e) {
                    var t = e.length;
                    if (b.prevplaybackRatesQualityButtonsLength != t) {
                        var s;
                        this.prevplaybackRatesQualityButtonsLength = t;
                        for (var o = 5, i = 0, l = 0, n = 0; n < t; n++) s = b.playbackRateButtons_ar[n], 1 == e[n] ? s.updateText("normal") : s.updateText(e[n]), s.setFinalSize();
                        setTimeout(function() {
                            for (var e = 0; e < t; e++) s = b.playbackRateButtons_ar[e], e < t ? (0 != s.x && s.setX(0), s.w > i && (i = s.w), s.setY(o), o += s.h) : -3e3 != s.x && s.setX(-3e3);
                            for (e = 0; e < t; e++)(s = b.playbackRateButtons_ar[e]).dumy_do.w < i && (s.setWidth(i), s.dumy_do.setWidth(i));
                            l = o + 5, b.playbackRatesPonter_do.setX(parseInt((i - b.playbackRatesPonter_do.w) / 2)), b.playbackRatesPonter_do.setY(l), b.playbackRatesButtonsBackground_do && (b.playbackRatesButtonsBackground_do.setWidth(i), b.playbackRatesButtonsBackground_do.setHeight(l)), b.playbackRatesButtonsHolder_do.setWidth(i), b.playbackRatesButtonsHolder_do.setHeight(l)
                        }, 60)
                    }
                }
            }, this.disablePlaybackRateButtons = function(e) {
                if (null != e)
                    for (var t = 0; t < b.totalPlaybackRateButtons; t++) btn = b.playbackRateButtons_ar[t], t == e ? (FWDAnimation.killTweensOf(b.playbackRateQualityArrow_do), b.playbackRateQualityArrow_do.setY(btn.y + parseInt((btn.h - b.playbackRateQualityArrow_do.h) / 2) - 1), btn.disable(), b.playbackRateDisabledButton_do = btn) : btn.enable()
            }, this.setPlaybackRateArrowPosition = function(e) {
                var t = 0;
                t = e ? e.y + parseInt((e.h - b.playbackRateQualityArrow_do.h) / 2 - 1) : b.playbackRateDisabledButton_do.y + parseInt((b.playbackRateDisabledButton_do.h - b.playbackRateQualityArrow_do.h) / 2 - 1), FWDAnimation.killTweensOf(b.playbackRateQualityArrow_do), FWDAnimation.to(b.playbackRateQualityArrow_do, .6, {
                    y: t,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, this.showPlaybackRateButtons = function(e) {
                if (!b.arePlaybackRateButtonsShowed_bl) {
                    b.hideQualityButtons(), b.arePlaybackRateButtonsShowed_bl = !0;
                    var t = parseInt(b.playbackRateButton_do.x + parseInt(b.playbackRateButton_do.w - b.playbackRatesButtonsHolder_do.w) / 2),
                        s = parseInt(m.tempVidStageHeight - b.sH - b.playbackRatesButtonsHolder_do.h - 6);
                    b.hasPointerEvent_bl ? window.addEventListener("pointerdown", b.hideplaybackRatesButtonsHandler) : (b.isMbl || window.addEventListener("mousedown", b.hideplaybackRatesButtonsHandler), window.addEventListener("touchstart", b.hideplaybackRatesButtonsHandler)), b.playbackRatesButtonsHolder_do.setX(t), e ? FWDAnimation.to(b.playbackRatesButtonsHolder_do, .6, {
                        y: s,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(b.playbackRatesButtonsHolder_do), b.playbackRatesButtonsHolder_do.setY(s))
                }
            }, this.hidePlaybackRateButtons = function(e) {
                b.arePlaybackRateButtonsShowed_bl && b.playbackRatesButtonsHolder_do && (b.arePlaybackRateButtonsShowed_bl = !1, b.showMainScrubberOnTop(), e ? FWDAnimation.to(b.playbackRatesButtonsHolder_do, .6, {
                    y: m.sH,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(b.playbackRatesButtonsHolder_do), b.playbackRatesButtonsHolder_do.setY(m.sH)), b.hasPointerEvent_bl ? window.removeEventListener("pointerdown", b.hideplaybackRatesButtonsHandler) : (b.isMbl || window.removeEventListener("mousedown", b.hideplaybackRatesButtonsHandler), window.removeEventListener("touchstart", b.hideplaybackRatesButtonsHandler)))
            }, this.hideplaybackRatesButtonsHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                FWDUVPUtils.hitTest(b.playbackRateButton_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(b.playbackRatesButtonsHolder_do.screen, t.screenX, t.screenY) || b.hidePlaybackRateButtons(!0)
            }, b.setIsLive = function(e) {
                (b.isLive = e) ? b.mainScrubber_do.contains(b.live_do) || (b.mainScrubber_do.setAlpha(.2), b.mainHld.addChild(b.live_do), setTimeout(function() {
                    b.live_do.setX(4), b.live_do.setY(-b.live_do.getHeight() - 4)
                }, 100), b.disableMainScrubber()): b.mainHld.contains(b.live_do) && (b.mainHld.removeChild(b.live_do), b.mainScrubber_do.setAlpha(1), b.enableMainScrubber())
            }, this.setupMainScrubber = function() {
                b.mainScrubber_do = new FWDUVPDisplayObject("div"), b.mainScrubber_do.setY(parseInt((b.sH - b.mainScrbH) / 2)), b.mainScrubber_do.setHeight(b.mainScrbH), b.mainScrubberBkLeft_do = new FWDUVPDisplayObject("img"), b.mainScrubberBkLeft_do.setScreen(b.mainScrubberBkLeft_img);
                var e = new Image;
                e.src = p.mainScrubberBkRightPath_str, b.mainScrubberBkRight_do = new FWDUVPDisplayObject("img"), b.mainScrubberBkRight_do.setScreen(e), b.mainScrubberBkRight_do.setWidth(b.mainScrubberBkLeft_do.w), b.mainScrubberBkRight_do.setHeight(b.mainScrubberBkLeft_do.h);
                var t = new Image;
                t.src = b.mainScrubberBkMiddlePath_str, b.isMbl ? (b.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("div"), b.mainScrubberBkMiddle_do.getStyle().background = "url('" + b.mainScrubberBkMiddlePath_str + "') repeat-x") : (b.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("img"), b.mainScrubberBkMiddle_do.setScreen(t)), b.mainScrubberBkMiddle_do.setHeight(b.mainScrbH), b.mainScrubberBkMiddle_do.setX(b.scrbsBkLARW), b.mainProgress_do = new FWDUVPDisplayObject("div"), b.mainProgress_do.setHeight(b.mainScrbH), b.progressLeft_do = new FWDUVPDisplayObject("img"), b.progressLeft_do.setScreen(b.progress), (t = new Image).src = b.progressMiddlePath_str, b.progressMiddle_do = new FWDUVPDisplayObject("div"), b.progressMiddle_do.getStyle().background = "url('" + b.progressMiddlePath_str + "') repeat-x", b.progressMiddle_do.setHeight(b.mainScrbH), b.progressMiddle_do.setX(b.mainScrbDrgLW), b.mainScrubberDrag_do = new FWDUVPDisplayObject("div"), b.mainScrubberDrag_do.setHeight(b.mainScrbH), b.useHEX ? (b.mainScrubberDragLeft_do = new FWDUVPDisplayObject("div"), b.mainScrubberDragLeft_do.setWidth(b.mainScrubberDragLeft_img.width), b.mainScrubberDragLeft_do.setHeight(b.mainScrubberDragLeft_img.height), b.mainScrubberDragLeft_canvas = FWDUVPUtils.getCanvasWithModifiedColor(b.mainScrubberDragLeft_img, b.nBC).canvas, b.mainScrubberDragLeft_do.screen.appendChild(b.mainScrubberDragLeft_canvas)) : (b.mainScrubberDragLeft_do = new FWDUVPDisplayObject("img"), b.mainScrubberDragLeft_do.setScreen(b.mainScrubberDragLeft_img)), b.mainScrubberMiddleImage = new Image, b.mainScrubberMiddleImage.src = b.mainScrubberDragMiddlePath_str, b.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), b.useHEX ? (b.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), b.mainScrubberMiddleImage.onload = function() {
                    var e = FWDUVPUtils.getCanvasWithModifiedColor(b.mainScrubberMiddleImage, b.nBC, !0);
                    b.mainSCrubberMiddleCanvas = e.canvas, b.mainSCrubberDragMiddleImageBackground = e.image, b.mainScrubberDragMiddle_do.getStyle().background = "url('" + b.mainSCrubberDragMiddleImageBackground.src + "') repeat-x"
                }) : (b.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), b.mainScrubberDragMiddle_do.getStyle().background = "url('" + b.mainScrubberDragMiddlePath_str + "') repeat-x"), b.mainScrubberDragMiddle_do.setHeight(b.mainScrbH), b.mainScrubberDragMiddle_do.setX(b.mainScrbDrgLW), b.mainScrubberBarLine_do = new FWDUVPDisplayObject("img"), b.mainScrubberBarLine_do.setScreen(b.mainScrubberLine_img), b.mainScrubberBarLine_do.setAlpha(0), b.mainScrubberBarLine_do.hasTransform3d_bl = !1, b.mainScrubberBarLine_do.hasTransform2d_bl = !1, b.buttons_ar.push(b.mainScrubber_do), b.live_do = new FWDUVPDisplayObject("div"), b.live_do.hasTransform3d_bl = !1, b.live_do.hasTransform2d_bl = !1, b.live_do.setBackfaceVisibility(), b.live_do.getStyle().fontFamily = "Arial", b.live_do.getStyle().fontSize = "12px", b.live_do.getStyle().whiteSpace = "nowrap", b.live_do.getStyle().textAlign = "center", b.live_do.getStyle().padding = "4px", b.live_do.getStyle().paddingLeft = "6px", b.live_do.getStyle().paddingRIght = "6px", b.live_do.getStyle().color = "#FFFFFF", b.live_do.getStyle().fontSmoothing = "antialiased", b.live_do.getStyle().webkitFontSmoothing = "antialiased", b.live_do.getStyle().textRendering = "optimizeLegibility", b.live_do.getStyle().backgroundColor = "rgba(255,0,0,0.8)", b.live_do.setInnerHTML("&#x25C9; LIVE"), b.mainScrubber_do.addChild(b.mainScrubberBkLeft_do), b.mainScrubber_do.addChild(b.mainScrubberBkMiddle_do), b.mainScrubber_do.addChild(b.mainScrubberBkRight_do), b.mainScrubber_do.addChild(b.mainScrubberBarLine_do), b.mainScrubberDrag_do.addChild(b.mainScrubberDragLeft_do), b.mainScrubberDrag_do.addChild(b.mainScrubberDragMiddle_do), b.mainProgress_do.addChild(b.progressLeft_do), b.mainProgress_do.addChild(b.progressMiddle_do), b.mainScrubber_do.addChild(b.mainProgress_do), b.mainScrubber_do.addChild(b.mainScrubberDrag_do), b.mainScrubber_do.addChild(b.mainScrubberBarLine_do), b.mainHld.addChild(b.mainScrubber_do), b.disableVideoScrubber_bl || (b.hasPointerEvent_bl ? (b.mainScrubber_do.screen.addEventListener("pointerover", b.mainScrubberOnOverHandler), b.mainScrubber_do.screen.addEventListener("pointerout", b.mainScrubberOnOutHandler), b.mainScrubber_do.screen.addEventListener("pointerdown", b.mainScrubberOnDownHandler)) : b.screen.addEventListener && (b.isMbl || (b.mainScrubber_do.screen.addEventListener("mouseover", b.mainScrubberOnOverHandler), b.mainScrubber_do.screen.addEventListener("mousemove", b.updateTooltipOnMove), b.mainScrubber_do.screen.addEventListener("mouseout", b.mainScrubberOnOutHandler), b.mainScrubber_do.screen.addEventListener("mousedown", b.mainScrubberOnDownHandler)), b.mainScrubber_do.screen.addEventListener("touchstart", b.mainScrubberOnDownHandler))), b.disableMainScrubber(), b.updateMainScrubber(0), FWDUVPScrubberToolip.setPrototype(), b.ttm = new FWDUVPScrubberToolip(b.mainScrubber_do, p.scrubbersToolTipLabelBackgroundColor, p.scrubbersToolTipLabelFontColor, test), b.addChild(b.ttm)
            }, this.updateToolTip = function(e, t) {
                p.showMainScrubberToolTipLabel_bl && (m.isCasting ? b.ttm.setLabel(FWDUVPUtils.formatTime(Math.round(m.cc.getDuration() * t))) : b.ttm.setLabel(FWDUVPUtils.formatTime(Math.round(m.totalDuration * t))), b.ttm.setX(Math.round(b.mainScrubber_do.x + e - b.ttm.getWidth() / 2) + 1), b.ttm.setY(b.mainScrubber_do.y - b.ttm.h - 2))
            }, this.updateThumbnailsPreview = function(e, t) {
                if (b.thumbnailsPreview_do && m.hasThumbnailsPreview) {
                    var s = Math.round(b.mainScrubber_do.x + e - b.thumbnailsPreview_do.getWidth() / 2) + 1;
                    s < 1 ? s = 1 : s > b.sW - b.thumbnailsPreview_do.w && (s = b.sW - b.thumbnailsPreview_do.w), b.thumbnailsPreview_do.setLabel(FWDUVPUtils.formatTime(Math.round(m.totalDuration * t)), Math.round(m.totalDuration * t)), b.thumbnailsPreview_do.setX(s), b.thumbnailsPreview_do.setY(b.mainScrubber_do.y - b.thumbnailsPreview_do.h - 2)
                }
            }, this.updateTooltipOnMove = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenX - b.mainScrubber_do.getGlobalX();
                t < 0 ? t = 0 : t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth);
                var s = t / b.maiScrbW;
                b.updateToolTip(t, s), b.updateThumbnailsPreview(t, s)
            }, b.mainScrubberWMouseMove = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                b.vcX = t.screenX, b.vcY = t.screenY, FWDUVPUtils.hitTest(b.mainScrubber_do.screen, b.vcX, b.vcY) || b.isMainScrubberScrubbing_bl || (window.removeEventListener("mousemove", b.mainScrubberWMouseMove), b.ttm.hide());
                var s = FWDUVPUtils.getViewportMouseCoordinates(e).screenX - b.mainScrubber_do.getGlobalX();
                s < 0 ? s = 0 : s > b.maiScrbW - b.scrubbersOffsetWidth && (s = b.maiScrbW - b.scrubbersOffsetWidth);
                var o = s / b.maiScrbW;
                b.updateThumbnailsPreview(s, o)
            }, this.mainScrubberOnOverHandler = function(e) {
                if (!b.isMainScrubberDisabled_bl) {
                    p.showMainScrubberToolTipLabel_bl && !m.hasThumbnailsPreview && b.ttm.show(), b.thumbnailsPreview_do && m.hasThumbnailsPreview && b.thumbnailsPreview_do.show(), b.isMbl || !b.ttm && !b.thumbnailsPreview_do || (window.removeEventListener("mousemove", b.mainScrubberWMouseMove), window.addEventListener("mousemove", b.mainScrubberWMouseMove));
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenX - b.mainScrubber_do.getGlobalX();
                    t < 0 ? t = 0 : t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth);
                    var s = t / b.maiScrbW;
                    b.updateToolTip(t, s), b.updateThumbnailsPreview(t, s)
                }
            }, this.mainScrubberOnOutHandler = function(e) {
                b.isMainScrubberScrubbing_bl || (b.ttm && b.ttm.hide(), b.thumbnailsPreview_do && m.hasThumbnailsPreview && b.thumbnailsPreview_do.hide())
            }, this.mainScrubberOnDownHandler = function(e) {
                if (!b.isMainScrubberDisabled_bl && 2 != e.button) {
                    m.showDisable(), e.preventDefault && e.preventDefault(), b.isMainScrubberScrubbing_bl = !0;
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenX - b.mainScrubber_do.getGlobalX();
                    t < 0 ? t = 0 : t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth);
                    var s = t / b.maiScrbW;
                    p.showMainScrubberToolTipLabel_bl && !m.hasThumbnailsPreview && b.ttm.show(), b.thumbnailsPreview_do && m.hasThumbnailsPreview && b.thumbnailsPreview_do.show(), b.updateToolTip(t, s), b.updateMainScrubber(s), b.updateThumbnailsPreview(t, s), b.dispatchEvent(o.START_TO_SCRUB), b.dispatchEvent(o.SCRUB, {
                        percent: s
                    }), b.hasPointerEvent_bl ? (window.addEventListener("pointermove", b.mainScrubberMoveHandler), window.addEventListener("pointerup", b.mainScrubberEndHandler)) : (window.addEventListener("mousemove", b.mainScrubberMoveHandler), window.addEventListener("mouseup", b.mainScrubberEndHandler), window.addEventListener("touchmove", b.mainScrubberMoveHandler), window.addEventListener("touchend", b.mainScrubberEndHandler))
                }
            }, this.mainScrubberMoveHandler = function(e) {
                e.preventDefault && e.preventDefault();
                var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenX - b.mainScrubber_do.getGlobalX();
                t < 0 ? t = 0 : t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth);
                var s = t / b.maiScrbW;
                b.updateToolTip(t, s), b.updateMainScrubber(s), b.updateThumbnailsPreview(t, s), b.dispatchEvent(o.SCRUB, {
                    percent: s
                })
            }, this.mainScrubberEndHandler = function(e) {
                if (m.hideDisable(), e) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    FWDUVPUtils.hitTest(b.mainScrubber_do.screen, t.screenX, t.screenY) || (b.ttm && b.ttm.hide(), b.thumbnailsPreview_do && m.hasThumbnailsPreview && b.thumbnailsPreview_do.hide())
                }
                b.isMainScrubberScrubbing_bl = !1, b.dispatchEvent(o.STOP_TO_SCRUB), b.hasPointerEvent_bl ? (window.removeEventListener("pointermove", b.mainScrubberMoveHandler), window.removeEventListener("pointerup", b.mainScrubberEndHandler)) : (window.removeEventListener("mousemove", b.mainScrubberMoveHandler), window.removeEventListener("mouseup", b.mainScrubberEndHandler), window.removeEventListener("touchmove", b.mainScrubberMoveHandler), window.removeEventListener("touchend", b.mainScrubberEndHandler))
            }, this.disableMainScrubber = function() {
                b.mainScrubber_do && (b.isMainScrubberDisabled_bl = !0, b.mainScrubber_do.setButtonMode(!1), b.mainScrubberEndHandler(), b.mainScrubberOnOutHandler(), b.updateMainScrubber(0), b.updatePreloaderBar(0))
            }, this.enableMainScrubber = function() {
                b.mainScrubber_do && !b.isLive && (b.isMainScrubberDisabled_bl = !1, b.disableVideoScrubber_bl || b.mainScrubber_do.setButtonMode(!0))
            }, this.updateMainScrubber = function(e) {
                if (b.mainScrubber_do) {
                    b.isLive && (e = 0);
                    var t = parseInt(e * b.maiScrbW);
                    isNaN(t) || null == t || (t < 0 && (t = 0), b.percentPlayed = e, !FWDUVPlayer.hasHTML5Video && t >= b.mainProgress_do.w && (t = b.mainProgress_do.w), t < 1 && b.isMainScrubberLineVisible_bl ? (b.isMainScrubberLineVisible_bl = !1, FWDAnimation.to(b.mainScrubberBarLine_do, .5, {
                        alpha: 0
                    })) : 1 < t && !b.isMainScrubberLineVisible_bl && (b.isMainScrubberLineVisible_bl = !0, FWDAnimation.to(b.mainScrubberBarLine_do, .5, {
                        alpha: 1
                    })), b.mainScrubberDrag_do.setWidth(t), t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth), t < 0 && (t = 0), FWDAnimation.to(b.mainScrubberBarLine_do, .8, {
                        x: t + 1,
                        ease: Expo.easeOut
                    }))
                }
            }, this.updatePreloaderBar = function(e) {
                if (b.mainProgress_do) {
                    b.isLive && (e = 0), b.percentLoaded = e;
                    var t = parseInt(b.percentLoaded * b.maiScrbW);
                    isNaN(t) || null == t || (t < 0 && (t = 0), .98 <= b.percentLoaded ? (b.percentLoaded = 1, b.mainProgress_do.setY(-30)) : 0 != b.mainProgress_do.y && 1 != b.percentLoaded && b.mainProgress_do.setY(0), t > b.maiScrbW - b.scrubbersOffsetWidth && (t = b.maiScrbW - b.scrubbersOffsetWidth), t < 0 && (t = 0), b.mainProgress_do.setWidth(t))
                }
            }, this.setupPrevButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.prevButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-FF-left'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.prevButton_do = new FWDUVPSimpleButton(p.prev2N_img, p.prevSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.prevButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.prevButtonShowTooltipHandler), b.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.prevButtonOnMouseUpHandler), b.prevButton_do.setY(parseInt((b.sH - b.prevButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.prevButton_do.buttonHeight && (clearInterval(e), b.prevButton_do.setY(parseInt((b.sH - b.prevButton_do.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.prevButton_do), b.mainHld.addChild(b.prevButton_do)
            }, this.prevButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.prevButton_do, b.prevButtonToolTip_do, e.e)
            }, this.prevButtonOnMouseUpHandler = function() {
                b.dispatchEvent(FWDUVPPlaylist.PLAY_PREV_VIDEO)
            }, this.setupNextButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.nextButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-FF-right'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.nextButton_do = new FWDUVPSimpleButton(p.next2N_img, p.nextSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.nextButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.nextButtonShowTooltipHandler), b.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.nextButtonOnMouseUpHandler), b.nextButton_do.setY(parseInt((b.sH - b.nextButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.nextButton_do.buttonHeight && (clearInterval(e), b.nextButton_do.setY(parseInt((b.sH - b.nextButton_do.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.nextButton_do), b.mainHld.addChild(b.nextButton_do)
            }, this.nextButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.nextButton_do, b.nextButtonToolTip_do, e.e)
            }, this.nextButtonOnMouseUpHandler = function() {
                b.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO)
            }, this.setupPlayPauseButton = function() {
                b.useVectorIcons_bl ? (FWDUVPComplexButton.setPrototype(), b.playPauseButton_do = new FWDUVPComplexButton(void 0, void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-play'></span>", "<span class='fwdicon fwdicon-pause'></span>", "UVPMainButtonsNormalState play", "UVPMainButtonsSelectedState play")) : (FWDUVPComplexButton.setPrototype(), b.playPauseButton_do = new FWDUVPComplexButton(b.playN_img, p.playSPath_str, b.pauseN_img, p.pauseSPath_str, !0, b.useHEX, b.nBC, b.sBC)), b.buttons_ar.push(b.playPauseButton_do), b.playPauseButton_do.setY(parseInt((b.sH - b.playPauseButton_do.buttonHeight) / 2));
                var e = setInterval(function() {
                    0 < b.playPauseButton_do.buttonHeight && (clearInterval(e), b.playPauseButton_do.setY(parseInt((b.sH - b.playPauseButton_do.buttonHeight) / 2)))
                }, 50);
                b.playPauseButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, b.playButtonShowTooltipHandler), b.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, b.playButtonMouseUpHandler), b.mainHld.addChild(b.playPauseButton_do)
            }, this.playButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.playPauseButton_do, b.playPauseToolTip_do, e.e)
            }, this.showPlayButton = function() {
                b.playPauseButton_do && b.playPauseButton_do.setButtonState(1)
            }, this.showPauseButton = function() {
                b.playPauseButton_do && b.playPauseButton_do.setButtonState(0)
            }, this.playButtonMouseUpHandler = function() {
                0 == b.playPauseButton_do.currentState ? b.dispatchEvent(o.PAUSE) : b.dispatchEvent(o.PLAY)
            }, this.disablePlayButton = function() {
                b.playPauseButton_do.disable(), b.playPauseButton_do.setNormalState(), b.showPlayButton()
            }, this.enablePlayButton = function() {
                b.playPauseButton_do.enable()
            }, this.setupCategoriesButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.categoriesButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-playlist'></span>", void 0, "UVPMainButtonsNormalState cats", "UVPMainButtonsSelectedState cats")) : (FWDUVPSimpleButton.setPrototype(), b.categoriesButton_do = new FWDUVPSimpleButton(b.categoriesN_img, p.categoriesSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.categoriesButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.categoriesButtonShowTooltipHandler), b.categoriesButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.categoriesButtonOnMouseUpHandler), b.categoriesButton_do.setY(parseInt((b.sH - b.categoriesButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.categoriesButton_do.buttonHeight && (clearInterval(e), b.categoriesButton_do.setY(parseInt((b.sH - b.categoriesButton_do.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.categoriesButton_do), b.mainHld.addChild(b.categoriesButton_do)
            }, this.categoriesButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.categoriesButton_do, b.playlistsButtonToolTip_do, e.e)
            }, this.categoriesButtonOnMouseUpHandler = function() {
                b.dispatchEvent(o.SHOW_CATEGORIES)
            }, this.setCategoriesButtonState = function(e) {
                b.categoriesButton_do && ("selected" == e ? b.categoriesButton_do.setSelected() : "unselected" == e && b.categoriesButton_do.setUnselected())
            }, this.setupPlaylistButton = function() {
                b.useVectorIcons_bl ? (FWDUVPComplexButton.setPrototype(), b.playlistButton_do = new FWDUVPComplexButton(void 0, void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-playlist-sidebar'></span>", "<span class='fwdicon fwdicon-playlist-close-sidebar'></span>", "UVPMainButtonsNormalState playlist", "UVPMainButtonsSelectedState playlist")) : (FWDUVPComplexButton.setPrototype(), b.playlistButton_do = new FWDUVPComplexButton(b.hidePlaylistN_img, p.hidePlaylistSPath_str, b.showPlaylistN_img, p.showPlaylistSPath_str, !0, b.useHEX, b.nBC, b.sBC)), b.buttons_ar.push(b.playlistButton_do), b.playlistButton_do.setY(parseInt((b.sH - b.playlistButton_do.buttonHeight) / 2));
                var e = setInterval(function() {
                    0 < b.playlistButton_do.buttonHeight && (clearInterval(e), b.playlistButton_do.setY(parseInt((b.sH - b.playlistButton_do.buttonHeight) / 2)))
                }, 50);
                b.playlistButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, b.playlistButtonShowToolTipHandler), b.playlistButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, b.playlistButtonMouseUpHandler), b.showPlaylistByDefault_bl || b.playlistButton_do.setButtonState(0), b.mainHld.addChild(b.playlistButton_do)
            }, this.playlistButtonShowToolTipHandler = function(e) {
                b.showToolTip(b.playlistButton_do, b.playlistButtonToolTip_do, e.e)
            }, this.showShowPlaylistButton = function() {
                b.playlistButton_do && b.playlistButton_do.setButtonState(1)
            }, this.showHidePlaylistButton = function() {
                b.playlistButton_do && b.playlistButton_do.setButtonState(0)
            }, this.playlistButtonMouseUpHandler = function() {
                1 == b.playlistButton_do.currentState ? b.dispatchEvent(o.SHOW_PLAYLIST) : b.dispatchEvent(o.HIDE_PLAYLIST), b.playlistButton_do.setNormalState(!0), b.playlistButtonToolTip_do && b.playlistButtonToolTip_do.hide()
            }, this.disablePlaylistButton = function() {
                b.playlistButton_do && (b.playlistButton_do.disable(), b.playlistButton_do.setAlpha(.4))
            }, this.enablePlaylistButton = function() {
                b.playlistButton_do && (b.playlistButton_do.enable(), b.playlistButton_do.setAlpha(1))
            }, this.setupEmbedButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.embedButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-embed'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.embedButton_do = new FWDUVPSimpleButton(b.embedN_img, p.embedPathS_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.embedButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.embedButtonShowToolTipHandler), b.embedButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.embedButtonOnMouseUpHandler), b.embedButton_do.setY(parseInt((b.sH - b.embedButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.embedButton_do.buttonHeight && (clearInterval(e), b.embedButton_do.setY(parseInt((b.sH - b.embedButton_do.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.embedButton_do), b.mainHld.addChild(b.embedButton_do)
            }, this.embedButtonShowToolTipHandler = function(e) {
                b.showToolTip(b.embedButton_do, b.embedButtonToolTip_do, e.e)
            }, this.embedButtonOnMouseUpHandler = function() {
                b.dispatchEvent(o.SHOW_EMBED_WINDOW), b.embedButtonToolTip_do && b.embedButtonToolTip_do.hide()
            }, this.setupYtbButtons = function() {
                var e, t;
                (b.ytbButtonsHolder_do = new FWDUVPDisplayObject("div"), b.ytbButtonsHolder_do.setOverflow("visible"), b.repeatBackground_bl) ? b.ytbButtonsHolder_do.getStyle().background = "url('" + b.controllerBkPath_str + "')": (b.ytbButtonBackground_do = new FWDUVPDisplayObject("img"), (e = new Image).src = b.controllerBkPath_str, b.ytbButtonBackground_do.setScreen(e), b.ytbButtonsHolder_do.addChild(b.ytbButtonBackground_do));
                b.ytbButtonsHolder_do.setX(300), b.ytbButtonsHolder_do.setY(-300), m.videoHolder_do.addChild(b.ytbButtonsHolder_do, 0), (e = new Image).src = b.ytbQualityButtonPointerPath_str, b.pointer_do = new FWDUVPDisplayObject("img"), b.pointer_do.setScreen(e), b.pointer_do.setWidth(b.pointerWidth), b.pointer_do.setHeight(b.pointerHeight), b.ytbButtonsHolder_do.addChild(b.pointer_do), (e = new Image).src = b.youtubeQualityArrowPath_str, b.ytbQualityArrow_do = new FWDUVPDisplayObject("img"), b.ytbQualityArrow_do.setScreen(e), b.ytbQualityArrow_do.setX(7), b.ytbQualityArrow_do.setWidth(5), b.ytbQualityArrow_do.setHeight(7), b.ytbButtonsHolder_do.addChild(b.ytbQualityArrow_do);
                for (var s = 0; s < b.ttYtbBtns; s++) FWDUVPYTBQButton.setPrototype(), (t = new FWDUVPYTBQButton(b.ytbQuality_ar[s], b.youtubeQualityButtonNormalColor_str, b.youtubeQualityButtonSelectedColor_str, p.hdPath_str, s)).addListener(FWDUVPYTBQButton.MOUSE_OVER, b.ytbQualityOver), t.addListener(FWDUVPYTBQButton.MOUSE_OUT, b.ytbQualityOut), t.addListener(FWDUVPYTBQButton.CLICK, b.ytbQualityClick), b.ytbButtons_ar[s] = t, b.ytbButtonsHolder_do.addChild(t);
                b.hideQualityButtons(!1)
            }, this.ytbQualityOver = function(e) {
                b.setYtbQualityArrowPosition(e.target)
            }, this.ytbQualityOut = function(e) {
                b.setYtbQualityArrowPosition(void 0)
            }, this.ytbQualityClick = function(e) {
                b.hideQualityButtons(!0), b.dispatchEvent(o.CHANGE_YOUTUBE_QUALITY, {
                    quality: e.target.label_str,
                    id: e.id
                })
            }, this.positionAndResizeYtbQualityButtons = function(e) {
                if (e) {
                    var t = e.length;
                    if (b.prevYtbQualityButtonsLength != t) {
                        var s;
                        this.prevYtbQualityButtonsLength = t;
                        for (var o = 5, i = 0, l = 0, n = 0; n < t; n++)(s = b.ytbButtons_ar[n]) && s.updateText(e[n]);
                        setTimeout(function() {
                            for (var e = 0; e < b.ttYtbBtns; e++)(s = b.ytbButtons_ar[e]).setFinalSize(), e < t ? (0 != s.x && s.setX(0), s.w > i && (i = s.w), s.setY(o), o += s.h) : -3e3 != s.x && s.setX(-3e3);
                            for (e = 0; e < b.ttYtbBtns; e++)(s = b.ytbButtons_ar[e]).dumy_do.w < i && (s.setWidth(i), s.dumy_do.setWidth(i));
                            l = o + 5, b.pointer_do.setX(parseInt((i - b.pointer_do.w) / 2)), b.pointer_do.setY(l), b.ytbButtonBackground_do && (b.ytbButtonBackground_do.setWidth(i), b.ytbButtonBackground_do.setHeight(l)), b.ytbButtonsHolder_do.setWidth(i), b.ytbButtonsHolder_do.setHeight(l)
                        }, 300)
                    }
                }
            }, this.disableQualityButtons = function(e) {
                "highres" == e || "hd1080" == e || "hd720" == e || "hd1440" == e || "hd2160" == e ? b.ytbQualityButton_do.showDisabledState() : b.ytbQualityButton_do.hideDisabledState();
                for (var t = 0; t < b.ttYtbBtns; t++) btn = b.ytbButtons_ar[t], btn.label_str == e ? (FWDAnimation.killTweensOf(b.ytbQualityArrow_do), 0 != btn.y && (b.ytbQualityArrow_do.setY(btn.y + Math.round((btn.h - b.ytbQualityArrow_do.h) / 2)), b.ytbDisabledButton_do = btn), btn.disable()) : btn.enable()
            }, this.setYtbQualityArrowPosition = function(e) {
                var t = 0;
                t = e ? e.y + parseInt((e.h - b.ytbQualityArrow_do.h) / 2) : b.ytbDisabledButton_do.y + parseInt((b.ytbDisabledButton_do.h - b.ytbQualityArrow_do.h) / 2), FWDAnimation.killTweensOf(b.ytbQualityArrow_do), FWDAnimation.to(b.ytbQualityArrow_do, .6, {
                    y: t,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, this.showQualityButtons = function(e) {
                if (!b.areYtbQualityButtonsShowed_bl && b.showYoutubeQualityButton_bl) {
                    b.hideSubtitleButtons(), b.hideMainScrubberTop(), b.areYtbQualityButtonsShowed_bl = !0;
                    var t = parseInt(b.ytbQualityButton_do.x + parseInt(b.ytbQualityButton_do.w - b.ytbButtonsHolder_do.w) / 2),
                        s = parseInt(m.tempVidStageHeight - b.sH - b.ytbButtonsHolder_do.h - 6);
                    window.hasPointerEvent_bl ? window.addEventListener("pointerdown", b.hideQualityButtonsHandler) : (b.isMbl || window.addEventListener("mousedown", b.hideQualityButtonsHandler), window.addEventListener("touchstart", b.hideQualityButtonsHandler)), b.ytbButtonsHolder_do.setX(t), e ? FWDAnimation.to(b.ytbButtonsHolder_do, .6, {
                        y: s,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(b.ytbButtonsHolder_do), b.ytbButtonsHolder_do.setY(s))
                }
            }, this.hideQualityButtons = function(e) {
                b.areYtbQualityButtonsShowed_bl && b.showYoutubeQualityButton_bl && (b.hideSubtitleButtons(), b.areYtbQualityButtonsShowed_bl = !1, e ? FWDAnimation.to(b.ytbButtonsHolder_do, .6, {
                    y: m.sH,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(b.ytbButtonsHolder_do), b.ytbButtonsHolder_do.setY(m.sH)), window.hasPointerEvent_bl ? window.removeEventListener("pointerdown", b.hideQualityButtonsHandler) : (b.isMbl || window.removeEventListener("mousedown", b.hideQualityButtonsHandler), window.removeEventListener("touchstart", b.hideQualityButtonsHandler)))
            }, this.showSubBtn, this.subtitlesSource_ar = p.subtitles_ar, this.subtitleButtons_ar = [], this.totalSubttleButtons = 10, this.setupSubtitleButton = function() {
                b.useVectorIcons_bl ? (FWDUVPComplexButton.setPrototype(), b.subtitleButton_do = new FWDUVPComplexButton(void 0, void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-CC'></span>", "<span class='fwdicon fwdicon-CC-off'></span>", "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPComplexButton.setPrototype(), b.subtitleButton_do = new FWDUVPComplexButton(p.showSubtitleNPath_img, p.showSubtitleSPath_str, p.hideSubtitleNPath_img, p.hideSubtitleSPath_str, !0, b.useHEX, b.nBC, b.sBC));
                var e = setInterval(function() {
                    0 < b.subtitleButton_do.buttonHeight && (clearInterval(e), b.subtitleButton_do.setY(parseInt((b.sH - b.subtitleButton_do.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.subtitleButton_do), b.subtitleButton_do.setY(parseInt((b.sH - b.subtitleButton_do.h) / 2)), b.subtitleButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, b.subtitleButtonMouseUpHandler), b.mainHld.addChild(b.subtitleButton_do), b.setupSubtitleButtons(), -1 != location.protocol.indexOf("file:") && b.disableSubtitleButton(), m.subtitle_do.showSubtitileByDefault_bl && b.subtitleButton_do.setButtonState(0)
            }, this.subtitleButtonMouseUpHandler = function() {
                b.areSubtitleButtonsShowed_bl ? b.hideSubtitleButtons(!0) : b.showSubtitleButtons(!0)
            }, this.disableSubtitleButton = function() {
                b.subtitleButton_do && b.subtitleButton_do.disable()
            }, this.enableSubtitleButton = function() {
                b.subtitleButton_do && b.subtitleButton_do.enable()
            }, this.updateSubtitleButtons = function(e, t) {
                b.subtitleButton_do && (b.subtitlesSource_ar = e, b.positionAndResizeSubtitleButtons(e), setTimeout(function() {
                    t = b.subtitlesSource_ar.length - 1 - t, b.disableSubtitleButtons(t)
                }, 65), b.prevSubtitleIndex = t)
            }, this.setupSubtitleButtons = function() {
                var e, t;
                (b.subtitlesButtonsHolder_do = new FWDUVPDisplayObject("div"), b.subtitlesButtonsHolder_do.setOverflow("visible"), b.repeatBackground_bl) ? b.subtitlesButtonsHolder_do.getStyle().background = "url('" + b.controllerBkPath_str + "')": (b.subtitlesButtonsBackground_do = new FWDUVPDisplayObject("img"), (e = new Image).src = b.controllerBkPath_str, b.subtitlesButtonsBackground_do.setScreen(e), b.subtitlesButtonsHolder_do.addChild(b.subtitlesButtonsBackground_do));
                b.subtitlesButtonsHolder_do.setX(300), b.subtitlesButtonsHolder_do.setY(-300), m.videoHolder_do.addChild(b.subtitlesButtonsHolder_do, 0), (e = new Image).src = b.ytbQualityButtonPointerPath_str, b.subtitlesPonter_do = new FWDUVPDisplayObject("img"), b.subtitlesPonter_do.setScreen(e), b.subtitlesPonter_do.setWidth(b.pointerWidth), b.subtitlesPonter_do.setHeight(b.pointerHeight), b.subtitlesButtonsHolder_do.addChild(b.subtitlesPonter_do), (e = new Image).src = b.youtubeQualityArrowPath_str, b.subtitleQualityArrow_do = new FWDUVPDisplayObject("img"), b.subtitleQualityArrow_do.setScreen(e), b.subtitleQualityArrow_do.setX(7), b.subtitleQualityArrow_do.setWidth(5), b.subtitleQualityArrow_do.setHeight(7), b.subtitlesButtonsHolder_do.addChild(b.subtitleQualityArrow_do);
                for (var s = 0; s < b.totalSubttleButtons; s++) FWDUVPYTBQButton.setPrototype(), (t = new FWDUVPYTBQButton("no source", b.youtubeQualityButtonNormalColor_str, b.youtubeQualityButtonSelectedColor_str, p.hdPath_str, s)).addListener(FWDUVPYTBQButton.MOUSE_OVER, b.sbtQualityOver), t.addListener(FWDUVPYTBQButton.MOUSE_OUT, b.sbtQualityOut), t.addListener(FWDUVPYTBQButton.CLICK, b.sbtQualityClick), b.subtitleButtons_ar[s] = t, b.subtitlesButtonsHolder_do.addChild(t);
                b.hideSubtitleButtons(!1)
            }, this.sbtQualityOver = function(e) {
                b.setSubtitleArrowPosition(e.target)
            }, this.sbtQualityOut = function(e) {
                b.setSubtitleArrowPosition(void 0)
            }, this.sbtQualityClick = function(e) {
                b.startAtSubtitle = e.id, b.disableSubtitleButtons(b.startAtSubtitle), b.hideSubtitleButtons(!0), b.dispatchEvent(o.CHANGE_SUBTITLE, {
                    id: b.subtitlesSource_ar.length - 1 - e.id
                })
            }, this.positionAndResizeSubtitleButtons = function(e) {
                if (e) {
                    var t = e.length;
                    if (b.prevSubtitlesQualityButtonsLength != t) {
                        var s;
                        this.prevSubtitlesQualityButtonsLength = t;
                        for (var o = 5, i = 0, l = 0, n = 0; n < t; n++)(s = b.subtitleButtons_ar[n]).updateText(e[n].label), s.setFinalSize();
                        setTimeout(function() {
                            for (var e = 0; e < b.totalSubttleButtons; e++) s = b.subtitleButtons_ar[e], e < t ? (0 != s.x && s.setX(0), s.w > i && (i = s.w), s.setY(o), o += s.h) : -3e3 != s.x && s.setX(-3e3);
                            for (e = 0; e < b.totalSubttleButtons; e++)(s = b.subtitleButtons_ar[e]).dumy_do.w < i && (s.setWidth(i), s.dumy_do.setWidth(i));
                            l = o + 5, b.subtitlesPonter_do.setX(parseInt((i - b.subtitlesPonter_do.w) / 2)), b.subtitlesPonter_do.setY(l), b.subtitlesButtonsBackground_do && (b.subtitlesButtonsBackground_do.setWidth(i), b.subtitlesButtonsBackground_do.setHeight(l)), b.subtitlesButtonsHolder_do.setWidth(i), b.subtitlesButtonsHolder_do.setHeight(l)
                        }, 60)
                    }
                }
            }, this.disableSubtitleButtons = function(e) {
                for (var t = 0; t < b.totalSubttleButtons; t++) btn = b.subtitleButtons_ar[t], t == e ? (FWDAnimation.killTweensOf(b.subtitleQualityArrow_do), b.subtitleQualityArrow_do.setY(btn.y + parseInt((btn.h - b.subtitleQualityArrow_do.h) / 2) + 1), btn.disable(), b.subtitleDisabledButton_do = btn) : btn.enable();
                b.subtitlesSource_ar.length - 1 - e == 0 ? b.subtitleButton_do.setButtonState(0) : b.subtitleButton_do.setButtonState(1)
            }, this.setSubtitleArrowPosition = function(e) {
                var t = 0;
                t = e ? e.y + parseInt((e.h - b.subtitleQualityArrow_do.h) / 2) : b.subtitleDisabledButton_do.y + parseInt((b.subtitleDisabledButton_do.h - b.subtitleQualityArrow_do.h) / 2), FWDAnimation.killTweensOf(b.subtitleQualityArrow_do), FWDAnimation.to(b.subtitleQualityArrow_do, .6, {
                    y: t,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, this.showSubtitleButtons = function(e) {
                if (!b.areSubtitleButtonsShowed_bl) {
                    b.hideQualityButtons(), b.hideMainScrubberTop(), b.areSubtitleButtonsShowed_bl = !0;
                    var t = parseInt(b.subtitleButton_do.x + parseInt(b.subtitleButton_do.w - b.subtitlesButtonsHolder_do.w) / 2),
                        s = parseInt(m.tempVidStageHeight - b.sH - b.subtitlesButtonsHolder_do.h - 6);
                    b.hasPointerEvent_bl ? window.addEventListener("pointerdown", b.hideSubtitlesButtonsHandler) : (b.isMbl || window.addEventListener("mousedown", b.hideSubtitlesButtonsHandler), window.addEventListener("touchstart", b.hideSubtitlesButtonsHandler)), b.subtitlesButtonsHolder_do.setX(t), e ? FWDAnimation.to(b.subtitlesButtonsHolder_do, .6, {
                        y: s,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(b.subtitlesButtonsHolder_do), b.subtitlesButtonsHolder_do.setY(s))
                }
            }, this.hideSubtitleButtons = function(e) {
                b.areSubtitleButtonsShowed_bl && b.subtitlesButtonsHolder_do && (b.areSubtitleButtonsShowed_bl = !1, e ? FWDAnimation.to(b.subtitlesButtonsHolder_do, .6, {
                    y: m.sH,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(b.subtitlesButtonsHolder_do), b.subtitlesButtonsHolder_do.setY(m.sH)), b.hasPointerEvent_bl ? window.removeEventListener("pointerdown", b.hideSubtitlesButtonsHandler) : (b.isMbl || window.removeEventListener("mousedown", b.hideSubtitlesButtonsHandler), window.removeEventListener("touchstart", b.hideSubtitlesButtonsHandler)), b.showMainScrubberOnTop())
            }, this.hideSubtitlesButtonsHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                FWDUVPUtils.hitTest(b.subtitleButton_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(b.subtitlesButtonsHolder_do.screen, t.screenX, t.screenY) || b.hideSubtitleButtons(!0)
            }, this.setupYoutubeQualityButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.ytbQualityButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-settings'></span>", p.hdIcn, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.ytbQualityButton_do = new FWDUVPSimpleButton(b.ytbQualityN_img, p.ytbQualitySPath_str, p.ytbQualityDPath_str, !0, b.useHEX, b.nBC, b.sBC)), b.ytbQualityButton_do.setX(-300), b.ytbQualityButton_do.setY(parseInt((b.sH - b.ytbQualityButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.ytbQualityButton_do.buttonHeight && (clearInterval(e), b.ytbQualityButton_do.setY(parseInt((b.sH - b.ytbQualityButton_do.buttonHeight) / 2)))
                }, 50);
                b.ytbQualityButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.ytbQualityMouseUpHandler), b.mainHld.addChild(b.ytbQualityButton_do)
            }, this.ytbQualityMouseUpHandler = function() {
                b.areYtbQualityButtonsShowed_bl ? (b.hideQualityButtons(!0), b.isMainScrubberOnTop_bl && (b.mainScrubber_do.setX(0), FWDAnimation.to(b.mainScrubber_do, .6, {
                    alpha: 1
                }))) : b.showQualityButtons(!0)
            }, this.hideQualityButtonsHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                FWDUVPUtils.hitTest(b.ytbQualityButton_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(b.ytbButtonsHolder_do.screen, t.screenX, t.screenY) || (b.hideQualityButtons(!0), b.showMainScrubberOnTop())
            }, this.addYtbQualityButton = function() {
                !b.hasYtbButton_bl && b.showYoutubeQualityButton_bl && (b.hasYtbButton_bl = !0, b.subtitleButton_do && -1 != b.getButtonIndex(b.subtitleButton_do) ? (indexToAdd = b.getButtonIndex(b.subtitleButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.playbackRateButton_do && -1 != b.getButtonIndex(b.playbackRateButton_do) ? (indexToAdd = b.getButtonIndex(b.playbackRateButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.atbButton_do && -1 != b.getButtonIndex(b.atbButton_do) ? (indexToAdd = b.getButtonIndex(b.atbButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.infoButton_do && -1 != b.getButtonIndex(b.infoButton_do) ? (indexToAdd = b.getButtonIndex(b.infoButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.downloadButton_do && -1 != b.getButtonIndex(b.downloadButton_do) ? (indexToAdd = b.getButtonIndex(b.ytbQualityButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.ccBtn_do && -1 != b.getButtonIndex(b.ccBtn_do) ? (indexToAdd = b.getButtonIndex(b.ccBtn_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.fullScreenButton_do ? (indexToAdd = b.getButtonIndex(b.fullScreenButton_do), b.buttons_ar.splice(indexToAdd, 0, b.ytbQualityButton_do)) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.ytbQualityButton_do), b.ytbQualityButton_do.disable(), b.ytbQualityButton_do.rotation = 0, b.ytbQualityButton_do.setRotation(b.ytbQualityButton_do.rotation), b.ytbQualityButton_do.hideDisabledState(), b.hideQualityButtons(!1), b.positionButtons())
            }, this.removeYtbQualityButton = function() {
                b.hasYtbButton_bl && b.showYoutubeQualityButton_bl && (b.hasYtbButton_bl = !1, b.buttons_ar.splice(FWDUVPUtils.indexOfArray(b.buttons_ar, b.ytbQualityButton_do), 1), b.ytbQualityButton_do.setX(-300), b.ytbQualityButton_do.hideDisabledState(), b.hideQualityButtons(!1), b.positionButtons())
            }, this.updateQuality = function(e, t) {
                b.hasYtbButton_bl && b.showYoutubeQualityButton_bl && (b.positionAndResizeYtbQualityButtons(e), setTimeout(function() {
                    b.disableQualityButtons(t)
                }, 300))
            }, this.setupInfoButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.infoButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-info'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.infoButton_do = new FWDUVPSimpleButton(b.infoN_img, p.infoSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC));
                var e = setInterval(function() {
                    0 < b.infoButton_do.buttonHeight && (clearInterval(e), b.infoButton_do.setY(parseInt((b.sH - b.infoButton_do.buttonHeight) / 2)))
                }, 50);
                b.infoButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.infoButtonShowToolTipHandler), b.infoButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.infoButtonOnMouseUpHandler), b.infoButton_do.setX(-300), b.infoButton_do.setY(parseInt((b.sH - b.infoButton_do.h) / 2)), b.mainHld.addChild(b.infoButton_do)
            }, this.infoButtonShowToolTipHandler = function(e) {
                b.showToolTip(b.infoButton_do, b.infoButtonToolTip_do, e.e)
            }, this.infoButtonOnMouseUpHandler = function() {
                b.dispatchEvent(o.SHOW_INFO_WINDOW)
            }, this.enableQualtyButton = function() {
                b.ytbQualityButton_do && b.ytbQualityButton_do.enable()
            }, this.disableQualtyButton = function() {
                b.ytbQualityButton_do && b.ytbQualityButton_do.disable()
            }, this.setupDownloadButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.downloadButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-download'></span>", void 0, "UVPMainButtonsNormalState dw", "UVPMainButtonsSelectedState dw")) : (FWDUVPSimpleButton.setPrototype(), b.downloadButton_do = new FWDUVPSimpleButton(b.downloadN_img, p.downloadSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.downloadButtonShowToolTipHandler), b.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.downloadButtonOnMouseUpHandler), b.downloadButton_do.setX(-300), b.downloadButton_do.setY(parseInt((b.sH - b.downloadButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.downloadButton_do.buttonHeight && (clearInterval(e), b.downloadButton_do.setY(parseInt((b.sH - b.downloadButton_do.buttonHeight) / 2)))
                }, 50);
                b.mainHld.addChild(b.downloadButton_do)
            }, this.downloadButtonShowToolTipHandler = function(e) {
                b.showToolTip(b.downloadButton_do, b.downloadButtonToolTip_do, e.e)
            }, this.downloadButtonOnMouseUpHandler = function() {
                b.dispatchEvent(o.DOWNLOAD_VIDEO)
            }, this.setupThumbnailsPreview = function() {
                !b.thumbnailsPreview_do && window.FWDUVPThumbnailsPreview && (FWDUVPThumbnailsPreview.setPrototype(), b.thumbnailsPreview_do = new FWDUVPThumbnailsPreview(b), b.thumbnailsPreview_do.addListener(FWDUVPData.LOAD_ERROR, function(e) {
                    b.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: e.text
                    })
                }))
            }, this.setupATB = function() {
                FWDUVPATB.setPrototype(), b.atb = new FWDUVPATB(b), b.mainHld.addChild(b.atb), b.atb.addListener(FWDUVPATB.START_TO_SCRUB, b.atbStartToScrub), b.atb.addListener(FWDUVPATB.STOP_TO_SCRUB, b.atbStopToScrub)
            }, b.atbStartToScrub = function() {
                m.showDisable()
            }, b.atbStopToScrub = function() {
                m.hideDisable()
            }, this.setupAtbButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.atbButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-AB'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.atbButton_do = new FWDUVPSimpleButton(p.atbNPath_img, p.atbSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.atbButton_do.setX(-5e3), b.atbButton_do.setY(parseInt((b.sH - b.atbButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.atbButton_do.buttonHeight && (clearInterval(e), b.atbButton_do.setY(parseInt((b.sH - b.atbButton_do.buttonHeight) / 2)))
                }, 50);
                b.atbButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.atbButtonShowTooltipHandler), b.atbButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.atbButtonMouseUpHandler), b.mainHld.addChild(b.atbButton_do)
            }, this.atbButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.atbButton_do, b.atbButtonToolTip_do, e.e)
            }, this.atbButtonMouseUpHandler = function() {
                b.atbButton_do.isSelected ? (b.atbButton_do.doNotallowToSetNormal = !1, b.atbButton_do.isSelected = !1, b.atb.hide(!0)) : (b.atbButton_do.isSelected = !0, b.atbButton_do.doNotallowToSetNormal = !0, b.atbButton_do.setSelectedState(), b.atb.show(!0))
            }, this.disableAtbButton = function() {
                b.atbButton_do && b.atbButton_do.disable()
            }, this.enableAtbButton = function() {
                b.atbButton_do && b.atbButton_do.enable()
            }, this.setupShareButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.shareButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-share'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.shareButton_do = new FWDUVPSimpleButton(p.shareN_img, p.shareSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.buttons_ar.push(b.shareButton_do), b.shareButton_do.setY(parseInt((b.sH - b.shareButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.shareButton_do.buttonHeight && (clearInterval(e), b.shareButton_do.setY(parseInt((b.sH - b.shareButton_do.buttonHeight) / 2)))
                }, 50);
                b.shareButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.facebookButtonShowTooltipHandler), b.shareButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.facebookButtonMouseUpHandler), b.mainHld.addChild(b.shareButton_do)
            }, this.facebookButtonShowTooltipHandler = function(e) {
                b.showToolTip(b.shareButton_do, b.facebookButtonToolTip_do, e.e)
            }, this.facebookButtonMouseUpHandler = function() {
                b.dispatchEvent(o.SHOW_SHARE_WINDOW)
            }, this.setupChromecastButton = function() {
                b.useVectorIcons_bl ? (FWDUVPComplexButton.setPrototype(), b.ccBtn_do = new FWDUVPComplexButton(void 0, void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-cast'></span>", "<span class='fwdicon fwdicon-uncast'></span>", "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPComplexButton.setPrototype(), b.ccBtn_do = new FWDUVPComplexButton(p.castN_img, p.castSPath_str, p.uncastN_img, p.uncastSPath_str, !0, b.useHEX, b.nBC, b.sBC));
                var e = setInterval(function() {
                    0 < b.ccBtn_do.buttonHeight && (clearInterval(e), b.ccBtn_do.setY(parseInt((b.sH - b.ccBtn_do.buttonHeight) / 2)))
                }, 50);
                b.ccBtn_do.setY(parseInt((b.sH - b.ccBtn_do.buttonHeight) / 2)), b.ccBtn_do.addListener(FWDUVPComplexButton.MOUSE_UP, b.chormecastMouseUpHandler), b.ccBtn_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, b.castTooltipHandler), b.ccBtn_do.setX(-500), b.mainHld.addChild(b.ccBtn_do)
            }, this.castTooltipHandler = function(e) {
                b.showToolTip(b.ccBtn_do, b.castButtonToolTip_do, e.e)
            }, this.chormecastMouseUpHandler = function() {
                0 == b.ccBtn_do.currentState ? b.dispatchEvent(o.UNCAST) : b.dispatchEvent(o.CAST)
            }, this.removeCCButton = function() {
                b.ccBtn_do && -1 != FWDUVPUtils.indexOfArray(b.buttons_ar, b.ccBtn_do) && (b.buttons_ar.splice(FWDUVPUtils.indexOfArray(b.buttons_ar, b.ccBtn_do), 1), b.ccBtn_do.setX(-300), b.positionButtons())
            }, this.addCCButton = function() {
                b.ccBtn_do && -1 == FWDUVPUtils.indexOfArray(b.buttons_ar, b.ccBtn_do) && (b.fullScreenButton_do && -1 != FWDUVPUtils.indexOfArray(b.buttons_ar, b.fullScreenButton_do) ? b.buttons_ar.splice(FWDUVPUtils.indexOfArray(b.buttons_ar, b.fullScreenButton_do), 0, b.ccBtn_do) : b.buttons_ar.splice(b.buttons_ar.length, 0, b.ccBtn_do), b.positionButtons())
            }, this.setupFullscreenButton = function() {
                b.useVectorIcons_bl ? (FWDUVPComplexButton.setPrototype(), b.fullScreenButton_do = new FWDUVPComplexButton(void 0, void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-fullscreen'></span>", "<span class='fwdicon fwdicon-normalscreen'></span>", "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPComplexButton.setPrototype(), b.fullScreenButton_do = new FWDUVPComplexButton(b.fullScreenN_img, p.fullScreenSPath_str, b.normalScreenN_img, p.normalScreenSPath_str, !0, b.useHEX, b.nBC, b.sBC)), b.buttons_ar.push(b.fullScreenButton_do), b.fullScreenButton_do.setY(parseInt((b.sH - b.fullScreenButton_do.buttonHeight) / 2));
                var e = setInterval(function() {
                    0 < b.fullScreenButton_do.buttonHeight && (clearInterval(e), b.fullScreenButton_do.setY(parseInt((b.sH - b.fullScreenButton_do.buttonHeight) / 2)))
                }, 50);
                b.fullScreenButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, b.fullscreenButtonShowToolTipHandler), b.fullScreenButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, b.fullScreenButtonMouseUpHandler), b.mainHld.addChild(b.fullScreenButton_do)
            }, this.fullscreenButtonShowToolTipHandler = function(e) {
                b.showToolTip(b.fullScreenButton_do, b.fullscreenButtonToolTip_do, e.e)
            }, this.showFullScreenButton = function() {
                b.fullScreenButton_do && b.fullScreenButton_do.setButtonState(1)
            }, this.showNormalScreenButton = function() {
                b.fullScreenButton_do && b.fullScreenButton_do.setButtonState(0)
            }, this.setNormalStateToFullScreenButton = function() {
                b.fullScreenButton_do && (b.fullScreenButton_do.setNormalState(!0), b.hideQualityButtons(!1))
            }, this.fullScreenButtonMouseUpHandler = function() {
                b.fullscreenButtonToolTip_do && b.fullscreenButtonToolTip_do.hide(), 1 == b.fullScreenButton_do.currentState ? b.dispatchEvent(o.FULL_SCREEN) : b.dispatchEvent(o.NORMAL_SCREEN)
            }, this.setupTime = function() {
                b.time_do = new FWDUVPDisplayObject("div"), b.time_do.screen.className = "fwduvp-time", b.time_do.hasTransform3d_bl = !1, b.time_do.hasTransform2d_bl = !1, b.time_do.setBackfaceVisibility(), b.time_do.getStyle().fontFamily = "Arial", b.time_do.getStyle().fontSize = "12px", b.time_do.getStyle().whiteSpace = "nowrap", b.time_do.getStyle().textAlign = "center", b.time_do.getStyle().color = b.timeColor_str, b.time_do.getStyle().fontSmoothing = "antialiased", b.time_do.getStyle().webkitFontSmoothing = "antialiased", b.time_do.getStyle().textRendering = "optimizeLegibility", b.mainHld.addChild(b.time_do), b.updateTime("00:00/00:00"), b.buttons_ar.push(b.time_do)
            }, this.updateTime = function(e) {
                b.time_do && (b.isLive && (e = e.substr(0, e.indexOf("/"))), b.time_do.setInnerHTML(e), b.lastTimeLength != e.length && (b.time_do.w = b.time_do.getWidth(), b.positionButtons(), setTimeout(function() {
                    b.time_do.w = b.time_do.getWidth(), b.time_do.h = b.time_do.getHeight(), b.time_do.setY(parseInt((b.sH - b.time_do.h) / 2) + 1 + b.timeOffsetTop), b.positionButtons()
                }, 50), b.lastTimeLength = e.length))
            }, this.setupRewindButton = function() {
                b.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), b.rewindButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-10'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), b.rewindButton_do = new FWDUVPSimpleButton(p.rewindN_img, p.rewindSPath_str, void 0, !0, b.useHEX, b.nBC, b.sBC)), b.buttons_ar.push(b.rewindButton_do), b.rewindButton_do.setY(parseInt((b.sH - b.rewindButton_do.h) / 2));
                var e = setInterval(function() {
                    0 < b.rewindButton_do.buttonHeight && (clearInterval(e), b.rewindButton_do.setY(parseInt((b.sH - b.rewindButton_do.buttonHeight) / 2)))
                }, 50);
                b.rewindButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, b.rewindButtonMouseUpHandler), b.mainHld.addChild(b.rewindButton_do)
            }, this.rewindButtonMouseUpHandler = function() {
                b.dispatchEvent(o.REWIND)
            }, this.disableRewindButton = function() {
                b.rewindButton_do && b.rewindButton_do.disable()
            }, this.enableRewindButton = function() {
                b.rewindButton_do && b.rewindButton_do.enable()
            }, this.setupVolumeButton = function() {
                b.useVectorIcons_bl ? (FWDUVPVolumeButton.setPrototype(), b.volBtn = new FWDUVPVolumeButton(void 0, void 0, void 0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-sound'></span>", "<span class='fwdicon fwdicon-sound-off'></span>", "UVPMainButtonsNormalState volume", "UVPMainButtonsSelectedState volume")) : (FWDUVPVolumeButton.setPrototype(), b.volBtn = new FWDUVPVolumeButton(b.volumeN_img, p.volumeSPath_str, p.volumeDPath_str, b.useHEX, b.nBC, b.sBC)), b.volBtn.addListener(FWDUVPVolumeButton.SHOW_TOOLTIP, b.volumeButtonShowTooltipHandler), b.volBtn.addListener(FWDUVPVolumeButton.MOUSE_OVER, b.volumeOnMouseOverHandler), b.volBtn.addListener(FWDUVPVolumeButton.MOUSE_UP, b.volumeOnMouseUpHandler), b.volBtn.setY(parseInt((b.sH - b.volBtn.h) / 2));
                var e = setInterval(function() {
                    0 < b.volBtn.buttonHeight && (clearInterval(e), b.volBtn.setY(parseInt((b.sH - b.volBtn.buttonHeight) / 2)))
                }, 50);
                b.buttons_ar.push(b.volBtn), b.mainHld.addChild(b.volBtn), 0 == b.volume && b.volBtn.setDisabledState()
            }, this.volumeButtonShowTooltipHandler = function(e) {}, this.hideMainScrubberTop = function() {
                b.isMainScrubberOnTop_bl && FWDAnimation.to(b.mainScrubber_do, .4, {
                    alpha: 0,
                    onComplete: function() {
                        b.mainScrubber_do.setX(-5e3)
                    }
                })
            }, this.showMainScrubberOnTop = function() {
                b.isMainScrubberOnTop_bl && (b.mainScrubber_do.setX(0), FWDAnimation.to(b.mainScrubber_do, .6, {
                    alpha: 1
                }))
            }, this.volumeOnMouseOverHandler = function() {
                b.showVolumeScrubber(!0), b.hideQualityButtons(!0), b.hideSubtitleButtons(!0), b.hidePlaybackRateButtons(!0), b.hideMainScrubberTop()
            }, this.volumeOnMouseUpHandler = function() {
                var e = b.lastVolume;
                b.isMbl ? b.isVolumeScrubberShowed_bl || b.volumeOnMouseOverHandler() : (b.isMute_bl ? (e = b.lastVolume, b.isMute_bl = !1) : (e = 1e-6, b.isMute_bl = !0), b.updateVolume(e))
            }, this.setupVolumeScrubber = function() {
                if (b.volumeScrubberHolder_do = new FWDUVPDisplayObject("div"), b.repeatBackground_bl) b.volumeBk_do = new FWDUVPDisplayObject("div"), b.volumeBk_do.getStyle().background = "url('" + b.controllerBkPath_str + "')";
                else {
                    b.volumeBk_do = new FWDUVPDisplayObject("img");
                    var e = new Image;
                    e.src = b.controllerBkPath_str, b.volumeBk_do.setScreen(e)
                }
                b.volumeScrubberHolder_do.addChild(b.volumeBk_do), b.volumeScrubber_do = new FWDUVPDisplayObject("div"), b.volumeScrubber_do.setHeight(b.mainScrbH), b.volumeScrubber_do.setY(parseInt(b.volumeScrubberOfsetHeight / 2));
                var t = new Image;
                t.src = p.volumeScrubberBkBottomPath_str, b.volumeScrubberBkBottom_do = new FWDUVPDisplayObject("img"), b.volumeScrubberBkBottom_do.setScreen(t), b.volumeScrubberBkBottom_do.setWidth(b.mainScrubberBkLeft_img.height), b.volumeScrubberBkBottom_do.setHeight(b.mainScrubberBkLeft_img.width), b.volumeScrubberBkBottom_do.setY(b.volumeScrubberHeight - b.volumeScrubberOfsetHeight - b.volumeScrubberBkBottom_do.h);
                var s = new Image;
                s.src = p.volumeScrubberBkTopPath_str, b.volumeScrubberBkTop_do = new FWDUVPDisplayObject("img"), b.volumeScrubberBkTop_do.setScreen(s), b.volumeScrubberBkTop_do.setWidth(b.volumeScrubberBkBottom_do.w), b.volumeScrubberBkTop_do.setHeight(b.volumeScrubberBkBottom_do.h);
                var o = new Image;
                o.src = p.volumeScrubberBkMiddlePath_str, b.isMbl ? (b.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("div"), b.volumeScrubberBkMiddle_do.getStyle().background = "url('" + b.volumeScrubberBkMiddlePath_str + "') repeat-y") : (b.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("img"), b.volumeScrubberBkMiddle_do.setScreen(o)), b.volumeScrubberBkMiddle_do.setWidth(b.volumeScrubberBkBottom_do.w), b.volumeScrubberBkMiddle_do.setHeight(b.volumeScrubberHeight - b.volumeScrubberOfsetHeight - 2 * b.volumeScrubberBkTop_do.h), b.volumeScrubberBkMiddle_do.setY(b.volumeScrubberBkTop_do.h), b.volumeScrubberDrag_do = new FWDUVPDisplayObject("div"), b.volumeScrubberDrag_do.setWidth(b.volumeScrubberBkBottom_do.w), b.useHEX ? (b.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("div"), b.volumeScrubberDragBottom_do.setWidth(b.volumeScrubberDragBottom_img.width), b.volumeScrubberDragBottom_do.setHeight(b.volumeScrubberDragBottom_img.height), b.volumeScrubberDragBottom_canvas = FWDUVPUtils.getCanvasWithModifiedColor(b.volumeScrubberDragBottom_img, b.nBC).canvas, b.volumeScrubberDragBottom_do.screen.appendChild(b.volumeScrubberDragBottom_canvas)) : (b.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("img"), b.volumeScrubberDragBottom_do.setScreen(b.volumeScrubberDragBottom_img)), b.volumeScrubberDragBottom_do.setWidth(b.mainScrubberDragLeft_img.height), b.volumeScrubberDragBottom_do.setHeight(b.mainScrubberDragLeft_img.width), b.volumeScrubberDragBottom_do.setY(b.volumeScrubberHeight - b.volumeScrubberOfsetHeight - b.volumeScrubberDragBottom_do.h), b.middleImage = new Image, b.middleImage.src = b.volumeScrubberDragMiddlePath_str, b.useHEX ? (b.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), b.middleImage.onload = function() {
                    b.volumeScrubberDragMiddle_canvas = FWDUVPUtils.getCanvasWithModifiedColor(b.middleImage, b.nBC, !0), b.volumeScrubberDragImage_img = b.volumeScrubberDragMiddle_canvas.image, b.volumeScrubberDragMiddle_do.getStyle().background = "url('" + b.volumeScrubberDragImage_img.src + "') repeat-y"
                }) : (b.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("img"), b.volumeScrubberDragMiddle_do.setScreen(b.middleImage)), b.volumeScrubberDragMiddle_do.setWidth(b.volumeScrubberDragBottom_do.w), b.volumeScrubberDragMiddle_do.setHeight(b.volumeScrubberHeight);
                var i = new Image;
                i.src = p.volumeScrubberLinePath_str, b.volumeScrubberBarLine_do = new FWDUVPDisplayObject("img"), b.volumeScrubberBarLine_do.setScreen(i), b.volumeScrubberBarLine_do.setWidth(b.mainScrubberLine_img.height), b.volumeScrubberBarLine_do.setHeight(b.mainScrubberLine_img.width), b.volumeScrubberBarLine_do.setAlpha(0), b.volumeScrubberBarLine_do.hasTransform3d_bl = !1, b.volumeScrubberBarLine_do.hasTransform2d_bl = !1, b.volumeScrubberHolder_do.setWidth(b.volScrbW), b.volumeScrubberHolder_do.setHeight(b.volumeScrubberHeight + b.sH), b.volumeBk_do.setWidth(b.volScrbW), b.volumeBk_do.setHeight(b.volumeScrubberHeight + b.sH), b.volumeScrubber_do.setWidth(b.volScrbW), b.volumeScrubber_do.setHeight(b.volumeScrubberHeight - b.volumeScrubberOfsetHeight), b.volumeScrubber_do.addChild(b.volumeScrubberBkBottom_do), b.volumeScrubber_do.addChild(b.volumeScrubberBkMiddle_do), b.volumeScrubber_do.addChild(b.volumeScrubberBkTop_do), b.volumeScrubber_do.addChild(b.volumeScrubberBarLine_do), b.volumeScrubber_do.addChild(b.volumeScrubberDragBottom_do), b.volumeScrubberDrag_do.addChild(b.volumeScrubberDragMiddle_do), b.volumeScrubber_do.addChild(b.volumeScrubberDrag_do), b.volumeScrubber_do.addChild(b.volumeScrubberBarLine_do), b.volumeScrubberHolder_do.addChild(b.volumeScrubber_do), b.addChild(b.volumeScrubberHolder_do), b.isMbl ? b.hasPointerEvent_bl ? (b.volumeScrubber_do.screen.addEventListener("pointerover", b.volumeScrubberOnOverHandler), b.volumeScrubber_do.screen.addEventListener("pointerout", b.volumeScrubberOnOutHandler), b.volumeScrubber_do.screen.addEventListener("pointerdown", b.volumeScrubberOnDownHandler)) : b.volumeScrubber_do.screen.addEventListener("touchstart", b.volumeScrubberOnDownHandler) : b.screen.addEventListener && (b.volumeScrubber_do.screen.addEventListener("mouseover", b.volumeScrubberOnOverHandler), b.volumeScrubber_do.screen.addEventListener("mouseout", b.volumeScrubberOnOutHandler), b.volumeScrubber_do.screen.addEventListener("mousedown", b.volumeScrubberOnDownHandler)), b.enableVolumeScrubber(), b.updateVolumeScrubber(b.volume)
            }, this.volumeScrubberOnOverHandler = function(e) {
                b.isVolumeScrubberDisabled_bl
            }, this.volumeScrubberOnOutHandler = function(e) {
                b.isVolumeScrubberDisabled_bl
            }, this.volumeScrubberOnDownHandler = function(e) {
                if (!b.isVolumeScrubberDisabled_bl && 2 != e.button) {
                    e.preventDefault && e.preventDefault(), b.volumeScrubberIsDragging_bl = !0;
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenY - b.volumeScrubber_do.getGlobalY();
                    m.showDisable(), t < 0 ? t = 0 : t > b.volumeScrubber_do.h - b.scrubbersOffsetWidth && (t = b.volumeScrubber_do.h - b.scrubbersOffsetWidth);
                    var s = 1 - t / b.volumeScrubber_do.h;
                    b.lastVolume = s, b.updateVolume(s), b.isMbl ? b.hasPointerEvent_bl ? (window.addEventListener("MSPointerMove", b.volumeScrubberMoveHandler), window.addEventListener("pointerup", b.volumeScrubberEndHandler)) : (window.addEventListener("touchmove", b.volumeScrubberMoveHandler), window.addEventListener("touchend", b.volumeScrubberEndHandler)) : window.addEventListener ? (window.addEventListener("mousemove", b.volumeScrubberMoveHandler), window.addEventListener("mouseup", b.volumeScrubberEndHandler)) : document.attachEvent && (document.attachEvent("onmousemove", b.volumeScrubberMoveHandler), document.attachEvent("onmouseup", b.volumeScrubberEndHandler))
                }
            }, this.volumeScrubberMoveHandler = function(e) {
                if (!b.isVolumeScrubberDisabled_bl) {
                    e.preventDefault && e.preventDefault();
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e).screenY - b.volumeScrubber_do.getGlobalY();
                    t < b.scrubbersOffsetWidth ? t = b.scrubbersOffsetWidth : t > b.volumeScrubber_do.h && (t = b.volumeScrubber_do.h);
                    var s = 1 - t / b.volumeScrubber_do.h;
                    b.lastVolume = s, b.updateVolume(s)
                }
            }, this.volumeScrubberEndHandler = function() {
                m.hideDisable(), b.volumeScrubberIsDragging_bl = !1, b.isMbl ? b.hasPointerEvent_bl ? (window.removeEventListener("MSPointerMove", b.volumeScrubberMoveHandler), window.removeEventListener("pointerup", b.volumeScrubberEndHandler)) : (window.removeEventListener("touchmove", b.volumeScrubberMoveHandler), window.removeEventListener("touchend", b.volumeScrubberEndHandler)) : window.removeEventListener ? (window.removeEventListener("mousemove", b.volumeScrubberMoveHandler), window.removeEventListener("mouseup", b.volumeScrubberEndHandler)) : document.detachEvent && (document.detachEvent("onmousemove", b.volumeScrubberMoveHandler), document.detachEvent("onmouseup", b.volumeScrubberEndHandler))
            }, this.disableVolumeScrubber = function() {
                b.isVolumeScrubberDisabled_bl = !0, b.volumeScrubber_do.setButtonMode(!1), b.volumeScrubberEndHandler()
            }, this.enableVolumeScrubber = function() {
                b.isVolumeScrubberDisabled_bl = !1, b.volumeScrubber_do.setButtonMode(!0)
            }, this.updateVolumeScrubber = function(e) {
                var t = b.volumeScrubberHeight - b.volumeScrubberOfsetHeight,
                    s = Math.round(e * t);
                b.volumeScrubberDrag_do.setHeight(Math.max(0, s - b.volumeScrubberDragBottom_do.h)), b.volumeScrubberDrag_do.setY(t - s), s < 1 && b.isVolumeScrubberLineVisible_bl ? (b.isVolumeScrubberLineVisible_bl = !1, FWDAnimation.to(b.volumeScrubberBarLine_do, .5, {
                    alpha: 0
                }), FWDAnimation.to(b.volumeScrubberDragBottom_do, .5, {
                    alpha: 0
                })) : 1 < s && !b.isVolumeScrubberLineVisible_bl && (b.isVolumeScrubberLineVisible_bl = !0, FWDAnimation.to(b.volumeScrubberBarLine_do, .5, {
                    alpha: 1
                }), FWDAnimation.to(b.volumeScrubberDragBottom_do, .5, {
                    alpha: 1
                })), t < s && (s = t), FWDAnimation.to(b.volumeScrubberBarLine_do, .8, {
                    y: t - s - 2,
                    ease: Expo.easeOut
                })
            }, this.updateVolume = function(e, t) {
                b.showVolumeScrubber_bl && (b.volume = e, b.volume <= 1e-6 ? (b.muted = !0, b.volume = 0) : 1 <= b.voume ? (b.muted = !1, b.volume = 1) : b.muted = !1, 0 == b.volume ? b.volBtn && b.volBtn.setDisabledState() : b.volBtn && b.volBtn.setEnabledState(), b.volumeScrubberBarLine_do && b.updateVolumeScrubber(b.volume), t || b.dispatchEvent(o.CHANGE_VOLUME, {
                    percent: b.volume
                }))
            }, this.showVolumeScrubber = function(e) {
                if (!b.isVolumeScrubberShowed_bl) {
                    b.isVolumeScrubberShowed_bl = !0;
                    var t = -b.volumeScrubberHolder_do.h + b.h;
                    b.volumeScrubberHolder_do.setVisible(!0), b.isMbl ? setTimeout(function() {
                        window.addEventListener("touchstart", b.hideVolumeSchubberOnMoveHandler)
                    }, 50) : window.addEventListener("mousemove", b.hideVolumeSchubberOnMoveHandler), b.volumeScrubberHolder_do.setX(parseInt(b.volBtn.x + (b.volBtn.w - b.volumeScrubberHolder_do.w) / 2)), e ? FWDAnimation.to(b.volumeScrubberHolder_do, .6, {
                        y: t,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(b.volumeScrubberHolder_do), b.volumeScrubberHolder_do.setY(t))
                }
            }, this.hideVolumeSchubberOnMoveHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                (FWDUVPUtils.hitTest(b.volumeScrubberHolder_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(b.volBtn.screen, t.screenX, t.screenY)) && !b.isMbl || FWDUVPUtils.hitTest(b.volumeScrubber_do.screen, t.screenX, t.screenY) && b.isMbl || b.volumeScrubberIsDragging_bl || (b.hideVolumeScrubber(!0), b.isMainScrubberOnTop_bl && (b.mainScrubber_do.setX(0), FWDAnimation.to(b.mainScrubber_do, .6, {
                    alpha: 1
                })))
            }, this.hideVolumeScrubber = function(e) {
                b.isVolumeScrubberShowed_bl && (b.isVolumeScrubberShowed_bl = !1, b.volBtn.setNormalState(!0), e ? FWDAnimation.to(b.volumeScrubberHolder_do, .6, {
                    y: m.sH,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        b.volumeScrubberHolder_do.setVisible(!1)
                    }
                }) : (FWDAnimation.killTweensOf(b.ytbButtonsHolder_do), b.volumeScrubberHolder_do.setY(m.sH), b.volumeScrubberHolder_do.setVisible(!1)), b.isMbl ? window.removeEventListener("touchstart", b.hideVolumeSchubberOnMoveHandler) : window.removeEventListener("mousemove", b.hideVolumeSchubberOnMoveHandler))
            }, this.show = function(e) {
                b.isShowed_bl || (b.isShowed_bl = !0, b.setX(0), e ? FWDAnimation.to(b.mainHld, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(b.mainHld), b.mainHld.setY(0)), setTimeout(b.positionButtons, 200))
            }, this.hide = function(e, t) {
                b.isShowed_bl && (t = t || 0, b.atb && b.atb.isShowed_bl && (t += b.h + 1), b.isMainScrubberOnTop_bl && b.atb && b.atb.isShowed_bl && (t += b.mainScrubberOffestTop), p.showScrubberWhenControllerIsHidden_bl || (t += b.mainScrubber_do.h - 14), b.isShowed_bl = !1, e ? FWDAnimation.to(b.mainHld, .8, {
                    y: b.sH + t,
                    ease: Expo.easeInOut,
                    onComplete: function() {}
                }) : (FWDAnimation.killTweensOf(b.mainHld), b.mainHld.setY(b.sH + t)), b.hideQualityButtons(!0), b.hideSubtitleButtons(!0), b.hidePlaybackRateButtons(!0))
            }, this.mainScrubberDragMiddleAddPath_str = p.mainScrubberDragMiddleAddPath_str, this.updateHexColorForScrubber = function(e) {
                if (e) b.mainScrubberDragMiddle_do.getStyle().background = "url('" + b.mainScrubberDragMiddleAddPath_str + "') repeat-x", b.mainScrubberDragLeft_do.screen.src = p.mainScrubberDragLeftAddPath_str;
                else if (b.useHEX && b.mainSCrubberMiddleCanvas) {
                    var t = FWDUVPUtils.changeCanvasHEXColor(b.mainScrubberMiddleImage, b.mainSCrubberMiddleCanvas, b.nBC, !0);
                    b.mainScrubberDragMiddle_do.getStyle().background = "url('" + t.src + "') repeat-x"
                } else b.mainScrubberDragMiddle_do.getStyle().background = "url('" + b.mainScrubberDragMiddlePath_str + "') repeat-x", b.mainScrubberDragLeft_do.screen.src = b.mainScrubberDragLeftSource
            }, b.updateHEXColors = function(e, t) {
                b.nBC = e, b.sBC = t
            }, this.init()
        };
        o.setPrototype = function() {
            o.prototype = new FWDUVPDisplayObject("div")
        }, o.UNCAST = "uncast", o.CAST = "cast", o.SHOW_SHARE_WINDOW = "showShareWindow", o.SHOW_SUBTITLE = "showSubtitle", o.HIDE_SUBTITLE = "hideSubtitle", o.SHOW_PLAYLIST = "showPlaylist", o.HIDE_PLAYLIST = "hidePlaylist", o.SHOW_CATEGORIES = "showCategories", o.DOWNLOAD_VIDEO = "downloadVideo", o.UNCAST = "uncast", o.REWIND = "rewind", o.FULL_SCREEN = "fullScreen", o.NORMAL_SCREEN = "normalScreen", o.PLAY = "play", o.PAUSE = "pause", o.START_TO_SCRUB = "startToScrub", o.SCRUB = "scrub", o.STOP_TO_SCRUB = "stopToScrub", o.CHANGE_VOLUME = "changeVolume", o.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality", o.SHOW_EMBED_WINDOW = "showEmbedWindow", o.SHOW_INFO_WINDOW = "showInfoWindow", o.CHANGE_SUBTITLE = "changeSubtitle", o.CHANGE_PLAYBACK_RATES = "changePlaybackRate", o.prototype = null, window.FWDUVPController = o
    }(), function(window) {
        var FWDUVPData = function(props, playListElement, prt) {
            var self = this,
                prototype = FWDUVPData.prototype;
            this.props_obj = props, this.skinPaths_ar = [], this.images_ar = [], this.cats_ar = [], this.catsRef_ar = [], this.controllerHeight = 0, this.countLoadedSkinImages = 0, this.volume = 1, this.controllerHideDelay = 0, this.startSpaceBetweenButtons = 0, this.spaceBetweenButtons = 0, this.scrubbersOffsetWidth = 0, this.volumeScrubberOffsetTopWidth = 0, this.timeOffsetLeftWidth = 0, this.timeOffsetTop = 0, this.logoMargins = 0, this.startAtPlaylist = 0, this.startAtVideo = 0, this.playlistBottomHeight = 0, this.maxPlaylistItems = 0, this.totalPlaylists = 0, this.thumbnailMaxWidth = 0, this.buttonsMargins = 0, this.nextAndPrevSetButtonsMargins = 0, this.thumbnailMaxHeight = 0, this.horizontalSpaceBetweenThumbnails = 0, this.verticalSpaceBetweenThumbnails = 0, this.buttonsToolTipHideDelay = 0, this.thumbnailWidth = 0, this.thumbnailHeight = 0, this.timeOffsetTop = 0, this.embedWindowCloseButtonMargins = 0, this.loadImageId_to, this.dispatchLoadSkinCompleteWithDelayId_to, this.dispatchPlaylistLoadCompleteWidthDelayId_to, this.JSONPRequestTimeoutId_to, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, self.init = function() {
                self.parseProperties()
            }, self.parseProperties = function() {
                if (self.useHEX = self.props_obj.useHEXColorsForSkin, self.useHEX = "yes" == self.useHEX, -1 != location.protocol.indexOf("file:") && (self.useHEX = !1), self.categoriesId_str = self.props_obj.playlistsId, self.categoriesId_str)
                    if (self.mainFolderPath_str = self.props_obj.mainFolderPath, self.mainFolderPath_str)
                        if (self.mainFolderPath_str.lastIndexOf("/") + 1 != self.mainFolderPath_str.length && (self.mainFolderPath_str += "/"), self.sknPth = self.props_obj.skinPath, self.sknPth)
                            if (self.sknPth.lastIndexOf("/") + 1 != self.sknPth.length && (self.sknPth += "/"), self.sknPth = self.mainFolderPath_str + self.sknPth, self.flashPath_str = self.mainFolderPath_str + "flashlsChromeless.swf", self.flashCopyToCBPath_str = self.mainFolderPath_str + "cb.swf", self.proxyPath_str = self.mainFolderPath_str + "proxy.php", self.proxyFolderPath_str = self.mainFolderPath_str + "proxyFolder.php", self.mailPath_str = self.mainFolderPath_str + "sendMail.php", self.sendToAFriendPath_str = self.mainFolderPath_str + "sendMailToAFriend.php", self.videoDownloaderPath_str = self.mainFolderPath_str + "downloader.php", self.handPath_str = self.sknPth + "hand.cur", self.grabPath_str = self.sknPth + "grab.cur", -1 != self.sknPth.indexOf("white") && (self.isWhite = !0), self.categories_el = document.getElementById(self.categoriesId_str), self.categories_el) {
                                var e = FWDUVPUtils.getChildren(self.categories_el);
                                if (self.totalCats = e.length, 0 != self.totalCats) {
                                    for (var t = 0; t < self.totalCats; t++) {
                                        var s = {},
                                            o = null;
                                        if (child = e[t], !FWDUVPUtils.hasAttribute(child, "data-source")) return void setTimeout(function() {
                                            null != self && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                                text: "Attribute <font color='#ff0000'>data-source</font> is required in the plalists html element at position <font color='#ff0000'>" + (t + 1)
                                            })
                                        }, 50);
                                        if (!FWDUVPUtils.hasAttribute(child, "data-thumbnail-path")) return void setTimeout(function() {
                                            null != self && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                                text: "Attribute <font color='#ff0000'>data-thumbnail-path</font> is required in the playlists html element at position <font color='#ff0000'>" + (t + 1)
                                            })
                                        }, 50);
                                        s.source = FWDUVPUtils.getAttributeValue(child, "data-source"), o = -1 == s.source.indexOf("=") && -1 == s.source.indexOf(".xml") && -1 == s.source.indexOf("vimeo.com") && -1 == s.source.indexOf("youtube.") ? document.getElementById(s.source) : s.source, self.catsRef_ar.push(o), s.thumbnailPath = FWDUVPUtils.getAttributeValue(child, "data-thumbnail-path"), s.htmlContent = child.innerHTML, s.htmlText_str = child.innerText, s.vimeoUserId = FWDUVPUtils.getAttributeValue(child, "data-user-id"), s.clientId = FWDUVPUtils.getAttributeValue(child, "data-client-id"), s.vimeoSecret = FWDUVPUtils.getAttributeValue(child, "data-vimeo-secret"), s.vimeoToken = FWDUVPUtils.getAttributeValue(child, "data-vimeo-token"), FWDUVPUtils.hasAttribute(child, "data-playlist-name") ? s.playlistName = FWDUVPUtils.getAttributeValue(child, "data-playlist-name") : s.playlistName = "not defined!", s.pass = FWDUVPUtils.getAttributeValue(child, "data-password"), self.cats_ar[t] = s
                                    }
                                    for (t = 0; t < self.totalCats; t++) {
                                        s = {}, o = null;
                                        child = e[t], o = document.getElementById(FWDUVPUtils.getAttributeValue(child, "data-source"))
                                    }
                                    self.startAtPlaylist = self.props_obj.startAtPlaylist || 0, isNaN(self.startAtPlaylist) && (self.startAtPlaylist = 0), self.startAtPlaylist < 0 ? self.startAtPlaylist = 0 : self.startAtPlaylist > self.totalCats - 1 && (self.startAtPlaylist = self.totalCats - 1), self.playlistBottomHeight = self.props_obj.playlistBottomHeight || 0, self.playlistBottomHeight = Math.min(800, self.playlistBottomHeight), self.subtitlesOffLabel_str = self.props_obj.subtitlesOffLabel || "Subtitle off", self.videoSourcePath_str = self.props_obj.videoSourcePath || void 0, self.timeColor_str = self.props_obj.timeColor || "#FF0000", self.youtubeQualityButtonNormalColor_str = self.props_obj.youtubeQualityButtonNormalColor || "#FF0000", self.youtubeQualityButtonSelectedColor_str = self.props_obj.youtubeQualityButtonSelectedColor || "#FF0000", self.posterBackgroundColor_str = self.props_obj.posterBackgroundColor || "transparent", self.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist, self.showPlaylistButtonAndPlaylist_bl = "no" != self.showPlaylistButtonAndPlaylist_bl, self.useResumeOnPlay_bl = self.props_obj.useResumeOnPlay, self.useResumeOnPlay_bl = "yes" == self.useResumeOnPlay_bl, self.useResumeOnPlay_bl = self.props_obj.useResumeOnPlay, self.useResumeOnPlay_bl = "yes" == self.useResumeOnPlay_bl, self.showPlaylistOnFullScreen = self.props_obj.showPlaylistOnFullScreen, self.showPlaylistOnFullScreen = "yes" == self.showPlaylistOnFullScreen, self.stopAfterLastVideoHasPlayed_bl = self.props_obj.stopAfterLastVideoHasPlayed, self.stopAfterLastVideoHasPlayed_bl = "yes" == self.stopAfterLastVideoHasPlayed_bl, self.usePlaylistsSelectBox_bl = self.props_obj.usePlaylistsSelectBox, self.usePlaylistsSelectBox_bl = "yes" == self.usePlaylistsSelectBox_bl, self.executeCuepointsOnlyOnce_bl = self.props_obj.executeCuepointsOnlyOnce, self.executeCuepointsOnlyOnce_bl = "yes" == self.executeCuepointsOnlyOnce_bl, self.showPlaylistByDefault_bl = self.props_obj.showPlaylistByDefault, self.showPlaylistByDefault_bl = "no" != self.showPlaylistByDefault_bl, self.showThumbnail_bl = self.props_obj.showThumbnail, self.showThumbnail_bl = "no" != self.showThumbnail_bl, self.playAfterVideoStop_bl = self.props_obj.playAfterVideoStop, self.playAfterVideoStop_bl = "no" != self.playAfterVideoStop_bl, self.openerAlignment_str = self.props_obj.openerAlignment, self.openerEqulizerOffsetTop = self.props_obj.openerEqulizerOffsetTop || 0, self.openerEqulizerOffsetLeft = self.props_obj.openerEqulizerOffsetLeft || 0, self.showOpener_bl = self.props_obj.showOpener, self.showOpener_bl = "yes" == self.showOpener_bl, self.stickyOnScrollShowOpener_bl = self.props_obj.stickyOnScrollShowOpener, self.stickyOnScrollShowOpener_bl = "yes" == self.stickyOnScrollShowOpener_bl, self.showOpenerPlayPauseButton_bl = self.props_obj.showOpenerPlayPauseButton, self.showOpenerPlayPauseButton_bl = "yes" == self.showOpenerPlayPauseButton_bl, self.animate_bl = self.props_obj.animatePlayer, self.animate_bl = "yes" == self.animate_bl, self.showChromecastButton_bl = self.props_obj.showChromecastButton, self.showChromecastButton_bl = "yes" == self.showChromecastButton_bl, FWDUVPUtils.isChrome && !FWDUVPUtils.isLocal && -1 != location.href.indexOf("https:") || (self.showChromecastButton_bl = !1), self.showAnnotationsPositionTool_bl = self.props_obj.showAnnotationsPositionTool, self.showAnnotationsPositionTool_bl = "yes" == self.showAnnotationsPositionTool_bl, self.showAnnotationsPositionTool_bl && (self.showPlaylistByDefault_bl = !1), self.showPlaylistName_bl = self.props_obj.showPlaylistName, self.showPlaylistName_bl = "no" != self.showPlaylistName_bl, self.showSearchInpt = self.props_obj.showSearchInput, self.showSearchInpt = "no" != self.showSearchInpt, self.showSubByDflt = self.props_obj.showSubtitleByDefault, self.showSubByDflt = "no" != self.showSubByDflt, self.showSubBtn = self.props_obj.showSubtitleButton, self.showSubBtn = "no" != self.showSubBtn, self.forceDisableDownloadButtonForFolder_bl = self.props_obj.forceDisableDownloadButtonForFolder, self.forceDisableDownloadButtonForFolder_bl = "yes" == self.forceDisableDownloadButtonForFolder_bl, self.nBC = self.props_obj.normalHEXButtonsColor || "#FFFFFF", -1 != self.sknPth.indexOf("dark") ? self.sBC = "#FFFFFF" : self.sBC = "#000000", self.playlistPosition_str = self.props_obj.playlistPosition || "bottom", test = "bottom" == self.playlistPosition_str || "right" == self.playlistPosition_str, test || (self.playlistPosition_str = "right"), self.folderVideoLabel_str = self.props_obj.folderVideoLabel || "Video ", self.logoPosition_str = self.props_obj.logoPosition || "topleft", self.logoPosition_str = String(self.logoPosition_str).toLowerCase(), test = "topleft" == self.logoPosition_str || "topright" == self.logoPosition_str || "bottomleft" == self.logoPosition_str || "bottomright" == self.logoPosition_str, test || (self.logoPosition_str = "topleft"), self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity", "blackAndWhite" != self.thumbnailSelectedType_str && "threshold" != self.thumbnailSelectedType_str && "opacity" != self.thumbnailSelectedType_str && (self.thumbnailSelectedType_str = "opacity"), (self.isMbl || FWDUVPUtils.isIEAndLessThen9) && (self.thumbnailSelectedType_str = "opacity"), "file:" == document.location.protocol && (self.thumbnailSelectedType_str = "opacity"), self.adsButtonsPosition_str = self.props_obj.adsButtonsPosition || "left", self.adsButtonsPosition_str = String(self.adsButtonsPosition_str).toLowerCase(), test = "left" == self.adsButtonsPosition_str || "right" == self.adsButtonsPosition_str, test || (self.adsButtonsPosition_str = "left"), self.skipToVideoButtonText_str = self.props_obj.skipToVideoButtonText || "not defined", self.skipToVideoText_str = self.props_obj.skipToVideoText, self.adsTextNormalColor = self.props_obj.adsTextNormalColor || "#FF0000", self.adsTextSelectedColor = self.props_obj.adsTextSelectedColor || "#FF0000", self.adsBorderNormalColor_str = self.props_obj.adsBorderNormalColor || "#FF0000", self.adsBorderSelectedColor_str = self.props_obj.adsBorderSelectedColor || "#FF0000", self.volume = self.props_obj.volume, null == self.volume && (self.volume = 1), isNaN(self.volume) && (volume = 1), 1 < self.volume ? self.volume = 1 : self.volume <= 0 && (self.volume = 0), self.buttonsToolTipFontColor_str = self.props_obj.buttonsToolTipFontColor || "#FF0000", self.toolTipsButtonFontColor_str = self.props_obj.toolTipsButtonFontColor || "#FF0000", self.shareAndEmbedTextColor_str = self.props_obj.shareAndEmbedTextColor || "#FF0000", self.inputBackgroundColor_str = self.props_obj.inputBackgroundColor || "#FF0000", self.inputColor_str = self.props_obj.inputColor || "#FF0000", self.searchInputBackgroundColor_str = self.props_obj.searchInputBackgroundColor || "#FF0000", self.borderColor_str = self.props_obj.borderColor || "#FF0000", self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000", self.youtubeAndFolderVideoTitleColor_str = self.props_obj.youtubeAndFolderVideoTitleColor || "#FF0000", self.folderAudioSecondTitleColor_str = self.props_obj.folderAudioSecondTitleColor || "#666666", self.youtubeDescriptionColor_str = self.props_obj.youtubeDescriptionColor || "#FF0000", self.youtubeOwnerColor_str = self.props_obj.youtubeOwnerColor || "#FF0000", self.secondaryLabelsColor_str = self.props_obj.secondaryLabelsColor || "#FF0000", self.mainLabelsColor_str = self.props_obj.mainLabelsColor || "#FF0000", self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "#FF0000", self.thumbnailNormalBackgroundColor_str = self.props_obj.thumbnailNormalBackgroundColor || "#FF0000", self.playlistNameColor_str = self.props_obj.playlistNameColor || "#FF0000", self.thumbnailHoverBackgroundColor_str = self.props_obj.thumbnailHoverBackgroundColor || "#FF0000", self.thumbnailDisabledBackgroundColor_str = self.props_obj.thumbnailDisabledBackgroundColor || "#FF0000", self.mainSelectorBackgroundSelectedColor = self.props_obj.mainSelectorBackgroundSelectedColor || "#FFFFFF", self.mainSelectorTextNormalColor = self.props_obj.mainSelectorTextNormalColor || "#FFFFFF", self.mainSelectorTextSelectedColor = self.props_obj.mainSelectorTextSelectedColor || "#000000", self.mainButtonBackgroundNormalColor = self.props_obj.mainButtonBackgroundNormalColor || "#212021", self.mainButtonBackgroundSelectedColor = self.props_obj.mainButtonBackgroundSelectedColor || "#FFFFFF", self.mainButtonTextNormalColor = self.props_obj.mainButtonTextNormalColor || "#FFFFFF", self.mainButtonTextSelectedColor = self.props_obj.mainButtonTextSelectedColor || "#000000", self.logoLink_str = self.props_obj.logoLink || "none", self.startAtVideo = parseInt(self.props_obj.startAtVideo) || 0, self.audioVisualizerLinesColor_str = self.props_obj.audioVisualizerLinesColor || "#0099FF", self.audioVisualizerCircleColor_str = self.props_obj.audioVisualizerCircleColor || "#FFFFFF", self.privateVideoPassword_str = self.props_obj.privateVideoPassword, self.youtubeAPIKey = self.props_obj.youtubeAPIKey || "AIzaSyD6LNmbZVbixO1s4ZzQV8odsDZsO2NUsl4", self.contextMenuBackgroundColor_str = self.props_obj.contextMenuBackgroundColor || "#000000", self.contextMenuBorderColor_str = self.props_obj.contextMenuBorderColor || "#FF0000", self.contextMenuSpacerColor_str = self.props_obj.contextMenuSpacerColor || "#FF0000", self.contextMenuItemNormalColor_str = self.props_obj.contextMenuItemNormalColor || "#FF0000", self.contextMenuItemSelectedColor_str = self.props_obj.contextMenuItemSelectedColor || "#FF0000", self.contextMenuItemDisabledColor_str = self.props_obj.contextMenuItemDisabledColor || "#FF0000", self.showScriptDeveloper_bl = self.props_obj.showScriptDeveloper, self.showScriptDeveloper_bl = "yes" == self.showScriptDeveloper_bl, self.showContextmenu_bl = self.props_obj.showContextmenu, self.showContextmenu_bl = "no" != self.showContextmenu_bl, self.nextAndPrevSetButtonsMargins = self.props_obj.nextAndPrevSetButtonsMargins || 0, self.buttonsMargins = self.props_obj.buttonsMargins || 0, self.thumbnailMaxWidth = self.props_obj.thumbnailMaxWidth || 330, self.thumbnailMaxHeight = self.props_obj.thumbnailMaxHeight || 330, self.horizontalSpaceBetweenThumbnails = self.props_obj.horizontalSpaceBetweenThumbnails, self.verticalSpaceBetweenThumbnails = self.props_obj.verticalSpaceBetweenThumbnails, self.totalPlaylists = self.cats_ar.length, self.controllerHeight = self.props_obj.controllerHeight || 50, self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0, self.controllerHideDelay = self.props_obj.controllerHideDelay || 2, self.controllerHideDelay *= 1e3, self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0, self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0, self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0, self.volumeScrubberOffsetTopWidth = self.props_obj.volumeScrubberOffsetTopWidth || 0, self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0, self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0, self.timeOffsetTop = self.props_obj.timeOffsetTop || 0, self.embedWindowCloseButtonMargins = self.props_obj.embedAndInfoWindowCloseButtonMargins || 0, self.logoMargins = self.props_obj.logoMargins || 0, self.maxPlaylistItems = self.props_obj.maxPlaylistItems || 50, self.volumeScrubberHeight = self.props_obj.volumeScrubberHeight || 10, self.volumeScrubberOfsetHeight = self.props_obj.volumeScrubberOfsetHeight || 0, 200 < self.volumeScrubberHeight && (self.volumeScrubberHeight = 200), self.buttonsToolTipHideDelay = self.props_obj.buttonsToolTipHideDelay || 1.5, self.thumbnailWidth = self.props_obj.thumbnailWidth || 80, self.thumbnailWidth = Math.min(150, self.thumbnailWidth), self.thumbnailHeight = self.props_obj.thumbnailHeight || 80, self.spaceBetweenThumbnails = self.props_obj.spaceBetweenThumbnails || 0, self.thumbnailHeight = Math.min(150, self.thumbnailHeight), self.timeOffsetTop = self.props_obj.timeOffsetTop || 0, self.scrollbarOffestWidth = self.props_obj.scrollbarOffestWidth || 0, self.scollbarSpeedSensitivity = self.props_obj.scollbarSpeedSensitivity || .5, self.facebookAppId_str = self.props_obj.facebookAppId, self.aopwBorderSize = self.props_obj.aopwBorderSize || 0, self.aopwTitle = self.props_obj.aopwTitle || "Advertisement", self.aopwTitleColor_str = self.props_obj.aopwTitleColor || "#FFFFFF", self.aopwWidth = self.props_obj.aopwWidth || 200, self.aopwHeight = self.props_obj.aopwHeight || 200, self.fillEntireVideoScreen_bl = self.props_obj.fillEntireVideoScreen, self.fillEntireVideoScreen_bl = "yes" == self.fillEntireVideoScreen_bl, self.fillEntireposterScreen_bl = self.props_obj.fillEntireposterScreen, self.fillEntireposterScreen_bl = "yes" == self.fillEntireposterScreen_bl, self.goFullScreenOnPlay_bl = self.props_obj.goFullScreenOnButtonPlay, self.goFullScreenOnPlay_bl = "yes" == self.goFullScreenOnPlay_bl, self.showContextMenu_bl = self.props_obj.showContextMenu, self.showContextMenu_bl = "no" != self.showContextMenu_bl, self.showController_bl = self.props_obj.showController, self.showController_bl = "no" != self.showController_bl, self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTips, self.showButtonsToolTip_bl = "no" != self.showButtonsToolTip_bl, self.isMbl && (self.showButtonsToolTip_bl = !1), self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport, self.addKeyboardSupport_bl = "no" != self.addKeyboardSupport_bl, self.playsinline = "yes" == self.props_obj.playsinline, self.useAToB = "yes" == self.props_obj.useAToB, self.atbTimeBackgroundColor = self.props_obj.atbTimeBackgroundColor || "transparent", self.atbTimeTextColorNormal = self.props_obj.atbTimeTextColorNormal || "#888888", self.atbTimeTextColorSelected = self.props_obj.atbTimeTextColorSelected || "#FFFFFF", self.atbButtonTextNormalColor = self.props_obj.atbButtonTextNormalColor || "#888888", self.atbButtonTextSelectedColor = self.props_obj.atbButtonTextSelectedColor || "#FFFFFF", self.atbButtonBackgroundNormalColor = self.props_obj.atbButtonBackgroundNormalColor || "#FFFFFF", self.atbButtonBackgroundSelectedColor = self.props_obj.atbButtonBackgroundSelectedColor || "#000000", self.addMouseWheelSupport_bl = self.props_obj.addMouseWheelSupport, self.addMouseWheelSupport_bl = "no" != self.addMouseWheelSupport_bl, self.addScrOnMM_bl = self.props_obj.addScrollOnMouseMove, self.addScrOnMM_bl = "yes" == self.addScrOnMM_bl, self.showPlaylistsSearchInput_bl = self.props_obj.showPlaylistsSearchInput, self.showPlaylistsSearchInput_bl = "yes" == self.showPlaylistsSearchInput_bl, self.scrubbersToolTipLabelBackgroundColor = self.props_obj.scrubbersToolTipLabelBackgroundColor || "#FFFFFF", self.scrubbersToolTipLabelFontColor = self.props_obj.scrubbersToolTipLabelFontColor || "#000000", self.autoPlay_bl = self.props_obj.autoPlay, self.autoPlay_bl = "yes" == self.autoPlay_bl, FWDUVPUtils.isMobile && (self.autoPlay_bl = !1), self.aom_bl = self.props_obj.enableAutoplayOnMobile, self.aom_bl = "yes" == self.aom_bl, self.isMbl || (self.aom_bl = !1), self.autoPlay_bl && FWDUVPUtils.isFirefox && (self.aom_bl = !0), self.showNextAndPrevButtons_bl = self.props_obj.showNextAndPrevButtons, self.showNextAndPrevButtons_bl = "no" != self.showNextAndPrevButtons_bl, self.showPlaylistsButtonAndPlaylists_bl = self.props_obj.showPlaylistsButtonAndPlaylists, self.showPlaylistsButtonAndPlaylists_bl = "no" != self.showPlaylistsButtonAndPlaylists_bl, self.showEmbedButton_bl = self.props_obj.showEmbedButton, self.showEmbedButton_bl = "no" != self.showEmbedButton_bl, self.showScrubberWhenControllerIsHidden_bl = self.props_obj.showScrubberWhenControllerIsHidden, self.showScrubberWhenControllerIsHidden_bl = "no" != self.showScrubberWhenControllerIsHidden_bl, self.showMainScrubberToolTipLabel_bl = self.props_obj.showMainScrubberToolTipLabel, self.showMainScrubberToolTipLabel_bl = "yes" == self.showMainScrubberToolTipLabel_bl, self.showPlaylistsByDefault_bl = self.props_obj.showPlaylistsByDefault, self.showPlaylistsByDefault_bl = "yes" == self.showPlaylistsByDefault_bl, self.loop_bl = self.props_obj.loop, self.loop_bl = "yes" == self.loop_bl, self.shuffle_bl = self.props_obj.shuffle, self.shuffle_bl = "yes" == self.shuffle_bl, self.showLoopButton_bl = self.props_obj.showLoopButton, self.showLoopButton_bl = "no" != self.props_obj.showLoopButton, self.showShuffleButton_bl = self.props_obj.showShuffleButton, self.showShuffleButton_bl = "no" != self.props_obj.showShuffleButton, self.showDownloadVideoButton_bl = self.props_obj.showDownloadButton, self.showDownloadVideoButton_bl = "no" != self.showDownloadVideoButton_bl, self.randomizePlaylist_bl = self.props_obj.randomizePlaylist, self.randomizePlaylist_bl = "yes" == self.randomizePlaylist_bl, self.showDefaultControllerForVimeo_bl = self.props_obj.showDefaultControllerForVimeo, self.showDefaultControllerForVimeo_bl = "yes" == self.showDefaultControllerForVimeo_bl, self.showInfoButton_bl = self.props_obj.showInfoButton, self.showInfoButton_bl = "no" != self.showInfoButton_bl, self.showLogo_bl = self.props_obj.showLogo, self.showLogo_bl = "yes" == self.showLogo_bl, self.hideLogoWithController_bl = self.props_obj.hideLogoWithController, self.hideLogoWithController_bl = "yes" == self.hideLogoWithController_bl, self.showPoster_bl = self.props_obj.showPoster, self.showPoster_bl = "yes" == self.showPoster_bl, self.useVectorIcons_bl = self.props_obj.useVectorIcons, self.useVectorIcons_bl = "yes" == self.useVectorIcons_bl, self.showVolumeButton_bl = self.props_obj.showVolumeButton, self.showVolumeButton_bl = "no" != self.showVolumeButton_bl, self.showVolumeScrubber_bl = self.showVolumeButton_bl, self.showControllerWhenVideoIsStopped_bl = self.props_obj.showControllerWhenVideoIsStopped, self.showControllerWhenVideoIsStopped_bl = "yes" == self.showControllerWhenVideoIsStopped_bl, self.showNextAndPrevButtonsInController_bl = self.props_obj.showNextAndPrevButtonsInController, self.showNextAndPrevButtonsInController_bl = "yes" == self.showNextAndPrevButtonsInController_bl, self.showTime_bl = self.props_obj.showTime, self.showTime_bl = "no" != self.showTime_bl, self.shwPpoppAdClsBtn = self.props_obj.showPopupAdsCloseButton, self.shwPpoppAdClsBtn = "no" != self.shwPpoppAdClsBtn, self.showFullScreenButton_bl = self.props_obj.showFullScreenButton, self.showFullScreenButton_bl = "no" != self.showFullScreenButton_bl, self.showRewindButton_bl = self.props_obj.showRewindButton, self.showRewindButton_bl = "no" != self.showRewindButton_bl, self.disableVideoScrubber_bl = self.props_obj.disableVideoScrubber, self.disableVideoScrubber_bl = "yes" == self.disableVideoScrubber_bl, self.showPlaybackRateButton_bl = self.props_obj.showPlaybackRateButton, self.showPlaybackRateButton_bl = "yes" == self.showPlaybackRateButton_bl, self.defaultPlaybackRate_str = self.props_obj.defaultPlaybackRate, null == self.defaultPlaybackRate_str && (self.defaultPlaybackRate_str = 1), self.defaultPlaybackRate_ar = ["0.25", "0.5", "1", "1.25", "1.5", "2"], self.defaultPlaybackRate_ar.reverse();
                                    var i = !1;
                                    for (t = 0; t < self.defaultPlaybackRate_ar.length; t++) self.defaultPlaybackRate_ar[t] == self.defaultPlaybackRate_str && (i = !0, self.startAtPlaybackIndex = t);
                                    if (i || (self.startAtPlaybackIndex = 3, self.defaultPlaybackRate_str = self.defaultPlaybackRate_ar[self.startAtPlaybackIndex]), self.showFullScreenButton_bl = self.props_obj.showFullScreenButton, self.showFullScreenButton_bl = "no" != self.showFullScreenButton_bl, self.repeatBackground_bl = self.props_obj.repeatBackground, self.repeatBackground_bl = "no" != self.repeatBackground_bl, self.playVideoOnlyWhenLoggedIn_bl = self.props_obj.playVideoOnlyWhenLoggedIn, self.playVideoOnlyWhenLoggedIn_bl = "yes" == self.playVideoOnlyWhenLoggedIn_bl, self.isLoggedIn_bl = self.props_obj.isLoggedIn, self.isLoggedIn_bl = "yes" == self.isLoggedIn_bl, self.loggedInMessage_str = self.props_obj.loggedInMessage || "Only loggedin users can view this video", self.showShareButton_bl = self.props_obj.showShareButton, self.showShareButton_bl = "no" != self.showShareButton_bl, self.openNewPageAtTheEndOfTheAds_bl = self.props_obj.openNewPageAtTheEndOfTheAds, self.openNewPageAtTheEndOfTheAds_bl = "yes" == self.openNewPageAtTheEndOfTheAds_bl, self.playAdsOnlyOnce_bl = self.props_obj.playAdsOnlyOnce, self.playAdsOnlyOnce_bl = "yes" == self.playAdsOnlyOnce_bl, self.startAtRandomVideo_bl = self.props_obj.startAtRandomVideo, self.startAtRandomVideo_bl = "yes" == self.startAtRandomVideo_bl, self.stopVideoWhenPlayComplete_bl = self.props_obj.stopVideoWhenPlayComplete, self.stopVideoWhenPlayComplete_bl = "yes" == self.stopVideoWhenPlayComplete_bl, self.closeLightBoxWhenPlayComplete = self.props_obj.closeLightBoxWhenPlayComplete, self.closeLightBoxWhenPlayComplete = "yes" == self.closeLightBoxWhenPlayComplete, self.showYoutubeQualityButton_bl = self.props_obj.showQualityButton, self.showYoutubeQualityButton_bl = "no" != self.showYoutubeQualityButton_bl, self.thumbnailsPreviewWidth = self.props_obj.thumbnailsPreviewWidth || 300, self.thumbnailsPreviewHeight = self.props_obj.thumbnailsPreviewHeight || 168, self.thumbnailsPreviewBackgroundColor = self.props_obj.thumbnailsPreviewBackgroundColor || "#000", self.thumbnailsPreviewBorderColor = self.props_obj.thumbnailsPreviewBorderColor || "#333", self.thumbnailsPreviewLabelBackgroundColor = self.props_obj.thumbnailsPreviewLabelBackgroundColor || "#FFF", self.thumbnailsPreviewLabelFontColor = self.props_obj.thumbnailsPreviewLabelFontColor || "#000", self.arrowN_str = self.sknPth + "combobox-arrow-normal.png", self.arrowS_str = self.sknPth + "combobox-arrow-selected.png", self.hlsPath_str = self.mainFolderPath_str + "java/hls.js", self.dashPath_str = self.mainFolderPath_str + "java/dash.all.min.js", self.threeJsPath_str = self.mainFolderPath_str + "java/three.js", self.threeJsControlsPath_str = self.mainFolderPath_str + "java/threeControled.js", self.logoPath_str = self.sknPth + "logo.png", self.adLinePat_str = self.sknPth + "ad-line.png", self.props_obj.logoPath && (self.logoPath_str = self.props_obj.logoPath), self.mainScrubberDragLeftAddPath_str = self.sknPth + "scrubber-left-drag-add.png", self.mainScrubberDragMiddleAddPath_str = self.sknPth + "scrubber-middle-drag-add.png", self.mainPreloader_img = new Image, self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler, self.mainPreloader_img.onload = self.onPreloaderLoadHandler, self.mainPreloader_img.src = self.sknPth + "preloader.jpg", self.hdIcn = self.sknPth + "hd.png", self.skinPaths_ar = [{
                                            img: self.skipIconPath_img = new Image,
                                            src: self.sknPth + "skip-icon.png"
                                        }, {
                                            img: self.mainScrubberBkLeft_img = new Image,
                                            src: self.sknPth + "scrubber-left-background.png"
                                        }, {
                                            img: self.mainScrubberDragLeft_img = new Image,
                                            src: self.sknPth + "scrubber-left-drag.png"
                                        }, {
                                            img: self.mainScrubberLine_img = new Image,
                                            src: self.sknPth + "scrubber-line.png"
                                        }, {
                                            img: self.progressLeft_img = new Image,
                                            src: self.sknPth + "progress-left.png"
                                        }, {
                                            img: self.volumeScrubberDragBottom_img = new Image,
                                            src: self.sknPth + "volume-scrubber-bottom-drag.png"
                                        }, {
                                            img: self.popwColseN_img = new Image,
                                            src: self.sknPth + "popw-close-button.png"
                                        }, {
                                            img: self.embedColoseN_img = new Image,
                                            src: self.sknPth + "embed-close-button.png"
                                        }], self.useVectorIcons_bl || (self.skinPaths_ar.push({
                                            img: self.prevN_img = new Image,
                                            src: self.sknPth + "prev-video.png"
                                        }, {
                                            img: self.nextN_img = new Image,
                                            src: self.sknPth + "next-video.png"
                                        }, {
                                            img: self.playN_img = new Image,
                                            src: self.sknPth + "play.png"
                                        }, {
                                            img: self.pauseN_img = new Image,
                                            src: self.sknPth + "pause.png"
                                        }, {
                                            img: self.volumeN_img = new Image,
                                            src: self.sknPth + "volume.png"
                                        }, {
                                            img: self.largePlayN_img = new Image,
                                            src: self.sknPth + "large-play.png"
                                        }, {
                                            img: self.categoriesN_img = new Image,
                                            src: self.sknPth + "categories-button.png"
                                        }, {
                                            img: self.replayN_img = new Image,
                                            src: self.sknPth + "replay-button.png"
                                        }, {
                                            img: self.shuffleN_img = new Image,
                                            src: self.sknPth + "shuffle-button.png"
                                        }, {
                                            img: self.fullScreenN_img = new Image,
                                            src: self.sknPth + "full-screen.png"
                                        }, {
                                            img: self.ytbQualityN_img = new Image,
                                            src: self.sknPth + "youtube-quality.png"
                                        }, {
                                            img: self.shareN_img = new Image,
                                            src: self.sknPth + "share.png"
                                        }, {
                                            img: self.facebookN_img = new Image,
                                            src: self.sknPth + "repost.png"
                                        }, {
                                            img: self.infoN_img = new Image,
                                            src: self.sknPth + "info-button.png"
                                        }, {
                                            img: self.downloadN_img = new Image,
                                            src: self.sknPth + "download-button.png"
                                        }, {
                                            img: self.normalScreenN_img = new Image,
                                            src: self.sknPth + "normal-screen.png"
                                        }, {
                                            img: self.embedN_img = new Image,
                                            src: self.sknPth + "embed.png"
                                        }, {
                                            img: self.passColoseN_img = new Image,
                                            src: self.sknPth + "embed-close-button.png"
                                        }, {
                                            img: self.showSubtitleNPath_img = new Image,
                                            src: self.sknPth + "show-subtitle-icon.png"
                                        }, {
                                            img: self.hideSubtitleNPath_img = new Image,
                                            src: self.sknPth + "hide-subtitle-icon.png"
                                        }, {
                                            img: self.playbackRateNPath_img = new Image,
                                            src: self.sknPth + "playback-rate-normal.png"
                                        }), self.useAToB && self.skinPaths_ar.push({
                                            img: self.atbNPath_img = new Image,
                                            src: self.sknPth + "a-to-b-button.png"
                                        })), (self.showOpener_bl && prt.displayType == FWDUVPlayer.STICKY || self.stickyOnScrollShowOpener_bl && prt.stickyOnScroll) && (self.skinPaths_ar.push({
                                            img: self.openerPauseN_img = new Image,
                                            src: self.sknPth + "open-pause-button-normal.png"
                                        }, {
                                            img: self.openerPlayN_img = new Image,
                                            src: self.sknPth + "open-play-button-normal.png"
                                        }, {
                                            img: self.animationPath_img = new Image,
                                            src: self.sknPth + "equalizer.png"
                                        }, {
                                            img: self.closeN_img = new Image,
                                            src: self.sknPth + "opener-close.png"
                                        }, {
                                            img: self.openTopN_img = new Image,
                                            src: self.sknPth + "open-button-normal-top.png"
                                        }, {
                                            img: self.openBottomN_img = new Image,
                                            src: self.sknPth + "open-button-normal-bottom.png"
                                        }), self.openerPauseS_str = self.sknPth + "open-pause-button-selected.png", self.openerPlayS_str = self.sknPth + "open-play-button-selected.png", self.openerAnimationPath_str = self.sknPth + "equalizer.png", self.openTopSPath_str = self.sknPth + "open-button-selected-top.png", self.openBottomSPath_str = self.sknPth + "open-button-selected-bottom.png", self.openTopSPath_str = self.sknPth + "open-button-selected-top.png", self.openBottomSPath_str = self.sknPth + "open-button-selected-bottom.png", self.closeSPath_str = self.sknPth + "opener-close-over.png"), self.showRewindButton_bl && (self.skinPaths_ar.push({
                                            img: self.rewindN_img = new Image,
                                            src: self.sknPth + "rewind.png"
                                        }), self.rewindSPath_str = self.sknPth + "rewind-over.png"), this.showInfoButton_bl && self.skinPaths_ar.push({
                                            img: self.infoWindowClooseN_img = new Image,
                                            src: self.sknPth + "embed-close-button.png"
                                        }), self.showNextAndPrevButtonsInController_bl && !self.useVectorIcons_bl && self.skinPaths_ar.push({
                                            img: self.next2N_img = new Image,
                                            src: self.sknPth + "next-video.png"
                                        }, {
                                            img: self.prev2N_img = new Image,
                                            src: self.sknPth + "prev-video.png"
                                        }), self.showShareButton_bl && !self.useVectorIcons_bl && (self.skinPaths_ar.push({
                                            img: self.shareClooseN_img = new Image,
                                            src: self.sknPth + "embed-close-button.png"
                                        }, {
                                            img: self.facebookN_img = new Image,
                                            src: self.sknPth + "facebook.png"
                                        }, {
                                            img: self.googleN_img = new Image,
                                            src: self.sknPth + "google-plus.png"
                                        }, {
                                            img: self.twitterN_img = new Image,
                                            src: self.sknPth + "twitter.png"
                                        }, {
                                            img: self.likedInkN_img = new Image,
                                            src: self.sknPth + "likedin.png"
                                        }, {
                                            img: self.bufferkN_img = new Image,
                                            src: self.sknPth + "buffer.png"
                                        }, {
                                            img: self.diggN_img = new Image,
                                            src: self.sknPth + "digg.png"
                                        }, {
                                            img: self.redditN_img = new Image,
                                            src: self.sknPth + "reddit.png"
                                        }, {
                                            img: self.thumbrlN_img = new Image,
                                            src: self.sknPth + "thumbrl.png"
                                        }), self.facebookSPath_str = self.sknPth + "facebook-over.png", self.googleSPath_str = self.sknPth + "google-plus-over.png", self.twitterSPath_str = self.sknPth + "twitter-over.png", self.likedInSPath_str = self.sknPth + "likedin-over.png", self.bufferSPath_str = self.sknPth + "buffer-over.png", self.diggSPath_str = self.sknPth + "digg-over.png", self.redditSPath_str = self.sknPth + "reddit-over.png", self.thumbrlSPath_str = self.sknPth + "thumbrl-over.png"), self.atbSPath_str = self.sknPth + "a-to-b-button-over.png", self.popwColseSPath_str = self.sknPth + "popw-close-button-over.png", self.popwWindowBackgroundPath_str = self.sknPth + "popw-window-background.png", self.popwBarBackgroundPath_str = self.sknPth + "popw-bar-background.png", self.playbackRateSPath_str = self.sknPth + "playback-rate-selected.png", self.prevSPath_str = self.sknPth + "prev-video-over.png", self.nextSPath_str = self.sknPth + "next-video-over.png", self.playSPath_str = self.sknPth + "play-over.png", self.pauseSPath_str = self.sknPth + "pause-over.png", self.bkMiddlePath_str = self.sknPth + "controller-middle.png", self.hdPath_str = self.sknPth + "hd.png", self.youtubeQualityArrowPath_str = self.sknPth + "youtube-quality-arrow.png", self.ytbQualityButtonPointerPath_str = self.sknPth + "youtube-quality-pointer.png", self.controllerBkPath_str = self.sknPth + "controller-background.png", self.skipIconSPath_str = self.sknPth + "skip-icon-over.png", self.adsBackgroundPath_str = self.sknPth + "ads-background.png", self.shareSPath_str = self.sknPth + "share-over.png", self.mainScrubberBkRightPath_str = self.sknPth + "scrubber-right-background.png", self.mainScrubberBkMiddlePath_str = self.sknPth + "scrubber-middle-background.png", self.mainScrubberDragMiddlePath_str = self.sknPth + "scrubber-middle-drag.png", self.volumeScrubberBkBottomPath_str = self.sknPth + "volume-scrubber-bottom-background.png", self.volumeScrubberBkMiddlePath_str = self.sknPth + "volume-scrubber-middle-background.png", self.volumeScrubberBkTopPath_str = self.sknPth + "volume-scrubber-top-background.png", self.volumeScrubberDragBottomPath_str = self.sknPth + "volume-scrubber-bottom-drag.png", self.volumeScrubberLinePath_str = self.sknPth + "volume-scrubber-line.png", self.volumeScrubberDragMiddlePath_str = self.sknPth + "volume-scrubber-middle-drag.png", self.volumeSPath_str = self.sknPth + "volume-over.png", self.volumeDPath_str = self.sknPth + "volume-disabled.png", self.categoriesSPath_str = self.sknPth + "categories-button-over.png", self.replaySPath_str = self.sknPth + "replay-button-over.png", self.toopTipBk_str = self.sknPth + "tooltip-background.png", self.toopTipPointer_str = self.sknPth + "tooltip-pointer.png", self.shufflePathS_str = self.sknPth + "shuffle-button-over.png", self.passButtonNPath_str = self.sknPth + "pass-button.png", self.passButtonSPath_str = self.sknPth + "pass-button-over.png", self.largePlayS_str = self.sknPth + "large-play-over.png", self.fullScreenSPath_str = self.sknPth + "full-screen-over.png", self.ytbQualitySPath_str = self.sknPth + "youtube-quality-over.png", self.ytbQualityDPath_str = self.sknPth + "youtube-quality-hd.png", self.facebookSPath_str = self.sknPth + "facebook-over.png", self.infoSPath_str = self.sknPth + "info-button-over.png", self.downloadSPath_str = self.sknPth + "download-button-over.png", self.normalScreenSPath_str = self.sknPth + "normal-screen-over.png", self.progressMiddlePath_str = self.sknPth + "progress-middle.png", self.embedPathS_str = self.sknPth + "embed-over.png", self.embedWindowClosePathS_str = self.sknPth + "embed-close-button-over.png", self.embedWindowInputBackgroundPath_str = self.sknPth + "embed-window-input-background.png", self.embedCopyButtonNPath_str = self.sknPth + "embed-copy-button.png", self.embedCopyButtonSPath_str = self.sknPth + "embed-copy-button-over.png", self.sendButtonNPath_str = self.sknPth + "send-button.png", self.sendButtonSPath_str = self.sknPth + "send-button-over.png", self.embedWindowBackground_str = self.sknPth + "embed-window-background.png", self.showSubtitleSPath_str = self.sknPth + "show-subtitle-icon-over.png", self.hideSubtitleSPath_str = self.sknPth + "hide-subtitle-icon-over.png", self.inputArrowPath_str = self.sknPth + "input-arrow.png", self.showPlaylistsButtonAndPlaylists_bl && (self.skinPaths_ar.push({
                                            img: new Image,
                                            src: self.sknPth + "categories-background.png"
                                        }), self.useVectorIcons_bl || self.skinPaths_ar.push({
                                            img: self.catNextN_img = new Image,
                                            src: self.sknPth + "categories-next-button.png"
                                        }, {
                                            img: self.catPrevN_img = new Image,
                                            src: self.sknPth + "categories-prev-button.png"
                                        }, {
                                            img: self.catCloseN_img = new Image,
                                            src: self.sknPth + "categories-close-button.png"
                                        }), self.catBkPath_str = self.sknPth + "categories-background.png", self.catThumbBkPath_str = self.sknPth + "categories-thumbnail-background.png", self.catThumbBkTextPath_str = self.sknPth + "categories-thumbnail-text-backgorund.png", self.catNextSPath_str = self.sknPth + "categories-next-button-over.png", self.catPrevSPath_str = self.sknPth + "categories-prev-button-over.png", self.catCloseSPath_str = self.sknPth + "categories-close-button-over.png"), self.poppAdClsNPth = self.sknPth + "close-button-normal.png", self.poppAdClsSPth = self.sknPth + "close-button-selected.png", self.annotationAddCloseNPath_str = self.sknPth + "annotation-close-button-normal.png", self.annotationAddCloseSPath_str = self.sknPth + "annotation-close-button-selected.png", self.showPlaylistButtonAndPlaylist_bl) self.playlistThumbnailsBkPath_str = self.sknPth + "playlist-thumbnail-background.png", self.playlistBkPath_str = self.sknPth + "playlist-background.png", "bottom" == self.playlistPosition_str ? (self.skinPaths_ar.push({
                                        img: self.hidePlaylistN_img = new Image,
                                        src: self.sknPth + "hide-horizontal-playlist.png"
                                    }, {
                                        img: self.showPlaylistN_img = new Image,
                                        src: self.sknPth + "show-horizontal-playlist.png"
                                    }), self.hidePlaylistSPath_str = self.sknPth + "hide-horizontal-playlist-over.png", self.showPlaylistSPath_str = self.sknPth + "show-horizontal-playlist-over.png") : (self.skinPaths_ar.push({
                                        img: self.hidePlaylistN_img = new Image,
                                        src: self.sknPth + "hide-vertical-playlist.png"
                                    }, {
                                        img: self.showPlaylistN_img = new Image,
                                        src: self.sknPth + "show-vertical-playlist.png"
                                    }), self.hidePlaylistSPath_str = self.sknPth + "hide-vertical-playlist-over.png", self.showPlaylistSPath_str = self.sknPth + "show-vertical-playlist-over.png"), self.skinPaths_ar.push({
                                        img: self.scrBkTop_img = new Image,
                                        src: self.sknPth + "playlist-scrollbar-background-top.png"
                                    }, {
                                        img: self.scrDragTop_img = new Image,
                                        src: self.sknPth + "playlist-scrollbar-drag-top.png"
                                    }, {
                                        img: self.scrLinesN_img = new Image,
                                        src: self.sknPth + "playlist-scrollbar-lines.png"
                                    }), self.scrBkMiddlePath_str = self.sknPth + "playlist-scrollbar-background-middle.png", self.scrBkBottomPath_str = self.sknPth + "playlist-scrollbar-background-bottom.png", self.scrDragMiddlePath_str = self.sknPth + "playlist-scrollbar-drag-middle.png", self.scrDragBottomPath_str = self.sknPth + "playlist-scrollbar-drag-bottom.png", self.scrLinesSPath_str = self.sknPth + "playlist-scrollbar-lines-over.png", self.inputArrowPath_str = self.sknPth + "input-arrow.png";
                                    self.showChromecastButton_bl && (self.skinPaths_ar.push({
                                        img: self.castN_img = new Image,
                                        src: self.sknPth + "cast.png"
                                    }, {
                                        img: self.uncastN_img = new Image,
                                        src: self.sknPth + "uncast.png"
                                    }), self.castSPath_str = self.sknPth + "cast-over.png", self.uncastSPath_str = self.sknPth + "uncast-over.png"), self.totalGraphics = self.skinPaths_ar.length
                                } else setTimeout(function() {
                                    null != self && (errorMessage_str = "At least one playlist is required!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                        text: errorMessage_str
                                    }))
                                }, 50)
                            } else setTimeout(function() {
                                null != self && (errorMessage_str = "The playlist with the id <font color='#ff0000'>" + self.categoriesId_str + "</font> is not found!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                    text: errorMessage_str
                                }))
                            }, 50);
                else setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>skinPath</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                else setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>mainFolderPath</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                else setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>playlistsId</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50)
            }, this.onPreloaderLoadHandler = function() {
                self.countLoadedSCript = 0, self.scripts = [], self.useAToB && self.scripts.push("video_init.js"), self.thumbnailsPreview && self.scripts.push("FWDUVPThumbnailsPreview.js"), self.showChromecastButton_bl && (self.scripts.push("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"), self.scripts.push("FWDUVPCC.js")), self.totalScripts = self.scripts.length, self.dispatchEvent(FWDUVPData.PRELOADER_LOAD_DONE), self.loadPlugin()
            }, self.loadPlugin = function() {
                if (self.countLoadedSCript == self.totalScripts) self.loadSkin();
                else {
                    var e = document.createElement("script"),
                        t = self.scripts[self.countLoadedSCript];
                    document.head.appendChild(e), -1 != t.indexOf("gstatic") ? e.src = t : e.src = "/static/scripts/" + t, e.onload = self.loadPlugin, e.onerror = function(e) {
                        console.log(e), "video_init.js" == t ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'You have enabled the A to B plugin<br>A to B js file named <font color="#FF0000">video_init.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">video_init.js</font> file. '
                        }) : "FWDUVPThumbnailsPreview.js" == t ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'You have enabled the thumbnal preview plugin<br>thumbnail preview js file named <font color="#FF0000">FWDUVPThumbnailsPreview.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDUVPThumbnailsPreview.js</font> file. '
                        }) : "FWDUVPCC.js" == t ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'You have enabled the chromecast plugin<br>js file named <font color="#FF0000">FWDUVPCC.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDUVPCC.js</font> file.'
                        }) : -1 != t.indexOf("gstatic.js") && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'Choromecast framework javascript file can\'t be loaded<font color="#FF0000"> ' + t + " </font>"
                        })
                    }
                }
                self.countLoadedSCript++
            }, self.countImaLoadedSCript = 0, self.startToLoadIMA = function() {
                self.imaScripts || (self.imaScripts = ["//imasdk.googleapis.com/js/sdkloader/ima3.js", self.mainFolderPath_str + "java/FWDUVPIMA.js"], self.totalImaScripts = self.imaScripts.length, self.loadIMA())
            }, self.loadIMA = function() {
                if (self.countImaLoadedSCript == self.totalImaScripts) self.imaReady = !0, self.dispatchEvent(FWDUVPData.IMA_READY);
                else {
                    var e = document.createElement("script"),
                        t = self.imaScripts[self.countImaLoadedSCript];
                    document.head.appendChild(e), e.src = t, e.onload = self.loadIMA, e.onerror = function(e) {
                        1 == self.countImaLoadedSCript ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "IMA SDK can't be loaded"
                        }) : 2 == self.countImaLoadedSCript && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'IMA file <font color="#FF0000">FWDUVPIMA.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDUVPIMA.js</font> file. '
                        }), self.dispatchEvent(FWDUVPData.IMA_ERROR)
                    }, self.countImaLoadedSCript++
                }
            }, self.loadSkin = function() {
                for (var e, t, s = 0; s < self.totalGraphics; s++) e = self.skinPaths_ar[s].img, t = self.skinPaths_ar[s].src, e.onload = self.onSkinLoadHandler, e.onerror = self.onSkinLoadErrorHandler, e.src = t
            }, this.onSkinLoadHandler = function(e) {
                self.countLoadedSkinImages++, self.countLoadedSkinImages == self.totalGraphics && setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.SKIN_LOAD_COMPLETE)
                }, 50)
            }, self.onSkinLoadErrorHandler = function(e) {
                message = FWDUVPUtils.isIEAndLessThen9 ? "Graphics image not found!" : "The skin icon with label <font color='#ff0000'>" + e.target.src + "</font> can't be loaded, check path!", window.console && console.log(e);
                var t = {
                    text: message
                };
                setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, t)
                }, 50)
            }, this.downloadVideo = function(e, t) {
                if (FWDUVPUtils.isLocal) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Downloading video files local is not allowed or possible! To function properly please test online."
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                if (!e) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Not allowed to download this video!"
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                if (-1 == String(e.indexOf(".mp4"))) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Only mp4 video files hosted on your server can be downloaded."
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                var s = e,
                    o = location.origin,
                    i = location.pathname;
                if (-1 != i.indexOf(".") && (i = i.substr(0, i.lastIndexOf("/") + 1)), -1 == e.indexOf("http:") && -1 == e.indexOf("https:") && (e = o + i + e), t) {
                    40 < (t = (t = decodeURIComponent(t)).replace(/[^A-Z0-9\-\_\.]+/gi, "_")).length && (t = t.substr(0, 40) + "..."), /\.(mp4)$/i.test(t) || (t += ".mp4"), e = FWDUVPUtils.getValidSource(e);
                    var l = self.videoDownloaderPath_str;
                    if (self.dlIframe || (self.dlIframe = document.createElement("IFRAME"), self.dlIframe.style.display = "none", document.documentElement.appendChild(self.dlIframe)), self.isMbl && !FWDUVPUtils.isAndroid) {
                        if (self.openDownloadLinkOnMobile_bl) return void window.open(s, "_blank");
                        var n = self.getValidEmail();
                        if (!n) return;
                        if (null != self.emailXHR) {
                            try {
                                self.emailXHR.abort()
                            } catch (e) {}
                            self.emailXHR.onreadystatechange = null, self.emailXHR.onerror = null, self.emailXHR = null
                        }
                        return self.emailXHR = new XMLHttpRequest, self.emailXHR.onreadystatechange = function(e) {
                            4 == self.emailXHR.readyState && (200 == self.emailXHR.status ? "sent" == self.emailXHR.responseText ? alert("Email sent.") : alert("Error sending email, this is a server side error, the php file can't send the email!") : alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText))
                        }, self.emailXHR.onerror = function(e) {
                            try {
                                window.console && console.log(e), window.console && console.log(e.message)
                            } catch (e) {}
                            alert("Error sending email: " + e.message)
                        }, self.emailXHR.open("get", self.mailPath_str + "?mail=" + n + "&name=" + t + "&path=" + e, !0), void self.emailXHR.send()
                    }
                    self.dlIframe.src = l + "?path=" + e + "&name=" + t
                }
            }, this.getValidEmail = function() {
                for (var e = prompt("Please enter your email address where the video download link will be sent:"), t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; !t.test(e) || "" == e;) {
                    if (null === e) return;
                    e = prompt("Please enter a valid email address:")
                }
                return e
            }, this.loadPlaylist = function(e) {
                if (self.stopToLoadPlaylist(), !self.isPlaylistDispatchingError_bl) {
                    clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
                    var t = self.catsRef_ar[e];
                    if (void 0 === t) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "<font color='#ff0000'>loadPlaylist()</font> - Please specify a DOM playlist id or youtube playlist id!"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (null === t) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "The playlist with id <font color='#ff0000'>" + self.cats_ar[e].source + "</font> is not found in the DOM."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (!isNaN(t)) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "<font color='#ff0000'>loadPlaylist()</font> - The parameter must be of type string!"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (self.resetYutubeVimeoPlaylistLoader(), self.isYoutbe_bl = !1, self.loadFromFolder_bl = !1, self.isVimeoAlbum_bl = !1, self.playlist_ar = [], self.playlistPass = self.cats_ar[e].pass, t.length)
                        if (-1 != t.indexOf("list=") || -1 != t.indexOf("youtube.")) self.isYoutbe_bl = !0, self.loadYoutubePlaylist(t);
                        else if (-1 != t.indexOf("vimeo.com")) self.isVimeo_bl = !0, self.loadVimeoPlaylist(t, self.cats_ar[e].vimeoUserId, self.cats_ar[e].clientId, self.cats_ar[e].vimeoSecret, self.cats_ar[e].vimeoToken);
                    else {
                        if (-1 != t.indexOf("list=")) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                            self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                text: "Loading youtube playlist is only possible by setting <font color='#ff0000'>useYoutube=\"yes\"</font>."
                            }), self.isPlaylistDispatchingError_bl = !1
                        }, 50)); - 1 != t.indexOf("folder=") ? self.loadFolderPlaylist(t) : -1 == t.indexOf(".xml") && -1 == t.indexOf("http:") && -1 == t.indexOf("https:") && -1 == t.indexOf("www.") || self.loadXMLPlaylist(t)
                    } else self.parseDOMPlaylist(t, self.cats_ar[e].source)
                }
            }, this.loadXMLPlaylist = function(e) {
                if (!self.isPlaylistDispatchingError_bl) {
                    if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Loading XML files local is not allowed or possible!. To function properly please test online."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    self.sourceURL_str = e, self.xhr = new XMLHttpRequest, self.xhr.onreadystatechange = self.ajaxOnLoadHandler, self.xhr.onerror = self.ajaxOnErrorHandler;
                    try {
                        self.xhr.open("get", self.proxyPath_str + "?url=" + self.sourceURL_str + "&rand=" + parseInt(99999999 * Math.random()), !0), self.xhr.setRequestHeader("Content-Type", "text/xml"), self.xhr.send()
                    } catch (e) {
                        var t = e;
                        e && e.message && (t = e.message), self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "XML file can't be loaded! <font color='#ff0000'>" + self.sourceURL_str + "</font>. " + t
                        })
                    }
                }
            }, this.loadFolderPlaylist = function(e) {
                if (!self.isPlaylistDispatchingError_bl) {
                    if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Creating a video playlist from a folder is not allowed or possible local! To function properly please test online."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    self.loadFromFolder_bl = !0, self.sourceURL_str = e.substr(e.indexOf("=") + 1), self.xhr = new XMLHttpRequest, self.xhr.onreadystatechange = self.ajaxOnLoadHandler, self.xhr.onerror = self.ajaxOnErrorHandler;
                    try {
                        self.xhr.open("get", self.proxyFolderPath_str + "?dir=" + encodeURIComponent(self.sourceURL_str) + "&videoLabel=" + self.folderVideoLabel_str + "&rand=" + parseInt(9999999 * Math.random()), !0), self.xhr.send()
                    } catch (e) {
                        e && e.message && e.message, self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Folder proxy file path is not found: <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>"
                        })
                    }
                }
            }, this.loadVimeoPlaylist = function(e, t, s, o, i) {
                if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Loading Vimeo albums local is not allowed or possible! To function properly please test online."
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                self.isVimeoAlbum_bl = !0, e && (self.vimeoAlbumURL = e), t && (self.userId = t), s && (self.clientId = s), o && (self.vimeoSecret = o), i && (self.vimeoToken = i);
                var l = self.vimeoAlbumURL.match(/\/[\d]+/gi);
                l = l[0].substr(1);
                var n = "";
                self.clientId && (n = "&client_id=" + self.clientId + "&vimeo_secret=" + self.vimeoSecret + "&vimeo_token=" + self.vimeoToken), self.nextPageToken_str ? self.sourceURL_str = self.mainFolderPath_str + "vimeo/vimeo_data.php?rand=" + Math.round(99999999 * Math.random()) + "&type=vimeo_user_album&user=" + self.userId + "&album_id=" + l + "&page=" + self.nextPageToken_str + "&per_page=50" + n : self.sourceURL_str = self.mainFolderPath_str + "vimeo/vimeo_data.php?rand=" + Math.round(99999999 * Math.random()) + "&type=vimeo_user_album&user=" + self.userId + "&album_id=" + l + "&page=1&per_page=50" + n, self.xhr = new XMLHttpRequest, self.xhr.onreadystatechange = self.ajaxOnLoadHandler, self.xhr.onerror = self.ajaxOnErrorHandler;
                try {
                    self.xhr.open("get", self.sourceURL_str, !0), self.xhr.send()
                } catch (e) {
                    e && e.message && e.message, self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading vimeo album! <font color='#ff0000'>" + self.vimeoAlbumURL + "</font>"
                    })
                }
            }, this.parseVimeoPlaylist = function(e) {
                if (self.stopToLoadPlaylist(), e.body.error) self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: e.body.error + " " + e.body.developer_message
                });
                else {
                    var t, s;
                    e = e.body, self.vimeoObject_ar || (self.vimeoObject_ar = []);
                    for (var o = 0; o < e.data.length; o++) self.vimeoObject_ar.push(e.data[o]);
                    if (t = self.vimeoObject_ar.length, e.paging.next) return self.nextPageToken_str = Number(e.page) + 1, void self.loadVimeoPlaylist();
                    for (o = 0; o < t; o++) {
                        var i = {},
                            l = (s = self.vimeoObject_ar[o]).uri.match(/\/[\d]+/gi)[0].substr(1);
                        i.startAtVideo = 0, i.videoSource = [{
                            source: "https://vimeo.com/" + l
                        }], i.gaStr = s.name, i.title = "<p class='ytbChangeColor fwduvp-ytb-info-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";'>" + s.name + "</p>";
                        var n = s.description;
                        n = n || "", n = (n = 165 < i.title.length ? n.substr(0, 60) : n.substr(0, 90)).substr(0, n.lastIndexOf(" ")) + " ...", i.titleText = s.name, i.titleText = s.name, i.desc = void 0, i.desc = "<p class='fwduvp-ytb-info-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";'>" + s.name + "</p><p class='fwduvp-ytb-info-p' style='color:" + self.youtubeDescriptionColor_str + ";'>" + s.description + "</p>", i.downloadable = !1;
                        try {
                            i.thumbSource = s.pictures.sizes[2].link
                        } catch (e) {}
                        i.posterSource = "none", i.downloadable = !1, self.playlist_ar.push(i)
                    }
                    self.randomizePlaylist_bl && (self.playlist_ar = FWDUVPUtils.randomizeArray(self.playlist_ar)), self.maxPlaylistItems < self.playlist_ar.length && (self.playlist_ar = self.playlist_ar.splice(0, self.maxPlaylistItems)), clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                    }, 50), self.isDataLoaded_bl = !0
                }
            }, this.loadYoutubePlaylist = function(e) {
                if (!self.isPlaylistDispatchingError_bl || self.isYoutbe_bl) {
                    if (self.isChannel = -1 != e.indexOf("channel/"), self.url = e, !self.youtubeUrl_str) {
                        if (-1 != e.indexOf("list=")) var t = /list=(.*?)(?:&|$)/i.exec(e);
                        else t = /channel\/(.*?)(?:&|$)/i.exec(e);
                        e = t[1], self.youtubeUrl_str = e
                    }
                    if (self.nextPageToken_str ? self.isChannel ? self.sourceURL_str = "https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=" + self.nextPageToken_str + "&channelId=" + self.youtubeUrl_str + "&key=" + self.youtubeAPIKey + "&maxResults=50&callback=" + prt.instanceName_str + ".data.parseYoutubePlaylist" : self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=" + self.youtubeAPIKey + "&maxResults=50&callback=" + prt.instanceName_str + ".data.parseYoutubePlaylist" : self.isChannel ? self.sourceURL_str = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + self.youtubeUrl_str + "&key=" + self.youtubeAPIKey + "&maxResults=50&callback=" + prt.instanceName_str + ".data.parseYoutubePlaylist" : self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=" + self.youtubeAPIKey + "&maxResults=50&callback=" + prt.instanceName_str + ".data.parseYoutubePlaylist", null == self.scs_el) try {
                        self.scs_el = document.createElement("script"), self.scs_el.src = self.sourceURL_str, self.scs_el.id = prt.instanceName_str + ".data.parseYoutubePlaylist", document.documentElement.appendChild(self.scs_el)
                    } catch (e) {}
                    self.JSONPRequestTimeoutId_to = setTimeout(function() {
                        var e;
                        self.isChannel && (e = "channel"), self.JSONPRequestTimeoutError("Error loading youtube " + e + "!<font color='#ff0000'>" + self.youtubeUrl_str + "</font>")
                    }, 6e3)
                }
            }, this.JSONPRequestTimeoutError = function(e) {
                self.stopToLoadPlaylist(), self.isPlaylistDispatchingError_bl = !0, showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: e
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50)
            }, this.resetYutubeVimeoPlaylistLoader = function() {
                self.isYoutbe_bl = !1, self.youtubeObject_ar = null, self.vimeoObject_ar = null, self.nextPageToken_str = null, self.youtubeUrl_str = null
            }, this.ajaxOnErrorHandler = function(e) {
                try {
                    window.console && console.log(e), window.console && console.log(e.message)
                } catch (e) {}
                self.isVimeoAlbum_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading vimeo album! <font color='#ff0000'>" + self.vimeoAlbumURL + "</font>"
                }) : self.loadFromFolder_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"
                }) : self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#ff0000'>" + self.proxyPath_str + "</font>. Make sure the path is correct"
                })
            }, this.ajaxOnLoadHandler = function(e) {
                var response, isXML = !1;
                if (4 == self.xhr.readyState)
                    if (404 == self.xhr.status) self.isVimeoAlbum_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading vimeo album! <font color='#ff0000'>" + self.vimeoAlbumURL + "</font>"
                    }) : self.loadFromFolder_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Folder proxy file path is not found: <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>"
                    }) : self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Proxy file path is not found: <font color='#ff0000'>" + self.proxyPath_str + "</font>"
                    });
                    else if (408 == self.xhr.status) self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Server has timeout!"
                });
                else if (200 == self.xhr.status) {
                    if (-1 != self.xhr.responseText.indexOf("<b>Warning</b>:")) return void self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading folder: <font color='#ff0000'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"
                    });
                    response = window.JSON ? JSON.parse(self.xhr.responseText) : eval("(" + self.xhr.responseText + ")"), response.body ? self.parseVimeoPlaylist(response) : response.folder ? self.parseFolderJSON(response) : response.li ? self.parseXML(response) : response.error && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading file: <font color='#ff0000'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"
                    })
                }
            }, this.parseYoutubePlaylist = function(e) {
                if (!self.isPlaylistDispatchingError_bl && self.isYoutbe_bl) {
                    var t, s, o;
                    if (e.error) return self.isChannel && (t = "channel"), self.JSONPRequestTimeoutError("Error loading youtube " + t + "! <font color='#ff0000'>" + self.youtubeUrl_str + "</font>"), void(console && console.log(e));
                    self.playlist_ar = [], self.youtubeObject_ar || (self.youtubeObject_ar = []);
                    for (var i = 0; i < e.items.length; i++) self.youtubeObject_ar.push(e.items[i]);
                    if (s = self.youtubeObject_ar.length, self.stopToLoadPlaylist(), e.nextPageToken) return self.nextPageToken_str = e.nextPageToken, void self.loadYoutubePlaylist(self.url);
                    for (i = 0; i < s; i++) {
                        var l = {};
                        if ((o = self.youtubeObject_ar[i]).snippet.thumbnails) {
                            self.isChannel ? l.videoSource = o.id.videoId : l.videoSource = o.snippet.resourceId.videoId, l.startAtVideo = 0, l.videoSource = [{
                                source: "https://www.youtube.com/watch?v=" + l.videoSource
                            }], l.owner = o.snippet.channelTitle, l.gaStr = o.snippet.title, window.isWhite ? self.youtubeAndFolderVideoTitleColor_str = "#000000" : window.isDark && (self.youtubeAndFolderVideoTitleColor_str = "#FFFFFF"), l.title = "<p class='ytbChangeColor fwduvp-ytb-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";'>" + o.snippet.title + "</p>";
                            var n = o.snippet.description;
                            n = (n = 190 < l.title.length ? n.substr(0, 20) : 165 < l.title.length ? n.substr(0, 60) : n.substr(0, 90)).substr(0, n.lastIndexOf(" ")) + " ...", l.title += "<p class='fwduvp-ytb-p' style='color:" + self.youtubeOwnerColor_str + ";'> " + n + "</p>", l.titleText = o.snippet.title, l.titleText = o.snippet.title, l.desc = void 0, l.desc = "<p class='fwduvp-ytb-info-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";'>" + o.snippet.title + "</p><p class='fwduvp-ytb-info-p' style='color:" + self.youtubeDescriptionColor_str + ";'>" + o.snippet.description + "</p>", l.downloadable = !1;
                            try {
                                l.thumbSource = o.snippet.thumbnails.default.url
                            } catch (e) {}
                            l.posterSource = "none", -1 == o.snippet.title.indexOf("eleted video") && -1 == o.snippet.title.indexOf("his video is unavailable") && self.playlist_ar.push(l)
                        }
                    }
                    self.randomizePlaylist_bl && (self.playlist_ar = FWDUVPUtils.randomizeArray(self.playlist_ar)), self.maxPlaylistItems < self.playlist_ar.length && (self.playlist_ar = self.playlist_ar.splice(0, self.maxPlaylistItems)), clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                    }, 50), self.isDataLoaded_bl = !0
                }
            }, this.setYoutubePlaylistHEXColor = function(e) {
                self.youtubeAndFolderVideoTitleColor_str = e
            }, this.closeJsonPLoader = function() {
                clearTimeout(self.JSONPRequestTimeoutId_to)
            }, this.parseDOMPlaylist = function(element, id) {
                if (!self.isPlaylistDispatchingError_bl) {
                    var children_ar = FWDUVPUtils.getChildren(element),
                        totalChildren = children_ar.length,
                        child, has360Video = !1;
                    if (self.playlist_ar = [], 0 != totalChildren) {
                        for (var i = 0; i < totalChildren; i++) {
                            var obj = {},
                                adsObj, annotations_ar;
                            if (child = children_ar[i], !FWDUVPUtils.hasAttribute(child, "data-thumb-source")) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                    text: "Attribute <font color='#ff0000'>data-thumb-source</font> is required in the playlist at position <font color='#ff0000'>" + (i + 1)
                                })
                            }, 50));
                            if (!FWDUVPUtils.hasAttribute(child, "data-video-source")) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                    text: "Attribute <font color='#ff0000'>data-video-source</font> is required in the playlist at position <font color='#ff0000'>" + (i + 1)
                                })
                            }, 50));
                            if (obj.thumbSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-thumb-source")), obj.videoSource = FWDUVPUtils.getAttributeValue(child, "data-video-source"), obj.dataPlaybackRate = FWDUVPUtils.getAttributeValue(child, "data-playback-rate"), obj.startAtVideo = FWDUVPUtils.getAttributeValue(child, "data-start-at-video") || 0, obj.isLive = FWDUVPUtils.getAttributeValue(child, "data-is-live"), obj.atb = "yes" == FWDUVPUtils.getAttributeValue(child, "data-use-a-to-b"), obj.thumbnailsPreview = FWDUVPUtils.getAttributeValue(child, "data-thumbnails-preview"), self.useAToB || (obj.atb = !1), "yes" == obj.isLive ? obj.isLive = !0 : obj.isLive = !1, obj.isPrivate = FWDUVPUtils.getAttributeValue(child, "data-is-private"), "yes" == obj.isPrivate ? obj.isPrivate = !0 : obj.isPrivate = !1, obj.redirectURL = FWDUVPUtils.getAttributeValue(child, "data-redirect-url"), obj.redirectTarget = FWDUVPUtils.getAttributeValue(child, "data-redirect-target"), obj.privateVideoPassword_str = FWDUVPUtils.getAttributeValue(child, "data-private-video-password"), obj.startAtTime = FWDUVPUtils.getAttributeValue(child, "data-start-at-time"), "00:00:00" != obj.startAtTime && FWDUVPUtils.checkTime(obj.startAtTime) || (obj.startAtTime = void 0), obj.stopAtTime = FWDUVPUtils.getAttributeValue(child, "data-stop-at-time"), "00:00:00" != obj.stopAtTime && FWDUVPUtils.checkTime(obj.stopAtTime) || (obj.stopAtTime = void 0), -1 != obj.videoSource.indexOf("{source:")) try {
                                obj.videoLabels_ar = [], obj.videoSource = eval(obj.videoSource);
                                for (var m = 0; m < obj.videoSource.length; m++) obj.videoLabels_ar[m] = obj.videoSource[m].label;
                                for (var m = 0; m < obj.videoSource.length; m++) {
                                    var src = obj.videoSource[m].source; - 1 != src.indexOf("encrypt:") && (src = atob(src.substr(8))), obj.videoSource[m].source = FWDUVPUtils.getValidSource(src)
                                }
                                for (var m = 0; m < obj.videoSource.length; m++) obj.videoSource[m].is360 = obj.videoSource[m].is360, "yes" == obj.videoSource[m].is360 && (obj.videoSource[m].is360 = !0), "no" == obj.videoSource[m].is360 && (obj.videoSource[m].is360 = !1), 1 == obj.videoSource[m].is360 && (has360Video = !0);
                                obj.videoLabels_ar.reverse()
                            } catch (e) {
                                return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                        text: "Please make sure that the <font color='#ff0000'>data-video-source</font> attribute contains an array of videos at position <font color='#ff0000'>" + (i + 1) + "</font>"
                                    })
                                }, 50))
                            } else src = obj.videoSource, -1 != src.indexOf("encrypt:") && (src = atob(src.substr(8))), obj.videoSource = [{
                                source: FWDUVPUtils.getValidSource(src)
                            }];
                            if (FWDUVPUtils.hasAttribute(child, "data-subtitle-soruce")) {
                                if (obj.subtitleSource = FWDUVPUtils.getAttributeValue(child, "data-subtitle-soruce"), -1 != obj.subtitleSource.indexOf("{source:")) {
                                    if (obj.startAtSubtitle = FWDUVPUtils.getAttributeValue(child, "data-start-at-subtitle") || 0, -1 != obj.subtitleSource.indexOf("{source:")) {
                                        try {
                                            obj.subtitleSource = eval(obj.subtitleSource)
                                        } catch (e) {
                                            return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                                    text: "Please make sure that the <font color='#ff0000'>data-subtitle-source</font> attribute contains an array of subtitles at position <font color='#ff0000'>" + (i + 1) + "</font>"
                                                })
                                            }, 50))
                                        }
                                        obj.subtitleSource.splice(0, 0, {
                                            source: "none",
                                            label: self.subtitlesOffLabel_str
                                        }), obj.subtitleSource.reverse()
                                    }
                                } else obj.subtitleSource = [{
                                    source: obj.subtitleSource
                                }];
                                if (obj.subtitleSource)
                                    for (var x = 0; x < obj.subtitleSource.length; x++) {
                                        var source = obj.subtitleSource[x].source; - 1 != source.indexOf("encrypt:") && (obj.subtitleSource[x].source = atob(source.substr(8)))
                                    }
                            }
                            obj.dataAdvertisementOnPauseSource = FWDUVPUtils.getAttributeValue(child, "data-advertisement-on-pause-source"), obj.scrubAtTimeAtFirstPlay = FWDUVPUtils.getAttributeValue(child, "data-scrub-at-time-at-first-play") || "none", /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g.test(obj.scrubAtTimeAtFirstPlay) ? obj.scrubAtTimeAtFirstPlay = FWDUVPUtils.getSecondsFromString(obj.scrubAtTimeAtFirstPlay) : obj.scrubAtTimeAtFirstPlay = void 0, FWDUVPUtils.hasAttribute(child, "data-poster-source") ? obj.posterSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-poster-source")) : obj.posterSource = "none", obj.downloadPath = obj.videoSource[obj.startAtVideo], FWDUVPUtils.hasAttribute(child, "data-downloadable") && self.showDownloadVideoButton_bl ? (obj.downloadable = "yes" == FWDUVPUtils.getAttributeValue(child, "data-downloadable"), -1 == obj.downloadPath.source.indexOf(".") && (obj.downloadable = !1)) : obj.downloadable = !1;
                            for (var mainPopupAds_ar = FWDUVPUtils.getChildren(child), tempPopupAds_ar, popupAds_ar, popupOrAnnotationChild, finalPopupChild, popupObj, k = 0; k < mainPopupAds_ar.length; k++) {
                                if (popupOrAnnotationChild = mainPopupAds_ar[k], FWDUVPUtils.hasAttribute(popupOrAnnotationChild, "data-add-popup")) {
                                    tempPopupAds_ar = FWDUVPUtils.getChildren(popupOrAnnotationChild), popupAds_ar = [];
                                    for (var x = 0; x < tempPopupAds_ar.length; x++) finalPopupChild = tempPopupAds_ar[x], finalPopupChild && (popupObj = {}, popupObj.source = FWDUVPUtils.getValidSource(FWDUVPUtils.getAttributeValue(finalPopupChild, "data-image-path")), popupObj.timeStart = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(finalPopupChild, "data-time-start")), popupObj.timeEnd = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(finalPopupChild, "data-time-end")), popupObj.link = FWDUVPUtils.getAttributeValue(finalPopupChild, "data-link"), popupObj.target = FWDUVPUtils.getAttributeValue(finalPopupChild, "data-target"), popupObj.google_ad_width = parseInt(FWDUVPUtils.getAttributeValue(finalPopupChild, "data-google-ad-width")) || 600, popupObj.google_ad_height = parseInt(FWDUVPUtils.getAttributeValue(finalPopupChild, "data-google-ad-height")) || 200, popupObj.google_ad_client = FWDUVPUtils.getAttributeValue(finalPopupChild, "data-google-ad-client"), popupObj.google_ad_slot = FWDUVPUtils.getAttributeValue(finalPopupChild, "data-google-ad-slot"), popupAds_ar.push(popupObj));
                                    obj.popupAds_ar = popupAds_ar
                                }
                                if (FWDUVPUtils.hasAttribute(popupOrAnnotationChild, "data-ads")) {
                                    var adsChild;
                                    adsData_ar = FWDUVPUtils.getChildren(popupOrAnnotationChild), ads_ar = [];
                                    for (var tt = adsData_ar.length, m = 0; m < tt; m++) {
                                        var adsObj = {};
                                        adsChild = adsData_ar[m], adsObj.timeStart = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(adsChild, "data-time-start")), FWDUVPUtils.hasAttribute(adsChild, "data-add-duration") && (adsObj.addDuration = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(adsChild, "data-add-duration"))), adsObj.thumbnailSource = FWDUVPUtils.getAttributeValue(adsChild, "data-thumbnail-source"), "" != adsObj.thumbnailSource && " " != adsObj.thumbnailSource || (adsObj.thumbnailSource = void 0), adsObj.timeToHoldAds = FWDUVPUtils.getAttributeValue(adsChild, "data-time-to-hold-ads") || 4, adsObj.source = FWDUVPUtils.getValidSource(FWDUVPUtils.getAttributeValue(adsChild, "data-source")), adsObj.link = FWDUVPUtils.getAttributeValue(adsChild, "data-link"), adsObj.target = FWDUVPUtils.getAttributeValue(adsChild, "data-target"), ads_ar[m] = adsObj
                                    }
                                    obj.ads_ar = ads_ar
                                }
                                if (FWDUVPUtils.hasAttribute(child, "data-vast-url")) {
                                    obj.ads_ar = void 0;
                                    var vsrc = FWDUVPUtils.getAttributeValue(child, "data-vast-url");
                                    FWDUVPUtils.isIMA(vsrc) ? obj.imaURL = vsrc : (obj.vastURL = vsrc, obj.vastClickTroughTarget = FWDUVPUtils.getAttributeValue(child, "data-vast-clicktrough-target") || "_blank", obj.vastLinearStartTime = FWDUVPUtils.getAttributeValue(child, "data-vast-linear-astart-at-time") || "00:00:00")
                                }
                                if (FWDUVPUtils.hasAttribute(popupOrAnnotationChild, "data-cuepoints")) {
                                    var cuepointsChild;
                                    cuepointsData_ar = FWDUVPUtils.getChildren(popupOrAnnotationChild), cuepoints_ar = [];
                                    for (var tt = cuepointsData_ar.length, m = 0; m < tt; m++) {
                                        var cuepointsObj = {};
                                        cuepointsChild = cuepointsData_ar[m], cuepointsObj.timeStart = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(cuepointsChild, "data-time-start")), cuepointsObj.javascriptCall = FWDUVPUtils.getAttributeValue(cuepointsChild, "data-javascript-call"), cuepointsObj.isPlayed_bl = !1, cuepoints_ar[m] = cuepointsObj
                                    }
                                    obj.cuepoints_ar = cuepoints_ar
                                }
                                if (FWDUVPUtils.hasAttribute(popupOrAnnotationChild, "data-annotations")) {
                                    var annotationChild;
                                    annotations_ar = FWDUVPUtils.getChildren(popupOrAnnotationChild);
                                    for (var tt = annotations_ar.length, m = 0; m < tt; m++) {
                                        var annotationObj = {};
                                        annotationChild = annotations_ar[m], annotationObj.start = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(annotationChild, "data-start-time")), annotationObj.end = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(annotationChild, "data-end-time")), annotationObj.left = parseInt(FWDUVPUtils.getAttributeValue(annotationChild, "data-left"), 10), annotationObj.top = parseInt(FWDUVPUtils.getAttributeValue(annotationChild, "data-top"), 10), annotationObj.showCloseButton_bl = "yes" == FWDUVPUtils.getAttributeValue(annotationChild, "data-show-close-button"), annotationObj.clickSource = FWDUVPUtils.getAttributeValue(annotationChild, "data-click-source"), annotationObj.clickSourceTarget = FWDUVPUtils.getAttributeValue(annotationChild, "data-click-source-target"), annotationObj.normalStateClass = FWDUVPUtils.getAttributeValue(annotationChild, "data-normal-state-class"), annotationObj.selectedStateClass = FWDUVPUtils.getAttributeValue(annotationChild, "data-selected-state-class"), annotationObj.content = annotationChild.innerHTML, annotations_ar[m] = annotationObj
                                    }
                                    obj.annotations_ar = annotations_ar
                                }
                            }
                            var descChidren_ar = FWDUVPUtils.getChildren(child),
                                descChild;
                            obj.title = "not defined!", obj.titleText = "not defined!";
                            for (var k = 0; k < descChidren_ar.length; k++) descChild = descChidren_ar[k], FWDUVPUtils.hasAttribute(descChild, "data-video-short-description") ? (obj.title = descChild.innerHTML, obj.titleText = descChild.textContent, obj.titleText = obj.titleText.replace(/^\s+/g, "")) : FWDUVPUtils.hasAttribute(descChild, "data-video-long-description") && (obj.desc = descChild.innerHTML);
                            gaStr = obj.titleText.split("\n");
                            for (var x = 0; x < gaStr.length; x++)
                                if (2 < gaStr[x].length) {
                                    obj.gaStr = gaStr[x];
                                    break
                                } FWDUVPUtils.hasAttribute(child, "data-ads-source") && (adsObj = {}, adsObj.source = FWDUVPUtils.getValidSource(FWDUVPUtils.getAttributeValue(child, "data-ads-source")), adsObj.pageToOpen = FWDUVPUtils.getAttributeValue(child, "data-ads-page-to-open-url"), adsObj.pageTarget = FWDUVPUtils.getAttributeValue(child, "data-ads-page-target") || "_blank", adsObj.timeToHoldAds = parseInt(FWDUVPUtils.getAttributeValue(child, "data-time-to-hold-ads")) || 0, obj.ads = adsObj), self.playlist_ar[i] = obj
                        }
                        self.randomizePlaylist_bl && (self.playlist_ar = FWDUVPUtils.randomizeArray(self.playlist_ar)), self.maxPlaylistItems < self.playlist_ar.length && (self.playlist_ar = self.playlist_ar.splice(0, self.maxPlaylistItems)), clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                            self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                        }, 50), self.isDataLoaded_bl = !0
                    } else showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "At least one video is required in the playlist with id: <font color='#ff0000'>" + id + "</font>"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50)
                }
            }, this.parseFolderJSON = function(e) {
                var t;
                self.playlist_ar = [];
                for (var s = e.folder, o = 0; o < s.length; o++)(t = {}).videoSource = encodeURI(s[o]["@attributes"]["data-video-path"]), t.videoSource = s[o]["@attributes"]["data-video-path"], t.dataPlaybackRate = s[o]["@attributes"]["data-playback-rate"], t.startAtVideo = s[o]["@attributes"]["data-start-at-video"] || 0, t.videoSource = [{
                    source: FWDUVPUtils.getValidSource(t.videoSource)
                }], t.thumbSource = encodeURI(s[o]["@attributes"]["data-thumb-path"]), t.posterSource = encodeURI(s[o]["@attributes"]["data-poster-path"]), t.downloadPath = encodeURIComponent(s[o]["@attributes"]["download-path"]), t.downloadable = self.showDownloadVideoButton_bl, self.forceDisableDownloadButtonForFolder_bl && (t.downloadable = !1), t.titleText = "...", t.title = "<p class='fwduvp-thumbnail-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + "'>...</p>", t.titleText = s[o]["@attributes"]["data-title"], t.title = "<p class='fwduvp-thumbnail-title' style='color:" + self.youtubeAndFolderVideoTitleColor_str + "'>" + s[o]["@attributes"]["data-title"] + "</p>", t.desc = void 0, self.playlist_ar[o] = t;
                self.randomizePlaylist_bl && (self.playlist_ar = FWDUVPUtils.randomizeArray(self.playlist_ar)), self.maxPlaylistItems < self.playlist_ar.length && (self.playlist_ar = self.playlist_ar.splice(0, self.maxPlaylistItems)), clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                }, 50), self.isDataLoaded_bl = !0
            }, this.parseXML = function(response) {
                var obj;
                self.playlist_ar = [];
                var obj_ar = response.li,
                    has360Video = !1;
                obj_ar.length || (obj_ar = [obj_ar]);
                for (var i = 0; i < obj_ar.length; i++) {
                    if (obj = {}, obj.videoSource = obj_ar[i]["@attributes"]["data-video-source"], obj.startAtVideo = obj_ar[i]["@attributes"]["data-start-at-video"] || 0, obj.isLive = obj_ar[i]["@attributes"]["data-is-live"], obj.atb = "yes" == obj_ar[i]["@attributes"]["data-use-a-to-b"], self.useAToB || (obj.atb = !1), obj.isPrivate = obj_ar[i]["@attributes"]["data-is-private"], "yes" == obj.isPrivate ? obj.isPrivate = !0 : obj.isPrivate = !1, obj.privateVideoPassword_str = obj_ar[i]["@attributes"]["data-private-video-password"], obj.startAtTime = obj_ar[i]["@attributes"]["data-start-at-time"], "00:00:00" != obj.startAtTime && FWDUVPUtils.checkTime(obj.startAtTime) || (obj.startAtTime = void 0), obj.stopAtTime = obj_ar[i]["@attributes"]["data-stop-at-time"], "00:00:00" != obj.stopAtTime && FWDUVPUtils.checkTime(obj.stopAtTime) || (obj.stopAtTime = void 0), -1 != obj.videoSource.indexOf("{source:")) try {
                        obj.videoLabels_ar = [], obj.videoSource = eval(obj.videoSource);
                        for (var m = 0; m < obj.videoSource.length; m++) obj.videoLabels_ar[m] = obj.videoSource[m].label;
                        for (var m = 0; m < obj.videoSource.length; m++) {
                            var src = obj.videoSource[m].source; - 1 != src.indexOf("encrypt:") && (src = atob(src.substr(8))), obj.videoSource[m].source = FWDUVPUtils.getValidSource(src)
                        }
                        for (var m = 0; m < obj.videoSource.length; m++) obj.videoSource[m].is360 = obj.videoSource[m].is360, "yes" == obj.videoSource[m].is360 && (obj.videoSource[m].is360 = !0), "no" == obj.videoSource[m].is360 && (obj.videoSource[m].is360 = !1), 1 == obj.videoSource[m].is360 && (has360Video = !0);
                        obj.videoLabels_ar.reverse()
                    } catch (e) {
                        return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                            self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                text: "Please make sure that the <font color='#ff0000'>data-video-source</font> attribute contains an array of videos at position <font color='#ff0000'>" + (i + 1) + "</font>"
                            })
                        }, 50))
                    } else {
                        var src = obj.videoSource; - 1 != src.indexOf("encrypt:") && (src = atob(src.substr(8))), obj.videoSource = [{
                            source: FWDUVPUtils.getValidSource(src)
                        }]
                    }
                    if (obj.subtitleSource = obj_ar[i]["@attributes"]["data-subtitle-soruce"], obj.startAtSubtitle = obj_ar[i]["@attributes"]["data-start-at-subtitle"] || 0, obj.subtitleSource) {
                        if (-1 != obj.subtitleSource.indexOf("{source:")) {
                            if (-1 != obj.subtitleSource.indexOf("{source:")) {
                                try {
                                    obj.subtitleSource = eval(obj.subtitleSource), -1 != obj.subtitleSource.indexOf("encrypt:") && (obj.subtitleSource = atob(src.substr(8)))
                                } catch (e) {
                                    return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                        self.dispatchEvent(FWDRVPData.LOAD_ERROR, {
                                            text: "Please make sure that the <font color='#ff0000'>data-subtitle-source</font> attribute contains an array of subtitles at position <font color='#ff0000'>" + (i + 1) + "</font>"
                                        })
                                    }, 50))
                                }
                                obj.subtitleSource.splice(0, 0, {
                                    source: "none",
                                    label: self.subtitlesOffLabel_str
                                }), obj.subtitleSource.reverse()
                            }
                        } else obj.subtitleSource = [{
                            source: obj.subtitleSource
                        }];
                        if (obj.subtitleSource)
                            for (var x = 0; x < obj.subtitleSource.length; x++) {
                                var source = obj.subtitleSource[x].source; - 1 != source.indexOf("encrypt:") && (obj.subtitleSource[x].source = atob(source.substr(8)))
                            }
                    }
                    obj.dataAdvertisementOnPauseSource = obj_ar[i]["@attributes"]["data-advertisement-on-pause-source"], obj.scrubAtTimeAtFirstPlay = obj_ar[i]["@attributes"]["data-scrub-at-time-at-first-play"], obj.scrubAtTimeAtFirstPlay && /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g.test(obj.scrubAtTimeAtFirstPlay) && (obj.scrubAtTimeAtFirstPlay = FWDUVPUtils.getSecondsFromString(obj.scrubAtTimeAtFirstPlay)), obj.downloadPath = obj.videoSource[obj.startAtVideo], obj.downloadable = "yes" == obj_ar[i]["@attributes"]["data-downloadable"], -1 == obj.videoSource[0].source.indexOf(".") && (obj.downloadable = !1), obj.posterSource = encodeURI(obj_ar[i]["@attributes"]["data-poster-source"]), obj.thumbSource = obj_ar[i]["@attributes"]["data-thumb-source"], obj.title = obj_ar[i]["@attributes"]["data-title"], obj.titleText = obj_ar[i]["@attributes"]["data-title"], obj.desc = obj_ar[i]["@attributes"]["data-desc"], obj.gaStr = obj.titleText, obj_ar[i]["@attributes"]["data-ads-source"] && (adsObj = {}, adsObj.source = FWDUVPUtils.getValidSource(obj_ar[i]["@attributes"]["data-ads-source"]), adsObj.pageToOpen = obj_ar[i]["@attributes"]["data-ads-page-to-open-url"], adsObj.pageTarget = obj_ar[i]["@attributes"]["data-ads-page-target"] || "_blank", adsObj.timeToHoldAds = obj_ar[i]["@attributes"]["data-time-to-hold-ads"] || 0, obj.ads = adsObj), obj_ar[i]["@attributes"]["data-cuepoints"] && (adsObj = {}, adsObj.timeStart = obj_ar[i]["@attributes"]["data-time-start"], adsObj.javascriptCall = obj_ar[i]["@attributes"]["data-javascript-call"], adsObj.isPlayed_bl = !1, obj.cuepoints_ar = adsObj), self.playlist_ar[i] = obj
                }
                self.randomizePlaylist_bl && (self.playlist_ar = FWDUVPUtils.randomizeArray(self.playlist_ar)), self.maxPlaylistItems < self.playlist_ar.length && (self.playlist_ar = self.playlist_ar.splice(0, self.maxPlaylistItems)), clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                }, 50), self.isDataLoaded_bl = !0
            }, this.setVastSource = function(e, t) {
                if (!self.vastLoaded_bl) {
                    self.vastScript = document.createElement("script");
                    self.scripts[self.countLoadedSCript];
                    return document.head.appendChild(self.vastScript), self.vastScript.src = self.mainFolderPath_str + "java/FWDUVPVast.js", self.vastScript.onload = function() {
                        FWDUVPVast.setPrototype(), self.vast = new FWDUVPVast(self), self.vast.setSource(e, t)
                    }, self.vastScript.onerror = function(e) {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: 'VAST js plugin named <font color="#FF0000">FWDUVPVast.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDUVPVast.js</font> file. '
                        })
                    }, void(self.vastLoaded_bl = !0)
                }
                self.vast.setSource(e)
            }, this.closeVast = function() {
                self.vast && self.vast.closeVast()
            }, this.fixVmapTimes = function(e, t, s, o) {
                self.vast && self.vast.fixVmapTimes(e, t, s, o)
            }, this.resetVastId = function() {
                self.vast && (self.vast.id = -1)
            }, self.showPropertyError = function(e) {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "The property called <font color='#FF0000'>" + e + "</font> is not defined."
                })
            }, this.stopToLoadPlaylist = function() {
                self.closeJsonPLoader();
                try {
                    self.scs_el.src = null, document.documentElement.removeChild(self.scs_el), self.scs_el = null
                } catch (e) {}
                if (null != self.xhr) {
                    try {
                        self.xhr.abort()
                    } catch (e) {}
                    self.xhr.onreadystatechange = null, self.xhr.onerror = null, self.xhr = null
                }
            }, self.showPropertyError = function(e) {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "The property called <font color='#ff0000'>" + e + "</font> is not defined."
                })
            }, self.init()
        };
        FWDUVPData.setPrototype = function() {
            FWDUVPData.prototype = new FWDUVPEventDispatcher
        }, FWDUVPData.prototype = null, FWDUVPData.VAST_LOADING = "vastLoading", FWDUVPData.VAST_LOADED = "vastLoaded", FWDUVPData.PLAYLIST_LOAD_COMPLETE = "playlistLoadComplete", FWDUVPData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone", FWDUVPData.LOAD_DONE = "onLoadDone", FWDUVPData.LOAD_ERROR = "onLoadError", FWDUVPData.IMAGE_LOADED = "onImageLoaded", FWDUVPData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete", FWDUVPData.SKIN_PROGRESS = "onSkinProgress", FWDUVPData.IMAGES_PROGRESS = "onImagesPogress", FWDUVPData.IMA_READY = "imaReady", FWDUVPData.IMA_ERROR = "ima_error", window.FWDUVPData = FWDUVPData
    }(window), window.FWDUVPDisplayObject = function(e, t, s, o) {
        var i = this;
        i.listeners = {
            events_ar: []
        }, i.type = e, this.children_ar = [], this.style, this.screen, this.transform, this.position = t || "absolute", this.overflow = s || "hidden", this.display = o || "inline-block", this.visible = !0, this.buttonMode, this.x = 0, this.y = 0, this.w = 0, this.h = 0, this.rect, this.alpha = 1, this.innerHTML = "", this.opacityType = "", this.isHtml5_bl = !1, this.hasTransform3d_bl = FWDUVPUtils.hasTransform3d, this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d, (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) && (i.hasTransform3d_bl = !1), (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) && (i.hasTransform2d_bl = !1), this.hasBeenSetSelectable_bl = !1, i.init = function() {
            i.setScreen()
        }, i.getTransform = function() {
            for (var e, t = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"]; e = t.shift();)
                if (void 0 !== i.screen.style[e]) return e;
            return !1
        }, i.getOpacityType = function() {
            return void 0 !== i.screen.style.opacity ? "opacity" : "filter"
        }, i.setScreen = function(e) {
            "img" == i.type && e ? (i.screen = null, i.screen = e) : i.screen = document.createElement(i.type), i.setMainProperties()
        }, i.setMainProperties = function() {
            i.transform = i.getTransform(), i.setPosition(i.position), i.setOverflow(i.overflow), i.opacityType = i.getOpacityType(), "opacity" == i.opacityType && (i.isHtml5_bl = !0), "filter" == i.opacityType && (i.screen.style.filter = "inherit"), i.screen.style.left = "0px", i.screen.style.top = "0px", i.screen.style.margin = "0px", i.screen.style.padding = "0px", i.screen.style.maxWidth = "none", i.screen.style.maxHeight = "none", i.screen.style.border = "none", i.screen.style.lineHeight = "1", i.screen.style.backfaceVisibility = "hidden", i.screen.style.webkitBackfaceVisibility = "hidden", i.screen.style.MozBackfaceVisibility = "hidden", "img" == e && (i.setWidth(i.screen.width), i.setHeight(i.screen.height))
        }, i.setBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "visible", i.screen.style.webkitBackfaceVisibility = "visible", i.screen.style.MozBackfaceVisibility = "visible"
        }, i.setSelectable = function(e) {
            e ? (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE ? (i.screen.style.userSelect = "element", i.screen.style.MozUserSelect = "element", i.screen.style.msUserSelect = "element") : FWDUVPUtils.isSafari ? (i.screen.style.userSelect = "text", i.screen.style.webkitUserSelect = "text") : (i.screen.style.userSelect = "auto", i.screen.style.webkitUserSelect = "auto"), i.screen.style.khtmlUserSelect = "auto", i.screen.style.oUserSelect = "auto", FWDUVPUtils.isIEAndLessThen9 ? (i.screen.ondragstart = null, i.screen.onselectstart = null, i.screen.ontouchstart = null) : (i.screen.ondragstart = void 0, i.screen.onselectstart = void 0, i.screen.ontouchstart = void 0), i.screen.style.webkitTouchCallout = "default", i.hasBeenSetSelectable_bl = !1) : (i.screen.style.userSelect = "none", i.screen.style.MozUserSelect = "none", i.screen.style.webkitUserSelect = "none", i.screen.style.khtmlUserSelect = "none", i.screen.style.oUserSelect = "none", i.screen.style.msUserSelect = "none", i.screen.msUserSelect = "none", i.screen.ondragstart = function(e) {
                return !1
            }, i.screen.onselectstart = function() {
                return !1
            }, i.screen.ontouchstart = function() {
                return !1
            }, i.screen.style.webkitTouchCallout = "none", i.hasBeenSetSelectable_bl = !0)
        }, i.getScreen = function() {
            return i.screen
        }, i.setVisible = function(e) {
            i.visible = e, 1 == i.visible ? i.screen.style.visibility = "visible" : i.screen.style.visibility = "hidden"
        }, i.getVisible = function() {
            return i.visible
        }, i.setResizableSizeAfterParent = function() {
            i.screen.style.width = "100%", i.screen.style.height = "100%"
        }, i.getStyle = function() {
            return i.screen.style
        }, i.setOverflow = function(e) {
            i.overflow = e, i.screen.style.overflow = i.overflow
        }, i.setPosition = function(e) {
            i.position = e, i.screen.style.position = i.position
        }, i.setDisplay = function(e) {
            i.display = e, i.screen.style.display = i.display
        }, i.setButtonMode = function(e) {
            i.buttonMode = e, 1 == i.buttonMode ? i.screen.style.cursor = "pointer" : i.screen.style.cursor = "default"
        }, i.setBkColor = function(e) {
            i.screen.style.backgroundColor = e
        }, i.setInnerHTML = function(e) {
            i.innerHTML = e, i.screen.innerHTML = i.innerHTML
        }, i.getInnerHTML = function() {
            return i.innerHTML
        }, i.getRect = function() {
            return i.screen.getBoundingClientRect()
        }, i.setAlpha = function(e) {
            i.alpha = e, "opacity" == i.opacityType ? i.screen.style.opacity = i.alpha : "filter" == i.opacityType && (i.screen.style.filter = "alpha(opacity=" + 100 * i.alpha + ")", i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(100 * i.alpha) + ")")
        }, i.getAlpha = function() {
            return i.alpha
        }, i.getRect = function() {
            return i.screen.getBoundingClientRect()
        }, i.getGlobalX = function() {
            return i.getRect().left
        }, i.getGlobalY = function() {
            return i.getRect().top
        }, i.setX = function(e) {
            i.x = e, i.hasTransform3d_bl ? i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)" : i.hasTransform2d_bl ? i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)" : i.screen.style.left = i.x + "px"
        }, i.getX = function() {
            return i.x
        }, i.setY = function(e) {
            i.y = e, i.hasTransform3d_bl ? i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)" : i.hasTransform2d_bl ? i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)" : i.screen.style.top = i.y + "px"
        }, i.getY = function() {
            return i.y
        }, i.setWidth = function(e) {
            i.w = e, "img" == i.type && (i.screen.width = i.w), i.screen.style.width = i.w + "px"
        }, i.getWidth = function() {
            return "div" == i.type || "input" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : i.w : "img" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : 0 != i.screen.width ? i.screen.width : i._w : "canvas" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : i.w : void 0
        }, i.setHeight = function(e) {
            i.h = e, "img" == i.type && (i.screen.height = i.h), i.screen.style.height = i.h + "px"
        }, i.getHeight = function() {
            return "div" == i.type || "input" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : i.h : "img" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : 0 != i.screen.height ? i.screen.height : i.h : "canvas" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : i.h : void 0
        }, i.addChild = function(e) {
            i.contains(e) && i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1), i.children_ar.push(e), i.screen.appendChild(e.screen)
        }, i.removeChild = function(e) {
            if (!i.contains(e)) throw Error("##removeChild()## Child dose't exist, it can't be removed!");
            i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1), i.screen.removeChild(e.screen)
        }, i.contains = function(e) {
            return -1 != FWDUVPUtils.indexOfArray(i.children_ar, e)
        }, i.addChildAt = function(e, t) {
            if (0 == i.getNumChildren()) i.children_ar.push(e), i.screen.appendChild(e.screen);
            else if (1 == t) i.screen.insertBefore(e.screen, i.children_ar[0].screen), i.screen.insertBefore(i.children_ar[0].screen, e.screen), i.contains(e) ? i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1, e) : i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 0, e);
            else {
                if (t < 0 || t > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                i.screen.insertBefore(e.screen, i.children_ar[t].screen), i.contains(e) ? i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1, e) : i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 0, e)
            }
        }, i.getChildAt = function(e) {
            if (e < 0 || e > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (0 == i.getNumChildren()) throw Error("##getChildAt## Child dose not exist!");
            return i.children_ar[e]
        }, i.getChildIndex = function(e) {
            return i.contains(e) ? FWDUVPUtils.indexOfArray(i.children_ar, e) : 0
        }, i.removeChildAtZero = function() {
            i.screen.removeChild(i.children_ar[0].screen), i.children_ar.shift()
        }, i.getNumChildren = function() {
            return i.children_ar.length
        }, i.addListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function.");
            var s = {};
            s.type = e, s.listener = t, (s.target = this).listeners.events_ar.push(s)
        }, i.dispatchEvent = function(e, t) {
            if (null != this.listeners) {
                if (null == e) throw Error("type is required.");
                if ("object" == typeof e) throw Error("type must be of type String.");
                for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                    if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e) {
                        if (t)
                            for (var i in t) this.listeners.events_ar[s][i] = t[i];
                        this.listeners.events_ar[s].listener.call(this, this.listeners.events_ar[s])
                    }
            }
        }, i.removeListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function." + e);
            for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e && this.listeners.events_ar[s].listener === t) {
                    this.listeners.events_ar.splice(s, 1);
                    break
                }
        }, i.disposeImage = function() {
            "img" == i.type && (i.screen.src = null)
        }, i.destroy = function() {
            i.hasBeenSetSelectable_bl && (i.screen.ondragstart = null, i.screen.onselectstart = null, i.screen.ontouchstart = null), i.screen.removeAttribute("style"), i.listeners = [], i.listeners = null, i.children_ar = [], i.children_ar = null, i.style = null, i.screen = null, i.transform = null, i.position = null, i.overflow = null, i.display = null, i.visible = null, i.buttonMode = null, i.x = null, i.y = null, i.w = null, i.h = null, i.rect = null, i.alpha = null, i.innerHTML = null, i.opacityType = null, i.isHtml5_bl = null, i.hasTransform3d_bl = null, i.hasTransform2d_bl = null, i = null
        }, i.init()
    }, void 0 === asual) var asual = {};
void 0 === asual.util && (asual.util = {}), asual.util.Browser = new function() {
    var e = navigator.userAgent.toLowerCase(),
        t = /webkit/.test(e),
        s = /opera/.test(e),
        o = /msie/.test(e) && !/opera/.test(e),
        i = /mozilla/.test(e) && !/(compatible|webkit)/.test(e),
        l = parseFloat(o ? e.substr(e.indexOf("msie") + 4) : (e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function() {
        return "[class Browser]"
    }, this.getVersion = function() {
        return l
    }, this.isMSIE = function() {
        return o
    }, this.isSafari = function() {
        return t
    }, this.isOpera = function() {
        return s
    }, this.isMozilla = function() {
        return i
    }
}, asual.util.Events = new function() {
    var l = "DOMContentLoaded",
        t = "onstop",
        s = window,
        o = document,
        n = [],
        i = asual.util,
        e = i.Browser,
        a = e.isMSIE(),
        r = e.isSafari();
    this.toString = function() {
        return "[class Events]"
    }, this.addListener = function(e, t, s) {
        n.push({
            o: e,
            t: t,
            l: s
        }), t == l && (a || r) || (e.addEventListener ? e.addEventListener(t, s, !1) : e.attachEvent && e.attachEvent("on" + t, s))
    }, this.removeListener = function(e, t, s) {
        for (var o, i = 0; o = n[i]; i++)
            if (o.o == e && o.t == t && o.l == s) {
                n.splice(i, 1);
                break
            } t == l && (a || r) || (e.removeEventListener ? e.removeEventListener(t, s, !1) : e.detachEvent && e.detachEvent("on" + t, s))
    };

    function d() {
        for (var e, t = 0; e = n[t]; t++) e.t != l && i.Events.removeListener(e.o, e.t, e.l)
    }(a || r) && function() {
        try {
            (a && o.body || !/loaded|complete/.test(o.readyState)) && o.documentElement.doScroll("left")
        } catch (e) {
            return setTimeout(arguments.callee, 0)
        }
        for (var e, t = 0; e = n[t]; t++) e.t == l && e.l.call(null)
    }(), a && s.attachEvent && s.attachEvent("onbeforeunload", function() {
        if ("interactive" == o.readyState) {
            function e() {
                o.detachEvent(t, e), d()
            }
            o.attachEvent(t, e), s.setTimeout(function() {
                o.detachEvent(t, e)
            }, 0)
        }
    }), this.addListener(s, "unload", d)
}, asual.util.Functions = new function() {
    this.toString = function() {
        return "[class Functions]"
    }, this.bind = function(e, t, s) {
        for (var o, i = 2, l = []; o = arguments[i]; i++) l.push(o);
        return function() {
            return e.apply(t, l)
        }
    }
};
var FWDUVPAddressEvent = function(e) {
    this.toString = function() {
        return "[object FWDUVPAddressEvent]"
    }, this.type = e, this.target = [FWDUVPAddress][0], this.value = FWDUVPAddress.getValue(), this.path = FWDUVPAddress.getPath(), this.pathNames = FWDUVPAddress.getPathNames(), this.parameters = {};
    for (var t = FWDUVPAddress.getParameterNames(), s = 0, o = t.length; s < o; s++) this.parameters[t[s]] = FWDUVPAddress.getParameter(t[s]);
    this.parameterNames = t
};
FWDUVPAddressEvent.INIT = "init", FWDUVPAddressEvent.CHANGE = "change", FWDUVPAddressEvent.INTERNAL_CHANGE = "internalChange", FWDUVPAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDUVPAddress = new function() {
    var _getHash = function() {
            var e = _l.href.indexOf("#");
            return -1 != e ? _ec(_dc(_l.href.substr(e + 1))) : ""
        },
        _getWindow = function() {
            try {
                return top.document, top
            } catch (e) {
                return window
            }
        },
        _strictCheck = function(e, t) {
            return _opts.strict && (e = t ? "/" != e.substr(0, 1) ? "/" + e : e : "" == e ? "/" : e), e
        },
        _ieLocal = function(e, t) {
            return _msie && "file:" == _l.protocol ? t ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?") : e
        },
        _searchScript = function(e) {
            if (e.childNodes)
                for (var t, s = 0, o = e.childNodes.length; s < o; s++)
                    if (e.childNodes[s].src && (_url = String(e.childNodes[s].src)), t = _searchScript(e.childNodes[s])) return t
        },
        _titleCheck = function() {
            _d.title != _title && -1 != _d.title.indexOf("#") && (_d.title = _title)
        },
        _listen = function() {
            if (!_silent) {
                var e = _getHash(),
                    t = !(_value == e);
                _safari && _version < 523 ? _length != _h.length && (_length = _h.length, typeof _stack[_length - 1] != UNDEFINED && (_value = _stack[_length - 1]), _update.call(this, !1)) : _msie && t ? _version < 7 ? _l.reload() : this.setValue(e) : t && (_value = e, _update.call(this, !1)), _msie && _titleCheck.call(this)
            }
        },
        _bodyClick = function(e) {
            if (0 < _popup.length) {
                var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
                typeof _popup[3] != UNDEFINED && eval(_popup[3])
            }
            _popup = []
        },
        _swfChange = function() {
            for (var e, t, s = 0, o = FWDUVPAddress.getValue(), i = "setFWDUVPAddressValue"; e = _ids[s]; s++)
                if (t = document.getElementById(e))
                    if (t.parentNode && typeof t.parentNode.so != UNDEFINED) t.parentNode.so.call(i, o);
                    else {
                        if (!t || typeof t[i] == UNDEFINED) {
                            var l = t.getElementsByTagName("object"),
                                n = t.getElementsByTagName("embed");
                            t = l[0] && typeof l[0][i] != UNDEFINED ? l[0] : n[0] && typeof n[0][i] != UNDEFINED ? n[0] : null
                        }
                        t && t[i](o)
                    }
            else(t = document[e]) && typeof t[i] != UNDEFINED && t[i](o)
        },
        _jsDispatch = function(e) {
            this.dispatchEvent(new FWDUVPAddressEvent(e)), typeof this["on" + (e = e.substr(0, 1).toUpperCase() + e.substr(1))] == FUNCTION && this["on" + e]()
        },
        _jsInit = function() {
            _util.Browser.isSafari() && _d.body.addEventListener("click", _bodyClick), _jsDispatch.call(this, "init")
        },
        _jsChange = function() {
            _swfChange(), _jsDispatch.call(this, "change")
        },
        _update = function(e) {
            _jsChange.call(this), e ? _jsDispatch.call(this, "internalChange") : _jsDispatch.call(this, "externalChange"), _st(_functions.bind(_track, this), 10)
        },
        _track = function() {
            var e = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, ""),
                t = _t[_opts.tracker];
            typeof t == FUNCTION ? t(e) : typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION ? _t.pageTracker._trackPageview(e) : typeof _t.urchinTracker == FUNCTION && _t.urchinTracker(e)
        },
        _htmlWrite = function() {
            var e = _frame.contentWindow.document;
            e.open(), e.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";<\/script></head></html>'), e.close()
        },
        _htmlLoad = function() {
            var e = _frame.contentWindow;
            e.location.href;
            (_value = typeof e[ID] != UNDEFINED ? e[ID] : "") != _getHash() && (_update.call(FWDUVPAddress, !1), _l.hash = _ieLocal(_value, TRUE))
        },
        _load = function() {
            if (!_loaded) {
                if (_loaded = TRUE, _msie && _version < 8) {
                    var e = _d.getElementsByTagName("frameset")[0];
                    _frame = _d.createElement((e ? "" : "i") + "frame"), e ? (e.insertAdjacentElement("beforeEnd", _frame), e[e.cols ? "cols" : "rows"] += ",0", _frame.src = "javascript:false", _frame.noResize = !0, _frame.frameBorder = _frame.frameSpacing = 0) : (_frame.src = "javascript:false", _frame.style.display = "none", _d.body.insertAdjacentElement("afterBegin", _frame)), _st(function() {
                        _events.addListener(_frame, "load", _htmlLoad), typeof _frame.contentWindow[ID] == UNDEFINED && _htmlWrite()
                    }, 50)
                } else _safari && (_version < 418 && (_d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>', _form = _d.getElementById(ID)), typeof _l[ID] == UNDEFINED && (_l[ID] = {}), typeof _l[ID][_l.pathname] != UNDEFINED && (_stack = _l[ID][_l.pathname].split(",")));
                _st(_functions.bind(function() {
                    _jsInit.call(this), _jsChange.call(this), _track.call(this)
                }, this), 1), _msie && 8 <= _version ? (_d.body.onhashchange = _functions.bind(_listen, this), _si(_functions.bind(_titleCheck, this), 50)) : _si(_functions.bind(_listen, this), 50)
            }
        },
        ID = "swfaddress",
        FUNCTION = "function",
        UNDEFINED = "undefined",
        TRUE = !0,
        FALSE = !1,
        _util = asual.util,
        _browser = _util.Browser,
        _events = _util.Events,
        _functions = _util.Functions,
        _version = _browser.getVersion(),
        _msie = _browser.isMSIE(),
        _mozilla = _browser.isMozilla(),
        _opera = _browser.isOpera(),
        _safari = _browser.isSafari(),
        _supported = FALSE,
        _t = _getWindow(),
        _d = _t.document,
        _h = _t.history,
        _l = _t.location,
        _si = setInterval,
        _st = setTimeout,
        _dc = decodeURI,
        _ec = encodeURI,
        _frame, _form, _url, _title = _d.title,
        _length = _h.length,
        _silent = FALSE,
        _loaded = FALSE,
        _justset = TRUE,
        _juststart = TRUE,
        _ref = this,
        _stack = [],
        _ids = [],
        _popup = [],
        _listeners = {},
        _value = _getHash(),
        _opts = {
            history: TRUE,
            strict: TRUE
        };
    if (_msie && _d.documentMode && _d.documentMode != _version && (_version = 8 != _d.documentMode ? 7 : 8), _supported = _mozilla && 1 <= _version || _msie && 6 <= _version || _opera && 9.5 <= _version || _safari && 312 <= _version, _supported) {
        _opera && (history.navigationMode = "compatible");
        for (var i = 1; i < _length; i++) _stack.push("");
        _stack.push(_getHash()), _msie && _l.hash != _getHash() && (_l.hash = "#" + _ieLocal(_getHash(), TRUE)), _searchScript(document);
        var _qi = _url ? _url.indexOf("?") : -1;
        if (-1 != _qi)
            for (var param, params = _url.substr(_qi + 1).split("&"), i = 0, p; p = params[i]; i++) param = p.split("="), /^(history|strict)$/.test(param[0]) && (_opts[param[0]] = isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : 0 != parseInt(param[1])), /^tracker$/.test(param[0]) && (_opts[param[0]] = param[1]);
        _msie && _titleCheck.call(this), window == _t && _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this)), _events.addListener(_t, "load", _functions.bind(_load, this))
    } else !_supported && -1 != _l.href.indexOf("#") || _safari && _version < 418 && -1 != _l.href.indexOf("#") && "" != _l.search ? (_d.open(), _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>'), _d.close()) : _track();
    this.toString = function() {
            return "[class FWDUVPAddress]"
        }, this.back = function() {
            _h.back()
        }, this.forward = function() {
            _h.forward()
        }, this.up = function() {
            var e = this.getPath();
            this.setValue(e.substr(0, e.lastIndexOf("/", e.length - 2) + ("/" == e.substr(e.length - 1) ? 1 : 0)))
        }, this.go = function(e) {
            _h.go(e)
        }, this.href = function(e, t) {
            "_self" == (t = typeof t != UNDEFINED ? t : "_self") ? self.location.href = e: "_top" == t ? _l.href = e : "_blank" == t ? window.open(e) : _t.frames[t].location.href = e
        }, this.popup = function(url, name, options, handler) {
            try {
                var popup = window.open(url, name, eval(options));
                typeof handler != UNDEFINED && eval(handler)
            } catch (e) {}
            _popup = arguments
        }, this.getIds = function() {
            return _ids
        }, this.getId = function(e) {
            return _ids[0]
        }, this.setId = function(e) {
            _ids[0] = e
        }, this.addId = function(e) {
            this.removeId(e), _ids.push(e)
        }, this.removeId = function(e) {
            for (var t = 0; t < _ids.length; t++)
                if (e == _ids[t]) {
                    _ids.splice(t, 1);
                    break
                }
        }, this.addEventListener = function(e, t) {
            typeof _listeners[e] == UNDEFINED && (_listeners[e] = []), _listeners[e].push(t)
        }, this.removeEventListener = function(e, t) {
            if (typeof _listeners[e] != UNDEFINED) {
                for (var s, o = 0;
                    (s = _listeners[e][o]) && s != t; o++);
                _listeners[e].splice(o, 1)
            }
        }, this.dispatchEvent = function(e) {
            if (this.hasEventListener(e.type)) {
                e.target = this;
                for (var t, s = 0; t = _listeners[e.type][s]; s++) t(e);
                return TRUE
            }
            return FALSE
        }, this.hasEventListener = function(e) {
            return typeof _listeners[e] != UNDEFINED && 0 < _listeners[e].length
        }, this.getBaseURL = function() {
            var e = _l.href;
            return -1 != e.indexOf("#") && (e = e.substr(0, e.indexOf("#"))), "/" == e.substr(e.length - 1) && (e = e.substr(0, e.length - 1)), e
        }, this.getStrict = function() {
            return _opts.strict
        }, this.setStrict = function(e) {
            _opts.strict = e
        }, this.getHistory = function() {
            return _opts.history
        }, this.setHistory = function(e) {
            _opts.history = e
        }, this.getTracker = function() {
            return _opts.tracker
        }, this.setTracker = function(e) {
            _opts.tracker = e
        }, this.getTitle = function() {
            return _d.title
        }, this.setTitle = function(e) {
            if (!_supported) return null;
            typeof e != UNDEFINED && ("null" == e && (e = ""), e = _dc(e), _st(function() {
                _title = _d.title = e, _juststart && _frame && _frame.contentWindow && _frame.contentWindow.document && (_frame.contentWindow.document.title = e, _juststart = FALSE), !_justset && _mozilla && _l.replace(-1 != _l.href.indexOf("#") ? _l.href : _l.href + "#"), _justset = FALSE
            }, 10))
        }, this.getStatus = function() {
            return _t.status
        }, this.setStatus = function(e) {
            if (!_supported) return null;
            if (typeof e != UNDEFINED && ("null" == e && (e = ""), e = _dc(e), !_safari)) {
                if ("/" == (e = _strictCheck("null" != e ? e : "", TRUE)) && (e = ""), !/http(s)?:\/\//.test(e)) {
                    var t = _l.href.indexOf("#");
                    e = (-1 == t ? _l.href : _l.href.substr(0, t)) + "#" + e
                }
                _t.status = e
            }
        }, this.resetStatus = function() {
            _t.status = ""
        }, this.getValue = function() {
            return _supported ? _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE)) : null
        }, this.setValue = function(e) {
            if (!_supported) return null;
            typeof e != UNDEFINED && ("null" == e && (e = ""), "/" == (e = _ec(_dc(_strictCheck(e, TRUE)))) && (e = ""), _value != e && (_value = e, _silent = _justset = TRUE, _update.call(FWDUVPAddress, !0), (_stack[_h.length] = _value) != _getHash() && (_opts.history ? _l.hash = "#" + _dc(_ieLocal(_value, TRUE)) : _l.replace("#" + _dc(_value))), _msie && _version < 8 && _opts.history && _st(_htmlWrite, 50), _safari ? _st(function() {
                _silent = FALSE
            }, 1) : _silent = FALSE))
        }, this.getPath = function() {
            var e = this.getValue();
            return -1 != e.indexOf("?") ? e.split("?")[0] : -1 != e.indexOf("#") ? e.split("#")[0] : e
        }, this.getPathNames = function() {
            var e = this.getPath(),
                t = e.split("/");
            return "/" != e.substr(0, 1) && 0 != e.length || t.splice(0, 1), "/" == e.substr(e.length - 1, 1) && t.splice(t.length - 1, 1), t
        }, this.getQueryString = function() {
            var e = this.getValue(),
                t = e.indexOf("?");
            if (-1 != t && t < e.length) return e.substr(t + 1)
        }, this.getParameter = function(e) {
            var t = this.getValue(),
                s = t.indexOf("?");
            if (-1 != s) {
                for (var o, i = (t = t.substr(s + 1)).split("&"), l = i.length, n = []; l--;)(o = i[l].split("="))[0] == e && n.push(o[1]);
                if (0 != n.length) return 1 != n.length ? n : n[0]
            }
        }, this.getParameterNames = function() {
            var e = this.getValue(),
                t = e.indexOf("?"),
                s = [];
            if (-1 != t && "" != (e = e.substr(t + 1)) && -1 != e.indexOf("="))
                for (var o = e.split("&"), i = 0; i < o.length;) s.push(o[i].split("=")[0]), i++;
            return s
        }, this.onInit = null, this.onChange = null, this.onInternalChange = null, this.onExternalChange = null,
        function() {
            var s;
            if (typeof FlashObject != UNDEFINED && (SWFObject = FlashObject), typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
                var t = SWFObject.prototype.write;
                SWFObject.prototype.write = function() {
                    var e;
                    return s = arguments, this.getAttribute("version").major < 8 && (this.addVariable("$swfaddress", FWDUVPAddress.getValue()), ("string" == typeof s[0] ? document.getElementById(s[0]) : s[0]).so = this), (e = t.apply(this, s)) && _ref.addId(this.getAttribute("id")), e
                }
            }
            if (typeof swfobject != UNDEFINED) {
                var e = swfobject.registerObject;
                swfobject.registerObject = function() {
                    s = arguments, e.apply(this, s), _ref.addId(s[0])
                };
                var o = swfobject.createSWF;
                swfobject.createSWF = function() {
                    s = arguments;
                    var e = o.apply(this, s);
                    return e && _ref.addId(s[0].id), e
                };
                var i = swfobject.embedSWF;
                swfobject.embedSWF = function() {
                    typeof(s = arguments)[8] == UNDEFINED && (s[8] = {}), typeof s[8].id == UNDEFINED && (s[8].id = s[1]), i.apply(this, s), _ref.addId(s[8].id)
                }
            }
            if (typeof UFO != UNDEFINED) {
                var l = UFO.create;
                UFO.create = function() {
                    s = arguments, l.apply(this, s), _ref.addId(s[0].id)
                }
            }
            if (typeof AC_FL_RunContent != UNDEFINED) {
                var n = AC_FL_RunContent;
                AC_FL_RunContent = function() {
                    s = arguments, n.apply(this, s);
                    for (var e = 0, t = s.length; e < t; e++) "id" == s[e] && _ref.addId(s[e + 1])
                }
            }
        }()
};
! function(o) {
    var s = function(e, n) {
        var r = this;
        s.prototype;

        function t(e) {
            var t, s;
            o.top != o && FWDEVPUtils.isIE || (e = e || this, document.body.createTextRange ? ((t = document.body.createTextRange()).moveToElementText(e), t.select()) : o.getSelection && document.createRange && (s = o.getSelection(), (t = document.createRange()).selectNodeContents(e), s.removeAllRanges(), s.addRange(t)))
        }
        this.xhr = null, this.embedColoseN_img = e.embedColoseN_img, this.bk_do = null, this.mainHld = null, this.mainLbl = null, this.lnkAndEbdHldBk = null, this.linkTxt = null, this.linkLbl = null, this.embdTxt = null, this.embedLbl = null, this.linkAndEmbedHld = null, this.copyLinkBtn = null, this.copyEmbedBtn = null, this.infoText_do = null, this.sendMainHld = null, this.sendMainHldBk = null, this.sendMainLbl = null, this.yourEmailLabel_do = null, this.yourEmailInpt = null, this.friendEmailLbl = null, this.friendEmailInpt = null, this.clsBtn = null, this.useHEX = e.useHEX, this.nBC = e.nBC, this.sBC = e.sBC, this.videoLink_str = null, this.embedWindowBackground_str = e.embedWindowBackground_str, this.embedWindowInputBackgroundPath_str = e.embedWindowInputBackgroundPath_str, this.secondaryLabelsColor_str = e.secondaryLabelsColor_str, this.inputColor_str = e.inputColor_str, this.mainLabelsColor_str = e.mainLabelsColor_str, this.sendButtonNPath_str = e.sendButtonNPath_str, this.sendButtonSPath_str = e.sendButtonSPath_str, this.inputBackgroundColor_str = e.inputBackgroundColor_str, this.borderColor_str = e.borderColor_str, this.sendToAFriendPath_str = e.sendToAFriendPath_str, this.maxTextWidth = 0, this.totalWidth = 0, this.sW = 0, this.sH = 0, this.buttonWidth = 44, this.buttonHeight = 19, this.embedWindowCloseButtonMargins = e.embedWindowCloseButtonMargins, this.finalEmbedPath_str = null, this.finalEmbedCode_str = null, this.linkToVideo_str = null, this.shareAndEmbedTextColor_str = e.shareAndEmbedTextColor_str, this.isSending_bl = !1, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, r.useVectorIcons_bl = e.useVectorIcons_bl, this.init = function() {
            r.clsBtn || (-1 != e.sknPth.indexOf("hex_white") && (r.sBC = "#FFFFFF"), r.setBackfaceVisibility(), r.mainHld = new FWDUVPDisplayObject("div"), r.bk_do = new FWDUVPDisplayObject("div"), r.bk_do.getStyle().width = "100%", r.bk_do.getStyle().height = "100%", r.bk_do.setAlpha(.9), r.bk_do.getStyle().background = "url('" + r.embedWindowBackground_str + "')", r.linkAndEmbedHld = new FWDUVPDisplayObject("div"), r.lnkAndEbdHldBk = new FWDUVPDisplayObject("div"), r.lnkAndEbdHldBk.getStyle().background = "url('" + r.embedWindowBackground_str + "')", r.lnkAndEbdHldBk.getStyle().borderStyle = "solid", r.lnkAndEbdHldBk.getStyle().borderWidth = "1px", r.lnkAndEbdHldBk.getStyle().borderColor = r.borderColor_str, r.mainLbl = new FWDUVPDisplayObject("div"), r.mainLbl.setBackfaceVisibility(), r.mainLbl.getStyle().fontFamily = "Arial", r.mainLbl.getStyle().fontSize = "12px", r.mainLbl.getStyle().color = r.mainLabelsColor_str, r.mainLbl.getStyle().whiteSpace = "nowrap", r.mainLbl.getStyle().fontSmoothing = "antialiased", r.mainLbl.getStyle().webkitFontSmoothing = "antialiased", r.mainLbl.getStyle().textRendering = "optimizeLegibility", r.mainLbl.getStyle().padding = "0px", r.mainLbl.screen.className = "UVP-main-label", r.mainLbl.setInnerHTML("SHARE & EMBED"), r.linkLbl = new FWDUVPDisplayObject("div"), r.linkLbl.screen.className = "UVP-secnd-label", r.linkLbl.setBackfaceVisibility(), r.linkLbl.getStyle().fontFamily = "Arial", r.linkLbl.getStyle().fontSize = "12px", r.linkLbl.getStyle().color = r.secondaryLabelsColor_str, r.linkLbl.getStyle().whiteSpace = "nowrap", r.linkLbl.getStyle().fontSmoothing = "antialiased", r.linkLbl.getStyle().webkitFontSmoothing = "antialiased", r.linkLbl.getStyle().textRendering = "optimizeLegibility", r.linkLbl.getStyle().padding = "0px", r.linkLbl.setInnerHTML("Link to this video:"), r.linkTxt = new FWDUVPDisplayObject("div"), r.linkTxt.screen.className = "UVP-embed-inpt", r.linkTxt.setBackfaceVisibility(), r.linkTxt.getStyle().fontFamily = "Arial", r.linkTxt.getStyle().fontSize = "12px", r.linkTxt.getStyle().color = r.shareAndEmbedTextColor_str, FWDUVPUtils.isIEAndLessThen9 || (r.linkTxt.getStyle().wordBreak = "break-all"), r.linkTxt.getStyle().fontSmoothing = "antialiased", r.linkTxt.getStyle().webkitFontSmoothing = "antialiased", r.linkTxt.getStyle().textRendering = "optimizeLegibility", r.linkTxt.getStyle().padding = "6px", r.linkTxt.getStyle().paddingTop = "4px", r.linkTxt.getStyle().paddingBottom = "4px", r.linkTxt.getStyle().backgroundColor = r.inputBackgroundColor_str, r.linkTxt.screen.addEventListener("touchstart", function() {
                t(r.linkTxt.screen)
            }), r.embedLbl = new FWDUVPDisplayObject("div"), r.embedLbl.setBackfaceVisibility(), r.embedLbl.screen.className = "UVP-secnd-label", r.embedLbl.getStyle().fontFamily = "Arial", r.embedLbl.getStyle().fontSize = "12px", r.embedLbl.getStyle().color = r.secondaryLabelsColor_str, r.embedLbl.getStyle().whiteSpace = "nowrap", r.embedLbl.getStyle().fontSmoothing = "antialiased", r.embedLbl.getStyle().webkitFontSmoothing = "antialiased", r.embedLbl.getStyle().textRendering = "optimizeLegibility", r.embedLbl.getStyle().padding = "0px", r.embedLbl.setInnerHTML("Embed this video:"), r.embdTxt = new FWDUVPDisplayObject("div"), r.embdTxt.screen.className = "UVP-embed-inpt", r.embdTxt.setBackfaceVisibility(), FWDUVPUtils.isIEAndLessThen9 || (r.embdTxt.getStyle().wordBreak = "break-all"), r.embdTxt.getStyle().fontFamily = "Arial", r.embdTxt.getStyle().fontSize = "12px", r.embdTxt.getStyle().lineHeight = "16px", r.embdTxt.getStyle().color = r.shareAndEmbedTextColor_str, r.embdTxt.getStyle().fontSmoothing = "antialiased", r.embdTxt.getStyle().webkitFontSmoothing = "antialiased", r.embdTxt.getStyle().textRendering = "optimizeLegibility", r.embdTxt.getStyle().backgroundColor = r.inputBackgroundColor_str, r.embdTxt.getStyle().padding = "6px", r.embdTxt.getStyle().paddingTop = "4px", r.embdTxt.getStyle().paddingBottom = "4px", r.embdTxt.screen.addEventListener("touchstart", function() {
                t(r.embdTxt.screen)
            }), FWDUVPSimpleSizeButton.setPrototype(), r.copyLinkBtn = new FWDUVPSimpleSizeButton(e.embedCopyButtonNPath_str, e.embedCopyButtonSPath_str, r.buttonWidth, r.buttonHeight, e.useHEX, e.nBC, e.sBC, !0), r.copyLinkBtn.screen.style.position = "absolute", r.copyLinkBtn.addListener(FWDUVPSimpleSizeButton.CLICK, function() {
                r.copyToClipboard(r.linkTxt.screen)
            }), FWDUVPSimpleSizeButton.setPrototype(), r.copyEmbedBtn = new FWDUVPSimpleSizeButton(e.embedCopyButtonNPath_str, e.embedCopyButtonSPath_str, r.buttonWidth, r.buttonHeight, e.useHEX, e.nBC, e.sBC, !0), r.copyEmbedBtn.screen.style.position = "absolute", r.copyEmbedBtn.addListener(FWDUVPSimpleSizeButton.CLICK, function() {
                r.copyToClipboard(r.embdTxt.screen)
            }), r.sendMainHld = new FWDUVPDisplayObject("div"), r.sendMainHldBk = new FWDUVPDisplayObject("div"), r.sendMainHldBk.getStyle().background = "url('" + r.embedWindowBackground_str + "')", r.sendMainHldBk.getStyle().borderStyle = "solid", r.sendMainHldBk.getStyle().borderWidth = "1px", r.sendMainHldBk.getStyle().borderColor = r.borderColor_str, r.sendMainLbl = new FWDUVPDisplayObject("div"), r.sendMainLbl.setBackfaceVisibility(), r.sendMainLbl.getStyle().fontFamily = "Arial", r.sendMainLbl.getStyle().fontSize = "12px", r.sendMainLbl.getStyle().color = r.mainLabelsColor_str, r.sendMainLbl.getStyle().whiteSpace = "nowrap", r.sendMainLbl.getStyle().fontSmoothing = "antialiased", r.sendMainLbl.getStyle().webkitFontSmoothing = "antialiased", r.sendMainLbl.getStyle().textRendering = "optimizeLegibility", r.sendMainLbl.getStyle().padding = "0px", r.sendMainLbl.screen.className = "UVP-main-label", r.sendMainLbl.setInnerHTML("SEND TO A FRIEND"), r.yourEmailLabel_do = new FWDUVPDisplayObject("div"), r.yourEmailLabel_do.setBackfaceVisibility(), r.yourEmailLabel_do.screen.className = "UVP-secnd-label", r.yourEmailLabel_do.getStyle().fontFamily = "Arial", r.yourEmailLabel_do.getStyle().fontSize = "12px", r.yourEmailLabel_do.getStyle().color = r.secondaryLabelsColor_str, r.yourEmailLabel_do.getStyle().whiteSpace = "nowrap", r.yourEmailLabel_do.getStyle().fontSmoothing = "antialiased", r.yourEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased", r.yourEmailLabel_do.getStyle().textRendering = "optimizeLegibility", r.yourEmailLabel_do.getStyle().padding = "0px", r.yourEmailLabel_do.setInnerHTML("Your email:"), r.yourEmailInpt = new FWDUVPDisplayObject("input"), r.yourEmailInpt.screen.className = "UVP-embed-inpt", r.yourEmailInpt.setBackfaceVisibility(), r.yourEmailInpt.getStyle().fontFamily = "Arial", r.yourEmailInpt.getStyle().fontSize = "12px", r.yourEmailInpt.getStyle().backgroundColor = r.inputBackgroundColor_str, r.yourEmailInpt.getStyle().color = r.inputColor_str, r.yourEmailInpt.getStyle().outline = 0, r.yourEmailInpt.getStyle().whiteSpace = "nowrap", r.yourEmailInpt.getStyle().fontSmoothing = "antialiased", r.yourEmailInpt.getStyle().webkitFontSmoothing = "antialiased", r.yourEmailInpt.getStyle().textRendering = "optimizeLegibility", r.yourEmailInpt.getStyle().padding = "6px", r.yourEmailInpt.getStyle().paddingTop = "4px", r.yourEmailInpt.getStyle().paddingBottom = "4px", r.friendEmailLbl = new FWDUVPDisplayObject("div"), r.friendEmailLbl.setBackfaceVisibility(), r.friendEmailLbl.screen.className = "UVP-secnd-label", r.friendEmailLbl.getStyle().fontFamily = "Arial", r.friendEmailLbl.getStyle().fontSize = "12px", r.friendEmailLbl.getStyle().color = r.secondaryLabelsColor_str, r.friendEmailLbl.getStyle().whiteSpace = "nowrap", r.friendEmailLbl.getStyle().fontSmoothing = "antialiased", r.friendEmailLbl.getStyle().webkitFontSmoothing = "antialiased", r.friendEmailLbl.getStyle().textRendering = "optimizeLegibility", r.friendEmailLbl.getStyle().padding = "0px", r.friendEmailLbl.setInnerHTML("Your friend's email:"), r.friendEmailInpt = new FWDUVPDisplayObject("input"), r.friendEmailInpt.screen.className = "UVP-embed-inpt", r.friendEmailInpt.setBackfaceVisibility(), r.friendEmailInpt.getStyle().fontFamily = "Arial", r.friendEmailInpt.getStyle().fontSize = "12px", r.friendEmailInpt.getStyle().backgroundColor = r.inputBackgroundColor_str, r.friendEmailInpt.getStyle().color = r.inputColor_str, r.friendEmailInpt.getStyle().outline = 0, r.friendEmailInpt.getStyle().whiteSpace = "nowrap", r.friendEmailInpt.getStyle().fontSmoothing = "antialiased", r.friendEmailInpt.getStyle().webkitFontSmoothing = "antialiased", r.friendEmailInpt.getStyle().textRendering = "optimizeLegibility", r.friendEmailInpt.getStyle().padding = "6px", r.friendEmailInpt.getStyle().paddingTop = "4px", r.friendEmailInpt.getStyle().paddingBottom = "4px", FWDUVPSimpleSizeButton.setPrototype(), r.sndBtn = new FWDUVPSimpleSizeButton(r.sendButtonNPath_str, r.sendButtonSPath_str, r.buttonWidth, r.buttonHeight, r.useHEX, e.nBC, e.sBC, !0), r.sndBtn.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, r.sendClickHandler), r.infoText_do = new FWDUVPDisplayObject("div"), r.infoText_do.setBackfaceVisibility(), r.infoText_do.getStyle().fontFamily = "Arial", r.infoText_do.getStyle().fontSize = "12px", r.infoText_do.getStyle().color = r.secondaryLabelsColor_str, r.infoText_do.getStyle().whiteSpace = "nowrap", r.infoText_do.getStyle().fontSmoothing = "antialiased", r.infoText_do.getStyle().webkitFontSmoothing = "antialiased", r.infoText_do.getStyle().textRendering = "optimizeLegibility", r.infoText_do.getStyle().padding = "0px", r.infoText_do.getStyle().paddingTop = "4px", r.infoText_do.getStyle().textAlign = "center", r.infoText_do.getStyle().color = r.mainLabelsColor_str, r.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), r.clsBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-close'></span></div>", void 0, "UVPCloseButtonNormalState", "UVPCloseButtonSelectedState")) : (FWDUVPSimpleButton.setPrototype(), r.clsBtn = new FWDUVPSimpleButton(e.embedColoseN_img, e.embedWindowClosePathS_str, void 0, !0, e.useHEX, e.nBC, e.sBC, !1, !1, !1, !1, !0)), r.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, r.closeButtonOnMouseUpHandler), r.addChild(r.mainHld), r.mainHld.addChild(r.bk_do), r.linkAndEmbedHld.addChild(r.lnkAndEbdHldBk), r.linkAndEmbedHld.addChild(r.mainLbl), r.linkAndEmbedHld.addChild(r.linkLbl), r.linkAndEmbedHld.addChild(r.linkTxt), r.linkAndEmbedHld.addChild(r.embedLbl), r.linkAndEmbedHld.addChild(r.embdTxt), r.linkAndEmbedHld.addChild(r.copyLinkBtn), r.linkAndEmbedHld.addChild(r.copyEmbedBtn), r.sendMainHld.addChild(r.sendMainHldBk), r.sendMainHld.addChild(r.sendMainLbl), r.sendMainHld.addChild(r.yourEmailLabel_do), r.sendMainHld.addChild(r.yourEmailInpt), r.sendMainHld.addChild(r.friendEmailLbl), r.sendMainHld.addChild(r.friendEmailInpt), r.sendMainHld.addChild(r.sndBtn), r.mainHld.addChild(r.linkAndEmbedHld), r.mainHld.addChild(r.sendMainHld), r.mainHld.addChild(r.clsBtn))
        }, this.closeButtonOnMouseUpHandler = function() {
            r.isShowed_bl && r.hide()
        }, this.copyToClipboard = function(e) {
            t(e), document.execCommand("copy")
        }, this.positionAndResize = function() {
            r.sW = n.sW, r.sH = n.sH, r.maxTextWidth = Math.min(r.sW - 150, 500), r.totalWidth = r.maxTextWidth + r.buttonWidth + 40, r.isMbl ? (r.linkTxt.setWidth(r.maxTextWidth + 52), r.embdTxt.setWidth(r.maxTextWidth + 52)) : (r.linkTxt.setWidth(r.maxTextWidth), r.embdTxt.setWidth(r.maxTextWidth)), r.positionFinal(), r.clsBtn.setX(r.sW - r.clsBtn.w - r.embedWindowCloseButtonMargins), r.clsBtn.setY(r.embedWindowCloseButtonMargins), r.setWidth(r.sW), r.setHeight(r.sH), r.mainHld.setWidth(r.sW), r.mainHld.setHeight(r.sH)
        }, this.positionFinal = function() {
            var e, t, s, o, i, l, n, a = !1;
            r.sH < 360 || r.sW < 350 ? (r.linkTxt.getStyle().whiteSpace = "nowrap", r.embdTxt.getStyle().whiteSpace = "nowrap") : (r.linkTxt.getStyle().whiteSpace = "normal", r.embdTxt.getStyle().whiteSpace = "normal"), r.linkLbl.screen.offsetHeight < 6 && (a = !0), t = a ? Math.round(100 * r.mainLbl.screen.getBoundingClientRect().height) : r.mainLbl.getHeight(), r.mainLbl.setX(16), r.linkLbl.setX(16), r.linkLbl.setY(t + 14), o = a ? (s = Math.round(100 * r.linkLbl.screen.getBoundingClientRect().height), Math.round(100 * r.linkTxt.screen.getBoundingClientRect().height)) : (s = r.linkLbl.getHeight(), r.linkTxt.getHeight()), r.linkTxt.setX(10), r.linkTxt.setY(r.linkLbl.y + s + 5), r.isMbl ? r.copyLinkBtn.setX(-100) : r.copyLinkBtn.setX(r.maxTextWidth + 30), r.copyLinkBtn.setY(r.linkTxt.y + o - r.buttonHeight), r.embedLbl.setX(16), r.embedLbl.setY(r.copyLinkBtn.y + r.copyLinkBtn.h + 14), i = a ? Math.round(100 * r.embdTxt.screen.getBoundingClientRect().height) : r.embdTxt.getHeight(), r.embdTxt.setX(10), r.embdTxt.setY(r.embedLbl.y + s + 5), r.isMbl ? r.copyEmbedBtn.setX(-100) : r.copyEmbedBtn.setX(r.maxTextWidth + 30), r.copyEmbedBtn.setY(r.embdTxt.y + i - r.buttonHeight), r.lnkAndEbdHldBk.setY(r.linkLbl.y - 9), r.lnkAndEbdHldBk.setWidth(r.totalWidth - 2), r.lnkAndEbdHldBk.setHeight(r.embdTxt.y + i - 9), r.linkAndEmbedHld.setWidth(r.totalWidth), r.linkAndEmbedHld.setHeight(r.embdTxt.y + i + 14), n = a ? (l = Math.round(100 * r.sendMainLbl.screen.getBoundingClientRect().height), Math.round(100 * r.yourEmailInpt.screen.getBoundingClientRect().height)) : (l = r.sendMainLbl.getHeight(), r.yourEmailInpt.getHeight()), r.sendMainLbl.setX(16), r.yourEmailLabel_do.setX(16), r.yourEmailLabel_do.setY(l + 14), 400 < r.sW ? (r.yourEmailInpt.setX(10), r.yourEmailInpt.setWidth(parseInt(r.totalWidth - 52 - r.buttonWidth) / 2), r.yourEmailInpt.setY(r.yourEmailLabel_do.y + s + 5), r.friendEmailLbl.setX(r.yourEmailInpt.x + r.yourEmailInpt.w + 26), r.friendEmailLbl.setY(r.yourEmailLabel_do.y), r.friendEmailInpt.setX(r.yourEmailInpt.x + r.yourEmailInpt.w + 20), r.friendEmailInpt.setWidth(parseInt((r.maxTextWidth - 30) / 2)), r.friendEmailInpt.setY(r.yourEmailLabel_do.y + s + 5), r.sndBtn.setX(r.friendEmailInpt.x + r.yourEmailInpt.w + 10), r.sndBtn.setY(r.friendEmailInpt.y + n - r.buttonHeight)) : (r.yourEmailInpt.setX(10), r.yourEmailInpt.setWidth(r.totalWidth - 32), r.yourEmailInpt.setY(r.yourEmailLabel_do.y + s + 5), r.friendEmailLbl.setX(16), r.friendEmailLbl.setY(r.yourEmailInpt.y + n + 14), r.friendEmailInpt.setX(10), r.friendEmailInpt.setY(r.friendEmailLbl.y + s + 5), r.friendEmailInpt.setWidth(r.totalWidth - 32), r.sndBtn.setX(r.totalWidth - r.buttonWidth - 10), r.sndBtn.setY(r.friendEmailInpt.y + n + 10)), r.sendMainHldBk.setY(r.yourEmailLabel_do.y - 9), r.sendMainHldBk.setWidth(r.totalWidth - 2), r.sendMainHldBk.setHeight(r.sndBtn.y + r.sndBtn.h - 9), r.sendMainHld.setWidth(r.totalWidth), r.sendMainHld.setHeight(r.sndBtn.y + r.sndBtn.h + 14), e = a ? Math.round(100 * r.linkAndEmbedHld.screen.getBoundingClientRect().height + 100 * r.sendMainHld.screen.getBoundingClientRect().height) : r.linkAndEmbedHld.getHeight() + r.sendMainHld.getHeight(), r.linkAndEmbedHld.setX(parseInt((r.sW - r.totalWidth) / 2)), r.linkAndEmbedHld.setY(parseInt((r.sH - e) / 2) - 8), r.sendMainHld.setX(parseInt((r.sW - r.totalWidth) / 2)), a ? r.sendMainHld.setY(Math.round(r.linkAndEmbedHld.y + 100 * r.linkAndEmbedHld.screen.getBoundingClientRect().height + 20)) : r.sendMainHld.setY(r.linkAndEmbedHld.y + r.linkAndEmbedHld.getHeight() + 20)
        }, this.sendClickHandler = function() {
            var e = !1;
            if (!r.getValidEmail(r.yourEmailInpt.screen.value)) {
                if (FWDAnimation.isTweening(r.yourEmailInpt.screen)) return;
                FWDAnimation.to(r.yourEmailInpt.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: !0,
                    repeat: 3
                }), e = !0
            }
            if (!r.getValidEmail(r.friendEmailInpt.screen.value)) {
                if (FWDAnimation.isTweening(r.friendEmailInpt.screen)) return;
                FWDAnimation.to(r.friendEmailInpt.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: !0,
                    repeat: 3
                }), e = !0
            }
            e || r.sendEmail()
        }, this.sendEmail = function() {
            if (!r.isSending_bl) {
                r.isSending_bl = !0, r.xhr = new XMLHttpRequest, r.xhr.onreadystatechange = r.onChange, r.xhr.onerror = r.ajaxOnErrorHandler;
                try {
                    r.xhr.open("get", r.sendToAFriendPath_str + "?friendMail=" + r.friendEmailInpt.screen.value + "&yourMail=" + r.yourEmailInpt.screen.value + "&link=" + encodeURIComponent(r.linkToVideo_str), !0), r.xhr.send()
                } catch (e) {
                    r.showInfo("ERROR", !0), console && console.log(e), e.message && o.console && console.log(e.message)
                }
                r.resetInputs()
            }
        }, this.ajaxOnErrorHandler = function(e) {
            r.showInfo("ERROR", !0);
            try {
                o.console && console.log(e), o.console && console.log(e.message)
            } catch (e) {}
            r.isSending_bl = !1
        }, this.onChange = function(e) {
            4 == r.xhr.readyState && 200 == r.xhr.status && ("sent" == r.xhr.responseText ? r.showInfo("SENT") : (r.showInfo("ERROR", !0), o.console && console.log("Error The server can't send the email!")), r.isSending_bl = !1)
        }, this.resetInputs = function() {
            r.yourEmailInpt.screen.value = "", r.friendEmailInpt.screen.value = ""
        }, this.getValidEmail = function(e) {
            return !(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e) || "" == e)
        }, this.setEmbedData = function() {
            var e = location.href,
                t = location.protocol + "//" + location.host,
                s = location.pathname,
                o = location.hash,
                i = location.search,
                l = t + s;
            i = i.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, ""), e = e.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, ""), r.finalEmbedPath_str = i ? o ? l + i + "&RVPInstanceName=" + n.instanceName_str + "&RVPPlaylistId=" + n.catId + "&RVPVideoId=" + n.id + o : l + i + "&RVPInstanceName=" + n.instanceName_str + "&RVPPlaylistId=" + n.catId + "&RVPVideoId=" + n.id : o ? l + "?RVPInstanceName=" + n.instanceName_str + "&RVPPlaylistId=" + n.catId + "&RVPVideoId=" + n.id + o : l + "?RVPInstanceName=" + n.instanceName_str + "&RVPPlaylistId=" + n.catId + "&RVPVideoId=" + n.id, o ? -1 == o.indexOf("playlistId=") ? r.linkToVideo_str = l + i + o + "&playlistId=" + n.catId + "&videoId=" + n.id : r.linkToVideo_str = e : r.linkToVideo_str = e + "#/?playlistId=" + n.catId + "&videoId=" + n.id, r.finalEmbedPath_str = encodeURI(r.finalEmbedPath_str), r.linkToVideo_str = encodeURI(r.linkToVideo_str), r.finalEmbedCode_str = "<iframe src='" + r.finalEmbedPath_str + "' width='" + n.sW + "' height='" + n.sH + "' frameborder='0' scrolling='no' allowfullscreen></iframe>", FWDUVPUtils.isIE ? (r.linkTxt.screen.innerText = r.linkToVideo_str, r.embdTxt.screen.innerText = r.finalEmbedCode_str) : (r.linkTxt.screen.textContent = r.linkToVideo_str, r.embdTxt.screen.textContent = r.finalEmbedCode_str)
        }, this.showInfo = function(e, t) {
            r.infoText_do.setInnerHTML(e), r.sendMainHld.addChild(r.infoText_do), r.infoText_do.setWidth(r.buttonWidth), r.infoText_do.setHeight(r.buttonHeight - 4), r.infoText_do.setX(r.sndBtn.x), r.infoText_do.setY(r.sndBtn.y - 23), r.infoText_do.setAlpha(0), r.infoText_do.getStyle().color = t ? "#FF0000" : r.mainLabelsColor_str, FWDAnimation.killTweensOf(r.infoText_do), FWDAnimation.to(r.infoText_do, .16, {
                alpha: 1,
                yoyo: !0,
                repeat: 7
            })
        }, this.show = function(e) {
            r.isShowed_bl || (r.isShowed_bl = !0, n.main_do.addChild(r), r.init(), r.resetInputs(), r.setEmbedData(), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && n.main_do.setSelectable(!0), r.useVectorIcons_bl ? r.checkButtonsId_to = setInterval(function() {
                0 != r.clsBtn.w && (r.positionAndResize(), clearInterval(r.checkButtonsId_to), clearTimeout(r.hideCompleteId_to), clearTimeout(r.showCompleteId_to), r.mainHld.setY(-r.sH), r.showCompleteId_to = setTimeout(r.showCompleteHandler, 900), setTimeout(function() {
                    FWDAnimation.to(r.mainHld, .8, {
                        y: 0,
                        delay: .1,
                        ease: Expo.easeInOut
                    })
                }, 100))
            }, 50) : (r.positionAndResize(), clearTimeout(r.hideCompleteId_to), clearTimeout(r.showCompleteId_to), r.mainHld.setY(-r.sH), r.showCompleteId_to = setTimeout(r.showCompleteHandler, 900), setTimeout(function() {
                FWDAnimation.to(r.mainHld, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100)))
        }, this.showCompleteHandler = function() {}, this.hide = function() {
            r.isShowed_bl && (r.isShowed_bl = !1, n.customContextMenu_do && n.customContextMenu_do.enable(), r.positionAndResize(), clearTimeout(r.hideCompleteId_to), clearTimeout(r.showCompleteId_to), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && n.main_do.setSelectable(!1), r.hideCompleteId_to = setTimeout(r.hideCompleteHandler, 800), FWDAnimation.killTweensOf(r.mainHld), FWDAnimation.to(r.mainHld, .8, {
                y: -r.sH,
                ease: Expo.easeInOut
            }))
        }, this.hideCompleteHandler = function() {
            n.main_do.removeChild(r), r.dispatchEvent(s.HIDE_COMPLETE)
        }, r.useHEX && r.init()
    };
    s.setPrototype = function() {
        s.prototype = new FWDUVPDisplayObject("div")
    }, s.ERROR = "error", s.HIDE_COMPLETE = "hideComplete", s.prototype = null, o.FWDUVPEmbedWindow = s
}(window), window, window.FWDUVPEventDispatcher = function() {
        this.listeners = {
            events_ar: []
        }, this.addListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function.");
            var s = {};
            s.type = e, s.listener = t, (s.target = this).listeners.events_ar.push(s)
        }, this.dispatchEvent = function(e, t) {
            if (null != this.listeners) {
                if (null == e) throw Error("type is required.");
                if ("object" == typeof e) throw Error("type must be of type String.");
                for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                    if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e) {
                        if (t)
                            for (var i in t) this.listeners.events_ar[s][i] = t[i];
                        this.listeners.events_ar[s].listener.call(this, this.listeners.events_ar[s])
                    }
            }
        }, this.removeListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function." + e);
            for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e && this.listeners.events_ar[s].listener === t) {
                    this.listeners.events_ar.splice(s, 1);
                    break
                }
        }, this.destroy = function() {
            this.listeners = null, this.addListener = null, this.dispatchEvent = null, this.removeListener = null
        }
    },
    function(l) {
        var n = function(e, t, s) {
            var o = this,
                i = n.prototype;
            this.screenToTest = e, this.screenToTest2 = t, this.hideDelay = s, this.globalX = 0, this.globalY = 0, this.currentTime, this.checkIntervalId_int, this.hideCompleteId_to, this.hasInitialTestEvents_bl = !1, this.addSecondTestEvents_bl = !1, this.dispatchOnceShow_bl = !0, this.dispatchOnceHide_bl = !1, this.isStopped_bl = !0, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, o.init = function() {}, o.start = function() {
                o.currentTime = (new Date).getTime(), clearInterval(o.checkIntervalId_int), o.checkIntervalId_int = setInterval(o.update, 100), o.addMouseOrTouchCheck(), o.isStopped_bl = !1
            }, o.stop = function() {
                clearInterval(o.checkIntervalId_int), o.isStopped_bl = !0, o.removeMouseOrTouchCheck(), o.removeMouseOrTouchCheck2()
            }, o.addMouseOrTouchCheck = function() {
                o.hasInitialTestEvents_bl || (o.hasInitialTestEvents_bl = !0, o.isMbl ? o.hasPointerEvent_bl ? (o.screenToTest.screen.addEventListener("pointerdown", o.onMouseOrTouchUpdate), o.screenToTest.screen.addEventListener("MSPointerMove", o.onMouseOrTouchUpdate)) : o.screenToTest.screen.addEventListener("touchstart", o.onMouseOrTouchUpdate) : l.addEventListener ? l.addEventListener("mousemove", o.onMouseOrTouchUpdate) : document.attachEvent && document.attachEvent("onmousemove", o.onMouseOrTouchUpdate))
            }, o.removeMouseOrTouchCheck = function() {
                o.hasInitialTestEvents_bl && (o.hasInitialTestEvents_bl = !1, o.isMbl ? o.hasPointerEvent_bl ? (o.screenToTest.screen.removeEventListener("pointerdown", o.onMouseOrTouchUpdate), o.screenToTest.screen.removeEventListener("MSPointerMove", o.onMouseOrTouchUpdate)) : o.screenToTest.screen.removeEventListener("touchstart", o.onMouseOrTouchUpdate) : l.removeEventListener ? l.removeEventListener("mousemove", o.onMouseOrTouchUpdate) : document.detachEvent && document.detachEvent("onmousemove", o.onMouseOrTouchUpdate))
            }, o.addMouseOrTouchCheck2 = function() {
                o.addSecondTestEvents_bl || (o.addSecondTestEvents_bl = !0, o.screenToTest.screen.addEventListener ? o.screenToTest.screen.addEventListener("mousemove", o.secondTestMoveDummy) : o.screenToTest.screen.attachEvent && o.screenToTest.screen.attachEvent("onmousemove", o.secondTestMoveDummy))
            }, o.removeMouseOrTouchCheck2 = function() {
                o.addSecondTestEvents_bl && (o.addSecondTestEvents_bl = !1, o.screenToTest.screen.removeEventListener ? o.screenToTest.screen.removeEventListener("mousemove", o.secondTestMoveDummy) : o.screenToTest.screen.detachEvent && o.screenToTest.screen.detachEvent("onmousemove", o.secondTestMoveDummy))
            }, this.secondTestMoveDummy = function() {
                o.removeMouseOrTouchCheck2(), o.addMouseOrTouchCheck()
            }, o.onMouseOrTouchUpdate = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                o.globalX != t.screenX && o.globalY != t.screenY && (o.currentTime = (new Date).getTime()), o.globalX = t.screenX, o.globalY = t.screenY, o.isMbl || FWDUVPUtils.hitTest(o.screenToTest.screen, o.globalX, o.globalY) || (o.removeMouseOrTouchCheck(), o.addMouseOrTouchCheck2())
            }, o.update = function(e) {
                (new Date).getTime() > o.currentTime + o.hideDelay ? o.dispatchOnceShow_bl && (o.dispatchOnceHide_bl = !0, o.dispatchOnceShow_bl = !1, o.dispatchEvent(n.HIDE), clearTimeout(o.hideCompleteId_to), o.hideCompleteId_to = setTimeout(function() {
                    o.dispatchEvent(n.HIDE_COMPLETE)
                }, 1e3)) : o.dispatchOnceHide_bl && (clearTimeout(o.hideCompleteId_to), o.dispatchOnceHide_bl = !1, o.dispatchOnceShow_bl = !0, o.dispatchEvent(n.SHOW))
            }, o.reset = function() {
                clearTimeout(o.hideCompleteId_to), o.currentTime = (new Date).getTime(), o.dispatchEvent(n.SHOW)
            }, o.destroy = function() {
                o.removeMouseOrTouchCheck(), clearInterval(o.checkIntervalId_int), o.screenToTest = null, e = null, o.init = null, o.start = null, o.stop = null, o.addMouseOrTouchCheck = null, o.removeMouseOrTouchCheck = null, o.onMouseOrTouchUpdate = null, o.update = null, o.reset = null, o.destroy = null, i.destroy(), o = i = null, n.prototype = null
            }, o.init()
        };
        n.HIDE = "hide", n.SHOW = "show", n.HIDE_COMPLETE = "hideComplete", n.setPrototype = function() {
            n.prototype = new FWDUVPEventDispatcher
        }, l.FWDUVPHider = n
    }(window),
    function(e) {
        var s = function(i, e, t) {
            var l = this;
            s.prototype;
            this.bk_do = null, this.textHolder_do = null, this.warningIconPath_str = e, this.showErrorInfo_bl = t, this.show_to = null, this.isShowed_bl = !1, this.isShowedOnce_bl = !1, this.allowToRemove_bl = !0, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.init = function() {
                l.setResizableSizeAfterParent(), l.bk_do = new FWDUVPDisplayObject("div"), l.bk_do.setAlpha(.6), l.bk_do.setBkColor("#000000"), l.addChild(l.bk_do), l.textHolder_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIEAndLessThen9 || (l.textHolder_do.getStyle().font = "Arial"), l.textHolder_do.getStyle().wordWrap = "break-word", l.textHolder_do.getStyle().padding = "10px", l.textHolder_do.getStyle().paddingLeft = "42px", l.textHolder_do.getStyle().lineHeight = "18px", l.textHolder_do.getStyle().color = "#000000", l.textHolder_do.setBkColor("#EEEEEE");
                var e = new Image;
                e.src = this.warningIconPath_str, this.img_do = new FWDUVPDisplayObject("img"), this.img_do.setScreen(e), this.img_do.setWidth(28), this.img_do.setHeight(28), l.addChild(l.textHolder_do), l.addChild(l.img_do)
            }, this.showText = function(e) {
                l.isShowedOnce_bl || (l.hasPointerEvent_bl ? l.screen.addEventListener("pointerdown", l.closeWindow) : (l.screen.addEventListener("click", l.closeWindow), l.screen.addEventListener("touchend", l.closeWindow)), l.isShowedOnce_bl = !0), l.setVisible(!1), l.textHolder_do.getStyle().paddingBottom = "10px", l.textHolder_do.setInnerHTML(e), clearTimeout(l.show_to), l.show_to = setTimeout(l.show, 60), setTimeout(function() {
                    l.positionAndResize()
                }, 10)
            }, this.show = function() {
                var e = Math.min(640, i.sW - 120);
                l.isShowed_bl = !0, l.textHolder_do.setWidth(e), setTimeout(function() {
                    l.showErrorInfo_bl && l.setVisible(!0), l.positionAndResize()
                }, 100)
            }, this.positionAndResize = function() {
                var e = l.textHolder_do.getWidth(),
                    t = l.textHolder_do.getHeight(),
                    s = parseInt((i.sW - e) / 2),
                    o = parseInt((i.sH - t) / 2);
                l.bk_do.setWidth(i.sW), l.bk_do.setHeight(i.sH), l.textHolder_do.setX(s), l.textHolder_do.setY(o), l.img_do.setX(s + 6), l.img_do.setY(o + parseInt((l.textHolder_do.getHeight() - l.img_do.h) / 2))
            }, this.closeWindow = function() {
                l.allowToRemove_bl && (l.isShowed_bl = !1, clearTimeout(l.show_to), setTimeout(function() {
                    try {
                        i.main_do.removeChild(l)
                    } catch (e) {}
                }, 100))
            }, this.init()
        };
        s.setPrototype = function() {
            s.prototype = new FWDUVPDisplayObject("div", "relative")
        }, s.prototype = null, e.FWDUVPInfo = s
    }(window),
    function(e) {
        var i = function(t, s) {
            var o = this;
            i.prototype;
            this.xhr = null, this.embedColoseN_img = s.embedColoseN_img, this.mainBk_do = null, this.mainHld = null, this.mainTextHolder_do = null, this.text_do = null, this.bk_do = null, this.clsBtn = null, this.embedWindowBackground_str = s.embedWindowBackground_str, this.embedWindowInputBackgroundPath_str = s.embedWindowInputBackgroundPath_str, this.secondaryLabelsColor_str = s.secondaryLabelsColor_str, this.inputColor_str = s.inputColor_str, this.sendButtonNPath_str = s.sendButtonNPath_str, this.sendButtonSPath_str = s.sendButtonSPath_str, this.inputBackgroundColor_str = s.inputBackgroundColor_str, this.borderColor_str = s.borderColor_str, this.sendToAFriendPath_str = s.sendToAFriendPath_str, this.maxTextWidth = 0, this.totalWidth = 0, this.sW = 0, this.sH = 0, this.buttonWidth = 44, this.buttonHeight = 19, this.embedWindowCloseButtonMargins = s.embedWindowCloseButtonMargins, this.finalEmbedPath_str = null, this.finalEmbedCode_str = null, this.linkToVideo_str = null, this.shareAndEmbedTextColor_str = s.shareAndEmbedTextColor_str, this.isDark = !0, -1 == o.embedWindowBackground_str.indexOf("dark") && (this.isDark = !1), this.isYTB_bl = !1, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.useVectorIcons_bl = s.useVectorIcons_bl, this.init = function() {
                o.setBackfaceVisibility(), o.mainHld = new FWDUVPDisplayObject("div");
                var e = "fwduvp-info-window-white";
                o.isDark && (e = "fwduvp-info-window-dark"), o.mainHld.screen.className = e, o.mainBk_do = new FWDUVPDisplayObject("div"), o.mainBk_do.getStyle().width = "100%", o.mainBk_do.getStyle().height = "100%", o.mainBk_do.setAlpha(.9), o.mainBk_do.getStyle().background = "url('" + o.embedWindowBackground_str + "')", o.mainTextHolder_do = new FWDUVPDisplayObject("div", "absolute"), o.bk_do = new FWDUVPDisplayObject("div"), o.bk_do.getStyle().background = "url('" + o.embedWindowBackground_str + "')", o.bk_do.getStyle().borderStyle = "solid", o.bk_do.getStyle().borderWidth = "1px", o.bk_do.getStyle().borderColor = o.borderColor_str, o.text_do = new FWDUVPDisplayObject("div", "relative"), o.text_do.hasTransform3d_bl = !1, o.text_do.hasTransform2d_bl = !1, o.text_do.getStyle().fontFamily = "Arial", o.text_do.getStyle().fontSize = "12px", o.text_do.getStyle().fontSmoothing = "antialiased", o.text_do.getStyle().webkitFontSmoothing = "antialiased", o.text_do.getStyle().textRendering = "optimizeLegibility", o.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), o.clsBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-close'></span></div>", void 0, "UVPCloseButtonNormalState", "UVPCloseButtonSelectedState")) : (FWDUVPSimpleButton.setPrototype(), o.clsBtn = new FWDUVPSimpleButton(s.infoWindowClooseN_img, s.embedWindowClosePathS_str, void 0, !0, s.useHEX, s.nBC, s.sBC, !1, !1, !1, !1, !0)), o.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, o.closeButtonOnMouseUpHandler), o.mainHld.addChild(o.mainBk_do), o.mainTextHolder_do.addChild(o.bk_do), o.mainTextHolder_do.addChild(o.text_do), o.mainHld.addChild(o.mainTextHolder_do), o.addChild(o.mainHld), o.mainHld.addChild(o.clsBtn)
            }, this.closeButtonOnMouseUpHandler = function() {
                o.isShowed_bl && o.hide()
            }, this.positionAndResize = function() {
                o.sW = t.sW, o.sH = t.sH, o.maxTextWidth = Math.min(o.sW - 150, 500), o.totalWidth = o.maxTextWidth + o.buttonWidth + 40, o.positionFinal(), o.clsBtn.setX(o.sW - o.clsBtn.w - o.embedWindowCloseButtonMargins), o.clsBtn.setY(o.embedWindowCloseButtonMargins), o.setWidth(o.sW), o.setHeight(o.sH), o.mainHld.setWidth(o.sW), o.mainHld.setHeight(o.sH)
            }, this.positionFinal = function() {
                var e;
                o.mainTextHolder_do.setWidth(o.totalWidth), e = o.mainTextHolder_do.getHeight(), o.bk_do.setWidth(o.totalWidth - 2), o.bk_do.setHeight(e - 2), o.mainTextHolder_do.setX(parseInt((o.sW - o.totalWidth) / 2)), o.mainTextHolder_do.setY(parseInt((o.sH - e) / 2) - 8)
            }, this.show = function(e) {
                o.isShowed_bl || (o.isShowed_bl = !0, t.main_do.addChild(o), o.text_do.setInnerHTML(e), o.positionAndResize(), clearTimeout(o.hideCompleteId_to), clearTimeout(o.showCompleteId_to), o.mainHld.setY(-o.sH), o.showCompleteId_to = setTimeout(o.showCompleteHandler, 900), setTimeout(function() {
                    FWDAnimation.to(o.mainHld, .8, {
                        y: 0,
                        delay: .1,
                        ease: Expo.easeInOut
                    })
                }, 100))
            }, this.showCompleteHandler = function() {}, this.hide = function() {
                o.isShowed_bl && (o.isShowed_bl = !1, t.customContextMenu_do && t.customContextMenu_do.enable(), o.positionAndResize(), clearTimeout(o.hideCompleteId_to), clearTimeout(o.showCompleteId_to), o.hideCompleteId_to = setTimeout(o.hideCompleteHandler, 800), FWDAnimation.killTweensOf(o.mainHld), FWDAnimation.to(o.mainHld, .8, {
                    y: -o.sH,
                    ease: Expo.easeInOut
                }))
            }, this.hideCompleteHandler = function() {
                t.main_do.removeChild(o), o.dispatchEvent(i.HIDE_COMPLETE)
            }, this.init()
        };
        i.setPrototype = function() {
            i.prototype = new FWDUVPDisplayObject("div")
        }, i.ERROR = "error", i.HIDE_COMPLETE = "hideComplete", i.prototype = null, e.FWDUVPInfoWindow = i
    }(window),
    function(window) {
        var FWDUVPlayer = function(props) {
                var self = this;
                this.isInstantiate_bl = !1, this.displayType = props.displayType || FWDUVPlayer.RESPONSIVE, self.displayType.toLowerCase() != FWDUVPlayer.RESPONSIVE && self.displayType.toLowerCase() != FWDUVPlayer.FULL_SCREEN && self.displayType.toLowerCase() != FWDUVPlayer.STICKY && self.displayType.toLowerCase() != FWDUVPlayer.AFTER_PARENT && self.displayType.toLowerCase() != FWDUVPlayer.LIGHTBOX && (self.displayType = FWDUVPlayer.RESPONSIVE), self.displayType = self.displayType.toLowerCase(), this.stickyOnScroll = props.stickyOnScroll || "no", this.stickyOnScroll = "yes" == self.stickyOnScroll, self.displayType != FWDUVPlayer.RESPONSIVE && (this.stickyOnScroll = !1), self.isMinShowed = !0, self.stickyOnScrollWidth = props.stickyOnScrollWidth || 700, self.stickyOnScrollHeight = props.stickyOnScrollHeight || 394, this.maxWidth = props.maxWidth || 640, this.maxHeight = props.maxHeight || 380, this.embeddedPlaylistId, this.embeddedVideoId, this.isEmbedded_bl = !1, this.useYoutube_bl = props.useYoutube || "no", this.useYoutube_bl = "yes" == self.useYoutube_bl, this.useVimeo_bl = props.useVimeo || "no", this.useVimeo_bl = "yes" == self.useVimeo_bl, self.mainFolderPath_str = props.mainFolderPath, self.mainFolderPath_str.lastIndexOf("/") + 1 != self.mainFolderPath_str.length && (self.mainFolderPath_str += "/"), this.sknPth = props.skinPath, self.sknPth.lastIndexOf("/") + 1 != self.sknPth.length && (self.sknPth += "/"), this.warningIconPath_str = self.mainFolderPath_str + this.sknPth + "warningIcon.png", FWDUVPlayer.YTAPIReady = !1, this.fillEntireVideoScreen_bl = !1, self.init = function() {
                    var e, t, s, o, i;
                    self.isInstantiate_bl || (FWDUVPlayer.instaces_ar.push(this), FWDTweenLite.ticker.useRAF(!1), this.props_obj = props, this.mustHaveHolderDiv_bl = !1, this.instanceName_str = this.props_obj.instanceName, this.instanceName_str ? window[this.instanceName_str] ? alert("FWDUVPlayer instance name " + this.instanceName_str + " is already defined and contains a different instance reference, set a different instance name.") : (window[this.instanceName_str] = this).props_obj ? this.props_obj.parentId ? (self.displayType == FWDUVPlayer.RESPONSIVE && (self.mustHaveHolderDiv_bl = !0), !self.mustHaveHolderDiv_bl || FWDUVPUtils.getChildById(self.props_obj.parentId) ? (this.body = document.getElementsByTagName("body")[0], self.displayType == FWDUVPlayer.STICKY ? (this.stageContainer = document.createElement("div"), this.stageContainer.style.position = "fixed", this.stageContainer.style.width = "100%", this.stageContainer.style.zIndex = "999999", this.stageContainer.style.height = "0px", document.documentElement.appendChild(this.stageContainer), this.stageContainer.style.overflow = "visible") : self.displayType == FWDUVPlayer.FULL_SCREEN || self.displayType == FWDUVPlayer.LIGHTBOX ? self.stageContainer = document.documentElement : this.stageContainer = FWDUVPUtils.getChildById(self.props_obj.parentId), this.position_str = self.props_obj.verticalPosition, this.position_str || (this.position_str = FWDUVPlayer.POSITION_TOP), "bottom" == this.position_str ? this.position_str = FWDUVPlayer.POSITION_BOTTOM : this.position_str = FWDUVPlayer.POSITION_TOP, this.horizontalPosition_str = self.props_obj.horizontalPosition, this.horizontalPosition_str || (this.horizontalPosition_str = FWDUVPlayer.CENTER), "center" == this.horizontalPosition_str ? this.horizontalPosition_str = FWDUVPlayer.CENTER : "left" == this.horizontalPosition_str ? this.horizontalPosition_str = FWDUVPlayer.LEFT : "right" == this.horizontalPosition_str ? this.horizontalPosition_str = FWDUVPlayer.RIGHT : this.horizontalPosition_str = FWDUVPlayer.CENTER, self.isEmbedded_bl && (self.displayType = FWDUVPlayer.FULL_SCREEN), self.isMin = !1, this.lightBox_do = null, this.listeners = {
                        events_ar: []
                    }, this.customContextMenu_do = null, this.info_do = null, this.categories_do = null, this.playlist_do = null, this.main_do = null, this.ytb_do = null, this.preloader_do = null, this.controller_do = null, this.videoScreen_do = null, this.flashObject = null, this.videoPoster_do = null, this.lrgPlayBtn = null, this.hider = null, this.videoHolder_do = null, this.videoHider_do = null, this.disableClick_do = null, this.embedWindow_do = null, this.spaceBetweenControllerAndPlaylist = self.props_obj.spaceBetweenControllerAndPlaylist || 1, this.autoScale_bl = self.props_obj.autoScale, this.autoScale_bl = "yes" == self.autoScale_bl, this.ec = document.getElementById("fwduvp_extra_content"), self.showPreloader_bl = self.props_obj.showPreloader, self.showPreloader_bl = "yes" == self.showPreloader_bl, self.preloaderColors = self.props_obj.preloaderColors || ["#666666", "#FFFFFF"], this.backgroundColor_str = self.props_obj.backgroundColor || "transparent", this.videoBackgroundColor_str = self.props_obj.videoBackgroundColor || "transparent", this.flashObjectMarkup_str = null, self.mainBackgroundImagePath_str = self.props_obj.mainBackgroundImagePath, self.mainBackgroundImagePath_str && self.mainBackgroundImagePath_str.length < 3 && (self.mainBackgroundImagePath_str = void 0), self.animate_bl = !0, this.isShowedFirstTime_bl = !0, this.offsetX = parseInt(self.props_obj.offsetX) || 0, this.offsetY = parseInt(self.props_obj.offsetY) || 0, this.lastX = 0, this.lastY = 0, this.tempStageWidth = 0, this.tempStageHeight = 0, this.tempVidStageWidth = 0, this.tempVidStageHeight = 0, this.sW = 0, this.sH = 0, this.vidStageWidth = 0, this.vidStageHeight = 0, this.firstTapX, this.firstTapY, this.curTime, this.totalTime, this.catId = -1, this.id = -1, this.totaadsIdeos = 0, this.prevCatId = -1, this.totalTimePlayed = 0, this.videoSourcePath_str = "", this.prevVideoSourcePath_str, this.posterPath_str = self.props_obj.posterPath, this.videoType_str, this.videoStartBehaviour_str, this.prevVideoSource_str, this.prUVPosterSource_str, this.finalVideoPath_str, this.playListThumbnailWidth = self.props_obj.thumbnailWidth || 80, this.playListThumbnailHeight = self.props_obj.thumbnailHeight || 80, this.playlistWidth = self.props_obj.playlistRightWidth || 250, this.playlistHeight = 0, this.resizeHandlerId_to, this.resizeHandler2Id_to, this.hidePreloaderId_to, this.orientationChangeId_to, this.disableClickId_to, this.clickDelayId_to, this.secondTapId_to, this.videoHiderId_to, this.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist, this.showPlaylistButtonAndPlaylist_bl = "no" != self.showPlaylistButtonAndPlaylist_bl, this.isPlaylistShowed_bl = self.props_obj.showPlaylistByDefault, this.isPlaylistShowed_bl = "no" != self.isPlaylistShowed_bl, self.showErrorInfo_bl = self.props_obj.showErrorInfo, self.showErrorInfo_bl = "no" != self.showErrorInfo_bl, self.showAnnotationsPositionTool_bl = self.props_obj.showAnnotationsPositionTool, self.showAnnotationsPositionTool_bl = "yes" == self.showAnnotationsPositionTool_bl, self.showAnnotationsPositionTool_bl && (self.isPlaylistShowed_bl = !1), "pause" != FWDUVPlayer.videoStartBehaviour && "stop" != FWDUVPlayer.videoStartBehaviour && "default" != FWDUVPlayer.videoStartBehaviour && (FWDUVPlayer.videoStartBehaviour = "pause"), this.lightBoxBackgroundOpacity = self.props_obj.lightBoxBackgroundOpacity || 1, this.lightBoxBackgroundColor_str = self.props_obj.lightBoxBackgroundColor || "transparent", self.preloaderBackgroundColor = self.props_obj.preloaderBackgroundColor || "#000000", self.preloaderFillColor = self.props_obj.preloaderFillColor || "#FFFFFF", self.addPrevId = 999999999 * Math.random(), this.isVideoPlayingWhenOpenWindows_bl = !1, this.isFirstPlaylistLoaded_bl = !1, this.isVideoHiderShowed_bl = !1, this.isSpaceDown_bl = !1, this.isPlaying_bl = !1, this.firstTapPlaying_bl = !1, this.stickOnCurrentInstanceKey_bl = !1, this.isFullScreen_bl = !1, this.isFlashScreenReady_bl = !1, this.orintationChangeComplete_bl = !0, this.disableClick_bl = !1, this.isAPIReady_bl = !1, this.isInstantiate_bl = !0, this.isPlaylistLoaded_bl = !1, this.isPlaylistLoadedFirstTime_bl = !1, this.useDeepLinking_bl = self.props_obj.useDeepLinking, this.useDeepLinking_bl = "yes" == self.useDeepLinking_bl, this.isAdd_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.lightBoxWidth = self.props_obj.maxWidth || 500, this.lightBoxHeight = self.props_obj.maxHeight || 400, self.isShowed_bl = self.props_obj.showPlayerByDefault, self.isShowed_bl = "yes" == self.isShowed_bl, self.googleAnalyticsTrackingCode = self.props_obj.googleAnalyticsTrackingCode, !window.ga && self.googleAnalyticsTrackingCode ? (e = window, t = document, s = "ga", e.GoogleAnalyticsObject = s, e.ga = e.ga || function() {
                        (e.ga.q = e.ga.q || []).push(arguments)
                    }, e.ga.l = +new Date, o = t.createElement("script"), i = t.getElementsByTagName("script")[0], o.async = 1, o.src = "https://www.google-analytics.com/analytics.js", i.parentNode.insertBefore(o, i), ga("create", self.googleAnalyticsTrackingCode, "auto"), ga("send", "pageview")) : window.ga && self.googleAnalyticsTrackingCode && (ga("create", self.googleAnalyticsTrackingCode, "auto"), ga("send", "pageview")), self.displayType == FWDUVPlayer.LIGHTBOX ? self.setupLightBox() : self.displayType == FWDUVPlayer.STICKY ? (self.setupPlayer(), this.startResizeHandler()) : self.initializeOnlyWhenVisible_bl ? (this.startResizeHandler(), window.addEventListener("scroll", self.onInitlalizeScrollHandler), setTimeout(self.onInitlalizeScrollHandler, 500)) : (self.setupPlayer(), this.startResizeHandler())) : alert("FWDUVPlayer holder div is not found, please make sure that the div exsists and the id is correct! " + self.props_obj.parentId)) : alert("Property parentId is not defined in the FWDUVPlayer constructor, self property represents the div id into which the megazoom is added as a child!") : alert("FWDUVPlayer constructor properties object is not defined!") : alert("FWDUVPlayer instance name is required please make sure that the instanceName parameter exsists and it's value is uinique."))
                }, self.addMinOnScroll = function() {
                    self.displayType == FWDUVPlayer.RESPONSIVE && self.stickyOnScroll && window.addEventListener("scroll", self.minimizeOnScrollHandler)
                }, self.removeMinOnScroll = function() {
                    self.stickyOnScroll && window.removeEventListener("scroll", self.minimizeOnScrollHandler)
                }, self.minimizeOnScrollHandler = function(e) {
                    var t = FWDUVPUtils.getScrollOffsets();
                    self.pageXOffset = t.x, self.pageYOffset = t.y, self.stageContainer.getBoundingClientRect().bottom < 0 ? self.setMinimized() : self.setNormal()
                }, self.setMinimized = function() {
                    self.isMin || self.isFullscreen_bl || (self.isMin = !0, self.main_do.getStyle().position = "fixed", self.main_do.getStyle().zIndex = 9999999999999, self.main_do.setAlpha(0), self.startPosisionOnMin())
                }, self.startPosisionOnMin = function() {
                    self.wasPlaylistShowed_bl = self.isPlaylistShowed_bl, self.showPlaylist(), self.resizeHandler(), self.positionOnMin()
                }, self.setNormal = function() {
                    self.isMin && (self.isMinShowed = !0, self.isMin = !1, self.main_do.getStyle().position = "relative", self.main_do.getStyle().zIndex = 0, FWDAnimation.killTweensOf(self.main_do), self.main_do.setAlpha(1), self.main_do.setX(0), self.main_do.setY(0), self.opener_do && self.opener_do.setX(-1e3), self.startPosisionOnNormal())
                }, self.startPosisionOnNormal = function() {
                    self.opener_do && self.opener_do.showCloseButton(), self.isPlaylistShowed_bl = self.wasPlaylistShowed_bl, self.isPlaylistShowed_bl && self.hidePlaylist(!0), self.resizeHandler()
                }, self.positionOnMin = function(e) {
                    if (self.isMin || e) {
                        var t = 5,
                            s = .2;
                        self.isMbl && (t = 0);
                        var o = 0;
                        if (self.isMinShowed || (s = 0, o = Math.round(self.tempStageHeight) + t), self.opener_do) var i = self.ws.w - self.opener_do.w - t,
                            l = self.ws.h - self.tempStageHeight - t + o - self.opener_do.h;
                        self.main_do.setX(self.ws.w - self.tempStageWidth - t), 0 == self.main_do.alpha || e ? (0 == self.main_do.alpha && (self.main_do.setY(self.ws.h), self.opener_do && (self.opener_do.setX(i), self.opener_do.setY(self.ws.h))), FWDAnimation.to(self.main_do, .8, {
                            alpha: 1,
                            y: self.ws.h - self.tempStageHeight - t + o,
                            delay: s,
                            ease: Expo.easeInOut
                        }), self.opener_do && (FWDAnimation.killTweensOf(self.opener_do), FWDAnimation.to(self.opener_do, .8, {
                            x: i,
                            y: l,
                            delay: s,
                            ease: Expo.easeInOut
                        }))) : (FWDAnimation.killTweensOf(self.main_do), self.main_do.setAlpha(1), self.main_do.setY(self.ws.h - self.tempStageHeight - t + o), self.opener_do && (FWDAnimation.killTweensOf(self.opener_do), self.opener_do.setX(i), self.opener_do.setY(l)))
                    }
                }, self.onInitlalizeScrollHandler = function() {
                    var e = FWDUVPUtils.getScrollOffsets();
                    self.pageXOffset = e.x, self.pageYOffset = e.y, self.main_do.getRect().top >= -self.sH && self.main_do.getRect().top < self.ws.h && (window.removeEventListener("scroll", self.onInitlalizeScrollHandler), self.setupPlayer())
                }, this.setupPlayer = function() {
                    self.main_do || (self.setupMainDo(), self.setupInfo(), self.setupData())
                }, self.setupLightBox = function() {
                    FWDUVPLightBox.setPrototype(), self.lightBox_do = new FWDUVPLightBox(self, self.lightBoxBackgroundColor_str, self.backgroundColor_str, self.lightBoxBackgroundOpacity, self.lightBoxWidth, self.lightBoxHeight), self.lightBox_do.addListener(FWDUVPLightBox.SHOW, self.lightBoxShowHandler), self.lightBox_do.addListener(FWDUVPLightBox.CLOSE, self.lightBoxCloseHandler), self.lightBox_do.addListener(FWDUVPLightBox.HIDE_COMPLETE, self.lightBoxHideCompleteHandler), self.setupPlayer()
                }, self.lightBoxShowHandler = function() {}, self.lightBoxCloseHandler = function() {
                    self.stop(), self.stopResizeHandler()
                }, self.lightBoxHideCompleteHandler = function() {
                    self.dispatchEvent(FWDUVPlayer.HIDE_LIGHTBOX_COMPLETE)
                }, self.setupMainDo = function() {
                    self.main_do = new FWDUVPDisplayObject("div", "relative"), self.main_do.screen.className = "fwduvp", self.hasPointerEvent_bl && (self.main_do.getStyle().touchAction = "none"), self.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)", self.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)", self.main_do.getStyle().width = "100%", self.main_do.getStyle().height = "100%", self.main_do.setBackfaceVisibility(), self.main_do.setBkColor(self.backgroundColor_str), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && self.main_do.setSelectable(!1), self.videoHolder_do = new FWDUVPDisplayObject("div"), self.main_do.addChild(self.videoHolder_do), self.displayType == FWDUVPlayer.STICKY ? (self.background_do = new FWDUVPDisplayObject("div"), self.background_do.getStyle().width = "100%", self.mainBackgroundImagePath_str && (self.mainBackground_do = new FWDUVPDisplayObject("div"), self.stageContainer.appendChild(self.mainBackground_do.screen)), self.stageContainer.appendChild(self.background_do.screen), self.stageContainer.appendChild(self.main_do.screen)) : self.displayType == FWDUVPlayer.FULL_SCREEN ? (self.stageContainer.style.overflow = "hidden", self.main_do.getStyle().position = "absolute", document.documentElement.appendChild(self.main_do.screen), self.stageContainer.style.zIndex = 9999999999998, self.main_do.getStyle().zIndex = 9999999999998) : self.displayType == FWDUVPlayer.BACKGROUND_VIDEO ? (document.documentElement.appendChild(self.main_do.screen), self.main_do.getStyle().zIndex = -9999999999998, self.main_do.getStyle().position = "fixed", document.documentElement.insertBefore(self.main_do.screen, document.documentElement.firstChild)) : self.displayType == FWDUVPlayer.LIGHTBOX ? (self.main_do.getStyle().position = "absolute", self.stageContainer = self.lightBox_do.mainLightBox_do.screen, self.stageContainer.appendChild(self.main_do.screen), self.main_do.setX(-1e4), self.main_do.setY(-1e4), self.main_do.setWidth(0), self.main_do.setHeight(0)) : (self.stageContainer.style.overflow = "hidden", self.stageContainer.appendChild(self.main_do.screen)), self.isEmbedded_bl && (self.main_do.getStyle().zIndex = 9999999999998)
                }, self.setupInfo = function() {
                    FWDUVPInfo.setPrototype(), self.info_do = new FWDUVPInfo(self, self.warningIconPath_str, self.showErrorInfo_bl), self.info_do.getStyle().zIndex = "9999999999999999"
                }, self.startResizeHandler = function() {
                    self.displayType == FWDUVPlayer.STICKY && (FWDUVPUtils.isAndroid && window.addEventListener("orientationchange", self.orientationChange), window.addEventListener("scroll", self.onScrollHandler)), self.displayType == FWDUVPlayer.LIGHTBOX && window.addEventListener("scroll", self.onScrollHandler), window.addEventListener("resize", self.onResizeHandler), self.onResizeHandler(!0), self.resizeHandlerId_to = setTimeout(function() {
                        self.resizeHandler()
                    }, 500)
                }, this.orientationChange = function() {
                    self.orintationChangeComplete_bl = !1, clearTimeout(self.resizeHandlerId_to), clearTimeout(self.resizeHandler2Id_to), clearTimeout(self.orientationChangeId_to), self.orientationChangeId_to = setTimeout(function() {
                        self.orintationChangeComplete_bl = !0, self.stageContainer.style.left = "0", self.resizeHandler(!0)
                    }, 1e3), self.stageContainer.style.left = "-5000px", self.preloader_do && self.preloader_do.setX(-5e3)
                }, self.onScrollHandler = function(e) {
                    if (self.displayType == FWDUVPlayer.STICKY && self.isMbl && self.onResizeHandler(), !self.lightBox_do || self.lightBox_do.isShowed_bl) {
                        self.scrollHandler();
                        var t = FWDUVPUtils.getScrollOffsets();
                        self.scrollOffsets = t
                    }
                }, self.scrollHandler = function() {
                    var e = FWDUVPUtils.getScrollOffsets();
                    self.pageXOffset = e.x, self.pageYOffset = e.y, self.displayType == FWDUVPlayer.LIGHTBOX ? (self.lightBox_do.setX(e.x), self.lightBox_do.setY(e.y)) : !self.isFullScreen_bl && self.displayType != FWDUVPlayer.FULL_SCREEN || (self.main_do.setX(e.x), self.main_do.setY(e.y))
                }, self.stopResizeHandler = function() {
                    window.removeEventListener ? window.removeEventListener("resize", self.onResizeHandler) : window.detachEvent && window.detachEvent("onresize", self.onResizeHandler), clearTimeout(self.resizeHandlerId_to)
                }, self.onResizeHandler = function(e) {
                    self.resizeHandler(), clearTimeout(self.resizeHandler2Id_to), self.resizeHandler2Id_to = setTimeout(function() {
                        self.resizeHandler()
                    }, 300)
                }, self.prevVpW, self.resizeHandler = function(e, t) {
                    self.tempPlaylistPosition_str;
                    var s = FWDUVPUtils.getViewportSize(),
                        o = FWDUVPUtils.getScrollOffsets();
                    if (self.ws = s, self.showPlaylistOnFullScreen = self.data.showPlaylistOnFullScreen, self.ws.w < 1e3 && (self.showPlaylistOnFullScreen = !1), self.displayType != FWDUVPlayer.STICKY || self.isFullScreen_bl)
                        if (self.displayType != FWDUVPlayer.LIGHTBOX || self.isFullScreen_bl) self.isFullScreen_bl || self.displayType == FWDUVPlayer.FULL_SCREEN ? (self.main_do.setX(0), self.main_do.setY(0), self.sW = s.w, self.sH = s.h) : self.displayType == FWDUVPlayer.AFTER_PARENT ? (self.main_do.setX(0), self.main_do.setY(0), self.sW = self.stageContainer.offsetWidth, self.sH = self.stageContainer.offsetHeight) : (self.stageContainer.style.width = "100%", self.stageContainer.offsetWidth > self.maxWidth && (self.stageContainer.style.width = self.maxWidth + "px"), self.sW = self.stageContainer.offsetWidth, self.autoScale_bl ? self.sH = parseInt(self.maxHeight * (self.sW / self.maxWidth)) : self.sH = self.maxHeight, self.tempStageHeight = self.sH);
                        else {
                            if (!self.lightBox_do.isShowed_bl || !self.main_do) return;
                            self.lightBoxWidth > s.w ? (self.finalLightBoxWidth = s.w, self.finalLightBoxHeight = parseInt(self.lightBoxHeight * (s.w / self.lightBoxWidth))) : (self.finalLightBoxWidth = self.lightBoxWidth, self.finalLightBoxHeight = self.lightBoxHeight), self.lightBox_do.setWidth(s.w), self.lightBox_do.setHeight(s.h), self.lightBox_do.setX(o.x), self.lightBox_do.setY(o.y), self.lightBox_do.mainLightBox_do.setX(parseInt((s.w - self.finalLightBoxWidth) / 2)), self.lightBox_do.mainLightBox_do.setY(parseInt((s.h - self.finalLightBoxHeight) / 2)), self.lightBox_do.clsBtn && self.lightBox_do.isShowed_bl && (self.lightBox_do.clsBtn.setX(s.w - self.lightBox_do.clsBtn.w - 15), self.lightBox_do.clsBtn.setY(15)), self.main_do.setX(0), self.main_do.setY(0), self.lightBox_do.mainLightBox_do.setWidth(self.finalLightBoxWidth), self.lightBox_do.mainLightBox_do.setHeight(self.finalLightBoxHeight), self.sW = self.finalLightBoxWidth, self.sH = self.finalLightBoxHeight
                        }
                    else self.main_do.getStyle().width = "100%", self.main_do.getWidth() > self.maxWidth && self.main_do.setWidth(self.maxWidth), self.sW = self.main_do.getWidth(), self.autoScale_bl ? self.sH = parseInt(self.maxHeight * (self.sW / self.maxWidth)) : self.sH = self.maxHeight;
                    self.sH > s.h && self.isFullScreen_bl && (self.sH = s.h), self.data && self.playlist_do && (self.playlistHeight = parseInt(self.data.playlistBottomHeight)), self.isMin && !self.isFullScreen_bl && (self.sW = Math.min(self.stickyOnScrollWidth - 10, self.ws.w - 10), self.sH = parseInt(self.stickyOnScrollHeight * (self.sW / self.stickyOnScrollWidth)), self.tempStageHeight = self.sH), self.data && (self.tempPlaylistPosition_str = self.data.playlistPosition_str, (self.sW < 800 || self.ec && self.sH < 600) && (self.tempPlaylistPosition_str = "bottom"), self.playlistPosition_str = self.tempPlaylistPosition_str, self.playlist_do && (self.playlist_do.position_str = self.tempPlaylistPosition_str)), self.playlist_do && self.isPlaylistShowed_bl ? "bottom" == self.playlistPosition_str ? (self.vidStageWidth = self.sW, self.sH += self.playlistHeight + self.spaceBetweenControllerAndPlaylist, self.vidStageHeight = self.sH - self.playlistHeight - self.spaceBetweenControllerAndPlaylist, self.displayType == FWDUVPlayer.FULL_SCREEN && self.controller_do.disablePlaylistButton()) : "right" == self.playlistPosition_str && (self.isFullScreen_bl && !self.showPlaylistOnFullScreen ? self.vidStageWidth = self.sW : self.vidStageWidth = self.sW - self.playlistWidth - self.spaceBetweenControllerAndPlaylist, self.controller_do && self.controller_do.enablePlaylistButton(), self.vidStageHeight = self.sH) : (self.vidStageWidth = self.sW, self.vidStageHeight = self.sH), self.controller_do && self.playlist_do && ("right" == self.playlistPosition_str ? self.isFullScreen_bl && !self.showPlaylistOnFullScreen ? self.controller_do.disablePlaylistButton() : self.controller_do.enablePlaylistButton() : self.isEmbedded_bl && self.controller_do.disablePlaylistButton()), self.mainBackground_do && (self.mainBackground_do.setWidth(self.ws.w), self.mainBackground_do.setHeight(self.sH)), e || (FWDAnimation.killTweensOf(self), self.tempStageWidth = self.sW, self.tempStageHeight = self.sH, self.tempVidStageWidth = self.vidStageWidth, self.tempVidStageHeight = Math.max(0, self.vidStageHeight), self.resizeFinal(t), self.prevVpW == s.w && self.displayType == FWDUVPlayer.STICKY || self.setStageContainerFinalHeightAndPosition(t)), setTimeout(function() {
                        self.prevVpW = s.w
                    }, 50)
                }, this.resizeFinal = function(e) {
                    if (self.displayType == FWDUVPlayer.STICKY || self.isMin || (self.stageContainer.style.height = self.tempStageHeight + "px"), self.mainBackground_do && (self.mainBackground_do.setWidth(self.ws.w), self.mainBackground_do.setHeight(self.tempStageHeight)), self.main_do.setWidth(self.tempStageWidth), self.videoHolder_do.setWidth(self.tempVidStageWidth), self.videoHolder_do.setHeight(self.tempVidStageHeight), self.showPlaylistButtonAndPlaylist_bl && self.isPlaylistShowed_bl && self.playlistPosition_str, self.main_do.setHeight(self.tempStageHeight), self.displayType == FWDUVPlayer.LIGHTBOX && self.lightBox_do.mainLightBox_do.setY(parseInt((self.ws.h - self.tempStageHeight) / 2)), self.audioScreen_do && self.videoType_str == FWDUVPlayer.MP3 && self.audioScreen_do.resizeAndPosition(self.tempVidStageWidth, self.tempVidStageHeight), self.ytb_do && self.videoType_str == FWDUVPlayer.YOUTUBE && (self.ytb_do.setWidth(self.tempVidStageWidth), self.ytb_do.setHeight(self.tempVidStageHeight)), self.logo_do && self.logo_do.positionAndResize(), self.playlist_do && !FWDAnimation.isTweening(self) && (self.isMbl ? self.playlist_do.resizeAndPosition(!1) : self.playlist_do.resizeAndPosition(e)), self.annotations_do && (FWDAnimation.isTweening(self) ? self.annotations_do.position(!0) : self.annotations_do.position(!1)), self.controller_do && self.controller_do.resizeAndPosition(), self.categories_do && self.categories_do.resizeAndPosition(), self.videoScreen_do && (self.videoType_str == FWDUVPlayer.VIDEO || self.videoType_str == FWDUVPlayer.HLS_JS || self.videoType_str == FWDUVPlayer.DASH)) {
                        if (self.fillEntireVideoScreen_bl) {
                            if (self.videoScreen_do && self.videoScreen_do.video_el && 0 != self.videoScreen_do.video_el.videoWidth) {
                                var t = self.videoScreen_do.video_el.videoWidth,
                                    s = self.videoScreen_do.video_el.videoHeight,
                                    o = self.tempVidStageWidth / t,
                                    i = self.tempVidStageHeight / s;
                                totalScale = 0, i <= o ? totalScale = o : o <= i && (totalScale = i), self.finaadsIdeoScreenW = parseInt(t * totalScale), self.finaadsIdeoScreenH = parseInt(s * totalScale), self.finaadsIdeoScreenX = parseInt((self.tempVidStageWidth - self.finaadsIdeoScreenW) / 2), self.finaadsIdeoScreenY = parseInt((self.tempVidStageHeight - self.finaadsIdeoScreenH) / 2)
                            }
                        } else self.finaadsIdeoScreenW = self.tempVidStageWidth, self.finaadsIdeoScreenH = self.tempVidStageHeight, self.finaadsIdeoScreenX = self.finaadsIdeoScreenY = 0;
                        self.videoScreen_do.resizeAndPosition(self.finaadsIdeoScreenW, self.finaadsIdeoScreenH, self.finaadsIdeoScreenX, self.finaadsIdeoScreenY)
                    }
                    self.isIMA && self.IMA && self.IMA.resizeAndPosition(), self.ytb_do && self.ytb_do.ytb && self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do.resizeAndPosition(), self.vimeo_do && self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do.resizeAndPosition(), self.preloader_do && self.positionPreloader(), self.dumyClick_do && (self.is360 && self.videoType_str == FWDUVPlayer.YOUTUBE ? self.dumyClick_do.setWidth(0) : (self.dumyClick_do.setWidth(self.tempVidStageWidth), self.isMbl || self.videoType_str != FWDUVPlayer.YOUTUBE || self.isAdd_bl, self.dumyClick_do.setHeight(self.tempVidStageHeight))), self.videoHider_do && self.resizeVideoHider(), self.lrgPlayBtn && self.positionLargePlayButton(), self.videoPoster_do && self.videoPoster_do.allowToShow_bl && self.videoPoster_do.positionAndResize(), self.popw_do && self.popw_do.isShowed_bl && self.popw_do.positionAndResize(), self.embedWindow_do && self.embedWindow_do.isShowed_bl && self.embedWindow_do.positionAndResize(), self.passWindow_do && self.passWindow_do.isShowed_bl && self.passWindow_do.positionAndResize(), self.infoWindow_do && self.infoWindow_do.isShowed_bl && self.infoWindow_do.positionAndResize(), self.info_do && self.info_do.isShowed_bl && self.info_do.positionAndResize(), self.shareWindow_do && self.shareWindow_do.isShowed_bl && self.shareWindow_do.positionAndResize(), self.adsStart_do && self.isAdd_bl && self.positionAds(), self.subtitle_do && self.subtitle_do.position(e), self.popupAds_do && self.popupAds_do.position(e), self.positionAdsImage(), self.positionOnMin()
                }, this.setStageContainerFinalHeightAndPosition = function(e) {
                    self.displayType == FWDUVPlayer.STICKY && (self.allowToResizeAndPosition_bl = !0, clearTimeout(self.showPlaylistWithDelayId_to), self.horizontalPosition_str == FWDUVPlayer.LEFT ? (self.main_do.setX(self.offsetX), self.opener_do && ("right" == self.data.openerAlignment_str ? self.opener_do.setX(Math.round(self.sW - self.opener_do.w + self.offsetX)) : self.opener_do.setX(self.offsetX))) : self.horizontalPosition_str == FWDUVPlayer.CENTER ? (self.main_do.setX(Math.round((self.ws.w - self.sW) / 2)), self.opener_do && ("right" == self.data.openerAlignment_str ? self.opener_do.setX(parseInt((self.ws.w - self.sW) / 2) + self.sW - self.opener_do.w) : self.opener_do.setX(self.main_do.x))) : self.horizontalPosition_str == FWDUVPlayer.RIGHT && (self.main_do.setX(Math.round(self.ws.w - self.sW - self.offsetX)), self.opener_do && ("right" == self.data.openerAlignment_str ? self.opener_do.setX(Math.round(self.ws.w - self.opener_do.w - self.offsetX)) : self.opener_do.setX(Math.round(self.ws.w - self.sW - self.offsetX)))), e ? self.position_str == FWDUVPlayer.POSITION_TOP ? (self.isShowed_bl && !self.isShowedFirstTime_bl ? FWDAnimation.to(self.stageContainer, .8, {
                        css: {
                            top: self.offsetY
                        },
                        ease: Expo.easeInOut
                    }) : FWDAnimation.to(self.stageContainer, .8, {
                        css: {
                            top: -self.sH
                        },
                        ease: Expo.easeInOut
                    }), self.isShowedFirstTime_bl ? self.opener_do && FWDAnimation.to(self.opener_do, .8, {
                        y: self.sH - self.opener_do.h,
                        ease: Expo.easeInOut
                    }) : self.opener_do && FWDAnimation.to(self.opener_do, .8, {
                        y: self.sH,
                        ease: Expo.easeInOut
                    })) : (self.isShowed_bl && !self.isShowedFirstTime_bl ? FWDAnimation.to(self.stageContainer, .8, {
                        css: {
                            top: self.ws.h - self.sH - self.offsetY
                        },
                        ease: Expo.easeInOut
                    }) : FWDAnimation.to(self.stageContainer, .8, {
                        css: {
                            top: self.ws.h
                        },
                        ease: Expo.easeInOut,
                        onComplete: self.moveWheyLeft
                    }), self.isShowedFirstTime_bl ? self.opener_do && FWDAnimation.to(self.opener_do, .8, {
                        y: 0,
                        ease: Expo.easeInOut
                    }) : self.opener_do && FWDAnimation.to(self.opener_do, .8, {
                        y: -self.opener_do.h,
                        ease: Expo.easeInOut
                    })) : (FWDAnimation.killTweensOf(self.stageContainer), self.position_str == FWDUVPlayer.POSITION_TOP ? (self.isShowed_bl && !self.isShowedFirstTime_bl ? self.stageContainer.style.top = self.offsetY + "px" : self.stageContainer.style.top = -self.sH + "px", self.isShowedFirstTime_bl ? self.opener_do && self.opener_do.setY(self.sH - self.opener_do.h) : self.opener_do && self.opener_do.setY(self.sH)) : (self.isShowed_bl && !self.isShowedFirstTime_bl ? self.stageContainer.style.top = self.ws.h - self.sH - self.offsetY + "px" : self.stageContainer.style.top = self.ws.h + "px", self.isShowedFirstTime_bl ? self.opener_do && self.opener_do.setY(0) : self.opener_do && self.opener_do.setY(-self.opener_do.h))))
                }, this.setupClickScreen = function() {
                    self.dumyClick_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (self.dumyClick_do.setBkColor("#00FF00"), self.dumyClick_do.setAlpha(.001)), self.hasPointerEvent_bl ? (self.dumyClick_do.screen.addEventListener("pointerdown", self.playPauseDownHandler), self.dumyClick_do.screen.addEventListener("pointerup", self.playPauseClickHandler), self.dumyClick_do.screen.addEventListener("pointermove", self.playPauseMoveHandler)) : self.isMbl ? self.dumyClick_do.screen.addEventListener("click", self.playPauseClickHandler) : (self.dumyClick_do.screen.addEventListener("mousedown", self.playPauseDownHandler), self.dumyClick_do.screen.addEventListener("mouseup", self.playPauseClickHandler), self.dumyClick_do.screen.addEventListener("mousemove", self.playPauseMoveHandler)), self.hideClickScreen(), self.videoHolder_do.addChild(self.dumyClick_do)
                }, this.playPauseDownHandler = function(e) {
                    self.isClickHandlerMoved_bl = !1;
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    self.firstDommyTapX = t.screenX, self.firstDommyTapY = t.screenY, self.is360 && (self.dumyClick_do.getStyle().cursor = "url(" + self.data.grabPath_str + "), default")
                }, this.playPauseMoveHandler = function(e) {
                    var t, s, o = FWDUVPUtils.getViewportMouseCoordinates(e);
                    e.touches && 1 != e.touches.length || (t = Math.abs(o.screenX - self.firstDommyTapX), s = Math.abs(o.screenY - self.firstDommyTapY), self.isMbl && (10 < t || 10 < s) ? self.isClickHandlerMoved_bl = !0 : !self.isMbl && (2 < t || 2 < s) && (self.isClickHandlerMoved_bl = !0))
                }, this.playPauseClickHandler = function(e) {
                    self.is360 && (self.dumyClick_do.getStyle().cursor = "url(" + self.data.handPath_str + "), default"), 2 != e.button && (self.isClickHandlerMoved_bl || (self.isAdd_bl ? self.data.adsPageToOpenURL_str && "none" != self.data.adsPageToOpenURL_str && (self.ClickTracking && self.executeVastEvent(self.ClickTracking), window.open(self.data.adsPageToOpenURL_str, self.data.adsPageToOpenTarget_str), self.pause()) : self.disableClick_bl || (self.firstTapPlaying_bl = self.isPlaying_bl, (FWDUVPlayer.keyboardCurInstance = self).controller_do && 0 != self.controller_do.mainHld.y && self.isMbl || (self.isMbl || (FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.PAUSE_ALL_VIDEOS ? FWDUVPlayer.pauseAllVideos(self) : FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.STOP_ALL_VIDEOS && FWDUVPlayer.stopAllVideos(self)), self.videoType_str == FWDUVPlayer.YOUTUBE ? self.ytb_do.togglePlayPause() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do.togglePlayPause() : FWDUVPlayer.hasHTML5Video ? self.videoScreen_do && self.videoScreen_do.togglePlayPause() : self.isFlashScreenReady_bl && self.flashObject.togglePlayPause()))))
                }, this.showClickScreen = function() {
                    self.dumyClick_do.setVisible(!0), self.isAdd_bl && self.data.adsPageToOpenURL_str && "none" != self.data.adsPageToOpenURL_str ? self.dumyClick_do.setButtonMode(!0) : self.is360 ? self.dumyClick_do.getStyle().cursor = "url(" + self.data.handPath_str + "), default" : self.dumyClick_do.setButtonMode(!1)
                }, this.hideClickScreen = function() {
                    self.dumyClick_do.setVisible(!1)
                }, this.setupDisableClick = function() {
                    self.disableClick_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (self.disableClick_do.setBkColor("#ff0000"), self.disableClick_do.setAlpha(.001)), self.main_do.addChild(self.disableClick_do)
                }, this.disableClick = function() {
                    self.disableClick_bl = !0, clearTimeout(self.disableClickId_to), self.disableClick_do && (self.disableClick_do.setWidth(self.sW), self.disableClick_do.setHeight(self.sH)), self.disableClickId_to = setTimeout(function() {
                        self.disableClick_do && (self.disableClick_do.setWidth(0), self.disableClick_do.setHeight(0)), self.disableClick_bl = !1
                    }, 500)
                }, this.showDisable = function() {
                    self.disableClick_do.w != self.sW && (self.disableClick_do.setWidth(self.sW), self.disableClick_do.setHeight(self.sH))
                }, this.hideDisable = function() {
                    self.disableClick_do && 0 != self.disableClick_do.w && (self.disableClick_do.setWidth(0), self.disableClick_do.setHeight(0))
                }, this.addDoubleClickSupport = function() {
                    self.hasPointerEvent_bl ? self.dumyClick_do.screen.addEventListener("pointerdown", self.onFirstDown) : (self.isMbl || self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown), self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown)), self.setupVisualization()
                }, this.onFirstDown = function(e) {
                    if (2 != e.button) {
                        self.isFullscreen_bl && e.preventDefault && e.preventDefault();
                        var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                        self.firstTapX = t.screenX - self.main_do.getGlobalX(), self.firstTapY = t.screenY - self.main_do.getGlobalY(), self.firstTapPlaying_bl = self.isPlaying_bl, FWDUVPUtils.isIEWebKit || (self.hasPointerEvent_bl ? (self.dumyClick_do.screen.removeEventListener("pointerdown", self.onFirstDown), self.dumyClick_do.screen.addEventListener("pointerdown", self.onSecondDown)) : (self.isMbl || (self.dumyClick_do.screen.addEventListener("mousedown", self.onSecondDown), self.dumyClick_do.screen.removeEventListener("mousedown", self.onFirstDown)), self.dumyClick_do.screen.addEventListener("touchstart", self.onSecondDown), self.dumyClick_do.screen.removeEventListener("touchstart", self.onFirstDown)), clearTimeout(self.secondTapId_to), self.secondTapId_to = setTimeout(self.doubleTapExpired, 500))
                    }
                }, this.doubleTapExpired = function() {
                    clearTimeout(self.secondTapId_to), self.hasPointerEvent_bl ? (self.dumyClick_do.screen.removeEventListener("pointerdown", self.onSecondDown), self.dumyClick_do.screen.addEventListener("pointerdown", self.onFirstDown)) : (self.dumyClick_do.screen.removeEventListener("touchstart", self.onSecondDown), self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown), self.isMbl || (self.dumyClick_do.screen.removeEventListener("mousedown", self.onSecondDown), self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown)))
                }, this.onSecondDown = function(e) {
                    e.preventDefault && e.preventDefault();
                    var t, s, o = FWDUVPUtils.getViewportMouseCoordinates(e);
                    FWDUVPUtils.isIEWebKit && (self.firstTapPlaying_bl = self.isPlaying_bl), e.touches && 1 != e.touches.length || (t = Math.abs(o.screenX - self.main_do.getGlobalX() - self.firstTapX), s = Math.abs(o.screenY - self.main_do.getGlobalY() - self.firstTapY), 10 < t || 10 < s || (self.firstTapX < .33 * self.tempVidStageWidth ? self.isPlaying_bl || (self.skipOnDb_bl = !0, self.rewind(10), self.addVisualization("left"), setTimeout(function() {
                        self.isPlaying_bl || self.play()
                    }, 200), setTimeout(function() {
                        self.skipOnDb_bl = !1
                    }, 500)) : self.firstTapX > .67 * self.tempVidStageWidth ? self.isPlaying_bl || (self.skipOnDb_bl = !0, self.rewind(-10), self.addVisualization("right"), setTimeout(function() {
                        self.isPlaying_bl || self.play()
                    }, 200), setTimeout(function() {
                        self.skipOnDb_bl = !1
                    }, 500)) : (self.switchFullScreenOnDoubleClick(), self.firstTapPlaying_bl ? self.play() : self.pause())))
                }, this.switchFullScreenOnDoubleClick = function() {
                    self.disableClick(), self.isFullScreen_bl ? self.goNormalScreen() : self.goFullScreen()
                }, self.lasPosition, this.setupVisualization = function() {
                    self.mainVz_do = new FWDUVPDisplayObject("div"), self.mainVz_do.getStyle().pointerEvents = "none", self.mainVz_do.getStyle().backgroundColor = "rgba(0,0,0,0.01)", self.mainVzBackgrond_do = new FWDUVPDisplayObject("div"), self.mainVzBackgrond_do.getStyle().width = "100%", self.mainVzBackgrond_do.getStyle().height = "100%", self.mainVzBackgrond_do.getStyle().backgroundColor = "rgba(255,255,255, .15)", self.mainVz_do.getStyle().borderRadius = "100%", self.mainVz_do.addChild(self.mainVzBackgrond_do), self.circle_do = new FWDUVPTransformDisplayObject("div"), self.circle_do.getStyle().backgroundColor = "rgba(255,255,255, .15)", self.circle_do.getStyle().borderRadius = "100%", self.mainVz_do.addChild(self.circle_do);
                    var e = new Image;
                    e.src = self.mainFolderPath_str + this.sknPth + "vis.png", self.vzImg1_do = new FWDUVPTransformDisplayObject("img"), self.vzImg1_do.setScreen(e), self.vzImg1_do.setWidth(17), self.vzImg1_do.setHeight(23), self.mainVz_do.addChild(self.vzImg1_do);
                    var t = new Image;
                    t.src = self.mainFolderPath_str + this.sknPth + "vis.png", self.vzImg2_do = new FWDUVPTransformDisplayObject("img"), self.vzImg2_do.setScreen(t), self.vzImg2_do.setWidth(17), self.vzImg2_do.setHeight(23), self.mainVz_do.addChild(self.vzImg2_do);
                    var s = new Image;
                    s.src = self.mainFolderPath_str + this.sknPth + "vis.png", self.vzImg3_do = new FWDUVPTransformDisplayObject("img"), self.vzImg3_do.setScreen(s), self.vzImg3_do.setWidth(17), self.vzImg3_do.setHeight(23), self.mainVz_do.addChild(self.vzImg3_do)
                }, this.addVisualization = function(e) {
                    clearTimeout(self.vizFinisedId_to), clearTimeout(self.vizFinished2Id_to);
                    var t = Math.round(self.tempVidStageWidth / 2),
                        s = Math.round(1.5 * self.tempVidStageHeight);
                    FWDAnimation.killTweensOf(self.mainVzBackgrond_do), self.lasPosition != e && self.mainVzBackgrond_do.setAlpha(0), FWDAnimation.to(self.mainVzBackgrond_do, .4, {
                        alpha: 1
                    }), self.mainVz_do.setVisible(!0), self.mainVz_do.setWidth(t), self.mainVz_do.setHeight(s), self.mainVz_do.setY((self.tempVidStageHeight - s) / 2);
                    var o = Math.abs(self.mainVz_do.y);
                    self.controller_do && self.controller_do.isShowed_bl && (o -= self.controller_do.sH / 2), self.videoHolder_do.contains(self.mainVz_do) || (self.controller_do ? self.videoHolder_do.addChildAt(self.mainVz_do, self.videoHolder_do.getChildIndex(self.controller_do) - 1) : self.videoHolder_do.addChild(self.mainVz_do)), "right" == e ? (self.mainVz_do.getStyle().borderRadius = "100% 0% 0% 100%", self.mainVz_do.setX(t), self.vzImg1_do.setRotation(0), self.vzImg2_do.setRotation(0), self.vzImg3_do.setRotation(0)) : (self.mainVz_do.getStyle().borderRadius = "0% 100% 100% 0%", self.mainVz_do.setX(0), self.vzImg1_do.setRotation(180), self.vzImg2_do.setRotation(180), self.vzImg3_do.setRotation(180)), self.vzImg1_do.setX(Math.round(t - 3 * self.vzImg1_do.w) / 2), self.vzImg1_do.setY(Math.round(o + (self.tempVidStageHeight - self.vzImg1_do.h) / 2)), self.vzImg2_do.setX(self.vzImg1_do.x + self.vzImg1_do.w), self.vzImg2_do.setY(self.vzImg1_do.y), self.vzImg3_do.setX(self.vzImg2_do.x + self.vzImg2_do.w), self.vzImg3_do.setY(self.vzImg2_do.y), FWDAnimation.killTweensOf(self.vzImg1_do), FWDAnimation.killTweensOf(self.vzImg2_do), FWDAnimation.killTweensOf(self.vzImg3_do), self.vzImg1_do.setAlpha(0), self.vzImg2_do.setAlpha(0), self.vzImg3_do.setAlpha(0), "right" == e ? (FWDAnimation.to(self.vzImg1_do, .4, {
                        alpha: 1
                    }), FWDAnimation.to(self.vzImg1_do, .4, {
                        alpha: 0,
                        delay: .3
                    }), FWDAnimation.to(self.vzImg2_do, .4, {
                        alpha: 1,
                        delay: .3
                    }), FWDAnimation.to(self.vzImg2_do, .4, {
                        alpha: 0,
                        delay: .6
                    }), FWDAnimation.to(self.vzImg3_do, .4, {
                        alpha: 1,
                        delay: .6
                    }), FWDAnimation.to(self.vzImg3_do, .4, {
                        alpha: 0,
                        delay: .9
                    })) : (FWDAnimation.to(self.vzImg3_do, .4, {
                        alpha: 1
                    }), FWDAnimation.to(self.vzImg3_do, .4, {
                        alpha: 0,
                        delay: .3
                    }), FWDAnimation.to(self.vzImg2_do, .4, {
                        alpha: 1,
                        delay: .3
                    }), FWDAnimation.to(self.vzImg2_do, .4, {
                        alpha: 0,
                        delay: .6
                    }), FWDAnimation.to(self.vzImg1_do, .4, {
                        alpha: 1,
                        delay: .6
                    }), FWDAnimation.to(self.vzImg1_do, .4, {
                        alpha: 0,
                        delay: .9
                    })), FWDAnimation.killTweensOf(self.circle_do), self.circle_do.setAlpha(1), self.circle_do.setScale2(1), self.circle_do.setWidth(t), self.circle_do.setHeight(t), self.circle_do.setScale2(0), self.circle_do.setX(self.firstTapX - self.mainVz_do.x - self.circle_do.w / 2), self.circle_do.setY(self.firstTapY + o - self.circle_do.w / 2), FWDAnimation.to(self.circle_do, .8, {
                        scale: 2,
                        ease: Expo.easeInOut
                    }), self.vizFinisedId_to = setTimeout(function() {
                        FWDAnimation.to(self.mainVzBackgrond_do, .4, {
                            alpha: 0
                        }), FWDAnimation.to(self.circle_do, .4, {
                            alpha: 0
                        }), self.vizFinished2Id_to = setTimeout(function() {
                            self.mainVz_do.setVisible(!1)
                        }, 400)
                    }, 800), self.lasPosition = e
                }, this.stopVisualization = function() {
                    self.mainVz_do && (clearTimeout(self.vizFinisedId_to), clearTimeout(self.vizFinished2Id_to), self.mainVz_do.setVisible(!1))
                }, this.setupVideoHider = function() {
                    self.videoHider_do = new FWDUVPDisplayObject("div"), self.videoHolder_do.addChild(self.videoHider_do)
                }, this.showVideoHider = function() {
                    !self.isVideoHiderShowed_bl && self.videoHider_do && (self.isVideoHiderShowed_bl = !0, self.videoHider_do.setVisible(!0), self.resizeVideoHider())
                }, this.hideVideoHider = function() {
                    self.isVideoHiderShowed_bl && (self.isVideoHiderShowed_bl = !1, clearTimeout(self.videoHilderId_to), self.videoHilderId_to = setTimeout(function() {
                        self.videoHider_do.setVisible(!1)
                    }, 300))
                }, this.resizeVideoHider = function() {
                    self.isVideoHiderShowed_bl && (self.videoHider_do.setWidth(self.tempStageWidth), self.videoHider_do.setHeight(self.tempStageHeight))
                }, this.setupYoutubeAPI = function() {
                    if (!self.ytb_do)
                        if ("undefined" != typeof YT && YT.Player) self.setupYoutubePlayer();
                        else if (FWDUVPlayer.isYoutubeAPILoadedOnce_bl) self.keepCheckingYoutubeAPI_int = setInterval(function() {
                        "undefined" != typeof YT && YT && YT.Player && (-1 == self.videoSourcePath_str.indexOf("youtube.") && clearInterval(self.keepCheckingYoutubeAPI_int), clearInterval(self.keepCheckingYoutubeAPI_int), self.setupYoutubePlayer())
                    }, 50);
                    else {
                        var e = document.createElement("script");
                        e.src = "https://www.youtube.com/iframe_api";
                        var t = document.getElementsByTagName("script")[0];
                        t.parentNode.insertBefore(e, t), e.onload = function() {
                            self.checkIfYoutubePlayerIsReadyId_int = setInterval(function() {
                                YT && YT.Player && (clearInterval(self.checkIfYoutubePlayerIsReadyId_int), self.setupYoutubePlayer())
                            }, 50)
                        }, e.onerror = function() {
                            setTimeout(function() {
                                self.showSourceError("Error loading Youtube API")
                            }, 500)
                        }, FWDUVPlayer.isYoutubeAPILoadedOnce_bl = !0
                    }
                }, this.setupYoutubePlayer = function() {
                    self.ytb_do || (FWDUVPYoutubeScreen.setPrototype(), self.ytb_do = new FWDUVPYoutubeScreen(self, self.data.volume), self.ytb_do.addListener(FWDUVPYoutubeScreen.READY, self.youtubeReadyHandler), self.ytb_do.addListener(FWDUVPVideoScreen.ERROR, self.videoScreenErrorHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.STOP, self.videoScreenStopHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY, self.videoScreenPlayHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.PAUSE, self.videoScreenPauseHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE, self.videoScreenUpdateHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.CUED, self.youtubeScreenCuedHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.QUALITY_CHANGE, self.youtubeScreenQualityChangeHandler), self.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE_SUBTITLE, self.videoScreenUpdateSubtitleHandler))
                }, this.youtubeReadyHandler = function(e) {
                    self.isYoutubeReady_bl = !0, self.hidePreloaderId_to = setTimeout(function() {
                        self.preloader_do && self.preloader_do.hide(!0)
                    }, 50), self.isTempYoutubeAdd_bl = self.isAdd_bl, self.isAdd_bl ? self.videoType_str == FWDUVPlayer.YOUTUBE && self.setSource(self.addSource_str) : self.videoType_str == FWDUVPlayer.YOUTUBE && self.updateAds(0, !0)
                }, this.youtubeScreenCuedHandler = function() {
                    self.main_do && self.main_do.contains(self.info_do) && self.main_do.removeChild(self.info_do)
                }, this.youtubeScreenQualityChangeHandler = function(e) {
                    self.videoType_str == FWDUVPlayer.VIDEO && (self.curDurration = self.videoScreen_do.curDuration), self.controller_do && self.controller_do.updateQuality(e.levels, e.qualityLevel)
                }, this.setupVimeoAPI = function() {
                    if (!self.vimeo_do)
                        if ("undefined" != typeof Vimeo && Vimeo.Player) self.setupVimeoPlayer();
                        else if (FWDUVPlayer.isVimeoAPILoadedOnce_bl) self.keepCheckingVimeoAPI_int = setInterval(function() {
                        "undefined" != typeof Vimeo && Vimeo && Vimeo.Player && (-1 == self.videoSourcePath_str.indexOf("vimeo.") && clearInterval(self.keepCheckingVimeoAPI_int), clearInterval(self.keepCheckingVimeoAPI_int), self.setupVimeoPlayer())
                    }, 50);
                    else {
                        var e = document.createElement("script");
                        e.src = "https://player.vimeo.com/api/player.js";
                        var t = document.getElementsByTagName("script")[0];
                        t.parentNode.insertBefore(e, t), e.onload = function() {
                            self.keepCheckingVimeoAPI_int = setInterval(function() {
                                "undefined" != typeof Vimeo && Vimeo && Vimeo.Player && (clearInterval(self.keepCheckingVimeoAPI_int), self.setupVimeoPlayer())
                            }, 50)
                        }, e.onerror = function() {
                            setTimeout(function() {
                                self.showSourceError("Error loading Vimeo API")
                            }, 500)
                        }, FWDUVPlayer.isVimeoAPILoadedOnce_bl = !0
                    }
                }, this.setupVimeoPlayer = function() {
                    self.vimeo_do || (FWDUVPVimeoScreen.setPrototype(), self.vimeo_do = new FWDUVPVimeoScreen(self, self.data.volume), self.vimeo_do.addListener(FWDUVPVimeoScreen.ERROR, self.vimeoInitErrorHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.READY, self.vimeoReadyHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.STOP, self.videoScreenStopHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.PLAY, self.videoScreenPlayHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.PAUSE, self.videoScreenPauseHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.UPDATE, self.videoScreenUpdateHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler), self.vimeo_do.addListener(FWDUVPVimeoScreen.UPDATE_SUBTITLE, self.videoScreenUpdateSubtitleHandler))
                }, this.vimeoInitErrorHandler = function(e) {
                    self.showSourceError(e.error)
                }, this.vimeoReadyHandler = function(e) {
                    self.isVimeoReady_bl = !0, clearInterval(self.hidePreloaderId_to), self.hidePreloaderId_to = setTimeout(function() {
                        self.preloader_do && self.preloader_do.hide(!0)
                    }, 50), self.isAdd_bl ? self.videoType_str == FWDUVPlayer.VIMEO && self.setSource(self.addSource_str) : self.videoType_str == FWDUVPlayer.VIMEO && self.updateAds(0, !0)
                }, self.setupContextMenu = function() {
                    FWDUVPContextMenu.setPrototype(), self.customContextMenu_do = new FWDUVPContextMenu(self, self.data)
                }, self.setupRSM = function() {
                    window.addEventListener("beforeunload", function(e) {
                        Math.random();
                        if (self.isPlaying_bl && !self.isAdd_bl) {
                            document.cookie = "fwduvp_video_path=" + self.videoSourcePath_str + "; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/";
                            var t = self.getCurrentTime();
                            5 == t.length && (t = "00:" + t), document.cookie = "fwduvp_time=" + t + "; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/"
                        }
                    })
                }, self.setupData = function() {
                    FWDUVPData.setPrototype(), self.data = new FWDUVPData(self.props_obj, self.rootElement_el, self), self.data.useYoutube_bl = self.useYoutube_bl, self.mainBackground_do && (self.mainBackground_do.getStyle().background = "url('" + self.mainBackgroundImagePath_str + "')"), self.data.addListener(FWDUVPData.VAST_LOADED, self.vastLoaded), self.data.addListener(FWDUVPData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone), self.data.addListener(FWDUVPData.LOAD_ERROR, self.dataLoadError), self.data.addListener(FWDUVPData.SKIN_PROGRESS, self.dataSkinProgressHandler), self.data.addListener(FWDUVPData.SKIN_LOAD_COMPLETE, self.dataSkinLoadComplete), self.data.addListener(FWDUVPData.PLAYLIST_LOAD_COMPLETE, self.dataPlayListLoadComplete), self.data.addListener(FWDUVPData.IMA_READY, self.dataImaReady), self.data.addListener(FWDUVPData.IMA_ERROR, self.dataImaError)
                }, self.vastLoaded = function(e) {
                    self.isAdd_bl = !1, self.isVastLoading_bl = !1, self.data.playlist_ar[self.id].popupAds_ar = e.popupAds, self.data.playlist_ar[self.id].ads_ar = e.ads, self.adsId = -1, self.updateAds(0), self.dispatchEvent(FWDUVPData.VAST_LOADED)
                }, self.setupSilent = function() {
                    (self.isIMA && !FWDUVPlayer.iFrame && !self.isMbl || self.data.autoPlay_bl && !FWDUVPlayer.iFrame && FWDUVPUtils.isChrome && !FWDUVPUtils.isMobile) && (FWDUVPlayer.iFrame = document.createElement("iframe"), FWDUVPlayer.iFrame.src = self.mainFolderPath_str + "audio/silent.mp3", FWDUVPlayer.iFrame.style.position = "absolute", FWDUVPlayer.iFrame.style.top = "-500px", document.documentElement.appendChild(FWDUVPlayer.iFrame))
                }, self.onPreloaderLoadDone = function() {
                    self.showPreloader_bl && self.setupPreloader(), self.isMbl || self.setupContextMenu(), self.fillEntireVideoScreen_bl = self.data.fillEntireVideoScreen_bl, self.resizeHandler()
                }, self.dataLoadError = function(e) {
                    self.showSourceError(e.text), self.playlist_do && (self.playlist_do.catId = -1), self.dispatchEvent(FWDUVPlayer.ERROR, {
                        error: e.text
                    })
                }, self.dataSkinProgressHandler = function(e) {}, self.dataSkinLoadComplete = function() {
                    if (-1 == location.protocol.indexOf("file:") || !FWDUVPUtils.isOpera && !FWDUVPUtils.isIEAndLessThen9)
                        if (self.volume = self.data.volume, self.playlistHeight = self.data.playlistBottomHeight, self.displayType != FWDUVPlayer.FULL_SCREEN || FWDUVPUtils.hasFullScreen || (self.data.showFullScreenButton_bl = !1), self.isEmbedded_bl && (self.useDeepLinking_bl = !1, self.data.playlistPosition_str = "right"), FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl && (self.useDeepLinking_bl = !1), self.useDeepLinking_bl && (FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl = !0), self.useDeepLinking_bl) setTimeout(function() {
                            self.setupDL()
                        }, 200);
                        else {
                            if (self.isEmbedded_bl) self.catId = self.embeddedPlaylistId, self.id = self.embeddedVideoId;
                            else {
                                var e = FWDUVPUtils.getHashUrlArgs(window.location.hash);
                                self.useDeepLinking_bl && void 0 !== e.playlistId && void 0 !== e.videoId ? (self.catId = e.playlistId, self.id = e.videoId) : (e.videoId ? self.id = e.videoId : self.id = self.data.startAtVideo, e.playlistId ? self.catId = e.playlistId : self.catId = self.data.startAtPlaylist)
                            }
                            self.loadInternalPlaylist()
                        }
                    else self.showSourceError("This browser can't play video local, please test online or use a browser like Firefox of Chrome.")
                }, this.dataPlayListLoadComplete = function() {
                    self.data.cats_ar[self.catId].pass && (self.playlistPass = self.data.cats_ar[self.catId].pass), self.loadAddFirstTime_bl = !0, self.isPlaylistLoadedFirstTime_bl || (self.setupNormalVideoPlayers(), FWDUVPUtils.isIEAndLessThen9 || self.updatePlaylist()), self.isPlaylistLoadedFirstTime_bl && self.updatePlaylist(), self.isPlaylistLoaded_bl = !0, self.videoHolder_do.setY(0), self.resizeHandler(), setTimeout(function() {
                        self.positionLargePlayButton(), self.controller_do && self.controller_do.resizeAndPosition(), self.playlist_do && self.playlist_do.resizeAndPosition()
                    }, 350)
                }, this.updatePlaylist = function() {
                    self.videoType_str = "none", self.main_do && self.main_do.contains(self.info_do) && self.main_do.removeChild(self.info_do), self.preloader_do && self.preloader_do.hide(!0), self.totaadsIdeos = self.data.playlist_ar.length, self.id < 0 ? self.id = 0 : self.id > self.totaadsIdeos - 1 && (self.id = self.totaadsIdeos - 1), self.playlist_do && self.playlist_do.updatePlaylist(self.data.playlist_ar, self.catId, self.id, self.data.cats_ar[self.catId].playlistName), self.hideVideoHider(), self.data.startAtRandomVideo_bl && (self.id = parseInt(Math.random() * self.data.playlist_ar.length), self.useDeepLinking_bl) ? FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id) : (self.prevSource = 99999999999 * Math.random(), self.posterPath_str = self.data.playlist_ar[self.id].posterSource, self.updateAds(0), self.isFirstPlaylistLoaded_bl && !self.isMbl && !self.data.startAtRandomVideo_bl && self.data.autoPlay_bl && self.play(), self.data.startAtRandomVideo_bl = !1, self.isFirstPlaylistLoaded_bl = !0, self.dispatchEvent(FWDUVPlayer.LOAD_PLAYLIST_COMPLETE), self.displayType == FWDUVPlayer.STICKY && setTimeout(function() {
                        self.isShowedFirstTime_bl = !1, self.setStageContainerFinalHeightAndPosition(self.animate_bl)
                    }, 50))
                }, this.dataImaReady = function() {
                    self.isIMA && self.setSource(self.videoSourcePath_str)
                }, this.dataImaError = function() {
                    self.errorImaSDK = !0, self.setSource(self.videoSourcePath_str)
                }, this.loadInternalPlaylist = function() {
                    self.isPlaylistLoaded_bl = !1, self.playlistPass = !1, self.isAdd_bl = !1, self.adsId = -1, self.prvAdSource = 999999999 * Math.random(), self.prevCatId != self.catId && (self.prevCatId = self.catId, self.stop(), self.videoHolder_do.setY(-5e3), self.hider && self.hider.stop(), self.setPosterSource("none"), self.videoPoster_do && (self.videoPoster_do.id = -1, self.videoPoster_do.hide(!0)), self.preloader_do && self.preloader_do.show(!1), self.lrgPlayBtn && self.lrgPlayBtn.hide(), self.controller_do && self.controller_do.hide(!1, 10), self.showVideoHider(), self.data.resetVastId(), self.popupAds_do && self.popupAds_do.resetId(), self.data.loadPlaylist(self.catId), self.logo_do && self.logo_do.hide(!1, !0), self.isAdd_bl && (self.adsSkip_do.hide(!1), self.adsStart_do.hide(!1)), self.playlist_do && self.playlist_do.destroyPlaylist(), self.preloader_do && self.positionPreloader(), self.isAPIReady_bl && self.dispatchEvent(FWDUVPlayer.START_TO_LOAD_PLAYLIST))
                }, this.setupDL = function() {
                    self.initFirstDL = !0, FWDUVPAddress.onChange = self.dlChangeHandler, self.isEmbedded_bl && FWDUVPAddress.setValue("?playlistId=" + self.embeddedPlaylistId + "&videoId=" + self.embeddedVideoId), self.dlChangeHandler()
                }, this.dlChangeHandler = function() {
                    if (!self.hasOpenedInPopup_bl) {
                        var e = !1;
                        if (self.categories_do && self.categories_do.isOnDOM_bl) self.categories_do.hide();
                        else {
                            self.prevId = self.id, self.prevEventCatId = self.catId, self.catId = parseInt(FWDUVPAddress.getParameter("playlistId")), self.id = parseInt(FWDUVPAddress.getParameter("videoId")), (null == self.catId || null == self.id || isNaN(self.catId) || isNaN(self.id)) && (self.catId = self.data.startAtPlaylist, self.id = self.data.startAtVideo, e = !0), (self.catId < 0 || self.catId > self.data.totalCategories - 1 && !e) && (self.catId = self.data.startAtPlaylist, self.id = self.data.startAtVideo, e = !0), self.data.playlist_ar && (self.id < 0 && !e ? (self.id = self.data.startAtVideo, e = !0) : self.prevCatId == self.catId && self.id > self.data.playlist_ar.length - 1 && !e && (self.id = self.data.playlist_ar.length - 1, e = !0)), self.totalDuration = 0;
                            var t = self.catId + " - " + self.id;
                            e ? FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id) : self.lastValue != t && (self.lastValue = self.catId + " - " + self.id, -1 == self.prevId && (self.prevId = self.id), -1 == self.prevEventCatId && (self.prevEventCatId = self.catId), self.prevCatId != self.catId ? (self.loadInternalPlaylist(), self.prevCatId = self.catId) : (self.stop(), self.isThumbClick_bl = !0, self.updateAds(0, !0), self.data.startAtRandomVideo_bl = !1), self.pastHref = window.location.href)
                        }
                    }
                }, this.playVimeoWithDelay = function() {
                    self.isMbl || (self.vimeo_do.isVideoLoaded_bl ? (self.hasVimeoStarted_bl = !0, self.play(), self.vimeo_do.play(), clearTimeout(self.playVimeoWhenLoadedId_to)) : self.playVimeoWhenLoadedId_to = setTimeout(self.playVimeoWithDelay, 50))
                }, this.setupNormalVideoPlayers = function() {
                    self.videoScreen_do || (self.isAPIReady_bl = !0, self.setupRSM(), self.setupVideoScreen(), self.setupAudioScreen(), self.setupVideoPoster(), self.preloader_do && self.main_do.addChild(self.preloader_do), self.setupSubtitle(), self.setupClickScreen(), self.setupPopupAds(), self.data.showLogo_bl && self.setupLogo(), self.addDoubleClickSupport(), self.setupVideoHider(), self.setupAnnotations(), self.data.showController_bl && self.setupController(), self.setupAdsStart(), self.data.showPlaylistButtonAndPlaylist_bl && self.setupPlaylist(), self.setupLargePlayPauseButton(), self.data.showChromecastButton_bl && self.setupChormecast(), self.data.showController_bl && self.setupHider(), self.data.showPlaylistsButtonAndPlaylists_bl && self.setupCategories(), self.setupDisableClick(), self.data.showEmbedButton_bl && self.setupEmbedWindow(), self.setupPasswordWindow(), self.data.showShareButton_bl && self.setupShareWindow(), self.setupAopw(), self.data.showInfoButton_bl && self.setupInfoWindow(), (self.data.showOpener_bl && self.displayType == FWDUVPlayer.STICKY || self.data.stickyOnScrollShowOpener_bl && self.stickyOnScroll) && self.setupOpener(), "no" == FWDUVPlayer.useYoutube && (self.isPlaylistLoadedFirstTime_bl = !0), self.addMinOnScroll(), self.isAPIReady_bl = !0, self.dispatchEvent(FWDUVPlayer.READY), self.data.addKeyboardSupport_bl && self.addKeyboardSupport())
                }, this.setupOpener = function() {
                    FWDUVPOpener.setPrototype(), self.opener_do = new FWDUVPOpener(self.data, self.position_str, self.isShowed_bl), FWDUVPUtils.isIEAndLessThen9 ? self.opener_do.getStyle().zIndex = "2147483634" : self.opener_do.getStyle().zIndex = "99999999994", self.opener_do.setX(-1e4), self.isShowed_bl ? self.opener_do.showCloseButton() : self.opener_do.showOpenButton(), self.opener_do.addListener(FWDUVPOpener.SHOW, self.openerShowHandler), self.opener_do.addListener(FWDUVPOpener.HIDE, self.openerHideHandler), self.opener_do.addListener(FWDUVPController.PLAY, self.controllerOnPlayHandler), self.opener_do.addListener(FWDUVPController.PAUSE, self.controllerOnPauseHandler), self.stageContainer.appendChild(self.opener_do.screen), self.stickyOnScroll && (self.opener_do.getStyle().position = "fixed", document.documentElement.appendChild(self.opener_do.screen))
                }, this.openerShowHandler = function() {
                    self.showPlayer()
                }, this.openerHideHandler = function() {
                    self.hidePlayer()
                }, this.setupPreloader = function() {
                    FWDUVPPreloader.setPrototype(), self.preloader_do = new FWDUVPPreloader(self, "center", 10, self.preloaderBackgroundColor, self.preloaderFillColor, 3, .8), self.preloader_do.show(!1), self.showPreloader_bl && (self.displayType == FWDUVPlayer.STICKY ? document.documentElement.appendChild(self.preloader_do.screen) : self.main_do.addChild(self.preloader_do))
                }, this.positionPreloader = function() {
                    function e() {
                        var e;
                        e = self.isPlaylistLoaded_bl ? self.tempVidStageWidth : self.sW, self.preloader_do.setX(parseInt((e - self.preloader_do.w) / 2)), self.preloader_do.setY(parseInt((self.tempVidStageHeight - self.preloader_do.h) / 2))
                    }
                    self.displayType == FWDUVPlayer.STICKY ? self.main_do.contains(self.preloader_do) ? e() : (self.preloader_do.setX(Math.round((self.ws.w - self.preloader_do.w) / 2)), self.position_str == FWDUVPlayer.POSITION_BOTTOM ? self.preloader_do.setY(Math.round(self.ws.h - self.preloader_do.h - 10) + FWDUVPUtils.getScrollOffsets().y) : self.preloader_do.setY(10)) : e()
                }, this.setupCategories = function() {
                    FWDUVPCategories.setPrototype(), self.categories_do = new FWDUVPCategories(self.data, self), self.categories_do.getStyle().zIndex = "2147483647", self.categories_do.addListener(FWDUVPCategories.HIDE_COMPLETE, self.categoriesHideCompleteHandler), self.data.showPlaylistsByDefault_bl && (self.showCatWidthDelayId_to = setTimeout(function() {
                        self.showCategories()
                    }, 1400))
                }, this.categoriesHideCompleteHandler = function(e) {
                    if (self.controller_do && (self.controller_do.setCategoriesButtonState("unselected"), self.controller_do.categoriesButton_do.setNormalState(!0)), self.useDeepLinking_bl) {
                        if (self.categories_do.id != self.catId) return self.catId = self.categories_do.id, self.id = 0, void FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id)
                    } else {
                        if (self.catId == self.categories_do.id) return;
                        self.catId = self.categories_do.id, self.id = 0, self.loadInternalPlaylist(self.catId)
                    }
                    self.isVideoPlayingWhenOpenWindows_bl && self.resume()
                }, this.setupVideoPoster = function() {
                    FWDUVPPoster.setPrototype(), self.videoPoster_do = new FWDUVPPoster(self, self.data.show, self.data.posterBackgroundColor_str), self.videoHolder_do.addChild(self.videoPoster_do)
                }, this.setupInfoWindow = function() {
                    FWDUVPInfoWindow.setPrototype(), self.infoWindow_do = new FWDUVPInfoWindow(self, self.data), self.infoWindow_do.addListener(FWDUVPInfoWindow.HIDE_COMPLETE, self.infoWindowHideCompleteHandler), self.main_do.addChild(self.infoWindow_do)
                }, this.infoWindowHideCompleteHandler = function() {
                    self.isVideoPlayingWhenOpenWindows_bl && self.resume(), self.controller_do && !self.isMbl && (self.controller_do.infoButton_do.isDisabled_bl = !1, self.controller_do.infoButton_do.setNormalState(!0))
                }, this.setupChormecast = function() {
                    self.data.showController_bl && (FWDUVPCC.setPrototype(), self.cc = new FWDUVPCC(self.controller_do))
                }, this.setupLargePlayPauseButton = function() {
                    self.data.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), self.lrgPlayBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-play'></span></div>", void 0, "UVPLargePlayButtonNormalState", "UVPLargePlayButtonSelectedState")) : (FWDUVPSimpleButton.setPrototype(), -1 != this.sknPth.indexOf("hex_white") ? self.lrgPlayBtn = new FWDUVPSimpleButton(self.data.largePlayN_img, self.data.largePlayS_str, void 0, !0, self.data.useHEX, self.data.nBC, "#FFFFFF", !1, !1, !1, !1, !0) : self.lrgPlayBtn = new FWDUVPSimpleButton(self.data.largePlayN_img, self.data.largePlayS_str, void 0, !0, self.data.useHEX, self.data.nBC, self.data.sBC, !1, !1, !1, !1, !0)), self.lrgPlayBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, self.largePlayButtonUpHandler), self.lrgPlayBtn.setOverflow("visible"), self.lrgPlayBtn.hide(!1), self.main_do.addChild(self.lrgPlayBtn)
                }, this.largePlayButtonUpHandler = function() {
                    self.isIMA && self.IMA && !self.IMA.isReady || (self.disableClick(), self.lrgPlayBtn.hide(), self.play(), self.data.goFullScreenOnPlay_bl && self.goFullScreen())
                }, this.positionLargePlayButton = function() {
                    self.lrgPlayBtn.setX(parseInt((self.tempVidStageWidth - self.lrgPlayBtn.w) / 2)), self.lrgPlayBtn.setY(parseInt((self.tempVidStageHeight - self.lrgPlayBtn.h) / 2))
                }, this.setupLogo = function() {
                    FWDUVPLogo.setPrototype(), self.logo_do = new FWDUVPLogo(self, self.data.logoPath_str, self.data.logoPosition_str, self.data.logoMargins), self.main_do.addChild(self.logo_do)
                }, this.setupPlaylist = function() {
                    FWDUVPPlaylist.setPrototype(), self.playlist_do = new FWDUVPPlaylist(self, self.data), self.playlist_do.addListener(FWDUVPPlaylist.THUMB_MOUSE_UP, self.playlistThumbMouseUpHandler), self.playlist_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, self.playPrevVideoHandler), self.playlist_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, self.playNextVideoHandler), self.playlist_do.addListener(FWDUVPPlaylist.ENABLE_SHUFFLE, self.enableShuffleHandler), self.playlist_do.addListener(FWDUVPPlaylist.DISABLE_SHUFFLE, self.disableShuffleHandler), self.playlist_do.addListener(FWDUVPPlaylist.ENABLE_LOOP, self.enableLoopHandler), self.playlist_do.addListener(FWDUVPPlaylist.DISABLE_LOOP, self.disableLoopHandler), self.playlist_do.addListener(FWDUVPPlaylist.CHANGE_PLAYLIST, self.changePlaylistHandler), self.main_do.addChildAt(self.playlist_do, 0), self.data.useVectorIcons_bl && setTimeout(function() {
                        self.playlist_do.resizeAndPosition(!0)
                    }, 340)
                }, this.changePlaylistHandler = function(e) {
                    self.loadPlaylist(e.id)
                }, this.playlistThumbMouseUpHandler = function(e) {
                    self.disableClick_bl || (self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.totalDuration = 0, self.useDeepLinking_bl && self.id != e.id ? (FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + e.id), self.id = e.id, self.isThumbClick_bl = !0) : (self.stop(), self.id = e.id, self.changeHLS_bl = !0, self.isThumbClick_bl = !0, self.isAdd_bl = !1, self.updateAds(0)), self.data.goFullScreenOnPlay_bl && self.goFullScreen())
                }, this.playPrevVideoHandler = function() {
                    self.isThumbClick_bl = !0, self.data.shuffle_bl ? self.playShuffle() : self.playPrev()
                }, this.playNextVideoHandler = function() {
                    self.isThumbClick_bl = !0, self.data.shuffle_bl ? self.playShuffle() : self.playNext()
                }, this.enableShuffleHandler = function(e) {
                    self.data.shuffle_bl = !0, self.data.loop_bl = !1, self.playlist_do.setShuffleButtonState("selected"), self.playlist_do.setLoopStateButton("unselected")
                }, this.disableShuffleHandler = function(e) {
                    self.data.shuffle_bl = !1, self.playlist_do.setShuffleButtonState("unselected")
                }, this.enableLoopHandler = function(e) {
                    self.data.loop_bl = !0, self.data.shuffle_bl = !1, self.playlist_do.setLoopStateButton("selected"), self.playlist_do.setShuffleButtonState("unselected")
                }, this.disableLoopHandler = function(e) {
                    self.data.loop_bl = !1, self.playlist_do.setLoopStateButton("unselected")
                }, this.setupPopupAds = function() {
                    FWDUVPPupupAds.setPrototype(), self.popupAds_do = new FWDUVPPupupAds(self, self.data), self.videoHolder_do.addChild(self.popupAds_do)
                }, this.setupSubtitle = function() {
                    FWDUVPSubtitle.setPrototype(), self.subtitle_do = new FWDUVPSubtitle(self, self.data), self.subtitle_do.addListener(FWDUVPSubtitle.LOAD_COMPLETE, self.subtitleLoadComplete)
                }, this.subtitleLoadComplete = function() {
                    self.subtitle_do.show(), self.controller_do && self.controller_do.enableSubtitleButton()
                }, this.loadSubtitle = function(e) {
                    self.isCasting ? self.cc.loadSubtitle() : (self.controller_do && self.controller_do.disableSubtitleButton(), e && (self.subtitle_do.loadSubtitle(e), self.videoHolder_do.addChildAt(self.subtitle_do, self.videoHolder_do.getChildIndex(self.dumyClick_do) - 1)))
                }, this.setupController = function() {
                    FWDUVPController.setPrototype(), self.controller_do = new FWDUVPController(self.data, self), self.controller_do.addListener(FWDUVPData.LOAD_ERROR, self.controllerErrorHandler), self.controller_do.addListener(FWDUVPController.REWIND, self.rewindHandler), self.controller_do.addListener(FWDUVPController.CHANGE_PLAYBACK_RATES, self.changePlaybackRateHandler), self.controller_do.addListener(FWDUVPController.CHANGE_SUBTITLE, self.changeSubtitileHandler), self.controller_do.addListener(FWDUVPController.SHOW_CATEGORIES, self.showCategoriesHandler), self.controller_do.addListener(FWDUVPController.SHOW_PLAYLIST, self.showPlaylistHandler), self.controller_do.addListener(FWDUVPController.HIDE_PLAYLIST, self.hidePlaylistHandler), self.controller_do.addListener(FWDUVPController.PLAY, self.controllerOnPlayHandler), self.controller_do.addListener(FWDUVPController.PAUSE, self.controllerOnPauseHandler), self.controller_do.addListener(FWDUVPController.START_TO_SCRUB, self.controllerStartToScrubbHandler), self.controller_do.addListener(FWDUVPController.SCRUB, self.controllerScrubbHandler), self.controller_do.addListener(FWDUVPController.STOP_TO_SCRUB, self.controllerStopToScrubbHandler), self.controller_do.addListener(FWDUVPController.CHANGE_VOLUME, self.controllerChangeVolumeHandler), self.controller_do.addListener(FWDUVPController.DOWNLOAD_VIDEO, self.controllerDownloadVideoHandler), self.controller_do.addListener(FWDUVPController.CHANGE_YOUTUBE_QUALITY, self.controllerChangeYoutubeQualityHandler), self.controller_do.addListener(FWDUVPController.FULL_SCREEN, self.controllerFullScreenHandler), self.controller_do.addListener(FWDUVPController.NORMAL_SCREEN, self.controllerNormalScreenHandler), self.controller_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, self.playPrevVideoHandler), self.controller_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, self.playNextVideoHandler), self.controller_do.addListener(FWDUVPController.SHOW_EMBED_WINDOW, self.showEmbedWindowHandler), self.controller_do.addListener(FWDUVPController.SHOW_INFO_WINDOW, self.showInfoWindowHandler), self.controller_do.addListener(FWDUVPController.SHOW_SHARE_WINDOW, self.controllerShareHandler), self.controller_do.addListener(FWDUVPController.SHOW_SUBTITLE, self.showSubtitleHandler), self.controller_do.addListener(FWDUVPController.HIDE_SUBTITLE, self.hideSubtitleHandler), self.videoHolder_do.addChild(self.controller_do)
                }, this.controllerErrorHandler = function(e) {
                    self.showSourceError(e.text)
                }, this.rewindHandler = function() {
                    self.rewind(10)
                }, this.rewind = function(e) {
                    var t = self.getCurrentTime();
                    5 == t.length && (t = "00:" + t), 7 == t.length && (t = "0" + t), t = FWDUVPUtils.getSecondsFromString(t), t -= e, 5 == (t = FWDUVPUtils.formatTime(t)).length && (t = "00:" + t), 7 == t.length && (t = "0" + t), self.scrubbAtTime(t)
                }, this.changePlaybackRateHandler = function(e) {
                    self.setPlaybackRate(e.rate)
                }, this.changeSubtitileHandler = function(e) {
                    self.data.playlist_ar[self.id].startAtSubtitle = e.id, self.controller_do.updateSubtitleButtons(self.data.playlist_ar[self.id].subtitleSource, self.data.playlist_ar[self.id].startAtSubtitle), self.ccSS = Number(self.data.playlist_ar[self.id].subtitleSource.length - e.id), self.isAdd_bl || self.loadSubtitle(self.data.playlist_ar[self.id].subtitleSource[self.data.playlist_ar[self.id].subtitleSource.length - 1 - self.data.playlist_ar[self.id].startAtSubtitle].source)
                }, this.showSubtitleHandler = function() {
                    self.subtitle_do.show(), self.subtitle_do.isShowed_bl = !0
                }, this.hideSubtitleHandler = function() {
                    self.subtitle_do.isShowed_bl = !1, self.subtitle_do.hide()
                }, this.showCategoriesHandler = function(e) {
                    self.showCategories(), self.controller_do && self.controller_do.setCategoriesButtonState("selected")
                }, this.showPlaylistHandler = function(e) {
                    self.disableClick(), self.showPlaylist()
                }, this.hidePlaylistHandler = function(e) {
                    self.disableClick(), self.hidePlaylist()
                }, this.controllerOnPlayHandler = function(e) {
                    self.play(), self.data.goFullScreenOnPlay_bl && self.goFullScreen()
                }, this.controllerOnPauseHandler = function(e) {
                    self.pause()
                }, this.controllerStartToScrubbHandler = function(e) {
                    self.isCasting ? self.cc.startToScrub() : self.startToScrub()
                }, this.controllerScrubbHandler = function(e) {
                    self.isCasting ? self.cc.seek(e.percent) : self.scrub(e.percent)
                }, this.controllerStopToScrubbHandler = function(e) {
                    self.isCasting ? self.cc.stopToScrub() : self.stopToScrub()
                }, this.controllerChangeVolumeHandler = function(e) {
                    self.setVolume(e.percent)
                }, this.controllerDownloadVideoHandler = function() {
                    self.downloadVideo()
                }, this.controllerShareHandler = function(e) {
                    self.setVideoPlayingStateOnWindowShow(), self.pause(), self.shareWindow_do.show(), self.controller_do && !self.isMbl && (self.controller_do.shareButton_do.setSelectedState(), self.controller_do.shareButton_do.isDisabled_bl = !0)
                }, this.controllerChangeYoutubeQualityHandler = function(e) {
                    self.videoType_str == FWDUVPlayer.YOUTUBE ? self.ytb_do.setQuality(e.quality) : (self.data.playlist_ar[self.id].startAtVideo = self.data.playlist_ar[self.id].videoSource.length - 1 - e.id, self.setSource(self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].source, !1, self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].is360), self.isQualityChanging_bl = !0, self.play())
                }, this.controllerFullScreenHandler = function() {
                    self.goFullScreen()
                }, this.controllerNormalScreenHandler = function() {
                    self.goNormalScreen()
                }, this.showEmbedWindowHandler = function() {
                    self.setVideoPlayingStateOnWindowShow(), self.pause(), self.embedWindow_do.show(), self.controller_do && !self.isMbl && (self.controller_do.embedButton_do.setSelectedState(), self.controller_do.embedButton_do.isDisabled_bl = !0)
                }, this.showInfoWindowHandler = function() {
                    self.setVideoPlayingStateOnWindowShow(), self.pause(), self.infoWindow_do.show(self.data.playlist_ar[self.id].desc), self.controller_do && !self.isMbl && (self.controller_do.infoButton_do.setSelectedState(), self.controller_do.infoButton_do.isDisabled_bl = !0)
                }, this.setVideoPlayingStateOnWindowShow = function() {
                    self.isCasting ? self.isVideoPlayingWhenOpenWindows_bl = "PLAYING" == self.cc.playerState : self.isIMA && self.IMA.started ? self.isVideoPlayingWhenOpenWindows_bl = self.IMA.isPlaying : self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do ? self.isVideoPlayingWhenOpenWindows_bl = self.ytb_do.isPlaying_bl : self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do ? self.isVideoPlayingWhenOpenWindows_bl = self.vimeo_do.isPlaying_bl : FWDUVPlayer.hasHTML5Video && self.videoScreen_do && (self.isVideoPlayingWhenOpenWindows_bl = self.videoScreen_do.isPlaying_bl)
                }, this.setupAudioScreen = function() {
                    self.audioScreen_do || (FWDUVPAudioScreen.setPrototype(), self.audioScreen_do = new FWDUVPAudioScreen(self, self.data.volume), self.audioScreen_do.addListener(FWDUVPAudioScreen.ERROR, self.videoScreenErrorHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.STOP, self.videoScreenStopHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.PLAY, self.videoScreenPlayHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.PAUSE, self.videoScreenPauseHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.UPDATE, self.videoScreenUpdateHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler), self.audioScreen_do.addListener(FWDUVPVideoScreen.START_TO_BUFFER, self.videoScreenStartToBuferHandler), self.audioScreen_do.addListener(FWDUVPVideoScreen.STOP_TO_BUFFER, self.videoScreenStopToBuferHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler), self.audioScreen_do.addListener(FWDUVPAudioScreen.UPDATE_SUBTITLE, self.videoScreenUpdateSubtitleHandler), self.videoHolder_do.addChild(self.audioScreen_do))
                }, this.setupVideoScreen = function() {
                    FWDUVPVideoScreen.setPrototype(), self.videoScreen_do = new FWDUVPVideoScreen(self, self.data.volume), self.videoScreen_do.addListener(FWDUVPVideoScreen.ERROR, self.videoScreenErrorHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.STOP, self.videoScreenStopHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY, self.videoScreenPlayHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.PAUSE, self.videoScreenPauseHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE, self.videoScreenUpdateHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.START_TO_BUFFER, self.videoScreenStartToBuferHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.STOP_TO_BUFFER, self.videoScreenStopToBuferHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler), self.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE_SUBTITLE, self.videoScreenUpdateSubtitleHandler), self.videoHolder_do.addChild(self.videoScreen_do)
                }, this.videoScreenErrorHandler = function(e) {
                    var t;
                    self.isPlaying_bl = !1, FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE ? (t = e.text, window.console && console.log(e.text), self.showSourceError(t), self.controller_do && (self.controller_do.disableMainScrubber(), self.controller_do.disablePlayButton(), self.data.showControllerWhenVideoIsStopped_bl || self.controller_do.hide(!self.isMbl), self.lrgPlayBtn.hide(), self.hideClickScreen(), self.hider && self.hider.stop())) : (t = e, self.showSourceError(t)), self.logo_do && self.logo_do.hide(!1), self.preloader_do && self.preloader_do.hide(!1), self.showCursor(), self.dispatchEvent(FWDUVPlayer.ERROR, {
                        error: t
                    })
                }, this.videoScreenSafeToScrubbHandler = function() {
                    var e = self.data.playlist_ar[self.id];
                    if (self.controller_do && (self.isAdd_bl ? (self.controller_do.disableMainScrubber(), self.data.timeToHoldAds && self.adsStart_do.show(!0), self.data.adsThumbnailPath_str && "none" != self.data.adsThumbnailPath_str && self.adsStart_do.loadThumbnail(self.data.adsThumbnailPath_str), self.positionAds()) : self.controller_do.enableMainScrubber(), self.controller_do.enablePlayButton(), self.controller_do.show(!0), !self.isAdd_bl && self.controller_do.ytbQualityButton_do && (self.controller_do.ytbQualityButton_do.enable(), self.controller_do.enablePlaybackRateButton()), !self.isAdd_bl && self.controller_do.playbackRateButton_do && self.controller_do.enablePlaybackRateButton(), self.isAdd_bl || (self.controller_do.downloadButton_do && self.controller_do.downloadButton_do.enable(), self.controller_do.rewindButton_do && self.controller_do.rewindButton_do.enable()), self.fillEntireVideoScreen_bl && self.resizeHandler(), self.hider && self.hider.start()), !self.isAdd_bl && e && e.subtitleSource && self.loadSubtitle(e.subtitleSource[e.subtitleSource.length - 1 - e.startAtSubtitle].source), self.isAdd_bl || (self.customContextMenu_do && self.customContextMenu_do.enable(), self.controller_do && self.controller_do.thumbnailsPreview_do && self.hasThumbnailsPreview && self.controller_do.thumbnailsPreview_do.load(e.thumbnailsPreview)), self.controller_do && (self.isQualityChanging_bl || self.controller_do.disableSubtitleButton(), self.controller_do.enableAtbButton(), self.isAdd_bl && window.FWDUVPCC && FWDUVPCC.disableButton()), self.isMbl && self.adsSkip_do.hide(!1), self.videoPoster_do.hide(), self.callVastEvent("start"), self.executeVastEvent(self.Impression), self.videoType_str != FWDUVPlayer.VIMEO && self.showClickScreen(), setTimeout(function() {
                            self.totalDuration && self.controller_do && self.controller_do.positionAdsLines(self.totalDuration)
                        }, 1500), "00:00:00" != self.getStartTimeStamp("t") && (args.uvpi ? args.uvpi == self.instanceName_str && self.scrubbAtTime(self.getStartTimeStamp("t")) : self.scrubbAtTime(self.getStartTimeStamp("t"))), document.cookie && self.data.useResumeOnPlay_bl && !self.isAdd_bl) {
                        if (FWDUVPUtils.getCookie("fwduvp_video_path") && FWDUVPUtils.getCookie("fwduvp_time") && FWDUVPUtils.getCookie("fwduvp_video_path") == self.videoSourcePath_str) {
                            FWDUVPUtils.getCookie("fwduvp_time");
                            self.rmsPlayed_bl || self.scrubbAtTime(FWDUVPUtils.getCookie("fwduvp_time"))
                        }
                        self.rmsPlayed_bl = !0
                    }
                    self.dispatchEvent(FWDUVPlayer.SAFE_TO_SCRUB)
                }, this.videoScreenUpdateSubtitleHandler = function(e) {
                    self.subtitle_do && self.subtitle_do.updateSubtitle(e.curTime)
                }, this.videoScreenStopHandler = function(e) {
                    self.main_do && self.main_do.contains(self.info_do) && self.main_do.removeChild(self.info_do), self.videoPoster_do.allowToShow_bl = !0, self.isPlaying_bl = !1, self.controller_do && (self.controller_do.disableMainScrubber(), self.controller_do.showPlayButton(), self.data.showControllerWhenVideoIsStopped_bl ? self.controller_do.show(!self.isMbl) : self.controller_do.hide(!self.isMbl), self.hider && self.hider.stop()), self.useYoutube_bl && self.ytb_do && (self.isMbl ? self.ytb_do.destroyYoutube() : self.ytb_do.stopVideo()), self.logo_do && self.logo_do.hide(!0), self.hideClickScreen(), self.isMbl && self.videoType_str == FWDUVPlayer.YOUTUBE && (self.videoPoster_do.hide(), self.lrgPlayBtn.hide()), self.isMbl && (self.adsSkip_do.hide(!1), self.adsStart_do.hide(!1)), self.showCursor(), self.dispatchEvent(FWDUVPlayer.STOP)
                }, this.videoScreenPlayHandler = function() {
                    self.is360 && (self.dumyClick_do.getStyle().cursor = "url(" + self.data.handPath_str + "), default"), (FWDUVPlayer.keyboardCurInstance = self).data.aom_bl = !1, self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isStopped_bl || (self.callVastEvent("resume"), self.isMbl ? FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.STOP_ALL_VIDEOS && FWDUVPlayer.stopAllVideos(self) : FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.PAUSE_ALL_VIDEOS && FWDUVPlayer.pauseAllVideos(self), self.isPlaying_bl = !0, self.isThumbClick_bl = !1, self.loadAddFirstTime_bl = !1, self.logo_do && self.logo_do.show(!0), self.controller_do && (self.controller_do.showPauseButton(), self.controller_do.show(!0)), self.playAtTime_bl = !1, self.hasHlsPlayedOnce_bl = !0, self.lrgPlayBtn && self.lrgPlayBtn.hide(), self.hider && self.hider.start(), self.showCursor(), self.popw_do && self.popw_do.hide(), self.isQualityChanging_bl && (self.scrubbAtTime(self.curDurration), self.curDurration = 0, self.isQualityChanging_bl = !1), self.wasAdd_bl && (FWDUVPUtils.isIOS || self.videoType_str == FWDUVPlayer.VIMEO ? setTimeout(function() {
                        self.scrubbAtTime(self.scrubAfterAddDuration)
                    }, 500) : self.scrubbAtTime(self.scrubAfterAddDuration), self.wasAdd_bl = !1), !self.hasStartedToPlay_bl && self.data.playlist_ar[self.id] && self.data.playlist_ar[self.id].startAtTime && !self.isAdd_bl && self.scrubbAtTime(self.data.playlist_ar[self.id].startAtTime), self.hasStartedToPlay_bl || !self.castStartAtTime || self.isAdd_bl || (self.scrubbAtTime(self.castStartAtTime), self.castStartAtTime = void 0), self.hasStartedToPlay_bl = !0, self.opener_do && self.opener_do.showPauseButton(), self.dispatchEvent(FWDUVPlayer.PLAY))
                }, this.videoScreenPauseHandler = function() {
                    if (!(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isStopped_bl || self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do && self.vimeo_do.isStopped_bl)) {
                        self.callVastEvent("pause"), self.preloader_do && self.preloader_do.hide(), self.isPlaying_bl = !1, self.controller_do && (self.controller_do.showPlayButton(), self.controller_do.show(!0));
                        var e = self.shareWindow_do && self.shareWindow_do.isShowed_bl,
                            t = self.embedWindow_do && self.embedWindow_do.isShowed_bl;
                        e || t || self.showPopW_bl && self.popw_do.show(self.popwSource), self.lrgPlayBtn && !self.data.showAnnotationsPositionTool_bl && self.lrgPlayBtn.show(), self.hider && (self.hider.reset(), self.hider.stop()), self.videoType_str != FWDUVPlayer.VIMEO && self.showClickScreen(), self.showCursor(), self.opener_do && self.opener_do.showPlayButton(), self.dispatchEvent(FWDUVPlayer.PAUSE)
                    }
                }, this.videoScreenUpdateHandler = function(e) {
                    var t;
                    FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE ? t = e.percent : (t = e, console.log(e)), self.controller_do && self.controller_do.updateMainScrubber(t), self.dispatchEvent(FWDUVPlayer.UPDATE, {
                        percent: t
                    })
                }, this.videoScreenUpdateTimeHandler = function(e, e2, e3) {
                    if (!self.isStopped_bl) {
                        if (self.prevSeconds != e.seconds && (self.totalTimePlayed += 1), self.totalTimeInSeconds = Math.round(e.totalTimeInSeconds), self.totalTimeInMilliseconds = e.totalTimeInSeconds, self.curTimeInSecond = Math.round(e.seconds), self.curTimeInmilliseconds = e.seconds, self.prevSeconds = e.seconds, self.totalPercentPlayed = self.totalTimePlayed / e.totalTimeInSeconds, isFinite(self.totalPercentPlayed) || (self.totalPercentPlayed = 0), FWDUVPUtils.getSecondsFromString(self.getStartTimeStamp("e")) && self.curTimeInSecond >= parseInt(FWDUVPUtils.getSecondsFromString(self.getStartTimeStamp("e"))) && self.stop(), self.controller_do && !self.controller_do.isMainScrubberScrubbing_bl && self.controller_do.atb && self.controller_do.atb.isShowed_bl && !self.controller_do.atb.scrub) {
                            var a = self.totalTimeInSeconds * self.controller_do.atb.pa,
                                b = self.totalTimeInSeconds * self.controller_do.atb.pb;
                            self.prevCurTimeInSeconds != self.curTimeInSecond && (self.prevCurTimeInSeconds = self.curTimeInSecond, self.curTimeInSecond < a ? self.scrub(self.controller_do.atb.pa) : self.curTimeInSecond > b && self.scrub(self.controller_do.atb.pa))
                        }
                        var time, seconds;
                        if (self.isAdd_bl && (.25 <= self.totalPercentPlayed && self.callFirstQuartile ? (self.callVastEvent("firstQuartile"), self.callFirstQuartile = !1) : .5 <= self.totalPercentPlayed && self.callMidpoint ? (self.callVastEvent("midpoint"), self.callMidpoint = !1) : .75 <= self.totalPercentPlayed && self.callThirdQuartile && (self.callVastEvent("thirdQuartile"), self.callThirdQuartile = !1)), seconds = FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE || self.videoType_str == FWDUVPlayer.VIMEO ? (self.curTime = e.curTime, self.totalTime = e.totalTime, time = self.curTime + "/" + self.totalTime, self.curTimeInSecond) : (self.curTime = e, self.totalTime = e2, time = self.curTime + "/" + self.totalTime, null != e && null != e2 || (time = "00:00/00:00"), Math.round(e3)), self.controller_do && self.controller_do.updateTime(time), self.currentSecconds = e.seconds, self.popupAds_do && !self.isAdd_bl && self.popupAds_do.update(self.curTimeInSecond), self.annotations_do && !self.isAdd_bl && self.annotations_do.update(self.curTimeInSecond), self.data.playlist_ar[self.id] && (self.cuePointsSource_ar = self.data.playlist_ar[self.id].cuepoints_ar), self.cuePointsSource_ar && !self.isAdd_bl)
                            for (var length = self.cuePointsSource_ar.length, i = 0; i < length; i++)
                                if (self.cuePointsSource_ar) {
                                    var cuePoint = self.cuePointsSource_ar[i];
                                    cuePoint.timeStart != self.curTimeInSecond || cuePoint.played_bl || (self.data.executeCuepointsOnlyOnce_bl && cuePoint.played_bl || eval(cuePoint.javascriptCall), cuePoint.played_bl = !0)
                                } self.isAdd_bl || (5 < self.totalTime.length ? self.totalDuration = FWDUVPUtils.getSecondsFromString(self.totalTime) : self.totalDuration = FWDUVPUtils.getSecondsFromString("00:" + self.totalTime)), self.isIMA && self.IMA.updateCuepointLines(seconds), self.isAdd_bl ? self.data.timeToHoldAds > seconds ? (self.adsStart_do.updateText(self.data.skipToVideoText_str + Math.abs(self.data.timeToHoldAds - seconds)), self.isMbl && self.adsSkip_do.hide(!1), self.videoType_str != FWDUVPlayer.IMAGE && self.videoType_str != FWDUVPlayer.IFRAME || self.adsStart_do.show(!0)) : self.isPlaying_bl && (self.adsStart_do.hide(!0), self.data.timeToHoldAds && self.adsSkip_do.show(!0)) : (self.adsStart_do.hide(!0), self.adsSkip_do.hide(!0)), 0 != seconds && (self.curDurration = seconds, self.updateAds(seconds)), self.isPlaying_bl && self.data.playlist_ar[self.id] && FWDUVPUtils.getSecondsFromString(self.data.playlist_ar[self.id].stopAtTime) <= e.seconds && (self.data.playAfterVideoStop_bl ? self.data.stopAfterLastVideoHasPlayed_bl && self.data.playlist_ar.length - 1 == self.id ? self.stop() : self.playNext() : self.data.stopAfterLastVideoHasPlayed_bl || self.data.playlist_ar.length - 1 != self.id ? self.stop() : self.playNext()), self.dispatchEvent(FWDUVPlayer.UPDATE_TIME, {
                            currentTime: self.curTime,
                            totalTime: self.totalTime
                        })
                    }
                }, this.videoScreenLoadProgressHandler = function(e) {
                    FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE ? self.controller_do && self.controller_do.updatePreloaderBar(e.percent) : self.controller_do && self.controller_do.updatePreloaderBar(e)
                }, this.videoScreenStartToBuferHandler = function() {
                    self.preloader_do && self.preloader_do.show(!1)
                }, this.videoScreenStopToBuferHandler = function() {
                    self.preloader_do && self.preloader_do.hide(!0)
                }, this.videoScreenPlayCompleteHandler = function(e, t) {
                    if (self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.callVastEvent("complete"), self.isIMA && self.IMA.hasPostRoll && self.curTimeInSecond >= self.totalTimeInSeconds - 1) self.IMA.playPostRoll();
                    else {
                        !self.isAdd_bl && self.data.playlist_ar[self.id].redirectURL && ("_self" == self.data.playlist_ar[self.id].redirectTarget ? location.replace(self.data.playlist_ar[self.id].redirectURL) : window.open(self.data.playlist_ar[self.id].redirectURL, self.data.playlist_ar[self.id].redirectTarget));
                        var s = self.isAdd_bl;
                        self.isAdd_bl && (self.isThumbClick_bl = !0, self.data.openNewPageAtTheEndOfTheAds_bl && "none" != self.data.adsPageToOpenURL_str && !t && ("_self" == self.data.adsPageToOpenTarget_str ? location.href = self.data.adsPageToOpenURL_str : window.open(self.data.adsPageToOpenURL_str, self.data.adsPageToOpenTarget_str)), self.isAdd_bl = !1, self.updateAds(0), self.wasAdd_bl = !0, t && self.videoType_str == FWDUVPlayer.VIDEO ? self.play() : self.isMbl || self.play()), s || (self.lightBox_do && self.lightBox_do.isShowed_bl && self.data.closeLightBoxWhenPlayComplete && (self.stop(), self.lightBox_do.closeButtonOnStartHandler()), self.data.stopVideoWhenPlayComplete_bl || 1 == self.data.playlist_ar.length || self.data.stopAfterLastVideoHasPlayed_bl && self.data.playlist_ar.length - 1 == self.id ? self.stop() : self.data.loop_bl ? "hls_flash" == self.videoType_str ? setTimeout(function() {
                            self.scrub(0), self.resume()
                        }, 50) : (self.scrub(0), self.play()) : (self.data.shuffle_bl ? self.playShuffle() : self.playNext(), self.isMbl && self.stop())), self.hider && self.hider.reset(), self.dispatchEvent(FWDUVPlayer.PLAY_COMPLETE)
                    }
                }, this.setupAnnotations = function() {
                    FWDUVPAnnotations.setPrototype(), self.annotations_do = new FWDUVPAnnotations(self, self.data), self.videoHolder_do.setBkColor = props.backgroundColor, self.videoHolder_do.screen.className = "fwduvp-video-holder", self.videoHolder_do.addChild(self.annotations_do)
                }, this.setupAdsStart = function() {
                    FWDUVPAdsStart.setPrototype(), self.adsStart_do = new FWDUVPAdsStart(self.data.adsButtonsPosition_str, self.data.adsBorderNormalColor_str, "", self.data.adsBackgroundPath_str, self.data.adsTextNormalColor), FWDUVPAdsButton.setPrototype(), self.adsSkip_do = new FWDUVPAdsButton(self.data.skipIconPath_img, self.data.skipIconSPath_str, self.data.skipToVideoButtonText_str, self.data.adsButtonsPosition_str, self.data.adsBorderNormalColor_str, self.data.adsBorderSelectedColor_str, self.data.adsBackgroundPath_str, self.data.adsTextNormalColor, self.data.adsTextSelectedColor, self.data.useHEX, self.data.nBC, self.data.sBC), self.adsSkip_do.addListener(FWDUVPAdsButton.MOUSE_UP, self.skipAdsMouseUpHandler), self.videoHolder_do.addChild(self.adsSkip_do), self.videoHolder_do.addChild(self.adsStart_do)
                }, this.skipAdsMouseUpHandler = function() {
                    self.isThumbClick_bl = !0, self.callVastEvent("skip"), self.videoScreenPlayCompleteHandler(null, !0)
                }, this.positionAds = function(e) {
                    var t, s;
                    t = "left" == self.data.adsButtonsPosition_str ? 0 : self.tempVidStageWidth, s = self.controller_do ? self.controller_do.isShowed_bl ? self.tempVidStageHeight - self.adsStart_do.h - self.data.controllerHeight - 30 : self.tempVidStageHeight - self.adsStart_do.h - self.data.controllerHeight : self.tempVidStageHeight - self.adsStart_do.h, FWDAnimation.killTweensOf(this.adsStart_do), e ? FWDAnimation.to(this.adsStart_do, .8, {
                        y: s,
                        ease: Expo.easeInOut
                    }) : this.adsStart_do.setY(s), self.adsStart_do.setX(t);
                    var o = !1;
                    self.tempStageWidth < 600 && (o = !0), self.adsSkip_do.resize(o), t = "left" == self.data.adsButtonsPosition_str ? 0 : self.tempVidStageWidth, s = self.controller_do ? self.controller_do.isShowed_bl ? self.tempVidStageHeight - self.adsSkip_do.h - self.data.controllerHeight - 30 : self.tempVidStageHeight - self.adsSkip_do.h - self.data.controllerHeight : self.tempVidStageHeight - self.adsSkip_do.h, FWDAnimation.killTweensOf(this.adsSkip_do), e ? FWDAnimation.to(this.adsSkip_do, .8, {
                        y: s,
                        ease: Expo.easeInOut
                    }) : this.adsSkip_do.setY(s), self.adsSkip_do.setX(t)
                }, this.setupShareWindow = function() {
                    FWDUVPShareWindow.setPrototype(), self.shareWindow_do = new FWDUVPShareWindow(self.data, self), self.shareWindow_do.addListener(FWDUVPShareWindow.HIDE_COMPLETE, self.shareWindowHideCompleteHandler)
                }, this.shareWindowHideCompleteHandler = function() {
                    self.isVideoPlayingWhenOpenWindows_bl && self.resume(), self.controller_do && !self.isMbl && (self.controller_do.shareButton_do.isDisabled_bl = !1, self.controller_do.shareButton_do.setNormalState(!0))
                }, this.setupPasswordWindow = function() {
                    FWDUVPPassword.setPrototype(), self.passWindow_do = new FWDUVPPassword(self.data, self), self.passWindow_do.addListener(FWDUVPPassword.CORRECT, self.passordCorrect)
                }, this.passordCorrect = function() {
                    self.passWindow_do.hide(), self.hasPassedPassowrd_bl = !0, self.play()
                }, this.setupEmbedWindow = function() {
                    FWDUVPEmbedWindow.setPrototype(), self.embedWindow_do = new FWDUVPEmbedWindow(self.data, self), self.embedWindow_do.addListener(FWDUVPEmbedWindow.ERROR, self.embedWindowErrorHandler), self.embedWindow_do.addListener(FWDUVPEmbedWindow.HIDE_COMPLETE, self.embedWindowHideCompleteHandler)
                }, this.embedWindowErrorHandler = function(e) {
                    self.showSourceError(e.error)
                }, this.embedWindowHideCompleteHandler = function() {
                    self.isVideoPlayingWhenOpenWindows_bl && self.resume(), self.controller_do && !self.isMbl && (self.controller_do.embedButton_do.isDisabled_bl = !1, self.controller_do.embedButton_do.setNormalState(!0))
                }, this.copyLinkButtonOnMouseOver = function() {
                    self.embedWindow_do.copyLinkButton_do.setSelectedState()
                }, this.copyLinkButtonOnMouseOut = function() {
                    self.embedWindow_do.copyLinkButton_do.setNormalState()
                }, this.getLinkCopyPath = function() {
                    return self.embedWindow_do.linkToVideo_str
                }, this.embedkButtonOnMouseOver = function() {
                    self.embedWindow_do.copyEmbedButton_do.setSelectedState()
                }, this.embedButtonOnMouseOut = function() {
                    self.embedWindow_do.copyEmbedButton_do.setNormalState()
                }, this.getEmbedCopyPath = function() {
                    return self.embedWindow_do.finalEmbedCode_str
                }, this.setInputs = function() {
                    for (var e = document.querySelectorAll("input"), t = 0; t < e.length; t++) self.hasPointerEvent_bl ? e[t].addEventListener("pointerdown", self.inputFocusInHandler) : e[t].addEventListener && (e[t].addEventListener("mousedown", self.inputFocusInHandler), e[t].addEventListener("touchstart", self.inputFocusInHandler))
                }, this.inputFocusInHandler = function(e) {
                    self.curInput = e.target, setTimeout(function() {
                        self.hasPointerEvent_bl ? window.addEventListener("pointerdown", self.inputFocusOutHandler) : window.addEventListener && (window.addEventListener("mousedown", self.inputFocusOutHandler), window.addEventListener("touchstart", self.inputFocusOutHandler)), FWDUVPlayer.isSearchedFocused_bl = !0
                    }, 50)
                }, this.inputFocusOutHandler = function(e) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    if (!FWDUVPUtils.hitTest(self.curInput, t.screenX, t.screenY)) return self.hasPointerEvent_bl ? window.removeEventListener("pointerdown", self.inputFocusOutHandler) : window.removeEventListener && (window.removeEventListener("mousedown", self.inputFocusOutHandler), window.removeEventListener("touchstart", self.inputFocusOutHandler)), void(FWDUVPlayer.isSearchedFocused_bl = !1)
                }, this.addKeyboardSupport = function() {
                    self.setInputs(), document.addEventListener("keydown", this.onKeyDownHandler), document.addEventListener("keyup", this.onKeyUpHandler)
                }, this.onKeyDownHandler = function(e) {
                    if ((!self.isSpaceDown_bl && self.hasStartedToPlay_bl && !FWDUVPlayer.isSearchedFocused_bl || self.isCasting) && (self.isSpaceDown_bl = !0, e.preventDefault && e.preventDefault(), self == FWDUVPlayer.keyboardCurInstance || "pause" != FWDUVPlayer.videoStartBehaviour && "none" != FWDUVPlayer.videoStartBehaviour)) {
                        if (32 == e.keyCode) {
                            if (self.stickOnCurrentInstanceKey_bl = !0, self.isCasting) self.cc.togglePlayPause();
                            else if (self.videoType_str == FWDUVPlayer.IMAGE || self.videoType_str == FWDUVPlayer.IFRAME) self.isImageAdsPlaying_bl ? self.stopUpdateImageInterval() : self.startUpdateImageInterval();
                            else if (self.isIMA && self.IMA.started) self.IMA.togglePlayPause();
                            else if (self.videoType_str == FWDUVPlayer.YOUTUBE) {
                                if (!self.ytb_do.isSafeToBeControlled_bl) return;
                                self.ytb_do.togglePlayPause()
                            } else if (self.videoType_str == FWDUVPlayer.VIMEO) {
                                if (!self.vimeo_do.isSafeToBeControlled_bl) return;
                                self.vimeo_do.togglePlayPause()
                            } else if (self.videoType_str == FWDUVPlayer.MP3) {
                                if (!self.audioScreen_do.isSafeToBeControlled_bl) return;
                                self.audioScreen_do.togglePlayPause()
                            } else if (FWDUVPlayer.hasHTML5Video) {
                                if (!self.videoScreen_do.isSafeToBeControlled_bl) return;
                                self.videoScreen_do && self.videoScreen_do.togglePlayPause()
                            } else self.isFlashScreenReady_bl && self.flashObject.togglePlayPause();
                            return e.preventDefault && e.preventDefault(), !1
                        }
                        if (70 == e.keyCode) self.isFullScreen_bl ? self.goNormalScreen() : self.goFullScreen();
                        else if (77 == e.keyCode) 0 != self.volume && (self.lastVolume = self.volume), 0 != self.volume ? self.volume = 0 : self.volume = self.lastVolume, self.setVolume(self.volume);
                        else if (38 == e.keyCode) self.volume += .1, 1 < self.volume && (self.volume = 1), self.setVolume(self.volume);
                        else if (40 == e.keyCode) self.volume -= .1, self.volume < 0 && (self.volume = 0), self.setVolume(self.volume);
                        else if (77 == e.keyCode) self.volume < 0 && (self.volume = 0), self.setVolume(self.volume);
                        else if (39 != e.keyCode || self.isAdd_bl || self.isIMA) {
                            if (37 == e.keyCode && !self.isAdd_bl && !self.isIMA) {
                                5 == (t = self.getCurrentTime()).length && (t = "00:" + t), 7 == t.length && (t = "0" + t), t = FWDUVPUtils.getSecondsFromString(t), t -= 5, 5 == (t = FWDUVPUtils.formatTime(t)).length && (t = "00:" + t), 7 == t.length && (t = "0" + t), self.scrubbAtTime(t)
                            }
                        } else {
                            var t;
                            5 == (t = self.getCurrentTime()).length && (t = "00:" + t), 7 == t.length && (t = "0" + t), t = FWDUVPUtils.getSecondsFromString(t), t += 5, 5 == (t = FWDUVPUtils.formatTime(t)).length && (t = "00:" + t), 7 == t.length && (t = "0" + t), self.scrubbAtTime(t)
                        }
                    }
                }, this.onKeyUpHandler = function(e) {
                    self.isSpaceDown_bl = !1
                }, this.setupAopw = function() {
                    FWDUVPOPWindow.setPrototype(), self.popw_do = new FWDUVPOPWindow(self.data, self)
                }, this.setupHider = function() {
                    FWDUVPHider.setPrototype(), self.hider = new FWDUVPHider(self.main_do, self.controller_do, self.data.controllerHideDelay), self.hider.addListener(FWDUVPHider.SHOW, self.hiderShowHandler), self.hider.addListener(FWDUVPHider.HIDE, self.hiderHideHandler), self.hider.addListener(FWDUVPHider.HIDE_COMPLETE, self.hiderHideCompleteHandler)
                }, this.hiderShowHandler = function() {
                    self.controller_do && self.isPlaying_bl && self.controller_do.show(!0), self.logo_do && self.data.hideLogoWithController_bl && self.isPlaying_bl && self.logo_do.show(!0), self.showCursor(), self.isAdd_bl && (self.positionAds(!0), self.adsStart_do.showWithOpacity(), self.adsSkip_do.showWithOpacity()), self.subtitle_do && self.subtitle_do.position(!0), self.popupAds_do && self.popupAds_do.position(!0)
                }, this.hiderHideHandler = function() {
                    self.videoType_str != FWDUVPlayer.VIMEO ? self.controller_do.volumeScrubber_do && self.controller_do.isVolumeScrubberShowed_bl || self.controller_do.atb && self.controller_do.atb.isShowed_bl && FWDUVPUtils.hitTest(self.controller_do.atb.mainHld.screen, self.hider.globalX, self.hider.globalY) || self.data.showYoutubeQualityButton_bl && FWDUVPUtils.hitTest(self.controller_do.ytbButtonsHolder_do.screen, self.hider.globalX, self.hider.globalY) || self.data.showPlaybackRateButton_bl && self.controller_do && FWDUVPUtils.hitTest(self.controller_do.playbackRatesButtonsHolder_do.screen, self.hider.globalX, self.hider.globalY) || self.controller_do && self.data.showSubBtn && FWDUVPUtils.hitTest(self.controller_do.subtitlesButtonsHolder_do.screen, self.hider.globalX, self.hider.globalY) || FWDUVPUtils.hitTest(self.controller_do.screen, self.hider.globalX, self.hider.globalY) || FWDUVPUtils.hitTest(self.controller_do.mainScrubber_do.screen, self.hider.globalX, self.hider.globalY) ? self.hider.reset() : (self.controller_do.hide(!0), self.logo_do && self.data.hideLogoWithController_bl && self.logo_do.hide(!0), self.isFullScreen_bl && self.hideCursor(), self.isAdd_bl && (self.positionAds(!0), self.adsStart_do.hideWithOpacity(), self.adsSkip_do.hideWithOpacity()), self.subtitle_do.position(!0), self.popupAds_do && self.popupAds_do.position(!0)) : self.hider.reset()
                }, this.hiderHideCompleteHandler = function() {
                    self.controller_do.positionScrollBarOnTopOfTheController()
                }, this.play = function() {
                    if (self.isAPIReady_bl)
                        if (self.isCasting) self.cc.play();
                        else if (!self.isMbl || self.videoType_str != FWDUVPlayer.YOUTUBE || !self.ytb_do || self.ytb_do.isSafeToBeControlled_bl || self.data.aom_bl)
                        if (self.videoType_str == FWDUVPlayer.HLS_JS && 0 <= location.protocol.indexOf("file:")) self.showSourceError("HLS m3u8 videos can't be played local on this browser, please test it online!.");
                        else {
                            if (!self.isAdd_bl && self.data.playlist_ar[self.id].isPrivate && !self.hasPassedPassowrd_bl && self.passWindow_do || self.playlistPass) return self.lrgPlayBtn && self.lrgPlayBtn.show(), self.passWindow_do.show(), void self.videoPoster_do.show();
                            if (self.hasPassedPassowrd_bl = !0, self.isMbl ? FWDUVPlayer.stopAllVideos(self) : FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.PAUSE_ALL_VIDEOS ? FWDUVPlayer.pauseAllVideos(self) : FWDUVPlayer.videoStartBehaviour == FWDUVPlayer.STOP_ALL_VIDEOS && FWDUVPlayer.stopAllVideos(self), self.isIMA) {
                                if (self.isIMA && self.IMA && !self.IMA.isReady) return;
                                self.IMA.play()
                            } else self.videoType_str == FWDUVPlayer.IMAGE ? self.startUpdateImageInterval() : self.videoType_str == FWDUVPlayer.YOUTUBE ? self.ytb_do && self.ytb_do.play() : self.videoType_str == FWDUVPlayer.MP3 ? (self.audioScreen_do && self.audioScreen_do.play(), FWDUVPUtils.isLocal || self.audioScreen_do.setupSpectrum()) : self.videoType_str == FWDUVPlayer.VIMEO ? self.vimeo_do && self.vimeo_do.play() : FWDUVPlayer.hasHTML5Video ? self.videoType_str != FWDUVPlayer.HLS_JS || self.isHLSManifestReady_bl ? self.videoScreen_do && self.videoScreen_do.play() : (self.videoScreen_do.initVideo(), window.Hls && (self.setupHLS(), self.hlsJS.loadSource(self.videoSourcePath_str), self.hlsJS.attachMedia(self.videoScreen_do.video_el), self.hlsJS.on(Hls.Events.MANIFEST_PARSED, function(e) {
                                self.isHLSManifestReady_bl = !0, self.videoType_str == FWDUVPlayer.HLS_JS && self.play()
                            }))) : self.isFlashScreenReady_bl && (self.flashObject.playVideo(), self.scrub(0));
                            (FWDUVPlayer.keyboardCurInstance = self).videoPoster_do.allowToShow_bl = !1, self.lrgPlayBtn.hide(), self.videoPoster_do.hide()
                        }
                }, this.pause = function() {
                    self.isAPIReady_bl && (self.isCasting ? self.cc.pause() : self.isIMA ? self.IMA.pause() : self.videoType_str == FWDUVPlayer.IMAGE ? self.stopUpdateImageInterval() : self.videoType_str == FWDUVPlayer.YOUTUBE ? self.ytb_do.pause() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.pause() : self.videoType_str == FWDUVPlayer.VIMEO ? self.vimeo_do.pause() : FWDUVPlayer.hasHTML5Video ? self.videoScreen_do && self.videoScreen_do.pause() : self.isFlashScreenReady_bl && self.flashObject.pauseVideo())
                }, this.resume = function() {
                    self.isAPIReady_bl && (self.isCasting ? self.cc.play() : self.isIMA && self.IMA.started ? self.IMA.play() : self.videoType_str == FWDUVPlayer.IMAGE ? self.startUpdateImageInterval() : self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do ? self.ytb_do.resume() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.resume() : self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do ? self.vimeo_do.resume() : FWDUVPlayer.hasHTML5Video ? self.videoScreen_do && self.videoScreen_do.resume() : self.isFlashScreenReady_bl && self.flashObject.resume())
                }, this.sendPlayEvent = function() {}, this.sendGAPlayedEvent = function() {
                    if (!isNaN(self.totalPercentPlayed) && window.ga && Math.round(100 * self.totalPercentPlayed)) {
                        var e = "videoName:" + self.videoNameGa + ", percentPlayed:" + Math.round(100 * self.totalPercentPlayed) + ", stoppedAtTime:" + self.getCurrentTime() + ", fullScreen:" + self.isFullScreen_bl;
                        ga("send", {
                            hitType: "event",
                            eventCategory: self.videoCat,
                            eventAction: "played",
                            eventLabel: e,
                            nonInteraction: !0
                        }), self.totalTimePlayed = 0, self.totalPercentPlayed = 0
                    }
                }, this.stop = function(e) {
                    self.isAPIReady_bl && (self.isStopped_bl || (self.sendGAPlayedEvent(), self.isCasting && self.cc.stop(), self.IMA && self.IMA.stop(), FWDUVPPassword.isCorect = !0, self.totalTimePlayed = 0, self.totalDuration = 0, self.isIMA = void 0, self.hasPassedPassowrd_bl = !1, self.isHLSManifestReady_bl = !1, self.isDASHManifestReady_bl = !1, clearInterval(self.tryHLS_int), clearInterval(self.checkIfYoutubePlayerIsReadyId_int), clearInterval(self.keepCheckingYoutubeAPI_int), self.destroyDASH(), self.destroyHLS(), self.data.closeVast(), self.isPlaying_bl = !1, self.customContextMenu_do && self.customContextMenu_do.disable(), self.videoType_str == FWDUVPlayer.IMAGE ? self.stopUpdateImageInterval() : self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do ? self.ytb_do.stop() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.stop() : self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do ? self.vimeo_do.stop() : FWDUVPlayer.hasHTML5Video && self.videoScreen_do.stop(), clearTimeout(self.playVimeoWhenLoadedId_to), self.popw_do && self.popw_do.hide(), self.data.playlist_ar[self.id] && (self.posterPath_str = self.data.playlist_ar[self.id].posterSource), self.isMbl ? (self.data.showControllerWhenVideoIsStopped_bl && self.controller_do && self.controller_do.show(!0), e || self.videoType_str == FWDUVPlayer.YOUTUBE ? self.useYoutube_bl && self.ytb_do && !self.ytb_do.ytb && self.ytb_do.setupVideo() : (self.videoPoster_do.show(), self.videoType_str != FWDUVPlayer.VIMEO && self.lrgPlayBtn.show())) : self.isThumbClick_bl || (self.controller_do && self.data.showControllerWhenVideoIsStopped_bl && self.controller_do.show(!0), self.videoPoster_do && self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show()), self.controller_do && (self.controller_do.atb && self.controller_do.atb.hide(!0), self.controller_do.subtitleButton_do && (self.controller_do.disableSubtitleButton(), self.subtitle_do && (self.subtitle_do.showSubByDflt ? self.controller_do.subtitleButton_do.setButtonState(0) : self.controller_do.subtitleButton_do.setButtonState(1))), self.controller_do.thumbnailsPreview_do && self.controller_do.thumbnailsPreview_do.remove(), self.controller_do.atbButton_do && (self.controller_do.atbButton_do.doNotallowToSetNormal = !1, self.controller_do.atbButton_do.isSelected = !1, self.controller_do.atbButton_do.setNormalState()), self.controller_do.disableAtbButton(), self.controller_do.ttm && self.controller_do.ttm.hide(), self.controller_do.ytbQualityButton_do && self.controller_do.ytbQualityButton_do.disable(), self.controller_do.playbackRateButton_do && self.controller_do.playbackRateButton_do.disable(), self.controller_do && self.controller_do.rewindButton_do && self.controller_do.rewindButton_do.disable()), self.popupAds_do && self.popupAds_do.hideAllPopupButtons(!1), self.hasHlsPlayedOnce_bl = !1, self.isSafeToScrub_bl = !1, self.hlsState = void 0, self.changeHLS_bl = !1, self.totalDuration = 0, self.hasStartedToPlay_bl = !1, self.controller_do && self.controller_do.disablePlaybackRateButton(), self.subtitle_do && self.subtitle_do.hide(), self.annotations_do && self.annotations_do.update(-1), self.hider && self.hider.reset(), self.showCursor(), self.adsStart_do && self.adsStart_do.hide(!0), self.adsSkip_do && self.adsSkip_do.hide(!0), self.controller_do && self.controller_do.hideAdsLines(), self.stopVisualization(), self.isStopped_bl = !1))
                }, this.startToScrub = function() {
                    self.isAPIReady_bl && (self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl ? self.ytb_do.startToScrub() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.startToScrub() : FWDUVPlayer.hasHTML5Video ? self.videoScreen_do && self.videoScreen_do.startToScrub() : self.isFlashScreenReady_bl && self.flashObject.startToScrub())
                }, this.stopToScrub = function() {
                    self.isAPIReady_bl && (self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl ? self.ytb_do.stopToScrub() : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.stopToScrub() : self.isFlashScreenReady_bl ? self.flashObject.stopToScrub() : FWDUVPlayer.hasHTML5Video && self.videoScreen_do && self.videoScreen_do.stopToScrub())
                }, this.scrubbAtTime = function(e) {
                    self.isAPIReady_bl && e && (-1 != String(e).indexOf(":") && (e = FWDUVPUtils.getSecondsFromString(e)), self.isCasting ? self.cc.scrubbAtTime(e) : self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl ? self.ytb_do.scrubbAtTime(e) : self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do ? self.vimeo_do.scrubbAtTime(e) : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.scrubbAtTime(e) : FWDUVPlayer.hasHTML5Video && self.videoScreen_do && self.videoScreen_do.scrubbAtTime(e))
                }, this.scrub = function(e) {
                    self.isAPIReady_bl && (isNaN(e) || (e < 0 ? e = 0 : 1 < e && (e = 1), self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl ? self.ytb_do.scrub(e) : self.videoType_str == FWDUVPlayer.MP3 ? self.audioScreen_do && self.audioScreen_do.scrub(e) : self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do && self.vimeo_do.isSafeToBeControlled_bl ? self.vimeo_do.scrub(e) : FWDUVPlayer.hasHTML5Video ? self.videoScreen_do && self.videoScreen_do.scrub(e) : self.isFlashScreenReady_bl && self.flashObject.scrub(e)))
                }, this.setVolume = function(e) {
                    self.isAPIReady_bl && (self.volume = e, self.controller_do && self.controller_do.updateVolume(e, !0), self.isIMA && self.IMA.setVolume(e), self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.setVolume(e), self.videoType_str == FWDUVPlayer.VIMEO && self.vimeo_do && self.vimeo_do.setVolume(e), self.audioScreen_do && self.audioScreen_do.setVolume(e), FWDUVPlayer.hasHTML5Video && self.videoScreen_do && self.videoScreen_do.setVolume(e), self.isFlashScreenReady_bl && self.flashObject.setVolume(e), self.isCasting && self.cc.setVolume(), self.dispatchEvent(FWDUVPlayer.VOLUME_SET, {
                        volume: e
                    }))
                }, this.showCategories = function() {
                    self.isAPIReady_bl && (self.setVideoPlayingStateOnWindowShow(), self.categories_do && (self.categories_do.show(self.catId), self.controller_do && self.controller_do.setCategoriesButtonState("selected"), self.pause()))
                }, this.hideCategories = function() {
                    self.isAPIReady_bl && self.categories_do && (self.categories_do.hide(), self.controller_do && self.controller_do.setCategoriesButtonState("unselected"))
                }, this.showPlaylist = function() {
                    self.isAPIReady_bl && self.showPlaylistButtonAndPlaylist_bl && (self.isPlaylistShowed_bl = !1, self.controller_do && self.controller_do.showHidePlaylistButton(), self.playlist_do.hide(self.animate_bl), "right" == self.playlistPosition_str && self.resizeHandler(!self.isMbl), self.sH = self.vidStageHeight, self.setStageContainerFinalHeightAndPosition(self.animate_bl), FWDAnimation.to(self, .8, {
                        tempStageWidth: self.sW,
                        tempStageHeight: self.sH,
                        tempVidStageWidth: self.vidStageWidth,
                        tempVidStageHeight: self.vidStageHeight,
                        ease: Expo.easeInOut,
                        onUpdate: self.resizeFinal
                    }))
                }, this.hidePlaylist = function(e) {
                    self.isAPIReady_bl && self.showPlaylistButtonAndPlaylist_bl && (self.isPlaylistShowed_bl = !0, self.controller_do && self.controller_do.showShowPlaylistButton(), e ? self.playlist_do.show(!1) : self.playlist_do.show(self.animate_bl), self.resizeHandler(self.animate_bl), self.setStageContainerFinalHeightAndPosition(self.animate_bl), FWDAnimation.to(self, .8, {
                        tempStageWidth: self.sW,
                        tempStageHeight: self.sH,
                        tempVidStageWidth: self.vidStageWidth,
                        tempVidStageHeight: self.vidStageHeight,
                        ease: Expo.easeInOut,
                        onUpdate: self.resizeFinal
                    }))
                }, this.setPosterSource = function(e) {
                    if (self.isAPIReady_bl && e && "none" != self.videoType_str) {
                        var t = e.split(",");
                        e = self.isMbl && null != t[1] ? t[1] : t[0], self.videoPoster_do && (self.posterPath_str = e, -1 == self.videoSourcePath_str.indexOf(".") && self.videoType_str == FWDUVPlayer.YOUTUBE && self.isMbl || -1 != self.videoSourcePath_str.indexOf("vimeo.com") && self.videoType_str == FWDUVPlayer.VIMEO && self.isMbl ? (self.posterPath_str = "youtubemobile", self.videoPoster_do.setPoster(self.posterPath_str)) : (self.videoPoster_do.setPoster(self.posterPath_str), self.prUVPosterSource_str != e && self.dispatchEvent(FWDUVPlayer.UPDATE_POSTER_SOURCE)), self.prUVPosterSource_str = e)
                    }
                }, this.setThumbnailPreviewSource = function(e) {
                    if (self.isAPIReady_bl && !FWDUVPUtils.isLocal && self.controller_do) {
                        if (!self.thumbnailsPreviewLoaded_bl) {
                            var t = document.createElement("script");
                            return t.src = self.mainFolderPath_str + "java/FWDUVPThumbnailsPreview.js", document.head.appendChild(t), void(t.onload = function() {
                                self.thumbnailsPreviewLoaded_bl = !0, self.setThumbnailPreviewSource(e)
                            })
                        }
                        self.hasThumbnailsPreview = !0, self.controller_do.setupThumbnailsPreview(), self.controller_do.thumbnailsPreview_do.load(e)
                    }
                }, this.updateAds = function(e, t) {
                    if (self.data.vastXML && !self.data.isVastXMLParsed_bl) return self.controller_do && (self.controller_do.createdAdsOnce_bl = !1, self.controller_do.hideAdsLines(), self.controller_do.resetsAdsLines()), void self.data.setVastSource(self.data.vastXML);
                    if (self.data.playlist_ar[self.id]) {
                        self.curAddData = self.data.playlist_ar[self.id].ads_ar, self.curPopupAdsData = self.data.playlist_ar[self.id].popupAds_ar;
                        var s = self.curPopupAdsData && 0 < self.curPopupAdsData.length;
                        if (self.adsId != self.id && (self.popupAds_do && self.popupAds_do.hideAllPopupButtons(!0), self.controller_do && self.controller_do.resetsAdsLines()), self.data.playlist_ar[self.id].vastURL && !self.curAddData) return self.adsId != self.id && self.data.setVastSource(self.data.playlist_ar[self.id].vastURL, self.data.playlist_ar[self.id].vastLinearStartTime), void(self.adsId = self.id);
                        if (self.adsId = self.id, self.isAdd_bl || (self.TrackingEvents = void 0, self.Impression = void 0, self.ClickTracking = void 0, self.curAddData && (self.callFirstQuartile = !0, self.callMidpoint = !0, self.callThirdQuartile = !0)), self.isAdd_bl) this.isAdd_bl ? self.curSource = "FWDUVPDummy" + (new Date).getTime() : self.curSource = self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].source;
                        else if (self.controller_do && self.totalDuration && (self.data.fixVmapTimes(self.totalDuration, self.curAddData, self.curPopupAdsData, self.id), self.controller_do.setupAdsLines(self.curAddData, self.id, self.catId), self.totalDuration && self.controller_do.positionAdsLines(self.totalDuration), s && (self.popupAds_do.resetPopups(self.curPopupAdsData, self.id), self.popupAds_do.id = self.id)), self.curSource = self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].source, self.curAddData)
                            for (var o = 0; o < self.curAddData.length; o++)
                                if (e >= self.curAddData[o].timeStart && e <= self.curAddData[o].timeStart + 1 && !self.curAddData[o].played_bl && e != self.prevDuration) return self.addId = o, 0 == self.curAddData[o].timeStart && (t = !1), self.isAdd_bl = !0, self.addSource_str = self.curAddData[o].source, self.curAddData[self.addId].played_bl = !0, self.data.adsThumbnailPath_str = self.curAddData[o].thumbnailSource, self.data.timeToHoldAds = self.curAddData[o].timeToHoldAds, self.data.adsPageToOpenURL_str = self.curAddData[o].link, self.data.adsPageToOpenTarget_str = self.curAddData[o].target, self.TrackingEvents = self.curAddData[o].TrackingEvents, self.Impression = self.curAddData[o].Impression, self.ClickTracking = self.curAddData[o].ClickTracking, self.scrubAfterAddDuration = self.curAddData[o].timeStart, self.curImageTotalTime = self.curAddData[o].addDuration, self.setSource(self.addSource_str), this.controller_do && this.controller_do.line_ar && this.controller_do.line_ar[o].setVisible(!1), void(self.prvAdSource = self.addSource_str);
                        self.isLive = self.data.playlist_ar[self.id].isLive, (!this.isAdd_bl && self.prevSource != self.curSource && -1 == self.curSource.indexOf("FWDUVPDummy") || t) && (t && (this.isAdd_bl = !1, self.curSource = self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].source), self.setSource(self.curSource, !1, self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].is360)), this.controller_do && this.controller_do.positionAdsLines(self.curDuration), self.prevDuration = e, self.prevSource = self.curSource
                    }
                }, this.updateImageScreen = function(e) {
                    this.imageSceeenHolder_do || (this.imageSceeenHolder_do = new FWDUVPDisplayObject("div"), this.imageSceeenHolder_do.setX(0), this.imageSceeenHolder_do.setY(0), this.imageSceeenHolder_do.setBkColor("#000000")), self.videoHolder_do.addChildAt(self.imageSceeenHolder_do, self.videoHolder_do.getChildIndex(self.dumyClick_do) - 1), self.showClickScreen(), self.imageSceeenHolder_do.contains(self.imageScreen_do) && self.imageSceeenHolder_do.removeChild(this.imageScreen_do), this.imageScreen_do = null, self.imageScreen_do = new FWDUVPDisplayObject("img"), self.imageAdd_img = new Image, self.imageAdd_img.src = e, self.preloader_do && self.preloader_do.show(!1), self.lrgPlayBtn && self.lrgPlayBtn.hide(), self.imageAdd_img.onload = function() {
                        self.imageScreen_do.setScreen(self.imageAdd_img), self.imageScreen_do.setAlpha(0), FWDAnimation.to(self.imageScreen_do, 1, {
                            alpha: 1
                        }), self.imageAddOriginalWidth = self.imageAdd_img.width, self.imageAddOriginalHeight = self.imageAdd_img.height, self.preloader_do && self.preloader_do.hide(), self.imageSceeenHolder_do.addChild(self.imageScreen_do), self.positionAdsImage(), self.startToUpdateAdsButton()
                    }, self.imageAdd_img.onerror = function() {
                        self.showSourceError("Advertisment image with path " + e + " can't be found")
                    }
                }, this.positionAdsImage = function() {
                    if (self.imageScreen_do && self.videoType_str == FWDUVPlayer.IMAGE) {
                        var e = self.tempVidStageWidth / self.imageAddOriginalWidth,
                            t = self.tempVidStageHeight / self.imageAddOriginalHeight;
                        totalScale = 0, t <= e ? totalScale = e : e <= t && (totalScale = t), finalW = parseInt(self.imageAddOriginalWidth * totalScale), finalH = parseInt(self.imageAddOriginalHeight * totalScale), finalX = parseInt((self.tempVidStageWidth - finalW) / 2), finalY = parseInt((self.tempVidStageHeight - finalH) / 2), self.imageScreen_do.setWidth(finalW), self.imageScreen_do.setHeight(finalH), self.imageScreen_do.setX(finalX), self.imageScreen_do.setY(finalY), self.imageSceeenHolder_do.setWidth(self.tempVidStageWidth), self.imageSceeenHolder_do.setHeight(self.tempVidStageHeight)
                    }
                }, this.startToUpdateAdsButton = function() {
                    self.curImageTime = 0, self.updateAdsButton(), self.stopUpdateImageInterval(), self.startUpdateImageInterval(), self.setPlayAndPauseButtonState()
                }, this.stopUpdateImageInterval = function() {
                    self.isImageAdsPlaying_bl = !1, clearInterval(self.startUpdateAdsId_int), self.setPlayAndPauseButtonState(), self.isPlaying_bl = !1, self.hider.stop()
                }, this.startUpdateImageInterval = function() {
                    self.isImageAdsPlaying_bl = !0, self.startUpdateAdsId_int = setInterval(self.updateAdsButton, 1e3), self.setPlayAndPauseButtonState(), self.isPlaying_bl = !0, self.hider.start()
                }, this.updateAdsButton = function() {
                    self.videoScreenUpdateTimeHandler({
                        curTime: FWDUVPUtils.formatTime(self.curImageTime),
                        totalTime: FWDUVPUtils.formatTime(self.curImageTotalTime),
                        seconds: self.curImageTime
                    }), self.videoScreenUpdateHandler({
                        percent: self.curImageTime / self.curImageTotalTime
                    }), self.curImageTime == self.curImageTotalTime && self.videoScreenPlayCompleteHandler(), self.curImageTime += 1
                }, this.setPlayAndPauseButtonState = function() {
                    this.isImageAdsPlaying_bl ? self.controller_do && self.controller_do.showPauseButton() : self.controller_do && self.controller_do.showPlayButton()
                }, this.showSourceError = function(e) {
                    self.main_do.addChild(self.info_do), self.info_do.showText(e), self.preloader_do && self.preloader_do.hide(), self.resizeHandler()
                }, this.setSource = function(t, e, s) {
                    if (t && (self.source = t), self.data.playVideoOnlyWhenLoggedIn_bl && !self.data.isLoggedIn_bl) return self.showSourceError(self.data.loggedInMessage_str), self.info_do.allowToRemove_bl = !1, void(self.lrgPlayBtn && self.lrgPlayBtn.show());
                    if ((self.is360 = s, self.data.playlist_ar[self.id].thumbnailsPreview) && (-1 != location.protocol.indexOf("file:") && setTimeout(function() {
                            self.showSourceError("This browser doesn't allow thumbnails preview videos local, please test online.")
                        }, 50), 2 < self.data.playlist_ar[self.id].thumbnailsPreview.length && -1 == location.protocol.indexOf("file:") && !self.thumbnailsPreviewLoaded_bl)) return (n = document.createElement("script")).src = self.mainFolderPath_str + "java/FWDUVPThumbnailsPreview.js", document.head.appendChild(n), n.onerror = function(e) {
                        self.main_do.addChild(self.info_do), self.showSourceError('The thumbnails preview javascript file named <font color="#FF0000">FWDUVPThumbnailsPreview.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDUVPThumbnailsPreview.js</font> file.')
                    }, void(n.onload = function() {
                        self.thumbnailsPreviewLoaded_bl = !0, self.setSource(self.source, !1, self.is360)
                    });
                    if (self.hasThumbnailsPreview = !1, self.data.playlist_ar[self.id].thumbnailsPreview && 2 < self.data.playlist_ar[self.id].thumbnailsPreview.length && (self.hasThumbnailsPreview = !0, self.controller_do && self.controller_do.setupThumbnailsPreview()), self.isAPIReady_bl && -1 != self.id && (self.id < 0 ? self.id = 0 : self.id > self.totaadsIdeos - 1 && (self.id = self.totaadsIdeos - 1), null != self.data.playlist_ar[self.id])) {
                        if (self.stop(t), self.controller_do && self.controller_do.setIsLive(self.isLive), self.cuePointsSource_ar = self.data.playlist_ar[self.id].cuepoints_ar, self.playlist_do && self.playlist_do.curId != self.id) {
                            if (self.prvAdSource = 999999999 * Math.random(), !self.data.playAdsOnlyOnce_bl)
                                for (var o = 0; o < self.data.playlist_ar.length; o++) {
                                    if (self.data.playlist_ar[o].ads_ar)
                                        for (var i = 0; i < self.data.playlist_ar[o].ads_ar.length; i++) self.data.playlist_ar[o].ads_ar[i].played_bl = !1;
                                    if (self.data.playlist_ar[o].popupAds_ar)
                                        for (i = 0; i < self.data.playlist_ar[o].popupAds_ar.length; i++) self.data.playlist_ar[o].popupAds_ar[i].isClsd = !1
                                }
                            if (!self.data.executeCuepointsOnlyOnce_bl && self.cuePointsSource_ar)
                                for (o = 0; o < self.cuePointsSource_ar.length; o++) self.cuePointsSource_ar[o].played_bl = !1
                        } - 1 != t.indexOf("vimeo.com") && -1 == t.indexOf(".m3u8") && -1 == t.indexOf(".mp4") ? self.videoType_str = FWDUVPlayer.VIMEO : -1 != t.indexOf("youtube.") ? self.videoType_str = FWDUVPlayer.YOUTUBE : -1 != t.toLowerCase().indexOf(".mp3") ? (self.videoType_str = FWDUVPlayer.MP3, self.controller_do && self.controller_do.setX(0)) : -1 != t.indexOf(".jpg") || -1 != t.indexOf(".jpeg") || -1 != t.indexOf(".png") ? (self.videoType_str = FWDUVPlayer.IMAGE, self.controller_do && self.controller_do.setX(0)) : (self.controller_do && self.controller_do.setX(0), self.isMbl || FWDUVPlayer.hasHTMLHLS || -1 == t.indexOf(".m3u8") ? -1 != t.indexOf(".mpd") ? self.videoType_str = FWDUVPlayer.DASH : self.videoType_str = FWDUVPlayer.VIDEO : self.videoType_str = FWDUVPlayer.HLS_JS), self.videoSourcePath_str = t, self.finalVideoPath_str = t, self.posterPath_str = self.data.playlist_ar[self.id].posterSource;
                        var l = self.data.playlist_ar[self.id].imaURL;
                        if (self.videoType_str == FWDUVPlayer.VIDEO && !self.errorImaSDK || (l = !1), l) {
                            if (self.isIMA = l, self.setupSilent(), !self.data.imaReady) return void self.data.startToLoadIMA();
                            self.IMA || (FWDUVPIMA.setPrototype(), self.IMA = new FWDUVPIMA(self))
                        }
                        if (self.IMA || (self.isIMA = !1), self.cc && self.cc.checkButtonState(), -1 != t.indexOf(".mpd") && !self.isDASHLoaded_bl && !FWDUVPlayer.isDASHLoaded_bl) return -1 != location.protocol.indexOf("file:") ? void self.showSourceError("This browser doesn't allow playing MPEG DASH videos local, please test online.") : ((n = document.createElement("script")).src = self.data.dashPath_str, document.head.appendChild(n), n.onerror = function() {
                            self.showSourceError("Error loading MPEG DASH library <font color='#FF0000'>" + self.data.dashPath_str + "</font>.")
                        }, n.onload = function() {
                            self.isDASHLoaded_bl = !0, FWDUVPlayer.isDASHLoaded_bl = !0, self.setupDASH(), self.setSource(t, !1, self.is360)
                        }, self.isThumbClick_bl = !1, void(self.autoPlay_bl || self.isThumbClick_bl || (self.setPosterSource(self.posterPath_str), self.videoPoster_do && self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show())));
                        if (!(self.isMbl || FWDUVPlayer.hasHTMLHLS || -1 == t.indexOf(".m3u8") || self.isHLSJsLoaded_bl || FWDUVPlayer.isHLSJsLoaded_bl)) return -1 != location.protocol.indexOf("file:") ? void self.showSourceError("This browser doesn't allow playing HLS videos local, please test online.") : ((n = document.createElement("script")).src = self.data.hlsPath_str, document.head.appendChild(n), n.onerror = function() {
                            self.showSourceError("Error loading HLS library <font color='#FF0000'>" + self.data.hlsPath_str + "</font>.")
                        }, n.onload = function() {
                            self.isHLSJsLoaded_bl = !0, FWDUVPlayer.isHLSJsLoaded_bl = !0, self.setupHLS(), self.setSource(t, !1, self.is360)
                        }, void(self.autoPlay_bl || self.isThumbClick_bl || (self.setPosterSource(self.posterPath_str), self.videoPoster_do && self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show())));
                        if (-1 != t.indexOf("youtube.") && !self.ytb_do) return setTimeout(function() {
                            self.showPreloader_bl && (self.main_do.addChild(self.preloader_do), self.preloader_do && self.preloader_do.show(!1), self.lrgPlayBtn && self.lrgPlayBtn.hide(), -1 != location.protocol.indexOf("file:") && FWDUVPUtils.isIE && self.main_do.addChild(self.info_do))
                        }, 50), -1 != location.protocol.indexOf("file:") && FWDUVPUtils.isIE ? void self.showSourceError("This browser doesn't allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome.") : void self.setupYoutubeAPI();
                        if (-1 != t.indexOf("vimeo.") && !self.vimeo_do && self.videoType_str == FWDUVPlayer.VIMEO) return -1 != location.protocol.indexOf("file:") ? void self.showSourceError("This browser doesn't allow playing Vimeo videos local, please test online.") : (self.showPreloader_bl && (self.main_do.addChild(self.preloader_do), self.preloader_do && self.preloader_do.show(!1)), self.lrgPlayBtn && self.lrgPlayBtn.hide(), void self.setupVimeoAPI());
                        if (self.videoType_str != FWDUVPlayer.VIDEO && self.videoType_str != FWDUVPlayer.HLS_JS && (self.is360 = !1), self.is360 && !self.isThreeJsOrbigLoaded_bl) {
                            if (FWDUVPUtils.isLocal) return void self.showSourceError("This browser doesn't allow playing 360 videos local, please test online.");
                            if (!FWDUVPUtils.hasWEBGL) return void self.showSourceError("Playing 360 videos in this browser is not possible because it doesn't support WEBGL.");
                            var n;
                            if (!self.isThreeJsLoaded_bl && !FWDUVPlayer.hasThreeJsLoaded_bl) return (n = document.createElement("script")).src = self.data.threeJsPath_str, n.onerror = function() {
                                self.showSourceError("Error loading 360 degree library <font color='#FF0000'>" + self.data.threeJsPath_str + "</font>.")
                            }, n.onload = function() {
                                self.isThreeJsOrbigLoaded_bl = !0;
                                var e = document.createElement("script");
                                e.src = self.data.threeJsControlsPath_str, e.onerror = function() {
                                    self.showSourceError("Error loading three.js from <font color='#FF0000'>" + self.data.threeJsControlsPath_str + "</font>.")
                                }, e.onload = function() {
                                    FWDUVPlayer.hasThreeJsLoaded_bl = !0, self.isThreeJsOrbitLoaded_bl = !0, self.isThreeJsOrbigLoaded_bl && self.isThreeJsOrbitLoaded_bl && self.setSource(t, !0, !0), clearTimeout(self.load360ScriptsId_to), self.preloader_do && self.preloader_do.hide()
                                }, document.head.appendChild(e)
                            }, document.head.appendChild(n), void(this.load360ScriptsId_to = setTimeout(function() {
                                self.showPreloader_bl && self.preloader_do && self.preloader_do.show(!1)
                            }, 1e3))
                        }
                        if (self.is360 ? self.dumyClick_do.getStyle().cursor = "url(" + self.data.handPath_str + "), default" : self.dumyClick_do.getStyle().cursor = "auto", self.data.playlist_ar[self.id] && self.data.playlist_ar[self.id].scrubAtTimeAtFirstPlay && (self.playAtTime_bl = !0), self.controller_do && self.controller_do.rewindButton_do && self.controller_do.rewindButton_do.disable(), self.popwSource = self.data.playlist_ar[self.id].dataAdvertisementOnPauseSource, self.data.playlist_ar[self.id] && self.data.playlist_ar[self.id].dataAdvertisementOnPauseSource ? self.showPopW_bl = !0 : self.showPopW_bl = !1, -1 != (t = t || self.data.playlist_ar[self.id].videoSource[self.data.playlist_ar[self.id].startAtVideo].source).indexOf("youtube.")) {
                            t = t.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2]
                        }
                        if (self.controller_do && self.controller_do.enablePlayButton(), self.prevVideoSource_str = t) {
                            if (self.playlist_do && (self.playlist_do.curId = self.id, self.playlist_do.checkThumbsState()), self.controller_do && self.data.playlist_ar[self.id].subtitleSource && 1 < self.data.playlist_ar[self.id].subtitleSource.length && (self.controller_do.updateSubtitleButtons(self.data.playlist_ar[self.id].subtitleSource, self.data.playlist_ar[self.id].startAtSubtitle), self.ccSS = Number(self.data.playlist_ar[self.id].subtitleSource.length - self.data.playlist_ar[self.id].startAtSubtitle)), self.subtitle_do.stopToLoadSubtitle(), self.controller_do && self.controller_do.updateHexColorForScrubber(self.isAdd_bl), self.annotations_ar = self.data.playlist_ar[self.id].annotations_ar, self.annotations_do.setupAnnotations(self.annotations_ar), self.startAtPlaybackIndex = self.data.startAtPlaybackIndex, "0.25" == self.data.playlist_ar[self.id].dataPlaybackRate ? self.startAtPlaybackIndex = 5 : "0.5" == self.data.playlist_ar[self.id].dataPlaybackRate ? self.startAtPlaybackIndex = 4 : "1" == self.data.playlist_ar[self.id].dataPlaybackRate ? self.startAtPlaybackIndex = 3 : "1.25" == self.data.playlist_ar[self.id].dataPlaybackRate ? self.startAtPlaybackIndex = 2 : "1.5" == self.data.playlist_ar[self.id].dataPlaybackRate ? self.startAtPlaybackIndex = 1 : "2" == self.data.playlist_ar[self.id].dataPlaybackRate && (self.startAtPlaybackIndex = 0), self.prevVideoSourcePath_str = self.videoSourcePath_str, self.resizeHandler(!1, !0), self.videoType_str == FWDUVPlayer.IMAGE) return self.updateImageScreen(self.videoSourcePath_str), void(self.videoPoster_do && self.videoPoster_do.setX(-5e3));
                            if (self.videoHolder_do.contains(self.imageSceeenHolder_do) && self.videoHolder_do.removeChild(self.imageSceeenHolder_do), self.videoPoster_do && self.videoPoster_do.setX(0), self.getVideoSource() && self.dispatchEvent(FWDUVPlayer.UPDATE_VIDEO_SOURCE), self.videoType_str == FWDUVPlayer.VIMEO) return self.ytb_do && self.ytb_do.setX(-5e3), self.videoScreen_do && self.videoScreen_do.setX(-5e3), 0 != self.vimeo_do.x && self.vimeo_do.setX(0), self.isAdd_bl ? self.showClickScreen() : self.hideClickScreen(), self.audioScreen_do && self.audioScreen_do.setX(-5e3), self.audioScreen_do.setVisible(!1), self.videoScreen_do && self.videoScreen_do.setVisible(!1), self.controller_do && self.controller_do.removePlaybackRateButton(), self.vimeo_do.setSource(t), self.controller_do && (self.controller_do.hideQualityButtons(!1), self.controller_do.removeYtbQualityButton()), self.videoPoster_do.hide(!0), self.setPosterSource(self.posterPath_str), self.isMbl ? (self.videoPoster_do.hide(), self.lrgPlayBtn && self.lrgPlayBtn.hide(), self.data.aom_bl && (self.controller_do && self.controller_do.updateVolume(0), self.play())) : (self.data.autoPlay_bl || self.isThumbClick_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl ? setTimeout(self.play, 500) : (self.videoPoster_do && self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show()), self.getVideoSource() && self.dispatchEvent(FWDUVPlayer.UPDATE_VIDEO_SOURCE), void this.resizeHandler();
                            if (self.videoType_str == FWDUVPlayer.YOUTUBE) return self.vimeo_do && self.vimeo_do.setX(-5e3), self.videoScreen_do.setX(-5e3), self.videoScreen_do.setVisible(!1), self.audioScreen_do && self.audioScreen_do.setX(-5e3), self.audioScreen_do.setVisible(!1), self.ytb_do && self.ytb_do.setX(0), self.isTempYoutubeAdd_bl = !1, self.ytb_do.setSource(t), self.videoPoster_do.hide(!0), self.setPosterSource(self.posterPath_str), self.isMbl ? setTimeout(function() {
                                self.videoPoster_do.hide(), self.lrgPlayBtn.hide(), self.data.aom_bl && (self.controller_do && self.controller_do.updateVolume(0), self.play())
                            }, 100) : (self.data.autoPlay_bl || self.isThumbClick_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl ? self.data.autoPlay_bl && !self.isMbl && self.play() : (self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show()), self.controller_do && (self.controller_do.addYtbQualityButton(), self.controller_do && (self.videoType_str == FWDUVPlayer.VIMEO || self.videoType_str == FWDUVPlayer.IMAGE ? self.controller_do.removePlaybackRateButton() : self.controller_do.addPlaybackRateButton(self.startAtPlaybackIndex))), self.isAdd_bl ? self.setPlaybackRate(1) : self.setPlaybackRate(self.data.defaultPlaybackRate_ar[self.data.startAtPlaybackIndex]), self.controller_do && self.data.showPlaybackRateButton_bl && self.controller_do.updatePlaybackRateButtons(self.startAtPlaybackIndex), self.resizeHandler(!1, !0), void(self.getVideoSource() && self.dispatchEvent(FWDUVPlayer.UPDATE_VIDEO_SOURCE));
                            self.finalVideoPath_str = t, self.videoType_str == FWDUVPlayer.MP3 && (self.vimeo_do && self.vimeo_do.setX(-5e3), self.ytb_do && self.ytb_do.setX(-5e3), self.audioScreen_do && self.audioScreen_do.setX(-5e3), self.audioScreen_do.setVisible(!1), self.videoScreen_do.setVisible(!0), self.controller_do && 1 < self.data.playlist_ar[self.id].videoSource.length ? (self.controller_do.updatePreloaderBar(0), self.controller_do && self.controller_do.addYtbQualityButton(), self.controller_do.updateQuality(self.data.playlist_ar[self.id].videoLabels_ar, self.data.playlist_ar[self.id].videoLabels_ar[self.data.playlist_ar[self.id].videoLabels_ar.length - 1 - self.data.playlist_ar[self.id].startAtVideo])) : self.controller_do && self.controller_do.removeYtbQualityButton(), self.controller_do && (self.videoType_str == FWDUVPlayer.VIMEO || self.videoType_str == FWDUVPlayer.IMAGE ? self.controller_do.removePlaybackRateButton() : self.controller_do.addPlaybackRateButton(self.startAtPlaybackIndex)), self.audioScreen_do.setX(0), self.audioScreen_do.setVisible(!0), !self.isAdd_bl && window.FWDUVPCC && FWDUVPCC.enableButton(), self.videoPoster_do.hide(!0), self.setPosterSource(self.posterPath_str), self.audioScreen_do.setSource(t), (self.data.autoPlay_bl || self.isThumbClick_bl || !self.isMbl && self.isAdd_bl && !self.loadAddFirstTime_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl ? self.play() : (self.videoPoster_do && self.videoPoster_do.show(), self.lrgPlayBtn && self.lrgPlayBtn.show())), (FWDUVPlayer.hasHTML5Video && self.videoType_str == FWDUVPlayer.VIDEO || self.videoType_str == FWDUVPlayer.HLS_JS || self.videoType_str == FWDUVPlayer.DASH) && (self.vimeo_do && self.vimeo_do.setX(-5e3), self.ytb_do && self.ytb_do.setX(-5e3), self.audioScreen_do && self.audioScreen_do.setX(-5e3), self.audioScreen_do.setVisible(!1), self.videoScreen_do.setVisible(!0), self.controller_do && 1 < self.data.playlist_ar[self.id].videoSource.length ? (self.controller_do.updatePreloaderBar(0), self.controller_do && self.controller_do.addYtbQualityButton(), self.controller_do.updateQuality(self.data.playlist_ar[self.id].videoLabels_ar, self.data.playlist_ar[self.id].videoLabels_ar[self.data.playlist_ar[self.id].videoLabels_ar.length - 1 - self.data.playlist_ar[self.id].startAtVideo])) : self.controller_do && self.controller_do.removeYtbQualityButton(), self.controller_do && self.controller_do && (self.videoType_str == FWDUVPlayer.VIMEO || self.videoType_str == FWDUVPlayer.IMAGE ? self.controller_do.removePlaybackRateButton() : self.controller_do.addPlaybackRateButton(self.startAtPlaybackIndex)), self.videoType_str == FWDUVPlayer.DASH ? (self.videoScreen_do.setSource(t), self.videoScreen_do.initVideo(), self.setupDASH(), self.dashJS.initialize(self.videoScreen_do.video_el, self.videoSourcePath_str, !1), self.dashJS.attachSource(self.videoSourcePath_str), self.dashJS.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function(e) {
                                self.isDASHManifestReady_bl = !0, ((self.data.autoPlay_bl || self.isThumbClick_bl || !self.isMbl && self.isAdd_bl && !self.loadAddFirstTime_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl) && self.videoType_str == FWDUVPlayer.DASH && setTimeout(self.play, 100), self.isAdd_bl ? self.setPlaybackRate(1) : self.setPlaybackRate(self.data.defaultPlaybackRate_ar[self.startAtPlaybackIndex]), self.controller_do && self.data.showPlaybackRateButton_bl && self.controller_do.updatePlaybackRateButtons(self.startAtPlaybackIndex)
                            })) : self.videoType_str == FWDUVPlayer.HLS_JS ? (self.videoScreen_do.setSource(t), self.videoScreen_do.initVideo(), self.setupHLS(), self.hlsJS.loadSource(self.videoSourcePath_str), self.hlsJS.attachMedia(self.videoScreen_do.video_el), self.hlsJS.on(Hls.Events.MANIFEST_PARSED, function(e) {
                                self.videoType_str == FWDUVPlayer.HLS_JS && (self.isHLSManifestReady_bl = !0, ((self.data.autoPlay_bl || self.isThumbClick_bl || !self.isMbl && self.isAdd_bl && !self.loadAddFirstTime_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl) && self.play(), self.isAdd_bl ? self.setPlaybackRate(1) : self.setPlaybackRate(self.data.defaultPlaybackRate_ar[self.startAtPlaybackIndex]), self.controller_do && self.data.showPlaybackRateButton_bl && self.controller_do.updatePlaybackRateButtons(self.startAtPlaybackIndex))
                            })) : (!self.isAdd_bl && window.FWDUVPCC && FWDUVPCC.enableButton(), self.videoPoster_do.hide(!0), self.setPosterSource(self.posterPath_str), self.videoScreen_do.setSource(t), (self.data.autoPlay_bl || self.data.aom_bl || self.isThumbClick_bl || !self.isMbl && self.isAdd_bl && !self.loadAddFirstTime_bl) && !self.lightBox_do || self.lightBox_do && self.lightBox_do.isShowed_bl ? (self.play(), self.data.aom_bl && (self.controller_do && self.controller_do.updateVolume(0), self.play()), self.isCasting && self.videoPoster_do.show()) : (self.videoPoster_do.show(!0), self.lrgPlayBtn.show()), self.isAdd_bl ? self.setPlaybackRate(1) : self.setPlaybackRate(self.data.defaultPlaybackRate_ar[self.startAtPlaybackIndex]), self.controller_do && self.data.showPlaybackRateButton_bl && self.controller_do.updatePlaybackRateButtons(self.startAtPlaybackIndex)), self.isIMA && self.IMA.setSource(self.isIMA)), this.resizeHandler()
                        } else self.showSourceError("Video source is not defined!")
                    }
                }, this.setupDASH = function() {
                    self.dashJS || (self.isDASHLoaded_bl = !0, self.dashJS = dashjs.MediaPlayer().create(), self.dashJS.on(dashjs.MediaPlayer.events.ERROR, function(e) {
                        console.log(e), self.main_do.addChild(self.info_do), self.info_do.showText(e.error.message)
                    }))
                }, this.destroyDASH = function() {
                    if (self.dashJS) {
                        try {
                            self.dashJS.reset()
                        } catch (e) {}
                        self.dashJS = null
                    }
                }, this.setupHLS = function() {
                    !self.hlsJS && window.Hls && (self.isHLSJsLoaded_bl = !0, self.hlsJS = new Hls, FWDUVPRegisterHLSError(self))
                }, this.destroyHLS = function() {
                    self.hlsJS && (self.hlsJS.destroy(), self.hlsJS = null)
                }, this.goFullScreen = function() {
                    if (self.isAPIReady_bl) {
                        self.wasMin = self.isMin, self.isFullScreen_bl = !0, self.removeMinOnScroll(), document.addEventListener && (document.addEventListener("fullscreenchange", self.onFullScreenChange), document.addEventListener("mozfullscreenchange", self.onFullScreenChange), document.addEventListener("webkitfullscreenchange", self.onFullScreenChange), document.addEventListener("MSFullscreenChange", self.onFullScreenChange)), FWDUVPUtils.isSafari && FWDUVPUtils.isWin || (document.documentElement.requestFullScreen ? self.main_do.screen.requestFullScreen() : document.documentElement.mozRequestFullScreen ? self.main_do.screen.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen ? self.main_do.screen.webkitRequestFullScreen() : document.documentElement.msRequestFullscreen && self.main_do.screen.msRequestFullscreen()), self.callVastEvent("playerExpand"), self.stopVisualization(), self.disableClick(), self.isEmbedded_bl || (self.main_do.getStyle().position = "fixed", document.documentElement.style.overflow = "hidden", self.main_do.getStyle().zIndex = 2147483641), self.controller_do && (self.controller_do.showNormalScreenButton(), self.controller_do.setNormalStateToFullScreenButton()), self.customContextMenu_do && self.customContextMenu_do.updateFullScreenButton(1);
                        var e = FWDUVPUtils.getScrollOffsets();
                        self.lastX = e.x, self.lastY = e.y, window.scrollTo(0, 0), self.isMbl && window.addEventListener("touchmove", self.disableFullScreenOnMobileHandler), self.dispatchEvent(FWDUVPlayer.GO_FULLSCREEN), self.resizeHandler()
                    }
                }, this.disableFullScreenOnMobileHandler = function(e) {
                    e.preventDefault && e.preventDefault()
                }, this.goNormalScreen = function() {
                    self.isAPIReady_bl && (document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), self.disableClick(), self.addMainDoToTheOriginalParent(), self.isFullScreen_bl = !1)
                }, this.addMainDoToTheOriginalParent = function() {
                    self.isFullScreen_bl && (document.removeEventListener && (document.removeEventListener("fullscreenchange", self.onFullScreenChange), document.removeEventListener("mozfullscreenchange", self.onFullScreenChange), document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange), document.removeEventListener("MSFullscreenChange", self.onFullScreenChange)), self.callVastEvent("playerCollapse"), self.controller_do && self.controller_do.setNormalStateToFullScreenButton(), self.isEmbedded_bl || (self.displayType == FWDUVPlayer.RESPONSIVE || self.displayType == FWDUVPlayer.AFTER_PARENT || self.displayType == FWDUVPlayer.LIGHTBOX || self.displayType == FWDUVPlayer.STICKY ? (FWDUVPUtils.isIEAndLessThen9 ? document.documentElement.style.overflow = "auto" : document.documentElement.style.overflow = "visible", self.isMin ? (self.main_do.getStyle().position = "fixed", self.main_do.getStyle().zIndex = 9999999999999) : (self.main_do.getStyle().position = "relative", self.main_do.getStyle().zIndex = 0)) : (self.main_do.getStyle().position = "absolute", self.main_do.getStyle().zIndex = 9999999999998)), self.displayType != FWDUVPlayer.FULL_SCREEN && self.controller_do.enablePlaylistButton(), self.customContextMenu_do && self.customContextMenu_do.updateFullScreenButton(0), self.controller_do.showFullScreenButton(), window.scrollTo(self.lastX, self.lastY), self.showCursor(), self.resizeHandler(), setTimeout(function() {
                        self.addMinOnScroll(), self.resizeHandler()
                    }, 500), window.scrollTo(self.lastX, self.lastY), FWDUVPUtils.isIE || setTimeout(function() {
                        window.scrollTo(self.lastX, self.lastY)
                    }, 150), self.isMbl && window.removeEventListener("touchmove", self.disableFullScreenOnMobileHandler), self.dispatchEvent(FWDUVPlayer.GO_NORMALSCREEN))
                }, this.onFullScreenChange = function(e) {
                    document.fullScreen || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen || (self.controller_do.showNormalScreenButton(), self.addMainDoToTheOriginalParent(), self.isFullScreen_bl = !1)
                }, this.loadPlaylist = function(e) {
                    self.isAPIReady_bl && self.data.prevId != e && (self.data.playlist_ar && self.data.playlist_ar[self.id] && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.catId = e, self.id = 0, self.catId < 0 ? self.catId = 0 : self.catId > self.data.totalPlaylists - 1 && (self.catId = self.data.totalPlaylists - 1), self.useDeepLinking_bl ? FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id) : self.loadInternalPlaylist())
                }, this.playNext = function() {
                    self.isAPIReady_bl && self.isPlaylistLoaded_bl && (self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.id++, self.executePlayNextPrevOrShuffle())
                }, this.playPrev = function() {
                    self.isAPIReady_bl && self.isPlaylistLoaded_bl && (self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.id--, self.executePlayNextPrevOrShuffle())
                }, this.playShuffle = function() {
                    if (self.isAPIReady_bl && self.isPlaylistLoaded_bl) {
                        self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName);
                        for (var e = parseInt(Math.random() * self.totaadsIdeos); e == self.id;) e = parseInt(Math.random() * self.totaadsIdeos);
                        self.id = e, self.executePlayNextPrevOrShuffle()
                    }
                }, this.executePlayNextPrevOrShuffle = function() {
                    self.data.isVastXMLParsed_bl = !1, self.totalDuration = 0, self.id < 0 ? self.id = self.totaadsIdeos - 1 : self.id > self.totaadsIdeos - 1 && (self.id = 0), self.useDeepLinking_bl ? FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id) : (self.isThumbClick_bl = !0, self.updateAds(0, !0))
                }, this.playVideo = function(e) {
                    self.isAPIReady_bl && self.isPlaylistLoaded_bl && (self.data.playlist_ar && (self.videoNameGa = self.data.playlist_ar[self.id].gaStr, self.videoCat = self.data.cats_ar[self.catId].playlistName), self.id = e, self.id < 0 ? self.id = self.totaadsIdeos - 1 : self.id > self.totaadsIdeos - 1 && (self.id = 0), self.useDeepLinking_bl ? FWDUVPAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id) : (self.updateAds(0, !0), self.isMbl && self.videoType_str == FWDUVPlayer.VIDEO && self.play(), self.isMbl || self.play()))
                }, this.setVideoSource = function(e, t, s) {
                    self.isAdd_bl = !1;
                    self.isLive = s, self.setSource(e, !1, t)
                }, this.downloadVideo = function(e) {
                    var t;
                    null == e && (e = self.id);
                    var s = self.data.playlist_ar[e].videoSource[self.data.playlist_ar[self.id].startAtVideo].source; - 1 != String(s.indexOf("encrypt:")) && (s = atob(s.substr(8))), t = -1 != s.indexOf("/") ? s.substr(s.lastIndexOf("/") + 1) : s;
                    var o = "videoName:" + self.data.playlist_ar[self.id].gaStr;
                    window.ga && ga("send", {
                        hitType: "event",
                        eventCategory: self.data.cats_ar[self.catId].playlistName,
                        eventAction: "downloaded",
                        eventLabel: o,
                        nonInteraction: !0
                    }), self.data.downloadVideo(s, t)
                }, this.share = function() {
                    self.isAPIReady_bl && self.controllerShareHandler()
                }, this.getVideoSource = function() {
                    if (self.isAPIReady_bl) return self.finalVideoPath_str
                }, this.getPosterSource = function() {
                    if (self.isAPIReady_bl) return self.posterPath_str
                }, this.getPlaylistId = function() {
                    return self.catId
                }, this.getVideoId = function() {
                    return self.id
                }, this.getCurrentTime = function(e) {
                    var t;
                    return "milliseconds" == (e = e || "text") ? (t = self.curTimeInmilliseconds ? self.curTimeInmilliseconds : 0, self.isCasting && (t = self.cc.getCurrentTime())) : "seconds" == e ? (t = self.curTimeInSecond ? self.curTimeInSecond : 0, self.isCasting && (t = self.cc.getCurrentTime())) : (t = self.curTime ? self.curTime : "00:00", self.isCasting && (t = FWDEVPUtils.formatTime(self.cc.getCurrentTime()))), t
                }, this.getTotalTime = function(e) {
                    var t;
                    return "milliseconds" == (e = e || "text") ? (t = self.totalTimeInMilliseconds ? self.totalTimeInMilliseconds : 0, self.isCasting && (t = self.cc.getCurrentTime())) : "seconds" == e ? (t = Math.round(self.totalTimeInSeconds), self.isCasting && (t = self.cc.getDuration())) : (t = self.totalTime ? self.totalTime : "00:00", self.isCasting && (t = FWDEVPUtils.formatTime(self.cc.getDuration()))), t
                }, this.setPlaybackRate = function(e) {
                    self.isAPIReady_bl && (self.videoType_str == FWDUVPlayer.VIDEO && self.videoScreen_do ? self.videoScreen_do.setPlaybackRate(e) : self.videoType_str == FWDUVPlayer.YOUTUBE ? self.ytb_do.setPlaybackRate(e) : self.videoType_str == FWDUVPlayer.MP3 && self.audioScreen_do.setPlaybackRate(e))
                }, this.showLightbox = function() {
                    self.lightBox_do && self.lightBox_do.show()
                }, this.fillEntireVideoScreen = function(e) {
                    this.fillEntireVideoScreen_bl = e, this.resizeHandler()
                }, this.hideCursor = function() {
                    document.documentElement.style.cursor = "none", document.getElementsByTagName("body")[0].style.cursor = "none", self.isAdd_bl || (self.dumyClick_do.getStyle().cursor = "none")
                }, this.showCursor = function() {
                    document.documentElement.style.cursor = "auto", document.getElementsByTagName("body")[0].style.cursor = "auto", self.isAdd_bl ? self.dumyClick_do.setButtonMode(!0) : self.is360 ? self.dumyClick_do.getStyle().cursor = "url(" + self.data.handPath_str + "), default" : self.dumyClick_do.getStyle().cursor = "auto"
                }, this.showPlayer = function() {
                    self.isAPIReady_bl && (self.isShowed_bl = !0, self.opener_do.showCloseButton(), self.setStageContainerFinalHeightAndPosition(self.animate_bl), self.isMin && (self.isMinShowed = !0, self.positionOnMin(!0)))
                }, this.hidePlayer = function() {
                    self.isAPIReady_bl && (self.isShowed_bl = !1, self.opener_do.showOpenButton(), self.setStageContainerFinalHeightAndPosition(self.animate_bl), self.isMin && (self.isMinShowed = !1, self.positionOnMin(!0)))
                }, this.getStartTimeStamp = function(e) {
                    var t = window.location.href;
                    if (-1 != (t = t.substr(t.indexOf(e + "=") + 2)).indexOf("&") && (t = t.substr(0, t.indexOf("&"))), -1 != t.indexOf("s&") && (t = t.substr(0, t.indexOf("s&") + 1)), !(10 < t.length)) {
                        var s = /\d+h/g,
                            o = t.match(s);
                        try {
                            o = t.match(s)[0]
                        } catch (e) {}
                        o && (1 == (o = o.substr(0, o.length - 1)).length && parseInt(o) < 10 && (o = "0" + o), 59 < parseInt(o) && (o = 59)), o = o || "00";
                        s = /h\d+m/g;
                        var i = t.match(s);
                        try {
                            i = t.match(s)[0].substr(1)
                        } catch (e) {}
                        i && (1 == (i = i.substr(0, i.length - 1)).length && parseInt(i) < 10 && (i = "0" + i), 59 < parseInt(i) && (i = 59)), i = i || "00";
                        s = /\d+s/g;
                        var l = t.match(s);
                        try {
                            l = t.match(s)[0]
                        } catch (e) {}
                        return l && (1 == (l = l.substr(0, l.length - 1)).length && parseInt(l) < 10 && (l = "0" + l), 59 < parseInt(l) && (l = 59)), o + ":" + i + ":" + (l = l || "00")
                    }
                }, this.setVastSource = function(e) {
                    self.isAPIReady_bl && (self.isAdd_bl = !1, self.adDone_bl = !1, self.stop(), self.prevDuration = -1, self.data.vastXML = e, self.data.isVastXMLParsed_bl = !1, self.data.vast.id = -1, self.updateAds())
                }, this.addListener = function(e, t) {
                    if (null == e) throw Error("type is required.");
                    if ("object" == typeof e) throw Error("type must be of type String.");
                    if ("function" != typeof t) throw Error("listener must be of type Function.");
                    var s = {};
                    s.type = e, s.listener = t, (s.target = this).listeners.events_ar.push(s)
                }, this.dispatchEvent = function(e, t) {
                    if (null != this.listeners) {
                        if (null == e) throw Error("type is required.");
                        if ("object" == typeof e) throw Error("type must be of type String.");
                        for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                            if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e) {
                                if (t)
                                    for (var i in t) this.listeners.events_ar[s][i] = t[i];
                                this.listeners.events_ar[s].listener.call(this, this.listeners.events_ar[s])
                            }
                    }
                }, this.removeListener = function(e, t) {
                    if (null == e) throw Error("type is required.");
                    if ("object" == typeof e) throw Error("type must be of type String.");
                    if ("function" != typeof t) throw Error("listener must be of type Function." + e);
                    for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                        if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e && this.listeners.events_ar[s].listener === t) {
                            this.listeners.events_ar.splice(s, 1);
                            break
                        }
                }, this.callVastEvent = function(e) {
                    if (self.TrackingEvents) {
                        for (var t, s = 0; s < self.TrackingEvents.length; s++) e == self.TrackingEvents[s].event && (t = self.TrackingEvents[s].URI);
                        t && self.executeVastEvent(t)
                    }
                }, this.executeVastEvent = function(e) {
                    e && ((new Image).src = e)
                }, self.cleanMainEvents = function() {
                    window.removeEventListener ? window.removeEventListener("resize", self.onResizeHandler) : window.detachEvent && window.detachEvent("onresize", self.onResizeHandler), clearTimeout(self.resizeHandlerId_to), clearTimeout(self.resizeHandler2Id_to), clearTimeout(self.hidePreloaderId_to), clearTimeout(self.orientationChangeId_to)
                };
                var args = FWDUVPUtils.getUrlArgs(window.location.search),
                    embedTest = args.RVPInstanceName,
                    instanceName = args.RVPInstanceName;
                if (embedTest && (self.isEmbedded_bl = props.instanceName == instanceName), self.isEmbedded_bl) {
                    var ws = FWDUVPUtils.getViewportSize();
                    self.embeddedPlaylistId = parseInt(args.RVPPlaylistId), self.embeddedVideoId = parseInt(args.RVPVideoId);
                    var dumy_do = new FWDUVPDisplayObject("div");
                    dumy_do.setBkColor(props.backgroundColor), dumy_do.setWidth(ws.w), dumy_do.setHeight(ws.h), document.documentElement.style.overflow = "hidden", document.getElementsByTagName("body")[0].style.overflow = "hidden", FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(dumy_do.screen) : document.documentElement.appendChild(dumy_do.screen)
                }
                self.init()
            },
            n9, o9, p9, q9;
        FWDUVPlayer.setPrototype = function() {
            FWDUVPlayer.prototype = new FWDUVPEventDispatcher
        }, FWDUVPlayer.stopAllVideos = function(e) {
            for (var t, s = FWDUVPlayer.instaces_ar.length, o = 0; o < s; o++)(t = FWDUVPlayer.instaces_ar[o]) != e && t.stop()
        }, FWDUVPlayer.pauseAllVideos = function(e) {
            for (var t, s = FWDUVPlayer.instaces_ar.length, o = 0; o < s; o++)(t = FWDUVPlayer.instaces_ar[o]) != e && t.pause()
        }, FWDUVPlayer.hasHTML5VideoTestIsDone = !1, FWDUVPlayer.hasHTML5VideoTestIsDone || (FWDUVPlayer.hasHTML5Video = (n9 = document.createElement("video"), o9 = !1, n9.canPlayType && (o9 = Boolean("probably" == n9.canPlayType("video/mp4") || "maybe" == n9.canPlayType("video/mp4")), FWDUVPlayer.canPlayMp4 = Boolean("probably" == n9.canPlayType("video/mp4") || "maybe" == n9.canPlayType("video/mp4")), FWDUVPlayer.canPlayOgg = Boolean("probably" == n9.canPlayType("video/ogg") || "maybe" == n9.canPlayType("video/ogg")), FWDUVPlayer.canPlayWebm = Boolean("probably" == n9.canPlayType("video/webm") || "maybe" == n9.canPlayType("video/webm"))), !!self.isMbl || (FWDUVPlayer.hasHTML5VideoTestIsDone = !0, o9))), FWDUVPlayer.hasCanvas = Boolean(document.createElement("canvas")), FWDUVPlayer.instaces_ar = [], FWDUVPlayer.hasHTMLHLS = (p9 = document.createElement("video"), q9 = !1, p9.canPlayType && (q9 = Boolean("probably" === p9.canPlayType("application/vnd.apple.mpegurl") || "maybe" === p9.canPlayType("application/vnd.apple.mpegurl"))), q9), FWDUVPlayer.areMainInstancesInitialized_bl = !1, FWDUVPlayer.curInstance = null, FWDUVPlayer.keyboardCurInstance = null, FWDUVPlayer.isYoutubeAPICreated_bl = !1, FWDUVPlayer.HLS_JS = "HLS", FWDUVPlayer.DASH = "DASH", FWDUVPlayer.PAUSE_ALL_VIDEOS = "pause", FWDUVPlayer.STOP_ALL_VIDEOS = "stop", FWDUVPlayer.DO_NOTHING = "none", FWDUVPlayer.YOUTUBE = "youtube", FWDUVPlayer.VIMEO = "vimeo", FWDUVPlayer.VIDEO = "video", FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl = !1, FWDUVPlayer.MP3 = "mp3", FWDUVPlayer.CENTER = "center", FWDUVPlayer.RIGHT = "right", FWDUVPlayer.LEFT = "left", FWDUVPlayer.POSITION_BOTTOM = "bottom", FWDUVPlayer.POSITION_TOP = "top", FWDUVPlayer.HIDE_LIGHTBOX_COMPLETE = "lightboxHideComplete", FWDUVPlayer.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist", FWDUVPlayer.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete", FWDUVPlayer.READY = "ready", FWDUVPlayer.STOP = "stop", FWDUVPlayer.PLAY = "play", FWDUVPlayer.PAUSE = "pause", FWDUVPlayer.UPDATE = "update", FWDUVPlayer.UPDATE_TIME = "updateTime", FWDUVPlayer.UPDATE_VIDEO_SOURCE = "updateVideoSource", FWDUVPlayer.UPDATE_POSTER_SOURCE = "udpatePosterSource", FWDUVPlayer.ERROR = "error", FWDUVPlayer.PLAY_COMPLETE = "playComplete", FWDUVPlayer.VOLUME_SET = "volumeSet", FWDUVPlayer.GO_FULLSCREEN = "goFullScreen", FWDUVPlayer.GO_NORMALSCREEN = "goNormalScreen", FWDUVPlayer.IMAGE = "image", FWDUVPlayer.HLS_JS = "hls_flash", FWDUVPlayer.SAFE_TO_SCRUB = "safeToScrub", FWDUVPlayer.LIGHTBOX = "lightbox", FWDUVPlayer.STICKY = "sticky", FWDUVPlayer.RESPONSIVE = "responsive", FWDUVPlayer.FULL_SCREEN = "fullscreen", FWDUVPlayer.AFTER_PARENT = "afterparent", window.FWDUVPlayer = FWDUVPlayer
    }(window),
    function(e) {
        var a = function(s, e, t, o, i, l) {
            var n = this;
            a.prototype;
            this.mainLightBox_do = null, this.lightBoxBackground_sdo = null, this.lightBoxGridHolder_do = null, this.clsBtn = null, this.mainBackgroundColor_str = e, this.holderBackgroundColor_str = t, this.lightBoxBackgroundOpacity = o, this.lightBoxWidth = i, this.lightBoxHeight = l, this.setupButtonWithDelayId_to, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.closeButtonIsTweening_bl = !0, this.init = function() {
                n.getStyle().zIndex = 9999999, n.setupMainContainers()
            }, this.setupMainContainers = function() {
                n.isMbl && n.hasPointerEvent_bl && (n.getStyle().msTouchAction = "none"), n.lightBoxBackground_sdo = new FWDUVPDisplayObject("div"), n.lightBoxBackground_sdo.setResizableSizeAfterParent(), n.lightBoxBackground_sdo.setBkColor(n.mainBackgroundColor_str), n.lightBoxBackground_sdo.screen.addEventListener("click", n.closeButtonOnStartHandler), n.addChild(n.lightBoxBackground_sdo), n.mainLightBox_do = new FWDUVPDisplayObject("div"), n.mainLightBox_do.setBkColor(n.holderBackgroundColor_str), n.mainLightBox_do.setWidth(1), n.mainLightBox_do.setHeight(1), n.addChild(n.mainLightBox_do), document.documentElement.appendChild(n.screen), n.setX(-1e4), n.setY(-1e4), n.setWidth(0), n.setHeight(0)
            }, this.show = function() {
                if (!n.isShowed_bl) {
                    n.clsBtn ? (n.hideCloseButton(!1), n.showCloseButton(!0), n.clsBtn.setX(-200)) : n.loadClsoeButtonImage();
                    var e = FWDUVPUtils.getViewportSize(),
                        t = FWDUVPUtils.getScrollOffsets();
                    n.setWidth(e.w), n.setHeight(e.h), n.setX(t.x), n.setY(t.y), n.lightBoxBackground_sdo.setAlpha(0), FWDAnimation.to(n.lightBoxBackground_sdo, .8, {
                        alpha: n.lightBoxBackgroundOpacity
                    }), n.setX(t.x), n.setY(t.y), n.mainLightBox_do.setX(parseInt(e.w / 2)), n.mainLightBox_do.setY(parseInt(e.h / 2)), n.lightBoxWidth > e.w ? (n.finalLightBoxWidth = e.w, n.finalLightBoxHeight = parseInt(n.lightBoxHeight * (e.w / n.lightBoxWidth))) : (n.finalLightBoxWidth = n.lightBoxWidth, n.finalLightBoxHeight = n.lightBoxHeight), FWDAnimation.to(n.mainLightBox_do, .8, {
                        w: n.finalLightBoxWidth,
                        h: n.finalLightBoxHeight,
                        x: parseInt((e.w - n.finalLightBoxWidth) / 2),
                        y: parseInt((e.h - n.finalLightBoxHeight) / 2),
                        delay: .4,
                        onComplete: n.showComplete,
                        ease: Expo.easeInOut
                    }), s.main_do && s.main_do.setX(-5e3), n.dispatchEvent(a.SHOW)
                }
            }, this.showComplete = function() {
                n.isShowed_bl = !0, n.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, n.closeButtonOnStartHandler), n.addKeyboardSupport(), s.startResizeHandler(), s.isPlaylistLoaded_bl && s.data.autoPlay_bl && !s.isMbl && s.play()
            }, this.addKeyboardSupport = function() {
                document.addEventListener("keydown", this.onKeyDownHandler)
            }, this.onKeyDownHandler = function(e) {
                27 == e.keyCode && n.closeButtonOnStartHandler()
            }, this.loadClsoeButtonImage = function() {
                n.closeN_img = new Image, n.closeN_img.onload = n.setupCloseButton, n.closeN_img.src = s.mainFolderPath_str + s.sknPth + "embed-close-button.png", n.closeSPath_str = s.mainFolderPath_str + s.sknPth + "embed-close-button-over.png"
            }, this.setupCloseButton = function(e) {
                var t = FWDUVPUtils.getViewportSize();
                FWDUVPSimpleButton.setPrototype(), n.clsBtn = new FWDUVPSimpleButton(n.closeN_img, n.closeSPath_str, void 0, !0), n.hideCloseButton(!1), n.showCloseButton(!0), n.clsBtn.setX(t.w - n.clsBtn.w - 15), n.clsBtn.setY(15), n.addChild(n.clsBtn)
            }, this.showCloseButtonComplete = function() {
                n.closeButtonIsTweening_bl = !1
            }, this.hideCloseButton = function(e) {
                FWDAnimation.killTweensOf(n.clsBtn), e ? FWDAnimation.to(n.clsBtn, .9, {
                    alpha: 0
                }) : n.clsBtn.setAlpha(0)
            }, this.showCloseButton = function(e) {
                FWDAnimation.killTweensOf(n.clsBtn), e ? FWDAnimation.to(n.clsBtn, .9, {
                    alpha: 1,
                    delay: .8
                }) : n.clsBtn.setAlpha(1)
            }, this.mouseDummyHandler = function(e) {
                if (!e.preventDefault) return !1;
                e.preventDefault()
            }, this.closeButtonOnStartHandler = function(e) {
                if (n.isShowed_bl) {
                    n.isShowed_bl = !1;
                    var t = FWDUVPUtils.getViewportSize();
                    n.clsBtn.removeListener(FWDUVPSimpleButton.MOUSE_UP, n.closeButtonOnStartHandler), FWDAnimation.to(n.clsBtn, .9, {
                        alpha: 0
                    }), FWDAnimation.to(n.mainLightBox_do, .8, {
                        w: 0,
                        h: 0,
                        x: parseInt(t.w / 2),
                        y: parseInt(t.h / 2),
                        delay: .4,
                        ease: Expo.easeInOut
                    }), FWDAnimation.to(n.lightBoxBackground_sdo, .8, {
                        alpha: 0,
                        delay: .8
                    }), FWDAnimation.to(s.main_do, .8, {
                        x: -s.main_do.w / 2,
                        y: -s.main_do.h / 2,
                        ease: Expo.easeInOut,
                        delay: .4
                    }), n.lighboxAnimDoneId_to = setTimeout(n.lighboxHideAnimationDone, 1600), n.dispatchEvent(a.CLOSE)
                }
            }, this.lighboxHideAnimationDone = function() {
                n.setX(-1e4), n.setY(-1e4), n.setWidth(0), n.setHeight(0), n.dispatchEvent(a.HIDE_COMPLETE)
            }, this.init()
        };
        a.setPrototype = function() {
            a.prototype = new FWDUVPDisplayObject("div")
        }, a.CLOSE = "ligtBoxClose", a.SHOW = "show", a.HIDE_COMPLETE = "hideComplete", a.prototype = null, e.FWDUVPLightBox = a
    }(window),
    function(l) {
        var n = function(e, t, s, o) {
            var i = this;
            n.prototype;
            this.img_img = null, this.logoImage_do = null, this.position_str = s, this.source_str = t, this.logoLink_str = e.data.logoLink_str, this.margins = o, this.isShowed_bl = !0, this.allowToShow_bl = !0, this.init = function() {
                "none" == i.logoLink_str ? i.getStyle().pointerEvents = "none" : (i.setButtonMode(!0), i.screen.onclick = function() {
                    l.open(i.logoLink_str, "_blank")
                }), i.logoImage_do = new FWDUVPDisplayObject("img"), i.img_img = new Image, i.img_img.onerror = null, i.img_img.onload = i.loadDone, i.img_img.src = i.source_str + "?" + (new Date).getTime(), i.hide()
            }, this.loadDone = function() {
                i.setWidth(i.img_img.width), i.setHeight(i.img_img.height), i.logoImage_do.setScreen(i.img_img), i.addChild(i.logoImage_do), i.logoImage_do.setWidth(i.img_img.width), i.logoImage_do.setHeight(i.img_img.height), i.positionAndResize()
            }, this.positionAndResize = function() {
                e.tempVidStageWidth && ("topleft" == i.position_str ? (i.finalX = i.margins, i.finalY = i.margins) : "topright" == i.position_str ? (i.finalX = e.tempVidStageWidth - i.w - i.margins, i.finalY = i.margins) : "bottomright" == i.position_str ? (i.finalX = e.tempVidStageWidth - i.w - i.margins, i.finalY = e.tempVidStageHeight - i.h - i.margins) : "bottomleft" == i.position_str && (i.finalX = i.margins, i.finalY = e.tempVidStageHeight - i.h - i.margins), i.setX(i.finalX), i.setY(i.finalY))
            }, this.show = function(e) {
                i.isShowed_bl || (i.isShowed_bl = !0, i.setVisible(!0), FWDAnimation.killTweensOf(i), e ? FWDAnimation.to(i, .8, {
                    alpha: 1,
                    ease: Expo.easeInOut
                }) : i.setAlpha(1))
            }, this.hide = function(e, t) {
                (i.isShowed_bl || t) && (i.isShowed_bl = !1, FWDAnimation.killTweensOf(i), e ? FWDAnimation.to(i, .8, {
                    alpha: 0,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        i.setVisible(!1)
                    }
                }) : (i.setAlpha(0), i.setVisible(!1)))
            }, this.init()
        };
        n.setPrototype = function() {
            n.prototype = new FWDUVPDisplayObject("div")
        }, n.prototype = null, l.FWDUVPLogo = n
    }(window),
    function() {
        var i = function(e, t, s) {
            var o = this;
            this.animation_img = e.openerAnimation_img, t == FWDUVPlayer.POSITION_TOP ? (this.openN_img = e.openTopN_img, this.openSPath_str = e.openTopSPath_str) : (this.openN_img = e.openBottomN_img, this.openSPath_str = e.openBottomSPath_str), this.openerPauseN_img = e.openerPauseN_img, this.openerPlayN_img = e.openerPlayN_img, this.closeN_img = e.closeN_img, o.useHEX = e.useHEX, o.nBC = e.nBC, o.sBC = e.sBC, this.openerPauseS_str = e.openerPauseS_str, this.openerPlaySPath_str = e.openerPlayS_str, this.closeSPath_str = e.closeSPath_str, this.animationPath_img = e.animationPath_img;
            try {
                this.totalWidth = o.openN_img.width, this.totalHeight = o.openN_img.height
            } catch (e) {}
            this.mainHld = null, this.dumy_do = null, this.openN_do = null, this.openS_do = null, this.closeN_do = null, this.closeS_do = null, this.animation_do = null, this.playPauseButton_do = null, this.position_str = t, this.alignment_str = e.openerAlignment_str, this.openerEqulizerOffsetLeft = e.openerEqulizerOffsetLeft, this.openerEqulizerOffsetTop = e.openerEqulizerOffsetTop, this.showFirstTime_bl = !0, this.playerIsShowed_bl = s, this.showOpenerPlayPauseButton_bl = e.showOpenerPlayPauseButton_bl, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.init = function() {
                -1 != e.sknPth.indexOf("hex_white") ? o.sBC = "#FFFFFF" : o.sBC = e.sBC, o.hasTransform3d_bl = !1, o.hasTransform2d_bl = !1, o.setBackfaceVisibility(), o.getStyle().msTouchAction = "none", o.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)", o.setupStuff(), o.showOpenerPlayPauseButton_bl && o.setupPlayPauseButton(), o.playerIsShowed_bl && o.showCloseButton(), o.showOpenerPlayPauseButton_bl ? o.setWidth(o.totalWidth + o.openerPauseN_img.width + 1) : o.setWidth(o.totalWidth), o.setHeight(o.totalHeight)
            }, this.setupStuff = function(e) {
                o.mainHld = new FWDUVPDisplayObject("div"), o.mainHld.hasTransform3d_bl = !1, o.mainHld.hasTransform2d_bl = !1, o.mainHld.setBackfaceVisibility(), o.showOpenerPlayPauseButton_bl ? o.mainHld.setWidth(o.totalWidth + o.openerPauseN_img.width + 1) : o.mainHld.setWidth(o.totalWidth), o.mainHld.setHeight(o.totalHeight), o.useHEX ? (o.openN_do = new FWDUVPDisplayObject("div"), o.openN_canvas = FWDUVPUtils.getCanvasWithModifiedColor(o.openN_img, o.nBC).canvas, o.openN_do.screen.appendChild(o.openN_canvas)) : (o.openN_do = new FWDUVPDisplayObject("img"), o.openN_do.setScreen(o.openN_img)), o.openN_do.setWidth(o.openN_img.width), o.openN_do.setHeight(o.openN_img.height), o.openS_img = new Image, o.openS_img.src = o.openSPath_str, o.useHEX ? (o.openS_do = new FWDUVPDisplayObject("div"), o.openS_img.onload = function() {
                    o.openS_canvas = FWDUVPUtils.getCanvasWithModifiedColor(o.openS_img, o.sBC).canvas, o.openS_do.setWidth(o.openS_img.width), o.openS_do.setHeight(o.openS_img.height), o.openS_do.screen.appendChild(o.openS_canvas)
                }) : (o.openS_do = new FWDUVPDisplayObject("img"), o.openS_do.setScreen(o.openS_img)), o.openS_do.setWidth(o.openN_do.w), o.openS_do.setHeight(o.openN_do.h), o.openS_do.setAlpha(0), o.useHEX ? (o.closeN_do = new FWDUVPDisplayObject("div"), o.closeN_canvas = FWDUVPUtils.getCanvasWithModifiedColor(o.closeN_img, o.nBC).canvas, o.closeN_do.screen.appendChild(o.closeN_canvas)) : (o.closeN_do = new FWDUVPDisplayObject("img"), o.closeN_do.setScreen(o.closeN_img)), o.closeN_do.setWidth(o.closeN_img.width), o.closeN_do.setHeight(o.closeN_img.height), o.closeN_do.hasTransform3d_bl = !1, o.closeN_do.hasTransform2d_bl = !1, o.closeN_do.setBackfaceVisibility(), o.closeS_img = new Image, o.closeS_img.src = o.closeSPath_str, o.useHEX ? (o.closeS_do = new FWDUVPDisplayObject("div"), o.closeS_img.onload = function() {
                    o.closeS_canvas = FWDUVPUtils.getCanvasWithModifiedColor(o.closeS_img, o.sBC).canvas, o.closeS_do.setWidth(o.closeN_img.width), o.closeS_do.setHeight(o.closeN_img.height), o.closeS_do.screen.appendChild(o.closeS_canvas)
                }) : (o.closeS_do = new FWDUVPDisplayObject("img"), o.closeS_do.setScreen(o.closeS_img)), o.closeS_do.setWidth(o.closeN_img.width), o.closeS_do.setHeight(o.closeN_img.height), o.closeS_do.setAlpha(0), o.closeS_do.hasTransform3d_bl = !1, o.closeS_do.hasTransform2d_bl = !1, FWDUVPPreloader2.setPrototype(), o.animation_do = new FWDUVPPreloader2(o.animationPath_img, 29, 22, 31, 80, !0), o.animation_do.setY(o.openerEqulizerOffsetTop), o.animation_do.show(!1), o.animation_do.stop(), o.dumy_do = new FWDUVPDisplayObject("div"), o.dumy_do.setWidth(o.totalWidth), o.dumy_do.setHeight(o.totalHeight), o.dumy_do.getStyle().zIndex = 2, o.dumy_do.hasTransform3d_bl = !1, o.dumy_do.hasTransform2d_bl = !1, o.dumy_do.setBackfaceVisibility(), o.dumy_do.setButtonMode(!0), (FWDUVPUtils.isIE || FWDUVPUtils.isAndroid) && (o.dumy_do.setBkColor("#FF0000"), o.dumy_do.setAlpha(.01)), o.hasPointerEvent_bl ? (o.mainHld.screen.addEventListener("pointerup", o.onMouseUp), o.mainHld.screen.addEventListener("pointerover", o.onMouseOver), o.mainHld.screen.addEventListener("pointerout", o.onMouseOut)) : o.screen.addEventListener && (o.isMbl || (o.mainHld.screen.addEventListener("mouseover", o.onMouseOver), o.mainHld.screen.addEventListener("mouseout", o.onMouseOut), o.mainHld.screen.addEventListener("mouseup", o.onMouseUp)), o.screen.addEventListener("touchend", o.onMouseUp)), o.mainHld.addChild(o.openN_do), o.mainHld.addChild(o.openS_do), o.mainHld.addChild(o.closeN_do), o.mainHld.addChild(o.closeS_do), o.mainHld.addChild(o.animation_do), o.mainHld.addChild(o.dumy_do), o.addChild(o.mainHld)
            }, o.showOpener = function(e) {}, this.onMouseOver = function(e, t) {
                e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || o.setSelectedState()
            }, this.onMouseOut = function(e) {
                e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType || o.setNormalState()
            }, this.onMouseUp = function(e) {
                e.preventDefault && e.preventDefault(), o.playerIsShowed_bl ? (o.playerIsShowed_bl = !1, o.dispatchEvent(i.HIDE)) : (o.playerIsShowed_bl = !0, o.dispatchEvent(i.SHOW))
            }, this.setupPlayPauseButton = function() {
                FWDUVPComplexButton.setPrototype(), o.playPauseButton_do = new FWDUVPComplexButton(o.openerPlayN_img, o.openerPlaySPath_str, o.openerPauseN_img, o.openerPauseS_str, !0, o.useHEX, o.nBC, o.sBC), o.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, o.playButtonMouseUpHandler), o.addChild(o.playPauseButton_do)
            }, this.showPlayButton = function() {
                o.playPauseButton_do && o.playPauseButton_do.setButtonState(1), o.animation_do.stop()
            }, this.showPauseButton = function() {
                o.playPauseButton_do && o.playPauseButton_do.setButtonState(0), o.animation_do.start(0)
            }, this.playButtonMouseUpHandler = function() {
                0 == o.playPauseButton_do.currentState ? o.dispatchEvent(FWDUVPController.PAUSE) : o.dispatchEvent(FWDUVPController.PLAY)
            }, this.setNormalState = function() {
                o.isMbl && !o.hasPointerEvent_bl || (FWDAnimation.killTweensOf(o.openS_do), FWDAnimation.killTweensOf(o.closeS_do), FWDAnimation.to(o.openS_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(o.closeS_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }))
            }, this.setSelectedState = function(e) {
                FWDAnimation.killTweensOf(o.openS_do), FWDAnimation.killTweensOf(o.closeS_do), FWDAnimation.to(o.openS_do, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(o.closeS_do, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            }, this.showOpenButton = function() {
                o.playerIsShowed_bl = !1, o.closeN_do.setX(150), o.closeS_do.setX(150), o.playPauseButton_do ? "right" == o.alignment_str ? (o.playPauseButton_do.setX(0), o.openN_do.setX(o.playPauseButton_do.w + 1), o.openS_do.setX(o.playPauseButton_do.w + 1), o.dumy_do.setX(o.playPauseButton_do.w + 1), o.dumy_do.setWidth(o.totalWidth), o.animation_do.setX(o.playPauseButton_do.w + 1 + o.openerEqulizerOffsetLeft)) : (o.playPauseButton_do.setX(o.openN_do.w + 1), o.openN_do.setX(0), o.openS_do.setX(0), o.dumy_do.setX(0), o.dumy_do.setWidth(o.totalWidth), o.animation_do.setX(o.openerEqulizerOffsetLeft)) : (o.openN_do.setX(0), o.openS_do.setX(0), o.dumy_do.setX(0), o.dumy_do.setWidth(o.totalWidth), o.animation_do.setX(o.openerEqulizerOffsetLeft)), o.animation_do.setVisible(!0)
            }, this.showCloseButton = function() {
                o.playerIsShowed_bl = !0, o.openN_do.setX(150), o.openS_do.setX(150), o.dumy_do.setWidth(o.closeN_do.w), "right" == o.alignment_str ? o.playPauseButton_do ? (o.closeN_do.setX(o.totalWidth + 1), o.closeS_do.setX(o.totalWidth + 1), o.dumy_do.setX(o.totalWidth + 1)) : (o.closeN_do.setX(o.totalWidth - o.closeN_do.w), o.closeS_do.setX(o.totalWidth - o.closeN_do.w), o.dumy_do.setX(o.totalWidth - o.closeN_do.w)) : (o.closeN_do.setX(0), o.closeS_do.setX(0), o.dumy_do.setX(0)), o.playPauseButton_do && o.playPauseButton_do.setX(150), o.animation_do.setX(150), o.animation_do.setVisible(!1)
            }, this.hide = function() {
                o.mainHld.setX(150)
            }, this.show = function() {
                o.mainHld.setX(0)
            }, o.updateHEXColors = function(e, t) {
                o.nBC = e, o.sBC = t, o.playPauseButton_do.updateHEXColors(e, t), FWDUVPUtils.changeCanvasHEXColor(o.openN_img, o.openN_canvas, e), FWDUVPUtils.changeCanvasHEXColor(o.closeN_img, o.closeN_canvas, e), FWDUVPUtils.changeCanvasHEXColor(o.openS_img, o.openS_canvas, t), FWDUVPUtils.changeCanvasHEXColor(o.closeS_img, o.closeS_canvas, t)
            }, this.init()
        };
        i.setPrototype = function() {
            i.prototype = new FWDUVPDisplayObject("div")
        }, i.SHOW = "show", i.HIDE = "hise", i.PLAY = "play", i.PAUSE = "pause", i.prototype = null, window.FWDUVPOpener = i
    }(window),
    function(e) {
        var t = function(e, o) {
            var i = this;
            t.prototype;
            this.adHolder_do = null, this.mainHld = null, this.clsBtn = null, this.buttons_ar = [], this.maxWidth = e.aopwWidth, this.maxHeight = e.aopwHeight + e.popwColseN_img.height + 1, this.sW = 0, this.sH = 0, this.aopwSource = e.aopwSource, this.aopwTitle = e.aopwTitle, this.aopwTitleColor_str = e.aopwTitleColor_str, this.aopwBorderSize = e.aopwBorderSize, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                i.setBackfaceVisibility(), i.mainBar_do = new FWDUVPDisplayObject("div"), i.bar_do = new FWDUVPDisplayObject("div"), i.bar_do.getStyle().background = "url('" + e.popwBarBackgroundPath_str + "')", i.adHolder_do = new FWDUVPDisplayObject("div"), i.adBk_do = new FWDUVPDisplayObject("div"), i.adBk_do.getStyle().background = "url('" + e.popwWindowBackgroundPath_str + "')", FWDUVPSimpleButton.setPrototype(), i.clsBtn = new FWDUVPSimpleButton(e.popwColseN_img, e.popwColseSPath_str, void 0, !0, e.useHEX, e.nBC, e.sBC, !1, !1, !1, !1, !0), i.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, i.closeButtonOnMouseUpHandler), i.title_do = new FWDUVPDisplayObject("div"), i.title_do.getStyle().width = "100%", i.title_do.getStyle().textAlign = "left", i.title_do.getStyle().fontFamily = "Arial", i.title_do.getStyle().fontSize = "14px", i.title_do.getStyle().fontWeight = "100", i.title_do.getStyle().color = i.aopwTitleColor_str, i.title_do.setInnerHTML(i.aopwTitle), i.bar_do.addChild(i.title_do), i.addChild(i.adBk_do), i.mainBar_do.addChild(i.bar_do), i.mainBar_do.addChild(i.clsBtn), i.mainBar_do.setHeight(i.clsBtn.h), i.addChild(i.mainBar_do), i.addChild(i.adHolder_do), i.bar_do.setHeight(i.mainBar_do.h)
            }, this.closeButtonOnMouseUpHandler = function() {
                i.isShowed_bl && (i.hide(), o.play())
            }, this.positionAndResize = function() {
                i.sW = Math.min(o.tempVidStageWidth, i.maxWidth), i.sH = Math.min(o.tempVidStageHeight, i.maxHeight);
                var e = 1,
                    t = o.tempVidStageWidth / i.maxWidth,
                    s = o.tempVidStageHeight / i.maxHeight;
                t < s ? e = t : s < t && (e = s), 1 < e && (e = 1), i.sW = e * i.maxWidth, i.sH = e * i.maxHeight, i.setWidth(i.sW), i.setHeight(i.sH), i.setHeight(i.sH), i.setX(Math.round((o.tempVidStageWidth - i.sW) / 2)), i.setY(Math.round((o.tempVidStageHeight - i.sH) / 2)), i.mainBar_do.setWidth(i.sW), i.clsBtn.setX(i.sW - i.clsBtn.w), i.bar_do.setWidth(i.sW - i.clsBtn.w - 1), i.adBk_do.setWidth(i.sW), i.adBk_do.setHeight(i.sH - i.mainBar_do.h - 1), i.adBk_do.setY(i.mainBar_do.h + 1), i.adHolder_do.setWidth(i.sW - 2 * i.aopwBorderSize), i.adHolder_do.setX(i.aopwBorderSize), i.adHolder_do.setY(i.mainBar_do.h + i.aopwBorderSize + 1), i.adHolder_do.setHeight(i.sH - i.mainBar_do.h - 2 * i.aopwBorderSize - 1)
            }, this.show = function(e) {
                i.isShowed_bl || (i.isShowed_bl = !0, e && (i.aopwSource = e), o.main_do.addChild(i), i.adHolder_do.setInnerHTML("<iframe width='100%' height='100%' scrolling='no' frameBorder='0' src=" + i.aopwSource + "></iframe>"), i.positionAndResize(), i.title_do.setX(8), i.title_do.setY(Math.round((i.bar_do.h - i.title_do.getHeight()) / 2)))
            }, this.showCompleteHandler = function() {}, this.hide = function() {
                i.isShowed_bl && (i.isShowed_bl = !1, o.main_do.contains(i) && o.main_do.removeChild(i))
            }, this.hideCompleteHandler = function() {
                o.main_do.removeChild(i), i.dispatchEvent(t.HIDE_COMPLETE)
            }, this.updateHEXColors = function(e, t) {
                i.clsBtn.updateHEXColors(e, t)
            }, this.init()
        };
        t.setPrototype = function() {
            t.prototype = new FWDUVPDisplayObject("div")
        }, t.HIDE_COMPLETE = "hideComplete", t.prototype = null, e.FWDUVPOPWindow = t
    }(window),
    function(e) {
        var s = function(e, t) {
            var o = this;
            s.prototype;
            this.xhr = null, this.passColoseN_img = e.passColoseN_img, this.privateVideoPassword_str = e.privateVideoPassword_str, this.bk_do = null, this.mainHld = null, this.passMainHolder_do = null, this.passMainHldBk = null, this.passMainLbl = null, this.passLbl = null, this.passInpt = null, this.clsBtn = null, this.embedWindowBackground_str = e.embedWindowBackground_str, this.secondaryLabelsColor_str = e.secondaryLabelsColor_str, this.inputColor_str = e.inputColor_str, this.mainLabelsColor_str = e.mainLabelsColor_str, this.passButtonNPath_str = e.passButtonNPath_str, this.passButtonSPath_str = e.passButtonSPath_str, this.inputBackgroundColor_str = e.inputBackgroundColor_str, this.borderColor_str = e.borderColor_str, this.maxTextWidth = 0, this.totalWidth = 0, this.sW = 0, this.sH = 0, this.buttonWidth = 28, this.buttonHeight = 19, this.embedWindowCloseButtonMargins = e.embedWindowCloseButtonMargins, this.finalEmbedPath_str = null, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                o.setBackfaceVisibility(), o.mainHld = new FWDUVPDisplayObject("div"), o.mainHld.hasTransform3d_bl = !1, o.mainHld.hasTransform2d_bl = !1, o.mainHld.setBackfaceVisibility(), o.bk_do = new FWDUVPDisplayObject("div"), o.bk_do.getStyle().width = "100%", o.bk_do.getStyle().height = "100%", o.bk_do.setAlpha(.9), o.bk_do.getStyle().background = "url('" + o.embedWindowBackground_str + "')", o.passMainHolder_do = new FWDUVPDisplayObject("div"), o.passMainHldBk = new FWDUVPDisplayObject("div"), o.passMainHldBk.getStyle().background = "url('" + o.embedWindowBackground_str + "')", o.passMainHldBk.getStyle().borderStyle = "solid", o.passMainHldBk.getStyle().borderWidth = "1px", o.passMainHldBk.getStyle().borderColor = o.borderColor_str, o.passMainLbl = new FWDUVPDisplayObject("div"), o.passMainLbl.screen.className = "UVP-main-label", o.passMainLbl.setBackfaceVisibility(), o.passMainLbl.getStyle().fontFamily = "Arial", o.passMainLbl.getStyle().fontSize = "12px", o.passMainLbl.getStyle().color = o.mainLabelsColor_str, o.passMainLbl.getStyle().whiteSpace = "nowrap", o.passMainLbl.getStyle().fontSmoothing = "antialiased", o.passMainLbl.getStyle().webkitFontSmoothing = "antialiased", o.passMainLbl.getStyle().textRendering = "optimizeLegibility", o.passMainLbl.getStyle().padding = "0px", o.passMainLbl.setInnerHTML("PRIVATE VIDEO"), o.passLbl = new FWDUVPDisplayObject("div"), o.passLbl.screen.className = "UVP-secnd-label", o.passLbl.setBackfaceVisibility(), o.passLbl.getStyle().fontFamily = "Arial", o.passLbl.getStyle().fontSize = "12px", o.passLbl.getStyle().color = o.secondaryLabelsColor_str, o.passLbl.getStyle().whiteSpace = "nowrap", o.passLbl.getStyle().fontSmoothing = "antialiased", o.passLbl.getStyle().webkitFontSmoothing = "antialiased", o.passLbl.getStyle().textRendering = "optimizeLegibility", o.passLbl.getStyle().padding = "0px", o.passLbl.setInnerHTML("Please enter password:"), o.passInpt = new FWDUVPDisplayObject("input"), o.passInpt.screen.className = "UVP-embed-inpt", o.passInpt.setBackfaceVisibility(), o.passInpt.getStyle().fontFamily = "Arial", o.passInpt.getStyle().fontSize = "12px", o.passInpt.getStyle().backgroundColor = o.inputBackgroundColor_str, o.passInpt.getStyle().color = o.inputColor_str, o.passInpt.getStyle().outline = 0, o.passInpt.getStyle().whiteSpace = "nowrap", o.passInpt.getStyle().fontSmoothing = "antialiased", o.passInpt.getStyle().webkitFontSmoothing = "antialiased", o.passInpt.getStyle().textRendering = "optimizeLegibility", o.passInpt.getStyle().padding = "6px", o.passInpt.getStyle().paddingTop = "4px", o.passInpt.getStyle().paddingBottom = "4px", o.passInpt.screen.setAttribute("type", "password"), FWDUVPSimpleSizeButton.setPrototype(), o.passBtn = new FWDUVPSimpleSizeButton(o.passButtonNPath_str, o.passButtonSPath_str, o.buttonWidth, o.buttonHeight, e.useHEX, e.nBC, e.sBC, !0), o.passBtn.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, o.passClickHandler), o.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), o.clsBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button icon-close'></span></div>", void 0, "UVPCloseButtonNormalState", "UVPCloseButtonSelectedState")) : (FWDUVPSimpleButton.setPrototype(), o.clsBtn = new FWDUVPSimpleButton(o.passColoseN_img, e.embedWindowClosePathS_str, void 0, !0, e.useHEX, e.nBC, e.sBC, !1, !1, !1, !1, !0)), o.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, o.closeButtonOnMouseUpHandler), o.addChild(o.mainHld), o.mainHld.addChild(o.bk_do), o.passMainHolder_do.addChild(o.passMainHldBk), o.passMainHolder_do.addChild(o.passMainLbl), o.passMainHolder_do.addChild(o.passLbl), o.passMainHolder_do.addChild(o.passInpt), o.passMainHolder_do.addChild(o.passBtn), o.mainHld.addChild(o.passMainHolder_do), o.mainHld.addChild(o.clsBtn)
            }, this.closeButtonOnMouseUpHandler = function() {
                o.isShowed_bl && o.hide()
            }, this.positionAndResize = function() {
                o.sW = t.sW, o.sH = t.sH, o.maxTextWidth = Math.min(o.sW - 150, 300), o.totalWidth = o.maxTextWidth + o.buttonWidth, o.positionFinal(), o.clsBtn.setX(o.sW - o.clsBtn.w - o.embedWindowCloseButtonMargins), o.clsBtn.setY(o.embedWindowCloseButtonMargins), o.setWidth(o.sW), o.setHeight(o.sH), o.mainHld.setWidth(o.sW), o.mainHld.setHeight(o.sH)
            }, this.positionFinal = function() {
                var e, t, s = o.passLbl.getHeight();
                t = o.passMainLbl.getHeight(), o.passMainLbl.setX(16), o.passLbl.setX(16), o.passLbl.setY(t + 14), o.passInpt.setX(10), o.passInpt.setWidth(parseInt(o.totalWidth - 40 - o.buttonWidth)), o.passInpt.setY(o.passLbl.y + s + 5), o.passBtn.setX(10 + o.passInpt.w + 20), o.passBtn.setY(o.passLbl.y + s + 6), o.passMainHldBk.setY(o.passLbl.y - 9), o.passMainHldBk.setWidth(o.totalWidth - 2), o.passMainHldBk.setHeight(o.passBtn.y + o.passBtn.h - 9), o.passMainHolder_do.setWidth(o.totalWidth), o.passMainHolder_do.setHeight(o.passBtn.y + o.passBtn.h + 14), o.passMainHolder_do.setX(Math.round((o.sW - o.totalWidth) / 2)), e = o.passMainHldBk.getHeight(), o.passMainHolder_do.setY(Math.round((o.sH - e) / 2) - 10)
            }, this.passClickHandler = function() {
                o.privateVideoPassword_str = e.privateVideoPassword_str, t.playlistPass && (o.privateVideoPassword_str = e.playlistPass), e.playlist_ar[t.id].privateVideoPassword_str && (o.privateVideoPassword_str = e.playlist_ar[t.id].privateVideoPassword_str), o.privateVideoPassword_str == FWDUVPUtils.MD5(o.passInpt.screen.value) ? (t.playlistPass = void 0, s.isCorect = !0, o.dispatchEvent(s.CORRECT)) : FWDAnimation.isTweening(o.passInpt.screen) || FWDAnimation.to(o.passInpt.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: !0,
                    repeat: 3
                })
            }, this.updateHEXColors = function(e, t) {
                o.passBtn.updateHEXColors(e, t), o.clsBtn.updateHEXColors(e, t)
            }, this.showInfo = function(e, t) {
                o.infoText_do.setInnerHTML(e), o.passMainHolder_do.addChild(o.infoText_do), o.infoText_do.setWidth(o.buttonWidth), o.infoText_do.setHeight(o.buttonHeight - 4), o.infoText_do.setX(o.passBtn.x), o.infoText_do.setY(o.passBtn.y - 23), o.infoText_do.setAlpha(0), o.infoText_do.getStyle().color = t ? "#FF0000" : o.mainLabelsColor_str, FWDAnimation.killTweensOf(o.infoText_do), FWDAnimation.to(o.infoText_do, .16, {
                    alpha: 1,
                    yoyo: !0,
                    repeat: 7
                })
            }, this.show = function(e) {
                o.isShowed_bl || (s.isCorect = !1, o.isShowed_bl = !0, t.main_do.addChild(o), o.passInpt.setInnerHTML(""), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && t.main_do.setSelectable(!0), o.positionAndResize(), clearTimeout(o.hideCompleteId_to), clearTimeout(o.showCompleteId_to), o.mainHld.setY(-o.sH), o.showCompleteId_to = setTimeout(o.showCompleteHandler, 900), setTimeout(function() {
                    FWDAnimation.to(o.mainHld, .8, {
                        y: 0,
                        delay: .1,
                        ease: Expo.easeInOut
                    })
                }, 100))
            }, this.showCompleteHandler = function() {}, this.hide = function() {
                o.isShowed_bl && (o.isShowed_bl = !1, t.customContextMenu_do && t.customContextMenu_do.enable(), o.positionAndResize(), clearTimeout(o.hideCompleteId_to), clearTimeout(o.showCompleteId_to), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && t.main_do.setSelectable(!1), o.hideCompleteId_to = setTimeout(o.hideCompleteHandler, 800), FWDAnimation.killTweensOf(o.mainHld), FWDAnimation.to(o.mainHld, .8, {
                    y: -o.sH,
                    ease: Expo.easeInOut
                }))
            }, this.hideCompleteHandler = function() {
                t.main_do.removeChild(o), o.dispatchEvent(s.HIDE_COMPLETE)
            }, this.init()
        };
        s.setPrototype = function() {
            s.prototype = new FWDUVPDisplayObject("div")
        }, s.ERROR = "error", s.CORRECT = "correct", s.HIDE_COMPLETE = "hideComplete", s.prototype = null, e.FWDUVPPassword = s
    }(window),
    function(n) {
        var t = function(i, l) {
            var a = this;
            t.prototype;
            this.moveEvent = null, this.prt = i, this.data = l, this.image_img = null, this.prevN_img = l.prevN_img, this.nextN_img = l.nextN_img, this.replayN_img = l.replayN_img, this.shuffleN_img = l.shuffleN_img, this.scrBkTop_img = l.scrBkTop_img, this.scrDragTop_img = l.scrDragTop_img, this.scrLinesN_img = l.scrLinesN_img, this.playlist_ar = null, this.buttons_ar = [], this.thumbs_ar = null, this.playlistNameHolder_do = null, this.playlistName_do = null, this.scrMainHolder_do = null, this.scrTrack_do = null, this.scrTrackTop_do = null, this.scrTrackMiddle_do = null, this.scrTrackBottom_do = null, this.scrHandler_do = null, this.scrHandlerTop_do = null, this.scrHandlerMiddle_do = null, this.scrHandlerBottom_do = null, this.scrHandlerLines_do = null, this.scrHandlerLinesN_do = null, this.scrHandlerLinesS_do = null, this.mainHld = null, this.mainThumbsHolder_do = null, this.controllBar_do = null, this.input_do = null, this.inputArrow_do = null, this.bk_do = null, this.thumbsHolder_do = null, this.nextButton_do = null, this.prevButton_do = null, this.toolTip_do = null, this.shuffleButton_do = null, this.loopButton_do = null, this.prevButtonToolTip_do = null, this.loopButtonToolTip_do = null, this.shuffleButtonToolTip_do = null, this.nextButtonToolTip_do = null, this.noSearchFound_do = null, a.useHEX = l.useHEX, a.nBC = l.nBC, a.sBC = l.sBC, this.bkPath_str = l.controllerBkPath_str, this.position_str = i.playlistPosition_str, this.playlistBackgroundColor_str = l.playlistBackgroundColor_str, this.inputBackgroundColor_str = l.searchInputBackgroundColor_str, this.inputColor_str = l.searchInputColor_str, this.prevInputValue_str = "none", this.scrWidth = a.scrBkTop_img.width, this.mouseX = 0, this.mouseY = 0, this.catId = -1, this.dif = 0, this.countLoadedThumbs = 0, this.curId = -1, this.finalX = 0, this.finalY = 0, this.controlBarHeight = l.controllerHeight, this.totalThumbs = 0, this.totalWidth = i.playlistWidth, this.totalHeight = i.playlistHeight, this.thumbImageW = l.thumbnailWidth, this.thumbImageH = l.thumbnailHeight, this.thumbInPadding = 3, this.spaceBetweenThumbnails = l.spaceBetweenThumbnails, this.startSpaceBetweenButtons = l.startSpaceBetweenButtons, this.spaceBetweenButtons = l.spaceBetweenButtons, this.totalButtons = 0, this.buttonsToolTipHideDelay = l.buttonsToolTipHideDelay, this.removeFromThumbsHolderHeight = 0, this.totalThumbsHeight = 0, this.scrollBarHandlerFinalY = 0, this.sW = a.totalWidth, this.sH = a.totalHeight, this.scrollbarOffestWidth = l.scrollbarOffestWidth, this.lastThumbnailFinalY = -1, this.thumbnailsFinalY = 0, this.scollbarSpeedSensitivity = l.scollbarSpeedSensitivity, this.vy = 0, this.vy2 = 0, this.friction = .9, this.loadWithDelayId_to, this.showToolTipId_to, this.disableThumbsId_to, this.disableMouseWheelId_to, this.thumbnailsAnimDoneId_to, this.disableForAWhileAfterThumbClickId_to, this.updateMobileScrollBarId_int, this.showThumbnail_bl = l.showThumbnail_bl, this.disableForAWhileAfterThumbClick_bl = !1, this.showPlaylistName_bl = l.showPlaylistName_bl, this.isShowNothingFound_bl = !1, this.hasInputFocus_bl = !1, this.showController_bl = l.showSearchInpt || l.showNextAndPrevButtons_bl || l.showLoopButton_bl || l.showShuffleButton_bl, this.loop_bl = l.loop_bl, this.shuffle_bl = l.shuffle_bl, this.showSearchInpt = l.showSearchInpt, this.allowToScrollAndScrollBarIsActive_bl = !0, this.showPlaylistToolTips_bl = l.showPlaylistToolTips_bl, this.hasPlaylist_bl = !1, this.showPlaylistByDefault_bl = l.showPlaylistByDefault_bl, this.repeatBackground_bl = l.repeatBackground_bl, this.addMouseWheelSupport_bl = l.addMouseWheelSupport_bl, this.showNextAndPrevButtons_bl = l.showNextAndPrevButtons_bl, this.showShuffleButton_bl = l.showShuffleButton_bl, this.showLoopButton_bl = l.showLoopButton_bl, this.showButtonsToolTip_bl = l.showButtonsToolTip_bl, this.isShowed_bl = !0, this.allowToSwipe_bl = !1, this.disableThumbs_bl = !1, this.disableMouseWheel_bl = !1, this.usePlaylistsSelectBox_bl = l.usePlaylistsSelectBox_bl, this.isMbl = FWDUVPUtils.isMobile, this.isDragging_bl = !1, this.isSearched_bl = !1, this.addScrOnMM_bl = l.addScrOnMM_bl, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.useVectorIcons_bl = l.useVectorIcons_bl, this.init = function() {
                if (a.setOverflow("hidden"), a.screen.className = "fwduvp-playlist", a.mainHld = new FWDUVPDisplayObject("div"), a.mainHld.screen.className = "fwduvp-playlist-background", l.isWhite && (a.mainHld.screen.className = "fwduvp-playlist-background white"), a.mainHld.setBkColor(a.playlistBackgroundColor_str), a.mainThumbsHolder_do = new FWDUVPDisplayObject("div"), a.mainThumbsHolder_do.screen.className = "fwduvp-playlist-thumbs-holder", a.mainThumbsHolder_do.setBkColor(a.playlistBackgroundColor_str), a.thumbsHolder_do = new FWDUVPDisplayObject("div"), a.thumbsHolder_do.setOverflow("visible"), a.mainThumbsHolder_do.addChild(a.thumbsHolder_do), a.mainHld.addChild(a.mainThumbsHolder_do), a.addChild(a.mainHld), a.showController_bl) {
                    if (a.controllBar_do = new FWDUVPDisplayObject("div"), a.repeatBackground_bl) a.controllerBk_do = new FWDUVPDisplayObject("div"), a.controllerBk_do.getStyle().background = "url('" + a.bkPath_str + "')";
                    else {
                        a.controllerBk_do = new FWDUVPDisplayObject("img");
                        var e = new Image;
                        e.src = a.bkPath_str, a.controllerBk_do.setScreen(e)
                    }
                    a.controllerBk_do.setHeight(a.controlBarHeight), a.controllerBk_do.getStyle().width = "100%", a.controllBar_do.addChild(a.controllerBk_do), a.controllBar_do.setHeight(a.controlBarHeight), a.mainHld.addChild(a.controllBar_do)
                }
                a.showShuffleButton_bl && a.setupShuffleButton(), a.showLoopButton_bl && a.setupLoopButton(), a.showNextAndPrevButtons_bl && (a.setupPrevButton(), a.setupNextButton()), a.showButtonsToolTip_bl && a.setupToolTips(), a.totalButtons = a.buttons_ar.length, a.showSearchInpt && a.showController_bl && a.setupInput(), a.showController_bl && (a.removeFromThumbsHolderHeight = a.controllBar_do.h + a.spaceBetweenThumbnails), a.setupMobileScrollbar(), a.isMbl || a.setupScrollbar(), a.addMouseWheelSupport_bl && a.addMouseWheelSupport(), a.showPlaylistName_bl && (a.setupPlaylistName(), a.removeFromThumbsHolderHeight += a.controlBarHeight + a.spaceBetweenThumbnails, a.mainThumbsHolder_do.setY(a.controlBarHeight + a.spaceBetweenThumbnails), a.scrMainHolder_do && a.scrMainHolder_do.setY(a.mainThumbsHolder_do.y));
                var t = i.ec;
                t && (this.ec = new FWDUVPDisplayObject("div", "relative"), this.ec.setInnerHTML(t.innerHTML), this.addChild(this.ec)), a.showPlaylistByDefault_bl || a.hide()
            }, this.resizeAndPosition = function(e) {
                if (i.sW) {
                    var t = 0;
                    a.ec && (t = Math.round(a.ec.getHeight()), a.ec.setY(-t)), "bottom" == a.position_str ? (a.sW = i.sW, a.sH = i.playlistHeight, a.finalX = 0, a.finalY = i.tempVidStageHeight + i.spaceBetweenControllerAndPlaylist) : (a.sW = a.totalWidth, a.sH = i.sH - t, a.finalX = i.sW - a.totalWidth, a.finalY = 0), a.comboBox_do && a.comboBox_do.resizeAndPosition(), a.bk_do && (a.bk_do.setWidth(a.sW), a.bk_do.setHeight(a.sH)), a.positionThumbs(e), a.allowToScrollAndScrollBarIsActive_bl && a.scrMainHolder_do ? a.mainThumbsHolder_do.setWidth(a.sW - a.scrollbarOffestWidth + 1) : a.mainThumbsHolder_do.setWidth(a.sW), a.mainThumbsHolder_do.setHeight(a.sH - a.removeFromThumbsHolderHeight), a.scrHandler_do && a.updateScrollBarSizeActiveAndDeactivate(), a.controllBar_do && a.positionControllBar(), a.updateScrollBarHandlerAndContent(e), a.setWidth(a.sW), a.setHeight(a.sH + t), a.setX(a.finalX), a.setY(a.finalY + t), a.mainHld.setWidth(a.sW), a.mainHld.setHeight(a.sH)
                }
            }, this.updatePlaylist = function(e, t, s, o) {
                clearTimeout(a.populateNextItemId_to), a.hasPlaylist_bl = !0, a.catId = t, a.curId = s, a.playlist_ar = e, a.countLoadedThumbs = 0, a.allowToScrollAndScrollBarIsActive_bl = !1, a.input_do && (a.hasInputFocus_bl = !1, a.input_do.screen.value = "search"), a.setupThumbnails(), a.updatePlaylistName(o), a.showThumbnail_bl && a.loadImages(), a.comboBox_do && a.comboBox_do.setButtonsStateBasedOnId(a.catId), a.hideAndShow(!0), a.resizeAndPosition(), a.scrHandler_do && (a.updateScrollBarSizeActiveAndDeactivate(), a.updateScrollBarHandlerAndContent(!1, !0))
            }, this.destroyPlaylist = function() {
                if (a.thumbs_ar) {
                    var e;
                    a.hasPlaylist_bl = !1, a.image_img && (a.image_img.onerror = null, a.image_img.onload = null), FWDAnimation.killTweensOf(a.mainHld), "bottom" == a.position_str ? a.mainHld.setY(-a.sH - 5) : a.mainHld.setX(-a.sW - 5), a.ec && a.ec.setX(-5e3), clearTimeout(a.loadWithDelayId_to);
                    for (var t = 0; t < a.totalThumbs; t++) e = a.thumbs_ar[t], a.thumbsHolder_do.removeChild(e), e.destroy();
                    a.thumbs_ar = null
                }
            }, this.setupcomboBox = function() {
                a.labels_ar = [];
                for (var e = 0; e < l.cats_ar.length; e++) a.labels_ar[e] = l.cats_ar[e].playlistName;
                var t = {
                    categories_ar: a.labels_ar,
                    selectorLabel: a.labels_ar[0],
                    selectorBackgroundNormalColor: l.mainSelectorBackgroundSelectedColor,
                    selectorTextNormalColor: l.mainSelectorTextNormalColor,
                    selectorTextSelectedColor: l.mainSelectorTextSelectedColor,
                    buttonBackgroundNormalColor: l.mainButtonBackgroundNormalColor,
                    buttonBackgroundSelectedColor: l.mainButtonBackgroundSelectedColor,
                    buttonTextNormalColor: l.mainButtonTextNormalColor,
                    buttonTextSelectedColor: l.mainButtonTextSelectedColor,
                    buttonHeight: a.controlBarHeight,
                    arrowN_str: l.arrowN_str,
                    arrowS_str: l.arrowS_str,
                    arrowW: 11,
                    arrowH: 6
                };
                FWDUVPComboBox.setPrototype(), a.comboBox_do = new FWDUVPComboBox(a, t), a.comboBox_do.addListener(FWDUVPComboBox.BUTTON_PRESSED, a.changePlaylistOnClick), a.mainHld.addChild(a.comboBox_do)
            }, a.changePlaylistOnClick = function(e) {
                a.dispatchEvent(t.CHANGE_PLAYLIST, {
                    id: e.id
                })
            }, this.setupPlaylistName = function() {
                if (a.playlistNameHolder_do = new FWDUVPDisplayObject("div"), a.playlistNameHolder_do.setHeight(a.controlBarHeight), a.playlistNameHolder_do.getStyle().width = "100%", a.repeatBackground_bl) a.playlistNameBk_do = new FWDUVPDisplayObject("div"), a.playlistNameBk_do.getStyle().background = "url('" + a.bkPath_str + "')";
                else {
                    a.playlistNameBk_do = new FWDUVPDisplayObject("img");
                    var e = new Image;
                    e.src = a.bkPath_str, a.playlistNameBk_do.setScreen(e)
                }
                a.playlistNameBk_do.getStyle().width = "100%", a.playlistNameBk_do.getStyle().height = "100%", a.playlistName_do = new FWDUVPDisplayObject("div"), a.playlistName_do.getStyle().width = "100%", a.playlistName_do.screen.className = "fwduvp-playlist-name", a.playlistName_do.getStyle().textAlign = "center", a.playlistName_do.getStyle().fontSmoothing = "antialiased", a.playlistName_do.getStyle().webkitFontSmoothing = "antialiased", a.playlistName_do.getStyle().textRendering = "optimizeLegibility", a.playlistName_do.getStyle().fontFamily = "Arial", a.playlistName_do.getStyle().fontSize = "14px", a.playlistName_do.getStyle().color = l.playlistNameColor_str, a.playlistNameHolder_do.addChild(a.playlistNameBk_do), a.usePlaylistsSelectBox_bl || a.playlistNameHolder_do.addChild(a.playlistName_do), a.mainHld.addChild(a.playlistNameHolder_do), a.usePlaylistsSelectBox_bl && (a.setupcomboBox(), a.controllBar_do && a.mainHld.addChild(a.controllBar_do))
            }, this.updatePlaylistName = function(e) {
                a.playlistName_do && (a.playlistName_do.setInnerHTML(e), setTimeout(function() {
                    a.playlistName_do.setY(parseInt((a.playlistNameHolder_do.h - a.playlistName_do.getHeight()) / 2) + 1)
                }, 50))
            }, this.setupInput = function() {
                a.input_do = new FWDUVPDisplayObject("input"), a.input_do.screen.maxLength = 20, a.input_do.screen.className = "fwduvp-search", a.input_do.getStyle().textAlign = "left", a.input_do.getStyle().outline = "none", a.input_do.getStyle().boxShadow = "none", a.input_do.getStyle().fontSmoothing = "antialiased", a.input_do.getStyle().webkitFontSmoothing = "antialiased", a.input_do.getStyle().textRendering = "optimizeLegibility", a.input_do.getStyle().fontFamily = "Arial", a.input_do.getStyle().fontSize = "12px", a.input_do.getStyle().padding = "7px 10px 7px", a.input_do.getStyle().boxSizing = "border-box", FWDUVPUtils.isIEAndLessThen9 || (a.input_do.getStyle().paddingRight = "-6px"), a.input_do.getStyle().backgroundColor = a.inputBackgroundColor_str, a.input_do.getStyle().color = a.inputColor_str, a.input_do.screen.value = "search", a.noSearchFound_do = new FWDUVPDisplayObject("div"), a.noSearchFound_do.setX(0), a.noSearchFound_do.screen.className = "fwduvp-search-not-found", a.noSearchFound_do.getStyle().textAlign = "center", a.noSearchFound_do.getStyle().width = "100%", a.noSearchFound_do.getStyle().fontSmoothing = "antialiased", a.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased", a.noSearchFound_do.getStyle().textRendering = "optimizeLegibility", a.noSearchFound_do.getStyle().fontFamily = "Arial", a.noSearchFound_do.getStyle().fontSize = "12px", a.noSearchFound_do.getStyle().color = a.inputColor_str, a.noSearchFound_do.setInnerHTML("NOTHING FOUND!"), a.noSearchFound_do.setVisible(!1), a.mainHld.addChild(a.noSearchFound_do), a.hasPointerEvent_bl ? a.input_do.screen.addEventListener("pointerdown", a.inputFocusInHandler) : a.input_do.screen.addEventListener && (a.input_do.screen.addEventListener("mousedown", a.inputFocusInHandler), a.input_do.screen.addEventListener("touchstart", a.inputFocusInHandler)), a.input_do.screen.addEventListener("keyup", a.keyUpHandler);
                var e = new Image;
                e.src = l.inputArrowPath_str, a.inputArrow_do = new FWDUVPDisplayObject("img"), a.inputArrow_do.setScreen(e), a.inputArrow_do.setWidth(12), a.inputArrow_do.setHeight(12), a.controllBar_do.addChild(a.input_do), a.controllBar_do.addChild(a.inputArrow_do)
            }, this.inputFocusInHandler = function() {
                a.hasInputFocus_bl || (a.hasInputFocus_bl = !0, "search" == a.input_do.screen.value && (a.input_do.screen.value = ""), a.input_do.screen.focus(), setTimeout(function() {
                    a.hasPointerEvent_bl ? n.addEventListener("pointerdown", a.inputFocusOutHandler) : n.addEventListener && (n.addEventListener("mousedown", a.inputFocusOutHandler), n.addEventListener("touchstart", a.inputFocusOutHandler)), FWDUVPlayer.isSearchedFocused_bl = !0
                }, 50))
            }, this.inputFocusOutHandler = function(e) {
                if (FWDUVPlayer.isSearchedFocused_bl = !1, a.hasInputFocus_bl) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    return FWDUVPUtils.hitTest(a.input_do.screen, t.screenX, t.screenY) ? void 0 : (a.hasInputFocus_bl = !1, void("" == a.input_do.screen.value && (a.input_do.screen.value = "search", a.hasPointerEvent_bl ? n.removeEventListener("pointerdown", a.inputFocusOutHandler) : n.removeEventListener && (n.removeEventListener("mousedown", a.inputFocusOutHandler), n.removeEventListener("touchstart", a.inputFocusOutHandler)))))
                }
            }, this.keyUpHandler = function(e) {
                e.stopPropagation && e.stopPropagation(), a.prevInputValue_str != a.input_do.screen.value && (a.isMbl ? (a.positionThumbs(!1), a.thumbnailsFinalY = -1 * Math.round(a.curId / (a.totalThumbs - 1) * (a.totalThumbsHeight - a.mainThumbsHolder_do.h))) : a.positionThumbs(!0)), a.prevInputValue_str = a.input_do.screen.value, a.scrHandler_do && (a.updateScrollBarSizeActiveAndDeactivate(), a.updateScrollBarHandlerAndContent(!0, !0))
            }, this.showNothingFound = function() {
                a.isShowNothingFound_bl || (a.isShowNothingFound_bl = !0, a.noSearchFound_do.setVisible(!0), a.noSearchFound_do.setY(parseInt((a.sH - a.noSearchFound_do.getHeight()) / 2)), a.noSearchFound_do.setAlpha(0), FWDAnimation.to(a.noSearchFound_do, .1, {
                    alpha: 1,
                    yoyo: !0,
                    repeat: 4
                }))
            }, this.hideNothingFound = function() {
                a.isShowNothingFound_bl && (a.isShowNothingFound_bl = !1, FWDAnimation.killTweensOf(a.noSearchFound_do), a.noSearchFound_do.setVisible(!1))
            }, this.positionControllBar = function() {
                var e, t, s;
                if (a.input_do && a.sW <= 340) {
                    e = a.sW - 2 * a.startSpaceBetweenButtons, a.nextButton_do && (e -= a.nextButton_do.w + a.spaceBetweenButtons), a.prevButton_do && (e -= a.prevButton_do.w + a.spaceBetweenButtons), a.shuffleButton_do && (e -= a.shuffleButton_do.w + a.spaceBetweenButtons), a.loopButton_do && (e -= a.loopButton_do.w + a.spaceBetweenButtons);
                    for (var o = 0; o < a.totalButtons; o++) t = a.buttons_ar[a.totalButtons - 1 - o], s = a.buttons_ar[a.totalButtons - o], 0 == o ? t.setX(a.sW - t.w - a.startSpaceBetweenButtons) : t.setX(s.x - s.w - a.spaceBetweenButtons), t.setY(parseInt((a.controllBar_do.h - t.h) / 2))
                } else if (a.input_do && 340 < a.sW) {
                    350 < (e = a.sW - 2 * a.startSpaceBetweenButtons + a.spaceBetweenButtons - 2) && (e = 350), a.nextButton_do && (e -= a.nextButton_do.w + a.spaceBetweenButtons), a.prevButton_do && (e -= a.prevButton_do.w + a.spaceBetweenButtons), a.shuffleButton_do && (e -= a.shuffleButton_do.w + a.spaceBetweenButtons), a.loopButton_do && (e -= a.loopButton_do.w + a.spaceBetweenButtons);
                    for (o = 0; o < a.totalButtons; o++) t = a.buttons_ar[a.totalButtons - 1 - o], s = a.buttons_ar[a.totalButtons - o], 0 == o ? t.setX(a.sW - t.w - a.startSpaceBetweenButtons) : t.setX(s.x - s.w - a.spaceBetweenButtons), t.setY(parseInt((a.controllBar_do.h - t.h) / 2))
                } else a.shuffleButton_do ? (a.shuffleButton_do.setX(a.spaceBetweenButtons), a.shuffleButton_do.setY(parseInt((a.controllBar_do.h - a.shuffleButton_do.h) / 2)), a.loopButton_do && (a.loopButton_do.setX(a.shuffleButton_do.x + a.shuffleButton_do.w + a.spaceBetweenButtons), a.loopButton_do.setY(parseInt((a.controllBar_do.h - a.shuffleButton_do.h) / 2)))) : a.loopButton_do && (a.loopButton_do.setX(a.spaceBetweenButtons), a.loopButton_do.setY(parseInt((a.controllBar_do.h - a.loopButton_do.h) / 2))), a.nextButton_do && (a.nextButton_do.setX(a.sW - a.nextButton_do.w - a.startSpaceBetweenButtons), a.nextButton_do.setY(parseInt((a.controllBar_do.h - a.nextButton_do.h) / 2)), a.prevButton_do.setX(a.nextButton_do.x - a.nextButton_do.w - a.spaceBetweenButtons), a.prevButton_do.setY(parseInt((a.controllBar_do.h - a.prevButton_do.h) / 2)));
                a.input_do && (a.input_do.setWidth(e), a.input_do.setX(a.startSpaceBetweenButtons), a.input_do.setY(parseInt((a.controllBar_do.h - a.input_do.getHeight()) / 2)), a.inputArrow_do.setX(parseInt(a.input_do.x + a.input_do.getWidth()) - a.inputArrow_do.w - 7), a.inputArrow_do.setY(parseInt((a.controllBar_do.h - a.inputArrow_do.h) / 2))), a.controllBar_do.setWidth(a.sW), a.controllBar_do.setY(a.sH - a.controllBar_do.h)
            }, this.setupPrevButton = function() {
                a.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), a.prevButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-FF-left'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), a.prevButton_do = new FWDUVPSimpleButton(a.prevN_img, l.prevSPath_str, void 0, !0, l.useHEX, l.nBC, l.sBC)), a.prevButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, a.prevButtonShowTooltipHandler), a.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, a.prevButtonOnMouseUpHandler), a.buttons_ar.push(a.prevButton_do), a.controllBar_do.addChild(a.prevButton_do)
            }, this.prevButtonShowTooltipHandler = function(e) {
                a.showToolTip(a.prevButton_do, a.prevButtonToolTip_do, e.e)
            }, this.prevButtonOnMouseUpHandler = function() {
                a.dispatchEvent(t.PLAY_PREV_VIDEO)
            }, this.setupNextButton = function() {
                a.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), a.nextButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-FF-right'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), a.nextButton_do = new FWDUVPSimpleButton(a.nextN_img, l.nextSPath_str, void 0, !0, l.useHEX, l.nBC, l.sBC)), a.nextButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, a.nextButtonShowTooltipHandler), a.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, a.nextButtonOnMouseUpHandler), a.buttons_ar.push(a.nextButton_do), a.controllBar_do.addChild(a.nextButton_do)
            }, this.nextButtonShowTooltipHandler = function(e) {
                a.showToolTip(a.nextButton_do, a.nextButtonToolTip_do, e.e)
            }, this.nextButtonOnMouseUpHandler = function() {
                a.dispatchEvent(t.PLAY_NEXT_VIDEO)
            }, this.setupShuffleButton = function() {
                a.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), a.shuffleButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-shuffle'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), a.shuffleButton_do = new FWDUVPSimpleButton(a.shuffleN_img, l.shufflePathS_str, void 0, !0, l.useHEX, l.nBC, l.sBC)), a.shuffleButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, a.shuffleButtonShowToolTipHandler), a.shuffleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, a.shuffleButtonOnMouseUpHandler), a.buttons_ar.push(a.shuffleButton_do), a.controllBar_do.addChild(a.shuffleButton_do), !a.loop_bl && a.shuffle_bl && a.setShuffleButtonState("selected")
            }, this.shuffleButtonShowToolTipHandler = function(e) {
                a.showToolTip(a.shuffleButton_do, a.shuffleButtonToolTip_do, e.e)
            }, this.shuffleButtonOnMouseUpHandler = function() {
                a.shuffleButton_do.isSelectedFinal_bl ? a.dispatchEvent(t.DISABLE_SHUFFLE) : a.dispatchEvent(t.ENABLE_SHUFFLE)
            }, this.setShuffleButtonState = function(e) {
                a.shuffleButton_do && ("selected" == e ? a.shuffleButton_do.setSelected() : "unselected" == e && a.shuffleButton_do.setUnselected())
            }, this.setupLoopButton = function() {
                a.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), a.loopButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='fwdicon fwdicon-loop'></span>", void 0, "UVPMainButtonsNormalState", "UVPMainButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), a.loopButton_do = new FWDUVPSimpleButton(a.replayN_img, l.replaySPath_str, void 0, !0, l.useHEX, l.nBC, l.sBC)), a.loopButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, a.loopButtonShowTooltipHandler), a.loopButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, a.loopButtonOnMouseUpHandler), a.buttons_ar.push(a.loopButton_do), a.controllBar_do.addChild(a.loopButton_do), a.loop_bl && a.setLoopStateButton("selected")
            }, this.loopButtonShowTooltipHandler = function(e) {
                a.showToolTip(a.loopButton_do, a.loopButtonToolTip_do, e.e)
            }, this.loopButtonOnMouseUpHandler = function() {
                a.loopButton_do.isSelectedFinal_bl ? a.dispatchEvent(t.DISABLE_LOOP) : a.dispatchEvent(t.ENABLE_LOOP)
            }, this.setLoopStateButton = function(e) {
                a.loopButton_do && ("selected" == e ? a.loopButton_do.setSelected() : "unselected" == e && a.loopButton_do.setUnselected())
            }, this.setupToolTips = function() {
                a.showNextAndPrevButtons_bl && (FWDUVPToolTip.setPrototype(), a.prevButtonToolTip_do = new FWDUVPToolTip(a.prevButton_do, l.toopTipBk_str, l.toopTipPointer_str, "previous video", l.buttonsToolTipFontColor_str, a.buttonsToolTipHideDelay), document.documentElement.appendChild(a.prevButtonToolTip_do.screen), FWDUVPToolTip.setPrototype(), a.nextButtonToolTip_do = new FWDUVPToolTip(a.nextButton_do, l.toopTipBk_str, l.toopTipPointer_str, "next video", l.buttonsToolTipFontColor_str, a.buttonsToolTipHideDelay), document.documentElement.appendChild(a.nextButtonToolTip_do.screen)), a.showShuffleButton_bl && (FWDUVPToolTip.setPrototype(), a.shuffleButtonToolTip_do = new FWDUVPToolTip(a.shuffleButton_do, l.toopTipBk_str, l.toopTipPointer_str, "shuffle", l.buttonsToolTipFontColor_str, a.buttonsToolTipHideDelay), document.documentElement.appendChild(a.shuffleButtonToolTip_do.screen)), a.showLoopButton_bl && (FWDUVPToolTip.setPrototype(), a.loopButtonToolTip_do = new FWDUVPToolTip(a.loopButton_do, l.toopTipBk_str, l.toopTipPointer_str, "loop", l.buttonsToolTipFontColor_str, a.buttonsToolTipHideDelay), document.documentElement.appendChild(a.loopButtonToolTip_do.screen))
            }, this.showToolTip = function(e, t, s) {
                if (a.showButtonsToolTip_bl) {
                    var o, i, l = FWDUVPUtils.getViewportSize();
                    FWDUVPUtils.getViewportMouseCoordinates(s);
                    i = e.screen.offsetWidth < 3 ? (o = parseInt(100 * e.getGlobalX() + e.w / 2 - t.w / 2), parseInt(100 * e.getGlobalY() - t.h - 8)) : (o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2), parseInt(e.getGlobalY() - t.h - 8));
                    var n = 0;
                    o < 0 ? (n = o, o = 0) : o + t.w > l.w && (o += -1 * (n = -1 * (l.w - (o + t.w)))), t.positionPointer(n, !1), t.setX(o), t.setY(i), t.show()
                }
            }, this.setupThumbnails = function() {
                var e;
                a.totalThumbs = a.playlist_ar.length, a.thumbs_ar = [];
                var t = l.thumbnailNormalBackgroundColor_str,
                    s = l.thumbnailHoverBackgroundColor_str,
                    o = l.thumbnailDisabledBackgroundColor_str;
                n.isWhite && (t = "#FFFFFF", s = o = "#EEEEEE");
                for (var i = 0; i < a.totalThumbs; i++) FWDUVPPlaylistThumb.setPrototype(), e = new FWDUVPPlaylistThumb(a, i, l.playlistThumbnailsBkPath_str, t, s, o, a.thumbImageW, a.thumbImageH, a.thumbInPadding, a.playlist_ar[i].title, a.playlist_ar[i].titleText, a.showThumbnail_bl), (a.thumbs_ar[i] = e).addListener(FWDUVPPlaylistThumb.MOUSE_UP, a.thumbMouseUpHandler), a.thumbsHolder_do.addChild(e)
            }, this.thumbMouseUpHandler = function(e) {
                a.disableThumbs_bl || (a.disableForAWhileAfterThumbClick_bl = !0, clearTimeout(a.disableForAWhileAfterThumbClickId_to), a.disableForAWhileAfterThumbClickId_to = setTimeout(function() {
                    a.disableForAWhileAfterThumbClick_bl = !1
                }, 50), a.dispatchEvent(t.THUMB_MOUSE_UP, {
                    id: e.id
                }))
            }, this.loadImages = function() {
                a.playlist_ar[a.countLoadedThumbs] && (a.image_img && (a.image_img.onload = null, a.image_img.onerror = null), a.image_img = new Image, a.image_img.onerror = a.onImageLoadError, a.image_img.onload = a.onImageLoadComplete, a.image_img.src = a.playlist_ar[a.countLoadedThumbs].thumbSource)
            }, this.onImageLoadError = function(e) {}, this.onImageLoadComplete = function(e) {
                a.thumbs_ar[a.countLoadedThumbs].setImage(a.image_img), a.countLoadedThumbs++, a.loadWithDelayId_to = setTimeout(a.loadImages, 40)
            }, this.checkThumbsState = function() {
                if (a.thumbs_ar)
                    for (var e, t = 0; t < a.totalThumbs; t++) e = a.thumbs_ar[t], t == a.curId ? e.disable() : e.enable()
            }, this.positionThumbs = function(e) {
                if (a.thumbs_ar) {
                    a.sW;
                    var t, s, o = a.spaceBetweenThumbnails,
                        i = [].concat(a.thumbs_ar);
                    if (a.isSearched_bl = !1, a.input_do && "search" != (s = a.input_do.screen.value.toLowerCase()))
                        for (var l = 0; l < i.length; l++) - 1 == (t = i[l]).htmlText_str.indexOf(s) && (FWDAnimation.killTweensOf(t), t.setX(-t.w - 20), i.splice(l, 1), l--);
                    var n = i.length;
                    a.totalThumbs != n && (a.isSearched_bl = !0);
                    for (l = 0; l < n; l++)(t = i[l]).finalW = a.sW, t.finalX = 0, t.finalY = l * (t.finalH + o), t.resizeAndPosition(e);
                    0 == n ? a.showNothingFound() : a.hideNothingFound(), t && (a.totalThumbsHeight = Math.max(0, n * (t.h + a.spaceBetweenThumbnails) - a.spaceBetweenThumbnails), a.totalThumbsHeight > a.sH - a.removeFromThumbsHolderHeight ? a.allowToScrollAndScrollBarIsActive_bl = !0 : a.allowToScrollAndScrollBarIsActive_bl = !1)
                }
            }, this.setupMobileScrollbar = function() {
                a.hasPointerEvent_bl ? a.mainThumbsHolder_do.screen.addEventListener("pointerdown", a.scrollBarTouchStartHandler) : a.mainThumbsHolder_do.screen.addEventListener("touchstart", a.scrollBarTouchStartHandler), a.isMbl && (a.updateMobileScrollBarId_int = setInterval(a.updateMobileScrollBar, 16))
            }, this.scrollBarTouchStartHandler = function(e) {
                e.preventDefault && e.preventDefault(), a.isScrollingOnMove_bl = !1, FWDAnimation.killTweensOf(a.thumbsHolder_do);
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                a.isDragging_bl = !0, a.lastPresedY = t.screenY, a.checkLastPresedY = t.screenY, a.hasPointerEvent_bl ? (n.addEventListener("pointerup", a.scrollBarTouchEndHandler), n.addEventListener("pointermove", a.scrollBarTouchMoveHandler)) : (n.addEventListener("touchend", a.scrollBarTouchEndHandler), n.addEventListener("touchmove", a.scrollBarTouchMoveHandler)), clearInterval(a.updateMoveMobileScrollbarId_int), a.updateMoveMobileScrollbarId_int = setInterval(a.updateMoveMobileScrollbar, 20)
            }, this.scrollBarTouchMoveHandler = function(e) {
                if (e.preventDefault && e.preventDefault(), e.stopImmediatePropagation(), !(a.totalThumbsHeight < a.mainThumbsHolder_do.h || a.comboBox_do && a.comboBox_do.isShowed_bl)) {
                    i.showDisable();
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    (t.screenY >= a.checkLastPresedY + 6 || t.screenY <= a.checkLastPresedY - 6) && (a.isScrollingOnMove_bl = !0);
                    var s = t.screenY - a.lastPresedY;
                    if (a.thumbnailsFinalY += s, a.thumbnailsFinalY = Math.round(a.thumbnailsFinalY), a.lastPresedY = t.screenY, a.vy = 2 * s, !a.isMobile) {
                        0 < a.thumbnailsFinalY ? a.thumbnailsFinalY = 0 : a.thumbnailsFinalY < a.mainThumbsHolder_do.h - a.totalThumbsHeight && (a.thumbnailsFinalY = a.mainThumbsHolder_do.h - a.totalThumbsHeight);
                        var o = Math.max(0, a.thumbnailsFinalY / (a.mainThumbsHolder_do.h - a.totalThumbsHeight));
                        a.scrMainHolder_do && (a.scrollBarHandlerFinalY = Math.round((a.scrMainHolder_do.h - a.scrHandler_do.h) * o), a.scrollBarHandlerFinalY < 0 ? a.scrollBarHandlerFinalY = 0 : a.scrollBarHandlerFinalY > a.scrMainHolder_do.h - a.scrHandler_do.h - 1 && (a.scrollBarHandlerFinalY = a.scrMainHolder_do.h - a.scrHandler_do.h - 1), FWDAnimation.killTweensOf(a.scrHandler_do), FWDAnimation.killTweensOf(a.scrHandlerLines_do), a.scrHandler_do.setY(a.scrollBarHandlerFinalY), a.scrHandlerLines_do.setY(a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLinesN_do.h) / 2)))
                    }
                }
            }, this.scrollBarTouchEndHandler = function(e) {
                a.isDragging_bl = !1, clearInterval(a.updateMoveMobileScrollbarId_int), clearTimeout(a.disableOnMoveId_to), a.disableOnMoveId_to = setTimeout(function() {
                    i.hideDisable()
                }, 100), a.hasPointerEvent_bl ? (n.removeEventListener("pointerup", a.scrollBarTouchEndHandler), n.removeEventListener("pointermove", a.scrollBarTouchMoveHandler)) : (n.removeEventListener("touchend", a.scrollBarTouchEndHandler), n.removeEventListener("touchmove", a.scrollBarTouchMoveHandler))
            }, this.updateMoveMobileScrollbar = function() {
                a.thumbsHolder_do.setY(a.thumbnailsFinalY)
            }, this.updateMobileScrollBar = function(e) {
                a.isDragging_bl || (a.isSearched_bl && (a.thumbnailsFinalY = 0), a.totalThumbsHeight < a.mainThumbsHolder_do.h && (a.thumbnailsFinalY = .01), a.vy *= a.friction, a.thumbnailsFinalY += a.vy, 0 < a.thumbnailsFinalY ? (a.vy2 = .3 * (0 - a.thumbnailsFinalY), a.vy *= a.friction, a.thumbnailsFinalY += a.vy2) : a.thumbnailsFinalY < a.mainThumbsHolder_do.h - a.totalThumbsHeight && (a.vy2 = .3 * (a.mainThumbsHolder_do.h - a.totalThumbsHeight - a.thumbnailsFinalY), a.vy *= a.friction, a.thumbnailsFinalY += a.vy2), a.thumbsHolder_do.setY(Math.round(a.thumbnailsFinalY)))
            }, this.setupScrollbar = function() {
                a.scrMainHolder_do = new FWDUVPDisplayObject("div"), a.scrMainHolder_do.setWidth(a.scrWidth), a.scrTrack_do = new FWDUVPDisplayObject("div"), a.scrTrack_do.setWidth(a.scrWidth), a.scrTrackTop_do = new FWDUVPDisplayObject("img"), a.scrTrackTop_do.setScreen(a.scrBkTop_img), a.scrTrackMiddle_do = new FWDUVPDisplayObject("div"), a.scrTrackMiddle_do.getStyle().background = "url('" + l.scrBkMiddlePath_str + "')", a.scrTrackMiddle_do.setWidth(a.scrWidth), a.scrTrackMiddle_do.setY(a.scrTrackTop_do.h);
                var e = new Image;
                e.src = l.scrBkBottomPath_str, a.scrTrackBottom_do = new FWDUVPDisplayObject("img"), a.scrTrackBottom_do.setScreen(e), a.scrTrackBottom_do.setWidth(a.scrTrackTop_do.w), a.scrTrackBottom_do.setHeight(a.scrTrackTop_do.h), a.scrHandler_do = new FWDUVPDisplayObject("div"), a.scrHandler_do.setWidth(a.scrWidth), a.scrHandlerTop_do = new FWDUVPDisplayObject("img"), a.useHEX ? (a.scrHandlerTop_do = new FWDUVPDisplayObject("div"), a.scrHandlerTop_do.setWidth(a.scrDragTop_img.width), a.scrHandlerTop_do.setHeight(a.scrDragTop_img.height), a.mainScrubberDragTop_canvas = FWDUVPUtils.getCanvasWithModifiedColor(a.scrDragTop_img, a.nBC).canvas, a.scrHandlerTop_do.screen.appendChild(a.mainScrubberDragTop_canvas)) : (a.scrHandlerTop_do = new FWDUVPDisplayObject("img"), a.scrHandlerTop_do.setScreen(a.scrDragTop_img)), a.scrHandlerMiddle_do = new FWDUVPDisplayObject("div"), a.middleImage = new Image, a.middleImage.src = l.scrDragMiddlePath_str, a.useHEX ? a.middleImage.onload = function() {
                    a.scrubberDragMiddle_canvas = FWDUVPUtils.getCanvasWithModifiedColor(a.middleImage, a.nBC, !0), a.scrubberDragImage_img = a.scrubberDragMiddle_canvas.image, a.scrHandlerMiddle_do.getStyle().background = "url('" + a.scrubberDragImage_img.src + "') repeat-y"
                } : a.scrHandlerMiddle_do.getStyle().background = "url('" + l.scrDragMiddlePath_str + "')", a.scrHandlerMiddle_do.setWidth(a.scrWidth), a.scrHandlerMiddle_do.setY(a.scrHandlerTop_do.h), a.scrHandlerBottom_do = new FWDUVPDisplayObject("div"), a.bottomImage = new Image, a.bottomImage.src = l.scrDragMiddlePath_str, a.useHEX ? a.bottomImage.onload = function() {
                    a.scrubberDragBottom_canvas = FWDUVPUtils.getCanvasWithModifiedColor(a.bottomImage, a.nBC, !0), a.scrubberDragBottomImage_img = a.scrubberDragBottom_canvas.image, a.scrHandlerBottom_do.getStyle().background = "url('" + a.scrubberDragBottomImage_img.src + "') repeat-y"
                } : a.scrHandlerBottom_do.getStyle().background = "url('" + l.scrDragBottomPath_str + "')", a.scrHandlerBottom_do.setWidth(a.scrWidth), a.scrHandlerBottom_do.setY(a.scrHandlerTop_do.h), a.scrHandlerBottom_do.setWidth(a.scrHandlerTop_do.w), a.scrHandlerBottom_do.setHeight(a.scrHandlerTop_do.h), a.useHEX ? (a.scrHandlerLinesN_do = new FWDUVPDisplayObject("div"), a.scrHandlerLinesN_do.setWidth(a.scrLinesN_img.width), a.scrHandlerLinesN_do.setHeight(a.scrLinesN_img.height), a.mainhandlerN_canvas = FWDUVPUtils.getCanvasWithModifiedColor(a.scrLinesN_img, a.sBC).canvas, a.scrHandlerLinesN_do.screen.appendChild(a.mainhandlerN_canvas)) : (a.scrHandlerLinesN_do = new FWDUVPDisplayObject("img"), a.scrHandlerLinesN_do.setScreen(a.scrLinesN_img)), a.scrHandlerLinesS_img = new Image, a.scrHandlerLinesS_img.src = l.scrLinesSPath_str, a.useHEX ? (a.scrHandlerLinesS_do = new FWDUVPDisplayObject("div"), a.scrHandlerLinesS_img.onload = function() {
                    a.scrHandlerLinesS_do.setWidth(a.scrHandlerLinesN_do.w), a.scrHandlerLinesS_do.setHeight(a.scrHandlerLinesN_do.h), a.scrubberLines_s_canvas = FWDUVPUtils.getCanvasWithModifiedColor(a.scrHandlerLinesS_img, a.sBC, !0), a.scrubbelinesSImage_img = a.scrubberLines_s_canvas.image, a.scrHandlerLinesS_do.getStyle().background = "url('" + a.scrubbelinesSImage_img.src + "') repeat-y"
                }) : (a.scrHandlerLinesS_do = new FWDUVPDisplayObject("img"), a.scrHandlerLinesS_do.setScreen(a.scrHandlerLinesS_img), a.scrHandlerLinesS_do.setWidth(a.scrHandlerLinesN_do.w), a.scrHandlerLinesS_do.setHeight(a.scrHandlerLinesN_do.h)), a.scrHandlerLinesS_do.setAlpha(0), a.scrHandlerLines_do = new FWDUVPDisplayObject("div"), a.scrHandlerLines_do.setWidth(a.scrHandlerLinesN_do.w), a.scrHandlerLines_do.setHeight(a.scrHandlerLinesN_do.h), a.scrTrack_do.addChild(a.scrTrackTop_do), a.scrTrack_do.addChild(a.scrTrackMiddle_do), a.scrTrack_do.addChild(a.scrTrackBottom_do), a.scrHandler_do.addChild(a.scrHandlerTop_do), a.scrHandler_do.addChild(a.scrHandlerMiddle_do), a.scrHandler_do.addChild(a.scrHandlerBottom_do), a.scrHandlerLines_do.addChild(a.scrHandlerLinesN_do), a.scrHandlerLines_do.addChild(a.scrHandlerLinesS_do), a.scrMainHolder_do.addChild(a.scrTrack_do), a.scrMainHolder_do.addChild(a.scrHandler_do), a.scrMainHolder_do.addChild(a.scrHandlerLines_do), a.mainHld.addChild(a.scrMainHolder_do), a.scrHandler_do.screen.addEventListener("mouseover", a.scrollBarHandlerOnMouseOver), a.scrHandler_do.screen.addEventListener("mouseout", a.scrollBarHandlerOnMouseOut), a.scrHandler_do.screen.addEventListener("mousedown", a.scrollBarHandlerOnMouseDown), a.scrHandlerLines_do.screen.addEventListener("mouseover", a.scrollBarHandlerOnMouseOver), a.scrHandlerLines_do.screen.addEventListener("mouseout", a.scrollBarHandlerOnMouseOut), a.scrHandlerLines_do.screen.addEventListener("mousedown", a.scrollBarHandlerOnMouseDown), a.addScrOnMM_bl && n.addEventListener("mousemove", a.scrOnMM)
            }, this.scrOnMM = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                FWDUVPUtils.hitTest(a.mainThumbsHolder_do.screen, t.screenX, t.screenY) ? (a.isDragging_bl = !0, a.scrollBarHandlerMoveHandler(e)) : a.isDragging_bl = !1
            }, this.scrollBarHandlerOnMouseOver = function(e) {
                a.allowToScrollAndScrollBarIsActive_bl && !a.addScrOnMM_bl && (FWDAnimation.killTweensOf(a.scrHandlerLinesN_do), FWDAnimation.killTweensOf(a.scrHandlerLinesS_do), FWDAnimation.to(a.scrHandlerLinesN_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(a.scrHandlerLinesS_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }))
            }, this.scrollBarHandlerOnMouseOut = function(e) {
                !a.isDragging_bl && a.allowToScrollAndScrollBarIsActive_bl && (FWDAnimation.killTweensOf(a.scrHandlerLinesN_do), FWDAnimation.killTweensOf(a.scrHandlerLinesS_do), FWDAnimation.to(a.scrHandlerLinesN_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(a.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }))
            }, this.scrollBarHandlerOnMouseDown = function(e) {
                if (a.allowToScrollAndScrollBarIsActive_bl && !a.addScrOnMM_bl) {
                    var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                    a.isDragging_bl = !0, a.yPositionOnPress = a.scrHandler_do.y, a.lastPresedY = t.screenY, FWDAnimation.killTweensOf(a.scrHandler_do), i.showDisable(), n.addEventListener && (n.addEventListener("mousemove", a.scrollBarHandlerMoveHandler), n.addEventListener("mouseup", a.scrollBarHandlerEndHandler))
                }
            }, this.scrollBarHandlerMoveHandler = function(e) {
                e.preventDefault && e.preventDefault();
                var t = FWDUVPUtils.getViewportMouseCoordinates(e),
                    s = a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLines_do.h) / 2);
                a.addScrOnMM_bl ? a.scrollBarHandlerFinalY = Math.round(t.screenY - a.mainThumbsHolder_do.getGlobalY() - a.scrHandler_do.h / 2) : a.scrollBarHandlerFinalY = Math.round(a.yPositionOnPress + t.screenY - a.lastPresedY), a.scrollBarHandlerFinalY >= a.scrTrack_do.h - a.scrHandler_do.h ? a.scrollBarHandlerFinalY = a.scrTrack_do.h - a.scrHandler_do.h : a.scrollBarHandlerFinalY <= 0 && (a.scrollBarHandlerFinalY = 0), a.scrHandler_do.setY(a.scrollBarHandlerFinalY), FWDAnimation.killTweensOf(a.scrHandler_do), FWDAnimation.to(a.scrHandlerLines_do, .8, {
                    y: s,
                    ease: Quart.easeOut
                }), a.updateScrollBarHandlerAndContent(!0)
            }, a.scrollBarHandlerEndHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                a.isDragging_bl = !1, FWDUVPUtils.hitTest(a.scrHandler_do.screen, t.screenX, t.screenY) || (FWDAnimation.killTweensOf(a.scrHandlerLinesN_do), FWDAnimation.killTweensOf(a.scrHandlerLinesS_do), FWDAnimation.to(a.scrHandlerLinesN_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(a.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })), i.hideDisable(), FWDAnimation.killTweensOf(a.scrHandler_do), FWDAnimation.to(a.scrHandler_do, .4, {
                    y: a.scrollBarHandlerFinalY,
                    ease: Quart.easeOut
                }), n.removeEventListener && (n.removeEventListener("mousemove", a.scrollBarHandlerMoveHandler), n.removeEventListener("mouseup", a.scrollBarHandlerEndHandler))
            }, this.updateScrollBarSizeActiveAndDeactivate = function() {
                a.disableForAWhileAfterThumbClick_bl || (a.allowToScrollAndScrollBarIsActive_bl ? (a.allowToScrollAndScrollBarIsActive_bl = !0, a.scrMainHolder_do.setX(a.sW - a.scrMainHolder_do.w), a.scrMainHolder_do.setHeight(a.sH - a.removeFromThumbsHolderHeight), a.scrTrack_do.setHeight(a.scrMainHolder_do.h), a.scrTrackMiddle_do.setHeight(a.scrTrack_do.h - 2 * a.scrTrackTop_do.h), a.scrTrackBottom_do.setY(a.scrTrackMiddle_do.y + a.scrTrackMiddle_do.h), a.scrMainHolder_do.setAlpha(1), a.addScrOnMM_bl || (a.scrHandler_do.setButtonMode(!0), a.scrHandlerLines_do.setButtonMode(!0))) : (a.allowToScrollAndScrollBarIsActive_bl = !1, a.scrMainHolder_do.setX(a.sW - a.scrMainHolder_do.w), a.scrMainHolder_do.setHeight(a.sH - a.removeFromThumbsHolderHeight), a.scrTrack_do.setHeight(a.scrMainHolder_do.h), a.scrTrackMiddle_do.setHeight(a.scrTrack_do.h - 2 * a.scrTrackTop_do.h), a.scrTrackBottom_do.setY(a.scrTrackMiddle_do.y + a.scrTrackMiddle_do.h), a.scrMainHolder_do.setAlpha(.5), a.scrHandler_do.setY(0), a.scrHandler_do.setButtonMode(!1), a.scrHandlerLines_do.setButtonMode(!1)), a.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1, a.scrMainHolder_do.h / a.totalThumbsHeight) * a.scrMainHolder_do.h))), a.scrHandlerMiddle_do.setHeight(a.scrHandler_do.h - 2 * a.scrHandlerTop_do.h), a.scrHandlerBottom_do.setY(a.scrHandlerMiddle_do.y + a.scrHandlerMiddle_do.h), FWDAnimation.killTweensOf(a.scrHandlerLines_do), a.scrHandlerLines_do.setY(a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLines_do.h) / 2)), a.scrHandlerBottom_do.setY(a.scrHandler_do.h - a.scrHandlerBottom_do.h))
            }, this.updateScrollBarHandlerAndContent = function(e, t) {
                if (!a.disableForAWhileAfterThumbClick_bl && (a.allowToScrollAndScrollBarIsActive_bl || t)) {
                    var s = 0;
                    a.isDragging_bl && !a.isMbl ? ("Infinity" == (s = a.scrollBarHandlerFinalY / (a.scrMainHolder_do.h - a.scrHandler_do.h)) ? s = 0 : 1 <= s && (scrollPercent = 1), a.thumbnailsFinalY = -1 * Math.round(s * (a.totalThumbsHeight - a.mainThumbsHolder_do.h))) : (s = a.isSearched_bl ? a.percentScrolled = 0 : a.curId / (a.totalThumbs - 1), a.thumbnailsFinalY = Math.min(0, -1 * Math.round(s * (a.totalThumbsHeight - a.mainThumbsHolder_do.h))), a.scrMainHolder_do && (a.scrollBarHandlerFinalY = Math.round((a.scrMainHolder_do.h - a.scrHandler_do.h) * s), a.scrollBarHandlerFinalY < 0 ? a.scrollBarHandlerFinalY = 0 : a.scrollBarHandlerFinalY > a.scrMainHolder_do.h - a.scrHandler_do.h - 1 && (a.scrollBarHandlerFinalY = a.scrMainHolder_do.h - a.scrHandler_do.h - 1), FWDAnimation.killTweensOf(a.scrHandler_do), FWDAnimation.killTweensOf(a.scrHandlerLines_do), e ? (FWDAnimation.to(a.scrHandler_do, .4, {
                        y: a.scrollBarHandlerFinalY,
                        ease: Quart.easeOut
                    }), FWDAnimation.to(a.scrHandlerLines_do, .8, {
                        y: a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLinesN_do.h) / 2),
                        ease: Quart.easeOut
                    })) : (a.scrHandler_do.setY(a.scrollBarHandlerFinalY), a.scrHandlerLines_do.setY(a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLinesN_do.h) / 2))))), a.lastThumbnailFinalY != a.thumbnailsFinalY && (FWDAnimation.killTweensOf(a.thumbsHolder_do), e ? FWDAnimation.to(a.thumbsHolder_do, .5, {
                        y: a.thumbnailsFinalY,
                        ease: Quart.easeOut
                    }) : a.thumbsHolder_do.setY(a.thumbnailsFinalY)), a.lastThumbnailFinalY = a.thumbnailsFinalY
                }
            }, this.addMouseWheelSupport = function() {
                a.screen.addEventListener && (a.screen.addEventListener("DOMMouseScroll", a.mouseWheelHandler), a.screen.addEventListener("mousewheel", a.mouseWheelHandler))
            }, a.mouseWheelHandler = function(e) {
                if (e.preventDefault && e.preventDefault(), a.disableMouseWheel_bl || a.isDragging_bl) return !1;
                if (!a.comboBox_do || !a.comboBox_do.isShowed_bl) {
                    var t = e.detail || e.wheelDelta;
                    e.wheelDelta && (t *= -1), 0 < t ? a.scrollBarHandlerFinalY += Math.round(160 * a.scollbarSpeedSensitivity * (a.mainThumbsHolder_do.h / a.totalThumbsHeight)) : t < 0 && (a.scrollBarHandlerFinalY -= Math.round(160 * a.scollbarSpeedSensitivity * (a.mainThumbsHolder_do.h / a.totalThumbsHeight))), a.scrollBarHandlerFinalY >= a.scrTrack_do.h - a.scrHandler_do.h ? a.scrollBarHandlerFinalY = a.scrTrack_do.h - a.scrHandler_do.h : a.scrollBarHandlerFinalY <= 0 && (a.scrollBarHandlerFinalY = 0);
                    var s = a.scrollBarHandlerFinalY + parseInt((a.scrHandler_do.h - a.scrHandlerLines_do.h) / 2);
                    if (FWDAnimation.killTweensOf(a.scrHandler_do), FWDAnimation.killTweensOf(a.scrHandlerLines_do), FWDAnimation.to(a.scrHandlerLines_do, .8, {
                            y: s,
                            ease: Quart.easeOut
                        }), FWDAnimation.to(a.scrHandler_do, .5, {
                            y: a.scrollBarHandlerFinalY,
                            ease: Quart.easeOut
                        }), a.isDragging_bl = !0, a.updateScrollBarHandlerAndContent(!0), a.isDragging_bl = !1, !e.preventDefault) return !1;
                    e.preventDefault()
                }
            }, this.hideAndShow = function(e) {
                "bottom" == a.position_str ? (a.mainHld.setY(-a.sH), FWDAnimation.to(a.mainHld, .8, {
                    y: 0,
                    delay: .3,
                    ease: Expo.easeInOut
                })) : (a.mainHld.setX(-a.sW - 2), FWDAnimation.to(a.mainHld, .8, {
                    x: 0,
                    delay: .3,
                    ease: Expo.easeInOut
                }), a.ec && (a.ec.setX(-a.sW - 2), FWDAnimation.to(a.ec, .8, {
                    x: 0,
                    delay: .3,
                    ease: Expo.easeInOut
                })))
            }, this.hide = function(e) {
                a.isShowed_bl = !1, e ? "bottom" == a.position_str && FWDAnimation.to(a.mainHld, .8, {
                    y: -a.sH,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(a.mainHld), "bottom" == a.position_str && a.mainHld.setY(-a.sH))
            }, this.show = function(e) {
                a.isShowed_bl = !0, FWDAnimation.isTweening(a.mainHld) || a.hide(!1), e ? "bottom" == a.position_str ? FWDAnimation.to(a.mainHld, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                }) : a.mainHld.setY(0) : (FWDAnimation.killTweensOf(a.mainHld), a.mainHld.setX(0), a.mainHld.setY(0), clearTimeout(a.disableThumbsId_to), a.disableThumbsId_to = setTimeout(function() {
                    a.disableThumbs_bl = !1
                }, 200), a.disableThumbs_bl = !0)
            }, this.init()
        };
        t.setPrototype = function() {
            t.prototype = new FWDUVPDisplayObject("div", "absolute", "visible")
        }, t.THUMB_MOUSE_UP = "thumbMouseOut", t.PLAY_PREV_VIDEO = "playPrevVideo", t.PLAY_NEXT_VIDEO = "playNextVideo", t.DISABLE_LOOP = "disableLoop", t.ENABLE_LOOP = "enableLoop", t.DISABLE_SHUFFLE = "disableShuffle", t.ENABLE_SHUFFLE = "enableShuffle", t.CHANGE_PLAYLIST = "changePlaylist", t.prototype = null, n.FWDUVPPlaylist = t
    }(window),
    function(e) {
        var _ = function(s, e, t, o, i, l, n, a, r, d, u, h) {
            var c = this;
            _.prototype;
            this.mainImgHld = null, this.imageHolder_do = null, this.normalImage_do = null, this.dumy_do = null, this.txt = null, this.backgroundImagePath_str = t, this.thumbnailNormalBackgroundColor_str = o, this.thumbnailHoverBackgroundColor_str = i, this.thumbnailDisabledBackgroundColor_str = l, this.htmlContent_str = d, this.htmlText_str = u.toLowerCase(), this.curStt = "none", this.id = e, this.padding = r, this.imageOriginalW, this.imageOriginalH, this.finalX, this.finalY, this.thumbImageWidth = n, this.thumbImageHeight = a, this.finalW, this.finalH = 2 * c.padding + c.thumbImageHeight, this.imageFinalX, this.imageFinalY, this.imageFinalW, this.imageFinalH, this.mouseX, this.mouseY, this.showId_to, this.disableForAWhileId_to, this.isDark = !0, -1 == t.indexOf("dark") && (this.isDark = !1), this.hasImage_bl = !1, this.isSelected_bl = !1, this.isDisabled_bl = !1, this.disableForAWhile_bl = !1, this.hasToolTipShowed_bl = !1, this.hasCanvas_bl = FWDUVPlayer.hasCanvas, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.hasDispatchedOverEvent_bl = !1, this.showThumbnail_bl = h, this.init = function() {
                c.setupMainContainers(), c.setButtonMode(!0), c.setNormalState(), c.hasPointerEvent_bl ? (c.screen.addEventListener("pointerover", c.onMouseOver), c.screen.addEventListener("pointerout", c.onMouseOut), c.screen.addEventListener("pointerup", c.onMouseUp)) : c.screen.addEventListener && (c.screen.addEventListener("mouseover", c.onMouseOver), c.screen.addEventListener("mouseout", c.onMouseOut), c.screen.addEventListener("mouseup", c.onMouseUp), c.screen.addEventListener("touchend", c.onMouseUp))
            }, this.onMouseUp = function(e) {
                s.isScrollingOnMove_bl || c.isDisabled_bl || 2 == e.button || (e.preventDefault && e.preventDefault(), c.dispatchEvent(_.MOUSE_UP, {
                    id: c.id
                }))
            }, this.onMouseOver = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    if (c.isDisabled_bl) return;
                    c.setSelectedState(!0)
                }
            }, this.onMouseOut = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    if (c.isDisabled_bl) return;
                    c.setNormalState(!0)
                }
            }, this.setupMainContainers = function() {
                c.mainImgHld = new FWDUVPDisplayObject("div"), c.mainImgHld.screen.className = "fwduvp-playlist-thumbnail", c.mainImgHld.getStyle().background = "url('" + c.backgroundImagePath_str + "')", c.mainImgHld.setX(c.padding), c.mainImgHld.setY(c.padding), c.mainImgHld.setWidth(c.thumbImageWidth), c.mainImgHld.setHeight(c.thumbImageHeight), c.imageHolder_do = new FWDUVPDisplayObject("div"), c.txt = new FWDUVPDisplayObject("div");
                var e = "fwduvp-playlist-thumbnail-white-text";
                c.isDark && (e = "fwduvp-playlist-thumbnail-dark-text"), c.txt.screen.className = e, c.txt.hasTransform3d_bl = !1, c.txt.hasTransform2d_bl = !1, c.txt.setHeight(c.finalH - 6), c.txt.setBackfaceVisibility(), c.txt.getStyle().fontFamily = "Arial", c.txt.getStyle().fontSize = "12px", c.txt.getStyle().color = c.fontColor_str, c.txt.getStyle().fontSmoothing = "antialiased", c.txt.getStyle().webkitFontSmoothing = "antialiased", c.txt.getStyle().textRendering = "optimizeLegibility", c.slTitle = c.txt.screen.className, c.showThumbnail_bl ? c.txt.setX(2 * c.padding + c.thumbImageWidth + 4) : c.txt.setX(2 * c.padding), c.txt.setInnerHTML(c.htmlContent_str), c.addChild(c.txt), c.dumy_do = new FWDUVPDisplayObject("div"), c.dumy_do.getStyle().width = "100%", c.dumy_do.getStyle().height = "100%", FWDUVPUtils.isIE && (c.dumy_do.setBkColor("#FF0000"), c.dumy_do.setAlpha(.01)), c.showThumbnail_bl && c.addChild(c.mainImgHld), c.mainImgHld.addChild(c.imageHolder_do), c.addChild(c.dumy_do)
            }, this.updateText = function(e) {
                try {
                    c.htmlContent_str = e, c.txt.setInnerHTML(c.htmlContent_str)
                } catch (e) {}
            }, this.setImage = function(e) {
                var t;
                (c.normalImage_do = new FWDUVPDisplayObject("img"), c.normalImage_do.setScreen(e), c.imageOriginalW = c.normalImage_do.w, c.imageOriginalH = c.normalImage_do.h, c.resizeImage(), c.imageHolder_do.setX(parseInt(c.thumbImageWidth / 2)), c.imageHolder_do.setY(parseInt(c.thumbImageHeight / 2)), c.imageHolder_do.setWidth(0), c.imageHolder_do.setHeight(0), c.normalImage_do.setX(-parseInt(c.normalImage_do.w / 2)), c.normalImage_do.setY(-parseInt(c.normalImage_do.h / 2)), FWDAnimation.to(c.imageHolder_do, .8, {
                    x: 0,
                    y: 0,
                    w: c.thumbImageWidth,
                    h: c.thumbImageHeight,
                    ease: Expo.easeInOut
                }), c.normalImage_do.setAlpha(0), c.isMbl) ? (t = c.id == s.curId ? .3 : 1, FWDAnimation.to(c.normalImage_do, .8, {
                    alpha: t,
                    x: c.imageFinalX,
                    y: c.imageFinalY,
                    ease: Expo.easeInOut
                })) : FWDAnimation.to(c.normalImage_do, .8, {
                    alpha: 1,
                    x: c.imageFinalX,
                    y: c.imageFinalY,
                    ease: Expo.easeInOut
                });
                c.imageHolder_do.addChild(c.normalImage_do), this.hasImage_bl = !0
            }, this.resizeAndPosition = function(e) {
                c.showThumbnail_bl ? c.txt.setWidth(c.finalW - (2 * c.padding + c.thumbImageWidth) - 16) : c.txt.setWidth(c.finalW - 2 * c.padding - 16), c.setWidth(c.finalW), c.setHeight(c.finalH), e ? FWDAnimation.to(c, .6, {
                    x: c.finalX,
                    y: c.finalY,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(c), c.setX(c.finalX), c.setY(c.finalY)), c.resizeImage()
            }, this.resizeImage = function(e) {
                if (c.normalImage_do) {
                    c.isMbl ? 1 == c.normalImage_do.alpha || c.isDisabled_bl || c.normalImage_do.setAlpha(1) : 1 == c.imageHolder_do.alpha || c.isDisabled_bl || c.imageHolder_do.setAlpha(1);
                    var t, s = c.thumbImageWidth / c.imageOriginalW,
                        o = c.thumbImageHeight / c.imageOriginalH;
                    t = o <= s ? s : o, c.imageFinalW = Math.ceil(t * c.imageOriginalW), c.imageFinalH = Math.ceil(t * c.imageOriginalH), c.imageFinalX = Math.round((c.thumbImageWidth - c.imageFinalW) / 2), c.imageFinalY = Math.round((c.thumbImageHeight - c.imageFinalH) / 2), c.normalImage_do.setX(c.imageFinalX), c.normalImage_do.setY(c.imageFinalY), c.normalImage_do.setWidth(c.imageFinalW), c.normalImage_do.setHeight(c.imageFinalH)
                }
            }, this.setNormalState = function(e) {
                "normal" != c.curStt && (c.curStt = "normal", c.slTitle && (c.txt.screen.className = c.slTitle), e ? FWDAnimation.to(c.screen, .8, {
                    css: {
                        backgroundColor: c.thumbnailNormalBackgroundColor_str
                    },
                    ease: Expo.easeOut
                }) : (FWDAnimation.killTweensOf(c.screen), c.getStyle().backgroundColor = c.thumbnailNormalBackgroundColor_str))
            }, this.setSelectedState = function(e) {
                "selected" != c.curStt && (c.curStt = "selected", c.setTitleSelectedClass(), e ? FWDAnimation.to(c.screen, .8, {
                    css: {
                        backgroundColor: c.thumbnailHoverBackgroundColor_str
                    },
                    ease: Expo.easeOut
                }) : (FWDAnimation.killTweensOf(c.screen), c.getStyle().backgroundColor = c.thumbnailNormalBackgroundColor_str))
            }, this.setDisabledState = function(e) {
                "disabled" != c.curStt && (c.curStt = "disabled", c.setTitleSelectedClass(), e ? FWDAnimation.to(c.screen, .8, {
                    css: {
                        backgroundColor: c.thumbnailDisabledBackgroundColor_str
                    },
                    ease: Expo.easeOut
                }) : (FWDAnimation.killTweensOf(c.screen), c.getStyle().backgroundColor = c.thumbnailNormalBackgroundColor_str))
            }, this.setTitleSelectedClass = function() {
                c.slTitle && (c.txt.screen.className = c.slTitle + " active")
            }, this.enable = function() {
                c.isDisabled_bl && (c.isDisabled_bl = !1, c.setButtonMode(!0), c.setNormalState(!0), c.isMbl ? c.normalImage_do && c.normalImage_do.setAlpha(1) : FWDAnimation.to(c.imageHolder_do, .6, {
                    alpha: 1
                }))
            }, this.disable = function() {
                c.isDisabled_bl || (c.disableForAWhile_bl = !0, clearTimeout(c.disableForAWhileId_to), c.disableForAWhileId_to = setTimeout(function() {
                    c.disableForAWhile_bl = !1
                }, 200), c.isDisabled_bl = !0, c.setButtonMode(!1), c.setDisabledState(!0), c.isMbl ? c.normalImage_do && c.normalImage_do.setAlpha(.3) : FWDAnimation.to(c.imageHolder_do, .6, {
                    alpha: .3
                }))
            }, this.destroy = function() {
                FWDAnimation.killTweensOf(c), c.normalImage_do && (FWDAnimation.killTweensOf(c.normalImage_do), c.normalImage_do.destroy()), FWDAnimation.killTweensOf(c.imageHolder_do), c.imageHolder_do.destroy(), c.dumy_do.destroy(), c.txt.destroy(), c.backgroundImagePath_str = t, c.imageHolder_do = null, c.normalImage_do = null, c.dumy_do = null, c.txt = null, c.htmlContent_str = null, c.htmlText_str = null, c.curStt = null
            }, this.init()
        };
        _.setPrototype = function() {
            _.prototype = new FWDUVPDisplayObject("div")
        }, _.SHOW_TOOL_TIP = "showToolTip", _.HIDE_TOOL_TIP = "hideToolTip", _.MOUSE_UP = "onMouseUp", _.prototype = null, e.FWDUVPPlaylistThumb = _
    }(window),
    function(e) {
        var n = function(e, t, s, o, i) {
            var l = this;
            n.prototype;
            this.buttonRef_do = null, this.bkPath_str = e, this.pointerPath_str = t, this.text_do = null, this.pointer_do = null, this.fontColor_str = s, this.position_str = o, this.id = -1, "bottom" == this.position_str ? (this.pointerWidth = 7, this.pointerHeight = 4) : (this.pointerWidth = 4, this.pointerHeight = 7), this.maxWidth = i, this.showWithDelayId_to, this.isMbl = FWDUVPUtils.isMobile, this.isShowed_bl = !0, this.init = function() {
                l.setOverflow("visible"), l.setupMainContainers(), l.hide(), l.getStyle().background = "url('" + l.bkPath_str + "')", l.getStyle().zIndex = 9999999999999
            }, this.setupMainContainers = function() {
                l.text_do = new FWDUVPDisplayObject("div"), l.text_do.hasTransform3d_bl = !1, l.text_do.hasTransform2d_bl = !1, l.text_do.setBackfaceVisibility(), l.text_do.setDisplay("inline-block"), l.text_do.getStyle().fontFamily = "Arial", l.text_do.getStyle().fontSize = "12px", l.text_do.getStyle().color = l.fontColor_str, l.text_do.getStyle().fontSmoothing = "antialiased", l.text_do.getStyle().webkitFontSmoothing = "antialiased", l.text_do.getStyle().textRendering = "optimizeLegibility", l.text_do.getStyle().lineHeight = "16px", l.text_do.getStyle().padding = "6px", l.text_do.getStyle().paddingTop = "4px", l.text_do.getStyle().paddingBottom = "4px", l.text_do.getStyle().textAlign = "center", l.addChild(l.text_do);
                var e = new Image;
                e.src = l.pointerPath_str, l.pointer_do = new FWDUVPDisplayObject("img"), l.pointer_do.setScreen(e), l.pointer_do.setWidth(l.pointerWidth), l.pointer_do.setHeight(l.pointerHeight), l.addChild(l.pointer_do)
            }, this.setLabel = function(e, t) {
                l.id != t && (l.setVisible(!1), l.text_do.getStyle().whiteSpace = "normal", l.setWidth(l.maxWidth), l.text_do.setInnerHTML(e)), setTimeout(function() {
                    if (null != l) {
                        var e = l.text_do.screen.getBoundingClientRect().width;
                        (e = e < 8 && null != e ? (l.setHeight(Math.round(100 * l.text_do.screen.getBoundingClientRect().height)), Math.round(100 * e)) : (l.setHeight(l.text_do.screen.offsetHeight), Math.round(l.text_do.screen.offsetWidth))) < l.w - 15 && l.setWidth(e), e < l.maxWidth && (l.text_do.getStyle().whiteSpace = "nowrap"), l.positionPointer(), l.id = t
                    }
                }, 60)
            }, this.positionPointer = function(e) {
                var t, s;
                e = e || 0, s = "bottom" == l.position_str ? (t = parseInt((l.w - l.pointerWidth) / 2) + e, l.h) : (t = l.w, parseInt((l.h - l.pointerHeight) / 2)), l.pointer_do.setX(t), l.pointer_do.setY(s)
            }, this.show = function() {
                l.isShowed_bl || (l.isShowed_bl = !0, FWDAnimation.killTweensOf(l), clearTimeout(l.showWithDelayId_to), l.showWithDelayId_to = setTimeout(l.showFinal, 100))
            }, this.showFinal = function() {
                l.setVisible(!0), l.setAlpha(0), FWDAnimation.to(l, .4, {
                    alpha: 1,
                    onComplete: function() {
                        l.setVisible(!0)
                    },
                    ease: Quart.easeOut
                })
            }, this.hide = function() {
                l.isShowed_bl && (clearTimeout(l.showWithDelayId_to), FWDAnimation.killTweensOf(l), l.setVisible(!1), l.isShowed_bl = !1)
            }, this.init()
        };
        n.setPrototype = function() {
            n.prototype = null, n.prototype = new FWDUVPDisplayObject("div", "fixed")
        }, n.CLICK = "onClick", n.MOUSE_DOWN = "onMouseDown", n.prototype = null, e.FWDUVPPlaylistToolTip = n
    }(window),
    function() {
        var v = function(i, e, t, s, o, l, n, a, r, d, u, h, c, _, f, p, m, b, g) {
            var y = this;
            v.prototype;
            this.clsBtn, this.image_do, this.imgSrc = e, this.link = o, this.target = l, this.start = t, this.end = s, this.google_ad_client = r, this.google_ad_slot = d, this.originalW = this.google_ad_width = u, this.originalH = this.google_ad_height = h, this.tracking = c, this.finalW = 0, this.finalH = 0, Boolean(this.google_ad_client) ? this.type = "adsense" : this.imgSrc.match(/.png|.jpg|.jpeg/gi) ? this.type = "image" : this.type = "iframe", this.id = a, this.shwPpoppAdClsBtn = p, this.poppAdClsNPth = _, this.poppAdClsSPth = f, this.isClsd = n, this.isLded = !1, this.isShowed_bl = !1, this.init = function() {
                y.setBkColor("rgba(0, 0, 0, 0.6)"), y.setX(-5e3);
                var e = y.poppAdClsNPth;
                window.isWhite && (e = "content/hex_white/close-button-normal.png"), y.shwPpoppAdClsBtn && (FWDUVPSimpleSizeButton.setPrototype(), y.clsBtn = new FWDUVPSimpleSizeButton(e, y.poppAdClsSPth, 22, 21, m, b, g, !0), y.clsBtn.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, y.closeClickButtonCloseHandler)), "image" == this.type ? (this.image = new Image, this.image.src = this.imgSrc, this.image.onload = this.onLoadHandler) : (y.isLded = !0, y.setWidth(y.originalW), y.setHeight(y.originalH)), y.clsBtn && (y.addChild(y.clsBtn), y.clsBtn.setX(-300)), y.link && y.setButtonMode(!0)
            }, this.closeClickButtonCloseHandler = function() {
                y.hide(), y.isClsd = !0, i.popupAds_ar[y.id].isClosed = !0
            }, this.clickHandler = function() {
                y.link && (i.prt.pause(), window.open(y.link, y.target))
            }, this.onLoadHandler = function() {
                y.originalW = y.image.width, y.originalH = y.image.height, y.image_do = new FWDUVPDisplayObject("img"), y.image_do.setScreen(y.image), y.image_do.setWidth(y.originalW), y.image_do.setHeight(y.originalH), y.addChild(y.image_do), y.isLded = !0, y.clsBtn && (y.addChild(y.clsBtn), y.clsBtn.setX(-300)), y.screen.addEventListener ? y.image_do.screen.addEventListener("click", y.clickHandler) : y.image_do.screen.attachEvent("onclick", y.clickHandler)
            }, this.hide = function(e) {
                if (this.isShowed_bl) {
                    this.isShowed_bl = !1;
                    var t = Math.min(1, i.prt.tempVidStageWidth / y.originalW);
                    parseInt(t * y.originalH);
                    finalY = parseInt(i.prt.tempVidStageHeight), i.setY(finalY), y.setX(-5e3), FWDAnimation.killTweensOf(i), e ? (i.removeChild(y), i.setWidth(0), i.setHeight(0)) : (y.setWidth(0), y.setHeight(0), i.setVisible(!1), y.setVisible(!1))
                }
            }, this.show = function() {
                this.isShowed_bl || this.isClsd || !y.isLded || (this.isShowed_bl = !0, y.setX(0), setTimeout(function() {
                    if (FWDAnimation.killTweensOf(i), i.setVisible(!0), y.setVisible(!0), "adsense" != y.type || y.isGooglAdCreated_bl) "iframe" == y.type && (y.container = new FWDUVPTransformDisplayObject("div"), y.container.setWidth(y.originalW), y.container.setHeight(y.originalH), y.ifr = new FWDUVPTransformDisplayObject("iframe"), y.ifr.screen.scrolling = "no", y.ifr.setWidth(y.originalW), y.ifr.setHeight(y.originalH), y.ifr.screen.src = y.imgSrc, y.container.addChild(y.ifr), y.link && (y.clicker = new FWDUVPDisplayObject("div"), y.clicker.screen.style.width = "100%", y.clicker.screen.style.height = "100%", y.container.addChild(y.clicker), y.container.addChild(y.clicker), y.container.screen.addEventListener("click", y.clickHandler)), y.addChild(y.container), y.clsBtn && (y.addChild(y.clsBtn), y.clsBtn.setX(-300)));
                    else {
                        y.isGooglAdCreated_bl = !0, window.google_ad_client = y.google_ad_client, window.google_ad_slot = y.google_ad_slot, window.google_ad_width = y.originalW, window.google_ad_height = y.originalH, y.container = new FWDUVPTransformDisplayObject("div"), y.container.setWidth(y.originalW), y.container.setHeight(y.originalH), y.addChild(y.container);
                        var t = document.write;
                        document.write = function(e) {
                            y.container.screen.innerHTML = e, document.write = t
                        };
                        var e = document.createElement("script");
                        e.type = "text/javascript", -1 != location.href.indexOf("https") ? e.src = "https://pagead2.googlesyndication.com/pagead/show_ads.js" : e.src = "http://pagead2.googlesyndication.com/pagead/show_ads.js", document.body.appendChild(e), y.clsBtn && (y.addChild(y.clsBtn), y.clsBtn.setX(-300))
                    }
                    var s = Math.min(1, i.prt.tempVidStageWidth / y.originalW),
                        o = parseInt(s * y.originalH) - 2;
                    finalY = i.prt.controller_do.isShowed_bl ? parseInt(i.prt.tempVidStageHeight - i.prt.controller_do.h - y.originalH * s + 2 + o) : parseInt(i.prt.tempVidStageHeight - y.originalH * s + 2 + o), i.setY(finalY), y.resizeAndPosition(!0)
                }, 100))
            }, this.resizeAndPosition = function(e) {
                if (y.isLded && !y.isClsd && y.isShowed_bl) {
                    var t, s;
                    FWDUVPUtils.isIEAndLessThen9;
                    s = Math.min(1, i.prt.tempVidStageWidth / y.originalW), y.finalW = parseInt(s * y.originalW), y.finalH = parseInt(s * y.originalH), y.finalW == y.prevFinalW && y.finalH == y.prevFinalH || (y.setWidth(y.finalW), y.setHeight(y.finalH), "image" == y.type ? (y.image_do.setWidth(y.finalW), y.image_do.setHeight(y.finalH)) : y.container && (y.container.setScale2(s), y.container.setX((y.finalW - y.originalW) / 2), y.container.setY((y.finalH - y.originalH) / 2)), t = i.prt.controller_do ? i.prt.controller_do.isShowed_bl ? parseInt(i.prt.tempVidStageHeight - i.prt.controller_do.h - y.originalH * s - 10) : parseInt(i.prt.tempVidStageHeight - y.originalH * s - 10) : parseInt(i.prt.tempVidStageHeight - y.originalH * s), i.setX(parseInt((i.prt.tempVidStageWidth - y.finalW) / 2)), FWDAnimation.killTweensOf(i), e ? FWDAnimation.to(i, .8, {
                        y: t,
                        ease: Expo.easeInOut
                    }) : i.setY(t), y.clsBtn && (y.clsBtn.setY(5), y.clsBtn.setX(parseInt(y.finalW - 21 - 5))), y.prevFinalW = y.finalW, y.prevFinallH = y.finalH, i.setWidth(y.finalW), i.setHeight(y.finalH))
                }
            }, y.init()
        };
        v.setPrototype = function() {
            v.prototype = new FWDUVPDisplayObject("div", "absolute", "visible")
        }, v.MOUSE_OVER = "onMouseOver", v.MOUSE_OUT = "onMouseOut", v.CLICK = "onClick", v.prototype = null, window.FWDUVPPopupAddButton = v
    }(window),
    function(e) {
        var s = function(o, e, t) {
            var i = this;
            s.prototype;
            this.img_img = new Image, this.img_do = null, this.imgW = 0, this.imgH = 0, this.finalW = 0, this.finalH = 0, this.finalX = 0, this.finalY = 0, this.curPath_str, this.posterBackgroundColor_str = t, this.isTransparent_bl = !1, this.showPoster_bl = e, this.showOrLoadOnMobile_bl = !1, this.isShowed_bl = !0, this.allowToShow_bl = !0, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                i.img_img = new Image, i.img_do = new FWDUVPDisplayObject("img"), i.hide()
            }, this.positionAndResize = function() {
                if (o.vidStageWidth && (i.setWidth(o.tempVidStageWidth), i.setHeight(o.tempVidStageHeight), i.imgW)) {
                    var e, t = o.tempVidStageWidth / i.imgW,
                        s = o.tempVidStageHeight / i.imgH;
                    e = t <= s ? t : s, o.data.fillEntireposterScreen_bl && (e = s <= t ? t : s), i.finalW = Math.round(e * i.imgW), i.finalH = Math.round(e * i.imgH), i.finalX = parseInt((o.tempVidStageWidth - i.finalW) / 2), i.finalY = parseInt((o.tempVidStageHeight - i.finalH) / 2), i.img_do.setX(i.finalX), i.img_do.setY(i.finalY), i.img_do.setWidth(i.finalW), i.img_do.setHeight(i.finalH)
                }
            }, this.setPoster = function(e) {
                if (i.id != o.id && e) {
                    if (i.id = o.id, e && "" == FWDUVPUtils.trim(e) || "none" == e) return i.showOrLoadOnMobile_bl = !0, i.isTransparent_bl = !0, void i.show();
                    if ("youtubemobile" == e) return i.isTransparent_bl = !1, i.showOrLoadOnMobile_bl = !1, i.img_img.src = null, void(i.imgW = 0);
                    e == i.curPath_str ? (i.isTransparent_bl = !1, i.showOrLoadOnMobile_bl = !0) : i.isTransparent_bl = !1, i.isTransparent_bl ? i.getStyle().backgroundColor = "transparent" : i.getStyle().backgroundColor = i.posterBackgroundColor_str, i.isTransparent_bl = !1, i.showOrLoadOnMobile_bl = !0, i.curPath_str = e, i.allowToShow_bl && (i.isShowed_bl = !1);
                    try {
                        i.removeChild(i.img_do)
                    } catch (e) {}
                    i.img_img = new Image, i.img_img.onload = i.posterLoadHandler, i.img_img.src = i.curPath_str
                }
            }, this.posterLoadHandler = function(e) {
                i.imgW = i.img_img.width, i.imgH = i.img_img.height, i.img_do.setScreen(i.img_img), i.addChild(i.img_do), i.positionAndResize(), i.isShowed_bl && i.show()
            }, this.show = function(e) {
                i.allowToShow_bl && !i.isShowed_bl && i.showOrLoadOnMobile_bl && (i.isShowed_bl = !0, i.isTransparent_bl ? 0 != i.alpha && i.setAlpha(0) : 1 != i.alpha && i.setAlpha(1), i.setVisible(!0), i.isMbl || i.isTransparent_bl || (FWDAnimation.killTweensOf(i), i.setAlpha(0), FWDAnimation.to(i, .6, {
                    alpha: 1,
                    delay: .4
                })), i.positionAndResize())
            }, this.hide = function(e) {
                (i.isShowed_bl || e) && (FWDAnimation.killTweensOf(i), i.isShowed_bl = !1, i.setVisible(!1))
            }, this.init()
        };
        s.setPrototype = function() {
            s.prototype = new FWDUVPDisplayObject("div")
        }, s.prototype = null, e.FWDUVPPoster = s
    }(window),
    function(e) {
        var r = function(e, t, s, o, i, l, n) {
            var a = this;
            r.prototype;
            a.main_do, a.preloaderPostion = t, a.backgroundColor = o, a.fillColor = i, a.radius = s, a.strokeSize = l, this.animDuration = n || 300, this.strtAngle = 270, this.countAnimation = 0, this.isShowed_bl = !0, this.slideshowAngle = {
                n: 0
            }, this.init = function() {
                a.main_do = new FWDUVPDisplayObject("div"), a.main_do.setOverflow("visible"), a.main_do.setWidth(2 * a.radius + a.strokeSize), a.main_do.setHeight(2 * a.radius + a.strokeSize), a.addChild(a.main_do), a.setOverflow("visible"), a.setWidth(2 * a.radius + a.strokeSize), a.setHeight(2 * a.radius + a.strokeSize), this.bkCanvas = new FWDUVPDisplayObject("canvas"), this.bkCanvasContext = this.bkCanvas.screen.getContext("2d"), this.fillCircleCanvas = new FWDUVPDisplayObject("canvas"), this.fillCircleCanvasContext = this.fillCircleCanvas.screen.getContext("2d"), a.main_do.screen.style.transformOrigin = "50% 50%", a.main_do.addChild(this.bkCanvas), a.main_do.addChild(this.fillCircleCanvas), a.drawBackground(), a.drawFill(), a.hide()
            }, this.positionAndResize = function() {
                "bottomleft" == a.preloaderPostion ? (a.setX(e.offsetPreloader), a.setY(e.sH - a.h - e.offsetPreloader)) : "bottomright" == a.preloaderPostion ? (a.setX(e.sW - a.w - e.offsetPreloader), a.setY(e.sH - a.h - e.offsetPreloader)) : "topright" == a.preloaderPostion ? (a.setX(e.sW - a.w - e.offsetPreloader), a.setY(e.offsetPreloader)) : "topleft" == a.preloaderPostion ? (a.setX(e.offsetPreloader), a.setY(e.offsetPreloader)) : "center" == a.preloaderPostion && (a.setX(Math.round(e.sW - a.w) / 2), a.setY(Math.round(Math.min(e.sH, e.viewportSize.h) - a.h) / 2))
            }, this.drawBackground = function() {
                this.bkCanvas.screen.width = 2 * this.radius + 2 * a.strokeSize, this.bkCanvas.screen.height = 2 * this.radius + 2 * a.strokeSize, this.bkCanvasContext.lineWidth = this.thicknessSize, this.bkCanvasContext.translate(a.strokeSize / 2, a.strokeSize / 2), this.bkCanvasContext.shadowColor = "#333333", this.bkCanvasContext.shadowBlur = 1, this.bkCanvasContext.lineWidth = a.strokeSize, this.bkCanvasContext.strokeStyle = this.backgroundColor, this.bkCanvasContext.beginPath(), this.bkCanvasContext.arc(this.radius, this.radius, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, !1), this.bkCanvasContext.stroke(), this.bkCanvasContext.closePath()
            }, this.drawFill = function() {
                a.fillCircleCanvas.screen.width = 2 * a.radius + 2 * a.strokeSize, a.fillCircleCanvas.screen.height = 2 * a.radius + 2 * a.strokeSize, a.fillCircleCanvasContext.lineWidth = a.thicknessSize, a.fillCircleCanvasContext.translate(a.strokeSize / 2, a.strokeSize / 2), a.fillCircleCanvasContext.lineWidth = a.strokeSize, a.fillCircleCanvasContext.strokeStyle = a.fillColor, a.fillCircleCanvasContext.beginPath(), a.fillCircleCanvasContext.arc(a.radius, a.radius, a.radius, Math.PI / 180 * a.strtAngle, Math.PI / 180 * (a.strtAngle + a.slideshowAngle.n), !1), a.fillCircleCanvasContext.stroke(), a.fillCircleCanvasContext.closePath()
            }, this.startSlideshow = function() {
                null != a && (FWDAnimation.killTweensOf(a.slideshowAngle), FWDAnimation.to(a.slideshowAngle, a.animDuration, {
                    n: 360,
                    onUpdate: a.drawFill,
                    onComplete: a.stopSlideshow
                }))
            }, this.stopSlideshow = function() {
                FWDAnimation.killTweensOf(a.slideshowAngle), FWDAnimation.to(a.slideshowAngle, .8, {
                    n: 0,
                    onupdate: a.drawFill,
                    onUpdate: a.drawFill,
                    ease: Expo.easiInOut
                })
            }, this.startPreloader = function() {
                a.stopPreloader(), a.slideshowAngle = {
                    n: 0
                }, FWDAnimation.to(a.slideshowAngle, a.animDuration, {
                    n: 360,
                    onUpdate: a.drawFill,
                    repeat: 100,
                    yoyo: !0,
                    ease: Expo.easInOut
                }), FWDAnimation.to(a.main_do.screen, a.animDuration, {
                    rotation: 360,
                    repeat: 100
                })
            }, this.stopPreloader = function() {
                FWDAnimation.killTweensOf(a.slideshowAngle), FWDAnimation.killTweensOf(a.main_do.screen), FWDAnimation.to(a.main_do.screen, 1e-5, {
                    rotation: 0
                })
            }, this.show = function() {
                a.isShowed_bl || (a.setVisible(!0), FWDAnimation.killTweensOf(a), FWDAnimation.to(a, 1, {
                    alpha: 1,
                    delay: .2
                }), a.stopPreloader(), a.startPreloader(), a.isShowed_bl = !0)
            }, this.hide = function(e) {
                a.isShowed_bl && (FWDAnimation.killTweensOf(this), e ? FWDAnimation.to(this, .2, {
                    alpha: 0,
                    onComplete: a.onHideComplete
                }) : (a.setVisible(!1), a.setAlpha(0)), a.isShowed_bl = !1)
            }, this.onHideComplete = function() {
                a.setVisible(!1), a.stopPreloader(), a.dispatchEvent(r.HIDE_COMPLETE)
            }, this.init()
        };
        r.setPrototype = function() {
            r.prototype = new FWDUVPDisplayObject("div")
        }, r.HIDE_COMPLETE = "hideComplete", r.prototype = null, e.FWDUVPPreloader = r
    }(window),
    function(e) {
        var n = function(e, t, s, o, i) {
            var l = this;
            n.prototype;
            this.imageSource_img = e, this.image_sdo = null, this.segmentWidth = t, this.segmentHeight = s, this.totalSegments = o, this.animDelay = i || 300, this.count = 0, this.delayTimerId_int, this.isShowed_bl = !1, this.init = function() {
                l.setWidth(l.segmentWidth), l.setHeight(l.segmentHeight), l.image_sdo = new FWDUVPDisplayObject("img"), l.image_sdo.setScreen(l.imageSource_img), l.addChild(l.image_sdo), l.hide(!1)
            }, this.start = function() {
                null != l && (clearInterval(l.delayTimerId_int), l.delayTimerId_int = setInterval(l.updatePreloader, l.animDelay))
            }, this.stop = function() {
                clearInterval(l.delayTimerId_int)
            }, this.updatePreloader = function() {
                if (null != l) {
                    l.count++, l.count > l.totalSegments - 1 && (l.count = 0);
                    var e = l.count * l.segmentWidth;
                    l.image_sdo.setX(-e)
                }
            }, this.show = function() {
                l.isShowed_bl || (l.setVisible(!0), l.start(), FWDAnimation.killTweensOf(l), FWDAnimation.to(l, 1, {
                    alpha: 1,
                    delay: .2
                }), l.isShowed_bl = !0)
            }, this.hide = function(e) {
                l.isShowed_bl && (FWDAnimation.killTweensOf(this), e ? FWDAnimation.to(this, 1, {
                    alpha: 0,
                    onComplete: l.onHideComplete
                }) : (l.setVisible(!1), l.setAlpha(0)), l.isShowed_bl = !1)
            }, this.onHideComplete = function() {
                l.setVisible(!1), l.stop(), l.dispatchEvent(n.HIDE_COMPLETE)
            }, this.init()
        };
        n.setPrototype = function() {
            n.prototype = new FWDUVPDisplayObject("div")
        }, n.HIDE_COMPLETE = "hideComplete", n.prototype = null, e.FWDUVPPreloader2 = n
    }(window),
    function(e) {
        var t = function(e, i) {
            var l = this;
            t.prototype;
            this.prt = e, this.main_do = null, this.reader = null, this.subtitiles_ar = null, this.totalAds = 0, l.popupAds_ar, l.popupAdsButtons_ar, this.hasText_bl = !1, this.isLded = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.showSubByDflt = i.showSubByDflt, l.nBC = i.nBC, l.sBC = i.sBC, this.setSizeOnce_bl = !1, l.init = function() {
                -1 != i.sknPth.indexOf("hex_white") && (l.sBC = "#FFFFFF"), l.setOverflow("visible"), l.getStyle().cursor = "default", l.setVisible(!1)
            }, this.resetPopups = function(e, t) {
                if (l.id != t) {
                    var s;
                    l.hideAllPopupButtons(!0), l.popupAds_ar = e, l.totalAds = l.popupAds_ar.length, l.popupAdsButtons_ar = [];
                    for (var o = 0; o < l.totalAds; o++) FWDUVPPopupAddButton.setPrototype(), s = new FWDUVPPopupAddButton(l, l.popupAds_ar[o].source, l.popupAds_ar[o].timeStart, l.popupAds_ar[o].timeEnd, l.popupAds_ar[o].link, l.popupAds_ar[o].trget, l.popupAds_ar[o].isClosed, o, l.popupAds_ar[o].google_ad_client, l.popupAds_ar[o].google_ad_slot, l.popupAds_ar[o].google_ad_width, l.popupAds_ar[o].google_ad_height, l.popupAds_ar[o].tracking, i.poppAdClsNPth, i.poppAdClsSPth, i.shwPpoppAdClsBtn, i.useHEX, l.nBC, l.sBC), l.popupAdsButtons_ar[o] = s, l.addChild(s)
                }
            }, this.update = function(e) {
                if (0 != l.totalAds)
                    for (var t, s = 0; s < l.totalAds; s++) t = l.popupAdsButtons_ar[s], l.curAdId = s, e >= t.start && e < t.end ? t.show() : t.hide()
            }, this.position = function(e) {
                if (0 != l.totalAds)
                    for (var t = 0; t < l.totalAds; t++) l.popupAdsButtons_ar[t].resizeAndPosition(e)
            }, this.hideAllPopupButtons = function(e) {
                if (0 != l.totalAds) {
                    for (var t = 0; t < l.totalAds; t++) l.popupAdsButtons_ar[t].hide(e);
                    e && (l.popupAdsButtons_ar = null, l.totalAds = 0), l.id = -1
                }
            }, this.resetId = function() {
                l.id = -1
            }, l.init()
        };
        t.setPrototype = function() {
            t.prototype = new FWDUVPDisplayObject("div")
        }, t.LOAD_ERROR = "error", t.LOAD_COMPLETE = "complete", t.prototype = null, e.FWDUVPPupupAds = t
    }(window),
    function(e) {
        var n = function(e, t, s, o, i) {
            var l = this;
            n.prototype;
            this.buttonRef_do = e, this.bkColor = t, this.text_do = null, this.pointer_do = null, this.fontColor_str = s, this.toolTipLabel_str = o, this.toolTipsButtonsHideDelay = 1e3 * i, this.pointerWidth = 7, this.pointerHeight = 4, this.showWithDelayId_to, this.isMbl = FWDUVPUtils.isMobile, this.isShowed_bl = !0, this.init = function() {
                l.setOverflow("visible"), l.screen.className = "UVP-tooltip-bk", l.setupMainContainers(), l.setLabel(o), l.hide(), l.setVisible(!1), l.getStyle().backgroundColor = l.bkColor, l.getStyle().zIndex = 9999999999999, l.getStyle().pointerEvents = "none"
            }, this.setupMainContainers = function() {
                l.pointerHolder_do = new FWDUVPDisplayObject("div"), l.pointerHolder_do.setOverflow("visible"), l.addChild(l.pointerHolder_do), l.text_do = new FWDUVPDisplayObject("div"), l.text_do.screen.className = "UVP-tooltip-text", l.text_do.hasTransform3d_bl = !1, l.text_do.hasTransform2d_bl = !1, l.text_do.setBackfaceVisibility(), l.text_do.setDisplay("inline-block"), l.text_do.getStyle().fontFamily = "Arial", l.text_do.getStyle().fontSize = "12px", l.text_do.getStyle().color = l.fontColor_str, l.text_do.getStyle().whiteSpace = "nowrap", l.text_do.getStyle().fontSmoothing = "antialiased", l.text_do.getStyle().webkitFontSmoothing = "antialiased", l.text_do.getStyle().textRendering = "optimizeLegibility", l.text_do.getStyle().padding = "6px", l.text_do.getStyle().paddingTop = "4px", l.text_do.getStyle().paddingBottom = "4px", l.addChild(l.text_do), l.pointer_do = new FWDUVPDisplayObject("div"), l.pointer_do.screen.className = "UVP-scrubber-pointer", l.pointer_do.setBkColor(l.bkColor), l.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + l.bkColor + ";", l.pointerHolder_do.addChild(l.pointer_do)
            }, this.setLabel = function(e) {
                void 0 !== e && (l.text_do.setInnerHTML(e), setTimeout(function() {
                    null != l && (l.setWidth(l.text_do.getWidth()), l.setHeight(l.text_do.getHeight()), l.positionPointer())
                }, 20))
            }, this.positionPointer = function(e) {
                var t, s;
                e = e || 0, t = parseInt((l.w - 8) / 2) + e, s = l.h, l.pointerHolder_do.setX(t), l.pointerHolder_do.setY(s)
            }, this.show = function() {
                l.isShowed_bl = !0, clearTimeout(l.hideWithDelayId_to), FWDAnimation.killTweensOf(l), clearTimeout(l.showWithDelayId_to), l.showWithDelayId_to = setTimeout(l.showFinal, l.toolTipsButtonsHideDelay)
            }, this.showFinal = function() {
                l.setVisible(!0), FWDAnimation.to(l, .4, {
                    alpha: 1,
                    onComplete: function() {
                        l.setVisible(!0)
                    },
                    ease: Quart.easeOut
                })
            }, this.hide = function() {
                l.isShowed_bl && (clearTimeout(l.showWithDelayId_to), clearTimeout(l.hideWithDelayId_to), l.hideWithDelayId_to = setTimeout(function() {
                    FWDAnimation.killTweensOf(l), l.setVisible(!1), l.isShowed_bl = !1, l.setAlpha(0)
                }, 100))
            }, this.init()
        };
        n.setPrototype = function() {
            n.prototype = null, n.prototype = new FWDUVPDisplayObject("div")
        }, n.CLICK = "onClick", n.MOUSE_DOWN = "onMouseDown", n.prototype = null, e.FWDUVPScrubberToolip = n
    }(window),
    function(o) {
        var e = function(s, t) {
            var f = this;
            e.prototype;
            this.embedColoseN_img = s.embedColoseN_img, this.bk_do = null, this.mainHld = null, this.clsBtn = null, this.btns_ar = [], this.embedWindowBackground_str = s.embedWindowBackground_str, this.embedWindowCloseButtonMargins = s.embedWindowCloseButtonMargins, this.totalWidth = 0, this.sW = 0, this.sH = 0, this.minMrgXSpc = 20, this.hSpace = 20, this.minHSpace = 10, this.vSpace = 15, this.isShowed_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.useVectorIcons_bl = s.useVectorIcons_bl, this.init = function() {
                this.setupButtons()
            }, this.stpInit = function() {
                if (!f.clsBtn) {
                    var e = s.sBC;
                    o.isWhite && (e = "#000000"), f.setBackfaceVisibility(), f.mainHld = new FWDUVPDisplayObject("div"), f.mainHld.hasTransform3d_bl = !1, f.mainHld.hasTransform2d_bl = !1, f.mainHld.setBackfaceVisibility(), f.bk_do = new FWDUVPDisplayObject("div"), f.bk_do.getStyle().width = "100%", f.bk_do.getStyle().height = "100%", f.bk_do.setAlpha(.9);
                    var t = f.embedWindowBackground_str;
                    o.isWhite && (t = "content/hex_white/embed-window-background.png"), f.bk_do.getStyle().background = "url('" + t + "')", f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.clsBtn = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<div class='table-fwduvp-button'><span class='table-cell-fwduvp-button fwdicon-close'></span></div>", void 0, "UVPCloseButtonNormalState", "UVPCloseButtonSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.clsBtn = new FWDUVPSimpleButton(s.shareClooseN_img, s.embedWindowClosePathS_str, void 0, !0, s.useHEX, s.nBC, e, !1, !1, !1, !1, !0)), f.clsBtn.addListener(FWDUVPSimpleButton.MOUSE_UP, f.closeButtonOnMouseUpHandler), f.addChild(f.mainHld), f.mainHld.addChild(f.bk_do), f.mainHld.addChild(f.clsBtn)
                }
            }, this.closeButtonOnMouseUpHandler = function() {
                f.isShowed_bl && f.hide()
            }, this.positionAndResize = function() {
                f.sW = t.sW, f.sH = t.sH, f.clsBtn.setX(f.sW - f.clsBtn.w - f.embedWindowCloseButtonMargins), f.clsBtn.setY(f.embedWindowCloseButtonMargins), f.setWidth(f.sW), f.setHeight(f.sH), f.mainHld.setWidth(f.sW), f.mainHld.setHeight(f.sH), f.positionButtons()
            }, this.setupButtons = function() {
                if (!f.btsCrted) {
                    this.stpInit(), f.btsCrted = !0;
                    var e = s.sBC;
                    o.isWhite && (e = "#000000"), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.facebookButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-facebook'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.facebookButton_do = new FWDUVPSimpleButton(s.facebookN_img, s.facebookSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.facebookButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.facebookOnMouseUpHandler), this.btns_ar.push(f.facebookButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.googleButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-google-plus'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.googleButton_do = new FWDUVPSimpleButton(s.googleN_img, s.googleSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.googleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.googleOnMouseUpHandler), this.btns_ar.push(f.googleButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.twitterButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-twitter'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.twitterButton_do = new FWDUVPSimpleButton(s.twitterN_img, s.twitterSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.twitterButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.twitterOnMouseUpHandler), this.btns_ar.push(f.twitterButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.likedinButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-linkedin'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.likedinButton_do = new FWDUVPSimpleButton(s.likedInkN_img, s.likedInSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.likedinButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.likedinOnMouseUpHandler), this.btns_ar.push(f.likedinButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.bufferButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-comments'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.bufferButton_do = new FWDUVPSimpleButton(s.bufferkN_img, s.bufferSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.bufferButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.bufferOnMouseUpHandler), this.btns_ar.push(f.bufferButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.diggButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-digg'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.diggButton_do = new FWDUVPSimpleButton(s.diggN_img, s.diggSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.diggButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.diggOnMouseUpHandler), this.btns_ar.push(f.diggButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.redditButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-reddit'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.redditButton_do = new FWDUVPSimpleButton(s.redditN_img, s.redditSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.redditButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.redditOnMouseUpHandler), this.btns_ar.push(f.redditButton_do), f.useVectorIcons_bl ? (FWDUVPSimpleButton.setPrototype(), f.thumbrlButton_do = new FWDUVPSimpleButton(void 0, void 0, void 0, !0, void 0, void 0, void 0, "<span class='uvpicon fwdicon-tumblr'></span>", void 0, "UVPSocialMediaButtonsNormalState", "UVPSocialMediaButtonsSelectedState")) : (FWDUVPSimpleButton.setPrototype(), f.thumbrlButton_do = new FWDUVPSimpleButton(s.thumbrlN_img, s.thumbrlSPath_str, void 0, !0, s.useHEX, s.nBC, e)), f.thumbrlButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, f.thumbrlOnMouseUpHandler), this.btns_ar.push(f.thumbrlButton_do), f.mainHld.addChild(f.facebookButton_do), f.mainHld.addChild(f.googleButton_do), f.mainHld.addChild(f.twitterButton_do), f.mainHld.addChild(f.likedinButton_do), f.mainHld.addChild(f.bufferButton_do), f.mainHld.addChild(f.diggButton_do), f.mainHld.addChild(f.redditButton_do), f.mainHld.addChild(f.thumbrlButton_do)
                }
            }, this.facebookOnMouseUpHandler = function() {
                var e = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.googleOnMouseUpHandler = function() {
                var e = "https://plus.google.com/share?url=" + encodeURIComponent(location.href);
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.twitterOnMouseUpHandler = function() {
                var e = "http://twitter.com/home?status=" + encodeURIComponent(location.href);
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.likedinOnMouseUpHandler = function() {
                var e = "https://www.linkedin.com/cws/share?url=" + location.href;
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.bufferOnMouseUpHandler = function() {
                var e = "https://buffer.com/add?url=" + location.href;
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.diggOnMouseUpHandler = function() {
                var e = "http://digg.com/submit?url=" + location.href;
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.redditOnMouseUpHandler = function() {
                var e = "https://www.reddit.com/?submit=" + location.href;
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.thumbrlOnMouseUpHandler = function() {
                var e = "http://www.tumblr.com/share/link?url=" + location.href;
                o.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
            }, this.positionButtons = function() {
                var e, t, s, o = [],
                    i = [],
                    l = [],
                    n = 0,
                    a = 0,
                    r = 0;
                o[r] = [0], i[r] = f.btns_ar[0].totalWidth, l[r] = f.btns_ar[0].totalWidth, f.totalButtons = f.btns_ar.length;
                for (var d = 1; d < f.totalButtons; d++) e = f.btns_ar[d], i[r] + e.totalWidth + f.minHSpace > f.sW - f.minMrgXSpc ? (o[++r] = [], o[r].push(d), i[r] = e.totalWidth, l[r] = e.totalWidth) : (o[r].push(d), i[r] += e.totalWidth + f.minHSpace, l[r] += e.totalWidth);
                n = parseInt((f.sH - ((r + 1) * (e.totalHeight + f.vSpace) - f.vSpace)) / 2);
                for (d = 0; d < r + 1; d++) {
                    var u, h = 0;
                    if (1 < o[d].length) {
                        u = Math.min((f.sW - f.minMrgXSpc - l[d]) / (o[d].length - 1), f.hSpace);
                        var c = l[d] + u * (o[d].length - 1);
                        h = parseInt((f.sW - c) / 2)
                    } else h = parseInt((f.sW - i[d]) / 2);
                    0 < d && (n += e.h + f.vSpace);
                    for (var _ = 0; _ < o[d].length; _++) e = f.btns_ar[o[d][_]], s = 0 == _ ? h : (t = f.btns_ar[o[d][_] - 1]).finalX + t.totalWidth + u, e.finalX = s, e.finalY = n, a < e.finalY && (a = e.finalY), f.buttonsBarTotalHeight = a + e.totalHeight + f.startY, e.setX(e.finalX), e.setY(e.finalY)
                }
            }, this.show = function(e) {
                f.isShowed_bl || (f.isShowed_bl = !0, t.main_do.addChild(f), f.init(), f.useVectorIcons_bl ? f.checkButtonsId_to = setInterval(function() {
                    0 != f.clsBtn.w && (f.positionAndResize(), clearInterval(f.checkButtonsId_to), clearTimeout(f.hideCompleteId_to), clearTimeout(f.showCompleteId_to), f.mainHld.setY(-f.sH), f.showCompleteId_to = setTimeout(f.showCompleteHandler, 900), FWDAnimation.to(f.mainHld, .8, {
                        y: 0,
                        delay: .1,
                        ease: Expo.easeInOut
                    }))
                }, 50) : (f.positionAndResize(), clearTimeout(f.hideCompleteId_to), clearTimeout(f.showCompleteId_to), f.mainHld.setY(-f.sH), f.showCompleteId_to = setTimeout(f.showCompleteHandler, 900), setTimeout(function() {
                    FWDAnimation.to(f.mainHld, .8, {
                        y: 0,
                        delay: .1,
                        ease: Expo.easeInOut
                    })
                }, 100)))
            }, this.showCompleteHandler = function() {}, this.hide = function() {
                f.isShowed_bl && (f.isShowed_bl = !1, (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && t.main_do.setSelectable(!1), t.customContextMenu_do && t.customContextMenu_do.enable(), f.positionAndResize(), clearTimeout(f.hideCompleteId_to), clearTimeout(f.showCompleteId_to), f.hideCompleteId_to = setTimeout(f.hideCompleteHandler, 800), FWDAnimation.killTweensOf(f.mainHld), FWDAnimation.to(f.mainHld, .8, {
                    y: -f.sH,
                    ease: Expo.easeInOut
                }))
            }, this.hideCompleteHandler = function() {
                t.main_do.removeChild(f), f.dispatchEvent(e.HIDE_COMPLETE)
            }, s.useHEX && f.init()
        };
        e.setPrototype = function() {
            e.prototype = new FWDUVPDisplayObject("div")
        }, e.HIDE_COMPLETE = "hideComplete", e.prototype = null, o.FWDUVPShareWindow = e
    }(window),
    function(e) {
        var _ = function(e, t, s, o, i, l, n, a, r, d, u, h) {
            var c = this;
            _.prototype;
            this.iconCSSString = a, this.showHDIcon = r, this.nImg = e, this.sPath_str = t, this.dPath_str = s, c.testButton = Boolean(-1 != String(c.iconCSSString).indexOf("download")), this.n_do, this.s_sdo, this.d_sdo, this.showOver = h, i || (this.showOver = !1), this.toolTipLabel_str, this.nImg && (this.totalWidth = this.nImg.width, this.totalHeight = this.nImg.height, c.buttonWidth = c.totalWidth, c.buttonHeight = c.totalHeight), this.normalCalssName = d, this.selectedCalssName = u, this.useHEX = i, this.nBC = l, this.sBC = n, this.isShowed_bl = !0, this.isSetToDisabledState_bl = !1, this.isDisabled_bl = !1, this.isDisabledForGood_bl = !1, this.isSelectedFinal_bl = !1, this.isActive_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !c.isMbl || c.hasPointerEvent_bl || o, this.useFontAwesome_bl = Boolean(this.iconCSSString), c.init = function() {
                c.iconCSSString && c.setOverflow("visible"), c.setupMainContainers(), c.setNormalState()
            }, c.setupMainContainers = function() {
                if (c.useFontAwesome_bl) {
                    if (c.setOverflow("visible"), c.n_do = new FWDUVPTransformDisplayObject("div"), c.n_do.setInnerHTML(c.iconCSSString), c.addChild(c.n_do), c.showHDIcon) {
                        var e = new Image;
                        e.src = r, c.hd_do = new FWDUVPDisplayObject("img"), c.hd_do.setScreen(e), c.hd_do.setWidth(7), c.hd_do.setHeight(5), c.setOverflow("visible"), c.addChild(c.hd_do)
                    }
                    c.setFinalSize()
                } else if (c.useHEX && !c.showOver ? (c.n_do = new FWDUVPTransformDisplayObject("div"), c.n_do.setWidth(c.totalWidth), c.n_do.setHeight(c.totalHeight), c.n_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.nImg, c.nBC).canvas, c.n_do.screen.appendChild(c.n_do_canvas)) : (c.n_do = new FWDUVPTransformDisplayObject("img"), c.n_do.setScreen(c.nImg)), c.addChild(c.n_do), c.allowToCreateSecondButton_bl) {
                    c.img1 = new Image, c.img1.src = c.sPath_str;
                    var t = new Image;
                    if (c.sImg = t, c.useHEX) {
                        c.s_sdo = new FWDUVPTransformDisplayObject("div"), c.s_sdo.setWidth(c.totalWidth), c.s_sdo.setHeight(c.totalHeight);
                        var s = c.sBC;
                        c.showOver && (s = c.nBC), c.img1.onload = function() {
                            c.s_sdo_canvas = FWDUVPUtils.getCanvasWithModifiedColor(c.img1, s).canvas, c.s_sdo.screen.appendChild(c.s_sdo_canvas)
                        }, c.showOver || c.s_sdo.setAlpha(0), c.addChild(c.s_sdo)
                    } else c.s_sdo = new FWDUVPDisplayObject("img"), c.s_sdo.setScreen(c.img1), c.s_sdo.setWidth(c.totalWidth), c.s_sdo.setHeight(c.totalHeight), c.useHEX || c.s_sdo.setAlpha(0), c.addChild(c.s_sdo);
                    c.dPath_str && (t.src = c.dPath_str, c.d_sdo = new FWDUVPDisplayObject("img"), c.d_sdo.setScreen(t), c.d_sdo.setWidth(c.totalWidth), c.d_sdo.setHeight(c.totalHeight), c.d_sdo.setX(-100), c.addChild(c.d_sdo)), c.setWidth(c.totalWidth), c.setHeight(c.totalHeight)
                }
                c.setButtonMode(!0), c.screen.style.yellowOverlayPointerEvents = "none", c.hasPointerEvent_bl ? (c.screen.addEventListener("pointerup", c.onMouseUp), c.screen.addEventListener("pointerover", c.onMouseOver), c.screen.addEventListener("pointerout", c.onMouseOut)) : c.screen.addEventListener && (c.isMbl || (c.screen.addEventListener("mouseover", c.onMouseOver), c.screen.addEventListener("mouseout", c.onMouseOut), c.screen.addEventListener("mouseup", c.onMouseUp)), c.screen.addEventListener("touchend", c.onMouseUp))
            }, c.onMouseOver = function(e) {
                if (c.dispatchEvent(_.SHOW_TOOLTIP, {
                        e: e
                    }), !(c.isDisabledForGood_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType)) {
                    if (c.isDisabled_bl || c.isSelectedFinal_bl) return;
                    c.dispatchEvent(_.MOUSE_OVER, {
                        e: e
                    }), c.setSelectedState(!0)
                }
            }, c.onMouseOut = function(e) {
                if (!(c.isDisabledForGood_bl || e.pointerType && e.pointerType != e.MSPOINTER_TYPE_MOUSE && "mouse" != e.pointerType)) {
                    if (c.isDisabled_bl || c.isSelectedFinal_bl) return;
                    c.dispatchEvent(_.MOUSE_OUT, {
                        e: e
                    }), c.setNormalState(!0)
                }
            }, c.onMouseUp = function(e) {
                c.isDisabledForGood_bl || (e.preventDefault && e.preventDefault(), c.isDisabled_bl || 2 == e.button || c.dispatchEvent(_.MOUSE_UP, {
                    e: e
                }))
            }, c.checkCount = 0, this.setFinalSize = function(e) {
                e && (c.checkCount = 0), clearInterval(c.checkId_int), 6 < c.checkCount || (c.lastWidth = c.n_do.screen.firstChild.offsetWidth, c.checkCount += 1, c.checkId_int = setInterval(function() {
                    c.setFinalSize()
                }, 100), c.prevWidth != c.lastWidth && 0 != c.lastWidth && (c.setWidth(c.n_do.screen.firstChild.offsetWidth), c.setHeight(c.n_do.screen.firstChild.offsetHeight), c.n_do.setWidth(c.w), c.n_do.setHeight(c.h), c.buttonWidth = c.w, c.buttonHeight = c.h, c.totalWidth = c.w, c.totalHeight = c.h, c.hd_do && (c.hd_do.setX(c.w - c.hd_do.w + 2), c.hd_do.setY(-2)), c.prevWidth = c.lastWidth))
            }, c.setSelected = function() {
                c.isSelectedFinal_bl = !0, c.s_sdo && (FWDAnimation.killTweensOf(c.s_sdo), FWDAnimation.to(c.s_sdo, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }))
            }, c.setUnselected = function() {
                c.isSelectedFinal_bl = !1, c.s_sdo && FWDAnimation.to(c.s_sdo, .8, {
                    alpha: 0,
                    delay: .1,
                    ease: Expo.easeOut
                })
            }, this.setNormalState = function(e) {
                c.doNotallowToSetNormal || (c.useFontAwesome_bl ? (FWDAnimation.killTweensOf(c.n_do.screen), e ? FWDAnimation.to(c.n_do.screen, .6, {
                    className: c.normalCalssName,
                    ease: Quart.easeOut
                }) : c.n_do.screen.className = c.normalCalssName) : c.showOver ? (FWDAnimation.killTweensOf(c.s_sdo), FWDAnimation.to(c.s_sdo, .6, {
                    alpha: 1,
                    ease: Quart.easeOut
                })) : (FWDAnimation.killTweensOf(c.s_sdo), FWDAnimation.to(c.s_sdo, .6, {
                    alpha: 0,
                    ease: Quart.easeOut
                })))
            }, this.setSelectedState = function(e) {
                c.useFontAwesome_bl ? (FWDAnimation.killTweensOf(c.n_do.screen), e ? FWDAnimation.to(c.n_do.screen, .6, {
                    className: c.selectedCalssName,
                    ease: Quart.easeOut
                }) : c.n_do.screen.className = c.selectedCalssName) : c.showOver ? (FWDAnimation.killTweensOf(c.s_sdo), FWDAnimation.to(c.s_sdo, .6, {
                    alpha: 0,
                    ease: Quart.easeOut
                })) : (FWDAnimation.killTweensOf(c.s_sdo), FWDAnimation.to(c.s_sdo, .6, {
                    alpha: 1,
                    delay: .1,
                    ease: Quart.easeOut
                }))
            }, this.setDisabledState = function() {
                c.isSetToDisabledState_bl || (c.isSetToDisabledState_bl = !0, c.d_sdo && c.d_sdo.setX(0), c.hd_do && c.hd_do.setX(c.w - c.hd_do.w))
            }, this.setEnabledState = function() {
                c.isSetToDisabledState_bl && (c.isSetToDisabledState_bl = !1, c.d_sdo && c.d_sdo.setX(-100), c.hd_do && c.hd_do.setX(-1e5))
            }, this.disable = function() {
                c.isDisabledForGood_bl || c.isDisabled_bl || (c.isDisabled_bl = !0, c.setButtonMode(!1), FWDAnimation.killTweensOf(c), FWDAnimation.to(c, .6, {
                    alpha: .4
                }), c.setNormalState(!0))
            }, this.enable = function() {
                !c.isDisabledForGood_bl && c.isDisabled_bl && (c.isDisabled_bl = !1, c.setButtonMode(!0), FWDAnimation.killTweensOf(c), FWDAnimation.to(c, .6, {
                    alpha: 1
                }))
            }, this.disableForGood = function() {
                c.isDisabledForGood_bl = !0, c.setButtonMode(!1)
            }, this.showDisabledState = function() {
                c.d_sdo && 0 != c.d_sdo.x && c.d_sdo.setX(0), c.hd_do && c.hd_do.setX(c.w - c.hd_do.w + 2)
            }, this.hideDisabledState = function() {
                c.d_sdo && -100 != c.d_sdo.x && c.d_sdo.setX(-100), c.hd_do && c.hd_do.setX(-1e4)
            }, this.show = function() {
                c.isShowed_bl || (c.isShowed_bl = !0, FWDAnimation.killTweensOf(c), FWDUVPUtils.isIEAndLessThen9 ? (FWDUVPUtils.isIEAndLessThen9 || (c.setAlpha(0), FWDAnimation.to(c, .4, {
                    alpha: 1,
                    delay: .4
                })), c.setVisible(!0)) : FWDUVPUtils.isIEWebKit ? (FWDAnimation.killTweensOf(c.n_do), c.n_do.setScale2(0), FWDAnimation.to(c.n_do, .8, {
                    scale: 1,
                    delay: .4,
                    onStart: function() {
                        c.setVisible(!0)
                    },
                    ease: Elastic.easeOut
                })) : (c.setScale2(0), FWDAnimation.to(c, .8, {
                    scale: 1,
                    delay: .4,
                    onStart: function() {
                        c.setVisible(!0)
                    },
                    ease: Elastic.easeOut
                })))
            }, this.hide = function(e) {
                c.isShowed_bl && (c.isShowed_bl = !1, FWDAnimation.killTweensOf(c), FWDAnimation.killTweensOf(c.n_do), c.setVisible(!1))
            }, c.updateHEXColors = function(e, t) {
                c.n_do_canvas && FWDUVPUtils.changeCanvasHEXColor(c.nImg, c.n_do_canvas, e), c.s_sdo_canvas && FWDUVPUtils.changeCanvasHEXColor(c.img1, c.s_sdo_canvas, t)
            }, c.init()
        };
        _.setPrototype = function() {
            _.prototype = null, _.prototype = new FWDUVPTransformDisplayObject("div")
        }, _.CLICK = "onClick", _.MOUSE_OVER = "onMouseOver", _.SHOW_TOOLTIP = "showTooltip", _.MOUSE_OUT = "onMouseOut", _.MOUSE_UP = "onMouseDown", _.prototype = null, e.FWDUVPSimpleButton = _
    }(window),
    function(e) {
        var d = function(e, t, s, o, i, l, n, a) {
            var r = this;
            d.prototype;
            this.nImg_img = null, this.sImg_img = null, this.n_do, this.s_do, this.useHEX = i, this.nBC = l, this.sBC = n, this.nImgPath_str = e, this.sImgPath_str = t, this.buttonWidth = s, this.buttonHeight = o, this.showOver = a, i || (this.showOver = !1), this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.isDisabled_bl = !1, this.init = function() {
                r.setupMainContainers(), r.setWidth(r.buttonWidth), r.setHeight(r.buttonHeight), r.setButtonMode(!0)
            }, this.setupMainContainers = function() {
                r.nImg = new Image, r.nImg.src = r.nImgPath_str, r.useHEX && !r.showOver ? (r.n_do = new FWDUVPTransformDisplayObject("div"), r.n_do.setWidth(r.buttonWidth), r.n_do.setHeight(r.buttonHeight), r.nImg.onload = function() {
                    r.n_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(r.nImg, r.nBC).canvas, r.n_do.screen.appendChild(r.n_do_canvas)
                }) : (r.n_do = new FWDUVPDisplayObject("img"), r.n_do.setScreen(r.nImg), r.n_do.setWidth(r.buttonWidth), r.n_do.setHeight(r.buttonHeight)), r.addChild(r.n_do), r.sImg = new Image, r.sImg.src = r.sImgPath_str, r.useHEX ? (r.s_do = new FWDUVPTransformDisplayObject("div"), r.s_do.setWidth(r.buttonWidth), r.s_do.setHeight(r.buttonHeight), r.sImg.onload = function() {
                    r.s_do_canvas = FWDUVPUtils.getCanvasWithModifiedColor(r.sImg, r.nBC).canvas, r.s_do.screen.appendChild(r.s_do_canvas)
                }, r.showOver || r.s_do.setAlpha(0), r.addChild(r.s_do)) : (r.s_do = new FWDUVPDisplayObject("img"), r.s_do.setScreen(r.sImg), r.s_do.setWidth(r.buttonWidth), r.s_do.setHeight(r.buttonHeight), r.addChild(r.s_do), r.useHEX || r.s_do.setAlpha(0)), r.showOver && r.addChild(r.s_do), r.hasPointerEvent_bl ? (r.screen.addEventListener("pointerup", r.onMouseUp), r.screen.addEventListener("pointerover", r.setSelectedState), r.screen.addEventListener("pointerout", r.setNormalState)) : r.screen.addEventListener && (r.isMbl || (r.screen.addEventListener("mouseover", r.setSelectedState), r.screen.addEventListener("mouseout", r.setNormalState), r.screen.addEventListener("mouseup", r.onMouseUp)), r.screen.addEventListener("touchend", r.onMouseUp))
            }, this.setNormalState = function(e) {
                r.showOver ? (FWDAnimation.killTweensOf(r.s_do), FWDAnimation.to(r.s_do, .6, {
                    alpha: 1,
                    ease: Quart.easeOut
                })) : (FWDAnimation.killTweensOf(r.s_do), FWDAnimation.to(r.s_do, .6, {
                    alpha: 0,
                    ease: Quart.easeOut
                }))
            }, this.setSelectedState = function(e) {
                r.showOver ? (FWDAnimation.killTweensOf(r.s_do), FWDAnimation.to(r.s_do, .6, {
                    alpha: 0,
                    ease: Quart.easeOut
                })) : (FWDAnimation.killTweensOf(r.s_do), FWDAnimation.to(r.s_do, .6, {
                    alpha: 1,
                    ease: Quart.easeOut
                }))
            }, this.onMouseUp = function(e) {
                r.dispatchEvent(d.MOUSE_UP), r.dispatchEvent(d.CLICK)
            }, r.updateHEXColors = function(e, t) {
                r.n_do_canvas && FWDUVPUtils.changeCanvasHEXColor(r.nImg, r.n_do_canvas, e);
                var s = t;
                r.showOver && (s = e), FWDUVPUtils.changeCanvasHEXColor(r.sImg, r.s_do_canvas, s)
            }, r.init()
        };
        d.setPrototype = function() {
            d.prototype = null, d.prototype = new FWDUVPTransformDisplayObject("div", "relative")
        }, d.MOUSE_UP = "onClick", d.CLICK = "onClick", d.prototype = null, e.FWDUVPSimpleSizeButton = d
    }(window),
    function(l) {
        var a = function(i, e) {
            var u = this;
            a.prototype;
            this.main_do = null, this.reader = null, this.subtitiles_ar = null, this.hasText_bl = !1, this.isLded = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.showSubtitileByDefault_bl = e.showSubtitileByDefault_bl, u.init = function() {
                u.setOverflow("visible"), u.getStyle().pointerEvents = "none", u.getStyle().cursor = "default", u.setupTextContainer(), u.getStyle().margin = "auto", u.hide(), setTimeout(function() {
                    u.setSizeOnce()
                }, 500)
            }, this.setSizeOnce = function() {}, u.setupTextContainer = function() {
                this.text_do = new FWDUVPTransformDisplayObject("div"), u.text_do.getStyle().pointerEvents = "none", this.text_do.hasTransform3d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.getStyle().transformOrigin = "50% 0%", this.text_do.getStyle().textAlign = "center", this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.addChild(this.text_do)
            }, u.loadSubtitle = function(e) {
                if (u.text_do.setX(-5e3), -1 == location.protocol.indexOf("file:")) {
                    u.subtitiles_ar = [], u.stopToLoadSubtitle(), u.sourceURL_str = e, u.xhr = new XMLHttpRequest, u.xhr.onreadystatechange = u.onLoad, u.xhr.onerror = u.onError;
                    try {
                        u.xhr.open("get", u.sourceURL_str + "?rand=" + parseInt(99999999 * Math.random()), !0), u.xhr.send()
                    } catch (e) {
                        e && e.message && e.message
                    }
                }
            }, this.onLoad = function(e) {
                4 == u.xhr.readyState && (404 == u.xhr.status ? u.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Subtitle file path is not found: <font color='#FF0000'>" + u.sourceURL_str + "</font>"
                }) : 408 == u.xhr.status ? u.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Loadiong subtitle file file request load timeout!"
                }) : 200 == u.xhr.status && (l.JSON, u.subtitle_txt = u.xhr.responseText, u.isShowed_bl && u.show(), u.parseSubtitle(u.subtitle_txt), u.prevText = "none", u.shId_to = setTimeout(function() {
                    u.show(), u.text_do.setX(0), u.updateSubtitle(i.currentSecconds)
                }, 400))), u.dispatchEvent(a.LOAD_COMPLETE)
            }, this.onError = function(e) {
                try {
                    l.console && console.log(e), l.console && console.log(e.message)
                } catch (e) {}
                u.dispatchEvent(a.LOAD_ERROR, {
                    text: "Error loading subtitle file : <font color='#FF0000'>" + u.sourceURL_str + "</font>."
                })
            }, this.stopToLoadSubtitle = function() {
                if (null != u.xhr) {
                    try {
                        u.xhr.abort()
                    } catch (e) {}
                    u.xhr.onreadystatechange = null, u.xhr.onerror = null, u.xhr = null
                }
                u.hide(), u.isLded = !1
            }, u.parseSubtitle = function(e) {
                function i(e) {
                    return null == e ? "" : e.replace(/^\s+|\s+$/g, "")
                }
                u.isLded = !0;
                var l = (e = i(e = e.replace(/\r\n|\r|\n/g, "\n"))).split("\n\n"),
                    a = 0;
                for (s in l) {
                    var r = l[s].split("\n");
                    if (2 <= r.length) {
                        if (n = r[0], d = i(r[1].split(" --\x3e ")[0]), o = i(r[1].split(" --\x3e ")[1]), t = r[2], 2 < r.length)
                            for (j = 3; j < r.length; j++) t += "<br>" + r[j];
                        u.subtitiles_ar[a] = {}, u.subtitiles_ar[a].number = n, u.subtitiles_ar[a].start = d, u.subtitiles_ar[a].end = o, u.subtitiles_ar[a].startDuration = FWDUVPUtils.formatTimeWithMiliseconds(d), u.subtitiles_ar[a].endDuration = FWDUVPUtils.formatTimeWithMiliseconds(o), u.subtitiles_ar[a].text = "<p class='fwduvp-subtitle'>" + t + "</p>"
                    }
                    a++
                }
                for (var d = 0; d < u.subtitiles_ar.length; d++) u.subtitiles_ar[d] || (u.subtitiles_ar.splice(d, 1), d--)
            }, this.updateSubtitle = function(e) {
                if (u.isLded) {
                    for (var t, s, o = "", i = 0; i < u.subtitiles_ar.length; i++)
                        if (t = u.subtitiles_ar[i].startDuration, s = u.subtitiles_ar[i].endDuration, t < e && e < s) {
                            o = u.subtitiles_ar[i].text;
                            break
                        } if (u.prevText != o) u.text_do.setInnerHTML(o), u.setAlpha(0), setTimeout(function() {
                        u.setAlpha(1), u.position()
                    }, 300), u.hasText_bl = !0;
                    u.prevText = o
                }
            }, this.position = function(e) {
                if (u.isLded) {
                    var t;
                    this.setWidth(i.tempVidStageWidth), this.text_do.setWidth(i.tempVidStageWidth), u.setX(Math.round((i.tempVidStageWidth - u.w) / 2));
                    var s = u.text_do.getHeight();
                    t = i.controller_do ? i.controller_do.isShowed_bl ? parseInt(i.vidStageHeight - i.controller_do.h - s) : parseInt(i.vidStageHeight - s - 10) : parseInt(i.vidStageHeight - s), FWDAnimation.killTweensOf(u.text_do), e ? FWDAnimation.to(u.text_do, .8, {
                        y: t,
                        ease: Expo.easeInOut
                    }) : u.text_do.setY(t), u.text_do.setX(0)
                }
            }, this.show = function() {
                u.setVisible(!0)
            }, this.hide = function() {
                clearTimeout(u.shId_to), u.setVisible(!1)
            }, u.init()
        };
        a.getDuration = function(e) {
            var t = 0,
                s = 0,
                o = 0;
            return "0" == (t = (e = e.split(":"))[0])[0] && "0" != t[1] && (t = parseInt(t[1])), "00" == t && (t = 0), "0" == (s = e[1])[0] && "0" != s[1] && (s = parseInt(s[1])), "00" == s && (s = 0), secs = parseInt(e[2].replace(/,.*/gi, "")), "0" == secs[0] && "0" != secs[1] && (secs = parseInt(secs[1])), "00" == secs && (secs = 0), 0 != t && (o += 60 * t * 60), 0 != s && (o += 60 * s), o += secs
        }, a.setPrototype = function() {
            a.prototype = null, a.prototype = new FWDUVPTransformDisplayObject("div")
        }, a.LOAD_ERROR = "error", a.LOAD_COMPLETE = "complete", a.prototype = null, l.FWDUVPSubtitle = a
    }(window),
    function(a) {
        var r = function(e, t, s, o, i, l) {
            var n = this;
            r.prototype;
            this.buttonRef_do = e, this.bkPath_str = t, this.pointerPath_str = s, this.text_do = null, this.pointer_do = null, this.fontColor_str = i, this.toolTipLabel_str = o, this.toolTipsButtonsHideDelay = 1e3 * l, this.pointerWidth = 7, this.pointerHeight = 4, this.showWithDelayId_to, this.isMbl = FWDUVPUtils.isMobile, this.isShowed_bl = !0, this.init = function() {
                n.setOverflow("visible"), n.screen.className = "UVP-tooltip-bk", n.setupMainContainers(), n.setLabel(n.toolTipLabel_str), n.hide(), n.getStyle().background = "url('" + n.bkPath_str + "')", n.getStyle().zIndex = 9999999999999
            }, this.setupMainContainers = function() {
                n.text_do = new FWDUVPDisplayObject("div"), n.text_do.screen.className = "UVP-tooltip-text", n.text_do.hasTransform3d_bl = !1, n.text_do.hasTransform2d_bl = !1, n.text_do.setBackfaceVisibility(), n.text_do.setDisplay("inline"), n.text_do.getStyle().fontFamily = "Arial", n.text_do.getStyle().fontSize = "12px", n.text_do.getStyle().color = n.fontColor_str, n.text_do.getStyle().whiteSpace = "nowrap", n.text_do.getStyle().fontSmoothing = "antialiased", n.text_do.getStyle().webkitFontSmoothing = "antialiased", n.text_do.getStyle().textRendering = "optimizeLegibility", n.text_do.getStyle().padding = "6px", n.text_do.getStyle().paddingTop = "4px", n.text_do.getStyle().paddingBottom = "4px", n.setLabel(), n.addChild(n.text_do), n.pointer_do = new FWDUVPDisplayObject("div"), n.pointer_do.screen.className = "UVP-tooltip-pointer", n.pointer_do.getStyle().background = "url('" + n.pointerPath_str + "')", n.pointer_do.setWidth(n.pointerWidth), n.pointer_do.setHeight(n.pointerHeight), n.addChild(n.pointer_do)
            }, this.setLabel = function(e) {
                n.text_do.setInnerHTML(o), setTimeout(function() {
                    null != n && (n.setWidth(n.text_do.getWidth()), n.setHeight(n.text_do.getHeight()), n.positionPointer())
                }, 50)
            }, this.positionPointer = function(e) {
                var t, s;
                e = e || 0, t = parseInt((n.w - n.pointerWidth) / 2) + e, s = n.h, n.pointer_do.setX(t), n.pointer_do.setY(s)
            }, this.show = function() {
                n.isShowed_bl || (n.isShowed_bl = !0, FWDAnimation.killTweensOf(n), clearTimeout(n.showWithDelayId_to), n.showWithDelayId_to = setTimeout(n.showFinal, n.toolTipsButtonsHideDelay), a.addEventListener ? a.addEventListener("mousemove", n.moveHandler) : document.attachEvent && (document.detachEvent("onmousemove", n.moveHandler), document.attachEvent("onmousemove", n.moveHandler)))
            }, this.showFinal = function() {
                n.setVisible(!0), n.setAlpha(0), FWDAnimation.to(n, .4, {
                    alpha: 1,
                    onComplete: function() {
                        n.setVisible(!0)
                    },
                    ease: Quart.easeOut
                })
            }, this.moveHandler = function(e) {
                var t = FWDUVPUtils.getViewportMouseCoordinates(e);
                FWDUVPUtils.hitTest(n.buttonRef_do.screen, t.screenX, t.screenY) || n.hide()
            }, this.hide = function() {
                n.isShowed_bl && (clearTimeout(n.showWithDelayId_to), a.removeEventListener ? a.removeEventListener("mousemove", n.moveHandler) : document.detachEvent && document.detachEvent("onmousemove", n.moveHandler), FWDAnimation.killTweensOf(n), n.setVisible(!1), n.isShowed_bl = !1)
            }, this.init()
        };
        r.setPrototype = function() {
            r.prototype = null, r.prototype = new FWDUVPDisplayObject("div", "fixed")
        }, r.CLICK = "onClick", r.MOUSE_DOWN = "onMouseDown", r.prototype = null, a.FWDUVPToolTip = r
    }(window), window.FWDUVPTransformDisplayObject = function(e, t, s, o) {
        this.listeners = {
            events_ar: []
        };
        var i = this;
        if ("div" != e && "img" != e && "canvas" != e && "iframe" != e) throw Error("Type is not valid! " + e);
        this.type = e, this.children_ar = [], this.style, this.screen, this.numChildren, this.transform, this.position = t || "absolute", this.overflow = s || "hidden", this.display = o || "block", this.visible = !0, this.buttonMode, this.x = 0, this.y = 0, this.scale = 1, this.rotation = 0, this.w = 0, this.h = 0, this.rect, this.alpha = 1, this.innerHTML = "", this.opacityType = "", this.isHtml5_bl = !1, this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d, this.init = function() {
            this.setScreen()
        }, this.getTransform = function() {
            for (var e, t = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"]; e = t.shift();)
                if (void 0 !== this.screen.style[e]) return e;
            return !1
        }, this.getOpacityType = function() {
            return void 0 !== this.screen.style.opacity ? "opacity" : "filter"
        }, this.setScreen = function(e) {
            "img" == this.type && e ? this.screen = e : this.screen = document.createElement(this.type), this.setMainProperties()
        }, this.setMainProperties = function() {
            this.transform = this.getTransform(), this.setPosition(this.position), this.setOverflow(this.overflow), this.opacityType = this.getOpacityType(), "opacity" == this.opacityType && (this.isHtml5_bl = !0), "filter" == i.opacityType && (i.screen.style.filter = "inherit"), this.screen.style.left = "0px", this.screen.style.top = "0px", this.screen.style.margin = "0px", this.screen.style.padding = "0px", this.screen.style.maxWidth = "none", this.screen.style.maxHeight = "none", this.screen.style.border = "none", this.screen.style.lineHeight = "1", this.screen.style.backfaceVisibility = "hidden", this.screen.style.webkitBackfaceVisibility = "hidden", this.screen.style.MozBackfaceVisibility = "hidden", this.screen.style.MozImageRendering = "optimizeSpeed", this.screen.style.WebkitImageRendering = "optimizeSpeed", "img" == e && (this.setWidth(this.screen.width), this.setHeight(this.screen.height), this.screen.onmousedown = function(e) {
                return !1
            })
        }, i.setBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "visible", i.screen.style.webkitBackfaceVisibility = "visible", i.screen.style.MozBackfaceVisibility = "visible"
        }, i.removeBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "hidden", i.screen.style.webkitBackfaceVisibility = "hidden", i.screen.style.MozBackfaceVisibility = "hidden"
        }, this.setSelectable = function(e) {
            if (!e) {
                try {
                    this.screen.style.userSelect = "none"
                } catch (e) {}
                try {
                    this.screen.style.MozUserSelect = "none"
                } catch (e) {}
                try {
                    this.screen.style.webkitUserSelect = "none"
                } catch (e) {}
                try {
                    this.screen.style.khtmlUserSelect = "none"
                } catch (e) {}
                try {
                    this.screen.style.oUserSelect = "none"
                } catch (e) {}
                try {
                    this.screen.style.msUserSelect = "none"
                } catch (e) {}
                try {
                    this.screen.msUserSelect = "none"
                } catch (e) {}
                this.screen.ondragstart = function(e) {
                    return !1
                }, this.screen.onselectstart = function() {
                    return !1
                }, this.screen.style.webkitTouchCallout = "none"
            }
        }, this.getScreen = function() {
            return i.screen
        }, this.setVisible = function(e) {
            this.visible = e, 1 == this.visible ? this.screen.style.visibility = "visible" : this.screen.style.visibility = "hidden"
        }, this.getVisible = function() {
            return this.visible
        }, this.setResizableSizeAfterParent = function() {
            this.screen.style.width = "100%", this.screen.style.height = "100%"
        }, this.getStyle = function() {
            return this.screen.style
        }, this.setOverflow = function(e) {
            i.overflow = e, i.screen.style.overflow = i.overflow
        }, this.setPosition = function(e) {
            i.position = e, i.screen.style.position = i.position
        }, this.setDisplay = function(e) {
            this.display = e, this.screen.style.display = this.display
        }, this.setButtonMode = function(e) {
            this.buttonMode = e, 1 == this.buttonMode ? this.screen.style.cursor = "pointer" : this.screen.style.cursor = "default"
        }, this.setBkColor = function(e) {
            i.screen.style.backgroundColor = e
        }, this.setInnerHTML = function(e) {
            i.innerHTML = e, i.screen.innerHTML = i.innerHTML
        }, this.getInnerHTML = function() {
            return i.innerHTML
        }, this.getRect = function() {
            return i.screen.getBoundingClientRect()
        }, this.setAlpha = function(e) {
            i.alpha = e, "opacity" == i.opacityType ? i.screen.style.opacity = i.alpha : "filter" == i.opacityType && (i.screen.style.filter = "alpha(opacity=" + 100 * i.alpha + ")", i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(100 * i.alpha) + ")")
        }, this.getAlpha = function() {
            return i.alpha
        }, this.getRect = function() {
            return this.screen.getBoundingClientRect()
        }, this.getGlobalX = function() {
            return this.getRect().left
        }, this.getGlobalY = function() {
            return this.getRect().top
        }, this.setX = function(e) {
            i.x = e, i.hasTransform2d_bl ? i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)" : i.screen.style.left = i.x + "px"
        }, this.getX = function() {
            return i.x
        }, this.setY = function(e) {
            i.y = e, i.hasTransform2d_bl ? i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)" : i.screen.style.top = i.y + "px"
        }, this.getY = function() {
            return i.y
        }, this.setScale2 = function(e) {
            i.scale = e, i.hasTransform2d_bl && (i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)")
        }, this.getScale = function() {
            return i.scale
        }, this.setRotation = function(e) {
            i.rotation = e, i.hasTransform2d_bl && (i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)")
        }, i.setWidth = function(e) {
            i.w = e, "img" == i.type && (i.screen.width = i.w), i.screen.style.width = i.w + "px"
        }, this.getWidth = function() {
            return "div" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : i.w : "img" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : 0 != i.screen.width ? i.screen.width : i._w : "canvas" == i.type ? 0 != i.screen.offsetWidth ? i.screen.offsetWidth : i.w : void 0
        }, i.setHeight = function(e) {
            i.h = e, "img" == i.type && (i.screen.height = i.h), i.screen.style.height = i.h + "px"
        }, this.getHeight = function() {
            return "div" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : i.h : "img" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : 0 != i.screen.height ? i.screen.height : i.h : "canvas" == i.type ? 0 != i.screen.offsetHeight ? i.screen.offsetHeight : i.h : void 0
        }, this.getNumChildren = function() {
            return i.children_ar.length
        }, this.addChild = function(e) {
            this.contains(e) && this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1), this.children_ar.push(e), this.screen.appendChild(e.screen)
        }, this.removeChild = function(e) {
            if (!this.contains(e)) throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
            this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1), this.screen.removeChild(e.screen)
        }, this.contains = function(e) {
            return -1 != FWDUVPUtils.indexOfArray(this.children_ar, e)
        }, this.addChildAtZero = function(e) {
            0 == this.numChildren ? (this.children_ar.push(e), this.screen.appendChild(e.screen)) : (this.screen.insertBefore(e.screen, this.children_ar[0].screen), this.contains(e) && this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1), this.children_ar.unshift(e))
        }, this.getChildAt = function(e) {
            if (e < 0 || e > this.numChildren - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (0 == this.numChildren) throw Errror("##getChildAt## Child dose not exist!");
            return this.children_ar[e]
        }, this.removeChildAtZero = function() {
            this.screen.removeChild(this.children_ar[0].screen), this.children_ar.shift()
        }, this.addListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function.");
            var s = {};
            s.type = e, s.listener = t, (s.target = this).listeners.events_ar.push(s)
        }, this.dispatchEvent = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e) {
                    if (t)
                        for (var i in t) this.listeners.events_ar[s][i] = t[i];
                    this.listeners.events_ar[s].listener.call(this, this.listeners.events_ar[s]);
                    break
                }
        }, this.removeListener = function(e, t) {
            if (null == e) throw Error("type is required.");
            if ("object" == typeof e) throw Error("type must be of type String.");
            if ("function" != typeof t) throw Error("listener must be of type Function." + e);
            for (var s = 0, o = this.listeners.events_ar.length; s < o; s++)
                if (this.listeners.events_ar[s].target === this && this.listeners.events_ar[s].type === e && this.listeners.events_ar[s].listener === t) {
                    this.listeners.events_ar.splice(s, 1);
                    break
                }
        }, this.disposeImage = function() {
            "img" == this.type && (this.screen.src = null)
        }, this.destroy = function() {
            try {
                this.screen.parentNode.removeChild(this.screen)
            } catch (e) {}
            this.screen.onselectstart = null, this.screen.ondragstart = null, this.screen.ontouchstart = null, this.screen.ontouchmove = null, this.screen.ontouchend = null, this.screen.onmouseover = null, this.screen.onmouseout = null, this.screen.onmouseup = null, this.screen.onmousedown = null, this.screen.onmousemove = null, this.screen.onclick = null, delete this.screen, delete this.style, delete this.rect, delete this.selectable, delete this.buttonMode, delete this.position, delete this.overflow, delete this.visible, delete this.innerHTML, delete this.numChildren, delete this.x, delete this.y, delete this.w, delete this.h, delete this.opacityType, delete this.isHtml5_bl, delete this.hasTransform2d_bl, this.children_ar = null, this.style = null, this.screen = null, this.numChildren = null, this.transform = null, this.position = null, this.overflow = null, this.display = null, this.visible = null, this.buttonMode = null, this.globalX = null, this.globalY = null, this.x = null, this.y = null, this.w = null, this.h = null, this.rect = null, this.alpha = null, this.innerHTML = null, this.opacityType = null, this.isHtml5_bl = null, this.hasTransform3d_bl = null, this.hasTransform2d_bl = null, i = null
        }, this.init()
    },
    function(s) {
        var n = function(i, e) {
            var l = this;
            n.prototype;
            this.video_el = null, this.sourcePath_str = null, this.bk_do = null, this.controllerHeight = i.data.controllerHeight, this.sW = 0, this.sH = 0, this.lastPercentPlayed = 0, this.volume = e, this.curDuration = 0, this.countNormalMp3Errors = 0, this.countShoutCastErrors = 0, this.maxShoutCastCountErrors = 5, this.maxNormalCountErrors = 1, this.disableClickForAWhileId_to, this.showErrorWithDelayId_to, this.playWithDelayId_to, this.disableClick_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !0, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.hasPlayedOnce_bl = !1, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                l.setBkColor(i.videoBackgroundColor_str), l.setupVideo()
            }, this.setupVideo = function() {
                null == l.video_el && (l.video_el = document.createElement("video"), l.screen.appendChild(l.video_el), l.video_el.controls = !1, l.video_el.volume = l.volume, i.data.playsinline && (l.video_el.WebKitPlaysInline = !0, l.video_el.playsinline = !0, l.video_el.setAttribute("playsinline", ""), l.video_el.setAttribute("webkit-playsinline", "")), i.data.aom_bl && (l.video_el.muted = !0), l.video_el.style.position = "relative", l.video_el.style.left = "0px", l.video_el.style.top = "0px", l.video_el.style.width = "100%", l.video_el.style.height = "100%", l.video_el.style.margin = "0px", l.video_el.style.padding = "0px", l.video_el.style.maxWidth = "none", l.video_el.style.maxHeight = "none", l.video_el.style.border = "none", l.video_el.style.lineHeight = "0", l.video_el.style.msTouchAction = "none", l.screen.appendChild(l.video_el)), l.video_el.addEventListener("error", l.errorHandler), l.video_el.addEventListener("progress", l.updateProgress), l.video_el.addEventListener("timeupdate", l.updateVideo), l.video_el.addEventListener("pause", l.pauseHandler), l.video_el.addEventListener("play", l.playHandler), FWDUVPUtils.isIE || l.video_el.addEventListener("waiting", l.startToBuffer), l.video_el.addEventListener("playing", l.stopToBuffer), l.video_el.addEventListener("ended", l.endedHandler), l.resizeAndPosition()
            }, this.destroyVideo = function() {
                clearTimeout(l.showErrorWithDelayId_to), l.video_el && (l.stopToUpdateSubtitles(), l.video_el.removeEventListener("error", l.errorHandler), l.video_el.removeEventListener("progress", l.updateProgress), l.video_el.removeEventListener("timeupdate", l.updateVideo), l.video_el.removeEventListener("pause", l.pauseHandler), l.video_el.removeEventListener("play", l.playHandler), FWDUVPUtils.isIE || l.video_el.removeEventListener("waiting", l.startToBuffer), l.video_el.removeEventListener("playing", l.stopToBuffer), l.video_el.removeEventListener("ended", l.endedHandler), l.video_el.style.visibility = "hidden", l.video_el.src = "", l.video_el.load())
            }, this.startToBuffer = function(e) {
                l.dispatchEvent(n.START_TO_BUFFER)
            }, this.stopToBuffer = function() {
                l.dispatchEvent(n.STOP_TO_BUFFER)
            }, this.errorHandler = function(e) {
                var t;
                "DASH" != i.videoType_str && (l.hasError_bl = !0, t = 0 == l.video_el.networkState ? "error 'self.video_el.networkState = 0'" : 1 == l.video_el.networkState ? "error 'self.video_el.networkState = 1'" : 3 == l.video_el.networkState ? "source not found" : e, s.console && s.console.log(l.video_el.networkState), clearTimeout(l.showErrorWithDelayId_to), l.showErrorWithDelayId_to = setTimeout(function() {
                    l.dispatchEvent(n.ERROR, {
                        text: t
                    })
                }, 200))
            }, this.resizeAndPosition = function(e, t, s, o) {
                e && (l.sW = e, l.sH = t), l.setWidth(l.sW), l.setHeight(l.sH), l.setX(s), l.setY(o), i.is360 && l.renderer && (l.camera.aspect = l.sW / l.sH, l.camera.updateProjectionMatrix(), l.renderer.setSize(l.sW, l.sH))
            }, this.setSource = function(e) {
                l.stopToUpdateSubtitles(), l.sourcePath_str = e, i.is360 && l.video_el && (l.video_el.style.visibility = "hidden"), l.video_el && l.stop(), l.initVideo()
            }, this.play = function(e) {
                var t;
                if (clearTimeout(l.playWithDelayId_to), FWDUVPlayer.curInstance = i, l.isStopped_bl) l.initVideo(), l.setVolume(), l.isMbl ? l.play() : l.playWithDelayId_to = setTimeout(l.play, 1e3), l.hasStrtLivStrm = !0, l.startToBuffer(!0), l.isPlaying_bl = !0;
                else if (!l.video_el.ended || e) try {
                    l.hasStrtLivStrm = !0, l.isPlaying_bl = !0, l.hasPlayedOnce_bl = !0, void 0 !== (t = l.video_el.play()) && t.then(function() {}, function() {}), FWDUVPUtils.isIE && l.dispatchEvent(n.PLAY)
                } catch (e) {}
                i.is360 && l.add360Vid()
            }, this.initVideo = function() {
                l.setupVideo(), l.setVolume(), l.isPlaying_bl = !1, l.hasError_bl = !1, l.allowScrubing_bl = !1, l.isStopped_bl = !1, l.video_el.src != l.sourcePath_str && (l.video_el.src = l.sourcePath_str)
            }, this.pause = function() {
                if (null != l && !l.isStopped_bl && !l.hasError_bl && !l.video_el.ended) try {
                    l.video_el.pause(), l.isPlaying_bl = !1, FWDUVPUtils.isIE && l.dispatchEvent(n.PAUSE)
                } catch (e) {}
            }, this.togglePlayPause = function() {
                null != l && l.isSafeToBeControlled_bl && (l.isPlaying_bl ? l.pause() : l.play())
            }, this.resume = function() {
                l.isStopped_bl || l.play()
            }, this.pauseHandler = function() {
                l.allowScrubing_bl || l.dispatchEvent(n.PAUSE)
            }, this.playHandler = function() {
                l.allowScrubing_bl || (l.isStartEventDispatched_bl || (l.dispatchEvent(n.START), l.isStartEventDispatched_bl = !0), i.is360 && l.start360Render(), l.startToUpdateSubtitles(), l.dispatchEvent(n.PLAY))
            }, this.endedHandler = function() {
                l.stopToUpdateSubtitles(), l.dispatchEvent(n.PLAY_COMPLETE)
            }, this.stop = function(e) {
                (null != l && null != l.video_el && !l.isStopped_bl || e) && (clearTimeout(l.sizeId_to), l.isPlaying_bl = !1, l.isStopped_bl = !0, l.hasPlayedOnce_bl = !0, l.hasStrtLivStrm = !1, l.isSafeToBeControlled_bl = !1, l.isStartEventDispatched_bl = !1, l.stopToUpdateSubtitles(), clearTimeout(l.playWithDelayId_to), l.stop360Render(), l.destroyVideo(), l.dispatchEvent(n.LOAD_PROGRESS, {
                    percent: 0
                }), l.dispatchEvent(n.UPDATE_TIME, {
                    curTime: "00:00",
                    totalTime: "00:00"
                }), l.dispatchEvent(n.STOP), l.stopToBuffer())
            }, this.safeToBeControlled = function() {
                (i.videoType_str != FWDUVPlayer.HLS_JS && i.videoType_str != FWDUVPlayer.DASH || l.hasStrtLivStrm) && (l.isSafeToBeControlled_bl || (l.stopToScrub(), l.resizeAndPosition(), l.hasHours_bl = 0 < Math.floor(l.video_el.duration / 3600), l.isPlaying_bl = !0, l.isSafeToBeControlled_bl = !0, i.is360 || (l.video_el.style.visibility = "visible"), setTimeout(function() {
                    l.renderer && (l.renderer.domElement.style.left = "0px")
                }, 1e3), i.fillEntireVideoScreen_bl ? l.sizeId_to = setTimeout(function() {
                    l.dispatchEvent(n.SAFE_TO_SCRUBB)
                }, 500) : l.dispatchEvent(n.SAFE_TO_SCRUBB)))
            }, this.updateProgress = function() {
                if (i.videoType_str != FWDUVPlayer.HLS_JS || l.hasStrtLivStrm) {
                    var e = 0;
                    0 < l.video_el.buffered.length && (e = l.video_el.buffered.end(l.video_el.buffered.length - 1).toFixed(1) / l.video_el.duration.toFixed(1), !isNaN(e) && e || (e = 0)), 1 == e && l.video_el.removeEventListener("progress", l.updateProgress), l.dispatchEvent(n.LOAD_PROGRESS, {
                        percent: e
                    })
                }
            }, this.updateVideo = function() {
                var e;
                l.allowScrubing_bl || (e = l.video_el.currentTime / l.video_el.duration, l.dispatchEvent(n.UPDATE, {
                    percent: e
                }));
                var t = n.formatTime(l.video_el.duration),
                    s = n.formatTime(l.video_el.currentTime);
                l.video_el.currentTime && l.safeToBeControlled(), isNaN(l.video_el.duration) || i.videoType_str != FWDUVPlayer.VIDEO && i.videoType_str != FWDUVPlayer.HLS_JS && i.videoType_str != FWDUVPlayer.DASH ? l.dispatchEvent(n.UPDATE_TIME, {
                    curTime: "00:00",
                    totalTime: "00:00",
                    seconds: 0,
                    totalTimeInSeconds: 0
                }) : l.dispatchEvent(n.UPDATE_TIME, {
                    curTime: s,
                    totalTime: t,
                    seconds: l.video_el.currentTime,
                    totalTimeInSeconds: l.video_el.duration
                }), l.lastPercentPlayed = e, l.curDuration = s
            }, this.startToScrub = function() {
                l.allowScrubing_bl = !0
            }, this.stopToScrub = function() {
                l.allowScrubing_bl = !1
            }, this.scrubbAtTime = function(e) {
                l.video_el.currentTime = e;
                var t = n.formatTime(l.video_el.duration),
                    s = n.formatTime(l.video_el.currentTime);
                l.dispatchEvent(n.UPDATE_TIME, {
                    curTime: s,
                    totalTime: t
                })
            }, this.scrub = function(e, t) {
                t && l.startToScrub();
                try {
                    l.video_el.currentTime = l.video_el.duration * e;
                    var s = n.formatTime(l.video_el.duration),
                        o = n.formatTime(l.video_el.currentTime);
                    l.dispatchEvent(n.UPDATE_TIME, {
                        curTime: o,
                        totalTime: s
                    })
                } catch (t) {}
            }, this.replay = function() {
                l.scrub(0), l.play()
            }, this.setVolume = function(e) {
                null != e && (l.volume = e), l.video_el && (l.video_el.volume = l.volume, e && (l.video_el.muted = !1))
            }, this.setPlaybackRate = function(e) {
                l.video_el && (l.video_el.defaultPlaybackRate = e, l.video_el.playbackRate = e)
            }, this.add360Vid = function() {
                l.renderer ? l.screen.appendChild(l.renderer.domElement) : null != s.THREE && (l.renderer = new THREE.WebGLRenderer({
                    antialias: !0
                }), l.renderer.setSize(l.sW, l.sH), l.renderer.domElement.style.position = "absolute", l.renderer.domElement.style.left = "0px", l.renderer.domElement.style.top = "0px", l.renderer.domElement.style.margin = "0px", l.renderer.domElement.style.padding = "0px", l.renderer.domElement.style.maxWidth = "none", l.renderer.domElement.style.maxHeight = "none", l.renderer.domElement.style.border = "none", l.renderer.domElement.style.lineHeight = "1", l.renderer.domElement.style.backgroundColor = "transparent", l.renderer.domElement.style.backfaceVisibility = "hidden", l.renderer.domElement.style.webkitBackfaceVisibility = "hidden", l.renderer.domElement.style.MozBackfaceVisibility = "hidden", l.renderer.domElement.style.MozImageRendering = "optimizeSpeed", l.renderer.domElement.style.WebkitImageRendering = "optimizeSpeed", l.screen.appendChild(l.renderer.domElement), l.scene = new THREE.Scene, l.video_el.setAttribute("crossorigin", "anonymous"), l.canvas = document.createElement("canvas"), l.context = l.canvas.getContext("2d"), FWDUVPUtils.isFirefox ? l.videoTexture = new THREE.Texture(l.video_el) : l.videoTexture = new THREE.Texture(l.canvas), l.videoTexture.minFilter = THREE.LinearFilter, l.videoTexture.magFilter = THREE.LinearFilter, l.videoTexture.format = THREE.RGBFormat, l.cubeGeometry = new THREE.SphereGeometry(500, 60, 40), l.sphereMat = new THREE.MeshBasicMaterial({
                    map: l.videoTexture
                }), l.sphereMat.side = THREE.BackSide, l.cube = new THREE.Mesh(l.cubeGeometry, l.sphereMat), l.scene.add(l.cube), l.camera = new THREE.PerspectiveCamera(45, l.sW / l.sH, .1, 1e4), l.camera.position.y = 0, l.camera.position.z = 500, l.camera.position.x = 0, l.scene.add(l.camera), l.controls = new THREE.OrbitControls(l.camera, i.dumyClick_do.screen), l.controls.enableDamping = !0, l.controls.enableZoom = !1, l.controls.dampingFactor = .25, l.controls.maxDistance = 500, l.controls.minDistance = 500, l.controls.rotateLeft(90 * Math.PI / 180), l.controls.enabled = !0, l.render(), setTimeout(function() {
                    i.preloader_do.hide(!0)
                }, 1e3))
            }, this.start360Render = function() {
                l.is360Rendering_bl = !0, cancelAnimationFrame(l.requestId), l.requestId = requestAnimationFrame(l.render)
            }, this.stop360Render = function() {
                if (l.is360Rendering_bl = !1, l.camera) {
                    l.camera.position.y = 0, l.camera.position.z = 500, l.camera.position.x = 0, l.renderer.domElement.style.left = "-10000px", cancelAnimationFrame(l.requestId);
                    try {
                        l.screen.removeChild(l.renderer.domElement)
                    } catch (e) {}
                }
            }, this.render = function() {
                l.is360Rendering_bl && l.camera && i.is360 ? (l.video_el.readyState === l.video_el.HAVE_ENOUGH_DATA && (l.videoTexture.needsUpdate = !0), FWDUVPUtils.isFirefox || !l.context || l.isStopped_bl || (0 != l.video_el.videoWidth && (l.canvas.width = l.video_el.videoWidth, l.canvas.height = l.video_el.videoHeight), l.context.save(), l.context.scale(-1, 1), l.context.drawImage(l.video_el, 0, 0, -1 * l.canvas.width, l.canvas.height), l.context.restore()), l.controls.update(), l.renderer.render(l.scene, l.camera), l.requestId = requestAnimationFrame(l.render)) : cancelAnimationFrame(l.requestId)
            }, this.stopToUpdateSubtitles = function() {
                clearInterval(l.startToUpdateSubtitleId_int)
            }, this.startToUpdateSubtitles = function() {
                clearInterval(l.startToUpdateSubtitleId_int), l.startToUpdateSubtitleId_int = setInterval(l.updateSubtitleHandler, 10)
            }, this.updateSubtitleHandler = function() {
                l.dispatchEvent(n.UPDATE_SUBTITLE, {
                    curTime: l.video_el.currentTime
                })
            }, n.formatTime = function(e) {
                var t = Math.floor(e / 3600),
                    s = e % 3600,
                    o = Math.floor(s / 60),
                    i = s % 60,
                    l = Math.ceil(i);
                return o = 10 <= o ? o : "0" + o, l = 10 <= l ? l : "0" + l, isNaN(l) ? "00:00" : t ? 10 <= t ? t + ":" + o + ":" + l : "0" + t + ":" + o + ":" + l : o + ":" + l
            }, this.init()
        };
        n.setPrototype = function() {
            n.prototype = new FWDUVPDisplayObject("div")
        }, n.UPDATE_SUBTITLE = "updateSubtitle", n.ERROR = "error", n.UPDATE = "update", n.UPDATE_TIME = "updateTime", n.SAFE_TO_SCRUBB = "safeToControll", n.LOAD_PROGRESS = "loadProgress", n.START = "start", n.PLAY = "play", n.PAUSE = "pause", n.STOP = "stop", n.PLAY_COMPLETE = "playComplete", n.START_TO_BUFFER = "startToBuffer", n.STOP_TO_BUFFER = "stopToBuffer", s.FWDUVPVideoScreen = n
    }(window),
    function(e) {
        var i = function(s, e) {
            var o = this;
            i.prototype;
            this.iframe_do = null, this.vimeoPlayer = null, this.lastQuality_str = "auto", this.volume = e, this.updateVideoId_int, this.updatePreloadId_int, this.controllerHeight = s.data.controllerHeight, this.hasBeenCreatedOnce_bl = !0, this.hasHours_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !1, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isPausedInEvent_bl = !0, this.isShowed_bl = !0, this.isCued_bl = !1, this.isVideoLoaded_bl = !1, this.isReady_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                o.hasTransform3d_bl = !1, o.hasTransform2d_bl = !1, o.setBackfaceVisibility(), s.videoHolder_do.addChildAt(o, 0), o.resizeAndPosition(), o.setupVideo(), o.setupDisableClick()
            }, this.setupDisableClick = function() {
                o.disableClick_do = new FWDUVPDisplayObject("div"), o.disableClick_do.setBkColor(s.backgroundColor_str), o.disableClick_do.setAlpha(1e-8), o.addChild(o.disableClick_do)
            }, this.showDisable = function() {
                s.tempVidStageWidth && o.disableClick_do.w != o.sW && (o.disableClick_do.setWidth(s.tempVidStageWidth), FWDUVPUtils.isIphone ? o.disableClick_do.setHeight(s.tempVidStageHeight - o.controllerHeight) : o.disableClick_do.setHeight(s.tempVidStageHeight))
            }, this.hideDisable = function() {
                0 != o.disableClick_do.w && (o.disableClick_do.setWidth(0), o.disableClick_do.setHeight(0))
            }, this.setupVideo = function() {
                o.vimeoPlayer || (o.iframe_do = new FWDUVPDisplayObject("IFRAME"), o.iframe_do.hasTransform3d_bl = !1, o.iframe_do.hasTransform2d_bl = !1, o.iframe_do.screen.setAttribute("id", s.instanceName_str + "vimeo"), o.isMbl && (o.iframe_do.screen.setAttribute("webkitallowfullscreen", "1"), o.iframe_do.screen.setAttribute("mozallowfullscreen", "1"), o.iframe_do.screen.setAttribute("allowfullscreen", "1")), s.data.aom_bl && o.iframe_do.screen.setAttribute("muted", "1"), o.iframe_do.screen.setAttribute("src", "https://player.vimeo.com/video/76979871?player_id=" + s.instanceName_str + "vimeo&autoplay=0&muted=1"), o.iframe_do.getStyle().width = "100%", o.iframe_do.getStyle().height = "100%", o.iframe_do.setBackfaceVisibility(), o.addChild(o.iframe_do), o.vimeoPlayer = new Vimeo.Player(o.iframe_do.screen), o.vimeoPlayer.on("play", function(e) {
                    o.playHandler()
                }), o.vimeoPlayer.on("pause", function(e) {
                    o.pauseHandler()
                }), o.vimeoPlayer.on("loadProgress", function(e) {
                    o.loadProgressHandler()
                }), o.vimeoPlayer.on("ended", function(e) {
                    o.finishHandler()
                }), o.vimeoPlayer.on("loaded", function(e) {
                    o.loadedHandler()
                }), o.vimeoPlayer.ready().then(function() {
                    o.readyHandler()
                }), o.blackOverlay_do = new FWDUVPDisplayObject("div"), o.blackOverlay_do.getStyle().backgroundColor = "#000000", o.blackOverlay_do.getStyle().width = "100%", o.blackOverlay_do.getStyle().height = "100%", o.addChild(o.blackOverlay_do))
            }, this.resizeAndPosition = function() {
                s.tempVidStageWidth && (o.setWidth(s.tempVidStageWidth), o.setHeight(s.tempVidStageHeight - o.controllerHeight))
            }, this.setSource = function(e) {
                e && (o.sourcePath_str = e), o.stopToUpdateSubtitles(), o.stop();
                var t = o.sourcePath_str.match(/[^\/]+$/i);
                o.vimeoPlayer.loadVideo(t).then(function(e) {
                    (!s.isMbl && (s.data.autoPlay_bl || s.isThumbClick_bl || s.isAdd_bl || s.wasAdd_bl) && !s.lightBox_do || s.lightBox_do && s.lightBox_do.isShowed_bl) && s.play(), o.setVolume(s.volume)
                }).catch(function(e) {
                    console && console.log(e), o.displayErrorId_to = setTimeout(function() {
                        o.dispatchEvent(i.ERROR, {
                            error: e.name
                        })
                    }, 2e3), console && console.log(e)
                })
            }, this.readyHandler = function() {
                if (clearTimeout(o.intitErrorId_to), o.contains(o.blackOverlay_do) && (clearTimeout(o.removeChildWithDelayId_to), o.removeChildWithDelayId_to = setTimeout(function() {
                        o.removeChild(o.blackOverlay_do)
                    }, 1500)), o.resizeAndPosition(), o.isReady_bl) {
                    try {
                        o.vimeoPlayer.api("setColor", "#FFFFFF")
                    } catch (e) {}
                    return s.videoType_str == FWDUVPlayer.VIMEO && o.setX(0), void(s.data.autoPlay_bl && s.play())
                }
                o.isReady_bl = !0, o.dispatchEvent(i.READY)
            }, this.loadedHandler = function() {
                o.isVideoLoaded_bl = !0
            }, this.playHandler = function() {
                clearInterval(o.startToPlayWithDelayId_to), clearTimeout(o.displayErrorId_to), o.isStopped_bl = !1, o.isSafeToBeControlled_bl = !0, o.isPlaying_bl = !0, o.startToUpdateSubtitles(), o.startToUpdate(), o.dispatchEvent(i.SAFE_TO_SCRUBB), o.dispatchEvent(i.PLAY), o.hasHours_bl = 0 < Math.floor(o.getDuration() / 3600)
            }, this.loadProgressHandler = function(e) {
                o.isShowed_bl || o.dispatchEvent(i.LOAD_PROGRESS, {
                    percent: e.percent
                })
            }, this.pauseHandler = function() {
                o.isPlaying_bl && (o.isPlaying_bl = !1, clearInterval(o.startToPlayWithDelayId_to), o.dispatchEvent(i.PAUSE), o.stopToUpdate())
            }, this.finishHandler = function() {
                s.data.loop_bl && (o.stop(), setTimeout(o.play, 200)), o.dispatchEvent(i.PLAY_COMPLETE)
            }, this.play = function(e) {
                FWDUVPlayer.curInstance = s;
                o.hasError_bl = !1, s.prevVideoType_str, FWDUVPlayer.VIMEO, o.vimeoPlayer.play(), o.isMbl || (o.isStopped_bl = !1)
            }, this.pause = function() {
                o.isStopped_bl || o.hasError_bl || (clearInterval(o.startToPlayWithDelayId_to), o.vimeoPlayer.pause(), o.stopToUpdate())
            }, this.togglePlayPause = function() {
                o.isPlaying_bl ? o.pause() : o.play()
            }, this.resume = function() {
                o.isStopped_bl || o.play()
            }, this.startToUpdate = function() {
                clearInterval(o.updateVideoId_int), o.updateVideoId_int = setInterval(o.updateVideo, 500)
            }, this.stopToUpdate = function() {
                clearInterval(o.updateVideoId_int)
            }, this.updateVideo = function() {
                var e;
                if (o.vimeoPlayer) {
                    var t = o.formatTime(o.getDuration()),
                        s = o.formatTime(o.getCurrentTime());
                    e = o.getCurrentTime() / o.getDuration(), isNaN(e) && (e = 0), o.dispatchEvent(FWDUVPYoutubeScreen.UPDATE, {
                        percent: e
                    }), o.dispatchEvent(i.UPDATE_TIME, {
                        curTime: s,
                        totalTime: t,
                        seconds: o.getCurrentTime(),
                        totalTimeInSeconds: o.getCurrentTime()
                    })
                } else stopToUpdate()
            }, this.stop = function(e) {
                o.isVideoLoaded_bl = !1, o.isStopped_bl || (clearInterval(o.startToPlayWithDelayId_to), clearTimeout(o.displayErrorId_to), o.stopVideo(), o.stopToUpdateSubtitles(), o.isPlaying_bl = !1, o.isStopped_bl = !0, o.isCued_bl = !1, o.allowScrubing_bl = !1, o.isSafeToBeControlled_bl = !1, o.isPausedInEvent_bl = !0, o.stopToUpdate(), e || (o.stopVideo(), o.dispatchEvent(i.STOP)))
            }, this.destroy = function() {
                o.iframe_do && (o.iframe_do.screen.removeAttribute("id", s.instanceName_str + "vimeo"), o.removeChild(o.iframe_do), o.iframe_do.destroy(), o.iframe_do = null), o.vimeoPlayer = null
            }, this.stopVideo = function() {
                o.vimeoPlayer.unload().then(function() {}).catch(function(e) {})
            }, this.startToScrub = function() {
                o.isSafeToBeControlled_bl && (o.allowScrubing_bl = !0)
            }, this.stopToScrub = function() {
                o.isSafeToBeControlled_bl && (o.allowScrubing_bl = !1)
            }, this.scrubbAtTime = function(e) {
                o.vimeoPlayer.setCurrentTime(e).then(function(e) {})
            }, this.scrub = function(e) {
                o.isSafeToBeControlled_bl && o.vimeoPlayer.setCurrentTime(e * o.getDuration()).then(function(e) {})
            }, this.setVolume = function(e) {
                null != e && (o.volume = e), o.vimeoPlayer && o.vimeoPlayer.setVolume(e)
            }, this.getDuration = function() {
                if (o.isSafeToBeControlled_bl) return o.vimeoPlayer.getDuration().then(function(e) {
                    o.duration = Math.round(e)
                }), o.duration
            }, this.getCurrentTime = function() {
                if (o.isSafeToBeControlled_bl) return o.vimeoPlayer.getCurrentTime().then(function(e) {
                    o.currentTime = Math.round(e)
                }), o.currentTime
            }, this.formatTime = function(e) {
                var t = Math.floor(e / 3600),
                    s = e % 3600,
                    o = Math.floor(s / 60),
                    i = s % 60,
                    l = Math.ceil(i);
                return o = 10 <= o ? o : "0" + o, l = 10 <= l ? l : "0" + l, isNaN(l) ? "00:00" : t ? 10 <= t ? t + ":" + o + ":" + l : "0" + t + ":" + o + ":" + l : o + ":" + l
            }, this.stopToUpdateSubtitles = function() {
                clearInterval(o.startToUpdateSubtitleId_int)
            }, this.startToUpdateSubtitles = function() {
                clearInterval(o.startToUpdateSubtitleId_int), o.startToUpdateSubtitleId_int = setInterval(o.updateSubtitleHandler, 10)
            }, this.updateSubtitleHandler = function() {
                o.getCurrentTime() && o.dispatchEvent(i.UPDATE_SUBTITLE, {
                    curTime: o.getCurrentTime()
                })
            }, this.init()
        };
        i.setPrototype = function() {
            i.prototype = new FWDUVPDisplayObject("div")
        }, i.UPDATE_SUBTITLE = "updateSubtitle", i.SAFE_TO_SCRUBB = "safeToScrub", i.READY = "ready", i.ERROR = "initError", i.UPDATE = "update", i.UPDATE_TIME = "updateTime", i.LOAD_PROGRESS = "loadProgress", i.PLAY = "play", i.PAUSE = "pause", i.STOP = "stop", i.PLAY_COMPLETE = "playComplete", i.CUED = "cued", i.QUALITY_CHANGE = "qualityChange", e.FWDUVPVimeoScreen = i
    }(window),
    function(e) {
        var c = function(e, t, s, o, i, l, n, a, r, d) {
            var u = this,
                h = c.prototype;
            this.iconCSSString1 = n, this.iconCSSString2 = a, this.nImg = e, this.sPath_str = t, this.dPath_str = s, this.n_sdo, this.s_sdo, this.d_sdo, this.toolTipLabel_str, this.nImg && (this.totalWidth = this.nImg.width, this.totalHeight = this.nImg.height), this.normalCalssName = r, this.selectedCalssName = d, this.useHEX = o, this.nBC = i, this.sBC = l, this.isSetToDisabledState_bl = !1, this.isDisabled_bl = !1, this.isSelectedFinal_bl = !1, this.isActive_bl = !1, this.isMbl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !0, this.useFontAwesome_bl = Boolean(this.iconCSSString1), u.init = function() {
                u.setupMainContainers(), u.setNormalState(!1), u.setEnabledState()
            }, u.setupMainContainers = function() {
                if (u.useFontAwesome_bl) u.setOverflow("visible"), u.n_sdo = new FWDUVPTransformDisplayObject("div"), u.n_sdo.setInnerHTML(u.iconCSSString1), u.addChild(u.n_sdo), u.d_sdo = new FWDUVPTransformDisplayObject("div"), u.d_sdo.setInnerHTML(u.iconCSSString2), u.addChild(u.d_sdo), u.setFinalSize();
                else if (u.useHEX ? (u.n_sdo = new FWDUVPTransformDisplayObject("div"), u.n_sdo.setWidth(u.totalWidth), u.n_sdo.setHeight(u.totalHeight), u.n_sdo_canvas = FWDUVPUtils.getCanvasWithModifiedColor(u.nImg, u.nBC).canvas, u.n_sdo.screen.appendChild(u.n_sdo_canvas)) : (u.n_sdo = new FWDUVPTransformDisplayObject("img"), u.n_sdo.setScreen(u.nImg)), u.addChild(u.n_sdo), u.allowToCreateSecondButton_bl) {
                    u.img1 = new Image, u.img1.src = u.sPath_str;
                    var e = new Image;
                    u.sImg = e, u.useHEX ? (u.s_sdo = new FWDUVPTransformDisplayObject("div"), u.s_sdo.setWidth(u.totalWidth), u.s_sdo.setHeight(u.totalHeight), u.img1.onload = function() {
                        u.s_sdo_canvas = FWDUVPUtils.getCanvasWithModifiedColor(u.img1, u.sBC).canvas, u.s_sdo.screen.appendChild(u.s_sdo_canvas)
                    }) : (u.s_sdo = new FWDUVPDisplayObject("img"), u.s_sdo.setScreen(u.img1), u.s_sdo.setWidth(u.totalWidth), u.s_sdo.setHeight(u.totalHeight)), u.s_sdo.setAlpha(0), u.addChild(u.s_sdo), u.dPath_str && (e.src = u.dPath_str, u.d_sdo = new FWDUVPDisplayObject("img"), u.d_sdo.setScreen(e), u.d_sdo.setWidth(u.totalWidth), u.d_sdo.setHeight(u.totalHeight), u.d_sdo.setX(-100), u.addChild(u.d_sdo))
                }
                u.setWidth(u.totalWidth), u.setHeight(u.totalHeight), u.setButtonMode(!0), u.hasPointerEvent_bl ? (u.screen.addEventListener("pointerup", u.onMouseUp), u.screen.addEventListener("pointerover", u.onMouseOver), u.screen.addEventListener("pointerout", u.onMouseOut)) : u.screen.addEventListener && (u.screen.addEventListener("mouseover", u.onMouseOver), u.screen.addEventListener("mouseout", u.onMouseOut), u.screen.addEventListener("mouseup", u.onMouseUp), u.screen.addEventListener("touchstart", u.onMouseDown), u.screen.addEventListener("touchstart", u.onMouseUp))
            }, this.setFinalSize = function() {
                u.setWidth(u.n_sdo.getWidth()), u.setHeight(u.n_sdo.getHeight()), u.buttonWidth = u.w, u.buttonHeight = u.h, 0 == u.w && setTimeout(function() {
                    u.setFinalSize()
                }, 300)
            }, this.setNormalState = function(e) {
                u.useFontAwesome_bl ? (FWDAnimation.killTweensOf(u.n_sdo.screen), FWDAnimation.killTweensOf(u.d_sdo.screen), e ? (FWDAnimation.to(u.n_sdo.screen, .8, {
                    className: u.normalCalssName,
                    ease: Expo.easeOut
                }), FWDAnimation.to(u.d_sdo.screen, .8, {
                    className: u.normalCalssName,
                    ease: Expo.easeOut
                })) : (u.n_sdo.screen.className = u.normalCalssName, u.d_sdo.screen.className = u.normalCalssName)) : (FWDAnimation.killTweensOf(u.s_sdo), FWDAnimation.to(u.s_sdo, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }))
            }, this.setSelectedState = function(e) {
                u.useFontAwesome_bl ? (FWDAnimation.killTweensOf(u.n_sdo.screen), FWDAnimation.killTweensOf(u.d_sdo.screen), e ? (FWDAnimation.to(u.n_sdo.screen, .8, {
                    className: u.selectedCalssName,
                    ease: Expo.easeOut
                }), FWDAnimation.to(u.d_sdo.screen, .8, {
                    className: u.selectedCalssName,
                    ease: Expo.easeOut
                })) : (u.n_sdo.screen.className = u.selectedCalssName, u.d_sdo.screen.className = u.selectedCalssName)) : (FWDAnimation.killTweensOf(u.s_sdo), FWDAnimation.to(u.s_sdo, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                }))
            }, u.onMouseOver = function(e) {
                if (!e.pointerType || "mouse" == e.pointerType) {
                    if (u.isDisabled_bl || u.isSelectedFinal_bl) return;
                    u.dispatchEvent(c.MOUSE_OVER, {
                        e: e
                    }), u.setSelectedState(!0)
                }
            }, u.onMouseOut = function(e) {
                if (!e.pointerType || "mouse" == e.pointerType) {
                    if (u.isDisabled_bl || u.isSelectedFinal_bl) return;
                    u.dispatchEvent(c.MOUSE_OUT, {
                        e: e
                    }), u.setNormalState(!0)
                }
            }, u.onMouseDown = function(e) {
                e.preventDefault && e.preventDefault(), u.isDisabled_bl || 2 == e.button || u.isSelectedFinal_bl || u.dispatchEvent(c.MOUSE_DOWN, {
                    e: e
                })
            }, u.onMouseUp = function(e) {
                e.preventDefault && e.preventDefault(), u.isDisabled_bl || 2 == e.button || u.isSelectedFinal_bl || u.dispatchEvent(c.MOUSE_UP, {
                    e: e
                })
            }, u.setSelctedFinal = function() {
                u.isSelectedFinal_bl = !0, FWDAnimation.killTweensOf(u.s_sdo), FWDAnimation.to(u.s_sdo, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), u.setButtonMode(!1)
            }, u.setUnselctedFinal = function() {
                u.isSelectedFinal_bl = !1, FWDAnimation.to(u.s_sdo, .8, {
                    alpha: 0,
                    delay: .1,
                    ease: Expo.easeOut
                }), u.setButtonMode(!0)
            }, this.setDisabledState = function() {
                u.isSetToDisabledState_bl = !0, u.useFontAwesome_bl ? (u.n_sdo.setX(-1e4), u.d_sdo.setX(0)) : (u.d_sdo.setX(0), FWDAnimation.killTweensOf(u.d_sdo), FWDAnimation.to(u.d_sdo, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }))
            }, this.setEnabledState = function() {
                u.isSetToDisabledState_bl = !1, u.useFontAwesome_bl ? (u.n_sdo.setX(0), u.d_sdo.setX(-1e4)) : (u.d_sdo.setX(-100), FWDAnimation.killTweensOf(u.d_sdo), FWDAnimation.to(u.d_sdo, .8, {
                    alpha: 0,
                    delay: .1,
                    ease: Expo.easeOut
                }))
            }, this.disable = function() {
                u.isDisabled_bl = !0, u.setButtonMode(!1)
            }, this.enable = function() {
                u.isDisabled_bl = !1, u.setButtonMode(!0)
            }, u.updateHEXColors = function(e, t) {
                FWDUVPUtils.changeCanvasHEXColor(u.nImg, u.n_sdo_canvas, e), FWDUVPUtils.changeCanvasHEXColor(u.img1, u.s_sdo_canvas, t)
            }, u.destroy = function() {
                u.isMbl ? u.hasPointerEvent_bl ? (u.screen.removeEventListener("pointerdown", u.onMouseUp), u.screen.removeEventListener("pointerover", u.onMouseOver), u.screen.removeEventListener("pointerout", u.onMouseOut)) : (u.screen.removeEventListener("touchstart", u.onMouseDown), u.screen.removeEventListener("touchend", u.onMouseUp)) : u.screen.removeEventListener && (u.screen.removeEventListener("mouseover", u.onMouseOver), u.screen.removeEventListener("mouseout", u.onMouseOut), u.screen.removeEventListener("mousedown", u.onMouseUp)), FWDAnimation.killTweensOf(u.s_sdo), u.n_sdo.destroy(), u.s_sdo.destroy(), u.d_sdo && (FWDAnimation.killTweensOf(u.d_sdo), u.d_sdo.destroy()), u.nImg = null, u.sImg = null, u.dImg = null, u.n_sdo = null, u.s_sdo = null, u.d_sdo = null, sImg = e = null, dImg = null, u.toolTipLabel_str = null, u.init = null, u.setupMainContainers = null, u.onMouseOver = null, u.onMouseOut = null, u.onClick = null, u.onMouseDown = null, u.setSelctedFinal = null, u.setUnselctedFinal = null, u.setInnerHTML(""), h.destroy(), h = u = null, c.prototype = null
            }, u.init()
        };
        c.setPrototype = function() {
            c.prototype = null, c.prototype = new FWDUVPDisplayObject("div")
        }, c.SHOW_TOOLTIP = "showTooltip", c.CLICK = "onClick", c.MOUSE_OVER = "onMouseOver", c.MOUSE_OUT = "onMouseOut", c.MOUSE_UP = "onMouseUp", c.MOUSE_DOWN = "onMouseDown", c.prototype = null, e.FWDUVPVolumeButton = c
    }(window),
    function(e) {
        var o = function(t, e) {
            var n = this;
            o.prototype;
            this.videoHolder_do = null, this.ytb = null, this.lastQuality_str = "auto", this.volume = e, this.updateVideoId_int, this.updatePreloadId_int, this.controllerHeight = t.data.controllerHeight, this.hasHours_bl = !1, this.hasBeenCreatedOnce_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !1, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isPausedInEvent_bl = !0, this.isShowed_bl = !0, this.isQualityArrayDisapatched_bl = !1, this.playsinline = t.data.playsinline ? 1 : 0, this.isMbl = FWDUVPUtils.isMobile, this.init = function() {
                n.hasTransform3d_bl = !1, n.hasTransform2d_bl = !1, n.setBkColor("#000"), n.setBackfaceVisibility(), t.videoHolder_do.addChildAt(n, 0), n.resizeAndPosition(), n.setupVideo()
            }, this.setupVideo = function() {
                n.videoHolder_do = new FWDUVPDisplayObject("div"), n.videoHolder_do.hasTransform3d_bl = !1, n.videoHolder_do.hasTransform2d_bl = !1, n.videoHolder_do.screen.setAttribute("id", t.instanceName_str + "youtube"), n.videoHolder_do.getStyle().width = "100%", n.videoHolder_do.getStyle().height = "100%", n.videoHolder_do.setBackfaceVisibility(), n.addChild(n.videoHolder_do), n.ytb = new YT.Player(t.instanceName_str + "youtube", {
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        controls: 0,
                        disablekb: 0,
                        loop: 0,
                        autoplay: 0,
                        wmode: "opaque",
                        showinfo: 0,
                        rel: 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        cc_load_policy: 0,
                        fs: 0,
                        html5: 1,
                        playsinline: n.playsinline
                    },
                    events: {
                        onReady: n.playerReadyHandler,
                        onError: n.playerErrorHandler,
                        onStateChange: n.stateChangeHandler,
                        onPlaybackQualityChange: n.qualityChangeHandler
                    }
                }), n.setBkColor("#FFFFFF")
            }, this.playerReadyHandler = function() {
                n.resizeAndPosition(), t.data.aom_bl && n.ytb.mute(), n.dispatchEvent(o.READY), n.hasBeenCreatedOnce_bl = !0
            }, this.stateChangeHandler = function(e) {
                if (-1 == e.data && n.isCued_bl && n.isMbl && (n.isStopped_bl = !1, FWDUVPlayer.stopAllVideos(t)), e.data == YT.PlayerState.PLAYING) n.isSafeToBeControlled_bl || (n.isStopped_bl = !1, n.isSafeToBeControlled_bl = !0, n.isPlaying_bl = !0, n.hasHours_bl = 0 < Math.floor(n.ytb.getDuration() / 3600), n.setVolume(t.volume), n.startToUpdate(), n.startToPreload(), n.scrub(1e-5), n.isMbl || n.setQuality(n.lastQuality_str), n.ytb.getAvailableQualityLevels() && 0 != n.ytb.getAvailableQualityLevels().length && n.dispatchEvent(o.QUALITY_CHANGE, {
                    qualityLevel: n.ytb.getPlaybackQuality(),
                    levels: n.ytb.getAvailableQualityLevels()
                }), n.startToUpdateSubtitles(), n.dispatchEvent(o.SAFE_TO_SCRUBB)), n.isPausedInEvent_bl && n.dispatchEvent(o.PLAY), n.isPausedInEvent_bl = !1, n.hasError_bl = !1;
                else if (e.data == YT.PlayerState.PAUSED) {
                    if (!n.isSafeToBeControlled_bl) return;
                    n.isStopped_bl = !1, n.isPausedInEvent_bl || n.dispatchEvent(o.PAUSE), n.isPausedInEvent_bl = !0
                } else e.data == YT.PlayerState.ENDED ? n.ytb.getCurrentTime() && 0 < n.ytb.getCurrentTime() && (n.isStopped_bl = !1, n.stopToUpdateSubtitles(), setTimeout(function() {
                    n.dispatchEvent(o.PLAY_COMPLETE)
                }, 100)) : e.data == YT.PlayerState.CUED && (n.isStopped_bl || n.dispatchEvent(o.CUED), n.isCued_bl = !0)
            }, this.qualityChangeHandler = function(e) {
                n.ytb.getAvailableQualityLevels() && 0 != n.ytb.getAvailableQualityLevels().length && n.dispatchEvent(o.QUALITY_CHANGE, {
                    qualityLevel: n.ytb.getPlaybackQuality()
                })
            }, this.playerErrorHandler = function(e) {
                if (n.isPausedInEvent_bl = !0, !n.isStopped_bl && !n.hasError_bl) {
                    var t = "";
                    n.hasError_bl = !0, 2 == e.data ? t = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks." : 5 == e.data ? t = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred." : 100 == e.data ? t = "The youtube video request was not found, probably the video ID is incorrect." : 101 != e.data && 150 != e.data || (t = "The owner of the requested video does not allow it to be played in embedded players."), n.dispatchEvent(o.ERROR, {
                        text: t
                    })
                }
            }, this.resizeAndPosition = function() {
                if (n.setWidth(t.tempVidStageWidth), n.setHeight(t.tempVidStageHeight), n.videoHolder_do && (n.videoHolder_do.setWidth(t.tempVidStageWidth), n.videoHolder_do.setHeight(t.tempVidStageHeight), n.ytb && n.ytb.a)) try {
                    n.ytb.a.width = t.tempVidStageWidth, n.ytb.a.height = t.tempVidStageHeight, n.ytb.a.style.width = t.tempVidStageWidth + "px", n.ytb.a.style.height = t.tempVidStageHeight + "px"
                } catch (e) {}
            }, this.setSource = function(e) {
                e && (n.sourcePath_str = e), clearInterval(n.setSourceId_int), n.setSourceId_int = setInterval(function() {
                    n.ytb.cueVideoById && n.ytb.setPlaybackRate && (n.ytb.cueVideoById(n.sourcePath_str), (!t.isMbl && (t.data.autoPlay_bl || t.isThumbClick_bl || t.isAdd_bl && !t.loadAddFirstTime_bl) && !t.lightBox_do || t.lightBox_do && t.lightBox_do.isShowed_bl) && (t.videoPoster_do.hide(!0), t.lrgPlayBtn.hide(), t.play()), clearInterval(n.setSourceId_int))
                }, 50)
            }, this.play = function(e) {
                FWDUVPlayer.curInstance = t, n.isPlaying_bl = !0, n.hasError_bl = !1, n.hasStarted_bl = !0;
                try {
                    n.ytb.playVideo(), n.startToUpdate()
                } catch (e) {}
                n.isStopped_bl = !1
            }, this.pause = function() {
                if (!n.isStopped_bl && !n.hasError_bl) {
                    n.isPlaying_bl = !1;
                    try {
                        n.ytb.pauseVideo()
                    } catch (e) {}
                    n.stopToUpdate()
                }
            }, this.togglePlayPause = function() {
                n.isPlaying_bl ? n.pause() : n.play()
            }, this.resume = function() {
                n.isStopped_bl || n.play()
            }, this.startToUpdate = function() {
                clearInterval(n.updateVideoId_int), n.updateVideoId_int = setInterval(n.updateVideo, 500)
            }, this.stopToUpdate = function() {
                clearInterval(n.updateVideoId_int)
            }, this.updateVideo = function() {
                var e;
                if (n.ytb) {
                    n.allowScrubing_bl || (e = n.ytb.getCurrentTime() / n.ytb.getDuration(), n.dispatchEvent(o.UPDATE, {
                        percent: e
                    }));
                    var t = n.formatTime(n.ytb.getDuration()),
                        s = n.formatTime(n.ytb.getCurrentTime());
                    n.dispatchEvent(o.UPDATE_TIME, {
                        curTime: s,
                        totalTime: t,
                        seconds: n.ytb.getCurrentTime(),
                        totalTimeInSeconds: n.ytb.getDuration()
                    })
                } else stopToUpdate()
            }, this.startToPreload = function() {
                clearInterval(n.preloadVideoId_int), n.updatePreloadId_int = setInterval(n.updateProgress, 500)
            }, this.stopToPreload = function() {
                clearInterval(n.updatePreloadId_int)
            }, this.updateProgress = function() {
                if (n.ytb) {
                    var e = n.ytb.getVideoLoadedFraction();
                    n.dispatchEvent(o.LOAD_PROGRESS, {
                        percent: e
                    })
                } else stopToPreload()
            }, this.stop = function() {
                n.isStopped_bl || (n.isPlaying_bl = !1, n.isStopped_bl = !0, n.hasStarted_bl = !1, n.isCued_bl = !1, clearInterval(n.setSourceId_int), n.allowScrubing_bl = !1, n.isSafeToBeControlled_bl = !1, n.isQualityArrayDisapatched_bl = !1, n.isPausedInEvent_bl = !0, n.stopToUpdateSubtitles(), n.stopToUpdate(), n.stopToPreload(), n.stopVideo(), n.dispatchEvent(o.STOP), n.dispatchEvent(o.LOAD_PROGRESS, {
                    percent: 0
                }))
            }, this.destroyYoutube = function() {
                n.videoHolder_do && (n.videoHolder_do.screen.removeAttribute("id", t.instanceName_str + "youtube"), n.videoHolder_do.destroy(), n.videoHolder_do = null), n.ytb && n.ytb.destroy(), n.ytb = null
            }, this.stopVideo = function() {
                n.ytb.cueVideoById(n.sourcePath_str)
            }, this.setPlaybackRate = function(e) {
                n.ytb && !n.isMbl && (e && (n.rate = e), n.ytb.setPlaybackRate && n.ytb.setPlaybackRate(Number(n.rate)))
            }, this.stopToUpdateSubtitles = function() {
                clearInterval(n.startToUpdateSubtitleId_int)
            }, this.startToUpdateSubtitles = function() {
                clearInterval(n.startToUpdateSubtitleId_int), n.startToUpdateSubtitleId_int = setInterval(n.updateSubtitleHandler, 10)
            }, this.updateSubtitleHandler = function() {
                n.dispatchEvent(o.UPDATE_SUBTITLE, {
                    curTime: n.ytb.getCurrentTime()
                })
            }, this.startToScrub = function() {
                n.isSafeToBeControlled_bl && (n.allowScrubing_bl = !0)
            }, this.stopToScrub = function() {
                n.isSafeToBeControlled_bl && (n.allowScrubing_bl = !1)
            }, this.scrubbAtTime = function(e) {
                n.isSafeToBeControlled_bl && n.ytb.seekTo(e)
            }, this.scrub = function(e) {
                n.isSafeToBeControlled_bl && n.ytb.seekTo(e * n.ytb.getDuration())
            }, this.setVolume = function(e) {
                null != e && (n.volume = e), n.ytb && (n.ytb.setVolume(100 * e), e && n.ytb.unMute())
            }, this.setQuality = function(e) {
                n.lastQuality_str = e, n.ytb.setPlaybackQuality(e)
            }, this.formatTime = function(e) {
                var t = Math.floor(e / 3600),
                    s = e % 3600,
                    o = Math.floor(s / 60),
                    i = s % 60,
                    l = Math.ceil(i);
                return o = 10 <= o ? o : "0" + o, l = 10 <= l ? l : "0" + l, isNaN(l) ? "00:00" : n.hasHours_bl ? t + ":" + o + ":" + l : o + ":" + l
            }, this.init()
        };
        o.setPrototype = function() {
            o.prototype = new FWDUVPDisplayObject("div")
        }, o.UPDATE_SUBTITLE = "updateSubtitle", o.READY = "ready", o.ERROR = "error", o.UPDATE = "update", o.UPDATE_TIME = "updateTime", o.SAFE_TO_SCRUBB = "safeToControll", o.LOAD_PROGRESS = "loadProgress", o.PLAY = "play", o.PAUSE = "pause", o.STOP = "stop", o.PLAY_COMPLETE = "playComplete", o.CUED = "cued", o.QUALITY_CHANGE = "qualityChange", e.FWDUVPYoutubeScreen = o
    }(window),
    function() {
        var n = function(e, t, s, o, i) {
            var l = this;
            n.prototype;
            this.text_do = null, this.hd_do = null, this.dumy_do = null, this.label_str = e, this.nBC = t, this.sBC = s, this.hdPath_str = o, this.id = i, this.totalWidth = 0, this.totalHeight = 23, this.hdWidth = 7, this.hdHeight = 5, this.hasHd_bl = l.hdPath_str, this.isMbl = FWDUVPUtils.isMobile, this.isDisabled_bl = !1, this.init = function() {
                l.setBackfaceVisibility(), l.setupMainContainers(), l.setHeight(l.totalHeight)
            }, this.setupMainContainers = function() {
                if (l.text_do = new FWDUVPDisplayObject("div"), l.text_do.setBackfaceVisibility(), l.text_do.hasTransform3d_bl = !1, l.text_do.hasTransform2d_bl = !1, l.text_do.getStyle().display = "inline-block", l.text_do.getStyle().whiteSpace = "nowrap", l.text_do.getStyle().fontFamily = "Arial", l.text_do.getStyle().fontSize = "12px", l.text_do.getStyle().color = l.nBC, l.text_do.getStyle().fontSmoothing = "antialiased", l.text_do.getStyle().webkitFontSmoothing = "antialiased", l.text_do.getStyle().textRendering = "optimizeLegibility", l.text_do.setInnerHTML(l.label_str), l.addChild(l.text_do), l.hasHd_bl) {
                    var e = new Image;
                    e.src = l.hdPath_str, l.hd_do = new FWDUVPDisplayObject("img"), l.hd_do.setScreen(e), l.hd_do.setWidth(l.hdWidth), l.hd_do.setHeight(l.hdHeight), l.addChild(l.hd_do)
                }
                l.dumy_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (l.dumy_do.setBkColor("#FF0000"), l.dumy_do.setAlpha(1e-4)), l.dumy_do.setButtonMode(!0), l.dumy_do.setHeight(l.totalHeight), l.addChild(l.dumy_do), l.hasPointerEvent_bl ? (l.screen.addEventListener("pointerup", l.onMouseUp), l.screen.addEventListener("pointerover", l.onMouseOver), l.screen.addEventListener("pointerout", l.onMouseOut)) : l.screen.addEventListener && (l.isMbl || (l.screen.addEventListener("mouseover", l.onMouseOver), l.screen.addEventListener("mouseout", l.onMouseOut), l.screen.addEventListener("mouseup", l.onMouseUp)), l.screen.addEventListener("touchend", l.onMouseUp))
            }, this.onMouseOver = function(e) {
                l.isDisabled_bl || (l.setSelectedState(!0), l.dispatchEvent(n.MOUSE_OVER, {
                    e: e,
                    id: l.id
                }))
            }, this.onMouseOut = function(e) {
                l.isDisabled_bl || (l.setNormalState(!0), l.dispatchEvent(n.MOUSE_OUT, {
                    e: e,
                    id: l.id
                }))
            }, this.onMouseUp = function(e) {
                l.isDisabled_bl || 2 == e.button || (e.preventDefault && e.preventDefault(), l.dispatchEvent(n.CLICK, {
                    e: e,
                    id: l.id
                }))
            }, this.setFinalSize = function() {
                var e = l.text_do.getWidth() + 34,
                    t = l.text_do.getHeight();
                l.text_do.setX(18), l.text_do.setY(parseInt((l.totalHeight - t) / 2)), l.hd_do && (l.hd_do.setX(e - 12), l.hd_do.setY(l.text_do.y + 1)), l.dumy_do.setWidth(e), l.setWidth(e)
            }, this.updateText = function(e) {
                this.label_str = e, this.text_do.setInnerHTML(l.label_str), l.hd_do && ("highres" == l.label_str || "hd1080" == l.label_str || "hd720" == l.label_str || "hd1440" == l.label_str || "hd2160" == l.label_str ? l.hd_do.setVisible(!0) : l.hd_do.setVisible(!1))
            }, this.setSelectedState = function(e) {
                this.isSelected_bl = !0, FWDAnimation.killTweensOf(l.text_do), e ? FWDAnimation.to(l.text_do.screen, .5, {
                    css: {
                        color: l.sBC
                    },
                    ease: Expo.easeOut
                }) : l.text_do.getStyle().color = l.sBC
            }, this.setNormalState = function(e) {
                this.isSelected_bl = !1, FWDAnimation.killTweensOf(l.text_do), e ? FWDAnimation.to(l.text_do.screen, .5, {
                    css: {
                        color: l.nBC
                    },
                    ease: Expo.easeOut
                }) : l.text_do.getStyle().color = l.nBC
            }, this.disable = function() {
                l.isDisabled_bl = !0, FWDAnimation.killTweensOf(l.text_do), l.setSelectedState(!0), l.dumy_do.setButtonMode(!1)
            }, this.enable = function() {
                l.isDisabled_bl = !1, FWDAnimation.killTweensOf(l.text_do), l.setNormalState(!0), l.dumy_do.setButtonMode(!0)
            }, l.init()
        };
        n.setPrototype = function() {
            n.prototype = new FWDUVPDisplayObject("div")
        }, n.MOUSE_OVER = "onMouseOver", n.MOUSE_OUT = "onMouseOut", n.CLICK = "onClick", n.prototype = null, window.FWDUVPYTBQButton = n
    }(window);
