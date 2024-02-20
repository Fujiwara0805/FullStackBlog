import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { main } from "../route";

const prisma = new PrismaClient();

/* Blog検索用API */
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { query } = await req.json();
    await main();
    const posts = await prisma.post.findMany({
      where: { title: { contains: query } },
    });
    return NextResponse.json({ message: "SUCCESS", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { messages: "データ取得に失敗しました", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
