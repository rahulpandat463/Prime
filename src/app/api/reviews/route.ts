import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const profileId = searchParams.get('profile_id');
    const status = searchParams.get('status') || 'approved';

    if (id) {
      const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
      return NextResponse.json((rows as any[])[0] || null);
    }

    let query = 'SELECT * FROM reviews';
    const params: any[] = [];

    if (profileId) {
      query += ' WHERE profile_id = ?';
      params.push(profileId);
    } else {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile_id, name, email, rating, comment } = body;

    const [result] = await pool.query(
      'INSERT INTO reviews (profile_id, name, email, rating, comment, status) VALUES (?, ?, ?, ?, ?, "pending")',
      [profile_id, name, email, rating, comment]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body, status: 'pending' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
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