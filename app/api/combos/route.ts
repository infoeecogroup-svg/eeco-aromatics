import { NextResponse } from 'next/server';
import { getStoreData, addComboBundle, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getStoreData();
    return NextResponse.json(data.combos || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch combo bundles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.price) {
      return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
    }
    const newCombo = addComboBundle(body);
    return NextResponse.json(newCombo, { status: 201 });
  } catch (error) {
    console.error('Error creating combo bundle:', error);
    return NextResponse.json({ error: 'Failed to create combo bundle' }, { status: 500 });
  }
}
