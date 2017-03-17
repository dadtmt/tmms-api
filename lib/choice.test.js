'use strict';

var _choice = require('./choice');

describe('isInteractive', function () {
  it('return true by default', function () {
    var values = {};
    expect((0, _choice.isInteractive)(values)).toBeTruthy();
  });
  it('return false if type is dice and master true', function () {
    var values = {
      content: {
        master: true
      },
      type: 'dice'
    };
    expect((0, _choice.isInteractive)(values)).toBeFalsy();
  });
  it('return true if type is dice and master false', function () {
    var values = {
      content: {
        master: false
      },
      type: 'dice'
    };
    expect((0, _choice.isInteractive)(values)).toBeTruthy();
  });
  it('return false if type is characterSheet', function () {
    var values = {
      type: 'characterSheet'
    };
    expect((0, _choice.isInteractive)(values)).toBeFalsy();
  });
});

describe('newChoice', function () {
  it('copy values and add interactive and made choice', function () {
    var values = {
      some: 'values'
    };
    expect((0, _choice.newChoice)(values)).toMatchSnapshot();
  });
  it('copy values and add interactive false for characterSheet type', function () {
    var values = {
      some: 'values',
      type: 'characterSheet'
    };
    expect((0, _choice.newChoice)(values)).toMatchSnapshot();
  });
  it('copy values and add interactive false for dice type and content.master true', function () {
    var values = {
      content: {
        master: true
      },
      some: 'values',
      type: 'dice'
    };
    expect((0, _choice.newChoice)(values)).toMatchSnapshot();
  });
});