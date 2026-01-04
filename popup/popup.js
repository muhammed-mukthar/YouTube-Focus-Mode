document.addEventListener('DOMContentLoaded', () => {
  const toggleEnabled = document.getElementById('toggle-enabled');
  const statusIcon = document.getElementById('status-icon');
  const statusText = document.getElementById('status-text');

  // Load saved state
  chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== undefined ? result.enabled : true;
    toggleEnabled.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Handle toggle change
  toggleEnabled.addEventListener('change', () => {
    const isEnabled = toggleEnabled.checked;

    // Save state
    chrome.storage.local.set({ enabled: isEnabled }, () => {
      updateStatus(isEnabled);

      // Notify content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleBlur',
            enabled: isEnabled
          }).catch(() => {
            // Content script might not be loaded yet, that's okay
          });
        }
      });
    });
  });

  function updateStatus(isEnabled) {
    if (isEnabled) {
      statusIcon.classList.add('active');
      statusText.textContent = 'Focus mode active - Distractions hidden';
    } else {
      statusIcon.classList.remove('active');
      statusText.textContent = 'Focus mode off - All content visible';
    }
  }

  // Handle external link clicks (Chrome extensions need this)
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: link.href });
    });
  });
});
