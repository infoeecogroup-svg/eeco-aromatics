import { NextResponse } from 'next/server';
import { updateSectionVisibility } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSectionVisibility(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating section visibility:', error);
    return NextResponse.json({ error: 'Failed to update section visibility' }, { status: 500 });
  }
}
