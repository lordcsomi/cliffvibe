# Profile & Settings

## Profile Menu

### Menu Button
```typescript
interface ProfileMenuButton {
  display: {
    type: 'circle'
    dimensions: {
      size: '40px'
      borderWidth: '2px'
      borderColor: 'white'
      shadowBox: '0 2px 4px rgba(0,0,0,0.1)'
    }
    image: {
      fit: 'cover'
      borderRadius: '50%'
    }
    position: {
      top: '16px'
      left: '16px'
      zIndex: 1000
    }
  }
  states: {
    hover: { transform: 'scale(1.05)' }
    active: { transform: 'scale(0.95)' }
    focus: { ring: '2px solid var(--primary)' }
  }
}
```

### Dropdown Menu
```
┌──────────────────────────┐
│ ○ User Name             │
│   user@example.com      │
├──────────────────────────┤
│ 📸 Change Photo         │
│ ⚙️  Settings           │
│ 📏 Unit Preferences     │
│ 🌙 Dark Mode           │
├──────────────────────────┤
│ 🚪 Sign Out            │
└──────────────────────────┘
```

## User Settings

### Unit Preferences
```typescript
interface UnitPreferences {
  height: {
    unit: 'meters' | 'feet'
    display: {
      showBoth: boolean      // e.g., "10m (32.8ft)"
      precision: number      // decimal places
    }
  }
  windSpeed: {
    unit: 'kmh' | 'mph'
    display: {
      showGusts: boolean
    }
  }
  temperature: {
    unit: 'celsius' | 'fahrenheit'
    display: {
      showFeelsLike: boolean
    }
  }
}
```

### Profile Picture Management

#### Upload Interface
```typescript
interface PhotoUpload {
  button: {
    text: 'Change Photo'
    icon: 'camera'
    accept: ['image/jpeg', 'image/png', 'image/webp']
  }
  preview: {
    size: '120px'
    shape: 'circle'
    overlay: {
      icon: 'edit'
      background: 'rgba(0,0,0,0.5)'
    }
  }
  cropper: {
    aspect: 1
    shape: 'circle'
    minSize: '200px'
    maxSize: '2048px'
  }
}
```

#### Image Sources
1. Google Profile (Default)
   - Imported on sign-in
   - Auto-synced when changed
   - Fallback option

2. Custom Upload
   - Overrides Google photo
   - Local storage in Firebase
   - Auto-resized versions

## Settings Interface

### Layout
```typescript
interface SettingsLayout {
  sections: {
    profile: {
      title: 'Profile'
      items: [
        'Display Name',
        'Profile Picture',
        'Email'
      ]
    }
    preferences: {
      title: 'Preferences'
      items: [
        'Height Unit',
        'Wind Speed Unit',
        'Temperature Unit'
      ]
    }
    appearance: {
      title: 'Appearance'
      items: [
        'Theme Mode',
        'Language'
      ]
    }
  }
}
```

### Interactive Elements
```typescript
interface SettingsControls {
  toggles: {
    size: 'md'
    color: 'primary'
    animation: 'smooth'
  }
  dropdowns: {
    height: '40px'
    borderRadius: '8px'
    backgroundColor: 'surface'
  }
  buttons: {
    height: '40px'
    variant: 'contained' | 'outlined'
    borderRadius: '20px'
  }
}
```

## State Management

### Profile State
```typescript
interface ProfileState {
  user: {
    displayName: string
    email: string
    photoURL: string
    customPhoto?: string
  }
  preferences: UnitPreferences
  theme: 'light' | 'dark' | 'system'
  status: 'loading' | 'ready' | 'error'
}
```

### Change Handlers
```typescript
interface SettingsHandlers {
  onPhotoChange: (file: File) => Promise<void>
  onUnitChange: (type: string, value: string) => void
  onThemeChange: (mode: string) => void
  onLanguageChange: (lang: string) => void
}
```

## Animations

### Transitions
- Menu open/close: 150ms ease
- Photo upload preview: 200ms ease-out
- Settings changes: 100ms ease
- Theme switch: 200ms ease-in-out

### Loading States
- Photo upload progress
- Settings save indicator
- Preference update spinner
- Theme mode transition

## Error Handling

### Upload Errors
- File size limits
- Format validation
- Upload failures
- Storage quota

### Settings Errors
- Save failures
- Sync issues
- Invalid values
- Network errors

## Data Persistence
- Local storage backup
- Cross-device sync
- Offline support
- Change history
