# Height Verification System

## Overview
The height verification system establishes standards and procedures for accurately measuring and verifying cliff heights, primarily using tape measurements as the trusted method.

## Verification Methods

### 📏 Tape Measurement (Primary Method)
```typescript
interface TapeMeasurement {
  height: number        // in meters
  measurementDate: Date
  measuredBy: string
  verifiedBy?: string
  equipment: {
    tapeType: string
    tapeLength: number
    calibrationDate?: Date
  }
  conditions: {
    windSpeed: number
    weather: string
    visibility: string
  }
}
```

#### Measurement Process
1. Equipment Setup
   - Heavy-duty measuring tape
   - Safety equipment
   - Documentation tools
   - Verification witnesses

2. Measurement Steps
   - Secure top anchor point
   - Lower tape to water level
   - Account for water conditions
   - Multiple measurements
   - Photo documentation

3. Verification Requirements
   - Minimum 2 measurements
   - Maximum 10cm variance
   - Clear documentation
   - Witness signatures

## Verification Status

### Badge System
```typescript
interface VerificationBadge {
  status: 'verified' | 'pending' | 'disputed'
  icon: {
    verified: '✓',
    pending: '⏳',
    disputed: '❓'
  }
  details: {
    verificationDate: Date
    verifiedBy: string[]
    method: 'tape' | 'other'
    confidence: number    // 0-100%
  }
}
```

### Status Types
1. ✓ Competition Verified
   - Official measurement
   - Multiple verifications
   - Competition history
   - Regular checks

2. ✓ Professional Verified
   - Expert measurement
   - Documented process
   - Multiple witnesses
   - Regular validation

3. 👥 Community Verified
   - Multiple measurements
   - Photo evidence
   - Regular updates
   - Community consensus

## Display Format

### Verified Locations
```typescript
interface VerifiedHeight {
  mainHeight: {
    meters: number
    feet: number
    verified: boolean
    measurementDate: Date
  }
  display: {
    primary: string    // "15.2m ✓ VERIFIED"
    secondary: string  // "📏 Tape measured"
    details: string    // "🏆 Competition certified"
  }
}
```

### Regular Locations
```typescript
interface CommunityHeight {
  approximateHeight: {
    meters: number
    feet: number
    lastUpdated: Date
  }
  display: {
    primary: string    // "~15m"
    secondary: string  // "📱 App estimated"
    confidence: number // 0-100%
  }
}
```

## Historical Data

### Competition Records
```typescript
interface CompetitionRecord {
  eventName: string
  date: Date
  officialHeight: number
  measuring: {
    team: string[]
    method: string
    equipment: string[]
  }
  documentation: {
    photos: string[]
    videos: string[]
    certificates: string[]
  }
}
```

### Measurement History
- Original verification
- Regular check dates
- Height changes
- Method used
- Verifier details

## Verification Process

### Initial Verification
1. Request Submission
   - Location details
   - Approximate height
   - Access information
   - Contact person

2. Measurement Planning
   - Schedule date
   - Team assignment
   - Equipment check
   - Weather monitoring

3. On-site Verification
   - Safety check
   - Multiple measurements
   - Photo/video documentation
   - Witness signatures

4. Documentation
   - Official forms
   - Measurement data
   - Media evidence
   - Team signatures

### Regular Validation
- Annual checks
- Post-event verification
- Dispute resolution
- Update procedures

## Related Documentation
- [Multi-spot Marking](multi-spot-marking.md)
- [Safety Standards](../safety/conditions.md)
- [Competition Guidelines](../features/social/interactions.md)
- [Dispute Resolution](../features/social/interactions.md#disputes)
