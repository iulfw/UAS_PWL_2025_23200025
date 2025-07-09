/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "order";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "customer" TEXT NOT NULL,
    "jastiper" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "menu" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL
);
