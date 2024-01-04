import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: find a better way to do this
  const tripId = request.nextUrl.pathname.split("/")[3];

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const result = await fetch(
    `https://api.liveblocks.io/v2/rooms/${trip.id}/storage?format=json`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
      },
    },
  );

  const data = await result.json();

  return NextResponse.json({ trip: { ...trip, data } }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: find a better way to do this
  const tripId = request.nextUrl.pathname.split("/")[3];

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    return new NextResponse("Not Found", { status: 404 });
  }

  await prisma.trip.delete({ where: { id: tripId } });

  await fetch(`https://api.liveblocks.io/v2/rooms/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
    },
  });

  return NextResponse.json({ message: "Trip deleted" }, { status: 200 });
}
