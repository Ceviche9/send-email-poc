/*
  Warnings:

  - You are about to drop the column `created_at` on the `email_verifications` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `email_verifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `email_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "email_verifications_orderId_key";

-- AlterTable
ALTER TABLE "email_verifications" DROP COLUMN "created_at",
DROP COLUMN "orderId",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_order_id_key" ON "email_verifications"("order_id");
