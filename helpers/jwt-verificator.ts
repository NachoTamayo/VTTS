import { jwtVerify } from "jose";

export async function verifyJWT(token: string, secret: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    throw new Error("Invalid token");
  }
}
