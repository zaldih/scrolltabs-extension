'use strict';

const scrollTabInserted = (() => {
  const config = {
    triggerKey: 'Shift',
  };

  const state = {
    keyTrigered: false,
  };

  setListeners();
  function scroll(event) {
    if (!isValidScroll()) return;

    event.preventDefault();
    event.stopPropagation();
    const scrollMessage = event.deltaY < 0 ? 'down' : 'up';
    const payload = {
      scrollAction: scrollMessage,
    };

    state.keyTrigered = false;
    sendMessage(payload);
  }

  function sendMessage(payload) {
    browser.runtime.sendMessage(payload);
  }

  function setListeners() {
    document.addEventListener('wheel', (e) => scroll(e), true);
    window.addEventListener('keydown', (e) => onKeyDown(e), true);
    window.addEventListener('keyup', (e) => onKeyUp(e), true);

    browser.runtime.onMessage.addListener((message) => {
      if (message.keyTriggerChange) {
        const { keyTriggerChange } = message;
        state.keyTrigered = keyTriggerChange;
      }
    });
  }

  function onKeyDown(evt) {
    if (!isTriggeredKey(evt)) return;
    state.keyTrigered = true;
  }

  function onKeyUp(evt) {
    if (!isTriggeredKey(evt)) return;
    state.keyTrigered = false;
  }

  function isTriggeredKey({ key }) {
    return key === config.triggerKey;
  }

  function isValidScroll() {
    return state.keyTrigered;
  }
})();
