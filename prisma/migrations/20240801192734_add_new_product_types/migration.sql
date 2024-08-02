/*
  Warnings:

  - You are about to drop the column `gender` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_stocks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_productId_fkey";

-- DropIndex
DROP INDEX "products_gender_idx";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "gender",
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "product_stocks";

-- CreateTable
CREATE TABLE "clothe_stocks" (
    "id" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "inStock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "clothe_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoe_stocks" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "inStock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "shoe_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toy_stocks" (
    "id" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "toy_stocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clothe_stocks" ADD CONSTRAINT "clothe_stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoe_stocks" ADD CONSTRAINT "shoe_stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toy_stocks" ADD CONSTRAINT "toy_stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
