# MVP Layout Structure

## Overview
The MVP version of CliffVibe features a clean, modern interface with three main tabs and Firebase authentication integration.

## Layout Structure

### Base Layout
```
|--------------------------|
| Profile Menu            |
|--------------------------|
|                         |
|     Content Area        |
|                         |
|--------------------------|
|     Navigation Tabs     |
|--------------------------|
```

### Navigation
- Fixed bottom navigation bar
- Three main tabs:
  * Explore (default/home)
  * Contribute
  * Community
- Active tab indicated by blue accent color (#2563eb)

### Responsive Design

#### Mobile (< 768px)
- Full-width layout
- Bottom navigation tabs
- Collapsible location list (swipe up)
- Touch-optimized controls
- No visible map zoom controls

#### Desktop (≥ 768px)
- Map zoom controls in bottom left
- Wider location list panel
- Hover states for interactive elements
- Keyboard navigation support

## Theme

### Colors
```css
--primary: #2563eb;        /* Blue accent */
--primary-light: #3b82f6;
--primary-dark: #1d4ed8;
--background: #f8fafc;
--surface: #ffffff;
--text: #1e293b;
--text-secondary: #64748b;
```

### Typography
- Font: Inter (System fallback: -apple-system, sans-serif)
- Base size: 16px
- Scale:
  * h1: 24px
  * h2: 20px
  * h3: 18px
  * body: 16px
  * small: 14px

### Spacing
- Base unit: 4px
- Common spacings:
  * xs: 4px
  * sm: 8px
  * md: 16px
  * lg: 24px
  * xl: 32px

## Components

### Profile Menu
- Circular profile picture
- Dropdown menu on click
- User settings and preferences
- Authentication status
- Unit preferences

### Navigation Tabs
- Fixed position at bottom
- Equal width for each tab
- Active state indication
- Simple icons with labels
- Touch-friendly tap targets

### Content Areas
Each tab has its own layout requirements:
- Explore: Map-centric with location list
- Contribute: Form-based layout
- Community: Feed-style layout

## State Management
- Authentication state (Firebase)
- Current tab
- User preferences
- Map state (zoom, center)
- Location list state
