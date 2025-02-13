# User Preferences & Measurement Units

## Overview
User-configurable measurement units and display preferences, with standardized storage in metric units (meters, km/h, Celsius) in the database.

## Unit Preferences

### Height Measurements
```typescript
interface HeightPreference {
  unit: 'meters' | 'feet'
  precision: {
    verified: 1,     // One decimal place (e.g., 34.7m)
    estimated: 0     // Whole numbers for estimates
  }
  display: {
    showBoth: boolean  // Show both units
    primary: 'metric' | 'imperial'
  }
}
```

### Wind Speed
```typescript
interface WindSpeedPreference {
  unit: 'kmh' | 'mph' | 'ms' | 'knots'
  display: {
    showGusts: boolean
    showBeaufort: boolean
  }
}
```

### Temperature
```typescript
interface TemperaturePreference {
  unit: 'celsius' | 'fahrenheit'
  display: {
    showBoth: boolean
    showFeelsLike: boolean
  }
}
```

## Onboarding Flow

### Unit Selection Screen
```typescript
interface UnitSelectionStep {
  position: 2  // After basic profile, before skill assessment
  required: true
  defaults: {
    height: detectRegion() === 'US' ? 'feet' : 'meters'
    windSpeed: detectRegion() === 'US' ? 'mph' : 'kmh'
    temperature: detectRegion() === 'US' ? 'fahrenheit' : 'celsius'
  }
}
```

### UI Components
```typescript
interface UnitSelector {
  type: 'segmented-control'
  appearance: {
    layout: 'horizontal'
    size: 'large'
    showIcons: true
  }
  preview: {
    showExample: true
    updateRealTime: true
  }
}
```

## Storage Standards

### Database Storage
All measurements are stored in standardized metric units:
```typescript
interface StorageStandards {
  height: {
    unit: 'meters'
    precision: 1      // Always store to 1 decimal
    type: 'decimal(5,1)'
  }
  windSpeed: {
    unit: 'metersPerSecond'
    precision: 1
    type: 'decimal(4,1)'
  }
  temperature: {
    unit: 'celsius'
    precision: 1
    type: 'decimal(3,1)'
  }
}
```

### Conversion Utilities
```typescript
interface UnitConverter {
  height: {
    toMeters: (value: number, fromUnit: 'feet') => number
    fromMeters: (meters: number, toUnit: 'feet') => number
  }
  windSpeed: {
    toMS: (value: number, fromUnit: 'kmh' | 'mph' | 'knots') => number
    fromMS: (ms: number, toUnit: 'kmh' | 'mph' | 'knots') => number
  }
  temperature: {
    toCelsius: (fahrenheit: number) => number
    toFahrenheit: (celsius: number) => number
  }
}
```

## Display Formatting

### Height Display
```typescript
interface HeightDisplay {
  verified: {
    metric: '34.7m'
    imperial: '113.8ft'
    combined: '34.7m (113.8ft)'
  }
  estimated: {
    metric: '~35m'
    imperial: '~115ft'
    combined: '~35m (115ft)'
  }
}
```

### Wind Display
```typescript
interface WindDisplay {
  metric: '25 km/h'
  imperial: '15.5 mph'
  scientific: '6.9 m/s'
  nautical: '13.5 knots'
  beaufort: 'Moderate Breeze (4)'
}
```

### Temperature Display
```typescript
interface TemperatureDisplay {
  metric: '23°C'
  imperial: '73.4°F'
  combined: '23°C (73.4°F)'
  feelsLike: {
    metric: 'Feels like 25°C'
    imperial: 'Feels like 77°F'
  }
}
```

## UI Implementation

### Preference Changes
- Available in onboarding
- Accessible in user settings
- Quick toggle in spot details
- Remembered across sessions
- Synced across devices

### Visual Indicators
- Clear unit labels
- Conversion tooltips
- Input validation
- Format examples
- Real-time preview

## Related Documentation
- [Height Verification System](../locations/height-verification.md)
- [Wind Analysis System](../safety/wind-analysis.md)
- [User Interface Guidelines](../../ui/components.md)
- [Mobile Design](../../ui/mobile.md)
