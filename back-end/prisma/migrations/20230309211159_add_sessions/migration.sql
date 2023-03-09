-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
