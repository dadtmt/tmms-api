'use strict';

var _crossroad = require('./crossroad');

describe('isStepMade', function () {
  var crossroad = {
    choices: {
      edges: [{
        node: {
          step: 1,
          made: true
        }
      }, {
        node: {
          step: 1,
          made: false
        }
      }, {
        node: {
          step: 2,
          made: false
        }
      }, {
        node: {
          step: 2,
          made: false
        }
      }]
    }
  };
  it('return true if one choice of step is made', function () {
    expect((0, _crossroad.isStepMade)(1)(crossroad)).toBeTruthy();
  });

  it('return false if no choice of step is made', function () {
    expect((0, _crossroad.isStepMade)(2)(crossroad)).toBeFalsy();
  });
});

describe('latestStep', function () {
  it('return highest step value', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            step: 1
          }
        }, {
          node: {
            step: 2
          }
        }]
      }
    };
    expect((0, _crossroad.latestStep)(crossroad)).toBe(2);
  });
});

describe('isChoiceInteractive', function () {
  var crossroad = {
    choices: {
      edges: [{
        node: {
          step: 1,
          made: true
        }
      }, {
        node: {
          step: 1,
          made: false
        }
      }, {
        node: {
          step: 2,
          made: false
        }
      }, {
        node: {
          step: 2,
          made: false
        }
      }]
    }
  };
  it('return true if no interactive choice made of same step', function () {
    var choice = {
      interactive: true,
      step: 2
    };
    expect((0, _crossroad.isChoiceInteractive)(choice)(crossroad)).toBeTruthy();
  });
  it('return false if not', function () {
    var choice = {
      interactive: true,
      step: 1
    };
    expect((0, _crossroad.isChoiceInteractive)(choice)(crossroad)).toBeFalsy();
  });
  it('return false if interactive false', function () {
    var choice = {
      interactive: false,
      step: 2
    };
    expect((0, _crossroad.isChoiceInteractive)(choice)(crossroad)).toBeFalsy();
  });
});

describe('addChoiceEdge', function () {
  it('add a choice edge', function () {
    var choiceEdge = {
      node: {
        id: 'SECOND_CHOICE'
      }
    };
    var crossroadEdge = {
      node: {
        choices: {
          edges: [{
            node: {
              id: 'FIRST_CHOICE'
            }
          }]
        },
        id: 'CURRENT_CROSSROAD_ID'
      }
    };
    expect((0, _crossroad.addChoiceEdge)(choiceEdge)(crossroadEdge)).toMatchSnapshot();
  });
});

describe('deleteChoiceEdge', function () {
  it('delete a choice edge', function () {
    var choiceToDelete = {
      id: 'SECOND_CHOICE'
    };
    var crossroadEdge = {
      node: {
        choices: {
          edges: [{
            node: {
              id: 'FIRST_CHOICE'
            }
          }, {
            node: {
              id: 'SECOND_CHOICE'
            }
          }]
        },
        id: 'CURRENT_CROSSROAD_ID'
      }
    };
    expect((0, _crossroad.deleteChoiceEdge)(choiceToDelete)(crossroadEdge)).toMatchSnapshot();
  });
});

describe('isActive', function () {
  var choice = {
    interactive: true,
    step: 1
  };
  it('return true if is ready and no choice made at this step', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: false,
            interactive: true,
            step: 1
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    };
    expect((0, _crossroad.isActive)(choice)(crossroad)).toBeTruthy();
  });
  it('return false if not ready', function () {
    var crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    };
    expect((0, _crossroad.isActive)(choice)(crossroad)).toBeFalsy();
  });
  it('return false if ready and choice of same step is made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: true,
            interactive: true,
            step: 1
          }
        }, {
          node: {
            made: false,
            interactive: true,
            step: 1
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    };
    expect((0, _crossroad.isActive)(choice)(crossroad)).toBeFalsy();
  });
  it('return false if not ready and choice not made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: false,
            interactive: true,
            step: 1
          }
        }, {
          node: {
            made: false,
            interactive: true,
            step: 1
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    };
    expect((0, _crossroad.isActive)(choice)(crossroad)).toBeFalsy();
  });
});