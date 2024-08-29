/*
  Warnings:

  - A unique constraint covering the columns `[clotheSize,productId]` on the table `clothe_stocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shoeSize,productId]` on the table `shoe_stocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ageRange,productId]` on the table `toy_stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clothe_stocks_clotheSize_productId_key" ON "clothe_stocks"("clotheSize", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "shoe_stocks_shoeSize_productId_key" ON "shoe_stocks"("shoeSize", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "toy_stocks_ageRange_productId_key" ON "toy_stocks"("ageRange", "productId");
