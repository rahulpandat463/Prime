import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await pool.query(
        'SELECT id, profile_id, image_url FROM profile_images WHERE profile_id = ?',
        [id]
      );
      return NextResponse.json(rows);
    }

    const [rows] = await pool.query(
      'SELECT pi.id, pi.profile_id, pi.image_url, p.name as profile_name FROM profile_images pi JOIN profiles p ON pi.profile_id = p.id'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_primary, profile_id } = body;

    if (is_primary) {
      await pool.query('UPDATE profile_images SET is_primary = 0 WHERE profile_id = ?', [profile_id]);
    }

    const [result] = await pool.query(
      'UPDATE profile_images SET is_primary = ? WHERE id = ?',
      [is_primary || 0, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM profile_images WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}