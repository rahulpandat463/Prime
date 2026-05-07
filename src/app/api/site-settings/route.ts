import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT * FROM site_settings ORDER BY id DESC LIMIT 1');
    return NextResponse.json((rows as any[])[0] || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const [existing] = await pool.query('SELECT id FROM site_settings LIMIT 1');
    
    if ((existing as any[]).length > 0) {
      await pool.query(
        'UPDATE site_settings SET site_name=?, logo=?, primary_color=?, secondary_color=?, contact_email=?, contact_phone=?, whatsapp_number=?, address=?, footer_content=? WHERE id = ?',
        [body.site_name, body.logo, body.primary_color, body.secondary_color, body.contact_email, body.contact_phone, body.whatsapp_number, body.address, body.footer_content, (existing as any[])[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO site_settings (site_name, logo, primary_color, secondary_color, contact_email, contact_phone, whatsapp_number, address, footer_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [body.site_name, body.logo, body.primary_color, body.secondary_color, body.contact_email, body.contact_phone, body.whatsapp_number, body.address, body.footer_content]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}