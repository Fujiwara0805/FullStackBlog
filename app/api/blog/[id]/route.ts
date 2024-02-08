import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { main } from "../route";

const prisma = new PrismaClient();

/* Blogの詳細記事取得API */
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "SUCCESS", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { messages: "データ取得に失敗しました", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

/* Blogの編集記事取得API */
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json(
      { message: "データを更新しました", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { messages: "データ取得に失敗しました", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

/* Blogの削除用記事取得API */
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);

    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(
      { message: "データを削除しました", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { messages: "データ取得に失敗しました", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
