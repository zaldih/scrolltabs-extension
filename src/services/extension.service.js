const extensionService = (() => {
  function onInstalled() {
    const url = browser.runtime.getURL('src/views/instructions.html');
    browser.tabs.create({ url });
  }

  return { onInstalled };
})();
