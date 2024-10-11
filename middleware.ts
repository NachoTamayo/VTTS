import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/helpers/jwt-verificator";
import { allowedRoutes } from "@/helpers/allowed-routes";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "ultrasecret";

// Crea el middleware de next-intl
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Ejecuta el middleware de internacionalización primero
  const intlResponse = intlMiddleware(request);

  // Ejecuta la lógica de JWT y rutas permitidas después del middleware de internacionalización
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

  // Si el usuario ya está logueado, redirigir desde las rutas de login o registro
  if ((pathname === "/login" || pathname === "/register") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Verificación de token en rutas de la API
  if (pathname.startsWith("/api/v1")) {
    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }

    try {
      const decoded = await verifyJWT(token, JWT_SECRET_KEY);
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
  }

  // Verifica si la ruta es permitida y si el usuario no está autenticado
  if (allowedRoutes.includes(pathname) && !user) {
    return NextResponse.redirect(new URL("/en/login", request.url));
  }

  // Si next-intl manejó la respuesta, devuélvela, si no, continúa con la solicitud
  return intlResponse || NextResponse.next();
}

export const config = {
  // Match the same routes as in next-intl
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(es|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
