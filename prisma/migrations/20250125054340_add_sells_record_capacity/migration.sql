-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "PaymnetType" AS ENUM ('CASH', 'CARD', 'UPI');

-- CreateEnum
CREATE TYPE "mediaType" AS ENUM ('TABLET', 'CAPSULE', 'POWDER', 'GRANULES', 'LOZENGE', 'PILL', 'SYRUP', 'ELIXIR', 'SUSPENSION', 'EMULSION', 'SOLUTION', 'DROPS', 'OINTMENT', 'CREAM', 'GEL', 'PASTE', 'FOAM', 'INHALER', 'NEBULIZER_SOLUTION', 'SPRAY', 'TRANSDERMAL_PATCH', 'SUPPOSITORY', 'IMPLANT', 'MEDICATED_SHAMPOO', 'MOUTHWASH', 'GARGLE', 'VIAL', 'AMPOULE', 'EFFERVESCENT_TABLET', 'SUBLINGUAL_TABLET', 'BUCCAL_TABLET', 'CHEWABLE_TABLET', 'DISINTEGRATING_TABLET', 'PATCH');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sells_record" (
    "id" SERIAL NOT NULL,
    "productname" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "type" "mediaType" NOT NULL,
    "paymentType" "PaymnetType" NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "capacity" TEXT,

    CONSTRAINT "sells_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
