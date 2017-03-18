'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCrossroad = exports.updateEditor = exports.getCurrentCrossroadId = exports.splitCrossroads = exports.setCurrentCrossroad = exports.getCrossroadsEdges = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCrossroadsEdges = exports.getCrossroadsEdges = _ramda2.default.pipe(_ramda2.default.pathOr([], ['viewer', 'user', 'editors', 'edges']), _ramda2.default.head, _ramda2.default.pathOr({ edges: [] }, ['node', 'crossroads']));

var setCurrentCrossroad = exports.setCurrentCrossroad = function setCurrentCrossroad(data, edge) {
  return _ramda2.default.pipe(updateEditor(_ramda2.default.over(_ramda2.default.lensPath(['node', 'crossroads', 'edges']), _ramda2.default.prepend(edge))))(data);
};

var splitCrossroads = exports.splitCrossroads = _ramda2.default.pipe(getCrossroadsEdges, _ramda2.default.prop('edges'), _ramda2.default.applySpec({
  current: _ramda2.default.pipe(_ramda2.default.head, _ramda2.default.propOr(null, 'node')),
  lasts: _ramda2.default.tail
}));

var getCurrentCrossroadId = exports.getCurrentCrossroadId = _ramda2.default.pipe(splitCrossroads, _ramda2.default.prop('current'), _ramda2.default.propOr(null, 'id'));

var updateEditor = exports.updateEditor = function updateEditor(update) {
  return _ramda2.default.over(_ramda2.default.lensPath(['viewer', 'user', 'editors', 'edges']), _ramda2.default.over(_ramda2.default.lensIndex(0), update));
};

var updateCrossroad = exports.updateCrossroad = function updateCrossroad(update) {
  return updateEditor(_ramda2.default.over(_ramda2.default.lensPath(['node', 'crossroads', 'edges']), _ramda2.default.over(_ramda2.default.lensIndex(0), update)));
};