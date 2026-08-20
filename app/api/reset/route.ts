import { NextResponse } from 'next/server';
import { resetToDefaults } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const data = resetToDefaults();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error resetting store data:', error);
    return NextResponse.json({ error: 'Failed to reset store data' }, { status: 500 });
  }
}
