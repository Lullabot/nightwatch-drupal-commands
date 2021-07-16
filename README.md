# nightwatch-drupal-commands

Provides helper commands and insertions for use with Drupal.

Assumes you have drush available in `./vendor/bin/drush`

## Environment Variables

|Name|Description|Default|
|---|---|---|
|`NIGHTWATCH_DRUPAL_URL`|The base URL of your Drupal installation. If you're running tests inside a container then it may be e.g. `http://web`||
|`NIGHTWATCH_DRUSH_COMMAND`|The command used to run drush e.g. `./vendor/bin/drush` or `ddev drush`|`./vendor/bin/drush`

## Commands

`.drupalUrl(url)`
Goes to a URL in your Drupal install
e.g. `.drupalUrl('/user/login`)`
