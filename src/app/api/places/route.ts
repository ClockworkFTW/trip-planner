import { NextRequest, NextResponse } from "next/server";
import { placeAutocomplete } from "@/lib/google";
import { getErrorMessage } from "@/lib/util";

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("input");

  if (!input) {
    return NextResponse.json({ message: "Input required" }, { status: 400 });
  }

  try {
    const { status, predictions } = await placeAutocomplete(input);

    if (status !== "OK") {
      return NextResponse.json({ message: "No places found" }, { status: 400 });
    }

    return NextResponse.json({ predictions }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
