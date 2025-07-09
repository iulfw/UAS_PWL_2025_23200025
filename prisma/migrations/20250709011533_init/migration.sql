-- CreateTable
CREATE TABLE "order" (
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
