import { NextResponse } from 'next/server';
import { updateComboBundle, deleteComboBundle, verifyAdminPin } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid combo ID' }, { status: 400 });
    }

    const updates = await request.json();
    const updated = updateComboBundle(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Combo bundle not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating combo bundle:', error);
    return NextResponse.json({ error: 'Failed to update combo bundle' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const pin = request.headers.get('x-admin-pin');
    if (!verifyAdminPin(pin)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid combo ID' }, { status: 400 });
    }

    const success = deleteComboBundle(id);
    if (!success) {
      return NextResponse.json({ error: 'Combo bundle not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting combo bundle:', error);
    return NextResponse.json({ error: 'Failed to delete combo bundle' }, { status: 500 });
  }
}
