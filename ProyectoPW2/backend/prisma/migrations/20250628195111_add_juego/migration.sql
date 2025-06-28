/*
  Warnings:

  - Added the required column `categoria` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plataforma` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Juego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL DEFAULT 0,
    "imagen" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "oferta" BOOLEAN NOT NULL DEFAULT false,
    "plataforma" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);
INSERT INTO "new_Juego" ("descripcion", "estrellas", "id", "imagen", "oferta", "precio", "titulo", "trailer") SELECT "descripcion", "estrellas", "id", "imagen", "oferta", "precio", "titulo", "trailer" FROM "Juego";
DROP TABLE "Juego";
ALTER TABLE "new_Juego" RENAME TO "Juego";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
