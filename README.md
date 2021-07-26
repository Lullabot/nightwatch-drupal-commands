# nightwatch-drupal-commands

Provides helper commands and insertions for use with Drupal.

Assumes you have drush available in `./vendor/bin/drush`

## Required Globals

Globals are set within your
[Nightwatch configuration](https://nightwatchjs.org/gettingstarted/concepts/#using-test-globals).

### `drupalUrl`
The base URL of your Drupal installation. If you're running tests inside a
container then it may be e.g. `http://web`. This should not have a trailing
slash.

## Optional Globals

### `drushCommand`
The command used to run drush e.g. `./vendor/bin/drush` or `ddev drush`. Defaults
to `./vendor/bin/drush`.

## Commands

`.drupalUrl(url)`
Goes to a URL in your Drupal install
e.g. `.drupalUrl('/user/login`)`
