"use strict";
$(document).ready(function() {
    ({
        init: function() {
            this.wallpaper.init(), this.clock.init(), tab.require("/newtab/js/weather", function(t) {
                t.init()
            })
        },
        wallpaper: wallpaper,
        clock: clock
    }).init(), tab._i18n.ini(), tab.sendMessage("openNewTab"), setTimeout(function() {
        tab.require("/newtab/js/setting", function(t) {
            t.init(), setTimeout(function() {
                tab.require("/newtab/js/share", function() {
                    $("#share > a.social-share-icon.icon-wechat").removeAttr("href")
                })
            }, 500)
        }), setTimeout(function() {
            tab.require("/newtab/js/discovery", function(t) {
                t.init()
            }), "Chrome" === _browser && tab.require("/newtab/js/apps", function(t) {
                t.init()
            }), tab.require("/newtab/js/topsites", function(t) {
                t.init()
            })
        }, 500)
    }, 500)
});