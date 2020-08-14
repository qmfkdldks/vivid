function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slateReact = require('slate-react');
var slate = require('slate');
var slateHistory = require('slate-history');
var styled = _interopDefault(require('styled-components'));

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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

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

var HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};

var RichTextExample = function RichTextExample() {
  var _useState = React.useState(initialValue),
      value = _useState[0],
      setValue = _useState[1];

  var renderElement = React.useCallback(function (props) {
    return /*#__PURE__*/React__default.createElement(Element, props);
  }, []);
  var renderLeaf = React.useCallback(function (props) {
    return /*#__PURE__*/React__default.createElement(Leaf, props);
  }, []);
  var editor = React.useMemo(function () {
    return slateHistory.withHistory(slateReact.withReact(slate.createEditor()));
  }, []);
  return /*#__PURE__*/React__default.createElement(slateReact.Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, /*#__PURE__*/React__default.createElement(Toolbar, null, /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "bold"
  }, "Bold"), /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "italic"
  }, "Italic"), /*#__PURE__*/React__default.createElement(MarkButton, {
    format: "code"
  }, "Underline")), /*#__PURE__*/React__default.createElement(slateReact.Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    placeholder: "Enter some rich text\u2026",
    spellCheck: true,
    autoFocus: true,
    onKeyDown: function onKeyDown(event) {
      for (var hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          var mark = HOTKEYS[hotkey];
          toggleMark(editor, mark);
        }
      }
    }
  }));
};

var toggleMark = function toggleMark(editor, format) {
  var isActive = isMarkActive(editor, format);

  if (isActive) {
    slate.Editor.removeMark(editor, format);
  } else {
    slate.Editor.addMark(editor, format, true);
  }
};

var isMarkActive = function isMarkActive(editor, format) {
  var marks = slate.Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;

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

var Leaf = function Leaf(_ref2) {
  var attributes = _ref2.attributes,
      children = _ref2.children,
      leaf = _ref2.leaf;

  if (leaf.bold) {
    children = /*#__PURE__*/React__default.createElement("strong", null, children);
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

var MarkButton = function MarkButton(_ref4) {
  var format = _ref4.format,
      children = _ref4.children;
  var editor = slateReact.useSlate();
  return /*#__PURE__*/React__default.createElement(Button, {
    active: isMarkActive(editor, format),
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, children);
};

var initialValue = [{
  type: 'paragraph',
  children: [{
    text: 'This is editable '
  }, {
    text: 'rich',
    bold: true
  }, {
    text: ' text, '
  }, {
    text: 'much',
    italic: true
  }, {
    text: ' better than a '
  }, {
    text: '<textarea>',
    code: true
  }, {
    text: '!'
  }]
}, {
  type: 'paragraph',
  children: [{
    text: "Since it's rich text, you can do things like turn a selection of text "
  }, {
    text: 'bold',
    bold: true
  }, {
    text: ', or add a semantically rendered block quote in the middle of the page, like this:'
  }]
}, {
  type: 'block-quote',
  children: [{
    text: 'A wise quote.'
  }]
}, {
  type: 'paragraph',
  children: [{
    text: 'Try it out for yourself!'
  }]
}];

exports.Editor = RichTextExample;
//# sourceMappingURL=index.js.map
