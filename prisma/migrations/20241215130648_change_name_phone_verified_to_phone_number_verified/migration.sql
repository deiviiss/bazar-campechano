/*
  Warnings:

  - You are about to drop the column `phoneVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "phoneVerified",
ADD COLUMN     "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;
