# Spot Management System

## Overview
Comprehensive system for managing cliff jumping locations, with support for multiple jump points per location, detailed measurements, and safety information.

## Location Structure

### Base Location
```typescript
interface Location {
  id: string
  name: string
  description: string
  coordinates: {
    latitude: number
    longitude: number
    altitude: number  // meters above sea level
  }
  access: {
    type: 'public' | 'private' | 'restricted'
    parking: LatLng[]
    approach: {
      difficulty: 1 | 2 | 3 | 4 | 5
      distance: number    // meters
      time: number       // minutes
      description: string
    }
    restrictions?: string[]
  }
  status: 'active' | 'seasonal' | 'closed' | 'unverified'
}
```

### Jump Points
```typescript
interface JumpPoint {
  id: string
  locationId: string
  name: string
  type: 'main' | 'alternative' | 'advanced' | 'training'
  measurements: {
    height: {
      value: number      // meters, to 0.1 precision if verified
      verified: boolean
      method: 'tape' | 'estimate' | 'official'
      lastMeasured: Date
    }
    platform: {
      width: number
      length: number
      surface: 'rock' | 'concrete' | 'wood'
      condition: 1 | 2 | 3 | 4 | 5
    }
    water: {
      depth: number
      clearance: number  // distance from cliff
      obstacles: string[]
    }
  }
  safety: {
    difficulty: 1 | 2 | 3 | 4 | 5
    requirements: string[]
    hazards: string[]
    minSkillLevel: number
  }
}
```

## Media Management

### Location Media
```typescript
interface LocationMedia {
  type: 'photo' | 'video' | 'panorama' | '3d-scan'
  source: 'user' | 'official' | 'drone' | 'satellite'
  purpose: 'overview' | 'approach' | 'platform' | 'water' | 'hazard'
  metadata: {
    timestamp: Date
    author: string
    device?: string
    coordinates?: LatLng
    direction?: number   // degrees
  }
  views: {
    thumbnail: string
    medium: string
    high: string
    original: string
  }
}
```

### Interactive Elements
```typescript
interface SpotVisualization {
  views: {
    satellite: string
    terrain: string
    street: string
    custom: string[]
  }
  overlays: {
    jumpPoints: Marker[]
    paths: Path[]
    hazards: Area[]
    safeZones: Area[]
    depths: HeatMap
  }
  annotations: {
    measurements: Text[]
    warnings: Text[]
    instructions: Text[]
  }
}
```

## Location Features

### Water Conditions
```typescript
interface WaterAnalysis {
  depth: {
    minimum: number     // meters
    average: number     // meters
    measurement: {
      method: string
      date: Date
      confidence: number
    }
  }
  factors: {
    tides: boolean
    currents: boolean
    waves: boolean
    underwater: {
      visibility: number
      obstacles: string[]
      surface: string
    }
  }
  seasonal: {
    best: string[]     // months
    unsafe: string[]   // months
    warnings: string[]
  }
}
```

### Safety Features
```typescript
interface SafetyInfo {
  requirements: {
    skill: number      // 1-5
    experience: string[]
    equipment: string[]
  }
  conditions: {
    ideal: Conditions
    acceptable: Conditions
    unsafe: Conditions
  }
  emergency: {
    access: string
    contacts: Emergency[]
    equipment: string[]
    procedures: string[]
  }
}
```

## Location Discovery

### Search Filters
```typescript
interface SpotFilters {
  distance: number    // km from user
  height: {
    min: number
    max: number
  }
  difficulty: number[]  // 1-5
  features: string[]    // ['verified', 'multiple heights', 'easy access']
  status: string[]     // ['active', 'seasonal']
  water: {
    minDepth: number
    type: string[]    // ['ocean', 'lake', 'river']
  }
}
```

### Sorting Options
```typescript
interface SortOptions {
  type: 'distance' | 'popularity' | 'difficulty' | 'height'
  direction: 'asc' | 'desc'
  timeFrame?: 'all' | 'today' | 'week' | 'month'
  verified: boolean
}
```

## Integration Features

### External Links
```typescript
interface ExternalMapping {
  google: {
    maps: string
    earth: string
    streetView?: string
  }
  weather: {
    forecast: string
    tides?: string
    conditions: string
  }
  community: {
    photos: string[]
    videos: string[]
    reviews: string[]
  }
}
```

### Data Sources
```typescript
interface DataSources {
  elevation: string[]    // mapping services
  satellite: string[]    // imagery providers
  weather: string[]      // weather services
  reviews: string[]      // review platforms
  social: string[]       // social media
}
```

## Related Documentation
- [Height Verification](height-verification.md)
- [Multi-spot Marking](multi-spot-marking.md)
- [Safety Standards](../safety/conditions.md)
- [Water Analysis](../safety/water-depth.md)
