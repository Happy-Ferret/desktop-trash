"use strict";
var _settings = tab.get("tab-settings");

function ininTopSites(t) {
  for (var s = '<div class="topsite-out">', e = 0; e < t.length; e++) try {
    var i = "";
    if ("ads" == t[e].type) i = t[e].favicon;
    else if ("FireFox" === _browser) i = "https://favicon.infinitynewtab.com/" + new URL(t[e].url).hostname + ".png";
    else i = "chrome://favicon/size/32@2x/" + t[e].url;
    s += '<div class="topsite" data-url="' + t[e].url + '"><div class="topsite-img" style="background-image:url(' + i + ')"><img class="favicon-img" src="' + i + '" alt="" /></div><span class="topsite-title">' + t[e].title + "</span></div>"
  } catch (t) { }
  s += "</div>", $(".most-visit").html(s)
}
if (_settings.showClock ? ($(".clock").show(), $("#search").removeClass("search-no-clock")) : ($(".clock").hide(), $("#search").addClass("search-no-clock")), _settings.showSearchEngine ? ($("#search").show(), $(".search-options").removeClass("options-false"), $(".time").removeClass("time-with-no-search")) : ($("#search").hide(), $(".search-options").addClass("options-false"), $(".time").addClass("time-with-no-search")), _settings.showTopsites) {
  var sites = tab.get("topsites"),
    cps = tab.get("cpsSites") || [],
    data = cps.concat(sites);
  data && ininTopSites(data), $(".most-visit").show()
} else $(".most-visit").hide();

function checkFaviconError() {
  "FireFox" === _browser && $(".favicon-img").on("error", function (t) {
    t.preventDefault();
    var s = t.target;
    if ("true" == $(s).attr("tryFirst")) "true" == $(s).attr("trySecond") || ($(s).css("background-color", "#efefef"), $(s).attr("trySecond", "true"));
    else {
      var e = $(s).attr("src").replace("https://favicon.infinitynewtab.com/", ""),
        i = e.indexOf("."),
        a = e.substr(i + 1, e.length);
      $(s).attr("tryFirst", "true");
      var o = "https://favicon.infinitynewtab.com/" + a;
      $(s).attr("src", o)
    }
  })
}
"Chrome" === _browser && $("#chrome-apps-all,#chrome-show-apps").removeClass("firefox-hide"), _settings.showApps ? $(".apps").show() : $(".apps").hide(), _settings.showWeather ? $(".weather-button").show() : $(".weather-button").hide(), checkFaviconError();