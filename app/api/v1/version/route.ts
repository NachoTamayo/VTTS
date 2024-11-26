// /Users/nacho/Documents/TSProjects/VTTS/app/api/v1/version/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Obtener parámetros de consulta
    const appParam = searchParams.get("app");
    const versionParam = searchParams.get("version");
    const srNumberParam = searchParams.get("srNumber");
    const orderBy = searchParams.get("orderBy") || "srNumber"; // Campo por defecto para ordenar
    const orderDirection = searchParams.get("orderDirection") || "asc";

    // Validar y convertir parámetros
    const filters: any = {};

    if (appParam) {
      const app = parseInt(appParam, 10);
      if (isNaN(app)) {
        return NextResponse.json({ error: "El parámetro 'app' debe ser un número válido." }, { status: 400 });
      }
      filters.app = app;
    }

    if (versionParam) {
      const version = parseInt(versionParam, 10);
      if (isNaN(version)) {
        return NextResponse.json({ error: "El parámetro 'version' debe ser un número válido." }, { status: 400 });
      }
      filters.version = version;
    }

    if (srNumberParam) {
      const srNumber = parseInt(srNumberParam, 10);
      if (isNaN(srNumber)) {
        return NextResponse.json({ error: "El parámetro 'srNumber' debe ser un número válido." }, { status: 400 });
      }
      filters.srNumber = srNumber;
    }

    // Definir campos permitidos para ordenar, incluyendo 'srType'
    const allowedOrderByFields = [
      "id",
      "app",
      "version",
      "srNumber",
      "dateModification",
      "assigned",
      "status",
      "srType",
    ];

    if (!allowedOrderByFields.includes(orderBy)) {
      return NextResponse.json(
        { error: `El campo 'orderBy' debe ser uno de los siguientes: ${allowedOrderByFields.join(", ")}.` },
        { status: 400 }
      );
    }

    // Validar dirección de ordenamiento
    const orderDir = orderDirection.toLowerCase() === "desc" ? "desc" : "asc";

    // Determina si el campo de ordenamiento es una relación
    const isRelation = orderBy === "srType";

    let orderByClause: any;

    if (isRelation) {
      orderByClause = {
        srNumberRelation: {
          srTypeRelation: {
            srType: orderDir, // Reemplaza 'name' con el campo específico de srTypeRelation por el que deseas ordenar
          },
        },
      };
    } else {
      orderByClause = {
        [orderBy]: orderDir,
      };
    }

    // Construir la consulta a la base de datos
    const versionForecasts = await prisma.versionForecast.findMany({
      where: filters,
      orderBy: orderByClause,
      include: {
        versionRelation: true,
        srNumberRelation: {
          include: {
            srTypeRelation: true,
          },
        },
        assignedRelation: {
          select: {
            id: true,
            assigned: true,
            mailSign: true,
          },
        },
        statusRelation: true,
      },
    });

    return NextResponse.json(versionForecasts, { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud GET para VersionForecast:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { selectedSRs, version } = await req.json();
  const arrSRs = selectedSRs.split(",");

  try {
    for (const sr of arrSRs) {
      const result = await prisma.versionForecast.create({
        data: {
          version: Number(version),
          srNumber: Number(sr),
          status: 4,
        },
      });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error al crear el registro de VersionForecast:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { version } = await req.json();
  try {
    const result = await prisma.versionForecast.deleteMany({
      where: {
        version: Number(version),
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el registro de VersionForecast:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
