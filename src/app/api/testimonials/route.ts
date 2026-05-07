import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT id, name, location, content, rating FROM testimonials WHERE status = "active" ORDER BY sort_order ASC, id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, content, rating, status, sort_order } = body;

    const [result] = await pool.query(
      'INSERT INTO testimonials (name, location, content, rating, status, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [name, location, content, rating || 5, status || 'active', sort_order || 0]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}