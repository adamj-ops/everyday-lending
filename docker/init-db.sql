-- Initialize the Everyday Lending database
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the main database (if not exists)
-- Note: The database is already created by POSTGRES_DB environment variable

-- Set up basic permissions
GRANT ALL PRIVILEGES ON DATABASE everyday_lending TO postgres;

-- Create a development user (optional)
-- CREATE USER dev_user WITH PASSWORD 'dev_password';
-- GRANT ALL PRIVILEGES ON DATABASE everyday_lending TO dev_user;

-- Note: Drizzle migrations will be applied by the application
-- This file is for any initial setup that needs to happen before migrations
