# Database Schema

## Measurement Standards

All measurements are stored in metric units with standardized precision:
- Heights: decimal(5,1) in meters (e.g., 34.7)
- Wind speeds: decimal(4,1) in m/s
- Temperatures: decimal(3,1) in Celsius
- Water depths: decimal(4,1) in meters

## Tables

### locations
```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    altitude_meters DECIMAL(6,1),  -- elevation above sea level
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'active'
);
```

### jump_points
```sql
CREATE TABLE jump_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    height_meters DECIMAL(5,1) NOT NULL,    -- Store to 0.1m precision
    water_depth_meters DECIMAL(4,1),        -- Store to 0.1m precision
    platform_width_meters DECIMAL(3,1),
    platform_length_meters DECIMAL(3,1),
    safety_rating INTEGER CHECK (safety_rating BETWEEN 1 AND 5),
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    verification_status VARCHAR(20) DEFAULT 'community',
    measurement_method VARCHAR(50),          -- 'tape', 'estimate', etc.
    measured_by UUID REFERENCES auth.users(id),
    measurement_date TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### height_verifications
```sql
CREATE TABLE height_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jump_point_id UUID REFERENCES jump_points(id),
    height_meters DECIMAL(5,1) NOT NULL,     -- Verified height to 0.1m
    measured_by UUID REFERENCES auth.users(id),
    verified_by UUID REFERENCES auth.users(id),
    measurement_method VARCHAR(50) NOT NULL,  -- Usually 'tape'
    measurement_date TIMESTAMPTZ NOT NULL,
    equipment_type VARCHAR(100),
    equipment_details JSONB,
    weather_conditions JSONB,
    witness_count INTEGER,
    photo_evidence TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### weather_conditions
```sql
CREATE TABLE weather_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    timestamp TIMESTAMPTZ NOT NULL,
    wind_speed_ms DECIMAL(4,1),      -- in meters/second
    wind_gust_ms DECIMAL(4,1),       -- in meters/second
    wind_direction INTEGER,          -- in degrees
    temperature_celsius DECIMAL(3,1), -- in Celsius
    humidity_percent INTEGER,
    precipitation_mm DECIMAL(4,1),
    visibility_meters INTEGER,
    pressure_hpa INTEGER,
    conditions TEXT,
    source VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### water_conditions
```sql
CREATE TABLE water_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    timestamp TIMESTAMPTZ NOT NULL,
    tide_height_meters DECIMAL(3,2),     -- if applicable
    wave_height_meters DECIMAL(3,1),     -- if applicable
    water_temp_celsius DECIMAL(3,1),
    current_speed_ms DECIMAL(3,1),      -- in meters/second
    visibility_meters DECIMAL(3,1),
    depth_meters DECIMAL(4,1),          -- current depth
    conditions TEXT,
    reported_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### user_preferences
```sql
CREATE TABLE user_preferences (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    height_unit VARCHAR(10) DEFAULT 'meters',
    wind_speed_unit VARCHAR(10) DEFAULT 'kmh',
    temperature_unit VARCHAR(10) DEFAULT 'celsius',
    show_both_units BOOLEAN DEFAULT false,
    default_map_type VARCHAR(20) DEFAULT 'satellite',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);
```

## Indexes

```sql
-- Locations spatial index
CREATE INDEX idx_locations_coordinates 
ON locations USING gist (
    ll_to_earth(latitude, longitude)
);

-- Height verification index
CREATE INDEX idx_height_verifications_jump_point 
ON height_verifications(jump_point_id, measurement_date);

-- Weather conditions index
CREATE INDEX idx_weather_conditions_location_time 
ON weather_conditions(location_id, timestamp);

-- Water conditions index
CREATE INDEX idx_water_conditions_location_time 
ON water_conditions(location_id, timestamp);
```

## Triggers

```sql
-- Update last_updated timestamp
CREATE TRIGGER update_location_timestamp
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Track height verification history
CREATE TRIGGER log_height_verification
    AFTER INSERT ON height_verifications
    FOR EACH ROW
    EXECUTE FUNCTION log_height_verification_change();
```

## Related Documentation
- [Height Verification System](../features/locations/height-verification.md)
- [User Preferences](../features/onboarding/user-preferences.md)
- [Multi-spot Marking](../features/locations/multi-spot-marking.md)
