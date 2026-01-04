# Product Requirements Document (PRD)
# YouTube Focus Mode - Chrome Extension

## Document Information
- **Product Name:** YouTube Focus Mode
- **Version:** 1.0
- **Date:** January 4, 2026
- **Type:** Free Chrome Extension (No Backend)

---

## 1. Executive Summary

YouTube Focus Mode is a free, lightweight Chrome extension that helps users stay focused while using YouTube. It blurs distracting content such as homepage video recommendations and sidebar suggested videos, allowing users to concentrate on searching for specific content and watching only the videos they intentionally choose.

---

## 2. Problem Statement

### The Problem
YouTube's algorithm-driven homepage and recommendation system is designed to maximize watch time, often leading users to:
- Spend hours browsing without purpose
- Get distracted from their original intent
- Fall into "rabbit holes" of suggested content
- Lose productivity and focus

### Target Users
- Students trying to use YouTube for educational content
- Professionals using YouTube for work-related tutorials
- Anyone who wants to reduce mindless scrolling
- Users trying to build healthier digital habits

---

## 3. Product Goals & Objectives

### Primary Goals
1. Reduce visual distractions on YouTube
2. Help users maintain focus on intentional content consumption
3. Provide a simple, free solution with zero setup

### Success Metrics
- User retention rate
- Chrome Web Store ratings and reviews
- Number of active installations

---

## 4. Scope

### In Scope
- Blur YouTube homepage video thumbnails and titles
- Blur recommended/suggested videos in the sidebar
- Blur end-screen video suggestions
- Simple toggle to enable/disable the extension
- Works entirely client-side (no backend required)
- Free for all users

### Out of Scope
- User accounts or authentication
- Backend server or database
- Analytics or tracking
- Premium/paid features
- Mobile browser support
- Other video platforms (Vimeo, Dailymotion, etc.)
- Blocking ads
- Video playback controls

---

## 5. Features & Requirements

### 5.1 Core Features

#### F1: Homepage Blur
| Attribute | Details |
|-----------|---------|
| **Description** | Blur all video thumbnails, titles, and metadata on YouTube homepage |
| **Priority** | P0 (Must Have) |
| **User Story** | As a user, I want the homepage videos to be blurred so I'm not tempted to click on random recommendations |

**Acceptance Criteria:**
- All video thumbnails on homepage are blurred
- Video titles are blurred or hidden
- Channel names and metadata are blurred
- Blur effect is visually consistent
- Search bar remains fully visible and functional

#### F2: Sidebar Recommendations Blur
| Attribute | Details |
|-----------|---------|
| **Description** | Blur the "Up Next" and recommended videos sidebar while watching a video |
| **Priority** | P0 (Must Have) |
| **User Story** | As a user, I want sidebar recommendations blurred so I can focus on the video I'm watching |

**Acceptance Criteria:**
- All sidebar video recommendations are blurred
- The video player remains unaffected
- Video title and description of current video remain visible
- Comments section remains visible (optional blur in future)

#### F3: End Screen Suggestions Blur
| Attribute | Details |
|-----------|---------|
| **Description** | Blur the video suggestions that appear at the end of a video |
| **Priority** | P1 (Should Have) |
| **User Story** | As a user, I want end-screen suggestions blurred so I can decide to leave rather than continue watching |

**Acceptance Criteria:**
- End screen video cards are blurred
- Blur activates when end screen appears
- User can still click through if desired (blur, not block)

#### F4: Toggle On/Off
| Attribute | Details |
|-----------|---------|
| **Description** | Simple popup with toggle switch to enable/disable the extension |
| **Priority** | P0 (Must Have) |
| **User Story** | As a user, I want to quickly toggle the extension on/off without going to settings |

**Acceptance Criteria:**
- Click extension icon to open popup
- Single toggle switch for on/off
- State persists across browser sessions
- Visual indicator showing current state
- Changes apply immediately without page refresh

#### F5: Reveal on Hover (Optional)
| Attribute | Details |
|-----------|---------|
| **Description** | Optionally reveal blurred content when hovering over it |
| **Priority** | P2 (Nice to Have) |
| **User Story** | As a user, I want the option to peek at blurred content by hovering if I choose |

**Acceptance Criteria:**
- Toggle in settings to enable/disable hover reveal
- Smooth transition from blurred to clear on hover
- Content re-blurs when mouse leaves

---

## 6. User Interface Design

### 6.1 Extension Popup
```
+---------------------------+
|   YouTube Focus Mode      |
+---------------------------+
|                           |
|   [Toggle Switch]  ON     |
|                           |
+---------------------------+
|   Focus Mode Active       |
|   Distractions hidden     |
+---------------------------+
```

### 6.2 Blur Behavior

| Element | Blur Intensity | Behavior |
|---------|---------------|----------|
| Homepage thumbnails | High (15-20px) | Always blurred when enabled |
| Homepage titles | Medium (8-10px) | Always blurred when enabled |
| Sidebar recommendations | High (15-20px) | Always blurred when enabled |
| End screen cards | High (15-20px) | Blurred when they appear |
| Search bar | None | Never blurred |
| Current video player | None | Never blurred |
| Current video info | None | Never blurred |

---

## 7. Technical Specifications

### 7.1 Technology Stack
- **Manifest Version:** Chrome Extension Manifest V3
- **Languages:** HTML, CSS, JavaScript
- **Storage:** Chrome Storage API (local)
- **Permissions Required:**
  - `activeTab` - To access YouTube pages
  - `storage` - To save user preferences
  - Host permission for `*://*.youtube.com/*`

### 7.2 Architecture

```
youtube-focus-mode/
├── manifest.json          # Extension configuration
├── popup/
│   ├── popup.html         # Extension popup UI
│   ├── popup.css          # Popup styles
│   └── popup.js           # Popup logic
├── content/
│   ├── content.js         # Main content script
│   └── content.css        # Blur styles
├── background/
│   └── service-worker.js  # Background service worker
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md
```

### 7.3 Key CSS Classes to Target

```css
/* Homepage video grid */
ytd-rich-item-renderer
ytd-video-renderer
ytd-compact-video-renderer

/* Sidebar recommendations */
ytd-watch-next-secondary-results-renderer
#secondary #related

/* End screen */
.ytp-endscreen-content
.ytp-videowall-still
```

### 7.4 Storage Schema
```javascript
{
  "enabled": true,           // Boolean: Extension on/off
  "hoverReveal": false,      // Boolean: Reveal on hover
  "blurIntensity": "high"    // String: "low" | "medium" | "high"
}
```

---

## 8. User Flows

### 8.1 First-Time User
1. User installs extension from Chrome Web Store
2. Extension is enabled by default
3. User visits YouTube
4. Homepage videos are automatically blurred
5. User clicks extension icon to see popup
6. User can toggle on/off as needed

### 8.2 Returning User
1. User opens YouTube
2. Extension remembers previous state
3. If enabled, blur is automatically applied
4. User searches for specific video
5. User watches video without sidebar distractions

### 8.3 Disable Extension Temporarily
1. User clicks extension icon
2. User toggles switch to OFF
3. Page updates immediately (blur removed)
4. User browses normally
5. User re-enables when ready

---

## 9. Privacy & Security

### 9.1 Data Handling
- **No data collection** - Extension does not collect any user data
- **No analytics** - No tracking or usage analytics
- **No network requests** - All processing is local
- **No backend** - Completely client-side

### 9.2 Permissions Justification
| Permission | Reason |
|------------|--------|
| `activeTab` | Required to inject blur styles on YouTube pages |
| `storage` | Required to save user's on/off preference |
| `host_permissions: youtube.com` | Required to run on YouTube domain |

---

## 10. Release Plan

### Phase 1: MVP (Version 1.0)
- Homepage blur
- Sidebar blur
- Toggle on/off
- Chrome Web Store listing

### Phase 2: Enhancement (Version 1.1)
- End screen blur
- Hover to reveal option
- Blur intensity settings

### Phase 3: Polish (Version 1.2)
- Keyboard shortcuts
- Whitelist specific channels
- Shorts blur option

---

## 11. Success Criteria

### Launch Criteria
- [ ] Extension loads without errors
- [ ] Homepage videos are properly blurred
- [ ] Sidebar videos are properly blurred
- [ ] Toggle works correctly
- [ ] Settings persist across sessions
- [ ] No performance impact on YouTube
- [ ] Passes Chrome Web Store review

### Post-Launch Metrics
- 4+ star rating on Chrome Web Store
- < 1% uninstall rate in first week
- Positive user reviews mentioning focus/productivity

---

## 12. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| YouTube UI changes break extension | High | Medium | Use robust CSS selectors, monitor for changes |
| Chrome Manifest V3 limitations | Medium | Low | Design within V3 constraints from start |
| Performance impact | Medium | Low | Use efficient CSS-only blur where possible |
| Conflict with other extensions | Low | Low | Test with popular ad blockers |

---

## 13. Appendix

### A. Competitive Analysis

| Extension | Pros | Cons |
|-----------|------|------|
| DF YouTube | Many features | Complex, overwhelming |
| Unhook | Good blocking | Completely removes content |
| Remove YouTube Recommendations | Simple | Too aggressive |

**Our Differentiator:** Simple blur approach that reduces temptation without completely removing content, maintaining user choice.

### B. References
- [Chrome Extension Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 4, 2026 | - | Initial PRD |

---

*This is a free, open-source project with no backend infrastructure required.*
