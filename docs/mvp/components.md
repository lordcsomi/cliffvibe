# UI Components

## Navigation

### Bottom Navigation
```typescript
interface BottomNav {
  layout: {
    position: 'fixed'
    bottom: 0
    width: '100%'
    height: '64px'
    background: 'var(--surface)'
    borderTop: '1px solid var(--surface-hover)'
    zIndex: 'var(--z-40)'
  }
  items: [
    {
      label: 'Explore'
      icon: 'map'
      route: '/explore'
    },
    {
      label: 'Contribute'
      icon: 'plus'
      route: '/contribute'
    },
    {
      label: 'Community'
      icon: 'users'
      route: '/community'
    }
  ]
  activeStyle: {
    color: 'var(--primary)'
    scale: 1.1
    transition: 'all 0.2s ease'
  }
}
```

## Map Components

### Map Controls
```typescript
interface MapControls {
  desktop: {
    position: 'bottom-left'
    margin: '16px'
    layout: 'vertical'
    buttons: [
      {
        type: 'zoom-in'
        icon: 'plus'
        size: '32px'
      },
      {
        type: 'zoom-out'
        icon: 'minus'
        size: '32px'
      }
    ]
  }
  mobile: {
    visible: false
  }
  appearance: {
    background: 'var(--surface)'
    border: '1px solid var(--surface-hover)'
    borderRadius: 'var(--radius-md)'
    shadow: 'var(--shadow-md)'
  }
}
```

### Location Marker
```typescript
interface LocationMarker {
  icon: {
    size: '32px'
    color: 'var(--primary)'
    selected: {
      color: 'var(--primary-dark)'
      scale: 1.2
    }
  }
  popup: {
    width: '240px'
    padding: 'var(--spacing-4)'
    background: 'var(--surface)'
    border: '1px solid var(--surface-hover)'
    borderRadius: 'var(--radius-lg)'
    shadow: 'var(--shadow-lg)'
  }
}
```

## Location Components

### Location Card
```typescript
interface LocationCard {
  layout: {
    display: 'flex'
    gap: 'var(--spacing-3)'
    padding: 'var(--spacing-3)'
    background: 'var(--surface)'
    borderRadius: 'var(--radius-lg)'
    cursor: 'pointer'
  }
  image: {
    width: '48px'
    height: '48px'
    borderRadius: 'var(--radius-md)'
    objectFit: 'cover'
  }
  content: {
    title: {
      fontSize: 'var(--text-base)'
      fontWeight: 600
      color: 'var(--text)'
    }
    details: {
      fontSize: 'var(--text-sm)'
      color: 'var(--text-secondary)'
    }
  }
  states: {
    hover: {
      background: 'var(--surface-hover)'
      transform: 'translateY(-1px)'
    }
    active: {
      transform: 'translateY(0)'
    }
    selected: {
      borderLeft: '3px solid var(--primary)'
    }
  }
}
```

## Form Components

### Text Input
```typescript
interface TextInput {
  layout: {
    height: '40px'
    padding: '0 var(--spacing-3)'
    border: '1px solid var(--surface-hover)'
    borderRadius: 'var(--radius-md)'
    background: 'var(--surface)'
  }
  typography: {
    fontSize: 'var(--text-base)'
    color: 'var(--text)'
    placeholder: 'var(--text-secondary)'
  }
  states: {
    hover: {
      borderColor: 'var(--text-secondary)'
    }
    focus: {
      borderColor: 'var(--primary)'
      ring: 'var(--focus-ring)'
    }
    error: {
      borderColor: 'var(--error)'
    }
  }
}
```

### Button
```typescript
interface Button {
  base: {
    height: '40px'
    padding: '0 var(--spacing-4)'
    borderRadius: 'var(--radius-full)'
    fontSize: 'var(--text-base)'
    fontWeight: 500
    display: 'inline-flex'
    alignItems: 'center'
    justifyContent: 'center'
    gap: 'var(--spacing-2)'
  }
  variants: {
    primary: {
      background: 'var(--primary)'
      color: 'white'
      hover: {
        background: 'var(--primary-dark)'
      }
    }
    secondary: {
      background: 'var(--surface)'
      color: 'var(--text)'
      border: '1px solid var(--text-secondary)'
      hover: {
        background: 'var(--surface-hover)'
      }
    }
    ghost: {
      background: 'transparent'
      color: 'var(--text)'
      hover: {
        background: 'var(--surface-hover)'
      }
    }
  }
}
```

### Dropdown
```typescript
interface Dropdown {
  trigger: {
    height: '40px'
    padding: '0 var(--spacing-3)'
    border: '1px solid var(--surface-hover)'
    borderRadius: 'var(--radius-md)'
    background: 'var(--surface)'
  }
  menu: {
    width: '240px'
    maxHeight: '320px'
    background: 'var(--surface)'
    border: '1px solid var(--surface-hover)'
    borderRadius: 'var(--radius-lg)'
    shadow: 'var(--shadow-lg)'
    zIndex: 'var(--z-30)'
  }
  item: {
    height: '40px'
    padding: '0 var(--spacing-3)'
    hover: {
      background: 'var(--surface-hover)'
    }
    selected: {
      background: 'var(--primary-fade)'
      color: 'var(--primary)'
    }
  }
}
```

## Feedback Components

### Loading Spinner
```typescript
interface Spinner {
  sizes: {
    sm: '16px'
    md: '24px'
    lg: '32px'
  }
  colors: {
    primary: 'var(--primary)'
    white: 'white'
    gray: 'var(--text-secondary)'
  }
  animation: {
    type: 'spin'
    duration: '0.6s'
    timing: 'linear'
    infinite: true
  }
}
```

### Toast Notifications
```typescript
interface Toast {
  layout: {
    width: '320px'
    padding: 'var(--spacing-4)'
    borderRadius: 'var(--radius-lg)'
    background: 'var(--surface)'
    border: '1px solid var(--surface-hover)'
    shadow: 'var(--shadow-lg)'
  }
  variants: {
    success: {
      icon: 'check'
      iconColor: 'var(--success)'
    }
    error: {
      icon: 'x'
      iconColor: 'var(--error)'
    }
    info: {
      icon: 'info'
      iconColor: 'var(--info)'
    }
  }
  animation: {
    enter: 'slide-up fade-in'
    exit: 'slide-down fade-out'
    duration: '200ms'
  }
}
```

## Layout Components

### Container
```typescript
interface Container {
  width: {
    default: '100%'
    max: '1280px'
  }
  padding: {
    mobile: 'var(--spacing-4)'
    desktop: 'var(--spacing-8)'
  }
  margin: '0 auto'
}
```

### Grid
```typescript
interface Grid {
  display: 'grid'
  gap: {
    mobile: 'var(--spacing-4)'
    desktop: 'var(--spacing-6)'
  }
  columns: {
    mobile: 1
    tablet: 2
    desktop: 3
    wide: 4
  }
}
```

## Utility Components

### Divider
```typescript
interface Divider {
  color: 'var(--surface-hover)'
  thickness: '1px'
  margin: 'var(--spacing-4) 0'
  variants: {
    horizontal: { width: '100%' }
    vertical: { height: '100%' }
  }
}
```

### Badge
```typescript
interface Badge {
  layout: {
    padding: '2px 8px'
    borderRadius: 'var(--radius-full)'
    fontSize: 'var(--text-xs)'
    fontWeight: 500
  }
  variants: {
    primary: {
      bg: 'var(--primary-fade)'
      color: 'var(--primary)'
    }
    success: {
      bg: 'var(--success)'
      color: 'white'
    }
    warning: {
      bg: 'var(--warning)'
      color: 'white'
    }
  }
}
