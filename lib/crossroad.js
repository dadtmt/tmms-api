'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isActive = exports.isChoiceMade = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isChoiceMade = exports.isChoiceMade = _ramda2.default.pipe(_ramda2.default.pathOr([], ['choices', 'edges']), _ramda2.default.map(_ramda2.default.path(['node', 'made'])), _ramda2.default.reduce(_ramda2.default.or, false));

var isActive = exports.isActive = _ramda2.default.converge(_ramda2.default.and, [_ramda2.default.propOr(false, 'isReady'), _ramda2.default.complement(isChoiceMade)]);