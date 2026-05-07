import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    let query = 'SELECT * FROM services';
    const params: any[] = [];

    if (id) {
      query += ' WHERE id = ?';
      params.push(id);
    } else if (slug) {
      query += ' WHERE slug = ?';
      params.push(slug);
    } else {
      query += ' ORDER BY sort_order ASC, name ASC';
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json((id || slug) ? (rows as any[])[0] : rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const [result] = await pool.query(
      'UPDATE services SET name=?, slug=?, description=?, seo_title=?, seo_description=?, seo_keywords=?, status=?, sort_order=? WHERE id=?',
      [data.name, data.slug, data.description, data.seo_title, data.seo_description, data.seo_keywords, data.status, data.sort_order || 0, id]
    );

    return NextResponse.json({ id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}