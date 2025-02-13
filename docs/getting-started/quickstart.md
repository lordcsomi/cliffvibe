# CliffVibe Quickstart Guide

## Overview
CliffVibe is a community-driven platform for discovering and sharing cliff jumping locations across the EU, with a focus on safety, competition management, and social features.

## Quick Setup

### Prerequisites
```bash
# Required
- Node.js 18+
- PostgreSQL 15+
- Supabase CLI

# Optional
- Docker
- pnpm (recommended)
```

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/cliffvibe.git
cd cliffvibe

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Setup
```bash
# Required variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_key

# Optional services
NEXT_PUBLIC_EMODNET_KEY=your_emodnet_key
NEXT_PUBLIC_COPERNICUS_KEY=your_copernicus_key
```

### Development
```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Core Technologies

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Mapbox GL JS
- Zustand

### Backend
- Supabase
- PostgreSQL
- Edge Functions
- R2 Storage

## Initial Setup Costs

### Development Environment
- Vercel Pro: €20/mo
- Supabase Pro: €25/mo
- R2 Storage: €5/mo
- Mapbox: €50/mo
- Weather API: €25/mo
- Marine Data: Free (EU Services)

### Domains (Yearly)
- cliffvibe.com: €15/yr
- Additional TLDs: €30/yr

## Next Steps
1. [Complete Installation Guide](installation.md)
2. [Architecture Overview](architecture.md)
3. [Feature Documentation](../features/README.md)
4. [API Documentation](../technical/api/README.md)
