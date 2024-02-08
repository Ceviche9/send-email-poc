-- CreateTable
CREATE TABLE "email_verifications" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "sended_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "failed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_id_key" ON "email_verifications"("id");
