# CliffVibe - Technical Specification

## MVP Architecture Overview

### Frontend (Next.js)
```
├── components/
│   ├── map/               # Location discovery
│   ├── safety/            # Safety indicators
│   ├── auth/              # User authentication
│   ├── community/         # Basic social features
│   └── events/            # Competition basics
├── pages/
│   ├── index.tsx          # Landing/map view
│   ├── spots/[id].tsx     # Location details
│   ├── events/            # Competition pages
│   ├── profile/           # User profiles
│   └── safety/            # Safety guidelines
└── styles/
    └── tailwind.css       # Styling system
```

### Backend (Supabase)
```
├── Authentication         # Social login
├── Database              # Core tables
├── Storage               # Media files
└── Real-time             # Basic chat/comments
```

### MVP Infrastructure
- Hosting: Vercel (frontend)
- Backend: Supabase
- Maps: OpenStreetMap
- Storage: Supabase Storage
- CDN: Cloudflare

## System Architecture

### Frontend
```
├── Next.js (React)
├── TypeScript
├── TailwindCSS
├── Components
│   ├── Map (Leaflet.js)
│   ├── LocationForm
│   ├── Chat
│   ├── Comments
│   └── MediaUpload
└── State Management (Zustand)
```

### Backend (Supabase)
```
├── Authentication
├── Real-time Database
├── Storage
└── Edge Functions
```

## Database Schema

### Tables

#### competition_events
```sql
CREATE TABLE competition_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'døds', 'highDiving', 'cliffDiving'
    description TEXT,
    location_id UUID REFERENCES locations(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    registration_deadline TIMESTAMPTZ,
    registration_url TEXT,
    max_participants INTEGER,
    organizer_id UUID REFERENCES auth.users(id),
    status VARCHAR(20) DEFAULT 'upcoming',
    rules TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE competition_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID REFERENCES competition_events(id),
    name VARCHAR(100) NOT NULL,
    min_age INTEGER,
    max_age INTEGER,
    gender VARCHAR(20),
    skill_level VARCHAR(50),
    style VARCHAR(50),  -- 'døds', 'technical', 'freestyle'
    height_meters DECIMAL(5,1),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE competition_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID REFERENCES competition_events(id),
    category_id UUID REFERENCES competition_categories(id),
    user_id UUID REFERENCES auth.users(id),
    status VARCHAR(20) DEFAULT 'pending',
    registration_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE competition_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID REFERENCES competition_events(id),
    category_id UUID REFERENCES competition_categories(id),
    user_id UUID REFERENCES auth.users(id),
    scores JSONB NOT NULL,  -- Store round-by-round scores
    final_score DECIMAL(10,2),
    rank INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

#### jumping_styles
```sql
CREATE TABLE jumping_styles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),  -- 'døds', 'technical', 'freestyle'
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    safety_requirements TEXT[],
    technique_steps TEXT[],
    recommended_height_range INT4RANGE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

#### locations
```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    location_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    status VARCHAR(20) DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ,
    moderation_notes TEXT,
    views_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2)
);
```

#### jump_points
```sql
CREATE TABLE jump_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    height_meters DECIMAL(5,1) NOT NULL,    -- Store to 0.1m precision
    water_depth_meters DECIMAL(4,1),        -- Store to 0.1m precision
    safety_rating INTEGER CHECK (safety_rating BETWEEN 1 AND 5),
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    seasonal_availability VARCHAR(50),
    accessibility_rating INTEGER CHECK (accessibility_rating BETWEEN 0 AND 5),
    approach_description TEXT,
    approach_difficulty INTEGER CHECK (approach_difficulty BETWEEN 1 AND 5),
    parking_coordinates POINT,
    trail_gpx TEXT,
    distance_from_parking INTEGER, -- in meters
    estimated_hike_time INTEGER, -- in minutes
    special_equipment TEXT[]
);
```

#### approach_waypoints
```sql
CREATE TABLE approach_waypoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    sequence_number INTEGER NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    description TEXT,
    image_url TEXT,
    critical_point BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### location_access_history
```sql
CREATE TABLE location_access_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    status_change_date TIMESTAMPTZ NOT NULL,
    previous_rating INTEGER,
    new_rating INTEGER,
    reason TEXT,
    reported_by UUID REFERENCES auth.users(id),
    verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMPTZ,
    verification_notes TEXT
);
```

#### media
```sql
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    jump_point_id UUID REFERENCES jump_points(id),
    type VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    status VARCHAR(20) DEFAULT 'pending'
);
```

#### comments
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    user_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    parent_id UUID REFERENCES comments(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    is_pinned BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active'
);
```

#### chat_messages
```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    user_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    type VARCHAR(20) DEFAULT 'text',
    status VARCHAR(20) DEFAULT 'active'
);
```

#### location_reports
```sql
CREATE TABLE location_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    reporter_id UUID REFERENCES auth.users(id),
    report_type VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT
);
```

#### statistics
```sql
CREATE TABLE statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value JSONB NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category, key)
);
```

#### user_statistics
```sql
CREATE TABLE user_statistics (
    user_id UUID REFERENCES auth.users(id),
    locations_added INTEGER DEFAULT 0,
    locations_verified INTEGER DEFAULT 0,
    comments_posted INTEGER DEFAULT 0,
    reports_submitted INTEGER DEFAULT 0,
    helpful_ratings INTEGER DEFAULT 0,
    total_visits INTEGER DEFAULT 0,
    last_active TIMESTAMPTZ,
    reputation_score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id)
);
```

#### location_statistics
```sql
CREATE TABLE location_statistics (
    location_id UUID REFERENCES locations(id),
    views_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    photos_count INTEGER DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    average_safety_rating DECIMAL(3,2),
    discovery_method VARCHAR(50),
    discoverer_type VARCHAR(50),
    scraper_version VARCHAR(50),
    facility_type VARCHAR(50),
    water_type VARCHAR(50),
    amenities JSONB,
    seasonal_access BOOLEAN DEFAULT true,
    last_activity TIMESTAMPTZ,
    seasonal_popularity JSONB,
    maintenance_info JSONB,
    certifications TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (location_id)
);
```

#### waterfall_stats
```sql
CREATE TABLE waterfall_stats (
    location_id UUID REFERENCES locations(id),
    flow_rate DECIMAL(10,2),
    seasonal_flow JSONB,
    water_depth_min_meters DECIMAL(4,1),
    water_depth_max_meters DECIMAL(4,1),
    depth_last_updated TIMESTAMPTZ,
    safe_jumping_conditions JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (location_id)
);
```

#### facility_stats
```sql
CREATE TABLE facility_stats (
    location_id UUID REFERENCES locations(id),
    facility_type VARCHAR(50) NOT NULL,
    board_heights_meters DECIMAL(5,1)[],   -- Store to 0.1m precision
    water_depth_meters DECIMAL(4,1) NOT NULL,
    last_maintenance TIMESTAMPTZ,
    next_maintenance TIMESTAMPTZ,
    restrictions TEXT[],
    operating_hours JSONB,
    equipment_details JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (location_id)
);
```

#### activity_log
```sql
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    action_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Endpoints

### Location & Accessibility Management
```typescript
// Create location with accessibility info
POST /api/locations
{
    // ... existing location fields ...
    accessibility: {
        rating: number // 0-5 (0 = closed, 1-5 = difficulty emoji)
        approach: {
            description: string
            difficulty: number // 1-5
            parkingCoords: {
                lat: number
                lng: number
            }
            trailGpx?: string
            distanceFromParking: number
            estimatedHikeTime: number
            specialEquipment: string[]
        }
        waypoints: Array<{
            latitude: number
            longitude: number
            description: string
            imageUrl?: string
            isCriticalPoint: boolean
            sequenceNumber: number
        }>
    }
}

// Update accessibility status
PATCH /api/locations/:id/accessibility
{
    rating: number
    reason: string
    reportedBy: string
}

// Get approach details
GET /api/locations/:id/approach
Response: {
    rating: number
    description: string
    difficulty: number
    parkingCoords: LatLng
    trailGpx?: string
    waypoints: Waypoint[]
    distanceFromParking: number
    estimatedHikeTime: number
    specialEquipment: string[]
    accessHistory: AccessHistoryEntry[]
}

// Add approach waypoint
POST /api/locations/:id/waypoints
{
    latitude: number
    longitude: number
    description: string
    imageUrl?: string
    isCriticalPoint: boolean
    sequenceNumber: number
}
```

interface AccessibilityEmoji {
    0: "🚫" // Closed/Inaccessible
    1: "😰" // Very Difficult
    2: "😓" // Difficult
    3: "😊" // Moderate
    4: "😄" // Easy
    5: "🤩" // Very Easy
}

interface AccessibilityRatingUI {
    // Simple, modern rating interface
    type: 'emoji-selector'
    options: {
        layout: 'horizontal'
        size: 'large'
        interactive: true
        animationType: 'bounce'
        showLabels: boolean
        showTooltips: boolean
        instant: boolean // Update immediately on selection
    }
    labels: {
        0: 'Closed'
        1: 'Expert Only'
        2: 'Challenging'
        3: 'Moderate'
        4: 'Simple'
        5: 'Super Easy'
    }
    appearance: {
        spacing: string
        activeScale: number
        inactiveOpacity: number
        hoverEffect: 'grow' | 'glow'
        selectedEffect: 'bounce' | 'pulse'
        backgroundColor: string
        containerStyle: 'floating' | 'inline' | 'modal'
    }
}

### Rating Interface Components
```typescript
// Modern rating component
interface RatingSelector {
    value: number
    onChange: (rating: number) => void
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    showLabels?: boolean
    tooltipPlacement?: 'top' | 'bottom'
    appearance?: {
        theme: 'light' | 'dark'
        style: 'modern' | 'minimal'
        animation: 'smooth' | 'bounce'
    }
}

// Quick rating modal
interface QuickRatingModal {
    isOpen: boolean
    onClose: () => void
    onSubmit: (rating: number) => Promise<void>
    preselectedValue?: number
    showDescription?: boolean
    position: 'center' | 'bottom'
    closeOnBackdropClick?: boolean
}

### Location Management
```typescript
{
    name: string
    description: string
    latitude: number
    longitude: number
    location_type: string
    jump_points: Array<{
        height: number
        water_depth: number
        safety_rating: number
        difficulty_level: number
        notes: string
    }>
    media: Array<File>
}

// Get locations
GET /api/locations
Query params:
    - bounds: LatLngBounds
    - types: string[]
    - minHeight: number
    - maxHeight: number
    - safety: number
    - difficulty: number

// Get location details
GET /api/locations/:id

// Update location
PATCH /api/locations/:id

// Report location
POST /api/locations/:id/report
```

### Media Management
```typescript
// Upload media
POST /api/media
Multipart form data:
    - file: File
    - location_id: string
    - jump_point_id?: string

// Get media for location
GET /api/locations/:id/media

// Delete media
DELETE /api/media/:id
```

### Statistics & Analytics API

```typescript
// Get user statistics
GET /api/users/:id/statistics

// Get location statistics
GET /api/locations/:id/statistics

// Get global statistics
GET /api/statistics
Query params:
    - category: string
    - timeRange: string
    - groupBy: string

// Update statistics
POST /api/statistics/:category
{
    key: string
    value: any
}

// Get activity log
GET /api/activity-log
Query params:
    - userId?: string
    - actionType?: string
    - entityType?: string
    - startDate?: string
    - endDate?: string
    - limit?: number
    - offset?: number
```

### Comments & Chat
```typescript
// Post comment
POST /api/locations/:id/comments
{
    content: string
    parent_id?: string
}

// Get comments
GET /api/locations/:id/comments

// Send chat message
POST /api/locations/:id/chat
{
    content: string
    type: 'text' | 'image'
}

// Get chat history
GET /api/locations/:id/chat
Query params:
    - before: timestamp
    - limit: number
```

## Statistics & Analytics System

### Tracking Implementations
```typescript
interface StatisticsTracker {
    trackUserActivity(userId: string, action: string): Promise<void>
    trackLocationActivity(locationId: string, action: string): Promise<void>
    updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void>
    updateLocationStats(locationId: string, stats: Partial<LocationStats>): Promise<void>
    generateReport(params: ReportParams): Promise<Report>
}

interface ActivityLogger {
    logAction(params: {
        userId: string
        actionType: string
        entityType: string
        entityId: string
        metadata?: Record<string, any>
    }): Promise<void>
}

// Analytics aggregation
interface AnalyticsAggregator {
    aggregateUserActivity(timeRange: TimeRange): Promise<UserActivityReport>
    aggregateLocationPopularity(timeRange: TimeRange): Promise<LocationPopularityReport>
    generateTrends(params: TrendParams): Promise<TrendReport>
}
```

### Real-time Analytics
```typescript
interface RealtimeStats {
    activeUsers: number
    newLocations24h: number
    totalComments24h: number
    popularLocations: Array<{
        id: string
        name: string
        activity: number
    }>
}

// WebSocket subscription
const statsSubscription = supabase
    .channel('realtime-stats')
    .on('presence', { event: 'sync' }, () => {
        // Update active users count
    })
    .subscribe()
```

## Search & Scraping System

### Google Maps Scraping
```typescript
interface ScrapingConfig {
    keywords: {
        activities: string[]
        locations: string[]
        descriptors: string[]
    }
    languages: string[]
    searchRadius: number
    maxResults: number
    rateLimits: {
        requestsPerDay: number
        requestsPerMinute: number
        maxConcurrent: number
    }
}

interface LocationValidator {
    validateCoordinates(): boolean
    validatePhotos(): boolean
    validateReviews(): boolean
    checkRestrictions(): boolean
    calculateConfidenceScore(): number
}
```

### Search Implementation
```typescript
interface SearchParams {
    query?: string
    bounds?: LatLngBounds
    filters: {
        types: string[]
        height: {
            min?: number
            max?: number
        }
        safety?: number
        difficulty?: number
        verified?: boolean
        facilityType?: 'natural' | 'constructed'
        waterType?: 'ocean' | 'lake' | 'river' | 'pool' | 'waterfall'
        amenities?: string[]
        seasonalAccess?: boolean
    }
    sort: 'rating' | 'distance' | 'popularity' | 'height' | 'safety'
}

interface WaterfallStats {
    flowRate?: number // cubic meters per second
    seasonalFlow: Record<string, boolean> // monthly availability
    waterDepthVariation: {
        min: number
        max: number
        lastUpdated: Date
    }
}

interface DivingFacilityStats {
    facilityType: 'public' | 'private' | 'competition'
    boardHeights: number[]
    waterDepth: number
    maintenanceSchedule?: {
        lastMaintenance: Date
        nextMaintenance: Date
    }
    certifications: string[]
    restrictions: string[]
}

interface LocationTypeStats {
    natural: {
        cliff: number
        waterfall: number
        cave: number
        bridge: number
    }
    constructed: {
        divingPlatform: number
        pool: number
        trainingFacility: number
    }
}
```

## Scraper Version Control

### Scraper Configuration
```typescript
interface ScraperVersion {
    version: string
    name: string
    features: string[]
    enabled: boolean
    configParams: Record<string, any>
    lastRun: Date
    successRate: number
}

interface ScraperStats {
    totalLocationsFound: number
    validLocationsAdded: number
    invalidLocationsFiltered: number
    processingTime: number
    errorRate: number
}
```

### Scraper Registry
```typescript
class ScraperRegistry {
    registerVersion(version: ScraperVersion): void
    enableVersion(version: string): void
    disableVersion(version: string): void
    getStats(version: string): ScraperStats
    compareVersions(version1: string, version2: string): ComparisonResult
}
```

## Security Measures

### Authentication
- Supabase Auth with multiple providers
- JWT token management
- Role-based access control

### Data Protection
- Row Level Security (RLS) policies
- Input validation
- SQL injection prevention
- XSS protection

### Media Security
- File type validation
- Size limits
- Virus scanning
- Metadata stripping

## Performance Optimization

### Caching Strategy
```typescript
interface CacheConfig {
    locations: {
        ttl: 3600 // 1 hour
        maxEntries: 1000
    }
    media: {
        ttl: 86400 // 24 hours
        maxSize: '1GB'
    }
    search: {
        ttl: 300 // 5 minutes
        maxEntries: 100
    }
}
```

### Database Indexes
```sql
CREATE INDEX idx_locations_coordinates 
ON locations USING gist (
    ll_to_earth(latitude, longitude)
);

CREATE INDEX idx_locations_type_status 
ON locations(location_type, status);

CREATE INDEX idx_jump_points_location 
ON jump_points(location_id);

CREATE INDEX idx_media_location 
ON media(location_id);

CREATE INDEX idx_comments_location 
ON comments(location_id);

CREATE INDEX idx_waterfall_stats_location 
ON waterfall_stats(location_id);

CREATE INDEX idx_facility_stats_location 
ON facility_stats(location_id);

CREATE INDEX idx_facility_stats_type 
ON facility_stats(facility_type);
```

## Location Specific APIs
```typescript
// Waterfall specific endpoints
GET /api/locations/:id/waterfall-stats
POST /api/locations/:id/waterfall-stats
{
    flowRate?: number
    seasonalFlow: Record<string, boolean>
    waterDepthVariation: {
        min: number
        max: number
    }
}

// Facility specific endpoints
GET /api/locations/:id/facility-stats
POST /api/locations/:id/facility-stats
{
    facilityType: 'public' | 'private' | 'competition'
    boardHeights: number[]
    waterDepth: number
    maintenanceSchedule?: {
        lastMaintenance: string
        nextMaintenance: string
    }
    restrictions: string[]
    operatingHours: Record<string, string>
}

// Location type statistics
GET /api/statistics/location-types
Response:
{
    natural: {
        cliff: number
        waterfall: number
        cave: number
        bridge: number
    }
    constructed: {
        divingPlatform: number
        pool: number
        trainingFacility: number
    }
}
```

## Deployment

### Infrastructure
- Vercel for frontend hosting
- Supabase for backend services
- Cloudflare for CDN
- GitHub Actions for CI/CD

### Environment Configuration
```typescript
interface Config {
    supabase: {
        url: string
        anonKey: string
        serviceRole: string
    }
    maps: {
        apiKey: string
        defaultCenter: LatLng
        defaultZoom: number
    }
    media: {
        maxSize: number
        allowedTypes: string[]
        storageUrl: string
    }
    measurements: {
        heightPrecision: 1,       // decimal places for height
        depthPrecision: 1,       // decimal places for depth
        defaultUnits: {
            height: 'meters',
            windSpeed: 'kmh',
            temperature: 'celsius'
        }
    }
    weather: {
        windSpeedThresholds: {
            '0-10m': { max: 20 },    // km/h
            '10-15m': { max: 15 },
            '15-20m': { max: 12 },
            '20m+': { max: 8 }
        },
        updateInterval: 300,      // seconds
        providers: string[]
    }
}
```

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- API endpoint testing
- Validation logic testing

### Integration Tests
- User flows
- Data persistence
- Real-time functionality

### E2E Tests
- Critical user journeys
- Cross-browser testing
- Mobile responsiveness

## Monitoring

### Metrics
- Response times
- Error rates
- User engagement
- Resource usage

### Alerting
- Service disruptions
- Error spikes
- Performance degradation
- Storage limits

## Documentation

### API Documentation
- OpenAPI/Swagger specification
- Integration guides
- Authentication flows

### Development Guide
- Setup instructions
- Coding standards
- Git workflow
- Release process
