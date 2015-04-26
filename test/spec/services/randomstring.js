'use strict';

describe('Service: randomstring', function () {

  // load the service's module
  beforeEach(module('dprApp'));

  // instantiate service
  var randomstring;
  beforeEach(inject(function (_randomstring_) {
    randomstring = _randomstring_;
  }));

  it('should do something', function () {
    expect(!!randomstring).toBe(true);
  });

});
