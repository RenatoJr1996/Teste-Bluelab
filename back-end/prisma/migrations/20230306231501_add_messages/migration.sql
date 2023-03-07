-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "toUser" TEXT NOT NULL,
    "toUserID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
