import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/helpers/jwt-verificator";
import { allowedRoutes } from "@/helpers/allowed-routes";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "ultrasecret";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("userAuth")?.value;
  let user = null;
  try {
    if (token) {
      user = await verifyJWT(token, JWT_SECRET_KEY);
    }
  } catch (err) {
    console.error("JWT verification error:", err);
  }

  if ((pathname === "/login" || pathname === "/register") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/api/v1")) {
    let token = request.cookies.get("userAuth")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }

    try {
      const decoded = await verifyJWT(token, JWT_SECRET_KEY);
      console.log("Token decodificado:", decoded);
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
  }

  if (allowedRoutes.includes(pathname) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
