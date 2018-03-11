"use strict";
tab.modules.apps = {
    init: function() {
        this.getAllApps(), this.clickHandle()
    },
    show: !1,
    clickHandle: function() {
        var t = this;
        $(".apps-button").on("click", function(n) {
            t.show ? $(".apps-content").hide() : ($(".apps-content").show(), $("#content").addClass("zindex-100").removeClass("zindex-999")), t.show = !t.show
        }), $(document).click(function(n) {
            $(n.target).parents(".apps").length || ($(".apps-content").hide(), t.show = !1)
        }), $(document).on("click", ".app-add", function(t) {
            window.open("https://chrome.google.com/webstore/category/apps?utm_source=chrome-ntp-icon", "_blank")
        }), $(document).on("click", ".app-item", function(t) {
            t.preventDefault();
            var n = $(this).attr("data-id");
            chrome.management.launchApp(n, function() {})
        })
    },
    getAllApps: function() {
        chrome.management.getAll(function(t) {
            var n = "";
            t.map(function(t) {
                if (t.isApp) {
                    var a = "";
                    try {
                        a = t.icons[t.icons.length - 1].url
                    } catch (t) {}
                    n += '<div class="app-item" data-id="' + t.id + '"><div class="app-icon" style="background-image:url(' + a + ')"></div><div class="app-title">' + t.name + "</div></div>"
                }
            }), n += '<div class="app-item app-add" style="margin-bottom:0px;"><div class="app-icon" style="background-image:url(newtab/img/icon-add.svg);background-color:transparent;background-size:100%;"></div><div class="app-title">' + i18nInText.store + "</div></div>", $(".apps-out").html(n)
        })
    }
};