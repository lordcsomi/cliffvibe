# Contribute Tab Specification

## Layout Overview
```
|--------------------------|
| ○ Profile               |
|--------------------------|
| Location & Jump Points   |
|--------------------------|
| Multi-View Selection    |
|--------------------------|
| Form Content            |
|                         |
|--------------------------|
|       Nav Tabs          |
|--------------------------|
```

## Base Location Form

### Location Information
```typescript
interface LocationForm {
  basics: {
    name: {
      type: 'text'
      required: true
      maxLength: 100
      label: 'Location Name'
    }
    description: {
      type: 'textarea'
      required: true
      maxLength: 500
      label: 'Description'
    }
    access: {
      type: {
        type: 'select'
        options: ['public', 'private', 'restricted']
        required: true
      }
      parking: {
        type: 'map-picker'
        multiple: true
        label: 'Parking Spots'
      }
      approach: {
        difficulty: {
          type: 'select'
          options: [1, 2, 3, 4, 5]
        }
        distance: {
          type: 'number'
          unit: 'meters'
        }
        time: {
          type: 'number'
          unit: 'minutes'
        }
        description: {
          type: 'textarea'
          placeholder: 'Describe how to reach the spot...'
        }
      }
    }
    status: {
      type: 'select'
      options: ['active', 'seasonal', 'closed', 'unverified']
      required: true
    }
  }
  coordinates: {
    type: 'map-picker'
    required: true
    validate: {
      bounds: {
        north: 71.1854,
        south: 34.5997,
        east: 40.2274,
        west: -9.3815
      }
    }
  }
}
```

## Jump Point Form

### Jump Point Details
```typescript
interface JumpPointForm {
  basic: {
    name: {
      type: 'text'
      required: true
      label: 'Jump Point Name'
    }
    type: {
      type: 'select'
      options: ['main', 'alternative', 'advanced', 'training']
      required: true
    }
  }
  measurements: {
    height: {
      value: {
        type: 'number'
        required: true
        min: 1
        max: 100
        step: 0.1
        unit: 'meters'
      }
      method: {
        type: 'select'
        options: ['tape', 'estimate', 'official']
        required: true
      }
    }
    platform: {
      width: {
        type: 'number'
        unit: 'meters'
      }
      length: {
        type: 'number'
        unit: 'meters'
      }
      surface: {
        type: 'select'
        options: ['rock', 'concrete', 'wood']
      }
      condition: {
        type: 'rating'
        scale: [1, 2, 3, 4, 5]
      }
    }
    water: {
      depth: {
        type: 'number'
        required: true
        min: 1
        unit: 'meters'
      }
      clearance: {
        type: 'number'
        label: 'Distance from cliff'
        unit: 'meters'
      }
      obstacles: {
        type: 'multi-select'
        options: ['rocks', 'vegetation', 'debris']
      }
    }
  }
  safety: {
    difficulty: {
      type: 'rating'
      scale: [1, 2, 3, 4, 5]
      required: true
    }
    requirements: {
      type: 'multi-select'
      options: ['spotting', 'deep water entry', 'technical approach']
    }
    hazards: {
      type: 'multi-select'
      options: ['shallow areas', 'currents', 'overhanging rocks']
    }
    minSkillLevel: {
      type: 'select'
      options: [1, 2, 3, 4, 5]
      required: true
    }
  }
}
```

## Multi-View System

### View Selection
```typescript
interface ViewSystem {
  types: {
    water: {
      label: 'Water View 📸'
      description: 'Front-facing cliff perspective'
      required: true
    }
    top: {
      label: 'Top View 🔭'
      description: 'Aerial perspective'
      required: false
    }
    satellite: {
      label: 'Satellite View 🛸'
      description: 'GPS mapping'
      required: false
    }
  }
  controls: {
    desktop: {
      zoom: 'scroll'
      pan: 'drag'
      rotate: 'right-click + drag'
    }
    mobile: {
      zoom: 'pinch'
      pan: 'drag'
      rotate: 'two-finger rotate'
    }
  }
}
```

### Media Upload
```typescript
interface MediaUpload {
  requirements: {
    minPhotos: 1
    maxPhotos: 10
    types: ['photo', 'video', 'panorama']
    maxSize: '10MB'
    formats: ['jpg', 'png', 'webp', 'mp4']
  }
  categorization: {
    purpose: {
      type: 'select'
      options: [
        'overview',
        'approach',
        'platform',
        'water',
        'hazard'
      ]
      required: true
    }
    metadata: {
      timestamp: Date
      coordinates?: LatLng
      direction?: number
    }
  }
  processing: {
    generateThumbnails: true
    stripMetadata: true
    optimizeForWeb: true
    maxDimension: 2048
  }
}
```

## Form Validation

### Client-side Validation
```typescript
interface ValidationRules {
  location: {
    name: {
      required: true
      minLength: 3
      maxLength: 100
    }
    coordinates: {
      required: true
      withinEU: true
    }
    access: {
      required: true
      hasParking: true
    }
  }
  jumpPoints: {
    minPoints: 1
    maxPoints: 10
    measurements: {
      heightRequired: true
      depthRequired: true
      withinLimits: true
    }
    safety: {
      requiresDifficulty: true
      requiresSkillLevel: true
    }
  }
  media: {
    minPhotos: 1
    maxSize: true
    validFormats: true
  }
}
```

## Submission Process

### Data Flow
```typescript
interface SubmissionFlow {
  steps: [
    'validateForm',
    'processMedia',
    'uploadMedia',
    'saveLocation',
    'saveJumpPoints',
    'updateSearch'
  ]
  status: {
    current: string
    progress: number
    error?: string
  }
  rollback: {
    enabled: true
    steps: string[]
  }
}
```

### Success State
```typescript
interface SuccessView {
  display: {
    icon: '✓'
    title: 'Location Added Successfully'
    message: 'Your contribution will help other jumpers!'
  }
  actions: {
    viewLocation: {
      label: 'View Location'
      route: '/explore/:id'
    }
    addAnother: {
      label: 'Add Another Location'
      action: 'resetForm'
    }
  }
}
