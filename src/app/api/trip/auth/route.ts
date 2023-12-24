import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: `${user.firstName} ${user.lastName}`,
    image: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  const { room } = await req.json();
  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();
  return new NextResponse(body, { status });
}
