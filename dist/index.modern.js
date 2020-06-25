import React__default, { forwardRef, createElement, useState, useCallback, useMemo } from 'react';
import { withReact, Slate, Editable, useSlate } from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { times, random, isEmpty, keys } from 'lodash';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

var styles = {"test":"_3ybTi"};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

var isHotkey = unwrapExports(lib);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

function isValidProp(key) {
    return index(key);
}
function filterSVGProps(props) {
    return Object.keys(props).reduce((p, k) => {
        if (isValidProp(k)) {
            p[k] = props[k];
        }
        return p;
    }, {});
}
const StyledIconBaseBase = forwardRef((props, ref) => {
    const { children, iconAttrs, iconVerticalAlign, iconViewBox, size, title } = props, otherProps = __rest(props, ["children", "iconAttrs", "iconVerticalAlign", "iconViewBox", "size", "title"]);
    const iconProps = Object.assign({ viewBox: iconViewBox, height: props.height !== undefined ? props.height : size, width: props.width !== undefined ? props.width : size, 'aria-hidden': title == null ? 'true' : undefined, focusable: 'false', role: title != null ? 'img' : undefined }, iconAttrs);
    const svgProps = filterSVGProps(otherProps);
    return (createElement("svg", Object.assign({}, iconProps, svgProps, { ref: ref }),
        title && createElement("title", { key: "icon-title" }, title),
        children));
});
const StyledIconBase = styled(StyledIconBaseBase) `
  display: inline-block;
  vertical-align: ${props => props.iconVerticalAlign};
  overflow: hidden;
`;

var Bold = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M62.73 49.109c5.347-1.103 9.76-5.94 9.76-12.985 0-7.553-5.517-14.428-16.295-14.428H29.011a2.604 2.604 0 00-2.604 2.604v51.399a2.604 2.604 0 002.604 2.604h28.118c10.863 0 16.464-6.79 16.464-15.361.001-7.043-4.752-12.9-10.863-13.833zM38.458 32.305h15.107c4.074 0 6.62 2.461 6.62 5.94 0 3.649-2.546 5.941-6.62 5.941H38.458V32.305zm15.615 35.39H38.458v-12.9h15.616c4.668 0 7.214 2.886 7.214 6.45 0 4.074-2.716 6.45-7.215 6.45z", key: "k0" })));
});
Bold.displayName = 'Bold';

var Italic = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M60.571 24.301a2.604 2.604 0 00-2.604-2.604h-4.594a2.598 2.598 0 00-2.59 2.463l-.014-.001-11.276 50.978-.015.066-.011.048h.006a2.55 2.55 0 00-.045.449 2.595 2.595 0 002.406 2.584v.02h4.792a2.595 2.595 0 002.577-2.336l.013.001 11.257-50.972-.008-.001a2.58 2.58 0 00.106-.695z", key: "k0" })));
});
Italic.displayName = 'Italic';

var ListBullet = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M88.721 20.13H26.258a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407v-3.143a3.407 3.407 0 00-3.407-3.407zm0 24.892H26.258a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407v-3.143a3.407 3.407 0 00-3.407-3.407zm0 24.891H26.258a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407V73.32a3.408 3.408 0 00-3.407-3.407z", key: "k0" }),
        createElement("circle", { cx: 12.856, cy: 25.108, r: 4.984, key: "k1" }),
        createElement("circle", { cx: 12.856, cy: 49.002, r: 4.984, key: "k2" }),
        createElement("circle", { cx: 12.856, cy: 74.891, r: 4.984, key: "k3" })));
});
ListBullet.displayName = 'ListBullet';

var ListNumber = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M14.427 22.495v7.747H16.7V19.566h-1.985l-3.361 3.377 1.296 1.361zm-1.599 23.928c.88 0 1.729.448 1.729 1.393 0 1.312-1.28 2.401-5.65 5.634v1.793h8.035v-2.001h-4.354c2.77-2.017 4.274-3.601 4.274-5.426 0-2.129-1.792-3.41-4.082-3.41-1.489 0-3.073.544-4.114 1.745l1.296 1.505c.721-.753 1.649-1.233 2.866-1.233zm1.776 28.313c1.184-.208 2.337-1.088 2.337-2.433 0-1.776-1.537-2.897-4.034-2.897-1.873 0-3.217.72-4.082 1.697l1.136 1.424a3.852 3.852 0 012.721-1.104c1.104 0 1.985.416 1.985 1.264 0 .785-.8 1.137-1.985 1.137-.4 0-1.137 0-1.329-.016v2.049c.16-.016.88-.032 1.329-.032 1.489 0 2.145.384 2.145 1.233 0 .8-.721 1.36-2.017 1.36-1.041 0-2.209-.448-2.929-1.216l-1.2 1.521c.784.96 2.257 1.712 4.209 1.712 2.561 0 4.21-1.296 4.21-3.137.002-1.602-1.407-2.45-2.496-2.562zm73.322-54.847H25.462a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407v-3.143a3.406 3.406 0 00-3.406-3.407zm0 24.892H25.462a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407v-3.143a3.406 3.406 0 00-3.406-3.407zm0 24.892H25.462a3.407 3.407 0 00-3.407 3.407v3.143a3.407 3.407 0 003.407 3.407h62.463a3.407 3.407 0 003.407-3.407V73.08a3.406 3.406 0 00-3.406-3.407z", key: "k0" })));
});
ListNumber.displayName = 'ListNumber';

var Quote = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M17.572 43.713c-.809 0-1.617.101-2.02.303.899-3.602 4.307-7.642 7.513-9.387.007-.003.012-.008.018-.011.024-.013.048-.031.071-.044l-.003-.002c.355-.19.605-.552.605-.983a1.11 1.11 0 00-.505-.916l.025-.024-4.196-2.65-.013.011a1.101 1.101 0 00-.668-.242c-.184 0-.35.054-.504.132l-.021-.019c-6.26 4.442-10.401 11.206-10.401 18.78 0 6.562 4.241 10.297 8.985 10.297 4.342 0 7.978-3.634 7.978-7.977.001-4.34-3.027-7.268-6.864-7.268zm20.547 0c-.809 0-1.617.101-2.02.303.899-3.602 4.307-7.642 7.513-9.387.007-.003.012-.008.018-.011.024-.013.048-.031.071-.044l-.003-.002c.355-.19.605-.552.605-.983a1.11 1.11 0 00-.505-.916l.025-.024-4.196-2.65-.013.011a1.101 1.101 0 00-.668-.242c-.184 0-.35.054-.504.132l-.021-.019c-6.26 4.442-10.401 11.206-10.401 18.78 0 6.562 4.241 10.297 8.985 10.297 4.342 0 7.978-3.634 7.978-7.977.001-4.34-3.027-7.268-6.864-7.268zm24.875-2.672c-4.342 0-7.978 3.634-7.978 7.977 0 4.341 3.028 7.269 6.865 7.269.809 0 1.617-.101 2.02-.303-.899 3.602-4.307 7.642-7.513 9.387-.007.003-.012.008-.018.011-.024.013-.048.031-.071.044l.003.002c-.355.19-.605.552-.605.983 0 .388.208.713.505.916l-.025.024 4.196 2.65.013-.011c.189.143.413.242.668.242.184 0 .35-.054.504-.132l.021.019c6.26-4.443 10.401-11.206 10.401-18.78-.001-6.563-4.242-10.298-8.986-10.298zm20.547 0c-4.342 0-7.978 3.634-7.978 7.977 0 4.341 3.028 7.269 6.865 7.269.809 0 1.617-.101 2.02-.303-.899 3.602-4.307 7.642-7.513 9.387-.007.003-.012.008-.018.011-.024.013-.048.031-.071.044l.003.002c-.355.19-.605.552-.605.983 0 .388.208.713.505.916l-.025.024 4.196 2.65.013-.011c.189.143.413.242.668.242.184 0 .35-.054.504-.132l.021.019c6.26-4.443 10.401-11.206 10.401-18.78-.001-6.563-4.242-10.298-8.986-10.298z", key: "k0" })));
});
Quote.displayName = 'Quote';

var Underline = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 100 100" }, props, { ref: ref }),
        createElement("path", { d: "M77.5 75.545c-.036 0-.068.009-.103.01v-.01h-55v.01c-1.608.056-2.897 1.368-2.897 2.99s1.288 2.934 2.897 2.99v.01h55v-.01c.035.001.068.01.103.01a3 3 0 000-6zM50 72.12c15.829 0 23.581-9.057 23.581-22.521V21.383a2.928 2.928 0 00-2.929-2.928h-3.864a2.928 2.928 0 00-2.929 2.928c0 .04.01.076.012.116v27.856c0 8.649-4.814 14.28-13.871 14.28s-13.871-5.631-13.871-14.28V21.49c.001-.036.011-.071.011-.107a2.928 2.928 0 00-2.928-2.928h-3.865a2.929 2.929 0 00-2.929 2.928v28.216c0 13.464 7.834 22.521 23.582 22.521z", key: "k0" })));
});
Underline.displayName = 'Underline';

var Heading = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 24 24" }, props, { ref: ref }),
        createElement("path", { d: "M18 20V4h-3v6H9V4H6v16h3v-7h6v7z", key: "k0" })));
});
Heading.displayName = 'Heading';

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  position: sticky;\n  padding: 1px 18px 17px;\n  margin: 0 -20px;\n  border-bottom: 2px solid #eee;\n  margin-bottom: 20px;\n\n  & > * {\n    display: inline-block;\n  }\n\n  & > * + * {\n    margin-left: 15px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 18px;\n  vertical-align: text-bottom;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  cursor: pointer;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Button = styled.a(_templateObject(), function (_ref) {
  var reversed = _ref.reversed,
      active = _ref.active;
  return reversed ? active ? 'white' : '#aaa' : active ? 'black' : '#ccc';
});
var Icon = styled.span(_templateObject2());
var Toolbar = styled.div(_templateObject3());

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  font-weight: 600;\n  font-size: 30px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var variants = {
  visible: {
    scaleX: [1, 2, 1],
    transition: {
      ease: 'easeInOut',
      duration: 0.7,
      type: 'inertia',
      velocity: 50
    }
  },
  hidden: {
    opacity: 1
  }
};

var Chuck = function Chuck(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(Word, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: variants,
    initial: {
      scaleX: 1
    }
  }, children);
};

var Word = styled(motion.span)(_templateObject$1());
Chuck.displayName = 'Chuck';

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  font-weight: 600;\n  font-size: 30px;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var variants$1 = {
  visible: {
    scale: 1,
    'text-shadow': ['-1px 10px 1px #B5B5B5', '0px 0px 0px #B5B5B5'],
    transition: {
      duration: 0.7,
      type: 'spring',
      damping: 10
    }
  },
  hidden: {
    opacity: 1
  }
};

var Dung = function Dung(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(Word$1, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: variants$1,
    initial: {
      scale: 2
    }
  }, children);
};

var Word$1 = styled(motion.span)(_templateObject$2());
Dung.displayName = 'Dung';

var variants$2 = {
  visible: {
    opacity: [1, 0, 1],
    'font-weight': ['400', '600', '400'],
    position: 'relative',
    top: ['0px', '-20px', '0px'],
    transition: {
      duration: 2,
      ease: 'backInOut',
      loop: Infinity,
      repeatDelay: 5
    }
  },
  hidden: {
    opacity: 1
  }
};

var Fade = function Fade(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(motion.span, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: variants$2
  }, children);
};

Fade.displayName = 'Fade';

var container = {
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  },
  hidden: {}
};
var items = {
  visible: {
    transition: {
      repeatDelay: 10,
      loop: Infinity
    },
    color: ['rgb(0, 0, 0)', 'rgb(255,127,80)', 'rgb(0,0,0)'],
    'font-weight': ['400', '600', '400'],
    position: 'relative',
    top: ['0px', '-5px', '0px']
  },
  hidden: {
    color: 'rgb(220, 220, 220)'
  }
};

var Gradient = function Gradient(_ref) {
  var children = _ref.children,
      vairant = _ref.vairant;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  var letters = [].concat(children).map(function (l, i) {
    return /*#__PURE__*/React__default.createElement(motion.span, {
      key: i,
      variants: items
    }, l);
  });
  var currentVariant = vairant || (inView ? 'visible' : 'hidden');
  return /*#__PURE__*/React__default.createElement("span", {
    "data-slate-string": "true"
  }, /*#__PURE__*/React__default.createElement(motion.span, {
    ref: ref,
    animate: currentVariant,
    variants: container
  }, letters));
};

Gradient.displayName = 'Gradient';

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n  position: relative;\n  font-weight: 600;\n  font-size: 30px;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var variants$3 = {
  visible: {
    opacity: [0, 1],
    top: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.1,
      type: 'spring',
      damping: 12,
      mass: 1,
      stiffness: 350
    }
  },
  hidden: {
    opacity: 1
  }
};

var Kung = function Kung(_ref) {
  var _ref$meta = _ref.meta,
      meta = _ref$meta === void 0 ? {} : _ref$meta,
      selectVariant = _ref.selectVariant,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement(Word$2, {
    animate: selectVariant && selectVariant(meta),
    variants: variants$3,
    initial: {
      top: '-50%'
    }
  }, children);
};

var Word$2 = styled(motion.span)(_templateObject$3());
Kung.displayName = 'Kung';

var Heart = forwardRef(function (props, ref) {
    var attrs = {
        "fill": "currentColor",
        "xmlns": "http://www.w3.org/2000/svg",
    };
    return (createElement(StyledIconBase, __assign({ iconAttrs: attrs, iconVerticalAlign: "middle", iconViewBox: "0 0 24 24" }, props, { ref: ref }),
        createElement("path", { d: "M20.205 4.791a5.938 5.938 0 00-4.209-1.754A5.906 5.906 0 0012 4.595a5.904 5.904 0 00-3.996-1.558 5.942 5.942 0 00-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z", key: "k0" })));
});
Heart.displayName = 'Heart';

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["\n  color: 'red';\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var container$1 = {
  visible: {
    transition: {}
  },
  hidden: {}
};
var items$1 = {
  visible: function visible(i) {
    return {
      transition: {
        repeatDelay: 1,
        loop: Infinity,
        ease: 'easeIn'
      },
      opacity: [0, 1, 0],
      position: 'relative',
      color: '#ef476f',
      top: ["-" + random(10, 0) + "px", random(5, -20) + "px"]
    };
  },
  hidden: {}
};

var Love = function Love(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  var currentVariant = inView ? 'visible' : 'hidden';
  var hearts = times(5, function (l, i) {
    return /*#__PURE__*/React__default.createElement(motion.span, {
      key: i,
      variants: items$1,
      custom: i
    }, /*#__PURE__*/React__default.createElement(Icon$1, {
      width: 10
    }));
  });
  return /*#__PURE__*/React__default.createElement("span", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React__default.createElement(motion.span, {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      textAlign: 'center'
    },
    ref: ref,
    animate: currentVariant,
    variants: container$1
  }, hearts), children);
};

Love.displayName = 'Love';
var Icon$1 = styled(Heart)(_templateObject$4());

var container$2 = {
  visible: {
    opacity: 1,
    fontSize: ['0px', '55px'],
    transition: {
      ease: 'backInOut',
      duration: 1,
      loop: Infinity,
      delay: 2
    }
  },
  hidden: {
    opacity: 0
  }
};

var Ready = function Ready(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(motion.span, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: container$2
  }, children);
};

Ready.displayName = 'Ready';

var variants$4 = {
  visible: {
    transform: 'rotate(45deg)',
    transition: {
      type: 'spring',
      damping: 0.5,
      duration: 2
    }
  },
  hidden: {}
};

var Shake = function Shake(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(motion.span, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: variants$4
  }, children);
};

Shake.displayName = 'Shake';

var container$3 = {
  visible: {
    'background-image': ['linear-gradient(to right, #30CFD0 0%, #330867 100%)', 'linear-gradient(to right, #330867 0%, #30CFD0 100%)', 'linear-gradient(to right, #30CFD0 0%, #330867 100%)'],
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    transition: {
      loop: Infinity,
      repeatDelay: 0.1
    }
  },
  hidden: {}
};

var Shine = function Shine(_ref) {
  var children = _ref.children;

  var _useInView = useInView(),
      ref = _useInView[0],
      inView = _useInView[1];

  return /*#__PURE__*/React__default.createElement(motion.span, {
    ref: ref,
    animate: inView ? 'visible' : 'hidden',
    variants: container$3,
    style: {}
  }, children);
};

Shine.displayName = 'Shine';

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  font-weight: 600;\n  font-size: 30px;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}

var Word$3 = styled(motion.span)(_templateObject$5());

var HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};
var LIST_TYPES = ['numbered-list', 'bulleted-list'];

var AnimatedTextEditor = function AnimatedTextEditor(_ref) {
  var getMarkMeta = _ref.getMarkMeta,
      selectVariant = _ref.selectVariant,
      initialValue = _ref.initialValue;

  var _useState = useState(initialValue),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState({});

  var _useState3 = useState({}),
      selectedString = _useState3[0],
      setSelectedString = _useState3[1];

  var renderElement = useCallback(function (props) {
    return /*#__PURE__*/React__default.createElement(Element, props);
  }, []);
  var renderLeaf = useCallback(function (props) {
    return /*#__PURE__*/React__default.createElement(Leaf, _extends({}, props, {
      selectVariant: selectVariant
    }));
  }, [selectVariant]);
  var editor = useMemo(function () {
    return withHistory(withReact(createEditor()));
  }, []);
  return /*#__PURE__*/React__default.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, /*#__PURE__*/React__default.createElement(Toolbar, null, /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "bold"
  }, /*#__PURE__*/React__default.createElement(Bold, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "italic"
  }, /*#__PURE__*/React__default.createElement(Italic, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "underline"
  }, /*#__PURE__*/React__default.createElement(Underline, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(BlockButton, {
    format: "heading-one"
  }, /*#__PURE__*/React__default.createElement(Heading, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(BlockButton, {
    format: "heading-two"
  }, /*#__PURE__*/React__default.createElement(Heading, {
    size: "38"
  })), /*#__PURE__*/React__default.createElement(BlockButton, {
    format: "block-quote"
  }, /*#__PURE__*/React__default.createElement(Quote, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(BlockButton, {
    format: "numbered-list"
  }, /*#__PURE__*/React__default.createElement(ListNumber, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(BlockButton, {
    format: "bulleted-list"
  }, /*#__PURE__*/React__default.createElement(ListBullet, {
    size: "48"
  })), /*#__PURE__*/React__default.createElement(MarkButton, {
    getMarkMeta: getMarkMeta,
    format: "kung"
  }, /*#__PURE__*/React__default.createElement(Kung, null, "Kung")), /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "fade"
  }, /*#__PURE__*/React__default.createElement(Fade, null, "Fade")), /*#__PURE__*/React__default.createElement(ActiveMark, {
    selectedString: selectedString,
    setSelectedString: setSelectedString
  })), /*#__PURE__*/React__default.createElement(Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    placeholder: "Enter some rich text\u2026",
    spellCheck: true,
    onKeyDown: function onKeyDown(event) {
      for (var hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          var mark = HOTKEYS[hotkey];
          toggleMark(editor, mark);
        }
      }
    },
    onSelectCapture: function onSelectCapture() {
      setSelectedString({
        selection: editor.selection,
        marks: Editor.marks(editor)
      });
    }
  }));
};

var toggleBlock = function toggleBlock(editor, format) {
  var isActive = isBlockActive(editor, format);
  var isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: function match(n) {
      return LIST_TYPES.includes(n.type);
    },
    split: true
  });
  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    var block = {
      type: format,
      children: []
    };
    Transforms.wrapNodes(editor, block);
  }
};

var toggleMark = function toggleMark(editor, format, meta) {
  var isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, meta);
  }
};

var isBlockActive = function isBlockActive(editor, format) {
  var _Editor$nodes = Editor.nodes(editor, {
    match: function match(n) {
      return n.type === format;
    }
  }),
      match = _Editor$nodes[0];

  return !!match;
};

var isMarkActive = function isMarkActive(editor, format) {
  var marks = Editor.marks(editor);
  return marks ? marks[format] === {} : false;
};

var ActiveMark = function ActiveMark(_ref2) {
  var selectedString = _ref2.selectedString;
  var editor = useSlate();
  var selection = selectedString.selection;
  if (isEmpty(selection)) return null;

  var _Editor$fragment = Editor.fragment(editor, selection),
      children = _Editor$fragment[0].children;

  if (isEmpty(children)) return null;

  var _children$ = children[0],
      marks = _objectWithoutPropertiesLoose(_children$, ["text"]);

  console.log(marks);
  return null;
};

var Element = function Element(_ref3) {
  var attributes = _ref3.attributes,
      children = _ref3.children,
      element = _ref3.element;

  switch (element.type) {
    case 'block-quote':
      return /*#__PURE__*/React__default.createElement("blockquote", attributes, children);

    case 'bulleted-list':
      return /*#__PURE__*/React__default.createElement("ul", attributes, children);

    case 'heading-one':
      return /*#__PURE__*/React__default.createElement("h1", attributes, children);

    case 'heading-two':
      return /*#__PURE__*/React__default.createElement("h2", attributes, children);

    case 'list-item':
      return /*#__PURE__*/React__default.createElement("li", attributes, children);

    case 'numbered-list':
      return /*#__PURE__*/React__default.createElement("ol", attributes, children);

    default:
      return /*#__PURE__*/React__default.createElement("p", attributes, children);
  }
};

var Leaf = function Leaf(_ref4) {
  var attributes = _ref4.attributes,
      children = _ref4.children,
      leaf = _ref4.leaf,
      selectVariant = _ref4.selectVariant;
  [Fade, Ready, Shake, Gradient, Love, Shine, Kung, Chuck, Dung].forEach(function (Tag) {
    if (keys(leaf).includes(Tag.displayName.toLowerCase())) {
      children = /*#__PURE__*/React__default.createElement(Tag, {
        selectVariant: selectVariant,
        meta: leaf[Tag.displayName.toLowerCase()]
      }, children);
    }
  });

  if (leaf.bold) {
    children = /*#__PURE__*/React__default.createElement("b", null, children);
  }

  if (leaf.code) {
    children = /*#__PURE__*/React__default.createElement("code", null, children);
  }

  if (leaf.italic) {
    children = /*#__PURE__*/React__default.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = /*#__PURE__*/React__default.createElement("u", null, children);
  }

  return /*#__PURE__*/React__default.createElement("span", attributes, children);
};

var BlockButton = function BlockButton(_ref5) {
  var format = _ref5.format,
      children = _ref5.children;
  var editor = useSlate();
  return /*#__PURE__*/React__default.createElement(Button, {
    active: isBlockActive(editor, format),
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, null, children));
};

var MarkButton = function MarkButton(_ref6) {
  var format = _ref6.format,
      children = _ref6.children,
      onMouseEnter = _ref6.onMouseEnter,
      onMouseLeave = _ref6.onMouseLeave,
      _ref6$getMarkMeta = _ref6.getMarkMeta,
      getMarkMeta = _ref6$getMarkMeta === void 0 ? function () {
    return {};
  } : _ref6$getMarkMeta;
  var editor = useSlate();
  return /*#__PURE__*/React__default.createElement(Button, {
    active: isMarkActive(editor, format),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleMark(editor, format, getMarkMeta());
    }
  }, /*#__PURE__*/React__default.createElement(Icon, null, children));
};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.test
  }, "Example Cowhat mponent: ", text);
};

export { AnimatedTextEditor, ExampleComponent };
//# sourceMappingURL=index.modern.js.map
