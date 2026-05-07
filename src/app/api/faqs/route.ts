import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT id, question, answer FROM faqs WHERE status = "active" ORDER BY sort_order ASC, id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, category, status, sort_order } = body;

    const [result] = await pool.query(
      'INSERT INTO faqs (question, answer, category, status, sort_order) VALUES (?, ?, ?, ?, ?)',
      [question, answer, category, status || 'active', sort_order || 0]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}