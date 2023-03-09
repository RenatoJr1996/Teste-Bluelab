/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `sessions` table. All the data in the column will be lost.
  - The required column `sessionID` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "sessionID" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_sessions" ("created_at", "userID") SELECT "created_at", "userID" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
