function A(e, t, n) {
    var r = t || 0,
        i = 0;
    "string" == typeof e ? (i = n || e.length, this.a = function(t) {
        return e.charCodeAt(t + r) & 255
    }) : "unknown" == typeof e && (i = n || IEBinary_getLength(e), this.a = function(t) {
        return IEBinary_getByteAt(e, t + r)
    });
    this.l = function(e, t) {
        for (var n = Array(t), r = 0; r < t; r++) n[r] = this.a(e + r);
        return n
    };
    this.h = function() {
        return i
    };
    this.d = function(e, t) {
        return 0 != (this.a(e) & 1 << t)
    };
    this.w = function(e) {
        e = (this.a(e + 1) << 8) + this.a(e);
        0 > e && (e += 65536);
        return e
    };
    this.i = function(e) {
        var t = this.a(e),
            n = this.a(e + 1),
            r = this.a(e + 2);
        e = this.a(e + 3);
        t = (((t << 8) + n << 8) + r << 8) + e;
        0 > t && (t += 4294967296);
        return t
    };
    this.o = function(e) {
        var t = this.a(e),
            n = this.a(e + 1);
        e = this.a(e + 2);
        t = ((t << 8) + n << 8) + e;
        0 > t && (t += 16777216);
        return t
    };
    this.c = function(e, t) {
        for (var n = [], r = e, i = 0; r < e + t; r++, i++) n[i] = String.fromCharCode(this.a(r));
        return n.join("")
    };
    this.e = function(e, t, n) {
        e = this.l(e, t);
        switch (n.toLowerCase()) {
            case "utf-16":
            case "utf-16le":
            case "utf-16be":
                t = n;
                var r, i = 0,
                    s = 1;
                n = 0;
                r = Math.min(r || e.length, e.length);
                254 == e[0] && 255 == e[1] ? (t = !0, i = 2) : 255 == e[0] && 254 == e[1] && (t = !1, i = 2);
                t && (s = 0, n = 1);
                t = [];
                for (var o = 0; i < r; o++) {
                    var u = e[i + s],
                        a = (u << 8) + e[i + n],
                        i = i + 2;
                    if (0 == a) break;
                    else 216 > u || 224 <= u ? t[o] = String.fromCharCode(a) : (u = (e[i + s] << 8) + e[i + n], i += 2, t[o] = String.fromCharCode(a, u))
                }
                e = new String(t.join(""));
                e.g = i;
                break;
            case "utf-8":
                r = 0;
                i = Math.min(i || e.length, e.length);
                239 == e[0] && 187 == e[1] && 191 == e[2] && (r = 3);
                s = [];
                for (n = 0; r < i && (t = e[r++], 0 != t); n++) 128 > t ? s[n] = String.fromCharCode(t) : 194 <= t && 224 > t ? (o = e[r++], s[n] = String.fromCharCode(((t & 31) << 6) + (o & 63))) : 224 <= t && 240 > t ? (o = e[r++], a = e[r++], s[n] = String.fromCharCode(((t & 255) << 12) + ((o & 63) << 6) + (a & 63))) : 240 <= t && 245 > t && (o = e[r++], a = e[r++], u = e[r++], t = ((t & 7) << 18) + ((o & 63) << 12) + ((a & 63) << 6) + (u & 63) - 65536, s[n] = String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
                e = new String(s.join(""));
                e.g = r;
                break;
            default:
                i = [];
                s = s || e.length;
                for (r = 0; r < s;) {
                    n = e[r++];
                    if (0 == n) break;
                    i[r - 1] = String.fromCharCode(n)
                }
                e = new String(i.join(""));
                e.g = r
        }
        return e
    };
    this.f = function(e, t) {
        t()
    }
}

function B(e, t, n) {
    function r(e, t, n, r, s, o) {
        var u = i();
        u ? ("undefined" === typeof o && (o = !0), t && ("undefined" != typeof u.onload ? u.onload = function() {
            "200" == u.status || "206" == u.status ? (u.fileSize = s || u.getResponseHeader("Content-Length"), t(u)) : n && n();
            u = null
        } : u.onreadystatechange = function() {
            4 == u.readyState && ("200" == u.status || "206" == u.status ? (u.fileSize = s || u.getResponseHeader("Content-Length"), t(u)) : n && n(), u = null)
        }), u.open("GET", e, o), u.overrideMimeType && u.overrideMimeType("text/plain; charset=x-user-defined"), r && u.setRequestHeader("Range", "bytes=" + r[0] + "-" + r[1]), u.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT"), u.send(null)) : n && n()
    }

    function i() {
        var e = null;
        window.XMLHttpRequest ? e = new XMLHttpRequest : window.ActiveXObject && (e = new ActiveXObject("Microsoft.XMLHTTP"));
        return e
    }

    function s(e, t) {
        var n = i();
        n && (t && ("undefined" != typeof n.onload ? n.onload = function() {
            "200" == n.status && t(this);
            n = null
        } : n.onreadystatechange = function() {
            4 == n.readyState && ("200" == n.status && t(this), n = null)
        }), n.open("HEAD", e, !0), n.send(null))
    }

    function o(e, t) {
        function o(e) {
            var t = ~~(e[0] / i) - s;
            e = ~~(e[1] / i) + 1 + s;
            0 > t && (t = 0);
            e >= blockTotal && (e = blockTotal - 1);
            return [t, e]
        }

        function u(s, o) {
            for (; l[s[0]];)
                if (s[0]++, s[0] > s[1]) {
                    o && o();
                    return
                } for (; l[s[1]];)
                if (s[1]--, s[0] > s[1]) {
                    o && o();
                    return
                } var u = [s[0] * i, (s[1] + 1) * i - 1];
            r(e, function(e) {
                parseInt(e.getResponseHeader("Content-Length"), 10) == t && (s[0] = 0, s[1] = blockTotal - 1, u[0] = 0, u[1] = t - 1);
                e = {
                    data: e.N || e.responseText,
                    offset: u[0]
                };
                for (var n = s[0]; n <= s[1]; n++) l[n] = e;
                o && o()
            }, n, u, a, !!o)
        }
        var i, s;
        var a, f = new A("", 0, t),
            l = [];
        i = i || 2048;
        s = "undefined" === typeof s ? 0 : s;
        blockTotal = ~~((t - 1) / i) + 1;
        for (var c in f) f.hasOwnProperty(c) && "function" === typeof f[c] && (this[c] = f[c]);
        this.a = function(e) {
            var t;
            u(o([e, e]));
            t = l[~~(e / i)];
            if ("string" == typeof t.data) return t.data.charCodeAt(e - t.offset) & 255;
            if ("unknown" == typeof t.data) return IEBinary_getByteAt(t.data, e - t.offset)
        };
        this.f = function(e, t) {
            u(o(e), t)
        }
    }(function() {
        s(e, function(n) {
            n = parseInt(n.getResponseHeader("Content-Length"), 10) || -1;
            t(new o(e, n))
        })
    })()
}(function(e) {
    function n() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        var r;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                t.dumy.style.position = "absolute";
                r = t.dumy.getBoundingClientRect().left;
                t.dumy.style[n] = "translate3d(500px, 0px, 0px)";
                r = Math.abs(t.dumy.getBoundingClientRect().left - r);
                if (r > 100 && r < 900) {
                    try {
                        document.documentElement.removeChild(t.dumy)
                    } catch (i) {}
                    return true
                }
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (i) {}
        return false
    }

    function r() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                return true
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (r) {}
        return false
    }
    var t = function() {};
    t.dumy = document.createElement("div");
    t.trim = function(e) {
        return e.replace(/\s/gi, "")
    };
    t.splitAndTrim = function(e, n) {
        var r = e.split(",");
        var i = r.length;
        for (var s = 0; s < i; s++) {
            if (n) r[s] = t.trim(r[s])
        }
        return r
    };
    t.indexOfArray = function(e, t) {
        var n = e.length;
        for (var r = 0; r < n; r++) {
            if (e[r] === t) return r
        }
        return -1
    };
    t.randomizeArray = function(e) {
        var t = [];
        var n = e.concat();
        var r = n.length;
        for (var i = 0; i < r; i++) {
            var s = Math.floor(Math.random() * n.length);
            t.push(n[s]);
            n.splice(s, 1)
        }
        return t
    };
    t.parent = function(e, t) {
        if (t === undefined) t = 1;
        while (t-- && e) e = e.parentNode;
        if (!e || e.nodeType !== 1) return null;
        return e
    };
    t.sibling = function(e, t) {
        while (e && t !== 0) {
            if (t > 0) {
                if (e.nextElementSibling) {
                    e = e.nextElementSibling
                } else {
                    for (var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
                }
                t--
            } else {
                if (e.previousElementSibling) {
                    e = e.previousElementSibling
                } else {
                    for (var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
                }
                t++
            }
        }
        return e
    };
    t.getChildAt = function(e, n) {
        var r = t.getChildren(e);
        if (n < 0) n += r.length;
        if (n < 0) return null;
        return r[n]
    };
    t.getChildById = function(e) {
        return document.getElementById(e) || undefined
    };
    t.getChildren = function(e, t) {
        var n = [];
        for (var r = e.firstChild; r != null; r = r.nextSibling) {
            if (t) {
                n.push(r)
            } else if (r.nodeType === 1) {
                n.push(r)
            }
        }
        return n
    };
    t.getChildrenFromAttribute = function(e, n, r) {
        var i = [];
        for (var s = e.firstChild; s != null; s = s.nextSibling) {
            if (r && t.hasAttribute(s, n)) {
                i.push(s)
            } else if (s.nodeType === 1 && t.hasAttribute(s, n)) {
                i.push(s)
            }
        }
        return i.length == 0 ? undefined : i
    };
    t.getChildFromNodeListFromAttribute = function(e, n, r) {
        for (var i = e.firstChild; i != null; i = i.nextSibling) {
            if (r && t.hasAttribute(i, n)) {
                return i
            } else if (i.nodeType === 1 && t.hasAttribute(i, n)) {
                return i
            }
        }
        return undefined
    };
    t.getAttributeValue = function(e, n) {
        if (!t.hasAttribute(e, n)) return undefined;
        return e.getAttribute(n)
    };
    t.hasAttribute = function(e, t) {
        if (e.hasAttribute) {
            return e.hasAttribute(t)
        } else {
            var n = e.getAttribute(t);
            return n ? true : false
        }
    };
    t.insertNodeAt = function(e, n, r) {
        var i = t.children(e);
        if (r < 0 || r > i.length) {
            throw new Error("invalid index!")
        } else {
            e.insertBefore(n, i[r])
        }
    };
    t.hasCanvas = function() {
        return Boolean(document.createElement("canvas"))
    };
    t.hitTest = function(e, t, n) {
        var r = false;
        if (!e) throw Error("Hit test target is null!");
        var i = e.getBoundingClientRect();
        if (t >= i.left && t <= i.left + (i.right - i.left) && n >= i.top && n <= i.top + (i.bottom - i.top)) return true;
        return false
    };
    t.getScrollOffsets = function() {
        if (e.pageXOffset != null) return {
            x: e.pageXOffset,
            y: e.pageYOffset
        };
        if (document.compatMode == "CSS1Compat") {
            return {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            }
        }
    };
    t.getViewportSize = function() {
        if (t.hasPointerEvent && navigator.msMaxTouchPoints > 1) {
            return {
                w: document.documentElement.clientWidth || e.innerWidth,
                h: document.documentElement.clientHeight || e.innerHeight
            }
        }
        if (t.isMobile) return {
            w: e.innerWidth,
            h: e.innerHeight
        };
        return {
            w: document.documentElement.clientWidth || e.innerWidth,
            h: document.documentElement.clientHeight || e.innerHeight
        }
    };
    t.getViewportMouseCoordinates = function(e) {
        var n = t.getScrollOffsets();
        if (e.touches) {
            return {
                screenX: e.touches[0] == undefined ? e.touches.pageX - n.x : e.touches[0].pageX - n.x,
                screenY: e.touches[0] == undefined ? e.touches.pageY - n.y : e.touches[0].pageY - n.y
            }
        }
        return {
            screenX: e.clientX == undefined ? e.pageX - n.x : e.clientX,
            screenY: e.clientY == undefined ? e.pageY - n.y : e.clientY
        }
    };
    t.hasPointerEvent = function() {
        return Boolean(e.navigator.msPointerEnabled)
    }();
    t.isMobile = function() {
        if (t.hasPointerEvent && navigator.msMaxTouchPoints > 1) return true;
        var e = ["android", "webos", "iphone", "ipad", "blackberry"];
        for (i in e) {
            if (navigator.userAgent.toLowerCase().indexOf(String(e[i]).toLowerCase()) != -1) {
                return true
            }
        }
        return false
    }();
    t.isAndroid = function() {
        return navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1
    }();
    t.isChrome = function() {
        return navigator.userAgent.toLowerCase().indexOf("chrome") != -1
    }();
    t.isSafari = function() {
        return navigator.userAgent.toLowerCase().indexOf("safari") != -1 && navigator.userAgent.toLowerCase().indexOf("chrome") == -1
    }();
    t.isOpera = function() {
        return navigator.userAgent.toLowerCase().indexOf("opera") != -1 && navigator.userAgent.toLowerCase().indexOf("chrome") == -1
    }();
    t.isFirefox = function() {
        return navigator.userAgent.toLowerCase().indexOf("firefox") != -1
    }();
    t.isIE = function() {
        var e = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
        return e || Boolean(!t.isIE && document.documentElement.msRequestFullscreen)
    }();
    t.isIE11 = function() {
        return Boolean(!t.isIE && document.documentElement.msRequestFullscreen)
    }();
    t.isIEAndLessThen9 = function() {
        return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1
    }();
    t.isIEAndLessThen10 = function() {
        return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 9") != -1
    }();
    t.isIE7 = function() {
        return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1
    }();
    t.isApple = function() {
        return navigator.appVersion.toLowerCase().indexOf("mac") != -1
    }();
    t.hasFullScreen = function() {
        return t.dumy.requestFullScreen || t.dumy.mozRequestFullScreen || t.dumy.webkitRequestFullScreen || t.dumy.msieRequestFullScreen
    }();
    t.onReady = function(e) {
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                t.checkIfHasTransofrms();
                e()
            })
        } else {
            document.onreadystatechange = function() {
                t.checkIfHasTransofrms();
                if (document.readyState == "complete") e()
            }
        }
    };
    t.checkIfHasTransofrms = function() {
        document.documentElement.appendChild(t.dumy);
        t.hasTransform3d = n();
        t.hasTransform2d = r();
        t.isReadyMethodCalled_bl = true
    };
    t.disableElementSelection = function(e) {
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
            return false
        }
    };
    t.getUrlArgs = function(t) {
        var n = {};
        var r = t.substr(t.indexOf("?") + 1) || location.search.substring(1);
        var i = r.split("&");
        for (var s = 0; s < i.length; s++) {
            var o = i[s].indexOf("=");
            var u = i[s].substring(0, o);
            var a = i[s].substring(o + 1);
            a = decodeURIComponent(a);
            n[u] = a
        }
        return n
    };
    t.isReadyMethodCalled_bl = false;
    e.FWDMSPUtils = t
})(window);
(function(e) {
    var t = function() {
        var n = this;
        var r = t.prototype;
        this.main_do = null;
        this.init = function() {
            this.setupScreen();
            e.onerror = this.showError;
            this.screen.style.zIndex = 100000009;
            setTimeout(this.addConsoleToDom, 100);
            setInterval(this.position, 100)
        };
        this.position = function() {
            var e = FWDMSPUtils.getScrollOffsets();
            n.setX(e.x + 100);
            n.setY(e.y)
        };
        this.addConsoleToDom = function() {
            if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                document.getElementsByTagName("body")[0].appendChild(n.screen)
            } else {
                document.documentElement.appendChild(n.screen)
            }
        };
        this.setupScreen = function() {
            this.main_do = new FWDMSPDisplayObject("div", "absolute");
            this.main_do.setOverflow("auto");
            this.main_do.setWidth(200);
            this.main_do.setHeight(300);
            this.setWidth(200);
            this.setHeight(300);
            this.main_do.setBkColor("#FFFFFF");
            this.addChild(this.main_do)
        };
        this.showError = function(e, t, r) {
            var i = n.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + e + " on line " + r + " for " + t;
            n.main_do.setInnerHTML(i);
            n.main_do.screen.scrollTop = n.main_do.screen.scrollHeight
        };
        this.log = function(e) {
            var t = n.main_do.getInnerHTML() + "<br>" + e;
            n.main_do.setInnerHTML(t);
            n.main_do.getScreen().scrollTop = 1e4
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPDisplayObject("div", "absolute")
    };
    t.prototype = null;
    e.FWDConsole = t
})(window);
if (typeof asual == "undefined") {
    var asual = {}
}
if (typeof asual.util == "undefined") {
    asual.util = {}
}
asual.util.Browser = new function() {
    var e = navigator.userAgent.toLowerCase(),
        t = /webkit/.test(e),
        n = /opera/.test(e),
        r = /msie/.test(e) && !/opera/.test(e),
        i = /mozilla/.test(e) && !/(compatible|webkit)/.test(e),
        s = parseFloat(r ? e.substr(e.indexOf("msie") + 4) : (e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function() {
        return "[class Browser]"
    };
    this.getVersion = function() {
        return s
    };
    this.isMSIE = function() {
        return r
    };
    this.isSafari = function() {
        return t
    };
    this.isOpera = function() {
        return n
    };
    this.isMozilla = function() {
        return i
    }
};
asual.util.Events = new function() {
    var e = "DOMContentLoaded",
        t = "onstop",
        n = window,
        r = document,
        i = [],
        s = asual.util,
        o = s.Browser,
        u = o.isMSIE(),
        a = o.isSafari();
    this.toString = function() {
        return "[class Events]"
    };
    this.addListener = function(t, n, r) {
        i.push({
            o: t,
            t: n,
            l: r
        });
        if (!(n == e && (u || a))) {
            if (t.addEventListener) {
                t.addEventListener(n, r, false)
            } else {
                if (t.attachEvent) {
                    t.attachEvent("on" + n, r)
                }
            }
        }
    };
    this.removeListener = function(t, n, r) {
        for (var s = 0, o; o = i[s]; s++) {
            if (o.o == t && o.t == n && o.l == r) {
                i.splice(s, 1);
                break
            }
        }
        if (!(n == e && (u || a))) {
            if (t.removeEventListener) {
                t.removeEventListener(n, r, false)
            } else {
                if (t.detachEvent) {
                    t.detachEvent("on" + n, r)
                }
            }
        }
    };
    var f = function() {
        for (var t = 0, n; n = i[t]; t++) {
            if (n.t != e) {
                s.Events.removeListener(n.o, n.t, n.l)
            }
        }
    };
    var l = function() {
        if (r.readyState == "interactive") {
            function e() {
                r.detachEvent(t, e);
                f()
            }
            r.attachEvent(t, e);
            n.setTimeout(function() {
                r.detachEvent(t, e)
            }, 0)
        }
    };
    if (u || a) {
        (function() {
            try {
                if (u && r.body || !/loaded|complete/.test(r.readyState)) {
                    r.documentElement.doScroll("left")
                }
            } catch (t) {
                return setTimeout(arguments.callee, 0)
            }
            for (var n = 0, t; t = i[n]; n++) {
                if (t.t == e) {
                    t.l.call(null)
                }
            }
        })()
    }
    if (u) {
        n.attachEvent("onbeforeunload", l)
    }
    this.addListener(n, "unload", f)
};
asual.util.Functions = new function() {
    this.toString = function() {
        return "[class Functions]"
    };
    this.bind = function(e, t, n) {
        for (var r = 2, i, s = []; i = arguments[r]; r++) {
            s.push(i)
        }
        return function() {
            return e.apply(t, s)
        }
    }
};
var FWDAddressEvent = function(e) {
    this.toString = function() {
        return "[object FWDAddressEvent]"
    };
    this.type = e;
    this.target = [FWDAddress][0];
    this.value = FWDAddress.getValue();
    this.path = FWDAddress.getPath();
    this.pathNames = FWDAddress.getPathNames();
    this.parameters = {};
    var t = FWDAddress.getParameterNames();
    for (var n = 0, r = t.length; n < r; n++) {
        this.parameters[t[n]] = FWDAddress.getParameter(t[n])
    }
    this.parameterNames = t
};
FWDAddressEvent.INIT = "init";
FWDAddressEvent.CHANGE = "change";
FWDAddressEvent.INTERNAL_CHANGE = "internalChange";
FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function() {
    var _getHash = function() {
        var e = _l.href.indexOf("#");
        return e != -1 ? _ec(_dc(_l.href.substr(e + 1))) : ""
    };
    var _getWindow = function() {
        try {
            top.document;
            return top
        } catch (e) {
            return window
        }
    };
    var _strictCheck = function(e, t) {
        if (_opts.strict) {
            e = t ? e.substr(0, 1) != "/" ? "/" + e : e : e == "" ? "/" : e
        }
        return e
    };
    var _ieLocal = function(e, t) {
        return _msie && _l.protocol == "file:" ? t ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?") : e
    };
    var _searchScript = function(e) {
        if (e.childNodes) {
            for (var t = 0, n = e.childNodes.length, r; t < n; t++) {
                if (e.childNodes[t].src) {
                    _url = String(e.childNodes[t].src)
                }
                if (r = _searchScript(e.childNodes[t])) {
                    return r
                }
            }
        }
    };
    var _titleCheck = function() {
        if (_d.title != _title && _d.title.indexOf("#") != -1) {
            _d.title = _title
        }
    };
    var _listen = function() {
        if (!_silent) {
            var e = _getHash();
            var t = !(_value == e);
            if (_safari && _version < 523) {
                if (_length != _h.length) {
                    _length = _h.length;
                    if (typeof _stack[_length - 1] != UNDEFINED) {
                        _value = _stack[_length - 1]
                    }
                    _update.call(this, false)
                }
            } else {
                if (_msie && t) {
                    if (_version < 7) {
                        _l.reload()
                    } else {
                        this.setValue(e)
                    }
                } else {
                    if (t) {
                        _value = e;
                        _update.call(this, false)
                    }
                }
            }
            if (_msie) {
                _titleCheck.call(this)
            }
        }
    };
    var _bodyClick = function(e) {
        if (_popup.length > 0) {
            var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
            if (typeof _popup[3] != UNDEFINED) {
                eval(_popup[3])
            }
        }
        _popup = []
    };
    var _swfChange = function() {
        for (var e = 0, t, n, r = FWDAddress.getValue(), i = "setFWDAddressValue"; t = _ids[e]; e++) {
            n = document.getElementById(t);
            if (n) {
                if (n.parentNode && typeof n.parentNode.so != UNDEFINED) {
                    n.parentNode.so.call(i, r)
                } else {
                    if (!(n && typeof n[i] != UNDEFINED)) {
                        var s = n.getElementsByTagName("object");
                        var o = n.getElementsByTagName("embed");
                        n = s[0] && typeof s[0][i] != UNDEFINED ? s[0] : o[0] && typeof o[0][i] != UNDEFINED ? o[0] : null
                    }
                    if (n) {
                        n[i](r)
                    }
                }
            } else {
                if (n = document[t]) {
                    if (typeof n[i] != UNDEFINED) {
                        n[i](r)
                    }
                }
            }
        }
    };
    var _jsDispatch = function(e) {
        this.dispatchEvent(new FWDAddressEvent(e));
        e = e.substr(0, 1).toUpperCase() + e.substr(1);
        if (typeof this["on" + e] == FUNCTION) {
            this["on" + e]()
        }
    };
    var _jsInit = function() {
        if (_util.Browser.isSafari()) {
            _d.body.addEventListener("click", _bodyClick)
        }
        _jsDispatch.call(this, "init")
    };
    var _jsChange = function() {
        _swfChange();
        _jsDispatch.call(this, "change")
    };
    var _update = function(e) {
        _jsChange.call(this);
        if (e) {
            _jsDispatch.call(this, "internalChange")
        } else {
            _jsDispatch.call(this, "externalChange")
        }
        _st(_functions.bind(_track, this), 10)
    };
    var _track = function() {
        var e = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, "");
        var t = _t[_opts.tracker];
        if (typeof t == FUNCTION) {
            t(e)
        } else {
            if (typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION) {
                _t.pageTracker._trackPageview(e)
            } else {
                if (typeof _t.urchinTracker == FUNCTION) {
                    _t.urchinTracker(e)
                }
            }
        }
    };
    var _htmlWrite = function() {
        var e = _frame.contentWindow.document;
        e.open();
        e.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";</script></head></html>');
        e.close()
    };
    var _htmlLoad = function() {
        var e = _frame.contentWindow;
        var t = e.location.href;
        _value = typeof e[ID] != UNDEFINED ? e[ID] : "";
        if (_value != _getHash()) {
            _update.call(FWDAddress, false);
            _l.hash = _ieLocal(_value, TRUE)
        }
    };
    var _load = function() {
        if (!_loaded) {
            _loaded = TRUE;
            if (_msie && _version < 8) {
                var e = _d.getElementsByTagName("frameset")[0];
                _frame = _d.createElement((e ? "" : "i") + "frame");
                if (e) {
                    e.insertAdjacentElement("beforeEnd", _frame);
                    e[e.cols ? "cols" : "rows"] += ",0";
                    _frame.src = "javascript:false";
                    _frame.noResize = true;
                    _frame.frameBorder = _frame.frameSpacing = 0
                } else {
                    _frame.src = "javascript:false";
                    _frame.style.display = "none";
                    _d.body.insertAdjacentElement("afterBegin", _frame)
                }
                _st(function() {
                    _events.addListener(_frame, "load", _htmlLoad);
                    if (typeof _frame.contentWindow[ID] == UNDEFINED) {
                        _htmlWrite()
                    }
                }, 50)
            } else {
                if (_safari) {
                    if (_version < 418) {
                        _d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>';
                        _form = _d.getElementById(ID)
                    }
                    if (typeof _l[ID] == UNDEFINED) {
                        _l[ID] = {}
                    }
                    if (typeof _l[ID][_l.pathname] != UNDEFINED) {
                        _stack = _l[ID][_l.pathname].split(",")
                    }
                }
            }
            _st(_functions.bind(function() {
                _jsInit.call(this);
                _jsChange.call(this);
                _track.call(this)
            }, this), 1);
            if (_msie && _version >= 8) {
                _d.body.onhashchange = _functions.bind(_listen, this);
                _si(_functions.bind(_titleCheck, this), 50)
            } else {
                _si(_functions.bind(_listen, this), 50)
            }
        }
    };
    var ID = "swfaddress",
        FUNCTION = "function",
        UNDEFINED = "undefined",
        TRUE = true,
        FALSE = false,
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
    if (_msie && _d.documentMode && _d.documentMode != _version) {
        _version = _d.documentMode != 8 ? 7 : 8
    }
    _supported = _mozilla && _version >= 1 || _msie && _version >= 6 || _opera && _version >= 9.5 || _safari && _version >= 312;
    if (_supported) {
        if (_opera) {
            history.navigationMode = "compatible"
        }
        for (var i = 1; i < _length; i++) {
            _stack.push("")
        }
        _stack.push(_getHash());
        if (_msie && _l.hash != _getHash()) {
            _l.hash = "#" + _ieLocal(_getHash(), TRUE)
        }
        _searchScript(document);
        var _qi = _url ? _url.indexOf("?") : -1;
        if (_qi != -1) {
            var param, params = _url.substr(_qi + 1).split("&");
            for (var i = 0, p; p = params[i]; i++) {
                param = p.split("=");
                if (/^(history|strict)$/.test(param[0])) {
                    _opts[param[0]] = isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : parseInt(param[1]) != 0
                }
                if (/^tracker$/.test(param[0])) {
                    _opts[param[0]] = param[1]
                }
            }
        }
        if (_msie) {
            _titleCheck.call(this)
        }
        if (window == _t) {
            _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this))
        }
        _events.addListener(_t, "load", _functions.bind(_load, this))
    } else {
        if (!_supported && _l.href.indexOf("#") != -1 || _safari && _version < 418 && _l.href.indexOf("#") != -1 && _l.search != "") {
            _d.open();
            _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>');
            _d.close()
        } else {
            _track()
        }
    }
    this.toString = function() {
        return "[class FWDAddress]"
    };
    this.back = function() {
        _h.back()
    };
    this.forward = function() {
        _h.forward()
    };
    this.up = function() {
        var e = this.getPath();
        this.setValue(e.substr(0, e.lastIndexOf("/", e.length - 2) + (e.substr(e.length - 1) == "/" ? 1 : 0)))
    };
    this.go = function(e) {
        _h.go(e)
    };
    this.href = function(e, t) {
        t = typeof t != UNDEFINED ? t : "_self";
        if (t == "_self") {
            self.location.href = e
        } else {
            if (t == "_top") {
                _l.href = e
            } else {
                if (t == "_blank") {
                    window.open(e)
                } else {
                    _t.frames[t].location.href = e
                }
            }
        }
    };
    this.popup = function(url, name, options, handler) {
        try {
            var popup = window.open(url, name, eval(options));
            if (typeof handler != UNDEFINED) {
                eval(handler)
            }
        } catch (ex) {}
        _popup = arguments
    };
    this.getIds = function() {
        return _ids
    };
    this.getId = function(e) {
        return _ids[0]
    };
    this.setId = function(e) {
        _ids[0] = e
    };
    this.addId = function(e) {
        this.removeId(e);
        _ids.push(e)
    };
    this.removeId = function(e) {
        for (var t = 0; t < _ids.length; t++) {
            if (e == _ids[t]) {
                _ids.splice(t, 1);
                break
            }
        }
    };
    this.addEventListener = function(e, t) {
        if (typeof _listeners[e] == UNDEFINED) {
            _listeners[e] = []
        }
        _listeners[e].push(t)
    };
    this.removeEventListener = function(e, t) {
        if (typeof _listeners[e] != UNDEFINED) {
            for (var n = 0, r; r = _listeners[e][n]; n++) {
                if (r == t) {
                    break
                }
            }
            _listeners[e].splice(n, 1)
        }
    };
    this.dispatchEvent = function(e) {
        if (this.hasEventListener(e.type)) {
            e.target = this;
            for (var t = 0, n; n = _listeners[e.type][t]; t++) {
                n(e)
            }
            return TRUE
        }
        return FALSE
    };
    this.hasEventListener = function(e) {
        return typeof _listeners[e] != UNDEFINED && _listeners[e].length > 0
    };
    this.getBaseURL = function() {
        var e = _l.href;
        if (e.indexOf("#") != -1) {
            e = e.substr(0, e.indexOf("#"))
        }
        if (e.substr(e.length - 1) == "/") {
            e = e.substr(0, e.length - 1)
        }
        return e
    };
    this.getStrict = function() {
        return _opts.strict
    };
    this.setStrict = function(e) {
        _opts.strict = e
    };
    this.getHistory = function() {
        return _opts.history
    };
    this.setHistory = function(e) {
        _opts.history = e
    };
    this.getTracker = function() {
        return _opts.tracker
    };
    this.setTracker = function(e) {
        _opts.tracker = e
    };
    this.getTitle = function() {
        return _d.title
    };
    this.setTitle = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _dc(e);
        _st(function() {
            _title = _d.title = e;
            if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                _frame.contentWindow.document.title = e;
                _juststart = FALSE
            }
            if (!_justset && _mozilla) {
                _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#")
            }
            _justset = FALSE
        }, 10)
    };
    this.getStatus = function() {
        return _t.status
    };
    this.setStatus = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _dc(e);
        if (!_safari) {
            e = _strictCheck(e != "null" ? e : "", TRUE);
            if (e == "/") {
                e = ""
            }
            if (!/http(s)?:\/\//.test(e)) {
                var t = _l.href.indexOf("#");
                e = (t == -1 ? _l.href : _l.href.substr(0, t)) + "#" + e
            }
            _t.status = e
        }
    };
    this.resetStatus = function() {
        _t.status = ""
    };
    this.getValue = function() {
        if (!_supported) {
            return null
        }
        return _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE))
    };
    this.setValue = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _ec(_dc(_strictCheck(e, TRUE)));
        if (e == "/") {
            e = ""
        }
        if (_value == e) {
            return
        }
        _justset = TRUE;
        _value = e;
        _silent = TRUE;
        _update.call(FWDAddress, true);
        _stack[_h.length] = _value;
        if (_safari) {
            if (_opts.history) {
                _l[ID][_l.pathname] = _stack.toString();
                _length = _h.length + 1;
                if (_version < 418) {
                    if (_l.search == "") {
                        _form.action = "#" + _value;
                        _form.submit()
                    }
                } else {
                    if (_version < 523 || _value == "") {
                        var t = _d.createEvent("MouseEvents");
                        t.initEvent("click", TRUE, TRUE);
                        var n = _d.createElement("a");
                        n.href = "#" + _value;
                        n.dispatchEvent(t)
                    } else {
                        _l.hash = "#" + _value
                    }
                }
            } else {
                _l.replace("#" + _value)
            }
        } else {
            if (_value != _getHash()) {
                if (_opts.history) {
                    _l.hash = "#" + _dc(_ieLocal(_value, TRUE))
                } else {
                    _l.replace("#" + _dc(_value))
                }
            }
        }
        if (_msie && _version < 8 && _opts.history) {
            _st(_htmlWrite, 50)
        }
        if (_safari) {
            _st(function() {
                _silent = FALSE
            }, 1)
        } else {
            _silent = FALSE
        }
    };
    this.getPath = function() {
        var e = this.getValue();
        if (e.indexOf("?") != -1) {
            return e.split("?")[0]
        } else {
            if (e.indexOf("#") != -1) {
                return e.split("#")[0]
            } else {
                return e
            }
        }
    };
    this.getPathNames = function() {
        var e = this.getPath(),
            t = e.split("/");
        if (e.substr(0, 1) == "/" || e.length == 0) {
            t.splice(0, 1)
        }
        if (e.substr(e.length - 1, 1) == "/") {
            t.splice(t.length - 1, 1)
        }
        return t
    };
    this.getQueryString = function() {
        var e = this.getValue(),
            t = e.indexOf("?");
        if (t != -1 && t < e.length) {
            return e.substr(t + 1)
        }
    };
    this.getParameter = function(e) {
        var t = this.getValue();
        var n = t.indexOf("?");
        if (n != -1) {
            t = t.substr(n + 1);
            var r, i = t.split("&"),
                s = i.length,
                o = [];
            while (s--) {
                r = i[s].split("=");
                if (r[0] == e) {
                    o.push(r[1])
                }
            }
            if (o.length != 0) {
                return o.length != 1 ? o : o[0]
            }
        }
    };
    this.getParameterNames = function() {
        var e = this.getValue();
        var t = e.indexOf("?");
        var n = [];
        if (t != -1) {
            e = e.substr(t + 1);
            if (e != "" && e.indexOf("=") != -1) {
                var r = e.split("&"),
                    i = 0;
                while (i < r.length) {
                    n.push(r[i].split("=")[0]);
                    i++
                }
            }
        }
        return n
    };
    this.onInit = null;
    this.onChange = null;
    this.onInternalChange = null;
    this.onExternalChange = null;
    (function() {
        var e;
        if (typeof FlashObject != UNDEFINED) {
            SWFObject = FlashObject
        }
        if (typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
            var t = SWFObject.prototype.write;
            SWFObject.prototype.write = function() {
                e = arguments;
                if (this.getAttribute("version").major < 8) {
                    this.addVariable("$swfaddress", FWDAddress.getValue());
                    (typeof e[0] == "string" ? document.getElementById(e[0]) : e[0]).so = this
                }
                var n;
                if (n = t.apply(this, e)) {
                    _ref.addId(this.getAttribute("id"))
                }
                return n
            }
        }
        if (typeof swfobject != UNDEFINED) {
            var n = swfobject.registerObject;
            swfobject.registerObject = function() {
                e = arguments;
                n.apply(this, e);
                _ref.addId(e[0])
            };
            var r = swfobject.createSWF;
            swfobject.createSWF = function() {
                e = arguments;
                var t = r.apply(this, e);
                if (t) {
                    _ref.addId(e[0].id)
                }
                return t
            };
            var i = swfobject.embedSWF;
            swfobject.embedSWF = function() {
                e = arguments;
                if (typeof e[8] == UNDEFINED) {
                    e[8] = {}
                }
                if (typeof e[8].id == UNDEFINED) {
                    e[8].id = e[1]
                }
                i.apply(this, e);
                _ref.addId(e[8].id)
            }
        }
        if (typeof UFO != UNDEFINED) {
            var s = UFO.create;
            UFO.create = function() {
                e = arguments;
                s.apply(this, e);
                _ref.addId(e[0].id)
            }
        }
        if (typeof AC_FL_RunContent != UNDEFINED) {
            var o = AC_FL_RunContent;
            AC_FL_RunContent = function() {
                e = arguments;
                o.apply(this, e);
                for (var t = 0, n = e.length; t < n; t++) {
                    if (e[t] == "id") {
                        _ref.addId(e[t + 1])
                    }
                }
            }
        }
    })()
};
var FWDFlashTest = function() {
    function c() {
        var n = o.getElementsByTagName("body")[0];
        var r = createElement(t);
        r.setAttribute("type", i);
        var s = n.appendChild(r);
        if (s) {
            var u = 0;
            (function() {
                if (typeof s.GetVariable != e) {
                    var t = s.GetVariable("$version");
                    if (t) {
                        t = t.split(" ")[1].split(",");
                        l.pv = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)]
                    }
                } else if (u < 10) {
                    u++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                n.removeChild(r);
                s = null;
                h()
            })()
        } else {
            h()
        }
    }

    function h() {
        var t = f.length;
        if (t > 0) {
            for (var n = 0; n < t; n++) {
                var r = f[n].id;
                var i = f[n].callbackFn;
                var s = {
                    success: false,
                    id: r
                };
                if (l.pv[0] > 0) {
                    var o = getElementById(r);
                    if (o) {
                        if (p(f[n].swfVersion) && !(l.wk && l.wk < 312)) {
                            setVisibility(r, true);
                            if (i) {
                                s.success = true;
                                s.ref = getObjectById(r);
                                i(s)
                            }
                        } else if (f[n].expressInstall && canExpressInstall()) {
                            var u = {};
                            u.data = f[n].expressInstall;
                            u.width = o.getAttribute("width") || "0";
                            u.height = o.getAttribute("height") || "0";
                            if (o.getAttribute("class")) {
                                u.styleclass = o.getAttribute("class")
                            }
                            if (o.getAttribute("align")) {
                                u.align = o.getAttribute("align")
                            }
                            var a = {};
                            var c = o.getElementsByTagName("param");
                            var h = c.length;
                            for (var d = 0; d < h; d++) {
                                if (c[d].getAttribute("name").toLowerCase() != "movie") {
                                    a[c[d].getAttribute("name")] = c[d].getAttribute("value")
                                }
                            }
                            showExpressInstall(u, a, r, i)
                        } else {
                            displayAltContent(o);
                            if (i) {
                                i(s)
                            }
                        }
                    }
                } else {
                    setVisibility(r, true);
                    if (i) {
                        var v = getObjectById(r);
                        if (v && typeof v.SetVariable != e) {
                            s.success = true;
                            s.ref = v
                        }
                        i(s)
                    }
                }
            }
        }
    }

    function p(e) {
        var t = l.pv,
            n = e.split(".");
        n[0] = parseInt(n[0], 10);
        n[1] = parseInt(n[1], 10) || 0;
        n[2] = parseInt(n[2], 10) || 0;
        return t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? true : false
    }

    function d(t) {
        var n = /[\\\"<>\.;]/;
        var r = n.exec(t) != null;
        return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t
    }
    var e = "undefined",
        t = "object",
        n = "Shockwave Flash",
        r = "ShockwaveFlash.ShockwaveFlash",
        i = "application/x-shockwave-flash",
        s = window,
        o = document,
        u = navigator,
        a = false,
        f = [],
        l = function() {
            var f = typeof o.getElementById != e && typeof o.getElementsByTagName != e && typeof o.createElement != e,
                l = u.userAgent.toLowerCase(),
                c = u.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(l),
                p = c ? /mac/.test(c) : /mac/.test(l),
                d = /webkit/.test(l) ? parseFloat(l.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                v = !+"1",
                m = [0, 0, 0],
                g = null;
            if (typeof u.plugins != e && typeof u.plugins[n] == t) {
                g = u.plugins[n].description;
                if (g && !(typeof u.mimeTypes != e && u.mimeTypes[i] && !u.mimeTypes[i].enabledPlugin)) {
                    a = true;
                    v = false;
                    g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10);
                    m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else if (typeof s.ActiveXObject != e) {
                try {
                    var y = new ActiveXObject(r);
                    if (y) {
                        g = y.GetVariable("$version");
                        if (g) {
                            v = true;
                            g = g.split(" ")[1].split(",");
                            m = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]
                        }
                    }
                } catch (b) {}
            }
            return {
                w3: f,
                pv: m,
                wk: d,
                ie: v,
                win: h,
                mac: p
            }
        }();
    return {
        hasFlashPlayerVersion: p
    }
}();
document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n	IEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n	IEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n</script>\r\n");
(function(e) {
    e.FileAPIReader = function(e, t) {
        return function(n, r) {
            var i = t || new FileReader;
            i.onload = function(e) {
                r(new A(e.target.result))
            };
            i.readAsBinaryString(e)
        }
    }
})(this);
(function(e) {
    var t = e.p = {},
        n = {},
        r = [0, 7];
    t.t = function(e) {
        delete n[e]
    };
    t.s = function() {
        n = {}
    };
    t.B = function(e, t, i) {
        i = i || {};
        (i.dataReader || B)(e, function(s) {
            s.f(r, function() {
                var r = "ftypM4A" == s.c(4, 7) ? ID4 : "ID3" == s.c(0, 3) ? ID3v2 : ID3v1;
                r.m(s, function() {
                    var o = i.tags,
                        u = r.n(s, o),
                        o = n[e] || {},
                        l;
                    for (l in u) u.hasOwnProperty(l) && (o[l] = u[l]);
                    n[e] = o;
                    t && t()
                })
            })
        })
    };
    t.v = function(e) {
        if (!n[e]) return null;
        var t = {},
            r;
        for (r in n[e]) n[e].hasOwnProperty(r) && (t[r] = n[e][r]);
        return t
    };
    t.A = function(e, t) {
        return n[e] ? n[e][t] : null
    };
    e.ID3 = e.p;
    t.loadTags = t.B;
    t.getAllTags = t.v;
    t.getTag = t.A;
    t.clearTags = t.t;
    t.clearAll = t.s
})(this);
(function(e) {
    var t = e.q = {},
        n = "Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall".split(";");
    t.m = function(e, t) {
        var n = e.h();
        e.f([n - 128 - 1, n], t)
    };
    t.n = function(e) {
        var t = e.h() - 128;
        if ("TAG" == e.c(t, 3)) {
            var r = e.c(t + 3, 30).replace(/\0/g, ""),
                i = e.c(t + 33, 30).replace(/\0/g, ""),
                s = e.c(t + 63, 30).replace(/\0/g, ""),
                o = e.c(t + 93, 4).replace(/\0/g, "");
            if (0 == e.a(t + 97 + 28)) var u = e.c(t + 97, 28).replace(/\0/g, ""),
                a = e.a(t + 97 + 29);
            else u = "", a = 0;
            e = e.a(t + 97 + 30);
            return {
                version: "1.1",
                title: r,
                artist: i,
                album: s,
                year: o,
                comment: u,
                track: a,
                genre: 255 > e ? n[e] : ""
            }
        }
        return {}
    };
    e.ID3v1 = e.q
})(this);
(function(e) {
    function t(e, t) {
        var n = t.a(e),
            r = t.a(e + 1),
            i = t.a(e + 2);
        return t.a(e + 3) & 127 | (i & 127) << 7 | (r & 127) << 14 | (n & 127) << 21
    }
    var n = e.D = {};
    n.b = {};
    n.frames = {
        BUF: "Recommended buffer size",
        CNT: "Play counter",
        COM: "Comments",
        CRA: "Audio encryption",
        CRM: "Encrypted meta frame",
        ETC: "Event timing codes",
        EQU: "Equalization",
        GEO: "General encapsulated object",
        IPL: "Involved people list",
        LNK: "Linked information",
        MCI: "Music CD Identifier",
        MLL: "MPEG location lookup table",
        PIC: "Attached picture",
        POP: "Popularimeter",
        REV: "Reverb",
        RVA: "Relative volume adjustment",
        SLT: "Synchronized lyric/text",
        STC: "Synced tempo codes",
        TAL: "Album/Movie/Show title",
        TBP: "BPM (Beats Per Minute)",
        TCM: "Composer",
        TCO: "Content type",
        TCR: "Copyright message",
        TDA: "Date",
        TDY: "Playlist delay",
        TEN: "Encoded by",
        TFT: "File type",
        TIM: "Time",
        TKE: "Initial key",
        TLA: "Language(s)",
        TLE: "Length",
        TMT: "Media type",
        TOA: "Original artist(s)/performer(s)",
        TOF: "Original filename",
        TOL: "Original Lyricist(s)/text writer(s)",
        TOR: "Original release year",
        TOT: "Original album/Movie/Show title",
        TP1: "Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",
        TP2: "Band/Orchestra/Accompaniment",
        TP3: "Conductor/Performer refinement",
        TP4: "Interpreted, remixed, or otherwise modified by",
        TPA: "Part of a set",
        TPB: "Publisher",
        TRC: "ISRC (International Standard Recording Code)",
        TRD: "Recording dates",
        TRK: "Track number/Position in set",
        TSI: "Size",
        TSS: "Software/hardware and settings used for encoding",
        TT1: "Content group description",
        TT2: "Title/Songname/Content description",
        TT3: "Subtitle/Description refinement",
        TXT: "Lyricist/text writer",
        TXX: "User defined text information frame",
        TYE: "Year",
        UFI: "Unique file identifier",
        ULT: "Unsychronized lyric/text transcription",
        WAF: "Official audio file webpage",
        WAR: "Official artist/performer webpage",
        WAS: "Official audio source webpage",
        WCM: "Commercial information",
        WCP: "Copyright/Legal information",
        WPB: "Publishers official webpage",
        WXX: "User defined URL link frame",
        AENC: "Audio encryption",
        APIC: "Attached picture",
        COMM: "Comments",
        COMR: "Commercial frame",
        ENCR: "Encryption method registration",
        EQUA: "Equalization",
        ETCO: "Event timing codes",
        GEOB: "General encapsulated object",
        GRID: "Group identification registration",
        IPLS: "Involved people list",
        LINK: "Linked information",
        MCDI: "Music CD identifier",
        MLLT: "MPEG location lookup table",
        OWNE: "Ownership frame",
        PRIV: "Private frame",
        PCNT: "Play counter",
        POPM: "Popularimeter",
        POSS: "Position synchronisation frame",
        RBUF: "Recommended buffer size",
        RVAD: "Relative volume adjustment",
        RVRB: "Reverb",
        SYLT: "Synchronized lyric/text",
        SYTC: "Synchronized tempo codes",
        TALB: "Album/Movie/Show title",
        TBPM: "BPM (beats per minute)",
        TCOM: "Composer",
        TCON: "Content type",
        TCOP: "Copyright message",
        TDAT: "Date",
        TDLY: "Playlist delay",
        TENC: "Encoded by",
        TEXT: "Lyricist/Text writer",
        TFLT: "File type",
        TIME: "Time",
        TIT1: "Content group description",
        TIT2: "Title/songname/content description",
        TIT3: "Subtitle/Description refinement",
        TKEY: "Initial key",
        TLAN: "Language(s)",
        TLEN: "Length",
        TMED: "Media type",
        TOAL: "Original album/movie/show title",
        TOFN: "Original filename",
        TOLY: "Original lyricist(s)/text writer(s)",
        TOPE: "Original artist(s)/performer(s)",
        TORY: "Original release year",
        TOWN: "File owner/licensee",
        TPE1: "Lead performer(s)/Soloist(s)",
        TPE2: "Band/orchestra/accompaniment",
        TPE3: "Conductor/performer refinement",
        TPE4: "Interpreted, remixed, or otherwise modified by",
        TPOS: "Part of a set",
        TPUB: "Publisher",
        TRCK: "Track number/Position in set",
        TRDA: "Recording dates",
        TRSN: "Internet radio station name",
        TRSO: "Internet radio station owner",
        TSIZ: "Size",
        TSRC: "ISRC (international standard recording code)",
        TSSE: "Software/Hardware and settings used for encoding",
        TYER: "Year",
        TXXX: "User defined text information frame",
        UFID: "Unique file identifier",
        USER: "Terms of use",
        USLT: "Unsychronized lyric/text transcription",
        WCOM: "Commercial information",
        WCOP: "Copyright/Legal information",
        WOAF: "Official audio file webpage",
        WOAR: "Official artist/performer webpage",
        WOAS: "Official audio source webpage",
        WORS: "Official internet radio station homepage",
        WPAY: "Payment",
        WPUB: "Publishers official webpage",
        WXXX: "User defined URL link frame"
    };
    var r = {
            title: ["TIT2", "TT2"],
            artist: ["TPE1", "TP1"],
            album: ["TALB", "TAL"],
            year: ["TYER", "TYE"],
            comment: ["COMM", "COM"],
            track: ["TRCK", "TRK"],
            genre: ["TCON", "TCO"],
            picture: ["APIC", "PIC"],
            lyrics: ["USLT", "ULT"]
        },
        i = ["title", "artist", "album", "track"];
    n.m = function(e, n) {
        e.f([0, t(6, e)], n)
    };
    n.n = function(e, s) {
        var o = 0,
            u = e.a(o + 3);
        if (4 < u) return {
            version: ">2.4"
        };
        var a = e.a(o + 4),
            f = e.d(o + 5, 7),
            l = e.d(o + 5, 6),
            h = e.d(o + 5, 5),
            p = t(o + 6, e),
            o = o + 10;
        if (l) var d = e.i(o),
            o = o + (d + 4);
        var u = {
                version: "2." + u + "." + a,
                major: u,
                revision: a,
                flags: {
                    unsynchronisation: f,
                    extended_header: l,
                    experimental_indicator: h
                },
                size: p
            },
            v;
        if (f) v = {};
        else {
            for (var p = p - 10, f = e, a = s, l = {}, h = u.major, d = [], m = 0, y; y = (a || i)[m]; m++) d = d.concat(r[y] || [y]);
            for (a = d; o < p;) {
                d = null;
                m = f;
                y = o;
                var w = null;
                switch (h) {
                    case 2:
                        v = m.c(y, 3);
                        var E = m.o(y + 3),
                            S = 6;
                        break;
                    case 3:
                        v = m.c(y, 4);
                        E = m.i(y + 4);
                        S = 10;
                        break;
                    case 4:
                        v = m.c(y, 4), E = t(y + 4, m), S = 10
                }
                if ("" == v) break;
                o += S + E;
                0 > a.indexOf(v) || (2 < h && (w = {
                    message: {
                        P: m.d(y + 8, 6),
                        I: m.d(y + 8, 5),
                        M: m.d(y + 8, 4)
                    },
                    k: {
                        K: m.d(y + 8 + 1, 7),
                        F: m.d(y + 8 + 1, 3),
                        H: m.d(y + 8 + 1, 2),
                        C: m.d(y + 8 + 1, 1),
                        u: m.d(y + 8 + 1, 0)
                    }
                }), y += S, w && w.k.u && (t(y, m), y += 4, E -= 4), w && w.k.C || (v in n.b ? d = n.b[v] : "T" == v[0] && (d = n.b["T*"]), d = d ? d(y, E, m, w) : void 0, d = {
                    id: v,
                    size: E,
                    description: v in n.frames ? n.frames[v] : "Unknown",
                    data: d
                }, v in l ? (l[v].id && (l[v] = [l[v]]), l[v].push(d)) : l[v] = d))
            }
            v = l
        }
        for (var x in r)
            if (r.hasOwnProperty(x)) {
                e: {
                    E = r[x];
                    "string" == typeof E && (E = [E]);S = 0;
                    for (o = void 0; o = E[S]; S++)
                        if (o in v) {
                            e = v[o].data;
                            break e
                        } e = void 0
                }
                e && (u[x] = e)
            } for (var T in v) v.hasOwnProperty(T) && (u[T] = v[T]);
        return u
    };
    e.ID3v2 = n
})(this);
(function() {
    function e(e) {
        var t;
        switch (e) {
            case 0:
                t = "iso-8859-1";
                break;
            case 1:
                t = "utf-16";
                break;
            case 2:
                t = "utf-16be";
                break;
            case 3:
                t = "utf-8"
        }
        return t
    }
    var t = "32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. lable side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");
    ID3v2.b.APIC = function(n, r, i, s, o) {
        o = o || "3";
        s = n;
        var u = e(i.a(n));
        switch (o) {
            case "2":
                var a = i.c(n + 1, 3);
                n += 4;
                break;
            case "3":
            case "4":
                a = i.e(n + 1, r - (n - s), u), n += 1 + a.g
        }
        o = i.a(n, 1);
        o = t[o];
        u = i.e(n + 1, r - (n - s), u);
        n += 1 + u.g;
        return {
            format: a.toString(),
            type: o,
            description: u.toString(),
            data: i.l(n, s + r - n)
        }
    };
    ID3v2.b.COMM = function(t, n, r) {
        var i = t,
            s = e(r.a(t)),
            o = r.c(t + 1, 3),
            u = r.e(t + 4, n - 4, s);
        t += 4 + u.g;
        t = r.e(t, i + n - t, s);
        return {
            language: o,
            O: u.toString(),
            text: t.toString()
        }
    };
    ID3v2.b.COM = ID3v2.b.COMM;
    ID3v2.b.PIC = function(e, t, n, r) {
        return ID3v2.b.APIC(e, t, n, r, "2")
    };
    ID3v2.b.PCNT = function(e, t, n) {
        return n.J(e)
    };
    ID3v2.b.CNT = ID3v2.b.PCNT;
    ID3v2.b["T*"] = function(t, n, r) {
        var i = e(r.a(t));
        return r.e(t + 1, n - 1, i).toString()
    };
    ID3v2.b.TCON = function(e, t, n) {
        return ID3v2.b["T*"].apply(this, arguments).replace(/^\(\d+\)/, "")
    };
    ID3v2.b.TCO = ID3v2.b.TCON;
    ID3v2.b.USLT = function(t, n, r) {
        var i = t,
            s = e(r.a(t)),
            o = r.c(t + 1, 3),
            u = r.e(t + 4, n - 4, s);
        t += 4 + u.g;
        t = r.e(t, i + n - t, s);
        return {
            language: o,
            G: u.toString(),
            L: t.toString()
        }
    };
    ID3v2.b.ULT = ID3v2.b.USLT
})();
(function(e) {
    function t(e, n, i, s) {
        var o = e.i(n);
        if (0 == o) s();
        else {
            var u = e.c(n + 4, 4); - 1 < ["moov", "udta", "meta", "ilst"].indexOf(u) ? ("meta" == u && (n += 4), e.f([n + 8, n + 8 + 8], function() {
                t(e, n + 8, o - 8, s)
            })) : e.f([n + (u in r.j ? 0 : o), n + o + 8], function() {
                t(e, n + o, i, s)
            })
        }
    }

    function n(e, t, i, s, o) {
        o = void 0 === o ? "" : o + "  ";
        for (var u = i; u < i + s;) {
            var a = t.i(u);
            if (0 == a) break;
            var f = t.c(u + 4, 4);
            if (-1 < ["moov", "udta", "meta", "ilst"].indexOf(f)) {
                "meta" == f && (u += 4);
                n(e, t, u + 8, a - 8, o);
                break
            }
            if (r.j[f]) {
                var l = t.o(u + 16 + 1),
                    c = r.j[f],
                    l = r.types[l];
                if ("trkn" == f) e[c[0]] = t.a(u + 16 + 11), e.count = t.a(u + 16 + 13);
                else {
                    var f = u + 16 + 4 + 4,
                        h = a - 16 - 4 - 4,
                        p;
                    switch (l) {
                        case "text":
                            p = t.e(f, h, "UTF-8");
                            break;
                        case "uint8":
                            p = t.w(f);
                            break;
                        case "jpeg":
                        case "png":
                            p = {
                                k: "image/" + l,
                                data: t.l(f, h)
                            }
                    }
                    e[c[0]] = "comment" === c[0] ? {
                        text: p
                    } : p
                }
            }
            u += a
        }
    }
    var r = e.r = {};
    r.types = {
        0: "uint8",
        1: "text",
        13: "jpeg",
        14: "png",
        21: "uint8"
    };
    r.j = {
        "©alb": ["album"],
        "©art": ["artist"],
        "©ART": ["artist"],
        aART: ["artist"],
        "©day": ["year"],
        "©nam": ["title"],
        "©gen": ["genre"],
        trkn: ["track"],
        "©wrt": ["composer"],
        "©too": ["encoder"],
        cprt: ["copyright"],
        covr: ["picture"],
        "©grp": ["grouping"],
        keyw: ["keyword"],
        "©lyr": ["lyrics"],
        "©cmt": ["comment"],
        tmpo: ["tempo"],
        cpil: ["compilation"],
        disk: ["disc"]
    };
    r.m = function(e, n) {
        e.f([0, 7], function() {
            t(e, 0, e.h(), n)
        })
    };
    r.n = function(e) {
        var t = {};
        n(t, e, 0, e.h());
        return t
    };
    e.ID4 = e.r
})(this);
(function(e) {
    function c(t, n, r) {
        function u() {
            if (s) {
                s.apply(e, arguments);
                if (!o) {
                    delete n[i];
                    s = null
                }
            }
        }
        var i, s = r[0],
            o = t === a;
        r[0] = u;
        i = t.apply(e, r);
        n[i] = {
            args: r,
            created: Date.now(),
            cb: s,
            id: i
        };
        return i
    }

    function h(t, n, r, i, s) {
        function c() {
            if (o.cb) {
                o.cb.apply(e, arguments);
                if (!u) {
                    delete r[i];
                    o.cb = null
                }
            }
        }
        var o = r[i];
        if (!o) {
            return
        }
        var u = t === a;
        n(o.id);
        if (!u) {
            var f = o.args[1];
            var l = Date.now() - o.created;
            if (l < 0) {
                l = 0
            }
            f -= l;
            if (f < 0) {
                f = 0
            }
            o.args[1] = f
        }
        o.args[0] = c;
        o.created = Date.now();
        o.id = t.apply(e, o.args)
    }
    var t = navigator.platform;
    var n = false;
    if (t == "iPad" || t == "iPhone") n = true;
    if (!n) return;
    var r = navigator.userAgent;
    var i = false;
    if (r.indexOf("6") != -1) i = true;
    if (!i) return;
    var s = {};
    var o = {};
    var u = e.setTimeout;
    var a = e.setInterval;
    var f = e.clearTimeout;
    var l = e.clearInterval;
    e.setTimeout = function() {
        return c(u, s, arguments)
    };
    e.setInterval = function() {
        return c(a, o, arguments)
    };
    e.clearTimeout = function(e) {
        var t = s[e];
        if (t) {
            delete s[e];
            f(t.id)
        }
    };
    e.clearInterval = function(e) {
        var t = o[e];
        if (t) {
            delete o[e];
            l(t.id)
        }
    };
    e.addEventListener("scroll", function() {
        var e;
        for (e in s) {
            h(u, f, s, e)
        }
        for (e in o) {
            h(a, l, o, e)
        }
    })
})(window);
(function(window) {
    var FWDMSP = function(props) {
        var self = this;
        self.init = function() {
            TweenLite.ticker.useRAF(false);
            this.props_obj = props;
            this.instanceName_str = this.props_obj.instanceName;
            if (!this.instanceName_str) {
                alert("FWDMSP instance name is requires please make sure that the instanceName parameter exsists and it's value is uinique.");
                return
            }
            if (window[this.instanceName_str]) {
                alert("FWDMSP instance name " + this.instanceName_str + " is already defined and contains a different instance reference, set a different instance name.");
                return
            } else {
                window[this.instanceName_str] = this
            }
            if (!this.props_obj) {
                alert("FWDMSP constructor properties object is not defined!");
                return
            }
            this.position_str = self.props_obj.position;
            if (!this.position_str) this.position_str = FWDMSP.POSITION_TOP;
            if (this.position_str == "bottom") {
                this.position_str = FWDMSP.POSITION_BOTTOM
            } else {
                this.position_str = FWDMSP.POSITION_TOP
            }
            this.stageContainer = document.createElement("div");
            this.stageContainer.style.position = "fixed";
            if (FWDMSPUtils.isIEAndLessThen9) {
                this.stageContainer.style.zIndex = "2147483630"
            } else {
                this.stageContainer.style.zIndex = "99999999990"
            }
            this.stageContainer.style.overflow = "visible";
            self.stageContainer.style.height = "0px";
            if (FWDMSPUtils.isIE) {
                document.getElementsByTagName("body")[0].appendChild(this.stageContainer)
            } else {
                document.documentElement.appendChild(this.stageContainer)
            }
            this.listeners = {
                events_ar: []
            };
            this.popupWindow;
            this.ws = null;
            this.so = null;
            this.data = null;
            this.opener_do = null;
            this.customContextMenu_do = null;
            this.info_do = null;
            this.main_do = null;
            this.background_do = null;
            this.preloader_do = null;
            this.controller_do = null;
            this.categories_do = null;
            this.playlist_do = null;
            this.audioScreen_do = null;
            this.flash_do = null;
            this.flashObject = null;
            this.facebookShare = null;
            this.flashObjectMarkup_str = null;
            this.popupWindowBackgroundColor = this.props_obj.popupWindowBackgroundColor || "#000000";
            this.prevCatId = -1;
            this.catId = -1;
            this.id = -1;
            this.prevId = -1;
            this.totalAudio = 0;
            this.stageWidth = 0;
            this.stageHeight = 0;
            this.maxWidth = self.props_obj.maxWidth || 2e3;
            this.maxHeight = 0;
            this.prevAddToHeight = -1;
            this.lastPercentPlayed = 0;
            this.popupWindowWidth = self.props_obj.popupWindowWidth || 500;
            this.popupWindowHeight = self.props_obj.popupWindowHeight || 400;
            if (FWDMSPUtils.isIE) this.popupWindowHeight -= 3;
            this.resizeHandlerId_to;
            this.resizeHandler2Id_to;
            this.hidePreloaderId_to;
            this.orientationChangeId_to;
            this.showCatWidthDelayId_to;
            this.showPlaylistWithDelayId_to;
            this.disablePlaylistForAWhileId_to;
            this.allowToResizeAndPosition_bl = false;
            this.isAPIReady_bl = false;
            this.isPlaylistLoaded_bl = false;
            this.isFlashScreenReady_bl = false;
            this.orintationChangeComplete_bl = true;
            this.animate_bl = false;
            this.isFirstPlaylistLoaded_bl = false;
            this.scrubbedFirstTimeInPopup_bl = false;
            this.showedFirstTime_bl = false;
            self.isPlaylistShowed_bl = false;
            this.useDeepLinking_bl = self.props_obj.useDeepLinking;
            this.useDeepLinking_bl = self.useDeepLinking_bl == "yes" ? true : false;
            this.openInPopup_bl = false;
            this.isMobile_bl = FWDMSPUtils.isMobile;
            this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
            try {
                if (window.opener && window.opener[this.instanceName_str] && window.opener[this.instanceName_str].instanceName_str == this.instanceName_str) {
                    this.openInPopup_bl = true;
                    this.popupWindow = window.opener[this.instanceName_str];
                    window.opener[this.instanceName_str].removeAndDisablePlayer();
                    if (!self.isMobile_bl) {
                        document.cookie = "FWDMSP=" + self.instanceName_str + "; path=/";
                        window.onbeforeunload = function(e) {
                            document.cookie = "FWDMSP=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
                        }
                    }
                }
            } catch (e) {}
            this.setupMainDo();
            this.startResizeHandler();
            this.setupInfo();
            this.setupData();
            FWDMSP.instaces_ar.push(this)
        };
        this.popup = function() {
            if (self.popupWindow && !self.popupWindow.closed) return;
            var e;
            var t = screen.width / 2 - self.popupWindowWidth / 2;
            var n = screen.height / 2 - self.popupWindowHeight / 2;
            var r = "no";
            if (FWDMSPUtils.isSafari) r = "yes";
            try {
                if (FWDMSPUtils.isMobile) {
                    self.popupWindow = window.open(location.href, self.instanceName_str)
                } else {
                    self.popupWindow = window.open(location.href, self.instanceName_str, "location=" + r + ", width=" + self.popupWindowWidth + ", height=" + self.popupWindowHeight + ", top=" + n + ", left=" + t)
                }
                if (self.popupWindow) {
                    self.stageContainer.style.display = "none";
                    if (self.preloader_do) self.preloader_do.hide(false);
                    self.data.closeData();
                    self.stop();
                    self.isAPIReady_bl = false
                }
                self.stopResizeHandler();
                self.dispatchEvent(FWDMSP.POPUP)
            } catch (i) {}
        };
        this.removeAndDisablePlayer = function() {
            self.stageContainer.style.display = "none"
        };
        self.setupMainDo = function() {
            self.background_do = new FWDMSPDisplayObject("div");
            self.background_do.getStyle().width = "100%";
            self.main_do = new FWDMSPDisplayObject("div");
            self.main_do.getStyle().msTouchAction = "none";
            self.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
            self.main_do.setBackfaceVisibility();
            if (!FWDMSPUtils.isMobile || FWDMSPUtils.isMobile && FWDMSPUtils.hasPointerEvent) self.main_do.setSelectable(false);
            if (self.openInPopup_bl) {
                document.documentElement.appendChild(self.main_do.screen);
                self.stageContainer.style.position = "absolute";
                document.documentElement.style.overflow = "hidden";
                document.documentElement.style.backgroundColor = self.popupWindowBackgroundColor;
                self.main_do.setBkColor(self.popupWindowBackgroundColor);
                if (FWDMSPUtils.isIEAndLessThen9) {
                    this.main_do.getStyle().zIndex = "2147483631"
                } else {
                    this.main_do.getStyle().zIndex = "99999999991"
                }
                if (FWDMSPUtils.isIE) {
                    document.getElementsByTagName("body")[0].appendChild(self.main_do.screen)
                } else {
                    document.getElementsByTagName("body")[0].style.display = "none"
                }
                self.main_do.setHeight(3e3)
            } else {
                self.stageContainer.appendChild(self.background_do.screen);
                self.stageContainer.appendChild(self.main_do.screen)
            }
        };
        self.setupInfo = function() {
            FWDMSPInfo.setPrototype();
            self.info_do = new FWDMSPInfo(self);
            if (FWDMSPUtils.isIEAndLessThen9) {
                self.info_do.getStyle().zIndex = "2147483632"
            } else {
                self.info_do.getStyle().zIndex = "99999999992"
            }
        };
        self.startResizeHandler = function() {
            if (window.addEventListener) {
                window.addEventListener("resize", self.onResizeHandler);
                if (FWDMSPUtils.isAndroid) window.addEventListener("orientationchange", self.orientationChange)
            } else if (window.attachEvent) {
                window.attachEvent("onresize", self.onResizeHandler)
            }
        };
        self.stopResizeHandler = function() {
            clearTimeout(self.resizeHandlerId_to);
            clearTimeout(self.resizeHandler2Id_to);
            clearTimeout(self.orientationChangeId_to);
            if (window.removeEventListener) {
                window.removeEventListener("resize", self.onResizeHandler);
                window.removeEventListener("orientationchange", self.orientationChange)
            } else if (window.detachEvent) {
                window.detachEvent("onresize", self.onResizeHandler)
            }
        };
        self.onScrollHandler = function() {
            self.onResizeHandler()
        };
        self.onResizeHandler = function(e) {
            self.resizeHandler()
        };
        this.orientationChange = function() {
            self.orintationChangeComplete_bl = false;
            clearTimeout(self.resizeHandlerId_to);
            clearTimeout(self.resizeHandler2Id_to);
            clearTimeout(self.orientationChangeId_to);
            self.orientationChangeId_to = setTimeout(function() {
                self.orintationChangeComplete_bl = true;
                self.resizeHandler(true)
            }, 1e3);
            self.stageContainer.style.left = "-5000px";
            if (self.preloader_do) self.preloader_do.setX(-5e3)
        };
        self.resizeHandler = function(e, t) {
            if (!self.orintationChangeComplete_bl) return;
            self.ws = FWDMSPUtils.getViewportSize();
            self.stageWidth = document.documentElement.offsetWidth;
            self.stageContainer.style.width = "100%";
            self.stageContainer.style.left = "0px";
            if (self.stageWidth > self.maxWidth && !self.openInPopup_bl) {
                self.stageWidth = self.maxWidth
            }
            if (self.controller_do) self.maxHeight = self.controller_do.h;
            self.stageHeight = self.maxHeight;
            self.main_do.setX(parseInt((self.ws.w - self.stageWidth) / 2));
            self.main_do.setWidth(self.stageWidth);
            if (self.preloader_do) self.positionPreloader();
            if (self.controller_do) self.controller_do.resizeAndPosition();
            if (self.categories_do) self.categories_do.resizeAndPosition();
            if (self.playlist_do) self.playlist_do.resizeAndPosition();
            if (self.isFirstPlaylistLoaded_bl) self.setStageContainerFinalHeightAndPosition(false)
        };
        this.setStageContainerFinalHeightAndPosition = function(e) {
            if (!self.ws) self.ws = FWDMSPUtils.getViewportSize();
            if (!self.controller_do || !self.allowToResizeAndPosition_bl) return;
            if (self.openInPopup_bl) {
                self.main_do.setX(0);
                self.main_do.setY(0);
                self.main_do.getStyle().width = "100%";
                self.main_do.setHeight(self.ws.h);
                self.controller_do.setX(0);
                FWDMSPTweenMax.killTweensOf(self.controller_do);
                if (e) {
                    if (self.controller_do.y != 0) FWDMSPTweenMax.to(self.controller_do, .8, {
                        y: 0,
                        ease: Expo.easeInOut
                    })
                } else {
                    self.controller_do.setY(0)
                }
                if (self.playlist_do) {
                    FWDMSPTweenMax.killTweensOf(self.playlist_do);
                    self.playlist_do.setX(0);
                    if (e) {
                        FWDMSPTweenMax.to(self.playlist_do, .8, {
                            y: self.controller_do.h,
                            delay: .4,
                            ease: Expo.easeInOut
                        })
                    } else {
                        self.playlist_do.setY(self.controller_do.h)
                    }
                }
                return
            }
            clearTimeout(self.showPlaylistWithDelayId_to);
            if (self.playlist_do && self.playlist_do.isShowed_bl) addToHeight = self.playlist_do.h;
            if (self.position_str == FWDMSP.POSITION_TOP) {
                if (self.playlist_do) {
                    self.background_do.setHeight(self.playlist_do.h + self.controller_do.h);
                    self.playlist_do.setY(0);
                    self.controller_do.setY(self.playlist_do.h);
                    self.main_do.setHeight(self.playlist_do.h + self.controller_do.h)
                } else {
                    self.background_do.setHeight(self.controller_do.h);
                    self.controller_do.setY(0);
                    self.main_do.setHeight(self.controller_do.h)
                }
            } else {
                if (self.playlist_do) {
                    self.background_do.setHeight(self.playlist_do.h + self.controller_do.h + 150);
                    self.playlist_do.setY(self.controller_do.h);
                    self.controller_do.setY(0);
                    self.main_do.setHeight(self.playlist_do.h + self.controller_do.h)
                } else {
                    self.background_do.setHeight(self.controller_do.h);
                    self.controller_do.setY(0);
                    self.main_do.setHeight(self.controller_do.h)
                }
            }
            if (self.data.openerAlignment_str == "right") {
                self.opener_do.setX(parseInt((self.ws.w - self.stageWidth) / 2) + self.stageWidth - self.opener_do.w)
            } else {
                if (self.main_do.x > 0) self.opener_do.setX(self.main_do.x)
            }
            FWDMSPTweenMax.killTweensOf(self.stageContainer);
            FWDMSPTweenMax.killTweensOf(self.background_do);
            FWDMSPTweenMax.killTweensOf(self.controller_do);
            FWDMSPTweenMax.killTweensOf(self.opener_do);
            self.center();
            if (e) {
                if (self.position_str == FWDMSP.POSITION_TOP) {
                    if (self.playlist_do && self.playlist_do.isShowed_bl && self.controller_do.isShowed_bl) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: 0
                            },
                            ease: Expo.easeInOut
                        });
                        FWDMSPTweenMax.to(self.opener_do, .8, {
                            y: self.playlist_do.h + self.controller_do.h,
                            ease: Expo.easeInOut
                        })
                    } else if (self.controller_do.isShowed_bl && self.playlist_do) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: -self.playlist_do.h
                            },
                            ease: Expo.easeInOut
                        });
                        FWDMSPTweenMax.to(self.opener_do, .8, {
                            y: self.playlist_do.h + self.controller_do.h,
                            ease: Expo.easeInOut
                        })
                    } else if (!self.controller_do.isShowed_bl && self.playlist_do) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: -self.playlist_do.h - self.controller_do.h
                            },
                            ease: Expo.easeInOut
                        });
                        FWDMSPTweenMax.to(self.opener_do, .8, {
                            y: self.playlist_do.h + self.controller_do.h,
                            ease: Expo.easeInOut,
                            onComplete: self.moveWheyLeft
                        })
                    } else if (self.controller_do.isShowed_bl) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: 0
                            },
                            ease: Expo.easeInOut
                        });
                        FWDMSPTweenMax.to(self.opener_do, .8, {
                            y: self.controller_do.h,
                            ease: Expo.easeInOut
                        })
                    } else {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: -self.controller_do.h
                            },
                            ease: Expo.easeInOut
                        });
                        FWDMSPTweenMax.to(self.opener_do, .8, {
                            y: self.controller_do.h,
                            ease: Expo.easeInOut
                        })
                    }
                } else {
                    if (self.playlist_do && self.playlist_do.isShowed_bl && self.controller_do.isShowed_bl) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: self.ws.h - self.controller_do.h - self.playlist_do.h
                            },
                            ease: Expo.easeInOut
                        })
                    } else if (self.controller_do.isShowed_bl && self.playlist_do) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: self.ws.h - self.controller_do.h
                            },
                            ease: Expo.easeInOut
                        })
                    } else if (self.controller_do.isShowed_bl) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: self.ws.h - self.controller_do.h
                            },
                            ease: Expo.easeInOut
                        })
                    } else if (self.controller_do.isShowed_bl) {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: 0
                            },
                            ease: Expo.easeInOut
                        })
                    } else {
                        FWDMSPTweenMax.to(self.stageContainer, .8, {
                            css: {
                                top: self.ws.h
                            },
                            ease: Expo.easeInOut,
                            onComplete: self.moveWheyLeft
                        })
                    }
                    FWDMSPTweenMax.to(self.opener_do, .8, {
                        y: -self.opener_do.h,
                        ease: Expo.easeInOut
                    })
                }
            } else {
                if (self.position_str == FWDMSP.POSITION_TOP) {
                    if (self.playlist_do && self.playlist_do.isShowed_bl && self.controller_do.isShowed_bl) {
                        self.stageContainer.style.top = "0px";
                        self.opener_do.setY(self.playlist_do.h + self.controller_do.h)
                    } else if (self.controller_do.isShowed_bl && self.playlist_do) {
                        self.stageContainer.style.top = -self.playlist_do.h + "px";
                        self.opener_do.setY(self.playlist_do.h + self.controller_do.h)
                    } else if (!self.controller_do.isShowed_bl && self.playlist_do) {
                        self.stageContainer.style.top = -self.playlist_do.h - self.controller_do.h + "px";
                        self.opener_do.setY(self.playlist_do.h + self.controller_do.h)
                    } else if (self.controller_do.isShowed_bl) {
                        self.stageContainer.style.top = "0px";
                        self.opener_do.setY(self.controller_do.h)
                    } else {
                        self.stageContainer.style.top = -self.controller_do.h + "px";
                        self.opener_do.setY(self.controller_do.h);
                        self.moveWheyLeft()
                    }
                } else {
                    if (self.playlist_do && self.playlist_do.isShowed_bl && self.controller_do.isShowed_bl) {
                        self.stageContainer.style.top = self.ws.h - self.controller_do.h - self.playlist_do.h + "px"
                    } else if (self.controller_do.isShowed_bl && self.playlist_do) {
                        self.stageContainer.style.top = self.ws.h - self.controller_do.h + "px"
                    } else if (self.controller_do.isShowed_bl) {
                        self.stageContainer.style.top = self.ws.h - self.controller_do.h + "px"
                    } else {
                        self.stageContainer.style.top = self.ws.h + "px";
                        self.moveWheyLeft()
                    }
                    self.opener_do.setY(-self.opener_do.h)
                }
            }
        };
        this.moveWheyLeft = function() {
            self.main_do.setX(-5e3);
            self.background_do.setWidth(0)
        };
        this.center = function() {
            self.main_do.setX(parseInt((self.ws.w - self.stageWidth) / 2));
            self.background_do.getStyle().width = "100%"
        };
        this.setupContextMenu = function() {
            self.customContextMenu_do = new FWDMSPContextMenu(self.main_do, self.data.rightClickContextMenu_str)
        };
        this.setupMainInstances = function() {
            if (self.controller_do) return;
            if (FWDMSP.hasHTML5Audio) self.setupAudioScreen();
            if (self.data.showPlaylistsButtonAndPlaylists_bl) self.setupCategories();
            if (self.data.showPlayListButtonAndPlaylist_bl) self.setupPlaylist();
            self.setupController();
            if (self.data.showFacebookButton_bl) self.setupFacebook();
            self.setupOpener();
            self.controller_do.resizeAndPosition()
        };
        this.setupData = function() {
            FWDMSPAudioData.setPrototype();
            self.data = new FWDMSPAudioData(self.props_obj, self.rootElement_el, self);
            self.data.addListener(FWDMSPAudioData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
            self.data.addListener(FWDMSPAudioData.LOAD_ERROR, self.dataLoadError);
            self.data.addListener(FWDMSPAudioData.SKIN_LOAD_COMPLETE, self.dataSkinLoadComplete);
            self.data.addListener(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE, self.dataPlayListLoadComplete)
        };
        self.onPreloaderLoadDone = function() {
            self.maxHeight = 32;
            self.background_do.getStyle().background = "url('" + self.data.skinPath_str + "main-background.png" + "')";
            self.setupPreloader();
            if (!self.isMobile_bl && self.data.showContextMenu_bl) self.setupContextMenu();
            self.resizeHandler();
            self.main_do.setHeight(self.stageHeight);
            if (self.openInPopup_bl) self.main_do.setHeight(3e3)
        };
        self.dataLoadError = function(e) {
            self.maxHeight = 120;
            if (self.preloader_do) self.preloader_do.hide(false);
            self.main_do.addChild(self.info_do);
            self.info_do.showText(e.text);
            if (!self.controller_do) {
                if (!self.ws) self.ws = FWDMSPUtils.getViewportSize();
                if (self.position_str == FWDMSP.POSITION_TOP) {
                    self.stageContainer.style.top = "0px"
                } else {
                    self.stageContainer.style.top = self.ws.h - self.maxHeight + "px"
                }
                self.main_do.setHeight(self.maxHeight)
            }
            self.resizeHandler();
            self.dispatchEvent(FWDMSP.ERROR, {
                error: e.text
            })
        };
        self.dataSkinLoadComplete = function() {
            self.animate_bl = self.data.animate_bl;
            if (self.openInPopup_bl) self.data.showPopupButton_bl = false;
            if (self.useDeepLinking_bl) {
                setTimeout(function() {
                    self.setupDL()
                }, 200)
            } else {
                if (self.openInPopup_bl) {
                    self.catId = self.popupWindow.catId;
                    self.id = self.popupWindow.id
                } else {
                    self.catId = self.data.startAtPlaylist;
                    self.id = self.data.startAtTrack
                }
                self.loadInternalPlaylist()
            }
        };
        this.dataPlayListLoadComplete = function() {
            if (!self.isAPIReady_bl) self.dispatchEvent(FWDMSP.READY);
            self.isAPIReady_bl = true;
            self.isPlaylistLoaded_bl = true;
            if (FWDMSP.hasHTML5Audio) {
                self.setupMainInstances();
                self.updatePlaylist()
            } else {
                if (self.flash_do) {
                    self.updatePlaylist()
                } else {
                    self.setupFlashScreen()
                }
            }
            self.dispatchEvent(FWDMSP.LOAD_PLAYLIST_COMPLETE)
        };
        this.updatePlaylist = function() {
            if (self.main_do)
                if (self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
            self.preloader_do.hide(true);
            self.prevId = -1;
            self.totalAudio = self.data.playlist_ar.length;
            self.controller_do.enableControllerWhileLoadingPlaylist();
            self.controller_do.cleanThumbnails(true);
            if (self.playlist_do) {
                self.playlist_do.updatePlaylist(self.data.playlist_ar);
                self.playlist_do.resizeAndPosition()
            }
            if (self.openInPopup_bl && self.popupWindow.audioScreen_do) self.lastPercentPlayed = self.popupWindow.audioScreen_do.lastPercentPlayed;
            self.setSource();
            if (self.data.autoPlay_bl) self.play();
            self.setStageContainerFinalHeightAndPosition(false);
            if (self.openInPopup_bl && !self.showedFirstTime_bl) {
                self.controller_do.setY(-self.controller_do.h);
                if (self.playlist_do) self.playlist_do.setY(-self.playlist_do.h)
            } else {
                if (self.playlist_do) self.playlist_do.setY(-self.playlist_do.h + self.controller_do.h)
            }
            if (self.openInPopup_bl) {
                clearTimeout(self.showPlaylistWithDelayId_to);
                if (!self.showedFirstTime_bl) {
                    self.showPlaylistWithDelayId_to = setTimeout(function() {
                        self.setStageContainerFinalHeightAndPosition(true)
                    }, 900)
                } else {
                    self.showPlaylistWithDelayId_to = setTimeout(function() {
                        self.setStageContainerFinalHeightAndPosition(true)
                    }, 100)
                }
                self.showedFirstTime_bl = true;
                self.allowToResizeAndPosition_bl = true;
                return
            }
            self.allowToResizeAndPosition_bl = true;
            if (self.position_str == FWDMSP.POSITION_TOP) {
                if (self.playlist_do && self.controller_do.isShowed_bl) {
                    if (!self.showedFirstTime_bl) {
                        self.stageContainer.style.top = -self.controller_do.h - self.playlist_do.h + "px";
                        self.opener_do.setY(self.controller_do.h + self.playlist_do.h - self.opener_do.h)
                    } else {
                        self.stageContainer.style.top = -self.playlist_do.h + "px";
                        self.opener_do.setY(self.controller_do.h + self.playlist_do.h)
                    }
                } else if (self.controller_do.isShowed_bl) {
                    if (self.playlist_do) {
                        self.stageContainer.style.top = self.controller_do.h + "px";
                        self.opener_do.setY(self.controller_do.h + self.playlist_do.h - self.opener_do.h)
                    } else {
                        if (!self.showedFirstTime_bl) {
                            self.stageContainer.style.top = -self.controller_do.h + "px";
                            self.opener_do.setY(self.controller_do.h - self.opener_do.h)
                        }
                    }
                } else {
                    if (self.playlist_do) {
                        self.stageContainer.style.top = -self.controller_do.h - self.playlist_do.h + "px";
                        self.opener_do.setY(0)
                    } else {
                        if (!self.showedFirstTime_bl) {
                            self.stageContainer.style.top = -self.controller_do.h + "px";
                            self.opener_do.setY(-self.opener_do.h)
                        } else {
                            self.stageContainer.style.top = -self.controller_do.h + "px";
                            self.opener_do.setY(0)
                        }
                    }
                }
            } else {
                if (self.controller_do.isShowed_bl || self.playlist_do && self.controller_do.isShowed_bl) {
                    if (!self.showedFirstTime_bl) {
                        self.stageContainer.style.top = self.ws.h + "px";
                        self.opener_do.setY(0)
                    } else {
                        self.stageContainer.style.top = self.ws.h - self.controller_do.h + "px";
                        self.opener_do.setY(-self.opener_do.h)
                    }
                } else {
                    if (!self.showedFirstTime_bl) {
                        self.stageContainer.style.top = self.ws.h + "px";
                        self.opener_do.setY(0)
                    } else {
                        self.stageContainer.style.top = self.ws.h + "px";
                        self.opener_do.setY(-self.opener_do.h)
                    }
                }
            }
            clearTimeout(self.showPlaylistWithDelayId_to);
            self.showPlaylistWithDelayId_to = setTimeout(function() {
                self.setStageContainerFinalHeightAndPosition(true)
            }, 900);
            self.showedFirstTime_bl = true
        };
        this.loadInternalPlaylist = function() {
            self.isPlaylistLoaded_bl = false;
            self.data.loadPlaylist(self.catId);
            self.stop();
            self.preloader_do.show(true);
            if (self.controller_do) {
                self.controller_do.disableControllerWhileLoadingPlaylist();
                self.controller_do.loadThumb()
            }
            if (self.playlist_do) self.playlist_do.destroyPlaylist();
            self.positionPreloader();
            self.setStageContainerFinalHeightAndPosition(false);
            self.dispatchEvent(FWDMSP.START_TO_LOAD_PLAYLIST)
        };
        this.setupDL = function() {
            FWDAddress.onChange = self.dlChangeHandler;
            self.dlChangeHandler()
        };
        this.dlChangeHandler = function() {
            var e = false;
            if (self.categories_do && self.categories_do.isOnDOM_bl) {
                self.categories_do.hide();
                return
            }
            self.catId = parseInt(FWDAddress.getParameter("catid"));
            self.id = parseInt(FWDAddress.getParameter("trackid"));
            if (self.catId == undefined || self.id == undefined || isNaN(self.catId) || isNaN(self.id)) {
                self.catId = self.data.startAtPlaylist;
                self.id = self.data.startAtTrack;
                e = true
            }
            if (self.catId < 0 || self.catId > self.data.totalCategories - 1 && !e) {
                self.catId = self.data.startAtPlaylist;
                self.id = self.data.startAtTrack;
                e = true
            }
            if (self.data.playlist_ar) {
                if (self.id < 0 && !e) {
                    self.id = self.data.startAtTrack;
                    e = true
                } else if (self.prevCatId == self.catId && self.id > self.data.playlist_ar.length - 1 && !e) {
                    self.id = self.data.playlist_ar.length - 1;
                    e = true
                }
            }
            if (e) {
                location.hash = self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id;
                return
            }
            if (self.prevCatId != self.catId) {
                self.loadInternalPlaylist();
                self.prevCatId = self.catId
            } else {
                self.setSource(false);
                self.play()
            }
        };
        this.setupPreloader = function() {
            FWDMSPPreloader.setPrototype();
            self.preloader_do = new FWDMSPPreloader(self.data.preloaderPath_str, 53, 34, 30, 80);
            self.preloader_do.addListener(FWDMSPPreloader.HIDE_COMPLETE, self.preloaderHideComplete);
            if (FWDMSPUtils.isIEAndLessThen9) {
                self.preloader_do.getStyle().zIndex = "2147483633"
            } else {
                self.preloader_do.getStyle().zIndex = "99999999993"
            }
            self.preloader_do.setPosition("fixed");
            self.preloader_do.setForFixedPosition();
            self.preloader_do.show(true);
            document.documentElement.appendChild(self.preloader_do.screen)
        };
        this.positionPreloader = function() {
            self.preloader_do.setX(parseInt((self.ws.w - self.preloader_do.w) / 2));
            if (self.openInPopup_bl) {
                if (self.controller_do) {
                    self.preloader_do.setY(parseInt((self.controller_do.h - self.preloader_do.h) / 2))
                } else {
                    self.preloader_do.setY(0)
                }
            } else if (self.position_str == FWDMSP.POSITION_TOP) {
                if (self.controller_do && !self.controller_do.isShowed_bl) {
                    self.preloader_do.setY(-200)
                } else if (self.controller_do) {
                    self.preloader_do.setY(parseInt((self.controller_do.h - self.preloader_do.h) / 2))
                } else {
                    self.preloader_do.setY(parseInt((self.stageHeight - self.preloader_do.h) / 2))
                }
            } else {
                if (self.controller_do && !self.controller_do.isShowed_bl) {
                    self.preloader_do.setY(self.ws.h)
                } else if (self.controller_do) {
                    self.preloader_do.setY(self.ws.h - self.controller_do.h + parseInt((self.controller_do.h - self.preloader_do.h) / 2))
                } else {
                    self.preloader_do.setY(self.ws.h - self.preloader_do.h)
                }
            }
        };
        this.preloaderHideComplete = function() {
            self.controller_do.show();
            self.opener_do.show();
            if (self.playlist_do) self.playlist_do.show();
            self.isFirstPlaylistLoaded_bl = true;
            self.allowToResizeAndPosition_bl = true;
            if (!self.animate_bl) self.setStageContainerFinalHeightAndPosition(false)
        };
        this.setupOpener = function() {
            FWDMSPOpener.setPrototype();
            self.opener_do = new FWDMSPOpener(self.data, self.position_str, self.controller_do.isShowed_bl);
            if (FWDMSPUtils.isIEAndLessThen9) {
                self.opener_do.getStyle().zIndex = "2147483634"
            } else {
                self.opener_do.getStyle().zIndex = "99999999994"
            }
            self.opener_do.setX(-1e3);
            if (self.controller_do.isShowed_bl) {
                self.opener_do.showCloseButton()
            } else {
                self.opener_do.showOpenButton()
            }
            self.opener_do.addListener(FWDMSPOpener.SHOW, self.openerShowHandler);
            self.opener_do.addListener(FWDMSPOpener.HIDE, self.openerHideHandler);
            self.opener_do.addListener(FWDMSPController.PLAY, self.controllerOnPlayHandler);
            self.opener_do.addListener(FWDMSPController.PAUSE, self.controllerOnPauseHandler);
            if (self.data.showOpener_bl) self.stageContainer.appendChild(self.opener_do.screen)
        };
        this.openerShowHandler = function() {
            self.showPlayer()
        };
        this.openerHideHandler = function() {
            self.hidePlayer()
        };
        this.setupCategories = function() {
            FWDMSPCategories.setPrototype();
            self.categories_do = new FWDMSPCategories(self.data);
            if (FWDMSPUtils.isIEAndLessThen9) {
                self.categories_do.getStyle().zIndex = "2147483635"
            } else {
                self.categories_do.getStyle().zIndex = "99999999995"
            }
            self.categories_do.addListener(FWDMSPCategories.HIDE_COMPLETE, self.categoriesHideCompleteHandler);
            if (self.data.showPlaylistsByDefault_bl) {
                self.showCatWidthDelayId_to = setTimeout(function() {
                    self.showCategories()
                }, 1400)
            }
        };
        this.categoriesHideCompleteHandler = function(e) {
            self.controller_do.setCategoriesButtonState("unselected");
            if (self.customContextMenu_do) self.customContextMenu_do.updateParent(self.main_do);
            if (self.useDeepLinking_bl) {
                if (self.categories_do.id != self.catId) {
                    self.catId = self.categories_do.id;
                    self.id = 0;
                    FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
                }
            } else {
                if (self.catId == self.categories_do.id) return;
                self.catId = self.categories_do.id;
                self.id = 0;
                self.loadInternalPlaylist(self.catId)
            }
        };
        this.setupPlaylist = function() {
            FWDMSPPlaylist.setPrototype();
            self.playlist_do = new FWDMSPPlaylist(self.data, self);
            self.playlist_do.addListener(FWDMSPPlaylistItem.MOUSE_UP, self.palylistItemOnUpHandler);
            self.playlist_do.addListener(FWDMSPPlaylistItem.DOWNLOAD, self.palylistItemDownloadHandler);
            self.playlist_do.addListener(FWDMSPPlaylistItem.BUY, self.palylistItemBuyHandler);
            self.playlist_do.addListener(FWDMSPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER, self.palylistUpdateFolderTrackTitle);
            self.main_do.addChild(self.playlist_do)
        };
        this.palylistItemOnUpHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                if (self.audioScreen_do.isPlaying_bl && e.id == self.id) {
                    self.pause()
                } else if (!self.audioScreen_do.isStopped_bl && e.id == self.id) {
                    self.play()
                } else {
                    if (self.useDeepLinking_bl && self.id != e.id) {
                        FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + e.id);
                        self.id = e.id
                    } else {
                        self.id = e.id;
                        self.setSource(true);
                        self.play()
                    }
                }
            } else if (self.isFlashScreenReady_bl) {
                if (self.flashObject.isAudioPlaying() && e.id == self.id) {
                    self.pause()
                } else if (!self.flashObject.isAudioStopped() && e.id == self.id) {
                    self.play()
                } else {
                    if (self.useDeepLinking_bl && self.id != e.id) {
                        FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + e.id);
                        self.id = e.id
                    } else {
                        self.id = e.id;
                        self.setSource(true);
                        self.play()
                    }
                }
            }
        };
        this.palylistItemDownloadHandler = function(e) {
            self.downloadMP3(e.id)
        };
        this.palylistUpdateFolderTrackTitle = function(e) {
            self.controller_do.setTitle(e.title)
        };
        this.palylistItemBuyHandler = function(e) {
            self.buy(e.id)
        };
        this.setupController = function() {
            FWDMSPController.setPrototype();
            self.controller_do = new FWDMSPController(self.data, self);
            self.controller_do.addListener(FWDMSPController.POPUP, self.controllerOnPopupHandler);
            self.controller_do.addListener(FWDMSPController.PLAY, self.controllerOnPlayHandler);
            self.controller_do.addListener(FWDMSPController.PLAY_NEXT, self.controllerPlayNextHandler);
            self.controller_do.addListener(FWDMSPController.PLAY_PREV, self.controllerPlayPrevHandler);
            self.controller_do.addListener(FWDMSPController.PAUSE, self.controllerOnPauseHandler);
            self.controller_do.addListener(FWDMSPController.VOLUME_START_TO_SCRUB, self.volumeStartToScrubbHandler);
            self.controller_do.addListener(FWDMSPController.VOLUME_STOP_TO_SCRUB, self.volumeStopToScrubbHandler);
            self.controller_do.addListener(FWDMSPController.START_TO_SCRUB, self.controllerStartToScrubbHandler);
            self.controller_do.addListener(FWDMSPController.SCRUB, self.controllerScrubbHandler);
            self.controller_do.addListener(FWDMSPController.SCRUB_PLAYLIST_ITEM, self.controllerPlaylistItemScrubbHandler);
            self.controller_do.addListener(FWDMSPController.STOP_TO_SCRUB, self.controllerStopToScrubbHandler);
            self.controller_do.addListener(FWDMSPController.CHANGE_VOLUME, self.controllerChangeVolumeHandler);
            self.controller_do.addListener(FWDMSPController.SHOW_CATEGORIES, self.showCategoriesHandler);
            self.controller_do.addListener(FWDMSPController.SHOW_PLAYLIST, self.showPlaylistHandler);
            self.controller_do.addListener(FWDMSPController.HIDE_PLAYLIST, self.hidePlaylistHandler);
            self.controller_do.addListener(FWDMSPController.ENABLE_LOOP, self.enableLoopHandler);
            self.controller_do.addListener(FWDMSPController.DISABLE_LOOP, self.disableLoopHandler);
            self.controller_do.addListener(FWDMSPController.DOWNLOAD_MP3, self.controllerButtonDownloadMp3Handler);
            self.controller_do.addListener(FWDMSPController.ENABLE_SHUFFLE, self.enableShuffleHandler);
            self.controller_do.addListener(FWDMSPController.DISABLE_SHUFFLE, self.disableShuffleHandler);
            self.controller_do.addListener(FWDMSPController.BUY, self.controllerButtonBuyHandler);
            self.controller_do.addListener(FWDMSPController.FACEBOOK_SHARE, self.facebookShareHandler);
            self.main_do.addChild(self.controller_do);
            if (self.openInPopup_bl && self.data.showPlaylistsButtonAndPlaylists_bl) {
                self.controller_do.setPlaylistButtonState("selected");
                if (self.controller_do.playlistButton_do) self.controller_do.playlistButton_do.disableForGood()
            }
        };
        this.controllerOnPopupHandler = function() {
            self.popup()
        };
        this.controllerOnPlayHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.play()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.playAudio()
            }
        };
        this.controllerPlayNextHandler = function(e) {
            if (self.data.shuffle_bl) {
                self.playShuffle()
            } else {
                self.playNext()
            }
        };
        this.controllerPlayPrevHandler = function(e) {
            if (self.data.shuffle_bl) {
                self.playShuffle()
            } else {
                self.playPrev()
            }
        };
        this.controllerOnPauseHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.pause()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.pauseAudio()
            }
        };
        this.volumeStartToScrubbHandler = function(e) {
            if (self.playlist_do) self.playlist_do.showDisable()
        };
        this.volumeStopToScrubbHandler = function(e) {
            if (self.playlist_do) self.playlist_do.hideDisable()
        };
        this.controllerStartToScrubbHandler = function(e) {
            if (self.playlist_do) self.playlist_do.showDisable();
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.startToScrub()
            } else if (self.isFlashScreenReady_bl) {
                FWDMSP.pauseAllAudio(self);
                self.flashObject.startToScrub()
            }
        };
        this.controllerScrubbHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.scrub(e.percent)
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.scrub(e.percent)
            }
        };
        this.controllerPlaylistItemScrubbHandler = function(e) {
            if (self.playlist_do) self.playlist_do.updateCurItemProgress(e.percent)
        };
        this.controllerStopToScrubbHandler = function(e) {
            if (self.playlist_do) self.playlist_do.hideDisable();
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.stopToScrub()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.stopToScrub()
            }
        };
        this.controllerChangeVolumeHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.setVolume(e.percent)
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.setVolume(e.percent)
            }
        };
        this.showCategoriesHandler = function(e) {
            self.showCategories();
            self.controller_do.setCategoriesButtonState("selected")
        };
        this.showPlaylistHandler = function(e) {
            self.showPlaylist()
        };
        this.hidePlaylistHandler = function(e) {
            self.hidePlaylist()
        };
        this.enableLoopHandler = function(e) {
            self.data.loop_bl = true;
            self.data.shuffle_bl = false;
            self.controller_do.setLoopStateButton("selected");
            self.controller_do.setShuffleButtonState("unselected")
        };
        this.disableLoopHandler = function(e) {
            self.data.loop_bl = false;
            self.controller_do.setLoopStateButton("unselected")
        };
        this.enableShuffleHandler = function(e) {
            self.data.shuffle_bl = true;
            self.data.loop_bl = false;
            self.controller_do.setShuffleButtonState("selected");
            self.controller_do.setLoopStateButton("unselected")
        };
        this.controllerButtonDownloadMp3Handler = function(e) {
            self.downloadMP3()
        };
        this.disableShuffleHandler = function(e) {
            self.data.shuffle_bl = false;
            self.controller_do.setShuffleButtonState("unselected")
        };
        this.facebookShareHandler = function(e) {
            if (document.location.protocol == "file:") {
                var t = "Facebook is not allowing sharing local, please test online.";
                self.main_do.addChild(self.info_do);
                self.info_do.showText(t);
                return
            }
            self.share()
        };
        this.controllerButtonBuyHandler = function() {
            self.buy()
        };
        this.setupAudioScreen = function() {
            FWDMSPAudioScreen.setPrototype();
            self.audioScreen_do = new FWDMSPAudioScreen(self.data.volume, self.data.autoPlay_bl, self.data.loop_bl);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.ERROR, self.audioScreenErrorHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.START, self.audioScreenSatrtHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.SAFE_TO_SCRUBB, self.audioScreenSafeToScrubbHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.STOP, self.audioScreenStopHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.PLAY, self.audioScreenPlayHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.PAUSE, self.audioScreenPauseHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.UPDATE, self.audioScreenUpdateHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.UPDATE_TIME, self.audioScreenUpdateTimeHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.LOAD_PROGRESS, self.audioScreenLoadProgressHandler);
            self.audioScreen_do.addListener(FWDMSPAudioScreen.PLAY_COMPLETE, self.audioScreenPlayCompleteHandler);
            if (self.useOnlyAPI_bl) {
                document.documentElement.appendChild(self.audioScreen_do.screen)
            } else {
                self.main_do.addChild(self.audioScreen_do)
            }
        };
        this.audioScreenErrorHandler = function(e) {
            var t;
            if (FWDMSP.hasHTML5Audio) {
                t = e.text;
                if (self.main_do) self.main_do.addChild(self.info_do);
                if (self.info_do) self.info_do.showText(t)
            } else {
                t = e;
                if (self.main_do) self.main_do.addChild(self.info_do);
                if (self.info_do) self.info_do.showText(t)
            }
            if (self.position_str == FWDMSP.POSITION_TOP && self.playlist_do) {
                self.info_do.setY(self.playlist_do.h);
                self.info_do.setHeight(self.controller_do.h)
            }
            self.dispatchEvent(FWDMSP.ERROR, {
                error: t
            })
        };
        this.audioScreenSatrtHandler = function() {
            self.dispatchEvent(FWDMSP.START)
        };
        this.audioScreenSafeToScrubbHandler = function() {
            if (self.controller_do) self.controller_do.enableMainScrubber()
        };
        this.audioScreenStopHandler = function(e) {
            if (self.main_do)
                if (self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
            if (self.controller_do) {
                self.controller_do.showPlayButton();
                self.controller_do.stopEqulizer();
                self.controller_do.disableMainScrubber()
            }
            self.dispatchEvent(FWDMSP.STOP)
        };
        this.audioScreenPlayHandler = function() {
            if (self.controller_do) {
                self.controller_do.showPauseButton();
                self.controller_do.startEqulizer()
            }
            if (self.opener_do) self.opener_do.showPauseButton();
            if (self.playlist_do) self.playlist_do.setCurItemPauseState();
            if (self.openInPopup_bl) {
                setTimeout(function() {
                    if (!self.scrubbedFirstTimeInPopup_bl) self.scrub(self.lastPercentPlayed);
                    self.scrubbedFirstTimeInPopup_bl = true
                }, 600)
            }
            self.dispatchEvent(FWDMSP.PLAY)
        };
        this.audioScreenPauseHandler = function() {
            if (self.controller_do) {
                self.controller_do.showPlayButton();
                self.controller_do.stopEqulizer()
            }
            if (self.opener_do) self.opener_do.showPlayButton();
            if (self.playlist_do) {
                self.playlist_do.setCurItemPlayState()
            }
            self.dispatchEvent(FWDMSP.PAUSE)
        };
        this.audioScreenUpdateHandler = function(e) {
            var t;
            if (FWDMSP.hasHTML5Audio) {
                t = e.percent;
                if (self.controller_do) self.controller_do.updateMainScrubber(t);
                if (self.playlist_do) self.playlist_do.updateCurItemProgress(t)
            } else {
                t = e;
                if (self.controller_do) self.controller_do.updateMainScrubber(t);
                if (self.playlist_do) self.playlist_do.updateCurItemProgress(t)
            }
            self.dispatchEvent(FWDMSP.UPDATE, {
                percent: t
            })
        };
        this.audioScreenUpdateTimeHandler = function(e, t) {
            var n;
            var r;
            if (FWDMSP.hasHTML5Audio) {
                n = e.curTime;
                r = e.totalTime;
                if (self.controller_do) self.controller_do.updateTime(n, r)
            } else {
                n = e;
                r = t;
                if (r.length > n.length) n = parseInt(r.substring(0, 1)) - 1 + ":" + n;
                if (self.controller_do) self.controller_do.updateTime(n, r)
            }
            self.dispatchEvent(FWDMSP.UPDATE_TIME, {
                curTime: n,
                totalTime: r
            })
        };
        this.audioScreenLoadProgressHandler = function(e) {
            if (FWDMSP.hasHTML5Audio) {
                if (self.controller_do) self.controller_do.updatePreloaderBar(e.percent)
            } else {
                if (self.controller_do) self.controller_do.updatePreloaderBar(e)
            }
        };
        this.audioScreenPlayCompleteHandler = function() {
            self.dispatchEvent(FWDMSP.PLAY_COMPLETE);
            if (FWDMSP.hasHTML5Audio) {
                if (self.data.loop_bl) {
                    self.audioScreen_do.replay()
                } else if (self.data.shuffle_bl) {
                    self.playShuffle()
                } else {
                    self.playNext()
                }
            } else if (self.isFlashScreenReady_bl) {
                if (self.data.loop_bl) {
                    self.flashObject.replayAudio()
                } else if (self.data.shuffle_bl) {
                    self.playShuffle()
                } else {
                    self.playNext()
                }
            }
        };
        this.setupFlashScreen = function() {
            if (self.flash_do) return;
            if (!FWDFlashTest.hasFlashPlayerVersion("9.0.18")) {
                if (self.useOnlyAPI_bl) {
                    alert("Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>")
                } else {
                    self.main_do.addChild(self.info_do);
                    self.info_do.showText("Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>")
                }
                if (self.preloader_do) self.preloader_do.hide(false);
                return
            }
            self.flash_do = new FWDMSPDisplayObject("div");
            self.flash_do.setBackfaceVisibility();
            self.flash_do.setResizableSizeAfterParent();
            if (self.useOnlyAPI_bl) {
                document.getElementsByTagName("body")[0].appendChild(self.flash_do.screen)
            } else {
                self.main_do.addChild(self.flash_do)
            }
            var e = "not defined!";
            self.flashObjectMarkup_str = '<object id="' + (self.instanceName_str + "1") + '" name="' + (self.instanceName_str + "1") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.data.flashPath_str + '"/><param name="wmode" value="transparent"><param name=FlashVars value="instanceName=' + self.instanceName_str + "&sourcePath=" + e + "&volume=" + self.data.volume + "&autoPlay=" + self.data.autoPlay_bl + "&loop=" + self.data.loop_bl + '"/><param name = "allowScriptAccess" value="always" /><!--[if !IE]>--><object name="myCom" type="application/x-shockwave-flash" data="' + self.data.flashPath_str + '" width="100%" height="100%"><param name="swliveconnect" value="true"/><param name="wmode" value="transparent"><param name=FlashVars value="instanceName=' + self.instanceName_str + "&sourcePath=" + e + "&volume=" + self.data.volume + "&autoPlay=" + self.data.autoPlay_bl + "&loop=" + self.data.loop_bl + '"/><!--<![endif]--><!--[if !IE]>--></object><!--<![endif]--></object>';
            self.flash_do.screen.innerHTML = self.flashObjectMarkup_str;
            self.flashObject = self.flash_do.screen.firstChild;
            if (!FWDMSPUtils.isIE) self.flashObject = self.flashObject.getElementsByTagName("object")[0]
        };
        this.flashScreenIsReady = function() {
            self.isFlashScreenReady_bl = true;
            self.setupMainInstances();
            self.updatePlaylist()
        };
        this.flashScreenFail = function() {
            self.main_do.addChild(self.info_do);
            self.info_do.showText("External interface error!");
            self.resizeHandler(false)
        };
        this.loadID3IfPlaylistDisabled = function() {
            var e = self.data.playlist_ar[self.id].source;
            var t = self.data.playlist_ar[self.id].title;
            if (t != "...") return;
            e = e + "?rand=" + parseInt(Math.random() * 99999999);
            ID3.loadTags(e, function() {
                var t = self.data.playlist_ar[self.id];
                var n = ID3.getAllTags(e);
                t.title = n.artist + " - " + n.title;
                t.titleText = t.title;
                self.controller_do.setTitle(t.title)
            })
        };
        this.setSource = function(e) {
            if (self.id < 0) {
                self.id = 0
            } else if (self.id > self.totalAudio - 1) {
                self.id = self.totalAudio - 1
            }
            var t = self.data.playlist_ar[self.id].source;
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.setSource(t)
            } else {
                var n = t.split(",");
                for (var r = 0; r < n.length; r++) {
                    t = n[r];
                    n[r] = FWDMSPUtils.trim(t)
                }
                for (var r = 0; r < n.length; r++) {
                    if (n[r].indexOf(".mp3") != -1) {
                        t = n[r];
                        break
                    }
                }
                self.flashObject.setSource(t)
            }
            self.controller_do.stopEqulizer();
            self.controller_do.setTitle(self.data.playlist_ar[self.id].title);
            if (self.data.playlist_ar[self.id].duration == undefined) {
                self.controller_do.updateTime("00:00", "00:00")
            } else {
                self.controller_do.updateTime("00:00", FWDMSP.formatTotalTime(self.data.playlist_ar[self.id].duration))
            }
            self.controller_do.loadThumb(self.data.playlist_ar[self.id].thumbPath);
            if (self.playlist_do) self.playlist_do.activateItems(self.id, e);
            if (self.playlist_do) {
                self.playlist_do.activateItems(self.id, e)
            } else {
                self.loadID3IfPlaylistDisabled()
            }
        };
        this.setupFacebook = function() {
            if (document.location.protocol == "file:") return;
            self.facebookShare = new FWDMSPFacebookShare(self.data.facebookAppId_str)
        };
        this.showPlayer = function() {
            if (!self.isAPIReady_bl) return;
            self.controller_do.isShowed_bl = true;
            self.opener_do.showCloseButton();
            self.setStageContainerFinalHeightAndPosition(self.animate_bl);
            if (self.playlist_do) {
                clearTimeout(self.disablePlaylistForAWhileId_to);
                self.disablePlaylistForAWhileId_to = setTimeout(function() {
                    self.playlist_do.hideDisable()
                }, 500);
                self.playlist_do.showDisable()
            }
        };
        this.hidePlayer = function() {
            if (!self.isAPIReady_bl) return;
            self.controller_do.isShowed_bl = false;
            self.opener_do.showOpenButton();
            self.setStageContainerFinalHeightAndPosition(self.animate_bl)
        };
        this.loadPlaylist = function(e) {
            if (!self.isAPIReady_bl) return;
            if (self.data.prevId == e) return;
            self.catId = e;
            self.id = 0;
            if (self.catId < 0) {
                self.catId = 0
            } else if (self.catId > self.data.totalCategories - 1) {
                self.catId = self.data.totalCategories - 1
            }
            if (self.useDeepLinking_bl) {
                FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
            } else {
                self.loadInternalPlaylist()
            }
        };
        this.playNext = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (self.data.showPlayListButtonAndPlaylist_bl) {
                if (self.playlist_do.items_ar[self.playlist_do.curItem_do.sortId + 1]) {
                    self.id = self.playlist_do.items_ar[self.playlist_do.curItem_do.sortId + 1].id
                } else {
                    self.id = self.playlist_do.items_ar[0].id
                }
            } else {
                self.id++;
                if (self.id < 0) {
                    self.id = self.totalAudio - 1
                } else if (self.id > self.totalAudio - 1) {
                    self.id = 0
                }
            }
            if (self.useDeepLinking_bl) {
                FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
            } else {
                self.setSource();
                self.play()
            }
            self.prevId = self.id
        };
        this.playPrev = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (self.data.showPlayListButtonAndPlaylist_bl) {
                if (self.playlist_do.items_ar[self.playlist_do.curItem_do.sortId - 1]) {
                    self.id = self.playlist_do.items_ar[self.playlist_do.curItem_do.sortId - 1].id
                } else {
                    self.id = self.playlist_do.items_ar[self.totalAudio - 1].id
                }
            } else {
                self.id--;
                if (self.id < 0) {
                    self.id = self.totalAudio - 1
                } else if (self.id > self.totalAudio - 1) {
                    self.id = 0
                }
            }
            if (self.useDeepLinking_bl) {
                FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
            } else {
                self.setSource();
                self.play()
            }
            self.prevId = self.id
        };
        this.playShuffle = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            var e = parseInt(Math.random() * self.data.playlist_ar.length);
            while (e == self.id) e = parseInt(Math.random() * self.data.playlist_ar.length);
            self.id = e;
            if (self.id < 0) {
                self.id = self.totalAudio - 1
            } else if (self.id > self.totalAudio - 1) {
                self.id = 0
            }
            if (self.useDeepLinking_bl) {
                FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
            } else {
                self.setSource();
                self.play()
            }
            self.prevId = self.id
        };
        this.playSpecificTrack = function(e, t) {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            self.catId = e;
            self.id = t;
            if (self.catId < 0) {
                self.catId = 0
            } else if (self.catId > self.data.totalCategories - 1) {
                self.catId = self.data.totalCategories - 1
            }
            if (self.id < 0) self.id = 0;
            if (self.useDeepLinking_bl) {
                FWDAddress.setValue(self.instanceName_str + "?catid=" + self.catId + "&trackid=" + self.id)
            } else {
                self.setSource();
                self.play()
            }
            self.prevId = self.id
        };
        this.play = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            FWDMSP.pauseAllAudio(self);
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.play()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.playAudio()
            }
        };
        this.pause = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.pause()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.pauseAudio()
            }
        };
        this.stop = function() {
            if (!self.isAPIReady_bl) return;
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.stop()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.stopAudio()
            }
        };
        this.startToScrub = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.startToScrub()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.startToScrub()
            }
        };
        this.stopToScrub = function() {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (FWDMSP.hasHTML5Audio) {
                self.audioScreen_do.stopToScrub()
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.stopToScrub()
            }
        };
        this.scrub = function(e) {
            if (!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
            if (isNaN(e)) return;
            if (e < 0) {
                e = 0
            } else if (e > 1) {
                e = 1
            }
            if (FWDMSP.hasHTML5Audio) {
                if (self.audioScreen_do) self.audioScreen_do.scrub(e)
            } else if (self.isFlashScreenReady_bl) {
                self.flashObject.scrub(e)
            }
        };
        this.setVolume = function(e) {
            if (!self.isAPIReady_bl) return;
            if (self.isMobile_bl) e = 1;
            self.controller_do.updateVolume(e)
        };
        this.showCategories = function() {
            if (!self.isAPIReady_bl) return;
            if (self.categories_do) {
                self.categories_do.show(self.catId);
                if (self.customContextMenu_do) self.customContextMenu_do.updateParent(self.categories_do);
                self.controller_do.setCategoriesButtonState("selected")
            }
        };
        this.hideCategories = function() {
            if (!self.isAPIReady_bl) return;
            if (self.categories_do) {
                self.categories_do.hide();
                self.controller_do.setCategoriesButtonState("unselected")
            }
        };
        this.showPlaylist = function() {
            if (!self.isAPIReady_bl) return;
            if (self.playlist_do) {
                self.isPlaylistShowed_bl = true;
                self.playlist_do.show(true);
                self.controller_do.setPlaylistButtonState("selected");
                clearTimeout(self.disablePlaylistForAWhileId_to);
                self.disablePlaylistForAWhileId_to = setTimeout(function() {
                    self.playlist_do.hideDisable()
                }, 150);
                self.playlist_do.showDisable()
            }
            self.setStageContainerFinalHeightAndPosition(self.animate_bl)
        };
        this.hidePlaylist = function() {
            if (!self.isAPIReady_bl) return;
            if (self.playlist_do) {
                self.isPlaylistShowed_bl = false;
                self.playlist_do.hide();
                self.controller_do.setPlaylistButtonState("unselected");
                self.setStageContainerFinalHeightAndPosition(self.animate_bl)
            }
        };
        this.share = function() {
            if (!self.isAPIReady_bl) return;
            if (document.location.protocol == "file:") return;
            if (self.facebookShare) {
                if (self.useDeepLinking_bl) {
                    var e = self.data.playlist_ar[self.id];
                    var t;
                    if (e.thumbPath && e.thumbPath.indexOf("//") != -1) {
                        t = e.thumbPath
                    } else {
                        var n = location.pathname;
                        n = location.protocol + "//" + location.host + n.substring(0, n.lastIndexOf("/") + 1);
                        t = n + e.thumbPath
                    }
                    self.facebookShare.share(location.href, e.titleText, t)
                } else {
                    self.facebookShare.share(location.href)
                }
            }
        };
        this.getIsAPIReady = function() {
            return self.isAPIReady_bl
        };
        this.getCatId = function() {
            return self.catId
        };
        this.getTrackId = function() {
            return self.id
        };
        this.getTrackTitle = function() {
            if (!self.isAPIReady_bl) return;
            return self.data.playlist_ar[self.id].title
        };
        this.downloadMP3 = function(e) {
            if (document.location.protocol == "file:") {
                var t = "Downloading mp3 files local is not allowed or possible!. To function properly please test online.";
                self.main_do.addChild(self.info_do);
                self.info_do.showText(t);
                return
            }
            if (e == undefined) e = self.id;
            var n = self.data.playlist_ar[e].downloadPath;
            var r = self.data.playlist_ar[e].titleText;
            self.data.downloadMp3(n, r)
        };
        this.buy = function(pId) {
            if (!self.isAPIReady_bl) return;
            if (document.location.protocol == "file:") {
                var error = "Buying mp3 files local is not allowed or possible!. To function properly please test online.";
                self.main_do.addChild(self.info_do);
                self.info_do.showText(error);
                return
            }
            if (pId == undefined) pId = self.id;
            var buy = self.data.playlist_ar[pId].buy;
            if (buy.indexOf("http") != -1 && buy.indexOf("http") < 3) {
                window.open(buy)
            } else {
                eval(buy)
            }
        };
        this.addListener = function(e, t) {
            if (!this.listeners) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        this.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        self.init()
    };
    FWDMSP.setPrototype = function() {
        FWDMSP.prototype = new FWDMSPEventDispatcher
    };
    FWDMSP.pauseAllAudio = function(e) {
        var t = FWDMSP.instaces_ar.length;
        var n;
        for (var r = 0; r < t; r++) {
            n = FWDMSP.instaces_ar[r];
            if (n != e) n.stop()
        }
    };
    FWDMSP.hasHTML5Audio = function() {
        var e = document.createElement("audio");
        var t = false;
        if (e.canPlayType) {
            t = Boolean(e.canPlayType("audio/mpeg") == "probably" || e.canPlayType("audio/mpeg") == "maybe")
        }
        if (self.isMobile_bl) return true;
        return t
    }();
    FWDMSP.getAudioFormats = function() {
        var e = document.createElement("audio");
        if (!e.canPlayType) return;
        var t = "";
        var n = [];
        if (e.canPlayType("audio/mpeg") == "probably" || e.canPlayType("audio/mpeg") == "maybe") {
            t += ".mp3"
        }
        if (e.canPlayType("audio/ogg") == "probably" || e.canPlayType("audio/ogg") == "maybe") {
            t += ".ogg"
        }
        if (e.canPlayType("audio/mp4") == "probably" || e.canPlayType("audio/mp4") == "maybe") {
            t += ".webm"
        }
        n = t.split(".");
        n.shift();
        e = null;
        return n
    }();
    FWDMSP.hasCanvas = function() {
        return Boolean(document.createElement("canvas"))
    }();
    FWDMSP.formatTotalTime = function(e) {
        if (typeof e == "string" && e.indexOf(":") != -1) {
            return e
        }
        e = e / 1e3;
        var t = Math.floor(e / (60 * 60));
        var n = e % (60 * 60);
        var r = Math.floor(n / 60);
        var i = n % 60;
        var s = Math.ceil(i);
        r = r >= 10 ? r : "0" + r;
        s = s >= 10 ? s : "0" + s;
        if (isNaN(s)) return "00:00/00:00";
        if (t > 0) {
            return t + ":" + r + ":" + s
        } else {
            return r + ":" + s
        }
    };
    FWDMSP.getAudioFormats = function() {
        var e = document.createElement("audio");
        if (!e.canPlayType) return;
        var t = "";
        var n = [];
        if (e.canPlayType("audio/mpeg") == "probably" || e.canPlayType("audio/mpeg") == "maybe") {
            t += ".mp3"
        }
        if (e.canPlayType("audio/ogg") == "probably" || e.canPlayType("audio/ogg") == "maybe") {
            t += ".ogg"
        }
        if (e.canPlayType("audio/mp4") == "probably" || e.canPlayType("audio/mp4") == "maybe") {
            t += ".webm"
        }
        n = t.split(".");
        n.shift();
        e = null;
        return n
    }();
    FWDMSP.instaces_ar = [];
    FWDMSP.POPUP = "popup";
    FWDMSP.POSITION_TOP = "positionTop";
    FWDMSP.POSITION_BOTTOM = "positionBottom";
    FWDMSP.READY = "ready";
    FWDMSP.START = "start";
    FWDMSP.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist";
    FWDMSP.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete";
    FWDMSP.STOP = "stop";
    FWDMSP.PLAY = "play";
    FWDMSP.PAUSE = "pause";
    FWDMSP.UPDATE = "update";
    FWDMSP.UPDATE_TIME = "updateTime";
    FWDMSP.ERROR = "error";
    FWDMSP.PLAY_COMPLETE = "playComplete";
    FWDMSP.PLAYLIST_LOAD_COMPLETE = "onPlayListLoadComplete";
    window.FWDMSP = FWDMSP
})(window);
(function(window) {
    var FWDMSPAudioData = function(props, playListElement, parent) {
        var self = this;
        var prototype = FWDMSPAudioData.prototype;
        this.xhr = null;
        this.emailXHR = null;
        this.playlist_ar = null;
        this.dlIframe = null;
        this.mainPreloader_img = null;
        this.bk_img = null;
        this.thumbnail_img = null;
        this.separator1_img = null;
        this.separator2_img = null;
        this.prevN_img = null;
        this.playN_img = null;
        this.pauseN_img = null;
        this.nextN_img = null;
        this.popupN_img = null;
        this.downloaderN_img = null;
        this.toopTipBk_str = null;
        this.toopTipPointer_str = null;
        this.toopTipPointerUp_str = null;
        this.mainScrubberBkLeft_img = null;
        this.mainScrubberBkRight_img = null;
        this.mainScrubberDragLeft_img = null;
        this.mainScrubberLine_img = null;
        this.mainScrubberLeftProgress_img = null;
        this.volumeScrubberBkLeft_img = null;
        this.volumeScrubberBkRight_img = null;
        this.volumeScrubberDragLeft_img = null;
        this.volumeScrubberLine_img = null;
        this.volumeD_img = null;
        this.progressLeft_img = null;
        this.titleBarLeft_img = null;
        this.titleBarRigth_img = null;
        this.openerAnimation_img = null;
        this.openTopN_img = null;
        this.openTopS_img = null;
        this.openBottomN_img = null;
        this.openBottomS_img = null;
        this.closeN_img = null;
        this.closeS_img = null;
        this.openerPauseN_img = null;
        this.openerPauseS_img = null;
        this.openerPlayN_img = null;
        this.openerPlayS_img = null;
        this.categoriesN_img = null;
        this.replayN_img = null;
        this.playlistN_img = null;
        this.shuffleN_img = null;
        this.facebookN_img = null;
        this.titlebarAnimBkPath_img = null;
        this.titlebarLeftPath_img = null;
        this.titlebarRightPath_img = null;
        this.soundAnimationPath_img = null;
        this.controllerBk_img = null;
        this.playlistItemBk1_img = null;
        this.playlistItemBk2_img = null;
        this.playlistSeparator_img = null;
        this.playlistScrBkTop_img = null;
        this.playlistScrBkMiddle_img = null;
        this.playlistScrBkBottom_img = null;
        this.playlistScrDragTop_img = null;
        this.playlistScrDragMiddle_img = null;
        this.playlistScrDragBottom_img = null;
        this.playlistScrLines_img = null;
        this.playlistScrLinesOver_img = null;
        this.playlistPlayButtonN_img = null;
        this.playlistItemGrad1_img = null;
        this.playlistItemGrad2_img = null;
        this.playlistItemProgress1_img = null;
        this.playlistItemProgress2_img = null;
        this.playlistDownloadButtonN_img = null;
        this.playlistDownloadButtonS_img = null;
        this.catThumbBk_img = null;
        this.catThumbTextBk_img = null;
        this.catNextN_img = null;
        this.catNextS_img = null;
        this.catNextD_img = null;
        this.catPrevN_img = null;
        this.catPrevS_img = null;
        this.catPrevD_img = null;
        this.catCloseN_img = null;
        this.catCloseS_img = null;
        this.categories_el = null;
        this.scs_el = null;
        this.props_obj = props;
        this.skinPaths_ar = [];
        this.images_ar = [];
        this.cats_ar = [];
        this.scClientId_str = "a123083c52a6b06985421d33038e033a";
        this.flashPath_str = null;
        this.mp3DownloaderPath_str = null;
        this.proxyPath_str = null;
        this.proxyFolderPath_str = null;
        this.mailPath_str = null;
        this.skinPath_str = null;
        this.controllerBkPath_str = null;
        this.thumbnailBkPath_str = null;
        this.playlistIdOrPath_str = null;
        this.mainScrubberBkMiddlePath_str = null;
        this.volumeScrubberBkMiddlePath_str = null;
        this.mainScrubberDragMiddlePath_str = null;
        this.volumeScrubberDragMiddlePath_str = null;
        this.timeColor_str = null;
        this.titleColor_str = null;
        this.progressMiddlePath_str = null;
        this.sourceURL_str = null;
        this.titlebarBkMiddlePattern_str = null;
        this.playlistPlayButtonN_str = null;
        this.playlistPlayButtonS_str = null;
        this.playlistPauseButtonN_str = null;
        this.playlistPauseButtonS_str = null;
        this.trackTitleNormalColor_str = null;
        this.trackTitleSelected_str = null;
        this.trackDurationColor_str = null;
        this.categoriesId_str = null;
        this.thumbnailSelectedType_str = null;
        this.facebookAppId_str = null;
        this.openerAlignment_str = null;
        this.toolTipsButtonFontColor_str = null;
        this.prevId = -1;
        this.totalCats = 0;
        this.countLoadedSkinImages = 0;
        this.volume = 1;
        this.startSpaceBetweenButtons = 0;
        this.spaceBetweenButtons = 0;
        this.mainScrubberOffsetTop = 0;
        this.spaceBetweenMainScrubberAndTime = 0;
        this.startTimeSpace = 0;
        this.scrubbersOffsetWidth = 0;
        this.scrubbersOffestTotalWidth = 0;
        this.volumeButtonAndScrubberOffsetTop = 0;
        this.maxPlaylistItems = 0;
        this.separatorOffsetOutSpace = 0;
        this.separatorOffsetInSpace = 0;
        this.lastButtonsOffsetTop = 0;
        this.allButtonsOffsetTopAndBottom = 0;
        this.controllerHeight = 0;
        this.titleBarOffsetTop = 0;
        this.scrubberOffsetBottom = 0;
        this.equlizerOffsetLeft = 0;
        this.nrOfVisiblePlaylistItems = 0;
        this.trackTitleOffsetLeft = 0;
        this.playPauseButtonOffsetLeftAndRight = 0;
        this.durationOffsetRight = 0;
        this.downloadButtonOffsetRight = 0;
        this.scrollbarOffestWidth = 0;
        this.resetLoadIndex = -1;
        this.startAtPlaylist = 0;
        this.startAtTrack = 0;
        this.totalCategories = 0;
        this.thumbnailMaxWidth = 0;
        this.buttonsMargins = 0;
        this.thumbnailMaxHeight = 0;
        this.horizontalSpaceBetweenThumbnails = 0;
        this.verticalSpaceBetweenThumbnails = 0;
        this.openerEqulizerOffsetLeft = 0, this.openerEqulizerOffsetTop = 0;
        this.countID3 = 0;
        this.toolTipsButtonsHideDelay = 0;
        this.JSONPRequestTimeoutId_to;
        this.showLoadPlaylistErrorId_to;
        this.dispatchPlaylistLoadCompleteWidthDelayId_to;
        this.loadImageId_to;
        this.loadPreloaderId_to;
        this.isPlaylistDispatchingError_bl = false;
        this.allowToChangeVolume_bl = true;
        this.showContextMenu_bl = false;
        this.showButtonsToolTips_bl = false;
        this.autoPlay_bl = false;
        this.loop_bl = false;
        this.shuffle_bl = false;
        this.showLoopButton_bl = false;
        this.showShuffleButton_bl = false;
        this.showDownloadMp3Button_bl = false;
        this.showPlaylistsButtonAndPlaylists_bl = false;
        this.showPlaylistsByDefault_bl = false;
        this.showPlayListButtonAndPlaylist_bl = false;
        this.showFacebookButton_bl = false;
        this.showPopupButton_bl = false;
        this.animate_bl = false;
        this.showControllerByDefault_bl = false;
        this.showPlayListByDefault_bl = false;
        this.isDataLoaded_bl = false;
        this.useDeepLinking_bl = false;
        this.showSoundCloudUserNameInTitle_bl = false;
        this.showThumbnail_bl = false;
        this.showSoundAnimation_bl = false;
        this.expandControllerBackground_bl = false;
        this.showPlaylistItemPlayButton_bl = false;
        this.showPlaylistItemDownloadButton_bl = false;
        this.forceDisableDownloadButtonForPodcast_bl = false;
        this.forceDisableDownloadButtonForOfficialFM_bl = false;
        this.forceDisableDownloadButtonForFolder_bl = false;
        this.loadFromFolder_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        self.init = function() {
            self.parseProperties()
        };
        self.parseProperties = function() {
            self.categoriesId_str = self.props_obj.playlistsId;
            if (!self.categoriesId_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>playlistsId</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            self.mainFolderPath_str = self.props_obj.mainFolderPath;
            if (!self.mainFolderPath_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>mainFolderPath</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            if (self.mainFolderPath_str.lastIndexOf("/") + 1 != self.mainFolderPath_str.length) {
                self.mainFolderPath_str += "/"
            }
            self.skinPath_str = self.props_obj.skinPath;
            if (!self.skinPath_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            if (self.skinPath_str.lastIndexOf("/") + 1 != self.skinPath_str.length) {
                self.skinPath_str += "/"
            }
            self.skinPath_str = self.mainFolderPath_str + self.skinPath_str;
            self.flashPath_str = self.mainFolderPath_str + "swf.swf";
            self.proxyPath_str = self.mainFolderPath_str + "proxy.php";
            self.proxyFolderPath_str = self.mainFolderPath_str + "proxyFolder.php";
            self.mailPath_str = self.mainFolderPath_str + "sendMail.php";
            self.mp3DownloaderPath_str = self.mainFolderPath_str + "downloader.php";
            self.categories_el = document.getElementById(self.categoriesId_str);
            if (!self.categories_el) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The html element with id <font color='#FFFFFF'>" + self.categoriesId_str + "</font> is not found in the DOM, this html element represents the player categories.!";
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            var e = FWDMSPUtils.getChildren(self.categories_el);
            self.totalCats = e.length;
            self.categories_el = document.getElementById(self.categoriesId_str);
            if (self.totalCats == 0) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "At least one category is required!";
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            for (var t = 0; t < self.totalCats; t++) {
                var n = {};
                child = e[t];
                if (!FWDMSPUtils.hasAttribute(child, "data-source")) {
                    setTimeout(function() {
                        if (self == null) return;
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-source</font> is required in the categories html element at position <font color='#FFFFFF'>" + (t + 1)
                        })
                    }, 50);
                    return
                }
                if (!FWDMSPUtils.hasAttribute(child, "data-thumbnail-path")) {
                    setTimeout(function() {
                        if (self == null) return;
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-thumbnail-path</font> is required in the categories html element at position <font color='#FFFFFF'>" + (t + 1)
                        })
                    }, 50);
                    return
                }
                n.source = FWDMSPUtils.getAttributeValue(child, "data-source");
                n.thumbnailPath = FWDMSPUtils.getAttributeValue(child, "data-thumbnail-path");
                n.htmlContent = child.innerHTML;
                self.cats_ar[t] = n
            }
            self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "transparent";
            self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000";
            self.facebookAppId_str = self.props_obj.facebookAppId || undefined;
            self.openerAlignment_str = self.props_obj.openerAlignment || "right";
            if (self.openerAlignment_str != "right" && self.openerAlignment_str != "left") self.openerAlignment_str = "right";
            self.toolTipsButtonFontColor_str = self.props_obj.toolTipsButtonFontColor || "#FF0000";
            self.totalCategories = self.cats_ar.length;
            self.playlistIdOrPath_str = self.props_obj.playlistIdOrPath || undefined;
            self.timeColor_str = self.props_obj.timeColor || "#FF0000";
            self.trackTitleNormalColor_str = self.props_obj.trackTitleNormalColor || "#FF0000";
            self.trackTitleSelected_str = self.props_obj.trackTitleSelectedColor || "#FF0000";
            self.trackDurationColor_str = self.props_obj.trackDurationColor || "#FF0000";
            self.titleColor_str = self.props_obj.titleColor || "#FF0000";
            self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity";
            if (self.thumbnailSelectedType_str != "blackAndWhite" && self.thumbnailSelectedType_str != "threshold" && self.thumbnailSelectedType_str != "opacity") {
                self.thumbnailSelectedType_str = "opacity"
            }
            if (self.isMobile_bl || FWDMSPUtils.isIEAndLessThen9) self.thumbnailSelectedType_str = "opacity";
            if (document.location.protocol == "file:") self.thumbnailSelectedType_str = "opacity";
            self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000";
            self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "transparent";
            self.startAtPlaylist = self.props_obj.startAtPlaylist || 0;
            if (isNaN(self.startAtPlaylist)) self.startAtPlaylist = 0;
            if (self.startAtPlaylist < 0) {
                self.startAtPlaylist = 0
            } else if (self.startAtPlaylist > self.totalCats - 1) {
                self.startAtPlaylist = self.totalCats - 1
            }
            self.startAtTrack = self.props_obj.startAtTrack || 0;
            self.volume = self.props_obj.volume;
            if (!self.volume) self.volume = 1;
            if (isNaN(self.volume)) volume = 1;
            if (self.volume > 1 || self.isMobile_bl) {
                self.volume = 1
            } else if (self.volume < 0) {
                self.volume = 0
            }
            self.searchBarHeight = self.props_obj.searchBarHeight || 50;
            self.buttonsMargins = self.props_obj.buttonsMargins || 0;
            self.thumbnailMaxWidth = self.props_obj.thumbnailMaxWidth || 330;
            self.thumbnailMaxHeight = self.props_obj.thumbnailMaxHeight || 330;
            self.horizontalSpaceBetweenThumbnails = self.props_obj.horizontalSpaceBetweenThumbnails;
            if (self.horizontalSpaceBetweenThumbnails == undefined) self.horizontalSpaceBetweenThumbnails = 40;
            self.verticalSpaceBetweenThumbnails = parseInt(self.props_obj.verticalSpaceBetweenThumbnails);
            if (self.verticalSpaceBetweenThumbnails == undefined) self.verticalSpaceBetweenThumbnails = 40;
            self.openerEqulizerOffsetLeft = self.props_obj.openerEqulizerOffsetLeft || 0;
            self.openerEqulizerOffsetTop = self.props_obj.openerEqulizerOffsetTop || 0;
            self.toolTipsButtonsHideDelay = self.props_obj.toolTipsButtonsHideDelay || 1.5;
            self.inputSearchTextOffsetTop = self.props_obj.inputSearchTextOffsetTop;
            self.inputSearchOffsetLeft = self.props_obj.inputSearchOffsetLeft;
            self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
            self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0;
            self.mainScrubberOffsetTop = self.props_obj.mainScrubberOffsetTop || 100;
            self.spaceBetweenMainScrubberAndTime = self.props_obj.spaceBetweenMainScrubberAndTime;
            self.startTimeSpace = self.props_obj.startTimeSpace;
            self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0;
            self.scrubbersOffestTotalWidth = self.props_obj.scrubbersOffestTotalWidth || 0;
            self.volumeButtonAndScrubberOffsetTop = self.props_obj.volumeButtonAndScrubberOffsetTop || 0;
            self.spaceBetweenVolumeButtonAndScrubber = self.props_obj.spaceBetweenVolumeButtonAndScrubber || 0;
            self.volumeScrubberOffestWidth = self.props_obj.volumeScrubberOffestWidth || 0;
            self.scrubberOffsetBottom = self.props_obj.scrubberOffsetBottom || 0;
            self.equlizerOffsetLeft = self.props_obj.equlizerOffsetLeft || 0;
            self.nrOfVisiblePlaylistItems = self.props_obj.nrOfVisiblePlaylistItems || 0;
            self.trackTitleOffsetLeft = self.props_obj.trackTitleOffsetLeft || 0;
            self.playPauseButtonOffsetLeftAndRight = self.props_obj.playPauseButtonOffsetLeftAndRight || 0;
            self.durationOffsetRight = self.props_obj.durationOffsetRight || 0;
            self.downloadButtonOffsetRight = self.props_obj.downloadButtonOffsetRight || 0;
            self.scrollbarOffestWidth = self.props_obj.scrollbarOffestWidth || 0;
            self.maxPlaylistItems = self.props_obj.maxPlaylistItems || 200;
            self.controllerHeight = self.props_obj.controllerHeight || 200;
            self.titleBarOffsetTop = self.props_obj.titleBarOffsetTop || 0;
            self.separatorOffsetInSpace = self.props_obj.separatorOffsetInSpace || 0;
            self.lastButtonsOffsetTop = self.props_obj.lastButtonsOffsetTop || 0;
            self.allButtonsOffsetTopAndBottom = self.props_obj.allButtonsOffsetTopAndBottom || 0;
            self.separatorOffsetOutSpace = self.props_obj.separatorOffsetOutSpace || 0;
            self.volumeScrubberWidth = self.props_obj.volumeScrubberWidth || 10;
            if (self.volumeScrubberWidth > 200) self.volumeScrubberWidth = 200;
            if (self.isMobile_bl) self.allowToChangeVolume_bl = false;
            self.showContextMenu_bl = self.props_obj.showContextMenu;
            self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
            self.showButtonsToolTips_bl = self.props_obj.showButtonsToolTips;
            self.showButtonsToolTips_bl = self.showButtonsToolTips_bl == "no" ? false : true;
            if (self.isMobile_bl) self.showButtonsToolTips_bl = false;
            self.autoPlay_bl = self.props_obj.autoPlay;
            self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
            self.loop_bl = self.props_obj.loop;
            self.loop_bl = self.loop_bl == "yes" ? true : false;
            self.shuffle_bl = self.props_obj.shuffle;
            self.shuffle_bl = self.shuffle_bl == "yes" ? true : false;
            self.useDeepLinking_bl = self.props_obj.useDeepLinking;
            self.useDeepLinking_bl = self.useDeepLinking_bl == "yes" ? true : false;
            self.showSoundCloudUserNameInTitle_bl = self.props_obj.showSoundCloudUserNameInTitle;
            self.showSoundCloudUserNameInTitle_bl = self.showSoundCloudUserNameInTitle_bl == "yes" ? true : false;
            self.showThumbnail_bl = self.props_obj.showThumbnail;
            self.showThumbnail_bl = self.showThumbnail_bl == "yes" ? true : false;
            self.showLoopButton_bl = self.props_obj.showLoopButton;
            self.showLoopButton_bl = self.props_obj.showLoopButton == "no" ? false : true;
            self.showPlayListButtonAndPlaylist_bl = self.props_obj.showPlayListButtonAndPlaylist;
            self.showPlayListButtonAndPlaylist_bl = self.showPlayListButtonAndPlaylist_bl == "no" ? false : true;
            if (FWDMSPUtils.isAndroid && self.showPlayListButtonAndPlaylist_bl && self.props_obj.showPlayListOnAndroid == "no") {
                self.showPlayListButtonAndPlaylist_bl = false
            }
            self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
            test = self.rightClickContextMenu_str == "developer" || self.rightClickContextMenu_str == "disabled" || self.rightClickContextMenu_str == "default";
            if (!test) self.rightClickContextMenu_str = "developer";
            self.showPlaylistsButtonAndPlaylists_bl = self.props_obj.showPlaylistsButtonAndPlaylists;
            self.showPlaylistsButtonAndPlaylists_bl = self.showPlaylistsButtonAndPlaylists_bl == "no" ? false : true;
            self.showPlaylistsByDefault_bl = self.props_obj.showPlaylistsByDefault;
            self.showPlaylistsByDefault_bl = self.showPlaylistsByDefault_bl == "yes" ? true : false;
            self.showShuffleButton_bl = self.props_obj.showShuffleButton;
            self.showShuffleButton_bl = self.showShuffleButton_bl == "no" ? false : true;
            self.showDownloadMp3Button_bl = self.props_obj.showDownloadMp3Button;
            self.showDownloadMp3Button_bl = self.showDownloadMp3Button_bl == "no" ? false : true;
            self.showBuyButton_bl = self.props_obj.showBuyButton;
            self.showBuyButton_bl = self.showBuyButton_bl == "no" ? false : true;
            self.showFacebookButton_bl = self.props_obj.showFacebookButton;
            self.showFacebookButton_bl = self.showFacebookButton_bl == "no" ? false : true;
            self.showPopupButton_bl = self.props_obj.showPopupButton;
            self.showPopupButton_bl = self.showPopupButton_bl == "no" ? false : true;
            self.showOpenerPlayPauseButton_bl = self.props_obj.showOpenerPlayPauseButton;
            self.showOpenerPlayPauseButton_bl = self.showOpenerPlayPauseButton_bl == "no" ? false : true;
            self.showPlaylistItemBuyButton_bl = self.props_obj.showPlaylistItemBuyButton;
            self.showPlaylistItemBuyButton_bl = self.showPlaylistItemBuyButton_bl == "no" ? false : true;
            self.showOpener_bl = self.props_obj.showOpener;
            self.showOpener_bl = self.showOpener_bl == "no" ? false : true;
            self.showTracksNumbers_bl = self.props_obj.showTracksNumbers;
            self.showTracksNumbers_bl = self.showTracksNumbers_bl == "yes" ? true : false;
            if (self.showFacebookButton_bl && !self.facebookAppId_str) {
                setTimeout(function() {
                    if (self == null) return;
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "Parameter <font color='#FFFFFF'>facebookAppId</font> is requiredin the constructor, this represents the facebook app id, for more info read the documetation"
                    })
                }, 50);
                return
            }
            self.animate_bl = self.props_obj.animate;
            self.animate_bl = self.animate_bl == "yes" ? true : false;
            self.showControllerByDefault_bl = self.props_obj.showControllerByDefault;
            self.showControllerByDefault_bl = self.showControllerByDefault_bl == "no" ? false : true;
            self.showPlayListByDefault_bl = self.props_obj.showPlayListByDefault;
            self.showPlayListByDefault_bl = self.showPlayListByDefault_bl == "no" ? false : true;
            self.showSoundAnimation_bl = self.props_obj.showSoundAnimation;
            self.showSoundAnimation_bl = self.showSoundAnimation_bl == "yes" ? true : false;
            self.expandControllerBackground_bl = self.props_obj.expandBackground;
            self.expandControllerBackground_bl = self.expandControllerBackground_bl == "yes" ? true : false;
            self.showPlaylistItemPlayButton_bl = self.props_obj.showPlaylistItemPlayButton;
            self.showPlaylistItemPlayButton_bl = self.showPlaylistItemPlayButton_bl == "no" ? false : true;
            self.showPlaylistItemDownloadButton_bl = self.props_obj.showPlaylistItemDownloadButton;
            self.showPlaylistItemDownloadButton_bl = self.showPlaylistItemDownloadButton_bl == "no" ? false : true;
            self.forceDisableDownloadButtonForPodcast_bl = self.props_obj.forceDisableDownloadButtonForPodcast;
            self.forceDisableDownloadButtonForPodcast_bl = self.forceDisableDownloadButtonForPodcast_bl == "yes" ? true : false;
            self.forceDisableDownloadButtonForOfficialFM_bl = self.props_obj.forceDisableDownloadButtonForOfficialFM;
            self.forceDisableDownloadButtonForOfficialFM_bl = self.forceDisableDownloadButtonForOfficialFM_bl == "yes" ? true : false;
            self.forceDisableDownloadButtonForFolder_bl = self.props_obj.forceDisableDownloadButtonForFolder;
            self.forceDisableDownloadButtonForFolder_bl = self.forceDisableDownloadButtonForFolder_bl == "yes" ? true : false;
            self.addScrollBarMouseWheelSupport_bl = self.props_obj.addScrollBarMouseWheelSupport;
            self.addScrollBarMouseWheelSupport_bl = self.addScrollBarMouseWheelSupport_bl == "no" ? false : true;
            self.showSearchBar_bl = self.props_obj.showSearchBar;
            self.showSearchBar_bl = self.showSearchBar_bl == "no" ? false : true;
            self.showSortButtons_bl = self.props_obj.showSortButtons;
            self.showSortButtons_bl = self.showSortButtons_bl == "no" ? false : true;
            self.preloaderPath_str = self.skinPath_str + "preloader.png";
            self.animationPath_str = self.skinPath_str + "equalizer.png";
            self.mainPreloader_img = new Image;
            self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler;
            self.mainPreloader_img.onload = self.onPreloaderLoadHandler;
            self.mainPreloader_img.src = self.skinPath_str + "preloader.png";
            self.skinPaths_ar = [{
                img: self.controllerBk_img = new Image,
                src: self.skinPath_str + "controller-background.png"
            }, {
                img: self.separator1_img = new Image,
                src: self.skinPath_str + "separator.png"
            }, {
                img: self.separator2_img = new Image,
                src: self.skinPath_str + "separator.png"
            }, {
                img: self.prevN_img = new Image,
                src: self.skinPath_str + "prev-button.png"
            }, {
                img: self.playN_img = new Image,
                src: self.skinPath_str + "play-button.png"
            }, {
                img: self.pauseN_img = new Image,
                src: self.skinPath_str + "pause-button.png"
            }, {
                img: self.nextN_img = new Image,
                src: self.skinPath_str + "next-button.png"
            }, {
                img: self.popupN_img = new Image,
                src: self.skinPath_str + "popup-button.png"
            }, {
                img: self.downloaderN_img = new Image,
                src: self.skinPath_str + "download-button.png"
            }, {
                img: self.buyN_img = new Image,
                src: self.skinPath_str + "buy-button.png"
            }, {
                img: self.mainScrubberBkLeft_img = new Image,
                src: self.skinPath_str + "scrubber-left-background.png"
            }, {
                img: self.mainScrubberBkRight_img = new Image,
                src: self.skinPath_str + "scrubber-right-background.png"
            }, {
                img: self.mainScrubberDragLeft_img = new Image,
                src: self.skinPath_str + "scrubber-left-drag.png"
            }, {
                img: self.mainScrubberLine_img = new Image,
                src: self.skinPath_str + "scrubber-line.png"
            }, {
                img: self.mainScrubberLeftProgress_img = new Image,
                src: self.skinPath_str + "progress-left.png"
            }, {
                img: self.volumeN_img = new Image,
                src: self.skinPath_str + "volume-icon.png"
            }, {
                img: self.categoriesN_img = new Image,
                src: self.skinPath_str + "categories-button.png"
            }, {
                img: self.openTopN_img = new Image,
                src: self.skinPath_str + "open-button-normal-top.png"
            }, {
                img: self.openBottomN_img = new Image,
                src: self.skinPath_str + "open-button-normal-bottom.png"
            }, {
                img: self.closeN_img = new Image,
                src: self.skinPath_str + "close-button-normal.png"
            }, {
                img: self.openerPauseN_img = new Image,
                src: self.skinPath_str + "open-pause-button-normal.png"
            }, {
                img: self.openerPlayN_img = new Image,
                src: self.skinPath_str + "open-play-button-normal.png"
            }, {
                img: self.replayN_img = new Image,
                src: self.skinPath_str + "replay-button.png"
            }, {
                img: self.playlistN_img = new Image,
                src: self.skinPath_str + "playlist-button.png"
            }, {
                img: self.shuffleN_img = new Image,
                src: self.skinPath_str + "shuffle-button.png"
            }, {
                img: self.facebookN_img = new Image,
                src: self.skinPath_str + "facebook-button.png"
            }, {
                img: self.titlebarAnimBkPath_img = new Image,
                src: self.skinPath_str + "titlebar-equlizer-background.png"
            }, {
                img: self.titlebarLeftPath_img = new Image,
                src: self.skinPath_str + "titlebar-grad-left.png"
            }, {
                img: self.soundAnimationPath_img = new Image,
                src: self.skinPath_str + "equalizer.png"
            }, {
                img: self.titleBarLeft_img = new Image,
                src: self.skinPath_str + "titlebar-left-pattern.png"
            }, {
                img: self.titleBarRigth_img = new Image,
                src: self.skinPath_str + "titlebar-right-pattern.png"
            }];
            self.prevSPath_str = self.skinPath_str + "prev-button-over.png";
            self.playSPath_str = self.skinPath_str + "play-button-over.png";
            self.pauseSPath_str = self.skinPath_str + "pause-button-over.png";
            self.nextSPath_str = self.skinPath_str + "next-button-over.png";
            self.popupSPath_str = self.skinPath_str + "popup-button-over.png";
            self.downloaderSPath_str = self.skinPath_str + "download-button-over.png";
            self.controllerBkPath_str = self.skinPath_str + "controller-background.png";
            self.thumbnailBkPath_str = self.skinPath_str + "thumbnail-background.png";
            self.mainScrubberBkMiddlePath_str = self.skinPath_str + "scrubber-middle-background.png";
            self.mainScrubberDragMiddlePath_str = self.skinPath_str + "scrubber-middle-drag.png";
            self.volumeScrubberBkMiddlePath_str = self.skinPath_str + "scrubber-middle-background.png";
            self.volumeScrubberDragMiddlePath_str = self.skinPath_str + "scrubber-middle-drag.png";
            self.volumeSPath_str = self.skinPath_str + "volume-icon-over.png";
            self.volumeDPath_str = self.skinPath_str + "volume-icon-disabled.png";
            self.openerAnimationPath_str = self.skinPath_str + "equalizer.png";
            self.openTopSPath_str = self.skinPath_str + "open-button-selected-top.png";
            self.openBottomSPath_str = self.skinPath_str + "open-button-selected-bottom.png";
            self.closeSPath_str = self.skinPath_str + "close-button-selected.png";
            self.openerPauseS_str = self.skinPath_str + "open-pause-button-selected.png";
            self.openerPlayS_str = self.skinPath_str + "open-play-button-selected.png";
            self.progressMiddlePath_str = self.skinPath_str + "progress-middle.png";
            self.buySPath_str = self.skinPath_str + "buy-button-over.png";
            if (self.showPlayListButtonAndPlaylist_bl) {
                self.skinPaths_ar.push({
                    img: self.playlistItemBk1_img = new Image,
                    src: self.skinPath_str + "playlist-item-background1.png"
                }, {
                    img: self.playlistItemBk2_img = new Image,
                    src: self.skinPath_str + "playlist-item-background2.png"
                }, {
                    img: self.playlistSeparator_img = new Image,
                    src: self.skinPath_str + "playlist-separator.png"
                }, {
                    img: self.playlistScrBkTop_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-background-top.png"
                }, {
                    img: self.playlistScrDragTop_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-drag-bottom.png"
                }, {
                    img: self.playlistScrLines_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-lines.png"
                }, {
                    img: self.playlistPlayButtonN_img = new Image,
                    src: self.skinPath_str + "playlist-play-button.png"
                }, {
                    img: self.playlistItemGrad1_img = new Image,
                    src: self.skinPath_str + "playlist-item-grad1.png"
                }, {
                    img: self.playlistItemGrad2_img = new Image,
                    src: self.skinPath_str + "playlist-item-grad2.png"
                }, {
                    img: self.playlistItemProgress1_img = new Image,
                    src: self.skinPath_str + "playlist-item-progress1.png"
                }, {
                    img: self.playlistItemProgress2_img = new Image,
                    src: self.skinPath_str + "playlist-item-progress2.png"
                }, {
                    img: self.playlistDownloadButtonN_img = new Image,
                    src: self.skinPath_str + "playlist-download-button.png"
                }, {
                    img: self.playlistBuyButtonN_img = new Image,
                    src: self.skinPath_str + "playlist-buy-button.png"
                });
                self.playlistDownloadButtonS_str = self.skinPath_str + "playlist-download-button-over.png";
                self.scrBkMiddlePath_str = self.skinPath_str + "playlist-scrollbar-background-middle.png";
                self.scrBkBottomPath_str = self.skinPath_str + "playlist-scrollbar-background-bottom.png";
                self.scrDragMiddlePath_str = self.skinPath_str + "playlist-scrollbar-drag-middle.png";
                self.scrDragBottomPath_str = self.skinPath_str + "playlist-scrollbar-drag-top.png";
                self.scrLinesSPath_str = self.skinPath_str + "playlist-scrollbar-lines-over.png";
                self.playlistBuyButtonS_str = self.skinPath_str + "playlist-buy-button-over.png";
                self.playlistPlayButtonN_str = self.skinPath_str + "playlist-play-button.png";
                self.playlistPlayButtonS_str = self.skinPath_str + "playlist-play-button-over.png";
                self.playlistPauseButtonN_str = self.skinPath_str + "playlist-pause-button.png";
                self.playlistPauseButtonS_str = self.skinPath_str + "playlist-pause-button-over.png"
            }
            if (self.showPlaylistsButtonAndPlaylists_bl) {
                self.skinPaths_ar.push({
                    img: self.catNextN_img = new Image,
                    src: self.skinPath_str + "categories-next-button.png"
                }, {
                    img: self.catPrevN_img = new Image,
                    src: self.skinPath_str + "categories-prev-button.png"
                }, {
                    img: self.catCloseN_img = new Image,
                    src: self.skinPath_str + "categories-close-button.png"
                }, {
                    img: new Image,
                    src: self.skinPath_str + "categories-background.png"
                });
                self.catBkPath_str = self.skinPath_str + "categories-background.png";
                self.catThumbBkPath_str = self.skinPath_str + "categories-thumbnail-background.png";
                self.catThumbBkTextPath_str = self.skinPath_str + "categories-thumbnail-text-backgorund.png";
                self.catNextSPath_str = self.skinPath_str + "categories-next-button-over.png";
                self.catNextDPath_str = self.skinPath_str + "categories-next-button-disabled.png";
                self.catPrevSPath_str = self.skinPath_str + "categories-prev-button-over.png";
                self.catPrevDPath_str = self.skinPath_str + "categories-prev-button-disabled.png";
                self.catCloseSPath_str = self.skinPath_str + "categories-close-button-over.png"
            }
            if (self.showSearchBar_bl) {
                self.skinPaths_ar.push({
                    img: self.sortAN_img = new Image,
                    src: self.skinPath_str + "sort-alphabetical-button.png"
                }, {
                    img: self.sortNN_img = new Image,
                    src: self.skinPath_str + "sort-numerical-button.png"
                }, {
                    img: self.ascendingN_img = new Image,
                    src: self.skinPath_str + "ascending-button.png"
                }, {
                    img: self.decendingN_img = new Image,
                    src: self.skinPath_str + "descending-button.png"
                });
                self.sortASPath_str = self.skinPath_str + "sort-alphabetical-button-over.png";
                self.sortNSPath_str = self.skinPath_str + "sort-numerical-button-over.png";
                self.ascendingSpath_str = self.skinPath_str + "ascending-button-over.png";
                self.decendingSpath_str = self.skinPath_str + "descending-button-over.png";
                self.inputArrowPath_str = self.skinPath_str + "input-arrow.png"
            }
            self.categoriesSPath_str = self.skinPath_str + "categories-button-over.png";
            self.replaySPath_str = self.skinPath_str + "replay-button-over.png";
            self.toopTipBk_str = self.skinPath_str + "tooltip-background.png";
            self.toopTipPointer_str = self.skinPath_str + "tooltip-pointer-down.png";
            self.toopTipPointerUp_str = self.skinPath_str + "tooltip-pointer-up.png";
            var r = self.skinPath_str + "playlist-button.png";
            self.playlistSPath_str = self.skinPath_str + "playlist-button-over.png";
            self.shuffleSPath_str = self.skinPath_str + "shuffle-button-over.png";
            self.facebookSPath_str = self.skinPath_str + "facebook-button-over.png";
            self.animationPath_str = self.skinPath_str + "equalizer.png";
            self.titlebarBkMiddlePattern_str = self.skinPath_str + "titlebar-middle-pattern.png";
            self.totalGraphics = self.skinPaths_ar.length;
            self.loadSkin()
        };
        this.onPreloaderLoadHandler = function() {
            setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PRELOADER_LOAD_DONE)
            }, 50)
        };
        self.loadSkin = function() {
            var e;
            var t;
            for (var n = 0; n < self.totalGraphics; n++) {
                e = self.skinPaths_ar[n].img;
                t = self.skinPaths_ar[n].src;
                e.onload = self.onSkinLoadHandler;
                e.onerror = self.onSkinLoadErrorHandler;
                e.src = t
            }
        };
        this.onSkinLoadHandler = function(e) {
            self.countLoadedSkinImages++;
            if (self.countLoadedSkinImages == self.totalGraphics) {
                setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.SKIN_LOAD_COMPLETE)
                }, 50)
            }
        };
        self.onSkinLoadErrorHandler = function(e) {
            if (FWDMSPUtils.isIEAndLessThen9) {
                message = "Graphics image not found!"
            } else {
                message = "The skin icon with label <font color='#FFFFFF'>" + e.target.src + "</font> can't be loaded, check path!"
            }
            if (window.console) console.log(e);
            var t = {
                text: message
            };
            setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, t)
            }, 50)
        };
        self.showPropertyError = function(e) {
            self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                text: "The property called <font color='#FFFFFF'>" + e + "</font> is not defined."
            })
        };
        this.downloadMp3 = function(e, t) {
            if (!t) return;
            if (e.indexOf("api.soundcloud") == -1) {
                t = t.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
                if (!/\.(mp3)$/i.test(t)) t += ".mp3";
                if (e.indexOf("http:") == -1) {
                    e = e.substr(e.indexOf("/") + 1);
                    e = encodeURIComponent(e)
                }
            }
            var n = self.mp3DownloaderPath_str;
            if (!self.dlIframe) {
                self.dlIframe = document.createElement("IFRAME");
                self.dlIframe.style.display = "none";
                document.documentElement.appendChild(self.dlIframe)
            }
            if (self.isMobile_bl) {
                var r = self.getValidEmail();
                if (!r) return;
                if (self.emailXHR != null) {
                    try {
                        self.emailXHR.abort()
                    } catch (i) {}
                    self.emailXHR.onreadystatechange = null;
                    self.emailXHR.onerror = null;
                    self.emailXHR = null
                }
                self.emailXHR = new XMLHttpRequest;
                self.emailXHR.onreadystatechange = function(e) {
                    if (self.emailXHR.readyState == 4) {
                        if (self.emailXHR.status == 200) {
                            if (self.emailXHR.responseText == "sent") {
                                alert("Email sent.")
                            } else {
                                alert("Error sending email, this is a server side error, the php file can't send the email!")
                            }
                        } else {
                            alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText)
                        }
                    }
                };
                self.emailXHR.onerror = function(e) {
                    try {
                        if (window.console) console.log(e);
                        if (window.console) console.log(e.message)
                    } catch (e) {}
                    alert("Error sending email: " + e.message)
                };
                self.emailXHR.open("get", self.mailPath_str + "?mail=" + r + "&name=" + t + "&path=" + e, true);
                self.emailXHR.send();
                return
            }
            if (e.indexOf("soundcloud.com") != -1) {
                self.dlIframe.src = e
            } else {
                self.dlIframe.src = n + "?path=" + e + "&name=" + t
            }
        };
        this.getValidEmail = function() {
            var e = prompt("Please enter your email address where the mp3 download link will be sent:");
            var t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            while (!t.test(e) || e == "") {
                if (e === null) return;
                e = prompt("Please enter a valid email address:")
            }
            return e
        };
        this.loadPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            var t = self.cats_ar[e].source;
            if (!t) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "<font color='#FFFFFF'>loadPlaylist()</font> - Please specify an html elementid, podcast link, soudcloud link or xml path"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (!isNaN(t)) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "<font color='#FFFFFF'>loadPlaylist()</font> - The parameter must be of type string!"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (t.indexOf("soundcloud.com") != -1) {
                self.loadSoundCloudList(t)
            } else if (t.indexOf("official.fm") != -1) {
                self.loadOfficialFmList(t)
            } else if (t.indexOf("folder:") != -1) {
                self.loadFolderPlaylist(t)
            } else if (t.indexOf(".xml") != -1 || t.indexOf("http:") != -1 || t.indexOf("https:") != -1 || t.indexOf("www.") != -1) {
                self.loadXMLPlaylist(t)
            } else {
                self.parseDOMPlaylist(t)
            }
            self.prevId = e
        };
        this.loadSoundCloudList = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            var e;
            self.closeXHR();
            self.sourceURL_str = e;
            if (self.sourceURL_str.indexOf("likes") != -1) {
                self.sourceURL_str = self.sourceURL_str.replace(/\/likes$/, "/favorites")
            }
            if (self.sourceURL_str.indexOf("api.soundcloud.") == -1) {
                e = "http://api.soundcloud.com/resolve?format=json&url=" + self.sourceURL_str + "&limit=100" + "&client_id=" + self.scClientId_str + "&callback=" + parent.instanceName_str + ".data.parseSoundCloud"
            } else {
                e = self.sourceURL_str + "?format=json&client_id=" + self.scClientId_str + "&limit=100" + "&callback=" + parent.instanceName_str + ".data.parseSoundCloud"
            }
            if (self.scs_el == null) {
                try {
                    self.scs_el = document.createElement("script");
                    self.scs_el.src = e;
                    self.scs_el.id = parent.instanceName_str + ".data.parseSoundCloud";
                    document.documentElement.appendChild(self.scs_el)
                } catch (t) {}
            }
            self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 8e3)
        };
        this.JSONPRequestTimeoutError = function() {
            self.isPlaylistDispatchingError_bl = true;
            showLoadPlaylistErrorId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Error loading offical.fm url!<font color='#FFFFFF'>" + self.sourceURL_str + "</font>"
                });
                self.isPlaylistDispatchingError_bl = false
            }, 50);
            return
        };
        this.loadOfficialFmList = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            self.closeXHR();
            self.sourceURL_str = e;
            var e = "http://api.official.fm/playlists/" + e.substr(e.indexOf("/") + 1) + "/tracks?format=jsonp&fields=streaming&api_version=2&callback=" + parent.instanceName_str + ".data.parseOfficialFM";
            if (self.scs_el == null) {
                try {
                    self.scs_el = document.createElement("script");
                    self.scs_el.src = e;
                    self.scs_el.id = parent.instanceName_str + ".data.parseOfficialFM";
                    document.documentElement.appendChild(self.scs_el)
                } catch (t) {}
            }
            self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 8e3)
        };
        this.JSONPRequestTimeoutError = function() {
            self.isPlaylistDispatchingError_bl = true;
            showLoadPlaylistErrorId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Error loading official.fm url!<font color='#FFFFFF'>" + self.sourceURL_str + "</font>"
                });
                self.isPlaylistDispatchingError_bl = false
            }, 50);
            return
        };
        this.closeJsonPLoader = function() {
            clearTimeout(self.JSONPRequestTimeoutId_to)
        };
        this.loadXMLPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            if (document.location.protocol == "file:" && e.indexOf("official.fm") == -1) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "Loading XML files local is not allowed or possible!. To function properly please test online."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            self.closeXHR();
            self.loadFromFolder_bl = false;
            self.sourceURL_str = e;
            self.xhr = new XMLHttpRequest;
            self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
            self.xhr.onerror = self.ajaxOnErrorHandler;
            try {
                self.xhr.open("get", self.proxyPath_str + "?url=" + self.sourceURL_str + "&rand=" + parseInt(Math.random() * 99999999), true);
                self.xhr.send()
            } catch (t) {
                var n = t;
                if (t) {
                    if (t.message) n = t.message
                }
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "XML file can't be loaded! <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. " + n
                })
            }
        };
        this.loadFolderPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            if (document.location.protocol == "file:" && e.indexOf("official.fm") == -1) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "Creating a mp3 playlist from a folder is not allowed or possible local! To function properly please test online."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            self.closeXHR();
            self.loadFromFolder_bl = true;
            self.countID3 = 0;
            self.sourceURL_str = e.substr(e.indexOf(":") + 1);
            self.xhr = new XMLHttpRequest;
            self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
            self.xhr.onerror = self.ajaxOnErrorHandler;
            try {
                self.xhr.open("get", self.proxyFolderPath_str + "?dir=" + encodeURIComponent(self.sourceURL_str) + "&rand=" + parseInt(Math.random() * 9999999), true);
                self.xhr.send()
            } catch (t) {
                var n = t;
                if (t) {
                    if (t.message) n = t.message
                }
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"
                })
            }
        };
        this.ajaxOnLoadHandler = function(e) {
            var response;
            var isXML = false;
            if (self.xhr.readyState == 4) {
                if (self.xhr.status == 404) {
                    if (self.loadFromFolder_bl) {
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"
                        })
                    } else {
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Proxy file path is not found: <font color='#FFFFFF'>" + self.proxyPath_str + "</font>"
                        })
                    }
                } else if (self.xhr.status == 408) {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "Proxy file request load timeout!"
                    })
                } else if (self.xhr.status == 200) {
                    if (self.xhr.responseText.indexOf("<b>Warning</b>:") != -1) {
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Error loading folder: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"
                        });
                        return
                    }
                    if (window.JSON) {
                        response = JSON.parse(self.xhr.responseText)
                    } else {
                        response = eval("(" + self.xhr.responseText + ")")
                    }
                    if (response.channel) {
                        self.parsePodcast(response)
                    } else if (response.folder) {
                        self.parseFolderJSON(response)
                    } else if (response.li) {
                        self.parseXML(response)
                    } else if (response.error) {
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Error loading file: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"
                        })
                    }
                }
            }
        };
        this.ajaxOnErrorHandler = function(e) {
            try {
                if (window.console) console.log(e);
                if (window.console) console.log(e.message)
            } catch (e) {}
            if (self.loadFromFolder_bl) {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"
                })
            } else {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#FFFFFF'>" + self.proxyPath_str + "</font>. Make sure the path is correct"
                })
            }
        };
        this.parseSoundCloud = function(e) {
            self.closeJsonPLoader();
            self.playlist_ar = [];
            var t;
            var n;
            var r;
            if (e && e.uri) {
                if (e.kind == "track") {
                    self.createSoundcloudPlaylist(e);
                    return
                }
                if (e.uri.indexOf("/tracks") == -1) {
                    r = e.uri + "/tracks"
                } else {
                    r = e.uri + "/favorites"
                }
                self.loadSoundCloudList(r);
                return
            } else if (e.length || e.kind == "track") {
                self.createSoundcloudPlaylist(e)
            } else {
                self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                    text: "Please provide a playlist or track URL : <font color='#FFFFFF'>" + self.sourceURL_str + "</font>."
                })
            }
        };
        this.createSoundcloudPlaylist = function(e) {
            if (e.length) {
                for (var t = 0; t < e.length; t++) {
                    track = e[t];
                    obj = {};
                    obj.source = track["stream_url"] + "?consumer_key=" + self.scClientId_str;
                    obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + self.scClientId_str : undefined;
                    obj.downloadable = track["downloadable"];
                    obj.buy = undefined;
                    obj.thumbPath = track["artwork_url"];
                    if (self.showSoundCloudUserNameInTitle_bl) {
                        var n = "";
                        if (self.showTracksNumbers_bl) {
                            if (t < 9) n = "0";
                            n = n + (t + 1) + ". ";
                            obj.title = n + "<span style='font-weight:bold;'>" + track["user"]["username"] + "</span>" + " - " + track["title"]
                        } else {
                            obj.title = "<span style='font-weight:bold;'>" + track["user"]["username"] + "</span>" + " - " + track["title"]
                        }
                        obj.titleText = track["user"]["username"] + " - " + track["title"]
                    } else {
                        var n = "";
                        if (self.showTracksNumbers_bl) {
                            if (t < 9) n = "0";
                            n = n + (t + 1) + ". ";
                            obj.title = n + track["title"]
                        } else {
                            obj.title = track["title"]
                        }
                        obj.titleText = track["title"]
                    }
                    obj.duration = track["duration"];
                    if (track["streamable"]) self.playlist_ar.push(obj);
                    if (t > self.maxPlaylistItems - 1) break
                }
            } else {
                track = e;
                obj = {};
                obj.source = track["stream_url"] + "?consumer_key=" + self.scClientId_str;
                obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + self.scClientId_str : undefined;
                obj.downloadable = track["downloadable"];
                obj.buy = undefined;
                obj.thumbPath = track["artwork_url"];
                if (self.showSoundCloudUserNameInTitle_bl) {
                    obj.title = "<span style='font-weight:bold;'>" + track["user"]["username"] + "</span>" + " - " + track["title"];
                    obj.titleText = track["user"]["username"] + " - " + track["title"]
                } else {
                    obj.title = track["title"];
                    obj.titleText = track["title"]
                }
                obj.duration = track["duration"];
                if (track["streamable"]) self.playlist_ar.push(obj)
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseOfficialFM = function(e) {
            self.closeJsonPLoader();
            self.playlist_ar = [];
            var t;
            var n;
            var r = e.tracks;
            var i = undefined;
            for (var s = 0; s < r.length; s++) {
                n = e.tracks[s].track;
                t = {};
                t.id = s;
                t.source = encodeURI(n.streaming.http);
                t.downloadPath = t.source;
                t.downloadable = self.showDownloadMp3Button_bl;
                t.buy = undefined;
                if (self.forceDisableDownloadButtonForOfficialFM_bl) t.downloadable = false;
                t.thumbPath = i;
                var o = "";
                if (self.showTracksNumbers_bl) {
                    if (s < 9) o = "0";
                    o = o + (s + 1) + ". ";
                    t.title = o + "<span style='font-weight:bold;'>" + n["artist"] + "</span>" + " - " + n["title"]
                } else {
                    t.title = "<span style='font-weight:bold;'>" + n["artist"] + "</span>" + " - " + n["title"]
                }
                t.titleText = n["artist"] + " - " + n["title"];
                t.duration = n.duration * 1e3;
                self.playlist_ar[s] = t;
                if (s > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parsePodcast = function(e) {
            self.playlist_ar = [];
            var t;
            var n = e.channel.item;
            var r = undefined;
            try {
                r = e["channel"]["image"]["url"]
            } catch (i) {}
            for (var s = 0; s < n.length; s++) {
                t = {};
                if (n[s]["enclosure"]) {
                    t.source = encodeURI(n[s]["enclosure"]["@attributes"]["url"])
                } else {
                    t.source = encodeURI(n[s]["link"])
                }
                t.downloadPath = t.source;
                t.downloadable = self.showDownloadMp3Button_bl;
                t.buy = undefined;
                if (self.forceDisableDownloadButtonForPodcast_bl) t.downloadable = false;
                t.thumbPath = r;
                var o = "";
                if (self.showTracksNumbers_bl) {
                    if (s < 9) o = "0";
                    o = o + (s + 1) + ". ";
                    t.title = o + n[s].title
                } else {
                    t.title = n[s].title
                }
                t.titleText = n[s].title;
                t.duration = undefined;
                self.playlist_ar[s] = t;
                if (s > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseXML = function(e) {
            self.playlist_ar = [];
            var t;
            var n = e.li;
            for (var r = 0; r < n.length; r++) {
                t = {};
                t.source = n[r]["@attributes"]["data-path".replace("?","?").replace("=","=")];
                var i = encodeURI(t.source.substr(0, t.source.lastIndexOf("/") + 1));
                var s = t.source.substr(t.source.lastIndexOf("/") + 1);
                if (s.indexOf(";.mp3") != -1) {
                    s = t.source.substr(t.source.lastIndexOf("/") + 1)
                } else {
                    s = encodeURIComponent(t.source.substr(t.source.lastIndexOf("/") + 1))
                }
                t.source = i + s;
                t.downloadPath = t.source;
                t.downloadable = n[r]["@attributes"]["data-downloadable"] == "yes" ? true : false;
                t.buy = n[r]["@attributes"]["data-buy-url"] == "yes" ? true : false;
                t.thumbPath = n[r]["@attributes"]["data-thumbpath"];
                var o = "";
                if (self.showTracksNumbers_bl) {
                    if (r < 9) o = "0";
                    o = o + (r + 1) + ". ";
                    t.title = o + n[r]["@attributes"]["data-title"]
                } else {
                    t.title = n[r]["@attributes"]["data-title"]
                }
                t.titleText = n[r]["@attributes"]["data-title"];
                t.duration = n[r]["@attributes"]["data-duration"];
                self.playlist_ar[r] = t;
                if (r > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseFolderJSON = function(e) {
            self.playlist_ar = [];
            var t;
            var n = e.folder;
            var r = 0;
            for (var i = 0; i < n.length; i++) {
                t = {};
                t.source = n[i]["@attributes"]["data-path".replace("?","?").replace("=","=")];
                var s = encodeURI(t.source.substr(0, t.source.lastIndexOf("/") + 1));
                var o = encodeURIComponent(t.source.substr(t.source.lastIndexOf("/") + 1));
                t.source = s + o;
                t.downloadPath = t.source;
                t.downloadable = self.showDownloadMp3Button_bl;
                t.buy = undefined;
                if (self.forceDisableDownloadButtonForFolder_bl) t.downloadable = false;
                t.thumbPath = n[i]["@attributes"]["data-thumbpath"];
                t.title = "...";
                t.titleText = "...";
                if (FWDMSPUtils.isIEAndLessThen9) {
                    var u = "";
                    if (self.showTracksNumbers_bl) {
                        if (i < 9) u = "0";
                        u = u + (i + 1) + ". ";
                        t.title = u + "track ";
                        t.titleText = "track"
                    } else {
                        if (i < 9) u = "0";
                        u = u + (i + 1);
                        t.title = "track " + u;
                        t.titleText = "track " + u
                    }
                }
                self.playlist_ar[i] = t;
                if (i > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseDOMPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            var t;
            self.closeXHR();
            t = document.getElementById(e);
            if (!t) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "The playlist with id <font color='#FFFFFF'>" + e + "</font> is not found in the DOM."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            var n = FWDMSPUtils.getChildren(t);
            var r = n.length;
            var i;
            self.playlist_ar = [];
            if (r == 0) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                        text: "The playlist whit the id  <font color='#FFFFFF'>" + e + "</font> must contain at least one track."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            for (var s = 0; s < r; s++) {
                var o = {};
                i = n[s];
                if (!FWDMSPUtils.hasAttribute(i, "data-path".replace("?","?").replace("=","="))) {
                    self.isPlaylistDispatchingError_bl = true;
                    showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDMSPAudioData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-path</font> is required in the playlist at position <font color='#FFFFFF'>" + (s + 1)
                        })
                    }, 50);
                    return
                }
                if (s > self.maxPlaylistItems - 1) break;
                o.source = FWDMSPUtils.getAttributeValue(i, "data-path".replace("?","?").replace("=","="));
                var u = encodeURI(o.source.substr(0, o.source.lastIndexOf("/") + 1));
                var a = o.source.substr(o.source.lastIndexOf("/") + 1);
                if (a.indexOf(";.mp3") != -1) {
                    a = o.source.substr(o.source.lastIndexOf("/") + 1)
                } else {
                    a = encodeURIComponent(o.source.substr(o.source.lastIndexOf("/") + 1))
                }
                o.source = u + a;
                o.downloadPath = o.source;
                if (FWDMSPUtils.hasAttribute(i, "data-thumbpath")) {
                    o.thumbPath = FWDMSPUtils.getAttributeValue(i, "data-thumbpath")
                } else {
                    o.thumbPath = undefined
                }
                if (FWDMSPUtils.hasAttribute(i, "data-downloadable")) {
                    o.downloadable = FWDMSPUtils.getAttributeValue(i, "data-downloadable") == "yes" ? true : false
                } else {
                    o.downloadable = undefined
                }
                if (FWDMSPUtils.hasAttribute(i, "data-buy-url")) {
                    o.buy = FWDMSPUtils.getAttributeValue(i, "data-buy-url")
                } else {
                    o.buy = undefined
                }
                o.title = "not defined!";
                try {
                    var f = "";
                    if (self.showTracksNumbers_bl) {
                        if (s < 9) f = "0";
                        f = f + (s + 1) + ". ";
                        o.title = f + FWDMSPUtils.getChildren(i)[0].innerHTML
                    } else {
                        o.title = FWDMSPUtils.getChildren(i)[0].innerHTML
                    }
                } catch (l) {}
                try {
                    o.titleText = FWDMSPUtils.getChildren(i)[0].textContent || FWDMSPUtils.getChildren(i)[0].innerText
                } catch (l) {}
                if (FWDMSPUtils.hasAttribute(i, "data-duration")) {
                    o.duration = FWDMSPUtils.getAttributeValue(i, "data-duration")
                } else {
                    o.duration = undefined
                }
                self.playlist_ar[s] = o
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.closeXHR = function() {
            self.closeJsonPLoader();
            try {
                document.documentElement.removeChild(self.scs_el);
                self.scs_el = null
            } catch (e) {}
            if (self.xhr != null) {
                try {
                    self.xhr.abort()
                } catch (e) {}
                self.xhr.onreadystatechange = null;
                self.xhr.onerror = null;
                self.xhr = null
            }
            self.countID3 = 2e3
        };
        this.closeData = function() {
            self.closeXHR();
            clearTimeout(self.loadImageId_to);
            clearTimeout(self.showLoadPlaylistErrorId_to);
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            clearTimeout(self.loadImageId_to);
            clearTimeout(self.loadPreloaderId_to);
            if (self.image_img) {
                self.image_img.onload = null;
                self.image_img.onerror = null
            }
        };
        self.init()
    };
    FWDMSPAudioData.setPrototype = function() {
        FWDMSPAudioData.prototype = new FWDMSPEventDispatcher
    };
    FWDMSPAudioData.prototype = null;
    FWDMSPAudioData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
    FWDMSPAudioData.LOAD_DONE = "onLoadDone";
    FWDMSPAudioData.LOAD_ERROR = "onLoadError";
    FWDMSPAudioData.IMAGE_LOADED = "onImageLoaded";
    FWDMSPAudioData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
    FWDMSPAudioData.SKIN_PROGRESS = "onSkinProgress";
    FWDMSPAudioData.IMAGES_PROGRESS = "onImagesPogress";
    FWDMSPAudioData.PLAYLIST_LOAD_COMPLETE = "onPlaylistLoadComplete";
    window.FWDMSPAudioData = FWDMSPAudioData
})(window);
(function(e) {
    var t = function(n) {
        var r = this;
        var i = t.prototype;
        this.audio_el = null;
        this.sourcePath_str = null;
        this.lastPercentPlayed = 0;
        this.volume = n;
        this.curDuration = 0;
        this.countNormalMp3Errors = 0;
        this.countShoutCastErrors = 0;
        this.maxShoutCastCountErrors = 5;
        this.maxNormalCountErrors = 1;
        this.testShoutCastId_to;
        this.preload_bl = false;
        this.allowScrubing_bl = false;
        this.hasError_bl = true;
        this.isPlaying_bl = false;
        this.isStopped_bl = true;
        this.hasPlayedOnce_bl = false;
        this.isStartEventDispatched_bl = false;
        this.isSafeToBeControlled_bl = false;
        this.isShoutcast_bl = false;
        this.isNormalMp3_bl = false;
        this.init = function() {
            r.setupAudio();
            r.setHeight(0)
        };
        this.setupAudio = function() {
            if (r.audio_el == null) {
                r.audio_el = document.createElement("audio");
                r.screen.appendChild(r.audio_el);
                r.audio_el.controls = false;
                r.audio_el.preload = "auto";
                r.audio_el.volume = r.volume
            }
            r.audio_el.addEventListener("error", r.errorHandler);
            r.audio_el.addEventListener("canplay", r.safeToBeControlled);
            r.audio_el.addEventListener("canplaythrough", r.safeToBeControlled);
            r.audio_el.addEventListener("progress", r.updateProgress);
            r.audio_el.addEventListener("timeupdate", r.updateAudio);
            r.audio_el.addEventListener("pause", r.pauseHandler);
            r.audio_el.addEventListener("play", r.playHandler);
            r.audio_el.addEventListener("ended", r.endedHandler)
        };
        this.destroyAudio = function() {
            if (r.audio_el) {
                r.audio_el.removeEventListener("error", r.errorHandler);
                r.audio_el.removeEventListener("canplay", r.safeToBeControlled);
                r.audio_el.removeEventListener("canplaythrough", r.safeToBeControlled);
                r.audio_el.removeEventListener("progress", r.updateProgress);
                r.audio_el.removeEventListener("timeupdate", r.updateAudio);
                r.audio_el.removeEventListener("pause", r.pauseHandler);
                r.audio_el.removeEventListener("play", r.playHandler);
                r.audio_el.removeEventListener("ended", r.endedHandler);
                r.audio_el.src = "";
                r.audio_el.load()
            }
        };
        this.errorHandler = function(n) {
            if (r.isNormalMp3_bl && r.countNormalMp3Errors <= r.maxNormalCountErrors) {
                r.stop();
                r.testShoutCastId_to = setTimeout(r.play, 200);
                r.countNormalMp3Errors++;
                return
            }
            if (r.isShoutcast_bl && r.countShoutCastErrors <= r.maxShoutCastCountErrors && r.audio_el.networkState == 0) {
                r.testShoutCastId_to = setTimeout(r.play, 200);
                r.countShoutCastErrors++;
                return
            }
            var i;
            r.hasError_bl = true;
            r.stop();
            if (r.audio_el.networkState == 0) {
                i = "error 'self.audio_el.networkState = 1'"
            } else if (r.audio_el.networkState == 1) {
                i = "error 'self.audio_el.networkState = 1'"
            } else if (r.audio_el.networkState == 2) {
                i = "'self.audio_el.networkState = 2'"
            } else if (r.audio_el.networkState == 3) {
                i = "source not found <font color='#FFFFFF'>" + r.sourcePath_str + "</font>"
            } else {
                i = n
            }
            if (e.console) e.console.log(r.audio_el.networkState);
            r.dispatchEvent(t.ERROR, {
                text: i
            })
        };
        this.setSource = function(e) {
            r.sourcePath_str = e;
            var t = r.sourcePath_str.split(",");
            var n = FWDMSP.getAudioFormats;
            for (var i = 0; i < t.length; i++) {
                var s = t[i];
                t[i] = FWDMSPUtils.trim(s)
            }
            e: for (var o = 0; o < t.length; o++) {
                var s = t[o];
                for (var i = 0; i < n.length; i++) {
                    var u = n[i];
                    if (s.indexOf(u) != -1) {
                        r.sourcePath_str = s;
                        break e
                    }
                }
            }
            clearTimeout(r.testShoutCastId_to);
            if (r.sourcePath_str.indexOf(";") != -1) {
                r.isShoutcast_bl = true;
                r.countShoutCastErrors = 0
            } else {
                r.isShoutcast_bl = false
            }
            if (r.sourcePath_str.indexOf(";") == -1) {
                r.isNormalMp3_bl = true;
                r.countNormalMp3Errors = 0
            } else {
                r.isNormalMp3_bl = false
            }
            r.lastPercentPlayed = 0;
            if (r.audio_el) r.stop(true)
        };
        this.play = function(e) {
            if (r.isStopped_bl) {
                r.isPlaying_bl = false;
                r.hasError_bl = false;
                r.allowScrubing_bl = false;
                r.isStopped_bl = false;
                r.setupAudio();
                r.audio_el.src = r.sourcePath_str;
                r.play()
            } else if (!r.audio_el.ended || e) {
                try {
                    r.isPlaying_bl = true;
                    r.hasPlayedOnce_bl = true;
                    r.audio_el.play();
                    if (FWDMSPUtils.isIE) r.dispatchEvent(t.PLAY)
                } catch (n) {}
            }
        };
        this.pause = function() {
            if (r == null) return;
            if (r.audio_el == null) return;
            if (!r.audio_el.ended) {
                try {
                    r.audio_el.pause();
                    r.isPlaying_bl = false;
                    if (FWDMSPUtils.isIE) r.dispatchEvent(t.PAUSE)
                } catch (e) {}
            }
        };
        this.pauseHandler = function() {
            if (r.allowScrubing_bl) return;
            r.dispatchEvent(t.PAUSE)
        };
        this.playHandler = function() {
            if (r.allowScrubing_bl) return;
            if (!r.isStartEventDispatched_bl) {
                r.dispatchEvent(t.START);
                r.isStartEventDispatched_bl = true
            }
            r.dispatchEvent(t.PLAY)
        };
        this.endedHandler = function() {
            r.dispatchEvent(t.PLAY_COMPLETE)
        };
        this.stop = function(e) {
            r.dispatchEvent(t.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            });
            if ((r == null || r.audio_el == null || r.isStopped_bl) && !e) return;
            r.isPlaying_bl = false;
            r.isStopped_bl = true;
            r.hasPlayedOnce_bl = true;
            r.isSafeToBeControlled_bl = false;
            r.isStartEventDispatched_bl = false;
            clearTimeout(r.testShoutCastId_to);
            r.audio_el.pause();
            r.destroyAudio();
            r.dispatchEvent(t.STOP);
            r.dispatchEvent(t.LOAD_PROGRESS, {
                percent: 0
            })
        };
        this.safeToBeControlled = function() {
            if (!r.isSafeToBeControlled_bl) {
                r.hasHours_bl = Math.floor(r.audio_el.duration / (60 * 60)) > 0;
                r.isPlaying_bl = true;
                r.isSafeToBeControlled_bl = true;
                r.dispatchEvent(t.SAFE_TO_SCRUBB);
                r.dispatchEvent(t.SAFE_TO_UPDATE_VOLUME)
            }
        };
        this.updateProgress = function() {
            var e;
            var n = 0;
            if (r.audio_el.buffered.length > 0) {
                e = r.audio_el.buffered.end(r.audio_el.buffered.length - 1);
                n = e.toFixed(1) / r.audio_el.duration.toFixed(1);
                if (isNaN(n) || !n) n = 0
            }
            if (n == 1) r.audio_el.removeEventListener("progress", r.updateProgress);
            r.dispatchEvent(t.LOAD_PROGRESS, {
                percent: n
            })
        };
        this.updateAudio = function() {
            var e;
            if (!r.allowScrubing_bl) {
                e = r.audio_el.currentTime / r.audio_el.duration;
                r.dispatchEvent(t.UPDATE, {
                    percent: e
                })
            }
            var n = r.formatTime(r.audio_el.duration);
            var i = r.formatTime(r.audio_el.currentTime);
            if (!isNaN(r.audio_el.duration)) {
                r.dispatchEvent(t.UPDATE_TIME, {
                    curTime: i,
                    totalTime: n
                })
            } else {
                r.dispatchEvent(t.UPDATE_TIME, {
                    curTime: "00:00",
                    totalTime: "00:00"
                })
            }
            r.lastPercentPlayed = e;
            r.curDuration = i
        };
        this.startToScrub = function() {
            r.allowScrubing_bl = true
        };
        this.stopToScrub = function() {
            r.allowScrubing_bl = false
        };
        this.scrub = function(e, n) {
            if (r.audio_el == null || !r.audio_el.duration) return;
            if (n) r.startToScrub();
            try {
                r.audio_el.currentTime = r.audio_el.duration * e;
                var i = r.formatTime(r.audio_el.duration);
                var s = r.formatTime(r.audio_el.currentTime);
                r.dispatchEvent(t.UPDATE_TIME, {
                    curTime: s,
                    totalTime: i
                })
            } catch (n) {}
        };
        this.replay = function() {
            r.scrub(0);
            r.play()
        };
        this.setVolume = function(e) {
            if (e) r.volume = e;
            if (r.audio_el) r.audio_el.volume = r.volume
        };
        this.formatTime = function(e) {
            var t = Math.floor(e / (60 * 60));
            var n = e % (60 * 60);
            var i = Math.floor(n / 60);
            var s = n % 60;
            var o = Math.ceil(s);
            i = i >= 10 ? i : "0" + i;
            o = o >= 10 ? o : "0" + o;
            if (isNaN(o)) return "00:00";
            if (r.hasHours_bl) {
                return t + ":" + i + ":" + o
            } else {
                return i + ":" + o
            }
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPDisplayObject("div")
    };
    t.ERROR = "error";
    t.UPDATE = "update";
    t.UPDATE = "update";
    t.UPDATE_TIME = "updateTime";
    t.SAFE_TO_SCRUBB = "safeToControll";
    t.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume";
    t.LOAD_PROGRESS = "loadProgress";
    t.START = "start";
    t.PLAY = "play";
    t.PAUSE = "pause";
    t.STOP = "stop";
    t.PLAY_COMPLETE = "playComplete";
    e.FWDMSPAudioScreen = t
})(window);
(function() {
    var e = function(t) {
        var n = this;
        var r = e.prototype;
        this.image_img;
        this.catThumbBk_img = t.catThumbBk_img;
        this.catNextN_img = t.catNextN_img;
        this.catNextS_img = t.catNextS_img;
        this.catNextD_img = t.catNextD_img;
        this.catPrevN_img = t.catPrevN_img;
        this.catPrevS_img = t.catPrevS_img;
        this.catPrevD_img = t.catPrevD_img;
        this.catCloseN_img = t.catCloseN_img;
        this.catCloseS_img = t.catCloseS_img;
        this.mainHolder_do = null;
        this.closeButton_do = null;
        this.nextButton_do = null;
        this.prevButton_do = null;
        this.thumbs_ar = [];
        this.categories_ar = t.cats_ar;
        this.catBkPath_str = t.catBkPath_str;
        this.id = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.dif = 0;
        this.tempId = n.id;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.thumbW = 0;
        this.thumbH = 0;
        this.buttonsMargins = t.buttonsMargins;
        this.thumbnailMaxWidth = t.thumbnailMaxWidth;
        this.thumbnailMaxHeight = t.thumbnailMaxHeight;
        this.spacerH = t.horizontalSpaceBetweenThumbnails;
        this.spacerV = t.verticalSpaceBetweenThumbnails;
        this.dl;
        this.howManyThumbsToDisplayH = 0;
        this.howManyThumbsToDisplayV = 0;
        this.categoriesOffsetTotalWidth = n.catNextN_img.width * 2 + 30;
        this.categoriesOffsetTotalHeight = n.catNextN_img.height + 30;
        this.totalThumbnails = n.categories_ar.length;
        this.delayRate = .06;
        this.countLoadedThumbs = 0;
        this.hideCompleteId_to;
        this.showCompleteId_to;
        this.loadThumbnailsId_to;
        this.areThumbnailsCreated_bl = false;
        this.areThumbnailsLoaded_bl = false;
        this.isShowed_bl = false;
        this.isOnDOM_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        n.init = function() {
            if (n.isMobile_bl && n.hasPointerEvent_bl) n.getStyle().msTouchAction = "none";
            n.getStyle().msTouchAction = "none";
            n.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
            n.getStyle().width = "100%";
            n.mainHolder_do = new FWDMSPDisplayObject("div");
            n.mainHolder_do.getStyle().background = "url('" + n.catBkPath_str + "')";
            n.mainHolder_do.setY(-3e3);
            n.addChild(n.mainHolder_do);
            n.setupButtons();
            n.setupDisable();
            if (n.isMobile_bl) n.setupMobileMove();
            if (!n.isMobile_bl || n.isMobile_bl && n.hasPointerEvent_bl) n.setSelectable(false);
            if (window.addEventListener) {
                n.screen.addEventListener("mousewheel", n.mouseWheelDumyHandler);
                n.screen.addEventListener("DOMMouseScroll", n.mouseWheelDumyHandler)
            } else if (document.attachEvent) {
                n.screen.attachEvent("onmousewheel", n.mouseWheelDumyHandler)
            }
        };
        this.mouseWheelDumyHandler = function(e) {
            var t;
            if (FWDMSPTweenMax.isTweening(n.mainHolder_do)) {
                if (e.preventDefault) {
                    e.preventDefault()
                }
                return false
            }
            for (var r = 0; r < n.totalThumbnails; r++) {
                t = n.thumbs_ar[r];
                if (FWDMSPTweenMax.isTweening(t)) {
                    if (e.preventDefault) {
                        e.preventDefault()
                    }
                    return false
                }
            }
            var i = e.detail || e.wheelDelta;
            if (e.wheelDelta) i *= -1;
            if (FWDMSPUtils.isOpera) i *= -1;
            if (i > 0) {
                n.nextButtonOnMouseUpHandler()
            } else if (i < 0) {
                if (n.leftId <= 0) return;
                n.prevButtonOnMouseUpHandler()
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        n.resizeAndPosition = function(e) {
            if (!n.isShowed_bl && !e) return;
            var t = FWDMSPUtils.getScrollOffsets();
            var r = FWDMSPUtils.getViewportSize();
            if (n.stageWidth == r.w && n.stageHeight == r.h && !e) return;
            n.stageWidth = r.w;
            n.stageHeight = r.h;
            FWDMSPTweenMax.killTweensOf(n.mainHolder_do);
            n.mainHolder_do.setX(0);
            n.mainHolder_do.setWidth(n.stageWidth);
            n.mainHolder_do.setHeight(n.stageHeight);
            n.setX(t.x);
            n.setY(t.y);
            n.setHeight(n.stageHeight);
            if (n.isMobile_bl) n.setWidth(n.stageWidth);
            n.positionButtons();
            n.tempId = n.id;
            n.resizeAndPositionThumbnails();
            n.disableEnableNextAndPrevButtons()
        };
        n.onScrollHandler = function() {
            var e = FWDMSPUtils.getScrollOffsets();
            n.setX(e.x);
            n.setY(e.y)
        };
        this.setupDisable = function() {
            n.disable_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isIE) {
                n.disable_do.setBkColor("#FFFFFF");
                n.disable_do.setAlpha(.01)
            }
            n.addChild(n.disable_do)
        };
        this.showDisable = function() {
            if (n.disable_do.w == n.stageWidth) return;
            n.disable_do.setWidth(n.stageWidth);
            n.disable_do.setHeight(n.stageHeight)
        };
        this.hideDisable = function() {
            if (n.disable_do.w == 0) return;
            n.disable_do.setWidth(0);
            n.disable_do.setHeight(0)
        };
        this.setupButtons = function() {
            FWDMSPSimpleButton.setPrototype();
            n.closeButton_do = new FWDMSPSimpleButton(n.catCloseN_img, t.catCloseSPath_str);
            n.closeButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, n.closeButtonOnMouseUpHandler);
            FWDMSPSimpleButton.setPrototype();
            n.nextButton_do = new FWDMSPSimpleButton(n.catNextN_img, t.catNextSPath_str, null, true);
            n.nextButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, n.nextButtonOnMouseUpHandler);
            FWDMSPSimpleButton.setPrototype();
            n.prevButton_do = new FWDMSPSimpleButton(n.catPrevN_img, t.catPrevSPath_str, null, true);
            n.prevButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, n.prevButtonOnMouseUpHandler)
        };
        this.closeButtonOnMouseUpHandler = function() {
            n.hide()
        };
        this.nextButtonOnMouseUpHandler = function() {
            var e = n.howManyThumbsToDisplayH * n.howManyThumbsToDisplayV;
            n.tempId += e;
            if (n.tempId > n.totalThumbnails - 1) n.tempId = n.totalThumbnails - 1;
            var t = Math.floor(n.tempId / e);
            n.tempId = t * e;
            n.resizeAndPositionThumbnails(true, "next");
            n.disableEnableNextAndPrevButtons(false, true)
        };
        this.prevButtonOnMouseUpHandler = function() {
            var e = n.howManyThumbsToDisplayH * n.howManyThumbsToDisplayV;
            n.tempId -= e;
            if (n.tempId < 0) n.tempId = 0;
            var t = Math.floor(n.tempId / e);
            n.tempId = t * e;
            n.resizeAndPositionThumbnails(true, "prev");
            n.disableEnableNextAndPrevButtons(true, false)
        };
        this.positionButtons = function() {
            n.closeButton_do.setX(n.stageWidth - n.closeButton_do.w - n.buttonsMargins);
            n.closeButton_do.setY(n.buttonsMargins);
            n.nextButton_do.setX(n.stageWidth - n.nextButton_do.w - n.buttonsMargins);
            n.nextButton_do.setY(parseInt((n.stageHeight - n.nextButton_do.h) / 2));
            n.prevButton_do.setX(n.buttonsMargins);
            n.prevButton_do.setY(parseInt((n.stageHeight - n.prevButton_do.h) / 2))
        };
        this.disableEnableNextAndPrevButtons = function(e, t) {
            var r = n.howManyThumbsToDisplayH * n.howManyThumbsToDisplayV;
            var i = Math.floor(n.tempId / r);
            var s = Math.ceil(n.totalThumbnails / r) - 1;
            var o = n.howManyThumbsToDisplayH * i;
            var u = s * n.howManyThumbsToDisplayH;
            if (r >= n.totalThumbnails) {
                n.nextButton_do.disable();
                n.prevButton_do.disable();
                n.nextButton_do.setDisabledState();
                n.prevButton_do.setDisabledState()
            } else if (i == 0) {
                n.nextButton_do.enable();
                n.prevButton_do.disable();
                n.nextButton_do.setEnabledState();
                n.prevButton_do.setDisabledState()
            } else if (i == s) {
                n.nextButton_do.disable();
                n.prevButton_do.enable();
                n.nextButton_do.setDisabledState();
                n.prevButton_do.setEnabledState()
            } else {
                n.nextButton_do.enable();
                n.prevButton_do.enable();
                n.nextButton_do.setEnabledState();
                n.prevButton_do.setEnabledState()
            }
            if (!e) {
                n.prevButton_do.setNormalState()
            }
            if (!t) {
                n.nextButton_do.setNormalState()
            }
        };
        this.setupMobileMove = function() {
            if (n.hasPointerEvent_bl) {
                n.screen.addEventListener("MSPointerDown", n.mobileDownHandler)
            } else {
                n.screen.addEventListener("touchstart", n.mobileDownHandler)
            }
        };
        this.mobileDownHandler = function(e) {
            if (e.touches)
                if (e.touches.length != 1) return;
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            n.mouseX = t.screenX;
            n.mouseY = t.screenY;
            if (n.hasPointerEvent_bl) {
                window.addEventListener("MSPointerUp", n.mobileUpHandler);
                window.addEventListener("MSPointerMove", n.mobileMoveHandler)
            } else {
                window.addEventListener("touchend", n.mobileUpHandler);
                window.addEventListener("touchmove", n.mobileMoveHandler)
            }
        };
        this.mobileMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (e.touches)
                if (e.touches.length != 1) return;
            n.showDisable();
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            n.dif = n.mouseX - t.screenX;
            n.mouseX = t.screenX;
            n.mouseY = t.screenY
        };
        this.mobileUpHandler = function(e) {
            n.hideDisable();
            if (n.dif > 3) {
                n.nextButtonOnMouseUpHandler()
            } else if (n.dif < -3) {
                n.prevButtonOnMouseUpHandler()
            }
            n.dif = 0;
            if (n.hasPointerEvent_bl) {
                window.removeEventListener("MSPointerUp", n.mobileUpHandler, false);
                window.removeEventListener("MSPointerMove", n.mobileMoveHandler)
            } else {
                window.removeEventListener("touchend", n.mobileUpHandler);
                window.removeEventListener("touchmove", n.mobileMoveHandler)
            }
        };
        this.setupThumbnails = function() {
            if (n.areThumbnailsCreated_bl) return;
            n.areThumbnailsCreated_bl = true;
            var e;
            for (var r = 0; r < n.totalThumbnails; r++) {
                FWDMSPCategoriesThumb.setPrototype();
                e = new FWDMSPCategoriesThumb(n, r, t.catThumbBkPath_str, t.catThumbBkTextPath_str, t.thumbnailSelectedType_str, n.categories_ar[r].htmlContent);
                e.addListener(FWDMSPCategoriesThumb.MOUSE_UP, n.thumbnailOnMouseUpHandler);
                n.thumbs_ar[r] = e;
                n.mainHolder_do.addChild(e)
            }
            n.mainHolder_do.addChild(n.closeButton_do);
            n.mainHolder_do.addChild(n.nextButton_do);
            n.mainHolder_do.addChild(n.prevButton_do)
        };
        this.thumbnailOnMouseUpHandler = function(e) {
            n.id = e.id;
            n.disableOrEnableThumbnails();
            n.hide()
        };
        this.resizeAndPositionThumbnails = function(e, t) {
            if (!n.areThumbnailsCreated_bl) return;
            var r;
            var i;
            var s;
            var o;
            var u;
            var a;
            var i;
            var f;
            var l;
            var c;
            var h;
            var p;
            var d;
            var v;
            this.remainWidthSpace = this.stageWidth - i;
            var m = n.stageWidth - n.categoriesOffsetTotalWidth;
            var g = n.stageHeight - n.categoriesOffsetTotalHeight;
            n.howManyThumbsToDisplayH = Math.ceil((m - n.spacerH) / (n.thumbnailMaxWidth + n.spacerH));
            n.thumbW = Math.floor((m - n.spacerH * (n.howManyThumbsToDisplayH - 1)) / n.howManyThumbsToDisplayH);
            if (n.thumbW > n.thumbnailMaxWidth) {
                n.howManyThumbsToDisplayH += 1;
                n.thumbW = Math.floor((m - n.spacerH * (n.howManyThumbsToDisplayH - 1)) / n.howManyThumbsToDisplayH)
            }
            n.thumbH = Math.floor(n.thumbW / n.thumbnailMaxWidth * n.thumbnailMaxHeight);
            n.howManyThumbsToDisplayV = Math.floor(g / (n.thumbH + n.spacerV));
            if (n.howManyThumbsToDisplayV < 1) n.howManyThumbsToDisplayV = 1;
            i = Math.min(n.howManyThumbsToDisplayH, n.totalThumbnails) * (n.thumbW + n.spacerH) - n.spacerH;
            f = Math.min(Math.ceil(n.totalThumbnails / n.howManyThumbsToDisplayH), n.howManyThumbsToDisplayV) * (n.thumbH + n.spacerV) - n.spacerV;
            if (n.howManyThumbsToDisplayH > n.totalThumbnails) {
                l = 0
            } else {
                l = m - i
            }
            if (n.howManyThumbsToDisplayH > n.totalThumbnails) n.howManyThumbsToDisplayH = n.totalThumbnails;
            v = n.howManyThumbsToDisplayH * n.howManyThumbsToDisplayV;
            s = Math.floor(n.tempId / v);
            d = n.howManyThumbsToDisplayH * s;
            firstId = s * v;
            h = firstId + v;
            if (h > n.totalThumbnails) h = n.totalThumbnails;
            for (var y = 0; y < n.totalThumbnails; y++) {
                r = n.thumbs_ar[y];
                r.finalW = n.thumbW;
                if (y % n.howManyThumbsToDisplayH == n.howManyThumbsToDisplayH - 1) r.finalW += l;
                r.finalH = n.thumbH;
                r.finalX = y % n.howManyThumbsToDisplayH * (n.thumbW + n.spacerH);
                r.finalX += Math.floor(y / v) * n.howManyThumbsToDisplayH * (n.thumbW + n.spacerH);
                r.finalX += (n.stageWidth - i) / 2;
                r.finalX = Math.floor(r.finalX - d * (n.thumbW + n.spacerH));
                r.finalY = y % v;
                r.finalY = Math.floor(r.finalY / n.howManyThumbsToDisplayH) * (n.thumbH + n.spacerV);
                r.finalY += (g - f) / 2;
                r.finalY += n.categoriesOffsetTotalHeight / 2;
                r.finalY = Math.floor(r.finalY);
                o = Math.floor(y / v);
                if (o > s) {
                    r.finalX += 150
                } else if (o < s) {
                    r.finalX -= 150
                }
                if (e) {
                    if (y >= firstId && y < h) {
                        if (t == "next") {
                            dl = y % v * n.delayRate + .1
                        } else {
                            dl = (v - y % v) * n.delayRate + .1
                        }
                        r.resizeAndPosition(true, dl)
                    } else {
                        r.resizeAndPosition(true, 0)
                    }
                } else {
                    r.resizeAndPosition()
                }
            }
        };
        this.loadImages = function() {
            if (n.countLoadedThumbs > n.totalThumbnails - 1) return;
            if (n.image_img) {
                n.image_img.onload = null;
                n.image_img.onerror = null
            }
            n.image_img = new Image;
            n.image_img.onerror = n.onImageLoadError;
            n.image_img.onload = n.onImageLoadComplete;
            n.image_img.src = n.categories_ar[n.countLoadedThumbs].thumbnailPath
        };
        this.onImageLoadError = function(e) {};
        this.onImageLoadComplete = function(e) {
            var t = n.thumbs_ar[n.countLoadedThumbs];
            t.setImage(n.image_img);
            n.countLoadedThumbs++;
            n.loadWithDelayId_to = setTimeout(n.loadImages, 40)
        };
        this.disableOrEnableThumbnails = function() {
            var e;
            for (var t = 0; t < n.totalThumbnails; t++) {
                e = n.thumbs_ar[t];
                if (t == n.id) {
                    e.disable()
                } else {
                    e.enable()
                }
            }
        };
        this.show = function(e) {
            if (n.isShowed_bl) return;
            n.isShowed_bl = true;
            n.isOnDOM_bl = true;
            n.id = e;
            if (FWDMSPUtils.isIEAndLessThen9) {
                document.getElementsByTagName("body")[0].appendChild(n.screen)
            } else {
                document.documentElement.appendChild(n.screen)
            }
            if (window.addEventListener) {
                window.addEventListener("scroll", n.onScrollHandler)
            } else if (window.attachEvent) {
                window.attachEvent("onscroll", n.onScrollHandler)
            }
            n.setupThumbnails();
            n.resizeAndPosition(true);
            n.showDisable();
            n.disableOrEnableThumbnails();
            clearTimeout(n.hideCompleteId_to);
            clearTimeout(n.showCompleteId_to);
            n.mainHolder_do.setY(-n.stageHeight);
            if (n.isMobile_bl) {
                n.showCompleteId_to = setTimeout(n.showCompleteHandler, 1200);
                FWDMSPTweenMax.to(n.mainHolder_do, .8, {
                    y: 0,
                    delay: .4,
                    ease: Expo.easeInOut
                })
            } else {
                n.showCompleteId_to = setTimeout(n.showCompleteHandler, 800);
                FWDMSPTweenMax.to(n.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })
            }
        };
        this.showCompleteHandler = function() {
            n.hideDisable();
            n.mainHolder_do.setY(0);
            n.resizeAndPosition(true);
            if (!n.areThumbnailsLoaded_bl) {
                n.loadImages();
                n.areThumbnailsLoaded_bl = true
            }
        };
        this.hide = function() {
            if (!n.isShowed_bl) return;
            n.isShowed_bl = false;
            clearTimeout(n.hideCompleteId_to);
            clearTimeout(n.showCompleteId_to);
            n.showDisable();
            n.hideCompleteId_to = setTimeout(n.hideCompleteHandler, 800);
            FWDMSPTweenMax.killTweensOf(n.mainHolder_do);
            FWDMSPTweenMax.to(n.mainHolder_do, .8, {
                y: -n.stageHeight,
                ease: Expo.easeInOut
            });
            if (window.addEventListener) {
                window.removeEventListener("scroll", n.onScrollHandler)
            } else if (window.detachEvent) {
                window.detachEvent("onscroll", n.onScrollHandler)
            }
            n.resizeAndPosition()
        };
        this.hideCompleteHandler = function() {
            if (FWDMSPUtils.isIEAndLessThen9) {
                document.getElementsByTagName("body")[0].removeChild(n.screen)
            } else {
                document.documentElement.removeChild(n.screen)
            }
            n.isOnDOM_bl = false;
            n.dispatchEvent(e.HIDE_COMPLETE)
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.HIDE_COMPLETE = "hideComplete";
    e.prototype = null;
    window.FWDMSPCategories = e
})();
(function(e) {
    var t = function(e, n, r, i, s, o) {
        var u = this;
        var a = t.prototype;
        this.backgroundImagePath_str = r;
        this.catThumbTextBkPath_str = i;
        this.canvas_el = null;
        this.htmlContent = o;
        this.simpleText_do = null;
        this.effectImage_do = null;
        this.imageHolder_do = null;
        this.normalImage_do = null;
        this.effectImage_do = null;
        this.dumy_do = null;
        this.thumbnailSelectedType_str = s;
        this.id = n;
        this.imageOriginalW;
        this.imageOriginalH;
        this.finalX;
        this.finalY;
        this.finalW;
        this.finalH;
        this.imageFinalX;
        this.imageFinalY;
        this.imageFinalW;
        this.imageFinalH;
        this.dispatchShowWithDelayId_to;
        this.isShowed_bl = false;
        this.hasImage_bl = false;
        this.isSelected_bl = false;
        this.isDisabled_bl = false;
        this.hasCanvas_bl = FWDMSP.hasCanvas;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        this.init = function() {
            u.getStyle().background = "url('" + u.backgroundImagePath_str + "')";
            u.setupMainContainers();
            u.setupDescription();
            u.setupDumy()
        };
        this.setupMainContainers = function() {
            u.imageHolder_do = new FWDMSPDisplayObject("div");
            u.addChild(u.imageHolder_do)
        };
        this.setupDumy = function() {
            u.dumy_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isIE) {
                u.dumy_do.setBkColor("#FFFFFF");
                u.dumy_do.setAlpha(0)
            }
            u.addChild(u.dumy_do)
        };
        this.setupDescription = function() {
            u.simpleText_do = new FWDMSPDisplayObject("div");
            u.simpleText_do.getStyle().background = "url('" + u.catThumbTextBkPath_str + "')";
            if (FWDMSPUtils.isFirefox) {
                u.simpleText_do.hasTransform3d_bl = false;
                u.simpleText_do.hasTransform2d_bl = false
            }
            u.simpleText_do.setBackfaceVisibility();
            u.simpleText_do.getStyle().width = "100%";
            u.simpleText_do.getStyle().fontFamily = "Arial";
            u.simpleText_do.getStyle().fontSize = "12px";
            u.simpleText_do.getStyle().textAlign = "left";
            u.simpleText_do.getStyle().color = "#FFFFFF";
            u.simpleText_do.getStyle().fontSmoothing = "antialiased";
            u.simpleText_do.getStyle().webkitFontSmoothing = "antialiased";
            u.simpleText_do.getStyle().textRendering = "optimizeLegibility";
            u.simpleText_do.setInnerHTML(u.htmlContent);
            u.addChild(u.simpleText_do)
        };
        this.positionDescription = function() {
            u.simpleText_do.setY(parseInt(u.finalH - u.simpleText_do.getHeight()))
        };
        this.setupBlackAndWhiteImage = function(e) {
            if (!u.hasCanvas_bl || u.thumbnailSelectedType_str == "opacity") return;
            var t = document.createElement("canvas");
            var n = t.getContext("2d");
            t.width = u.imageOriginalW;
            t.height = u.imageOriginalH;
            n.drawImage(e, 0, 0);
            var r = n.getImageData(0, 0, t.width, t.height);
            var i = r.data;
            if (u.thumbnailSelectedType_str == "threshold") {
                for (var s = 0; s < i.length; s += 4) {
                    var o = i[s];
                    var a = i[s + 1];
                    var f = i[s + 2];
                    var l = .2126 * o + .7152 * a + .0722 * f >= 150 ? 255 : 0;
                    i[s] = i[s + 1] = i[s + 2] = l
                }
            } else if (u.thumbnailSelectedType_str == "blackAndWhite") {
                for (var s = 0; s < i.length; s += 4) {
                    var o = i[s];
                    var a = i[s + 1];
                    var f = i[s + 2];
                    var l = .2126 * o + .7152 * a + .0722 * f;
                    i[s] = i[s + 1] = i[s + 2] = l
                }
            }
            n.putImageData(r, 0, 0, 0, 0, r.width, r.height);
            u.effectImage_do = new FWDMSPDisplayObject("canvas");
            u.effectImage_do.screen = t;
            u.effectImage_do.setAlpha(.9);
            u.effectImage_do.setMainProperties()
        };
        this.setImage = function(t) {
            u.normalImage_do = new FWDMSPDisplayObject("img");
            u.normalImage_do.setScreen(t);
            u.imageOriginalW = u.normalImage_do.w;
            u.imageOriginalH = u.normalImage_do.h;
            u.setButtonMode(true);
            u.setupBlackAndWhiteImage(t);
            u.resizeImage();
            u.imageHolder_do.setX(parseInt(u.finalW / 2));
            u.imageHolder_do.setY(parseInt(u.finalH / 2));
            u.imageHolder_do.setWidth(0);
            u.imageHolder_do.setHeight(0);
            u.normalImage_do.setX(-parseInt(u.normalImage_do.w / 2));
            u.normalImage_do.setY(-parseInt(u.normalImage_do.h / 2));
            u.normalImage_do.setAlpha(0);
            if (u.effectImage_do) {
                u.effectImage_do.setX(-parseInt(u.normalImage_do.w / 2));
                u.effectImage_do.setY(-parseInt(u.normalImage_do.h / 2));
                u.effectImage_do.setAlpha(.01)
            }
            FWDMSPTweenMax.to(u.imageHolder_do, .8, {
                x: 0,
                y: 0,
                w: u.finalW,
                h: u.finalH,
                ease: Expo.easeInOut
            });
            FWDMSPTweenMax.to(u.normalImage_do, .8, {
                alpha: 1,
                x: u.imageFinalX,
                y: u.imageFinalY,
                ease: Expo.easeInOut
            });
            if (u.effectImage_do) {
                FWDMSPTweenMax.to(u.effectImage_do, .8, {
                    x: u.imageFinalX,
                    y: u.imageFinalY,
                    ease: Expo.easeInOut
                })
            }
            if (u.isMobile_bl) {
                if (u.hasPointerEvent_bl) {
                    u.screen.addEventListener("MSPointerUp", u.onMouseUp);
                    u.screen.addEventListener("MSPointerOver", u.onMouseOver);
                    u.screen.addEventListener("MSPointerOut", u.onMouseOut)
                } else {
                    u.screen.addEventListener("mouseup", u.onMouseUp)
                }
            } else if (u.screen.addEventListener) {
                u.screen.addEventListener("mouseover", u.onMouseOver);
                u.screen.addEventListener("mouseout", u.onMouseOut);
                u.screen.addEventListener("mouseup", u.onMouseUp)
            } else if (u.screen.attachEvent) {
                u.screen.attachEvent("onmouseover", u.onMouseOver);
                u.screen.attachEvent("onmouseout", u.onMouseOut);
                u.screen.attachEvent("onmouseup", u.onMouseUp)
            }
            this.imageHolder_do.addChild(u.normalImage_do);
            if (u.effectImage_do) u.imageHolder_do.addChild(u.effectImage_do);
            this.hasImage_bl = true;
            if (u.id == e.id) {
                u.disable()
            }
        };
        u.onMouseOver = function(e, t) {
            if (u.isDisabled_bl) return;
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                u.setSelectedState(true)
            }
        };
        u.onMouseOut = function(e) {
            if (u.isDisabled_bl) return;
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                u.setNormalState(true)
            }
        };
        u.onMouseUp = function(e) {
            if (u.isDisabled_bl || e.button == 2) return;
            if (e.preventDefault) e.preventDefault();
            u.dispatchEvent(t.MOUSE_UP, {
                id: u.id
            })
        };
        this.resizeAndPosition = function(e, t) {
            FWDMSPTweenMax.killTweensOf(u);
            FWDMSPTweenMax.killTweensOf(u.imageHolder_do);
            if (e) {
                FWDMSPTweenMax.to(u, .8, {
                    x: u.finalX,
                    y: u.finalY,
                    delay: t,
                    ease: Expo.easeInOut
                })
            } else {
                u.setX(u.finalX);
                u.setY(u.finalY)
            }
            u.setWidth(u.finalW);
            u.setHeight(u.finalH);
            u.imageHolder_do.setX(0);
            u.imageHolder_do.setY(0);
            u.imageHolder_do.setWidth(u.finalW);
            u.imageHolder_do.setHeight(u.finalH);
            u.dumy_do.setWidth(u.finalW);
            u.dumy_do.setHeight(u.finalH);
            u.resizeImage();
            u.positionDescription()
        };
        this.resizeImage = function(e) {
            if (!u.normalImage_do) return;
            FWDMSPTweenMax.killTweensOf(u.normalImage_do);
            var t = u.finalW / u.imageOriginalW;
            var n = u.finalH / u.imageOriginalH;
            var r;
            if (t >= n) {
                r = t
            } else {
                r = n
            }
            u.imageFinalW = Math.ceil(r * u.imageOriginalW);
            u.imageFinalH = Math.ceil(r * u.imageOriginalH);
            u.imageFinalX = Math.round((u.finalW - u.imageFinalW) / 2);
            u.imageFinalY = Math.round((u.finalH - u.imageFinalH) / 2);
            if (u.effectImage_do) {
                FWDMSPTweenMax.killTweensOf(u.effectImage_do);
                u.effectImage_do.setX(u.imageFinalX);
                u.effectImage_do.setY(u.imageFinalY);
                u.effectImage_do.setWidth(u.imageFinalW);
                u.effectImage_do.setHeight(u.imageFinalH);
                if (u.isDisabled_bl) u.setSelectedState(false, true)
            }
            u.normalImage_do.setX(u.imageFinalX);
            u.normalImage_do.setY(u.imageFinalY);
            u.normalImage_do.setWidth(u.imageFinalW);
            u.normalImage_do.setHeight(u.imageFinalH);
            if (u.isDisabled_bl) {
                u.normalImage_do.setAlpha(.3)
            } else {
                u.normalImage_do.setAlpha(1)
            }
        };
        this.setNormalState = function(e) {
            if (!u.isSelected_bl) return;
            u.isSelected_bl = false;
            if (u.thumbnailSelectedType_str == "threshold" || u.thumbnailSelectedType_str == "blackAndWhite") {
                if (e) {
                    FWDMSPTweenMax.to(u.effectImage_do, 1, {
                        alpha: .01,
                        ease: Quart.easeOut
                    })
                } else {
                    u.effectImage_do.setAlpha(.01)
                }
            } else if (u.thumbnailSelectedType_str == "opacity") {
                if (e) {
                    FWDMSPTweenMax.to(u.normalImage_do, 1, {
                        alpha: 1,
                        ease: Quart.easeOut
                    })
                } else {
                    u.normalImage_do.setAlpha(1)
                }
            }
        };
        this.setSelectedState = function(e, t) {
            if (u.isSelected_bl && !t) return;
            u.isSelected_bl = true;
            if (u.thumbnailSelectedType_str == "threshold" || u.thumbnailSelectedType_str == "blackAndWhite") {
                if (e) {
                    FWDMSPTweenMax.to(u.effectImage_do, 1, {
                        alpha: 1,
                        ease: Expo.easeOut
                    })
                } else {
                    u.effectImage_do.setAlpha(1)
                }
            } else if (u.thumbnailSelectedType_str == "opacity") {
                if (e) {
                    FWDMSPTweenMax.to(u.normalImage_do, 1, {
                        alpha: .3,
                        ease: Expo.easeOut
                    })
                } else {
                    u.normalImage_do.setAlpha(.3)
                }
            }
        };
        this.enable = function() {
            if (!u.hasImage_bl) return;
            u.isDisabled_bl = false;
            u.setButtonMode(true);
            u.setNormalState(true)
        };
        this.disable = function() {
            if (!u.hasImage_bl) return;
            u.isDisabled_bl = true;
            u.setButtonMode(false);
            u.setSelectedState(true)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPDisplayObject("div")
    };
    t.MOUSE_UP = "onMouseUp";
    t.prototype = null;
    e.FWDMSPCategoriesThumb = t
})(window);
(function() {
    var e = function(t, n, r, i, s) {
        var o = this;
        var u = e.prototype;
        this.n1Img = t;
        this.s1Path_str = n;
        this.n2Img = r;
        this.s2Path_str = i;
        this.firstButton_do;
        this.n1_do;
        this.s1_do;
        this.secondButton_do;
        this.n2_do;
        this.s2_do;
        this.buttonWidth = o.n1Img.width;
        this.buttonHeight = o.n1Img.height;
        this.isSelectedState_bl = false;
        this.currentState = 1;
        this.isDisabled_bl = false;
        this.isMaximized_bl = false;
        this.disptachMainEvent_bl = s;
        this.isDisabled_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        this.allowToCreateSecondButton_bl = !o.isMobile_bl || o.hasPointerEvent_bl;
        o.init = function() {
            o.hasTransform2d_bl = false;
            o.setButtonMode(true);
            o.setWidth(o.buttonWidth);
            o.setHeight(o.buttonHeight);
            o.setupMainContainers();
            o.secondButton_do.setVisible(false)
        };
        o.setupMainContainers = function() {
            o.firstButton_do = new FWDMSPDisplayObject("div");
            o.addChild(o.firstButton_do);
            o.n1_do = new FWDMSPDisplayObject("img");
            o.n1_do.setScreen(o.n1Img);
            o.firstButton_do.addChild(o.n1_do);
            if (o.allowToCreateSecondButton_bl) {
                o.s1_do = new FWDMSPDisplayObject("img");
                var e = new Image;
                e.src = o.s1Path_str;
                o.s1_do.setScreen(e);
                o.s1_do.setWidth(o.buttonWidth);
                o.s1_do.setHeight(o.buttonHeight);
                o.s1_do.setAlpha(0);
                o.firstButton_do.addChild(o.s1_do)
            }
            o.firstButton_do.setWidth(o.buttonWidth);
            o.firstButton_do.setHeight(o.buttonHeight);
            o.secondButton_do = new FWDMSPDisplayObject("div");
            o.addChild(o.secondButton_do);
            o.n2_do = new FWDMSPDisplayObject("img");
            o.n2_do.setScreen(o.n2Img);
            o.secondButton_do.addChild(o.n2_do);
            if (o.allowToCreateSecondButton_bl) {
                o.s2_do = new FWDMSPDisplayObject("img");
                var t = new Image;
                t.src = o.s2Path_str;
                o.s2_do.setScreen(t);
                o.s2_do.setWidth(o.buttonWidth);
                o.s2_do.setHeight(o.buttonHeight);
                o.s2_do.setAlpha(0);
                o.secondButton_do.addChild(o.s2_do)
            }
            o.secondButton_do.setWidth(o.buttonWidth);
            o.secondButton_do.setHeight(o.buttonHeight);
            o.addChild(o.secondButton_do);
            o.addChild(o.firstButton_do);
            if (o.isMobile_bl) {
                if (o.hasPointerEvent_bl) {
                    o.screen.addEventListener("MSPointerDown", o.onMouseUp);
                    o.screen.addEventListener("MSPointerOver", o.onMouseOver);
                    o.screen.addEventListener("MSPointerOut", o.onMouseOut)
                } else {
                    o.screen.addEventListener("toustart", o.onDown);
                    o.screen.addEventListener("touchend", o.onMouseUp)
                }
            } else if (o.screen.addEventListener) {
                o.screen.addEventListener("mouseover", o.onMouseOver);
                o.screen.addEventListener("mouseout", o.onMouseOut);
                o.screen.addEventListener("mouseup", o.onMouseUp)
            } else if (o.screen.attachEvent) {
                o.screen.attachEvent("onmouseover", o.onMouseOver);
                o.screen.attachEvent("onmouseout", o.onMouseOut);
                o.screen.attachEvent("onmousedown", o.onMouseUp)
            }
        };
        o.onMouseOver = function(t, n) {
            o.dispatchEvent(e.SHOW_TOOLTIP, {
                e: t
            });
            if (o.isDisabled_bl || o.isSelectedState_bl) return;
            if (!t.pointerType || t.pointerType == "mouse") {
                o.dispatchEvent(e.MOUSE_OVER, {
                    e: t
                });
                o.setSelectedState(true)
            }
        };
        o.onMouseOut = function(t) {
            if (o.isDisabled_bl || !o.isSelectedState_bl) return;
            if (!t.pointerType || t.pointerType == "mouse") {
                o.setNormalState();
                o.dispatchEvent(e.MOUSE_OUT)
            }
        };
        o.onDown = function(e) {
            if (e.preventDefault) e.preventDefault()
        };
        o.onMouseUp = function(t) {
            if (o.isDisabled_bl || t.button == 2) return;
            if (t.preventDefault) t.preventDefault();
            if (!o.isMobile_bl) o.onMouseOver(t, false);
            if (o.disptachMainEvent_bl) o.dispatchEvent(e.MOUSE_UP, {
                e: t
            })
        };
        o.toggleButton = function() {
            if (o.currentState == 1) {
                o.firstButton_do.setVisible(false);
                o.secondButton_do.setVisible(true);
                o.currentState = 0;
                o.dispatchEvent(e.FIRST_BUTTON_CLICK)
            } else {
                o.firstButton_do.setVisible(true);
                o.secondButton_do.setVisible(false);
                o.currentState = 1;
                o.dispatchEvent(e.SECOND_BUTTON_CLICK)
            }
        };
        o.setButtonState = function(e) {
            if (e == 1) {
                o.firstButton_do.setVisible(true);
                o.secondButton_do.setVisible(false);
                o.currentState = 1
            } else {
                o.firstButton_do.setVisible(false);
                o.secondButton_do.setVisible(true);
                o.currentState = 0
            }
        };
        this.setNormalState = function() {
            if (o.isMobile_bl && !o.hasPointerEvent_bl) return;
            o.isSelectedState_bl = false;
            FWDMSPTweenMax.killTweensOf(o.s1_do);
            FWDMSPTweenMax.killTweensOf(o.s2_do);
            FWDMSPTweenMax.to(o.s1_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(o.s2_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function(e) {
            o.isSelectedState_bl = true;
            FWDMSPTweenMax.killTweensOf(o.s1_do);
            FWDMSPTweenMax.killTweensOf(o.s2_do);
            FWDMSPTweenMax.to(o.s1_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(o.s2_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.disable = function() {
            o.isDisabled_bl = true;
            o.setButtonMode(false);
            FWDMSPTweenMax.to(o, .6, {
                alpha: .4
            });
            o.setNormalState()
        };
        this.enable = function() {
            o.isDisabled_bl = false;
            o.setButtonMode(true);
            FWDMSPTweenMax.to(o, .6, {
                alpha: 1
            })
        };
        o.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.FIRST_BUTTON_CLICK = "onFirstClick";
    e.SECOND_BUTTON_CLICK = "secondButtonOnClick";
    e.SHOW_TOOLTIP = "showToolTip";
    e.MOUSE_OVER = "onMouseOver";
    e.MOUSE_OUT = "onMouseOut";
    e.MOUSE_UP = "onMouseUp";
    e.CLICK = "onClick";
    e.prototype = null;
    window.FWDMSPComplexButton = e
})(window);
(function() {
    var e = function(e, t) {
        var n = this;
        this.parent = e;
        this.url = "http://www.webdesign-flash.ro";
        this.menu_do = null;
        this.normalMenu_do = null;
        this.selectedMenu_do = null;
        this.over_do = null;
        this.isDisabled_bl = false;
        this.init = function() {
            n.updateParent(n.parent)
        };
        this.updateParent = function(e) {
            if (n.parent) {
                if (n.parent.screen.addEventListener) {
                    n.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler)
                } else {
                    n.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler)
                }
            }
            n.parent = e;
            if (n.parent.screen.addEventListener) {
                n.parent.screen.addEventListener("contextmenu", this.contextMenuHandler)
            } else {
                n.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler)
            }
        };
        this.contextMenuHandler = function(e) {
            if (n.isDisabled_bl) return;
            if (t == "disabled") {
                if (e.preventDefault) {
                    e.preventDefault();
                    return
                } else {
                    return false
                }
            } else if (t == "default") {
                return
            }
            if (n.url.indexOf("sh.r") == -1) return;
            n.setupMenus();
            n.parent.addChild(n.menu_do);
            n.menu_do.setVisible(true);
            n.positionButtons(e);
            if (window.addEventListener) {
                window.addEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
            } else {
                document.documentElement.attachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.contextMenuWindowOnMouseDownHandler = function(e) {
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            var r = t.screenX;
            var i = t.screenY;
            if (!FWDMSPUtils.hitTest(n.menu_do.screen, r, i)) {
                if (window.removeEventListener) {
                    window.removeEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
                } else {
                    document.documentElement.detachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
                }
                n.menu_do.setX(-500)
            }
        };
        this.setupMenus = function() {
            if (this.menu_do) return;
            this.menu_do = new FWDMSPDisplayObject("div");
            n.menu_do.setX(-500);
            this.menu_do.getStyle().width = "100%";
            this.normalMenu_do = new FWDMSPDisplayObject("div");
            this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.normalMenu_do.getStyle().padding = "4px";
            this.normalMenu_do.getStyle().fontSize = "12px";
            this.normalMenu_do.getStyle().color = "#000000";
            this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
            this.normalMenu_do.setBkColor("#FFFFFF");
            this.selectedMenu_do = new FWDMSPDisplayObject("div");
            this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.selectedMenu_do.getStyle().padding = "4px";
            this.selectedMenu_do.getStyle().fontSize = "12px";
            this.selectedMenu_do.getStyle().color = "#FFFFFF";
            this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
            this.selectedMenu_do.setBkColor("#000000");
            this.selectedMenu_do.setAlpha(0);
            this.over_do = new FWDMSPDisplayObject("div");
            this.over_do.setBkColor("#FF0000");
            this.over_do.setAlpha(0);
            this.menu_do.addChild(this.normalMenu_do);
            this.menu_do.addChild(this.selectedMenu_do);
            this.menu_do.addChild(this.over_do);
            this.parent.addChild(this.menu_do);
            this.over_do.setWidth(this.selectedMenu_do.getWidth());
            this.menu_do.setWidth(this.selectedMenu_do.getWidth());
            this.over_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setVisible(false);
            this.menu_do.setButtonMode(true);
            this.menu_do.screen.onmouseover = this.mouseOverHandler;
            this.menu_do.screen.onmouseout = this.mouseOutHandler;
            this.menu_do.screen.onclick = this.onClickHandler
        };
        this.mouseOverHandler = function() {
            if (n.url.indexOf("w.we") == -1) n.menu_do.visible = false;
            FWDMSPTweenMax.to(n.normalMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(n.selectedMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.mouseOutHandler = function() {
            FWDMSPTweenMax.to(n.normalMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(n.selectedMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onClickHandler = function() {
            window.open(n.url, "_blank")
        };
        this.positionButtons = function(e) {
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            var r = t.screenX - n.parent.getGlobalX();
            var i = t.screenY - n.parent.getGlobalY();
            var s = r + 2;
            var o = i + 2;
            if (s > n.parent.getWidth() - n.menu_do.getWidth() - 2) {
                s = r - n.menu_do.getWidth() - 2
            }
            if (o > n.parent.getHeight() - n.menu_do.getHeight() - 2) {
                o = i - n.menu_do.getHeight() - 2
            }
            n.menu_do.setX(s);
            n.menu_do.setY(o)
        };
        this.disable = function() {
            n.isDisabled_bl = true
        };
        this.enable = function() {
            n.isDisabled_bl = false
        };
        this.init()
    };
    e.prototype = null;
    window.FWDMSPContextMenu = e
})(window);
(function() {
    var e = function(t, n) {
        var r = this;
        var i = e.prototype;
        this.bk_img = t.bk_img;
        this.thumbnail_img = t.thumbnail_img;
        this.separator1_img = t.separator1_img;
        this.separator2_img = t.separator2_img;
        this.prevN_img = t.prevN_img;
        this.playN_img = t.playN_img;
        this.pauseN_img = t.pauseN_img;
        this.nextN_img = t.nextN_img;
        this.mainScrubberBkLeft_img = t.mainScrubberBkLeft_img;
        this.mainScrubberBkRight_img = t.mainScrubberBkRight_img;
        this.mainScrubberDragLeft_img = t.mainScrubberDragLeft_img;
        this.mainScrubberLine_img = t.mainScrubberLine_img;
        this.mainScrubberLeftProgress_img = t.mainScrubberLeftProgress_img;
        this.volumeScrubberBkLeft_img = t.volumeScrubberBkLeft_img;
        this.volumeScrubberBkRight_img = t.volumeScrubberBkRight_img;
        this.volumeScrubberDragLeft_img = t.volumeScrubberDragLeft_img;
        this.volumeScrubberLine_img = t.volumeScrubberLine_img;
        this.volumeN_img = t.volumeN_img;
        this.thumb_img = null;
        this.titleBarLeft_img = t.titleBarLeft_img;
        this.titleBarRigth_img = t.titleBarRigth_img;
        this.controllerBk_img = t.controllerBk_img;
        this.categoriesN_img = t.categoriesN_img;
        this.replayN_img = t.replayN_img;
        this.playlistN_img = t.playlistN_img;
        this.shuffleN_img = t.shuffleN_img;
        this.downloaderN_img = t.downloaderN_img;
        this.facebookN_img = t.facebookN_img;
        this.popupN_img = t.popupN_img;
        this.titlebarAnimBkPath_img = t.titlebarAnimBkPath_img;
        this.titlebarLeftPath_img = t.titlebarLeftPath_img;
        this.titlebarRightPath_img = t.titlebarRightPath_img;
        this.soundAnimationPath_img = t.soundAnimationPath_img;
        this.buttons_ar = [];
        this.thumb_do = null;
        this.disable_do = null;
        this.mainHolder_do = null;
        this.firstSeparator_do = null;
        this.secondSeparator_do = null;
        this.prevButton_do = null;
        this.playPauseButton_do = null;
        this.mainTitlebar_do = null;
        this.animationBackground_do = null;
        this.titleBarGradLeft_do = null;
        this.titlebarGradRight_do = null;
        this.titleBarLeft_do = null;
        this.titleBarRIght_do = null;
        this.animation_do = null;
        this.mainScrubber_do = null;
        this.mainScrubberBkLeft_do = null;
        this.mainScrubberBkMiddle_do = null;
        this.mainScrubberBkRight_do = null;
        this.mainScrubberDrag_do = null;
        this.mainScrubberDragLeft_do = null;
        this.mainScrubberDragMiddle_do = null;
        this.mainScrubberBarLine_do = null;
        this.mainProgress_do = null;
        this.progressLeft_do = null;
        this.progressMiddle_do = null;
        this.currentTime_do = null;
        this.totalTime_do = null;
        this.mainVolumeHolder_do = null;
        this.volumeButton_do = null;
        this.volumeScrubber_do = null;
        this.volumeScrubberBkLeft_do = null;
        this.volumeScrubberBkMiddle_do = null;
        this.volumeScrubberBkRight_do = null;
        this.volumeScrubberDrag_do = null;
        this.volumeScrubberDragLeft_do = null;
        this.volumeScrubberDragMiddle_do = null;
        this.volumeScrubberBarLine_do = null;
        this.categoriesButton_do = null;
        this.playlistButton_do = null;
        this.loopButton_do = null;
        this.shuffleButton_do = null;
        this.downloadButton_do = null;
        this.buyButton_do = null;
        this.facebookButton_do = null;
        this.popupButton_do = null;
        this.simpleText_do = null;
        this.animText1_do = null;
        this.animText2_do = null;
        this.bk_do = null;
        this.prevButtonToolTip_do = null;
        this.playPauseToolTip_do = null;
        this.nextButtonToolTip_do = null;
        this.playlistsButtonToolTip_do = null;
        this.playlistButtonToolTip_do = null;
        this.loopButtonToolTip_do = null;
        this.shuffleButtonToolTip_do = null;
        this.facebookButtonToolTip_do = null;
        this.downloadButtonToolTip_do = null;
        this.buyButtonToolTip_do = null;
        this.populButtonToolTip_do = null;
        this.volumeButtonToolTip_do = null;
        this.controllerBkPath_str = t.controllerBkPath_str;
        this.thumbnailBkPath_str = t.thumbnailBkPath_str;
        this.mainScrubberBkMiddlePath_str = t.mainScrubberBkMiddlePath_str;
        this.volumeScrubberBkMiddlePath_str = t.volumeScrubberBkMiddlePath_str;
        this.mainScrubberDragMiddlePath_str = t.mainScrubberDragMiddlePath_str;
        this.volumeScrubberDragMiddlePath_str = t.volumeScrubberDragMiddlePath_str;
        this.timeColor_str = t.timeColor_str;
        this.titleColor_str = t.titleColor_str;
        this.progressMiddlePath_str = t.progressMiddlePath_str;
        this.titlebarBkMiddlePattern_str = t.titlebarBkMiddlePattern_str;
        this.thumbPath_str = null;
        this.toolTipsButtonFontColor_str = t.toolTipsButtonFontColor_str;
        this.controllerHeight = t.controllerHeight;
        this.minLeftWidth = 150;
        this.thumbWidthAndHeight = r.controllerHeight;
        this.stageWidth = 0;
        this.stageHeight = r.controllerHeight;
        this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width;
        this.mainScrubberWidth = 0;
        this.totalVolumeBarWidth = 100;
        this.minVolumeBarWidth = 60;
        this.volumeScrubberWidth = 0;
        this.spaceBetweenVolumeButtonAndScrubber = t.spaceBetweenVolumeButtonAndScrubber;
        this.toolTipsButtonsHideDelay = t.toolTipsButtonsHideDelay;
        this.mainScrubberOffsetTop = t.mainScrubberOffsetTop;
        this.spaceBetweenMainScrubberAndTime = t.spaceBetweenMainScrubberAndTime;
        this.startTimeSpace = t.startTimeSpace;
        this.scrubbersHeight = this.mainScrubberBkLeft_img.height;
        this.mainScrubberDragLeftWidth = r.mainScrubberDragLeft_img.width;
        this.scrubbersOffsetWidth = t.scrubbersOffsetWidth;
        this.scrubbersOffestTotalWidth = t.scrubbersOffestTotalWidth;
        this.volumeButtonAndScrubberOffsetTop = t.volumeButtonAndScrubberOffsetTop;
        this.volume = t.volume;
        this.lastVolume = r.volume;
        this.startSpaceBetweenButtons = t.startSpaceBetweenButtons;
        this.spaceBetweenButtons = t.spaceBetweenButtons;
        this.volumeScrubberOffestWidth = t.volumeScrubberOffestWidth;
        this.percentPlayed = 0;
        this.separatorOffsetOutSpace = t.separatorOffsetOutSpace;
        this.separatorOffsetInSpace = t.separatorOffsetInSpace;
        this.titlebarHeight = r.titlebarLeftPath_img.height;
        this.titleBarOffsetTop = t.titleBarOffsetTop;
        this.animTextWidth = 0;
        this.animationHolderWidth = 0;
        this.lastTotalTimeLength = 0;
        this.lastCurTimeLength = 0;
        this.lastButtonsOffsetTop = t.lastButtonsOffsetTop;
        this.allButtonsOffsetTopAndBottom = t.allButtonsOffsetTopAndBottom;
        this.timeHeight = 0;
        this.totalButtonsWidth = 0;
        this.largerButtonHeight = 0;
        this.scrubberOffsetBottom = t.scrubberOffsetBottom;
        this.equlizerOffsetLeft = t.equlizerOffsetLeft;
        this.showAnimationIntroId_to;
        this.animateTextId_to;
        this.startToAnimateTextId_to;
        this.setTimeSizeId_to;
        this.animateTextId_int;
        this.showBuyButton_bl = t.showBuyButton_bl;
        this.showButtonsToolTips_bl = t.showButtonsToolTips_bl;
        this.showPlaylistsButtonAndPlaylists_bl = t.showPlaylistsButtonAndPlaylists_bl;
        this.loop_bl = t.loop_bl;
        this.shuffle_bl = t.shuffle_bl;
        this.showVolumeScrubber_bl = t.showVolumeScrubber_bl;
        this.allowToChangeVolume_bl = t.allowToChangeVolume_bl;
        this.showLoopButton_bl = t.showLoopButton_bl;
        this.showDownloadMp3Button_bl = t.showDownloadMp3Button_bl;
        this.showShuffleButton_bl = t.showShuffleButton_bl;
        this.showPlayListButtonAndPlaylist_bl = t.showPlayListButtonAndPlaylist_bl;
        this.showFacebookButton_bl = t.showFacebookButton_bl;
        this.showPopupButton_bl = t.showPopupButton_bl;
        this.animateOnIntro_bl = t.animateOnIntro_bl;
        this.showSoundAnimation_bl = t.showSoundAnimation_bl;
        this.isMainScrubberScrubbing_bl = false;
        this.isMainScrubberDisabled_bl = false;
        this.isVolumeScrubberDisabled_bl = false;
        this.isMainScrubberLineVisible_bl = false;
        this.isVolumeScrubberLineVisible_bl = false;
        this.showPlayListByDefault_bl = t.showPlayListByDefault_bl;
        this.showThumbnail_bl = false;
        this.isTextAnimating_bl = false;
        this.expandControllerBackground_bl = t.expandControllerBackground_bl;
        this.isMute_bl = false;
        this.isShowed_bl = t.showControllerByDefault_bl;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        r.init = function() {
            r.mainHolder_do = new FWDMSPDisplayObject("div");
            if (r.expandControllerBackground_bl) {
                r.bk_do = new FWDMSPDisplayObject("img");
                r.bk_do.setScreen(r.controllerBk_img);
                r.mainHolder_do.addChild(r.bk_do)
            } else {
                r.mainHolder_do.getStyle().background = "url('" + r.controllerBkPath_str + "')"
            }
            r.addChild(r.mainHolder_do);
            r.setupThumb();
            r.setupPrevButton();
            r.setupPlayPauseButton();
            r.setupNextButton();
            r.setupSeparators();
            r.setupMainScrubber();
            r.setupTitlebar();
            r.setupTime();
            r.setupVolumeScrubber();
            if (r.showPlaylistsButtonAndPlaylists_bl) r.setupCategoriesButton();
            if (r.showPlayListButtonAndPlaylist_bl) r.setupPlaylistButton();
            if (r.showLoopButton_bl) r.setupLoopButton();
            if (r.showShuffleButton_bl) r.setupShuffleButton();
            if (r.showDownloadMp3Button_bl) r.setupDownloadButton();
            if (r.showBuyButton_bl) r.setupBuyButton();
            if (r.showFacebookButton_bl) r.setupFacebookButton();
            if (r.showPopupButton_bl) r.setupPopupButton();
            if (r.showButtonsToolTips_bl) r.setupToolTips();
            if (!r.isMobile_bl) r.setupDisable();
            r.mainHolder_do.setBkColor("#FFFF00");
            r.mainHolder_do.setY(-500);
            var e;
            for (var t = 0; t < r.buttons_ar.length; t++) {
                e = r.buttons_ar[t];
                r.totalButtonsWidth += e.w;
                if (e.h > r.largerButtonHeight) r.largerButtonHeight = e.h
            }
            r.totalButtonsWidth += r.volumeButton_do.w;
            r.totalButtonsWidth += r.startSpaceBetweenButtons * 2
        };
        r.resizeAndPosition = function() {
            if (n.stageWidth == r.stageWidth && n.stageHeight == r.stageHeight) return;
            r.stageWidth = n.stageWidth;
            r.positionButtons()
        };
        this.show = function() {
            r.mainHolder_do.setY(0)
        };
        r.positionButtons = function() {
            var e;
            var i;
            var s = 0;
            var o = 0;
            var u = r.buttons_ar.length;
            if (r.showBuyButton_bl && t.playlist_ar[n.id]) {
                if (t.playlist_ar[n.id].buy && n.isPlaylistLoaded_bl) {
                    if (FWDMSPUtils.indexOfArray(r.buttons_ar, r.buyButton_do) == -1) {
                        if (r.showFacebookButton_bl && r.showPopupButton_bl) {
                            r.buttons_ar.splice(r.buttons_ar.length - 2, 0, r.buyButton_do)
                        } else if (r.showFacebookButton_bl || r.showPopupButton_bl) {
                            r.buttons_ar.splice(r.buttons_ar.length - 1, 0, r.buyButton_do)
                        } else {
                            r.buttons_ar.splice(r.buttons_ar.length, 0, r.buyButton_do)
                        }
                        r.buyButton_do.setVisible(true)
                    }
                } else {
                    var a = FWDMSPUtils.indexOfArray(r.buttons_ar, r.buyButton_do);
                    if (a != -1) {
                        r.buttons_ar.splice(a, 1);
                        r.buyButton_do.setVisible(false)
                    }
                }
            }
            if (r.showDownloadMp3Button_bl && t.playlist_ar[n.id]) {
                if (t.playlist_ar[n.id].downloadable && n.isPlaylistLoaded_bl) {
                    if (FWDMSPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do) == -1) {
                        if (r.showBuyButton_bl && t.playlist_ar[n.id].buy) {
                            r.buttons_ar.splice(FWDMSPUtils.indexOfArray(r.buttons_ar, r.buyButton_do), 0, r.downloadButton_do)
                        } else if (r.showFacebookButton_bl && r.showPopupButton_bl) {
                            r.buttons_ar.splice(r.buttons_ar.length - 2, 0, r.downloadButton_do)
                        } else if (r.showFacebookButton_bl || r.showPopupButton_bl) {
                            r.buttons_ar.splice(r.buttons_ar.length - 1, 0, r.downloadButton_do)
                        } else {
                            r.buttons_ar.splice(r.buttons_ar.length, 0, r.downloadButton_do)
                        }
                        r.downloadButton_do.setVisible(true)
                    }
                } else {
                    var f = FWDMSPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do);
                    if (f != -1) {
                        r.buttons_ar.splice(f, 1);
                        r.downloadButton_do.setVisible(false)
                    }
                }
            }
            u = r.buttons_ar.length;
            if (!t.playlist_ar) {
                r.showThumbnail_bl = true
            } else {
                if (t.playlist_ar[n.id] == undefined) {
                    r.showThumbnail_bl = false
                } else {
                    r.showThumbnail_bl = Boolean(t.playlist_ar[n.id].thumbPath)
                }
            }
            if (!t.showThumbnail_bl) r.showThumbnail_bl = false;
            if (r.showThumbnail_bl) {
                s += r.thumbWidthAndHeight;
                r.thumb_do.setX(0)
            } else {
                r.thumb_do.setX(-300)
            }
            for (var l = 0; l < u; l++) {
                e = r.buttons_ar[l];
                s += e.w + r.spaceBetweenButtons
            }
            if (u > 3) {
                var c = 0;
                for (var l = 0; l < u; l++) {
                    e = r.buttons_ar[l];
                    if (l > 2) {
                        if (l == 3) {
                            c += e.w
                        } else {
                            c += r.buttons_ar[l].w + r.spaceBetweenButtons
                        }
                    }
                }
                if (c < r.minVolumeBarWidth) {
                    for (var l = 0; l < u; l++) {
                        e = r.buttons_ar[l];
                        if (l > 2) {
                            s -= e.w + r.spaceBetweenButtons
                        }
                    }
                    r.totalVolumeBarWidth = r.minVolumeBarWidth + r.volumeButton_do.w + r.spaceBetweenVolumeButtonAndScrubber;
                    r.volumeScrubberWidth = r.minVolumeBarWidth - r.startSpaceBetweenButtons + r.volumeScrubberOffestWidth;
                    s += r.totalVolumeBarWidth;
                    s += r.separatorOffsetOutSpace * 2 + r.separatorOffsetInSpace * 2;
                    s += r.startSpaceBetweenButtons;
                    s += r.firstSeparator_do.w + r.secondSeparator_do.w;
                    r.mainVolumeHolder_do.setY(r.volumeButtonAndScrubberOffsetTop)
                } else {
                    s -= r.spaceBetweenButtons * 2;
                    s += r.separatorOffsetOutSpace * 2 + r.separatorOffsetInSpace * 2;
                    s += r.startSpaceBetweenButtons * 2;
                    s += r.firstSeparator_do.w + r.secondSeparator_do.w;
                    c = 0;
                    for (var l = 0; l < u; l++) {
                        e = r.buttons_ar[l];
                        if (l > 2) {
                            if (l == 3) {
                                c += e.w
                            } else {
                                c += r.buttons_ar[l].w + r.spaceBetweenButtons
                            }
                        }
                    }
                    c -= 7;
                    r.totalVolumeBarWidth = c + r.volumeButton_do.w + r.spaceBetweenVolumeButtonAndScrubber;
                    r.volumeScrubberWidth = c - r.volumeButton_do.w - r.spaceBetweenVolumeButtonAndScrubber + r.volumeScrubberOffestWidth;
                    r.mainVolumeHolder_do.setY(r.volumeButtonAndScrubberOffsetTop)
                }
            } else {
                r.totalVolumeBarWidth = r.minVolumeBarWidth + r.volumeButton_do.w + r.spaceBetweenVolumeButtonAndScrubber;
                r.volumeScrubberWidth = r.minVolumeBarWidth - r.startSpaceBetweenButtons + r.volumeScrubberOffestWidth;
                s += r.totalVolumeBarWidth;
                s += r.separatorOffsetOutSpace * 2 + r.separatorOffsetInSpace * 2;
                s += r.startSpaceBetweenButtons;
                s += r.firstSeparator_do.w + r.secondSeparator_do.w;
                r.mainVolumeHolder_do.setY(parseInt((r.stageHeight - r.mainVolumeHolder_do.h) / 2))
            }
            s = r.stageWidth - s;
            if (s > r.minLeftWidth) {
                r.stageHeight = r.controllerHeight;
                r.secondSeparator_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace + s + r.separatorOffsetInSpace);
                for (var l = 0; l < u; l++) {
                    e = r.buttons_ar[l];
                    if (l == 0) {
                        i = r.thumb_do;
                        if (r.showThumbnail_bl) {
                            e.setX(i.x + i.w + r.startSpaceBetweenButtons)
                        } else {
                            e.setX(r.startSpaceBetweenButtons)
                        }
                        e.setY(parseInt((r.stageHeight - e.h) / 2))
                    } else if (l == 1) {
                        i = r.buttons_ar[l - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons);
                        e.setY(parseInt((r.stageHeight - e.h) / 2))
                    } else if (l == 2) {
                        i = r.buttons_ar[l - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons);
                        r.firstSeparator_do.setX(e.x + e.w + r.separatorOffsetOutSpace);
                        e.setY(parseInt((r.stageHeight - e.h) / 2))
                    } else if (l == 3) {
                        r.secondSeparator_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace + s + r.separatorOffsetInSpace);
                        i = r.buttons_ar[l - 1];
                        e.setX(r.secondSeparator_do.x + r.secondSeparator_do.w + r.separatorOffsetOutSpace);
                        e.setY(r.lastButtonsOffsetTop)
                    } else {
                        i = r.buttons_ar[l - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons);
                        e.setY(r.lastButtonsOffsetTop)
                    }
                }
                r.mainTitlebar_do.setWidth(s);
                r.mainTitlebar_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace);
                r.titlebarGradRight_do.setX(r.mainTitlebar_do.w - r.titlebarGradRight_do.w);
                r.titleBarRight_do.setX(r.mainTitlebar_do.w - r.titleBarRight_do.w);
                r.mainTitlebar_do.setY(r.titleBarOffsetTop);
                if (!r.totalTime_do.w && FWDMSPUtils.isIEAndLessThen9) return;
                r.currentTime_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace);
                r.totalTime_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace + s - r.totalTime_do.w);
                r.currentTime_do.setY(r.mainScrubberOffsetTop + parseInt((r.mainScrubber_do.h - r.currentTime_do.h) / 2));
                r.totalTime_do.setY(r.mainScrubberOffsetTop + parseInt((r.mainScrubber_do.h - r.totalTime_do.h) / 2));
                r.mainScrubberWidth = s + r.scrubbersOffestTotalWidth - r.currentTime_do.w - r.totalTime_do.w - r.spaceBetweenMainScrubberAndTime * 2;
                r.mainScrubber_do.setWidth(r.mainScrubberWidth);
                r.mainScrubberBkMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth * 2);
                r.mainScrubberBkRight_do.setX(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth);
                r.mainScrubber_do.setX(r.firstSeparator_do.x + r.firstSeparator_do.w + r.separatorOffsetInSpace - parseInt(r.scrubbersOffestTotalWidth / 2) + r.currentTime_do.w + r.spaceBetweenMainScrubberAndTime);
                r.mainScrubber_do.setY(r.mainScrubberOffsetTop);
                r.mainScrubberDragMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth);
                r.progressMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth);
                r.updateMainScrubber(r.percentPlayed);
                r.mainVolumeHolder_do.setX(r.secondSeparator_do.x + r.secondSeparator_do.w + r.separatorOffsetOutSpace);
                r.mainVolumeHolder_do.setWidth(r.totalVolumeBarWidth + r.scrubbersOffestTotalWidth);
                r.volumeScrubber_do.setX(r.volumeButton_do.x + r.volumeButton_do.w + r.spaceBetweenVolumeButtonAndScrubber - parseInt(r.scrubbersOffestTotalWidth / 2));
                r.volumeScrubber_do.setWidth(r.volumeScrubberWidth);
                r.volumeScrubberBkRight_do.setX(r.volumeScrubberWidth - r.scrubbersBkLeftAndRightWidth);
                r.volumeScrubberBkMiddle_do.setWidth(r.volumeScrubberWidth - r.scrubbersBkLeftAndRightWidth * 2);
                r.volumeScrubberDragMiddle_do.setWidth(r.volumeScrubberWidth - r.scrubbersBkLeftAndRightWidth);
                r.updateVolume(r.volume);
                r.setHeight(r.controllerHeight)
            } else {
                r.thumb_do.setX(-300);
                r.firstSeparator_do.setX(-300);
                r.secondSeparator_do.setX(-300);
                r.mainTitlebar_do.setWidth(r.stageWidth);
                r.mainTitlebar_do.setX(0);
                r.mainTitlebar_do.setY(0);
                r.titlebarGradRight_do.setX(r.mainTitlebar_do.w - r.titlebarGradRight_do.w);
                r.titleBarRight_do.setX(r.mainTitlebar_do.w - r.titleBarRight_do.w);
                var h = 0;
                var s;
                var p = r.totalButtonsWidth;
                if (r.downloadButton_do && FWDMSPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do) == -1) {
                    p -= r.downloadButton_do.w
                }
                if (r.buyButton_do && FWDMSPUtils.indexOfArray(r.buttons_ar, r.buyButton_do) == -1) {
                    p -= r.buyButton_do.w
                }
                o = parseInt((r.stageWidth - p) / u);
                for (var l = 0; l < u; l++) {
                    e = r.buttons_ar[l];
                    h += e.w + o
                }
                h += r.volumeButton_do.w;
                s = parseInt((r.stageWidth - h) / 2) - r.startSpaceBetweenButtons;
                for (var l = 0; l < u; l++) {
                    e = r.buttons_ar[l];
                    e.setY(r.titleBarGradLeft_do.h + r.allButtonsOffsetTopAndBottom + parseInt((r.largerButtonHeight - e.h) / 2));
                    if (l == 0) {
                        e.setX(s + r.startSpaceBetweenButtons)
                    } else {
                        i = r.buttons_ar[l - 1];
                        e.setX(Math.round(i.x + i.w + o))
                    }
                }
                r.mainVolumeHolder_do.setX(e.x + e.w + o);
                r.mainVolumeHolder_do.setY(r.titleBarGradLeft_do.h + r.allButtonsOffsetTopAndBottom + parseInt((r.largerButtonHeight - r.volumeButton_do.h) / 2));
                if (!r.totalTime_do.w && FWDMSPUtils.isIEAndLessThen9) return;
                r.currentTime_do.setX(r.startTimeSpace);
                r.currentTime_do.setY(r.playPauseButton_do.y + r.playPauseButton_do.h + r.allButtonsOffsetTopAndBottom);
                r.totalTime_do.setX(r.stageWidth - r.startTimeSpace - r.totalTime_do.w);
                r.totalTime_do.setY(r.playPauseButton_do.y + r.playPauseButton_do.h + r.allButtonsOffsetTopAndBottom);
                r.mainScrubber_do.setX(r.currentTime_do.x + r.currentTime_do.w + r.spaceBetweenMainScrubberAndTime - parseInt(r.scrubbersOffestTotalWidth / 2));
                r.mainScrubber_do.setY(r.currentTime_do.y + parseInt((r.currentTime_do.h - r.mainScrubber_do.h) / 2) - 1);
                r.mainScrubberWidth = r.stageWidth + r.scrubbersOffestTotalWidth - r.currentTime_do.w - r.totalTime_do.w - r.spaceBetweenMainScrubberAndTime * 2 - r.startTimeSpace * 2;
                r.mainScrubber_do.setWidth(r.mainScrubberWidth);
                r.mainScrubberBkMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth * 2);
                r.mainScrubberBkRight_do.setX(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth);
                r.mainScrubberDragMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth);
                r.progressMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth);
                r.updateMainScrubber(r.percentPlayed);
                r.totalVolumeBarWidth = r.volumeButton_do.w;
                r.mainVolumeHolder_do.setWidth(r.totalVolumeBarWidth);
                r.updateVolume(r.volume);
                r.stageHeight = r.mainTitlebar_do.h + r.largerButtonHeight + r.allButtonsOffsetTopAndBottom * 2 + r.mainScrubber_do.h + r.scrubberOffsetBottom
            }
            r.startToCheckIfAnimTitle();
            if (r.bk_do) {
                r.bk_do.setWidth(r.stageWidth);
                r.bk_do.setHeight(r.stageHeight)
            }
            r.setWidth(r.stageWidth);
            r.setHeight(r.stageHeight);
            r.mainHolder_do.setWidth(r.stageWidth);
            r.mainHolder_do.setHeight(r.stageHeight)
        };
        this.setupThumb = function() {
            r.thumb_do = new FWDMSPDisplayObject("div");
            r.thumb_do.getStyle().background = "url('" + r.thumbnailBkPath_str + "')";
            r.thumb_do.setWidth(r.thumbWidthAndHeight);
            r.thumb_do.setHeight(r.thumbWidthAndHeight);
            r.mainHolder_do.addChild(r.thumb_do)
        };
        this.loadThumb = function(e) {
            r.positionButtons();
            if (!t.showThumbnail_bl) return;
            if (!e) {
                r.cleanThumbnails(true);
                r.thumbPath_str = "none";
                return
            }
            if (r.thumbPath_str == e) return;
            r.thumbPath_str = e;
            if (r.thumb_img) {
                r.thumb_img.onload = null;
                r.thumb_img.onerror = null;
                r.thumb_img = null
            }
            if (!r.thumbPath_str) return;
            r.thumb_img = new Image;
            r.thumb_img.onload = r.thumbImageLoadComplete;
            r.thumb_img.onerror = r.thumbImageLoadError;
            r.thumb_img.src = r.thumbPath_str
        };
        this.thumbImageLoadError = function() {
            r.cleanThumbnails(true)
        };
        this.thumbImageLoadComplete = function() {
            var e = new FWDMSPDisplayObject("img");
            e.setScreen(r.thumb_img);
            var t = r.thumb_img.width;
            var n = r.thumb_img.height;
            var i = r.thumbWidthAndHeight / t;
            var s = r.thumbWidthAndHeight / n;
            var o = 0;
            if (i <= s) {
                o = i
            } else if (i >= s) {
                o = s
            }
            e.setWidth(parseInt(t * o));
            e.setHeight(parseInt(n * o));
            e.setX(parseInt((r.thumbWidthAndHeight - t * o) / 2));
            e.setY(parseInt((r.thumbWidthAndHeight - n * o) / 2));
            e.setAlpha(0);
            for (var u = 0; u < r.thumb_do.getNumChildren(); u++) {
                child = r.thumb_do.getChildAt(u);
                FWDMSPTweenMax.killTweensOf(child)
            }
            FWDMSPTweenMax.to(e, .8, {
                alpha: 1,
                alpha: 1,
                delay: .2,
                ease: Expo.easeOut,
                onComplete: r.cleanThumbnails
            });
            r.thumb_do.addChild(e)
        };
        this.cleanThumbnails = function(e) {
            var t;
            var n = e ? 0 : 1;
            while (r.thumb_do.getNumChildren() > n) {
                t = r.thumb_do.getChildAt(0);
                FWDMSPTweenMax.killTweensOf(t);
                r.thumb_do.removeChild(t);
                t.destroy()
            }
        };
        this.setupDisable = function() {
            r.disable_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isIE) {
                r.disable_do.setBkColor("#FFFFFF");
                r.disable_do.setAlpha(0)
            }
        };
        this.setupToolTips = function() {
            FWDMSPToolTip.setPrototype();
            r.prevButtonToolTip_do = new FWDMSPToolTip(r.prevButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "previous track", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.prevButtonToolTip_do.screen);
            FWDMSPToolTip.setPrototype();
            r.playPauseToolTip_do = new FWDMSPToolTip(r.playPauseButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "play / pause", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.playPauseToolTip_do.screen);
            FWDMSPToolTip.setPrototype();
            r.nextButtonToolTip_do = new FWDMSPToolTip(r.nextButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "next track", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.nextButtonToolTip_do.screen);
            if (r.showPlaylistsButtonAndPlaylists_bl) {
                FWDMSPToolTip.setPrototype();
                r.playlistsButtonToolTip_do = new FWDMSPToolTip(r.categoriesButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "show playlists", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.playlistsButtonToolTip_do.screen)
            }
            if (r.showPlayListButtonAndPlaylist_bl) {
                FWDMSPToolTip.setPrototype();
                r.playlistButtonToolTip_do = new FWDMSPToolTip(r.playlistButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "show / hide playlist", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.playlistButtonToolTip_do.screen)
            }
            if (r.showLoopButton_bl) {
                FWDMSPToolTip.setPrototype();
                r.loopButtonToolTip_do = new FWDMSPToolTip(r.loopButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "loop", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.loopButtonToolTip_do.screen)
            }
            if (r.showShuffleButton_bl) {
                FWDMSPToolTip.setPrototype();
                r.shuffleButtonToolTip_do = new FWDMSPToolTip(r.shuffleButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "shuffle", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.shuffleButtonToolTip_do.screen)
            }
            if (r.showFacebookButton_bl) {
                FWDMSPToolTip.setPrototype();
                r.facebookButtonToolTip_do = new FWDMSPToolTip(r.facebookButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "share on facebook", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.facebookButtonToolTip_do.screen)
            }
            if (r.showDownloadMp3Button_bl) {
                FWDMSPToolTip.setPrototype();
                r.downloadButtonToolTip_do = new FWDMSPToolTip(r.downloadButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "download track", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.downloadButtonToolTip_do.screen)
            }
            if (this.showBuyButton_bl) {
                FWDMSPToolTip.setPrototype();
                r.buyButtonToolTip_do = new FWDMSPToolTip(r.buyButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "buy track", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.buyButtonToolTip_do.screen)
            }
            if (r.showPopupButton_bl) {
                FWDMSPToolTip.setPrototype();
                r.populButtonToolTip_do = new FWDMSPToolTip(r.popupButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "popup", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
                document.documentElement.appendChild(r.populButtonToolTip_do.screen)
            }
            FWDMSPToolTip.setPrototype();
            r.volumeButtonToolTip_do = new FWDMSPToolTip(r.volumeButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "mute / unmute", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.volumeButtonToolTip_do.screen)
        };
        this.showToolTip = function(e, t, n) {
            if (!r.showButtonsToolTips_bl) return;
            var i = FWDMSPUtils.getViewportSize();
            var s = FWDMSPUtils.getViewportMouseCoordinates(n);
            var o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2);
            var u = parseInt(e.getGlobalY() - t.h - 6);
            var a = 0;
            if (o < 0) {
                a = o;
                o = 0
            } else if (o + t.w > i.w) {
                a = (i.w - (o + t.w)) * -1;
                o = o + a * -1
            }
            if (u < 0) {
                u += e.h + t.h + 12;
                t.positionPointer(a, true)
            } else {
                t.positionPointer(a, false)
            }
            t.setX(o);
            t.setY(u);
            t.show()
        };
        this.setupPrevButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.prevButton_do = new FWDMSPSimpleButton(r.prevN_img, t.prevSPath_str);
            r.prevButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.prevButtonShowToolTipHandler);
            r.prevButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.prevButtonOnMouseUpHandler);
            r.buttons_ar.push(r.prevButton_do);
            r.mainHolder_do.addChild(r.prevButton_do)
        };
        this.prevButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.prevButton_do, r.prevButtonToolTip_do, e.e)
        };
        this.prevButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.PLAY_PREV)
        };
        this.setupPlayPauseButton = function() {
            FWDMSPComplexButton.setPrototype();
            r.playPauseButton_do = new FWDMSPComplexButton(r.playN_img, t.playSPath_str, r.pauseN_img, t.pauseSPath_str, true);
            r.buttons_ar.push(r.playPauseButton_do);
            r.playPauseButton_do.addListener(FWDMSPComplexButton.SHOW_TOOLTIP, r.playButtonShowToolTipHandler);
            r.playPauseButton_do.addListener(FWDMSPComplexButton.MOUSE_UP, r.playButtonMouseUpHandler);
            r.mainHolder_do.addChild(r.playPauseButton_do)
        };
        this.showPlayButton = function() {
            if (!r.playPauseButton_do) return;
            r.playPauseButton_do.setButtonState(1)
        };
        this.showPauseButton = function() {
            if (!r.playPauseButton_do) return;
            r.playPauseButton_do.setButtonState(0)
        };
        this.playButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.playPauseButton_do, r.playPauseToolTip_do, e.e)
        };
        this.playButtonMouseUpHandler = function() {
            if (r.playPauseButton_do.currentState == 0) {
                r.dispatchEvent(e.PAUSE)
            } else {
                r.dispatchEvent(e.PLAY)
            }
        };
        this.setupNextButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.nextButton_do = new FWDMSPSimpleButton(r.nextN_img, t.nextSPath_str);
            r.nextButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.nextButtonShowToolTipHandler);
            r.nextButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.nextButtonOnMouseUpHandler);
            r.nextButton_do.setY(parseInt((r.stageHeight - r.nextButton_do.h) / 2));
            r.buttons_ar.push(r.nextButton_do);
            r.mainHolder_do.addChild(r.nextButton_do)
        };
        this.nextButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.nextButton_do, r.nextButtonToolTip_do, e.e)
        };
        this.nextButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.PLAY_NEXT)
        };
        this.setupSeparators = function() {
            r.firstSeparator_do = new FWDMSPDisplayObject("img");
            r.firstSeparator_do.setScreen(r.separator1_img);
            r.secondSeparator_do = new FWDMSPDisplayObject("img");
            r.secondSeparator_do.setScreen(r.separator2_img);
            r.firstSeparator_do.setX(-10);
            r.secondSeparator_do.setX(-10);
            r.firstSeparator_do.setY(parseInt((r.stageHeight - r.firstSeparator_do.h) / 2));
            r.secondSeparator_do.setY(parseInt((r.stageHeight - r.secondSeparator_do.h) / 2));
            r.mainHolder_do.addChild(r.firstSeparator_do);
            r.mainHolder_do.addChild(r.secondSeparator_do)
        };
        this.setupTitlebar = function() {
            r.mainTitlebar_do = new FWDMSPDisplayObject("div");
            r.mainTitlebar_do.getStyle().background = "url('" + r.titlebarBkMiddlePattern_str + "')";
            r.mainTitlebar_do.setHeight(r.titlebarHeight);
            r.titleBarLeft_do = new FWDMSPDisplayObject("img");
            r.titleBarLeft_do.setScreen(r.titleBarLeft_img);
            r.titleBarRight_do = new FWDMSPDisplayObject("img");
            r.titleBarRight_do.setScreen(r.titleBarRigth_img);
            r.simpleText_do = new FWDMSPDisplayObject("div");
            r.simpleText_do.setOverflow("visible");
            r.simpleText_do.hasTransform3d_bl = false;
            r.simpleText_do.hasTransform2d_bl = false;
            r.simpleText_do.setBackfaceVisibility();
            r.simpleText_do.getStyle().fontFamily = "Arial";
            r.simpleText_do.getStyle().fontSize = "12px";
            r.simpleText_do.getStyle().whiteSpace = "nowrap";
            r.simpleText_do.getStyle().textAlign = "left";
            r.simpleText_do.getStyle().color = r.titleColor_str;
            r.simpleText_do.getStyle().fontSmoothing = "antialiased";
            r.simpleText_do.getStyle().webkitFontSmoothing = "antialiased";
            r.simpleText_do.getStyle().textRendering = "optimizeLegibility";
            r.animText1_do = new FWDMSPDisplayObject("div");
            r.animText1_do.setOverflow("visible");
            r.animText1_do.hasTransform3d_bl = false;
            r.animText1_do.hasTransform2d_bl = false;
            r.animText1_do.setBackfaceVisibility();
            r.animText1_do.getStyle().fontFamily = "Arial";
            r.animText1_do.getStyle().fontSize = "12px";
            r.animText1_do.getStyle().whiteSpace = "nowrap";
            r.animText1_do.getStyle().textAlign = "left";
            r.animText1_do.getStyle().color = r.titleColor_str;
            r.animText1_do.getStyle().fontSmoothing = "antialiased";
            r.animText1_do.getStyle().webkitFontSmoothing = "antialiased";
            r.animText1_do.getStyle().textRendering = "optimizeLegibility";
            r.animText2_do = new FWDMSPDisplayObject("div");
            r.animText2_do.setOverflow("visible");
            r.animText2_do.hasTransform3d_bl = false;
            r.animText2_do.hasTransform2d_bl = false;
            r.animText2_do.setBackfaceVisibility();
            r.animText2_do.getStyle().fontFamily = "Arial";
            r.animText2_do.getStyle().fontSize = "12px";
            r.animText2_do.getStyle().whiteSpace = "nowrap";
            r.animText2_do.getStyle().textAlign = "left";
            r.animText2_do.getStyle().color = r.titleColor_str;
            r.animText2_do.getStyle().fontSmoothing = "antialiased";
            r.animText2_do.getStyle().webkitFontSmoothing = "antialiased";
            r.animText2_do.getStyle().textRendering = "optimizeLegibility";
            r.titleBarGradLeft_do = new FWDMSPDisplayObject("img");
            r.titleBarGradLeft_do.setScreen(r.titlebarLeftPath_img);
            r.titleBarGradLeft_do.setX(-50);
            r.titlebarGradRight_do = new FWDMSPDisplayObject("img");
            r.titlebarGradRight_do.setScreen(r.titlebarRightPath_img);
            if (r.showSoundAnimation_bl) {
                r.animationBackground_do = new FWDMSPDisplayObject("img");
                r.animationBackground_do.setScreen(r.titlebarAnimBkPath_img);
                r.animationHolderWidth = r.animationBackground_do.w;
                r.simpleText_do.setX(r.animationBackground_do.w + 5);
                FWDMSPPreloader.setPrototype();
                r.animation_do = new FWDMSPPreloader(t.animationPath_str, 29, 22, 31, 80, true);
                r.animation_do.setX(r.equlizerOffsetLeft);
                r.animation_do.setY(0);
                r.animation_do.show(true);
                r.animation_do.stop()
            } else {
                r.simpleText_do.setX(5)
            }
            setTimeout(function() {
                if (r == null) return;
                r.simpleText_do.setY(parseInt((r.mainTitlebar_do.h - r.simpleText_do.getHeight()) / 2) + 1);
                r.animText1_do.setY(parseInt((r.mainTitlebar_do.h - r.simpleText_do.getHeight()) / 2) + 1);
                r.animText2_do.setY(parseInt((r.mainTitlebar_do.h - r.simpleText_do.getHeight()) / 2) + 1)
            }, 50);
            r.mainTitlebar_do.addChild(r.titleBarLeft_do);
            r.mainTitlebar_do.addChild(r.titleBarRight_do);
            r.mainTitlebar_do.addChild(r.simpleText_do);
            r.mainTitlebar_do.addChild(r.animText1_do);
            r.mainTitlebar_do.addChild(r.animText2_do);
            if (r.showSoundAnimation_bl) {
                r.mainTitlebar_do.addChild(r.animationBackground_do);
                r.mainTitlebar_do.addChild(r.animation_do)
            }
            r.mainTitlebar_do.addChild(r.titleBarGradLeft_do);
            r.mainTitlebar_do.addChild(r.titlebarGradRight_do);
            r.mainHolder_do.addChild(r.mainTitlebar_do)
        };
        this.setTitle = function(e) {
            r.simpleText_do.setInnerHTML(e);
            r.animText1_do.setInnerHTML(e + "***");
            r.animText2_do.setInnerHTML(e + "***");
            r.animText1_do.setX(-1e3);
            r.animText2_do.setX(-1e3);
            r.startToCheckIfAnimTitle(true)
        };
        this.startToCheckIfAnimTitle = function(e) {
            if (e) r.stopToAnimateText();
            clearTimeout(r.animateTextId_to);
            clearTimeout(r.startToAnimateTextId_to);
            r.animateTextId_to = setTimeout(r.checkIfAnimTitle, 10)
        };
        this.checkIfAnimTitle = function() {
            var e = r.mainTitlebar_do.w - 5 - r.titlebarGradRight_do.w;
            e -= r.animationHolderWidth;
            if (r.simpleText_do.getWidth() > e) {
                if (r.isTextAnimating_bl) return;
                if (r.showSoundAnimation_bl) {
                    r.titleBarGradLeft_do.setX(r.animationHolderWidth);
                    r.titlebarGradRight_do.setY(0)
                } else {
                    r.titleBarGradLeft_do.setX(0);
                    r.titlebarGradRight_do.setY(0)
                }
                clearTimeout(r.startToAnimateTextId_to);
                r.startToAnimateTextId_to = setTimeout(r.startToAnimateText, 300)
            } else {
                r.titleBarGradLeft_do.setX(-50);
                r.titlebarGradRight_do.setY(-50);
                r.stopToAnimateText()
            }
        };
        this.startToAnimateText = function() {
            if (r.isTextAnimating_bl) return;
            r.isTextAnimating_bl = true;
            r.animTextWidth = r.animText1_do.getWidth();
            r.simpleText_do.setX(-1e3);
            r.animText1_do.setX(r.animationHolderWidth + 5);
            r.animText2_do.setX(r.animationHolderWidth + r.animTextWidth + 10);
            clearInterval(r.animateTextId_int);
            r.animateTextId_int = setInterval(r.animateText, 40)
        };
        this.stopToAnimateText = function() {
            if (!r.isTextAnimating_bl) return;
            r.isTextAnimating_bl = false;
            r.simpleText_do.setX(r.animationHolderWidth + 5);
            r.animText1_do.setX(-1e3);
            r.animText2_do.setX(-1e3);
            clearInterval(r.animateTextId_int)
        };
        this.animateText = function() {
            r.animText1_do.setX(r.animText1_do.x - 1);
            r.animText2_do.setX(r.animText2_do.x - 1);
            if (r.animText1_do.x < -(r.animTextWidth - r.animationHolderWidth)) r.animText1_do.setX(r.animText2_do.x + r.animTextWidth + 5);
            if (r.animText2_do.x < -(r.animTextWidth - r.animationHolderWidth)) r.animText2_do.setX(r.animText1_do.x + r.animTextWidth + 5)
        };
        this.stopEqulizer = function() {
            if (r.animation_do) r.animation_do.stop()
        };
        this.startEqulizer = function() {
            if (r.animation_do) r.animation_do.start()
        };
        this.setupMainScrubber = function() {
            r.mainScrubber_do = new FWDMSPDisplayObject("div");
            r.mainScrubber_do.setY(parseInt((r.stageHeight - r.scrubbersHeight) / 2));
            r.mainScrubber_do.setHeight(r.scrubbersHeight);
            r.mainScrubberBkLeft_do = new FWDMSPDisplayObject("img");
            r.mainScrubberBkLeft_do.setScreen(r.mainScrubberBkLeft_img);
            r.mainScrubberBkRight_do = new FWDMSPDisplayObject("img");
            r.mainScrubberBkRight_do.setScreen(r.mainScrubberBkRight_img);
            var e = new Image;
            e.src = r.mainScrubberBkMiddlePath_str;
            if (r.isMobile_bl) {
                r.mainScrubberBkMiddle_do = new FWDMSPDisplayObject("div");
                r.mainScrubberBkMiddle_do.getStyle().background = "url('" + r.mainScrubberBkMiddlePath_str + "')"
            } else {
                r.mainScrubberBkMiddle_do = new FWDMSPDisplayObject("img");
                r.mainScrubberBkMiddle_do.setScreen(e)
            }
            r.mainScrubberBkMiddle_do.setHeight(r.scrubbersHeight);
            r.mainScrubberBkMiddle_do.setX(r.scrubbersBkLeftAndRightWidth);
            r.mainProgress_do = new FWDMSPDisplayObject("div");
            r.mainProgress_do.setHeight(r.scrubbersHeight);
            r.progressLeft_do = new FWDMSPDisplayObject("img");
            r.progressLeft_do.setScreen(r.mainScrubberLeftProgress_img);
            e = new Image;
            e.src = r.progressMiddlePath_str;
            r.progressMiddle_do = new FWDMSPDisplayObject("div");
            r.progressMiddle_do.getStyle().background = "url('" + r.progressMiddlePath_str + "')";
            r.progressMiddle_do.setHeight(r.scrubbersHeight);
            r.progressMiddle_do.setX(r.mainScrubberDragLeftWidth);
            r.mainScrubberDrag_do = new FWDMSPDisplayObject("div");
            r.mainScrubberDrag_do.setHeight(r.scrubbersHeight);
            r.mainScrubberDragLeft_do = new FWDMSPDisplayObject("img");
            r.mainScrubberDragLeft_do.setScreen(r.mainScrubberDragLeft_img);
            e = new Image;
            e.src = r.mainScrubberDragMiddlePath_str;
            r.mainScrubberDragMiddle_do = new FWDMSPDisplayObject("div");
            r.mainScrubberDragMiddle_do.getStyle().background = "url('" + r.mainScrubberDragMiddlePath_str + "')";
            r.mainScrubberDragMiddle_do.setHeight(r.scrubbersHeight);
            r.mainScrubberDragMiddle_do.setX(r.mainScrubberDragLeftWidth);
            r.mainScrubberBarLine_do = new FWDMSPDisplayObject("img");
            r.mainScrubberBarLine_do.setScreen(r.mainScrubberLine_img);
            r.mainScrubberBarLine_do.setAlpha(0);
            r.mainScrubberBarLine_do.hasTransform3d_bl = false;
            r.mainScrubberBarLine_do.hasTransform2d_bl = false;
            r.mainScrubber_do.addChild(r.mainScrubberBkLeft_do);
            r.mainScrubber_do.addChild(r.mainScrubberBkMiddle_do);
            r.mainScrubber_do.addChild(r.mainScrubberBkRight_do);
            r.mainScrubberDrag_do.addChild(r.mainScrubberDragLeft_do);
            r.mainScrubberDrag_do.addChild(r.mainScrubberDragMiddle_do);
            r.mainProgress_do.addChild(r.progressLeft_do);
            r.mainProgress_do.addChild(r.progressMiddle_do);
            r.mainScrubber_do.addChild(r.mainProgress_do);
            r.mainScrubber_do.addChild(r.mainScrubberDrag_do);
            r.mainScrubber_do.addChild(r.mainScrubberBarLine_do);
            r.mainHolder_do.addChild(r.mainScrubber_do);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    r.mainScrubber_do.screen.addEventListener("MSPointerOver", r.mainScrubberOnOverHandler);
                    r.mainScrubber_do.screen.addEventListener("MSPointerOut", r.mainScrubberOnOutHandler);
                    r.mainScrubber_do.screen.addEventListener("MSPointerDown", r.mainScrubberOnDownHandler)
                } else {
                    r.mainScrubber_do.screen.addEventListener("touchstart", r.mainScrubberOnDownHandler)
                }
            } else if (r.screen.addEventListener) {
                r.mainScrubber_do.screen.addEventListener("mouseover", r.mainScrubberOnOverHandler);
                r.mainScrubber_do.screen.addEventListener("mouseout", r.mainScrubberOnOutHandler);
                r.mainScrubber_do.screen.addEventListener("mousedown", r.mainScrubberOnDownHandler)
            } else if (r.screen.attachEvent) {
                r.mainScrubber_do.screen.attachEvent("onmouseover", r.mainScrubberOnOverHandler);
                r.mainScrubber_do.screen.attachEvent("onmouseout", r.mainScrubberOnOutHandler);
                r.mainScrubber_do.screen.attachEvent("onmousedown", r.mainScrubberOnDownHandler)
            }
            r.disableMainScrubber()
        };
        this.mainScrubberOnOverHandler = function(e) {
            if (r.isMainScrubberDisabled_bl) return
        };
        this.mainScrubberOnOutHandler = function(e) {
            if (r.isMainScrubberDisabled_bl) return
        };
        this.mainScrubberOnDownHandler = function(t) {
            if (r.isMainScrubberDisabled_bl) return;
            if (t.preventDefault) t.preventDefault();
            r.isMainScrubberScrubbing_bl = true;
            var n = FWDMSPUtils.getViewportMouseCoordinates(t);
            var i = n.screenX - r.mainScrubber_do.getGlobalX();
            if (i < 0) {
                i = 0
            } else if (i > r.mainScrubberWidth - r.scrubbersOffsetWidth) {
                i = r.mainScrubberWidth - r.scrubbersOffsetWidth
            }
            var s = i / r.mainScrubberWidth;
            if (!FWDMSP.hasHTML5Audio && i >= r.mainProgress_do.w) i = r.mainProgress_do.w;
            var o = i / r.mainScrubberWidth;
            if (r.disable_do) r.addChild(r.disable_do);
            r.updateMainScrubber(s);
            r.dispatchEvent(e.START_TO_SCRUB);
            r.dispatchEvent(e.SCRUB_PLAYLIST_ITEM, {
                percent: o
            });
            r.dispatchEvent(e.SCRUB, {
                percent: s
            });
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.addEventListener("MSPointerMove", r.mainScrubberMoveHandler);
                    window.addEventListener("MSPointerUp", r.mainScrubberEndHandler)
                } else {
                    window.addEventListener("touchmove", r.mainScrubberMoveHandler);
                    window.addEventListener("touchend", r.mainScrubberEndHandler)
                }
            } else {
                if (window.addEventListener) {
                    window.addEventListener("mousemove", r.mainScrubberMoveHandler);
                    window.addEventListener("mouseup", r.mainScrubberEndHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousemove", r.mainScrubberMoveHandler);
                    document.attachEvent("onmouseup", r.mainScrubberEndHandler)
                }
            }
        };
        this.mainScrubberMoveHandler = function(t) {
            if (t.preventDefault) t.preventDefault();
            var n = FWDMSPUtils.getViewportMouseCoordinates(t);
            var i = n.screenX - r.mainScrubber_do.getGlobalX();
            if (i < 0) {
                i = 0
            } else if (i > r.mainScrubberWidth - r.scrubbersOffsetWidth) {
                i = r.mainScrubberWidth - r.scrubbersOffsetWidth
            }
            var s = i / r.mainScrubberWidth;
            if (!FWDMSP.hasHTML5Audio && i >= r.mainProgress_do.w) i = r.mainProgress_do.w;
            var o = i / r.mainScrubberWidth;
            r.updateMainScrubber(s);
            r.dispatchEvent(e.SCRUB_PLAYLIST_ITEM, {
                percent: o
            });
            r.dispatchEvent(e.SCRUB, {
                percent: s
            })
        };
        this.mainScrubberEndHandler = function(t) {
            if (r.disable_do) {
                if (r.contains(r.disable_do)) r.removeChild(r.disable_do)
            }
            r.dispatchEvent(e.STOP_TO_SCRUB);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.removeEventListener("MSPointerMove", r.mainScrubberMoveHandler);
                    window.removeEventListener("MSPointerUp", r.mainScrubberEndHandler)
                } else {
                    window.removeEventListener("touchmove", r.mainScrubberMoveHandler);
                    window.removeEventListener("touchend", r.mainScrubberEndHandler)
                }
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", r.mainScrubberMoveHandler);
                    window.removeEventListener("mouseup", r.mainScrubberEndHandler)
                } else if (document.detachEvent) {
                    document.detachEvent("onmousemove", r.mainScrubberMoveHandler);
                    document.detachEvent("onmouseup", r.mainScrubberEndHandler)
                }
            }
        };
        this.disableMainScrubber = function() {
            if (!r.mainScrubber_do) return;
            r.isMainScrubberDisabled_bl = true;
            r.mainScrubber_do.setButtonMode(false);
            r.updateMainScrubber(0);
            r.updatePreloaderBar(0);
            r.mainScrubberEndHandler()
        };
        this.enableMainScrubber = function() {
            if (!r.mainScrubber_do) return;
            r.isMainScrubberDisabled_bl = false;
            r.mainScrubber_do.setButtonMode(true)
        };
        this.updateMainScrubber = function(e) {
            if (!r.mainScrubber_do || isNaN(e)) return;
            var t = parseInt(e * r.mainScrubberWidth);
            r.percentPlayed = e;
            if (!FWDMSP.hasHTML5Audio && t >= r.mainProgress_do.w) t = r.mainProgress_do.w;
            if (t < 1 && r.isMainScrubberLineVisible_bl) {
                r.isMainScrubberLineVisible_bl = false;
                FWDMSPTweenMax.to(r.mainScrubberBarLine_do, .5, {
                    alpha: 0
                })
            } else if (t > 2 && !r.isMainScrubberLineVisible_bl) {
                r.isMainScrubberLineVisible_bl = true;
                FWDMSPTweenMax.to(r.mainScrubberBarLine_do, .5, {
                    alpha: 1
                })
            }
            r.mainScrubberDrag_do.setWidth(t);
            if (t > r.mainScrubberWidth - r.scrubbersOffsetWidth) t = r.mainScrubberWidth - r.scrubbersOffsetWidth;
            FWDMSPTweenMax.to(r.mainScrubberBarLine_do, .8, {
                x: t,
                ease: Expo.easeOut
            })
        };
        this.updatePreloaderBar = function(e) {
            if (!r.mainProgress_do) return;
            var t = parseInt(e * r.mainScrubberWidth);
            if (e == 1) {
                r.mainProgress_do.setY(-30)
            } else if (r.mainProgress_do.y != 0 && e != 1) {
                r.mainProgress_do.setY(0)
            }
            if (t > r.mainScrubberWidth - r.scrubbersOffsetWidth) t = r.mainScrubberWidth - r.scrubbersOffsetWidth;
            if (t < 0) t = 0;
            r.mainProgress_do.setWidth(t)
        };
        this.setupTime = function() {
            r.currentTime_do = new FWDMSPDisplayObject("div");
            r.currentTime_do.hasTransform3d_bl = false;
            r.currentTime_do.hasTransform2d_bl = false;
            r.currentTime_do.getStyle().fontFamily = "Arial";
            r.currentTime_do.getStyle().fontSize = "12px";
            r.currentTime_do.getStyle().whiteSpace = "nowrap";
            r.currentTime_do.getStyle().textAlign = "left";
            r.currentTime_do.getStyle().color = r.timeColor_str;
            r.currentTime_do.getStyle().fontSmoothing = "antialiased";
            r.currentTime_do.getStyle().webkitFontSmoothing = "antialiased";
            r.currentTime_do.getStyle().textRendering = "optimizeLegibility";
            r.mainHolder_do.addChild(r.currentTime_do);
            r.totalTime_do = new FWDMSPDisplayObject("div");
            r.totalTime_do.hasTransform3d_bl = false;
            r.totalTime_do.hasTransform2d_bl = false;
            r.totalTime_do.getStyle().fontFamily = "Arial";
            r.totalTime_do.getStyle().fontSize = "12px";
            r.totalTime_do.getStyle().whiteSpace = "nowrap";
            r.totalTime_do.getStyle().textAlign = "right";
            r.totalTime_do.getStyle().color = r.timeColor_str;
            r.totalTime_do.getStyle().fontSmoothing = "antialiased";
            r.totalTime_do.getStyle().webkitFontSmoothing = "antialiased";
            r.totalTime_do.getStyle().textRendering = "optimizeLegibility";
            r.mainHolder_do.addChild(r.totalTime_do);
            r.updateTime();
            setTimeout(function() {
                if (r == null) return;
                r.timeHeight = r.currentTime_do.getHeight();
                r.currentTime_do.h = r.timeHeight;
                r.totalTime_do.h = r.timeHeight;
                r.stageWidth = n.stageWidth;
                r.positionButtons()
            }, 50)
        };
        this.updateTime = function(e, t) {
            if (!r.currentTime_do || !t) return;
            if (t == "00:00") t = e;
            r.currentTime_do.setInnerHTML(e);
            r.totalTime_do.setInnerHTML(t);
            if (e.length != r.lastTotalTimeLength || t.length != r.lastCurTimeLength) {
                var n = r.currentTime_do.offsetWidth;
                var i = r.totalTime_do.offsetWidth;
                r.currentTime_do.w = n;
                r.totalTime_do.w = i;
                r.positionButtons();
                setTimeout(function() {
                    r.currentTime_do.w = r.currentTime_do.getWidth();
                    r.totalTime_do.w = r.totalTime_do.getWidth();
                    r.positionButtons()
                }, 50);
                r.lastCurTimeLength = e.length;
                r.lastTotalTimeLength = t.length
            }
        };
        this.setupVolumeScrubber = function() {
            r.mainVolumeHolder_do = new FWDMSPDisplayObject("div");
            r.mainVolumeHolder_do.setHeight(r.volumeN_img.height);
            r.mainHolder_do.addChild(r.mainVolumeHolder_do);
            FWDMSPSimpleButton.setPrototype();
            r.volumeButton_do = new FWDMSPSimpleButton(r.volumeN_img, t.volumeSPath_str, t.volumeDPath_str);
            r.volumeButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.volumeButtonShowToolTipHandler);
            r.volumeButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.volumeButtonOnMouseUpHandler);
            if (!r.allowToChangeVolume_bl) r.volumeButton_do.disable();
            r.volumeScrubber_do = new FWDMSPDisplayObject("div");
            r.volumeScrubber_do.setHeight(r.scrubbersHeight);
            r.volumeScrubber_do.setX(r.volumeButton_do.w);
            r.volumeScrubber_do.setY(parseInt((r.volumeButton_do.h - r.scrubbersHeight) / 2));
            r.volumeScrubberBkLeft_do = new FWDMSPDisplayObject("img");
            var e = new Image;
            e.src = r.mainScrubberBkLeft_do.screen.src;
            r.volumeScrubberBkLeft_do.setScreen(e);
            r.volumeScrubberBkLeft_do.setWidth(r.mainScrubberBkLeft_do.w);
            r.volumeScrubberBkLeft_do.setHeight(r.mainScrubberBkLeft_do.h);
            r.volumeScrubberBkRight_do = new FWDMSPDisplayObject("img");
            var n = new Image;
            n.src = r.mainScrubberBkRight_do.screen.src;
            r.volumeScrubberBkRight_do.setScreen(n);
            r.volumeScrubberBkRight_do.setWidth(r.mainScrubberBkRight_do.w);
            r.volumeScrubberBkRight_do.setHeight(r.mainScrubberBkRight_do.h);
            var i = new Image;
            i.src = r.volumeScrubberBkMiddlePath_str;
            if (r.isMobile_bl) {
                r.volumeScrubberBkMiddle_do = new FWDMSPDisplayObject("div");
                r.volumeScrubberBkMiddle_do.getStyle().background = "url('" + r.volumeScrubberBkMiddlePath_str + "')"
            } else {
                r.volumeScrubberBkMiddle_do = new FWDMSPDisplayObject("img");
                r.volumeScrubberBkMiddle_do.setScreen(i)
            }
            r.volumeScrubberBkMiddle_do.setHeight(r.scrubbersHeight);
            r.volumeScrubberBkMiddle_do.setX(r.scrubbersBkLeftAndRightWidth);
            r.volumeScrubberDrag_do = new FWDMSPDisplayObject("div");
            r.volumeScrubberDrag_do.setHeight(r.scrubbersHeight);
            r.volumeScrubberDragLeft_do = new FWDMSPDisplayObject("img");
            var s = new Image;
            s.src = r.mainScrubberDragLeft_img.src;
            r.volumeScrubberDragLeft_do.setScreen(s);
            r.volumeScrubberDragLeft_do.setWidth(r.mainScrubberDragLeft_do.w);
            r.volumeScrubberDragLeft_do.setHeight(r.mainScrubberDragLeft_do.h);
            i = new Image;
            i.src = r.volumeScrubberDragMiddlePath_str;
            if (r.isMobile_bl) {
                r.volumeScrubberDragMiddle_do = new FWDMSPDisplayObject("div");
                r.volumeScrubberDragMiddle_do.getStyle().background = "url('" + r.volumeScrubberDragMiddlePath_str + "')"
            } else {
                r.volumeScrubberDragMiddle_do = new FWDMSPDisplayObject("img");
                r.volumeScrubberDragMiddle_do.setScreen(i)
            }
            r.volumeScrubberDragMiddle_do.setHeight(r.scrubbersHeight);
            r.volumeScrubberDragMiddle_do.setX(r.mainScrubberDragLeftWidth);
            r.volumeScrubberBarLine_do = new FWDMSPDisplayObject("img");
            var o = new Image;
            o.src = r.mainScrubberBarLine_do.screen.src;
            r.volumeScrubberBarLine_do.setScreen(o);
            r.volumeScrubberBarLine_do.setWidth(r.mainScrubberBarLine_do.w);
            r.volumeScrubberBarLine_do.setHeight(r.mainScrubberBarLine_do.h);
            r.volumeScrubberBarLine_do.setAlpha(0);
            r.volumeScrubberBarLine_do.hasTransform3d_bl = false;
            r.volumeScrubberBarLine_do.hasTransform2d_bl = false;
            r.volumeScrubber_do.addChild(r.volumeScrubberBkLeft_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBkMiddle_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBkRight_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBarLine_do);
            r.volumeScrubberDrag_do.addChild(r.volumeScrubberDragLeft_do);
            r.volumeScrubberDrag_do.addChild(r.volumeScrubberDragMiddle_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberDrag_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBarLine_do);
            r.mainVolumeHolder_do.addChild(r.volumeButton_do);
            r.mainVolumeHolder_do.addChild(r.volumeScrubber_do);
            if (r.allowToChangeVolume_bl) {
                if (r.isMobile_bl) {
                    if (r.hasPointerEvent_bl) {
                        r.volumeScrubber_do.screen.addEventListener("MSPointerOver", r.volumeScrubberOnOverHandler);
                        r.volumeScrubber_do.screen.addEventListener("MSPointerOut", r.volumeScrubberOnOutHandler);
                        r.volumeScrubber_do.screen.addEventListener("MSPointerDown", r.volumeScrubberOnDownHandler)
                    } else {
                        r.volumeScrubber_do.screen.addEventListener("touchstart", r.volumeScrubberOnDownHandler)
                    }
                } else if (r.screen.addEventListener) {
                    r.volumeScrubber_do.screen.addEventListener("mouseover", r.volumeScrubberOnOverHandler);
                    r.volumeScrubber_do.screen.addEventListener("mouseout", r.volumeScrubberOnOutHandler);
                    r.volumeScrubber_do.screen.addEventListener("mousedown", r.volumeScrubberOnDownHandler)
                } else if (r.screen.attachEvent) {
                    r.volumeScrubber_do.screen.attachEvent("onmouseover", r.volumeScrubberOnOverHandler);
                    r.volumeScrubber_do.screen.attachEvent("onmouseout", r.volumeScrubberOnOutHandler);
                    r.volumeScrubber_do.screen.attachEvent("onmousedown", r.volumeScrubberOnDownHandler)
                }
            }
            r.enableVolumeScrubber();
            r.updateVolumeScrubber(r.volume)
        };
        this.volumeButtonOnMouseUpHandler = function() {
            var e = r.lastVolume;
            if (r.isMute_bl) {
                e = r.lastVolume;
                r.isMute_bl = false
            } else {
                e = 1e-6;
                r.isMute_bl = true
            }
            r.updateVolume(e)
        };
        this.volumeButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.volumeButton_do, r.volumeButtonToolTip_do, e)
        };
        this.volumeScrubberOnOverHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return
        };
        this.volumeScrubberOnOutHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return
        };
        this.volumeScrubberOnDownHandler = function(t) {
            if (r.isVolumeScrubberDisabled_bl) return;
            if (t.preventDefault) t.preventDefault();
            var n = FWDMSPUtils.getViewportMouseCoordinates(t);
            var i = n.screenX - r.volumeScrubber_do.getGlobalX();
            if (i < 0) {
                i = 0
            } else if (i > r.volumeScrubberWidth - r.scrubbersOffsetWidth) {
                i = r.volumeScrubberWidth - r.scrubbersOffsetWidth
            }
            var s = i / r.volumeScrubberWidth;
            if (r.disable_do) r.addChild(r.disable_do);
            r.lastVolume = s;
            r.updateVolume(s);
            r.dispatchEvent(e.VOLUME_START_TO_SCRUB);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.addEventListener("MSPointerMove", r.volumeScrubberMoveHandler);
                    window.addEventListener("MSPointerUp", r.volumeScrubberEndHandler)
                } else {
                    window.addEventListener("touchmove", r.volumeScrubberMoveHandler);
                    window.addEventListener("touchend", r.volumeScrubberEndHandler)
                }
            } else {
                if (window.addEventListener) {
                    window.addEventListener("mousemove", r.volumeScrubberMoveHandler);
                    window.addEventListener("mouseup", r.volumeScrubberEndHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousemove", r.volumeScrubberMoveHandler);
                    document.attachEvent("onmouseup", r.volumeScrubberEndHandler)
                }
            }
        };
        this.volumeScrubberMoveHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return;
            if (e.preventDefault) e.preventDefault();
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            var n = t.screenX - r.volumeScrubber_do.getGlobalX();
            if (n < 0) {
                n = 0
            } else if (n > r.volumeScrubberWidth - r.scrubbersOffsetWidth) {
                n = r.volumeScrubberWidth - r.scrubbersOffsetWidth
            }
            var i = n / r.volumeScrubberWidth;
            r.lastVolume = i;
            r.updateVolume(i)
        };
        this.volumeScrubberEndHandler = function() {
            r.dispatchEvent(e.VOLUME_STOP_TO_SCRUB);
            if (r.disable_do) {
                if (r.contains(r.disable_do)) r.removeChild(r.disable_do)
            }
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.removeEventListener("MSPointerMove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("MSPointerUp", r.volumeScrubberEndHandler)
                } else {
                    window.removeEventListener("touchmove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("touchend", r.volumeScrubberEndHandler)
                }
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("mouseup", r.volumeScrubberEndHandler)
                } else if (document.detachEvent) {
                    document.detachEvent("onmousemove", r.volumeScrubberMoveHandler);
                    document.detachEvent("onmouseup", r.volumeScrubberEndHandler)
                }
            }
        };
        this.disableVolumeScrubber = function() {
            r.isVolumeScrubberDisabled_bl = true;
            r.volumeScrubber_do.setButtonMode(false);
            r.volumeScrubberEndHandler()
        };
        this.enableVolumeScrubber = function() {
            r.isVolumeScrubberDisabled_bl = false;
            r.volumeScrubber_do.setButtonMode(true)
        };
        this.updateVolumeScrubber = function(e) {
            var t = parseInt(e * r.volumeScrubberWidth);
            r.volumeScrubberDrag_do.setWidth(t);
            if (t < 1 && r.isVolumeScrubberLineVisible_bl) {
                r.isVolumeScrubberLineVisible_bl = false;
                FWDMSPTweenMax.to(r.volumeScrubberBarLine_do, .5, {
                    alpha: 0
                })
            } else if (t > 1 && !r.isVolumeScrubberLineVisible_bl) {
                r.isVolumeScrubberLineVisible_bl = true;
                FWDMSPTweenMax.to(r.volumeScrubberBarLine_do, .5, {
                    alpha: 1
                })
            }
            if (t > r.volumeScrubberWidth - r.scrubbersOffsetWidth) t = r.volumeScrubberWidth - r.scrubbersOffsetWidth;
            FWDMSPTweenMax.to(r.volumeScrubberBarLine_do, .8, {
                x: t,
                ease: Expo.easeOut
            })
        };
        this.updateVolume = function(t) {
            r.volume = t;
            if (r.volume <= 1e-6) {
                r.isMute_bl = true;
                r.volume = 1e-6
            } else if (r.voume >= 1) {
                r.isMute_bl = false;
                r.volume = 1
            } else {
                r.isMute_bl = false
            }
            if (r.volume == 1e-6) {
                if (r.volumeButton_do) r.volumeButton_do.setDisabledState()
            } else {
                if (r.volumeButton_do) r.volumeButton_do.setEnabledState()
            }
            if (r.volumeScrubberBarLine_do) r.updateVolumeScrubber(r.volume);
            r.dispatchEvent(e.CHANGE_VOLUME, {
                percent: r.volume
            })
        };
        this.setupPlaylistButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.playlistButton_do = new FWDMSPSimpleButton(r.playlistN_img, t.playlistSPath_str, undefined, true);
            r.playlistButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.playlistButtonShowToolTipHandler);
            r.playlistButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.playlistButtonOnMouseUpHandler);
            r.playlistButton_do.setY(parseInt((r.stageHeight - r.playlistButton_do.h) / 2));
            r.buttons_ar.push(r.playlistButton_do);
            r.mainHolder_do.addChild(r.playlistButton_do);
            if (r.showPlayListByDefault_bl) {
                r.setPlaylistButtonState("selected")
            }
        };
        this.playlistButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.playlistButton_do, r.playlistButtonToolTip_do, e.e)
        };
        this.playlistButtonOnMouseUpHandler = function() {
            if (r.playlistButton_do.isSelectedFinal_bl) {
                r.dispatchEvent(e.HIDE_PLAYLIST)
            } else {
                r.dispatchEvent(e.SHOW_PLAYLIST)
            }
        };
        this.setPlaylistButtonState = function(e) {
            if (!r.playlistButton_do) return;
            if (e == "selected") {
                r.playlistButton_do.setSelected()
            } else if (e == "unselected") {
                r.playlistButton_do.setUnselected()
            }
        };
        this.setupCategoriesButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.categoriesButton_do = new FWDMSPSimpleButton(r.categoriesN_img, t.categoriesSPath_str, undefined, true);
            r.categoriesButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.categoriesButtonShowTooltipHandler);
            r.categoriesButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.categoriesButtonOnMouseUpHandler);
            r.categoriesButton_do.setY(parseInt((r.stageHeight - r.categoriesButton_do.h) / 2));
            r.buttons_ar.push(r.categoriesButton_do);
            r.mainHolder_do.addChild(r.categoriesButton_do)
        };
        this.categoriesButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.categoriesButton_do, r.playlistsButtonToolTip_do, e.e)
        };
        this.categoriesButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.SHOW_CATEGORIES)
        };
        this.setCategoriesButtonState = function(e) {
            if (!r.categoriesButton_do) return;
            if (e == "selected") {
                r.categoriesButton_do.setSelected()
            } else if (e == "unselected") {
                r.categoriesButton_do.setUnselected()
            }
        };
        this.setupLoopButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.loopButton_do = new FWDMSPSimpleButton(r.replayN_img, t.replaySPath_str, undefined, true);
            r.loopButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.loopButtonShowTooltipHandler);
            r.loopButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.loopButtonOnMouseUpHandler);
            r.loopButton_do.setY(parseInt((r.stageHeight - r.loopButton_do.h) / 2));
            r.buttons_ar.push(r.loopButton_do);
            r.mainHolder_do.addChild(r.loopButton_do);
            if (r.loop_bl) r.setLoopStateButton("selected")
        };
        this.loopButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.loopButton_do, r.loopButtonToolTip_do, e.e)
        };
        this.loopButtonOnMouseUpHandler = function() {
            if (r.loopButton_do.isSelectedFinal_bl) {
                r.dispatchEvent(e.DISABLE_LOOP)
            } else {
                r.dispatchEvent(e.ENABLE_LOOP)
            }
        };
        this.setLoopStateButton = function(e) {
            if (!r.loopButton_do) return;
            if (e == "selected") {
                r.loopButton_do.setSelected()
            } else if (e == "unselected") {
                r.loopButton_do.setUnselected()
            }
        };
        this.setupDownloadButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.downloadButton_do = new FWDMSPSimpleButton(r.downloaderN_img, t.downloaderSPath_str);
            r.downloadButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.downloadButtonShowToolTipHandler);
            r.downloadButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.downloadButtonOnMouseUpHandler);
            r.downloadButton_do.setY(parseInt((r.stageHeight - r.downloadButton_do.h) / 2));
            r.buttons_ar.push(r.downloadButton_do);
            r.mainHolder_do.addChild(r.downloadButton_do)
        };
        this.downloadButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.downloadButton_do, r.downloadButtonToolTip_do, e.e)
        };
        this.downloadButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.DOWNLOAD_MP3)
        };
        this.setupBuyButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.buyButton_do = new FWDMSPSimpleButton(t.buyN_img, t.buySPath_str);
            r.buyButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.buyButtonShowToolTipHandler);
            r.buyButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.buyButtonOnMouseUpHandler);
            r.buttons_ar.push(r.buyButton_do);
            r.mainHolder_do.addChild(r.buyButton_do)
        };
        this.buyButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.buyButton_do, r.buyButtonToolTip_do, e.e)
        };
        this.buyButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.BUY)
        };
        this.setupShuffleButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.shuffleButton_do = new FWDMSPSimpleButton(r.shuffleN_img, t.shuffleSPath_str, undefined, true);
            r.shuffleButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.shuffleButtonShowToolTipHandler);
            r.shuffleButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.shuffleButtonOnMouseUpHandler);
            r.shuffleButton_do.setY(parseInt((r.stageHeight - r.shuffleButton_do.h) / 2));
            r.buttons_ar.push(r.shuffleButton_do);
            r.mainHolder_do.addChild(r.shuffleButton_do);
            if (!r.loop_bl && r.shuffle_bl) r.setShuffleButtonState("selected")
        };
        this.shuffleButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.shuffleButton_do, r.shuffleButtonToolTip_do, e.e)
        };
        this.shuffleButtonOnMouseUpHandler = function() {
            if (r.shuffleButton_do.isSelectedFinal_bl) {
                r.dispatchEvent(e.DISABLE_SHUFFLE)
            } else {
                r.dispatchEvent(e.ENABLE_SHUFFLE)
            }
        };
        this.setShuffleButtonState = function(e) {
            if (!r.shuffleButton_do) return;
            if (e == "selected") {
                r.shuffleButton_do.setSelected()
            } else if (e == "unselected") {
                r.shuffleButton_do.setUnselected()
            }
        };
        this.setupFacebookButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.facebookButton_do = new FWDMSPSimpleButton(r.facebookN_img, t.facebookSPath_str);
            r.facebookButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.facebookButtonShowToolTipHandler);
            r.facebookButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.faceboolButtonOnMouseUpHandler);
            r.facebookButton_do.setY(parseInt((r.stageHeight - r.facebookButton_do.h) / 2));
            r.buttons_ar.push(r.facebookButton_do);
            r.mainHolder_do.addChild(r.facebookButton_do)
        };
        this.facebookButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.facebookButton_do, r.facebookButtonToolTip_do, e.e)
        };
        this.faceboolButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.FACEBOOK_SHARE)
        };
        this.setupPopupButton = function() {
            FWDMSPSimpleButton.setPrototype();
            r.popupButton_do = new FWDMSPSimpleButton(r.popupN_img, t.popupSPath_str);
            r.popupButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.popupButtonShowToolTipHandler);
            r.popupButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.popupButtonOnMouseUpHandler);
            r.popupButton_do.setY(parseInt((r.stageHeight - r.popupButton_do.h) / 2));
            r.buttons_ar.push(r.popupButton_do);
            r.mainHolder_do.addChild(r.popupButton_do)
        };
        this.popupButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.popupButton_do, r.populButtonToolTip_do, e.e)
        };
        this.popupButtonOnMouseUpHandler = function() {
            if (r.populButtonToolTip_do) r.populButtonToolTip_do.hide();
            r.dispatchEvent(e.POPUP)
        };
        this.disableControllerWhileLoadingPlaylist = function() {
            r.prevButton_do.disable();
            r.playPauseButton_do.disable();
            r.nextButton_do.disable();
            if (r.downloadButton_do) r.downloadButton_do.disable();
            if (r.buyButton_do) r.buyButton_do.disable();
            if (r.playlistButton_do) r.playlistButton_do.disable(true);
            if (r.facebookButton_do) r.facebookButton_do.disable();
            r.updateTime("...", "...");
            r.setTitle("...")
        };
        this.enableControllerWhileLoadingPlaylist = function() {
            r.prevButton_do.enable();
            r.playPauseButton_do.enable();
            r.nextButton_do.enable();
            if (r.downloadButton_do) r.downloadButton_do.enable();
            if (r.buyButton_do) r.buyButton_do.enable();
            if (r.playlistButton_do) r.playlistButton_do.enable();
            if (r.facebookButton_do) r.facebookButton_do.enable()
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.FACEBOOK_SHARE = "facebookShare";
    e.PLAY_NEXT = "playNext";
    e.PLAY_PREV = "playPrev";
    e.PLAY = "play";
    e.PAUSE = "pause";
    e.POPUP = "popup";
    e.VOLUME_START_TO_SCRUB = "volumeStartToScrub";
    e.VOLUME_STOP_TO_SCRUB = "volumeStopToScrub";
    e.START_TO_SCRUB = "startToScrub";
    e.SCRUB = "scrub";
    e.SCRUB_PLAYLIST_ITEM = "scrubPlaylistItem";
    e.STOP_TO_SCRUB = "stopToScrub";
    e.CHANGE_VOLUME = "changeVolume";
    e.SHOW_CATEGORIES = "showCategories";
    e.SHOW_PLAYLIST = "showPlaylist";
    e.HIDE_PLAYLIST = "hidePlaylist";
    e.ENABLE_LOOP = "enableLoop";
    e.DISABLE_LOOP = "disableLoop";
    e.ENABLE_SHUFFLE = "enableShuffle";
    e.DISABLE_SHUFFLE = "disableShuffle";
    e.DOWNLOAD_MP3 = "downloadMp3";
    e.BUY = "buy";
    e.prototype = null;
    window.FWDMSPController = e
})();
(function(e) {
    var t = function(e, t, n, r) {
        var i = this;
        i.listeners = {
            events_ar: []
        };
        if (e == "div" || e == "img" || e == "canvas" || "input") {
            i.type = e
        } else {
            throw Error("Type is not valid! " + e)
        }
        this.children_ar = [];
        this.style;
        this.screen;
        this.transform;
        this.position = t || "absolute";
        this.overflow = n || "hidden";
        this.display = r || "inline-block";
        this.visible = true;
        this.buttonMode;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.rect;
        this.alpha = 1;
        this.innerHTML = "";
        this.opacityType = "";
        this.isHtml5_bl = false;
        this.hasTransform3d_bl = FWDMSPUtils.hasTransform3d;
        this.hasTransform2d_bl = FWDMSPUtils.hasTransform2d;
        if (FWDMSPUtils.isIE || FWDMSPUtils.isIE11 && !FWDMSPUtils.isMobile) {
            i.hasTransform3d_bl = false;
            i.hasTransform2d_bl = false
        }
        this.hasBeenSetSelectable_bl = false;
        i.init = function() {
            i.setScreen()
        };
        i.getTransform = function() {
            var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"];
            var t;
            while (t = e.shift()) {
                if (typeof i.screen.style[t] !== "undefined") {
                    return t
                }
            }
            return false
        };
        i.getOpacityType = function() {
            var e;
            if (typeof i.screen.style.opacity != "undefined") {
                e = "opacity"
            } else {
                e = "filter"
            }
            return e
        };
        i.setScreen = function(e) {
            if (i.type == "img" && e) {
                i.screen = e;
                i.setMainProperties()
            } else {
                i.screen = document.createElement(i.type);
                i.setMainProperties()
            }
        };
        i.setMainProperties = function() {
            i.transform = i.getTransform();
            i.setPosition(i.position);
            i.setOverflow(i.overflow);
            i.opacityType = i.getOpacityType();
            if (i.opacityType == "opacity") i.isHtml5_bl = true;
            if (i.opacityType == "filter") i.screen.style.filter = "inherit";
            i.screen.style.left = "0px";
            i.screen.style.top = "0px";
            i.screen.style.margin = "0px";
            i.screen.style.padding = "0px";
            i.screen.style.maxWidth = "none";
            i.screen.style.maxHeight = "none";
            i.screen.style.border = "none";
            i.screen.style.lineHeight = "1";
            i.screen.style.backgroundColor = "transparent";
            i.screen.style.backfaceVisibility = "hidden";
            i.screen.style.webkitBackfaceVisibility = "hidden";
            i.screen.style.MozBackfaceVisibility = "hidden";
            i.screen.style.MozImageRendering = "optimizeSpeed";
            i.screen.style.WebkitImageRendering = "optimizeSpeed";
            if (e == "img") {
                i.setWidth(i.screen.width);
                i.setHeight(i.screen.height)
            }
        };
        i.setBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "visible";
            i.screen.style.webkitBackfaceVisibility = "visible";
            i.screen.style.MozBackfaceVisibility = "visible"
        };
        i.setSelectable = function(e) {
            if (!e) {
                i.screen.style.userSelect = "none";
                i.screen.style.MozUserSelect = "none";
                i.screen.style.webkitUserSelect = "none";
                i.screen.style.khtmlUserSelect = "none";
                i.screen.style.oUserSelect = "none";
                i.screen.style.msUserSelect = "none";
                i.screen.msUserSelect = "none";
                i.screen.ondragstart = function(e) {
                    return false
                };
                i.screen.onselectstart = function() {
                    return false
                };
                i.screen.ontouchstart = function() {
                    return false
                };
                i.screen.style.webkitTouchCallout = "none";
                i.hasBeenSetSelectable_bl = true
            }
        };
        i.getScreen = function() {
            return i.screen
        };
        i.setVisible = function(e) {
            i.visible = e;
            if (i.visible == true) {
                i.screen.style.visibility = "visible"
            } else {
                i.screen.style.visibility = "hidden"
            }
        };
        i.getVisible = function() {
            return i.visible
        };
        i.setResizableSizeAfterParent = function() {
            i.screen.style.width = "100%";
            i.screen.style.height = "100%"
        };
        i.getStyle = function() {
            return i.screen.style
        };
        i.setOverflow = function(e) {
            i.overflow = e;
            i.screen.style.overflow = i.overflow
        };
        i.setPosition = function(e) {
            i.position = e;
            i.screen.style.position = i.position
        };
        i.setDisplay = function(e) {
            i.display = e;
            i.screen.style.display = i.display
        };
        i.setButtonMode = function(e) {
            i.buttonMode = e;
            if (i.buttonMode == true) {
                i.screen.style.cursor = "pointer"
            } else {
                i.screen.style.cursor = "default"
            }
        };
        i.setBkColor = function(e) {
            i.screen.style.backgroundColor = e
        };
        i.setInnerHTML = function(e) {
            i.innerHTML = e;
            i.screen.innerHTML = i.innerHTML
        };
        i.getInnerHTML = function() {
            return i.innerHTML
        };
        i.getRect = function() {
            return i.screen.getBoundingClientRect()
        };
        i.setAlpha = function(e) {
            i.alpha = e;
            if (i.opacityType == "opacity") {
                i.screen.style.opacity = i.alpha
            } else if (i.opacityType == "filter") {
                i.screen.style.filter = "alpha(opacity=" + i.alpha * 100 + ")";
                i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(i.alpha * 100) + ")"
            }
        };
        i.getAlpha = function() {
            return i.alpha
        };
        i.getRect = function() {
            return i.screen.getBoundingClientRect()
        };
        i.getGlobalX = function() {
            return i.getRect().left
        };
        i.getGlobalY = function() {
            return i.getRect().top
        };
        i.setX = function(e) {
            i.x = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.left = i.x + "px"
            }
        };
        i.getX = function() {
            return i.x
        };
        i.setY = function(e) {
            i.y = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.top = i.y + "px"
            }
        };
        i.getY = function() {
            return i.y
        };
        i.setWidth = function(e) {
            i.w = e;
            if (i.type == "img") {
                i.screen.width = i.w;
                i.screen.style.width = i.w + "px"
            } else {
                i.screen.style.width = i.w + "px"
            }
        };
        i.getWidth = function() {
            if (i.type == "div" || i.type == "input") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            } else if (i.type == "img") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                if (i.screen.width != 0) return i.screen.width;
                return i._w
            } else if (i.type == "canvas") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            }
        };
        i.setHeight = function(e) {
            i.h = e;
            if (i.type == "img") {
                i.screen.height = i.h;
                i.screen.style.height = i.h + "px"
            } else {
                i.screen.style.height = i.h + "px"
            }
        };
        i.getHeight = function() {
            if (i.type == "div" || i.type == "input") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            } else if (i.type == "img") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                if (i.screen.height != 0) return i.screen.height;
                return i.h
            } else if (i.type == "canvas") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            }
        };
        i.addChild = function(e) {
            if (i.contains(e)) {
                i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 1);
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            } else {
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            }
        };
        i.removeChild = function(e) {
            if (i.contains(e)) {
                i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 1);
                i.screen.removeChild(e.screen)
            } else {
                throw Error("##removeChild()## Child dose't exist, it can't be removed!")
            }
        };
        i.contains = function(e) {
            if (FWDMSPUtils.indexOfArray(i.children_ar, e) == -1) {
                return false
            } else {
                return true
            }
        };
        i.addChildAt = function(e, t) {
            if (i.getNumChildren() == 0) {
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            } else if (t == 1) {
                i.screen.insertBefore(e.screen, i.children_ar[0].screen);
                i.screen.insertBefore(i.children_ar[0].screen, e.screen);
                if (i.contains(e)) {
                    i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 1, e)
                } else {
                    i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 0, e)
                }
            } else {
                if (t < 0 || t > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                i.screen.insertBefore(e.screen, i.children_ar[t].screen);
                if (i.contains(e)) {
                    i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 1, e)
                } else {
                    i.children_ar.splice(FWDMSPUtils.indexOfArray(i.children_ar, e), 0, e)
                }
            }
        };
        i.getChildAt = function(e) {
            if (e < 0 || e > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (i.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
            return i.children_ar[e]
        };
        i.removeChildAtZero = function() {
            i.screen.removeChild(i.children_ar[0].screen);
            i.children_ar.shift()
        };
        i.getNumChildren = function() {
            return i.children_ar.length
        };
        i.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        i.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        i.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        i.disposeImage = function() {
            if (i.type == "img") i.screen.src = null
        };
        i.destroy = function() {
            if (i.hasBeenSetSelectable_bl) {
                i.screen.ondragstart = null;
                i.screen.onselectstart = null;
                i.screen.ontouchstart = null
            }
            i.screen.removeAttribute("style");
            i.listeners = [];
            i.listeners = null;
            i.children_ar = [];
            i.children_ar = null;
            i.style = null;
            i.screen = null;
            i.transform = null;
            i.position = null;
            i.overflow = null;
            i.display = null;
            i.visible = null;
            i.buttonMode = null;
            i.x = null;
            i.y = null;
            i.w = null;
            i.h = null;
            i.rect = null;
            i.alpha = null;
            i.innerHTML = null;
            i.opacityType = null;
            i.isHtml5_bl = null;
            i.hasTransform3d_bl = null;
            i.hasTransform2d_bl = null;
            i = null
        };
        i.init()
    };
    e.FWDMSPDisplayObject = t
})(window);
(function() {
    var e = function() {
        this.listeners = {
            events_ar: []
        };
        this.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        this.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        this.destroy = function() {
            this.listeners = null;
            this.addListener = null;
            this.dispatchEvent = null;
            this.removeListener = null
        }
    };
    window.FWDMSPEventDispatcher = e
})(window);
(function(e) {
    var t = function(n) {
        var r = this;
        var i = t.prototype;
        this.appId = parseInt(n);
        var s = false;
        r.init = function() {
            r.checkFBRoot();
            if (!e.fbAsyncInit) r.connect()
        };
        this.checkFBRoot = function() {
            var e = Boolean(document.getElementById("fb-root"));
            if (!e) {
                e = document.createElement("div");
                e.id = "fb-root";
                document.getElementsByTagName("body")[0].appendChild(e)
            }
        };
        this.connect = function() {
            if (r.hasStartedToConnect_bl) return;
            r.hasStartedToConnect_bl = true;
            e.fbAsyncInit = function() {
                FB.init({
                    appId: r.appId,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true
                });
                FB.Event.subscribe("auth.authResponseChange", function(e) {
                    if (e.status === "connected") {} else {
                        FB.login()
                    }
                })
            };
            (function(e) {
                var t, n = "facebook-jssdk";
                if (e.getElementById(n)) {
                    return
                }
                t = e.createElement("script");
                t.id = n;
                t.async = true;
                t.src = "//connect.facebook.net/en_US/all.js";
                e.getElementsByTagName("body")[0].appendChild(t)
            })(document)
        };
        this.share = function(e, t, n) {
            if (String(n).indexOf("undefined") == -1) {
                FB.ui({
                    method: "feed",
                    link: e,
                    caption: t,
                    picture: n
                }, function(e) {})
            } else {
                FB.ui({
                    method: "feed",
                    link: e,
                    caption: t
                }, function(e) {})
            }
        };
        r.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPEventDispatcher
    };
    t.prototype = null;
    e.FWDMSPFacebookShare = t
})(window);
(function(e) {
    var t = function(e) {
        var n = this;
        var r = t.prototype;
        this.bk_do = null;
        this.textHolder_do = null;
        this.show_to = null;
        this.isShowed_bl = false;
        this.isShowedOnce_bl = false;
        this.allowToRemove_bl = true;
        this.init = function() {
            n.setResizableSizeAfterParent();
            n.bk_do = new FWDMSPDisplayObject("div");
            n.bk_do.setAlpha(.4);
            n.bk_do.setBkColor("#FF0000");
            n.addChild(n.bk_do);
            n.textHolder_do = new FWDMSPDisplayObject("div");
            n.textHolder_do.getStyle().wordWrap = "break-word";
            n.textHolder_do.getStyle().padding = "10px";
            n.textHolder_do.getStyle().paddingBottom = "0px";
            n.textHolder_do.getStyle().lineHeight = "18px";
            n.textHolder_do.setBkColor("#FF0000");
            n.textHolder_do.getStyle().color = "#000000";
            n.addChild(n.textHolder_do)
        };
        this.showText = function(e) {
            if (!n.isShowedOnce_bl) {
                if (n.screen.addEventListener) {
                    n.screen.addEventListener("click", n.closeWindow)
                } else if (n.screen.attachEvent) {
                    n.screen.attachEvent("onclick", n.closeWindow)
                }
                n.isShowedOnce_bl = true
            }
            n.setVisible(false);
            if (n.allowToRemove_bl) {
                n.textHolder_do.setInnerHTML(e + "<p style='margin:0px; padding-bottom:10px;'><font color='#FFFFFF'>Click or tap to close this window.</font>")
            } else {
                n.textHolder_do.getStyle().paddingBottom = "10px";
                n.textHolder_do.setInnerHTML(e)
            }
            clearTimeout(n.show_to);
            n.show_to = setTimeout(n.show, 60);
            setTimeout(function() {
                n.positionAndResize()
            }, 10)
        };
        this.show = function() {
            n.isShowed_bl = true;
            n.setVisible(true);
            n.positionAndResize()
        };
        this.positionAndResize = function() {
            if (e.main_do) {
                n.stageWidth = e.main_do.w;
                if (e.isPlaylistShowed_bl || e.openInPopup_bl) {
                    n.stageHeight = e.main_do.h
                } else {
                    if (e.controller_do) {
                        n.stageHeight = e.controller_do.h
                    } else {
                        n.stageHeight = e.stageHeight
                    }
                }
            } else {
                n.stageWidth = e.stageWidth;
                n.stageHeight = e.stageHeight
            }
            var t = Math.min(600, n.stageWidth - 40);
            var r = n.textHolder_do.screen.offsetHeight;
            var i = parseInt((n.stageWidth - t) / 2) - 10;
            var s = parseInt((n.stageHeight - r) / 2);
            n.bk_do.setWidth(n.stageWidth);
            n.bk_do.setHeight(n.stageHeight);
            n.textHolder_do.setX(i);
            n.textHolder_do.setY(s);
            n.textHolder_do.setWidth(t)
        };
        this.closeWindow = function() {
            if (!n.allowToRemove_bl) return;
            n.isShowed_bl = false;
            clearTimeout(n.show_to);
            try {
                e.main_do.removeChild(n)
            } catch (t) {}
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPDisplayObject("div", "relative")
    };
    t.prototype = null;
    e.FWDMSPInfo = t
})(window);
(function() {
    var e = function(t, n, r) {
        var i = this;
        this.animation_img = t.openerAnimation_img;
        if (n == FWDMSP.POSITION_TOP) {
            this.openN_img = t.openTopN_img;
            this.openSPath_str = t.openTopSPath_str
        } else {
            this.openN_img = t.openBottomN_img;
            this.openSPath_str = t.openBottomSPath_str
        }
        this.openerPauseN_img = t.openerPauseN_img;
        this.openerPlayN_img = t.openerPlayN_img;
        this.closeN_img = t.closeN_img;
        this.openerPauseS_str = t.openerPauseS_str;
        this.openerPlaySPath_str = t.openerPlayS_str;
        this.closeSPath_str = t.closeSPath_str;
        this.animationPath_str = t.animationPath_str;
        this.totalWidth = i.openN_img.width;
        this.totalHeight = i.openN_img.height;
        this.mainHolder_do = null;
        this.dumy_do = null;
        this.openN_do = null;
        this.openS_do = null;
        this.closeN_do = null;
        this.closeS_do = null;
        this.animation_do = null;
        this.playPauseButton_do = null;
        this.position_str = n;
        this.alignment_str = t.openerAlignment_str;
        this.openerEqulizerOffsetLeft = t.openerEqulizerOffsetLeft;
        this.openerEqulizerOffsetTop = t.openerEqulizerOffsetTop;
        this.showFirstTime_bl = true;
        this.playerIsShowed_bl = r;
        this.showOpenerPlayPauseButton_bl = t.showOpenerPlayPauseButton_bl;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        this.init = function() {
            i.hasTransform3d_bl = false;
            i.hasTransform2d_bl = false;
            i.setBackfaceVisibility();
            i.getStyle().msTouchAction = "none";
            i.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
            i.setupStuff();
            if (i.showOpenerPlayPauseButton_bl) i.setupPlayPauseButton();
            if (i.playerIsShowed_bl) i.showCloseButton();
            i.hide();
            if (i.showOpenerPlayPauseButton_bl) {
                i.setWidth(i.totalWidth + i.openerPauseN_img.width + 1)
            } else {
                i.setWidth(i.totalWidth)
            }
            i.setHeight(i.totalHeight)
        };
        this.setupStuff = function(e) {
            i.mainHolder_do = new FWDMSPDisplayObject("div");
            i.mainHolder_do.hasTransform3d_bl = false;
            i.mainHolder_do.hasTransform2d_bl = false;
            i.mainHolder_do.setBackfaceVisibility();
            if (i.showOpenerPlayPauseButton_bl) {
                i.mainHolder_do.setWidth(i.totalWidth + i.openerPauseN_img.width + 1)
            } else {
                i.mainHolder_do.setWidth(i.totalWidth)
            }
            i.mainHolder_do.setHeight(i.totalHeight);
            i.openN_do = new FWDMSPDisplayObject("img");
            i.openN_do.setScreen(i.openN_img);
            i.openN_do.hasTransform3d_bl = false;
            i.openN_do.hasTransform2d_bl = false;
            i.openN_do.setBackfaceVisibility();
            var t = new Image;
            t.src = i.openSPath_str;
            i.openS_do = new FWDMSPDisplayObject("img");
            i.openS_do.setScreen(t);
            i.openS_do.hasTransform3d_bl = false;
            i.openS_do.hasTransform2d_bl = false;
            i.openS_do.setBackfaceVisibility();
            i.openS_do.setWidth(i.openN_do.w);
            i.openS_do.setHeight(i.openN_do.h);
            i.openS_do.setAlpha(0);
            i.closeN_do = new FWDMSPDisplayObject("img");
            i.closeN_do.setScreen(i.closeN_img);
            i.closeN_do.hasTransform3d_bl = false;
            i.closeN_do.hasTransform2d_bl = false;
            i.closeN_do.setBackfaceVisibility();
            var n = new Image;
            n.src = i.closeSPath_str;
            i.closeS_do = new FWDMSPDisplayObject("img");
            i.closeS_do.setScreen(n);
            i.closeS_do.setWidth(i.closeN_do.w);
            i.closeS_do.setHeight(i.closeN_do.h);
            i.closeS_do.hasTransform3d_bl = false;
            i.closeS_do.hasTransform2d_bl = false;
            i.closeS_do.setBackfaceVisibility();
            i.closeS_do.setAlpha(0);
            FWDMSPPreloader.setPrototype();
            i.animation_do = new FWDMSPPreloader(i.animationPath_str, 29, 22, 31, 80, true);
            i.animation_do.setY(i.openerEqulizerOffsetTop);
            i.animation_do.show(false);
            i.animation_do.stop();
            i.dumy_do = new FWDMSPDisplayObject("div");
            i.dumy_do.setWidth(i.totalWidth);
            i.dumy_do.setHeight(i.totalHeight);
            i.dumy_do.getStyle().zIndex = 2;
            i.dumy_do.hasTransform3d_bl = false;
            i.dumy_do.hasTransform2d_bl = false;
            i.dumy_do.setBackfaceVisibility();
            i.dumy_do.setButtonMode(true);
            if (FWDMSPUtils.isIE || FWDMSPUtils.isAndroid) {
                i.dumy_do.setBkColor("#FF0000");
                i.dumy_do.setAlpha(.01)
            }
            if (i.isMobile_bl) {
                if (i.hasPointerEvent_bl) {
                    i.dumy_do.screen.addEventListener("MSPointerDown", i.onMouseUp);
                    i.dumy_do.screen.addEventListener("MSPointerOver", i.onMouseOver);
                    i.dumy_do.screen.addEventListener("MSPointerOut", i.onMouseOut)
                } else {
                    i.dumy_do.screen.addEventListener("touchstart", i.onMouseUp)
                }
            } else if (i.dumy_do.screen.addEventListener) {
                i.dumy_do.screen.addEventListener("mouseover", i.onMouseOver);
                i.dumy_do.screen.addEventListener("mouseout", i.onMouseOut);
                i.dumy_do.screen.addEventListener("mousedown", i.onMouseUp)
            } else if (i.dumy_do.screen.attachEvent) {
                i.dumy_do.screen.attachEvent("onmouseover", i.onMouseOver);
                i.dumy_do.screen.attachEvent("onmouseout", i.onMouseOut);
                i.dumy_do.screen.attachEvent("onmousedown", i.onMouseUp)
            }
            i.mainHolder_do.addChild(i.openN_do);
            i.mainHolder_do.addChild(i.openS_do);
            i.mainHolder_do.addChild(i.closeN_do);
            i.mainHolder_do.addChild(i.closeS_do);
            i.mainHolder_do.addChild(i.animation_do);
            i.mainHolder_do.addChild(i.dumy_do);
            i.addChild(i.mainHolder_do)
        };
        this.onMouseOver = function(e, t) {
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                i.setSelectedState(true)
            }
        };
        this.onMouseOut = function(e) {
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                i.setNormalState()
            }
        };
        this.onMouseUp = function(t) {
            if (t.preventDefault) t.preventDefault();
            if (i.playerIsShowed_bl) {
                i.playerIsShowed_bl = false;
                i.dispatchEvent(e.HIDE)
            } else {
                i.playerIsShowed_bl = true;
                i.dispatchEvent(e.SHOW)
            }
        };
        this.setupPlayPauseButton = function() {
            FWDMSPComplexButton.setPrototype();
            i.playPauseButton_do = new FWDMSPComplexButton(i.openerPlayN_img, i.openerPlaySPath_str, i.openerPauseN_img, i.openerPauseS_str, true);
            i.playPauseButton_do.addListener(FWDMSPComplexButton.MOUSE_UP, i.playButtonMouseUpHandler);
            i.addChild(i.playPauseButton_do)
        };
        this.showPlayButton = function() {
            if (i.playPauseButton_do) i.playPauseButton_do.setButtonState(1);
            i.animation_do.stop()
        };
        this.showPauseButton = function() {
            if (i.playPauseButton_do) i.playPauseButton_do.setButtonState(0);
            i.animation_do.start(0)
        };
        this.playButtonMouseUpHandler = function() {
            if (i.playPauseButton_do.currentState == 0) {
                i.dispatchEvent(FWDMSPController.PAUSE)
            } else {
                i.dispatchEvent(FWDMSPController.PLAY)
            }
        };
        this.setNormalState = function() {
            if (i.isMobile_bl && !i.hasPointerEvent_bl) return;
            FWDMSPTweenMax.killTweensOf(i.openS_do);
            FWDMSPTweenMax.killTweensOf(i.closeS_do);
            FWDMSPTweenMax.to(i.openS_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(i.closeS_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function(e) {
            FWDMSPTweenMax.killTweensOf(i.openS_do);
            FWDMSPTweenMax.killTweensOf(i.closeS_do);
            FWDMSPTweenMax.to(i.openS_do, .5, {
                alpha: 1,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(i.closeS_do, .5, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.showOpenButton = function() {
            i.playerIsShowed_bl = false;
            i.closeN_do.setX(150);
            i.closeS_do.setX(150);
            if (i.playPauseButton_do) {
                if (i.alignment_str == "right") {
                    i.playPauseButton_do.setX(0);
                    i.openN_do.setX(i.playPauseButton_do.w + 1);
                    i.openS_do.setX(i.playPauseButton_do.w + 1);
                    i.dumy_do.setX(i.playPauseButton_do.w + 1);
                    i.dumy_do.setWidth(i.totalWidth);
                    i.animation_do.setX(i.playPauseButton_do.w + 1 + i.openerEqulizerOffsetLeft)
                } else {
                    i.playPauseButton_do.setX(i.openN_do.w + 1);
                    i.openN_do.setX(0);
                    i.openS_do.setX(0);
                    i.dumy_do.setX(0);
                    i.dumy_do.setWidth(i.totalWidth);
                    i.animation_do.setX(i.openerEqulizerOffsetLeft)
                }
            } else {
                i.openN_do.setX(0);
                i.openS_do.setX(0);
                i.dumy_do.setX(0);
                i.dumy_do.setWidth(i.totalWidth);
                i.animation_do.setX(i.openerEqulizerOffsetLeft)
            }
            i.animation_do.setVisible(true)
        };
        this.showCloseButton = function() {
            i.playerIsShowed_bl = true;
            i.openN_do.setX(150);
            i.openS_do.setX(150);
            i.dumy_do.setWidth(i.closeN_do.w);
            if (i.alignment_str == "right") {
                if (i.playPauseButton_do) {
                    i.closeN_do.setX(i.totalWidth + 1);
                    i.closeS_do.setX(i.totalWidth + 1);
                    i.dumy_do.setX(i.totalWidth + 1)
                } else {
                    i.closeN_do.setX(i.totalWidth - i.closeN_do.w);
                    i.closeS_do.setX(i.totalWidth - i.closeN_do.w);
                    i.dumy_do.setX(i.totalWidth - i.closeN_do.w)
                }
            } else {
                i.closeN_do.setX(0);
                i.closeS_do.setX(0);
                i.dumy_do.setX(0)
            }
            if (i.playPauseButton_do) i.playPauseButton_do.setX(150);
            i.animation_do.setX(150);
            i.animation_do.setVisible(false)
        };
        this.hide = function() {
            i.mainHolder_do.setX(150)
        };
        this.show = function() {
            i.mainHolder_do.setX(0)
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.SHOW = "show";
    e.HIDE = "hise";
    e.prototype = null;
    window.FWDMSPOpener = e
})(window);
(function() {
    var e = function(t, n) {
        var r = this;
        var i = e.prototype;
        this.playlist_ar = null;
        this.items_ar = null;
        this.playlistItemBk1_img = t.playlistItemBk1_img;
        this.playlistItemBk2_img = t.playlistItemBk2_img;
        this.playlistSeparator_img = t.playlistSeparator_img;
        this.playlistScrBkTop_img = t.playlistScrBkTop_img;
        this.playlistScrBkMiddle_img = t.playlistScrBkMiddle_img;
        this.playlistScrBkBottom_img = t.playlistScrBkBottom_img;
        this.playlistScrDragTop_img = t.playlistScrDragTop_img;
        this.playlistScrDragMiddle_img = t.playlistScrDragMiddle_img;
        this.playlistScrDragBottom_img = t.playlistScrDragBottom_img;
        this.playlistPlayButtonN_img = t.playlistPlayButtonN_img;
        this.playlistScrLines_img = t.playlistScrLines_img;
        this.playlistScrLinesOver_img = t.playlistScrLinesOver_img;
        this.playlistDownloadButtonN_img = t.playlistDownloadButtonN_img;
        this.playlistBuyButtonN_img = t.playlistBuyButtonN_img;
        this.disable_do = null;
        this.separator_do = null;
        this.itemsHolder_do = null;
        this.curItem_do = null;
        this.scrMainHolder_do = null;
        this.scrTrack_do = null;
        this.scrTrackTop_do = null;
        this.scrTrackMiddle_do = null;
        this.scrTrackBottom_do = null;
        this.scrHandler_do = null;
        this.scrHandlerTop_do = null;
        this.scrHandlerMiddle_do = null;
        this.scrHandlerBottom_do = null;
        this.scrHandlerLines_do = null;
        this.scrHandlerLinesN_do = null;
        this.scrHandlerLinesS_do = null;
        this.playlistPlayButtonN_str = t.playlistPlayButtonN_str;
        this.playlistPlayButtonS_str = t.playlistPlayButtonS_str;
        this.playlistPauseButtonN_str = t.playlistPauseButtonN_str;
        this.playlistPauseButtonS_str = t.playlistPauseButtonS_str;
        this.controllerBkPath_str = t.controllerBkPath_str;
        this.playlistBackgroundColor_str = t.playlistBackgroundColor_str;
        this.searchInputColor_str = t.searchInputColor_str;
        this.toolTipsButtonFontColor_str = t.toolTipsButtonFontColor_str;
        this.countTrack = 0;
        this.inputSearchTextOffsetTop = t.inputSearchTextOffsetTop;
        this.inputSearchOffsetLeft = t.inputSearchOffsetLeft;
        this.startSpaceBetweenButtons = t.startSpaceBetweenButtons;
        this.spaceBetweenButtons = t.spaceBetweenButtons;
        if (this.spaceBetweenButtons > 15) this.spaceBetweenButtons = 10;
        this.searchBarHeight = t.searchBarHeight;
        this.countID3 = 0;
        this.id = 0;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.itemsTotalHeight = 0;
        this.scrollbarOffestWidth = t.scrollbarOffestWidth;
        this.scrWidth = r.playlistScrBkTop_img.width;
        this.trackTitleOffsetLeft = t.trackTitleOffsetLeft;
        this.downloadButtonOffsetRight = t.downloadButtonOffsetRight;
        this.itemHeight = r.playlistItemBk1_img.height;
        this.playPuaseIconWidth = r.playlistPlayButtonN_img.width;
        this.playPuaseIconHeight = r.playlistPlayButtonN_img.height;
        this.nrOfVisiblePlaylistItems = t.nrOfVisiblePlaylistItems;
        this.durationOffsetRight = t.durationOffsetRight;
        this.toolTipsButtonsHideDelay = t.toolTipsButtonsHideDelay;
        this.totalPlayListItems = 0;
        this.visibleNrOfItems = 0;
        this.yPositionOnPress = 0;
        this.lastPresedY = 0;
        this.lastListY = 0;
        this.playListFinalY = 0;
        this.scrollBarHandlerFinalY = 0;
        this.scrollBarHandlerFinalY = 0;
        this.vy = 0;
        this.vy2 = 0;
        this.friction = .9;
        this.updateMobileScrollBarId_int;
        this.updateMoveMobileScrollbarId_int;
        this.disableOnMoveId_to;
        this.updateMobileScrollbarOnPlaylistLoadId_to;
        this.showButtonsToolTips_bl = t.showButtonsToolTips_bl;
        this.allowToTweenPlaylistItems_bl = false;
        this.expandPlaylistBackground_bl = t.expandControllerBackground_bl;
        this.isSortedNumerical_bl = true;
        this.showSortButtons_bl = t.showSortButtons_bl;
        this.showSearchBar_bl = t.showSearchBar_bl;
        this.showPlaylistItemBuyButton_bl = t.showPlaylistItemBuyButton_bl;
        this.addScrollBarMouseWheelSupport_bl = t.addScrollBarMouseWheelSupport_bl;
        this.allowToScrollAndScrollBarIsActive_bl = false;
        this.isDragging_bl = false;
        this.showPlaylistItemPlayButton_bl = t.showPlaylistItemPlayButton_bl;
        this.showPlaylistItemDownloadButton_bl = t.showPlaylistItemDownloadButton_bl;
        this.isShowed_bl = t.showPlayListByDefault_bl;
        this.isShowedFirstTime_bl = false;
        this.animateOnIntro_bl = t.animateOnIntro_bl;
        this.isListCreated_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        r.init = function() {
            r.hasTransform3d_bl = false;
            r.hasTransform2d_bl = false;
            r.setBackfaceVisibility();
            r.mainHolder_do = new FWDMSPDisplayObject("div");
            r.mainHolder_do.hasTransform3d_bl = false;
            r.mainHolder_do.hasTransform2d_bl = false;
            r.mainHolder_do.setBackfaceVisibility();
            r.itemsHolder_do = new FWDMSPDisplayObject("div");
            r.itemsHolder_do.setBackfaceVisibility();
            r.setupSeparator();
            r.itemsHolder_do.setY(0);
            r.mainHolder_do.addChild(r.itemsHolder_do);
            r.addChild(r.mainHolder_do);
            if (r.isMobile_bl) {
                r.setupMobileScrollbar();
                if (r.hasPointerEvent_bl) r.setupDisable()
            } else {
                r.setupDisable();
                r.setupScrollbar();
                if (r.addScrollBarMouseWheelSupport_bl) r.addMouseWheelSupport()
            }
            if (r.showSearchBar_bl) {
                r.searchBar_do = new FWDMSPDisplayObject("div");
                r.searchBar_do.setOverflow("visible");
                if (!r.expandPlaylistBackground_bl) {
                    r.controllerBk_do = new FWDMSPDisplayObject("div");
                    r.controllerBk_do.getStyle().background = "url('" + r.controllerBkPath_str + "')"
                } else {
                    r.controllerBk_do = new FWDMSPDisplayObject("img");
                    var e = new Image;
                    e.src = r.controllerBkPath_str;
                    r.controllerBk_do.setScreen(e)
                }
                r.controllerBk_do.getStyle().width = "100%";
                r.searchSeparator_do = new FWDMSPDisplayObject("div");
                r.searchSeparator_do.setBackfaceVisibility();
                r.searchSeparator_do.hasTransform3d_bl = false;
                r.searchSeparator_do.hasTransform2d_bl = false;
                r.searchSeparator_do.getStyle().background = "url('" + r.playlistSeparator_img.src + "')";
                r.searchSeparator_do.setHeight(r.playlistSeparator_img.height);
                r.searchBar_do.setHeight(r.searchBarHeight + r.searchSeparator_do.h);
                r.controllerBk_do.setHeight(r.searchBar_do.h + 1);
                r.searchBar_do.addChild(r.controllerBk_do);
                r.searchBar_do.addChild(r.searchSeparator_do);
                r.setupInput();
                if (r.showSortButtons_bl) {
                    r.setupButtons();
                    if (r.showButtonsToolTips_bl) r.setupToolTips()
                }
                r.mainHolder_do.addChild(r.searchBar_do)
            }
            r.addChild(r.separator_do);
            r.mainHolder_do.setWidth(500);
            r.mainHolder_do.setHeight(500)
        };
        r.disableSearchBar = function() {
            if (r.isSearchBarDisabled_bl) return;
            r.isSearchBarDisabled_bl = true;
            r.input_do.screen.value = "Search will be available when all tracks data is loaded!";
            r.input_do.screen.disabled = true;
            if (r.sortNButton_do) {
                r.sortNButton_do.disable();
                r.sortAButton_do.disable();
                r.ascDscButton_do.disable()
            }
        };
        r.enableSearchBar = function() {
            if (!r.isSearchBarDisabled_bl) return;
            r.isSearchBarDisabled_bl = false;
            r.input_do.screen.value = "Search for track";
            r.input_do.screen.disabled = false;
            if (r.sortNButton_do) {
                r.sortNButton_do.enable();
                r.sortAButton_do.enable();
                r.ascDscButton_do.enable()
            }
        };
        r.resizeAndPosition = function(e) {
            if (n.stageWidth == r.stageWidth && n.stageHeight == r.stageHeight && !e) return;
            if (!r.isListCreated_bl) return;
            r.stageWidth = n.stageWidth;
            r.stageWidth = n.stageWidth;
            r.positionList();
            if (r.searchBar_do) r.positionSearchBar();
            if (r.scrMainHolder_do && r.allowToScrollAndScrollBarIsActive_bl) r.scrMainHolder_do.setX(r.stageWidth - r.scrWidth)
        };
        r.positionList = function() {
            if (!r.isListCreated_bl && r.stageWidth == 0) return;
            var e;
            r.copy_ar = [].concat(r.items_ar);
            r.isSearched_bl = false;
            if (r.input_do) {
                inputValue = r.input_do.screen.value;
                if (inputValue != "Search for track" && !r.isSearchBarDisabled_bl) {
                    inputValue = r.input_do.screen.value.toLowerCase();
                    for (var t = 0; t < r.copy_ar.length; t++) {
                        e = r.copy_ar[t];
                        if (e.titleText_str.toLowerCase().indexOf(inputValue.toLowerCase()) == -1) {
                            FWDMSPTweenMax.killTweensOf(e);
                            e.setX(-e.w);
                            r.copy_ar.splice(t, 1);
                            t--
                        }
                    }
                }
            }
            var n = 0;
            for (var t = 0; t < r.copy_ar.length; t++) {
                e = r.copy_ar[t];
                e.changeSource(t % 2)
            }
            var i = r.copy_ar.length;
            r.totalSearchedItems = i;
            r.itemsTotalHeight = i * r.itemHeight;
            if (r.visibleNrOfItems >= i) {
                r.allowToScrollAndScrollBarIsActive_bl = false
            } else {
                r.allowToScrollAndScrollBarIsActive_bl = true
            }
            for (var t = 0; t < i; t++) {
                e = r.copy_ar[t];
                if (r.allowToTweenPlaylistItems_bl && e.x < 0 && !r.isMobile_bl) {
                    if (!FWDMSPTweenMax.isTweening(e)) FWDMSPTweenMax.to(e, .8, {
                        x: 0,
                        ease: Expo.easeInOut
                    })
                } else {
                    FWDMSPTweenMax.killTweensOf(e);
                    e.setX(0)
                }
                e.setY(r.itemHeight * t);
                if (r.allowToScrollAndScrollBarIsActive_bl && r.scrMainHolder_do) {
                    e.resize(r.stageWidth - r.scrollbarOffestWidth, r.itemHeight)
                } else {
                    e.resize(r.stageWidth, r.itemHeight)
                }
            }
            if (r.allowToScrollAndScrollBarIsActive_bl && r.scrMainHolder_do) {
                r.itemsHolder_do.setWidth(r.stageWidth - r.scrollbarOffestWidth)
            } else {
                r.itemsHolder_do.setWidth(r.stageWidth)
            }
            if (r.input_do) {
                if (i == 0) {
                    r.showNothingFound()
                } else {
                    r.hideNothingFound()
                }
            }
            r.separator_do.setWidth(r.stageWidth);
            if (r.scrHandler_do) r.updateScrollBarSizeActiveAndDeactivate();
            r.mainHolder_do.setWidth(r.stageWidth);
            r.mainHolder_do.setHeight(r.stageHeight);
            r.setWidth(r.stageWidth);
            r.setHeight(r.stageHeight)
        };
        this.updatePlaylist = function(e) {
            if (r.isListCreated_bl) return;
            var t;
            r.playlist_ar = e;
            r.isShowedFirstTime_bl = true;
            r.stageHeight = 0;
            r.isListCreated_bl = true;
            if (r.input_do) r.input_do.screen.value = "Search for track";
            r.allowToScrollAndScrollBarIsActive_bl = false;
            r.countID3 == 2001;
            r.countTrack = 0;
            r.visibleNrOfItems = r.nrOfVisiblePlaylistItems;
            r.totalPlayListItems = r.playlist_ar.length;
            if (r.nrOfVisiblePlaylistItems > r.totalPlayListItems) {
                r.visibleNrOfItems = r.totalPlayListItems
            }
            r.stageHeight = r.visibleNrOfItems * r.itemHeight + r.separator_do.h;
            if (r.searchBar_do) r.stageHeight += r.separator_do.h + r.searchBarHeight;
            r.itemsTotalHeight = r.totalPlayListItems * r.itemHeight;
            r.mainHolder_do.setY(-r.stageHeight);
            r.itemsHolder_do.setY(0);
            if (r.sortNButton_do) {
                r.disableSortNButton();
                r.ascDscButton_do.setButtonState(1);
                r.srotAscending_bl = true
            }
            if (r.showSearchBar_bl) r.enableSearchBar();
            r.createPlayList();
            r.loadId3();
            var i = r.items_ar.length;
            clearTimeout(r.updateMobileScrollbarOnPlaylistLoadId_to);
            r.updateMobileScrollbarOnPlaylistLoadId_to = setTimeout(r.updateScrollBarHandlerAndContent, 900);
            clearTimeout(r.showAnimationIntroId_to);
            r.showAnimationIntroId_to = setTimeout(function() {
                for (var e = 0; e < i; e++) {
                    t = r.items_ar[e];
                    t.setTextSizes()
                }
                r.isListCreated_bl = true;
                if (r.visibleNrOfItems >= r.totalPlayListItems) {
                    r.allowToScrollAndScrollBarIsActive_bl = false
                } else {
                    r.allowToScrollAndScrollBarIsActive_bl = true
                }
                if (r.scrHandler_do) r.updateScrollBarSizeActiveAndDeactivate();
                if (r.scrMainHolder_do && r.allowToScrollAndScrollBarIsActive_bl) r.scrMainHolder_do.setX(r.stageWidth - r.scrWidth);
                if (n.position_str == FWDMSP.POSITION_TOP) {
                    r.mainHolder_do.setY(0);
                    r.separator_do.setY(r.stageHeight - r.separator_do.h)
                } else {
                    r.mainHolder_do.setY(r.separator_do.h);
                    r.separator_do.setY(0)
                }
                r.positionList();
                r.allowToTweenPlaylistItems_bl = true
            }, 60)
        };
        this.destroyPlaylist = function() {
            if (!r.isListCreated_bl) return;
            var e;
            var t = r.items_ar.length;
            r.isListCreated_bl = false;
            r.allowToTweenPlaylistItems_bl = false;
            clearTimeout(r.showAnimationIntroId_to);
            for (var n = 0; n < t; n++) {
                e = r.items_ar[n];
                r.itemsHolder_do.removeChild(e);
                e.destroy()
            }
            r.items_ar = null;
            r.stageHeight = 0;
            r.setHeight(r.stageHeight)
        };
        this.createPlayList = function() {
            var e;
            var n;
            var i;
            var s;
            var o = false;
            r.itemsHolder_do.setHeight(r.totalPlayListItems * r.itemHeight);
            r.mainHolder_do.setBkColor(r.playlistBackgroundColor_str);
            r.items_ar = [];
            for (var u = 0; u < r.totalPlayListItems; u++) {
                n = r.playlist_ar[u].duration == undefined ? undefined : FWDMSP.formatTotalTime(r.playlist_ar[u].duration);
                if (u % 2 == 0) {
                    i = t.playlistItemProgress1_img;
                    s = t.playlistItemGrad1_img
                } else {
                    i = t.playlistItemProgress2_img;
                    s = t.playlistItemGrad2_img
                }
                var o = r.playlist_ar[u].downloadable;
                if (!r.showPlaylistItemDownloadButton_bl) o = false;
                var a = Boolean(r.playlist_ar[u].buy);
                if (!r.showPlaylistItemBuyButton_bl) a = false;
                FWDMSPPlaylistItem.setPrototype();
                e = new FWDMSPPlaylistItem(r.playlist_ar[u].title, r.playlist_ar[u].titleText, r.playlistDownloadButtonN_img, t.playlistDownloadButtonS_str, r.playlistBuyButtonN_img, t.playlistBuyButtonS_str, t.playlistItemGrad1_img, t.playlistItemGrad2_img, t.playlistItemProgress1_img, t.playlistItemProgress2_img, t.playlistPlayButtonN_img, t.playlistItemBk1_img.src, t.playlistItemBk2_img.src, r.playlistPlayButtonN_str, r.playlistPlayButtonS_str, r.playlistPauseButtonN_str, r.playlistPauseButtonS_str, t.trackTitleNormalColor_str, t.trackTitleSelected_str, t.trackDurationColor_str, u, t.playPauseButtonOffsetLeftAndRight, r.trackTitleOffsetLeft, r.durationOffsetRight, r.downloadButtonOffsetRight, r.showPlaylistItemPlayButton_bl, o, a, n);
                e.addListener(FWDMSPPlaylistItem.MOUSE_UP, r.itemOnUpHandler);
                e.addListener(FWDMSPPlaylistItem.DOWNLOAD, r.downloadHandler);
                e.addListener(FWDMSPPlaylistItem.BUY, r.buyHandler);
                r.items_ar[u] = e;
                r.itemsHolder_do.addChild(e)
            }
        };
        this.itemOnUpHandler = function(e) {
            r.dispatchEvent(FWDMSPPlaylistItem.MOUSE_UP, {
                id: e.id
            })
        };
        this.downloadHandler = function(e) {
            r.dispatchEvent(FWDMSPPlaylistItem.DOWNLOAD, {
                id: e.id
            })
        };
        this.buyHandler = function(e) {
            r.dispatchEvent(FWDMSPPlaylistItem.BUY, {
                id: e.id
            })
        };
        this.loadId3 = function() {
            var e;
            clearTimeout(r.populateNextItemId_to);
            for (var t = 0; t < r.totalPlayListItems; t++) {
                if (r.playlist_ar[t].title != "...") {
                    r.countID3 = 2001;
                    return
                }
            }
            if (r.showSearchBar_bl) r.disableSearchBar();
            r.countID3 = 0;
            r.loadID3AndPopulate()
        };
        this.loadID3AndPopulate = function() {
            if (!r.items_ar) return;
            if (!r.playlist_ar[r.countID3]) {
                if (r.showSearchBar_bl) r.enableSearchBar();
                return
            }
            var n = "";
            var i = r.items_ar[r.countID3];
            var s = r.playlist_ar[r.countID3].source + "?rand=" + parseInt(Math.random() * 99999999);
            var o = r.playlist_ar[r.countID3];
            ID3.loadTags(s, function() {
                if (r.countID3 > r.playlist_ar.length || r.countID3 == 2001) {
                    clearTimeout(r.populateNextItemId_to);
                    return
                }
                var u = ID3.getAllTags(s);
                if (u.artist) {
                    o.titleText_str = u.artist + " - " + u.title;
                    if (t.showTracksNumbers_bl) {
                        if (r.countTrack < 9) n = "0";
                        n = n + (r.countTrack + 1) + ". ";
                        o.title = n + o.titleText_str
                    } else {
                        o.title = o.titleText_str
                    }
                    r.countTrack++
                }
                i.title_str = o.title;
                i.titleText_str = o.titleText_str;
                if (r.countID3 == r.id) r.dispatchEvent(e.UPDATE_TRACK_TITLE_if_FOLDER, {
                    title: i.title_str
                });
                i.updateTitle();
                setTimeout(function() {
                    if (!i) return;
                    i.setTextSizes(true);
                    if (r.allowToScrollAndScrollBarIsActive_bl && r.scrMainHolder_do) {
                        i.resize(r.stageWidth - r.scrollbarOffestWidth, r.itemHeight)
                    } else {
                        i.resize(r.stageWidth, r.itemHeight)
                    }
                }, 50);
                r.countID3++;
                r.populateNextItemId_to = setTimeout(r.loadID3AndPopulate, 150)
            })
        };
        this.activateItems = function(e, t) {
            var n;
            r.id = e;
            if (!r.items_ar) return;
            for (var i = 0; i < r.totalPlayListItems; i++) {
                n = r.items_ar[i];
                if (n.id == r.id) {
                    r.sortId = n.sortId;
                    break
                }
            }
            r.curItem_do = r.items_ar[r.sortId];
            r.id = r.curItem_do.id;
            for (var i = 0; i < r.totalPlayListItems; i++) {
                n = r.items_ar[i];
                if (i == r.sortId) {
                    n.setActive()
                } else {
                    n.setInActive()
                }
            }
            if (!t) r.updateScrollBarHandlerAndContent(true)
        };
        this.setCurItemPlayState = function() {
            if (!r.curItem_do) return;
            r.curItem_do.showPlayButton()
        };
        this.setCurItemPauseState = function() {
            if (!r.curItem_do) return;
            r.curItem_do.showPauseButton()
        };
        this.updateCurItemProgress = function(e) {
            if (!r.curItem_do) return;
            r.curItem_do.updateProgressPercent(e)
        };
        this.setupInput = function() {
            r.titlebarHeight = t.titlebarLeftPath_img.height;
            r.mainSearchInput_do = new FWDMSPDisplayObject("div");
            r.mainSearchInput_do.getStyle().background = "url('" + t.titlebarBkMiddlePattern_str + "')";
            r.mainSearchInput_do.setHeight(r.titlebarHeight);
            var e = new Image;
            e.src = t.titleBarLeft_img.src;
            r.titleBarLeft_do = new FWDMSPDisplayObject("img");
            r.titleBarLeft_do.setScreen(e);
            r.titleBarLeft_do.setWidth(t.titleBarLeft_img.width);
            r.titleBarLeft_do.setHeight(t.titleBarLeft_img.height);
            var n = new Image;
            n.src = t.titleBarRigth_img.src;
            r.titleBarRight_do = new FWDMSPDisplayObject("img");
            r.titleBarRight_do.setScreen(n);
            r.titleBarRight_do.setWidth(t.titleBarRigth_img.width);
            r.titleBarRight_do.setHeight(t.titleBarRigth_img.height);
            r.input_do = new FWDMSPDisplayObject("input");
            r.input_do.screen.maxLength = 20;
            r.input_do.getStyle().textAlign = "left";
            r.input_do.getStyle().outline = "none";
            r.input_do.getStyle().boxShadow = "none";
            r.input_do.getStyle().fontSmoothing = "antialiased";
            r.input_do.getStyle().webkitFontSmoothing = "antialiased";
            r.input_do.getStyle().textRendering = "optimizeLegibility";
            r.input_do.getStyle().fontFamily = "Arial";
            r.input_do.getStyle().fontSize = "12px";
            r.input_do.getStyle().padding = "6px";
            if (!FWDMSPUtils.isIEAndLessThen9) r.input_do.getStyle().paddingRight = "-6px";
            r.input_do.getStyle().paddingTop = "2px";
            r.input_do.getStyle().paddingBottom = "3px";
            r.input_do.getStyle().color = r.searchInputColor_str;
            r.input_do.screen.value = "Search for track";
            r.noSearchFound_do = new FWDMSPDisplayObject("div");
            r.noSearchFound_do.setX(0);
            r.noSearchFound_do.getStyle().textAlign = "center";
            r.noSearchFound_do.getStyle().width = "100%";
            r.noSearchFound_do.getStyle().fontSmoothing = "antialiased";
            r.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased";
            r.noSearchFound_do.getStyle().textRendering = "optimizeLegibility";
            r.noSearchFound_do.getStyle().fontFamily = "Arial";
            r.noSearchFound_do.getStyle().fontSize = "12px";
            r.noSearchFound_do.getStyle().color = r.searchInputColor_str;
            r.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
            r.noSearchFound_do.setVisible(false);
            r.mainHolder_do.addChild(r.noSearchFound_do);
            if (r.input_do.screen.addEventListener) {
                r.input_do.screen.addEventListener("focus", r.inputFocusInHandler);
                r.input_do.screen.addEventListener("blur", r.inputFocusOutHandler);
                r.input_do.screen.addEventListener("keyup", r.keyUpHandler)
            } else if (r.input_do.screen.attachEvent) {
                r.input_do.screen.attachEvent("onfocus", r.inputFocusInHandler);
                r.input_do.screen.attachEvent("onblur", r.inputFocusOutHandler);
                r.input_do.screen.attachEvent("onkeyup", r.keyUpHandler)
            }
            var i = new Image;
            i.src = t.inputArrowPath_str;
            r.inputArrow_do = new FWDMSPDisplayObject("img");
            r.inputArrow_do.setScreen(i);
            r.inputArrow_do.setWidth(14);
            r.inputArrow_do.setHeight(12);
            setTimeout(function() {
                var e = 1;
                r.input_do.setY(parseInt((r.titlebarHeight - r.input_do.getHeight()) / 2) + r.inputSearchTextOffsetTop)
            }, 50);
            r.mainSearchInput_do.addChild(r.titleBarLeft_do);
            r.mainSearchInput_do.addChild(r.titleBarRight_do);
            r.mainSearchInput_do.addChild(r.input_do);
            r.searchBar_do.addChild(r.inputArrow_do);
            r.searchBar_do.addChild(r.mainSearchInput_do)
        };
        this.inputFocusInHandler = function() {
            if (r.hasInputFocus_bl) return;
            r.hasInputFocus_bl = true;
            if (r.isSearchBarDisabled_bl) {
                r.input_do.screen.value == "Search will be available when all tracks data is loaded!"
            } else if (r.input_do.screen.value == "Search for track") {
                r.input_do.screen.value = ""
            }
        };
        this.inputFocusOutHandler = function(e) {
            if (!r.hasInputFocus_bl) return;
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            if (!FWDMSPUtils.hitTest(r.input_do.screen, t.screenX, t.screenY)) {
                r.hasInputFocus_bl = false;
                if (r.input_do.screen.value == "") {
                    r.input_do.screen.value = "Search for track"
                }
                return
            }
        };
        this.keyUpHandler = function(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (r.prevInputValue_str != r.input_do.screen.value) {
                if (r.isMobile_bl) {
                    r.positionList()
                } else {
                    r.positionList()
                }
            }
            r.prevInputValue_str = r.input_do.screen.value;
            if (r.scrHandler_do) {
                r.updateScrollBarSizeActiveAndDeactivate();
                r.updateScrollBarHandlerAndContent(false)
            }
        };
        this.showNothingFound = function() {
            if (r.isShowNothingFound_bl) return;
            r.isShowNothingFound_bl = true;
            r.noSearchFound_do.setVisible(true);
            r.noSearchFound_do.setY(parseInt((r.stageHeight - r.noSearchFound_do.getHeight() - r.searchBar_do.h) / 2));
            r.noSearchFound_do.setAlpha(0);
            FWDMSPTweenMax.to(r.noSearchFound_do, .1, {
                alpha: 1,
                yoyo: true,
                repeat: 4
            })
        };
        this.hideNothingFound = function() {
            if (!r.isShowNothingFound_bl) return;
            r.isShowNothingFound_bl = false;
            FWDMSPTweenMax.killTweensOf(r.noSearchFound_do);
            r.noSearchFound_do.setVisible(false)
        };
        this.setupButtons = function() {
            r.searchBarButtons_ar = [];
            FWDMSPSimpleButton.setPrototype();
            r.sortNButton_do = new FWDMSPSimpleButton(t.sortNN_img, t.sortNSPath_str, null, true);
            r.searchBarButtons_ar.push(r.sortNButton_do);
            r.sortNButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.sortNButtonShowTooltipHandler);
            r.sortNButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.sortNButtonOnMouseUpHandler);
            r.searchBar_do.addChild(r.sortNButton_do);
            r.sortNButton_do.setX(410);
            FWDMSPSimpleButton.setPrototype();
            r.sortAButton_do = new FWDMSPSimpleButton(t.sortAN_img, t.sortASPath_str, null, true);
            r.searchBarButtons_ar.push(r.sortAButton_do);
            r.sortAButton_do.addListener(FWDMSPSimpleButton.SHOW_TOOLTIP, r.sortAButtonShowTooltipHandler);
            r.sortAButton_do.addListener(FWDMSPSimpleButton.MOUSE_UP, r.sortAButtonOnMouseUpHandler);
            r.searchBar_do.addChild(r.sortAButton_do);
            r.sortAButton_do.setX(450);
            FWDMSPComplexButton.setPrototype();
            r.ascDscButton_do = new FWDMSPComplexButton(t.ascendingN_img, t.ascendingSpath_str, t.decendingN_img, t.decendingSpath_str, true);
            r.ascDscButton_do.setX(500);
            r.searchBarButtons_ar.push(r.ascDscButton_do);
            r.ascDscButton_do.addListener(FWDMSPComplexButton.SHOW_TOOLTIP, r.ascDscShowToolTipHandler);
            r.ascDscButton_do.addListener(FWDMSPComplexButton.MOUSE_UP, r.ascDscMouseUpHandler);
            r.searchBar_do.addChild(r.ascDscButton_do);
            if (r.isSortedNumerical_bl) {
                r.disableSortNButton()
            } else {
                r.disableSortAButton()
            }
        };
        this.ascDscShowToolTipHandler = function(e) {
            r.showToolTip(r.ascDscButton_do, r.ascDscButtonToolTip_do, e.e)
        };
        this.ascDscMouseUpHandler = function() {
            if (r.srotAscending_bl) {
                r.ascDscButton_do.setButtonState(0);
                r.srotAscending_bl = false
            } else {
                r.ascDscButton_do.setButtonState(1);
                r.srotAscending_bl = true
            }
            r.sortList()
        };
        this.sortAButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.sortAButton_do, r.sortAButtonToolTip_do, e.e)
        };
        this.sortAButtonOnMouseUpHandler = function() {
            r.disableSortAButton();
            r.sortList()
        };
        this.sortNButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.sortNButton_do, r.sortNButtonToolTip_do, e.e)
        };
        this.sortNButtonOnMouseUpHandler = function() {
            r.disableSortNButton();
            r.sortList()
        };
        this.disableSortAButton = function() {
            r.sortAButton_do.disableForGood();
            r.sortAButton_do.setSelectedState();
            r.sortNButton_do.enableForGood();
            r.sortNButton_do.setNormalState();
            r.isSortedNumerical_bl = false
        };
        this.disableSortNButton = function() {
            r.sortNButton_do.disableForGood();
            r.sortNButton_do.setSelectedState();
            r.sortAButton_do.enableForGood();
            r.sortAButton_do.setNormalState();
            r.isSortedNumerical_bl = true
        };
        this.sortList = function() {
            if (r.isSortedNumerical_bl) {
                r.items_ar.sort(function(e, t) {
                    if (e.id < t.id) return -1;
                    if (e.id > t.id) return 1;
                    return 0
                })
            } else {
                r.items_ar.sort(function(e, t) {
                    if (e.titleText_str < t.titleText_str) return -1;
                    if (e.titleText_str > t.titleText_str) return 1;
                    return 0
                })
            }
            if (!r.srotAscending_bl) r.items_ar.reverse();
            for (var e = 0; e < r.items_ar.length; e++) {
                r.items_ar[e].sortId = e
            }
            r.positionList();
            r.updateScrollBarHandlerAndContent(false)
        };
        r.positionSearchBar = function() {
            var e = 0;
            var t;
            inputWidth = r.stageWidth - r.startSpaceBetweenButtons * 2 - r.inputArrow_do.w - 12;
            if (inputWidth > 430) inputWidth = 430;
            if (r.showSortButtons_bl) {
                for (var n = r.searchBarButtons_ar.length - 1; n >= 0; n--) {
                    t = r.searchBarButtons_ar[n];
                    if (n == r.searchBarButtons_ar.length - 1) {
                        t.setX(r.stageWidth - t.w - r.startSpaceBetweenButtons)
                    } else {
                        t.setX(r.searchBarButtons_ar[n + 1].x - t.w - r.spaceBetweenButtons)
                    }
                    t.setY(r.searchSeparator_do.h + parseInt((r.searchBar_do.h - r.searchSeparator_do.h - t.h) / 2));
                    e += t.w + r.spaceBetweenButtons
                }
            }
            e += r.startSpaceBetweenButtons;
            inputWidth -= e;
            r.mainSearchInput_do.setWidth(inputWidth);
            r.input_do.setWidth(inputWidth);
            r.mainSearchInput_do.setX(r.startSpaceBetweenButtons + r.inputSearchOffsetLeft);
            r.mainSearchInput_do.setY(parseInt(r.searchSeparator_do.h + parseInt((r.searchBar_do.h - r.searchSeparator_do.h - r.mainSearchInput_do.h) / 2)));
            r.titleBarRight_do.setX(r.mainSearchInput_do.w - r.titleBarRight_do.w);
            r.inputArrow_do.setX(parseInt(r.mainSearchInput_do.x + inputWidth) + 4);
            r.inputArrow_do.setY(r.searchSeparator_do.h + parseInt((r.searchBar_do.h - r.searchSeparator_do.h - r.inputArrow_do.h) / 2));
            r.searchSeparator_do.setWidth(r.stageWidth);
            r.searchBar_do.setWidth(r.stageWidth);
            r.searchBar_do.setY(r.stageHeight - r.searchSeparator_do.h - r.searchBar_do.h)
        };
        this.setupToolTips = function() {
            FWDMSPToolTip.setPrototype();
            r.sortNButtonToolTip_do = new FWDMSPToolTip(r.sortNButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "numeric sort", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.sortNButtonToolTip_do.screen);
            FWDMSPToolTip.setPrototype();
            r.sortAButtonToolTip_do = new FWDMSPToolTip(r.sortAButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "alphabetic sort", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.sortAButtonToolTip_do.screen);
            FWDMSPToolTip.setPrototype();
            r.ascDscButtonToolTip_do = new FWDMSPToolTip(r.ascDscButton_do, t.toopTipBk_str, t.toopTipPointer_str, t.toopTipPointerUp_str, "ascending / decending sort", r.toolTipsButtonFontColor_str, r.toolTipsButtonsHideDelay);
            document.documentElement.appendChild(r.ascDscButtonToolTip_do.screen)
        };
        this.showToolTip = function(e, t, n) {
            if (!r.showButtonsToolTips_bl) return;
            var i = FWDMSPUtils.getViewportSize();
            var s = FWDMSPUtils.getViewportMouseCoordinates(n);
            var o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2);
            var u = parseInt(e.getGlobalY() - t.h - 6);
            var a = 0;
            if (o < 0) {
                a = o;
                o = 0
            } else if (o + t.w > i.w) {
                a = (i.w - (o + t.w)) * -1;
                o = o + a * -1
            }
            if (u < 0) {
                u += e.h + t.h + 12;
                t.positionPointer(a, true)
            } else {
                t.positionPointer(a, false)
            }
            t.setX(o);
            t.setY(u);
            t.show()
        };
        this.setupDisable = function() {
            r.disable_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isIE) {
                r.disable_do.setBkColor("#FFFFFF");
                r.disable_do.setAlpha(0)
            }
            r.addChild(r.disable_do)
        };
        this.showDisable = function() {
            if (!r.disable_do || r.disable_do.w != 0) return;
            if (r.scrMainHolder_do) {
                r.disable_do.setWidth(r.stageWidth - r.scrollbarOffestWidth);
                r.disable_do.setHeight(r.stageHeight)
            } else {
                r.disable_do.setWidth(r.stageWidth);
                r.disable_do.setHeight(r.stageHeight)
            }
        };
        this.hideDisable = function() {
            if (!r.disable_do || r.disable_do.w == 0) return;
            r.disable_do.setWidth(0);
            r.disable_do.setHeight(0)
        };
        this.setupSeparator = function() {
            r.separator_do = new FWDMSPDisplayObject("div");
            r.separator_do.setBackfaceVisibility();
            r.separator_do.hasTransform3d_bl = false;
            r.separator_do.hasTransform2d_bl = false;
            r.separator_do.getStyle().background = "url('" + r.playlistSeparator_img.src + "')";
            r.separator_do.setHeight(r.playlistSeparator_img.height);
            r.separator_do.setY(-r.separator_do.h)
        };
        this.setupScrollbar = function() {
            r.scrMainHolder_do = new FWDMSPDisplayObject("div");
            r.scrMainHolder_do.setWidth(r.scrWidth);
            r.scrTrack_do = new FWDMSPDisplayObject("div");
            r.scrTrack_do.setWidth(r.scrWidth);
            r.scrTrackTop_do = new FWDMSPDisplayObject("img");
            r.scrTrackTop_do.setScreen(r.playlistScrBkTop_img);
            r.scrTrackMiddle_do = new FWDMSPDisplayObject("div");
            r.scrTrackMiddle_do.getStyle().background = "url('" + t.scrBkMiddlePath_str + "')";
            r.scrTrackMiddle_do.setWidth(r.scrWidth);
            r.scrTrackMiddle_do.setY(r.scrTrackTop_do.h);
            var e = new Image;
            e.src = t.scrBkBottomPath_str;
            r.scrTrackBottom_do = new FWDMSPDisplayObject("img");
            r.scrTrackBottom_do.setScreen(e);
            r.scrTrackBottom_do.setWidth(r.scrTrackTop_do.w);
            r.scrTrackBottom_do.setHeight(r.scrTrackTop_do.h);
            r.scrHandler_do = new FWDMSPDisplayObject("div");
            r.scrHandler_do.setWidth(r.scrWidth);
            r.scrHandlerTop_do = new FWDMSPDisplayObject("img");
            r.scrHandlerTop_do.setScreen(r.playlistScrDragTop_img);
            r.scrHandlerMiddle_do = new FWDMSPDisplayObject("div");
            r.scrHandlerMiddle_do.getStyle().background = "url('" + t.scrDragMiddlePath_str + "')";
            r.scrHandlerMiddle_do.setWidth(r.scrWidth);
            r.scrHandlerMiddle_do.setY(r.scrHandlerTop_do.h);
            var n = new Image;
            n.src = t.scrDragBottomPath_str;
            r.scrHandlerBottom_do = new FWDMSPDisplayObject("img");
            r.scrHandlerBottom_do.setScreen(n);
            r.scrHandlerBottom_do.setWidth(r.scrHandlerTop_do.w);
            r.scrHandlerBottom_do.setHeight(r.scrHandlerTop_do.h);
            r.scrHandler_do.setButtonMode(true);
            r.scrHandlerLinesN_do = new FWDMSPDisplayObject("img");
            r.scrHandlerLinesN_do.setScreen(r.playlistScrLines_img);
            var i = new Image;
            i.src = t.scrLinesSPath_str;
            r.scrHandlerLinesS_do = new FWDMSPDisplayObject("img");
            r.scrHandlerLinesS_do.setScreen(i);
            r.scrHandlerLinesS_do.setWidth(r.scrHandlerLinesN_do.w);
            r.scrHandlerLinesS_do.setHeight(r.scrHandlerLinesN_do.h);
            r.scrHandlerLinesS_do.setAlpha(0);
            r.scrHandlerLines_do = new FWDMSPDisplayObject("div");
            r.scrHandlerLines_do.hasTransform3d_bl = false;
            r.scrHandlerLines_do.hasTransform2d_bl = false;
            r.scrHandlerLines_do.setBackfaceVisibility();
            r.scrHandlerLines_do.setWidth(r.scrHandlerLinesN_do.w);
            r.scrHandlerLines_do.setHeight(r.scrHandlerLinesN_do.h);
            r.scrHandlerLines_do.setButtonMode(true);
            r.scrTrack_do.addChild(r.scrTrackTop_do);
            r.scrTrack_do.addChild(r.scrTrackMiddle_do);
            r.scrTrack_do.addChild(r.scrTrackBottom_do);
            r.scrHandler_do.addChild(r.scrHandlerTop_do);
            r.scrHandler_do.addChild(r.scrHandlerMiddle_do);
            r.scrHandler_do.addChild(r.scrHandlerBottom_do);
            r.scrHandlerLines_do.addChild(r.scrHandlerLinesN_do);
            r.scrHandlerLines_do.addChild(r.scrHandlerLinesS_do);
            r.scrMainHolder_do.addChild(r.scrTrack_do);
            r.scrMainHolder_do.addChild(r.scrHandler_do);
            r.scrMainHolder_do.addChild(r.scrHandlerLines_do);
            r.mainHolder_do.addChild(r.scrMainHolder_do);
            if (r.scrHandler_do.screen.addEventListener) {
                r.scrHandler_do.screen.addEventListener("mouseover", r.scrollBarHandlerOnMouseOver);
                r.scrHandler_do.screen.addEventListener("mouseout", r.scrollBarHandlerOnMouseOut);
                r.scrHandler_do.screen.addEventListener("mousedown", r.scrollBarHandlerOnMouseDown);
                r.scrHandlerLines_do.screen.addEventListener("mouseover", r.scrollBarHandlerOnMouseOver);
                r.scrHandlerLines_do.screen.addEventListener("mouseout", r.scrollBarHandlerOnMouseOut);
                r.scrHandlerLines_do.screen.addEventListener("mousedown", r.scrollBarHandlerOnMouseDown)
            } else if (r.scrHandler_do.screen.attachEvent) {
                r.scrHandler_do.screen.attachEvent("onmouseover", r.scrollBarHandlerOnMouseOver);
                r.scrHandler_do.screen.attachEvent("onmouseout", r.scrollBarHandlerOnMouseOut);
                r.scrHandler_do.screen.attachEvent("onmousedown", r.scrollBarHandlerOnMouseDown);
                r.scrHandlerLines_do.screen.attachEvent("onmouseover", r.scrollBarHandlerOnMouseOver);
                r.scrHandlerLines_do.screen.attachEvent("onmouseout", r.scrollBarHandlerOnMouseOut);
                r.scrHandlerLines_do.screen.attachEvent("onmousedown", r.scrollBarHandlerOnMouseDown)
            }
        };
        this.scrollBarHandlerOnMouseOver = function(e) {
            FWDMSPTweenMax.to(r.scrHandlerLinesS_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.scrollBarHandlerOnMouseOut = function(e) {
            if (r.isDragging_bl) return;
            FWDMSPTweenMax.to(r.scrHandlerLinesS_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.scrollBarHandlerOnMouseDown = function(e) {
            if (!r.allowToScrollAndScrollBarIsActive_bl) return;
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            r.isDragging_bl = true;
            r.yPositionOnPress = r.scrHandler_do.y;
            r.lastPresedY = t.screenY;
            FWDMSPTweenMax.killTweensOf(r.scrHandler_do);
            r.showDisable();
            if (window.addEventListener) {
                window.addEventListener("mousemove", r.scrollBarHandlerMoveHandler);
                window.addEventListener("mouseup", r.scrollBarHandlerEndHandler)
            } else if (document.attachEvent) {
                document.attachEvent("onmousemove", r.scrollBarHandlerMoveHandler);
                document.attachEvent("onmouseup", r.scrollBarHandlerEndHandler)
            }
        };
        this.scrollBarHandlerMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            r.scrollBarHandlerFinalY = Math.round(r.yPositionOnPress + t.screenY - r.lastPresedY);
            if (r.scrollBarHandlerFinalY >= r.scrTrack_do.h - r.scrHandler_do.h) {
                r.scrollBarHandlerFinalY = r.scrTrack_do.h - r.scrHandler_do.h
            } else if (r.scrollBarHandlerFinalY <= 0) {
                r.scrollBarHandlerFinalY = 0
            }
            r.scrHandler_do.setY(r.scrollBarHandlerFinalY);
            FWDMSPTweenMax.to(r.scrHandlerLines_do, .8, {
                y: r.scrollBarHandlerFinalY + parseInt((r.scrHandler_do.h - r.scrHandlerLines_do.h) / 2),
                ease: Quart.easeOut
            });
            r.updateScrollBarHandlerAndContent(true)
        };
        r.scrollBarHandlerEndHandler = function(e) {
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            r.isDragging_bl = false;
            if (!FWDMSPUtils.hitTest(r.scrHandler_do.screen, t.screenX, t.screenY)) {
                FWDMSPTweenMax.to(r.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })
            }
            r.scrollBarHandlerFinalY = Math.round((r.scrMainHolder_do.h - r.scrHandler_do.h) * (r.playListFinalY / ((r.totalSearchedItems - r.nrOfVisiblePlaylistItems) * r.itemHeight))) * -1;
            if (r.scrollBarHandlerFinalY.y < 0) {
                r.scrollBarHandlerFinalY = 0
            } else if (r.scrollBarHandlerFinalY > r.scrTrack_do.h - r.scrHandler_do.h - 1) {
                r.scrollBarHandlerFinalY = r.scrTrack_do.h - r.scrHandler_do.h - 1
            }
            r.hideDisable();
            FWDMSPTweenMax.killTweensOf(r.scrHandler_do);
            FWDMSPTweenMax.to(r.scrHandler_do, .5, {
                y: r.scrollBarHandlerFinalY,
                ease: Quart.easeOut
            });
            if (window.removeEventListener) {
                window.removeEventListener("mousemove", r.scrollBarHandlerMoveHandler);
                window.removeEventListener("mouseup", r.scrollBarHandlerEndHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", r.scrollBarHandlerMoveHandler);
                document.detachEvent("onmouseup", r.scrollBarHandlerEndHandler)
            }
        };
        this.updateScrollBarSizeActiveAndDeactivate = function() {
            if (r.allowToScrollAndScrollBarIsActive_bl) {
                var e = 0;
                r.allowToScrollAndScrollBarIsActive_bl = true;
                if (r.searchBar_do) {
                    e = r.searchBar_do.h
                }
                r.scrMainHolder_do.setHeight(r.stageHeight - r.separator_do.h - e);
                r.scrTrack_do.setHeight(r.stageHeight - r.separator_do.h - e);
                r.scrTrackMiddle_do.setHeight(r.scrTrack_do.h - r.scrTrackTop_do.h * 2);
                r.scrTrackBottom_do.setY(r.scrTrackMiddle_do.y + r.scrTrackMiddle_do.h);
                r.scrHandler_do.setHeight(Math.min(r.stageHeight - r.separator_do.h - e, Math.round((r.stageHeight - r.separator_do.h - e) / r.itemsTotalHeight * r.stageHeight)));
                r.scrHandlerMiddle_do.setHeight(r.scrHandler_do.h - r.scrHandlerTop_do.h * 2);
                r.scrHandlerTop_do.setY(r.scrHandlerMiddle_do.y + r.scrHandlerMiddle_do.h);
                r.scrMainHolder_do.setX(r.stageWidth - r.scrWidth)
            } else {
                r.allowToScrollAndScrollBarIsActive_bl = false;
                r.scrMainHolder_do.setX(-500);
                r.scrHandler_do.setY(0)
            }
        };
        this.updateScrollBarHandlerAndContent = function(e) {
            if (r.curItem_do) r.sortId = r.curItem_do.sortId;
            var t = 0;
            var n = 0;
            if (r.isDragging_bl && !r.isMobile_bl) {
                t = r.scrHandler_do.y / (r.scrMainHolder_do.h - r.scrHandler_do.h);
                if (t == "Infinity") {
                    t = 0
                } else if (t >= 1) {
                    scrollPercent = 1
                }
                r.playListFinalY = Math.round(t * (r.totalSearchedItems - r.nrOfVisiblePlaylistItems)) * r.itemHeight * -1
            } else {
                if (r.totalSearchedItems != r.totalPlayListItems) {
                    n = 0
                } else {
                    n = parseInt(r.sortId / r.nrOfVisiblePlaylistItems) * r.nrOfVisiblePlaylistItems
                }
                if (n + r.nrOfVisiblePlaylistItems >= r.totalPlayListItems) {
                    n = r.totalPlayListItems - r.nrOfVisiblePlaylistItems
                }
                if (n < 0) n = 0;
                r.playListFinalY = n * r.itemHeight * -1;
                if (r.scrMainHolder_do) {
                    r.scrollBarHandlerFinalY = Math.round((r.scrMainHolder_do.h - r.scrHandler_do.h) * (r.playListFinalY / ((r.totalSearchedItems - r.nrOfVisiblePlaylistItems) * r.itemHeight))) * -1;
                    if (r.scrollBarHandlerFinalY < 0) {
                        r.scrollBarHandlerFinalY = 0
                    } else if (r.scrollBarHandlerFinalY > r.scrMainHolder_do.h - r.scrHandler_do.h - 1) {
                        r.scrollBarHandlerFinalY = r.scrMainHolder_do.h - r.scrHandler_do.h - 1
                    }
                    FWDMSPTweenMax.killTweensOf(r.scrHandler_do);
                    FWDMSPTweenMax.killTweensOf(r.scrHandlerLines_do);
                    if (e) {
                        FWDMSPTweenMax.to(r.scrHandler_do, .5, {
                            y: r.scrollBarHandlerFinalY,
                            ease: Quart.easeOut
                        });
                        FWDMSPTweenMax.to(r.scrHandlerLines_do, .8, {
                            y: r.scrollBarHandlerFinalY + parseInt((r.scrHandler_do.h - r.scrHandlerLinesN_do.h) / 2),
                            ease: Quart.easeOut
                        })
                    } else {
                        r.scrHandler_do.setY(r.scrollBarHandlerFinalY);
                        r.scrHandlerLines_do.setY(r.scrollBarHandlerFinalY + parseInt((r.scrHandler_do.h - r.scrHandlerLinesN_do.h) / 2))
                    }
                }
            }
            if (r.lastListY != r.playListFinalY) {
                FWDMSPTweenMax.killTweensOf(r.itemsHolder_do);
                if (e) {
                    FWDMSPTweenMax.to(r.itemsHolder_do, .5, {
                        y: r.playListFinalY,
                        ease: Quart.easeOut
                    })
                } else {
                    r.itemsHolder_do.setY(r.playListFinalY)
                }
            }
            r.lastListY = r.playListFinalY
        };
        this.addMouseWheelSupport = function() {
            if (window.addEventListener) {
                r.screen.addEventListener("mousewheel", r.mouseWheelHandler);
                r.screen.addEventListener("DOMMouseScroll", r.mouseWheelHandler)
            } else if (document.attachEvent) {
                r.screen.attachEvent("onmousewheel", r.mouseWheelHandler)
            }
        };
        this.mouseWheelHandler = function(e) {
            if (!r.allowToScrollAndScrollBarIsActive_bl || r.isDragging_bl) return;
            var t = e.detail || e.wheelDelta;
            if (e.wheelDelta) t *= -1;
            if (FWDMSPUtils.isOpera) t *= -1;
            if (t > 0) {
                r.playListFinalY -= r.itemHeight
            } else {
                r.playListFinalY += r.itemHeight
            }
            leftId = parseInt(r.playListFinalY / r.itemHeight);
            if (leftId >= 0) {
                leftId = 0
            } else if (Math.abs(leftId) + r.nrOfVisiblePlaylistItems >= r.totalSearchedItems) {
                leftId = (r.totalSearchedItems - r.nrOfVisiblePlaylistItems) * -1
            }
            r.playListFinalY = leftId * r.itemHeight;
            if (r.lastListY == r.playListFinalY) return;
            r.scrollBarHandlerFinalY = Math.round((r.scrMainHolder_do.h - r.scrHandler_do.h) * (r.playListFinalY / ((r.totalSearchedItems - r.nrOfVisiblePlaylistItems) * r.itemHeight))) * -1;
            if (r.scrollBarHandlerFinalY < 0) {
                r.scrollBarHandlerFinalY = 0
            } else if (r.scrollBarHandlerFinalY > r.scrMainHolder_do.h - r.scrHandler_do.h - 1) {
                r.scrollBarHandlerFinalY = r.scrMainHolder_do.h - r.scrHandler_do.h - 1
            }
            FWDMSPTweenMax.killTweensOf(r.itemsHolder_do);
            FWDMSPTweenMax.to(r.itemsHolder_do, .5, {
                y: r.playListFinalY,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.killTweensOf(r.scrHandler_do);
            FWDMSPTweenMax.to(r.scrHandler_do, .5, {
                y: r.scrollBarHandlerFinalY,
                ease: Expo.easeOut
            });
            FWDMSPTweenMax.to(r.scrHandlerLines_do, .8, {
                y: r.scrollBarHandlerFinalY + parseInt((r.scrHandler_do.h - r.scrHandlerLinesN_do.h) / 2),
                ease: Quart.easeOut
            });
            r.lastListY = r.playListFinalY;
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
            return
        };
        r.setupMobileScrollbar = function() {
            if (r.hasPointerEvent_bl) {
                r.screen.addEventListener("MSPointerDown", r.scrollBarTouchStartHandler)
            } else {
                r.screen.addEventListener("touchstart", r.scrollBarTouchStartHandler)
            }
            r.updateMobileScrollBarId_int = setInterval(r.updateMobileScrollBar, 16)
        };
        r.scrollBarTouchStartHandler = function(e) {
            if (r.stageHeight > r.itemsTotalHeight) return;
            FWDMSPTweenMax.killTweensOf(r.itemsHolder_do);
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            r.isDragging_bl = true;
            r.lastPresedY = t.screenY;
            if (r.hasPointerEvent_bl) {
                window.addEventListener("MSPointerUp", r.scrollBarTouchEndHandler);
                window.addEventListener("MSPointerMove", r.scrollBarTouchMoveHandler)
            } else {
                window.addEventListener("touchend", r.scrollBarTouchEndHandler);
                window.addEventListener("touchmove", r.scrollBarTouchMoveHandler)
            }
            clearInterval(r.updateMoveMobileScrollbarId_int);
            r.updateMoveMobileScrollbarId_int = setInterval(r.updateMoveMobileScrollbar, 20)
        };
        r.scrollBarTouchMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            r.showDisable();
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            var n = t.screenY - r.lastPresedY;
            r.playListFinalY += n;
            r.playListFinalY = Math.round(r.playListFinalY);
            r.lastPresedY = t.screenY;
            r.vy = n * 2
        };
        r.scrollBarTouchEndHandler = function(e) {
            r.isDragging_bl = false;
            clearInterval(r.updateMoveMobileScrollbarId_int);
            clearTimeout(r.disableOnMoveId_to);
            r.disableOnMoveId_to = setTimeout(function() {
                r.hideDisable()
            }, 50);
            if (r.hasPointerEvent_bl) {
                window.removeEventListener("MSPointerUp", r.scrollBarTouchEndHandler);
                window.removeEventListener("MSPointerMove", r.scrollBarTouchMoveHandler)
            } else {
                window.removeEventListener("touchend", r.scrollBarTouchEndHandler);
                window.removeEventListener("touchmove", r.scrollBarTouchMoveHandler)
            }
        };
        r.updateMoveMobileScrollbar = function() {
            r.itemsHolder_do.setY(r.playListFinalY)
        };
        r.updateMobileScrollBar = function(e) {
            if (!r.isDragging_bl && !FWDMSPTweenMax.isTweening(r.itemsHolder_do)) {
                r.vy *= r.friction;
                r.playListFinalY += r.vy;
                if (r.playListFinalY > 0) {
                    r.vy2 = (0 - r.playListFinalY) * .3;
                    r.vy *= r.friction;
                    r.playListFinalY += r.vy2
                } else if (r.playListFinalY < r.stageHeight - r.separator_do.h - r.itemsTotalHeight - r.searchBar_do.h) {
                    r.vy2 = (r.stageHeight - r.separator_do.h - r.itemsTotalHeight - r.searchBar_do.h - r.playListFinalY) * .3;
                    r.vy *= r.friction;
                    r.playListFinalY += r.vy2
                }
                if (r.stageHeight > r.itemsTotalHeight) r.playListFinalY = 0;
                r.itemsHolder_do.setY(Math.round(r.playListFinalY))
            }
        };
        this.hide = function() {
            r.isShowed_bl = false
        };
        this.show = function(e) {
            if (e) r.isShowed_bl = true;
            r.setX(0)
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.PLAY = "play";
    e.PAUSE = "pause";
    e.UPDATE_TRACK_TITLE_if_FOLDER = "update_trak_title";
    e.prototype = null;
    window.FWDMSPPlaylist = e
})();
(function() {
    var e = function(t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A) {
        var O = this;
        var M = e.prototype;
        this.playlistItemGrad1_img = u;
        this.playlistItemGrad2_img = a;
        this.playlistItemProgress_img = f;
        this.playlistItemProgress2_img = l;
        this.playlistPlayButtonN_img = c;
        this.playlistDownloadButtonN_img = r;
        this.playlistDownloadButtonS_str = i;
        this.playlistBuyButtonN_img = s;
        this.playlistBuyButtonS_str = o;
        this.progress_do = null;
        this.playPause_do = null;
        this.playN_do = null;
        this.playS_do = null;
        this.pauseN_do = null;
        this.pauseS_do = null;
        this.titleText_do = null;
        this.grad_do = null;
        this.durationText_do = null;
        this.dumy_do = null;
        this.title_str = t;
        this.titleText_str = n;
        this.playlistItemBk1Path_str = h;
        this.playlistItemBk2Path_str = p;
        this.playlistPlayButtonN_str = d;
        this.playlistPlayButtonS_str = v;
        this.playlistPauseButtonN_str = m;
        this.playlistPauseButtonS_str = g;
        this.titleNormalColor_str = y;
        this.trackTitleSelected_str = b;
        this.durationColor_str = w;
        this.itemHeight = O.playlistItemGrad1_img.height;
        this.id = E;
        this.sortId = E;
        this.playPauseButtonOffsetLeftAndRight = S;
        this.trackTitleOffsetLeft = x;
        this.duration = A;
        this.durationOffsetRight = T;
        this.textHeight;
        this.durationWidth = 0;
        this.titleWidth = 0;
        this.playPauseButtonWidth = O.playlistPlayButtonN_img.width;
        this.playPauseButtonHeight = O.playlistPlayButtonN_img.height;
        this.progressPercent = 0;
        this.stageWidth = 0;
        this.downloadButtonOffsetRight = N;
        this.setTextsSizeId_to;
        this.showDownloadButton_bl = k;
        this.showBuyButton_bl = L;
        this.showPlayPauseButton_bl = C;
        this.showDuration_bl = A;
        this.isActive_bl = false;
        this.isSelected_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        O.init = function() {
            O.setupProgress();
            O.setupTitle();
            if (O.showPlayPauseButton_bl) O.setupPlayPauseButton();
            O.setupGrad();
            if (O.showDuration_bl) O.setupDuration();
            O.setNormalState(false, true);
            O.setupDumy();
            if (O.showDownloadButton_bl) O.setupDownloadButton();
            if (O.showBuyButton_bl) O.setupBuyButton();
            if (O.id % 2 == 0) {
                O.getStyle().background = "url('" + O.playlistItemBk1Path_str + "')";
                O.grad_do.getStyle().background = "url('" + O.playlistItemGrad1_img.src + "')";
                O.progress_do.getStyle().background = "url('" + O.playlistItemProgress_img.src + "')";
                O.type = 1
            } else {
                O.getStyle().background = "url('" + O.playlistItemBk2Path_str + "')";
                O.grad_do.getStyle().background = "url('" + O.playlistItemGrad2_img.src + "')";
                O.progress_do.getStyle().background = "url('" + O.playlistItemProgress2_img.src + "')";
                O.type = 2
            }
            if (O.isMobile_bl) {
                if (O.hasPointerEvent_bl) {
                    O.dumy_do.screen.addEventListener("MSPointerUp", O.onMouseUp);
                    O.dumy_do.screen.addEventListener("MSPointerOver", O.onMouseOver);
                    O.dumy_do.screen.addEventListener("MSPointerOut", O.onMouseOut)
                } else {
                    O.dumy_do.screen.addEventListener("mouseup", O.onMouseUp)
                }
            } else if (O.dumy_do.screen.addEventListener) {
                O.dumy_do.screen.addEventListener("mouseover", O.onMouseOver);
                O.dumy_do.screen.addEventListener("mouseout", O.onMouseOut);
                O.dumy_do.screen.addEventListener("mouseup", O.onMouseUp)
            } else if (O.screen.attachEvent) {
                O.dumy_do.screen.attachEvent("onmouseover", O.onMouseOver);
                O.dumy_do.screen.attachEvent("onmouseout", O.onMouseOut);
                O.dumy_do.screen.attachEvent("onmouseup", O.onMouseUp)
            }
        };
        O.onMouseOver = function(e, t) {
            if (O.isActive_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                O.setSelectedState(true)
            }
        };
        O.onMouseOut = function(e) {
            if (O.isActive_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                O.setNormalState(true)
            }
        };
        O.onMouseUp = function(t) {
            if (t.button == 2) return;
            if (t.preventDefault) t.preventDefault();
            O.dispatchEvent(e.MOUSE_UP, {
                id: O.id
            })
        };
        O.changeSource = function(e) {
            if (e == 0) {
                if (O.type != 1) {
                    O.grad_do.getStyle().background = "url('" + O.playlistItemGrad1_img.src + "')";
                    O.getStyle().background = "url('" + O.playlistItemBk1Path_str + "')";
                    O.progress_do.getStyle().background = "url('" + O.playlistItemProgress_img.src + "')";
                    O.type = 1
                }
            } else {
                if (O.type != 2) {
                    O.grad_do.getStyle().background = "url('" + O.playlistItemGrad2_img.src + "')";
                    O.getStyle().background = "url('" + O.playlistItemBk2Path_str + "')";
                    O.progress_do.getStyle().background = "url('" + O.playlistItemProgress2_img.src + "')";
                    O.type = 2
                }
            }
        };
        O.resize = function(e, t) {
            if (FWDMSPUtils.isIEAndLessThen9 && !O.textHeight || O == null) return;
            O.stageWidth = e;
            var n = 0;
            var r = parseInt((t - O.textHeight) / 2) + 1;
            if (O.playPause_do) {
                O.titleText_do.setX(O.playPauseButtonOffsetLeftAndRight * 2 + O.playPause_do.w + O.trackTitleOffsetLeft);
                O.playPause_do.setY(parseInt((t - O.playPause_do.h) / 2))
            } else {
                O.titleText_do.setX(O.trackTitleOffsetLeft)
            }
            O.titleText_do.setY(r);
            if (O.buyButton_do && O.downloadButton_do) {
                if (O.durationText_do) {
                    O.durationText_do.setX(e - O.durationWidth - O.durationOffsetRight + 1);
                    O.durationText_do.setY(r);
                    n = O.durationText_do.x
                } else {
                    n = e
                }
                O.downloadButton_do.setX(n - O.downloadButton_do.w - O.downloadButtonOffsetRight + 3);
                O.downloadButton_do.setY(parseInt((t - O.downloadButton_do.h) / 2));
                O.buyButton_do.setX(O.downloadButton_do.x - O.buyButton_do.w - 4);
                O.buyButton_do.setY(parseInt((t - O.buyButton_do.h) / 2));
                if (O.titleText_do.x + O.titleWidth + O.downloadButton_do.w + O.buyButton_do.w + O.downloadButtonOffsetRight + 4 > n) {
                    O.grad_do.setX(O.buyButton_do.x - O.downloadButtonOffsetRight + 2)
                } else {
                    O.grad_do.setX(-300)
                }
            } else if (O.downloadButton_do) {
                if (O.durationText_do) {
                    O.durationText_do.setX(e - O.durationWidth - O.durationOffsetRight + 1);
                    O.durationText_do.setY(r);
                    n = O.durationText_do.x
                } else {
                    n = e
                }
                O.downloadButton_do.setX(n - O.downloadButton_do.w - O.downloadButtonOffsetRight + 3);
                O.downloadButton_do.setY(parseInt((t - O.downloadButton_do.h) / 2));
                if (O.titleText_do.x + O.titleWidth + O.downloadButton_do.w + O.downloadButtonOffsetRight > n) {
                    O.grad_do.setX(O.downloadButton_do.x - O.downloadButtonOffsetRight + 2)
                } else {
                    O.grad_do.setX(-300)
                }
            } else if (O.buyButton_do) {
                if (O.durationText_do) {
                    O.durationText_do.setX(e - O.durationWidth - O.durationOffsetRight + 1);
                    O.durationText_do.setY(r);
                    n = O.durationText_do.x
                } else {
                    n = e
                }
                O.buyButton_do.setX(n - O.buyButton_do.w - O.downloadButtonOffsetRight + 3);
                O.buyButton_do.setY(parseInt((t - O.buyButton_do.h) / 2));
                if (O.titleText_do.x + O.titleWidth + O.buyButton_do.w + O.downloadButtonOffsetRight > n) {
                    O.grad_do.setX(O.buyButton_do.x - O.downloadButtonOffsetRight + 2)
                } else {
                    O.grad_do.setX(-300)
                }
            } else if (O.durationText_do) {
                O.durationText_do.setX(e - O.durationWidth - O.durationOffsetRight + 1);
                O.durationText_do.setY(r);
                if (O.titleText_do.x + O.titleWidth > O.durationText_do.x) {
                    O.grad_do.setX(O.durationText_do.x - O.durationOffsetRight + 2)
                } else {
                    O.grad_do.setX(-300)
                }
            } else if (O.downloadButton_do) {
                O.downloadButton_do.setX(e - O.downloadButton_do.w - O.downloadButtonOffsetRight + 2);
                if (O.titleText_do.x + O.titleWidth > O.downloadButton_do.x) {
                    O.grad_do.setX(O.downloadButton_do.x - O.downloadButtonOffsetRight + 2)
                } else {
                    O.grad_do.setX(-300)
                }
                O.downloadButton_do.setY(parseInt((t - O.downloadButton_do.h) / 2))
            } else {
                if (O.titleText_do.x + O.titleWidth > e - 10) {
                    O.grad_do.setX(e - 15)
                } else {
                    O.grad_do.setX(-300)
                }
            }
            O.dumy_do.setWidth(e);
            O.dumy_do.setHeight(t);
            O.setWidth(e);
            O.setHeight(t)
        };
        this.setupDownloadButton = function() {
            FWDMSPSimpleSizeButton.setPrototype();
            O.downloadButton_do = new FWDMSPSimpleSizeButton(O.playlistDownloadButtonN_img, O.playlistDownloadButtonS_str, 18, 17);
            O.downloadButton_do.getStyle().position = "absolute";
            O.downloadButton_do.addListener(FWDMSPSimpleSizeButton.CLICK, O.dwButtonClickHandler);
            O.addChild(O.downloadButton_do)
        };
        this.dwButtonClickHandler = function() {
            O.dispatchEvent(e.DOWNLOAD, {
                id: O.id
            })
        };
        this.setupBuyButton = function() {
            FWDMSPSimpleSizeButton.setPrototype();
            O.buyButton_do = new FWDMSPSimpleSizeButton(O.playlistBuyButtonN_img, O.playlistBuyButtonS_str, 18, 17);
            O.buyButton_do.getStyle().position = "absolute";
            O.buyButton_do.addListener(FWDMSPSimpleSizeButton.CLICK, O.buyButtonClickHandler);
            O.addChild(O.buyButton_do)
        };
        this.buyButtonClickHandler = function() {
            O.dispatchEvent(e.BUY, {
                id: O.id
            })
        };
        this.setupProgress = function() {
            O.progress_do = new FWDMSPDisplayObject("div");
            O.progress_do.setBackfaceVisibility();
            O.progress_do.getStyle().background = "url('" + O.playlistItemProgress_img.src + "')";
            O.progress_do.setHeight(f.height);
            O.addChild(O.progress_do)
        };
        this.updateProgressPercent = function(e) {
            if (O == null) return;
            if (O.progressPercent == e) return;
            O.progressPercent = e;
            O.progress_do.setWidth(parseInt(O.stageWidth * e))
        };
        this.setupPlayPauseButton = function() {
            O.playPause_do = new FWDMSPDisplayObject("div");
            O.playPause_do.setWidth(O.playPauseButtonWidth);
            O.playPause_do.setHeight(O.playPauseButtonHeight);
            O.playN_do = new FWDMSPDisplayObject("div");
            O.playN_do.getStyle().background = "url('" + O.playlistPlayButtonN_str + "') no-repeat";
            O.playN_do.setWidth(O.playPauseButtonWidth);
            O.playN_do.setHeight(O.playPauseButtonHeight);
            O.playS_do = new FWDMSPDisplayObject("div");
            O.playS_do.getStyle().background = "url('" + O.playlistPlayButtonS_str + "') no-repeat";
            O.playS_do.setWidth(O.playPauseButtonWidth);
            O.playS_do.setHeight(O.playPauseButtonHeight);
            O.playS_do.setAlpha(0);
            O.pauseN_do = new FWDMSPDisplayObject("div");
            O.pauseN_do.getStyle().background = "url('" + O.playlistPauseButtonN_str + "') no-repeat";
            O.pauseN_do.setWidth(O.playPauseButtonWidth);
            O.pauseN_do.setHeight(O.playPauseButtonHeight);
            O.pauseN_do.setX(-300);
            O.pauseS_do = new FWDMSPDisplayObject("div");
            O.pauseS_do.getStyle().background = "url('" + O.playlistPauseButtonS_str + "') no-repeat";
            O.pauseS_do.setWidth(O.playPauseButtonWidth);
            O.pauseS_do.setHeight(O.playPauseButtonHeight);
            O.pauseS_do.setX(-300);
            O.pauseS_do.setAlpha(0);
            O.playPause_do.setX(O.playPauseButtonOffsetLeftAndRight);
            O.playPause_do.addChild(O.playN_do);
            O.playPause_do.addChild(O.playS_do);
            O.playPause_do.addChild(O.pauseN_do);
            O.playPause_do.addChild(O.pauseS_do);
            O.addChild(O.playPause_do)
        };
        this.setupTitle = function() {
            O.titleText_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isApple) {
                O.titleText_do.hasTransform3d_bl = false;
                O.titleText_do.hasTransform2d_bl = false
            }
            O.titleText_do.setOverflow("visible");
            O.titleText_do.setBackfaceVisibility();
            O.titleText_do.getStyle().fontFamily = "Arial";
            O.titleText_do.getStyle().fontSize = "12px";
            O.titleText_do.getStyle().whiteSpace = "nowrap";
            O.titleText_do.getStyle().textAlign = "left";
            O.titleText_do.getStyle().fontSmoothing = "antialiased";
            O.titleText_do.getStyle().webkitFontSmoothing = "antialiased";
            O.titleText_do.getStyle().textRendering = "optimizeLegibility";
            O.titleText_do.setInnerHTML(O.title_str);
            O.addChild(O.titleText_do)
        };
        this.updateTitle = function() {
            if (O == null) return;
            O.titleText_do.setInnerHTML(O.title_str)
        };
        this.setTextSizes = function(e) {
            if (O == null) return;
            if (O.textHeight && !e) return;
            O.titleWidth = O.titleText_do.screen.offsetWidth;
            O.textHeight = O.titleText_do.screen.offsetHeight;
            if (O.durationText_do) {
                O.durationWidth = O.durationText_do.screen.offsetWidth
            }
            O.grad_do.setWidth(150)
        };
        this.setupGrad = function() {
            O.grad_do = new FWDMSPDisplayObject("div");
            O.grad_do.setOverflow("visible");
            if (FWDMSPUtils.isApple) {
                O.grad_do.hasTransform3d_bl = false;
                O.grad_do.hasTransform2d_bl = false
            }
            O.grad_do.setBackfaceVisibility();
            O.grad_do.getStyle().background = "url('" + O.playlistItemGrad1_img.src + "')";
            O.grad_do.setHeight(O.itemHeight);
            O.addChild(O.grad_do)
        };
        this.setupDuration = function() {
            O.durationText_do = new FWDMSPDisplayObject("div");
            if (FWDMSPUtils.isApple) {
                O.durationText_do.hasTransform3d_bl = false;
                O.durationText_do.hasTransform2d_bl = false
            }
            O.durationText_do.setOverflow("visible");
            O.durationText_do.setBackfaceVisibility();
            O.durationText_do.getStyle().fontFamily = "Arial";
            O.durationText_do.getStyle().fontSize = "12px";
            O.durationText_do.getStyle().whiteSpace = "nowrap";
            O.durationText_do.getStyle().textAlign = "left";
            O.durationText_do.getStyle().color = O.titleColor_str;
            O.durationText_do.getStyle().fontSmoothing = "antialiased";
            O.durationText_do.getStyle().webkitFontSmoothing = "antialiased";
            O.durationText_do.getStyle().textRendering = "optimizeLegibility";
            O.durationText_do.getStyle().color = O.durationColor_str;
            O.durationText_do.setInnerHTML(O.duration);
            O.addChild(O.durationText_do)
        };
        this.setupDumy = function() {
            O.dumy_do = new FWDMSPDisplayObject("div");
            O.dumy_do.setButtonMode(true);
            if (FWDMSPUtils.isIE) {
                O.dumy_do.setBkColor("#FFFFFF");
                O.dumy_do.setAlpha(.001)
            }
            O.addChild(O.dumy_do)
        };
        this.setNormalState = function(e, t) {
            if (!O.isSelected_bl && !t) return;
            O.isSelected_bl = false;
            if (e) {
                FWDMSPTweenMax.to(O.titleText_do.screen, .8, {
                    css: {
                        color: O.titleNormalColor_str
                    },
                    ease: Expo.easeOut
                });
                if (O.durationText_do) {
                    FWDMSPTweenMax.to(O.durationText_do.screen, .8, {
                        css: {
                            color: O.durationColor_str
                        },
                        ease: Expo.easeOut
                    })
                }
                if (O.playPause_do) {
                    FWDMSPTweenMax.to(O.pauseS_do, .8, {
                        alpha: 0,
                        ease: Expo.easeOut
                    });
                    FWDMSPTweenMax.to(O.playS_do, .8, {
                        alpha: 0,
                        ease: Expo.easeOut
                    })
                }
            } else {
                FWDMSPTweenMax.killTweensOf(O.titleText_do);
                O.titleText_do.getStyle().color = O.titleNormalColor_str;
                if (O.durationText_do) O.durationText_do.getStyle().color = O.durationColor_str;
                if (O.playPause_do) {
                    FWDMSPTweenMax.killTweensOf(O.pauseS_do);
                    FWDMSPTweenMax.killTweensOf(O.playS_do);
                    O.pauseS_do.setAlpha(0);
                    O.playS_do.setAlpha(0)
                }
            }
        };
        this.setSelectedState = function(e) {
            if (O.isSelected_bl) return;
            O.isSelected_bl = true;
            if (e) {
                FWDMSPTweenMax.to(O.titleText_do.screen, .8, {
                    css: {
                        color: O.trackTitleSelected_str
                    },
                    ease: Expo.easeOut
                });
                if (O.durationText_do) {
                    FWDMSPTweenMax.to(O.durationText_do.screen, .8, {
                        css: {
                            color: O.trackTitleSelected_str
                        },
                        ease: Expo.easeOut
                    })
                }
                if (O.playPause_do) {
                    FWDMSPTweenMax.to(O.pauseS_do, .8, {
                        alpha: 1,
                        ease: Expo.easeOut
                    });
                    FWDMSPTweenMax.to(O.playS_do, .8, {
                        alpha: 1,
                        ease: Expo.easeOut
                    })
                }
            } else {
                FWDMSPTweenMax.killTweensOf(O.titleText_do);
                if (O.durationText_do) O.durationText_do.getStyle().color = O.trackTitleSelected_str;
                O.titleText_do.getStyle().color = O.trackTitleSelected_str;
                if (O.playPause_do) {
                    FWDMSPTweenMax.killTweensOf(O.pauseS_do);
                    FWDMSPTweenMax.killTweensOf(O.playS_do);
                    O.pauseS_do.setAlpha(1);
                    O.playS_do.setAlpha(1)
                }
            }
        };
        this.setActive = function() {
            if (O.isActive_bl) return;
            O.isActive_bl = true;
            O.setSelectedState(true)
        };
        this.setInActive = function() {
            if (!O.isActive_bl) return;
            O.isActive_bl = false;
            O.setNormalState(true);
            O.updateProgressPercent(0);
            O.showPlayButton()
        };
        this.showPlayButton = function() {
            if (!O.playN_do) return;
            O.playN_do.setX(0);
            O.playS_do.setX(0);
            O.pauseN_do.setX(-300);
            O.pauseS_do.setX(-300)
        };
        this.showPauseButton = function() {
            if (!O.playN_do) return;
            O.playN_do.setX(-300);
            O.playS_do.setX(-300);
            O.pauseN_do.setX(0);
            O.pauseS_do.setX(0)
        };
        this.destroy = function() {
            this.playlistItemGrad1_img = null;
            this.playlistItemProgress_img = null;
            this.playlistPlayButtonN_img = null;
            this.playlistDownloadButtonN_img = null;
            this.playlistDownloadButtonS_str = null;
            this.playlistBuyButtonN_img = null;
            this.playlistBuyButtonS_str = null;
            this.progress_do = null;
            this.playPause_do = null;
            this.playN_do = null;
            this.playS_do = null;
            this.pauseN_do = null;
            this.pauseS_do = null;
            this.titleText_do = null;
            this.grad_do = null;
            this.durationText_do = null;
            this.dumy_do = null;
            this.title_str = null;
            this.playlistItemBk1Path_str = null;
            this.playlistItemBk2Path_str = null;
            this.playlistPlayButtonN_str = null;
            this.playlistPlayButtonS_str = null;
            this.playlistPauseButtonN_str = null;
            this.playlistPauseButtonS_str = null;
            this.titleNormalColor_str = null;
            this.trackTitleSelected_str = null;
            this.durationColor_str = w;
            O.setInnerHTML("");
            O = null;
            M = null;
            e.prototype = null
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDMSPDisplayObject("div")
    };
    e.PLAY = "play";
    e.PAUSE = "pause";
    e.MOUSE_UP = "mouseUp";
    e.DOWNLOAD = "download";
    e.BUY = "buy";
    e.prototype = null;
    window.FWDMSPPlaylistItem = e
})();
(function(e) {
    var t = function(e, n, r, i, s, o) {
        var u = this;
        var a = t.prototype;
        this.imageSource_img = null;
        this.image_sdo = null;
        this.imageSourcePath_str = e;
        this.segmentWidth = n;
        this.segmentHeight = r;
        this.totalSegments = i;
        this.totalWidth = n * i;
        this.animDelay = s || 300;
        this.count = 0;
        this.delayTimerId_int;
        this.isShowed_bl = false;
        this.skipFirstFrame_bl = o;
        this.init = function() {
            u.setWidth(u.segmentWidth);
            u.setHeight(u.segmentHeight);
            u.imageSource_img = new Image;
            u.imageSource_img.src = u.imageSourcePath_str;
            u.image_sdo = new FWDMSPDisplayObject("img");
            u.image_sdo.setScreen(u.imageSource_img);
            u.image_sdo.setWidth(u.totalWidth);
            u.image_sdo.setHeight(u.segmentHeight);
            u.addChild(this.image_sdo);
            u.hide(false)
        };
        this.start = function() {
            if (u == null) return;
            clearInterval(u.delayTimerId_int);
            u.delayTimerId_int = setInterval(u.updatePreloader, u.animDelay)
        };
        this.stop = function() {
            clearInterval(u.delayTimerId_int);
            u.image_sdo.setX(0)
        };
        this.updatePreloader = function() {
            if (u == null) return;
            u.count++;
            if (u.count > u.totalSegments - 1) {
                if (u.skipFirstFrame_bl) {
                    u.count = 1
                } else {
                    u.count = 0
                }
            }
            var e = u.count * u.segmentWidth;
            u.image_sdo.setX(-e)
        };
        this.show = function() {
            this.setVisible(true);
            this.start();
            FWDMSPTweenMax.killTweensOf(this);
            FWDMSPTweenMax.to(this, 1, {
                alpha: 1
            });
            this.isShowed_bl = true
        };
        this.hide = function(e) {
            if (!this.isShowed_bl) return;
            FWDMSPTweenMax.killTweensOf(this);
            if (e) {
                FWDMSPTweenMax.to(this, 1, {
                    alpha: 0,
                    onComplete: this.onHideComplete
                })
            } else {
                this.setVisible(false);
                this.setAlpha(0)
            }
            this.isShowed_bl = false
        };
        this.onHideComplete = function() {
            u.stop();
            u.setVisible(false);
            u.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.setForFixedPosition = function() {
            u.setBackfaceVisibility();
            u.hasTransform3d_bl = false;
            u.hasTransform2d_bl = false;
            u.image_sdo.setBackfaceVisibility();
            u.image_sdo.hasTransform3d_bl = false;
            u.image_sdo.hasTransform2d_bl = false
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDMSPDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDMSPPreloader = t
})(window);
(function(e) {
    var t = function(e, n, r, i) {
        var s = this;
        var o = t.prototype;
        this.nImg = e;
        this.sPath_str = n;
        this.dPath_str = r;
        this.n_sdo;
        this.s_sdo;
        this.d_sdo;
        this.toolTipLabel_str;
        this.totalWidth = this.nImg.width;
        this.totalHeight = this.nImg.height;
        this.isShowed_bl = true;
        this.isSetToDisabledState_bl = false;
        this.isDisabled_bl = false;
        this.isDisabledForGood_bl = false;
        this.isSelectedFinal_bl = false;
        this.isActive_bl = false;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        this.allowToCreateSecondButton_bl = !s.isMobile_bl || s.hasPointerEvent_bl || i;
        s.init = function() {
            s.setupMainContainers()
        };
        s.setupMainContainers = function() {
            s.n_sdo = new FWDMSPDisplayObject("img");
            s.n_sdo.setScreen(s.nImg);
            s.addChild(s.n_sdo);
            if (s.allowToCreateSecondButton_bl) {
                var e = new Image;
                e.src = s.sPath_str;
                s.s_sdo = new FWDMSPDisplayObject("img");
                s.s_sdo.setScreen(e);
                s.s_sdo.setWidth(s.totalWidth);
                s.s_sdo.setHeight(s.totalHeight);
                s.s_sdo.setAlpha(0);
                s.addChild(s.s_sdo);
                if (s.dPath_str) {
                    var t = new Image;
                    t.src = s.dPath_str;
                    s.d_sdo = new FWDMSPDisplayObject("img");
                    s.d_sdo.setScreen(t);
                    s.d_sdo.setWidth(s.totalWidth);
                    s.d_sdo.setHeight(s.totalHeight);
                    s.d_sdo.setX(-100);
                    s.addChild(s.d_sdo)
                }
            }
            s.setWidth(s.totalWidth);
            s.setHeight(s.totalHeight);
            s.setButtonMode(true);
            s.screen.style.yellowOverlayPointerEvents = "none";
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.screen.addEventListener("MSPointerUp", s.onMouseUp);
                    s.screen.addEventListener("MSPointerOver", s.onMouseOver);
                    s.screen.addEventListener("MSPointerOut", s.onMouseOut)
                } else {
                    s.screen.addEventListener("touchend", s.onMouseUp)
                }
            } else if (s.screen.addEventListener) {
                s.screen.addEventListener("mouseover", s.onMouseOver);
                s.screen.addEventListener("mouseout", s.onMouseOut);
                s.screen.addEventListener("mouseup", s.onMouseUp)
            } else if (s.screen.attachEvent) {
                s.screen.attachEvent("onmouseover", s.onMouseOver);
                s.screen.attachEvent("onmouseout", s.onMouseOut);
                s.screen.attachEvent("onmouseup", s.onMouseUp)
            }
        };
        s.onMouseOver = function(e) {
            s.dispatchEvent(t.SHOW_TOOLTIP, {
                e: e
            });
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OVER, {
                    e: e
                });
                s.setSelectedState()
            }
        };
        s.onMouseOut = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OUT, {
                    e: e
                });
                s.setNormalState()
            }
        };
        s.onMouseUp = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (e.preventDefault) e.preventDefault();
            if (s.isDisabled_bl || e.button == 2) return;
            s.dispatchEvent(t.MOUSE_UP, {
                e: e
            })
        };
        s.setSelected = function() {
            s.isSelectedFinal_bl = true;
            if (!s.s_sdo) return;
            FWDMSPTweenMax.killTweensOf(s.s_sdo);
            FWDMSPTweenMax.to(s.s_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        s.setUnselected = function() {
            s.isSelectedFinal_bl = false;
            if (!s.s_sdo) return;
            FWDMSPTweenMax.to(s.s_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.setNormalState = function() {
            if (!s.s_sdo) return;
            FWDMSPTweenMax.killTweensOf(s.s_sdo);
            FWDMSPTweenMax.to(s.s_sdo, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function() {
            if (!s.s_sdo) return;
            FWDMSPTweenMax.killTweensOf(s.s_sdo);
            FWDMSPTweenMax.to(s.s_sdo, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.setDisabledState = function() {
            if (s.isSetToDisabledState_bl) return;
            s.isSetToDisabledState_bl = true;
            if (s.d_sdo) s.d_sdo.setX(0)
        };
        this.setEnabledState = function() {
            if (!s.isSetToDisabledState_bl) return;
            s.isSetToDisabledState_bl = false;
            if (s.d_sdo) s.d_sdo.setX(-100)
        };
        this.disable = function(e) {
            if (s.isDisabledForGood_bl || s.isDisabled_bl) return;
            s.isDisabled_bl = true;
            s.setButtonMode(false);
            FWDMSPTweenMax.to(s, .6, {
                alpha: .4
            });
            if (!e) s.setNormalState()
        };
        this.enable = function() {
            if (s.isDisabledForGood_bl || !s.isDisabled_bl) return;
            s.isDisabled_bl = false;
            s.setButtonMode(true);
            FWDMSPTweenMax.to(s, .6, {
                alpha: 1
            })
        };
        this.disableForGood = function() {
            s.isDisabledForGood_bl = true;
            s.setButtonMode(false)
        };
        this.enableForGood = function() {
            s.isDisabledForGood_bl = false;
            s.setButtonMode(true)
        };
        this.showDisabledState = function() {
            if (s.d_sdo.x != 0) s.d_sdo.setX(0)
        };
        this.hideDisabledState = function() {
            if (s.d_sdo.x != -100) s.d_sdo.setX(-100)
        };
        this.show = function() {
            if (s.isShowed_bl) return;
            s.isShowed_bl = true;
            FWDMSPTweenMax.killTweensOf(s);
            if (!FWDMSPUtils.isIEAndLessThen9) {
                if (FWDMSPUtils.isIEWebKit) {
                    FWDMSPTweenMax.killTweensOf(s.n_sdo);
                    s.n_sdo.setScale2(0);
                    FWDMSPTweenMax.to(s.n_sdo, .8, {
                        scale: 1,
                        delay: .4,
                        onStart: function() {
                            s.setVisible(true)
                        },
                        ease: Elastic.easeOut
                    })
                } else {
                    s.setScale2(0);
                    FWDMSPTweenMax.to(s, .8, {
                        scale: 1,
                        delay: .4,
                        onStart: function() {
                            s.setVisible(true)
                        },
                        ease: Elastic.easeOut
                    })
                }
            } else if (FWDMSPUtils.isIEAndLessThen9) {
                s.setVisible(true)
            } else {
                s.setAlpha(0);
                FWDMSPTweenMax.to(s, .4, {
                    alpha: 1,
                    delay: .4
                });
                s.setVisible(true)
            }
        };
        this.hide = function(e) {
            if (!s.isShowed_bl) return;
            s.isShowed_bl = false;
            FWDMSPTweenMax.killTweensOf(s);
            FWDMSPTweenMax.killTweensOf(s.n_sdo);
            s.setVisible(false)
        };
        s.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDMSPDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.SHOW_TOOLTIP = "showTooltip";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDMSPSimpleButton = t
})(window);
(function(e) {
    var t = function(e, n, r, i) {
        var s = this;
        var o = t.prototype;
        this.nImg_img = e;
        this.n_do;
        this.s_do;
        this.sImgPath_str = n;
        this.buttonWidth = s.nImg_img.width;
        this.buttonHeight = s.nImg_img.height;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.hasPointerEvent_bl = FWDMSPUtils.hasPointerEvent;
        this.isDisabled_bl = false;
        this.init = function() {
            s.setupMainContainers();
            s.setWidth(s.buttonWidth);
            s.setHeight(s.buttonHeight);
            s.setButtonMode(true)
        };
        this.setupMainContainers = function() {
            s.n_do = new FWDMSPDisplayObject("img");
            var e = new Image;
            e.src = s.nImg_img.src;
            s.n_do.setScreen(e);
            s.n_do.setWidth(s.buttonWidth);
            s.n_do.setHeight(s.buttonHeight);
            s.s_do = new FWDMSPDisplayObject("img");
            var t = new Image;
            t.src = s.sImgPath_str;
            s.s_do.setScreen(t);
            s.s_do.setWidth(s.buttonWidth);
            s.s_do.setHeight(s.buttonHeight);
            s.addChild(s.s_do);
            s.addChild(s.n_do);
            s.screen.onmouseover = s.onMouseOver;
            s.screen.onmouseout = s.onMouseOut;
            s.screen.onclick = s.onClick
        };
        this.onMouseOver = function(e) {
            FWDMSPTweenMax.to(s.n_do, .9, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onMouseOut = function(e) {
            FWDMSPTweenMax.to(s.n_do, .9, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.onClick = function(e) {
            s.dispatchEvent(t.CLICK)
        };
        this.destroy = function() {
            if (s.n_do) {
                FWDMSPTweenMax.killTweensOf(s.n_do);
                s.n_do.destroy();
                s.s_do.destroy()
            }
            s.n_do = null;
            s.s_do = null;
            s = null;
            o = null;
            t.prototype = null
        };
        s.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDMSPDisplayObject("div", "relative")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDMSPSimpleSizeButton = t
})(window);
(function(e) {
    var t = function(n, r, i, s, o, u, a) {
        var f = this;
        var l = t.prototype;
        this.buttonRef_do = n;
        this.bkPath_str = r;
        this.pointerPath_str = i;
        this.text_do = null;
        this.pointer_do = null;
        this.pointerUp_do = null;
        this.fontColor_str = u;
        this.toolTipLabel_str = o;
        this.toopTipPointerUp_str = s;
        this.toolTipsButtonsHideDelay = a * 1e3;
        this.pointerWidth = 7;
        this.pointerHeight = 4;
        this.showWithDelayId_to;
        this.isMobile_bl = FWDMSPUtils.isMobile;
        this.isShowed_bl = true;
        this.init = function() {
            f.setOverflow("visible");
            f.setupMainContainers();
            f.setLabel(f.toolTipLabel_str);
            f.hide();
            f.getStyle().background = "url('" + f.bkPath_str + "')";
            f.getStyle().zIndex = 9999999999
        };
        this.setupMainContainers = function() {
            f.text_do = new FWDMSPDisplayObject("div");
            f.text_do.hasTransform3d_bl = false;
            f.text_do.hasTransform2d_bl = false;
            f.text_do.setBackfaceVisibility();
            f.text_do.setDisplay("inline");
            f.text_do.getStyle().fontFamily = "Arial";
            f.text_do.getStyle().fontSize = "12px";
            f.text_do.getStyle().color = f.fontColor_str;
            f.text_do.getStyle().whiteSpace = "nowrap";
            f.text_do.getStyle().fontSmoothing = "antialiased";
            f.text_do.getStyle().webkitFontSmoothing = "antialiased";
            f.text_do.getStyle().textRendering = "optimizeLegibility";
            f.text_do.getStyle().padding = "6px";
            f.text_do.getStyle().paddingTop = "4px";
            f.text_do.getStyle().paddingBottom = "4px";
            f.setLabel();
            f.addChild(f.text_do);
            var e = new Image;
            e.src = f.pointerPath_str;
            f.pointer_do = new FWDMSPDisplayObject("img");
            f.pointer_do.setScreen(e);
            f.pointer_do.setWidth(f.pointerWidth);
            f.pointer_do.setHeight(f.pointerHeight);
            f.addChild(f.pointer_do);
            var t = new Image;
            t.src = f.toopTipPointerUp_str;
            f.pointerUp_do = new FWDMSPDisplayObject("img");
            f.pointerUp_do.setScreen(t);
            f.pointerUp_do.setWidth(f.pointerWidth);
            f.pointerUp_do.setHeight(f.pointerHeight);
            f.addChild(f.pointerUp_do)
        };
        this.setLabel = function(e) {
            f.text_do.setInnerHTML(o);
            setTimeout(function() {
                if (f == null) return;
                f.setWidth(f.text_do.getWidth());
                f.setHeight(f.text_do.getHeight());
                f.positionPointer()
            }, 50)
        };
        this.positionPointer = function(e, t) {
            var n;
            var r;
            if (!e) e = 0;
            n = parseInt((f.w - f.pointerWidth) / 2) + e;
            if (t) {
                r = -3;
                f.pointerUp_do.setX(n);
                f.pointerUp_do.setY(r);
                f.pointer_do.setX(0);
                f.pointer_do.setY(0)
            } else {
                r = f.h;
                f.pointer_do.setX(n);
                f.pointer_do.setY(r);
                f.pointerUp_do.setX(0);
                f.pointerUp_do.setY(0)
            }
        };
        this.show = function() {
            if (f.isShowed_bl) return;
            f.isShowed_bl = true;
            FWDMSPTweenMax.killTweensOf(f);
            clearTimeout(f.showWithDelayId_to);
            f.showWithDelayId_to = setTimeout(f.showFinal, f.toolTipsButtonsHideDelay);
            if (e.addEventListener) {
                e.addEventListener("mousemove", f.moveHandler)
            } else if (document.attachEvent) {
                document.detachEvent("onmousemove", f.moveHandler);
                document.attachEvent("onmousemove", f.moveHandler)
            }
        };
        this.showFinal = function() {
            f.setVisible(true);
            f.setAlpha(0);
            FWDMSPTweenMax.to(f, .4, {
                alpha: 1,
                onComplete: function() {
                    f.setVisible(true)
                },
                ease: Quart.easeOut
            })
        };
        this.moveHandler = function(e) {
            var t = FWDMSPUtils.getViewportMouseCoordinates(e);
            if (!FWDMSPUtils.hitTest(f.buttonRef_do.screen, t.screenX, t.screenY)) f.hide()
        };
        this.hide = function() {
            if (!f.isShowed_bl) return;
            clearTimeout(f.showWithDelayId_to);
            if (e.removeEventListener) {
                e.removeEventListener("mousemove", f.moveHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", f.moveHandler)
            }
            FWDMSPTweenMax.killTweensOf(f);
            f.setVisible(false);
            f.isShowed_bl = false
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDMSPDisplayObject("div", "fixed")
    };
    t.CLICK = "onClick";
    t.MOUSE_DOWN = "onMouseDown";
    t.prototype = null;
    e.FWDMSPToolTip = t
})(window);
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("FWDMSPTweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = [].slice,
            i = function(e, t, r) {
                n.call(this, e, t, r);
                this._cycle = 0;
                this._yoyo = this.vars.yoyo === true;
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._dirty = true
            },
            s = function(e) {
                return e.jquery || e.length && e[0] && e[0].nodeType && e[0].style
            },
            o = i.prototype = n.to({}, .1, {}),
            u = [];
        i.version = "1.9.7";
        o.constructor = i;
        o.kill()._gc = false;
        i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf;
        i.getTweensOf = n.getTweensOf;
        i.ticker = n.ticker;
        o.invalidate = function() {
            this._yoyo = this.vars.yoyo === true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return n.prototype.invalidate.call(this)
        };
        o.updateTo = function(e, t) {
            var r = this.ratio,
                i;
            if (t && this.timeline && this._startTime < this._timeline._time) {
                this._startTime = this._timeline._time;
                this._uncache(false);
                if (this._gc) {
                    this._enabled(true, false)
                } else {
                    this._timeline.insert(this, this._startTime - this._delay)
                }
            }
            for (i in e) {
                this.vars[i] = e[i]
            }
            if (this._initted) {
                if (t) {
                    this._initted = false
                } else {
                    if (this._notifyPluginsOfEnabled && this._firstPT) {
                        n._onPluginEvent("_onDisable", this)
                    }
                    if (this._time / this._duration > .998) {
                        var s = this._time;
                        this.render(0, true, false);
                        this._initted = false;
                        this.render(s, true, false)
                    } else if (this._time > 0) {
                        this._initted = false;
                        this._init();
                        var o = 1 / (1 - r),
                            u = this._firstPT,
                            a;
                        while (u) {
                            a = u.s + u.c;
                            u.c *= o;
                            u.s = a - u.c;
                            u = u._next
                        }
                    }
                }
            }
            return this
        };
        o.render = function(e, t, n) {
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                s = this._totalTime,
                o = this._cycle,
                a, f, l, c, h, p, d;
            if (e >= r) {
                this._totalTime = r;
                this._cycle = this._repeat;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0
                } else {
                    this._time = this._duration;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1
                }
                if (!this._reversed) {
                    a = true;
                    f = "onComplete"
                }
                if (this._duration === 0) {
                    if (e === 0 || this._rawPrevTime < 0)
                        if (this._rawPrevTime !== e) {
                            n = true;
                            if (this._rawPrevTime > 0) {
                                f = "onReverseComplete";
                                if (t) {
                                    e = -1
                                }
                            }
                        } this._rawPrevTime = e
                }
            } else if (e < 1e-7) {
                this._totalTime = this._time = this._cycle = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (s !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    f = "onReverseComplete";
                    a = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0) {
                        if (this._rawPrevTime >= 0) {
                            n = true
                        }
                        this._rawPrevTime = e
                    }
                } else if (!this._initted) {
                    n = true
                }
            } else {
                this._totalTime = this._time = e;
                if (this._repeat !== 0) {
                    c = this._duration + this._repeatDelay;
                    this._cycle = this._totalTime / c >> 0;
                    if (this._cycle !== 0)
                        if (this._cycle === this._totalTime / c) {
                            this._cycle--
                        } this._time = this._totalTime - this._cycle * c;
                    if (this._yoyo)
                        if ((this._cycle & 1) !== 0) {
                            this._time = this._duration - this._time
                        } if (this._time > this._duration) {
                        this._time = this._duration
                    } else if (this._time < 0) {
                        this._time = 0
                    }
                }
                if (this._easeType) {
                    h = this._time / this._duration;
                    p = this._easeType;
                    d = this._easePower;
                    if (p === 1 || p === 3 && h >= .5) {
                        h = 1 - h
                    }
                    if (p === 3) {
                        h *= 2
                    }
                    if (d === 1) {
                        h *= h
                    } else if (d === 2) {
                        h *= h * h
                    } else if (d === 3) {
                        h *= h * h * h
                    } else if (d === 4) {
                        h *= h * h * h * h
                    }
                    if (p === 1) {
                        this.ratio = 1 - h
                    } else if (p === 2) {
                        this.ratio = h
                    } else if (this._time / this._duration < .5) {
                        this.ratio = h / 2
                    } else {
                        this.ratio = 1 - h / 2
                    }
                } else {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                }
            }
            if (i === this._time && !n) {
                if (s !== this._totalTime)
                    if (this._onUpdate)
                        if (!t) {
                            this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)
                        } return
            } else if (!this._initted) {
                this._init();
                if (!this._initted) {
                    return
                }
                if (this._time && !a) {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                } else if (a && this._ease._calcEnd) {
                    this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1)
                }
            }
            if (!this._active)
                if (!this._paused) {
                    this._active = true
                } if (s === 0) {
                if (this._startAt) {
                    if (e >= 0) {
                        this._startAt.render(e, t, n)
                    } else if (!f) {
                        f = "_dummyGS"
                    }
                }
                if (this.vars.onStart)
                    if (this._totalTime !== 0 || this._duration === 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u)
                        }
            }
            l = this._firstPT;
            while (l) {
                if (l.f) {
                    l.t[l.p](l.c * this.ratio + l.s)
                } else {
                    var v = l.c * this.ratio + l.s;
                    if (l.p == "x") {
                        l.t.setX(v)
                    } else if (l.p == "y") {
                        l.t.setY(v)
                    } else if (l.p == "z") {
                        l.t.setZ(v)
                    } else if (l.p == "w") {
                        l.t.setWidth(v)
                    } else if (l.p == "h") {
                        l.t.setHeight(v)
                    } else if (l.p == "alpha") {
                        l.t.setAlpha(v)
                    } else if (l.p == "scale") {
                        l.t.setScale(v)
                    } else {
                        l.t[l.p] = v
                    }
                }
                l = l._next
            }
            if (this._onUpdate) {
                if (e < 0)
                    if (this._startAt) {
                        this._startAt.render(e, t, n)
                    } if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)
                }
            }
            if (this._cycle !== o)
                if (!t)
                    if (!this._gc)
                        if (this.vars.onRepeat) {
                            this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || u)
                        } if (f)
                if (!this._gc) {
                    if (e < 0 && this._startAt && !this._onUpdate) {
                        this._startAt.render(e, t, n)
                    }
                    if (a) {
                        if (this._timeline.autoRemoveChildren) {
                            this._enabled(false, false)
                        }
                        this._active = false
                    }
                    if (!t && this.vars[f]) {
                        this.vars[f].apply(this.vars[f + "Scope"] || this, this.vars[f + "Params"] || u)
                    }
                }
        };
        i.to = function(e, t, n) {
            return new i(e, t, n)
        };
        i.from = function(e, t, n) {
            n.runBackwards = true;
            n.immediateRender = n.immediateRender != false;
            return new i(e, t, n)
        };
        i.fromTo = function(e, t, n, r) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return new i(e, t, r)
        };
        i.staggerTo = i.allTo = function(e, t, o, a, f, l, c) {
            a = a || 0;
            var h = o.delay || 0,
                p = [],
                d = function() {
                    if (o.onComplete) {
                        o.onComplete.apply(o.onCompleteScope || this, o.onCompleteParams || u)
                    }
                    f.apply(c || this, l || u)
                },
                v, m, g, y;
            if (!(e instanceof Array)) {
                if (typeof e === "string") {
                    e = n.selector(e) || e
                }
                if (s(e)) {
                    e = r.call(e, 0)
                }
            }
            v = e.length;
            for (g = 0; g < v; g++) {
                m = {};
                for (y in o) {
                    m[y] = o[y]
                }
                m.delay = h;
                if (g === v - 1 && f) {
                    m.onComplete = d
                }
                p[g] = new i(e[g], t, m);
                h += a
            }
            return p
        };
        i.staggerFrom = i.allFrom = function(e, t, n, r, s, o, u) {
            n.runBackwards = true;
            n.immediateRender = n.immediateRender != false;
            return i.staggerTo(e, t, n, r, s, o, u)
        };
        i.staggerFromTo = i.allFromTo = function(e, t, n, r, s, o, u, a) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return i.staggerTo(e, t, r, s, o, u, a)
        };
        i.delayedCall = function(e, t, n, r, s) {
            return new i(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                onCompleteScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                onReverseCompleteScope: r,
                immediateRender: false,
                useFrames: s,
                overwrite: 0
            })
        };
        i.set = function(e, t) {
            return new i(e, 0, t)
        };
        i.isTweening = function(e) {
            var t = n.getTweensOf(e),
                r = t.length,
                i;
            while (--r > -1) {
                i = t[r];
                if (i._active || i._startTime === i._timeline._time && i._timeline._active) {
                    return true
                }
            }
            return false
        };
        var a = function(e, t) {
                var r = [],
                    i = 0,
                    s = e._first;
                while (s) {
                    if (s instanceof n) {
                        r[i++] = s
                    } else {
                        if (t) {
                            r[i++] = s
                        }
                        r = r.concat(a(s, t));
                        i = r.length
                    }
                    s = s._next
                }
                return r
            },
            f = i.getAllTweens = function(t) {
                return a(e._rootTimeline, t).concat(a(e._rootFramesTimeline, t))
            };
        i.killAll = function(e, n, r, i) {
            if (n == null) {
                n = true
            }
            if (r == null) {
                r = true
            }
            var s = f(i != false),
                o = s.length,
                u = n && r && i,
                a, l, c;
            for (c = 0; c < o; c++) {
                l = s[c];
                if (u || l instanceof t || (a = l.target === l.vars.onComplete) && r || n && !a) {
                    if (e) {
                        l.totalTime(l.totalDuration())
                    } else {
                        l._enabled(false, false)
                    }
                }
            }
        };
        i.killChildTweensOf = function(e, t) {
            if (e == null) {
                return
            }
            var o = n._tweenLookup,
                u, a, f, l, c;
            if (typeof e === "string") {
                e = n.selector(e) || e
            }
            if (s(e)) {
                e = r(e, 0)
            }
            if (e instanceof Array) {
                l = e.length;
                while (--l > -1) {
                    i.killChildTweensOf(e[l], t)
                }
                return
            }
            u = [];
            for (f in o) {
                a = o[f].target.parentNode;
                while (a) {
                    if (a === e) {
                        u = u.concat(o[f].tweens)
                    }
                    a = a.parentNode
                }
            }
            c = u.length;
            for (l = 0; l < c; l++) {
                if (t) {
                    u[l].totalTime(u[l].totalDuration())
                }
                u[l]._enabled(false, false)
            }
        };
        var l = function(e, n, r, i) {
            if (n === undefined) {
                n = true
            }
            if (r === undefined) {
                r = true
            }
            var s = f(i),
                o = n && r && i,
                u = s.length,
                a, l;
            while (--u > -1) {
                l = s[u];
                if (o || l instanceof t || (a = l.target === l.vars.onComplete) && r || n && !a) {
                    l.paused(e)
                }
            }
        };
        i.pauseAll = function(e, t, n) {
            l(true, e, t, n)
        };
        i.resumeAll = function(e, t, n) {
            l(false, e, t, n)
        };
        o.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), false)
        };
        o.totalProgress = function(e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        o.time = function(e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat !== 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        o.duration = function(t) {
            if (!arguments.length) {
                return this._duration
            }
            return e.prototype.duration.call(this, t)
        };
        o.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
                    this._dirty = false
                }
                return this._totalDuration
            }
            return this._repeat === -1 ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        o.repeat = function(e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        o.repeatDelay = function(e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        o.yoyo = function(e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        return i
    }, true);
    window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = function(e) {
                t.call(this, e);
                this._labels = {};
                this.autoRemoveChildren = this.vars.autoRemoveChildren === true;
                this.smoothChildTiming = this.vars.smoothChildTiming === true;
                this._sortChildren = true;
                this._onUpdate = this.vars.onUpdate;
                var n = this.vars,
                    r = i.length,
                    s, o;
                while (--r > -1) {
                    o = n[i[r]];
                    if (o) {
                        s = o.length;
                        while (--s > -1) {
                            if (o[s] === "{self}") {
                                o = n[i[r]] = o.concat();
                                o[s] = this
                            }
                        }
                    }
                }
                if (n.tweens instanceof Array) {
                    this.add(n.tweens, 0, n.align, n.stagger)
                }
            },
            i = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
            s = [],
            o = function(e) {
                var t = {},
                    n;
                for (n in e) {
                    t[n] = e[n]
                }
                return t
            },
            u = s.slice,
            a = r.prototype = new t;
        r.version = "1.9.7";
        a.constructor = r;
        a.kill()._gc = false;
        a.to = function(e, t, r, i) {
            return t ? this.add(new n(e, t, r), i) : this.set(e, r, i)
        };
        a.from = function(e, t, r, i) {
            return this.add(n.from(e, t, r), i)
        };
        a.fromTo = function(e, t, r, i, s) {
            return t ? this.add(n.fromTo(e, t, r, i), s) : this.set(e, i, s)
        };
        a.staggerTo = function(e, t, i, s, a, f, l, c) {
            var h = new r({
                    onComplete: f,
                    onCompleteParams: l,
                    onCompleteScope: c
                }),
                p;
            if (typeof e === "string") {
                e = n.selector(e) || e
            }
            if (!(e instanceof Array) && e.length && e[0] && e[0].nodeType && e[0].style) {
                e = u.call(e, 0)
            }
            s = s || 0;
            for (p = 0; p < e.length; p++) {
                if (i.startAt) {
                    i.startAt = o(i.startAt)
                }
                h.to(e[p], t, o(i), p * s)
            }
            return this.add(h, a)
        };
        a.staggerFrom = function(e, t, n, r, i, s, o, u) {
            n.immediateRender = n.immediateRender != false;
            n.runBackwards = true;
            return this.staggerTo(e, t, n, r, i, s, o, u)
        };
        a.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return this.staggerTo(e, t, r, i, s, o, u, a)
        };
        a.call = function(e, t, r, i) {
            return this.add(n.delayedCall(0, e, t, r), i)
        };
        a.set = function(e, t, r) {
            r = this._parseTimeOrLabel(r, 0, true);
            if (t.immediateRender == null) {
                t.immediateRender = r === this._time && !this._paused
            }
            return this.add(new n(e, 0, t), r)
        };
        r.exportRoot = function(e, t) {
            e = e || {};
            if (e.smoothChildTiming == null) {
                e.smoothChildTiming = true
            }
            var i = new r(e),
                s = i._timeline,
                o, u;
            if (t == null) {
                t = true
            }
            s._remove(i, true);
            i._startTime = 0;
            i._rawPrevTime = i._time = i._totalTime = s._time;
            o = s._first;
            while (o) {
                u = o._next;
                if (!t || !(o instanceof n && o.target === o.vars.onComplete)) {
                    i.add(o, o._startTime - o._delay)
                }
                o = u
            }
            s.add(i, 0);
            return i
        };
        a.add = function(i, s, o, u) {
            var a, f, l, c, h;
            if (typeof s !== "number") {
                s = this._parseTimeOrLabel(s, 0, true, i)
            }
            if (!(i instanceof e)) {
                if (i instanceof Array) {
                    o = o || "normal";
                    u = u || 0;
                    a = s;
                    f = i.length;
                    for (l = 0; l < f; l++) {
                        if ((c = i[l]) instanceof Array) {
                            c = new r({
                                tweens: c
                            })
                        }
                        this.add(c, a);
                        if (typeof c !== "string" && typeof c !== "function") {
                            if (o === "sequence") {
                                a = c._startTime + c.totalDuration() / c._timeScale
                            } else if (o === "start") {
                                c._startTime -= c.delay()
                            }
                        }
                        a += u
                    }
                    return this._uncache(true)
                } else if (typeof i === "string") {
                    return this.addLabel(i, s)
                } else if (typeof i === "function") {
                    i = n.delayedCall(0, i)
                } else {
                    throw "Cannot add " + i + " into the timeline; it is neither a tween, timeline, function, nor a string."
                }
            }
            t.prototype.add.call(this, i, s);
            if (this._gc)
                if (!this._paused)
                    if (this._time === this._duration)
                        if (this._time < this.duration()) {
                            h = this;
                            while (h._gc && h._timeline) {
                                if (h._timeline.smoothChildTiming) {
                                    h.totalTime(h._totalTime, true)
                                } else {
                                    h._enabled(true, false)
                                }
                                h = h._timeline
                            }
                        } return this
        };
        a.remove = function(t) {
            if (t instanceof e) {
                return this._remove(t, false)
            } else if (t instanceof Array) {
                var n = t.length;
                while (--n > -1) {
                    this.remove(t[n])
                }
                return this
            } else if (typeof t === "string") {
                return this.removeLabel(t)
            }
            return this.kill(null, t)
        };
        a.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, true, e))
        };
        a.insert = a.insertMultiple = function(e, t, n, r) {
            return this.add(e, t || 0, n, r)
        };
        a.appendMultiple = function(e, t, n, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, true, e), n, r)
        };
        a.addLabel = function(e, t) {
            this._labels[e] = this._parseTimeOrLabel(t);
            return this
        };
        a.removeLabel = function(e) {
            delete this._labels[e];
            return this
        };
        a.getLabelTime = function(e) {
            return this._labels[e] != null ? this._labels[e] : -1
        };
        a._parseTimeOrLabel = function(t, n, r, i) {
            var s;
            if (i instanceof e && i.timeline === this) {
                this.remove(i)
            } else if (i instanceof Array) {
                s = i.length;
                while (--s > -1) {
                    if (i[s] instanceof e && i[s].timeline === this) {
                        this.remove(i[s])
                    }
                }
            }
            if (typeof n === "string") {
                return this._parseTimeOrLabel(n, r && typeof t === "number" && this._labels[n] == null ? t - this.duration() : 0, r)
            }
            n = n || 0;
            if (typeof t === "string" && (isNaN(t) || this._labels[t] != null)) {
                s = t.indexOf("=");
                if (s === -1) {
                    if (this._labels[t] == null) {
                        return r ? this._labels[t] = this.duration() + n : n
                    }
                    return this._labels[t] + n
                }
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1));
                t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
            } else if (t == null) {
                t = this.duration()
            }
            return Number(t) + n
        };
        a.seek = function(e, t) {
            return this.totalTime(typeof e === "number" ? e : this._parseTimeOrLabel(e), t !== false)
        };
        a.stop = function() {
            return this.paused(true)
        };
        a.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        };
        a.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        };
        a.render = function(e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                o = this._startTime,
                u = this._timeScale,
                a = this._paused,
                f, l, c, h, p;
            if (e >= r) {
                this._totalTime = this._time = r;
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        l = true;
                        h = "onComplete";
                        if (this._duration === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e && this._first) {
                                    p = true;
                                    if (this._rawPrevTime > 0) {
                                        h = "onReverseComplete"
                                    }
                                }
                    } this._rawPrevTime = e;
                e = r + 1e-6
            } else if (e < 1e-7) {
                this._totalTime = this._time = 0;
                if (i !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    h = "onReverseComplete";
                    l = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0 && this._first) {
                            p = true
                        }
                } else if (!this._initted) {
                    p = true
                }
                this._rawPrevTime = e;
                e = 0
            } else {
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if ((this._time === i || !this._first) && !n && !p) {
                return
            } else if (!this._initted) {
                this._initted = true
            }
            if (i === 0)
                if (this.vars.onStart)
                    if (this._time !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)
                        } if (this._time >= i) {
                f = this._first;
                while (f) {
                    c = f._next;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= this._time && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, n)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, n)
                        }
                    }
                    f = c
                }
            } else {
                f = this._last;
                while (f) {
                    c = f._prev;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= i && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, n)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, n)
                        }
                    }
                    f = c
                }
            }
            if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)
                } if (h)
                if (!this._gc)
                    if (o === this._startTime || u !== this._timeScale)
                        if (this._time === 0 || r >= this.totalDuration()) {
                            if (l) {
                                if (this._timeline.autoRemoveChildren) {
                                    this._enabled(false, false)
                                }
                                this._active = false
                            }
                            if (!t && this.vars[h]) {
                                this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || s)
                            }
                        }
        };
        a._hasPausedChild = function() {
            var e = this._first;
            while (e) {
                if (e._paused || e instanceof r && e._hasPausedChild()) {
                    return true
                }
                e = e._next
            }
            return false
        };
        a.getChildren = function(e, t, r, i) {
            i = i || -9999999999;
            var s = [],
                o = this._first,
                u = 0;
            while (o) {
                if (o._startTime < i) {} else if (o instanceof n) {
                    if (t !== false) {
                        s[u++] = o
                    }
                } else {
                    if (r !== false) {
                        s[u++] = o
                    }
                    if (e !== false) {
                        s = s.concat(o.getChildren(true, t, r));
                        u = s.length
                    }
                }
                o = o._next
            }
            return s
        };
        a.getTweensOf = function(e, t) {
            var r = n.getTweensOf(e),
                i = r.length,
                s = [],
                o = 0;
            while (--i > -1) {
                if (r[i].timeline === this || t && this._contains(r[i])) {
                    s[o++] = r[i]
                }
            }
            return s
        };
        a._contains = function(e) {
            var t = e.timeline;
            while (t) {
                if (t === this) {
                    return true
                }
                t = t.timeline
            }
            return false
        };
        a.shiftChildren = function(e, t, n) {
            n = n || 0;
            var r = this._first,
                i = this._labels,
                s;
            while (r) {
                if (r._startTime >= n) {
                    r._startTime += e
                }
                r = r._next
            }
            if (t) {
                for (s in i) {
                    if (i[s] >= n) {
                        i[s] += e
                    }
                }
            }
            return this._uncache(true)
        };
        a._kill = function(e, t) {
            if (!e && !t) {
                return this._enabled(false, false)
            }
            var n = !t ? this.getChildren(true, true, false) : this.getTweensOf(t),
                r = n.length,
                i = false;
            while (--r > -1) {
                if (n[r]._kill(e, t)) {
                    i = true
                }
            }
            return i
        };
        a.clear = function(e) {
            var t = this.getChildren(false, true, true),
                n = t.length;
            this._time = this._totalTime = 0;
            while (--n > -1) {
                t[n]._enabled(false, false)
            }
            if (e !== false) {
                this._labels = {}
            }
            return this._uncache(true)
        };
        a.invalidate = function() {
            var e = this._first;
            while (e) {
                e.invalidate();
                e = e._next
            }
            return this
        };
        a._enabled = function(e, n) {
            if (e === this._gc) {
                var r = this._first;
                while (r) {
                    r._enabled(e, true);
                    r = r._next
                }
            }
            return t.prototype._enabled.call(this, e, n)
        };
        a.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * e, false)
        };
        a.duration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this.totalDuration()
                }
                return this._duration
            }
            if (this.duration() !== 0 && e !== 0) {
                this.timeScale(this._duration / e)
            }
            return this
        };
        a.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    var t = 0,
                        n = this._last,
                        r = 999999999999,
                        i, s;
                    while (n) {
                        i = n._prev;
                        if (n._dirty) {
                            n.totalDuration()
                        }
                        if (n._startTime > r && this._sortChildren && !n._paused) {
                            this.add(n, n._startTime - n._delay)
                        } else {
                            r = n._startTime
                        }
                        if (n._startTime < 0 && !n._paused) {
                            t -= n._startTime;
                            if (this._timeline.smoothChildTiming) {
                                this._startTime += n._startTime / this._timeScale
                            }
                            this.shiftChildren(-n._startTime, false, -9999999999);
                            r = 0
                        }
                        s = n._startTime + n._totalDuration / n._timeScale;
                        if (s > t) {
                            t = s
                        }
                        n = i
                    }
                    this._duration = this._totalDuration = t;
                    this._dirty = false
                }
                return this._totalDuration
            }
            if (this.totalDuration() !== 0)
                if (e !== 0) {
                    this.timeScale(this._totalDuration / e)
                } return this
        };
        a.usesFrames = function() {
            var t = this._timeline;
            while (t._timeline) {
                t = t._timeline
            }
            return t === e._rootFramesTimeline
        };
        a.rawTime = function() {
            return this._paused || this._totalTime !== 0 && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        };
        return r
    }, true);
    window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
        var r = function(t) {
                e.call(this, t);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._cycle = 0;
                this._yoyo = this.vars.yoyo === true;
                this._dirty = true
            },
            i = [],
            s = new n(null, null, 1, 0),
            o = function(e) {
                while (e) {
                    if (e._paused) {
                        return true
                    }
                    e = e._timeline
                }
                return false
            },
            u = r.prototype = new e;
        u.constructor = r;
        u.kill()._gc = false;
        r.version = "1.9.7";
        u.invalidate = function() {
            this._yoyo = this.vars.yoyo === true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return e.prototype.invalidate.call(this)
        };
        u.addCallback = function(e, n, r, i) {
            return this.add(t.delayedCall(0, e, r, i), n)
        };
        u.removeCallback = function(e, t) {
            if (t == null) {
                this._kill(null, e)
            } else {
                var n = this.getTweensOf(e, false),
                    r = n.length,
                    i = this._parseTimeOrLabel(t);
                while (--r > -1) {
                    if (n[r]._startTime === i) {
                        n[r]._enabled(false, false)
                    }
                }
            }
            return this
        };
        u.tweenTo = function(e, n) {
            n = n || {};
            var r = {
                    ease: s,
                    overwrite: 2,
                    useFrames: this.usesFrames(),
                    immediateRender: false
                },
                o, u;
            for (o in n) {
                r[o] = n[o]
            }
            r.time = this._parseTimeOrLabel(e);
            u = new t(this, Math.abs(Number(r.time) - this._time) / this._timeScale || .001, r);
            r.onStart = function() {
                u.target.paused(true);
                if (u.vars.time !== u.target.time()) {
                    u.duration(Math.abs(u.vars.time - u.target.time()) / u.target._timeScale)
                }
                if (n.onStart) {
                    n.onStart.apply(n.onStartScope || u, n.onStartParams || i)
                }
            };
            return u
        };
        u.tweenFromTo = function(e, t, n) {
            n = n || {};
            e = this._parseTimeOrLabel(e);
            n.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                onCompleteScope: this
            };
            n.immediateRender = n.immediateRender !== false;
            var r = this.tweenTo(t, n);
            return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
        };
        u.render = function(e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                s = this._duration,
                o = this._time,
                u = this._totalTime,
                a = this._startTime,
                f = this._timeScale,
                l = this._rawPrevTime,
                c = this._paused,
                h = this._cycle,
                p, d, v, m, g, y;
            if (e >= r) {
                if (!this._locked) {
                    this._totalTime = r;
                    this._cycle = this._repeat
                }
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        d = true;
                        m = "onComplete";
                        if (s === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e && this._first) {
                                    g = true;
                                    if (this._rawPrevTime > 0) {
                                        m = "onReverseComplete"
                                    }
                                }
                    } this._rawPrevTime = e;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = e = 0
                } else {
                    this._time = s;
                    e = s + 1e-6
                }
            } else if (e < 1e-7) {
                if (!this._locked) {
                    this._totalTime = this._cycle = 0
                }
                this._time = 0;
                if (o !== 0 || s === 0 && this._rawPrevTime > 0 && !this._locked) {
                    m = "onReverseComplete";
                    d = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (s === 0)
                        if (this._rawPrevTime >= 0 && this._first) {
                            g = true
                        }
                } else if (!this._initted) {
                    g = true
                }
                this._rawPrevTime = e;
                e = 0
            } else {
                this._time = this._rawPrevTime = e;
                if (!this._locked) {
                    this._totalTime = e;
                    if (this._repeat !== 0) {
                        y = s + this._repeatDelay;
                        this._cycle = this._totalTime / y >> 0;
                        if (this._cycle !== 0)
                            if (this._cycle === this._totalTime / y) {
                                this._cycle--
                            } this._time = this._totalTime - this._cycle * y;
                        if (this._yoyo)
                            if ((this._cycle & 1) !== 0) {
                                this._time = s - this._time
                            } if (this._time > s) {
                            this._time = s;
                            e = s + 1e-6
                        } else if (this._time < 0) {
                            this._time = e = 0
                        } else {
                            e = this._time
                        }
                    }
                }
            }
            if (this._cycle !== h)
                if (!this._locked) {
                    var b = this._yoyo && (h & 1) !== 0,
                        w = b === (this._yoyo && (this._cycle & 1) !== 0),
                        E = this._totalTime,
                        S = this._cycle,
                        x = this._rawPrevTime,
                        T = this._time;
                    this._totalTime = h * s;
                    if (this._cycle < h) {
                        b = !b
                    } else {
                        this._totalTime += s
                    }
                    this._time = o;
                    this._rawPrevTime = s === 0 ? l - 1e-5 : l;
                    this._cycle = h;
                    this._locked = true;
                    o = b ? 0 : s;
                    this.render(o, t, s === 0);
                    if (!t)
                        if (!this._gc) {
                            if (this.vars.onRepeat) {
                                this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || i)
                            }
                        } if (w) {
                        o = b ? s + 1e-6 : -1e-6;
                        this.render(o, true, false)
                    }
                    this._time = T;
                    this._totalTime = E;
                    this._cycle = S;
                    this._rawPrevTime = x;
                    this._locked = false
                } if ((this._time === o || !this._first) && !n && !g) {
                if (u !== this._totalTime)
                    if (this._onUpdate)
                        if (!t) {
                            this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)
                        } return
            } else if (!this._initted) {
                this._initted = true
            }
            if (u === 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || i)
                        } if (this._time >= o) {
                p = this._first;
                while (p) {
                    v = p._next;
                    if (this._paused && !c) {
                        break
                    } else if (p._active || p._startTime <= this._time && !p._paused && !p._gc) {
                        if (!p._reversed) {
                            p.render((e - p._startTime) * p._timeScale, t, n)
                        } else {
                            p.render((!p._dirty ? p._totalDuration : p.totalDuration()) - (e - p._startTime) * p._timeScale, t, n)
                        }
                    }
                    p = v
                }
            } else {
                p = this._last;
                while (p) {
                    v = p._prev;
                    if (this._paused && !c) {
                        break
                    } else if (p._active || p._startTime <= o && !p._paused && !p._gc) {
                        if (!p._reversed) {
                            p.render((e - p._startTime) * p._timeScale, t, n)
                        } else {
                            p.render((!p._dirty ? p._totalDuration : p.totalDuration()) - (e - p._startTime) * p._timeScale, t, n)
                        }
                    }
                    p = v
                }
            }
            if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)
                } if (m)
                if (!this._locked)
                    if (!this._gc)
                        if (a === this._startTime || f !== this._timeScale)
                            if (this._time === 0 || r >= this.totalDuration()) {
                                if (d) {
                                    if (this._timeline.autoRemoveChildren) {
                                        this._enabled(false, false)
                                    }
                                    this._active = false
                                }
                                if (!t && this.vars[m]) {
                                    this.vars[m].apply(this.vars[m + "Scope"] || this, this.vars[m + "Params"] || i)
                                }
                            }
        };
        u.getActive = function(e, t, n) {
            if (e == null) {
                e = true
            }
            if (t == null) {
                t = true
            }
            if (n == null) {
                n = false
            }
            var r = [],
                i = this.getChildren(e, t, n),
                s = 0,
                u = i.length,
                a, f;
            for (a = 0; a < u; a++) {
                f = i[a];
                if (!f._paused)
                    if (f._timeline._time >= f._startTime)
                        if (f._timeline._time < f._startTime + f._totalDuration / f._timeScale)
                            if (!o(f._timeline)) {
                                r[s++] = f
                            }
            }
            return r
        };
        u.getLabelAfter = function(e) {
            if (!e)
                if (e !== 0) {
                    e = this._time
                } var t = this.getLabelsArray(),
                n = t.length,
                r;
            for (r = 0; r < n; r++) {
                if (t[r].time > e) {
                    return t[r].name
                }
            }
            return null
        };
        u.getLabelBefore = function(e) {
            if (e == null) {
                e = this._time
            }
            var t = this.getLabelsArray(),
                n = t.length;
            while (--n > -1) {
                if (t[n].time < e) {
                    return t[n].name
                }
            }
            return null
        };
        u.getLabelsArray = function() {
            var e = [],
                t = 0,
                n;
            for (n in this._labels) {
                e[t++] = {
                    time: this._labels[n],
                    name: n
                }
            }
            e.sort(function(e, t) {
                return e.time - t.time
            });
            return e
        };
        u.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), false)
        };
        u.totalProgress = function(e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        u.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    e.prototype.totalDuration.call(this);
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat
                }
                return this._totalDuration
            }
            return this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        u.time = function(e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat !== 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        u.repeat = function(e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        u.repeatDelay = function(e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        u.yoyo = function(e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        u.currentLabel = function(e) {
            if (!arguments.length) {
                return this.getLabelBefore(this._time + 1e-8)
            }
            return this.seek(e, true)
        };
        return r
    }, true);
    (function() {
        var e = 180 / Math.PI,
            t = Math.PI / 180,
            n = [],
            r = [],
            i = [],
            s = {},
            o = function(e, t, n, r) {
                this.a = e;
                this.b = t;
                this.c = n;
                this.d = r;
                this.da = r - e;
                this.ca = n - e;
                this.ba = t - e
            },
            u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            a = function(e, t, n, r) {
                var i = {
                        a: e
                    },
                    s = {},
                    o = {},
                    u = {
                        c: r
                    },
                    a = (e + t) / 2,
                    f = (t + n) / 2,
                    l = (n + r) / 2,
                    c = (a + f) / 2,
                    h = (f + l) / 2,
                    p = (h - c) / 8;
                i.b = a + (e - a) / 4;
                s.b = c + p;
                i.c = s.a = (i.b + s.b) / 2;
                s.c = o.a = (c + h) / 2;
                o.b = h - p;
                u.b = l + (r - l) / 4;
                o.c = u.a = (o.b + u.b) / 2;
                return [i, s, o, u]
            },
            f = function(e, t, s, o, u) {
                var f = e.length - 1,
                    l = 0,
                    c = e[0].a,
                    h, p, d, v, m, g, y, b, w, E, S, x, T;
                for (h = 0; h < f; h++) {
                    m = e[l];
                    p = m.a;
                    d = m.d;
                    v = e[l + 1].d;
                    if (u) {
                        S = n[h];
                        x = r[h];
                        T = (x + S) * t * .25 / (o ? .5 : i[h] || .5);
                        g = d - (d - p) * (o ? t * .5 : S !== 0 ? T / S : 0);
                        y = d + (v - d) * (o ? t * .5 : x !== 0 ? T / x : 0);
                        b = d - (g + ((y - g) * (S * 3 / (S + x) + .5) / 4 || 0))
                    } else {
                        g = d - (d - p) * t * .5;
                        y = d + (v - d) * t * .5;
                        b = d - (g + y) / 2
                    }
                    g += b;
                    y += b;
                    m.c = w = g;
                    if (h !== 0) {
                        m.b = c
                    } else {
                        m.b = c = m.a + (m.c - m.a) * .6
                    }
                    m.da = d - p;
                    m.ca = w - p;
                    m.ba = c - p;
                    if (s) {
                        E = a(p, c, w, d);
                        e.splice(l, 1, E[0], E[1], E[2], E[3]);
                        l += 4
                    } else {
                        l++
                    }
                    c = y
                }
                m = e[l];
                m.b = c;
                m.c = c + (m.d - c) * .4;
                m.da = m.d - m.a;
                m.ca = m.c - m.a;
                m.ba = c - m.a;
                if (s) {
                    E = a(m.a, c, m.c, m.d);
                    e.splice(l, 1, E[0], E[1], E[2], E[3])
                }
            },
            l = function(e, t, i, s) {
                var u = [],
                    a, f, l, c, h, p;
                if (s) {
                    e = [s].concat(e);
                    f = e.length;
                    while (--f > -1) {
                        if (typeof(p = e[f][t]) === "string")
                            if (p.charAt(1) === "=") {
                                e[f][t] = s[t] + Number(p.charAt(0) + p.substr(2))
                            }
                    }
                }
                a = e.length - 2;
                if (a < 0) {
                    u[0] = new o(e[0][t], 0, 0, e[a < -1 ? 0 : 1][t]);
                    return u
                }
                for (f = 0; f < a; f++) {
                    l = e[f][t];
                    c = e[f + 1][t];
                    u[f] = new o(l, 0, 0, c);
                    if (i) {
                        h = e[f + 2][t];
                        n[f] = (n[f] || 0) + (c - l) * (c - l);
                        r[f] = (r[f] || 0) + (h - c) * (h - c)
                    }
                }
                u[f] = new o(e[f][t], 0, 0, e[f + 1][t]);
                return u
            },
            c = function(e, t, o, a, c, h) {
                var p = {},
                    d = [],
                    v = h || e[0],
                    m, g, y, b, w, E, S, x;
                c = typeof c === "string" ? "," + c + "," : u;
                if (t == null) {
                    t = 1
                }
                for (g in e[0]) {
                    d.push(g)
                }
                if (e.length > 1) {
                    x = e[e.length - 1];
                    S = true;
                    m = d.length;
                    while (--m > -1) {
                        g = d[m];
                        if (Math.abs(v[g] - x[g]) > .05) {
                            S = false;
                            break
                        }
                    }
                    if (S) {
                        e = e.concat();
                        if (h) {
                            e.unshift(h)
                        }
                        e.push(e[1]);
                        h = e[e.length - 3]
                    }
                }
                n.length = r.length = i.length = 0;
                m = d.length;
                while (--m > -1) {
                    g = d[m];
                    s[g] = c.indexOf("," + g + ",") !== -1;
                    p[g] = l(e, g, s[g], h)
                }
                m = n.length;
                while (--m > -1) {
                    n[m] = Math.sqrt(n[m]);
                    r[m] = Math.sqrt(r[m])
                }
                if (!a) {
                    m = d.length;
                    while (--m > -1) {
                        if (s[g]) {
                            y = p[d[m]];
                            E = y.length - 1;
                            for (b = 0; b < E; b++) {
                                w = y[b + 1].da / r[b] + y[b].da / n[b];
                                i[b] = (i[b] || 0) + w * w
                            }
                        }
                    }
                    m = i.length;
                    while (--m > -1) {
                        i[m] = Math.sqrt(i[m])
                    }
                }
                m = d.length;
                b = o ? 4 : 1;
                while (--m > -1) {
                    g = d[m];
                    y = p[g];
                    f(y, t, o, a, s[g]);
                    if (S) {
                        y.splice(0, b);
                        y.splice(y.length - b, b)
                    }
                }
                return p
            },
            h = function(e, t, n) {
                t = t || "soft";
                var r = {},
                    i = t === "cubic" ? 3 : 2,
                    s = t === "soft",
                    u = [],
                    a, f, l, c, h, p, d, v, m, g, y;
                if (s && n) {
                    e = [n].concat(e)
                }
                if (e == null || e.length < i + 1) {
                    throw "invalid Bezier data"
                }
                for (m in e[0]) {
                    u.push(m)
                }
                p = u.length;
                while (--p > -1) {
                    m = u[p];
                    r[m] = h = [];
                    g = 0;
                    v = e.length;
                    for (d = 0; d < v; d++) {
                        a = n == null ? e[d][m] : typeof(y = e[d][m]) === "string" && y.charAt(1) === "=" ? n[m] + Number(y.charAt(0) + y.substr(2)) : Number(y);
                        if (s)
                            if (d > 1)
                                if (d < v - 1) {
                                    h[g++] = (a + h[g - 2]) / 2
                                } h[g++] = a
                    }
                    v = g - i + 1;
                    g = 0;
                    for (d = 0; d < v; d += i) {
                        a = h[d];
                        f = h[d + 1];
                        l = h[d + 2];
                        c = i === 2 ? 0 : h[d + 3];
                        h[g++] = y = i === 3 ? new o(a, f, l, c) : new o(a, (2 * f + a) / 3, (2 * f + l) / 3, l)
                    }
                    h.length = g
                }
                return r
            },
            p = function(e, t, n) {
                var r = 1 / n,
                    i = e.length,
                    s, o, u, a, f, l, c, h, p, d, v;
                while (--i > -1) {
                    d = e[i];
                    u = d.a;
                    a = d.d - u;
                    f = d.c - u;
                    l = d.b - u;
                    s = o = 0;
                    for (h = 1; h <= n; h++) {
                        c = r * h;
                        p = 1 - c;
                        s = o - (o = (c * c * a + 3 * p * (c * f + p * l)) * c);
                        v = i * n + h - 1;
                        t[v] = (t[v] || 0) + s * s
                    }
                }
            },
            d = function(e, t) {
                t = t >> 0 || 6;
                var n = [],
                    r = [],
                    i = 0,
                    s = 0,
                    o = t - 1,
                    u = [],
                    a = [],
                    f, l, c, h;
                for (f in e) {
                    p(e[f], n, t)
                }
                c = n.length;
                for (l = 0; l < c; l++) {
                    i += Math.sqrt(n[l]);
                    h = l % t;
                    a[h] = i;
                    if (h === o) {
                        s += i;
                        h = l / t >> 0;
                        u[h] = a;
                        r[h] = s;
                        i = 0;
                        a = []
                    }
                }
                return {
                    length: s,
                    lengths: r,
                    segments: u
                }
            },
            v = window._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                API: 2,
                global: true,
                init: function(e, t, n) {
                    this._target = e;
                    if (t instanceof Array) {
                        t = {
                            values: t
                        }
                    }
                    this._func = {};
                    this._round = {};
                    this._props = [];
                    this._timeRes = t.timeResolution == null ? 6 : parseInt(t.timeResolution, 10);
                    var r = t.values || [],
                        i = {},
                        s = r[0],
                        o = t.autoRotate || n.vars.orientToBezier,
                        u, a, f, l, p;
                    this._autoRotate = o ? o instanceof Array ? o : [
                        ["x", "y", "rotation", o === true ? 0 : Number(o) || 0]
                    ] : null;
                    for (u in s) {
                        this._props.push(u)
                    }
                    f = this._props.length;
                    while (--f > -1) {
                        u = this._props[f];
                        this._overwriteProps.push(u);
                        a = this._func[u] = typeof e[u] === "function";
                        i[u] = !a ? parseFloat(e[u]) : e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)]();
                        if (!p)
                            if (i[u] !== r[0][u]) {
                                p = i
                            }
                    }
                    this._beziers = t.type !== "cubic" && t.type !== "quadratic" && t.type !== "soft" ? c(r, isNaN(t.curviness) ? 1 : t.curviness, false, t.type === "thruBasic", t.correlate, p) : h(r, t.type, i);
                    this._segCount = this._beziers[u].length;
                    if (this._timeRes) {
                        var v = d(this._beziers, this._timeRes);
                        this._length = v.length;
                        this._lengths = v.lengths;
                        this._segments = v.segments;
                        this._l1 = this._li = this._s1 = this._si = 0;
                        this._l2 = this._lengths[0];
                        this._curSeg = this._segments[0];
                        this._s2 = this._curSeg[0];
                        this._prec = 1 / this._curSeg.length
                    }
                    if (o = this._autoRotate) {
                        if (!(o[0] instanceof Array)) {
                            this._autoRotate = o = [o]
                        }
                        f = o.length;
                        while (--f > -1) {
                            for (l = 0; l < 3; l++) {
                                u = o[f][l];
                                this._func[u] = typeof e[u] === "function" ? e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)] : false
                            }
                        }
                    }
                    return true
                },
                set: function(t) {
                    var n = this._segCount,
                        r = this._func,
                        i = this._target,
                        s, o, u, a, f, l, c, h, p, d;
                    if (!this._timeRes) {
                        s = t < 0 ? 0 : t >= 1 ? n - 1 : n * t >> 0;
                        l = (t - s * (1 / n)) * n
                    } else {
                        p = this._lengths;
                        d = this._curSeg;
                        t *= this._length;
                        u = this._li;
                        if (t > this._l2 && u < n - 1) {
                            h = n - 1;
                            while (u < h && (this._l2 = p[++u]) <= t) {}
                            this._l1 = p[u - 1];
                            this._li = u;
                            this._curSeg = d = this._segments[u];
                            this._s2 = d[this._s1 = this._si = 0]
                        } else if (t < this._l1 && u > 0) {
                            while (u > 0 && (this._l1 = p[--u]) >= t) {}
                            if (u === 0 && t < this._l1) {
                                this._l1 = 0
                            } else {
                                u++
                            }
                            this._l2 = p[u];
                            this._li = u;
                            this._curSeg = d = this._segments[u];
                            this._s1 = d[(this._si = d.length - 1) - 1] || 0;
                            this._s2 = d[this._si]
                        }
                        s = u;
                        t -= this._l1;
                        u = this._si;
                        if (t > this._s2 && u < d.length - 1) {
                            h = d.length - 1;
                            while (u < h && (this._s2 = d[++u]) <= t) {}
                            this._s1 = d[u - 1];
                            this._si = u
                        } else if (t < this._s1 && u > 0) {
                            while (u > 0 && (this._s1 = d[--u]) >= t) {}
                            if (u === 0 && t < this._s1) {
                                this._s1 = 0
                            } else {
                                u++
                            }
                            this._s2 = d[u];
                            this._si = u
                        }
                        l = (u + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                    }
                    o = 1 - l;
                    u = this._props.length;
                    while (--u > -1) {
                        a = this._props[u];
                        f = this._beziers[a][s];
                        c = (l * l * f.da + 3 * o * (l * f.ca + o * f.ba)) * l + f.a;
                        if (this._round[a]) {
                            c = c + (c > 0 ? .5 : -.5) >> 0
                        }
                        if (r[a]) {
                            i[a](c)
                        } else {
                            if (a == "x") {
                                i.setX(c)
                            } else if (a == "y") {
                                i.setY(c)
                            } else if (a == "z") {
                                i.setZ(c)
                            } else if (a == "angleX") {
                                i.setAngleX(c)
                            } else if (a == "angleY") {
                                i.setAngleY(c)
                            } else if (a == "angleZ") {
                                i.setAngleZ(c)
                            } else if (a == "w") {
                                i.setWidth(c)
                            } else if (a == "h") {
                                i.setHeight(c)
                            } else if (a == "alpha") {
                                i.setAlpha(c)
                            } else if (a == "scale") {
                                i.setScale2(c)
                            } else {
                                i[a] = c
                            }
                        }
                    }
                    if (this._autoRotate) {
                        var v = this._autoRotate,
                            m, g, y, b, w, E, S;
                        u = v.length;
                        while (--u > -1) {
                            a = v[u][2];
                            E = v[u][3] || 0;
                            S = v[u][4] === true ? 1 : e;
                            f = this._beziers[v[u][0]];
                            m = this._beziers[v[u][1]];
                            if (f && m) {
                                f = f[s];
                                m = m[s];
                                g = f.a + (f.b - f.a) * l;
                                b = f.b + (f.c - f.b) * l;
                                g += (b - g) * l;
                                b += (f.c + (f.d - f.c) * l - b) * l;
                                y = m.a + (m.b - m.a) * l;
                                w = m.b + (m.c - m.b) * l;
                                y += (w - y) * l;
                                w += (m.c + (m.d - m.c) * l - w) * l;
                                c = Math.atan2(w - y, b - g) * S + E;
                                if (r[a]) {
                                    i[a](c)
                                } else {
                                    i[a] = c
                                }
                            }
                        }
                    }
                }
            }),
            m = v.prototype;
        v.bezierThrough = c;
        v.cubicToQuadratic = a;
        v._autoCSS = true;
        v.quadraticToCubic = function(e, t, n) {
            return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
        };
        v._cssRegister = function() {
            var e = window._gsDefine.globals.CSSPlugin;
            if (!e) {
                return
            }
            var n = e._internals,
                r = n._parseToProxy,
                i = n._setPluginRatio,
                s = n.CSSPropTween;
            n._registerComplexSpecialProp("bezier", {
                parser: function(e, n, o, u, a, f) {
                    if (n instanceof Array) {
                        n = {
                            values: n
                        }
                    }
                    f = new v;
                    var l = n.values,
                        c = l.length - 1,
                        h = [],
                        p = {},
                        d, m, g;
                    if (c < 0) {
                        return a
                    }
                    for (d = 0; d <= c; d++) {
                        g = r(e, l[d], u, a, f, c !== d);
                        h[d] = g.end
                    }
                    for (m in n) {
                        p[m] = n[m]
                    }
                    p.values = h;
                    a = new s(e, "bezier", 0, 0, g.pt, 2);
                    a.data = g;
                    a.plugin = f;
                    a.setRatio = i;
                    if (p.autoRotate === 0) {
                        p.autoRotate = true
                    }
                    if (p.autoRotate && !(p.autoRotate instanceof Array)) {
                        d = p.autoRotate === true ? 0 : Number(p.autoRotate) * t;
                        p.autoRotate = g.end.left != null ? [
                            ["left", "top", "rotation", d, true]
                        ] : g.end.x != null ? [
                            ["x", "y", "rotation", d, true]
                        ] : false
                    }
                    if (p.autoRotate) {
                        if (!u._transform) {
                            u._enableTransforms(false)
                        }
                        g.autoRotate = u._target._gsTransform
                    }
                    f._onInitTween(g.proxy, p, u._tween);
                    return a
                }
            })
        };
        m._roundProps = function(e, t) {
            var n = this._overwriteProps,
                r = n.length;
            while (--r > -1) {
                if (e[n[r]] || e.bezier || e.bezierThrough) {
                    this._round[n[r]] = t
                }
            }
        };
        m._kill = function(e) {
            var t = this._props,
                n, r;
            for (n in this._beziers) {
                if (n in e) {
                    delete this._beziers[n];
                    delete this._func[n];
                    r = t.length;
                    while (--r > -1) {
                        if (t[r] === n) {
                            t.splice(r, 1)
                        }
                    }
                }
            }
            return this._super._kill.call(this, e)
        }
    })();
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
        var n = function() {
                e.call(this, "css");
                this._overwriteProps.length = 0
            },
            r, i, s, o, u = {},
            a = n.prototype = new e("css");
        a.constructor = n;
        n.version = "1.9.7";
        n.API = 2;
        n.defaultTransformPerspective = 0;
        a = "px";
        n.suffixMap = {
            top: a,
            right: a,
            bottom: a,
            left: a,
            width: a,
            height: a,
            fontSize: a,
            padding: a,
            margin: a,
            perspective: a
        };
        var f = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            l = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            c = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            h = /[^\d\-\.]/g,
            p = /(?:\d|\-|\+|=|#|\.)*/g,
            d = /opacity *= *([^)]*)/,
            v = /opacity:([^;]*)/,
            m = /alpha\(opacity *=.+?\)/i,
            g = /^(rgb|hsl)/,
            y = /([A-Z])/g,
            b = /-([a-z])/gi,
            w = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            E = function(e, t) {
                return t.toUpperCase()
            },
            S = /(?:Left|Right|Width)/i,
            x = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            T = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            N = /,(?=[^\)]*(?:\(|$))/gi,
            C = Math.PI / 180,
            k = 180 / Math.PI,
            L = {},
            A = document,
            O = A.createElement("div"),
            M = A.createElement("img"),
            _ = n._internals = {
                _specialProps: u
            },
            D = navigator.userAgent,
            P, H, B, j, F, I, q = function() {
                var e = D.indexOf("Android"),
                    t = A.createElement("div"),
                    n;
                B = D.indexOf("Safari") !== -1 && D.indexOf("Chrome") === -1 && (e === -1 || Number(D.substr(e + 8, 1)) > 3);
                F = B && Number(D.substr(D.indexOf("Version/") + 8, 1)) < 6;
                j = D.indexOf("Firefox") !== -1;
                /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(D);
                I = parseFloat(RegExp.$1);
                t.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
                n = t.getElementsByTagName("a")[0];
                return n ? /^0.55/.test(n.style.opacity) : false
            }(),
            R = function(e) {
                return d.test(typeof e === "string" ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            U = function(e) {
                if (window.console) {
                    console.log(e)
                }
            },
            z = "",
            W = "",
            X = function(e, t) {
                t = t || O;
                var n = t.style,
                    r, i;
                if (n[e] !== undefined) {
                    return e
                }
                e = e.charAt(0).toUpperCase() + e.substr(1);
                r = ["O", "Moz", "ms", "Ms", "Webkit"];
                i = 5;
                while (--i > -1 && n[r[i] + e] === undefined) {}
                if (i >= 0) {
                    W = i === 3 ? "ms" : r[i];
                    z = "-" + W.toLowerCase() + "-";
                    return W + e
                }
                return null
            },
            V = A.defaultView ? A.defaultView.getComputedStyle : function() {},
            $ = n.getStyle = function(e, t, n, r, i) {
                var s;
                if (!q)
                    if (t === "opacity") {
                        return R(e)
                    } if (!r && e.style[t]) {
                    s = e.style[t]
                } else if (n = n || V(e, null)) {
                    e = n.getPropertyValue(t.replace(y, "-$1").toLowerCase());
                    s = e || n.length ? e : n[t]
                } else if (e.currentStyle) {
                    n = e.currentStyle;
                    s = n[t]
                }
                return i != null && (!s || s === "none" || s === "auto" || s === "auto auto") ? i : s
            },
            J = function(e, t, n, r, i) {
                if (r === "px" || !r) {
                    return n
                }
                if (r === "auto" || !n) {
                    return 0
                }
                var s = S.test(t),
                    o = e,
                    u = O.style,
                    a = n < 0,
                    f;
                if (a) {
                    n = -n
                }
                if (r === "%" && t.indexOf("border") !== -1) {
                    f = n / 100 * (s ? e.clientWidth : e.clientHeight)
                } else {
                    u.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
                    if (r === "%" || !o.appendChild) {
                        o = e.parentNode || A.body;
                        u[s ? "width" : "height"] = n + r
                    } else {
                        u[s ? "borderLeftWidth" : "borderTopWidth"] = n + r
                    }
                    o.appendChild(O);
                    f = parseFloat(O[s ? "offsetWidth" : "offsetHeight"]);
                    o.removeChild(O);
                    if (f === 0 && !i) {
                        f = J(e, t, n, r, true)
                    }
                }
                return a ? -f : f
            },
            K = function(e, t, n) {
                if ($(e, "position", n) !== "absolute") {
                    return 0
                }
                var r = t === "left" ? "Left" : "Top",
                    i = $(e, "margin" + r, n);
                return e["offset" + r] - (J(e, t, parseFloat(i), i.replace(p, "")) || 0)
            },
            Q = function(e, t) {
                var n = {},
                    r, i;
                if (t = t || V(e, null)) {
                    if (r = t.length) {
                        while (--r > -1) {
                            n[t[r].replace(b, E)] = t.getPropertyValue(t[r])
                        }
                    } else {
                        for (r in t) {
                            n[r] = t[r]
                        }
                    }
                } else if (t = e.currentStyle || e.style) {
                    for (r in t) {
                        n[r.replace(b, E)] = t[r]
                    }
                }
                if (!q) {
                    n.opacity = R(e)
                }
                i = Nt(e, t, false);
                n.rotation = i.rotation * k;
                n.skewX = i.skewX * k;
                n.scaleX = i.scaleX;
                n.scaleY = i.scaleY;
                n.x = i.x;
                n.y = i.y;
                if (Tt) {
                    n.z = i.z;
                    n.rotationX = i.rotationX * k;
                    n.rotationY = i.rotationY * k;
                    n.scaleZ = i.scaleZ
                }
                if (n.filters) {
                    delete n.filters
                }
                return n
            },
            G = function(e, t, n, r, i) {
                var s = {},
                    o = e.style,
                    u, a, f;
                for (a in n) {
                    if (a !== "cssText")
                        if (a !== "length")
                            if (isNaN(a))
                                if (t[a] !== (u = n[a]) || i && i[a])
                                    if (a.indexOf("Origin") === -1)
                                        if (typeof u === "number" || typeof u === "string") {
                                            s[a] = u === "auto" && (a === "left" || a === "top") ? K(e, a) : (u === "" || u === "auto" || u === "none") && typeof t[a] === "string" && t[a].replace(h, "") !== "" ? 0 : u;
                                            if (o[a] !== undefined) {
                                                f = new ht(o, a, o[a], f)
                                            }
                                        }
                }
                if (r) {
                    for (a in r) {
                        if (a !== "className") {
                            s[a] = r[a]
                        }
                    }
                }
                return {
                    difs: s,
                    firstMPT: f
                }
            },
            Y = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            Z = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            et = function(e, t, n) {
                var r = parseFloat(t === "width" ? e.offsetWidth : e.offsetHeight),
                    i = Y[t],
                    s = i.length;
                n = n || V(e, null);
                while (--s > -1) {
                    r -= parseFloat($(e, "padding" + i[s], n, true)) || 0;
                    r -= parseFloat($(e, "border" + i[s] + "Width", n, true)) || 0
                }
                return r
            },
            tt = function(e, t) {
                if (e == null || e === "" || e === "auto" || e === "auto auto") {
                    e = "0 0"
                }
                var n = e.split(" "),
                    r = e.indexOf("left") !== -1 ? "0%" : e.indexOf("right") !== -1 ? "100%" : n[0],
                    i = e.indexOf("top") !== -1 ? "0%" : e.indexOf("bottom") !== -1 ? "100%" : n[1];
                if (i == null) {
                    i = "0"
                } else if (i === "center") {
                    i = "50%"
                }
                if (r === "center" || isNaN(parseFloat(r))) {
                    r = "50%"
                }
                if (t) {
                    t.oxp = r.indexOf("%") !== -1;
                    t.oyp = i.indexOf("%") !== -1;
                    t.oxr = r.charAt(1) === "=";
                    t.oyr = i.charAt(1) === "=";
                    t.ox = parseFloat(r.replace(h, ""));
                    t.oy = parseFloat(i.replace(h, ""))
                }
                return r + " " + i + (n.length > 2 ? " " + n[2] : "")
            },
            nt = function(e, t) {
                return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
            },
            rt = function(e, t) {
                return e == null ? t : typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
            },
            it = function(e, t, n, r) {
                var i = 1e-6,
                    s, o, u, a;
                if (e == null) {
                    a = t
                } else if (typeof e === "number") {
                    a = e * C
                } else {
                    s = Math.PI * 2;
                    o = e.split("_");
                    u = Number(o[0].replace(h, "")) * (e.indexOf("rad") === -1 ? C : 1) - (e.charAt(1) === "=" ? 0 : t);
                    if (o.length) {
                        if (r) {
                            r[n] = t + u
                        }
                        if (e.indexOf("short") !== -1) {
                            u = u % s;
                            if (u !== u % (s / 2)) {
                                u = u < 0 ? u + s : u - s
                            }
                        }
                        if (e.indexOf("_cw") !== -1 && u < 0) {
                            u = (u + s * 9999999999) % s - (u / s | 0) * s
                        } else if (e.indexOf("ccw") !== -1 && u > 0) {
                            u = (u - s * 9999999999) % s - (u / s | 0) * s
                        }
                    }
                    a = t + u
                }
                if (a < i && a > -i) {
                    a = 0
                }
                return a
            },
            st = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ot = function(e, t, n) {
                e = e < 0 ? e + 1 : e > 1 ? e - 1 : e;
                return (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * 255 + .5 | 0
            },
            ut = function(e) {
                var t, n, r, i, s, o;
                if (!e || e === "") {
                    return st.black
                }
                if (typeof e === "number") {
                    return [e >> 16, e >> 8 & 255, e & 255]
                }
                if (e.charAt(e.length - 1) === ",") {
                    e = e.substr(0, e.length - 1)
                }
                if (st[e]) {
                    return st[e]
                }
                if (e.charAt(0) === "#") {
                    if (e.length === 4) {
                        t = e.charAt(1), n = e.charAt(2), r = e.charAt(3);
                        e = "#" + t + t + n + n + r + r
                    }
                    e = parseInt(e.substr(1), 16);
                    return [e >> 16, e >> 8 & 255, e & 255]
                }
                if (e.substr(0, 3) === "hsl") {
                    e = e.match(f);
                    i = Number(e[0]) % 360 / 360;
                    s = Number(e[1]) / 100;
                    o = Number(e[2]) / 100;
                    n = o <= .5 ? o * (s + 1) : o + s - o * s;
                    t = o * 2 - n;
                    if (e.length > 3) {
                        e[3] = Number(e[3])
                    }
                    e[0] = ot(i + 1 / 3, t, n);
                    e[1] = ot(i, t, n);
                    e[2] = ot(i - 1 / 3, t, n);
                    return e
                }
                e = e.match(f) || st.transparent;
                e[0] = Number(e[0]);
                e[1] = Number(e[1]);
                e[2] = Number(e[2]);
                if (e.length > 3) {
                    e[3] = Number(e[3])
                }
                return e
            },
            at = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (a in st) {
            at += "|" + a + "\\b"
        }
        at = new RegExp(at + ")", "gi");
        var ft = function(e, t, n, r) {
                if (e == null) {
                    return function(e) {
                        return e
                    }
                }
                var i = t ? (e.match(at) || [""])[0] : "",
                    s = e.split(i).join("").match(c) || [],
                    o = e.substr(0, e.indexOf(s[0])),
                    u = e.charAt(e.length - 1) === ")" ? ")" : "",
                    a = e.indexOf(" ") !== -1 ? " " : ",",
                    l = s.length,
                    h = l > 0 ? s[0].replace(f, "") : "",
                    p;
                if (!l) {
                    return function(e) {
                        return e
                    }
                }
                if (t) {
                    p = function(e) {
                        var t, f, d, v;
                        if (typeof e === "number") {
                            e += h
                        } else if (r && N.test(e)) {
                            v = e.replace(N, "|").split("|");
                            for (d = 0; d < v.length; d++) {
                                v[d] = p(v[d])
                            }
                            return v.join(",")
                        }
                        t = (e.match(at) || [i])[0];
                        f = e.split(t).join("").match(c) || [];
                        d = f.length;
                        if (l > d--) {
                            while (++d < l) {
                                f[d] = n ? f[(d - 1) / 2 | 0] : s[d]
                            }
                        }
                        return o + f.join(a) + a + t + u + (e.indexOf("inset") !== -1 ? " inset" : "")
                    };
                    return p
                }
                p = function(e) {
                    var t, i, f;
                    if (typeof e === "number") {
                        e += h
                    } else if (r && N.test(e)) {
                        i = e.replace(N, "|").split("|");
                        for (f = 0; f < i.length; f++) {
                            i[f] = p(i[f])
                        }
                        return i.join(",")
                    }
                    t = e.match(c) || [];
                    f = t.length;
                    if (l > f--) {
                        while (++f < l) {
                            t[f] = n ? t[(f - 1) / 2 | 0] : s[f]
                        }
                    }
                    return o + t.join(a) + u
                };
                return p
            },
            lt = function(e) {
                e = e.split(",");
                return function(t, n, r, i, s, o, u) {
                    var a = (n + "").split(" "),
                        f;
                    u = {};
                    for (f = 0; f < 4; f++) {
                        u[e[f]] = a[f] = a[f] || a[(f - 1) / 2 >> 0]
                    }
                    return i.parse(t, u, s, o)
                }
            },
            ct = _._setPluginRatio = function(e) {
                this.plugin.setRatio(e);
                var t = this.data,
                    n = t.proxy,
                    r = t.firstMPT,
                    i = 1e-6,
                    s, o, u, a;
                while (r) {
                    s = n[r.v];
                    if (r.r) {
                        s = s > 0 ? s + .5 | 0 : s - .5 | 0
                    } else if (s < i && s > -i) {
                        s = 0
                    }
                    r.t[r.p] = s;
                    r = r._next
                }
                if (t.autoRotate) {
                    t.autoRotate.rotation = n.rotation
                }
                if (e === 1) {
                    r = t.firstMPT;
                    while (r) {
                        o = r.t;
                        if (!o.type) {
                            o.e = o.s + o.xs0
                        } else if (o.type === 1) {
                            a = o.xs0 + o.s + o.xs1;
                            for (u = 1; u < o.l; u++) {
                                a += o["xn" + u] + o["xs" + (u + 1)]
                            }
                            o.e = a
                        }
                        r = r._next
                    }
                }
            },
            ht = function(e, t, n, r, i) {
                this.t = e;
                this.p = t;
                this.v = n;
                this.r = i;
                if (r) {
                    r._prev = this;
                    this._next = r
                }
            },
            pt = _._parseToProxy = function(e, t, n, r, i, s) {
                var o = r,
                    u = {},
                    a = {},
                    f = n._transform,
                    l = L,
                    c, h, p, d, v;
                n._transform = null;
                L = t;
                r = v = n.parse(e, t, r, i);
                L = l;
                if (s) {
                    n._transform = f;
                    if (o) {
                        o._prev = null;
                        if (o._prev) {
                            o._prev._next = null
                        }
                    }
                }
                while (r && r !== o) {
                    if (r.type <= 1) {
                        h = r.p;
                        a[h] = r.s + r.c;
                        u[h] = r.s;
                        if (!s) {
                            d = new ht(r, "s", h, d, r.r);
                            r.c = 0
                        }
                        if (r.type === 1) {
                            c = r.l;
                            while (--c > 0) {
                                p = "xn" + c;
                                h = r.p + "_" + p;
                                a[h] = r.data[p];
                                u[h] = r[p];
                                if (!s) {
                                    d = new ht(r, p, h, d, r.rxp[p])
                                }
                            }
                        }
                    }
                    r = r._next
                }
                return {
                    proxy: u,
                    end: a,
                    firstMPT: d,
                    pt: v
                }
            },
            dt = _.CSSPropTween = function(e, t, n, i, s, u, a, f, l, c, h) {
                this.t = e;
                this.p = t;
                this.s = n;
                this.c = i;
                this.n = a || "css_" + t;
                if (!(e instanceof dt)) {
                    o.push(this.n)
                }
                this.r = f;
                this.type = u || 0;
                if (l) {
                    this.pr = l;
                    r = true
                }
                this.b = c === undefined ? n : c;
                this.e = h === undefined ? n + i : h;
                if (s) {
                    this._next = s;
                    s._prev = this
                }
            },
            vt = n.parseComplex = function(e, t, n, r, i, s, o, u, a, c) {
                n = n || s || "";
                o = new dt(e, t, 0, 0, o, c ? 2 : 1, null, false, u, n, r);
                r += "";
                var h = n.split(", ").join(",").split(" "),
                    p = r.split(", ").join(",").split(" "),
                    d = h.length,
                    v = P !== false,
                    m, y, b, w, E, S, x, T, C, k, L, A;
                if (r.indexOf(",") !== -1 || n.indexOf(",") !== -1) {
                    h = h.join(" ").replace(N, ", ").split(" ");
                    p = p.join(" ").replace(N, ", ").split(" ");
                    d = h.length
                }
                if (d !== p.length) {
                    h = (s || "").split(" ");
                    d = h.length
                }
                o.plugin = a;
                o.setRatio = c;
                for (m = 0; m < d; m++) {
                    w = h[m];
                    E = p[m];
                    T = parseFloat(w);
                    if (T || T === 0) {
                        o.appendXtra("", T, nt(E, T), E.replace(l, ""), v && E.indexOf("px") !== -1, true)
                    } else if (i && (w.charAt(0) === "#" || st[w] || g.test(w))) {
                        A = E.charAt(E.length - 1) === "," ? ")," : ")";
                        w = ut(w);
                        E = ut(E);
                        C = w.length + E.length > 6;
                        if (C && !q && E[3] === 0) {
                            o["xs" + o.l] += o.l ? " transparent" : "transparent";
                            o.e = o.e.split(p[m]).join("transparent")
                        } else {
                            if (!q) {
                                C = false
                            }
                            o.appendXtra(C ? "rgba(" : "rgb(", w[0], E[0] - w[0], ",", true, true).appendXtra("", w[1], E[1] - w[1], ",", true).appendXtra("", w[2], E[2] - w[2], C ? "," : A, true);
                            if (C) {
                                w = w.length < 4 ? 1 : w[3];
                                o.appendXtra("", w, (E.length < 4 ? 1 : E[3]) - w, A, false)
                            }
                        }
                    } else {
                        S = w.match(f);
                        if (!S) {
                            o["xs" + o.l] += o.l ? " " + w : w
                        } else {
                            x = E.match(l);
                            if (!x || x.length !== S.length) {
                                return o
                            }
                            b = 0;
                            for (y = 0; y < S.length; y++) {
                                L = S[y];
                                k = w.indexOf(L, b);
                                o.appendXtra(w.substr(b, k - b), Number(L), nt(x[y], L), "", v && w.substr(k + L.length, 2) === "px", y === 0);
                                b = k + L.length
                            }
                            o["xs" + o.l] += w.substr(b)
                        }
                    }
                }
                if (r.indexOf("=") !== -1)
                    if (o.data) {
                        A = o.xs0 + o.data.s;
                        for (m = 1; m < o.l; m++) {
                            A += o["xs" + m] + o.data["xn" + m]
                        }
                        o.e = A + o["xs" + m]
                    } if (!o.l) {
                    o.type = -1;
                    o.xs0 = o.e
                }
                return o.xfirst || o
            },
            mt = 9;
        a = dt.prototype;
        a.l = a.pr = 0;
        while (--mt > 0) {
            a["xn" + mt] = 0;
            a["xs" + mt] = ""
        }
        a.xs0 = "";
        a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null;
        a.appendXtra = function(e, t, n, r, i, s) {
            var o = this,
                u = o.l;
            o["xs" + u] += s && u ? " " + e : e || "";
            if (!n)
                if (u !== 0 && !o.plugin) {
                    o["xs" + u] += t + (r || "");
                    return o
                } o.l++;
            o.type = o.setRatio ? 2 : 1;
            o["xs" + o.l] = r || "";
            if (u > 0) {
                o.data["xn" + u] = t + n;
                o.rxp["xn" + u] = i;
                o["xn" + u] = t;
                if (!o.plugin) {
                    o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr);
                    o.xfirst.xs0 = 0
                }
                return o
            }
            o.data = {
                s: t + n
            };
            o.rxp = {};
            o.s = t;
            o.c = n;
            o.r = i;
            return o
        };
        var gt = function(e, t) {
                t = t || {};
                this.p = t.prefix ? X(e) || e : e;
                u[e] = u[this.p] = this;
                this.format = t.formatter || ft(t.defaultValue, t.color, t.collapsible, t.multi);
                if (t.parser) {
                    this.parse = t.parser
                }
                this.clrs = t.color;
                this.multi = t.multi;
                this.keyword = t.keyword;
                this.dflt = t.defaultValue;
                this.pr = t.priority || 0
            },
            yt = _._registerComplexSpecialProp = function(e, t, n) {
                if (typeof t !== "object") {
                    t = {
                        parser: n
                    }
                }
                var r = e.split(","),
                    i = t.defaultValue,
                    s, o;
                n = n || [i];
                for (s = 0; s < r.length; s++) {
                    t.prefix = s === 0 && t.prefix;
                    t.defaultValue = n[s] || i;
                    o = new gt(r[s], t)
                }
            },
            bt = function(e) {
                if (!u[e]) {
                    var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                    yt(e, {
                        parser: function(e, n, r, i, s, o, a) {
                            var f = (window.GreenSockGlobals || window).com.greensock.plugins[t];
                            if (!f) {
                                U("Error: " + t + " js file not loaded.");
                                return s
                            }
                            f._cssRegister();
                            return u[r].parse(e, n, r, i, s, o, a)
                        }
                    })
                }
            };
        a = gt.prototype;
        a.parseComplex = function(e, t, n, r, i, s) {
            var o = this.keyword,
                u, a, f, l, c, h;
            if (this.multi)
                if (N.test(n) || N.test(t)) {
                    a = t.replace(N, "|").split("|");
                    f = n.replace(N, "|").split("|")
                } else if (o) {
                a = [t];
                f = [n]
            }
            if (f) {
                l = f.length > a.length ? f.length : a.length;
                for (u = 0; u < l; u++) {
                    t = a[u] = a[u] || this.dflt;
                    n = f[u] = f[u] || this.dflt;
                    if (o) {
                        c = t.indexOf(o);
                        h = n.indexOf(o);
                        if (c !== h) {
                            n = h === -1 ? f : a;
                            n[u] += " " + o
                        }
                    }
                }
                t = a.join(", ");
                n = f.join(", ")
            }
            return vt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
        };
        a.parse = function(e, t, n, r, i, o, u) {
            return this.parseComplex(e.style, this.format($(e, this.p, s, false, this.dflt)), this.format(t), i, o)
        };
        n.registerSpecialProp = function(e, t, n) {
            yt(e, {
                parser: function(e, r, i, s, o, u, a) {
                    var f = new dt(e, i, 0, 0, o, 2, i, false, n);
                    f.plugin = u;
                    f.setRatio = t(e, r, s._tween, i);
                    return f
                },
                priority: n
            })
        };
        var wt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
            Et = X("transform"),
            St = z + "transform",
            xt = X("transformOrigin"),
            Tt = X("perspective") !== null,
            Nt = function(e, t, r) {
                var i = r ? e._gsTransform || {
                        skewY: 0
                    } : {
                        skewY: 0
                    },
                    s = i.scaleX < 0,
                    o = 2e-5,
                    u = 1e5,
                    a = -Math.PI + 1e-4,
                    f = Math.PI - 1e-4,
                    l = Tt ? parseFloat($(e, xt, t, false, "0 0 0").split(" ")[2]) || i.zOrigin || 0 : 0,
                    c, h, p, d, v, m, g, y, b, w, E, S, T;
                if (Et) {
                    c = $(e, St, t, true)
                } else if (e.currentStyle) {
                    c = e.currentStyle.filter.match(x);
                    if (c && c.length === 4) {
                        c = [c[0].substr(4), Number(c[2].substr(4)), Number(c[1].substr(4)), c[3].substr(4), i.x || 0, i.y || 0].join(",")
                    } else if (i.x != null) {
                        return i
                    } else {
                        c = ""
                    }
                }
                h = (c || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
                p = h.length;
                while (--p > -1) {
                    d = Number(h[p]);
                    h[p] = (v = d - (d |= 0)) ? (v * u + (v < 0 ? -.5 : .5) | 0) / u + d : d
                }
                if (h.length === 16) {
                    var N = h[8],
                        C = h[9],
                        k = h[10],
                        L = h[12],
                        A = h[13],
                        O = h[14];
                    if (i.zOrigin) {
                        O = -i.zOrigin;
                        L = N * O - h[12];
                        A = C * O - h[13];
                        O = k * O + i.zOrigin - h[14]
                    }
                    if (!r || i.rotationX == null) {
                        var M = h[0],
                            _ = h[1],
                            D = h[2],
                            P = h[3],
                            H = h[4],
                            B = h[5],
                            j = h[6],
                            F = h[7],
                            I = h[11],
                            q = i.rotationX = Math.atan2(j, k),
                            R = q < a || q > f,
                            U, z, W, X, V, J, K;
                        if (q) {
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            U = H * X + N * V;
                            z = B * X + C * V;
                            W = j * X + k * V;
                            N = H * -V + N * X;
                            C = B * -V + C * X;
                            k = j * -V + k * X;
                            I = F * -V + I * X;
                            H = U;
                            B = z;
                            j = W
                        }
                        q = i.rotationY = Math.atan2(N, M);
                        if (q) {
                            J = q < a || q > f;
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            U = M * X - N * V;
                            z = _ * X - C * V;
                            W = D * X - k * V;
                            C = _ * V + C * X;
                            k = D * V + k * X;
                            I = P * V + I * X;
                            M = U;
                            _ = z;
                            D = W
                        }
                        q = i.rotation = Math.atan2(_, B);
                        if (q) {
                            K = q < a || q > f;
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            M = M * X + H * V;
                            z = _ * X + B * V;
                            B = _ * -V + B * X;
                            j = D * -V + j * X;
                            _ = z
                        }
                        if (K && R) {
                            i.rotation = i.rotationX = 0
                        } else if (K && J) {
                            i.rotation = i.rotationY = 0
                        } else if (J && R) {
                            i.rotationY = i.rotationX = 0
                        }
                        i.scaleX = (Math.sqrt(M * M + _ * _) * u + .5 | 0) / u;
                        i.scaleY = (Math.sqrt(B * B + C * C) * u + .5 | 0) / u;
                        i.scaleZ = (Math.sqrt(j * j + k * k) * u + .5 | 0) / u;
                        i.skewX = 0;
                        i.perspective = I ? 1 / (I < 0 ? -I : I) : 0;
                        i.x = L;
                        i.y = A;
                        i.z = O
                    }
                } else if ((!Tt || h.length === 0 || i.x !== h[4] || i.y !== h[5] || !i.rotationX && !i.rotationY) && !(i.x !== undefined && $(e, "display", t) === "none")) {
                    var Q = h.length >= 6,
                        G = Q ? h[0] : 1,
                        Y = h[1] || 0,
                        Z = h[2] || 0,
                        et = Q ? h[3] : 1;
                    i.x = h[4] || 0;
                    i.y = h[5] || 0;
                    m = Math.sqrt(G * G + Y * Y);
                    g = Math.sqrt(et * et + Z * Z);
                    y = G || Y ? Math.atan2(Y, G) : i.rotation || 0;
                    b = Z || et ? Math.atan2(Z, et) + y : i.skewX || 0;
                    w = m - Math.abs(i.scaleX || 0);
                    E = g - Math.abs(i.scaleY || 0);
                    if (Math.abs(b) > Math.PI / 2 && Math.abs(b) < Math.PI * 1.5) {
                        if (s) {
                            m *= -1;
                            b += y <= 0 ? Math.PI : -Math.PI;
                            y += y <= 0 ? Math.PI : -Math.PI
                        } else {
                            g *= -1;
                            b += b <= 0 ? Math.PI : -Math.PI
                        }
                    }
                    S = (y - i.rotation) % Math.PI;
                    T = (b - i.skewX) % Math.PI;
                    if (i.skewX === undefined || w > o || w < -o || E > o || E < -o || S > a && S < f && S * u | 0 !== 0 || T > a && T < f && T * u | 0 !== 0) {
                        i.scaleX = m;
                        i.scaleY = g;
                        i.rotation = y;
                        i.skewX = b
                    }
                    if (Tt) {
                        i.rotationX = i.rotationY = i.z = 0;
                        i.perspective = parseFloat(n.defaultTransformPerspective) || 0;
                        i.scaleZ = 1
                    }
                }
                i.zOrigin = l;
                for (p in i) {
                    if (i[p] < o)
                        if (i[p] > -o) {
                            i[p] = 0
                        }
                }
                if (r) {
                    e._gsTransform = i
                }
                return i
            },
            Ct = function(e) {
                var t = this.data,
                    n = -t.rotation,
                    r = n + t.skewX,
                    i = 1e5,
                    s = (Math.cos(n) * t.scaleX * i | 0) / i,
                    o = (Math.sin(n) * t.scaleX * i | 0) / i,
                    u = (Math.sin(r) * -t.scaleY * i | 0) / i,
                    a = (Math.cos(r) * t.scaleY * i | 0) / i,
                    f = this.t.style,
                    l = this.t.currentStyle,
                    c, h;
                if (!l) {
                    return
                }
                h = o;
                o = -u;
                u = -h;
                c = l.filter;
                f.filter = "";
                var v = this.t.offsetWidth,
                    m = this.t.offsetHeight,
                    g = l.position !== "absolute",
                    y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + s + ", M12=" + o + ", M21=" + u + ", M22=" + a,
                    b = t.x,
                    w = t.y,
                    E, S;
                if (t.ox != null) {
                    E = (t.oxp ? v * t.ox * .01 : t.ox) - v / 2;
                    S = (t.oyp ? m * t.oy * .01 : t.oy) - m / 2;
                    b += E - (E * s + S * o);
                    w += S - (E * u + S * a)
                }
                if (!g) {
                    var x = I < 8 ? 1 : -1,
                        N, C, k;
                    E = t.ieOffsetX || 0;
                    S = t.ieOffsetY || 0;
                    t.ieOffsetX = Math.round((v - ((s < 0 ? -s : s) * v + (o < 0 ? -o : o) * m)) / 2 + b);
                    t.ieOffsetY = Math.round((m - ((a < 0 ? -a : a) * m + (u < 0 ? -u : u) * v)) / 2 + w);
                    for (mt = 0; mt < 4; mt++) {
                        C = Z[mt];
                        N = l[C];
                        h = N.indexOf("px") !== -1 ? parseFloat(N) : J(this.t, C, parseFloat(N), N.replace(p, "")) || 0;
                        if (h !== t[C]) {
                            k = mt < 2 ? -t.ieOffsetX : -t.ieOffsetY
                        } else {
                            k = mt < 2 ? E - t.ieOffsetX : S - t.ieOffsetY
                        }
                        f[C] = (t[C] = Math.round(h - k * (mt === 0 || mt === 2 ? 1 : x))) + "px"
                    }
                    y += ", sizingMethod='auto expand')"
                } else {
                    E = v / 2;
                    S = m / 2;
                    y += ", Dx=" + (E - (E * s + S * o) + b) + ", Dy=" + (S - (E * u + S * a) + w) + ")"
                }
                if (c.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                    f.filter = c.replace(T, y)
                } else {
                    f.filter = y + " " + c
                }
                if (e === 0 || e === 1)
                    if (s === 1)
                        if (o === 0)
                            if (u === 0)
                                if (a === 1)
                                    if (!g || y.indexOf("Dx=0, Dy=0") !== -1)
                                        if (!d.test(c) || parseFloat(RegExp.$1) === 100)
                                            if (c.indexOf("gradient(") === -1) {
                                                f.removeAttribute("filter")
                                            }
            },
            kt = function(e) {
                var t = this.data,
                    n = this.t.style,
                    r = t.perspective,
                    i = t.scaleX,
                    s = 0,
                    o = 0,
                    u = 0,
                    a = 0,
                    f = t.scaleY,
                    l = 0,
                    c = 0,
                    h = 0,
                    p = 0,
                    d = t.scaleZ,
                    v = 0,
                    m = 0,
                    g = 0,
                    y = r ? -1 / r : 0,
                    b = t.rotation,
                    w = t.zOrigin,
                    E = 1e5,
                    S, x, T, N, C, k, L, A, O;
                if (j) {
                    L = n.top ? "top" : n.bottom ? "bottom" : parseFloat($(this.t, "top", null, false)) ? "bottom" : "top";
                    T = $(this.t, L, null, false);
                    A = parseFloat(T) || 0;
                    O = T.substr((A + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    n[L] = (t._ffFix ? A + .05 : A - .05) + O
                }
                if (b || t.skewX) {
                    T = i * Math.cos(b);
                    N = f * Math.sin(b);
                    b -= t.skewX;
                    s = i * -Math.sin(b);
                    f = f * Math.cos(b);
                    i = T;
                    a = N
                }
                b = t.rotationY;
                if (b) {
                    S = Math.cos(b);
                    x = Math.sin(b);
                    T = i * S;
                    N = a * S;
                    C = d * -x;
                    k = y * -x;
                    o = i * x;
                    l = a * x;
                    d = d * S;
                    y *= S;
                    i = T;
                    a = N;
                    h = C;
                    m = k
                }
                b = t.rotationX;
                if (b) {
                    S = Math.cos(b);
                    x = Math.sin(b);
                    T = s * S + o * x;
                    N = f * S + l * x;
                    C = p * S + d * x;
                    k = g * S + y * x;
                    o = s * -x + o * S;
                    l = f * -x + l * S;
                    d = p * -x + d * S;
                    y = g * -x + y * S;
                    s = T;
                    f = N;
                    p = C;
                    g = k
                }
                if (w) {
                    v -= w;
                    u = o * v;
                    c = l * v;
                    v = d * v + w
                }
                u = (T = (u += t.x) - (u |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + u : u;
                c = (T = (c += t.y) - (c |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + c : c;
                v = (T = (v += t.z) - (v |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + v : v;
                n[Et] = "matrix3d(" + [(i * E | 0) / E, (a * E | 0) / E, (h * E | 0) / E, (m * E | 0) / E, (s * E | 0) / E, (f * E | 0) / E, (p * E | 0) / E, (g * E | 0) / E, (o * E | 0) / E, (l * E | 0) / E, (d * E | 0) / E, (y * E | 0) / E, u, c, v, r ? 1 + -v / r : 1].join(",") + ")"
            },
            Lt = function(e) {
                var t = this.data,
                    n = this.t,
                    r = n.style,
                    i, s, o, u, a, f, l, c, h;
                if (j) {
                    i = r.top ? "top" : r.bottom ? "bottom" : parseFloat($(n, "top", null, false)) ? "bottom" : "top";
                    s = $(n, i, null, false);
                    o = parseFloat(s) || 0;
                    u = s.substr((o + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    r[i] = (t._ffFix ? o + .05 : o - .05) + u
                }
                if (!t.rotation && !t.skewX) {
                    r[Et] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")"
                } else {
                    a = t.rotation;
                    f = a - t.skewX;
                    l = 1e5;
                    c = t.scaleX * l;
                    h = t.scaleY * l;
                    r[Et] = "matrix(" + (Math.cos(a) * c | 0) / l + "," + (Math.sin(a) * c | 0) / l + "," + (Math.sin(f) * -h | 0) / l + "," + (Math.cos(f) * h | 0) / l + "," + t.x + "," + t.y + ")"
                }
            };
        yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {
            parser: function(e, t, n, r, i, o, u) {
                if (r._transform) {
                    return i
                }
                var a = r._transform = Nt(e, s, true),
                    f = e.style,
                    l = 1e-6,
                    c = wt.length,
                    h = u,
                    p = {},
                    d, v, m, g, y, b, w;
                if (typeof h.transform === "string" && Et) {
                    m = f.cssText;
                    f[Et] = h.transform;
                    f.display = "block";
                    d = Nt(e, null, false);
                    f.cssText = m
                } else if (typeof h === "object") {
                    d = {
                        scaleX: rt(h.scaleX != null ? h.scaleX : h.scale, a.scaleX),
                        scaleY: rt(h.scaleY != null ? h.scaleY : h.scale, a.scaleY),
                        scaleZ: rt(h.scaleZ != null ? h.scaleZ : h.scale, a.scaleZ),
                        x: rt(h.x, a.x),
                        y: rt(h.y, a.y),
                        z: rt(h.z, a.z),
                        perspective: rt(h.transformPerspective, a.perspective)
                    };
                    w = h.directionalRotation;
                    if (w != null) {
                        if (typeof w === "object") {
                            for (m in w) {
                                h[m] = w[m]
                            }
                        } else {
                            h.rotation = w
                        }
                    }
                    d.rotation = it("rotation" in h ? h.rotation : "shortRotation" in h ? h.shortRotation + "_short" : "rotationZ" in h ? h.rotationZ : a.rotation * k, a.rotation, "rotation", p);
                    if (Tt) {
                        d.rotationX = it("rotationX" in h ? h.rotationX : "shortRotationX" in h ? h.shortRotationX + "_short" : a.rotationX * k || 0, a.rotationX, "rotationX", p);
                        d.rotationY = it("rotationY" in h ? h.rotationY : "shortRotationY" in h ? h.shortRotationY + "_short" : a.rotationY * k || 0, a.rotationY, "rotationY", p)
                    }
                    d.skewX = h.skewX == null ? a.skewX : it(h.skewX, a.skewX);
                    d.skewY = h.skewY == null ? a.skewY : it(h.skewY, a.skewY);
                    if (v = d.skewY - a.skewY) {
                        d.skewX += v;
                        d.rotation += v
                    }
                }
                y = a.z || a.rotationX || a.rotationY || d.z || d.rotationX || d.rotationY || d.perspective;
                if (!y && h.scale != null) {
                    d.scaleZ = 1
                }
                while (--c > -1) {
                    n = wt[c];
                    g = d[n] - a[n];
                    if (g > l || g < -l || L[n] != null) {
                        b = true;
                        i = new dt(a, n, a[n], g, i);
                        if (n in p) {
                            i.e = p[n]
                        }
                        i.xs0 = 0;
                        i.plugin = o;
                        r._overwriteProps.push(i.n)
                    }
                }
                g = h.transformOrigin;
                if (g || Tt && y && a.zOrigin) {
                    if (Et) {
                        b = true;
                        g = (g || $(e, n, s, false, "50% 50%")) + "";
                        n = xt;
                        i = new dt(f, n, 0, 0, i, -1, "css_transformOrigin");
                        i.b = f[n];
                        i.plugin = o;
                        if (Tt) {
                            m = a.zOrigin;
                            g = g.split(" ");
                            a.zOrigin = (g.length > 2 ? parseFloat(g[2]) : m) || 0;
                            i.xs0 = i.e = f[n] = g[0] + " " + (g[1] || "50%") + " 0px";
                            i = new dt(a, "zOrigin", 0, 0, i, -1, i.n);
                            i.b = m;
                            i.xs0 = i.e = a.zOrigin
                        } else {
                            i.xs0 = i.e = f[n] = g
                        }
                    } else {
                        tt(g + "", a)
                    }
                }
                if (b) {
                    r._transformType = y || this._transformType === 3 ? 3 : 2
                }
                return i
            },
            prefix: true
        });
        yt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: true,
            color: true,
            multi: true,
            keyword: "inset"
        });
        yt("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, n, r, o, u) {
                t = this.format(t);
                var a = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    f = e.style,
                    l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
                y = parseFloat(e.offsetWidth);
                b = parseFloat(e.offsetHeight);
                l = t.split(" ");
                for (c = 0; c < a.length; c++) {
                    if (this.p.indexOf("border")) {
                        a[c] = X(a[c])
                    }
                    d = p = $(e, a[c], s, false, "0px");
                    if (d.indexOf(" ") !== -1) {
                        p = d.split(" ");
                        d = p[0];
                        p = p[1]
                    }
                    v = h = l[c];
                    m = parseFloat(d);
                    E = d.substr((m + "").length);
                    S = v.charAt(1) === "=";
                    if (S) {
                        g = parseInt(v.charAt(0) + "1", 10);
                        v = v.substr(2);
                        g *= parseFloat(v);
                        w = v.substr((g + "").length - (g < 0 ? 1 : 0)) || ""
                    } else {
                        g = parseFloat(v);
                        w = v.substr((g + "").length)
                    }
                    if (w === "") {
                        w = i[n] || E
                    }
                    if (w !== E) {
                        x = J(e, "borderLeft", m, E);
                        T = J(e, "borderTop", m, E);
                        if (w === "%") {
                            d = x / y * 100 + "%";
                            p = T / b * 100 + "%"
                        } else if (w === "em") {
                            N = J(e, "borderLeft", 1, "em");
                            d = x / N + "em";
                            p = T / N + "em"
                        } else {
                            d = x + "px";
                            p = T + "px"
                        }
                        if (S) {
                            v = parseFloat(d) + g + w;
                            h = parseFloat(p) + g + w
                        }
                    }
                    o = vt(f, a[c], d + " " + p, v + " " + h, false, "0px", o)
                }
                return o
            },
            prefix: true,
            formatter: ft("0px 0px 0px 0px", false, true)
        });
        yt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, n, r, i, o) {
                var u = "background-position",
                    a = s || V(e, null),
                    f = this.format((a ? I ? a.getPropertyValue(u + "-x") + " " + a.getPropertyValue(u + "-y") : a.getPropertyValue(u) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                    l = this.format(t),
                    c, h, p, d, v, m;
                if (f.indexOf("%") !== -1 !== (l.indexOf("%") !== -1)) {
                    m = $(e, "backgroundImage").replace(w, "");
                    if (m && m !== "none") {
                        c = f.split(" ");
                        h = l.split(" ");
                        M.setAttribute("src", m);
                        p = 2;
                        while (--p > -1) {
                            f = c[p];
                            d = f.indexOf("%") !== -1;
                            if (d !== (h[p].indexOf("%") !== -1)) {
                                v = p === 0 ? e.offsetWidth - M.width : e.offsetHeight - M.height;
                                c[p] = d ? parseFloat(f) / 100 * v + "px" : parseFloat(f) / v * 100 + "%"
                            }
                        }
                        f = c.join(" ")
                    }
                }
                return this.parseComplex(e.style, f, l, i, o)
            },
            formatter: tt
        });
        yt("backgroundSize", {
            defaultValue: "0 0",
            formatter: tt
        });
        yt("perspective", {
            defaultValue: "0px",
            prefix: true
        });
        yt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: true
        });
        yt("transformStyle", {
            prefix: true
        });
        yt("backfaceVisibility", {
            prefix: true
        });
        yt("margin", {
            parser: lt("marginTop,marginRight,marginBottom,marginLeft")
        });
        yt("padding", {
            parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        });
        yt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, n, r, i, o) {
                var u, a, f;
                if (I < 9) {
                    a = e.currentStyle;
                    f = I < 8 ? " " : ",";
                    u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")";
                    t = this.format(t).split(",").join(f)
                } else {
                    u = this.format($(e, this.p, s, false, this.dflt));
                    t = this.format(t)
                }
                return this.parseComplex(e.style, u, t, i, o)
            }
        });
        yt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: true,
            multi: true
        });
        yt("autoRound,strictUnits", {
            parser: function(e, t, n, r, i) {
                return i
            }
        });
        yt("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, n, r, i, o) {
                return this.parseComplex(e.style, this.format($(e, "borderTopWidth", s, false, "0px") + " " + $(e, "borderTopStyle", s, false, "solid") + " " + $(e, "borderTopColor", s, false, "#000")), this.format(t), i, o)
            },
            color: true,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(at) || ["#000"])[0]
            }
        });
        yt("float,cssFloat,styleFloat", {
            parser: function(e, t, n, r, i, s) {
                var o = e.style,
                    u = "cssFloat" in o ? "cssFloat" : "styleFloat";
                return new dt(o, u, 0, 0, i, -1, n, false, 0, o[u], t)
            }
        });
        var At = function(e) {
            var t = this.t,
                n = t.filter,
                r = this.s + this.c * e | 0,
                i;
            if (r === 100) {
                if (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1) {
                    t.removeAttribute("filter");
                    i = !$(this.data, "filter")
                } else {
                    t.filter = n.replace(m, "");
                    i = true
                }
            }
            if (!i) {
                if (this.xn1) {
                    t.filter = n = n || "alpha(opacity=100)"
                }
                if (n.indexOf("opacity") === -1) {
                    t.filter += " alpha(opacity=" + r + ")"
                } else {
                    t.filter = n.replace(d, "opacity=" + r)
                }
            }
        };
        yt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, n, r, i, o) {
                var u = parseFloat($(e, "opacity", s, false, "1")),
                    a = e.style,
                    f;
                t = parseFloat(t);
                if (n === "autoAlpha") {
                    f = $(e, "visibility", s);
                    if (u === 1 && f === "hidden" && t !== 0) {
                        u = 0
                    }
                    i = new dt(a, "visibility", 0, 0, i, -1, null, false, 0, u !== 0 ? "visible" : "hidden", t === 0 ? "hidden" : "visible");
                    i.xs0 = "visible";
                    r._overwriteProps.push(i.n)
                }
                if (q) {
                    i = new dt(a, "opacity", u, t - u, i)
                } else {
                    i = new dt(a, "opacity", u * 100, (t - u) * 100, i);
                    i.xn1 = n === "autoAlpha" ? 1 : 0;
                    a.zoom = 1;
                    i.type = 2;
                    i.b = "alpha(opacity=" + i.s + ")";
                    i.e = "alpha(opacity=" + (i.s + i.c) + ")";
                    i.data = e;
                    i.plugin = o;
                    i.setRatio = At
                }
                return i
            }
        });
        var Ot = function(e, t) {
                if (t) {
                    if (e.removeProperty) {
                        e.removeProperty(t.replace(y, "-$1").toLowerCase())
                    } else {
                        e.removeAttribute(t)
                    }
                }
            },
            Mt = function(e) {
                this.t._gsClassPT = this;
                if (e === 1 || e === 0) {
                    this.t.className = e === 0 ? this.b : this.e;
                    var t = this.data,
                        n = this.t.style;
                    while (t) {
                        if (!t.v) {
                            Ot(n, t.p)
                        } else {
                            n[t.p] = t.v
                        }
                        t = t._next
                    }
                    if (e === 1 && this.t._gsClassPT === this) {
                        this.t._gsClassPT = null
                    }
                } else if (this.t.className !== this.e) {
                    this.t.className = this.e
                }
            };
        yt("className", {
            parser: function(e, t, n, i, o, u, a) {
                var f = e.className,
                    l = e.style.cssText,
                    c, h, p, d, v;
                o = i._classNamePT = new dt(e, n, 0, 0, o, 2);
                o.setRatio = Mt;
                o.pr = -11;
                r = true;
                o.b = f;
                h = Q(e, s);
                p = e._gsClassPT;
                if (p) {
                    d = {};
                    v = p.data;
                    while (v) {
                        d[v.p] = 1;
                        v = v._next
                    }
                    p.setRatio(1)
                }
                e._gsClassPT = o;
                o.e = t.charAt(1) !== "=" ? t : f.replace(new RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + (t.charAt(0) === "+" ? " " + t.substr(2) : "");
                if (i._tween._duration) {
                    e.className = o.e;
                    c = G(e, h, Q(e), a, d);
                    e.className = f;
                    o.data = c.firstMPT;
                    e.style.cssText = l;
                    o = o.xfirst = i.parse(e, c.difs, o, u)
                }
                return o
            }
        });
        var _t = function(e) {
            if (e === 1 || e === 0)
                if (this.data._totalTime === this.data._totalDuration) {
                    var t = this.e === "all",
                        n = this.t.style,
                        r = t ? n.cssText.split(";") : this.e.split(","),
                        i = r.length,
                        s = u.transform.parse,
                        o;
                    while (--i > -1) {
                        o = r[i];
                        if (t) {
                            o = o.substr(0, o.indexOf(":")).split(" ").join("")
                        }
                        if (u[o]) {
                            o = u[o].parse === s ? Et : u[o].p
                        }
                        Ot(n, o)
                    }
                }
        };
        yt("clearProps", {
            parser: function(e, t, n, i, s) {
                s = new dt(e, n, 0, 0, s, 2);
                s.setRatio = _t;
                s.e = t;
                s.pr = -10;
                s.data = i._tween;
                r = true;
                return s
            }
        });
        a = "bezier,throwProps,physicsProps,physics2D".split(",");
        mt = a.length;
        while (mt--) {
            bt(a[mt])
        }
        a = n.prototype;
        a._firstPT = null;
        a._onInitTween = function(e, t, u) {
            if (!e.nodeType) {
                return false
            }
            this._target = e;
            this._tween = u;
            this._vars = t;
            P = t.autoRound;
            r = false;
            i = t.suffixMap || n.suffixMap;
            s = V(e, "");
            o = this._overwriteProps;
            var a = e.style,
                f, l, c, h, p, d, m, g, y;
            if (H)
                if (a.zIndex === "") {
                    f = $(e, "zIndex", s);
                    if (f === "auto" || f === "") {
                        a.zIndex = 0
                    }
                } if (typeof t === "string") {
                h = a.cssText;
                f = Q(e, s);
                a.cssText = h + ";" + t;
                f = G(e, f, Q(e)).difs;
                if (!q && v.test(t)) {
                    f.opacity = parseFloat(RegExp.$1)
                }
                t = f;
                a.cssText = h
            }
            this._firstPT = l = this.parse(e, t, null);
            if (this._transformType) {
                y = this._transformType === 3;
                if (!Et) {
                    a.zoom = 1
                } else if (B) {
                    H = true;
                    if (a.zIndex === "") {
                        m = $(e, "zIndex", s);
                        if (m === "auto" || m === "") {
                            a.zIndex = 0
                        }
                    }
                    if (F) {
                        a.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (y ? "visible" : "hidden")
                    }
                }
                c = l;
                while (c && c._next) {
                    c = c._next
                }
                g = new dt(e, "transform", 0, 0, null, 2);
                this._linkCSSP(g, null, c);
                g.setRatio = y && Tt ? kt : Et ? Lt : Ct;
                g.data = this._transform || Nt(e, s, true);
                o.pop()
            }
            if (r) {
                while (l) {
                    d = l._next;
                    c = h;
                    while (c && c.pr > l.pr) {
                        c = c._next
                    }
                    if (l._prev = c ? c._prev : p) {
                        l._prev._next = l
                    } else {
                        h = l
                    }
                    if (l._next = c) {
                        c._prev = l
                    } else {
                        p = l
                    }
                    l = d
                }
                this._firstPT = h
            }
            return true
        };
        a.parse = function(e, t, n, r) {
            var o = e.style,
                a, f, l, c, h, d, v, m, y, b;
            for (a in t) {
                d = t[a];
                f = u[a];
                if (f) {
                    n = f.parse(e, d, a, this, n, r, t)
                } else {
                    h = $(e, a, s) + "";
                    y = typeof d === "string";
                    if (a === "color" || a === "fill" || a === "stroke" || a.indexOf("Color") !== -1 || y && g.test(d)) {
                        if (!y) {
                            d = ut(d);
                            d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"
                        }
                        n = vt(o, a, h, d, true, "transparent", n, 0, r)
                    } else if (y && (d.indexOf(" ") !== -1 || d.indexOf(",") !== -1)) {
                        n = vt(o, a, h, d, true, null, n, 0, r)
                    } else {
                        l = parseFloat(h);
                        v = l || l === 0 ? h.substr((l + "").length) : "";
                        if (h === "" || h === "auto") {
                            if (a === "width" || a === "height") {
                                l = et(e, a, s);
                                v = "px"
                            } else if (a === "left" || a === "top") {
                                l = K(e, a, s);
                                v = "px"
                            } else {
                                l = a !== "opacity" ? 0 : 1;
                                v = ""
                            }
                        }
                        b = y && d.charAt(1) === "=";
                        if (b) {
                            c = parseInt(d.charAt(0) + "1", 10);
                            d = d.substr(2);
                            c *= parseFloat(d);
                            m = d.replace(p, "")
                        } else {
                            c = parseFloat(d);
                            m = y ? d.substr((c + "").length) || "" : ""
                        }
                        if (m === "") {
                            m = i[a] || v
                        }
                        d = c || c === 0 ? (b ? c + l : c) + m : t[a];
                        if (v !== m)
                            if (m !== "")
                                if (c || c === 0)
                                    if (l || l === 0) {
                                        l = J(e, a, l, v);
                                        if (m === "%") {
                                            l /= J(e, a, 100, "%") / 100;
                                            if (l > 100) {
                                                l = 100
                                            }
                                            if (t.strictUnits !== true) {
                                                h = l + "%"
                                            }
                                        } else if (m === "em") {
                                            l /= J(e, a, 1, "em")
                                        } else {
                                            c = J(e, a, c, m);
                                            m = "px"
                                        }
                                        if (b)
                                            if (c || c === 0) {
                                                d = c + l + m
                                            }
                                    } if (b) {
                            c += l
                        }
                        if ((l || l === 0) && (c || c === 0)) {
                            n = new dt(o, a, l, c - l, n, 0, "css_" + a, P !== false && (m === "px" || a === "zIndex"), 0, h, d);
                            n.xs0 = m
                        } else if (o[a] === undefined || !d && (d + "" === "NaN" || d == null)) {
                            U("invalid " + a + " tween value: " + t[a])
                        } else {
                            n = new dt(o, a, c || l || 0, 0, n, -1, "css_" + a, false, 0, h, d);
                            n.xs0 = d === "none" && (a === "display" || a.indexOf("Style") !== -1) ? h : d
                        }
                    }
                }
                if (r)
                    if (n && !n.plugin) {
                        n.plugin = r
                    }
            }
            return n
        };
        a.setRatio = function(e) {
            var t = this._firstPT,
                n = 1e-6,
                r, i, s;
            if (e === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (t) {
                    if (t.type !== 2) {
                        t.t[t.p] = t.e
                    } else {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            } else if (e || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -1e-6) {
                while (t) {
                    r = t.c * e + t.s;
                    if (t.r) {
                        r = r > 0 ? r + .5 | 0 : r - .5 | 0
                    } else if (r < n)
                        if (r > -n) {
                            r = 0
                        } if (!t.type) {
                        t.t[t.p] = r + t.xs0
                    } else if (t.type === 1) {
                        s = t.l;
                        if (s === 2) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2
                        } else if (s === 3) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3
                        } else if (s === 4) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4
                        } else if (s === 5) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4 + t.xn4 + t.xs5
                        } else {
                            i = t.xs0 + r + t.xs1;
                            for (s = 1; s < t.l; s++) {
                                i += t["xn" + s] + t["xs" + (s + 1)]
                            }
                            t.t[t.p] = i
                        }
                    } else if (t.type === -1) {
                        t.t[t.p] = t.xs0
                    } else if (t.setRatio) {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            } else {
                while (t) {
                    if (t.type !== 2) {
                        t.t[t.p] = t.b
                    } else {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            }
        };
        a._enableTransforms = function(e) {
            this._transformType = e || this._transformType === 3 ? 3 : 2
        };
        a._linkCSSP = function(e, t, n, r) {
            if (e) {
                if (t) {
                    t._prev = e
                }
                if (e._next) {
                    e._next._prev = e._prev
                }
                if (n) {
                    n._next = e
                } else if (!r && this._firstPT === null) {
                    this._firstPT = e
                }
                if (e._prev) {
                    e._prev._next = e._next
                } else if (this._firstPT === e) {
                    this._firstPT = e._next
                }
                e._next = t;
                e._prev = n
            }
            return e
        };
        a._kill = function(t) {
            var n = t,
                r, i, s;
            if (t.css_autoAlpha || t.css_alpha) {
                n = {};
                for (i in t) {
                    n[i] = t[i]
                }
                n.css_opacity = 1;
                if (n.css_autoAlpha) {
                    n.css_visibility = 1
                }
            }
            if (t.css_className && (r = this._classNamePT)) {
                s = r.xfirst;
                if (s && s._prev) {
                    this._linkCSSP(s._prev, r._next, s._prev._prev)
                } else if (s === this._firstPT) {
                    this._firstPT = r._next
                }
                if (r._next) {
                    this._linkCSSP(r._next, r._next._next, s._prev)
                }
                this._classNamePT = null
            }
            return e.prototype._kill.call(this, n)
        };
        var Dt = function(e, t, n) {
            var r, i, s, o;
            if (e.slice) {
                i = e.length;
                while (--i > -1) {
                    Dt(e[i], t, n)
                }
                return
            }
            r = e.childNodes;
            i = r.length;
            while (--i > -1) {
                s = r[i];
                o = s.type;
                if (s.style) {
                    t.push(Q(s));
                    if (n) {
                        n.push(s)
                    }
                }
                if ((o === 1 || o === 9 || o === 11) && s.childNodes.length) {
                    Dt(s, t, n)
                }
            }
        };
        n.cascadeTo = function(e, n, r) {
            var i = t.to(e, n, r),
                s = [i],
                o = [],
                u = [],
                a = [],
                f = t._internals.reservedProps,
                l, c, h;
            e = i._targets || i.target;
            Dt(e, o, a);
            i.render(n, true);
            Dt(e, u);
            i.render(0, true);
            i._enabled(true);
            l = a.length;
            while (--l > -1) {
                c = G(a[l], o[l], u[l]);
                if (c.firstMPT) {
                    c = c.difs;
                    for (h in r) {
                        if (f[h]) {
                            c[h] = r[h]
                        }
                    }
                    s.push(t.to(a[l], n, c))
                }
            }
            return s
        };
        e.activate([n]);
        return n
    }, true);
    (function() {
        var e = window._gsDefine.plugin({
                propName: "roundProps",
                priority: -1,
                API: 2,
                init: function(e, t, n) {
                    this._tween = n;
                    return true
                }
            }),
            t = e.prototype;
        t._onInitAllProps = function() {
            var e = this._tween,
                t = e.vars.roundProps instanceof Array ? e.vars.roundProps : e.vars.roundProps.split(","),
                n = t.length,
                r = {},
                i = e._propLookup.roundProps,
                s, o, u;
            while (--n > -1) {
                r[t[n]] = 1
            }
            n = t.length;
            while (--n > -1) {
                s = t[n];
                o = e._firstPT;
                while (o) {
                    u = o._next;
                    if (o.pg) {
                        o.t._roundProps(r, true)
                    } else if (o.n === s) {
                        this._add(o.t, s, o.s, o.c);
                        if (u) {
                            u._prev = o._prev
                        }
                        if (o._prev) {
                            o._prev._next = u
                        } else if (e._firstPT === o) {
                            e._firstPT = u
                        }
                        o._next = o._prev = null;
                        e._propLookup[s] = i
                    }
                    o = u
                }
            }
            return false
        };
        t._add = function(e, t, n, r) {
            this._addTween(e, t, n, n + r, t, true);
            this._overwriteProps.push(t)
        }
    })();
    window._gsDefine.plugin({
        propName: "attr",
        API: 2,
        init: function(e, t, n) {
            var r;
            if (typeof e.setAttribute !== "function") {
                return false
            }
            this._target = e;
            this._proxy = {};
            for (r in t) {
                this._addTween(this._proxy, r, parseFloat(e.getAttribute(r)), t[r], r);
                this._overwriteProps.push(r)
            }
            return true
        },
        set: function(e) {
            this._super.setRatio.call(this, e);
            var t = this._overwriteProps,
                n = t.length,
                r;
            while (--n > -1) {
                r = t[n];
                this._target.setAttribute(r, this._proxy[r] + "")
            }
        }
    });
    window._gsDefine.plugin({
        propName: "directionalRotation",
        API: 2,
        init: function(e, t, n) {
            if (typeof t !== "object") {
                t = {
                    rotation: t
                }
            }
            this.finals = {};
            var r = t.useRadians === true ? Math.PI * 2 : 360,
                i = 1e-6,
                s, o, u, a, f, l;
            for (s in t) {
                if (s !== "useRadians") {
                    l = (t[s] + "").split("_");
                    o = l[0];
                    u = parseFloat(typeof e[s] !== "function" ? e[s] : e[s.indexOf("set") || typeof e["get" + s.substr(3)] !== "function" ? s : "get" + s.substr(3)]());
                    a = this.finals[s] = typeof o === "string" && o.charAt(1) === "=" ? u + parseInt(o.charAt(0) + "1", 10) * Number(o.substr(2)) : Number(o) || 0;
                    f = a - u;
                    if (l.length) {
                        o = l.join("_");
                        if (o.indexOf("short") !== -1) {
                            f = f % r;
                            if (f !== f % (r / 2)) {
                                f = f < 0 ? f + r : f - r
                            }
                        }
                        if (o.indexOf("_cw") !== -1 && f < 0) {
                            f = (f + r * 9999999999) % r - (f / r | 0) * r
                        } else if (o.indexOf("ccw") !== -1 && f > 0) {
                            f = (f - r * 9999999999) % r - (f / r | 0) * r
                        }
                    }
                    if (f > i || f < -i) {
                        this._addTween(e, s, u, u + f, s);
                        this._overwriteProps.push(s)
                    }
                }
            }
            return true
        },
        set: function(e) {
            var t;
            if (e !== 1) {
                this._super.setRatio.call(this, e)
            } else {
                t = this._firstPT;
                while (t) {
                    if (t.f) {
                        t.t[t.p](this.finals[t.p])
                    } else {
                        t.t[t.p] = this.finals[t.p]
                    }
                    t = t._next
                }
            }
        }
    })._autoCSS = true;
    window._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t = window.GreenSockGlobals || window,
            n = t.com.greensock,
            r = Math.PI * 2,
            i = Math.PI / 2,
            s = n._class,
            o = function(t, n) {
                var r = s("easing." + t, function() {}, true),
                    i = r.prototype = new e;
                i.constructor = r;
                i.getRatio = n;
                return r
            },
            u = e.register || function() {},
            a = function(e, t, n, r, i) {
                var o = s("easing." + e, {
                    easeOut: new t,
                    easeIn: new n,
                    easeInOut: new r
                }, true);
                u(o, e);
                return o
            },
            f = function(e, t, n) {
                this.t = e;
                this.v = t;
                if (n) {
                    this.next = n;
                    n.prev = this;
                    this.c = n.v - t;
                    this.gap = n.t - e
                }
            },
            l = function(t, n) {
                var r = s("easing." + t, function(e) {
                        this._p1 = e || e === 0 ? e : 1.70158;
                        this._p2 = this._p1 * 1.525
                    }, true),
                    i = r.prototype = new e;
                i.constructor = r;
                i.getRatio = n;
                i.config = function(e) {
                    return new r(e)
                };
                return r
            },
            c = a("Back", l("BackOut", function(e) {
                return (e = e - 1) * e * ((this._p1 + 1) * e + this._p1) + 1
            }), l("BackIn", function(e) {
                return e * e * ((this._p1 + 1) * e - this._p1)
            }), l("BackInOut", function(e) {
                return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
            })),
            h = s("easing.SlowMo", function(e, t, n) {
                t = t || t === 0 ? t : .7;
                if (e == null) {
                    e = .7
                } else if (e > 1) {
                    e = 1
                }
                this._p = e !== 1 ? t : 0;
                this._p1 = (1 - e) / 2;
                this._p2 = e;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = n === true
            }, true),
            p = h.prototype = new e,
            d, v, m;
        p.constructor = h;
        p.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            if (e < this._p1) {
                return this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t
            } else if (e > this._p3) {
                return this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e
            }
            return this._calcEnd ? 1 : t
        };
        h.ease = new h(.7, .7);
        p.config = h.config = function(e, t, n) {
            return new h(e, t, n)
        };
        d = s("easing.SteppedEase", function(e) {
            e = e || 1;
            this._p1 = 1 / e;
            this._p2 = e + 1
        }, true);
        p = d.prototype = new e;
        p.constructor = d;
        p.getRatio = function(e) {
            if (e < 0) {
                e = 0
            } else if (e >= 1) {
                e = .999999999
            }
            return (this._p2 * e >> 0) * this._p1
        };
        p.config = d.config = function(e) {
            return new d(e)
        };
        v = s("easing.RoughEase", function(t) {
            t = t || {};
            var n = t.taper || "none",
                r = [],
                i = 0,
                s = (t.points || 20) | 0,
                o = s,
                u = t.randomize !== false,
                a = t.clamp === true,
                l = t.template instanceof e ? t.template : null,
                c = typeof t.strength === "number" ? t.strength * .4 : .4,
                h, p, d, v, m, g;
            while (--o > -1) {
                h = u ? Math.random() : 1 / s * o;
                p = l ? l.getRatio(h) : h;
                if (n === "none") {
                    d = c
                } else if (n === "out") {
                    v = 1 - h;
                    d = v * v * c
                } else if (n === "in") {
                    d = h * h * c
                } else if (h < .5) {
                    v = h * 2;
                    d = v * v * .5 * c
                } else {
                    v = (1 - h) * 2;
                    d = v * v * .5 * c
                }
                if (u) {
                    p += Math.random() * d - d * .5
                } else if (o % 2) {
                    p += d * .5
                } else {
                    p -= d * .5
                }
                if (a) {
                    if (p > 1) {
                        p = 1
                    } else if (p < 0) {
                        p = 0
                    }
                }
                r[i++] = {
                    x: h,
                    y: p
                }
            }
            r.sort(function(e, t) {
                return e.x - t.x
            });
            g = new f(1, 1, null);
            o = s;
            while (--o > -1) {
                m = r[o];
                g = new f(m.x, m.y, g)
            }
            this._prev = new f(0, 0, g.t !== 0 ? g : g.next)
        }, true);
        p = v.prototype = new e;
        p.constructor = v;
        p.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                while (t.next && e >= t.t) {
                    t = t.next
                }
                t = t.prev
            } else {
                while (t.prev && e <= t.t) {
                    t = t.prev
                }
            }
            this._prev = t;
            return t.v + (e - t.t) / t.gap * t.c
        };
        p.config = function(e) {
            return new v(e)
        };
        v.ease = new v;
        a("Bounce", o("BounceOut", function(e) {
            if (e < 1 / 2.75) {
                return 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                return 7.5625 * (e -= 1.5 / 2.75) * e + .75
            } else if (e < 2.5 / 2.75) {
                return 7.5625 * (e -= 2.25 / 2.75) * e + .9375
            }
            return 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), o("BounceIn", function(e) {
            if ((e = 1 - e) < 1 / 2.75) {
                return 1 - 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                return 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75)
            } else if (e < 2.5 / 2.75) {
                return 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375)
            }
            return 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), o("BounceInOut", function(e) {
            var t = e < .5;
            if (t) {
                e = 1 - e * 2
            } else {
                e = e * 2 - 1
            }
            if (e < 1 / 2.75) {
                e = 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                e = 7.5625 * (e -= 1.5 / 2.75) * e + .75
            } else if (e < 2.5 / 2.75) {
                e = 7.5625 * (e -= 2.25 / 2.75) * e + .9375
            } else {
                e = 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            }
            return t ? (1 - e) * .5 : e * .5 + .5
        }));
        a("Circ", o("CircOut", function(e) {
            return Math.sqrt(1 - (e = e - 1) * e)
        }), o("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), o("CircInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }));
        m = function(t, n, i) {
            var o = s("easing." + t, function(e, t) {
                    this._p1 = e || 1;
                    this._p2 = t || i;
                    this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
                }, true),
                u = o.prototype = new e;
            u.constructor = o;
            u.getRatio = n;
            u.config = function(e, t) {
                return new o(e, t)
            };
            return o
        };
        a("Elastic", m("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * r / this._p2) + 1
        }, .3), m("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2))
        }, .3), m("ElasticInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) * .5 + 1
        }, .45));
        a("Expo", o("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), o("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), o("ExpoInOut", function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        }));
        a("Sine", o("SineOut", function(e) {
            return Math.sin(e * i)
        }), o("SineIn", function(e) {
            return -Math.cos(e * i) + 1
        }), o("SineInOut", function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }));
        s("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, true);
        u(t.SlowMo, "SlowMo", "ease,");
        u(v, "RoughEase", "ease,");
        u(d, "SteppedEase", "ease,");
        return c
    }, true)
});
(function(e) {
    "use strict";
    var t = e.GreenSockGlobals || e,
        n = function(e) {
            var n = e.split("."),
                r = t,
                i;
            for (i = 0; i < n.length; i++) {
                r[n[i]] = r = r[n[i]] || {}
            }
            return r
        },
        r = n("com.greensock"),
        i = [].slice,
        s = function() {},
        o, u, a, f, l, c = {},
        h = function(r, i, s, o) {
            this.sc = c[r] ? c[r].sc : [];
            c[r] = this;
            this.gsClass = null;
            this.func = s;
            var u = [];
            this.check = function(a) {
                var f = i.length,
                    l = f,
                    p, d, v, m;
                while (--f > -1) {
                    if ((p = c[i[f]] || new h(i[f], [])).gsClass) {
                        u[f] = p.gsClass;
                        l--
                    } else if (a) {
                        p.sc.push(this)
                    }
                }
                if (l === 0 && s) {
                    d = ("com.greensock." + r).split(".");
                    v = d.pop();
                    m = n(d.join("."))[v] = this.gsClass = s.apply(s, u);
                    if (o) {
                        t[v] = m;
                        if (typeof define === "function" && define.amd) {
                            define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").join("/"), [], function() {
                                return m
                            })
                        } else if (typeof module !== "undefined" && module.exports) {
                            module.exports = m
                        }
                    }
                    for (f = 0; f < this.sc.length; f++) {
                        this.sc[f].check()
                    }
                }
            };
            this.check(true)
        },
        p = e._gsDefine = function(e, t, n, r) {
            return new h(e, t, n, r)
        },
        d = r._class = function(e, t, n) {
            t = t || function() {};
            p(e, [], function() {
                return t
            }, n);
            return t
        };
    p.globals = t;
    var v = [0, 0, 1, 1],
        m = [],
        g = d("easing.Ease", function(e, t, n, r) {
            this._func = e;
            this._type = n || 0;
            this._power = r || 0;
            this._params = t ? v.concat(t) : v
        }, true),
        y = g.map = {},
        b = g.register = function(e, t, n, i) {
            var s = t.split(","),
                o = s.length,
                u = (n || "easeIn,easeOut,easeInOut").split(","),
                a, f, l, c;
            while (--o > -1) {
                f = s[o];
                a = i ? d("easing." + f, null, true) : r.easing[f] || {};
                l = u.length;
                while (--l > -1) {
                    c = u[l];
                    y[f + "." + c] = y[c + f] = a[c] = e.getRatio ? e : e[c] || new e
                }
            }
        };
    a = g.prototype;
    a._calcEnd = false;
    a.getRatio = function(e) {
        if (this._func) {
            this._params[0] = e;
            return this._func.apply(null, this._params)
        }
        var t = this._type,
            n = this._power,
            r = t === 1 ? 1 - e : t === 2 ? e : e < .5 ? e * 2 : (1 - e) * 2;
        if (n === 1) {
            r *= r
        } else if (n === 2) {
            r *= r * r
        } else if (n === 3) {
            r *= r * r * r
        } else if (n === 4) {
            r *= r * r * r * r
        }
        return t === 1 ? 1 - r : t === 2 ? r : e < .5 ? r / 2 : 1 - r / 2
    };
    o = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
    u = o.length;
    while (--u > -1) {
        a = o[u] + ",Power" + u;
        b(new g(null, null, 1, u), a, "easeOut", true);
        b(new g(null, null, 2, u), a, "easeIn" + (u === 0 ? ",easeNone" : ""));
        b(new g(null, null, 3, u), a, "easeInOut")
    }
    y.linear = r.easing.Linear.easeIn;
    y.swing = r.easing.Quad.easeInOut;
    var w = d("events.EventDispatcher", function(e) {
        this._listeners = {};
        this._eventTarget = e || this
    });
    a = w.prototype;
    a.addEventListener = function(e, t, n, r, i) {
        i = i || 0;
        var s = this._listeners[e],
            o = 0,
            u, a;
        if (s == null) {
            this._listeners[e] = s = []
        }
        a = s.length;
        while (--a > -1) {
            u = s[a];
            if (u.c === t && u.s === n) {
                s.splice(a, 1)
            } else if (o === 0 && u.pr < i) {
                o = a + 1
            }
        }
        s.splice(o, 0, {
            c: t,
            s: n,
            up: r,
            pr: i
        });
        if (this === f && !l) {
            f.wake()
        }
    };
    a.removeEventListener = function(e, t) {
        var n = this._listeners[e],
            r;
        if (n) {
            r = n.length;
            while (--r > -1) {
                if (n[r].c === t) {
                    n.splice(r, 1);
                    return
                }
            }
        }
    };
    a.dispatchEvent = function(e) {
        var t = this._listeners[e],
            n, r, i;
        if (t) {
            n = t.length;
            r = this._eventTarget;
            while (--n > -1) {
                i = t[n];
                if (i.up) {
                    i.c.call(i.s || r, {
                        type: e,
                        target: r
                    })
                } else {
                    i.c.call(i.s || r)
                }
            }
        }
    };
    var E = e.requestAnimationFrame,
        S = e.cancelAnimationFrame,
        x = Date.now || function() {
            return (new Date).getTime()
        };
    o = ["ms", "moz", "webkit", "o"];
    u = o.length;
    while (--u > -1 && !E) {
        E = e[o[u] + "RequestAnimationFrame"];
        S = e[o[u] + "CancelAnimationFrame"] || e[o[u] + "CancelRequestAnimationFrame"]
    }
    d("Ticker", function(e, t) {
        var n = this,
            r = x(),
            i = t !== false && E,
            o, u, a, c, h, p = function(e) {
                n.time = (x() - r) / 1e3;
                var t = a,
                    i = n.time - h;
                if (!o || i > 0 || e === true) {
                    n.frame++;
                    h += i + (i >= c ? .004 : c - i);
                    n.dispatchEvent("tick")
                }
                if (e !== true && t === a) {
                    a = u(p)
                }
            };
        w.call(n);
        this.time = this.frame = 0;
        this.tick = function() {
            p(true)
        };
        this.sleep = function() {
            if (a == null) {
                return
            }
            if (!i || !S) {
                clearTimeout(a)
            } else {
                S(a)
            }
            u = s;
            a = null;
            if (n === f) {
                l = false
            }
        };
        this.wake = function() {
            if (a !== null) {
                n.sleep()
            }
            u = o === 0 ? s : !i || !E ? function(e) {
                return setTimeout(e, (h - n.time) * 1e3 + 1 | 0)
            } : E;
            if (n === f) {
                l = true
            }
            p(2)
        };
        this.fps = function(e) {
            if (!arguments.length) {
                return o
            }
            o = e;
            c = 1 / (o || 60);
            h = this.time + c;
            n.wake()
        };
        this.useRAF = function(e) {
            if (!arguments.length) {
                return i
            }
            n.sleep();
            i = e;
            n.fps(o)
        };
        n.fps(e);
        setTimeout(function() {
            if (i && (!a || n.frame < 5)) {
                n.useRAF(false)
            }
        }, 1500)
    });
    a = r.Ticker.prototype = new r.events.EventDispatcher;
    a.constructor = r.Ticker;
    var T = d("core.Animation", function(e, t) {
        this.vars = t || {};
        this._duration = this._totalDuration = e || 0;
        this._delay = Number(this.vars.delay) || 0;
        this._timeScale = 1;
        this._active = this.vars.immediateRender === true;
        this.data = this.vars.data;
        this._reversed = this.vars.reversed === true;
        if (!B) {
            return
        }
        if (!l) {
            f.wake()
        }
        var n = this.vars.useFrames ? H : B;
        n.add(this, n._time);
        if (this.vars.paused) {
            this.paused(true)
        }
    });
    f = T.ticker = new r.Ticker;
    a = T.prototype;
    a._dirty = a._gc = a._initted = a._paused = false;
    a._totalTime = a._time = 0;
    a._rawPrevTime = -1;
    a._next = a._last = a._onUpdate = a._timeline = a.timeline = null;
    a._paused = false;
    a.play = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.reversed(false).paused(false)
    };
    a.pause = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(true)
    };
    a.resume = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(false)
    };
    a.seek = function(e, t) {
        return this.totalTime(Number(e), t !== false)
    };
    a.restart = function(e, t) {
        return this.reversed(false).paused(false).totalTime(e ? -this._delay : 0, t !== false, true)
    };
    a.reverse = function(e, t) {
        if (arguments.length) {
            this.seek(e || this.totalDuration(), t)
        }
        return this.reversed(true).paused(false)
    };
    a.render = function() {};
    a.invalidate = function() {
        return this
    };
    a._enabled = function(e, t) {
        if (!l) {
            f.wake()
        }
        this._gc = !e;
        this._active = e && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration;
        if (t !== true) {
            if (e && !this.timeline) {
                this._timeline.add(this, this._startTime - this._delay)
            } else if (!e && this.timeline) {
                this._timeline._remove(this, true)
            }
        }
        return false
    };
    a._kill = function(e, t) {
        return this._enabled(false, false)
    };
    a.kill = function(e, t) {
        this._kill(e, t);
        return this
    };
    a._uncache = function(e) {
        var t = e ? this : this.timeline;
        while (t) {
            t._dirty = true;
            t = t.timeline
        }
        return this
    };
    a.eventCallback = function(e, t, n, r) {
        if (e == null) {
            return null
        } else if (e.substr(0, 2) === "on") {
            var i = this.vars,
                s;
            if (arguments.length === 1) {
                return i[e]
            }
            if (t == null) {
                delete i[e]
            } else {
                i[e] = t;
                i[e + "Params"] = n;
                i[e + "Scope"] = r;
                if (n) {
                    s = n.length;
                    while (--s > -1) {
                        if (n[s] === "{self}") {
                            n = i[e + "Params"] = n.concat();
                            n[s] = this
                        }
                    }
                }
            }
            if (e === "onUpdate") {
                this._onUpdate = t
            }
        }
        return this
    };
    a.delay = function(e) {
        if (!arguments.length) {
            return this._delay
        }
        if (this._timeline.smoothChildTiming) {
            this.startTime(this._startTime + e - this._delay)
        }
        this._delay = e;
        return this
    };
    a.duration = function(e) {
        if (!arguments.length) {
            this._dirty = false;
            return this._duration
        }
        this._duration = this._totalDuration = e;
        this._uncache(true);
        if (this._timeline.smoothChildTiming)
            if (this._time > 0)
                if (this._time < this._duration)
                    if (e !== 0) {
                        this.totalTime(this._totalTime * (e / this._duration), true)
                    } return this
    };
    a.totalDuration = function(e) {
        this._dirty = false;
        return !arguments.length ? this._totalDuration : this.duration(e)
    };
    a.time = function(e, t) {
        if (!arguments.length) {
            return this._time
        }
        if (this._dirty) {
            this.totalDuration()
        }
        return this.totalTime(e > this._duration ? this._duration : e, t)
    };
    a.totalTime = function(e, t, n) {
        if (!l) {
            f.wake()
        }
        if (!arguments.length) {
            return this._totalTime
        }
        if (this._timeline) {
            if (e < 0 && !n) {
                e += this.totalDuration()
            }
            if (this._timeline.smoothChildTiming) {
                if (this._dirty) {
                    this.totalDuration()
                }
                var r = this._totalDuration,
                    i = this._timeline;
                if (e > r && !n) {
                    e = r
                }
                this._startTime = (this._paused ? this._pauseTime : i._time) - (!this._reversed ? e : r - e) / this._timeScale;
                if (!i._dirty) {
                    this._uncache(false)
                }
                if (!i._active) {
                    while (i._timeline) {
                        i.totalTime(i._totalTime, true);
                        i = i._timeline
                    }
                }
            }
            if (this._gc) {
                this._enabled(true, false)
            }
            if (this._totalTime !== e) {
                this.render(e, t, false)
            }
        }
        return this
    };
    a.startTime = function(e) {
        if (!arguments.length) {
            return this._startTime
        }
        if (e !== this._startTime) {
            this._startTime = e;
            if (this.timeline)
                if (this.timeline._sortChildren) {
                    this.timeline.add(this, e - this._delay)
                }
        }
        return this
    };
    a.timeScale = function(e) {
        if (!arguments.length) {
            return this._timeScale
        }
        e = e || 1e-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var t = this._pauseTime,
                n = t || t === 0 ? t : this._timeline.totalTime();
            this._startTime = n - (n - this._startTime) * this._timeScale / e
        }
        this._timeScale = e;
        return this._uncache(false)
    };
    a.reversed = function(e) {
        if (!arguments.length) {
            return this._reversed
        }
        if (e != this._reversed) {
            this._reversed = e;
            this.totalTime(this._totalTime, true)
        }
        return this
    };
    a.paused = function(e) {
        if (!arguments.length) {
            return this._paused
        }
        if (e != this._paused)
            if (this._timeline) {
                if (!l && !e) {
                    f.wake()
                }
                var t = this._timeline.rawTime(),
                    n = t - this._pauseTime;
                if (!e && this._timeline.smoothChildTiming) {
                    this._startTime += n;
                    this._uncache(false)
                }
                this._pauseTime = e ? t : null;
                this._paused = e;
                this._active = !e && this._totalTime > 0 && this._totalTime < this._totalDuration;
                if (!e && n !== 0 && this._duration !== 0) {
                    this.render(this._totalTime, true, true)
                }
            } if (this._gc && !e) {
            this._enabled(true, false)
        }
        return this
    };
    var N = d("core.SimpleTimeline", function(e) {
        T.call(this, 0, e);
        this.autoRemoveChildren = this.smoothChildTiming = true
    });
    a = N.prototype = new T;
    a.constructor = N;
    a.kill()._gc = false;
    a._first = a._last = null;
    a._sortChildren = false;
    a.add = a.insert = function(e, t, n, r) {
        var i, s;
        e._startTime = Number(t || 0) + e._delay;
        if (e._paused)
            if (this !== e._timeline) {
                e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale
            } if (e.timeline) {
            e.timeline._remove(e, true)
        }
        e.timeline = e._timeline = this;
        if (e._gc) {
            e._enabled(true, true)
        }
        i = this._last;
        if (this._sortChildren) {
            s = e._startTime;
            while (i && i._startTime > s) {
                i = i._prev
            }
        }
        if (i) {
            e._next = i._next;
            i._next = e
        } else {
            e._next = this._first;
            this._first = e
        }
        if (e._next) {
            e._next._prev = e
        } else {
            this._last = e
        }
        e._prev = i;
        if (this._timeline) {
            this._uncache(true)
        }
        return this
    };
    a._remove = function(e, t) {
        if (e.timeline === this) {
            if (!t) {
                e._enabled(false, true)
            }
            e.timeline = null;
            if (e._prev) {
                e._prev._next = e._next
            } else if (this._first === e) {
                this._first = e._next
            }
            if (e._next) {
                e._next._prev = e._prev
            } else if (this._last === e) {
                this._last = e._prev
            }
            if (this._timeline) {
                this._uncache(true)
            }
        }
        return this
    };
    a.render = function(e, t, n) {
        var r = this._first,
            i;
        this._totalTime = this._time = this._rawPrevTime = e;
        while (r) {
            i = r._next;
            if (r._active || e >= r._startTime && !r._paused) {
                if (!r._reversed) {
                    r.render((e - r._startTime) * r._timeScale, t, n)
                } else {
                    r.render((!r._dirty ? r._totalDuration : r.totalDuration()) - (e - r._startTime) * r._timeScale, t, n)
                }
            }
            r = i
        }
    };
    a.rawTime = function() {
        if (!l) {
            f.wake()
        }
        return this._totalTime
    };
    var C = d("TweenLite", function(e, t, n) {
            T.call(this, t, n);
            if (e == null) {
                throw "Cannot tween a null target."
            }
            this.target = e = typeof e !== "string" ? e : C.selector(e) || e;
            var r = e.jquery || e.length && e[0] && e[0].nodeType && e[0].style,
                s = this.vars.overwrite,
                o, u, a;
            this._overwrite = s = s == null ? P[C.defaultOverwrite] : typeof s === "number" ? s >> 0 : P[s];
            if ((r || e instanceof Array) && typeof e[0] !== "number") {
                this._targets = a = i.call(e, 0);
                this._propLookup = [];
                this._siblings = [];
                for (o = 0; o < a.length; o++) {
                    u = a[o];
                    if (!u) {
                        a.splice(o--, 1);
                        continue
                    } else if (typeof u === "string") {
                        u = a[o--] = C.selector(u);
                        if (typeof u === "string") {
                            a.splice(o + 1, 1)
                        }
                        continue
                    } else if (u.length && u[0] && u[0].nodeType && u[0].style) {
                        a.splice(o--, 1);
                        this._targets = a = a.concat(i.call(u, 0));
                        continue
                    }
                    this._siblings[o] = j(u, this, false);
                    if (s === 1)
                        if (this._siblings[o].length > 1) {
                            F(u, this, null, 1, this._siblings[o])
                        }
                }
            } else {
                this._propLookup = {};
                this._siblings = j(e, this, false);
                if (s === 1)
                    if (this._siblings.length > 1) {
                        F(e, this, null, 1, this._siblings)
                    }
            }
            if (this.vars.immediateRender || t === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
                this.render(-this._delay, false, true)
            }
        }, true),
        k = function(e) {
            return e.length && e[0] && e[0].nodeType && e[0].style
        },
        L = function(e, t) {
            var n = {},
                r;
            for (r in e) {
                if (!D[r] && (!(r in t) || r === "x" || r === "y" || r === "width" || r === "height" || r === "className") && (!O[r] || O[r] && O[r]._autoCSS)) {
                    n[r] = e[r];
                    delete e[r]
                }
            }
            e.css = n
        };
    a = C.prototype = new T;
    a.constructor = C;
    a.kill()._gc = false;
    a.ratio = 0;
    a._firstPT = a._targets = a._overwrittenProps = a._startAt = null;
    a._notifyPluginsOfEnabled = false;
    C.version = "1.9.7";
    C.defaultEase = a._ease = new g(null, null, 1, 1);
    C.defaultOverwrite = "auto";
    C.ticker = f;
    C.autoSleep = true;
    C.selector = e.$ || e.jQuery || function(t) {
        if (e.$) {
            C.selector = e.$;
            return e.$(t)
        }
        return e.document ? e.document.getElementById(t.charAt(0) === "#" ? t.substr(1) : t) : t
    };
    var A = C._internals = {},
        O = C._plugins = {},
        M = C._tweenLookup = {},
        _ = 0,
        D = A.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        },
        P = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        H = T._rootFramesTimeline = new N,
        B = T._rootTimeline = new N;
    B._startTime = f.time;
    H._startTime = f.frame;
    B._active = H._active = true;
    T._updateRoot = function() {
        B.render((f.time - B._startTime) * B._timeScale, false, false);
        H.render((f.frame - H._startTime) * H._timeScale, false, false);
        if (!(f.frame % 120)) {
            var e, t, n;
            for (n in M) {
                t = M[n].tweens;
                e = t.length;
                while (--e > -1) {
                    if (t[e]._gc) {
                        t.splice(e, 1)
                    }
                }
                if (t.length === 0) {
                    delete M[n]
                }
            }
            n = B._first;
            if (!n || n._paused)
                if (C.autoSleep && !H._first && f._listeners.tick.length === 1) {
                    while (n && n._paused) {
                        n = n._next
                    }
                    if (!n) {
                        f.sleep()
                    }
                }
        }
    };
    f.addEventListener("tick", T._updateRoot);
    var j = function(e, t, n) {
            var r = e._gsTweenID,
                i, s;
            if (!M[r || (e._gsTweenID = r = "t" + _++)]) {
                M[r] = {
                    target: e,
                    tweens: []
                }
            }
            if (t) {
                i = M[r].tweens;
                i[s = i.length] = t;
                if (n) {
                    while (--s > -1) {
                        if (i[s] === t) {
                            i.splice(s, 1)
                        }
                    }
                }
            }
            return M[r].tweens
        },
        F = function(e, t, n, r, i) {
            var s, o, u, a;
            if (r === 1 || r >= 4) {
                a = i.length;
                for (s = 0; s < a; s++) {
                    if ((u = i[s]) !== t) {
                        if (!u._gc)
                            if (u._enabled(false, false)) {
                                o = true
                            }
                    } else if (r === 5) {
                        break
                    }
                }
                return o
            }
            var f = t._startTime + 1e-10,
                l = [],
                c = 0,
                h = t._duration === 0,
                p;
            s = i.length;
            while (--s > -1) {
                if ((u = i[s]) === t || u._gc || u._paused) {} else if (u._timeline !== t._timeline) {
                    p = p || I(t, 0, h);
                    if (I(u, p, h) === 0) {
                        l[c++] = u
                    }
                } else if (u._startTime <= f)
                    if (u._startTime + u.totalDuration() / u._timeScale + 1e-10 > f)
                        if (!((h || !u._initted) && f - u._startTime <= 2e-10)) {
                            l[c++] = u
                        }
            }
            s = c;
            while (--s > -1) {
                u = l[s];
                if (r === 2)
                    if (u._kill(n, e)) {
                        o = true
                    } if (r !== 2 || !u._firstPT && u._initted) {
                    if (u._enabled(false, false)) {
                        o = true
                    }
                }
            }
            return o
        },
        I = function(e, t, n) {
            var r = e._timeline,
                i = r._timeScale,
                s = e._startTime,
                o = 1e-10;
            while (r._timeline) {
                s += r._startTime;
                i *= r._timeScale;
                if (r._paused) {
                    return -100
                }
                r = r._timeline
            }
            s /= i;
            return s > t ? s - t : n && s === t || !e._initted && s - t < 2 * o ? o : (s += e.totalDuration() / e._timeScale / i) > t + o ? 0 : s - t - o
        };
    a._init = function() {
        var e = this.vars,
            t = this._overwrittenProps,
            n = this._duration,
            r = e.ease,
            i, s, o, u;
        if (e.startAt) {
            e.startAt.overwrite = 0;
            e.startAt.immediateRender = true;
            this._startAt = C.to(this.target, 0, e.startAt);
            if (e.immediateRender) {
                this._startAt = null;
                if (this._time === 0 && n !== 0) {
                    return
                }
            }
        } else if (e.runBackwards && e.immediateRender && n !== 0) {
            if (this._startAt) {
                this._startAt.render(-1, true);
                this._startAt = null
            } else if (this._time === 0) {
                o = {};
                for (u in e) {
                    if (!D[u] || u === "autoCSS") {
                        o[u] = e[u]
                    }
                }
                o.overwrite = 0;
                this._startAt = C.to(this.target, 0, o);
                return
            }
        }
        if (!r) {
            this._ease = C.defaultEase
        } else if (r instanceof g) {
            this._ease = e.easeParams instanceof Array ? r.config.apply(r, e.easeParams) : r
        } else {
            this._ease = typeof r === "function" ? new g(r, e.easeParams) : y[r] || C.defaultEase
        }
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets) {
            i = this._targets.length;
            while (--i > -1) {
                if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], t ? t[i] : null)) {
                    s = true
                }
            }
        } else {
            s = this._initProps(this.target, this._propLookup, this._siblings, t)
        }
        if (s) {
            C._onPluginEvent("_onInitAllProps", this)
        }
        if (t)
            if (!this._firstPT)
                if (typeof this.target !== "function") {
                    this._enabled(false, false)
                } if (e.runBackwards) {
            o = this._firstPT;
            while (o) {
                o.s += o.c;
                o.c = -o.c;
                o = o._next
            }
        }
        this._onUpdate = e.onUpdate;
        this._initted = true
    };
    a._initProps = function(e, t, n, r) {
        var i, s, o, u, a, f, l;
        if (e == null) {
            return false
        }
        if (!this.vars.css)
            if (e.style)
                if (e.nodeType)
                    if (O.css)
                        if (this.vars.autoCSS !== false) {
                            L(this.vars, e)
                        } for (i in this.vars) {
            if (D[i]) {
                if (i === "onStartParams" || i === "onUpdateParams" || i === "onCompleteParams" || i === "onReverseCompleteParams" || i === "onRepeatParams")
                    if (a = this.vars[i]) {
                        s = a.length;
                        while (--s > -1) {
                            if (a[s] === "{self}") {
                                a = this.vars[i] = a.concat();
                                a[s] = this
                            }
                        }
                    }
            } else if (O[i] && (u = new O[i])._onInitTween(e, this.vars[i], this)) {
                this._firstPT = f = {
                    _next: this._firstPT,
                    t: u,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: true,
                    n: i,
                    pg: true,
                    pr: u._priority
                };
                s = u._overwriteProps.length;
                while (--s > -1) {
                    t[u._overwriteProps[s]] = this._firstPT
                }
                if (u._priority || u._onInitAllProps) {
                    o = true
                }
                if (u._onDisable || u._onEnable) {
                    this._notifyPluginsOfEnabled = true
                }
            } else {
                this._firstPT = t[i] = f = {
                    _next: this._firstPT,
                    t: e,
                    p: i,
                    f: typeof e[i] === "function",
                    n: i,
                    pg: false,
                    pr: 0
                };
                f.s = !f.f ? parseFloat(e[i]) : e[i.indexOf("set") || typeof e["get" + i.substr(3)] !== "function" ? i : "get" + i.substr(3)]();
                l = this.vars[i];
                f.c = typeof l === "string" && l.charAt(1) === "=" ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0
            }
            if (f)
                if (f._next) {
                    f._next._prev = f
                }
        }
        if (r)
            if (this._kill(r, e)) {
                return this._initProps(e, t, n, r)
            } if (this._overwrite > 1)
            if (this._firstPT)
                if (n.length > 1)
                    if (F(e, this, t, this._overwrite, n)) {
                        this._kill(t, e);
                        return this._initProps(e, t, n, r)
                    } return o
    };
    a.render = function(e, t, n) {
        var r = this._time,
            i, s, o;
        if (e >= this._duration) {
            this._totalTime = this._time = this._duration;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
            if (!this._reversed) {
                i = true;
                s = "onComplete"
            }
            if (this._duration === 0) {
                if (e === 0 || this._rawPrevTime < 0)
                    if (this._rawPrevTime !== e) {
                        n = true;
                        if (this._rawPrevTime > 0) {
                            s = "onReverseComplete";
                            if (t) {
                                e = -1
                            }
                        }
                    } this._rawPrevTime = e
            }
        } else if (e < 1e-7) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (r !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                s = "onReverseComplete";
                i = this._reversed
            }
            if (e < 0) {
                this._active = false;
                if (this._duration === 0) {
                    if (this._rawPrevTime >= 0) {
                        n = true
                    }
                    this._rawPrevTime = e
                }
            } else if (!this._initted) {
                n = true
            }
        } else {
            this._totalTime = this._time = e;
            if (this._easeType) {
                var u = e / this._duration,
                    a = this._easeType,
                    f = this._easePower;
                if (a === 1 || a === 3 && u >= .5) {
                    u = 1 - u
                }
                if (a === 3) {
                    u *= 2
                }
                if (f === 1) {
                    u *= u
                } else if (f === 2) {
                    u *= u * u
                } else if (f === 3) {
                    u *= u * u * u
                } else if (f === 4) {
                    u *= u * u * u * u
                }
                if (a === 1) {
                    this.ratio = 1 - u
                } else if (a === 2) {
                    this.ratio = u
                } else if (e / this._duration < .5) {
                    this.ratio = u / 2
                } else {
                    this.ratio = 1 - u / 2
                }
            } else {
                this.ratio = this._ease.getRatio(e / this._duration)
            }
        }
        if (this._time === r && !n) {
            return
        } else if (!this._initted) {
            this._init();
            if (!this._initted) {
                return
            }
            if (this._time && !i) {
                this.ratio = this._ease.getRatio(this._time / this._duration)
            } else if (i && this._ease._calcEnd) {
                this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1)
            }
        }
        if (!this._active)
            if (!this._paused) {
                this._active = true
            } if (r === 0) {
            if (this._startAt) {
                if (e >= 0) {
                    this._startAt.render(e, t, n)
                } else if (!s) {
                    s = "_dummyGS"
                }
            }
            if (this.vars.onStart)
                if (this._time !== 0 || this._duration === 0)
                    if (!t) {
                        this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || m)
                    }
        }
        o = this._firstPT;
        while (o) {
            if (o.f) {
                o.t[o.p](o.c * this.ratio + o.s)
            } else {
                o.t[o.p] = o.c * this.ratio + o.s
            }
            o = o._next
        }
        if (this._onUpdate) {
            if (e < 0)
                if (this._startAt) {
                    this._startAt.render(e, t, n)
                } if (!t) {
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || m)
            }
        }
        if (s)
            if (!this._gc) {
                if (e < 0 && this._startAt && !this._onUpdate) {
                    this._startAt.render(e, t, n)
                }
                if (i) {
                    if (this._timeline.autoRemoveChildren) {
                        this._enabled(false, false)
                    }
                    this._active = false
                }
                if (!t && this.vars[s]) {
                    this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || m)
                }
            }
    };
    a._kill = function(e, t) {
        if (e === "all") {
            e = null
        }
        if (e == null)
            if (t == null || t === this.target) {
                return this._enabled(false, false)
            } t = typeof t !== "string" ? t || this._targets || this.target : C.selector(t) || t;
        var n, r, i, s, o, u, a, f;
        if ((t instanceof Array || k(t)) && typeof t[0] !== "number") {
            n = t.length;
            while (--n > -1) {
                if (this._kill(e, t[n])) {
                    u = true
                }
            }
        } else {
            if (this._targets) {
                n = this._targets.length;
                while (--n > -1) {
                    if (t === this._targets[n]) {
                        o = this._propLookup[n] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
                }
            } else if (t !== this.target) {
                return false
            } else {
                o = this._propLookup;
                r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
            }
            if (o) {
                a = e || o;
                f = e !== r && r !== "all" && e !== o && (e == null || e._tempKill !== true);
                for (i in a) {
                    if (s = o[i]) {
                        if (s.pg && s.t._kill(a)) {
                            u = true
                        }
                        if (!s.pg || s.t._overwriteProps.length === 0) {
                            if (s._prev) {
                                s._prev._next = s._next
                            } else if (s === this._firstPT) {
                                this._firstPT = s._next
                            }
                            if (s._next) {
                                s._next._prev = s._prev
                            }
                            s._next = s._prev = null
                        }
                        delete o[i]
                    }
                    if (f) {
                        r[i] = 1
                    }
                }
                if (!this._firstPT && this._initted) {
                    this._enabled(false, false)
                }
            }
        }
        return u
    };
    a.invalidate = function() {
        if (this._notifyPluginsOfEnabled) {
            C._onPluginEvent("_onDisable", this)
        }
        this._firstPT = null;
        this._overwrittenProps = null;
        this._onUpdate = null;
        this._startAt = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = this._targets ? {} : [];
        return this
    };
    a._enabled = function(e, t) {
        if (!l) {
            f.wake()
        }
        if (e && this._gc) {
            var n = this._targets,
                r;
            if (n) {
                r = n.length;
                while (--r > -1) {
                    this._siblings[r] = j(n[r], this, true)
                }
            } else {
                this._siblings = j(this.target, this, true)
            }
        }
        T.prototype._enabled.call(this, e, t);
        if (this._notifyPluginsOfEnabled)
            if (this._firstPT) {
                return C._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            } return false
    };
    C.to = function(e, t, n) {
        return new C(e, t, n)
    };
    C.from = function(e, t, n) {
        n.runBackwards = true;
        n.immediateRender = n.immediateRender != false;
        return new C(e, t, n)
    };
    C.fromTo = function(e, t, n, r) {
        r.startAt = n;
        r.immediateRender = r.immediateRender != false && n.immediateRender != false;
        return new C(e, t, r)
    };
    C.delayedCall = function(e, t, n, r, i) {
        return new C(t, 0, {
            delay: e,
            onComplete: t,
            onCompleteParams: n,
            onCompleteScope: r,
            onReverseComplete: t,
            onReverseCompleteParams: n,
            onReverseCompleteScope: r,
            immediateRender: false,
            useFrames: i,
            overwrite: 0
        })
    };
    C.set = function(e, t) {
        return new C(e, 0, t)
    };
    C.killTweensOf = C.killDelayedCallsTo = function(e, t) {
        var n = C.getTweensOf(e),
            r = n.length;
        while (--r > -1) {
            n[r]._kill(t, e)
        }
    };
    C.getTweensOf = function(e) {
        if (e == null) {
            return []
        }
        e = typeof e !== "string" ? e : C.selector(e) || e;
        var t, n, r, i;
        if ((e instanceof Array || k(e)) && typeof e[0] !== "number") {
            t = e.length;
            n = [];
            while (--t > -1) {
                n = n.concat(C.getTweensOf(e[t]))
            }
            t = n.length;
            while (--t > -1) {
                i = n[t];
                r = t;
                while (--r > -1) {
                    if (i === n[r]) {
                        n.splice(t, 1)
                    }
                }
            }
        } else {
            n = j(e).concat();
            t = n.length;
            while (--t > -1) {
                if (n[t]._gc) {
                    n.splice(t, 1)
                }
            }
        }
        return n
    };
    var q = d("plugins.TweenPlugin", function(e, t) {
        this._overwriteProps = (e || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = t || 0;
        this._super = q.prototype
    }, true);
    a = q.prototype;
    q.version = "1.9.1";
    q.API = 2;
    a._firstPT = null;
    a._addTween = function(e, t, n, r, i, s) {
        var o, u;
        if (r != null && (o = typeof r === "number" || r.charAt(1) !== "=" ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)))) {
            this._firstPT = u = {
                _next: this._firstPT,
                t: e,
                p: t,
                s: n,
                c: o,
                f: typeof e[t] === "function",
                n: i || t,
                r: s
            };
            if (u._next) {
                u._next._prev = u
            }
        }
    };
    a.setRatio = function(e) {
        var t = this._firstPT,
            n = 1e-6,
            r;
        while (t) {
            r = t.c * e + t.s;
            if (t.r) {
                r = r + (r > 0 ? .5 : -.5) >> 0
            } else if (r < n)
                if (r > -n) {
                    r = 0
                } if (t.f) {
                t.t[t.p](r)
            } else {
                t.t[t.p] = r
            }
            t = t._next
        }
    };
    a._kill = function(e) {
        var t = this._overwriteProps,
            n = this._firstPT,
            r;
        if (e[this._propName] != null) {
            this._overwriteProps = []
        } else {
            r = t.length;
            while (--r > -1) {
                if (e[t[r]] != null) {
                    t.splice(r, 1)
                }
            }
        }
        while (n) {
            if (e[n.n] != null) {
                if (n._next) {
                    n._next._prev = n._prev
                }
                if (n._prev) {
                    n._prev._next = n._next;
                    n._prev = null
                } else if (this._firstPT === n) {
                    this._firstPT = n._next
                }
            }
            n = n._next
        }
        return false
    };
    a._roundProps = function(e, t) {
        var n = this._firstPT;
        while (n) {
            if (e[this._propName] || n.n != null && e[n.n.split(this._propName + "_").join("")]) {
                n.r = t
            }
            n = n._next
        }
    };
    C._onPluginEvent = function(e, t) {
        var n = t._firstPT,
            r, i, s, o, u;
        if (e === "_onInitAllProps") {
            while (n) {
                u = n._next;
                i = s;
                while (i && i.pr > n.pr) {
                    i = i._next
                }
                if (n._prev = i ? i._prev : o) {
                    n._prev._next = n
                } else {
                    s = n
                }
                if (n._next = i) {
                    i._prev = n
                } else {
                    o = n
                }
                n = u
            }
            n = t._firstPT = s
        }
        while (n) {
            if (n.pg)
                if (typeof n.t[e] === "function")
                    if (n.t[e]()) {
                        r = true
                    } n = n._next
        }
        return r
    };
    q.activate = function(e) {
        var t = e.length;
        while (--t > -1) {
            if (e[t].API === q.API) {
                O[(new e[t])._propName] = e[t]
            }
        }
        return true
    };
    p.plugin = function(e) {
        if (!e || !e.propName || !e.init || !e.API) {
            throw "illegal plugin definition."
        }
        var t = e.propName,
            n = e.priority || 0,
            r = e.overwriteProps,
            i = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            },
            s = d("plugins." + t.charAt(0).toUpperCase() + t.substr(1) + "Plugin", function() {
                q.call(this, t, n);
                this._overwriteProps = r || []
            }, e.global === true),
            o = s.prototype = new q(t),
            u;
        o.constructor = s;
        s.API = e.API;
        for (u in i) {
            if (typeof e[u] === "function") {
                o[i[u]] = e[u]
            }
        }
        s.version = e.version;
        q.activate([s]);
        return s
    };
    o = e._gsQueue;
    if (o) {
        for (u = 0; u < o.length; u++) {
            o[u]()
        }
        for (a in c) {
            if (!c[a].func) {
                e.console.log("GSAP encountered missing dependency: com.greensock." + a)
            }
        }
    }
    l = false
})(window)
