-- CreateTable
CREATE TABLE "_AttributeValueOptionToOrderItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeValueOptionToOrderItem_AB_unique" ON "_AttributeValueOptionToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeValueOptionToOrderItem_B_index" ON "_AttributeValueOptionToOrderItem"("B");

-- AddForeignKey
ALTER TABLE "_AttributeValueOptionToOrderItem" ADD CONSTRAINT "_AttributeValueOptionToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "attribute_value_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeValueOptionToOrderItem" ADD CONSTRAINT "_AttributeValueOptionToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
