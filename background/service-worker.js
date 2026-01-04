// YouTube Focus Mode - Background Service Worker

// Set default state on installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Enable by default on first install
    chrome.storage.local.set({ enabled: true }, () => {
      console.log('YouTube Focus Mode installed and enabled by default');
    });
  }
});

// Handle extension icon click when popup is not available
chrome.action.onClicked.addListener((tab) => {
  // This won't fire since we have a popup, but kept as fallback
  chrome.storage.local.get(['enabled'], (result) => {
    const newState = !result.enabled;
    chrome.storage.local.set({ enabled: newState });
  });
});
