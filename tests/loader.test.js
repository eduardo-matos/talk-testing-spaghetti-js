const $ = require('jquery');
const { loadGapi } = require('../src/loader')
const url = require('url');
const querystring = require('querystring');

describe('Load GAPI', () => {
  beforeAll(() => {
    global.$ = $;
  });

  beforeEach(() => {
    jest.spyOn($, 'getScript');
  });

  afterEach(() => {
    $.getScript.mockClear();
  });

  it('Gets gapi script', () => {
    loadGapi();
    expect($.getScript.mock.calls[0][0]).toMatch(/https:\/\/apis\.google\.com\/js\/platform\.js\?onload=__\d+/);
  });

  it('Create a global function that executes the callback with gapi', (done) => {
    window.gapi = { foo: 'bar' };

    loadGapi().then(callback);

    const query = url.parse($.getScript.mock.calls[0][0]).query;
    const callbackName = querystring.parse(query).onload;

    window[callbackName]();

    function callback(gapi) {
      expect(gapi).toEqual(window.gapi);
      done();
    }
  });
});