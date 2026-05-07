import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT id, name, slug, description, status, sort_order FROM categories WHERE status = "active" ORDER BY sort_order ASC, name ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, status, sort_order } = body;

    const [result] = await pool.query(
      'INSERT INTO categories (name, slug, description, status, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, slug, description, status || 'active', sort_order || 0]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}