import { NextResponse } from 'next/server';
import { updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update store settings' }, { status: 500 });
  }
}
