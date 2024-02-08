-- CreateEnum
CREATE TYPE "method_type" AS ENUM ('webhook', 'manually');

-- AlterTable
ALTER TABLE "email_verifications" ADD COLUMN     "method" "method_type" NOT NULL DEFAULT 'manually';
