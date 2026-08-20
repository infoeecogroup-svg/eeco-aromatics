import { NextResponse } from 'next/server';
import { getStoreData, addFaqItem, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getStoreData();
    return NextResponse.json(data.faqs || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.q || !body.a) {
      return NextResponse.json({ error: 'Question (q) and Answer (a) are required' }, { status: 400 });
    }
    const newFaq = addFaqItem(body);
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
