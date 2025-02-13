# CliffVibe Deployment Guide

## Infrastructure Overview

### Production Environment
```typescript
interface ProductionInfrastructure {
  frontend: {
    platform: 'Vercel',
    regions: ['eu-central-1', 'eu-west-1'],
    features: [
      'Edge Functions',
      'Image Optimization',
      'Automatic HTTPS',
      'CDN Integration'
    ]
  },
  backend: {
    platform: 'Supabase',
    region: 'eu-central-1',
    features: [
      'PostgreSQL',
      'Authentication',
      'Storage',
      'Edge Functions'
    ]
  },
  cdn: {
    platform: 'Cloudflare',
    features: [
      'R2 Storage',
      'Edge Caching',
      'DDoS Protection',
      'SSL/TLS'
    ]
  }
}
```

## Initial Setup

### Domain Configuration
1. **DNS Setup**
```bash
# Primary domain
cliffvibe.com -> Vercel
api.cliffvibe.com -> Supabase
cdn.cliffvibe.com -> Cloudflare R2

# Community domain
cliffvibe.org -> Vercel
```

2. **SSL Certificates**
```bash
# Automatic SSL with Vercel
DOMAIN=cliffvibe.com
vercel domains add $DOMAIN

# Cloudflare SSL
- Enable Full (strict) SSL/TLS encryption
- Configure SSL certificates for subdomains
```

## Frontend Deployment (Vercel)

### Environment Setup
```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://cliffvibe.com
NEXT_PUBLIC_API_URL=https://api.cliffvibe.com
NEXT_PUBLIC_CDN_URL=https://cdn.cliffvibe.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Deployment Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["fra1", "lhr1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Build Settings
```bash
# Build command
npm run build

# Output directory
.next

# Install dependencies
pnpm install --frozen-lockfile
```

## Backend Deployment (Supabase)

### Database Migration
```bash
# Link to production
supabase link --project-ref your-project-ref

# Push schema changes
supabase db push

# Verify migration
supabase db status
```

### Edge Functions
```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy process-image

# Set secrets
supabase secrets set --env-file ./supabase/.env.production
```

### Storage Configuration
```sql
-- Create storage buckets
INSERT INTO storage.buckets
  (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('locations', 'locations', true, 52428800, '{image/*}'),
  ('documents', 'documents', false, 10485760, '{application/pdf}');

-- Set bucket policies
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'locations');
```

## CDN Configuration (Cloudflare)

### R2 Setup
```bash
# Create R2 bucket
wrangler r2 bucket create cliffvibe-media

# Configure CORS
wrangler r2 bucket cors set cliffvibe-media \
  --allowed-origins="https://cliffvibe.com" \
  --allowed-methods="GET,PUT" \
  --max-age=86400
```

### Cache Rules
```json
{
  "cache_rules": [
    {
      "match": "cdn.cliffvibe.com/*",
      "browser_ttl": 86400,
      "edge_ttl": 604800
    },
    {
      "match": "*.cliffvibe.com/static/*",
      "browser_ttl": 31536000,
      "edge_ttl": 31536000
    }
  ]
}
```

## Monitoring Setup

### Performance Monitoring
```typescript
interface MonitoringConfig {
  metrics: {
    vercel: [
      'Page Load Time',
      'Time to First Byte',
      'Core Web Vitals'
    ],
    supabase: [
      'Database Connections',
      'Query Performance',
      'Storage Usage'
    ]
  },
  alerts: {
    performance: {
      pageLoadThreshold: '3s',
      apiLatencyThreshold: '1s'
    },
    error: {
      errorRateThreshold: '1%',
      notify: ['email', 'slack']
    }
  }
}
```

### Error Tracking
```typescript
interface ErrorTracking {
  sentry: {
    dsn: string,
    environment: 'production',
    tracesSampleRate: 0.1
  },
  logging: {
    supabase: true,
    vercel: true,
    cloudflare: true
  }
}
```

## Security Configuration

### CORS Settings
```typescript
interface CorsConfig {
  origins: [
    'https://cliffvibe.com',
    'https://cliffvibe.org'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: [
    'Authorization',
    'Content-Type',
    'X-Client-Info'
  ],
  credentials: true
}
```

### Rate Limiting
```typescript
interface RateLimits {
  api: {
    anonymous: '100/minute',
    authenticated: '1000/minute'
  },
  auth: {
    login: '5/minute',
    signup: '3/minute'
  },
  media: {
    upload: '50/hour'
  }
}
```

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
supabase db dump -f backup.sql

# Store in secure location
aws s3 cp backup.sql s3://cliffvibe-backups/$(date +%Y%m%d)/
```

### Media Backups
```bash
# R2 cross-region replication
wrangler r2 bucket create cliffvibe-media-backup --location eu-west-1
```

## Scaling Configuration

### Resources
```typescript
interface ScalingConfig {
  vercel: {
    minimumInstances: 1,
    maximumInstances: 10,
    targetConcurrency: 100
  },
  supabase: {
    computeSize: 'medium',
    maxConnections: 100,
    poolSize: 50
  },
  r2: {
    storageLimit: '1TB',
    requestsPerSecond: 1000
  }
}
```

## Maintenance Procedures

### Zero-Downtime Updates
```bash
# Frontend deployment
vercel deploy --prod

# Database migrations
supabase db reset --no-backup

# Edge functions
supabase functions deploy
```

### Health Checks
```bash
# API health check
curl https://api.cliffvibe.com/health

# Database connection check
supabase db ping

# Storage check
curl https://cdn.cliffvibe.com/health
```

## Rollback Procedures

### Frontend Rollback
```bash
# Revert to previous deployment
vercel rollback

# Verify rollback
vercel list
```

### Database Rollback
```bash
# Restore from backup
supabase db restore backup.sql

# Verify data
supabase db reset --no-backup
```

## Next Steps
1. [CI/CD Pipeline Setup](./ci-cd.md)
2. [Monitoring Guide](./monitoring.md)
3. [Backup & Recovery](./backup.md)
4. [Performance Tuning](./performance.md)
