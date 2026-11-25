-- CreateTable
CREATE TABLE "HomeSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "draft" JSONB NOT NULL,
    "published" JSONB NOT NULL,
    "savedAt" DATETIME,
    "publishedAt" DATETIME
);

-- CreateTable
CREATE TABLE "ImageAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalName" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bytes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
