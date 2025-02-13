# CliffVibe Database Schema

## Overview

CliffVibe uses PostgreSQL 15+ with PostGIS extension for spatial data management. All tables implement Row Level Security (RLS) for data protection.

## Core Tables

### Users
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any profile"
  ON users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);
```

### Locations
```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  coordinates POINT NOT NULL,
  height_meters DECIMAL(5,1),
  water_depth_meters DECIMAL(4,1),
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard', 'expert')),
  access_type TEXT CHECK (access_type IN ('public', 'private', 'restricted')),
  seasons JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'flagged')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index
CREATE INDEX location_coordinates_idx ON locations USING gist(coordinates);

-- RLS Policies
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Locations are viewable by everyone"
  ON locations FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create locations"
  ON locations FOR INSERT TO authenticated
  WITH CHECK (true);
```

### Safety Records
```sql
CREATE TABLE safety_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id),
  recorded_by UUID REFERENCES users(id),
  water_depth_meters DECIMAL(4,1),
  tide_status TEXT,
  weather_conditions JSONB,
  hazards TEXT[],
  recommendations TEXT,
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE safety_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Safety records are viewable by everyone"
  ON safety_records FOR SELECT USING (true);

CREATE POLICY "Verified users can create safety records"
  ON safety_records FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND experience_level IN ('advanced', 'expert')
  ));
```

### Media
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id),
  uploaded_by UUID REFERENCES users(id),
  type TEXT CHECK (type IN ('image', 'video', 'document')),
  url TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT TO authenticated
  WITH CHECK (true);
```

### Competitions
```sql
CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  location_id UUID REFERENCES locations(id),
  organizer_id UUID REFERENCES users(id),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  type TEXT CHECK (type IN ('døds', 'cliff_diving', 'mixed')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  max_participants INTEGER,
  rules JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Competitions are viewable by everyone"
  ON competitions FOR SELECT USING (true);

CREATE POLICY "Organizers can manage competitions"
  ON competitions FOR ALL TO authenticated
  USING (auth.uid() = organizer_id)
  WITH CHECK (auth.uid() = organizer_id);
```

### Competition Registrations
```sql
CREATE TABLE competition_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competition_id UUID REFERENCES competitions(id),
  participant_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  category TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(competition_id, participant_id)
);

-- RLS Policies
ALTER TABLE competition_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own registrations"
  ON competition_registrations FOR SELECT
  USING (auth.uid() = participant_id);

CREATE POLICY "Organizers can view all registrations"
  ON competition_registrations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM competitions
    WHERE id = competition_id
    AND organizer_id = auth.uid()
  ));
```

### Reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id),
  reviewer_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  visit_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(location_id, reviewer_id)
);

-- RLS Policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE TO authenticated
  USING (auth.uid() = reviewer_id);
```

## Supporting Tables

### Weather Records
```sql
CREATE TABLE weather_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id),
  temperature DECIMAL(4,1),
  wind_speed DECIMAL(4,1),
  wind_direction TEXT,
  conditions JSONB,
  recorded_at TIMESTAMPTZ NOT NULL,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient date range queries
CREATE INDEX weather_recorded_at_idx ON weather_records (recorded_at);
```

### Notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);
```

## Functions and Triggers

### Update Timestamp Trigger
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- (Repeat for other tables)
```

### Nearby Locations Function
```sql
CREATE OR REPLACE FUNCTION nearby_locations(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_meters INTEGER
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  distance DOUBLE PRECISION
) AS $$
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
$$ LANGUAGE plpgsql;
```

## Indexes

### Performance Indexes
```sql
-- Users
CREATE INDEX users_username_idx ON users (username);

-- Locations
CREATE INDEX locations_status_idx ON locations (status);
CREATE INDEX locations_difficulty_idx ON locations (difficulty);

-- Competitions
CREATE INDEX competitions_dates_idx ON competitions (start_date, end_date);
CREATE INDEX competitions_status_idx ON competitions (status);

-- Reviews
CREATE INDEX reviews_location_rating_idx ON reviews (location_id, rating);
```

## Next Steps
1. [Database Migrations](./migrations.md)
2. [Query Optimization](./optimization.md)
3. [Backup Procedures](./backup.md)
4. [Maintenance Guide](./maintenance.md)
