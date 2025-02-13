# CliffVibe Competition Management System

## MVP Implementation (Phase 1)

### Core Features
```typescript
interface MVPCompetitions {
  events: {
    basic: {
      registration: boolean    // Simple sign-up
      calendar: boolean        // Basic event listing
      results: boolean        // Manual result entry
      photos: boolean         // Basic photo uploads
    }
    types: {
      local: boolean          // Small local events
      community: boolean      // Community gatherings
    }
    features: {
      discover: boolean       // Find nearby events
      participate: boolean    // Join events
      results: boolean        // View outcomes
    }
  }
}
```

### Initial Scope
- Basic event creation
- Simple registration
- Results posting
- Photo sharing
- Location-based discovery

## Overview
Comprehensive competition management system for organizing, participating in, and tracking cliff jumping events, with special focus on døds (death diving) and other diving styles.

## Competition Types

### Døds (Death Diving)
- Norwegian extreme sport competition format
- Spread eagle position maintained as long as possible
- Last-second tuck to break surface tension
- Standard 10m platform height
- Scoring based on:
  * Form maintenance
  * Time in spread position
  * Entry technique
  * Overall style

### High Diving
- Professional platform diving
- Heights: 20-27m
- Technical scoring system
- Multiple rounds
- Focus on:
  * Difficulty
  * Execution
  * Entry quality

### Cliff Diving
- Natural terrain competitions
- Variable heights (10-30m)
- Adaptation to conditions
- Scoring includes:
  * Technical difficulty
  * Artistic impression
  * Entry quality
  * Environmental adaptation

## Competition System

### Event Creation
```typescript
interface CompetitionEvent {
  basics: {
    title: string
    type: 'døds' | 'highDiving' | 'cliffDiving' | 'mixed'
    description: string
    dates: {
      start: Date
      end: Date
      registrationDeadline: Date
    }
  }
  location: {
    id: string
    name: string
    coordinates: LatLng
    facilities: string[]
    accessInfo: string
  }
  categories: Array<{
    name: string
    type: string
    minAge: number
    maxAge: number
    gender?: 'men' | 'women' | 'all'
    skillLevel: string
    maxParticipants: number
  }>
  organization: {
    organizer: string
    contact: string
    staff: Array<{
      role: string
      name: string
    }>
    sponsors: string[]
  }
  registration: {
    fee: number
    deadline: Date
    requirements: string[]
    waiverForm: string
    insuranceRequirements: string[]
  }
}
```

### Registration System
```typescript
interface Registration {
  participant: {
    userId: string
    name: string
    age: number
    experience: string
    emergencyContact: string
  }
  category: {
    id: string
    name: string
    type: string
  }
  status: 'pending' | 'approved' | 'waitlist' | 'declined'
  payment: {
    amount: number
    status: string
    transactionId: string
  }
  documents: {
    waiver: boolean
    insurance: boolean
    medicalClearance: boolean
  }
  timestamp: Date
}
```

### Scoring System
```typescript
interface ScoringSystem {
  døds: {
    formPoints: number    // 0-10
    timeInPosition: number // seconds
    entryQuality: number  // 0-10
    style: number         // 0-10
    totalScore: number    // Calculated
  }
  highDiving: {
    difficulty: number
    execution: Array<number>  // Judge scores
    entry: number
    totalScore: number
  }
  cliffDiving: {
    technical: number
    artistic: number
    entry: number
    environmental: number
    totalScore: number
  }
}
```

## Calendar Features

### Event Calendar
```typescript
interface EventCalendar {
  views: {
    month: {
      events: CalendarEvent[]
      highlights: string[]
    }
    list: {
      upcoming: Event[]
      past: Event[]
    }
    map: {
      locations: Location[]
      clusters: Cluster[]
    }
  }
  filters: {
    types: string[]
    locations: string[]
    dates: DateRange
    skillLevels: string[]
  }
  synchronization: {
    google: boolean
    apple: boolean
    outlook: boolean
    ical: string
  }
}
```

### Event Notifications
```typescript
interface EventNotifications {
  types: {
    registration: {
      opening: boolean
      deadline: boolean
      confirmation: boolean
    }
    competition: {
      reminder: boolean
      schedule: boolean
      results: boolean
    }
    special: {
      weatherAlert: boolean
      schedule: boolean
      venue: boolean
    }
  }
  preferences: {
    channels: string[]  // email, push, SMS
    frequency: string
    timing: number      // hours before event
  }
}
```

## Results Management

### Live Scoring
```typescript
interface LiveScoring {
  current: {
    athlete: string
    category: string
    attempt: number
    scores: number[]
    rank: number
  }
  leaderboard: {
    category: string
    rankings: Array<{
      position: number
      athlete: string
      score: number
      status: string
    }>
  }
  display: {
    main: string       // Current diver
    upcoming: string[] // Next 3 divers
    results: string[]  // Latest scores
  }
}
```

### Results Database
```typescript
interface CompetitionResults {
  event: {
    id: string
    name: string
    date: Date
    location: string
  }
  categories: Array<{
    name: string
    participants: number
    results: Array<{
      position: number
      athlete: string
      scores: number[]
      total: number
      notes: string
    }>
  }>
  records: {
    broken: boolean
    details: string
    holder: string
    value: number
  }
}
```

## Safety Management

### Safety Requirements
- Medical staff on-site
- Water rescue team
- Wind monitoring
- Depth verification
- Platform inspection
- Emergency procedures
- Communication system
- First aid stations

### Risk Assessment
```typescript
interface SafetyCheck {
  weather: {
    wind: WindConditions
    visibility: number
    temperature: number
  }
  facilities: {
    platform: boolean
    water: boolean
    rescue: boolean
    medical: boolean
  }
  personnel: {
    medical: boolean
    rescue: boolean
    judges: boolean
    staff: boolean
  }
  status: 'go' | 'caution' | 'no-go'
}
```

## Related Documentation
- [Jumping Styles](../styles/jumping-styles.md)
- [Wind Analysis](../safety/wind-analysis.md)
- [Height Verification](../locations/height-verification.md)
- [User Profiles](../social/profiles.md)
