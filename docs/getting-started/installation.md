# CliffVibe Installation Guide

## Detailed Setup Guide

### System Requirements

#### Minimum Hardware
```bash
CPU: 2+ cores
RAM: 4GB+
Storage: 20GB+
```

#### Software Requirements
```bash
# Required
Node.js: ^18.17.0 || >=20.3.0
PostgreSQL: >=15.0
pnpm: >=8.0.0

# Development Tools
Git
VS Code (recommended)
Docker (optional)
```

### Step-by-Step Installation

1. **Clone Repository**
```bash
git clone https://github.com/your-username/cliffvibe.git
cd cliffvibe
```

2. **Install Dependencies**
```bash
# Install pnpm if not installed
npm install -g pnpm

# Install project dependencies
pnpm install

# Install additional development tools
pnpm add -D @types/node @types/react typescript @typescript-eslint/eslint-plugin
```

3. **Database Setup**
```bash
# Using Supabase CLI
supabase init
supabase start

# Or using Docker
docker-compose up -d
```

4. **Environment Configuration**

Create `.env.local`:
```bash
# Core
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Storage
NEXT_PUBLIC_R2_ACCOUNT_ID=your_r2_account_id
NEXT_PUBLIC_R2_ACCESS_KEY=your_r2_access_key
NEXT_PUBLIC_R2_SECRET_KEY=your_r2_secret_key

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# APIs
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_key
NEXT_PUBLIC_EMODNET_KEY=your_emodnet_key
NEXT_PUBLIC_COPERNICUS_KEY=your_copernicus_key
```

5. **Database Migration**
```bash
# Generate types
pnpm supabase gen types typescript --project-id your-project-id > types/supabase.ts

# Run migrations
pnpm supabase db reset
```

### Development Server

1. **Start Local Development**
```bash
# Start development server
pnpm dev

# In another terminal, start Supabase
pnpm supabase start
```

2. **Access Development Environment**
```
Frontend: http://localhost:3000
Supabase Studio: http://localhost:54323
```

### Testing Setup

1. **Install Testing Dependencies**
```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom
```

2. **Configure Jest**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}
```

3. **Run Tests**
```bash
# Run all tests
pnpm test

# Run with watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

### Production Build

1. **Build Application**
```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

2. **Verify Build**
```bash
# Check build output
ls .next

# Test production build locally
pnpm start
```

### Common Issues & Solutions

#### Supabase Connection
```bash
Error: Failed to connect to Supabase
Solution: Check SUPABASE_URL and ANON_KEY in .env.local
```

#### Dependencies Resolution
```bash
Error: Incompatible dependencies
Solution: Delete node_modules and pnpm-lock.yaml, then run pnpm install
```

#### TypeScript Errors
```bash
Error: Type checking failed
Solution: Run pnpm type-check to identify issues
```

### Additional Configuration

#### VS Code Setup
```json
// Recommended extensions
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-azuretools.vscode-docker"
  ]
}
```

#### Git Configuration
```bash
# Configure Git hooks
pnpm husky install

# Setup commit message validation
pnpm commitlint init
```

### Next Steps
1. [Architecture Overview](architecture.md)
2. [Local Development Guide](../technical/frontend/development.md)
3. [API Documentation](../technical/api/README.md)
