import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST: Log a visitor visit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip, userAgent } = body;

    // Create visitor log using raw query
    await db.$executeRaw(
      'INSERT INTO VisitorLog (ip, userAgent, visitedAt) VALUES (?, ?, datetime("now"))',
      [ip || null, userAgent || null]
    );

    return NextResponse.json({
      success: true,
      message: 'Visitor logged successfully',
    });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to log visitor',
      },
      { status: 500 }
    );
  }
}

// GET: Get visitor statistics
export async function GET() {
  try {
    // Get total visits
    const totalVisitsResult = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count FROM VisitorLog
    `;

    // Get today's visits
    const todayVisitsResult = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count FROM VisitorLog
      WHERE date(visitedAt) = date('now')
    `;

    // Get this week's visits
    const weekVisitsResult = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count FROM VisitorLog
      WHERE visitedAt >= date('now', '-7 days')
    `;

    // Get this month's visits
    const monthVisitsResult = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count FROM VisitorLog
      WHERE visitedAt >= date('now', '-1 month')
    `;

    // Get unique visitors
    const uniqueVisitorsResult = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(DISTINCT ip) as count FROM VisitorLog
      WHERE ip IS NOT NULL
    `;

    // Get visits per day for the last 7 days
    const dailyVisits = [];
    for (let i = 6; i >= 0; i--) {
      const dateResult = await db.$queryRaw<Array<{ date: string, count: bigint }>>`
        SELECT date(visitedAt) as date, COUNT(*) as count
        FROM VisitorLog
        WHERE date(visitedAt) = date('now', '${i} days')
        GROUP BY date(visitedAt)
      `;
      
      if (dateResult.length > 0) {
        dailyVisits.push({
          date: dateResult[0].date,
          count: Number(dateResult[0].count),
        });
      } else {
        dailyVisits.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: 0,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalVisits: Number(totalVisitsResult[0]?.count || 0),
        todayVisits: Number(todayVisitsResult[0]?.count || 0),
        weekVisits: Number(weekVisitsResult[0]?.count || 0),
        monthVisits: Number(monthVisitsResult[0]?.count || 0),
        uniqueVisitors: Number(uniqueVisitorsResult[0]?.count || 0),
        dailyVisits,
      },
    });
  } catch (error) {
    console.error('Error fetching visitor statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch visitor statistics',
      },
      { status: 500 }
    );
  }
}
