/*
  Warnings:

  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `clothe_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shoe_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `toy_stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'seller';

-- DropForeignKey
ALTER TABLE "clothe_stocks" DROP CONSTRAINT "clothe_stocks_productId_fkey";

-- DropForeignKey
ALTER TABLE "shoe_stocks" DROP CONSTRAINT "shoe_stocks_productId_fkey";

-- DropForeignKey
ALTER TABLE "toy_stocks" DROP CONSTRAINT "toy_stocks_productId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hasPurchasedOnce" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "clothe_stocks";

-- DropTable
DROP TABLE "shoe_stocks";

-- DropTable
DROP TABLE "toy_stocks";

-- DropEnum
DROP TYPE "ClotheSize";

-- DropEnum
DROP TYPE "Gender";
