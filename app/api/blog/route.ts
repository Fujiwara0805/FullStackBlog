import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

/* Blogsの全記事取得API */
export const GET = async(req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return  NextResponse.json({ message: "SUCCESS", posts }, {status: 200});
  } catch (error) {
    return NextResponse.json({messages: "データ取得に失敗しました", error}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

/* Blog投稿用API */
export const POST = async(req: Request, res: NextResponse) => {
  try {
    const {title, description} = await req.json();

    await main();
    const post = await prisma.post.create({data: {title, description}});
    return  NextResponse.json({ message: "SUCCESS", post }, {status: 201});
  } catch (error) {
    return NextResponse.json({messages: "データ取得に失敗しました", error}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};