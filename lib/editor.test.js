'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _editor = require('./editor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getCrossroadsEdges', function () {
  it('return empty edges if loading or no value', function () {
    var data = {};
    expect((0, _editor.getCrossroadsEdges)(data)).toMatchSnapshot();
  });

  it('return crossroads edges from the current (first of editors edges) editor', function () {
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      id: 'FIRST_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'SECOND_CROSSROAD_ID'
                    }
                  }]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.getCrossroadsEdges)(data)).toMatchSnapshot();
  });
});

describe('setCurrentCrossroad', function () {
  it('prepend a crossroad to crossroad edges', function () {
    var newCrossroadEdge = {
      node: {
        id: 'NEW_CROSSROAD_ID'
      }
    };
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      id: 'FIRST_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'SECOND_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'THIRD_CROSSROAD_ID'
                    }
                  }]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.setCurrentCrossroad)(data, newCrossroadEdge)).toMatchSnapshot();
  });
});

describe('getCurrentCrossroadId', function () {
  it('return null if no crossroads', function () {
    var data = {};
    expect((0, _editor.getCurrentCrossroadId)(data)).toMatchSnapshot();
  });

  it('return first crossroad id', function () {
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      id: 'CURRENT_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'SECOND_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'THIRD_CROSSROAD_ID'
                    }
                  }]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.getCurrentCrossroadId)(data)).toMatchSnapshot();
  });
});

describe('splitCrossroads', function () {
  it('return empty nodes', function () {
    var data = {};
    expect((0, _editor.splitCrossroads)(data)).toMatchSnapshot();
  });
  it('return currentCrossroad(first node) and lastCrossraods(the others)', function () {
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      id: 'CURRENT_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'SECOND_CROSSROAD_ID'
                    }
                  }, {
                    node: {
                      id: 'THIRD_CROSSROAD_ID'
                    }
                  }]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.splitCrossroads)(data)).toMatchSnapshot();
  });
});

describe('updateCrossroad', function () {
  it('apply func update to the current (first of crossroads edges) crossroad', function () {
    var update = _ramda2.default.assoc(true, 'updated');
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      id: 'CROSSROAD_ID'
                    }
                  }]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.updateCrossroad)(update)(data)).toMatchSnapshot();
  });
});

describe('updateEditor', function () {
  it('apply func update to the current (first of editors edges) editor', function () {
    var update = _ramda2.default.assoc(true, 'updated');
    var data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    };
    expect((0, _editor.updateEditor)(update)(data)).toMatchSnapshot();
  });
});