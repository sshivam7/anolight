browser.runtime.onStartup.addListener(() => {
     browser.storage.local.clear();
})