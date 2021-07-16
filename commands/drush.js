const Events = require('events');
const execSync = require('child_process').execSync;
const config = {
  baseUrl: process.env.NIGHTWATCH_DRUPAL_URL,
  drushCommand: process.env.NIGHTWATCH_DRUSH_COMMAND && process.env.NIGHTWATCH_DRUSH_COMMAND.length ? process.env.NIGHTWATCH_DRUSH_COMMAND : './vendor/bin/drush',
};

module.exports = class Drush extends Events {
  command(command, callback) {
    let procResult = '';

    try {
      const proc = execSync(`${config.drushCommand} --uri=${config.baseUrl} ${command}`);
      procResult = proc.toString();
    } catch (error) {
      this.api.assert.fail(error);
    }
    // Nightwatch doesn't like it when no actions are added in command file.
    this.api.pause(1);

    if (callback) {
      callback.call(this.api, procResult);
    }

    this.emit('complete');
  }
}
