/*
  Warnings:

  - You are about to alter the column `jastiper` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `vendor` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "jastipers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "vendors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "customer" TEXT NOT NULL,
    "jastiper" INTEGER NOT NULL,
    "vendor" INTEGER NOT NULL,
    "menu" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "notes" TEXT,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "orders_jastiper_fkey" FOREIGN KEY ("jastiper") REFERENCES "jastipers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_vendor_fkey" FOREIGN KEY ("vendor") REFERENCES "vendors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("customer", "date", "id", "jastiper", "menu", "notes", "price", "qty", "status", "vendor") SELECT "customer", "date", "id", "jastiper", "menu", "notes", "price", "qty", "status", "vendor" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
