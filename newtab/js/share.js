! function(r) {
    "use strict";

    function t(t, e, n, o) {
        var i = r(n, e);
        i.addData(t), i.make(), o = o || 0;
        var a = i.getModuleCount(),
            u = i.getModuleCount() + 2 * o;
        this.text = t, this.level = e, this.version = n, this.moduleCount = u, this.isDark = function(r, t) {
            return t -= o, !(0 > (r -= o) || r >= a || 0 > t || t >= a) && i.isDark(r, t)
        }, this.addBlank = function(r, t, e, n) {
            var o = this.isDark,
                i = 1 / u;
            this.isDark = function(a, u) {
                var f = u * i,
                    c = a * i,
                    s = f + i,
                    l = c + i;
                return o(a, u) && (r > s || f > e || t > l || c > n)
            }
        }
    }

    function e(r, e, n, o, i) {
        n = Math.max(1, n || 1), o = Math.min(40, o || 40);
        for (var a = n; o >= a; a += 1) try {
            return new t(r, e, a, i)
        } catch (r) {}
    }

    function n(r, t, e) {
        s(e.background).is("img") ? t.drawImage(e.background, 0, 0, e.size, e.size) : e.background && (t.fillStyle = e.background, t.fillRect(e.left, e.top, e.size, e.size));
        var n, o, i, a, u, f, c, l, h, g, d, v, p = e.mode;
        1 === p || 2 === p ? function(r, t, e) {
            var n = e.size,
                o = "bold " + e.mSize * n + "px " + e.fontname,
                i = s("<canvas/>")[0].getContext("2d");
            i.font = o;
            var a = i.measureText(e.label).width,
                u = e.mSize,
                f = a / n,
                c = (1 - f) * e.mPosX,
                l = (1 - u) * e.mPosY,
                h = c + f,
                g = l + u;
            1 === e.mode ? r.addBlank(0, l - .01, n, g + .01) : r.addBlank(c - .01, l - .01, h + .01, g + .01), t.fillStyle = e.fontcolor, t.font = o, t.fillText(e.label, c * n, l * n + .75 * e.mSize * n)
        }(r, t, e) : (3 === p || 4 === p) && (n = r, o = t, a = (i = e).size, u = i.image.naturalWidth || 1, f = i.image.naturalHeight || 1, c = i.mSize, h = (1 - (l = c * u / f)) * i.mPosX, g = (1 - c) * i.mPosY, d = h + l, v = g + c, 3 === i.mode ? n.addBlank(0, g - .01, a, v + .01) : n.addBlank(h - .01, g - .01, d + .01, v + .01), o.drawImage(i.image, h * a, g * a, l * a, c * a))
    }

    function o(r, t, e, n, o, i, a, u) {
        r.isDark(a, u) && t.rect(n, o, i, i)
    }

    function i(r, t, e, n, o, i, a, u) {
        var f, c, s, l, h, g, d, v, p, w, m, y, k, b, T, C, B, L, S, A = r.isDark,
            x = n + i,
            E = o + i,
            I = e.radius * i,
            D = a - 1,
            M = a + 1,
            z = u - 1,
            q = u + 1,
            R = A(a, u),
            P = A(D, z),
            U = A(D, u),
            O = A(D, q),
            Q = A(a, q),
            H = A(M, q),
            N = A(M, u),
            j = A(M, z),
            G = A(a, z);
        R ? (w = t, m = n, y = o, k = x, b = E, T = I, C = !U && !G, B = !U && !Q, L = !N && !Q, S = !N && !G, C ? w.moveTo(m + T, y) : w.moveTo(m, y), B ? (w.lineTo(k - T, y), w.arcTo(k, y, k, b, T)) : w.lineTo(k, y), L ? (w.lineTo(k, b - T), w.arcTo(k, b, m, b, T)) : w.lineTo(k, b), S ? (w.lineTo(m + T, b), w.arcTo(m, b, m, y, T)) : w.lineTo(m, b), C ? (w.lineTo(m, y + T), w.arcTo(m, y, k, y, T)) : w.lineTo(m, y)) : (f = t, c = n, s = o, l = x, h = E, g = I, d = U && Q && O, v = N && Q && H, p = N && G && j, U && G && P && (f.moveTo(c + g, s), f.lineTo(c, s), f.lineTo(c, s + g), f.arcTo(c, s, c + g, s, g)), d && (f.moveTo(l - g, s), f.lineTo(l, s), f.lineTo(l, s + g), f.arcTo(l, s, l - g, s, g)), v && (f.moveTo(l - g, h), f.lineTo(l, h), f.lineTo(l, h - g), f.arcTo(l, h, l - g, h, g)), p && (f.moveTo(c + g, h), f.lineTo(c, h), f.lineTo(c, h - g), f.arcTo(c, h, c + g, h, g)))
    }

    function a(r, t) {
        var a = e(t.text, t.ecLevel, t.minVersion, t.maxVersion, t.quiet);
        if (!a) return null;
        var u = s(r).data("qrcode", a),
            f = u[0].getContext("2d");
        return n(a, f, t),
            function(r, t, e) {
                var n, a, u = r.moduleCount,
                    f = e.size / u,
                    c = o;
                for (h && e.radius > 0 && e.radius <= .5 && (c = i), t.beginPath(), n = 0; u > n; n += 1)
                    for (a = 0; u > a; a += 1) c(r, t, e, e.left + a * f, e.top + n * f, f, n, a);
                if (s(e.fill).is("img")) {
                    t.strokeStyle = "rgba(0,0,0,0.5)", t.lineWidth = 2, t.stroke();
                    var l = t.globalCompositeOperation;
                    t.globalCompositeOperation = "destination-out", t.fill(), t.globalCompositeOperation = l, t.clip(), t.drawImage(e.fill, 0, 0, e.size, e.size), t.restore()
                } else t.fillStyle = e.fill, t.fill()
            }(a, f, t), u
    }

    function u(r) {
        return a(s("<canvas/>").attr("width", r.size).attr("height", r.size), r)
    }

    function f(r) {
        return l && "canvas" === r.render ? u(r) : l && "image" === r.render ? (t = r, s("<img/>").attr("src", u(t)[0].toDataURL("image/png"))) : function(r) {
            var t = e(r.text, r.ecLevel, r.minVersion, r.maxVersion, r.quiet);
            if (!t) return null;
            var n, o, i = r.size,
                a = r.background,
                u = Math.floor,
                f = t.moduleCount,
                c = u(i / f),
                l = u(.5 * (i - c * f)),
                h = {
                    position: "relative",
                    left: 0,
                    top: 0,
                    padding: 0,
                    margin: 0,
                    width: i,
                    height: i
                },
                g = {
                    position: "absolute",
                    padding: 0,
                    margin: 0,
                    width: c,
                    height: c,
                    "background-color": r.fill
                },
                d = s("<div/>").data("qrcode", t).css(h);
            for (a && d.css("background-color", a), n = 0; f > n; n += 1)
                for (o = 0; f > o; o += 1) t.isDark(n, o) && s("<div/>").css(g).css({
                    left: l + o * c,
                    top: l + n * c
                }).appendTo(d);
            return d
        }(r);
        var t
    }
    var c, s = jQuery,
        l = (c = document.createElement("canvas"), Boolean(c.getContext && c.getContext("2d"))),
        h = "[object Opera]" !== Object.prototype.toString.call(window.opera),
        g = {
            render: "canvas",
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: 0,
            quiet: 0,
            mode: 0,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "no label",
            fontname: "sans",
            fontcolor: "#000",
            image: null
        };
    s.fn.qrcode = function(r) {
        var t = s.extend({}, g, r);
        return this.each(function() {
            "canvas" === this.nodeName.toLowerCase() ? a(this, t) : s(this).append(f(t))
        })
    }
}(function() {
    var r, t = function() {
        function r(t, e) {
            if (void 0 === t.length) throw new Error(t.length + "/" + e);
            var n = function() {
                    for (var r = 0; r < t.length && 0 == t[r];) r += 1;
                    for (var n = new Array(t.length - r + e), o = 0; o < t.length - r; o += 1) n[o] = t[o + r];
                    return n
                }(),
                o = {
                    getAt: function(r) {
                        return n[r]
                    },
                    getLength: function() {
                        return n.length
                    },
                    multiply: function(t) {
                        for (var e = new Array(o.getLength() + t.getLength() - 1), n = 0; n < o.getLength(); n += 1)
                            for (var i = 0; i < t.getLength(); i += 1) e[n + i] ^= b.gexp(b.glog(o.getAt(n)) + b.glog(t.getAt(i)));
                        return r(e, 0)
                    },
                    mod: function(t) {
                        if (o.getLength() - t.getLength() < 0) return o;
                        for (var e = b.glog(o.getAt(0)) - b.glog(t.getAt(0)), n = new Array(o.getLength()), i = 0; i < o.getLength(); i += 1) n[i] = o.getAt(i);
                        for (i = 0; i < t.getLength(); i += 1) n[i] ^= b.gexp(b.glog(t.getAt(i)) + e);
                        return r(n, 0).mod(t)
                    }
                };
            return o
        }
        var t = function(t, e) {
            var n = t,
                o = l[e],
                i = null,
                a = 0,
                u = null,
                f = new Array,
                c = {},
                s = function(r, t) {
                    i = function(r) {
                        for (var t = new Array(r), e = 0; r > e; e += 1) {
                            t[e] = new Array(r);
                            for (var n = 0; r > n; n += 1) t[e][n] = null
                        }
                        return t
                    }(a = 4 * n + 17), h(0, 0), h(a - 7, 0), h(0, a - 7), d(), g(), p(r, t), n >= 7 && v(r), null == u && (u = m(n, o, f)), w(u, t)
                },
                h = function(r, t) {
                    for (var e = -1; 7 >= e; e += 1)
                        if (!(-1 >= r + e || r + e >= a))
                            for (var n = -1; 7 >= n; n += 1) - 1 >= t + n || t + n >= a || (i[r + e][t + n] = e >= 0 && 6 >= e && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == e || 6 == e) || e >= 2 && 4 >= e && n >= 2 && 4 >= n)
                },
                g = function() {
                    for (var r = 8; a - 8 > r; r += 1) null == i[r][6] && (i[r][6] = r % 2 == 0);
                    for (var t = 8; a - 8 > t; t += 1) null == i[6][t] && (i[6][t] = t % 2 == 0)
                },
                d = function() {
                    for (var r = k.getPatternPosition(n), t = 0; t < r.length; t += 1)
                        for (var e = 0; e < r.length; e += 1) {
                            var o = r[t],
                                a = r[e];
                            if (null == i[o][a])
                                for (var u = -2; 2 >= u; u += 1)
                                    for (var f = -2; 2 >= f; f += 1) i[o + u][a + f] = -2 == u || 2 == u || -2 == f || 2 == f || 0 == u && 0 == f
                        }
                },
                v = function(r) {
                    for (var t = k.getBCHTypeNumber(n), e = 0; 18 > e; e += 1) {
                        var o = !r && 1 == (t >> e & 1);
                        i[Math.floor(e / 3)][e % 3 + a - 8 - 3] = o
                    }
                    for (e = 0; 18 > e; e += 1) {
                        o = !r && 1 == (t >> e & 1);
                        i[e % 3 + a - 8 - 3][Math.floor(e / 3)] = o
                    }
                },
                p = function(r, t) {
                    for (var e = o << 3 | t, n = k.getBCHTypeInfo(e), u = 0; 15 > u; u += 1) {
                        var f = !r && 1 == (n >> u & 1);
                        6 > u ? i[u][8] = f : 8 > u ? i[u + 1][8] = f : i[a - 15 + u][8] = f
                    }
                    for (u = 0; 15 > u; u += 1) {
                        f = !r && 1 == (n >> u & 1);
                        8 > u ? i[8][a - u - 1] = f : 9 > u ? i[8][15 - u - 1 + 1] = f : i[8][15 - u - 1] = f
                    }
                    i[a - 8][8] = !r
                },
                w = function(r, t) {
                    for (var e = -1, n = a - 1, o = 7, u = 0, f = k.getMaskFunction(t), c = a - 1; c > 0; c -= 2)
                        for (6 == c && (c -= 1);;) {
                            for (var s = 0; 2 > s; s += 1)
                                if (null == i[n][c - s]) {
                                    var l = !1;
                                    u < r.length && (l = 1 == (r[u] >>> o & 1)), f(n, c - s) && (l = !l), i[n][c - s] = l, -1 == (o -= 1) && (u += 1, o = 7)
                                }
                            if (0 > (n += e) || n >= a) {
                                n -= e, e = -e;
                                break
                            }
                        }
                },
                m = function(t, e, n) {
                    for (var o = T.getRSBlocks(t, e), i = C(), a = 0; a < n.length; a += 1) {
                        var u = n[a];
                        i.put(u.getMode(), 4), i.put(u.getLength(), k.getLengthInBits(u.getMode(), t)), u.write(i)
                    }
                    var f = 0;
                    for (a = 0; a < o.length; a += 1) f += o[a].dataCount;
                    if (i.getLengthInBits() > 8 * f) throw new Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * f + ")");
                    for (i.getLengthInBits() + 4 <= 8 * f && i.put(0, 4); i.getLengthInBits() % 8 != 0;) i.putBit(!1);
                    for (; !(i.getLengthInBits() >= 8 * f || (i.put(236, 8), i.getLengthInBits() >= 8 * f));) i.put(17, 8);
                    return function(t, e) {
                        for (var n = 0, o = 0, i = 0, a = new Array(e.length), u = new Array(e.length), f = 0; f < e.length; f += 1) {
                            var c = e[f].dataCount,
                                s = e[f].totalCount - c;
                            o = Math.max(o, c), i = Math.max(i, s), a[f] = new Array(c);
                            for (var l = 0; l < a[f].length; l += 1) a[f][l] = 255 & t.getBuffer()[l + n];
                            n += c;
                            var h = k.getErrorCorrectPolynomial(s),
                                g = r(a[f], h.getLength() - 1).mod(h);
                            for (u[f] = new Array(h.getLength() - 1), l = 0; l < u[f].length; l += 1) {
                                var d = l + g.getLength() - u[f].length;
                                u[f][l] = d >= 0 ? g.getAt(d) : 0
                            }
                        }
                        var v = 0;
                        for (l = 0; l < e.length; l += 1) v += e[l].totalCount;
                        var p = new Array(v),
                            w = 0;
                        for (l = 0; o > l; l += 1)
                            for (f = 0; f < e.length; f += 1) l < a[f].length && (p[w] = a[f][l], w += 1);
                        for (l = 0; i > l; l += 1)
                            for (f = 0; f < e.length; f += 1) l < u[f].length && (p[w] = u[f][l], w += 1);
                        return p
                    }(i, o)
                };
            return c.addData = function(r) {
                var t = B(r);
                f.push(t), u = null
            }, c.isDark = function(r, t) {
                if (0 > r || r >= a || 0 > t || t >= a) throw new Error(r + "," + t);
                return i[r][t]
            }, c.getModuleCount = function() {
                return a
            }, c.make = function() {
                s(!1, function() {
                    for (var r = 0, t = 0, e = 0; 8 > e; e += 1) {
                        s(!0, e);
                        var n = k.getLostPoint(c);
                        (0 == e || r > n) && (r = n, t = e)
                    }
                    return t
                }())
            }, c.createTableTag = function(r, t) {
                r = r || 2;
                var e = "";
                e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: " + (t = void 0 === t ? 4 * r : t) + "px;", e += '">', e += "<tbody>";
                for (var n = 0; n < c.getModuleCount(); n += 1) {
                    e += "<tr>";
                    for (var o = 0; o < c.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", e += " height: " + r + "px;", e += " background-color: ", e += c.isDark(n, o) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                return (e += "</tbody>") + "</table>"
            }, c.createImgTag = function(r, t) {
                r = r || 2, t = void 0 === t ? 4 * r : t;
                var e = c.getModuleCount() * r + 2 * t,
                    n = t,
                    o = e - t;
                return x(e, e, function(t, e) {
                    if (t >= n && o > t && e >= n && o > e) {
                        var i = Math.floor((t - n) / r),
                            a = Math.floor((e - n) / r);
                        return c.isDark(a, i) ? 0 : 1
                    }
                    return 1
                })
            }, c
        };
        t.stringToBytes = function(r) {
            for (var t = new Array, e = 0; e < r.length; e += 1) {
                var n = r.charCodeAt(e);
                t.push(255 & n)
            }
            return t
        }, t.createStringToBytes = function(r, t) {
            var e = function() {
                    for (var e = S(r), n = function() {
                            var r = e.read();
                            if (-1 == r) throw new Error;
                            return r
                        }, o = 0, i = {};;) {
                        var a = e.read();
                        if (-1 == a) break;
                        var u = n(),
                            f = n() << 8 | n();
                        i[String.fromCharCode(a << 8 | u)] = f, o += 1
                    }
                    if (o != t) throw new Error(o + " != " + t);
                    return i
                }(),
                n = "?".charCodeAt(0);
            return function(r) {
                for (var t = new Array, o = 0; o < r.length; o += 1) {
                    var i = r.charCodeAt(o);
                    if (128 > i) t.push(i);
                    else {
                        var a = e[r.charAt(o)];
                        "number" == typeof a ? (255 & a) == a ? t.push(a) : (t.push(a >>> 8), t.push(255 & a)) : t.push(n)
                    }
                }
                return t
            }
        };
        var e, n, o, i, a, u = 1,
            f = 2,
            c = 4,
            s = 8,
            l = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            },
            h = 0,
            g = 1,
            d = 2,
            v = 3,
            p = 4,
            w = 5,
            m = 6,
            y = 7,
            k = (o = [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170]
            ], a = function(r) {
                for (var t = 0; 0 != r;) t += 1, r >>>= 1;
                return t
            }, (i = {}).getBCHTypeInfo = function(r) {
                for (var t = r << 10; a(t) - a(1335) >= 0;) t ^= 1335 << a(t) - a(1335);
                return 21522 ^ (r << 10 | t)
            }, i.getBCHTypeNumber = function(r) {
                for (var t = r << 12; a(t) - a(7973) >= 0;) t ^= 7973 << a(t) - a(7973);
                return r << 12 | t
            }, i.getPatternPosition = function(r) {
                return o[r - 1]
            }, i.getMaskFunction = function(r) {
                switch (r) {
                    case h:
                        return function(r, t) {
                            return (r + t) % 2 == 0
                        };
                    case g:
                        return function(r, t) {
                            return r % 2 == 0
                        };
                    case d:
                        return function(r, t) {
                            return t % 3 == 0
                        };
                    case v:
                        return function(r, t) {
                            return (r + t) % 3 == 0
                        };
                    case p:
                        return function(r, t) {
                            return (Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0
                        };
                    case w:
                        return function(r, t) {
                            return r * t % 2 + r * t % 3 == 0
                        };
                    case m:
                        return function(r, t) {
                            return (r * t % 2 + r * t % 3) % 2 == 0
                        };
                    case y:
                        return function(r, t) {
                            return (r * t % 3 + (r + t) % 2) % 2 == 0
                        };
                    default:
                        throw new Error("bad maskPattern:" + r)
                }
            }, i.getErrorCorrectPolynomial = function(t) {
                for (var e = r([1], 0), n = 0; t > n; n += 1) e = e.multiply(r([1, b.gexp(n)], 0));
                return e
            }, i.getLengthInBits = function(r, t) {
                if (t >= 1 && 10 > t) switch (r) {
                    case u:
                        return 10;
                    case f:
                        return 9;
                    case c:
                    case s:
                        return 8;
                    default:
                        throw new Error("mode:" + r)
                } else if (27 > t) switch (r) {
                    case u:
                        return 12;
                    case f:
                        return 11;
                    case c:
                        return 16;
                    case s:
                        return 10;
                    default:
                        throw new Error("mode:" + r)
                } else {
                    if (!(41 > t)) throw new Error("type:" + t);
                    switch (r) {
                        case u:
                            return 14;
                        case f:
                            return 13;
                        case c:
                            return 16;
                        case s:
                            return 12;
                        default:
                            throw new Error("mode:" + r)
                    }
                }
            }, i.getLostPoint = function(r) {
                for (var t = r.getModuleCount(), e = 0, n = 0; t > n; n += 1)
                    for (var o = 0; t > o; o += 1) {
                        for (var i = 0, a = r.isDark(n, o), u = -1; 1 >= u; u += 1)
                            if (!(0 > n + u || n + u >= t))
                                for (var f = -1; 1 >= f; f += 1) 0 > o + f || o + f >= t || (0 != u || 0 != f) && a == r.isDark(n + u, o + f) && (i += 1);
                        i > 5 && (e += 3 + i - 5)
                    }
                for (n = 0; t - 1 > n; n += 1)
                    for (o = 0; t - 1 > o; o += 1) {
                        var c = 0;
                        r.isDark(n, o) && (c += 1), r.isDark(n + 1, o) && (c += 1), r.isDark(n, o + 1) && (c += 1), r.isDark(n + 1, o + 1) && (c += 1), (0 == c || 4 == c) && (e += 3)
                    }
                for (n = 0; t > n; n += 1)
                    for (o = 0; t - 6 > o; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
                for (o = 0; t > o; o += 1)
                    for (n = 0; t - 6 > n; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
                var s = 0;
                for (o = 0; t > o; o += 1)
                    for (n = 0; t > n; n += 1) r.isDark(n, o) && (s += 1);
                return e + Math.abs(100 * s / t / t - 50) / 5 * 10
            }, i),
            b = function() {
                for (var r = new Array(256), t = new Array(256), e = 0; 8 > e; e += 1) r[e] = 1 << e;
                for (e = 8; 256 > e; e += 1) r[e] = r[e - 4] ^ r[e - 5] ^ r[e - 6] ^ r[e - 8];
                for (e = 0; 255 > e; e += 1) t[r[e]] = e;
                var n = {
                    glog: function(r) {
                        if (1 > r) throw new Error("glog(" + r + ")");
                        return t[r]
                    },
                    gexp: function(t) {
                        for (; 0 > t;) t += 255;
                        for (; t >= 256;) t -= 255;
                        return r[t]
                    }
                };
                return n
            }(),
            T = (e = [
                [1, 26, 19],
                [1, 26, 16],
                [1, 26, 13],
                [1, 26, 9],
                [1, 44, 34],
                [1, 44, 28],
                [1, 44, 22],
                [1, 44, 16],
                [1, 70, 55],
                [1, 70, 44],
                [2, 35, 17],
                [2, 35, 13],
                [1, 100, 80],
                [2, 50, 32],
                [2, 50, 24],
                [4, 25, 9],
                [1, 134, 108],
                [2, 67, 43],
                [2, 33, 15, 2, 34, 16],
                [2, 33, 11, 2, 34, 12],
                [2, 86, 68],
                [4, 43, 27],
                [4, 43, 19],
                [4, 43, 15],
                [2, 98, 78],
                [4, 49, 31],
                [2, 32, 14, 4, 33, 15],
                [4, 39, 13, 1, 40, 14],
                [2, 121, 97],
                [2, 60, 38, 2, 61, 39],
                [4, 40, 18, 2, 41, 19],
                [4, 40, 14, 2, 41, 15],
                [2, 146, 116],
                [3, 58, 36, 2, 59, 37],
                [4, 36, 16, 4, 37, 17],
                [4, 36, 12, 4, 37, 13],
                [2, 86, 68, 2, 87, 69],
                [4, 69, 43, 1, 70, 44],
                [6, 43, 19, 2, 44, 20],
                [6, 43, 15, 2, 44, 16],
                [4, 101, 81],
                [1, 80, 50, 4, 81, 51],
                [4, 50, 22, 4, 51, 23],
                [3, 36, 12, 8, 37, 13],
                [2, 116, 92, 2, 117, 93],
                [6, 58, 36, 2, 59, 37],
                [4, 46, 20, 6, 47, 21],
                [7, 42, 14, 4, 43, 15],
                [4, 133, 107],
                [8, 59, 37, 1, 60, 38],
                [8, 44, 20, 4, 45, 21],
                [12, 33, 11, 4, 34, 12],
                [3, 145, 115, 1, 146, 116],
                [4, 64, 40, 5, 65, 41],
                [11, 36, 16, 5, 37, 17],
                [11, 36, 12, 5, 37, 13],
                [5, 109, 87, 1, 110, 88],
                [5, 65, 41, 5, 66, 42],
                [5, 54, 24, 7, 55, 25],
                [11, 36, 12, 7, 37, 13],
                [5, 122, 98, 1, 123, 99],
                [7, 73, 45, 3, 74, 46],
                [15, 43, 19, 2, 44, 20],
                [3, 45, 15, 13, 46, 16],
                [1, 135, 107, 5, 136, 108],
                [10, 74, 46, 1, 75, 47],
                [1, 50, 22, 15, 51, 23],
                [2, 42, 14, 17, 43, 15],
                [5, 150, 120, 1, 151, 121],
                [9, 69, 43, 4, 70, 44],
                [17, 50, 22, 1, 51, 23],
                [2, 42, 14, 19, 43, 15],
                [3, 141, 113, 4, 142, 114],
                [3, 70, 44, 11, 71, 45],
                [17, 47, 21, 4, 48, 22],
                [9, 39, 13, 16, 40, 14],
                [3, 135, 107, 5, 136, 108],
                [3, 67, 41, 13, 68, 42],
                [15, 54, 24, 5, 55, 25],
                [15, 43, 15, 10, 44, 16],
                [4, 144, 116, 4, 145, 117],
                [17, 68, 42],
                [17, 50, 22, 6, 51, 23],
                [19, 46, 16, 6, 47, 17],
                [2, 139, 111, 7, 140, 112],
                [17, 74, 46],
                [7, 54, 24, 16, 55, 25],
                [34, 37, 13],
                [4, 151, 121, 5, 152, 122],
                [4, 75, 47, 14, 76, 48],
                [11, 54, 24, 14, 55, 25],
                [16, 45, 15, 14, 46, 16],
                [6, 147, 117, 4, 148, 118],
                [6, 73, 45, 14, 74, 46],
                [11, 54, 24, 16, 55, 25],
                [30, 46, 16, 2, 47, 17],
                [8, 132, 106, 4, 133, 107],
                [8, 75, 47, 13, 76, 48],
                [7, 54, 24, 22, 55, 25],
                [22, 45, 15, 13, 46, 16],
                [10, 142, 114, 2, 143, 115],
                [19, 74, 46, 4, 75, 47],
                [28, 50, 22, 6, 51, 23],
                [33, 46, 16, 4, 47, 17],
                [8, 152, 122, 4, 153, 123],
                [22, 73, 45, 3, 74, 46],
                [8, 53, 23, 26, 54, 24],
                [12, 45, 15, 28, 46, 16],
                [3, 147, 117, 10, 148, 118],
                [3, 73, 45, 23, 74, 46],
                [4, 54, 24, 31, 55, 25],
                [11, 45, 15, 31, 46, 16],
                [7, 146, 116, 7, 147, 117],
                [21, 73, 45, 7, 74, 46],
                [1, 53, 23, 37, 54, 24],
                [19, 45, 15, 26, 46, 16],
                [5, 145, 115, 10, 146, 116],
                [19, 75, 47, 10, 76, 48],
                [15, 54, 24, 25, 55, 25],
                [23, 45, 15, 25, 46, 16],
                [13, 145, 115, 3, 146, 116],
                [2, 74, 46, 29, 75, 47],
                [42, 54, 24, 1, 55, 25],
                [23, 45, 15, 28, 46, 16],
                [17, 145, 115],
                [10, 74, 46, 23, 75, 47],
                [10, 54, 24, 35, 55, 25],
                [19, 45, 15, 35, 46, 16],
                [17, 145, 115, 1, 146, 116],
                [14, 74, 46, 21, 75, 47],
                [29, 54, 24, 19, 55, 25],
                [11, 45, 15, 46, 46, 16],
                [13, 145, 115, 6, 146, 116],
                [14, 74, 46, 23, 75, 47],
                [44, 54, 24, 7, 55, 25],
                [59, 46, 16, 1, 47, 17],
                [12, 151, 121, 7, 152, 122],
                [12, 75, 47, 26, 76, 48],
                [39, 54, 24, 14, 55, 25],
                [22, 45, 15, 41, 46, 16],
                [6, 151, 121, 14, 152, 122],
                [6, 75, 47, 34, 76, 48],
                [46, 54, 24, 10, 55, 25],
                [2, 45, 15, 64, 46, 16],
                [17, 152, 122, 4, 153, 123],
                [29, 74, 46, 14, 75, 47],
                [49, 54, 24, 10, 55, 25],
                [24, 45, 15, 46, 46, 16],
                [4, 152, 122, 18, 153, 123],
                [13, 74, 46, 32, 75, 47],
                [48, 54, 24, 14, 55, 25],
                [42, 45, 15, 32, 46, 16],
                [20, 147, 117, 4, 148, 118],
                [40, 75, 47, 7, 76, 48],
                [43, 54, 24, 22, 55, 25],
                [10, 45, 15, 67, 46, 16],
                [19, 148, 118, 6, 149, 119],
                [18, 75, 47, 31, 76, 48],
                [34, 54, 24, 34, 55, 25],
                [20, 45, 15, 61, 46, 16]
            ], (n = {}).getRSBlocks = function(r, t) {
                var n, o, i = function(r, t) {
                    switch (t) {
                        case l.L:
                            return e[4 * (r - 1) + 0];
                        case l.M:
                            return e[4 * (r - 1) + 1];
                        case l.Q:
                            return e[4 * (r - 1) + 2];
                        case l.H:
                            return e[4 * (r - 1) + 3];
                        default:
                            return
                    }
                }(r, t);
                if (void 0 === i) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + t);
                for (var a = i.length / 3, u = new Array, f = 0; a > f; f += 1)
                    for (var c = i[3 * f + 0], s = i[3 * f + 1], h = i[3 * f + 2], g = 0; c > g; g += 1) u.push((n = h, o = void 0, (o = {}).totalCount = s, o.dataCount = n, o));
                return u
            }, n),
            C = function() {
                var r = new Array,
                    t = 0,
                    e = {
                        getBuffer: function() {
                            return r
                        },
                        getAt: function(t) {
                            var e = Math.floor(t / 8);
                            return 1 == (r[e] >>> 7 - t % 8 & 1)
                        },
                        put: function(r, t) {
                            for (var n = 0; t > n; n += 1) e.putBit(1 == (r >>> t - n - 1 & 1))
                        },
                        getLengthInBits: function() {
                            return t
                        },
                        putBit: function(e) {
                            var n = Math.floor(t / 8);
                            r.length <= n && r.push(0), e && (r[n] |= 128 >>> t % 8), t += 1
                        }
                    };
                return e
            },
            B = function(r) {
                var e = c,
                    n = t.stringToBytes(r),
                    o = {
                        getMode: function() {
                            return e
                        },
                        getLength: function(r) {
                            return n.length
                        },
                        write: function(r) {
                            for (var t = 0; t < n.length; t += 1) r.put(n[t], 8)
                        }
                    };
                return o
            },
            L = function() {
                var r = new Array,
                    t = {
                        writeByte: function(t) {
                            r.push(255 & t)
                        },
                        writeShort: function(r) {
                            t.writeByte(r), t.writeByte(r >>> 8)
                        },
                        writeBytes: function(r, e, n) {
                            e = e || 0, n = n || r.length;
                            for (var o = 0; n > o; o += 1) t.writeByte(r[o + e])
                        },
                        writeString: function(r) {
                            for (var e = 0; e < r.length; e += 1) t.writeByte(r.charCodeAt(e))
                        },
                        toByteArray: function() {
                            return r
                        },
                        toString: function() {
                            var t = "";
                            t += "[";
                            for (var e = 0; e < r.length; e += 1) e > 0 && (t += ","), t += r[e];
                            return t + "]"
                        }
                    };
                return t
            },
            S = function(r) {
                var t = r,
                    e = 0,
                    n = 0,
                    o = 0,
                    i = {
                        read: function() {
                            for (; 8 > o;) {
                                if (e >= t.length) {
                                    if (0 == o) return -1;
                                    throw new Error("unexpected end of file./" + o)
                                }
                                var r = t.charAt(e);
                                if (e += 1, "=" == r) return o = 0, -1;
                                r.match(/^\s$/) || (n = n << 6 | a(r.charCodeAt(0)), o += 6)
                            }
                            var i = n >>> o - 8 & 255;
                            return o -= 8, i
                        }
                    },
                    a = function(r) {
                        if (r >= 65 && 90 >= r) return r - 65;
                        if (r >= 97 && 122 >= r) return r - 97 + 26;
                        if (r >= 48 && 57 >= r) return r - 48 + 52;
                        if (43 == r) return 62;
                        if (47 == r) return 63;
                        throw new Error("c:" + r)
                    };
                return i
            },
            A = function(r, t) {
                var e = r,
                    n = t,
                    o = new Array(r * t),
                    i = {
                        setPixel: function(r, t, n) {
                            o[t * e + r] = n
                        },
                        write: function(r) {
                            r.writeString("GIF87a"), r.writeShort(e), r.writeShort(n), r.writeByte(128), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), r.writeShort(e), r.writeShort(n), r.writeByte(0);
                            var t = a(2);
                            r.writeByte(2);
                            for (var o = 0; t.length - o > 255;) r.writeByte(255), r.writeBytes(t, o, 255), o += 255;
                            r.writeByte(t.length - o), r.writeBytes(t, o, t.length - o), r.writeByte(0), r.writeString(";")
                        }
                    },
                    a = function(r) {
                        for (var t = 1 << r, e = 1 + (1 << r), n = r + 1, i = u(), a = 0; t > a; a += 1) i.add(String.fromCharCode(a));
                        i.add(String.fromCharCode(t)), i.add(String.fromCharCode(e));
                        var f, c, s, l = L(),
                            h = (f = l, c = 0, s = 0, {
                                write: function(r, t) {
                                    if (r >>> t != 0) throw new Error("length over");
                                    for (; c + t >= 8;) f.writeByte(255 & (r << c | s)), t -= 8 - c, r >>>= 8 - c, s = 0, c = 0;
                                    s |= r << c, c += t
                                },
                                flush: function() {
                                    c > 0 && f.writeByte(s)
                                }
                            });
                        h.write(t, n);
                        var g = 0,
                            d = String.fromCharCode(o[g]);
                        for (g += 1; g < o.length;) {
                            var v = String.fromCharCode(o[g]);
                            g += 1, i.contains(d + v) ? d += v : (h.write(i.indexOf(d), n), i.size() < 4095 && (i.size() == 1 << n && (n += 1), i.add(d + v)), d = v)
                        }
                        return h.write(i.indexOf(d), n), h.write(e, n), h.flush(), l.toByteArray()
                    },
                    u = function() {
                        var r = {},
                            t = 0,
                            e = {
                                add: function(n) {
                                    if (e.contains(n)) throw new Error("dup key:" + n);
                                    r[n] = t, t += 1
                                },
                                size: function() {
                                    return t
                                },
                                indexOf: function(t) {
                                    return r[t]
                                },
                                contains: function(t) {
                                    return void 0 !== r[t]
                                }
                            };
                        return e
                    };
                return i
            },
            x = function(r, t, e, n) {
                for (var o = A(r, t), i = 0; t > i; i += 1)
                    for (var a = 0; r > a; a += 1) o.setPixel(a, i, e(a, i));
                var u = L();
                o.write(u);
                for (var f = function() {
                        var r = 0,
                            t = 0,
                            e = 0,
                            n = "",
                            o = {},
                            i = function(r) {
                                n += String.fromCharCode(a(63 & r))
                            },
                            a = function(r) {
                                if (0 > r);
                                else {
                                    if (26 > r) return 65 + r;
                                    if (52 > r) return r - 26 + 97;
                                    if (62 > r) return r - 52 + 48;
                                    if (62 == r) return 43;
                                    if (63 == r) return 47
                                }
                                throw new Error("n:" + r)
                            };
                        return o.writeByte = function(n) {
                            for (r = r << 8 | 255 & n, t += 8, e += 1; t >= 6;) i(r >>> t - 6), t -= 6
                        }, o.flush = function() {
                            if (t > 0 && (i(r << 6 - t), r = 0, t = 0), e % 3 != 0)
                                for (var o = 3 - e % 3, a = 0; o > a; a += 1) n += "="
                        }, o.toString = function() {
                            return n
                        }, o
                    }(), c = u.toByteArray(), s = 0; s < c.length; s += 1) f.writeByte(c[s]);
                f.flush();
                var l = "";
                return l += "<img", l += ' src="', l += "data:image/gif;base64,", l += f, l += '"', l += ' width="', l += r, l += '"', l += ' height="', l += t, l += '"', n && (l += ' alt="', l += n, l += '"'), l + "/>"
            };
        return t
    }();
    return r = function() {
        return t
    }, "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports && (module.exports = r()), t.stringToBytes = function(r) {
        return function(r) {
            for (var t = [], e = 0; e < r.length; e++) {
                var n = r.charCodeAt(e);
                128 > n ? t.push(n) : 2048 > n ? t.push(192 | n >> 6, 128 | 63 & n) : 55296 > n || n >= 57344 ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++, n = 65536 + ((1023 & n) << 10 | 1023 & r.charCodeAt(e)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
            }
            return t
        }(r)
    }, t
}()),
function(r) {
    r.fn.share = function(t) {
        function e(t, e) {
            var n = function(t) {
                0 === t.mobileSites.length && t.sites.length && (t.mobileSites = t.sites);
                var e = (r(window).width() <= 768 ? t.mobileSites : t.sites.length ? t.sites : []).slice(0),
                    n = t.disabled;
                return "string" == typeof e && (e = e.split(/\s*,\s*/)), "string" == typeof n && (n = n.split(/\s*,\s*/)), /MicroMessenger/i.test(navigator.userAgent) && n.push("wechat"), n.length && r.each(n, function(t, n) {
                    var o = r.inArray(n, e); - 1 !== o && e.splice(o, 1)
                }), e
            }(e);
            "prepend" == e.mode && n.reverse(), n.length && r.each(n, function(n, o) {
                var i = function(r, t) {
                        var e = a[r];
                        for (var n in t.summary = t.description, t)
                            if (t.hasOwnProperty(n)) {
                                var o = r + n.replace(/^[a-z]/, function(r) {
                                        return r.toUpperCase()
                                    }),
                                    i = encodeURIComponent(void 0 === t[o] ? t[n] : t[o]);
                                e = e.replace(new RegExp("{{" + n.toUpperCase() + "}}", "g"), i)
                            }
                        return e
                    }(o, e),
                    f = e.initialized ? t.find(".icon-" + o) : r('<a class="social-share-icon icon-' + o + '"></a>');
                return !f.length || (f.prop("aria-label", "分享到 " + u[o]), f.prop("href", i), "wechat" === o ? f.prop("tabindex", -1) : f.prop("target", "_blank"), void(e.initialized || ("prepend" == e.mode ? t.prepend(f) : t.append(f))))
            })
        }
        var n = r(document.head),
            o = {
                url: location.href,
                site_url: location.origin,
                source: n.find("[name=site], [name=Site]").attr("content") || document.title,
                title: n.find("[name=title], [name=Title]").attr("content") || document.title,
                description: n.find("[name=description], [name=Description]").attr("content") || "",
                image: r("img:first").prop("src") || "",
                imageSelector: void 0,
                weiboKey: "",
                wechatQrcodeTitle: "微信扫一扫：分享",
                wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
                wechatQrcodeSize: 100,
                mobileSites: [],
                sites: ["weibo", "qq", "wechat", "tencent", "douban", "qzone", "linkedin", "diandian", "facebook", "twitter", "google"],
                disabled: [],
                initialized: !1
            },
            i = r.extend({}, o, t),
            a = {
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}",
                qq: "http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}",
                tencent: "http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}",
                weibo: "http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",
                wechat: "javascript:;",
                douban: "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
                diandian: "http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link",
                linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
                facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}",
                twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}",
                google: "https://plus.google.com/share?url={{URL}}"
            },
            u = {
                qzone: "QQ空间",
                qq: "QQ",
                tencent: "腾讯微博",
                weibo: "微博",
                wechat: "微信",
                douban: "豆瓣",
                diandian: "点点",
                linkedin: "LinkedIn",
                facebook: "Facebook",
                twitter: "Twitter",
                google: "Google"
            };
        this.each(function() {
            if (r(this).data("initialized")) return !0;
            var t = r.extend({}, i, r(this).data());
            t.imageSelector && (t.image = r(t.imageSelector).map(function() {
                return r(this).prop("src")
            }).get().join("||"));
            var n, o, a = r(this).addClass("share-component social-share");
            e(a, t), n = t, (o = a.find("a.icon-wechat")).length && (o.append('<div class="wechat-qrcode"><h4>' + n.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + n.wechatQrcodeHelper + "</div></div>"), o.find(".qrcode").qrcode({
                render: "image",
                size: n.wechatQrcodeSize,
                text: n.url
            }), o.offset().top < 100 && o.find(".wechat-qrcode").addClass("bottom")), r(this).data("initialized", !0)
        })
    }, r(function() {
        r(".share-component,.social-share").share()
    })
}(jQuery), $("#share").share($configShareSocial);