import { NextResponse } from 'next/server';
import { updateHeroSlide, deleteHeroSlide } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid slide ID' }, { status: 400 });
    }

    const updates = await request.json();
    const updated = updateHeroSlide(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid slide ID' }, { status: 400 });
    }

    const success = deleteHeroSlide(id);
    if (!success) {
      return NextResponse.json({ error: 'Cannot delete hero slide (minimum 1 slide required or not found)' }, { status: 400 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 });
  }
}
