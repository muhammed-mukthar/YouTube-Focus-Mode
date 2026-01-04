// YouTube Focus Mode - Content Script
(function() {
  'use strict';

  // Check if blur should be enabled
  function initBlur() {
    chrome.storage.local.get(['enabled'], (result) => {
      const isEnabled = result.enabled !== undefined ? result.enabled : true;
      applyBlur(isEnabled);
    });
  }

  // Apply or remove blur
  function applyBlur(enabled) {
    if (enabled) {
      document.documentElement.classList.add('ytfocus-enabled');
      document.documentElement.classList.remove('ytfocus-disabled');
    } else {
      document.documentElement.classList.remove('ytfocus-enabled');
      document.documentElement.classList.add('ytfocus-disabled');
    }
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleBlur') {
      applyBlur(message.enabled);
      sendResponse({ success: true });
    }
    return true;
  });

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.enabled) {
      applyBlur(changes.enabled.newValue);
    }
  });

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlur);
  } else {
    initBlur();
  }

  // Also run immediately to catch early loads
  initBlur();

  // Re-apply blur on YouTube's SPA navigation
  const observer = new MutationObserver((mutations) => {
    // YouTube uses SPA navigation, so we need to ensure blur stays applied
    chrome.storage.local.get(['enabled'], (result) => {
      const isEnabled = result.enabled !== undefined ? result.enabled : true;
      if (isEnabled && !document.documentElement.classList.contains('ytfocus-enabled')) {
        applyBlur(true);
      }
    });
  });

  // Observe for navigation changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: false
  });
})();
