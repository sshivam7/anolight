browser.runtime.onStartup.addListener(function () {
  browser.storage.local.clear();
});

browser.contextMenus.create({
  id: 'highlight-selection',
  title: 'Highlight',
  contexts: ['selection'],
});

browser.contextMenus.create({
  id: 'remove-selection',
  title: 'Remove Highlight',
  contexts: ['selection'],
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'highlight-selection') {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { action: 'HIGHLIGHT' });
    });
  } else if (info.menuItemId === 'remove-selection') {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { action: 'REMOVE_HIGHLIGHT' });
    });
  }
});
