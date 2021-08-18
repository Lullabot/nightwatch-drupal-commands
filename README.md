# nightwatch-drupal-commands

Provides Nightwatch commands and page objects for use with Drupal.

## Setup

Include the commands and page objects in your `nightwatch.conf.js` file:

```
let drupalCommandsPath;
let yarn2 = false;
try {
  const { resolveToUnqualified } = require('pnpapi');
  drupalCommandsPath = resolveToUnqualified('@lullabot/nightwatch-drupal-commands', __filename).replace(/\/$/, '');
  yarn2 = true;
} catch(e) {
  drupalCommandsPath = './node_modules/@lullabot/nightwatch-drupal-commands';
}

module.exports = {
  // See https://nightwatchjs.org/guide/working-with-page-objects/
  page_objects_path: [`${drupalCommandsPath}/page_objects`],

  // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
  custom_commands_path:  [`${drupalCommandsPath}/commands`],
.
.
.
```

### Globals

Globals are set within your
[Nightwatch configuration](https://nightwatchjs.org/gettingstarted/concepts/#using-test-globals).

#### `drupalUrl` (required)

The base URL of your Drupal installation. If you're running tests inside a
container then it may be e.g. `http://web`. This should not have a trailing
slash.

#### `drushCommand` (optional)

The command used to run drush e.g. `./vendor/bin/drush` or `ddev drush`. Defaults
to `./vendor/bin/drush`.

## Commands

`.drupalUrl(url)`
Goes to a URL in your Drupal install
e.g. `.drupalUrl('/user/login`)`

`drush(command)`
Runs a drush command and provides the response in a callback. This is very
useful for logging in:

```
.drush('user:login', (url) => {
  browser
    .url(url)
    .assert.titleContains('admin');
});
```

## Page Objects

### `NodeForm`

```
'Demo test' : function(browser) {
  const nodeForm = browser.page.NodeForm();
  nodeForm
    .add('page')
    .setTitle('Hello, world!')
    .setPublishedStatus(true)
    .save();
}
```

#### `add(string contentType)`

Navigates to the node/add page for a specific content type.

#### `setTitle(string value)`

Clears the existing value of the title property and sets it to `value`

#### `save()`

Saves the node, verifies that a system message is shown, and the browser is
no longer on an admin page.

#### `setPublishedStatus(bool status)`

Sets the node to either published or unpublished (when not using the Workflow
module).

#### `setWorkflowStatus(sting status)`

If Workflow is enabled, set the status to the provided value.

#### `setAutocomplete(string element, string searchText, int autocompleteId = 1)`

Given an element path to locate, or a page object element, this will set the
value to the first item retrieved by the search text.

The autocomplete ID can optionally be provided to distinguish which element to
target if multiple autocompletes are on the same page. To find this you will
need to check the source HTML of the page to determine which autocomplete widget
corresponds to which field. It can be found near the bottom and looks like this:

```
<ul id="ui-id-1" tabindex="0" class="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front" style="display: none;"></ul>
```
