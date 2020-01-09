(function (b, f) {
    jPlayerPlaylist = function (a, c, d) {
        var e = this;
        this.current = 0;
        this.removing = this.shuffled = this.loop = !1;
        this.cssSelector = b.extend({}, this._cssSelector, a);
        this.options = b.extend(!0, {
            keyBindings: {
                next: {
                    key: 39,
                    fn: function () {
                        e.next()
                    }
                },
                previous: {
                    key: 37,
                    fn: function () {
                        e.previous()
                    }
                }
            }
        }, this._options, d);
        this.playlist = [];
        this.original = [];
        this._initPlaylist(c);
        this.cssSelector.title = this.cssSelector.cssSelectorAncestor + " .jp-title";
        this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist2";
        this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next";
        this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous";
        this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle";
        this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off";
        this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor;
        this.options.repeat = function (a) {
            e.loop = a.jPlayer.options.loop
        };
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.ready, function () {
            e._init()
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.ended, function () {
            e.next()
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.play, function () {
            b(this).jPlayer("pauseOthers")
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.resize, function (a) {
            a.jPlayer.options.fullScreen ? b(e.cssSelector.title).show() : b(e.cssSelector.title).hide()
        });
        b(this.cssSelector.previous).click(function () {
            e.previous();
            b(this).blur();
            return !1
        });
        b(this.cssSelector.next).click(function () {
            e.next();
            b(this).blur();
            return !1
        });
        b(this.cssSelector.shuffle).click(function () {
            e.shuffle(!0);
            return !1
        });
        b(this.cssSelector.shuffleOff).click(function () {
            e.shuffle(!1);
            return !1
        }).hide();
        this.options.fullScreen || b(this.cssSelector.title).hide();
        b(this.cssSelector.playlist + " ul").empty();
        this._createItemHandlers();
        b(this.cssSelector.jPlayer).jPlayer(this.options)


    };
    jPlayerPlaylist.prototype = {
        _cssSelector: {
            jPlayer: "#jquery_jplayer_2",
            cssSelectorAncestor: "#jp_container_2"
        },
        _options: {
            playlistOptions: {
                autoPlay: !1,
                loopOnPrevious: !1,
                shuffleOnLoop: !0,
                enableRemoveControls: !1,
                displayTime: "slow",
                addTime: "fast",
                removeTime: "fast",
                shuffleTime: "slow",
                itemClass: "jp-playlist-item",
                freeGroupClass: "jp-free-media",
                freeItemClass: "jp-playlist-item-free",
                removeItemClass: "jp-playlist-item-remove"
            }
        },
        option: function (a, b) {
            if (b === f) return this.options.playlistOptions[a];
            this.options.playlistOptions[a] = b;
            switch (a) {
            case "enableRemoveControls":
                this._updateControls();
                break;
            case "itemClass":
            case "freeGroupClass":
            case "freeItemClass":
            case "removeItemClass":
                this._refresh(!0), this._createItemHandlers()
            }
            return this
        },
        _init: function () {
            var a = this;
            this._refresh(function () {
                a.options.playlistOptions.autoPlay ? a.play(a.current) : a.select(a.current)
            })
             $('#jp_container_1 .jp-interface a').click(function() {
                $('#name-of-the-song-that-plays').html($('a.jp-playlist-current').html().substr(0,65));
            });
             $('#jp_container_1 li a.jp-playlist-item').click(function() {
                $('#name-of-the-song-that-plays').html($(this).html().substr(0,65));
            });
        },
        _initPlaylist: function (a) {
            this.current = 0;
            this.removing = this.shuffled = !1;
            this.original = b.extend(!0, [], a);
            this._originalPlaylist()
        },
        _originalPlaylist: function () {
            var a = this;
            this.playlist = [];
            b.each(this.original, function (b) {
                a.playlist[b] = a.original[b]
            })
        },
        _refresh: function (a) {
            var c = this;
            if (a && !b.isFunction(a)) b(this.cssSelector.playlist + " ul").empty(), b.each(this.playlist, function (a) {
                b(c.cssSelector.playlist + " ul").append(c._createListItem(c.playlist[a]))
            }), this._updateControls();
            else {
                var d = b(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;
                b(this.cssSelector.playlist + " ul").slideUp(d, function () {
                    var d = b(this);
                    b(this).empty();
                    b.each(c.playlist, function (a) {
                        d.append(c._createListItem(c.playlist[a]))
                    });
                    c._updateControls();
                    b.isFunction(a) && a();
                    c.playlist.length ? b(this).slideDown(c.options.playlistOptions.displayTime) : b(this).show()
                })
            }
        },
        _createListItem: function (a) {
            var c = this,
                d = "<li class='track_item_li'><div class='gen_div'>";
                if (a.artwork_url){
                  d = d + "<a href='javascript:;' onclick='$(" + '"#name-of-the-song-that-plays"' + ").html($(this).next().html().substr(0,65))' class='" + this.options.playlistOptions.itemClass + "' >" + "<img class='track_img' src=" + a.artwork_url + " />" + "</a>"
                }else{
                  d = d + "<a href='javascript:;' onclick='$(" + '"#name-of-the-song-that-plays"' +").html($(this).next().html().substr(0,65))' class='" + this.options.playlistOptions.itemClass + "' >" + "<svg class='svg_default track_img' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/></svg>"
                }
            if (a.free) {
                var e = !0,
                    d = d + ("<span class='" + this.options.playlistOptions.freeGroupClass + "'>(");
                b.each(a, function (a, f) {
                    b.jPlayer.prototype.format[a] && (e ? e = !1 : d += " | ", d += "<a class='" + c.options.playlistOptions.freeItemClass + "' href='" + f + "' tabindex='1'>" + a + "</a>")
                });
                d += ")</span>"
            }

              name = '<strong class="track_title">' + a.title + '</strong>';
            d += "<a href='javascript:;' onclick='$(" + '"#name-of-the-song-that-plays"' +").html($(this).html().substr(0,65))' class='" + this.options.playlistOptions.itemClass + "' tabindex=1>" + name + "<br></a>";
            d += "<a href='' class='track_genre'>" + a.genre + "</a>"
            d += "<span class='span_btn'><span class='track_add'><svg fill='currentColor' class='svg_default' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg></span>&nbsp;<span class='track_repost'><svg class='svg_default' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none'/><path d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z'/></svg></span></span>"
            return d += "</div></li>"
        },
        _createItemHandlers: function () {
            var a = this;
            b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function () {
                var c = b(this).parent().parent().index();
                a.current !== c ? a.play(c) : b(a.cssSelector.jPlayer).jPlayer("play");
                b(this).blur();
                return !1
            });
            b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass, function () {
                b(this).parent().parent().find("." + a.options.playlistOptions.itemClass).click();
                b(this).blur();
                return !1
            });
            b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function () {
                var c = b(this).parent().parent().index();
                a.remove(c);
                b(this).blur();
                return !1
            })
        },
        _updateControls: function () {
            this.options.playlistOptions.enableRemoveControls ? b(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show() : b(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide();
            this.shuffled ? (b(this.cssSelector.shuffleOff).show(), b(this.cssSelector.shuffle).hide()) : (b(this.cssSelector.shuffleOff).hide(), b(this.cssSelector.shuffle).show())
            if ($('a.jp-playlist-current').html() != undefined)
                $('#name-of-the-song-that-plays').html($('a.jp-playlist-current').html().substr(0,65));
        },
        _highlight: function (a) {
            this.playlist.length && a !== f && (b(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current"), b(this.cssSelector.playlist + " li:nth-child(" + (a + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current"), b(this.cssSelector.title + " li").html(this.playlist[a].title + (this.playlist[a].artist ? " <span class='jp-artist'>by " + this.playlist[a].artist + "</span>" : "")))
        },
        setPlaylist: function (a) {
            this._initPlaylist(a);
            this._init()
        },
        add: function (a, c) {
            b(this.cssSelector.playlist + " ul").append(this._createListItem(a)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime);
            this._updateControls();
            this.original.push(a);
            this.playlist.push(a);
            c ? this.play(this.playlist.length - 1) : 1 === this.original.length && this.select(0)
        },
        select: function (a) {
            a = 0 > a ? this.original.length + a : a;
            0 <= a && a < this.playlist.length ? (this.current = a, this._highlight(a), b(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current])) : this.current = 0
        },
        play: function (a) {
            a = 0 > a ? this.original.length + a : a;
            0 <= a && a < this.playlist.length ? this.playlist.length && (this.select(a), b(this.cssSelector.jPlayer).jPlayer("play")) : a === f && b(this.cssSelector.jPlayer).jPlayer("play")
        },
        pause: function () {
            b(this.cssSelector.jPlayer).jPlayer("pause")
        },
        next: function () {
            var a = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
            this.loop ? 0 === a && this.shuffled && this.options.playlistOptions.shuffleOnLoop && 1 < this.playlist.length ? this.shuffle(!0, !0) : this.play(a) : 0 < a && this.play(a)
            if ($('a.jp-playlist-current').html() != undefined)
                $('#name-of-the-song-that-plays').html($('a.jp-playlist-current').html().substr(0,65));
        },
        previous: function () {
            var a = 0 <= this.current - 1 ? this.current - 1 : this.playlist.length - 1;
            (this.loop && this.options.playlistOptions.loopOnPrevious || a < this.playlist.length - 1) && this.play(a)
        },
        shuffle: function (a, c) {
            var d = this;
            a === f && (a = !this.shuffled);
            (a || a !== this.shuffled) && b(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function () {
                (d.shuffled = a) ? d.playlist.sort(function () {
                    return 0.5 - Math.random()
                }) : d._originalPlaylist();
                d._refresh(!0);
                c || !b(d.cssSelector.jPlayer).data("jPlayer").status.paused ? d.play(0) : d.select(0);
                b(this).slideDown(d.options.playlistOptions.shuffleTime)
            })
        }
    }
})(jQuery);
