import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  
    const filePath = path.join(process.cwd(), 'public', 'images', 'chart.html');

  try {
    const data = fs.readFileSync(filePath, 'utf8');

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {

    return new NextResponse('Failed to read file ! ' + filePath, { status: 500 });
  }
}