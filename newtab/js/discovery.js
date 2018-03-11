"use strict";
tab.modules.discovery = {
  init: function () {
    try {
      this.get(), this.handleClick()
    } catch (t) { }
  },
  handleClick: function () {
    $(".setting-discovery-item").on("click", function (t) {
      t.preventDefault();
      var e = $(this).attr("data-href");
      window.open(e, "_blank")
    })
  },
  get: function () {
    var t = "",
      e = "",
      i = "",
      n = "";
    try {
      t = tab.get("discovery")[_browser], e = window.navigator.language.replace("-", "_").replace("-", "_")
    } catch (t) { }

    function a(t) {
      try {
        "ads" === t.type && (n = "/newtab/img/icon-hot.svg"), "extension" === t.type && (n = "/newtab/img/icon-ext.svg"), "theme" === t.type && (n = "/newtab/img/icon-theme.svg");
        var a = "",
          s = e.split("_")[0];
        a = t.name.hasOwnProperty(e) ? e : t.name.hasOwnProperty(s) ? s : "default", i += '<a class="setting-discovery-item" target="_blank" data-href="' + t.url + '" style="background-image:url(' + t.img + ')"><div class="setting-discovery-bottom"><img src="' + n + '" alt=""><div class="setting-discovery-name">' + t.name[a] + "</div></div></a>"
      } catch (t) { }
    }
    try {
      for (var s = 0; s < t.length; s++) {
        if (t[s].hasOwnProperty("showIn")) t[s].showIn.map(function (i, n) {
          if (e === i || e.indexOf(i) >= 0 || i.indexOf(e) >= 0) return e === i ? e : e.indexOf(i) >= 0 ? i : i.indexOf(e) >= 0 && e, void a(t[s])
        });
        else a(t[s])
      }
      i += "", $(".setting-single-in-discovery").html(i)
    } catch (t) { }
  }
};