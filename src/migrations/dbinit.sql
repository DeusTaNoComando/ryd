CREATE TYPE poi_status AS ENUM ('OFFLINE', 'ONLINE'); -- Define ENUM for POIStatus
CREATE TYPE poi_opening_hours AS ENUM ('DAILY', 'WEEKDAYSSAT', 'WEEKDAYS'); -- Define ENUM for POIOpeningHours

CREATE TABLE pois (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Primary key with UUID
    status poi_status DEFAULT 'OFFLINE', -- ENUM for POI status with default value
    address JSONB NOT NULL, -- JSONB column for address
    opening_hours_pattern poi_opening_hours, -- ENUM for opening hours pattern
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Created date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Updated date
    CONSTRAINT updated_at CHECK (updated_at >= created_at) -- Constraint to ensure updated_at is always after created_at
);

CREATE TABLE pumps (
    pump_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Primary key with UUID
    pump_name VARCHAR(50) NOT NULL, -- Pump name
    fuel_products JSONB NOT NULL, -- JSONB column for fuel products
    poi_id UUID REFERENCES pois(id) ON DELETE CASCADE, -- Foreign key referencing pois table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Created date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Updated date
    CONSTRAINT updated_at CHECK (updated_at >= created_at) -- Constraint to ensure updated_at is always after created_at
);