'use strict';

const tabsService = (() => {
  function getNextTab(tabs) {
    const actualTab = getActualTabIndex(tabs);
    return actualTab >= tabs.length - 1 ? actualTab : actualTab + 1;
  }

  function getPreviusTab(tabs) {
    const actualTab = getActualTabIndex(tabs);
    return actualTab <= 0 ? actualTab : actualTab - 1;
  }

  function getTabs() {
    const options = { currentWindow: true, hidden: false };
    return browser.tabs.query(options);
  }

  function updateTab(tabId) {
    const options = {
      active: true,
    };
    return browser.tabs.update(tabId, options);
  }

  function getActualTabIndex(tabs) {
    return tabs.findIndex((tab) => tab.active);
  }

  return { getNextTab, getPreviusTab, getTabs, updateTab };
})();
