import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper function to check authentication
async function isAuthenticated(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;

  if (!sessionId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  return user;
}

// GET: Get user activity statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // Check if user is admin (only admin can view statistics)
    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden. Only admin can view user log statistics.',
        },
        { status: 403 }
      );
    }

    // Get total logs
    const totalLogsResult = await db.$queryRaw<Array<{ count: bigint }>>(
      'SELECT COUNT(*) as count FROM UserLog'
    );

    // Get today's logs
    const todayLogsResult = await db.$queryRaw<Array<{ count: bigint }>>(
      'SELECT COUNT(*) as count FROM UserLog WHERE date(createdAt) = date("now")'
    );

    // Get this week's logs
    const weekLogsResult = await db.$queryRaw<Array<{ count: bigint }>>(
      'SELECT COUNT(*) as count FROM UserLog WHERE createdAt >= date("now", "-7 days")'
    );

    // Get this month's logs
    const monthLogsResult = await db.$queryRaw<Array<{ count: bigint }>>(
      'SELECT COUNT(*) as count FROM UserLog WHERE createdAt >= date("now", "-1 month")'
    );

    // Get unique users who performed actions
    const uniqueUsersResult = await db.$queryRaw<Array<{ count: bigint }>>(
      'SELECT COUNT(DISTINCT userId) as count FROM UserLog'
    );

    // Get most active users and top actions
    const userCountsResult = await db.$queryRaw<Array<{ userId: string, count: bigint }>>(
      'SELECT userId, COUNT(*) as count FROM UserLog GROUP BY userId ORDER BY count DESC LIMIT 10'
    );
    const actionCountsResult = await db.$queryRaw<Array<{ action: string, count: bigint }>>(
      'SELECT action, COUNT(*) as count FROM UserLog GROUP BY action ORDER BY count DESC LIMIT 10'
    );

    // Get top users with their usernames
    const topUsers = await Promise.all(
      userCountsResult.map(async (item: any) => {
        const userResult = await db.$queryRaw<Array<{ username: string, role: string }>>(
          'SELECT username, role FROM User WHERE id = ?',
          [item.userId]
        );
        return {
          user: userResult[0] || null,
          count: Number(item.count),
        };
      })
    );

    const topActions = actionCountsResult.map((item: any) => ({
      action: item.action,
      count: Number(item.count),
    }));

    // Get logs per day for the last 7 days
    const dailyLogs = [];
    for (let i = 6; i >= 0; i--) {
      const dateResult = await db.$queryRaw<Array<{ date: string, count: bigint }>>(
        'SELECT date(createdAt) as date, COUNT(*) as count FROM UserLog WHERE date(createdAt) = date("now", "' + i + ' days") GROUP BY date(createdAt)'
      );

      if (dateResult.length > 0) {
        dailyLogs.push({
          date: dateResult[0].date,
          count: Number(dateResult[0].count),
        });
      } else {
        dailyLogs.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: 0,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalLogs: Number(totalLogsResult[0]?.count || 0),
        todayLogs: Number(todayLogsResult[0]?.count || 0),
        weekLogs: Number(weekLogsResult[0]?.count || 0),
        monthLogs: Number(monthLogsResult[0]?.count || 0),
        uniqueUsers: Number(uniqueUsersResult[0]?.count || 0),
        topActions,
        topUsers,
        dailyLogs,
      },
    });
  } catch (error) {
    console.error('Error fetching user log statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user log statistics',
      },
      { status: 500 }
    );
  }
}
