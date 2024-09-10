// global.d.ts

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: any;
    }
  }
}

// global.d.ts

declare namespace NodeJS {
  interface Global {
    mongoose: any; // Cambia `any` por un tipo más específico si lo sabes.
  }
}

// Esto convierte el archivo en un módulo y evita conflictos con otros archivos
export {};
