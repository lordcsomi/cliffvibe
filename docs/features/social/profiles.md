# User Profiles & Progression System

## Profile Overview

### Basic Profile
```typescript
interface UserProfile {
  basics: {
    username: string
    displayName: string
    avatar: string
    bio: string
    location: string
  }
  stats: {
    totalJumps: number
    verifiedHeights: number[]
    highestJump: number  // in meters
    joinDate: Date
    lastActive: Date
  }
  preferences: {
    heightUnit: 'meters' | 'feet'
    windSpeedUnit: 'kmh' | 'mph' | 'ms' | 'knots'
    temperatureUnit: 'celsius' | 'fahrenheit'
    notifications: NotificationSettings
  }
}
```

## Skill Assessment

### Experience Levels
```typescript
interface SkillLevel {
  level: number    // 1-5
  title: string    // Beginner, Intermediate, Advanced, Expert, Pro
  requirements: {
    minJumps: number
    minHeight: number
    techniques: string[]
    safetyTraining: boolean
  }
  privileges: {
    maxHeight: number
    allowedTechniques: string[]
    spotAccess: 'basic' | 'intermediate' | 'advanced' | 'all'
  }
}
```

### Progression Tracking
```typescript
interface Progression {
  current: {
    level: number
    experience: number
    nextLevel: number
    progress: number  // 0-100%
  }
  history: {
    levelUps: Date[]
    achievements: Achievement[]
    certifications: Certification[]
  }
  goals: {
    next: Goal[]
    completed: Goal[]
    custom: Goal[]
  }
}
```

## Achievement System

### Achievement Categories
```typescript
interface AchievementTypes {
  height: {
    '5m': Requirements
    '10m': Requirements
    '15m': Requirements
    '20m': Requirements
    '25m+': Requirements
  }
  technique: {
    basic: string[]    // Pencil, Pike
    intermediate: string[] // Forward Flip, Back Flip
    advanced: string[] // Double Flip, Twists
    expert: string[]   // Complex combinations
  }
  safety: {
    training: string[]
    spotChecks: number
    safetyReports: number
    mentoring: number
  }
  community: {
    spots: number
    verifications: number
    events: number
    tutorials: number
  }
}
```

### Badges & Recognition
```typescript
interface Badge {
  type: 'achievement' | 'certification' | 'special'
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earnedDate: Date
  progress?: {
    current: number
    required: number
    percentage: number
  }
}
```

## Safety Certifications

### Training Modules
```typescript
interface SafetyTraining {
  basic: {
    waterEntry: boolean
    heightAssessment: boolean
    conditions: boolean
    emergencyResponse: boolean
  }
  advanced: {
    rescue: boolean
    firstAid: boolean
    weatherAnalysis: boolean
    riskManagement: boolean
  }
  specializations: {
    highJumps: boolean    // 20m+
    technicalJumps: boolean
    nightJumps: boolean
    competition: boolean
  }
}
```

## Experience Display

### Jump Log
```typescript
interface JumpLog {
  total: number
  byHeight: {
    '0-5m': number
    '5-10m': number
    '10-15m': number
    '15-20m': number
    '20m+': number
  }
  byTechnique: {
    [technique: string]: number
  }
  verified: {
    count: number
    heights: number[]
    locations: string[]
  }
}
```

### Achievements Display
```typescript
interface AchievementDisplay {
  showcase: {
    featured: Badge[]
    recent: Badge[]
    rare: Badge[]
  }
  statistics: {
    total: number
    byCategory: {
      [category: string]: number
    }
    completion: number  // 0-100%
  }
  progress: {
    current: Achievement[]
    next: Achievement[]
    suggested: Achievement[]
  }
}
```

## Pro Features

### Verified Status
```typescript
interface ProStatus {
  verified: boolean
  since: Date
  benefits: string[]
  specialBadge: string
  customization: {
    profile: boolean
    analytics: boolean
    content: boolean
  }
}
```

### Analytics
```typescript
interface JumpAnalytics {
  progression: {
    heightTrend: DataPoint[]
    techniqueMastery: {
      [technique: string]: number  // 0-100%
    }
    safetyScore: number
    consistency: number
  }
  performance: {
    avgHeight: number
    maxHeight: number
    uniqueSpots: number
    techniques: string[]
  }
}
```

## Related Documentation
- [Social Interactions](interactions.md)
- [Safety Guidelines](../safety/conditions.md)
- [Height Verification](../locations/height-verification.md)
- [User Preferences](../onboarding/user-preferences.md)
