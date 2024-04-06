import { Database } from '@/common/db/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Database.getVideos();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({error: 'Unable to get videos'}, { status: 400 })
  }
}