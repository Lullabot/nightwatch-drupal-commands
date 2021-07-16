const config = {
  baseUrl: process.env.NIGHTWATCH_DRUPAL_URL,
};

const Events = require('events');

module.exports = class DrupalUrl extends Events {
  command(url) {
    let baseUrl = config.baseUrl;
    // Remove trailing slash.
    baseUrl = baseUrl.replace(/\/$/, '');
    // Remove starting slash.
    url = url.replace(/\/^/, '');

    this.api
      .url(`${baseUrl}/${url}`)
      .waitForElementVisible('body');

    this.emit('complete');
  }
}

