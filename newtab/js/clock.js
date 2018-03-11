"use strict";
var clock = {
    getTime: function() {
        var t = new Date,
            e = t.getHours(),
            a = e > 12 ? e - 12 : e,
            n = t.getMinutes();
        return a + ":" + (n = n < 10 ? "0" + n : n) + " " + (e >= 12 ? "PM" : "AM")
    },
    getDate: function() {
        var t = new Date;
        return (t.toLocaleDateString(_lang, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }) + " " + t.toLocaleString("en-US", {
            weekday: "short"
        })).toUpperCase().replace(/\//g, ".")
    },
    init: function() {
        try {
            var t = this,
                e = t.getTime();
            $(".time").html(e);
            var a = t.getDate();
            $(".date").html(a);
            var n = (new Date).toLocaleString(_lang, {
                weekday: "long"
            });
            $(".weather-detail-today-text-date-span").text(n), setInterval(function() {
                var e = t.getTime();
                $(".time").html(e);
                var a = t.getDate();
                $(".date").html(a);
                var n = (new Date).toLocaleString(_lang, {
                    weekday: "long"
                });
                $(".weather-detail-today-text-date-span").text(n)
            }, 1e3)
        } catch (t) {}
    }
};