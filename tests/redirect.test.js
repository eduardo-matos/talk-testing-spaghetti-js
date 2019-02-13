const { redirectWithTimeout } = require('../src/redirect');

describe('Redirect With Timeout', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
  });

  afterEach(() => {
    window.location.replace.mockClear();
  });

  it('Redirects to given url', (done) => {
    redirectWithTimeout('/spam', 1);

    setTimeout(() => {
      expect(window.location.replace).toHaveBeenCalledWith('/spam');
      done();
    }, 5);
  });

  it('Does not redirect before timeout', (done) => {
    redirectWithTimeout('/spam', 10);

    setTimeout(() => {
      expect(window.location.replace).not.toHaveBeenCalled();
      done();
    }, 5);
  });

  it('Do redirect after timeout', (done) => {
    redirectWithTimeout('/spam', 5);

    setTimeout(() => {
      expect(window.location.replace).toHaveBeenCalled();
      done();
    }, 10);
  });
});
