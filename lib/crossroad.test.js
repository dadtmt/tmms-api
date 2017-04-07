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

describe('isChoiceMade', function () {
  it('return false if no choices', function () {
    var crossroad = {
      choices: {
        edges: []
      },
      id: 'CURRENT_CROSSROAD_ID'
    };
    expect((0, _crossroad.isChoiceMade)(crossroad)).toBeFalsy();
  });
  it('return true if one choice is made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: true
          }
        }, {
          node: {
            made: false
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID'
    };
    expect((0, _crossroad.isChoiceMade)(crossroad)).toBeTruthy();
  });
  it('return false if no choice is made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: false
          }
        }, {
          node: {
            made: false
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID'
    };
    expect((0, _crossroad.isChoiceMade)(crossroad)).toBeFalsy();
  });
});

describe('isActive', function () {
  it('return true if is ready', function () {
    var crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    };
    expect((0, _crossroad.isActive)(crossroad)).toBeTruthy();
  });
  it('return false if is ready', function () {
    var crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    };
    expect((0, _crossroad.isActive)(crossroad)).toBeFalsy();
  });
  it('return false if is ready and choice made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: true
          }
        }, {
          node: {
            made: false
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    };
    expect((0, _crossroad.isActive)(crossroad)).toBeFalsy();
  });
  it('return false if not ready and choice not made', function () {
    var crossroad = {
      choices: {
        edges: [{
          node: {
            made: false
          }
        }, {
          node: {
            made: false
          }
        }]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    };
    expect((0, _crossroad.isActive)(crossroad)).toBeFalsy();
  });
});