-- CreateTable
CREATE TABLE "Juego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "oferta" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Resena" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "juegoId" INTEGER NOT NULL,
    CONSTRAINT "Resena_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
