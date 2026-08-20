import { NextResponse } from 'next/server';
import { getStoreData, updateBenefits, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getStoreData();
    return NextResponse.json(data.benefits || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch benefits' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Benefits must be an array' }, { status: 400 });
    }

    const updated = updateBenefits(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating benefits:', error);
    return NextResponse.json({ error: 'Failed to update benefits' }, { status: 500 });
  }
}
