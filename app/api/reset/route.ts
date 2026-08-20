import { NextResponse } from 'next/server';
import { resetToDefaults, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const data = resetToDefaults();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error resetting store data:', error);
    return NextResponse.json({ error: 'Failed to reset store data' }, { status: 500 });
  }
}
