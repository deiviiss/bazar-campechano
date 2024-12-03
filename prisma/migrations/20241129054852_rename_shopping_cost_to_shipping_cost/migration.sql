/*
  Warnings:

  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `clotheSize` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `shoeSize` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `toyAgeRange` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tax",
ADD COLUMN     "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "clotheSize",
DROP COLUMN "shoeSize",
DROP COLUMN "toyAgeRange";

-- RenameIndex
ALTER INDEX "categories_name_unique" RENAME TO "categories_name_key";
