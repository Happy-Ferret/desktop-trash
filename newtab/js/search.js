! function () {
  "use strict";
  $(document).on("click", function (t) {
    if (!$(t.target).parents("#search-box").length) try {
      tab.modules.search.showSu = !1, $("#content").addClass("zindex-100").removeClass("zindex-999")
    } catch (t) { }
  }), tab.require("/lib/vue.csp.min", function () {
    tab.modules.search = new Vue({
      el: "#search",
      data: {
        select: "",
        input: "",
        current: "",
        items: [],
        suggestions: [],
        searchSuggesutAjaxZh: !1,
        searchSuggesutAjaxOther: !1,
        suIndex: -1,
        preInput: "",
        showSu: !0
      },
      created: function () {
        this.init()
      },
      methods: {
        init: function () {
          var t = tab.setting("searchEngine");
          for (var e in t) t[e].select && (this.current = e)
        },
        onInputBlur: function () { },
        go: function (t) {
          var e = this,
            s = tab.setting("isSearchInNewTab") ? "_blank" : "_self",
            a = tab.setting("searchEngine");
          for (var n in a) a[n].select && (e.current = n);
          var u = a[e.current].url + encodeURIComponent(e.input);
          window.open(u, s)
        },
        search: function (t, e) {
          if (0 == t.indexOf("tab://search/")) {
            var s = decodeURIComponent(t.substr(18, t.length));
            tab.with("tab-search", function (t) {
              t.show(s)
            })
          } else window.open(t, e)
        },
        focus: function () {
          $(".search-input")[0].focus()
        },
        change: function (t, e) {
          var s = this;
          if ("search-item-delete" === e.target.className) {
            var a = tab.get("tab-searchs");
            if (t.logo == a.current.logo) tab.with("info", function (t) {
              t.show(tab.i18n("cannot_delete_current_search"), !0)
            });
            else {
              var n = s.items.indexOf(t);
              s.items.splice(n, 1), (a = tab.get("tab-searchs")).all = s.items, tab.set("tab-searchs", a), tab.broadcast("searchUpdate"), tab.broadcast("searchAddUpdate")
            }
          } else {
            n = s.items.indexOf(t);
            s.current = s.items[n], (a = tab.get("tab-searchs")).all = s.items, a.current = s.current, s.select = s.current.types[0], tab.set("tab-searchs", a), tab.broadcast("searchUpdate"), tab.broadcast("searchAddUpdate"), hideSearchBox(), s.focus()
          }
        },
        changeTotab: function () {
          var t = this,
            e = tab.get("tab-searchs");
          e.current = t.tabSearch, t.current = t.tabSearch, t.select = t.current.types[0], tab.set("tab-searchs", e), tab.broadcast("searchUpdate"), tab.broadcast("searchAddUpdate"), hideSearchBox(), t.focus()
        },
        changeType: function (t) {
          this.select = t, this.focus()
        },
        onInputFocus: function () { },
        inputSuggest: function (t) {
          this.startSuggest()
        },
        keyupSuggest: function (t) {
          32 == t.which && this.startSuggest()
        },
        startSuggest: function (t) {
          var e = this;
          if (e.showSu = !0, e.preInput = e.input, "" == e.input) return e.suggestions = [], e.suIndex = -1, e.searchSuggesutAjaxZh && e.searchSuggesutAjaxZh.abort(), void (e.searchSuggesutAjaxOther && e.searchSuggesutAjaxOther.abort());
          $("#content").removeClass("zindex-100").addClass("zindex-999"), tab.isZh() ? e.getZhSuggestion() : e.getOtherSuggestion()
        },
        getZhSuggestion: function () {
          var t = this;
          t.searchSuggesutAjaxZh && t.searchSuggesutAjaxZh.abort(), t.searchSuggesutAjaxZh = $.get({
            url: "http://suggestion.baidu.com/su?wd=" + t.input + "&p=3&t=" + (new Date).getTime() + "&cb=",
            dataType: "text",
            success: function (e) {
              try {
                var s = e.substr(0, e.length - 3).split(",s:")[1],
                  a = JSON.parse(s),
                  n = [];
                a.map(function (t, e) {
                  var s = {
                    isUrl: !1,
                    text: a[e]
                  };
                  n.push(s)
                }), t.suggestions = n.splice(0, 8)
              } catch (t) { }
            }
          })
        },
        getOtherSuggestion: function () {
          var t = this;
          t.searchSuggesutAjaxOther && t.searchSuggesutAjaxOther.abort(), t.searchSuggesutAjaxOther = $.get({
            url: "http://google.com/complete/search?client=chrome&q=" + t.input + "&hl=" + chrome.i18n.getUILanguage() + "&tabTime=" + (new Date).getTime(),
            dataType: "json",
            success: function (e) {
              try {
                var s = [];
                e[2].map(function (t, a) {
                  var n = {
                    isUrl: !1,
                    text: e[1][a]
                  };
                  "" != t && (n.isUrl = !0), s.push(n)
                }), t.suggestions = s.splice(0, 8)
              } catch (t) { }
            }
          })
        },
        down: function (t) {
          t.preventDefault();
          var e = this;
          e.suIndex += 1, e.suIndex == e.suggestions.length ? (e.suIndex = -1, e.input = e.preInput) : e.input = e.suggestions[e.suIndex].text
        },
        up: function (t) {
          t.preventDefault();
          var e = this;
          e.suIndex -= 1, -2 == e.suIndex && (e.suIndex = e.suggestions.length - 1), -1 == e.suIndex ? e.input = e.preInput : e.input = e.suggestions[e.suIndex].text
        }
      }
    })
  })
}();