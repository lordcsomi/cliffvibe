# Multi-spot Marking System

## Overview
The multi-spot marking system allows users to precisely document multiple jumping points at a single location through various viewing angles and interfaces.

## View Types

### 📸 Water View
- Front-facing cliff perspective
- Clearly visible jumping points
- Height reference markers
- Water depth indicators
- Landing zone markings

### 🔭 Top View
- Aerial perspective of the cliff
- Jump-off point markers
- Path visualization to spots
- Safety zone indicators
- Access route markings

### 🛸 Satellite View
- GPS coordinate integration
- Overall area mapping
- Access route planning
- Multiple spot overview
- Terrain analysis

## Interactive Marking System

### Marker Types
```typescript
interface JumpMarker {
  type: 'main' | 'popular' | 'new' | 'caution' | 'danger'
  icon: {
    main: '🎯',     // Verified main jump
    popular: '⭐',  // Popular spot
    new: '🆕',      // Newly discovered
    caution: '⚠️',  // Requires caution
    danger: '❌'    // Dangerous area
  }
  measurements: {
    height: number
    waterDepth: number
    platformSize: {
      width: number
      length: number
    }
    landingZone: {
      radius: number
      depth: number
    }
  }
}
```

### Jump Point Data
Each marked point includes:
- Exact height measurement
- Water depth at landing
- Platform dimensions
- Run-up space needed
- Safe entry angle
- Seasonal variations
- Skill level requirement

## User Interface Features

### Mobile Interface
- Touch Interactions:
  * Tap to place marker
  * Hold to measure
  * Pinch to zoom
  * Double tap for quick mark
  * Swipe between views

### Desktop Interface
- Mouse Controls:
  * Click to place
  * Drag to measure
  * Scroll to zoom
  * Right-click menu
  * Multi-view support

### Common Features
- Real-time measurements
- Height visualization
- Depth color mapping
- Distance calculation
- Angle measurement
- 3D rotation (where available)

## Marker Documentation

### Required Information
```typescript
interface MarkerDetails {
  measurements: {
    height: number        // in meters
    waterDepth: number    // in meters
    platformSize: Size
    approachSpace: number // in meters
  }
  safety: {
    minimumSkillLevel: 1 | 2 | 3 | 4 | 5
    entryAngle: number   // in degrees
    landingZone: {
      coordinates: LatLng
      radius: number     // in meters
    }
  }
  media: {
    photos: Photo[]
    videos: Video[]
    angles: ViewAngle[]
  }
}
```

### Documentation Types
1. Essential Data
   - Precise measurements
   - Safety requirements
   - Skill level needed
   - Basic conditions

2. Technical Details
   - Entry technique
   - Approach method
   - Landing guidance
   - Safety notes

3. Rich Media
   - POV videos
   - Landing zone photos
   - Approach documentation
   - Technique demonstrations

## Integration Features

### GPS Integration
```typescript
interface LocationData {
  coordinates: {
    latitude: number
    longitude: number
    altitude: number
  }
  accuracy: {
    horizontal: number
    vertical: number
  }
  reference: {
    datum: string
    elevation: number
  }
}
```

### Image Processing
- Automatic height estimation
- Depth map generation
- Obstacle detection
- Safe zone identification
- Terrain analysis

### Mobile Features
- GPS location tracking
- Compass integration
- Augmented reality views
- Real-time measurements
- Offline capability

## Related Documentation
- [Height Verification System](height-verification.md)
- [Safety Analysis](../safety/conditions.md)
- [Water Depth Requirements](../safety/water-depth.md)
- [User Interface Guidelines](../../ui/components.md)
