"use strict";
var tab = {
  id: chrome.runtime.id
};
tab.i18n = chrome.i18n.getMessage;
var _server_url = "http://storage.best-extension.com",
  _browser = navigator.userAgent.indexOf("Chrome") > 0 ? "Chrome" : "FireFox",
  _imageType = ".jpg",
  _lang = navigator.language.replace("_", "-").replace("_", "-"),
  _manifest = chrome.runtime.getManifest(),
  _ext_name = _manifest.name,
  _ext_desc = _manifest.description,
  i18nInText = {
    celsius: tab.i18n("celcius"),
    fahrenheit: tab.i18n("fahren"),
    iknow: tab.i18n("i_know"),
    citySetSuccess: tab.i18n("oprate_success"),
    citySetFailed: tab.i18n("operate_failed"),
    cityFailedPleaseCheck: tab.i18n("error_network"),
    today: tab.i18n("today"),
    cityNotFound: tab.i18n("city_not_found"),
    newError: tab.i18n("net_work_error_later_try"),
    store: tab.i18n("open_app_store"),
    terms: tab.i18n("terms_of_use"),
    privacy: tab.i18n("privacy"),
    willCloseAutoWallpaper: tab.i18n("willCloseAutoWallpaper")
  };
tab.modules = [], tab._i18n = {
  ini: function (t) {
    var e = "";
    for (var n = $(e + "[i18n]").length, a = 0; a < n; a++) {
      var i = (u = $("[i18n]")[a]).getAttribute("i18n"),
        r = tab.i18n(i);
      $(u).text(r)
    }
    var o = $(e + "[i18nh]").length;
    for (a = 0; a < o; a++) {
      i = (u = $("[i18nh]")[a]).getAttribute("i18nh"), r = tab.i18n(i);
      $(u).html(r)
    }
    var s = $(e + "[i18n-placeholder]").length;
    for (a = 0; a < s; a++) {
      i = (u = $("[i18n-placeholder]")[a]).getAttribute("i18n-placeholder"), r = tab.i18n(i);
      $(u).attr("placeholder", r)
    }
    var l = $(e + "[i18n-value]").length;
    for (a = 0; a < l; a++) {
      i = (u = $("[i18n-value]")[a]).getAttribute("i18n-value"), r = tab.i18n(i);
      $(u).attr("value", r)
    }
    var c = $(e + "[i18n-title]").length;
    for (a = 0; a < c; a++) {
      var u;
      i = (u = $("[i18n-title]")[a]).getAttribute("i18n-title"), r = tab.i18n(i);
      $(u).attr("title", r)
    }
  }
}, tab.isZh = function () {
  return "zh-CN" == _lang
}, tab.init = function (t, e, n, a) {
  try {
    localStorage[t] || (localStorage[t] = JSON.stringify(e))
  } catch (t) { }
}, tab.set = function (t, e, n, a) {
  try {
    if (n) {
      var i = {};
      i[t] = JSON.stringify(e), chrome.storage.local.set(i, function () {
        a && a()
      })
    } else localStorage[t] = JSON.stringify(e)
  } catch (t) { }
}, tab.get = function (t, e, n) {
  try {
    if (!e) return JSON.parse(localStorage[t]);
    chrome.storage.local.get(t, function (e) {
      try {
        var a = JSON.parse(e[t]);
        n && n(a)
      } catch (t) {
        n && n(null)
      }
    })
  } catch (t) {
    return null
  }
}, tab.setting = function (t, e) {
  if (void 0 === e) return tab.get("tab-settings")[t];
  var n = tab.get("tab-settings");
  return n[t] = e, tab.set("tab-settings", n), !0
}, tab.settingInitOrReset = function (t, e) {
  try {
    var n = tab.get("tab-settings");
    for (var a in n || (n = {}, tab.set("tab-settings", n)), t) {
      if (e) tab.setting(a, t[a]);
      else (n = tab.get("tab-settings")).hasOwnProperty(a) || tab.setting(a, t[a])
    }
  } catch (t) { }
}, tab.showInfo = function (t, e, n) {
  $(t).children(".info-out").length || ($(t).prepend('<div class="info"><div class="info-out info-show"><div class="info-title">' + e + '</div><div class="info-button">' + i18nInText.iknow + "</div></div></div>"), n && ($(t).find(".info-button").hide(), setTimeout(function () {
    $(t).find(".info").fadeOut("300", function () {
      $(this).remove()
    })
  }, 2e3)), $(t).find(".info-button").on("click", function (e) {
    e.preventDefault(), $(t).find(".info").fadeOut("300", function () {
      $(this).remove()
    })
  }))
}, tab.isNewDay = function (t, e) {
  if (localStorage["tabday-" + t]) {
    var n = parseInt(localStorage["tabday-" + t]),
      a = (i = new Date, parseInt(i.toJSON().substr(0, 10).replace(/-/gi, "")));
    a > n && (localStorage["tabday-" + t] = a, e && e())
  } else {
    var i, r = (i = new Date).toJSON().substr(0, 10).replace(/-/gi, "");
    localStorage["tabday-" + t] = r, e && e()
  }
}, tab.sendMessage = function (t, e, n) {
  chrome.runtime.sendMessage({
    name: t,
    message: e
  }, function (t) {
    n && n(t)
  })
}, tab.onMessage = function (t, e) {
  chrome.runtime.onMessage.addListener(function (n, a, i) {
    var r, o = n.message;
    return n.name == t && (r = e && e(o, a, i)), !0 === r
  })
}, tab.require = function (t, e) {
  var n = t.substr(t.lastIndexOf("/") + 1);
  if (tab.modules.hasOwnProperty(n)) e && e(tab.modules[n]);
  else {
    var a = document.createElement("script");
    a.setAttribute("async", "true"), a.src = t + ".js", document.head.appendChild(a), a.onload = function () {
      tab.modules[n] = tab.modules[n] || !0, e && e(tab.modules[n])
    }
  }
};