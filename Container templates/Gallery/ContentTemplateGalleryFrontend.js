'use strict';

var _templateObject = _taggedTemplateLiteral(['\n          <li>\n              <a data-size="', 'x', '" href="', '">\n                  <figure>\n                      <img alt="', '" src="', '?a=', ':v2"/>\n                      <figcaption>', '</figcaption>\n                  </figure>\n              </a>\n          </li>'], ['\n          <li>\n              <a data-size="', 'x', '" href="', '">\n                  <figure>\n                      <img alt="', '" src="', '?a=', ':v2"/>\n                      <figcaption>', '</figcaption>\n                  </figure>\n              </a>\n          </li>']),
    _templateObject2 = _taggedTemplateLiteral(['<div class="galleryWidget"><ul class="image-gallery">', '</ul></div>'], ['<div class="galleryWidget"><ul class="image-gallery">', '</ul></div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

;(function () {

    if (typeof window.sq === 'undefined') {
        window.sq = {};
    }

    function html(literals) {
        for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            substs[_key - 1] = arguments[_key];
        }

        return literals.raw.reduce(function (acc, lit, i) {
            var subst = substs[i - 1];
            if (Array.isArray(subst)) {
                subst = subst.join('');
            }
            return acc + subst + lit;
        });
    }

    function li(item) {
        return html(_templateObject, item.width, item.height, item.image, item.title, item.image, item.id, item.caption);
    }

    function ul(items) {
        return html(_templateObject2, items.map(li));
    }

    function galleryFrontend(document, selector, items) {
        document.getElementById(selector).innerHTML = ul(items);

        // debugger;
        // document.getElementById(selector).style.height = "";
    }

    if (typeof window.sq.galleryFrontend === 'undefined') {
        window.sq.galleryFrontend = galleryFrontend;
    }
})(window);
