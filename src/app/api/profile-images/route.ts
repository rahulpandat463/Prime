import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import sharp from 'sharp';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profile_id');

    let query = 'SELECT id, profile_id, image_url, is_primary FROM profile_images';
    const params: any[] = [];

    if (profileId) {
      query += ' WHERE profile_id = ?';
      params.push(profileId);
    }

    query += ' ORDER BY sort_order ASC, id ASC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const profileId = formData.get('profile_id') as string;

    if (!file || !profileId) {
      return NextResponse.json({ error: 'Missing image or profile_id' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    const webpBuffer = await sharp(imageBuffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filepath = `/images/profiles/${filename}`;

    const [result] = await pool.query(
      'INSERT INTO profile_images (profile_id, image_url) VALUES (?, ?)',
      [profileId, filepath]
    );

    return NextResponse.json({ id: (result as any).insertId, image_url: filepath });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}