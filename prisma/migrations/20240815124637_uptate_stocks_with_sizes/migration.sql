/*
  Warnings:

  - You are about to drop the column `size` on the `clothe_stocks` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `shoe_stocks` table. All the data in the column will be lost.
  - Added the required column `sizeClothe` to the `clothe_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeShoe` to the `shoe_stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clothe_stocks" DROP COLUMN "size",
ADD COLUMN     "sizeClothe" "SizeClothe" NOT NULL;

-- AlterTable
ALTER TABLE "shoe_stocks" DROP COLUMN "size",
ADD COLUMN     "sizeShoe" INTEGER NOT NULL;
