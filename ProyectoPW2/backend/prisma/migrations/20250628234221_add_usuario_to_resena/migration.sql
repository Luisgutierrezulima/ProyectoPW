/*
  Warnings:

  - Added the required column `userId` to the `Resena` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resena" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "juegoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Resena_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resena_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resena" ("estrellas", "id", "juegoId", "texto") SELECT "estrellas", "id", "juegoId", "texto" FROM "Resena";
DROP TABLE "Resena";
ALTER TABLE "new_Resena" RENAME TO "Resena";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
