module.exports = {
  commands: {
    add(contentType) {
      this.drupalUrl(`/node/add/${contentType}`);
      return this;
    },
    setTitle(value) {
      this.waitForElementVisible("@title")
        .clearValue("@title")
        .setValue("@title", value);
      return this;
    },
    save() {
      this.waitForElementVisible("@save")
        .click("@save")
        .waitForElementVisible("@messages");
      this.api.execute(
        function () {
          return drupalSettings.path.currentPathIsAdmin;
        },
        [],
        function (result) {
          this.assert.strictEqual(
            result.value,
            false,
            "Current path is not an admin page"
          );
        }
      );
      return this;
    },
    setPublishedStatus(status = true) {
      this.waitForElementVisible("@publishedStatus").getAttribute(
        "@publishedStatus",
        "checked",
        (result) => {
          if (
            (result.value === "true" && !status) ||
            (result.value !== "true" && status)
          ) {
            this.click("@publishedStatus");
          }
        }
      );
      return this;
    },
    setWorkflowStatus(option) {
      this.setValue("@workflowStatus", option);
      return this;
    },
    setAutocomplete(element, searchText, autocompleteId = 1) {
      this.setValue(element, searchText)
        .waitForElementPresent(".is-autocompleting")
        .waitForElementNotPresent(".is-autocompleting")
        .waitForElementVisible(`#ui-id-${autocompleteId} li a:first-child`)
        .click(`#ui-id-${autocompleteId} li a:first-child`)
        .pause(500);
      return this;
    },
    assertSystemMessagesContains(text) {
      this.assert.containsText("@messages", text);
      return this;
    },
  },
  elements: {
    messages: {
      selector: "div[data-drupal-messages]",
    },
    save: {
      selector: "input[data-drupal-selector=edit-submit]:enabled",
    },
    saveDisabled: {
      selector: "input[data-drupal-selector=edit-submit]:disabled",
    },
    title: {
      selector: "input[data-drupal-selector=edit-title-0-value]",
    },
    pathAlias: {
      selector: "input[data-drupal-selector=edit-path-0-alias]",
    },
    publishedStatus: {
      selector: "input[data-drupal-selector=edit-status-value]",
    },
    workflowStatus: {
      selector: "select[data-drupal-selector=edit-moderation-state-0-state]",
    },
  },
};
