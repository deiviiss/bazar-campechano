/*
  Warnings:

  - A unique constraint covering the columns `[productId,attributeId,valueOptionId]` on the table `product_attribute_values` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_attribute_values_productId_attributeId_valueOptionI_key" ON "product_attribute_values"("productId", "attributeId", "valueOptionId");
