import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET /api/archives - 사용자의 모든 아카이브 가져오기
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const archives = await prisma.archive.findMany({
      where: { userId },
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(archives);
  } catch (error) {
    console.error('Error fetching archives:', error);
    return NextResponse.json({ error: "Failed to fetch archives" }, { status: 500 });
  }
}

// POST /api/archives - 새 아카이브 생성
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { title, description, platform, content, tags } = body;
    
    const userId = session.user.id;
    
    const archive = await prisma.archive.create({
      data: {
        title,
        description,
        platform,
        content,
        userId,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: { tags: true }
    });
    
    return NextResponse.json(archive);
  } catch (error) {
    console.error('Error creating archive:', error);
    return NextResponse.json({ error: "Failed to create archive" }, { status: 500 });
  }
}