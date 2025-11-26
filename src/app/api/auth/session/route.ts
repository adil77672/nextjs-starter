import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE = "demo-auth";
const ONE_DAY = 60 * 60 * 24;

export async function GET() {
  const authenticated = cookies().get(AUTH_COOKIE)?.value === "true";
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email } = body as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const response = NextResponse.json({
    authenticated: true,
    email,
    message: "Session cookie has been issued.",
  });

  response.cookies.set({
    name: AUTH_COOKIE,
    value: "true",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({
    authenticated: false,
    message: "Signed out.",
  });

  response.cookies.set({
    name: AUTH_COOKIE,
    value: "",
    expires: new Date(0),
    path: "/",
  });

  return response;
}

