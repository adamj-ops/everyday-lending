import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { checkDbHealth } = await import('@/lib/db')
    const isHealthy = await checkDbHealth()
    
    if (isHealthy) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'Database connection successful'
      }, { status: 200 })
    } else {
      return NextResponse.json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        message: 'Database connection failed'
      }, { status: 503 })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Database health check failed'
    }, { status: 500 })
  }
}
