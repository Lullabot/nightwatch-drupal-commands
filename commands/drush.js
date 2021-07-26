const Events = require('events');
const execSync = require('child_process').execSync;

module.exports = class Drush extends Events {
  command(command, callback) {
    let procResult = '';
    const drushCommand = this.api.globals.drushCommand && this.api.globals.drushCommand.length ? this.api.globals.drushCommand : './vendor/bin/drush';

    try {
      const proc = execSync(`${drushCommand} --uri=${this.api.globals.drupalUrl} ${command}`);
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
