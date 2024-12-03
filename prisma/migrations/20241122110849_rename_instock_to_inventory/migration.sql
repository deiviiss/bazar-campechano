/*
  Warnings:

  - You are about to drop the column `inventory` on the `product_attribute_values` table. All the data in the column will be lost.
  - Added the required column `inStock` to the `product_attribute_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_attribute_values" DROP COLUMN "inventory",
ADD COLUMN     "inStock" INTEGER NOT NULL;
