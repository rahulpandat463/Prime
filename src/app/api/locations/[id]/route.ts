import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    let query = 'SELECT * FROM locations';
    const params: any[] = [];

    if (id) {
      query += ' WHERE id = ?';
      params.push(id);
    } else if (slug) {
      query += ' WHERE slug = ?';
      params.push(slug);
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json((rows as any[])[0] || null);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const [result] = await pool.query(
      'UPDATE locations SET name=?, slug=?, type=?, parent_id=?, description=?, seo_title=?, seo_description=?, seo_keywords=?, status=?, sort_order=? WHERE id=?',
      [data.name, data.slug, data.type, data.parent_id, data.description, data.seo_title, data.seo_description, data.seo_keywords, data.status, data.sort_order || 0, id]
    );

    return NextResponse.json({ id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM locations WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
  }
}