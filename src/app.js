const loader = require('./loader');

function login() {
  $('#login-message').text('fazendo login');

  loader.loadGapi().then((gapi) => {
    gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
      $.post('/auth/google', {
        token: googleUser.getAuthResponse().id_token,
        origin: 'website',
      }).then(() => {
        gapi.load('auth2', () => {
          gapi.auth2.init({ client_id: clientId });

          $('#login-message').text('Você está logado!').show();

          redirectWithTimeout('/admin/welcome', 2000);
        });
      }, () => {
        $('#login-message').text('Não foi possível fazer login pelo Google');
      });
    });
  });
}

module.exports = {
  login,
}