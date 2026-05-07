import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    let query = 'SELECT id, name, slug, description, status, sort_order FROM categories';
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
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, seo_title, seo_description, seo_keywords, status, sort_order } = body;

    const [result] = await pool.query(
      'INSERT INTO categories (name, slug, description, seo_title, seo_description, seo_keywords, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, description, seo_title, seo_description, seo_keywords, status || 'active', sort_order || 0]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const [result] = await pool.query(
      'UPDATE categories SET name=?, slug=?, description=?, seo_title=?, seo_description=?, seo_keywords=?, status=?, sort_order=? WHERE id=?',
      [data.name, data.slug, data.description, data.seo_title, data.seo_description, data.seo_keywords, data.status, data.sort_order || 0, id]
    );

    return NextResponse.json({ id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}