"use strict";
tab.modules.topsites = {
    init: function() {
        this.getTopSites(), this.open()
    },
    getTopSites: function() {
        chrome.topSites.get(function(t) {
            var e = t.filter(function(t, e) {
                try {
                    var i = t.url || "";
                    i = i.toLowerCase();
                    var n = new URL(i),
                        o = n.pathname.split("."),
                        s = o[o.length - 1];
                    if (0 == n.protocol.indexOf("http") && "jpg" != s && "png" != s && "gif" != s && "jpeg" != s && t.title && "null" != t.title) return !0
                } catch (t) {}
            });
            tab.get("topsites") || ininTopSites(e), tab.set("topsites", e)
        })
    },
    open: function() {
        $(document).on("click", ".topsite", function(t) {
            var e = $(this).attr("data-url");
            tab.setting("isOpenTopSitesInNewTab") ? window.open(e, "_blank") : window.location.href = e
        })
    }
};