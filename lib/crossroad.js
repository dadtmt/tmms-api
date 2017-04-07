'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChoiceInteractive = exports.isStepMade = exports.latestStep = exports.isActive = exports.isChoiceMade = exports.deleteChoiceEdge = exports.addChoiceEdge = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addChoiceEdge = exports.addChoiceEdge = function addChoiceEdge(edge) {
  return _ramda2.default.over(_ramda2.default.lensPath(['node', 'choices', 'edges']), _ramda2.default.append(edge));
};

var deleteChoiceEdge = exports.deleteChoiceEdge = function deleteChoiceEdge(edge) {
  return _ramda2.default.over(_ramda2.default.lensPath(['node', 'choices', 'edges']), _ramda2.default.filter(function (_ref) {
    var node = _ref.node;
    return node.id !== edge.id;
  }));
};

var isChoiceMade = exports.isChoiceMade = _ramda2.default.pipe(_ramda2.default.pathOr([], ['choices', 'edges']), _ramda2.default.map(_ramda2.default.path(['node', 'made'])), _ramda2.default.reduce(_ramda2.default.or, false));

var isActive = exports.isActive = _ramda2.default.converge(_ramda2.default.and, [_ramda2.default.propOr(false, 'isReady'), _ramda2.default.complement(isChoiceMade)]);

var latestStep = exports.latestStep = _ramda2.default.pipe(_ramda2.default.pathOr([], ['choices', 'edges']), _ramda2.default.map(_ramda2.default.path(['node', 'step'])), _ramda2.default.sort(function (a, b) {
  return b - a;
}), _ramda2.default.head);

var isStepMade = exports.isStepMade = function isStepMade(step) {
  return _ramda2.default.pipe(_ramda2.default.pathOr([], ['choices', 'edges']), _ramda2.default.filter(_ramda2.default.pipe(_ramda2.default.path(['node', 'step']), _ramda2.default.equals(step))), _ramda2.default.map(_ramda2.default.path(['node', 'made'])), _ramda2.default.reduce(_ramda2.default.or, false));
};

var isChoiceInteractive = exports.isChoiceInteractive = function isChoiceInteractive(choice) {
  return _ramda2.default.pipe(latestStep, _ramda2.default.equals(_ramda2.default.prop('step', choice)), _ramda2.default.and(_ramda2.default.prop('interactive', choice)));
};