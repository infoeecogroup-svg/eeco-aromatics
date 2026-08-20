import { NextResponse } from 'next/server';
import { updatePageVisibility, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    const updated = updatePageVisibility(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating page visibility:', error);
    return NextResponse.json({ error: 'Failed to update page visibility' }, { status: 500 });
  }
}
