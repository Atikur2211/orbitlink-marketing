import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/portal", req.url));
  res.cookies.set({
    name: "orbit_portal_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
