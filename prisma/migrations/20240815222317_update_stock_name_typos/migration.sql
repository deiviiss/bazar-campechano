/*
  Warnings:

  - You are about to drop the column `sizeClothe` on the `clothe_stocks` table. All the data in the column will be lost.
  - The `clotheSize` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `sizeShoe` on the `shoe_stocks` table. All the data in the column will be lost.
  - Added the required column `clotheSize` to the `clothe_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shoeSize` to the `shoe_stocks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClotheSize" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "clothe_stocks" DROP COLUMN "sizeClothe",
ADD COLUMN     "clotheSize" "ClotheSize" NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "clotheSize",
ADD COLUMN     "clotheSize" "ClotheSize";

-- AlterTable
ALTER TABLE "shoe_stocks" DROP COLUMN "sizeShoe",
ADD COLUMN     "shoeSize" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "SizeClothe";
