import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const type = searchParams.get('type');
    const parentId = searchParams.get('parent_id');

    let query = 'SELECT id, name, slug, type, parent_id, description FROM locations';
    const params: any[] = [];

    if (id) {
      query += ' WHERE id = ?';
      params.push(id);
    } else if (slug) {
      query += ' WHERE slug = ?';
      params.push(slug);
    } else {
      query += ' WHERE status = "active"';
      if (type) {
        query += ' AND type = ?';
        params.push(type);
      }
      if (parentId) {
        query += ' AND parent_id = ?';
        params.push(parentId);
      }
      query += ' ORDER BY sort_order ASC, name ASC';
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json((id || slug) ? (rows as any[])[0] : rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, type, parent_id, description, status, sort_order } = body;

    const [result] = await pool.query(
      'INSERT INTO locations (name, slug, type, parent_id, description, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, slug, type, parent_id, description, status || 'active', sort_order || 0]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
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