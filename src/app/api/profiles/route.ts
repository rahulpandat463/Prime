import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    const service = searchParams.get('service');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    if (id) {
      const [rows] = await pool.query(
        'SELECT p.*, l.name as location_name, l.slug as location_slug, c.name as category_name FROM profiles p LEFT JOIN locations l ON p.location_id = l.id LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
        [id]
      );
      return NextResponse.json((rows as any[])[0] || null);
    }

    let query = `
      SELECT p.*, l.name as location_name, l.slug as location_slug, 
             c.name as category_name, c.slug as category_slug
      FROM profiles p
      LEFT JOIN locations l ON p.location_id = l.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;
    const params: any[] = [];

    if (location) {
      query += ' AND l.slug = ?';
      params.push(location);
    }
    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }
    if (featured === 'true') {
      query += ' AND p.is_featured = 1';
    }

    query += ' ORDER BY p.is_featured DESC, p.rating DESC, p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, age, height, description, place_of_service, location_id, category_id, is_featured, is_verified } = body;

    const [result] = await pool.query(
      'INSERT INTO profiles (name, slug, age, height, description, place_of_service, location_id, category_id, is_featured, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, age, height, description, place_of_service, location_id, category_id, is_featured || false, is_verified || false]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
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