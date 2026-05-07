import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await pool.query(
        'SELECT p.*, l.name as location_name, l.slug as location_slug, c.name as category_name FROM profiles p LEFT JOIN locations l ON p.location_id = l.id LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
        [id]
      );
      return NextResponse.json((rows as any[])[0] || null);
    }

    const [rows] = await pool.query(
      'SELECT p.*, l.name as location_name, l.slug as location_slug, c.name as category_name FROM profiles p LEFT JOIN locations l ON p.location_id = l.id LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC LIMIT 50'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const [result] = await pool.query(
      'UPDATE profiles SET name=?, slug=?, age=?, height=?, description=?, place_of_service=?, location_id=?, category_id=?, status=?, is_featured=?, is_verified=? WHERE id=?',
      [data.name, data.slug, data.age, data.height, data.description, data.place_of_service, data.location_id, data.category_id, data.status, data.is_featured || 0, data.is_verified || 0, id]
    );

    return NextResponse.json({ id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM profiles WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}