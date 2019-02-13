const $ = require('jquery');
const { login } = require('../src/app');
const loader = require('../src/loader');

describe('Login', () => {
  beforeAll(() => {
    global.$ = $;
  });

  beforeEach(() => jest.spyOn($, 'getScript'));
  afterEach(() => $.getScript.mockClear());

  beforeEach(() => jest.spyOn($, 'post'));
  afterEach(() => $.post.mockClear());

  beforeEach(() => {
    $('body').append('<div id="login-message"></div>');
  });

  afterEach(() => {
    $('body').html('');
    $('head').html('');
  });

  it('Shows login message', () => {
    login();
    expect($('#login-message').text()).toEqual('fazendo login');
  });

  it('Posts origin to back-end', (done) => {
    const googleUser = { getAuthResponse: () => ({ id_token: 'spam' }) };
    const mockedGapi = {
      auth2: { getAuthInstance: () => ({ signIn: () => Promise.resolve(googleUser) }) },
      load: () => {},
    };

    jest.spyOn(loader,'loadGapi');
    loader.loadGapi.mockResolvedValue(mockedGapi);

    $.post.mockResolvedValue();

    login();

    setImmediate(() => {
      expect($.post).toBeCalledWith('/auth/google', {
        token: 'spam',
        origin: 'website',
      });

      done();
    });
  });
});
