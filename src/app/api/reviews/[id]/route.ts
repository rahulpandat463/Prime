import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
      return NextResponse.json((rows as any[])[0] || null);
    }

    const [rows] = await pool.query(
      'SELECT r.*, p.name as profile_name FROM reviews r LEFT JOIN profiles p ON r.profile_id = p.id ORDER BY r.created_at DESC LIMIT 50'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    await pool.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
    
    return NextResponse.json({ id, status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}