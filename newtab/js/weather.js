"use strict";
tab.modules.weather = {
    tempUnitC: !0,
    show: !1,
    init: function(t) {
        var e = this;
        e.tempUnitC = tab.setting("tempUnitC"), e.setTodayWeather(), e.clickHandle(), e.tempUnitC ? $(".weather-detail-setting-city-u").html('<span class="weather-detail-setting-unit">℃</span><span>' + i18nInText.celsius + "</span>") : $(".weather-detail-setting-city-u").html('<span class="weather-detail-setting-unit">℉</span><span>' + i18nInText.fahrenheit + "</span>"), setTimeout(function() {
            e.setWeather(), e.addCity(), t && t()
        }, 1e3), tab.onMessage("updateWeather", function() {
            e.setWeather()
        })
    },
    onSetCity: function(t) {
        var e = this,
            a = t.attr("data-woeid");
        $(".weather-city-adding").css("display", "flex"), e.queryWeather(a, function(t) {
            t ? 404 === t ? tab.showInfo(".weather-city-box", i18nInText.citySetFailed) : ($(".weather-city-adding,.weather-city-box").hide(), e.setTodayWeather(), e.setWeather(), tab.showInfo(".weather-box", i18nInText.citySetSuccess, !0)) : tab.showInfo(".weather-city-box", i18nInText.cityFailedPleaseCheck)
        })
    },
    clickHandle: function() {
        var t = this;
        $(".weather-button-out").on("click", function(e) {
            e.preventDefault(), t.show ? $(".weather-box").hide() : ($(".weather-box").show(), $("#content").addClass("zindex-100").removeClass("zindex-999")), t.show = !t.show
        }), $(document).on("click", function(e) {
            $(e.target).parents(".weather-button").length || ($(".weather-box").hide(), $(".weather-city-adding,.weather-city-box").hide(), t.show = !1)
        }), $(document).on("click", ".weather-city-res", function(e) {
            e.preventDefault(), t.onSetCity($(this))
        }), $(".weather-detail-setting-city").on("click", function(t) {
            t.preventDefault(), $(".weather-input").val(""), setTimeout(function() {
                $(".weather-input")[0].focus()
            }, 0), $(".weather-city-box").show(), $(".weather-city-lists").html("")
        }), $(".weather-city-close").on("click", function(t) {
            t.preventDefault(), $(".weather-city-adding,.weather-city-box").hide()
        }), $(".weather-detail-setting-city-u").on("click", function(e) {
            e.preventDefault(), t.tempUnitC = !t.tempUnitC, tab.setting("tempUnitC", t.tempUnitC), t.setTodayWeather(), t.setWeather(), t.tempUnitC ? setTimeout(function() {
                $(".weather-detail-setting-city-u").html('<span class="weather-detail-setting-unit">℃</span><span>' + i18nInText.celsius + "</span>")
            }, 10) : setTimeout(function() {
                $(".weather-detail-setting-city-u").html('<span class="weather-detail-setting-unit">℉</span><span>' + i18nInText.fahrenheit + "</span>")
            }, 10)
        })
    },
    transUnit: function(t) {
        try {
            var e = parseInt(t);
            return this.tempUnitC ? Math.round((e - 32) / 1.8) : e
        } catch (e) {
            return t
        }
    },
    queryWeather: function(t, e) {
        var a = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=" + (t = t || 2459115) + "&format=json";
        $.ajax({
            url: a,
            dataType: "json"
        }).done(function(a) {
            try {
                var i = a.query.results;
                if (i.channel.hasOwnProperty("item")) {
                    var n = i.channel,
                        r = {};
                    r.today = {
                        code: n.item.condition.code,
                        temp: {
                            current: n.item.condition.temp,
                            high: n.item.forecast[0].high,
                            low: n.item.forecast[0].low
                        },
                        text: n.item.condition.text
                    }, r.future = [], r.location = n.location, r.woeid = t, n.item.forecast.map(function(t, e) {
                        e > 0 && e < 6 && r.future.push(t)
                    }), tab.set("tab-weather", r), e && e(200)
                }
            } catch (t) {
                e && e(404)
            }
        }).fail(function() {
            e && e(!1)
        }).always(function() {})
    },
    setTodayWeather: function() {
        try {
            var t = this,
                e = tab.get("tab-weather"),
                a = t.tempUnitC ? "℃" : "℉";
            t.transUnit(e.today.temp.high), t.transUnit(e.today.temp.low);
            $(".weather-today-temp").text(t.transUnit(e.today.temp.current) + " " + a), $(".weather-today-icon").attr("src", "/newtab/weather/icon-" + weatherIconMap[e.today.code].img + ".svg"), $(".weather-today-icon").show(), $(".weather-today-desc").text(e.today.text), $(".weather-location").text(e.location.city + ("..." != e.location.country ? "," : "") + e.location.country)
        } catch (t) {}
    },
    setWeather: function() {
        try {
            var t = this,
                e = tab.get("tab-weather"),
                a = t.tempUnitC ? "℃" : "℉",
                i = t.transUnit(e.today.temp.high),
                n = t.transUnit(e.today.temp.low);
            $(".weather-today-temp,.weather-detail-today-text-big-temp").text(t.transUnit(e.today.temp.current) + " " + a), $(".weather-today-icon,.weather-detail-today-icon-img").attr("src", "/newtab/weather/icon-" + weatherIconMap[e.today.code].img + ".svg"), $(".weather-today-desc,.weather-detail-today-text-desc").text(e.today.text), $(".weather-location,.weather-detail-today-location").text(e.location.city + ("..." != e.location.country ? "," : "") + e.location.country), $(".weather-detail-today-text-small-temp").text(i + "~" + n + a), $(".weather-detail-today-text-date-today").text(i18nInText.today);
            var r = e.future.map(function(e, i) {
                var n = n || "";
                return n += '<div class="weather-item">', n += '<div class="weather-list"><img class="weather-future-icon" src="/newtab/weather/icon-' + weatherIconMap[e.code].img + '.svg"></div>', n += '<div class="weather-list">' + t.transUnit(e.high) + "~" + t.transUnit(e.low) + a + "</div>", n += '<div class="weather-list weather-list-desc">' + e.text + "</div>", n += '<div class="weather-list">' + new Date(e.date).toLocaleString(_lang, {
                    weekday: "short"
                }) + "</div>", n += "</div>"
            });
            $(".weather-line-future").html(r)
        } catch (t) {}
    },
    cityQueryAjax: null,
    currentList: 0,
    preText: "",
    addCity: function() {
        var t = this;
        $(".weather-input").on("keydown", function(e) {
            $(".weather-city-res").removeClass("weather-city-res-select");
            var a = $(".weather-city-res").length;
            38 == e.which ? (e.preventDefault(), t.currentList -= 1, t.currentList <= -1 && (t.currentList = a), $(".weather-city-lists-in").scrollTop(30 * (t.currentList - 1)), $(".weather-city-res:nth-child(" + t.currentList + ")").addClass("weather-city-res-select"), 0 == t.currentList ? $(".weather-input").val(t.preText) : $(".weather-input").val($(".weather-city-res:nth-child(" + t.currentList + ")").attr("data-city"))) : 40 == e.which ? (e.preventDefault(), t.currentList += 1, t.currentList >= a + 1 && (t.currentList = 0), $(".weather-city-lists-in").scrollTop(30 * (t.currentList - 1)), $(".weather-city-res:nth-child(" + t.currentList + ")").addClass("weather-city-res-select"), 0 == t.currentList ? $(".weather-input").val(t.preText) : $(".weather-input").val($(".weather-city-res:nth-child(" + t.currentList + ")").attr("data-city"))) : 13 == e.which && 0 != t.currentList && t.onSetCity($(".weather-city-res:nth-child(" + t.currentList + ")"))
        }), $(".weather-input").on("input", function(e) {
            e.preventDefault();
            var a = $(".weather-input").val();
            t.preText = a;
            var i = "https://www.yahoo.com/news/_td/api/resource/WeatherSearch;text=" + encodeURIComponent(a) + "?bkt=news-d-147&device=desktop&feature=cacheContentCanvas%2Ccanvass%2Cfeaturebar%2CdeferModalCluster%2CspecRetry&intl=" + _lang + "&lang=" + _lang + "&partner=none&region=US&site=fp&tz=America%2FLos_Angeles&ver=2.0.2213002&returnMeta=true";
            $(".weather-city-loading").css("display", "flex"), 0 === a.length ? ($(".weather-city-lists").hide(), $(".weather-city-lists").html('<div class="weather-city-loading"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>')) : $(".weather-city-lists").show(), t.cityQueryAjax && t.cityQueryAjax.abort(), t.cityQueryAjax = $.ajax({
                url: i,
                dataType: "json"
            }).done(function(e) {
                t.currentList = 0;
                var a = e.data.splice(0, 20),
                    i = "";
                i = '<div class="weather-city-lists-in">', 0 === a.length ? $(".weather-city-lists").html('<div class="weather-error">' + i18nInText.cityNotFound + "</div>") : (a.map(function(t, e) {
                    i += '<li class="weather-city-res" data-city="' + t.city + '" data-woeid="' + t.woeid + '">' + t.qualifiedName + "</li>"
                }), i += "</div>", $(".weather-city-lists").html(i))
            }).fail(function(t, e, a) {
                "abort" != e && $(".weather-city-lists").html('<div class="weather-error">' + i18nInText.newError + "</div>")
            })
        })
    }
};