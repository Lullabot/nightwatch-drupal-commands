# nightwatch-drupal-commands

Provides helper commands and insertions for use with Drupal.

Assumes you have drush available in `./vendor/bin/drush`

## Environment Variables

|Name|Description|
|---|---|
|`NIGHTWATCH_DRUPAL_URL`|The base URL of your Drupal installation. If you're running tests inside a container then it may be e.g. `http://web`|

## Commands

`.drupalUrl(url)`
Goes to a URL in your Drupal install
e.g. `.drupalUrl('/user/login`)`
