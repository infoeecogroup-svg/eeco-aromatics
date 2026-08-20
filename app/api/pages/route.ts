import { NextResponse } from 'next/server';
import { updatePageVisibility } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updatePageVisibility(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating page visibility:', error);
    return NextResponse.json({ error: 'Failed to update page visibility' }, { status: 500 });
  }
}
