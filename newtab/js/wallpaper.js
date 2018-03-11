"use strict";
var wpFormat = _imageType,
  wallpaper = {
    init: function () {
      var a = this;
      a.wps = tab.get("wallpaper"), a.setBg(), a.handleClick(), tab.onMessage("wallpaperUpdate", function () {
        a.wps = tab.get("wallpaper");
        var t = "/wallpapers/" + a.wps.current + wpFormat;
        $("#newtab").css("background-image", "url(" + t + ")");
        var e = new Image;
        e.src = t, e.onload = function () {
          $("#tab-black-hover").show()
        }
      })
    },
    handleClick: function () {
      var a = this;
      $(document).on("click", ".setting-wallpaper-item", function (t) {
        if (-1 == t.target.className.indexOf("setting-wallpaper-like")) {
          var e = $(t.target).attr("data-name"),
            r = "/wallpapers/" + e + wpFormat;
          $("#newtab").css("background-image", "url(" + r + ")"), tab.setting("autoChangeWallpaper") && ($("#setting-autoChangeWallpaper").click(), tab.showInfo(".setting-content", i18nInText.willCloseAutoWallpaper)), a.wps.current = e, tab.set("wallpaper", a.wps)
        }
      })
    },
    getNextWallpaper: function (a) {
      var t = tab.setting("onlyFavoriteWallpaper"),
        e = a.current,
        r = e,
        l = [];
      l = t ? a.all.filter(function (a, t) {
        return a.like
      }) : a.all;
      try {
        r = l[0].name
      } catch (a) { }
      for (var n = 0; n < l.length; n++)
        if (l[n].name > parseInt(e)) try {
          r = l[n].name;
          break
        } catch (a) {
          break
        }
      a.current = r
    },
    setBg: function () {
      try {
        var a, t, e = this;
        if (tab.setting("autoChangeWallpaper"))
          if (tab.setting("wallpaperType").newtab) {
            tab.setting("onlyFavoriteWallpaper");
            e.getNextWallpaper(e.wps), tab.set("wallpaper", e.wps)
          }
        a = "/wallpapers/" + e.wps.current + wpFormat, (t = new Image).src = a, t.onload = function () {
          $("#tab-black-hover").show(), $("#newtab").css("background-image", "url(" + a + ")"), $("#bottom").css("visibility", "visible")
        }, t.onerror = function () {
          $("#newtab").css("background-image", "url(" + a + ")"), $("#bottom").css("visibility", "visible")
        }
      } catch (a) { }
    }
  };