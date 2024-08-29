/*
  Warnings:

  - You are about to drop the column `ageRange` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "ageRange",
DROP COLUMN "size",
ADD COLUMN     "clotheSize" "SizeClothe",
ADD COLUMN     "shoeSize" INTEGER,
ADD COLUMN     "toyAgeRange" TEXT;
