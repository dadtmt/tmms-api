'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChoice = exports.isInteractive = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInteractive = exports.isInteractive = _ramda2.default.cond([[_ramda2.default.propEq('type', 'dice'), _ramda2.default.pipe(_ramda2.default.path(['content', 'master']), _ramda2.default.not)], [_ramda2.default.propEq('type', 'characterSheet'), _ramda2.default.F], [_ramda2.default.T, _ramda2.default.T]]);

var newChoice = exports.newChoice = function newChoice(values) {
  return _extends({}, values, {
    interactive: isInteractive(values),
    made: false
  });
};