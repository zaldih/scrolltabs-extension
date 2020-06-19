'use strict';

const scrollTab = (() => {
  const directions = {
    up: tabsService.getNextTab,
    down: tabsService.getPreviusTab,
  };

  setMessagesListener();

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

  function setMessagesListener() {
    browser.runtime.onMessage.addListener((message) => {
      if (message.scrollAction) {
        const { scrollAction } = message;
        scrollTab(scrollAction);
      }
      /*    if (message.keyTriggerChange) {
        const { keyTriggerChange } = message;
        state.keyTrigered = keyTriggerChange;
      } */
    });
  }

  function sendMessageToTab(tabId, message) {
    return browser.tabs.sendMessage(tabId, message);
  }
})();
