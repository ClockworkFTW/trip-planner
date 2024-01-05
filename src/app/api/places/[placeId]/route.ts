import { NextRequest, NextResponse } from "next/server";
import { placeDetails } from "@/lib/google";
import { getErrorMessage } from "@/lib/util";

export async function GET(request: NextRequest) {
  // TODO: find a better way to do this
  const placeId = request.nextUrl.pathname.split("/")[3];

  try {
    const place = await placeDetails(placeId);

    return NextResponse.json({ place }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
