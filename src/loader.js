function loadGapi() {
  return new Promise((resolve) => {
    const callbackName = `__${Math.random()}`.replace('.', '');
    window[callbackName] = () => {
      resolve(window.gapi);
    };

    $.getScript(`https://apis.google.com/js/platform.js?onload=${callbackName}`);
  });
}

module.exports = {
  loadGapi,
}