import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { useAuthStore } from "@/helpers/auth-store";
import { PrismaClient } from "@prisma/client";
import { user } from "@nextui-org/react";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "ultrasecret";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { user_name, password } = await req.json();

  // Buscar el usuario en la base de datos
  const user = await prisma.vttsUser.findUnique({
    where: {
      assigned: user_name,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Comparar la contraseña proporcionada con la almacenada en la base de datos
  const isMatch = await bcrypt.compare(password, user.password || "");

  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Si las credenciales son correctas, crear el token JWT
  const payload = { username: user.userName, ASSIGNED: user.assigned };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "96h" });
  console.log(token);
  // Configurar la cookie con el token
  const response = NextResponse.json({ message: "Login successful", token: token, user: user.assigned });
  response.headers.set("Set-Cookie", `userAuth=${token}; HttpOnly; Path=/; Max-Age=345600; Secure; SameSite=Strict`);

  //return response;
  return response;
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "This endpoint only supports POST requests" });
}
