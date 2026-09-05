import { NextResponse } from 'next/server';
import {
  getBusinessLinks,
  addBusinessLink,
  updateBusinessLink,
  deleteBusinessLink,
  updateBusinessProfile,
  saveAllBusinessLinks,
  verifyAdminPin,
} from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getBusinessLinks();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching business links:', error);
    return NextResponse.json({ error: 'Failed to fetch business links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();

    // Check if saving whole list or adding a single link
    if (body.action === 'save_all' && Array.isArray(body.links)) {
      const result = saveAllBusinessLinks(body.links, body.profile);
      return NextResponse.json(result);
    }

    if (body.action === 'update_profile' && body.profile) {
      const updatedProfile = updateBusinessProfile(body.profile);
      return NextResponse.json({ profile: updatedProfile });
    }

    // Default: Add a new link
    const newLink = addBusinessLink({
      title: body.title || 'New Link',
      url: body.url || 'https://',
      icon: body.icon || 'custom',
      subtitle: body.subtitle || '',
      badge: body.badge || '',
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: body.order || 99,
      highlight: body.highlight || false,
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating/saving business link:', error);
    return NextResponse.json({ error: 'Failed to save business link' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();

    // If whole list is supplied
    if (Array.isArray(body.links)) {
      const result = saveAllBusinessLinks(body.links, body.profile);
      return NextResponse.json(result);
    }

    if (body.profile) {
      const updatedProfile = updateBusinessProfile(body.profile);
      return NextResponse.json({ profile: updatedProfile });
    }

    if (body.id) {
      const updated = updateBusinessLink(body.id, body.updates || body);
      if (!updated) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    console.error('Error updating business link:', error);
    return NextResponse.json({ error: 'Failed to update business link' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing link id' }, { status: 400 });
    }

    const success = deleteBusinessLink(id);
    if (!success) {
      return NextResponse.json({ error: 'Link not found or failed to delete' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting business link:', error);
    return NextResponse.json({ error: 'Failed to delete business link' }, { status: 500 });
  }
}
