import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getStoreData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching store data:', error);
    return NextResponse.json({ error: 'Failed to fetch store data' }, { status: 500 });
  }
}
