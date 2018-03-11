var _EXT_ONLY_NAME = "CAT";
tab.pre0 = function (e, t) {
  if (e >= Math.pow(10, t)) return e.toString();
  var a = new Array(t + 1).join("0") + e;
  return a.slice(a.length - t)
}, chrome.alarms.create("per2hour", {
  when: Date.now(),
  periodInMinutes: 120
});
var bg = {
  discoveryUrl: _server_url + "/server/discovery.json",
  configUrl: _server_url + "/server/config.json",
  init: function () {
    var e = this;
    e.settingInit();
    for (var t = parseInt("65") || 11, a = [], r = 0; r < t; r++) {
      var n = {
        name: tab.pre0(r, 2),
        like: !1
      };
      a.push(n)
    }
    tab.init("wallpaper", {
      current: "00",
      all: a
    }), tab.init("discovery", []), tab.init("cpsSites", []), tab.init("shareAndDonate", {
      showShareAndDonate: !1,
      shareLink: ""
    }), tab.init("openNewTabTime", {
      time: 0
    }), bgWeather.init(), e.getDiscovery(), e.getSearchFromCloud(), e.getCpsSites(), e.isShowShareAndDonate(), bgWeather.queryWeather(), chrome.alarms.onAlarm.addListener(function (t) {
      "per2hour" == t.name && (e.getDiscovery(), e.getSearchFromCloud(), e.getCpsSites(), e.isShowShareAndDonate()), "queryWeather" == t.name && bgWeather.queryWeather()
    }), e.everydayWallpaper(), chrome.browserAction.onClicked.addListener(function () {
      chrome.tabs.create({
        url: "chrome://newtab"
      })
    }), e.isShowShareAndDonate(), tab.onMessage("openNewTab", function () {
      var e = tab.get("openNewTabTime") || {
        time: 0
      };
      e.time += 1, tab.set("openNewTabTime", e)
    }), chrome.runtime.onInstalled.addListener(function (e) {
      "install" == e.reason && setTimeout(function () {
        chrome.tabs.create({
          url: "chrome://newtab/"
        })
      }, 50)
    })
  },
  isShowShareAndDonate: function () {
    $.ajax({
      url: this.configUrl + "?t=" + (new Date).getTime(),
      type: "GET",
      dataType: "json"
    }).done(function (e) {
      e.hasOwnProperty("error") || tab.set("shareAndDonate", e)
    })
  },
  settingInit: function () {
    var e = {
      isOpenTopSitesInNewTab: !0,
      tempUnitC: !0,
      autoChangeWallpaper: !0,
      onlyFavoriteWallpaper: !1,
      wallpaperType: {
        newtab: !0,
        everyday: !1
      },
      showSearchEngine: !0,
      isSearchInNewTab: !1,
      searchEngine: {
        bing: {
          select: !1,
          url: "https://www.bing.com/search?q="
        },
        yahoo: {
          select: !1,
          url: "https://search.yahoo.com/search?p="
        },
        baidu: {
          select: "zh-CN" == _lang,
          url: "https://www.baidu.com/baidu?tn=null&ie=utf-8&wd="
        },
        google: {
          select: "zh-CN" != _lang,
          url: "https://google.infinitynewtab.com/#gsc.tab=0&gsc.q="
        }
      },
      showClock: !0,
      showTopsites: !0,
      showApps: !0,
      showWeather: !0
    };
    tab.settingInitOrReset(e)
  },
  getDiscovery: function () {
    $.ajax({
      url: this.discoveryUrl + "?t=" + (new Date).getTime(),
      type: "GET",
      dataType: "json"
    }).done(function (e) {
      e.hasOwnProperty("error") || tab.set("discovery", e)
    })
  },
  getNextWallpaper: function (e) {
    var t = tab.setting("onlyFavoriteWallpaper"),
      a = e.current,
      r = "00";
    if (t) var n = e.all.filter(function (e, t) {
      return e.like
    });
    else n = e.all;
    for (var i = 0; i < n.length; i++)
      if (n[i].name === a) try {
        r = n[i + 1].name
      } catch (e) {
        r = "00"
      }
    e.current = r
  },
  everydayWallpaper: function () {
    var e = this;
    tab.isNewDay("wallpaper", function () {
      var t = tab.get("wallpaper"),
        a = tab.setting("wallpaperType");
      tab.setting("autoChangeWallpaper") && a.everyday && (e.getNextWallpaper(t), tab.set("wallpaper", t), tab.sendMessage("wallpaperUpdate"))
    })
  },
  getSearchFromCloud: function () {
    $.ajax({
      url: _server_url + "/server/searches.json?t=" + (new Date).getTime(),
      type: "GET",
      dataType: "json"
    }).done(function (e) {
      try {
        if (!e.hasOwnProperty("error")) {
          var t = e.searches,
            a = tab.setting("searchEngine");
          for (var r in t) {
            var n = t[r];
            if (n.select) {
              for (var i in a) a[i].select = !1;
              a[r].select = !0
            }
            a[r].url = n.url
          }
          tab.setting("searchEngine", a)
        }
      } catch (e) { }
    })
  },
  getCpsSites: function () {
    $.ajax({
      url: _server_url + "/server/cps.json?t=" + (new Date).getTime(),
      type: "GET",
      dataType: "json"
    }).done(function (e) {
      if (!e.hasOwnProperty("error")) try {
        var t;
        t = "zh-CN" == _lang ? e["zh-CN"].sites : e.else.sites, tab.set("cpsSites", t)
      } catch (e) { }
    })
  }
};
bg.init();