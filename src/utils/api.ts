import { NextRequest } from "next/server";

export function getErrorMessage(error: unknown) {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
}

export function getSearchParams(request: NextRequest) {
  let data: { [key: string]: string } = {};
  request.nextUrl.searchParams.forEach((value, key) => (data[key] = value));
  return data;
}
