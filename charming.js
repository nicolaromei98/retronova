!function(e) {
    "undefined" == typeof module ? this.charming = e : module.exports = e
}(function(e, n) {
    "use strict";
    n = n || {};
    var t = n.tagName || "span",
        o = null != n.classPrefix ? n.classPrefix : "char",
        r = 1,
        a = function(e) {
            for (var n = e.parentNode, a = e.nodeValue, c = a.length, l = -1; ++l < c;) {
                var d = document.createElement(t);
                o && (d.className = o + r, r++),
                d.appendChild(document.createTextNode(a[l])),
                n.insertBefore(d, e)
            }
            n.removeChild(e)
        };
    return function c(e) {
        for (var n = [].slice.call(e.childNodes), t = n.length, o = -1; ++o < t;) c(n[o]);
        e.nodeType === Node.TEXT_NODE && a(e)
    }(e), e
});
