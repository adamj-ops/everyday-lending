# Docker Setup for Everyday Lending Platform

This directory contains Docker configuration for running the Everyday Lending platform in a containerized environment.

## Quick Start

```bash
cd docker
docker-compose up --build
```

## Services

### PostgreSQL Database (`postgres`)
- **Port**: 5432
- **Database**: `everyday_lending`
- **User**: `postgres`
- **Password**: `postgres`
- **Health Check**: Enabled
- **Volume**: Persistent data storage

### Redis Cache (`redis`)
- **Port**: 6379
- **Health Check**: Enabled
- **Volume**: Persistent data storage

### Next.js Application (`app`)
- **Port**: 3000
- **Environment**: Development mode
- **Hot Reload**: Enabled via volume mounting
- **Dependencies**: Waits for database and Redis to be healthy

### Drizzle Studio (`drizzle-studio`)
- **Port**: 4983
- **Purpose**: Database GUI for development
- **Access**: http://localhost:4983

## Environment Variables

The Docker setup uses the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk authentication (demo key)
- `CLERK_SECRET_KEY`: Clerk secret key (demo key)
- `ARCJET_KEY`: Arcjet security key (demo key)

## Development Workflow

1. **Start Services**:
   ```bash
   docker-compose up --build
   ```

2. **Access Application**:
   - Main App: http://localhost:3000
   - Drizzle Studio: http://localhost:4983

3. **Run Migrations**:
   ```bash
   docker-compose exec app pnpm run db:migrate
   ```

4. **Stop Services**:
   ```bash
   docker-compose down
   ```

5. **Clean Up** (removes volumes):
   ```bash
   docker-compose down -v
   ```

## Troubleshooting

### Port Conflicts
If you get port conflicts, you can modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead of 3000
```

### Database Connection Issues
1. Check if PostgreSQL is healthy:
   ```bash
   docker-compose ps
   ```

2. View database logs:
   ```bash
   docker-compose logs postgres
   ```

3. Connect to database directly:
   ```bash
   docker-compose exec postgres psql -U postgres -d everyday_lending
   ```

### Application Issues
1. View application logs:
   ```bash
   docker-compose logs app
   ```

2. Restart application:
   ```bash
   docker-compose restart app
   ```

3. Rebuild application:
   ```bash
   docker-compose up --build app
   ```

## Production Considerations

For production deployment, you should:

1. **Use Production Environment Variables**:
   - Replace demo keys with real Clerk keys
   - Use production database credentials
   - Enable monitoring services

2. **Security**:
   - Use secrets management
   - Enable SSL/TLS
   - Configure proper firewall rules

3. **Performance**:
   - Use production-grade PostgreSQL
   - Configure Redis clustering
   - Set up load balancing

4. **Monitoring**:
   - Enable Sentry error tracking
   - Set up PostHog analytics
   - Configure health checks

## File Structure

```
docker/
├── docker-compose.yml    # Main Docker Compose configuration
├── Dockerfile           # Application container definition
├── init-db.sql          # Database initialization script
├── docker.env           # Environment variables
└── README.md            # This file
```
