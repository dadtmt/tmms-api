'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editor = exports.crossroad = exports.choice = undefined;

var _choice = require('./choice');

var choice = _interopRequireWildcard(_choice);

var _crossroad = require('./crossroad');

var crossroad = _interopRequireWildcard(_crossroad);

var _editor = require('./editor');

var editor = _interopRequireWildcard(_editor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.choice = choice;
exports.crossroad = crossroad;
exports.editor = editor;