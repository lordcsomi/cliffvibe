# Explore Tab Specification

## Layout Overview

### Mobile Layout
```
|--------------------------|
| ○ Profile               |
|--------------------------|
|                         |
|                         |
|       Map View          |
|                         |
|                         |
|--------------------------|
|    Location List        |
|--------------------------|
|       Nav Tabs          |
|--------------------------|
```

### Desktop Layout
```
|--------------------------|
| ○ Profile               |
|--------------------------|
|                         |
|       Map View          |
|                         |
|  [+]                     |
|  [-]                     |
|--------------------------|
|    Location List        |
|--------------------------|
|       Nav Tabs          |
|--------------------------|
```

## Components

### Profile Button
```typescript
interface ProfileButton {
  appearance: {
    shape: 'circle'
    size: {
      desktop: '40px'
      mobile: '32px'
    }
    position: {
      top: '16px'
      left: '16px'
    }
    styles: {
      border: '2px solid white'
      shadow: '0 2px 4px rgba(0,0,0,0.1)'
      background: 'white'
    }
  }
  dropdown: {
    width: '240px'
    position: 'absolute'
    top: '56px'
    left: '16px'
    items: [
      { label: 'Profile', icon: 'user' },
      { label: 'Change Photo', icon: 'camera' },
      { label: 'Settings', icon: 'settings' },
      { label: 'Unit Preferences', icon: 'ruler' },
      { label: 'Dark Mode', icon: 'moon' },
      { label: 'Sign Out', icon: 'logout' }
    ]
  }
}
```

### Map Component
```typescript
interface MapView {
  provider: 'Mapbox GL JS'
  options: {
    style: 'mapbox://styles/mapbox/outdoors-v12'
    initialView: {
      center: [19.040236, 47.497913] // Budapest
      zoom: 12
    }
    controls: {
      desktop: {
        position: 'bottom-left'
        margin: '16px'
        buttons: ['zoom-in', 'zoom-out']
      }
      mobile: {
        visible: false // Uses native gestures
      }
    }
  }
  interactions: {
    desktop: {
      drag: true
      scroll: true // For zoom
      doubleClick: true // For zoom
    }
    mobile: {
      drag: true
      pinch: true // For zoom
      doubleTap: true // For zoom
    }
  }
}
```

### Location List Panel
```typescript
interface LocationList {
  layout: {
    mobile: {
      height: '30vh' // Expandable with drag
      maxHeight: '80vh'
      dragHandle: true
    }
    desktop: {
      height: '30vh'
      width: '100%'
    }
  }
  content: {
    header: {
      title: string
      count: number
      filters: FilterOptions[]
    }
    list: {
      items: LocationCard[]
      scrollBehavior: 'smooth'
      loading: 'infinite-scroll'
    }
  }
}
```

### Location Card
```typescript
interface LocationCard {
  layout: {
    height: '72px'
    padding: '12px'
    display: 'flex'
    gap: '12px'
  }
  content: {
    image: {
      size: '48px'
      borderRadius: '8px'
    }
    info: {
      title: string
      distance: string
      height: string
      difficulty: 1 | 2 | 3 | 4 | 5
    }
  }
  interactions: {
    onClick: () => void // Center map on location
    onHover: {
      desktop: {
        highlight: true
        showPreview: true
      }
    }
  }
}
```

## States & Interactions

### Map States
1. Default View
   - Shows all locations in viewport
   - Clustered markers for zoom levels < 13
   - Individual markers for zoom levels ≥ 13

2. Selected Location
   - Highlighted marker
   - Centered on map
   - Corresponding list item highlighted
   - Info panel expanded

3. Loading States
   - Initial map load skeleton
   - Location markers loading
   - Smooth marker transitions

### List Panel States
1. Collapsed
   - Shows preview of locations
   - Drag handle visible
   - Height: 30vh

2. Expanded
   - Full list view
   - Smooth animation
   - Height: 80vh
   - Scrollable content

3. Loading
   - Skeleton UI
   - Infinite scroll loading
   - Pull-to-refresh on mobile

## Animations

### Transitions
- Map pan/zoom: 300ms ease-out
- List panel expand/collapse: 200ms ease-in-out
- Location selection: 250ms ease
- Profile dropdown: 150ms ease

### Interactive Feedback
- Card hover: Scale 1.02
- Marker hover: Scale 1.1
- Button press: Scale 0.98
- Dropdown animation: Fade + slide

## Error States

### Map Errors
- Failed to load
- No locations found
- Location access denied
- Network error

### List Errors
- Failed to fetch
- No results
- Network timeout
- Load more failed
