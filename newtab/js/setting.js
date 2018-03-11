"use strict";
var _terms_url, _privacy_url, _donate_url, _feed_back_url, _rate_url, _suffix, share_url, share_source, $configShareSocial, _open_newtab_time = 0;
try {
  if (_suffix = "?id=" + encodeURIComponent(tab.id) + "&lang=" + encodeURIComponent(_lang) + "&browser=" + encodeURIComponent(_browser) + "&name=" + encodeURIComponent(_ext_name) + "&t=" + encodeURIComponent((new Date).toDateString().replace(/\s/g, "")) + (new Date).getTime(), _terms_url = _server_url + "/server/terms.html" + _suffix, _privacy_url = _server_url + "/server/privacy.html" + _suffix, _donate_url = _server_url + "/server/donate.html" + _suffix, _feed_back_url = _server_url + "/server/feedback.html" + _suffix, _rate_url = _server_url + "/server/rate.html" + _suffix, "Chrome" == _browser) share_url = "https://chrome.google.com/webstore/detail/" + tab.id + "/", share_source = "chrome.google.com";
  else {
    var eid = tab.id.split("@")[0];
    share_url = "https://addons.mozilla.org/zh-CN/firefox/addon/" + eid + "/", share_source = "addons.mozilla.org"
  }
  $configShareSocial = {
    url: share_url,
    source: share_source,
    image: "http://storage.best-extension.com/server/img/share-img.png",
    title: _ext_name,
    description: _ext_desc,
    sites: ["twitter", "facebook", "weibo", "wechat"],
    via: _browser
  }
} catch (e) { }
try {
  _open_newtab_time = tab.get("openNewTabTime").time
} catch (e) { }
tab.modules.setting = {
  init: function () {
    var e = this;
    e.handleClick(), $("#hidden-render").append($(".wallpaper-options").clone());
    var t = $(".search-options").clone();
    t.find(".tab-radio").removeAttr("name"), $("#hidden-render").append(t), $("#hidden-render .search-options,#hidden-render .wallpaper-options").removeClass("options-false");
    var a = $("#hidden-render .wallpaper-options").css("height"),
      n = $("#hidden-render .search-options").css("height");
    $(".wallpaper-options").css("max-height", a), $(".search-options").css("max-height", n), setTimeout(function () {
      e.handleSettingWallpaper.init(), e.settingView(), e.settingControl()
    }, 500);
    try {
      var s = tab.get("shareAndDonate");
      s.showShareAndDonate && $(".bu-donate").removeClass("show-share-donate"), s.shareImage && ($configShareSocial.img = s.shareImage), s.source && ($configShareSocial.source = s.source), s.shareLink && ($configShareSocial.url = s.shareLink)
    } catch (e) { }
    try {
      2e3 === _open_newtab_time && $(".popup-rate").css("display", "flex")
    } catch (e) { }
  },
  show: !1,
  handleClick: function () {
    var e = this;
    $(".setting-button").on("click", function (t) {
      e.show ? $(".setting-content").hide() : ($(".setting-content").show(), $("#content").addClass("zindex-100").removeClass("zindex-999")), e.show = !e.show
    }), $(document).click(function (t) {
      $(t.target).parents(".setting").length || ($(".setting-content").hide(), e.show = !1)
    }), $(".bu-term-privacy").click(function (e) {
      $(".setting-content").hide(), $(".terms-frame").attr("src", _terms_url), $(".popup-terms").css("display", "flex"), "terms" == $(this).attr("data-name") ? ($(".popup-terms .popup-title").text(i18nInText.terms), $(".terms-frame").attr("src", _terms_url)) : ($(".popup-terms .popup-title").text(i18nInText.privacy), $(".terms-frame").attr("src", _privacy_url))
    }), $(".bu-share").click(function (e) {
      $(".setting-content").hide(), $(".popup-share").css("display", "flex")
    }), $(".bu-donate").click(function (e) {
      $(".setting-content").hide(), $(".popup-donate").css("display", "flex")
    }), $(".bu-rate").click(function (e) {
      $(".setting-content").hide(), $(".popup-rate").css("display", "flex")
    }), $(".popup-close").click(function (e) {
      $(".popup-out").hide()
    }), $(".give-5-star").click(function (e) {
      var t;
      "Chrome" === _browser ? t = "https://chrome.google.com/webstore/detail/" + tab.id + "/reviews" : t = "https://addons.mozilla.org/zh-CN/firefox/addon/" + tab.id.split("@")[0] + "/";
      window.open(t, "_blank")
    }), $(".not-good").click(function (e) {
      window.open(_feed_back_url, "_blank")
    }), $(".donate-bu").click(function (e) {
      var t = $("[name=donate-select]:checked").val(),
        a = _donate_url + "&count=" + t;
      window.open(a, "_blank")
    })
  },
  settingView: function () {
    tab.setting("autoChangeWallpaper") ? ($("#setting-autoChangeWallpaper").attr("checked", "true"), $(".setting-content .wallpaper-options").removeClass("options-false")) : ($("#setting-autoChangeWallpaper").removeAttr("checked"), $(".setting-content .wallpaper-options").addClass("options-false"));
    var e = tab.setting("wallpaperType");
    for (var t in e) e[t] ? $(".setting-content #wallpaper-open-" + t).attr("checked", "true") : $(".setting-content #wallpaper-open-" + t).removeAttr("checked");
    tab.setting("onlyFavoriteWallpaper") ? $(".setting-content #setting-onlyFavoriteWallpaper").attr("checked", !0) : $(".setting-content #setting-onlyFavoriteWallpaper").removeAttr("checked"), tab.setting("showSearchEngine") ? $("#setting-showSearchEngine").attr("checked", !0) : $("#setting-showSearchEngine").removeAttr("checked");
    var a = tab.setting("searchEngine");
    for (var t in a) a[t].select ? $(".setting-content #se-by-" + t).attr("checked", "true") : $(".setting-content #se-by-" + t).removeAttr("checked");
    tab.setting("showClock") ? $("#setting-showClock").attr("checked", !0) : $("#setting-showClock").removeAttr("checked"), tab.setting("showTopsites") ? $("#setting-showTopsites").attr("checked", !0) : $("#setting-showTopsites").removeAttr("checked"), tab.setting("showApps") ? $("#setting-showApps").attr("checked", !0) : $("#setting-showApps").removeAttr("checked"), tab.setting("showWeather") ? $("#setting-showWeather").attr("checked", !0) : $("#setting-showWeather").removeAttr("checked")
  },
  settingControl: function () {
    $("#setting-autoChangeWallpaper").on("click", function (e) {
      $(e.target).prop("checked") ? (tab.setting("autoChangeWallpaper", !0), $(".setting-content .wallpaper-options").removeClass("options-false")) : (tab.setting("autoChangeWallpaper", !1), $(".setting-content .wallpaper-options").addClass("options-false"))
    }), $('.setting-content [name="wallpaper-open"]').on("click", function (e) {
      var t = $(e.target).val(),
        a = tab.setting("wallpaperType");
      for (var n in a) a[n] = !1;
      a[t] = !0, tab.setting("wallpaperType", a)
    }), $(".setting-content #setting-onlyFavoriteWallpaper").on("click", function (e) {
      $(e.target).prop("checked") ? tab.setting("onlyFavoriteWallpaper", !0) : tab.setting("onlyFavoriteWallpaper", !1)
    }), $("#setting-showSearchEngine").on("click", function (e) {
      $(e.target).prop("checked") ? (tab.setting("showSearchEngine", !0), $("#search").show(), $(".setting-content .search-options").removeClass("options-false"), $(".time").removeClass("time-with-no-search")) : (tab.setting("showSearchEngine", !1), $("#search").hide(), $(".setting-content .search-options").addClass("options-false"), $(".time").addClass("time-with-no-search"))
    }), $('.setting-content [name="search-engine"]').on("click", function (e) {
      var t = $(e.target).val(),
        a = tab.setting("searchEngine");
      for (var n in a) a[n].select = !1;
      a[t].select = !0, tab.setting("searchEngine", a)
    }), $("#setting-showClock").on("click", function (e) {
      $(e.target).prop("checked") ? (tab.setting("showClock", !0), $(".clock").show(), $("#search").removeClass("search-no-clock")) : (tab.setting("showClock", !1), $(".clock").hide(), $("#search").addClass("search-no-clock"))
    }), $("#setting-showTopsites").on("click", function (e) {
      if ($(e.target).prop("checked")) {
        $(".most-visit").show();
        var t = tab.get("topsites");
        t && ininTopSites(t), tab.setting("showTopsites", !0), checkFaviconError()
      } else $(".most-visit").hide(), tab.setting("showTopsites", !1)
    }), $("#setting-showApps").on("click", function (e) {
      var t = $(e.target).prop("checked");
      t ? (tab.setting("showApps", !0), $(".apps").show()) : (tab.setting("showApps", !1), $(".apps").hide()), t ? tab.setting("showApps", !0) : tab.setting("showApps", !1)
    }), $("#setting-showWeather").on("click", function (e) {
      $(e.target).prop("checked") ? (tab.setting("showWeather", !0), $(".weather-button").show()) : (tab.setting("showWeather", !1), $(".weather-button").hide())
    })
  },
  handleDisplay: function () {
    tab.setting("showSearchEngine") ? ($("#search").show(), $(".setting-content .search-options").removeClass("options-false")) : ($("#search").hide(), $(".setting-content .search-options").addClass("options-false")), tab.setting("showClock") ? $(".clock").show() : $(".clock").hide(), tab.setting("showTopsites") ? $(".most-visit").show() : $(".most-visit").hide(), tab.setting("showApps") ? $(".apps").show() : $(".apps").hide(), tab.setting("showWeather") ? $(".weather-button").show() : $(".weather-button").hide()
  },
  handleSettingWallpaper: {
    init: function () {
      var e = this;
      e.wps = tab.get("wallpaper"), e.renderSmallWp(), e.renderFavorite(), e.handleClick()
    },
    renderSmallWp: function () {
      var e = '<div class="setting-wallpaper-imgs">';
      this.wps.all.map(function (t, a) {
        var n = "/wallpapers-small/" + t.name + ".jpg";
        t.like ? e += '<div class="setting-wallpaper-item" data-name="' + t.name + '" style="background-image:url(' + n + ')"><div class="setting-wallpaper-like setting-wallpaper-like-active" data-name="' + t.name + '"></div></div>' : e += '<div class="setting-wallpaper-item" data-name="' + t.name + '" style="background-image:url(' + n + ')"><div class="setting-wallpaper-like" data-name="' + t.name + '"></div></div>'
      }), e += "</div>", $(".setting-wallpaper-content").html(e)
    },
    renderFavorite: function () {
      var e = '<div class="setting-wallpaper-imgs">',
        t = !1;
      this.wps.all.filter(function (e, t) {
        return e.like
      }).map(function (a, n) {
        var s = "/wallpapers-small/" + a.name + ".jpg";
        e += '<div class="setting-wallpaper-item" data-name="' + a.name + '" style="background-image:url(' + s + ')"><div class="setting-wallpaper-like setting-wallpaper-like-active" data-name="' + a.name + '"></div></div>', t = !0
      }), t || (e += '<div class="setting-wp-no-fa">' + tab.i18n("none") + "</div>"), e += "</div>", $(".setting-favorite-content").html(e)
    },
    handleClick: function () {
      var e = this;
      $(document).on("click", ".setting-wallpaper-like", function (t) {
        t.preventDefault();
        var a = $(this).attr("data-name");
        e.wps.all.map(function (e, t) {
          e.name == a && (e.like = !e.like)
        }), setTimeout(function () {
          e.renderSmallWp(), e.renderFavorite(), tab.set("wallpaper", e.wps)
        }, 10)
      })
    }
  }
};