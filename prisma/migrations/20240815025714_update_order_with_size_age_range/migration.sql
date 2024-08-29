/*
  Warnings:

  - The `size` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `size` on the `clothe_stocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SizeClothe" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "clothe_stocks" DROP COLUMN "size",
ADD COLUMN     "size" "SizeClothe" NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "ageRange" TEXT,
DROP COLUMN "size",
ADD COLUMN     "size" "SizeClothe";

-- DropEnum
DROP TYPE "Size";
