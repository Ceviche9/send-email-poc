/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "orderId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_orderId_key" ON "email_verifications"("orderId");
