'use strict';

const scrollTab = (() => {
  const directions = {
    up: tabsService.getNextTab,
    down: tabsService.getPreviusTab,
  };

  setListeners();

  async function scrollTab(direction) {
    if (!directions[direction]) {
      console.error('Unknow direction');
      return;
    }

    const tabs = await tabsService.getTabs();
    const targetTabIndex = directions[direction](tabs);
    const targetTab = tabs[targetTabIndex].id;
    sendMessageToTab(targetTab, { keyTriggerChange: true });
    const executionResult = tabsService.updateTab(targetTab);
  }

  function setListeners() {
    browser.runtime.onMessage.addListener((message) => {
      if (message.scrollAction) {
        const { scrollAction } = message;
        scrollTab(scrollAction);
      }
    });

    browser.runtime.onInstalled.addListener(({ reason, temporary }) => {
      if (temporary) return; // skip during development
      extensionService.onInstalled();
    });
  }

  function sendMessageToTab(tabId, message) {
    return browser.tabs.sendMessage(tabId, message);
  }
})();
