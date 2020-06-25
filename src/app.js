'use strict';

const scrollTab = (() => {
  setListeners();

  function setListeners() {
    browser.runtime.onMessage.addListener(message => {
      if (message.scrollAction) {
        const { scrollAction } = message;
        try {
          scrollTab(scrollAction);
        } catch (e) {
          console.error(e);
        }
      }
    });

    browser.runtime.onInstalled.addListener(({ _, temporary }) => {
      if (temporary) return; // skip during development
      extensionService.onInstalled();
    });
  }

  async function scrollTab(direction) {
    const targetTab = await tabsService.getTargetTabId(direction);
    sendMessageToTab(targetTab, { keyTriggerChange: true });
    tabsService.updateTab(targetTab);
  }

  function sendMessageToTab(tabId, message) {
    return browser.tabs.sendMessage(tabId, message);
  }
})();
