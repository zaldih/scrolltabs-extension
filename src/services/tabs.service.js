'use strict';

const tabsService = (() => {
  const tabDirections = {
    up: _getNextTabIndex,
    down: _getPreviousTabIndex
  };

  async function getTargetTabId(tabDirection) {
    const tabs = await _getTabs();
    const targetTabIndex = tabDirections[tabDirection](tabs);
    return tabs[targetTabIndex].id;
  }

  function updateTab(tabId) {
    const options = {
      active: true
    };
    return browser.tabs.update(tabId, options);
  }

  function _getNextTabIndex(tabs) {
    const actualTab = _getActualTabIndex(tabs);
    return actualTab >= tabs.length - 1 ? actualTab : actualTab + 1;
  }

  function _getPreviousTabIndex(tabs) {
    const actualTab = _getActualTabIndex(tabs);
    return actualTab <= 0 ? actualTab : actualTab - 1;
  }

  function _getTabs() {
    const options = { currentWindow: true, hidden: false };
    return browser.tabs.query(options);
  }

  function _getActualTabIndex(tabs) {
    return tabs.findIndex(tab => tab.active);
  }

  return {
    getTargetTabId,
    updateTab
  };
})();
