function redirectWithTimeout(url, timeoutInMilliseconds) {
  setTimeout(() => window.location.replace(url), timeoutInMilliseconds);
}

module.exports = {
  redirectWithTimeout,
}
