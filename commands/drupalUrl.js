const Events = require('events');

module.exports = class DrupalUrl extends Events {
  command(url) {
    let baseUrl = this.api.globals.drupalUrl;
    // Remove starting slash.
    url = url.replace(/\/^/, '');

    this.api
      .url(`${baseUrl}/${url}`)
      .waitForElementVisible('body');

    this.emit('complete');
  }
}

