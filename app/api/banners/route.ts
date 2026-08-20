import { NextResponse } from 'next/server';
import { getStoreData, addHeroSlide, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getStoreData();
    return NextResponse.json(data.heroSlides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.heading || !body.offer) {
      return NextResponse.json({ error: 'Heading and offer are required' }, { status: 400 });
    }
    const newSlide = addHeroSlide(body);
    return NextResponse.json(newSlide, { status: 201 });
  } catch (error) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 });
  }
}
