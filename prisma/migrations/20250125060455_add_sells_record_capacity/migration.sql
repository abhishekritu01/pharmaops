/*
  Warnings:

  - Changed the type of `type` on the `sells_record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "medicineType" AS ENUM ('TABLET', 'CAPSULE', 'POWDER', 'GRANULES', 'LOZENGE', 'PILL', 'SYRUP', 'ELIXIR', 'SUSPENSION', 'EMULSION', 'SOLUTION', 'DROPS', 'OINTMENT', 'CREAM', 'GEL', 'PASTE', 'FOAM', 'INHALER', 'NEBULIZER_SOLUTION', 'SPRAY', 'TRANSDERMAL_PATCH', 'SUPPOSITORY', 'IMPLANT', 'MEDICATED_SHAMPOO', 'MOUTHWASH', 'GARGLE', 'VIAL', 'AMPOULE', 'EFFERVESCENT_TABLET', 'SUBLINGUAL_TABLET', 'BUCCAL_TABLET', 'CHEWABLE_TABLET', 'DISINTEGRATING_TABLET', 'PATCH');

-- AlterTable
ALTER TABLE "sells_record" DROP COLUMN "type",
ADD COLUMN     "type" "medicineType" NOT NULL;

-- DropEnum
DROP TYPE "mediaType";
