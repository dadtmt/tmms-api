'use strict';

var _crossroad = require('./crossroad');

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
  it('return false if is ready and choice not made', function () {
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