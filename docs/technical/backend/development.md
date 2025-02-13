# CliffVibe Backend Development Guide

## Supabase Architecture

### Core Services
```typescript
interface BackendServices {
  database: 'PostgreSQL 15+',
  auth: 'GoTrue',
  storage: 'R2',
  realtime: 'WebSocket',
  edge: 'Edge Functions'
}
```

## Database Schema

### Location Management
```sql
-- Example location-related tables
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  coordinates POINT NOT NULL,
  height_meters DECIMAL(5,1),
  water_depth_meters DECIMAL(4,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable PostGIS for spatial queries
CREATE EXTENSION postgis;
CREATE INDEX location_coordinates_idx ON locations USING gist(coordinates);
```

### Row Level Security
```sql
-- Example RLS policies
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Read access
CREATE POLICY "Locations are viewable by everyone"
ON locations FOR SELECT
USING (true);

-- Create access
CREATE POLICY "Authenticated users can create locations"
ON locations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Update access
CREATE POLICY "Users can update their own locations"
ON locations FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);
```

## Edge Functions

### Function Structure
```typescript
// supabase/functions/process-image/index.ts
import { serve } from 'std/server'
import { createClient } from '@supabase/supabase-js'

interface ProcessImageRequest {
  imageUrl: string
  locationId: string
}

serve(async (req) => {
  try {
    const { imageUrl, locationId } = await req.json()
    // Process image logic
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    )
  }
})
```

## Authentication

### Auth Configuration
```typescript
interface AuthConfig {
  providers: {
    email: {
      enabled: true,
      doubleOptIn: true
    },
    oauth: {
      google: true,
      facebook: true,
      apple: true
    }
  },
  security: {
    refreshTokens: true,
    sessionDuration: 3600,
    passwordPolicy: {
      minLength: 8,
      requireNumbers: true,
      requireSpecialChars: true
    }
  }
}
```

## Storage Management

### Upload Configuration
```typescript
interface StorageConfig {
  buckets: {
    locations: {
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxSize: 10 * 1024 * 1024, // 10MB
      transformations: {
        thumbnail: {
          width: 200,
          height: 200,
          format: 'webp'
        },
        preview: {
          width: 800,
          height: 600,
          format: 'webp'
        }
      }
    },
    documents: {
      allowedMimeTypes: ['application/pdf'],
      maxSize: 5 * 1024 * 1024 // 5MB
    }
  }
}
```

## Database Functions

### Custom Functions
```sql
-- Example spatial function
CREATE OR REPLACE FUNCTION nearby_locations(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_meters INTEGER
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  distance DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.name,
    ST_Distance(
      l.coordinates::geography,
      ST_MakePoint(lng, lat)::geography
    ) as distance
  FROM locations l
  WHERE ST_DWithin(
    l.coordinates::geography,
    ST_MakePoint(lng, lat)::geography,
    radius_meters
  )
  ORDER BY distance;
END;
$$;
```

## Realtime Subscriptions

### Channel Configuration
```typescript
interface RealtimeConfig {
  channels: {
    locations: {
      events: ['INSERT', 'UPDATE', 'DELETE'],
      filters: ['id', 'created_by']
    },
    chat: {
      events: ['INSERT'],
      filters: ['location_id']
    }
  }
}

// Example subscription
const subscription = supabase
  .channel('locations')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'locations'
    },
    (payload) => {
      // Handle change
    }
  )
  .subscribe()
```

## API Rate Limiting

### Rate Limit Configuration
```typescript
interface RateLimits {
  anonymous: {
    reads: '100/minute',
    writes: '10/minute'
  },
  authenticated: {
    reads: '1000/minute',
    writes: '100/minute'
  },
  storage: {
    uploads: '50/hour',
    downloads: '500/hour'
  }
}
```

## Error Handling

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: unknown
  }
  status: number
}

// Example error handler
function handleDatabaseError(error: Error): ErrorResponse {
  if (error instanceof PostgresError) {
    return {
      error: {
        code: 'DATABASE_ERROR',
        message: 'Database operation failed',
        details: error.details
      },
      status: 500
    }
  }
  // Handle other error types
}
```

## Monitoring & Logging

### Logging Configuration
```typescript
interface LoggingConfig {
  levels: ['debug', 'info', 'warn', 'error'],
  destinations: {
    console: true,
    supabase: true,
    externalService: string
  },
  metadata: {
    environment: string,
    region: string,
    version: string
  }
}
```

## Development Workflow

### Local Development
```bash
# Start Supabase locally
supabase start

# Apply migrations
supabase db reset

# Deploy Edge Function
supabase functions deploy process-image

# Generate types
supabase gen types typescript --local > types/supabase.ts
```

### Database Migrations
```bash
# Create new migration
supabase migration new feature-name

# Apply migrations
supabase db reset

# Check migration status
supabase db status
```

## Deployment

### Production Deployment
```bash
# Link to project
supabase link --project-ref your-project-ref

# Deploy migrations
supabase db push

# Deploy Edge Functions
supabase functions deploy

# Verify deployment
supabase status
```

## Security Best Practices

1. Always use RLS policies
2. Validate all user input
3. Use prepared statements
4. Implement rate limiting
5. Regular security audits
6. Monitor for unusual activity

## Performance Tips

1. Use appropriate indexes
2. Optimize queries
3. Implement caching
4. Use connection pooling
5. Monitor query performance
6. Regular maintenance

## Next Steps
1. [Database Schema Guide](./database/README.md)
2. [Auth Configuration Guide](./auth/README.md)
3. [Edge Functions Guide](./edge-functions/README.md)
4. [Storage Management Guide](./storage/README.md)
